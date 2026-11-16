import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const configFile = path.resolve(process.argv[2] || "");
const pdfFile = path.resolve(process.argv[3] || "");
const qaDir = path.resolve(process.argv[4] || "");

if (!path.isAbsolute(configFile) || !path.isAbsolute(pdfFile) || !path.isAbsolute(qaDir)) {
  throw new Error("Config, PDF, and QA paths must be absolute.");
}

const { default: batch } = await import(`${pathToFileURL(configFile).href}?v=${Date.now()}`);
const siteRoot = path.resolve(path.dirname(configFile), "..", "..", "..");
const batchRoot = path.join(siteRoot, "batches", batch.slug);
const indexFile = path.join(batchRoot, "index.html");

await fs.mkdir(path.dirname(pdfFile), { recursive: true });
await fs.mkdir(qaDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const errors = [];

async function inspect(viewport, media = "screen") {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  if (media !== "screen") await page.emulateMedia({ media });
  page.on("pageerror", (error) => errors.push(`${media}:${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${media}:console:${message.text()}`);
  });
  await page.goto(pathToFileURL(indexFile).href, { waitUntil: "load" });
  await page.waitForTimeout(700);
  const metrics = await page.evaluate(() => {
    const formulas = [...document.querySelectorAll(".formula.katex-rendered")];
    const overflow = formulas
      .filter(
        (element) =>
          element.scrollWidth > element.clientWidth + 2 ||
          (element.querySelector(".katex-display")?.scrollWidth || 0) > element.clientWidth + 2,
      )
      .map((element) => ({ id: element.id, overflowX: getComputedStyle(element).overflowX }));
    const chapterCounts = {};
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    document.querySelectorAll('[id^="chapter-"][id$="-exercises"]').forEach((host) => {
      const chapter = host.id.replace(/^chapter-/, "").replace(/-exercises$/, "");
      chapterCounts[chapter] = host.querySelectorAll("[data-exercise]").length;
    });
    return {
      terms: document.querySelectorAll("[data-term-row]").length,
      exercises: document.querySelectorAll("[data-exercise]").length,
      chapterCounts,
      mastery: document.querySelectorAll("[data-mastery]").length,
      formulas: formulas.length,
      formulaOverflow: overflow,
      formulaClipped: overflow.filter((item) => !["auto", "scroll"].includes(item.overflowX)),
      formulaScrollable: overflow.filter((item) => ["auto", "scroll"].includes(item.overflowX)),
      katexErrors: document.querySelectorAll(".katex-error").length,
      katexLoaded: Boolean(window.katex),
      bodyWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
      chapters: document.querySelectorAll(".chapter-section").length,
      duplicateIds: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))],
      placeholders: ["undefined", "NaN", "术语加载中", "待最终确认", "<br />"].filter((text) =>
        document.body.innerText.includes(text),
      ),
      remoteAssets: [...document.querySelectorAll("script[src],link[href],img[src]")]
        .map((element) => element.getAttribute("src") || element.getAttribute("href"))
        .filter((value) => value && /^https?:/i.test(value)),
    };
  });
  return { page, metrics };
}

const desktop = await inspect({ width: 1440, height: 1000 });
await desktop.page.screenshot({ path: path.join(qaDir, "desktop-home.png"), fullPage: false });
await desktop.page.locator("#terms").scrollIntoViewIfNeeded();
await desktop.page.screenshot({ path: path.join(qaDir, "desktop-terms.png"), fullPage: false });
await desktop.page.locator("#practice").scrollIntoViewIfNeeded();
await desktop.page.screenshot({ path: path.join(qaDir, "desktop-practice.png"), fullPage: false });

const mobile = await inspect({ width: 390, height: 844 });
await mobile.page.screenshot({ path: path.join(qaDir, "mobile-home.png"), fullPage: false });

const print = await inspect({ width: 794, height: 1123 }, "print");
await desktop.page.evaluate(() => {
  document.querySelectorAll("details").forEach((element) => {
    element.open = true;
  });
});
await desktop.page.emulateMedia({ media: "print" });
await desktop.page.waitForTimeout(250);
await desktop.page.pdf({
  path: pdfFile,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate:
    '<div style="width:100%;font-size:8px;text-align:center;color:#666;font-family:Arial,sans-serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});

await Promise.all([desktop.page.close(), mobile.page.close(), print.page.close()]);
await browser.close();

const metrics = {
  batch: batch.label,
  indexFile,
  pdfFile,
  desktop: desktop.metrics,
  mobile: mobile.metrics,
  print: print.metrics,
  errors,
};
await fs.writeFile(path.join(qaDir, "render-metrics.json"), `${JSON.stringify(metrics, null, 2)}\n`);

const expectedChapterCounts = Object.fromEntries(
  batch.chapters.map((chapter) => [
    String(chapter.number),
    batch.exercises.filter((exercise) => exercise.chapter === String(chapter.number)).length,
  ]),
);
const failures = [];
if (desktop.metrics.terms !== batch.terms.length) failures.push("desktop terms");
if (desktop.metrics.exercises !== batch.exercises.length) failures.push("desktop exercises");
if (desktop.metrics.mastery !== batch.chapters.reduce((sum, chapter) => sum + chapter.mastery.length, 0)) {
  failures.push("desktop mastery");
}
for (const [chapter, count] of Object.entries(expectedChapterCounts)) {
  if (desktop.metrics.chapterCounts[chapter] !== count) failures.push(`desktop chapter ${chapter}`);
}
if (desktop.metrics.formulas !== batch.chapters.flatMap((chapter) => chapter.sections).flatMap((section) => section.formulas || []).length) {
  failures.push("desktop formulas");
}
if (desktop.metrics.bodyWidth > desktop.metrics.viewportWidth + 1) failures.push("desktop width");
if (mobile.metrics.bodyWidth > mobile.metrics.viewportWidth + 1) failures.push("mobile width");
if (print.metrics.bodyWidth > print.metrics.viewportWidth + 1) failures.push("print width");
if (desktop.metrics.formulaClipped.length || desktop.metrics.formulaOverflow.length) failures.push("desktop formula");
if (mobile.metrics.formulaClipped.length) failures.push("mobile formula clipped");
if (print.metrics.formulaClipped.length || print.metrics.formulaOverflow.length) failures.push("print formula");
if (desktop.metrics.katexErrors || !desktop.metrics.katexLoaded) failures.push("katex");
if (desktop.metrics.placeholders.length) failures.push("placeholders");
if (desktop.metrics.duplicateIds.length) failures.push("duplicate ids");
if (desktop.metrics.remoteAssets.length) failures.push("remote assets");
if (errors.length) failures.push("browser errors");

const pdfStat = await fs.stat(pdfFile);
console.log(
  JSON.stringify(
    {
      batch: batch.label,
      pdfFile,
      pdfBytes: pdfStat.size,
      failures,
      desktop: {
        terms: desktop.metrics.terms,
        exercises: desktop.metrics.exercises,
        formulas: desktop.metrics.formulas,
        mastery: desktop.metrics.mastery,
        formulaClipped: desktop.metrics.formulaClipped.length,
        formulaOverflow: desktop.metrics.formulaOverflow.length,
      },
      mobile: {
        formulaClipped: mobile.metrics.formulaClipped.length,
        formulaScrollable: mobile.metrics.formulaScrollable.length,
      },
      print: {
        formulaClipped: print.metrics.formulaClipped.length,
        formulaOverflow: print.metrics.formulaOverflow.length,
      },
    },
    null,
    2,
  ),
);

if (failures.length || pdfStat.size < 100_000) process.exitCode = 1;
