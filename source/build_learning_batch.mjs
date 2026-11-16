import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "..");
const configFile = path.resolve(process.argv[2] || "");

if (!path.isAbsolute(configFile)) {
  throw new Error("Batch config path must be absolute.");
}

const { default: batch } = await import(`${pathToFileURL(configFile).href}?v=${Date.now()}`);
const batchRoot = path.join(siteRoot, "batches", batch.slug);

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formulaById = new Map(
  batch.chapters
    .flatMap((chapter) => chapter.sections)
    .flatMap((section) => section.formulas || [])
    .map((formula) => [formula.id, formula]),
);

const formulaCards = (section) => {
  if (!section.formulas?.length) return "";
  const cards = section.formulas
    .map((formula) => {
      if (!formulaById.has(formula.id)) throw new Error(`Unknown formula: ${formula.id}`);
      const formulaNumber = [...formulaById.keys()].indexOf(formula.id) + 1;
      return `<article class="formula-card" data-id="F${String(formulaNumber).padStart(2, "0")}"><h4>${escapeHtml(
        formula.title,
      )}</h4><div class="formula" id="${escapeHtml(formula.id)}"></div><p class="condition">${escapeHtml(
        formula.condition,
      )}</p></article>`;
    })
    .join("");
  return `<div class="formula-grid">${cards}</div>`;
};

const sectionBlocks = (chapter) =>
  chapter.sections
    .map(
      (section) => `
        <div class="section-block" id="sec-${escapeHtml(section.anchor)}">
          <div class="section-opening">
            <div class="section-block-head"><h3>${escapeHtml(section.number)} ${escapeHtml(
              section.title,
            )}</h3><span class="locator">教材页${escapeHtml(section.pages)} · PDF页${escapeHtml(
              section.pdfPages,
            )}</span></div>
            <p>${section.summary}</p>
          </div>
          ${formulaCards(section)}
        </div>`,
    )
    .join("");

const exampleRows = (chapter) =>
  chapter.examples
    .map(
      (row) =>
        `<tr><td>${escapeHtml(row.label)}</td><td>${escapeHtml(row.conclusion)}</td><td>${escapeHtml(
          row.location,
        )}</td></tr>`,
    )
    .join("");

const mistakeCards = (chapter) =>
  chapter.mistakes
    .map(
      (item) =>
        `<article class="mistake-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(
          item.body,
        )}</p></article>`,
    )
    .join("");

const masteryList = (chapter) =>
  chapter.mastery
    .map(
      (item, index) =>
        `<li><label><input type="checkbox" data-mastery="${escapeHtml(
          batch.id.toLowerCase(),
        )}-c${chapter.number}-${index + 1}" />${escapeHtml(item)}</label></li>`,
    )
    .join("");

const chapterNavigation = (chapter) =>
  `<a href="#chapter-${chapter.number}"><span class="nav-num">${String(
    batch.chapters.indexOf(chapter) + 3,
  ).padStart(2, "0")}</span>第 ${chapter.number} 章</a>`;

const chapterJump = (chapter) =>
  `<details class="chapter-jump"><summary>第${chapter.number}章快速定位</summary>${chapter.sections
    .map(
      (section) =>
        `<a href="#sec-${escapeHtml(section.anchor)}">${escapeHtml(section.number)} ${escapeHtml(
          section.shortTitle || section.title,
        )}</a>`,
    )
    .join("")}</details>`;

const chapterSection = (chapter) => `
          <section class="section chapter-section" id="chapter-${chapter.number}" data-print-break>
            <div class="chapter-cover"><div class="chapter-big">${chapter.number}</div><div class="chapter-copy"><p class="eyebrow">New Chapter Summary</p><h3>${escapeHtml(
              chapter.title,
            )}</h3><p>${chapter.intro}</p><div class="meta-strip"><span>教材页${escapeHtml(
              chapter.pages,
            )}</span><span>PDF页${escapeHtml(chapter.pdfPages)}</span><span>${escapeHtml(
              chapter.sectionRange,
            )}</span><span>${chapter.sections.length}个节</span></div></div></div>
            <div class="chapter-objectives"><h3>本章学习目标</h3><ul>${chapter.objectives
              .map((item) => `<li>${escapeHtml(item)}</li>`)
              .join("")}</ul></div>
            ${sectionBlocks(chapter)}
            <h3>第${chapter.number}章重要例题与结论锚点</h3><div class="table-wrap"><table><thead><tr><th>教材例题/定理</th><th>结论</th><th>位置</th></tr></thead><tbody>${exampleRows(
              chapter,
            )}</tbody></table></div>
            <h3>第${chapter.number}章易错点</h3><div class="mistake-grid">${mistakeCards(
              chapter,
            )}</div>
            <div class="callout answer"><strong>第${chapter.number}章一句话</strong>${chapter.oneLine}</div>
          </section>`;

const formulaJavascript = Object.fromEntries(
  [...formulaById.entries()].map(([id, formula]) => [id, formula.tex]),
);

const contentJavascript = `window.BATCH_FORMULAS = ${JSON.stringify(
  formulaJavascript,
  null,
  2,
)};\n\nwindow.STUDY_CONTENT = ${JSON.stringify(
  { terms: batch.terms, exercises: batch.exercises },
  null,
  2,
)};\n`;

const masteryCount = batch.chapters.reduce((sum, chapter) => sum + chapter.mastery.length, 0);
const exerciseCount = batch.exercises.length;
const termCount = batch.terms.length;
const formulaCount = formulaById.size;
const qaRows = [
  ["G1 版本与来源", batch.sourceRange],
  ["G2 章节覆盖", `${batch.chapters.map((chapter) => chapter.sectionRange).join("、")} 完整`],
  ["G3 术语", `${termCount} 个术语，按章节检索`],
  ["G4 定理与公式", `${formulaCount} 个页面公式，条件随公式展示`],
  ["G5 例题结论", "代表例题与定理均附教材页和 PDF 页锚点"],
  ["G6 练习与答案", `${exerciseCount} 道原创题，五种题型、三级答案`],
  ["G7 数学渲染", "本地 KaTeX；公式裁切在桌面、移动端和打印态分别检查"],
  ["G8 图表与链接", `${batch.label} 知识图、节导航、术语与练习检索可用`],
  ["G9 网页与打印", "桌面、390px 移动端和 A4 PDF 独立检查"],
  ["G10 版权与版本", "原创概要、术语整理、知识图和自编练习；不复制教材正文"],
]
  .map(
    ([gate, evidence]) =>
      `<tr><td>${escapeHtml(gate)}</td><td>${escapeHtml(batch.qaStatusLabel)}</td><td>${escapeHtml(
        evidence,
      )}</td><td>无</td></tr>`,
  )
  .join("");

const sourceRows = batch.chapters
  .flatMap((chapter) =>
    chapter.sections.map(
      (section) =>
        `<tr><td>${escapeHtml(section.number)}</td><td>${escapeHtml(
          section.pages,
        )}</td><td>${escapeHtml(section.pdfPages)}</td><td>${escapeHtml(
          section.shortTitle || section.title,
        )}</td></tr>`,
    ),
  )
  .join("");

const reviewCards = batch.chapters
  .map(
    (chapter) =>
      `<article class="review-card"><h3>第${chapter.number}章自测</h3><ul class="mastery-list">${masteryList(
        chapter,
      )}</ul></article>`,
  )
  .join("");

const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(batch.description)}" />
    <title>${escapeHtml(batch.title)}</title>
    <link rel="stylesheet" href="../../assets/styles.css" />
    <link rel="stylesheet" href="../../assets/vendor/katex/katex.min.css" />
    <style>
      @media print {
        body[data-batch="b8"] .exercise-grid,
        body[data-batch="b9"] .exercise-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-count: auto;
        }
      }
    </style>
  </head>
  <body data-batch="${escapeHtml(batch.id.toLowerCase())}" data-progress-key="thomas-${escapeHtml(
    batch.id.toLowerCase(),
  )}-mastery-v1" data-error-log-key="thomas-${escapeHtml(batch.id.toLowerCase())}-errors-v1">
    <a class="skip-link" href="#main-content">跳到正文</a>
    <div class="app-shell">
      <aside class="sidebar" aria-label="${escapeHtml(batch.label)} 批次导航">
        <div class="brand"><div class="brand-mark" aria-hidden="true">${escapeHtml(
          batch.label,
        )}</div><div><p class="brand-title">${escapeHtml(
          batch.chapterLabel,
        )}</p><p class="brand-subtitle">${escapeHtml(batch.subtitle)}</p></div></div>
        <div class="sidebar-search"><label class="sr-only" for="term-search">检索术语</label><input id="term-search" type="search" placeholder="检索中英术语…" autocomplete="off" /><p id="term-visible-count" class="small-note">当前显示全部术语</p></div>
        <nav class="side-nav">
          <a href="#guide"><span class="nav-num">00</span>批次说明</a><a href="#map"><span class="nav-num">01</span>知识地图</a><a href="#terms"><span class="nav-num">02</span>英语术语</a>${batch.chapters
            .map(chapterNavigation)
            .join("")}<a href="#practice"><span class="nav-num">${String(
              batch.chapters.length + 3,
            ).padStart(2, "0")}</span>分层练习</a><a href="#review"><span class="nav-num">${String(
              batch.chapters.length + 4,
            ).padStart(2, "0")}</span>自测复盘</a><a href="#qa"><span class="nav-num">${String(
              batch.chapters.length + 5,
            ).padStart(2, "0")}</span>PDF检查</a><a href="#source"><span class="nav-num">${String(
              batch.chapters.length + 6,
            ).padStart(2, "0")}</span>来源记录</a>
        </nav>
        ${batch.chapters.map(chapterJump).join("")}
        <div class="sidebar-note">本页只用于 ${escapeHtml(
          batch.label,
        )} 内容与 PDF 校准备。<br /><br />${
          batch.previous
            ? `<a href="${escapeHtml(batch.previous.href)}">上一批 ${escapeHtml(
                batch.previous.label,
              )}</a><br />`
            : ""
        }${batch.next ? escapeHtml(batch.next) : ""}</div>
      </aside>
      <main id="main-content">
        <header class="hero">
          <div class="hero-kicker"><strong>${escapeHtml(
            batch.label,
          )} · A4 校准备</strong><span>Thomas’ Calculus · Fourteenth Edition in SI Units</span></div>
          <h1>${batch.heroTitle}</h1>
          <p class="hero-lead">${batch.heroLead}</p>
          <div class="hero-meta"><span>${escapeHtml(
            batch.chapters.map((chapter) => `教材页 ${chapter.pages}`).join("、"),
          )}</span><span>${escapeHtml(
            batch.chapters.map((chapter) => `PDF ${chapter.pdfPages}`).join("、"),
          )}</span><span>${batch.chapters.reduce(
            (sum, chapter) => sum + chapter.sections.length,
            0,
          )} 个节</span><span>${termCount} 个新增术语</span><span>${exerciseCount} 道原创练习</span></div>
          <div class="hero-actions">${batch.chapters
            .map(
              (chapter) =>
                `<a class="button button-light" href="#chapter-${chapter.number}">进入第 ${chapter.number} 章</a>`,
            )
            .join("")}<button class="button button-ghost" type="button" data-print>打印 / 导出 PDF</button></div>
        </header>
        <div class="content-wrap">
          <section class="section" id="guide">
            <div class="section-head"><div><p class="eyebrow">00 · Batch Brief</p><h2>${escapeHtml(
              batch.label,
            )} 目标与完成方式</h2></div><div class="source-chip">${escapeHtml(
              batch.statusChip,
            )}</div></div>
            <div class="guide-grid">${batch.guide
              .map(
                (item, index) =>
                  `<article class="info-card"><span class="card-number">${String.fromCharCode(
                    65 + index,
                  )}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(
                    item.body,
                  )}</p></article>`,
              )
              .join("")}</div>
            <div class="callout"><strong>统一判断链</strong>${escapeHtml(
              batch.judgmentChain,
            )}</div>
          </section>
          <section class="section" id="map" data-print-break>
            <div class="section-head"><div><p class="eyebrow">01 · Dependency Map</p><h2>${escapeHtml(
              batch.chapterLabel,
            )}知识依赖</h2></div><div class="source-chip">${escapeHtml(
              batch.mapChip,
            )}</div></div>
            <div class="map-shell"><img src="${escapeHtml(
              batch.mapFile,
            )}" alt="${escapeHtml(batch.mapAlt)}" /></div>
            <div class="map-text">${batch.mapText
              .map(
                (item) =>
                  `<article class="principle-card"><h3>${escapeHtml(
                    item.title,
                  )}</h3><p>${escapeHtml(item.body)}</p></article>`,
              )
              .join("")}</div>
          </section>
          <section class="section" id="terms">
            <div class="section-head"><div><p class="eyebrow">02 · English Terminology</p><h2>按章节整理的英语数学术语</h2></div><div class="source-chip"><span id="term-count">${termCount} 个术语</span><br />中英对照 + 条件</div></div>
            <div class="term-tools no-print"><div><button type="button" class="filter-button is-active" data-term-filter="all">全部</button>${batch.chapters
              .map(
                (chapter) =>
                  `<button type="button" class="filter-button" data-term-filter="${chapter.number}">第${chapter.number}章</button>`,
              )
              .join("")}</div><div><label class="sr-only" for="term-table-search">筛选术语</label><input id="term-table-search" type="search" placeholder="筛选英文、中文或定义…" /><span id="term-visible-count-table" class="small-note"></span></div></div>
            <div class="table-wrap"><table class="term-table"><thead><tr><th>English</th><th>中文</th><th>简明定义</th><th>节</th><th>关键公式 / 记号</th></tr></thead><tbody id="term-body"></tbody></table></div><div id="term-empty" class="empty-state">没有匹配的术语。</div>
          </section>
          ${batch.chapters.map(chapterSection).join("")}
          <section class="section" id="practice">
            <div class="section-head"><div><p class="eyebrow">05 · Deliberate Practice</p><h2>${escapeHtml(
              batch.label,
            )} 原创练习</h2></div><div class="source-chip">${exerciseCount}道新题<br />${batch.chapters
              .map(
                (chapter) =>
                  `第${chapter.number}章${batch.exercises.filter((exercise) => exercise.chapter === String(chapter.number)).length}`,
              )
              .join(" + ")}</div></div>
            <p class="section-intro">题目覆盖概念辨析、计算、证明/说明、应用和综合；先独立作答，再展开提示、关键步骤与完整解析。</p>
            <div class="exercise-tools no-print"><label class="sr-only" for="exercise-search">筛选练习</label><input id="exercise-search" type="search" placeholder="按编号、题型、难度或知识点筛选…" /><span id="exercise-visible-count" class="small-note"></span></div><div id="exercise-empty" class="empty-state search-empty">没有匹配的题目。</div>${batch.chapters
              .map(
                (chapter) =>
                  `<div class="chapter-divider"><span>CHAPTER ${chapter.number} · ${batch.exercises.filter((exercise) => exercise.chapter === String(chapter.number)).length} QUESTIONS</span></div><div id="chapter-${chapter.number}-exercises" class="exercise-grid"></div>`,
              )
              .join("")}
          </section>
          <section class="section" id="review">
            <div class="section-head"><div><p class="eyebrow">06 · Recall &amp; Diagnosis</p><h2>${escapeHtml(
              batch.label,
            )} 自测与薄弱点记录</h2></div><div class="source-chip">本机保存<br />${masteryCount}项自测</div></div>
            <div class="progress-card"><div class="progress-line"><span>掌握清单完成度</span><span class="progress-value">0 / ${masteryCount}</span></div><div class="progress-track"><div class="progress-fill"></div></div></div>
            <div class="review-grid">${reviewCards}</div>
            <h3>错题与薄弱点记录</h3><div class="table-wrap"><table class="error-table"><thead><tr><th>练习编号 / 知识点</th><th>错误类型</th><th>应回看的内容</th></tr></thead><tbody>${[1, 2, 3]
              .map(
                (row) =>
                  `<tr><td><input data-error-field="${batch.id.toLowerCase()}-row${row}-id" placeholder="编号 / 知识点" /></td><td><textarea data-error-field="${batch.id.toLowerCase()}-row${row}-error" placeholder="条件、符号、边界或推导错误…"></textarea></td><td><textarea data-error-field="${batch.id.toLowerCase()}-row${row}-review" placeholder="定理条件、教材例题与页码…"></textarea></td></tr>`,
              )
              .join("")}</tbody></table></div><p id="error-status" class="small-note">尚未编辑</p>
          </section>
          <section class="section" id="qa">
            <div class="section-head"><div><p class="eyebrow">07 · PDF Quality Gate</p><h2>${escapeHtml(
              batch.label,
            )} 内容与 PDF 检查</h2></div><div class="source-chip">G1–G10<br />${escapeHtml(
              batch.qaStatusLabel,
            )}</div></div>
            <div class="callout"><strong>校准备目标</strong>${batch.qaGoal}</div>
            <div class="table-wrap"><table><thead><tr><th>检查项</th><th>结果</th><th>证据 / 说明</th><th>缺陷等级</th></tr></thead><tbody>${qaRows}</tbody></table></div>
            <div class="callout ${batch.status === "passed" ? "answer" : "warning"}"><strong>当前 PDF 检查结论</strong>${escapeHtml(
              batch.qaConclusion,
            )}</div>
          </section>
          <section class="section" id="source">
            <div class="section-head"><div><p class="eyebrow">08 · Source Ledger</p><h2>${escapeHtml(
              batch.label,
            )} 来源与页码映射</h2></div><div class="source-chip">唯一教材原本<br />${escapeHtml(
              batch.sourceChip,
            )}</div></div>
            <div class="table-wrap"><table><thead><tr><th>节</th><th>教材页</th><th>PDF物理页</th><th>内部标题</th></tr></thead><tbody>${sourceRows}</tbody></table></div>
            <div class="callout warning"><strong>来源边界</strong>本页只依据指定 Thomas 教材原本。旧复习稿、课程说明、试卷、其他版本和外部网页均不进入内容链；教材例题只记录方法结构、必要结论和位置。</div>
            <div class="guide-grid"><article class="info-card"><h3>公式源文件</h3><p><a href="source/formulas.tex" download>下载${escapeHtml(
              batch.label,
            )} LaTeX公式源文件</a></p></article><article class="info-card"><h3>知识图源文件</h3><p><a href="source/mindmap.mmd" download>下载${escapeHtml(
              batch.label,
            )} Mermaid源文件</a></p></article><article class="info-card"><h3>批次说明</h3><p>${escapeHtml(
              batch.qaStatusLabel,
            )}<br />${batch.previous ? `上一批 ${escapeHtml(batch.previous.label)}` : ""}</p><p>${escapeHtml(
              batch.next || "",
            )}</p></article></div>
          </section>
        </div>
        <footer class="footer-note">${escapeHtml(batch.footer)}</footer>
      </main>
    </div>
    <script src="../../assets/vendor/katex/katex.min.js"></script>
    <script src="batch-content.js"></script>
    <script src="../../assets/app.js"></script>
  </body>
</html>
`;

const printableHtml = html.replaceAll("–", "-").replaceAll("—", "-");

await fs.mkdir(batchRoot, { recursive: true });
await fs.writeFile(path.join(batchRoot, "index.html"), printableHtml, "utf8");
await fs.writeFile(path.join(batchRoot, "batch-content.js"), contentJavascript, "utf8");
console.log(
  JSON.stringify({
    batch: batch.label,
    batchRoot,
    terms: termCount,
    exercises: exerciseCount,
    formulas: formulaCount,
    mastery: masteryCount,
  }),
);
