import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const SITE_ROOT = "F:/数学学习/output/study-site";
const OUTPUT_ROOT = "F:/数学学习/output";
const SOURCE_PDF = "F:/数学学习/tmp/source/Thomas Calculus 14th Edition in SI Units (1).pdf";
const jsonPath = path.join(SITE_ROOT, "quality", "artifact-inventory.json");
const markdownPath = path.join(SITE_ROOT, "ARTIFACT_INVENTORY.md");

const sha256 = async (file) => createHash("sha256").update(await fs.readFile(file)).digest("hex").toUpperCase();

async function walk(root, relative = "") {
  const directory = path.join(root, relative);
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const next = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      if (normalizePath(next) === "assets/vendor/katex") continue;
      files.push(...(await walk(root, next)));
    } else {
      files.push(next);
    }
  }
  return files;
}

const normalizePath = (value) => value.replaceAll("\\", "/");

async function directoryDigest(directory) {
  const files = await walk(directory);
  const rows = [];
  for (const file of files.sort()) {
    rows.push(`${normalizePath(file)}:${await sha256(path.join(directory, file))}`);
  }
  return createHash("sha256").update(rows.join("\n")).digest("hex").toUpperCase();
}

function classifySite(relative, name) {
  const p = normalizePath(relative);
  if (p === "index.html") return ["site-entry", "published", "统一学习首页"];
  if (p === "index.unified.html") return ["build-candidate", "retained-internal", "构建候选首页，不进入主导航"];
  if (p.startsWith("archive/b0-golden/")) return ["golden-archive", "published-archive", "B0 历史金样"];
  if (p.startsWith("batches/")) return ["batch-artifact", "published-archive", "批次历史快照与质量证据"];
  if (p.startsWith("chapters/")) return ["canonical-chapter", "published", "统一章节页"];
  if (
    ["guide/", "overview/", "terminology/", "exercises/", "review/", "reference/", "downloads/", "source/", "archive/"].some(
      (prefix) => p.startsWith(prefix),
    )
  ) {
    return ["learning-module", "published", "统一学习站"];
  }
  if (p.startsWith("quality/")) return ["quality-evidence", "project-dashboard", "项目质量入口"];
  if (p.startsWith("data/")) return ["runtime-data", "published-runtime", "离线搜索和章节清单"];
  if (p.startsWith("assets/vendor/")) return ["vendor-asset", "published-runtime", "本地方案资源"];
  if (p.startsWith("assets/")) return ["shared-runtime", "published-runtime", "共享样式和交互"];
  if (p === "content.js") return ["legacy-runtime", "archive-runtime", "B0 历史金样数据"];
  if (/\.(md|json)$/.test(name) || p === "book-manifest.json" || p === "quality-status.json") {
    return ["documentation-or-data", "internal-or-published", "说明、清单或质量状态"];
  }
  if (p.startsWith("source/")) return ["build-source", "internal-source", "站点和内容构建源"];
  return ["site-other", "retained", "站点附属文件"];
}

const inventory = [];
const siteFiles = await walk(SITE_ROOT);
for (const relative of siteFiles.sort()) {
  const file = path.join(SITE_ROOT, relative);
  const stat = await fs.stat(file);
  const [type, status, destination] = classifySite(relative, path.basename(relative));
  inventory.push({
    id: `site:${normalizePath(relative)}`,
    scope: "study-site",
    path: normalizePath(relative),
    type,
    status,
    destination,
    bytes: stat.size,
    sha256: await sha256(file),
  });
}

const vendorRoot = path.join(SITE_ROOT, "assets", "vendor", "katex");
inventory.push({
  id: "site:assets/vendor/katex/",
  scope: "study-site",
  path: "assets/vendor/katex/",
  type: "vendor-group",
  status: "published-runtime",
  destination: "本地 KaTeX 0.16.22，包含字体、样式和许可",
  bytes: (
    await Promise.all(
      (await walk(vendorRoot)).map((file) => fs.stat(path.join(vendorRoot, file)).then((stat) => stat.size)),
    )
  ).reduce((sum, value) => sum + value, 0),
  sha256: await directoryDigest(vendorRoot),
});

for (const file of (await fs.readdir(path.join(OUTPUT_ROOT, "pdf"))).sort()) {
  const relative = `pdf/${file}`;
  const full = path.join(OUTPUT_ROOT, relative);
  const stat = await fs.stat(full);
  const canonical = /B[0-9]|示范学习资料/.test(file);
  inventory.push({
    id: `output:${relative}`,
    scope: "output",
    path: relative,
    type: "pdf",
    status: canonical ? "published-download" : "untouched-noncanonical",
    destination: canonical ? "统一 PDF 下载中心" : "未进入学习导航；保留原文件",
    bytes: stat.size,
    sha256: await sha256(full),
  });
}

for (const file of (await fs.readdir(OUTPUT_ROOT)).sort()) {
  if (!file.endsWith(".zip") && !file.endsWith(".sha256") && !file.endsWith(".release.json")) continue;
  const full = path.join(OUTPUT_ROOT, file);
  const stat = await fs.stat(full);
  const externalCurrentRelease = file.startsWith("Thomas_Calculus_全书统一学习站_v1.0.0.");
  inventory.push({
    id: `output:${file}`,
    scope: "output",
    path: file,
    type: file.endsWith(".zip")
      ? "release-package"
      : file.endsWith(".release.json")
        ? "release-manifest"
        : "package-checksum",
    status: externalCurrentRelease ? "external-release-artifact" : "historical-or-current-release",
    destination: externalCurrentRelease
      ? "当前 v1.0.0 外置发布产物；哈希由 release.json / sha256 提供"
      : "发布归档；不进入主学习导航",
    bytes: externalCurrentRelease ? null : stat.size,
    sha256: externalCurrentRelease ? null : await sha256(full),
  });
}

inventory.push({
  id: "source:textbook-pdf",
  scope: "source-only",
  path: "tmp/source/Thomas Calculus 14th Edition in SI Units (1).pdf",
  type: "textbook-source",
  status: "not-published",
  destination: "唯一内容来源；仅登记哈希，不公开分发",
  bytes: (await fs.stat(SOURCE_PDF)).size,
  sha256: await sha256(SOURCE_PDF),
});

const summary = {
  entries: inventory.length,
  studySiteFiles: inventory.filter((item) => item.scope === "study-site" && item.type !== "vendor-group").length,
  pdfs: inventory.filter((item) => item.type === "pdf").length,
  packages: inventory.filter((item) => item.type === "release-package").length,
  noncanonicalPdfs: inventory.filter((item) => item.status === "untouched-noncanonical").length,
  totalBytes: inventory.reduce((sum, item) => sum + (item.bytes || 0), 0),
};

const report = {
  schemaVersion: "thomas-artifact-inventory-v1",
  summary,
  policy: {
    sourceOfTruth: "Thomas' Calculus, Fourteenth Edition in SI Units",
    sourceSha256: "03597823863F899FD71847F306551DA6CF70D3D327578B62C7FFAB4C136CEB39",
    oldFilesPolicy: "retain-unless-explicitly-requested-for-removal",
    mainNavigation: "canonical chapter and learning modules only",
    archiveNavigation: "B0-B9 snapshots and release packages",
  },
  entries: inventory,
};
await fs.writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);

const tableRows = inventory
  .map(
    (item) =>
      `| \`${item.path}\` | ${item.type} | ${item.destination} | ${item.status} | \`${item.sha256}\` |`,
  )
  .join("\n");
const markdown = `# 统一站点产物清单

本清单由 \`source/build_artifact_inventory.mjs\` 生成，覆盖统一站点、PDF、发布包和唯一教材来源。

## 汇总

| 项目 | 数量 / 大小 |
|---|---:|
| 清单条目 | ${summary.entries} |
| 站点独立文件 | ${summary.studySiteFiles} |
| PDF | ${summary.pdfs} |
| 非教材旧 PDF（未进入导航） | ${summary.noncanonicalPdfs} |
| ZIP 发布包 | ${summary.packages} |
| 总大小 | ${(summary.totalBytes / 1024 / 1024).toFixed(2)} MB |

## 去向原则

- 统一学习入口只进入 canonical 章节和公共学习模块。
- B0–B9 批次页保留为历史快照。
- B0 金样迁入 \`archive/b0-golden/\`，原内容不删除。
- 教材原 PDF 不公开分发，只登记路径和 SHA-256。
- 课程说明、旧试卷、旧复习稿等非教材 PDF 保留原文件，但不进入学习导航。
- 旧 ZIP 保留为历史发布包，不覆盖、不删除。

## 完整清单

| 路径 | 类型 | 去向 | 状态 | SHA-256 |
|---|---|---|---|---|
${tableRows}
`;
await fs.writeFile(markdownPath, markdown);
console.log(JSON.stringify(summary, null, 2));
