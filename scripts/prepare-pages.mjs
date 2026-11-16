import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist", "pages");
await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });

const paths = [
  ".nojekyll",
  "index.html",
  "content.js",
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
  "archive",
  "batches",
  "pdf",
  "quality",
  "README.md",
  "USER_GUIDE.md",
  "NOTICE.md",
];
for (const item of paths) {
  await fs.cp(path.join(root, item), path.join(out, item), { recursive: true });
}

await fs.mkdir(path.join(out, "source"), { recursive: true });
for (const file of ["index.html", "formulas.tex", "mindmap.mmd", "chapter-template.md"]) {
  await fs.cp(path.join(root, "source", file), path.join(out, "source", file));
}
console.log(out);
