/* DevOps Exam Practice: renders the index and session pages from window.SESSIONS / window.SESSION. */
(function () {
  "use strict";

  const STORE_PREFIX = "devops-practice:";
  const LETTERS = ["A", "B", "C", "D"];

  // ---------- storage (per-browser progress; the page works without it) ----------
  function load(slug) {
    try { return JSON.parse(localStorage.getItem(STORE_PREFIX + slug)) || { mcq: {}, labs: {} }; }
    catch (e) { return { mcq: {}, labs: {} }; }
  }
  function save(slug, state) {
    try { localStorage.setItem(STORE_PREFIX + slug, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  // Escape, then turn `backticks` into <code>.
  function rich(s) {
    return esc(s || "").replace(/`([^`]+)`/g, "<code>$1</code>");
  }
  function el(tag, attrs, html) {
    const n = document.createElement(tag);
    for (const k in (attrs || {})) {
      if (k === "class") n.className = attrs[k]; else n.setAttribute(k, attrs[k]);
    }
    if (html != null) n.innerHTML = html;
    return n;
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function pageFile(s) { return "session-" + pad(s.num) + ".html"; }

  // ---------- theme toggle ----------
  function initTheme() {
    const btn = document.querySelector(".theme-toggle");
    let saved = null;
    try { saved = localStorage.getItem(STORE_PREFIX + "theme"); } catch (e) {}
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    if (!btn) return;
    const label = () => {
      const t = document.documentElement.getAttribute("data-theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      btn.textContent = t === "dark" ? "☀ Light" : "☾ Dark";
    };
    label();
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(STORE_PREFIX + "theme", next); } catch (e) {}
      label();
    });
  }

  // ---------- index page ----------
  function renderIndex() {
    const list = window.SESSIONS || [];
    const grid = document.getElementById("grid");
    grid.innerHTML = "";  // safe to call again: progress is redrawn from storage each time
    let answered = 0, correct = 0, labsPassed = 0, total = 0, totalLabs = 0;
    list.forEach(s => {
      const st = load(s.slug);
      const a = Object.keys(st.mcq).length;
      const c = Object.values(st.mcq).filter(v => v.correct).length;
      const lp = Object.values(st.labs).filter(v => v.passed).length;
      answered += a; correct += c; labsPassed += lp; total += s.mcqCount; totalLabs += s.labCount;
      const pct = Math.round((a / s.mcqCount) * 100);
      const done = a === s.mcqCount;
      const card = el("a", { class: "card" + (done ? " done" : ""), href: "sessions/" + pageFile(s) },
        `<div class="num">${esc(s.label)}${done ? ' <span class="badge">✓ Completed</span>' : ""}</div>
         <div class="title">${esc(s.title)}</div>
         <div class="meta">${s.mcqCount} MCQs · ${s.labCount} labs${a ? ` · <b>${c}/${a}</b> correct` : ""}${lp ? ` · ${lp}/${s.labCount} labs ✓` : ""}</div>
         <div class="bar" aria-hidden="true"><i style="width:${pct}%"></i></div>`);
      grid.appendChild(card);
    });
    const sum = document.getElementById("summary");
    if (sum) {
      sum.innerHTML =
        `<div class="stat"><b>${answered}/${total}</b><span>MCQs answered</span></div>
         <div class="stat"><b>${answered ? Math.round((correct / answered) * 100) : 0}%</b><span>MCQ accuracy</span></div>
         <div class="stat"><b>${labsPassed}/${totalLabs}</b><span>labs passed</span></div>`;
    }
  }

  function initIndex() {
    renderIndex();
    // Browsers (Safari especially) restore the home page from their back/forward cache without
    // re-running scripts, which would show old progress. Redraw whenever the page is shown again,
    // the tab becomes visible, or another tab saves answers.
    window.addEventListener("pageshow", e => { if (e.persisted) renderIndex(); });
    document.addEventListener("visibilitychange", () => { if (!document.hidden) renderIndex(); });
    window.addEventListener("storage", e => { if (!e.key || e.key.startsWith(STORE_PREFIX)) renderIndex(); });
    const reset = document.getElementById("reset-all");
    if (reset) reset.addEventListener("click", () => {
      if (!confirm("Clear all saved answers in this browser?")) return;
      (window.SESSIONS || []).forEach(s => { try { localStorage.removeItem(STORE_PREFIX + s.slug); } catch (e) {} });
      renderIndex();
    });
  }

  // ---------- session page ----------
  function renderSession() {
    const S = window.SESSION;
    if (!S) return;
    const state = load(S.slug);
    document.title = `${S.label}: ${S.title} · DevOps Practice`;
    document.getElementById("s-label").textContent = S.label;
    document.getElementById("s-title").textContent = S.title;

    const mcqBox = document.getElementById("mcqs");
    S.mcqs.forEach(q => mcqBox.appendChild(renderMcq(S, q, state)));

    const fmt = document.getElementById("lab-format");
    if (S.labFormat && fmt) fmt.innerHTML = "<b>Suggested format:</b> " + rich(S.labFormat);
    const labBox = document.getElementById("labs");
    S.labs.forEach(l => labBox.appendChild(renderLab(S, l, state)));

    updateScore(S, state);
    document.getElementById("reset").addEventListener("click", () => {
      if (!confirm("Clear your answers for this session?")) return;
      try { localStorage.removeItem(STORE_PREFIX + S.slug); } catch (e) {}
      location.reload();
    });

    // prev / next
    const list = window.SESSIONS || [];
    const i = list.findIndex(x => x.slug === S.slug);
    const pager = document.getElementById("pager");
    if (pager) {
      const prev = list[i - 1], next = list[i + 1];
      pager.innerHTML =
        (prev ? `<a class="btn" href="${pageFile(prev)}">← ${esc(prev.label)}</a>` : "<span></span>") +
        (next ? `<a class="btn primary" href="${pageFile(next)}">${esc(next.label)} →</a>` : `<a class="btn" href="../index.html">All sessions</a>`);
    }
  }

  function updateScore(S, state) {
    const a = Object.keys(state.mcq).length;
    const c = Object.values(state.mcq).filter(v => v.correct).length;
    const lp = Object.values(state.labs).filter(v => v.passed).length;
    document.getElementById("score").innerHTML =
      `<span class="pill">MCQs: ${c}/${S.mcqs.length} correct (${a} answered)</span>
       <span class="pill">Labs passed: ${lp}/${S.labs.length}</span>`;
  }

  function renderMcq(S, q, state) {
    const box = el("section", { class: "q", id: "q" + q.n });
    box.appendChild(el("h3", null, `<span class="qn">Q${q.n}.</span>${rich(q.q)}`));
    const opts = el("div", { class: "options", role: "group", "aria-label": "Options for question " + q.n });
    const fb = el("div", { "aria-live": "polite" });
    const buttons = q.options.map((text, i) => {
      const b = el("button", { class: "option", type: "button" },
        `<span class="letter">${LETTERS[i]}</span><span>${rich(text)}</span>`);
      b.addEventListener("click", () => choose(i));
      opts.appendChild(b);
      return b;
    });
    box.appendChild(opts);
    box.appendChild(fb);

    function choose(i, restoring) {
      const right = i === q.answer;
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (j === q.answer) b.classList.add("correct");
        else if (j === i) b.classList.add("wrong");
        else b.classList.add("dim");
      });
      const ans = `${LETTERS[q.answer]}. ${q.options[q.answer]}`;
      fb.className = "feedback " + (right ? "ok" : "bad");
      fb.innerHTML =
        `<span class="verdict">${right ? "✓ Correct" : "✗ Wrong. Correct answer: " + rich(ans)}</span>` +
        (q.explanation ? `<p>${rich(q.explanation)}</p>` : "") +
        (q.distractors ? `<p class="note">${rich(q.distractors)}</p>` : "") +
        (q.keyNote ? `<p class="note">Note on the answer key: ${rich(q.keyNote)}</p>` : "");
      retry.hidden = false;
      if (!restoring) {
        state.mcq[q.n] = { choice: i, correct: right };
        save(S.slug, state);
        updateScore(S, state);
      }
    }
    const retry = el("button", { class: "btn", type: "button", style: "margin-top:10px" }, "Try again");
    retry.hidden = true;
    retry.addEventListener("click", () => {
      delete state.mcq[q.n];
      save(S.slug, state);
      updateScore(S, state);
      buttons.forEach(b => { b.disabled = false; b.className = "option"; });
      fb.className = ""; fb.innerHTML = "";
      retry.hidden = true;
      buttons[0].focus();
    });
    box.appendChild(retry);
    if (state.mcq[q.n]) choose(state.mcq[q.n].choice, true);
    return box;
  }

  function renderLab(S, lab, state) {
    const box = el("section", { class: "q lab", id: "lab" + lab.n });
    box.appendChild(el("h3", null, `<span class="qn">Lab ${lab.n}.</span>`));
    box.appendChild(el("p", { class: "task" }, rich(lab.task)));
    const ta = el("textarea", {
      "aria-label": "Your answer for lab " + lab.n, spellcheck: "false",
      placeholder: "Write your commands / config here, one step per line…"
    });
    const saved = state.labs[lab.n];
    if (saved && saved.text) ta.value = saved.text;
    box.appendChild(ta);

    const actions = el("div", { class: "lab-actions" });
    const check = el("button", { class: "btn primary", type: "button" }, "Check answer");
    const clear = el("button", { class: "btn", type: "button" }, "Clear");
    actions.appendChild(check); actions.appendChild(clear);
    box.appendChild(actions);
    const fb = el("div", { "aria-live": "polite" });
    box.appendChild(fb);

    ta.addEventListener("input", () => {
      state.labs[lab.n] = Object.assign({}, state.labs[lab.n], { text: ta.value });
      save(S.slug, state);
    });

    function grade(restoring) {
      const text = ta.value;
      if (!text.trim()) {
        fb.className = "feedback bad";
        fb.innerHTML = `<span class="verdict">✗ Nothing to check yet</span><p>Write your answer above, then press <b>Check answer</b>.</p>`;
        return;
      }
      const results = (lab.checks || []).map(c => ({
        label: c.label,
        hit: c.patterns.some(p => { try { return new RegExp(p, "i").test(text); } catch (e) { return false; } })
      }));
      const passed = results.length > 0 && results.every(r => r.hit);
      const hits = results.filter(r => r.hit).length;
      fb.className = "feedback " + (passed ? "ok" : "bad");
      fb.innerHTML =
        `<span class="verdict">${passed ? "✓ Right: every required step is covered" : `✗ Not complete yet: ${hits}/${results.length} required steps covered`}</span>` +
        `<ul class="checks">${results.map(r =>
          `<li class="${r.hit ? "hit" : "miss"}"><span class="mark">${r.hit ? "✓" : "✗"}</span><span>${rich(r.label)}</span></li>`).join("")}</ul>` +
        (lab.explanation ? `<p>${rich(lab.explanation)}</p>` : "") +
        (lab.modelAnswer ? `<details class="model"${passed ? "" : " open"}><summary>Model answer</summary><pre>${esc(lab.modelAnswer)}</pre></details>` : "") +
        `<p class="note">The check looks for the key commands and concepts this lab needs. It can't run your commands, so test them in a real lab too.</p>`;
      if (!restoring) {
        state.labs[lab.n] = { text, passed };
        save(S.slug, state);
        updateScore(S, state);
      }
    }
    check.addEventListener("click", () => grade(false));
    clear.addEventListener("click", () => {
      ta.value = ""; fb.className = ""; fb.innerHTML = "";
      delete state.labs[lab.n]; save(S.slug, state); updateScore(S, state);
    });
    if (saved && saved.text && saved.passed !== undefined) grade(true);
    return box;
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    if (document.body.dataset.page === "index") initIndex();
    if (document.body.dataset.page === "session") renderSession();
  });
})();
