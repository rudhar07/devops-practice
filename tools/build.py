#!/usr/bin/env python3
"""Build the DevOps practice site.

Inputs:
  source/<slug>.md       the instructor's practice sheets (MCQs, answer key, labs)
  data/enrich/<slug>.json  explanations, lab checks and model answers (written for this site)
Outputs:
  data/sessions-index.js, data/session-NN.js, sessions/session-NN.html, index.html

Run from the repo root:  python3 tools/build.py
It fails loudly if a sheet doesn't parse, or if a lab's model answer doesn't pass its own checks.
"""
import glob
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_REPO = "https://github.com/Nency-Ravaliya/devops-heros/tree/main/DevOps-Exam-Practice-Quentions"

TITLES = {
    1: "DevOps Engineer Roadmap",
    2: "Linux Fundamentals",
    3: "Shell Scripting",
    4: "Networking Fundamentals",
    5: "Git & GitHub",
    6: "Docker Fundamentals & Images",
    8: "Docker Networking & Volumes",
    9: "Kubernetes Fundamentals",
    10: "Pods, ReplicaSets & Deployments",
    11: "Kubernetes Networking & Services",
    12: "Ingress, ConfigMaps & Secrets",
    13: "Storage, HPA & Probes",
    14: "Kubernetes Troubleshooting",
    15: "Helm",
    16: "CI/CD & GitHub Actions",
    17: "Complete CI/CD & DevSecOps",
    18: "Terraform & Infrastructure as Code",
    19: "Cloud & Terraform in Action",
    20: "Monitoring, Observability & GitOps",
}
LABELS = {6: "Session 6 & 7"}


def parse_sheet(path):
    slug = os.path.basename(path)[:-3]
    text = open(path, encoding="utf-8").read()
    num = int(re.match(r"session-?(\d+)", slug).group(1))
    mcq_part, rest = text.split("## Answer Key", 1)
    key = {int(n): l for n, l in re.findall(r"(\d+)-([A-D])", rest.split("---")[0])}
    mcqs = []
    for m in re.finditer(r"### Q(\d+)\. (.+?)\n(.*?)(?=\n### Q|\n---|\Z)", mcq_part, re.S):
        n, stem, body = int(m.group(1)), m.group(2).strip(), m.group(3)
        opts = dict(re.findall(r"^([A-D])\. (.+)$", body, re.M))
        if len(opts) != 4 or n not in key:
            sys.exit(f"{slug} Q{n}: expected 4 options and a key entry")
        mcqs.append({"n": n, "q": stem, "options": [opts[k].strip() for k in "ABCD"], "answer": "ABCD".index(key[n])})
    labs = [{"n": int(n), "task": " ".join(t.split())}
            for n, t in re.findall(r"### Lab (\d+)\n(.+?)(?=\n### Lab|\Z)", rest, re.S)]
    fmt = re.search(r"\*\*Suggested format:\*\*\s*(.+)", rest)
    return {"num": num, "slug": slug, "mcqs": mcqs, "labs": labs,
            "labFormat": fmt.group(1).strip() if fmt else ""}


JS_UNSAFE = re.compile(r"\(\?<[=!]|\(\?[a-z]+\)")  # lookbehind / inline flags: not portable to JS


def merge(sheet, enrich, problems):
    slug = sheet["slug"]
    mcq_extra = {m["n"]: m for m in enrich.get("mcq", [])}
    for q in sheet["mcqs"]:
        e = mcq_extra.get(q["n"])
        if not e:
            problems.append(f"{slug} Q{q['n']}: no explanation")
            continue
        q["explanation"] = e.get("explanation", "")
        if e.get("distractors"):
            q["distractors"] = e["distractors"]
        kc = e.get("keyCheck", "ok")
        if kc and kc != "ok":
            q["keyNote"] = re.sub(r"^disagree:\s*", "", kc)
    lab_extra = {l["n"]: l for l in enrich.get("labs", [])}
    for lab in sheet["labs"]:
        e = lab_extra.get(lab["n"])
        if not e:
            problems.append(f"{slug} Lab {lab['n']}: no checks")
            continue
        lab["checks"] = e["checks"]
        lab["modelAnswer"] = e.get("modelAnswer", "")
        lab["explanation"] = e.get("explanation", "")
        for c in lab["checks"]:
            if not c.get("patterns"):
                problems.append(f"{slug} Lab {lab['n']} '{c.get('label')}': no patterns")
            for p in c.get("patterns", []):
                if JS_UNSAFE.search(p):
                    problems.append(f"{slug} Lab {lab['n']}: pattern not JS-safe: {p}")
                try:
                    re.compile(p)
                except re.error as err:
                    problems.append(f"{slug} Lab {lab['n']}: bad regex {p}: {err}")
            if not any(re.search(p, lab["modelAnswer"], re.I) for p in c.get("patterns", [])):
                problems.append(f"{slug} Lab {lab['n']}: model answer fails check '{c['label']}'")


SESSION_HTML = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{label}: {title} · DevOps Practice</title>
<meta name="description" content="Practice MCQs and lab questions for {label}: {title}.">
<link rel="stylesheet" href="../assets/style.css">
</head>
<body data-page="session">
<header class="top"><div class="wrap">
  <a class="brand" href="../index.html">DevOps <span>Practice</span></a>
  <div class="spacer"></div>
  <button class="theme-toggle" type="button">☾ Dark</button>
</div></header>
<main class="wrap">
  <div class="crumbs"><a href="../index.html">All sessions</a> / <span id="s-label"></span></div>
  <h1 id="s-title"></h1>
  <div class="score-line"><span id="score"></span><button class="btn" id="reset" type="button">Reset this session</button></div>

  <h2>Multiple-choice questions</h2>
  <p class="sub">Pick an option to see if it's right, with a short explanation either way.</p>
  <div id="mcqs"></div>

  <h2>Practical / lab questions</h2>
  <p class="sub">Write your answer, then press <b>Check answer</b>. Green means every required step is covered.</p>
  <div class="format-hint" id="lab-format"></div>
  <div id="labs"></div>

  <nav class="pager" id="pager" aria-label="Session navigation"></nav>
  <p class="foot">Questions and answer key from the course's <a href="{source}">DevOps Exam Practice sheets</a>. Explanations, lab checks and model answers were written for this site; your answers are saved only in this browser.</p>
</main>
<script src="../data/sessions-index.js"></script>
<script src="../data/session-{nn}.js"></script>
<script src="../assets/app.js"></script>
</body>
</html>
"""

INDEX_HTML = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DevOps Exam Practice</title>
<meta name="description" content="Interactive practice for the DevOps course: {mcqs} MCQs with explanations and {labs} lab questions with instant checks.">
<link rel="stylesheet" href="assets/style.css">
</head>
<body data-page="index">
<header class="top"><div class="wrap">
  <a class="brand" href="index.html">DevOps <span>Practice</span></a>
  <div class="spacer"></div>
  <button class="theme-toggle" type="button">☾ Dark</button>
</div></header>
<main class="wrap">
  <h1>DevOps Exam Practice</h1>
  <p class="sub">{sessions} sessions · {mcqs} multiple-choice questions with explanations · {labs} lab questions with instant checks. Progress is saved in this browser.</p>
  <div class="summary" id="summary"></div>
  <div class="grid" id="grid"></div>
  <p style="margin-top:20px"><button class="btn" id="reset-all" type="button">Reset all progress</button></p>
  <p class="foot">Questions and answer key from the course's <a href="{source}">DevOps Exam Practice sheets</a>. Explanations, lab checks and model answers were written for this site.</p>
</main>
<script src="data/sessions-index.js"></script>
<script src="assets/app.js"></script>
</body>
</html>
"""


def main():
    sheets = sorted((parse_sheet(p) for p in glob.glob(os.path.join(ROOT, "source", "*.md"))), key=lambda s: s["num"])
    if not sheets:
        sys.exit("no source/*.md found")
    problems = []
    for s in sheets:
        s["title"] = TITLES.get(s["num"], s["slug"])
        s["label"] = LABELS.get(s["num"], f"Session {s['num']}")
        epath = os.path.join(ROOT, "data", "enrich", s["slug"] + ".json")
        if os.path.exists(epath):
            merge(s, json.load(open(epath, encoding="utf-8")), problems)
        else:
            problems.append(f"{s['slug']}: no enrich file")
    if problems:
        print("\n".join("PROBLEM: " + p for p in problems))
        if "--allow-missing" not in sys.argv:
            sys.exit(f"{len(problems)} problem(s); fix them or pass --allow-missing for a preview build")

    os.makedirs(os.path.join(ROOT, "sessions"), exist_ok=True)
    index = [{"num": s["num"], "slug": s["slug"], "title": s["title"], "label": s["label"],
              "mcqCount": len(s["mcqs"]), "labCount": len(s["labs"])} for s in sheets]
    with open(os.path.join(ROOT, "data", "sessions-index.js"), "w", encoding="utf-8") as f:
        f.write("window.SESSIONS = " + json.dumps(index, ensure_ascii=False, indent=1) + ";\n")
    for s in sheets:
        nn = f"{s['num']:02d}"
        with open(os.path.join(ROOT, "data", f"session-{nn}.js"), "w", encoding="utf-8") as f:
            f.write("window.SESSION = " + json.dumps(s, ensure_ascii=False, indent=1) + ";\n")
        with open(os.path.join(ROOT, "sessions", f"session-{nn}.html"), "w", encoding="utf-8") as f:
            f.write(SESSION_HTML.format(label=html.escape(s["label"]), title=html.escape(s["title"]), nn=nn, source=SOURCE_REPO))
    with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
        f.write(INDEX_HTML.format(sessions=len(sheets), mcqs=sum(len(s["mcqs"]) for s in sheets),
                                  labs=sum(len(s["labs"]) for s in sheets), source=SOURCE_REPO))
    print(f"built {len(sheets)} sessions, {sum(len(s['mcqs']) for s in sheets)} MCQs, "
          f"{sum(len(s['labs']) for s in sheets)} labs; problems: {len(problems)}")


if __name__ == "__main__":
    main()
