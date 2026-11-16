import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "release");
const manifest = JSON.parse(await fs.readFile(path.join(dist, "release-manifest.json"), "utf8"));
const sha256 = async (file) =>
  crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex").toUpperCase();

if ((await sha256(path.join(dist, manifest.zip))) !== manifest.zipSha256) {
  throw new Error("Release ZIP hash mismatch.");
}

if (manifest.pdfs.length !== 10) throw new Error(`Expected 10 PDFs, found ${manifest.pdfs.length}`);
for (const pdf of manifest.pdfs) {
  const folderFile = path.join(dist, `thomas-calculus-learning-v${manifest.version}`, pdf);
  await fs.access(folderFile);
}

const packageRoot = path.join(dist, `thomas-calculus-learning-v${manifest.version}`);
for (const required of ["index.html", "chapters/index.html", "archive/b0-golden/index.html", "SHA256SUMS.txt"]) {
  await fs.access(path.join(packageRoot, required));
}

console.log(
  JSON.stringify({
    pass: true,
    version: manifest.version,
    zip: manifest.zip,
    zipSha256: manifest.zipSha256,
    pdfs: manifest.pdfs.length,
  }),
);
