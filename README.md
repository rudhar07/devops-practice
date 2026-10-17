# DevOps Exam Practice

An interactive practice site for the DevOps course: **19 sessions, 190 multiple-choice questions and 57 lab questions**.

**Live site:** https://rudhar07.github.io/devops-practice/

- **MCQs:** pick an option and it turns **green** (correct) or **red** (wrong), with the right answer and a short explanation either way.
- **Labs:** write your commands or config, then press **Check answer**. The page lists each required step as ✓ or ✗, and shows **green** only when every required step is covered. It also shows an explanation and a model answer.
- Progress is saved in your browser (localStorage), and the site has a dark mode.

The lab check looks for the key commands and concepts each lab needs. It can't run your commands, so practise them in a real environment too.

## Source

The questions, options and MCQ answer key come from the course's
[DevOps Exam Practice sheets](https://github.com/Nency-Ravaliya/devops-heros/tree/main/DevOps-Exam-Practice-Quentions)
(copied unchanged into `source/`). The MCQ explanations, lab checks and model answers in `data/enrich/` were written for this site.

## Structure

```
index.html              session list + overall progress
sessions/session-NN.html one page per session (generated)
assets/style.css        styles (light + dark)
assets/app.js           renders questions, checks answers, saves progress
data/session-NN.js      merged data per session (generated)
data/enrich/*.json      explanations, lab checks, model answers
source/*.md             the original practice sheets
tools/build.py          regenerates sessions/ and data/*.js from source/ + data/enrich/
```

To rebuild after editing `source/` or `data/enrich/`:

```bash
python3 tools/build.py
```

The build fails if a sheet doesn't parse, or if any lab's model answer doesn't pass its own checks.

## Hosting on GitHub Pages

Repo → **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save**.
After about a minute the site is live at `https://rudhar07.github.io/devops-practice/`.

Plain static files, no build step on GitHub, and `.nojekyll` makes GitHub serve them as they are.
