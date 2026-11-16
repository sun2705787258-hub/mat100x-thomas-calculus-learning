import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const SITE_ROOT = "F:/数学学习/output/study-site";
const OUTPUT_ROOT = "F:/数学学习/output";
const auditPath = path.join(SITE_ROOT, "quality", "site-audit.json");
const canonical = JSON.parse(
  (await fs.readFile(path.join(SITE_ROOT, "data", "canonical-book.js"), "utf8"))
    .replace(/^window\.CANONICAL_BOOK\s*=\s*/, "")
    .replace(/;\s*$/, ""),
);

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const failures = [];
const pageResults = [];

const fail = (page, type, detail) => failures.push({ page, type, detail });
const sha256 = async (file) => createHash("sha256").update(await fs.readFile(file)).digest("hex").toUpperCase();
const localTarget = (pageFile, href) => {
  if (!href || href.startsWith("#")) return null;
  const url = new URL(href, pathToFileURL(pageFile));
  if (url.protocol !== "file:") return null;
  url.search = "";
  url.hash = "";
  return fileURLToPath(url);
};

async function inspect(pagePath, viewport, media = "screen") {
  const page = await browser.newPage({ viewport });
  if (media === "print") await page.emulateMedia({ media: "print" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror:${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console:${message.text()}`);
  });
  await page.goto(pathToFileURL(pagePath).href, { waitUntil: "load" });
  await page.waitForTimeout(350);
  const metrics = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    return {
      title: document.title,
      h1: [...document.querySelectorAll("h1")].map((element) => element.innerText.trim()),
      terms: document.querySelectorAll("[data-term-row]").length,
      exercises: document.querySelectorAll("[data-exercise]").length,
      formulas: document.querySelectorAll(".formula.katex-rendered").length,
      formulaErrors: document.querySelectorAll(".katex-error").length,
      mastery: document.querySelectorAll("[data-mastery]").length,
      duplicateIds: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))],
      placeholders: ["undefined", "NaN", "待最终确认", "术语加载中", "<br />"].filter((text) =>
        document.body.innerText.includes(text),
      ),
      bodyWidth: document.body.scrollWidth,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      remoteAssets: [...document.querySelectorAll("script[src],link[href],img[src]")]
        .map((element) => element.getAttribute("src") || element.getAttribute("href"))
        .filter((value) => value && /^https?:/i.test(value)),
      links: [...document.querySelectorAll("a[href]")].map((anchor) => anchor.getAttribute("href")),
    };
  });
  const checkedLinks = [];
  for (const href of metrics.links) {
    const target = localTarget(pagePath, href);
    if (!target) continue;
    checkedLinks.push(href);
    try {
      await fs.access(target);
    } catch {
      fail(path.relative(SITE_ROOT, pagePath), "missing-link", href);
    }
  }
  if (errors.length) fail(path.relative(SITE_ROOT, pagePath), "browser-error", errors);
  if (metrics.formulaErrors) fail(path.relative(SITE_ROOT, pagePath), "formula-error", metrics.formulaErrors);
  if (metrics.duplicateIds.length) fail(path.relative(SITE_ROOT, pagePath), "duplicate-id", metrics.duplicateIds);
  if (metrics.placeholders.length) fail(path.relative(SITE_ROOT, pagePath), "placeholder", metrics.placeholders);
  if (metrics.remoteAssets.length) fail(path.relative(SITE_ROOT, pagePath), "remote-asset", metrics.remoteAssets);
  if (metrics.documentWidth > metrics.viewportWidth + 1) {
    fail(path.relative(SITE_ROOT, pagePath), "page-overflow", `${metrics.documentWidth}/${metrics.viewportWidth}`);
  }
  await page.close();
  return { ...metrics, checkedLinks: checkedLinks.length, errors };
}

const generalPages = [
  "index.html",
  "guide/index.html",
  "overview/index.html",
  "chapters/index.html",
  "terminology/index.html",
  "exercises/index.html",
  "reference/index.html",
  "review/index.html",
  "downloads/index.html",
  "source/index.html",
  "archive/index.html",
  "quality/index.html",
];

for (const relative of generalPages) {
  const file = path.join(SITE_ROOT, relative);
  const desktop = await inspect(file, { width: 1440, height: 1000 });
  const mobileFile = relative === "index.html" ? file : file;
  const mobile = await inspect(mobileFile, { width: 390, height: 844 });
  pageResults.push({ relative, kind: "general", desktop, mobile });
}

const termCenter = pageResults.find((page) => page.relative === "terminology/index.html");
const exerciseCenter = pageResults.find((page) => page.relative === "exercises/index.html");
const referenceCenter = pageResults.find((page) => page.relative === "reference/index.html");
const downloads = pageResults.find((page) => page.relative === "downloads/index.html");
if (termCenter.desktop.terms !== canonical.metrics.terms) {
  fail("terminology", "term-count", `${termCenter.desktop.terms}/${canonical.metrics.terms}`);
}
if (exerciseCenter.desktop.exercises !== canonical.metrics.exercises) {
  fail("exercises", "exercise-count", `${exerciseCenter.desktop.exercises}/${canonical.metrics.exercises}`);
}
if (referenceCenter.desktop.formulas !== canonical.metrics.formulas) {
  fail("reference", "formula-count", `${referenceCenter.desktop.formulas}/${canonical.metrics.formulas}`);
}
if ((downloads.desktop.links || []).filter((href) => href?.includes("../../pdf/")).length !== 10) {
  fail("downloads", "pdf-count", "Expected 10 PDF links.");
}

for (const chapter of canonical.chapters) {
  const relative = `chapters/${chapter.slug}/index.html`;
  const file = path.join(SITE_ROOT, relative);
  const desktop = await inspect(file, { width: 1440, height: 1000 });
  const mobile = [1, 4, 7, 13, 17].includes(chapter.number)
    ? await inspect(file, { width: 390, height: 844 })
    : null;
  const print = [1, 4, 7, 13, 17].includes(chapter.number)
    ? await inspect(file, { width: 794, height: 1123 }, "print")
    : null;
  if (desktop.h1.length !== 1) fail(relative, "h1-count", desktop.h1.length);
  if (desktop.terms !== chapter.termCount) fail(relative, "chapter-term-count", `${desktop.terms}/${chapter.termCount}`);
  if (desktop.exercises !== chapter.exerciseCount) {
    fail(relative, "chapter-exercise-count", `${desktop.exercises}/${chapter.exerciseCount}`);
  }
  if (desktop.formulas !== chapter.formulaCount) {
    fail(relative, "chapter-formula-count", `${desktop.formulas}/${chapter.formulaCount}`);
  }
  if (desktop.mastery < 10) fail(relative, "mastery-count", desktop.mastery);
  pageResults.push({ relative, kind: "chapter", chapter: chapter.number, desktop, mobile, print });
}

const homeFile = path.join(SITE_ROOT, "index.html");
const searchPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await searchPage.goto(pathToFileURL(homeFile).href, { waitUntil: "load" });
await searchPage.click("[data-search-open]");
await searchPage.fill("#site-search-input", "Green");
await searchPage.waitForTimeout(100);
const searchResults = await searchPage.locator("[data-search-results] a").count();
if (!searchResults) fail("index.unified.html", "search-results", "No result for Green.");
await searchPage.close();

const pdfFiles = (await fs.readdir(path.join(OUTPUT_ROOT, "pdf"))).filter(
  (name) => name.endsWith(".pdf") && /B[0-9]|示范学习资料/.test(name),
);
const pdfs = [];
for (const name of pdfFiles.sort((a, b) => a.localeCompare(b, "zh-CN"))) {
  const file = path.join(OUTPUT_ROOT, "pdf", name);
  pdfs.push({ name, sha256: await sha256(file), bytes: (await fs.stat(file)).size });
}

await browser.close();
const report = {
  schemaVersion: "thomas-unified-site-audit-v1",
  pass: failures.length === 0,
  summary: {
    pages: pageResults.length,
    chapters: canonical.metrics.chapters,
    terms: canonical.metrics.terms,
    exercises: canonical.metrics.exercises,
    formulas: canonical.metrics.formulas,
    pdfs: pdfs.length,
    searchResults,
    failures: failures.length,
  },
  failures,
  pages: pageResults,
  pdfs,
};
await fs.mkdir(path.dirname(auditPath), { recursive: true });
await fs.writeFile(auditPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));
if (failures.length) process.exitCode = 1;
