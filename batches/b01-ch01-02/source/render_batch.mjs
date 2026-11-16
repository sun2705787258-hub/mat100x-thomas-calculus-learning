import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const batchRoot = path.resolve("F:/数学学习/output/study-site/batches/b01-ch01-02");
const qaRoot = path.resolve("F:/数学学习/tmp/b01-qa");
const indexFile = path.join(batchRoot, "index.html");
const pdfFile = path.resolve("F:/数学学习/output/pdf/Thomas_Calculus_第1章至2章_B1质量校准稿.pdf");

await fs.mkdir(qaRoot, { recursive: true });
await fs.mkdir(path.dirname(pdfFile), { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const errors = [];
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});

page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});

await page.goto(pathToFileURL(indexFile).href, { waitUntil: "load" });
await page.waitForTimeout(600);

const desktopMetrics = await page.evaluate(() => ({
  title: document.title,
  termRows: document.querySelectorAll("[data-term-row]").length,
  exerciseCards: document.querySelectorAll("[data-exercise]").length,
  chapter1Exercises: document.querySelectorAll('[data-exercise][data-chapter="1"]').length,
  chapter2Exercises: document.querySelectorAll('[data-exercise][data-chapter="2"]').length,
  masteryItems: document.querySelectorAll("[data-mastery]").length,
  formulaCount: document.querySelectorAll(".formula.katex-rendered").length,
  katexLoaded: Boolean(window.katex),
  katexErrors: document.querySelectorAll(".katex-error").length,
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
  hasChapter1: Boolean(document.querySelector("#chapter-1")),
  hasChapter2: Boolean(document.querySelector("#chapter-2")),
  qaStatus: document.querySelector("#qa .callout.answer strong")?.textContent || "",
}));

await page.screenshot({ path: path.join(qaRoot, "desktop-home.png"), fullPage: false });
await page.locator("#chapter-1").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-chapter1.png"), fullPage: false });
await page.locator("#chapter-2").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-chapter2.png"), fullPage: false });
await page.locator("#qa").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-qa.png"), fullPage: false });

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});
mobile.on("pageerror", (error) => errors.push(`mobile pageerror: ${error.message}`));
await mobile.goto(pathToFileURL(indexFile).href, { waitUntil: "load" });
await mobile.waitForTimeout(400);
const mobileMetrics = await mobile.evaluate(() => ({
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
  termRows: document.querySelectorAll("[data-term-row]").length,
  exerciseCards: document.querySelectorAll("[data-exercise]").length,
}));
await mobile.screenshot({ path: path.join(qaRoot, "mobile-home.png"), fullPage: false });

await page.evaluate(() => {
  document.querySelectorAll("details").forEach((element) => {
    element.open = true;
  });
});
await page.emulateMedia({ media: "print" });
await page.waitForTimeout(150);
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
console.log(
  JSON.stringify(
    {
      desktopMetrics,
      mobileMetrics,
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
if (desktopMetrics.termRows < 60) process.exitCode = 1;
if (desktopMetrics.chapter1Exercises !== 15 || desktopMetrics.chapter2Exercises !== 15) {
  process.exitCode = 1;
}
if (pdfStat.size < 100_000) process.exitCode = 1;
