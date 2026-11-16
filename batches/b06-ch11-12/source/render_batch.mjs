import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const batchRoot = path.resolve("F:/数学学习/output/study-site/batches/b06-ch11-12");
const qaRoot = path.resolve("F:/数学学习/tmp/b06-qa");
const indexFile = path.join(batchRoot, "index.html");
const pdfFile = path.resolve("F:/数学学习/output/pdf/Thomas_Calculus_第11章至12章_B6质量校准稿.pdf");

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
  chapter11Exercises: document.querySelectorAll('[data-exercise][data-chapter="11"]').length,
  chapter12Exercises: document.querySelectorAll('[data-exercise][data-chapter="12"]').length,
  masteryItems: document.querySelectorAll("[data-mastery]").length,
  formulaCount: document.querySelectorAll(".formula.katex-rendered").length,
  formulaOverflow: [...document.querySelectorAll(".formula.katex-rendered")].filter(
    (element) =>
      element.scrollWidth > element.clientWidth + 2 ||
      (element.querySelector(".katex-display")?.scrollWidth || 0) > element.clientWidth + 2,
  ).length,
  katexLoaded: Boolean(window.katex),
  katexErrors: document.querySelectorAll(".katex-error").length,
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
  chapters: document.querySelectorAll(".chapter-cover").length,
}));

await page.screenshot({ path: path.join(qaRoot, "desktop-home.png"), fullPage: false });
await page.locator("#chapter-11").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-chapter11.png"), fullPage: false });
await page.locator("#chapter-12").scrollIntoViewIfNeeded();
await page.screenshot({ path: path.join(qaRoot, "desktop-chapter12.png"), fullPage: false });
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
  formulaOverflow: [...document.querySelectorAll(".formula.katex-rendered")].filter(
    (element) =>
      element.scrollWidth > element.clientWidth + 2 ||
      (element.querySelector(".katex-display")?.scrollWidth || 0) > element.clientWidth + 2,
  ).length,
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
console.log(JSON.stringify({ desktopMetrics, mobileMetrics, errors, pdfFile, pdfBytes: pdfStat.size }, null, 2));
if (errors.length) process.exitCode = 1;
if (desktopMetrics.bodyWidth > desktopMetrics.viewportWidth + 1) process.exitCode = 1;
if (mobileMetrics.bodyWidth > mobileMetrics.viewportWidth + 1) process.exitCode = 1;
if (!desktopMetrics.katexLoaded || desktopMetrics.katexErrors > 0) process.exitCode = 1;
if (desktopMetrics.formulaOverflow > 0 || mobileMetrics.formulaOverflow > 0) process.exitCode = 1;
if (
  desktopMetrics.termRows !== 73 ||
  desktopMetrics.chapter11Exercises !== 15 ||
  desktopMetrics.chapter12Exercises !== 15
) {
  process.exitCode = 1;
}
if (desktopMetrics.formulaCount !== 33 || desktopMetrics.chapters !== 2) process.exitCode = 1;
if (pdfStat.size < 100_000) process.exitCode = 1;
