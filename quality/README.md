# 全站质量契约

## 文件

- `batch-qa.schema.json`：批次 QA v2 数据契约。
- `global-audit.json`：最近一次全站审计的机器可读结果。
- `site-audit.json`：统一学习站首页、17 章、学习模块、搜索和 PDF 审计结果。
- `artifact-inventory.json`：站点、PDF、ZIP 和教材来源的完整去向清单。
- `unified-build.json`：统一站构建指标。
- `../book-manifest.json`：17 章、批次页面、PDF 和最终集成状态。
- `../source/quality_audit.mjs`：浏览器与文件系统审计入口。
- `../source/audit_unified_site.mjs`：统一站审计入口。

## 统一批次字段

每个正式批次的 `batch-qa.json` 必须包含：

- `schemaVersion: "thomas-batch-qa-v2"`；
- 唯一来源 SHA-256；
- `newTerms`、`newExercises`、`renderedFormulas`、`numericChecksPassed`、`pdfPages`；
- 桌面和移动端宽度；
- `desktopFormulaClipped: 0`、`mobileFormulaClipped: 0`；
- `mobileFormulaScrollable` 的实际数量；
- KaTeX、浏览器、跨批次回归结果；
- G1–G10 全部 `passed`；
- P0/P1/P2 未关闭数量为 0。

历史字段可以保留，但不得替代上述统一字段。

## 公式可访问性

- 桌面和打印稿：公式不得超出所在卡片，不得被隐藏裁切。
- 移动端：优先缩放并跨满单列；特别宽的公式允许在公式卡内部横向滑动。
- 任何公式造成的页面级横向滚动都视为失败。

## 审计命令

```bash
node source/quality_audit.mjs
node source/audit_unified_site.mjs
```

审计器需要本机 Chrome；它不联网，不读取其他教材，不修改学习内容。

## 最终集成门禁

- B0–B9 全批通过。
- 第 4–5 章已从 B0 归档页面迁移为规范章节内容。
- 全局术语、公式、定理、例题和练习 ID 无冲突。
- 全局搜索和章节导航完成。
- 全站 smoke test、打印回归和最终 PDF 回归通过。
- 统一站审计 `site-audit.json` 失败项为 0。
