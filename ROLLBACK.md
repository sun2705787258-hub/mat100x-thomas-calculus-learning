# 回滚说明

## 当前发布边界

- 统一首页：`index.html`
- B0 历史金样：`archive/b0-golden/index.html`
- B0–B9 批次快照：`batches/`
- 旧 ZIP：保留在 `output/`，未覆盖、未删除

## 回滚统一首页

若需要暂时恢复旧 B0 根入口，只需把：

```text
archive/b0-golden/index.html
```

复制为：

```text
index.html
```

归档页中的资源路径已经按 `archive/b0-golden/` 深度调整，因此不要直接把归档文件移动回根目录。更安全的做法是保留统一首页，修复问题后重新发布。

## 回滚单个章节

canonical 章节内容由以下流程生成：

```text
B0-B9 来源页
→ source/build_unified_site.mjs
→ chapters/
```

不要手工覆盖 canonical 章节。应修复来源批次或构建规则后重新生成并审计。

## 发布包

历史 ZIP 和当前统一站 ZIP 都保留。恢复旧版本时优先使用对应 ZIP，而不是删除当前目录。
