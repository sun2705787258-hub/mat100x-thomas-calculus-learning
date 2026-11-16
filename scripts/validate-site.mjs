import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const fail = (type, detail) => failures.push({ type, detail });

async function walk(directory, relative = "") {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (["node_modules", "dist", ".git"].includes(entry.name)) continue;
    const next = path.join(relative, entry.name);
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full, next)));
    else files.push(next);
  }
  return files;
}

const files = (await walk(root)).map((file) => file.replaceAll("\\", "/"));
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const canonicalText = await fs.readFile(path.join(root, "data", "canonical-book.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(canonicalText, sandbox);
const book = sandbox.window.CANONICAL_BOOK;
const expected = { chapters: 17, terms: 638, exercises: 255, formulas: 208, pdfs: 10 };

for (const [key, value] of Object.entries({ chapters: 17, terms: 638, exercises: 255, formulas: 208 })) {
  if (book.metrics[key] !== value) fail("canonical-count", `${key}:${book.metrics[key]}/${value}`);
}

const requiredPages = [
  "index.html",
  "guide/index.html",
  "overview/index.html",
  "chapters/index.html",
  "terminology/index.html",
  "exercises/index.html",
  "review/index.html",
  "reference/index.html",
  "downloads/index.html",
  "source/index.html",
  "archive/index.html",
  "quality/index.html",
];
for (const page of requiredPages) {
  try {
    await fs.access(path.join(root, page));
  } catch {
    fail("missing-page", page);
  }
}

for (const chapter of book.chapters) {
  const file = path.join(root, "chapters", chapter.slug, "index.html");
  try {
    await fs.access(file);
  } catch {
    fail("missing-chapter", chapter.slug);
  }
}

for (const file of htmlFiles) {
  const full = path.join(root, file);
  const html = await fs.readFile(full, "utf8");
  for (const forbidden of ["[object Object]", "chundefined", "待PDF终检", "待集成复核"]) {
    if (html.includes(forbidden)) fail("placeholder", `${file}: ${forbidden}`);
  }
  if (/(?:src|href)=["']https?:\/\//i.test(html)) fail("external-asset", file);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicates.length) fail("duplicate-id", `${file}: ${duplicates.join(",")}`);

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (!raw || raw.startsWith("#") || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
    const trimmed = raw.split("#")[0].split("?")[0];
    if (!trimmed) continue;
    let decoded;
    try {
      decoded = decodeURIComponent(trimmed);
    } catch {
      fail("bad-url-encoding", `${file}: ${raw}`);
      continue;
    }
    let target = decoded.startsWith("/")
      ? path.join(root, decoded.slice(1))
      : path.resolve(path.dirname(full), decoded);
    try {
      const stat = await fs.stat(target);
      if (stat.isDirectory()) target = path.join(target, "index.html");
      await fs.access(target);
    } catch {
      fail("missing-link", `${file}: ${raw}`);
    }
  }
}

const pdfs = (await fs.readdir(path.join(root, "pdf"))).filter((file) => file.endsWith(".pdf"));
if (pdfs.length !== expected.pdfs) fail("pdf-count", `${pdfs.length}/${expected.pdfs}`);

const manifest = JSON.parse(await fs.readFile(path.join(root, "book-manifest.json"), "utf8"));
if (manifest.readerPages.length !== 10) fail("reader-page-count", manifest.readerPages.length);
for (const page of manifest.readerPages) {
  const pdf = path.resolve(root, page.pdfPath);
  try {
    const bytes = await fs.readFile(pdf);
    const hash = crypto.createHash("sha256").update(bytes).digest("hex").toUpperCase();
    if (hash !== page.pdfSha256) fail("pdf-hash", `${page.id}:${hash}`);
  } catch {
    fail("missing-pdf", page.pdfPath);
  }
}

const sourcePdf = files.find((file) => file.includes("Thomas Calculus 14th Edition in SI Units"));
if (sourcePdf) fail("forbidden-source-pdf", sourcePdf);
if (files.some((file) => /(^|\/)\.env($|\.)/.test(file) && file !== ".env.example")) {
  fail("environment-file", ".env file present");
}

await fs.mkdir(path.join(root, "quality"), { recursive: true });
await fs.writeFile(
  path.join(root, "quality", "repository-validation.json"),
  `${JSON.stringify(
    {
      schemaVersion: "thomas-repository-validation-v1",
      pass: failures.length === 0,
      htmlFiles: htmlFiles.length,
      chapters: book.chapters.length,
      pdfs: pdfs.length,
      expected,
      failures,
    },
    null,
    2,
  )}\n`,
);
console.log(JSON.stringify({ pass: failures.length === 0, htmlFiles: htmlFiles.length, failures: failures.length }));
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
