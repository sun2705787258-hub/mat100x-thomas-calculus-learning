import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const pages = [
  {
    name: "accepted-golden-sample",
    file: "F:/数学学习/output/study-site/archive/b0-golden/index.html",
    expectedExercises: 30,
    expectedTerms: 84,
  },
  {
    name: "batch-b1",
    file: "F:/数学学习/output/study-site/batches/b01-ch01-02/index.html",
    expectedExercises: 30,
    expectedTerms: 66,
  },
  {
    name: "batch-b2",
    file: "F:/数学学习/output/study-site/batches/b02-ch03-04/index.html",
    expectedExercises: 15,
    expectedTerms: 47,
  },
  {
    name: "batch-b3",
    file: "F:/数学学习/output/study-site/batches/b03-ch05-06/index.html",
    expectedExercises: 15,
    expectedTerms: 37,
  },
  {
    name: "batch-b4",
    file: "F:/数学学习/output/study-site/batches/b04-ch07-08/index.html",
    expectedExercises: 30,
    expectedTerms: 44,
  },
  {
    name: "batch-b5",
    file: "F:/数学学习/output/study-site/batches/b05-ch09-10/index.html",
    expectedExercises: 30,
    expectedTerms: 60,
  },
  {
    name: "batch-b6",
    file: "F:/数学学习/output/study-site/batches/b06-ch11-12/index.html",
    expectedExercises: 30,
    expectedTerms: 73,
  },
  {
    name: "batch-b7",
    file: "F:/数学学习/output/study-site/batches/b07-ch13-14/index.html",
    expectedExercises: 30,
    expectedTerms: 86,
  },
  {
    name: "batch-b8",
    file: "F:/数学学习/output/study-site/batches/b08-ch15-16/index.html",
    expectedExercises: 30,
    expectedTerms: 95,
  },
  {
    name: "batch-b9",
    file: "F:/数学学习/output/study-site/batches/b09-ch17/index.html",
    expectedExercises: 15,
    expectedTerms: 46,
  },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const results = [];
for (const target of pages) {
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(pathToFileURL(path.resolve(target.file)).href, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const metrics = await page.evaluate(() => ({
    terms: document.querySelectorAll("[data-term-row]").length,
    exercises: document.querySelectorAll("[data-exercise]").length,
    katexErrors: document.querySelectorAll(".katex-error").length,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  results.push({
    name: target.name,
    ...metrics,
    errors,
    pass:
      errors.length === 0 &&
      metrics.terms === target.expectedTerms &&
      metrics.exercises === target.expectedExercises &&
      metrics.katexErrors === 0 &&
      metrics.bodyWidth <= metrics.viewportWidth + 1,
  });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
if (results.some((result) => !result.pass)) process.exitCode = 1;
