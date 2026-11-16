import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const batchRoot = path.resolve("F:/数学学习/output/study-site/batches/b07-ch13-14");
const qaRoot = path.resolve("F:/数学学习/tmp/b07-qa");
const indexFile = path.join(batchRoot, "index.html");
const pdfFile = path.resolve("F:/数学学习/output/pdf/Thomas_Calculus_第13章至14章_B7质量校准稿.pdf");

await fs.mkdir(qaRoot, { recursive: true });
await fs.mkdir(path.dirname(pdfFile), { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});

await page.goto(pathToFileURL(indexFile).href, { waitUntil: "load" });
await page.waitForTimeout(700);
const desktopMetrics = await page.evaluate(() => ({
  title: document.title,
  termRows: document.querySelectorAll("[data-term-row]").length,
  exerciseCards: document.querySelectorAll("[data-exercise]").length,
  chapter13Exercises: document.querySelectorAll('[data-exercise][data-chapter="13"]').length,
  chapter14Exercises: document.querySelectorAll('[data-exercise][data-chapter="14"]').length,
  masteryItems: document.querySelectorAll("[data-mastery]").length,
  formulaCount: document.querySelectorAll(".formula.katex-rendered").length,
  formulaOverflow: [...document.querySelectorAll(".formula.katex-rendered")]
    .filter(
      (element) =>
        element.scrollWidth > element.clientWidth + 2 ||
        (element.querySelector(".katex-display")?.scrollWidth || 0) > element.clientWidth + 2,
    )
    .map((element) => ({
      id: element.id,
      overflowX: getComputedStyle(element).overflowX,
    })),
  katexLoaded: Boolean(window.katex),
  katexErrors: document.querySelectorAll(".katex-error").length,
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
  chapters: document.querySelectorAll(".chapter-cover").length,
}));

await page.screenshot({ path: path.join(qaRoot, "desktop-home.png"), fullPage: false });
await page.locator("#chapter-13").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-chapter13.png"), fullPage: false });
await page.locator("#chapter-14").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-chapter14.png"), fullPage: false });
await page.locator("#qa").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-qa.png"), fullPage: false });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
mobile.on("pageerror", (error) => errors.push(`mobile pageerror: ${error.message}`));
await mobile.goto(pathToFileURL(indexFile).href, { waitUntil: "load" });
await mobile.waitForTimeout(500);
const mobileMetrics = await mobile.evaluate(() => ({
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
  termRows: document.querySelectorAll("[data-term-row]").length,
  exerciseCards: document.querySelectorAll("[data-exercise]").length,
  formulaOverflow: [...document.querySelectorAll(".formula.katex-rendered")]
    .filter(
      (element) =>
        element.scrollWidth > element.clientWidth + 2 ||
        (element.querySelector(".katex-display")?.scrollWidth || 0) > element.clientWidth + 2,
    )
    .map((element) => ({
      id: element.id,
      overflowX: getComputedStyle(element).overflowX,
    })),
}));
await mobile.screenshot({ path: path.join(qaRoot, "mobile-home.png"), fullPage: false });

await page.evaluate(() => {
  document.querySelectorAll("details").forEach((element) => {
    element.open = true;
  });
});
await page.emulateMedia({ media: "print" });
await page.waitForTimeout(180);
await page.pdf({
  path: pdfFile,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate:
    '<div style="width:100%;font-size:8px;text-align:center;color:#666;font-family:Arial,sans-serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});
await browser.close();

const pdfStat = await fs.stat(pdfFile);
const desktopFormulaClipped = desktopMetrics.formulaOverflow.filter(
  (item) => !["auto", "scroll"].includes(item.overflowX),
);
const mobileFormulaClipped = mobileMetrics.formulaOverflow.filter(
  (item) => !["auto", "scroll"].includes(item.overflowX),
);
console.log(
  JSON.stringify(
    {
      desktopMetrics: {
        ...desktopMetrics,
        desktopFormulaClipped,
        mobileFormulaClipped,
      },
      mobileMetrics: {
        ...mobileMetrics,
        mobileFormulaClipped,
      },
      errors,
      pdfFile,
      pdfBytes: pdfStat.size,
    },
    null,
    2,
  ),
);
if (errors.length) process.exitCode = 1;
if (desktopMetrics.bodyWidth > desktopMetrics.viewportWidth + 1) process.exitCode = 1;
if (mobileMetrics.bodyWidth > mobileMetrics.viewportWidth + 1) process.exitCode = 1;
if (!desktopMetrics.katexLoaded || desktopMetrics.katexErrors > 0) process.exitCode = 1;
if (desktopFormulaClipped.length || mobileFormulaClipped.length) process.exitCode = 1;
if (
  desktopMetrics.termRows !== 86 ||
  desktopMetrics.chapter13Exercises !== 15 ||
  desktopMetrics.chapter14Exercises !== 15
) {
  process.exitCode = 1;
}
if (desktopMetrics.formulaCount !== 36 || desktopMetrics.chapters !== 2) process.exitCode = 1;
if (pdfStat.size < 100_000) process.exitCode = 1;
