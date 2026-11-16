import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const SITE_ROOT = "F:/数学学习/output/study-site";
const OUTPUT_ROOT = "F:/数学学习/output";
const SOURCE_PDF = "F:/数学学习/tmp/source/Thomas Calculus 14th Edition in SI Units (1).pdf";
const SOURCE_SHA = "03597823863F899FD71847F306551DA6CF70D3D327578B62C7FFAB4C136CEB39";

const currentRootHtml = await fs.readFile(path.join(SITE_ROOT, "index.html"), "utf8");
if (/第\s*4[–-]5\s*章示范版/.test(currentRootHtml) && !/unified-site/.test(currentRootHtml)) {
  const archivedRoot = currentRootHtml
    .replaceAll('href="assets/', 'href="../../assets/')
    .replaceAll('src="assets/', 'src="../../assets/')
    .replaceAll('src="content.js"', 'src="../../content.js"')
    .replaceAll('href="batches/', 'href="../../batches/')
    .replaceAll('href="../pdf/', 'href="../../../pdf/')
    .replaceAll('href="source/', 'href="../../source/')
    .replace(
      /<body([^>]*)>/i,
      '<body$1><div style="padding:10px 16px;background:#123a34;color:#fff;font:13px/1.6 Microsoft YaHei,Arial,sans-serif;"><a href="../../index.html" style="color:#fff;font-weight:700;">返回统一学习站</a><span style="margin-left:16px;color:rgba(255,255,255,.7);">历史金样：第 4-5 章</span></div>',
    );
  await fs.mkdir(path.join(SITE_ROOT, "archive", "b0-golden"), { recursive: true });
  await fs.writeFile(path.join(SITE_ROOT, "archive", "b0-golden", "index.html"), archivedRoot);
}

const sourcePages = {
  B0: { path: "archive/b0-golden/index.html", chapters: [4, 5], progressKey: "thomas-ch4-5-mastery-v1" },
  B1: { path: "batches/b01-ch01-02/index.html", chapters: [1, 2], progressKey: "thomas-b01-mastery-v1" },
  B2: { path: "batches/b02-ch03-04/index.html", chapters: [3], progressKey: "thomas-b02-mastery-v1" },
  B3: { path: "batches/b03-ch05-06/index.html", chapters: [6], progressKey: "thomas-b03-mastery-v1" },
  B4: { path: "batches/b04-ch07-08/index.html", chapters: [7, 8], progressKey: "thomas-b04-mastery-v1" },
  B5: { path: "batches/b05-ch09-10/index.html", chapters: [9, 10], progressKey: "thomas-b05-mastery-v1" },
  B6: { path: "batches/b06-ch11-12/index.html", chapters: [11, 12], progressKey: "thomas-b06-mastery-v1" },
  B7: { path: "batches/b07-ch13-14/index.html", chapters: [13, 14], progressKey: "thomas-b07-mastery-v1" },
  B8: { path: "batches/b08-ch15-16/index.html", chapters: [15, 16], progressKey: "thomas-b8-mastery-v1" },
  B9: { path: "batches/b09-ch17/index.html", chapters: [17], progressKey: "thomas-b9-mastery-v1" },
};

const chapterSources = [
  { chapter: 1, batch: "B1", source: "B1", pages: "19-55", pdf: "Thomas_Calculus_第1章至2章_B1质量校准稿.pdf" },
  { chapter: 2, batch: "B1", source: "B1", pages: "56-119", pdf: "Thomas_Calculus_第1章至2章_B1质量校准稿.pdf" },
  { chapter: 3, batch: "B2", source: "B2", pages: "120-200", pdf: "Thomas_Calculus_第3章至4章_B2质量校准稿.pdf" },
  { chapter: 4, batch: "B0", source: "B0", pages: "201-265", pdf: "Thomas_Calculus_第4章至5章_示范学习资料.pdf" },
  { chapter: 5, batch: "B0", source: "B0", pages: "266-331", pdf: "Thomas_Calculus_第4章至5章_示范学习资料.pdf" },
  { chapter: 6, batch: "B3", source: "B3", pages: "332-387", pdf: "Thomas_Calculus_第5章至6章_B3质量校准稿.pdf" },
  { chapter: 7, batch: "B4", source: "B4", pages: "388-459", pdf: "Thomas_Calculus_第7章至8章_B4质量校准稿.pdf" },
  { chapter: 8, batch: "B4", source: "B4", pages: "465-523", pdf: "Thomas_Calculus_第7章至8章_B4质量校准稿.pdf" },
  { chapter: 9, batch: "B5", source: "B5", pages: "530-609", pdf: "Thomas_Calculus_第9章至10章_B5质量校准稿.pdf" },
  { chapter: 10, batch: "B5", source: "B5", pages: "616-660", pdf: "Thomas_Calculus_第9章至10章_B5质量校准稿.pdf" },
  { chapter: 11, batch: "B6", source: "B6", pages: "667-709", pdf: "Thomas_Calculus_第11章至12章_B6质量校准稿.pdf" },
  { chapter: 12, batch: "B6", source: "B6", pages: "716-753", pdf: "Thomas_Calculus_第11章至12章_B6质量校准稿.pdf" },
  { chapter: 13, batch: "B7", source: "B7", pages: "759-849", pdf: "Thomas_Calculus_第13章至14章_B7质量校准稿.pdf" },
  { chapter: 14, batch: "B7", source: "B7", pages: "850-921", pdf: "Thomas_Calculus_第13章至14章_B7质量校准稿.pdf" },
  { chapter: 15, batch: "B8", source: "B8", pages: "922-1015", pdf: "Thomas_Calculus_第15章至16章_B8质量校准稿.pdf" },
  { chapter: 16, batch: "B8", source: "B8", pages: "1016-1052", pdf: "Thomas_Calculus_第15章至16章_B8质量校准稿.pdf" },
  { chapter: 17, batch: "B9", source: "B9", pages: "17-1-17-29", pdf: "Thomas_Calculus_第17章_B9质量校准稿.pdf" },
];

const chapterSlugs = {
  1: "functions",
  2: "limits-continuity",
  3: "derivatives",
  4: "applications-derivatives",
  5: "integrals",
  6: "applications-definite-integrals",
  7: "transcendental-functions",
  8: "integration-techniques",
  9: "sequences-series",
  10: "parametric-polar",
  11: "vectors-space",
  12: "vector-functions-motion",
  13: "partial-derivatives",
  14: "multiple-integrals",
  15: "vector-fields",
  16: "first-order-equations",
  17: "second-order-equations",
};

const groupMeta = [
  { title: "函数与极限", range: [1, 2], note: "先建立函数、图像、极限与连续性的共同语言。" },
  { title: "微分及其应用", range: [3, 4], note: "从导数的局部意义走向极值、曲线和应用优化。" },
  { title: "积分及其应用", range: [5, 6], note: "从 Riemann 和走向累积量、几何与物理应用。" },
  { title: "超越函数与积分技巧", range: [7, 8], note: "扩展函数族，并建立可靠的积分方法选择。" },
  { title: "级数与参数曲线", range: [9, 10], note: "研究无限过程、近似，以及参数和极坐标表示。" },
  { title: "空间向量与运动", range: [11, 12], note: "从三维几何进入向量值函数、曲率和运动。" },
  { title: "多变量微积分", range: [13, 14], note: "把局部导数和累积积分推广到多元与空间区域。" },
  { title: "向量场与微分方程", range: [15, 17], note: "统一边界与内部积分，并用微分方程描述动态系统。" },
];

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const slugForChapter = (number) => `ch${String(number).padStart(2, "0")}-${chapterSlugs[number]}`;
const hrefForChapter = (number, prefix = "") => `${prefix}chapters/${slugForChapter(number)}/index.html`;

function stripDangerousHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+="[^"]*"/gi, "")
    .replace(/\son[a-z]+='[^']*'/gi, "");
}

function normalizeChapterHtml(html, chapter) {
  let value = stripDangerousHtml(html);
  value = value.replaceAll('data-id="b8-', 'data-id="F-');
  value = value.replaceAll('data-id="b9-', 'data-id="F-');
  value = value.replace(/href="\.\.\/\.\.\/index\.html(?:#[^"]*)?"/g, 'href="../../index.html"');
  value = value.replace(/href="\.\.\/index\.html(?:#[^"]*)?"/g, 'href="../../index.html"');
  value = value.replace(/href="source\/[^"%]+"/g, 'href="#" data-disabled-link="source"');
  return value;
}

function canonicalReviewHtml(html, chapter, batchProgressKey) {
  const role = batchProgressKey;
  let index = 0;
  const normalized = html.replace(
    /<input([^>]*?)data-mastery="([^"]+)"([^>]*?)\/?>/g,
    (_match, before, legacyId, after) => {
      index += 1;
      const canonicalId = `M${String(chapter).padStart(2, "0")}-${String(index).padStart(2, "0")}`;
      return `<input${before}data-mastery="${canonicalId}" data-legacy-mastery="${escapeHtml(
        legacyId,
      )}" data-legacy-store="${escapeHtml(role)}"${after} />`;
    },
  );
  return normalized.replace(
    "<article class=\"review-card\"",
    `<article class="review-card" data-review-chapter="${chapter}"`,
  );
}

function header(root, active = "") {
  const links = [
    ["", "学习首页"],
    ["guide/", "使用说明"],
    ["overview/", "全书结构"],
    ["chapters/", "章节目录"],
    ["terminology/", "术语"],
    ["exercises/", "练习"],
    ["review/", "复习"],
    ["reference/", "公式索引"],
    ["downloads/", "下载"],
  ];
  return `
    <header class="site-header">
      <a class="site-brand" href="${root}index.html" aria-label="Thomas 微积分学习站首页">
        <span class="site-brand-mark">T</span>
        <span><strong>Thomas 微积分</strong><small>全书学习站</small></span>
      </a>
      <button class="site-menu-button" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-navigation">目录</button>
      <nav class="site-nav" id="site-navigation" aria-label="全站主导航">
        ${links
          .map(
            ([href, label]) =>
              `<a href="${root}${href}index.html"${active !== "__none__" && active === href ? ' aria-current="page"' : ""}>${label}</a>`,
          )
          .join("")}
      </nav>
      <button class="site-search-button" type="button" data-search-open aria-label="搜索全站">
        <span>搜索</span><kbd>/</kbd>
      </button>
    </header>`;
}

function searchOverlay(root) {
  return `
    <div class="site-search-dialog" data-search-dialog hidden>
      <div class="site-search-backdrop" data-search-close></div>
      <section class="site-search-panel" role="dialog" aria-modal="true" aria-labelledby="site-search-title">
        <div class="site-search-head"><h2 id="site-search-title">搜索全书</h2><button type="button" data-search-close aria-label="关闭搜索">关闭</button></div>
        <label for="site-search-input">输入章节、英文术语、中文术语、公式或题号</label>
        <input id="site-search-input" type="search" autocomplete="off" placeholder="例如 derivative、Green 定理、Q13-04" />
        <div class="site-search-filters"><button type="button" class="is-active" data-search-type="all">全部</button><button type="button" data-search-type="chapter">章节</button><button type="button" data-search-type="term">术语</button><button type="button" data-search-type="formula">公式</button><button type="button" data-search-type="exercise">练习</button></div>
        <div class="site-search-results" data-search-results></div>
        <p class="site-search-hint">Esc 关闭；结果最多显示 40 项。</p>
      </section>
    </div>`;
}

function footer(root) {
  return `
    <footer class="site-footer">
      <div><strong>Thomas 微积分全书学习站</strong><p>中文学习资料、英文术语、LaTeX 公式、分层练习与打印稿。</p></div>
      <div class="site-footer-links"><a href="${root}source/index.html">来源与版本</a><a href="${root}archive/index.html">批次归档</a><a href="${root}quality/index.html">项目质量</a></div>
    </footer>`;
}

function pageShell({ root = "../", active = "__none__", title, description, body, bodyClass = "", scripts = "" }) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${root}assets/vendor/katex/katex.min.css" />
    <link rel="stylesheet" href="${root}assets/styles.css" />
    <link rel="stylesheet" href="${root}assets/site.css" />
  </head>
  <body class="unified-site ${bodyClass}">
    <a class="skip-link" href="#main-content">跳到正文</a>
    ${header(root, active)}
    <main id="main-content">${body}</main>
    ${footer(root)}
    ${searchOverlay(root)}
    <script src="${root}data/search-index.js"></script>
    <script src="${root}assets/site.js"></script>
    ${scripts}
  </body>
</html>`;
}

function renderTerms(terms) {
  return terms
    .map(
      (term) =>
        `<tr data-term-row data-chapter="${term.chapter}" data-search="${escapeHtml(
          [term.id, term.en, term.zh, term.definition, term.section, term.note || ""].join(" "),
        )}"><td><code>${escapeHtml(term.id)}</code></td><td>${escapeHtml(term.en)}</td><td>${escapeHtml(
          term.zh,
        )}</td><td>${escapeHtml(term.definition)}</td><td>${escapeHtml(term.section)}</td><td>${escapeHtml(
          term.note || "",
        )}</td></tr>`,
    )
    .join("");
}

function renderExerciseCard(exercise, root = "../../") {
  return `<article class="exercise-card canonical-exercise" data-exercise data-chapter="${exercise.chapter}" data-type="${escapeHtml(
    exercise.type,
  )}" data-level="${escapeHtml(exercise.level)}" data-search="${escapeHtml(
    [exercise.id, exercise.type, exercise.level, exercise.section, exercise.topic, exercise.promptText].join(" "),
  )}">
    <div class="exercise-head"><span class="exercise-id">${escapeHtml(
      exercise.id,
    )}</span><span class="tag teal">${escapeHtml(exercise.type)}</span><span class="tag orange">${escapeHtml(
      exercise.level,
    )}</span></div>
    <p class="exercise-meta">第 ${exercise.chapter} 章 · ${escapeHtml(exercise.section)} · ${escapeHtml(
      exercise.topic,
    )}</p>
    <div class="exercise-prompt">${exercise.prompt}</div>
    <details><summary>提示</summary><div class="details-body">${exercise.hint}</div></details>
    <details><summary>关键步骤</summary><div class="details-body">${exercise.steps}</div></details>
    <details><summary>完整解析</summary><div class="details-body">${exercise.solution}</div></details>
  </article>`;
}

function chapterNav(number, root = "../../") {
  const previous = number > 1 ? `<a class="chapter-step" href="${hrefForChapter(number - 1, root)}">上一章 <span>${number - 1}</span></a>` : `<span></span>`;
  const next = number < 17 ? `<a class="chapter-step next" href="${hrefForChapter(number + 1, root)}">下一章 <span>${number + 1}</span></a>` : `<span></span>`;
  return `<nav class="chapter-pager" aria-label="章节前后导航">${previous}${next}</nav>`;
}

function groupForChapter(number) {
  return groupMeta.find((group) => number >= group.range[0] && number <= group.range[1]);
}

function chapterNavigation(root = "../") {
  return chapterSources
    .map(
      ({ chapter }) =>
        `<a href="${hrefForChapter(chapter, root)}" data-chapter-link="${chapter}"><span>${String(chapter).padStart(
          2,
          "0",
        )}</span><strong>第 ${chapter} 章</strong></a>`,
    )
    .join("");
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const collected = {};
const extractionErrors = [];

for (const [batchId, def] of Object.entries(sourcePages)) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("pageerror", (error) => extractionErrors.push(`${batchId}: ${error.message}`));
  await page.goto(pathToFileURL(path.resolve(SITE_ROOT, def.path)).href, { waitUntil: "load" });
  await page.waitForTimeout(450);
  const data = await page.evaluate(
    ({ chapters, progressKey }) => {
      const content = window.STUDY_CONTENT || { terms: [], exercises: [] };
      const esc = (value) =>
        String(value ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
      const chapterOfTerm = (term) => String(term.chapter || String(term.section || "").split(".")[0]);
      return {
        progressKey,
        terms: content.terms,
        exercises: content.exercises,
        chapters: chapters.map((number) => {
          const element = document.getElementById(`chapter-${number}`);
          const review = [...document.querySelectorAll(".review-card")].find((candidate) => {
            const heading = candidate.querySelector("h3")?.textContent || "";
            return new RegExp(`第\\s*${number}\\s*章(?:自测|自测清单)`).test(heading);
          });
          return {
            number,
            html: element?.innerHTML || "",
            reviewHtml: review?.outerHTML || "",
            terms: content.terms.filter((term) => chapterOfTerm(term) === String(number)),
            exercises: content.exercises.filter((exercise) => String(exercise.chapter) === String(number)),
            formulas: [...(element?.querySelectorAll(".formula.katex-rendered") || [])].map(
              (formula, index) => {
                const card = formula.closest(".formula-card");
                const sectionTitle = formula.closest(".section-block")?.querySelector("h3")?.textContent?.trim();
                const originalId = formula.id || `${number}-formula-${index + 1}`;
                return {
                  originalId,
                  title: card?.querySelector("h4")?.textContent?.trim() || sectionTitle || `Formula ${index + 1}`,
                  condition:
                    card?.querySelector(".condition")?.textContent?.trim() ||
                    "该公式位于本节正文或例题表中；使用时请同时核对所在节的条件。",
                  html: formula.outerHTML,
                };
              },
            ),
            sections: [...(element?.querySelectorAll(".section-block") || [])].map((section) => ({
              id: section.id,
              title: section.querySelector("h3")?.textContent?.trim() || "",
            })),
          };
        }),
      };
    },
    { chapters: def.chapters, progressKey: def.progressKey },
  );
  collected[batchId] = data;
  await page.close();
}

await browser.close();

const titleMap = {};
for (const item of chapterSources) {
  const source = collected[item.source];
  const chapter = source?.chapters.find((entry) => entry.number === item.chapter);
  const parser = {
    text(html) {
      return String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    },
  };
  const h3 = chapter?.html.match(/<h3>([\s\S]*?)<\/h3>/)?.[1] || "";
  titleMap[item.chapter] = parser.text(h3) || `Chapter ${item.chapter}`;
}

/*** DOMParser is unavailable in Node. Re-extract titles from known manifest below. ***/
const manifestPath = path.join(SITE_ROOT, "book-manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
for (const chapter of manifest.chapters) {
  titleMap[chapter.number] = chapter.title.replace(" (Online)", "");
}

const chapters = chapterSources.map((item) => {
  const source = collected[item.source];
  const data = source?.chapters.find((entry) => entry.number === item.chapter);
  if (!data || !data.html) throw new Error(`Missing canonical chapter ${item.chapter} from ${item.source}`);
  const terms = data.terms
    .map((term, index) => ({
      ...term,
      chapter: String(item.chapter),
      id: `T${String(item.chapter).padStart(2, "0")}-${String(index + 1).padStart(3, "0")}`,
      note:
        term.note && typeof term.note === "object"
          ? term.note.display || term.note.tex || ""
          : term.note || "",
    }))
    .sort((a, b) => a.section.localeCompare(b.section, "en", { numeric: true }) || a.en.localeCompare(b.en));
  const exercises = data.exercises
    .map((exercise) => ({ ...exercise, chapter: String(item.chapter) }))
    .sort((a, b) => Number(a.order) - Number(b.order));
  const formulas = data.formulas.map((formula, index) => ({
    ...formula,
    chapter: String(item.chapter),
    id: `F${String(item.chapter).padStart(2, "0")}-${String(index + 1).padStart(3, "0")}`,
  }));
  return {
    ...item,
    number: item.chapter,
    slug: slugForChapter(item.chapter),
    title: titleMap[item.chapter],
    group: groupForChapter(item.chapter),
    html: normalizeChapterHtml(data.html, item.chapter),
    reviewHtml: canonicalReviewHtml(data.reviewHtml, item.chapter, source.progressKey),
    sections: data.sections,
    terms,
    exercises,
    formulas,
  };
});

if (extractionErrors.length) throw new Error(`Page extraction errors: ${extractionErrors.join("; ")}`);

const allTerms = chapters.flatMap((chapter) => chapter.terms);
const allExercises = chapters.flatMap((chapter) => chapter.exercises);
const allFormulas = chapters.flatMap((chapter) => chapter.formulas);
const totalTerms = allTerms.length;
const totalExercises = allExercises.length;
const totalFormulas = allFormulas.length;

const canonicalBook = {
  schemaVersion: "thomas-canonical-book-v1",
  textbook: "Thomas' Calculus, Fourteenth Edition in SI Units",
  sourcePdfSha256: SOURCE_SHA,
  generatedFrom: Object.fromEntries(Object.entries(sourcePages).map(([id, def]) => [id, def.path])),
  metrics: { chapters: chapters.length, terms: totalTerms, exercises: totalExercises, formulas: totalFormulas },
  chapters: chapters.map((chapter) => ({
    number: chapter.number,
    slug: chapter.slug,
    title: chapter.title,
    batch: chapter.batch,
    reviewedPages: chapter.pages,
    pdf: chapter.pdf,
    sections: chapter.sections,
    termCount: chapter.terms.length,
    exerciseCount: chapter.exercises.length,
    formulaCount: chapter.formulas.length,
  })),
};

await fs.mkdir(path.join(SITE_ROOT, "data"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "data", "canonical-book.js"),
  `window.CANONICAL_BOOK = ${JSON.stringify(canonicalBook, null, 2)};\n`,
);

const searchEntries = [
  ...chapters.map((chapter) => ({
    type: "chapter",
    title: `第 ${chapter.number} 章 ${chapter.title}`,
    text: `${chapter.title} ${chapter.sections.map((section) => section.title).join(" ")}`,
    url: hrefForChapter(chapter.number, ""),
  })),
  ...allTerms.map((term) => ({
    type: "term",
    title: `${term.en} · ${term.zh}`,
    text: `${term.definition} ${term.section} ${term.note || ""}`,
    url: `${hrefForChapter(Number(term.chapter), "")}#term-${term.id}`,
  })),
  ...allFormulas.map((formula) => ({
    type: "formula",
    title: `${formula.title} · 第 ${formula.chapter} 章`,
    text: formula.condition,
    url: `${hrefForChapter(Number(formula.chapter), "")}#${formula.originalId}`,
  })),
  ...allExercises.map((exercise) => ({
    type: "exercise",
    title: `${exercise.id} · ${exercise.topic}`,
    text: `${exercise.type} ${exercise.level} ${exercise.section} ${exercise.promptText}`,
    url: `${hrefForChapter(Number(exercise.chapter), "")}#exercise-${exercise.id}`,
  })),
];
await fs.writeFile(
  path.join(SITE_ROOT, "data", "search-index.js"),
  `window.SEARCH_INDEX = ${JSON.stringify(searchEntries, null, 2)};\n`,
);

for (const chapter of chapters) {
  const dir = path.join(SITE_ROOT, "chapters", chapter.slug);
  await fs.mkdir(dir, { recursive: true });
  const termRows = chapter.terms
    .map(
      (term) =>
        `<tr id="term-${term.id}" data-term-row><td><code>${term.id}</code></td><td>${escapeHtml(
          term.en,
        )}</td><td>${escapeHtml(term.zh)}</td><td>${escapeHtml(term.definition)}</td><td>${escapeHtml(
          term.section,
        )}</td></tr>`,
    )
    .join("");
  const exerciseCards = chapter.exercises
    .map((exercise) => renderExerciseCard(exercise).replace("<article ", `<article id="exercise-${exercise.id}" `))
    .join("");
  const body = `
    <div class="chapter-page">
      <aside class="chapter-spine" aria-label="全文章节导航">
        <a class="spine-home" href="../../chapters/index.html">全部章节</a>
        <nav>${chapterNavigation("../../")}</nav>
      </aside>
      <article class="reader">
        <nav class="breadcrumbs" aria-label="面包屑"><a href="../../index.html">首页</a><span>/</span><a href="../../chapters/index.html">章节</a><span>/</span><span>第 ${chapter.number} 章</span></nav>
        <header class="chapter-hero">
          <p class="chapter-group">${escapeHtml(chapter.group.title)}</p>
          <div class="chapter-number">${String(chapter.number).padStart(2, "0")}</div>
          <div><h1>${escapeHtml(chapter.title)}</h1><p>教材页 ${escapeHtml(chapter.pages)} · ${chapter.terms.length} 个术语 · ${chapter.exercises.length} 道练习 · ${chapter.formulas.length} 个公式</p></div>
          <a class="chapter-pdf-link" href="../../../pdf/${encodeURIComponent(chapter.pdf)}">下载本章 PDF</a>
        </header>
        <div class="chapter-quicklinks"><a href="#chapter-content">章概要</a><a href="#chapter-terms">英语术语</a><a href="#chapter-exercises">分层练习</a><a href="#chapter-review">自测</a><a href="../../archive/index.html">批次快照：${chapter.batch}</a></div>
        <div class="reader-grid">
          <div class="reader-main">
            <section class="canonical-rich-content" id="chapter-content">${chapter.html}</section>
            <section class="canonical-block" id="chapter-terms"><div class="canonical-block-head"><div><p class="mini-label">Terminology</p><h2>本章专业英语术语</h2></div><a href="../../terminology/index.html">打开术语中心</a></div><div class="table-wrap"><table class="term-table"><thead><tr><th>ID</th><th>English</th><th>中文</th><th>简明定义</th><th>节</th></tr></thead><tbody>${termRows}</tbody></table></div></section>
            <section class="canonical-block" id="chapter-exercises"><div class="canonical-block-head"><div><p class="mini-label">Practice</p><h2>本章分层练习</h2></div><a href="../../exercises/index.html">打开练习中心</a></div><div class="exercise-grid">${exerciseCards}</div></section>
            <section class="canonical-block" id="chapter-review"><div class="canonical-block-head"><div><p class="mini-label">Self-check</p><h2>本章自测</h2></div><a href="../../review/index.html">复习与错题记录</a></div><div class="progress-card"><div class="progress-line"><span>本章掌握清单</span><span class="progress-value">0 / ${(chapter.reviewHtml.match(/data-mastery=/g) || []).length}</span></div><div class="progress-track"><div class="progress-fill"></div></div></div>${chapter.reviewHtml || "<p>本章自测记录待补。</p>"}</section>
            <nav class="chapter-pager" aria-label="章节前后导航">${chapter.number > 1 ? `<a class="chapter-step" href="../${slugForChapter(chapter.number - 1)}/index.html">上一章 <span>${chapter.number - 1}</span></a>` : "<span></span>"}${chapter.number < 17 ? `<a class="chapter-step next" href="../${slugForChapter(chapter.number + 1)}/index.html">下一章 <span>${chapter.number + 1}</span></a>` : "<span></span>"}</nav>
          </div>
          <aside class="reader-sidebar"><div class="reader-toc"><p>本章目录</p>${chapter.sections.map((section) => `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a>`).join("")}</div><div class="reader-source"><p>来源范围</p><strong>教材页 ${escapeHtml(chapter.pages)}</strong><span>批次 ${chapter.batch}</span><a href="../../source/index.html">来源与版本</a></div></aside>
        </div>
      </article>
    </div>`;
  const html = pageShell({
    root: "../../",
    active: "chapters/",
    title: `第 ${chapter.number} 章 ${chapter.title}｜Thomas 微积分学习站`,
    description: `Thomas 微积分第 ${chapter.number} 章中文概要、专业英语术语、公式、分层练习与自测。`,
    body,
    bodyClass: "chapter-body",
  });
  await fs.writeFile(path.join(dir, "index.html"), html);
}

const chapterRows = chapters
  .map(
    (chapter) =>
      `<a class="structure-row" href="${hrefForChapter(chapter.number, "../")}"><span class="structure-number">${String(
        chapter.number,
      ).padStart(2, "0")}</span><span class="structure-main"><strong>${escapeHtml(
        chapter.title,
      )}</strong><small>${escapeHtml(chapter.group.title)} · 教材页 ${escapeHtml(
        chapter.pages,
      )}</small></span><span class="structure-counts">${chapter.terms.length} 术语<br />${chapter.exercises.length} 练习</span></a>`,
  )
  .join("");

const chaptersBody = `
  <section class="page-hero compact"><p class="mini-label">Chapter Index</p><h1>17 章章节目录</h1><p>按原教材顺序进入规范章节页。每章包含概要、术语、公式、练习、自测和 PDF。</p></section>
  <div class="page-shell"><div class="structure-list">${chapterRows}</div></div>`;
await fs.mkdir(path.join(SITE_ROOT, "chapters"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "chapters", "index.html"),
  pageShell({
    root: "../",
    active: "chapters/",
    title: "17 章章节目录｜Thomas 微积分学习站",
    description: "Thomas 微积分 17 章统一章节目录。",
    body: chaptersBody,
  }),
);

const groupSections = groupMeta
  .map((group) => {
    const items = chapters.filter((chapter) => group.range.includes(chapter.number) || (chapter.number >= group.range[0] && chapter.number <= group.range[1]));
    return `<section class="overview-group"><h2>${escapeHtml(group.title)}</h2><p>${escapeHtml(group.note)}</p><div class="structure-list">${items
      .map(
        (chapter) =>
          `<a class="structure-row" href="${hrefForChapter(chapter.number, "../")}"><span class="structure-number">${String(
            chapter.number,
          ).padStart(2, "0")}</span><span class="structure-main"><strong>${escapeHtml(
            chapter.title,
          )}</strong><small>${chapter.sections.map((section) => escapeHtml(section.title)).join(" · ")}</small></span></a>`,
      )
      .join("")}</div></section>`;
  })
  .join("");
const overviewBody = `<section class="page-hero"><p class="mini-label">Book Map</p><h1>全书结构一览</h1><p>先看章节依赖，再选择学习入口。17 章按“基础 → 微分 → 积分 → 技巧 → 级数 → 空间 → 多变量 → 向量场与方程”组织。</p><div class="hero-stats"><span><strong>17</strong>章</span><span><strong>${totalTerms}</strong>术语</span><span><strong>${totalExercises}</strong>练习</span><span><strong>${totalFormulas}</strong>公式</span></div></section><div class="page-shell overview-shell">${groupSections}</div>`;
await fs.mkdir(path.join(SITE_ROOT, "overview"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "overview", "index.html"),
  pageShell({
    root: "../",
    active: "overview/",
    title: "全书结构一览｜Thomas 微积分学习站",
    description: "Thomas 微积分 17 章知识结构和前置关系。",
    body: overviewBody,
  }),
);

const guideBody = `<section class="page-hero"><p class="mini-label">How To Use</p><h1>使用说明</h1><p>这是一个离线学习站。你可以从首页、全书结构或任意章节进入，不需要登录，也不需要联网。</p></section><div class="page-shell prose-grid"><article><h2>第一次使用</h2><ol><li>先在“全书结构”确认 17 章主线。</li><li>进入章节，按“学习目标 → 概念 → 公式 → 例题 → 易错点”阅读。</li><li>完成章末练习，依次展开提示、关键步骤和完整解析。</li><li>用自测清单和错题记录检查薄弱点。</li></ol></article><article><h2>学习功能</h2><ul><li>全站搜索支持中英文术语、公式名和题号。</li><li>浏览器会保存自测勾选与错题记录。</li><li>每章可下载独立 A4 PDF。</li><li>批次历史页保留在归档区，不作为主学习路径。</li></ul></article><article><h2>离线与打印</h2><p>KaTeX、字体、样式和脚本都随站点提供。直接打开 <code>index.html</code> 即可；打印时使用各章 PDF，避免浏览器分页差异。</p></article></div>`;
await fs.mkdir(path.join(SITE_ROOT, "guide"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "guide", "index.html"),
  pageShell({
    root: "../",
    active: "guide/",
    title: "使用说明｜Thomas 微积分学习站",
    description: "统一学习站的使用方式、学习路径和离线说明。",
    body: guideBody,
  }),
);

for (const [folder, title, description, render] of [
  [
    "terminology",
    "专业英语术语中心",
    "按章节浏览 Thomas 微积分专业英语术语。",
    () => `<section class="page-hero"><p class="mini-label">Terminology</p><h1>专业英语术语中心</h1><p>${totalTerms} 个术语，支持英文、中文、定义和章节筛选。</p></section><div class="page-shell"><div class="data-toolbar"><input type="search" placeholder="搜索术语、定义或章节…" data-filter-input="term" /><select data-filter-chapter><option value="">全部章节</option>${chapters.map((chapter) => `<option value="${chapter.number}">第 ${chapter.number} 章</option>`).join("")}</select><span data-filter-count="term">${totalTerms} 项</span></div><div class="table-wrap"><table class="term-table"><thead><tr><th>章节 / ID</th><th>English</th><th>中文</th><th>简明定义</th><th>节</th><th>关键公式</th></tr></thead><tbody>${allTerms.map((term) => `<tr id="term-${term.id}" data-term-row data-chapter="${term.chapter}" data-filter-item="term" data-search="${escapeHtml([term.en, term.zh, term.definition, term.section, term.note || ""].join(" "))}"><td><a href="../chapters/${slugForChapter(Number(term.chapter))}/index.html#term-${term.id}">${escapeHtml(term.chapter)} / ${term.id}</a></td><td>${escapeHtml(term.en)}</td><td>${escapeHtml(term.zh)}</td><td>${escapeHtml(term.definition)}</td><td>${escapeHtml(term.section)}</td><td>${escapeHtml(term.note || "")}</td></tr>`).join("")}</tbody></table></div></div>`,
  ],
  [
    "exercises",
    "分层练习中心",
    "按章节、题型和难度浏览全部原创练习。",
    () => `<section class="page-hero"><p class="mini-label">Practice</p><h1>分层练习中心</h1><p>${totalExercises} 道原创练习，覆盖概念辨析、计算、证明/说明、应用和综合。</p></section><div class="page-shell"><div class="data-toolbar"><input type="search" placeholder="搜索题号、知识点或题干…" data-filter-input="exercise" /><select data-filter-chapter><option value="">全部章节</option>${chapters.map((chapter) => `<option value="${chapter.number}">第 ${chapter.number} 章</option>`).join("")}</select><span data-filter-count="exercise">${totalExercises} 题</span></div><div class="exercise-grid" data-filter-container="exercise">${allExercises.map((exercise) => renderExerciseCard(exercise).replace("<article ", `<article id="exercise-${exercise.id}" data-filter-item="exercise" `)).join("")}</div></div>`,
  ],
  [
    "reference",
    "公式、定理与结论索引",
    "按章节统一浏览公式、条件与来源。",
    () => `<section class="page-hero"><p class="mini-label">Reference</p><h1>公式、定理与结论索引</h1><p>${totalFormulas} 个已渲染公式卡。每个公式保留适用条件，并可回到所属章节。</p></section><div class="page-shell"><div class="data-toolbar"><input type="search" placeholder="搜索公式标题、条件或章节…" data-filter-input="formula" /><span data-filter-count="formula">${totalFormulas} 项</span></div><div class="formula-index">${allFormulas.map((formula) => `<article id="formula-${formula.id}" data-filter-item="formula" data-chapter="${formula.chapter}" data-search="${escapeHtml([formula.id, formula.title, formula.condition, formula.chapter].join(" "))}"><header><span>${formula.id} · 第 ${formula.chapter} 章</span><h2>${escapeHtml(formula.title)}</h2><p>${escapeHtml(formula.condition)}</p></header>${formula.html.replace(/data-id="[^"]*"/, `data-id="${formula.id}"`)}<a href="../chapters/${slugForChapter(Number(formula.chapter))}/index.html#${escapeHtml(formula.originalId)}">回到所属章节</a></article>`).join("")}</div></div>`,
  ],
]) {
  await fs.mkdir(path.join(SITE_ROOT, folder), { recursive: true });
  await fs.writeFile(
    path.join(SITE_ROOT, folder, "index.html"),
    pageShell({
      root: "../",
      active: `${folder}/`,
      title,
      description,
      body: render(),
    }),
  );
}

const reviewCards = chapters.map((chapter) => chapter.reviewHtml).join("");
const totalMastery = chapters.reduce(
  (sum, chapter) => sum + (chapter.reviewHtml.match(/data-mastery=/g) || []).length,
  0,
);
const reviewBody = `<section class="page-hero"><p class="mini-label">Review</p><h1>复习与自测</h1><p>逐章勾选自测清单，记录错题和薄弱点。数据保存在当前浏览器。</p></section><div class="page-shell"><div class="progress-card"><div class="progress-line"><span>全书掌握清单</span><span class="progress-value">0 / ${totalMastery}</span></div><div class="progress-track"><div class="progress-fill"></div></div></div><div class="review-grid unified-review-grid">${reviewCards}</div><section class="canonical-block"><h2>错题与薄弱点记录</h2><div class="table-wrap"><table class="error-table"><thead><tr><th>练习 / 知识点</th><th>错误类型</th><th>回看内容</th></tr></thead><tbody>${[1, 2, 3, 4, 5].map((row) => `<tr><td><input data-error-field="row${row}-id" /></td><td><textarea data-error-field="row${row}-error"></textarea></td><td><textarea data-error-field="row${row}-review"></textarea></td></tr>`).join("")}</tbody></table></div><p class="small-note" id="error-status">尚未编辑</p></section></div>`;
await fs.mkdir(path.join(SITE_ROOT, "review"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "review", "index.html"),
  pageShell({
    root: "../",
    active: "review/",
    title: "复习与自测｜Thomas 微积分学习站",
    description: "17 章自测清单与错题记录。",
    body: reviewBody,
  }),
);

const pdfFiles = (await fs.readdir(path.join(OUTPUT_ROOT, "pdf")))
  .filter((name) => name.endsWith(".pdf") && /B[0-9]|示范学习资料/.test(name))
  .sort((a, b) => a.localeCompare(b, "zh-CN"));
const pdfEntries = await Promise.all(
  pdfFiles.map(async (name) => {
    const buffer = await fs.readFile(path.join(OUTPUT_ROOT, "pdf", name));
    return { name, sha256: createHash("sha256").update(buffer).digest("hex").toUpperCase(), bytes: buffer.length };
  }),
);
const downloadBody = `<section class="page-hero"><p class="mini-label">Downloads</p><h1>PDF 与源文件下载</h1><p>PDF 是网站内容的打印和离线版本。下载页同时显示文件大小与 SHA-256。</p></section><div class="page-shell"><div class="download-list">${pdfEntries.map((pdf) => `<article class="download-row"><div><strong>${escapeHtml(pdf.name.replace(/\.pdf$/, ""))}</strong><span>${(pdf.bytes / 1024 / 1024).toFixed(2)} MB</span></div><code>${pdf.sha256}</code><a href="../../pdf/${encodeURIComponent(pdf.name)}" download>下载 PDF</a></article>`).join("")}</div><p class="source-note">教材原 PDF 不随学习站公开分发；网站仅记录来源版本和 SHA-256。</p></div>`;
await fs.mkdir(path.join(SITE_ROOT, "downloads"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "downloads", "index.html"),
  pageShell({
    root: "../",
    active: "downloads/",
    title: "PDF 与源文件下载｜Thomas 微积分学习站",
    description: "Thomas 微积分各章 A4 PDF 和内容源下载。",
    body: downloadBody,
  }),
);

const sourceBody = `<section class="page-hero compact"><p class="mini-label">Source</p><h1>来源、版本与引用</h1><p>唯一教材来源为 Thomas' Calculus, Fourteenth Edition in SI Units。</p></section><div class="page-shell prose-grid"><article><h2>教材版本</h2><p>Thomas' Calculus, Fourteenth Edition in SI Units</p><code>${SOURCE_SHA}</code></article><article><h2>版权边界</h2><p>本站提供原创中文概要、术语整理、知识图、自编练习和必要公式，不复制教材大段正文，也不公开分发教材原 PDF。</p></article><article><h2>页码规则</h2><p>纸质章节使用教材页码；第 17 章是 Online Chapter，使用 17-1 至 17-29 原编号，并附 PDF 物理页。</p></article></div>`;
await fs.mkdir(path.join(SITE_ROOT, "source"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "source", "index.html"),
  pageShell({
    root: "../",
    active: "__none__",
    title: "来源与版本｜Thomas 微积分学习站",
    description: "Thomas 微积分学习站的教材来源、版权边界和页码规则。",
    body: sourceBody,
  }),
);

const archiveLinks = [
  ["B0", "第 4-5 章金样", "archive/b0-golden/index.html"],
  ["B1", "第 1-2 章", "batches/b01-ch01-02/index.html"],
  ["B2", "第 3-4 章", "batches/b02-ch03-04/index.html"],
  ["B3", "第 5-6 章", "batches/b03-ch05-06/index.html"],
  ["B4", "第 7-8 章", "batches/b04-ch07-08/index.html"],
  ["B5", "第 9-10 章", "batches/b05-ch09-10/index.html"],
  ["B6", "第 11-12 章", "batches/b06-ch11-12/index.html"],
  ["B7", "第 13-14 章", "batches/b07-ch13-14/index.html"],
  ["B8", "第 15-16 章", "batches/b08-ch15-16/index.html"],
  ["B9", "第 17 章", "batches/b09-ch17/index.html"],
];
const archiveBody = `<section class="page-hero compact"><p class="mini-label">Archive</p><h1>批次快照归档</h1><p>以下页面保留为历史验收快照。统一学习请从规范章节页进入。</p></section><div class="page-shell"><div class="archive-grid">${archiveLinks.map(([id, label, href]) => `<a class="archive-card" href="../${href}"><strong>${id}</strong><span>${label}</span></a>`).join("")}</div></div>`;
await fs.mkdir(path.join(SITE_ROOT, "archive"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "archive", "index.html"),
  pageShell({
    root: "../",
    active: "__none__",
    title: "批次快照归档｜Thomas 微积分学习站",
    description: "B0-B9 历史批次页面归档。",
    body: archiveBody,
  }),
);

const qualityRows = [
  ["B0", "第 4-5 章", "历史金样", "通过"],
  ["B1", "第 1-2 章", "正式批次", "通过"],
  ["B2", "第 3-4 章", "正式批次", "通过"],
  ["B3", "第 5-6 章", "正式批次", "通过"],
  ["B4", "第 7-8 章", "正式批次", "通过"],
  ["B5", "第 9-10 章", "正式批次", "通过"],
  ["B6", "第 11-12 章", "正式批次", "通过"],
  ["B7", "第 13-14 章", "正式批次", "通过"],
  ["B8", "第 15-16 章", "正式批次", "已通过"],
  ["B9", "第 17 章", "正式批次", "已通过"],
];
const qualityBody = `<section class="page-hero compact"><p class="mini-label">Quality</p><h1>项目质量仪表盘</h1><p>这里记录内容覆盖、批次状态、PDF 哈希和全站审计结果，不属于学生学习主导航。</p></section><div class="page-shell"><div class="quality-summary"><span><strong>17/17</strong>规范章节</span><span><strong>10/10</strong>PDF 映射</span><span><strong>${totalTerms}</strong>术语</span><span><strong>${totalExercises}</strong>练习</span></div><div class="table-wrap"><table><thead><tr><th>批次</th><th>章节</th><th>角色</th><th>状态</th></tr></thead><tbody>${qualityRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="source-note">全站审计结果见 <code>quality/site-audit.json</code>，批次 PDF 哈希见 <code>book-manifest.json</code>。</p></div>`;
await fs.mkdir(path.join(SITE_ROOT, "quality"), { recursive: true });
await fs.writeFile(
  path.join(SITE_ROOT, "quality", "index.html"),
  pageShell({
    root: "../",
    active: "__none__",
    title: "项目质量仪表盘｜Thomas 微积分学习站",
    description: "内容覆盖、批次状态、PDF 哈希和全站质量结果。",
    body: qualityBody,
  }),
);

const homeSpine = chapters
  .map(
    (chapter) =>
      `<a class="home-spine-item" href="${hrefForChapter(chapter.number, "")}"><span>${String(chapter.number).padStart(
        2,
        "0",
      )}</span><strong>${escapeHtml(chapter.title)}</strong><small>${escapeHtml(chapter.group.title)}</small></a>`,
  )
  .join("");
const homeBody = `<section class="home-hero"><div class="home-hero-copy"><p class="mini-label">Thomas Calculus · Book Learning System</p><h1><span>把一学期的微积分，</span><span>收拢成一条</span><span>可走完的路线。</span></h1><p>17 章统一入口，连接章节概要、英语术语、公式条件、分层练习、自测与打印稿。全部内容离线可用。</p><div class="home-actions"><a class="button button-light" href="guide/index.html">先看使用说明</a><a class="button button-ghost" href="overview/index.html">浏览全书结构</a><button class="button button-ghost" type="button" data-search-open>搜索全书</button></div></div><div class="home-stats"><span><strong>17</strong>章节</span><span><strong>${totalTerms}</strong>术语</span><span><strong>${totalExercises}</strong>练习</span><span><strong>${totalFormulas}</strong>公式</span><span><strong>${pdfEntries.length}</strong>PDF</span></div></section><section class="home-modes"><h2>从哪里开始</h2><div class="mode-grid"><a href="chapters/index.html"><strong>按章节学习</strong><span>从第 1 章顺序推进，或直接进入所需章节。</span></a><a href="terminology/index.html"><strong>查术语与公式</strong><span>中英对照、章节定位和适用条件集中检索。</span></a><a href="exercises/index.html"><strong>做分层练习</strong><span>概念、计算、证明、应用和综合题统一筛选。</span></a><a href="review/index.html"><strong>复习与自测</strong><span>勾选掌握清单，记录错题和需要回看的知识点。</span></a></div></section><section class="home-spine"><div class="home-spine-head"><div><p class="mini-label">Knowledge Spine</p><h2>全书 17 章知识脊柱</h2><p>章节顺序就是学习依赖：前面的函数、极限和微积分语言会持续被后面调用。</p></div><a href="overview/index.html">查看结构详解</a></div><div class="home-spine-list">${homeSpine}</div></section><section class="home-proof"><div><p class="mini-label">Source Boundary</p><h2>唯一教材来源</h2><p>Thomas' Calculus, Fourteenth Edition in SI Units。网站以原创中文概要和自编练习为主，不复制整章原文。</p></div><div><p class="mini-label">Offline First</p><h2>不依赖网络</h2><p>本地 KaTeX、搜索索引、自测和错题记录都随站点提供；PDF 是打印和离线版本。</p></div></section>`;
await fs.writeFile(
  path.join(SITE_ROOT, "index.unified.html"),
  pageShell({
    root: "",
    active: "",
    title: "Thomas 微积分全书学习站",
    description: "Thomas 微积分 17 章统一离线学习站：术语、公式、练习、自测和 PDF。",
    body: homeBody,
    bodyClass: "home-body",
  }),
);

const report = {
  schemaVersion: "thomas-unified-site-build-v1",
  sourcePdfSha256: SOURCE_SHA,
  generatedAt: new Date().toISOString(),
  extractionErrors,
  canonical: {
    chapters: chapters.length,
    terms: totalTerms,
    exercises: totalExercises,
    formulas: totalFormulas,
    chapterCounts: chapters.map((chapter) => ({
      number: chapter.number,
      terms: chapter.terms.length,
      exercises: chapter.exercises.length,
      formulas: chapter.formulas.length,
    })),
  },
  pdfs: pdfEntries,
};
await fs.mkdir(path.join(SITE_ROOT, "quality"), { recursive: true });
await fs.writeFile(path.join(SITE_ROOT, "quality", "unified-build.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      chapters: chapters.length,
      terms: totalTerms,
      exercises: totalExercises,
      formulas: totalFormulas,
      pdfs: pdfEntries.length,
      home: path.join(SITE_ROOT, "index.unified.html"),
      extractionErrors,
    },
    null,
    2,
  ),
);
