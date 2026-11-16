import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";

const requireFromRuntime = createRequire(
  "C:/Users/个人/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const { chromium } = requireFromRuntime("playwright");

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "..");
const manifestPath = path.join(siteRoot, "book-manifest.json");
const reportPath = path.join(siteRoot, "quality", "global-audit.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const failures = [];
const pageResults = [];

function fail(page, viewport, type, detail) {
  failures.push({ page, viewport, type, detail });
}

function validateBatchQa(qa, page) {
  const prefix = `${page.id}: batch QA`;
  if (!qa) return;
  if (qa.schemaVersion !== "thomas-batch-qa-v2") fail(page.id, "data", "schemaVersion", prefix);
  if (qa.batch !== page.id) fail(page.id, "data", "batchId", `${prefix}: ${qa.batch}`);
  if (qa.status !== "passed") fail(page.id, "data", "batchStatus", `${prefix}: ${qa.status}`);
  if (qa.textbook !== manifest.textbook) fail(page.id, "data", "textbook", prefix);
  if (qa.sourcePdfSha256 !== manifest.source.sha256) fail(page.id, "data", "sourceHash", prefix);

  const m = qa.metrics || {};
  const requiredMetrics = [
    "newTerms",
    "newExercises",
    "renderedFormulas",
    "numericChecksPassed",
    "pdfPages",
    "desktopWidth",
    "desktopScrollWidth",
    "mobileWidth",
    "mobileScrollWidth",
    "katexErrors",
    "browserErrors",
    "desktopFormulaClipped",
    "mobileFormulaClipped",
    "mobileFormulaScrollable",
    "printFormulaClipped",
    "printFormulaOverflow",
    "crossBatchPagesPassed",
    "crossBatchPagesTotal",
  ];
  for (const key of requiredMetrics) {
    if (!(key in m)) fail(page.id, "data", "missingMetric", `${prefix}: ${key}`);
  }
  if (m.newTerms !== page.expectedTerms) fail(page.id, "data", "termMetric", `${prefix}: ${m.newTerms}`);
  if (m.newExercises !== page.expectedExercises) {
    fail(page.id, "data", "exerciseMetric", `${prefix}: ${m.newExercises}`);
  }
  if (m.renderedFormulas !== page.expectedFormulas) {
    fail(page.id, "data", "formulaMetric", `${prefix}: ${m.renderedFormulas}`);
  }
  if (
    m.desktopFormulaClipped !== 0 ||
    m.mobileFormulaClipped !== 0 ||
    !Number.isInteger(m.mobileFormulaScrollable) ||
    m.mobileFormulaScrollable < 0 ||
    m.printFormulaClipped !== 0 ||
    m.printFormulaOverflow !== 0
  ) {
    fail(page.id, "data", "formulaAccessibilityMetric", prefix);
  }

  for (const g of [
    "G1_source",
    "G2_coverage",
    "G3_terms",
    "G4_theorems_formulas",
    "G5_examples",
    "G6_exercises_answers",
    "G7_math_rendering",
    "G8_diagrams_links",
    "G9_web_print",
    "G10_copyright_version",
  ]) {
    if (qa.checks?.[g] !== "passed") fail(page.id, "data", "qualityGate", `${prefix}: ${g}`);
  }
  if (qa.defects?.P0 !== 0 || qa.defects?.P1 !== 0 || qa.defects?.P2Open !== 0) {
    fail(page.id, "data", "openDefects", prefix);
  }
  if (page.pdfSha256 && qa.pdfSha256 !== page.pdfSha256) {
    fail(page.id, "data", "pdfHashRecord", `${prefix}: ${qa.pdfSha256}`);
  }
}

function localTarget(pageFile, href) {
  const base = pathToFileURL(pageFile);
  const url = new URL(href, base);
  if (url.protocol !== "file:") return null;
  url.search = "";
  url.hash = "";
  return fileURLToPath(url);
}

async function fileSha256(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex").toUpperCase();
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

for (const definition of manifest.readerPages) {
  const pagePath = path.join(siteRoot, definition.path);
  if (definition.pdfPath) {
    const pdfPath = path.resolve(siteRoot, definition.pdfPath);
    try {
      const actualPdfHash = await fileSha256(pdfPath);
      if (actualPdfHash !== definition.pdfSha256) {
        fail(definition.id, "data", "pdfHash", `${actualPdfHash}/${definition.pdfSha256}`);
      }
    } catch {
      fail(definition.id, "data", "missingPdf", definition.pdfPath);
    }
  }
  const batchQa = definition.batchQa
    ? JSON.parse(await fs.readFile(path.join(siteRoot, definition.batchQa), "utf8"))
    : null;
  validateBatchQa(batchQa, definition);

  const result = {
    id: definition.id,
    path: definition.path,
    expected: {
      terms: definition.expectedTerms,
      exercises: definition.expectedExercises,
      formulas: definition.expectedFormulas,
    },
    desktop: null,
    mobile: null,
  };

  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "mobile", width: 390, height: 844 },
    { name: "print", width: 794, height: 1123, media: "print" },
  ]) {
    const errors = [];
    const page = await browser.newPage({ viewport });
    if (viewport.media) await page.emulateMedia({ media: viewport.media });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(pathToFileURL(pagePath).href, { waitUntil: "load" });
    await page.waitForTimeout(450);
    const metrics = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
      const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      const formulaOverflow = [...document.querySelectorAll(".formula.katex-rendered")]
        .filter(
          (element) =>
            element.scrollWidth > element.clientWidth + 2 ||
            (element.querySelector(".katex-display")?.scrollWidth || 0) > element.clientWidth + 2,
        )
        .map((element) => ({
          id: element.id,
          overflowX: getComputedStyle(element).overflowX,
        }));
      const remoteAssets = [
        ...document.querySelectorAll("script[src], link[href], img[src]"),
      ]
        .map((element) => element.getAttribute("src") || element.getAttribute("href"))
        .filter((value) => value && /^https?:/i.test(value));
      return {
        terms: document.querySelectorAll("[data-term-row]").length,
        exercises: document.querySelectorAll("[data-exercise]").length,
        formulas: document.querySelectorAll(".formula.katex-rendered").length,
        katexErrors: document.querySelectorAll(".katex-error").length,
        formulaOverflow,
        formulaClipped: formulaOverflow.filter(
          (formula) => !["auto", "scroll"].includes(formula.overflowX),
        ),
        formulaScrollable: formulaOverflow.filter((formula) =>
          ["auto", "scroll"].includes(formula.overflowX),
        ),
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        duplicateIds,
        placeholders: ["undefined", "NaN", "术语加载中", "待最终确认", "半径?", "torsional"].filter(
          (text) => bodyText.includes(text),
        ),
        remoteAssets,
        links: [...document.querySelectorAll("a[href]")].map((anchor) => anchor.getAttribute("href")),
      };
    });
    const links = metrics.links;
    const checkedLinks = [];
    for (const href of links) {
      const target = localTarget(pagePath, href);
      if (!target) continue;
      checkedLinks.push(href);
      try {
        await fs.access(target);
      } catch {
        fail(definition.id, viewport.name, "missingLink", href);
      }
    }

    if (errors.length) fail(definition.id, viewport.name, "browserErrors", errors);
    if (metrics.terms !== definition.expectedTerms) {
      fail(definition.id, viewport.name, "termCount", `${metrics.terms}/${definition.expectedTerms}`);
    }
    if (metrics.exercises !== definition.expectedExercises) {
      fail(
        definition.id,
        viewport.name,
        "exerciseCount",
        `${metrics.exercises}/${definition.expectedExercises}`,
      );
    }
    if (metrics.formulas !== definition.expectedFormulas) {
      fail(
        definition.id,
        viewport.name,
        "formulaCount",
        `${metrics.formulas}/${definition.expectedFormulas}`,
      );
    }
    if (metrics.katexErrors !== 0) fail(definition.id, viewport.name, "katexErrors", metrics.katexErrors);
    if (metrics.formulaClipped.length) {
      fail(definition.id, viewport.name, "formulaClipped", metrics.formulaClipped);
    }
    if (viewport.name === "desktop" && metrics.formulaOverflow.length) {
      fail(definition.id, viewport.name, "desktopFormulaOverflow", metrics.formulaOverflow);
    }
    if (viewport.name === "print" && metrics.formulaOverflow.length) {
      fail(definition.id, viewport.name, "printFormulaOverflow", metrics.formulaOverflow);
    }
    if (metrics.bodyWidth > metrics.viewportWidth + 1) {
      fail(definition.id, viewport.name, "pageOverflow", `${metrics.bodyWidth}/${metrics.viewportWidth}`);
    }
    if (metrics.duplicateIds.length) {
      fail(definition.id, viewport.name, "duplicateIds", metrics.duplicateIds);
    }
    if (metrics.placeholders.length) {
      fail(definition.id, viewport.name, "placeholders", metrics.placeholders);
    }
    if (metrics.remoteAssets.length) {
      fail(definition.id, viewport.name, "remoteAssets", metrics.remoteAssets);
    }

    result[viewport.name] = {
      terms: metrics.terms,
      exercises: metrics.exercises,
      formulas: metrics.formulas,
      katexErrors: metrics.katexErrors,
      formulaOverflow: metrics.formulaOverflow,
      formulaClipped: metrics.formulaClipped,
      formulaScrollable: metrics.formulaScrollable,
      bodyWidth: metrics.bodyWidth,
      viewportWidth: metrics.viewportWidth,
      duplicateIds: metrics.duplicateIds,
      placeholders: metrics.placeholders,
      remoteAssets: metrics.remoteAssets,
      browserErrors: errors,
      localLinksChecked: checkedLinks.length,
    };
    await page.close();
  }
  if (batchQa) {
    if (batchQa.metrics.desktopFormulaClipped !== result.desktop.formulaClipped.length) {
      fail(definition.id, "data", "desktopFormulaClippedMetric", definition.id);
    }
    if (batchQa.metrics.mobileFormulaClipped !== result.mobile.formulaClipped.length) {
      fail(definition.id, "data", "mobileFormulaClippedMetric", definition.id);
    }
    if (batchQa.metrics.mobileFormulaScrollable !== result.mobile.formulaScrollable.length) {
      fail(definition.id, "data", "mobileFormulaScrollableMetric", definition.id);
    }
    if (batchQa.metrics.printFormulaClipped !== result.print.formulaClipped.length) {
      fail(definition.id, "data", "printFormulaClippedMetric", definition.id);
    }
    if (batchQa.metrics.printFormulaOverflow !== result.print.formulaOverflow.length) {
      fail(definition.id, "data", "printFormulaOverflowMetric", definition.id);
    }
  }
  pageResults.push(result);
}

await browser.close();
await fs.mkdir(path.dirname(reportPath), { recursive: true });
const report = {
  schemaVersion: "thomas-global-audit-v1",
  manifest: "book-manifest.json",
  summary: {
    pagesTotal: pageResults.length,
    pagesPassed: pageResults.filter((page) => !failures.some((failure) => failure.page === page.id))
      .length,
    failures: failures.length,
    localLinksChecked: pageResults.reduce(
      (sum, page) =>
        sum + Math.max(page.desktop?.localLinksChecked || 0, page.mobile?.localLinksChecked || 0),
      0,
    ),
    desktopFormulaOverflow: pageResults.reduce(
      (sum, page) => sum + (page.desktop?.formulaOverflow.length || 0),
      0,
    ),
    mobileFormulaScrollable: pageResults.reduce(
      (sum, page) => sum + (page.mobile?.formulaScrollable.length || 0),
      0,
    ),
    formulaClipped: pageResults.reduce(
      (sum, page) =>
        sum +
        (page.desktop?.formulaClipped.length || 0) +
        (page.mobile?.formulaClipped.length || 0),
      0,
    ),
    printFormulaOverflow: pageResults.reduce(
      (sum, page) => sum + (page.print?.formulaOverflow.length || 0),
      0,
    ),
  },
  failures,
  pages: pageResults,
  pass: failures.length === 0,
};
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report.summary, null, 2));
if (!report.pass) process.exitCode = 1;
