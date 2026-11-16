# mat100x / thomas-calculus-learning

Thomas 微积分的离线 Web 学习站。当前版本是一个静态单仓库，不包含后端、桌面安装包、代码签名或商店发布。

## 当前范围

- 17 个规范章节。
- 638 个专业英语术语。
- 255 道原创练习。
- 208 个已渲染公式。
- 10 份 PDF。
- B0–B9 批次归档。
- GitHub Actions CI。
- Tag 触发的 Draft Release。
- GitHub Pages 手动部署工作流，默认不自动公开。

## 技术栈

- HTML / CSS / 原生 JavaScript。
- 本地 KaTeX。
- Node.js 静态验证和打包脚本。
- GitHub Actions。

## 本地运行

直接打开 `index.html`，或启动本地静态服务器：

```bash
npx serve .
```

## 验证

```bash
npm run validate
npm run package:release
npm run verify:release
```

`validate` 检查章节、术语、练习、公式、PDF 哈希、本地链接、重复 ID 和外部资源。`package:release` 生成可分发的 ZIP、manifest 和校验和。`verify:release` 校验制品完整性。

## 发布流程

1. PR 触发 CI。
2. 合并到 `main`。
3. 创建 `vX.Y.Z` Tag。
4. Release Workflow 创建 Draft Release。
5. 人工检查说明和资产。
6. 手动发布 Release。

GitHub Pages 工作流仅手动触发，启用前必须确认站点公开访问和内容版权边界。

首次 GitHub 初始化和推送步骤见 `docs/GITHUB_SETUP.md`。

## 内容来源

唯一教材：

`Thomas' Calculus, Fourteenth Edition in SI Units`

来源 SHA-256：

`03597823863F899FD71847F306551DA6CF70D3D327578B62C7FFAB4C136CEB39`

教材原 PDF 不包含在仓库中。详见 `NOTICE.md` 和 `LICENSE.md`。
