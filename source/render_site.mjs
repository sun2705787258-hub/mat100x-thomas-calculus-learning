import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const siteRoot = path.resolve("F:/数学学习/output/study-site");
const qaRoot = path.resolve("F:/数学学习/tmp/qa");
const indexFile = path.join(siteRoot, "index.html");
const pdfFile = path.resolve("F:/数学学习/output/pdf/Thomas_Calculus_第4章至5章_示范学习资料.pdf");

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
  masteryItems: document.querySelectorAll("[data-mastery]").length,
  detailsCount: document.querySelectorAll("details").length,
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
  formulaCopyButtons: document.querySelectorAll("[data-copy-tex]").length,
  katexLoaded: Boolean(window.katex),
  katexRendered: document.querySelectorAll(".formula.katex-rendered").length,
  katexErrors: document.querySelectorAll(".katex-error").length,
  emptyChapterLandmarks: document.querySelectorAll(".chapter-cover").length,
  termCountText: document.querySelector("#term-count")?.textContent,
  exerciseCountText: document.querySelector("#exercise-visible-count")?.textContent,
}));

await page.screenshot({
  path: path.join(qaRoot, "desktop-home.png"),
  fullPage: false,
});

await page.locator("#chapter-4").scrollIntoViewIfNeeded();
await page.screenshot({
  path: path.join(qaRoot, "desktop-chapter4.png"),
  fullPage: false,
});

await page.locator("#practice").scrollIntoViewIfNeeded();
await page.screenshot({
  path: path.join(qaRoot, "desktop-practice.png"),
  fullPage: false,
});

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
  mapShellWidth: document.querySelector(".map-shell")?.scrollWidth,
  navLinks: document.querySelectorAll(".side-nav a").length,
}));
await mobile.screenshot({
  path: path.join(qaRoot, "mobile-home.png"),
  fullPage: false,
});

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

console.log(JSON.stringify({ desktopMetrics, mobileMetrics, errors, pdfFile }, null, 2));

if (errors.length) process.exitCode = 1;
if (desktopMetrics.bodyWidth > desktopMetrics.viewportWidth + 1) process.exitCode = 1;
if (mobileMetrics.bodyWidth > mobileMetrics.viewportWidth + 1) process.exitCode = 1;
if (!desktopMetrics.katexLoaded || desktopMetrics.katexErrors > 0) process.exitCode = 1;
const pdfStat = await fs.stat(pdfFile);
if (pdfStat.size < 50_000) {
  console.error(`PDF is unexpectedly small: ${pdfStat.size} bytes`);
  process.exitCode = 1;
}
