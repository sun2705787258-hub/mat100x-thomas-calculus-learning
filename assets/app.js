(() => {
  "use strict";

  const content = window.STUDY_CONTENT;
  if (!content) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const normalize = (value) =>
    String(value ?? "")
      .toLocaleLowerCase("zh-CN")
      .replace(/\s+/g, " ")
      .trim();

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  function renderMath(value) {
    if (!value) return "";
    if (typeof value === "string") return escapeHtml(value);
    return `<span class="math-symbol" data-tex="${escapeHtml(value.tex)}">${escapeHtml(value.display)}</span>`;
  }

  function renderFormulaCards() {
    if (!window.katex) return;

    const formulas = {
      "formula-evt":
        "f\\in C([a,b])\\quad\\Longrightarrow\\quad\\exists x_1,x_2\\in[a,b]\\ \\text{such that}\\ f(x_1)\\le f(x)\\le f(x_2)",
      "formula-critical":
        "c\\ \\text{is an interior local extremum and}\\ f'(c)\\ \\text{exists}\\quad\\Longrightarrow\\quad f'(c)=0",
      "formula-rolle":
        "f(a)=f(b)\\quad\\Longrightarrow\\quad\\exists c\\in(a,b),\\ f'(c)=0",
      "formula-mvt":
        "\\frac{f(b)-f(a)}{b-a}=f'(c),\\qquad c\\in(a,b)",
      "formula-sdt":
        "\\begin{aligned}f'(c)&=0,\\ f''(c)<0 &&\\Longrightarrow\\ \\text{local maximum}\\\\ f'(c)&=0,\\ f''(c)>0 &&\\Longrightarrow\\ \\text{local minimum}\\end{aligned}",
      "formula-newton":
        "x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)},\\qquad f'(x_n)\\ne0",
      "formula-antiderivative":
        "F'(x)=f(x)\\quad\\Longrightarrow\\quad\\int f(x)\\,dx=F(x)+C",
      "formula-power":
        "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C,\\qquad n\\ne-1",
      "formula-finite":
        "S_n=f(c_1)\\Delta x+f(c_2)\\Delta x+\\cdots+f(c_n)\\Delta x",
      "formula-sums":
        "\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2},\\qquad \\sum_{k=1}^{n}k^2=\\frac{n(n+1)(2n+1)}{6}",
      "formula-riemann":
        "S_P=\\sum_{k=1}^{n}f(c_k)\\Delta x_k,\\qquad \\|P\\|=\\max_{1\\le k\\le n}\\Delta x_k",
      "formula-definite":
        "\\int_a^b f(x)\\,dx=\\lim_{\\|P\\|\\to0}\\sum_{k=1}^{n}f(c_k)\\Delta x_k",
      "formula-average":
        "\\operatorname{av}(f)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx",
      "formula-ftc1":
        "\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)",
      "formula-ftc2":
        "\\int_a^b f(x)\\,dx=F(b)-F(a)",
      "formula-net":
        "F(b)-F(a)=\\int_a^b F'(x)\\,dx",
      "formula-sub":
        "\\int f(g(x))g'(x)\\,dx=\\int f(u)\\,du",
      "formula-defsub":
        "\\int_a^b f(g(x))g'(x)\\,dx=\\int_{g(a)}^{g(b)}f(u)\\,du",
      "formula-area":
        "A=\\int_a^b\\left(f(x)-g(x)\\right)\\,dx,\\qquad f(x)\\ge g(x)",
    };

    const allFormulas = { ...formulas, ...(window.BATCH_FORMULAS || {}) };
    Object.entries(allFormulas).forEach(([id, tex]) => {
      const target = document.getElementById(id);
      if (!target) return;
      target.dataset.tex = tex;
      target.innerHTML = window.katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
        strict: false,
        output: "htmlAndMathml",
      });
      target.classList.add("katex-rendered");
    });

    const markWideFormulaCards = () => {
      $$(".formula.katex-rendered").forEach((formula) => {
        const card = formula.closest(".formula-card");
        if (!card) return;
        const displayWidth = formula.querySelector(".katex-display")?.scrollWidth || 0;
        const requiredWidth = Math.max(formula.scrollWidth, displayWidth);
        if (requiredWidth > formula.clientWidth + 2) {
          card.classList.add("wide-formula");
        }
      });
    };

    requestAnimationFrame(markWideFormulaCards);
    document.fonts?.ready.then(markWideFormulaCards);
    window.addEventListener("load", markWideFormulaCards, { once: true });
  }

  function renderTerms() {
    const body = $("#term-body");
    if (!body) return;

    body.innerHTML = content.terms
      .map((term) => {
        const chapter = term.chapter || String(term.section).match(/[1-9]/)?.[0] || "";
        return `
          <tr data-term-row data-chapter="${escapeHtml(chapter)}" data-search="${escapeHtml(
            [term.en, term.zh, term.definition, term.section, term.note ?? ""].join(" "),
          )}">
            <td>${escapeHtml(term.en)}</td>
            <td>${escapeHtml(term.zh)}</td>
            <td>${escapeHtml(term.definition)}</td>
            <td>${escapeHtml(term.section)}</td>
            <td>${renderMath(term.note)}</td>
          </tr>`;
      })
      .join("");

    $("#term-count").textContent = `${content.terms.length} 个术语`;
  }

  function initTermFilters() {
    const searchFields = [$("#term-search"), $("#term-table-search")].filter(Boolean);
    const buttons = $$("[data-term-filter]");
    const empty = $("#term-empty");
    let activeChapter = "all";

    const apply = () => {
      const query = normalize(searchFields.find((field) => field.value)?.value);
      let visible = 0;

      $$("[data-term-row]").forEach((row) => {
        const chapterMatch = activeChapter === "all" || row.dataset.chapter === activeChapter;
        const queryMatch = !query || normalize(row.dataset.search).includes(query);
        const show = chapterMatch && queryMatch;
        row.hidden = !show;
        if (show) visible += 1;
      });

      empty?.classList.toggle("is-visible", visible === 0);
      $("#term-visible-count").textContent = `当前显示 ${visible} 个`;
    };

    searchFields.forEach((field) => {
      field.addEventListener("input", () => {
        searchFields.filter((other) => other !== field).forEach((other) => {
          other.value = field.value;
        });
        apply();
      });
    });
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activeChapter = button.dataset.termFilter;
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        apply();
      });
    });

    apply();
  }

  function renderExercises() {
    const card = (exercise) => `
      <article class="exercise-card"
        data-exercise
        data-chapter="${escapeHtml(exercise.chapter)}"
        data-type="${escapeHtml(exercise.type)}"
        data-level="${escapeHtml(exercise.level)}"
        data-search="${escapeHtml(
          [
            exercise.id,
            exercise.chapter,
            exercise.type,
            exercise.level,
            exercise.section,
            exercise.topic,
            exercise.promptText,
          ].join(" "),
        )}">
        <div class="exercise-head">
          <span class="exercise-id">${escapeHtml(exercise.id)}</span>
          <span class="tag teal">${escapeHtml(exercise.type)}</span>
          <span class="tag orange">${escapeHtml(exercise.level)}</span>
        </div>
        <p class="exercise-meta">对应 ${escapeHtml(exercise.section)} · ${escapeHtml(exercise.topic)}</p>
        <div class="exercise-prompt">${exercise.prompt}</div>
        <details>
          <summary>提示</summary>
          <div class="details-body">${exercise.hint}</div>
        </details>
        <details>
          <summary>关键步骤</summary>
          <div class="details-body">${exercise.steps}</div>
        </details>
        <details>
          <summary>完整解析</summary>
          <div class="details-body">${exercise.solution}</div>
        </details>
      </article>`;

    $$('[id^="chapter-"][id$="-exercises"]').forEach((host) => {
      const chapter = host.id.replace(/^chapter-/, "").replace(/-exercises$/, "");
      host.innerHTML = content.exercises
        .filter((exercise) => exercise.chapter === chapter)
        .sort((a, b) => Number(a.order) - Number(b.order))
        .map(card)
        .join("");
    });
  }

  function initExerciseFilters() {
    const search = $("#exercise-search");
    const empty = $("#exercise-empty");

    const apply = () => {
      const query = normalize(search?.value);
      let visible = 0;

      $$("[data-exercise]").forEach((card) => {
        const show = !query || normalize(card.dataset.search).includes(query);
        card.hidden = !show;
        if (show) visible += 1;
      });

      empty?.classList.toggle("is-visible", visible === 0);
      $("#exercise-visible-count").textContent = `当前显示 ${visible} / ${content.exercises.length} 题`;
    };

    search?.addEventListener("input", apply);
    apply();
  }

  function initProgress() {
    const boxes = $$("[data-mastery]");
    if (!boxes.length) return;
    const storageKey = document.body.dataset.progressKey || "thomas-ch4-5-mastery-v1";
    let saved = {};

    try {
      saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      saved = {};
    }

    boxes.forEach((box) => {
      box.checked = Boolean(saved[box.dataset.mastery]);
      box.addEventListener("change", () => {
        saved[box.dataset.mastery] = box.checked;
        localStorage.setItem(storageKey, JSON.stringify(saved));
        update();
      });
    });

    function update() {
      const checked = boxes.filter((box) => box.checked).length;
      const percent = Math.round((checked / boxes.length) * 100);
      $$(".progress-fill").forEach((fill) => {
        fill.style.width = `${percent}%`;
      });
      $$(".progress-value").forEach((label) => {
        label.textContent = `${checked} / ${boxes.length} · ${percent}%`;
      });
    }

    update();
  }

  function initErrorLog() {
    const fields = $$("[data-error-field]");
    if (!fields.length) return;
    const storageKey = document.body.dataset.errorLogKey || "thomas-ch4-5-error-log-v1";
    let saved = {};

    try {
      saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      saved = {};
    }

    fields.forEach((field) => {
      field.value = saved[field.dataset.errorField] || "";
      field.addEventListener("input", () => {
        saved[field.dataset.errorField] = field.value;
        localStorage.setItem(storageKey, JSON.stringify(saved));
        $("#error-status").textContent = "已保存在本机浏览器";
      });
    });
  }

  function initFormulaCopy() {
    $$("[data-copy-tex]").forEach((button) => {
      button.addEventListener("click", async () => {
        const target = document.getElementById(button.dataset.copyTex);
        const tex = target?.dataset.tex || target?.textContent || "";
        try {
          await navigator.clipboard.writeText(tex);
          button.textContent = "已复制";
          setTimeout(() => {
            button.textContent = "复制 LaTeX";
          }, 1200);
        } catch {
          button.textContent = "无法访问剪贴板";
        }
      });
    });
  }

  function preparePrint() {
    $$("details").forEach((details) => {
      if (!details.open) details.dataset.openedForPrint = "true";
      details.open = true;
    });
  }

  function initPrint() {
    $$("[data-print]").forEach((button) => {
      button.addEventListener("click", () => {
        preparePrint();
        window.print();
      });
    });
    window.addEventListener("beforeprint", preparePrint);
  }

  function initTermAnchorIndex() {
    const root = $("#term-letter-index");
    if (!root) return;
    const firstLetters = new Map();

    content.terms.forEach((term) => {
      const letter = (term.en.match(/[A-Za-z]/)?.[0] || "#").toUpperCase();
      if (!firstLetters.has(letter)) firstLetters.set(letter, term.en);
    });

    root.innerHTML = [...firstLetters.keys()]
      .sort()
      .map((letter) => `<a href="#terms" data-letter="${letter}">${letter}</a>`)
      .join(" ");

    $$("[data-letter]", root).forEach((link) => {
      link.addEventListener("click", () => {
        const input = $("#term-search");
        input.value = link.dataset.letter === "#" ? "" : link.dataset.letter;
        input.dispatchEvent(new Event("input"));
        $("#terms").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initActiveNav() {
    const links = $$(".side-nav a[href^='#']");
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => {
          link.toggleAttribute("aria-current", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-18% 0px -72% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
  }

  renderTerms();
  renderExercises();
  renderFormulaCards();
  initTermFilters();
  initExerciseFilters();
  initProgress();
  initErrorLog();
  initFormulaCopy();
  initPrint();
  initTermAnchorIndex();
  initActiveNav();
})();
