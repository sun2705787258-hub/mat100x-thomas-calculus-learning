# 质量保证

## 三道门禁

### B0–B9 批次审计

```bash
node source/quality_audit.mjs
```

验证批次 QA schema、术语/练习/公式数量、链接、KaTeX、移动端、打印态和 PDF 哈希。

### B0–B9 smoke test

```bash
node batches/b01-ch01-02/source/smoke_test.mjs
```

验证 B0 归档页和 B1–B9 共 10 个页面的核心数量、浏览器错误和 KaTeX。

### 统一站审计

```bash
node source/audit_unified_site.mjs
```

验证首页、使用说明、结构页、17 章、术语、练习、公式、复习、下载、来源、归档和质量页，以及 canonical 数量、本地链接、重复 ID、占位文本、外部资源、搜索、移动端、打印态和 PDF 哈希。

## 最近结果

- 批次审计：10/10，失败 0。
- smoke test：10/10，失败 0。
- 统一站审计：29 页，失败 0。
- 搜索测试：`Green` 返回 8 条结果。
- 外部资源：0。

## 发布门禁

出现以下任一情况不得发布：

- 17 章少于 17 个 canonical 页面。
- 术语、练习、公式数量与 canonical 清单不一致。
- 页面级横向滚动。
- 不可滚动公式裁切。
- A4 打印公式越界。
- KaTeX、浏览器、本地链接或 PDF 哈希失败。
- 未关闭 P0 或 P1。
