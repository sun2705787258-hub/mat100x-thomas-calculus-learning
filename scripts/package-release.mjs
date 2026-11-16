import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
const tag = process.env.GITHUB_REF_NAME || `v${pkg.version}`;
if (tag !== `v${pkg.version}`) throw new Error(`Tag ${tag} does not match package version ${pkg.version}`);

const dist = path.join(root, "dist", "release");
const packageName = `${pkg.name}-v${pkg.version}`;
const packageDir = path.join(dist, packageName);
await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(packageDir, { recursive: true });

const runtimePaths = [
  ".nojekyll",
  "index.html",
  "content.js",
  "book-manifest.json",
  "quality-status.json",
  "assets",
  "data",
  "chapters",
  "guide",
  "overview",
  "terminology",
  "exercises",
  "review",
  "reference",
  "downloads",
  "docs",
  "archive",
  "batches",
  "quality",
  "pdf",
  "README.md",
  "USER_GUIDE.md",
  "CONTENT_MODEL.md",
  "STANDARDS_MAP.md",
  "QA.md",
  "ARTIFACT_INVENTORY.md",
  "UNIFIED_SITE_REPORT.md",
  "RELEASE_NOTES.md",
  "ROLLBACK.md",
  "NOTICE.md",
  "LICENSE.md",
];
for (const item of runtimePaths) {
  await fs.cp(path.join(root, item), path.join(packageDir, item), { recursive: true });
}
await fs.mkdir(path.join(packageDir, "source"), { recursive: true });
for (const file of ["index.html", "formulas.tex", "mindmap.mmd", "chapter-template.md"]) {
  await fs.cp(path.join(root, "source", file), path.join(packageDir, "source", file));
}

async function sha256(file) {
  return crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex").toUpperCase();
}

const checksumTargets = [
  "index.html",
  "book-manifest.json",
  "quality-status.json",
  "data/canonical-book.js",
  ...runtimePaths.filter((item) => item.endsWith(".pdf")),
];
const checksumRows = [];
for (const relative of checksumTargets) {
  const file = path.join(packageDir, relative);
  try {
    checksumRows.push(`${await sha256(file)}  ${relative}`);
  } catch {
    // Optional checksum target.
  }
}
for (const file of (await fs.readdir(path.join(packageDir, "pdf"))).sort()) {
  if (file.endsWith(".pdf")) checksumRows.push(`${await sha256(path.join(packageDir, "pdf", file))}  pdf/${file}`);
}
await fs.writeFile(path.join(packageDir, "SHA256SUMS.txt"), `${checksumRows.join("\n")}\n`);

const zipName = `${packageName}.zip`;
const zipPath = path.join(dist, zipName);
const command = process.platform === "win32" ? "tar.exe" : "zip";
const args = process.platform === "win32"
  ? ["-a", "-c", "-f", zipName, packageName]
  : ["-r", zipName, packageName];
const packed = spawnSync(command, args, { cwd: dist, stdio: "inherit" });
if (packed.status !== 0) throw new Error(`Failed to create ${zipName}`);

const manifest = {
  schemaVersion: "thomas-release-manifest-v1",
  app: pkg.name,
  version: pkg.version,
  tag,
  sourceCommit: process.env.GITHUB_SHA || null,
  zip: zipName,
  zipSha256: await sha256(zipPath),
  pdfs: (await fs.readdir(path.join(packageDir, "pdf")))
    .filter((file) => file.endsWith(".pdf"))
    .map((file) => `pdf/${file}`),
};
await fs.writeFile(path.join(dist, "release-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await fs.writeFile(
  path.join(dist, "SHA256SUMS.txt"),
  `${await sha256(zipPath)}  ${zipName}\n${await sha256(path.join(dist, "release-manifest.json"))}  release-manifest.json\n`,
);
console.log(JSON.stringify({ packageDir, zipPath, manifest }, null, 2));
