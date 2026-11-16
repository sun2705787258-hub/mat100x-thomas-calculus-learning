(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const normalize = (value) => String(value ?? "").toLocaleLowerCase("zh-CN").replace(/\s+/g, " ").trim();
  const script = $('script[src$="assets/site.js"]');
  const siteRoot = new URL("../", script?.src || location.href);

  function initMenu() {
    const button = $("[data-menu-toggle]");
    const nav = $("#site-navigation");
    if (!button || !nav) return;
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
  }

  function initSearch() {
    const dialog = $("[data-search-dialog]");
    if (!dialog) return;
    const input = $("#site-search-input", dialog);
    const results = $("[data-search-results]", dialog);
    const typeButtons = $$("[data-search-type]", dialog);
    let activeType = "all";

    const open = () => {
      dialog.hidden = false;
      document.body.classList.add("search-open");
      requestAnimationFrame(() => input.focus());
    };
    const close = () => {
      dialog.hidden = true;
      document.body.classList.remove("search-open");
    };
    const render = () => {
      const query = normalize(input.value);
      const entries = (window.SEARCH_INDEX || []).filter((entry) => {
        if (activeType !== "all" && entry.type !== activeType) return false;
        return !query || normalize(`${entry.title} ${entry.text} ${entry.type}`).includes(query);
      });
      const labels = { chapter: "章节", term: "术语", formula: "公式", exercise: "练习" };
      results.innerHTML = entries.length
        ? entries
            .slice(0, 40)
            .map(
              (entry) =>
                `<a href="${new URL(entry.url, siteRoot).href}"><span>${labels[entry.type] || entry.type}</span><strong>${escapeHtml(
                  entry.title,
                )}</strong><small>${escapeHtml(entry.text)}</small></a>`,
            )
            .join("")
        : `<p class="site-search-empty">${query ? "没有匹配结果。" : "输入关键词开始搜索。"}</p>`;
    };

    $$("[data-search-open]").forEach((button) => button.addEventListener("click", open));
    $$("[data-search-close]", dialog).forEach((button) => button.addEventListener("click", close));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
    input.addEventListener("input", render);
    typeButtons.forEach((button) =>
      button.addEventListener("click", () => {
        activeType = button.dataset.searchType;
        typeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      }),
    );
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !dialog.hidden) close();
      if ((event.key === "/" || (event.ctrlKey && event.key.toLowerCase() === "k")) && !/input|textarea/i.test(document.activeElement.tagName)) {
        event.preventDefault();
        open();
      }
    });
    render();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function readJson(key, fallback = {}) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
    } catch {
      return fallback;
    }
  }

  function initProgress() {
    const boxes = $$("[data-mastery]");
    if (!boxes.length) return;
    const unifiedKey = "thomas-unified-mastery-v1";
    const saved = readJson(unifiedKey);
    const legacyCache = {};

    boxes.forEach((box) => {
      const canonicalId = box.dataset.mastery;
      const legacyStore = box.dataset.legacyStore;
      const legacyId = box.dataset.legacyMastery;
      let checked = Boolean(saved[canonicalId]);
      if (!(canonicalId in saved) && legacyStore && legacyId) {
        legacyCache[legacyStore] ||= readJson(legacyStore);
        checked = Boolean(legacyCache[legacyStore][legacyId]);
      }
      box.checked = checked;
      if (checked && !(canonicalId in saved)) saved[canonicalId] = true;
      box.addEventListener("change", () => {
        saved[canonicalId] = box.checked;
        localStorage.setItem(unifiedKey, JSON.stringify(saved));
        update();
      });
    });
    localStorage.setItem(unifiedKey, JSON.stringify(saved));

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
    const key = "thomas-unified-error-log-v1";
    const saved = readJson(key);
    let timer;
    fields.forEach((field) => {
      field.value = saved[field.dataset.errorField] || "";
      field.addEventListener("input", () => {
        saved[field.dataset.errorField] = field.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
          localStorage.setItem(key, JSON.stringify(saved));
          const status = $("#error-status");
          if (status) status.textContent = "已保存到本机浏览器";
        }, 180);
      });
    });
  }

  function initFilters() {
    const input = $("[data-filter-input]");
    const chapter = $("[data-filter-chapter]");
    if (!input) return;
    const type = input.dataset.filterInput;
    const items = $$(`[data-filter-item="${type}"]`);
    const count = $(`[data-filter-count="${type}"]`);
    const apply = () => {
      const query = normalize(input.value);
      let visible = 0;
      items.forEach((item) => {
        const show =
          (!query || normalize(item.dataset.search || item.textContent).includes(query)) &&
          (!chapter?.value || item.dataset.chapter === chapter.value);
        item.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = `${visible} 项`;
    };
    input.addEventListener("input", apply);
    chapter?.addEventListener("change", apply);
    apply();
  }

  function initDisabledLinks() {
    $$("[data-disabled-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        link.blur();
      });
    });
  }

  initMenu();
  initSearch();
  initProgress();
  initErrorLog();
  initFilters();
  initDisabledLinks();
})();
