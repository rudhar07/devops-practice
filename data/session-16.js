window.SESSION = {
 "num": 16,
 "slug": "session-16-github-actions",
 "mcqs": [
  {
   "n": 1,
   "q": "Where are GitHub Actions workflow files normally stored?",
   "options": [
    ".github/workflows/",
    ".kube/actions/",
    ".git/actions/",
    ".docker/workflows/"
   ],
   "answer": 0,
   "explanation": "GitHub Actions workflows are YAML files stored in `.github/workflows/` at the repository root; GitHub only picks up workflow files from that directory.",
   "distractors": "The .git directory is Git's internal database and is never pushed as content; .kube and .docker are local tool config folders."
  },
  {
   "n": 2,
   "q": "Which YAML key specifies workflow triggers?",
   "options": [
    "jobs",
    "env",
    "on",
    "steps"
   ],
   "answer": 2,
   "explanation": "The top-level `on` key lists the events that trigger the workflow, such as push, pull_request, schedule or workflow_dispatch.",
   "distractors": "`jobs` defines the work, `env` defines variables, and `steps` sits inside a job."
  },
  {
   "n": 3,
   "q": "What is a job in GitHub Actions?",
   "options": [
    "A Docker volume",
    "A Kubernetes Service",
    "A group of steps run on a runner",
    "A Git branch"
   ],
   "answer": 2,
   "explanation": "A job is a group of steps that run on the same runner; jobs run in parallel by default unless linked with `needs`.",
   "distractors": "Volumes, Services and branches are Docker, Kubernetes and Git concepts, not Actions concepts."
  },
  {
   "n": 4,
   "q": "What does runs-on specify?",
   "options": [
    "Runner environment for a job",
    "Git default branch",
    "Kubernetes namespace",
    "Target Docker registry"
   ],
   "answer": 0,
   "explanation": "`runs-on` selects the runner environment for a job, e.g. `ubuntu-latest`, `windows-latest` or a self-hosted runner label.",
   "distractors": "Branches are chosen in `on:` filters, and namespaces and registries are set inside steps, not by `runs-on`."
  },
  {
   "n": 5,
   "q": "Which action commonly checks out repository code?",
   "options": [
    "actions/checkout",
    "actions/setup-dockerhub",
    "github/create-branch",
    "runner/load-repo"
   ],
   "answer": 0,
   "explanation": "`actions/checkout` clones the repository into the runner workspace; without it, later steps cannot see your code.",
   "distractors": "The other names are not official actions."
  },
  {
   "n": 6,
   "q": "What does a step's run field do?",
   "options": [
    "Executes shell commands",
    "Defines a Docker image digest",
    "Schedules a Kubernetes node",
    "Creates a cloud VPC automatically"
   ],
   "answer": 0,
   "explanation": "A step's `run` field executes shell commands on the runner (bash by default on Linux and macOS, pwsh on Windows).",
   "distractors": "Image digests, node scheduling and VPCs are not things `run` defines; it just runs the commands you give it."
  },
  {
   "n": 7,
   "q": "What does a step's uses field do?",
   "options": [
    "Creates a new repository",
    "Writes Terraform state",
    "Invokes a reusable action",
    "Starts an SSH daemon"
   ],
   "answer": 2,
   "explanation": "A step's `uses` field invokes a reusable action (e.g. `actions/setup-node@v4`) or a Docker image, optionally passing inputs with `with`.",
   "distractors": "`uses` does not create repositories, write state or start daemons; it calls packaged action code."
  },
  {
   "n": 8,
   "q": "How should sensitive tokens be supplied to workflows?",
   "options": [
    "GitHub Actions secrets",
    "Committed to README",
    "Hardcoded in YAML",
    "Printed to logs"
   ],
   "answer": 0,
   "explanation": "Sensitive tokens belong in GitHub Actions secrets (repository, environment or organization), referenced as `${{ secrets.NAME }}`; GitHub masks them in logs.",
   "distractors": "Anything committed to the README or YAML is visible to anyone who can read the repo and stays in Git history, and printing secrets to logs leaks them."
  },
  {
   "n": 9,
   "q": "What does needs do between jobs?",
   "options": [
    "Set Git author",
    "Select a Dockerfile stage",
    "Define container port mapping",
    "Declare job dependencies"
   ],
   "answer": 3,
   "explanation": "`needs` declares job dependencies: the job waits for the listed jobs to succeed and can read their outputs.",
   "distractors": "Git author, Dockerfile stages and port mappings are configured elsewhere."
  },
  {
   "n": 10,
   "q": "Which trigger runs a workflow on code pushes?",
   "options": [
    "push",
    "docker-build",
    "commit-only",
    "upload"
   ],
   "answer": 0,
   "explanation": "The `push` event triggers a workflow when commits (or tags) are pushed, optionally filtered by `branches`, `tags` or `paths`.",
   "distractors": "docker-build, commit-only and upload are not GitHub Actions events."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Create a GitHub Actions workflow triggered on push that checks out the repository, installs dependencies, and builds the application.",
   "checks": [
    {
     "label": "Triggers on push (on: push)",
     "patterns": [
      "\\bon\\s*:[\\s\\S]*\\bpush\\b",
      "\\bon\\s*:\\s*\\[?\\s*push"
     ]
    },
    {
     "label": "Defines a job with a runner (runs-on)",
     "patterns": [
      "\\bruns-on\\s*:"
     ]
    },
    {
     "label": "Checks out the repo (actions/checkout)",
     "patterns": [
      "actions/checkout"
     ]
    },
    {
     "label": "Installs dependencies (npm ci / pip install / etc.)",
     "patterns": [
      "\\bnpm\\s+(ci|install)\\b",
      "\\bpip3?\\s+install\\b",
      "\\byarn\\s+install\\b",
      "\\bpnpm\\s+install\\b",
      "\\bmvn\\b",
      "\\bgradlew?\\b",
      "\\bgo\\s+mod\\s+download\\b"
     ]
    },
    {
     "label": "Builds the application (build step)",
     "patterns": [
      "\\bbuild\\b"
     ]
    }
   ],
   "modelAnswer": "# .github/workflows/ci.yml\nname: CI\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Check out code\n        uses: actions/checkout@v4\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - name: Install dependencies\n        run: npm ci\n      - name: Build\n        run: npm run build",
   "explanation": "Tests the basic workflow skeleton: file under `.github/workflows/`, an `on: push` trigger, a job with `runs-on`, checkout first, then install and build. Verify by pushing a commit and checking that the run in the Actions tab goes green with each step's log visible."
  },
  {
   "n": 2,
   "task": "Add an automated test step. Demonstrate that a failing test causes the workflow to fail and that a corrected test passes.",
   "checks": [
    {
     "label": "Adds a test step (npm test / pytest / etc.)",
     "patterns": [
      "\\bnpm\\s+(run\\s+)?test\\b",
      "\\bpytest\\b",
      "\\bgo\\s+test\\b",
      "\\bmvn\\s+test\\b",
      "\\bgradlew?\\s+test\\b",
      "\\byarn\\s+test\\b"
     ]
    },
    {
     "label": "Shows a failing test failing the run (non-zero exit)",
     "patterns": [
      "fail"
     ]
    },
    {
     "label": "Shows the fixed test passing",
     "patterns": [
      "pass",
      "succe",
      "green"
     ]
    },
    {
     "label": "Runs inside a workflow job (runs-on / steps)",
     "patterns": [
      "\\bruns-on\\s*:",
      "\\bsteps\\s*:"
     ]
    }
   ],
   "modelAnswer": "# .github/workflows/ci.yml (job excerpt)\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - run: npm ci\n      - name: Run tests\n        run: npm test\n      - run: npm run build\n\n# sum.test.js: deliberately broken first\nconst sum = require('./sum');\ntest('adds numbers', () => { expect(sum(2, 2)).toBe(5); });\n\ngit commit -am \"test: deliberately failing test\" && git push\n# Run fails: npm test exits non-zero, the step and job are marked failed, the build step is skipped\n\n# Fix the assertion to expect(sum(2, 2)).toBe(4)\ngit commit -am \"test: fix assertion\" && git push\n# Run passes: all steps green",
   "explanation": "Tests that you understand a step fails when its command exits non-zero, which fails the job and skips later steps unless they use `if: always()`. Evidence should be two runs in the Actions tab: a red one with the failing assertion in the test log, then a green one after the fix."
  },
  {
   "n": 3,
   "task": "Extend the workflow to upload a build artifact and make it downloadable from the Actions run.",
   "checks": [
    {
     "label": "Uploads an artifact (actions/upload-artifact)",
     "patterns": [
      "actions/upload-artifact"
     ]
    },
    {
     "label": "Names the artifact (name:)",
     "patterns": [
      "\\bname\\s*:"
     ]
    },
    {
     "label": "Sets the artifact path (path:)",
     "patterns": [
      "\\bpath\\s*:"
     ]
    },
    {
     "label": "Builds before uploading",
     "patterns": [
      "\\bbuild\\b"
     ]
    },
    {
     "label": "Explains downloading it from the run (Artifacts section / gh run download)",
     "patterns": [
      "download"
     ]
    }
   ],
   "modelAnswer": "# .github/workflows/ci.yml (steps excerpt)\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n      - name: Upload build artifact\n        uses: actions/upload-artifact@v4\n        with:\n          name: web-build\n          path: dist/\n          retention-days: 7\n          if-no-files-found: error\n\n# Download: open the run in the Actions tab and use the Artifacts section at the bottom of the summary,\n# or from the CLI:\ngh run download <run-id> -n web-build",
   "explanation": "Tests persisting build outputs beyond the runner, which is discarded after the job. `actions/upload-artifact@v4` with a `name` and `path` creates a zip attached to the run; `if-no-files-found: error` makes a wrong path fail loudly. Verify that the artifact appears under Artifacts in the run summary and contains the built files."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "CI/CD & GitHub Actions",
 "label": "Session 16"
};
