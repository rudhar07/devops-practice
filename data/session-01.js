window.SESSION = {
 "num": 1,
 "slug": "session1-devops-engineer-roadmap",
 "mcqs": [
  {
   "n": 1,
   "q": "What is the primary objective of DevOps?",
   "options": [
    "Faster, reliable delivery through collaboration and automation",
    "Replace developers with servers",
    "Avoid version control",
    "Eliminate all testing"
   ],
   "answer": 0,
   "explanation": "DevOps aims for faster, reliable delivery through collaboration and automation: development and operations work together and automate the path from commit to production so changes ship often and safely.",
   "distractors": "DevOps keeps developers, version control and testing; it adds automation and shared ownership rather than removing any of them."
  },
  {
   "n": 2,
   "q": "What does CI mean?",
   "options": [
    "Central Installation",
    "Continuous Integration",
    "Cloud Inspection",
    "Code Isolation"
   ],
   "answer": 1,
   "explanation": "CI stands for Continuous Integration: developers merge small changes into a shared branch frequently, and every merge is automatically built and tested.",
   "distractors": "Central Installation, Cloud Inspection and Code Isolation are not standard terms; the opposite of isolation is the point of CI."
  },
  {
   "n": 3,
   "q": "Which practice helps catch defects early?",
   "options": [
    "Manual deployment only",
    "Disabling logs",
    "Skipping code reviews",
    "Automated tests in CI"
   ],
   "answer": 3,
   "explanation": "Automated tests in CI run on every push or pull request, so a defect is caught minutes after it is introduced instead of in production.",
   "distractors": "Manual-only deployment, disabled logs and skipped reviews all make defects harder to find, not easier."
  },
  {
   "n": 4,
   "q": "What is infrastructure as code?",
   "options": [
    "Keeping server settings undocumented",
    "Writing only frontend code",
    "Managing infrastructure using versioned configuration",
    "Purchasing hardware manually"
   ],
   "answer": 2,
   "explanation": "Infrastructure as code means managing infrastructure using versioned configuration (for example Terraform or Ansible files in Git), so environments are reproducible, reviewable and automated.",
   "distractors": "Undocumented settings and manual hardware purchases are exactly what IaC replaces; frontend code is unrelated."
  },
  {
   "n": 5,
   "q": "Which tool is commonly used for source control?",
   "options": [
    "Prometheus",
    "Nginx",
    "Git",
    "Grafana"
   ],
   "answer": 2,
   "explanation": "Git is the standard distributed version control system for source code, usually hosted on GitHub, GitLab or Bitbucket.",
   "distractors": "Prometheus and Grafana are for monitoring and dashboards; Nginx is a web server and reverse proxy."
  },
  {
   "n": 6,
   "q": "What does a CI/CD pipeline automate?",
   "options": [
    "Build, test and delivery steps",
    "Employee attendance",
    "Domain purchases",
    "Keyboard configuration"
   ],
   "answer": 0,
   "explanation": "A CI/CD pipeline automates build, test and delivery steps: compiling or packaging the code, running tests, and deploying the artifact to environments.",
   "distractors": "Attendance, domain purchases and keyboard settings are not part of software delivery."
  },
  {
   "n": 7,
   "q": "Why are containers useful?",
   "options": [
    "They package applications with dependencies",
    "They remove the need for networks",
    "They guarantee zero bugs",
    "They replace all databases"
   ],
   "answer": 0,
   "explanation": "Containers package applications with dependencies (runtime, libraries, config) into one image, so the app behaves the same on a laptop, in CI and in production.",
   "distractors": "Containers still need networking, cannot guarantee bug-free code, and often run databases rather than replacing them."
  },
  {
   "n": 8,
   "q": "What is monitoring used for?",
   "options": [
    "Formatting YAML",
    "Compiling source code",
    "Tracking system health and behavior",
    "Creating Git branches"
   ],
   "answer": 2,
   "explanation": "Monitoring is for tracking system health and behavior: metrics, logs and alerts show whether services are up, fast and error-free.",
   "distractors": "Formatting YAML, compiling code and creating branches are development tasks, not monitoring."
  },
  {
   "n": 9,
   "q": "Which mindset is central to DevOps?",
   "options": [
    "Shared ownership across development and operations",
    "Only manual changes",
    "Separate teams with no communication",
    "No production feedback"
   ],
   "answer": 0,
   "explanation": "The core DevOps mindset is shared ownership across development and operations: the people who build a service also care about how it runs, and both sides collaborate.",
   "distractors": "Siloed teams, manual-only changes and ignoring production feedback are the anti-patterns DevOps was created to fix."
  },
  {
   "n": 10,
   "q": "Which is a common DevOps lifecycle activity?",
   "options": [
    "Continuous feedback",
    "Disabling security scans",
    "Ignoring incidents",
    "One-time deployment forever"
   ],
   "answer": 0,
   "explanation": "Continuous feedback is a DevOps lifecycle activity: monitoring, incidents and user input flow back into planning so the next iteration improves.",
   "distractors": "Disabling security scans, ignoring incidents and deploying once forever contradict the continuous, feedback-driven loop."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Given a sample application scenario, draw a simple CI/CD workflow from code commit to deployment. Label the build, test, package, deploy, and monitoring stages.",
   "checks": [
    {
     "label": "Starts from a code commit / push",
     "patterns": [
      "\\bcommit",
      "\\bpush"
     ]
    },
    {
     "label": "Has a build stage",
     "patterns": [
      "\\bbuild"
     ]
    },
    {
     "label": "Has a test stage",
     "patterns": [
      "\\btest"
     ]
    },
    {
     "label": "Has a package / artifact stage",
     "patterns": [
      "\\bpackag",
      "\\bartifact",
      "\\bimage\\b"
     ]
    },
    {
     "label": "Has a deploy stage",
     "patterns": [
      "\\bdeploy"
     ]
    },
    {
     "label": "Has a monitoring stage",
     "patterns": [
      "\\bmonitor"
     ]
    }
   ],
   "modelAnswer": "Scenario: a Node.js web app hosted on GitHub.\n\n[Developer] --git commit/push--> [GitHub repo]\n   |\n   v  (webhook triggers pipeline, e.g. GitHub Actions)\n1. Build    : checkout code, npm ci, lint, compile\n2. Test     : run unit + integration tests (npm test); fail pipeline on any failure\n3. Package  : docker build -t registry.example.com/shop:<git-sha> . and push the image (the artifact) to a registry\n4. Deploy   : deploy the image to staging, run smoke tests, then promote to production (manual approval or automatic)\n5. Monitor  : Prometheus/Grafana metrics, logs and alerts on errors and latency\n   |\n   +--feedback (alerts, incidents)--> back to developers / next commit",
   "explanation": "Tests whether you understand the ordered stages of a CI/CD pipeline and what each one does. A good answer starts with a commit triggering the pipeline, shows build, test, package (an immutable artifact such as a container image), deploy and monitoring, and ideally closes the loop with feedback from monitoring to developers."
  },
  {
   "n": 2,
   "task": "Compare a monolithic application and a microservices application for a provided online shopping use case. Identify two operational benefits and two challenges of microservices.",
   "checks": [
    {
     "label": "Describes the monolith",
     "patterns": [
      "\\bmonolith"
     ]
    },
    {
     "label": "Describes microservices",
     "patterns": [
      "micro-?services?"
     ]
    },
    {
     "label": "Names benefits",
     "patterns": [
      "\\bbenefit",
      "\\badvantage",
      "\\bpros?\\b"
     ]
    },
    {
     "label": "Names challenges",
     "patterns": [
      "\\bchallenge",
      "\\bdisadvantage",
      "\\bcons?\\b",
      "\\bdrawback"
     ]
    },
    {
     "label": "Mentions independent deploy or scaling",
     "patterns": [
      "\\bscal",
      "\\bindependent"
     ]
    }
   ],
   "modelAnswer": "Use case: an online shop with catalog, cart, orders, payments and user accounts.\n\nMonolith: one codebase and one deployable (e.g. a single app + one database). Simple to develop, test and deploy at first, but any change redeploys the whole shop and you scale everything together.\n\nMicroservices: separate services (catalog, cart, orders, payments, users), each with its own codebase, pipeline and data store, talking over HTTP/gRPC or a message queue.\n\nOperational benefits of microservices:\n1. Independent deployment: the payments team can ship a fix without redeploying the catalog, so releases are smaller and faster.\n2. Independent scaling and fault isolation: scale only the catalog service during a sale; a crash in recommendations does not take down checkout.\n\nChallenges of microservices:\n1. Operational complexity: many services to deploy, monitor and secure; needs containers/orchestration, centralized logging and distributed tracing.\n2. Distributed data and networking: calls can fail or be slow, so you need retries, timeouts and API versioning, and keeping data consistent across services (e.g. order + payment) is harder.",
   "explanation": "Tests whether you can weigh architecture choices from an operations point of view. Look for a clear description of each style for the shopping case, two concrete operational benefits (independent deploys, targeted scaling, fault isolation) and two real challenges (more moving parts, observability, network failures, data consistency)."
  },
  {
   "n": 3,
   "task": "Create a one-page DevOps roadmap for a small team that currently deploys manually. Prioritize version control, automated tests, containerization, CI/CD, and monitoring, with a short reason for each.",
   "checks": [
    {
     "label": "Covers version control (Git)",
     "patterns": [
      "\\bgit\\b",
      "version control"
     ]
    },
    {
     "label": "Covers automated tests",
     "patterns": [
      "\\btest"
     ]
    },
    {
     "label": "Covers containerization (Docker)",
     "patterns": [
      "\\bcontaineri",
      "\\bdocker"
     ]
    },
    {
     "label": "Covers CI/CD",
     "patterns": [
      "\\bci\\s*/\\s*cd\\b",
      "\\bpipeline"
     ]
    },
    {
     "label": "Covers monitoring",
     "patterns": [
      "\\bmonitor"
     ]
    },
    {
     "label": "Gives reasons",
     "patterns": [
      "\\bwhy\\b",
      "\\breason",
      "\\bbecause\\b"
     ]
    }
   ],
   "modelAnswer": "DevOps roadmap for a small team that deploys manually\n\nPriority 1 - Version control (Git + GitHub, weeks 1-2)\nReason: everything else (pipelines, reviews, rollbacks) depends on having all code and config in one history. Adopt a simple branch + pull request flow.\n\nPriority 2 - Automated tests (weeks 2-4)\nReason: a safety net so changes can be shipped quickly without breaking things; start with unit tests for critical paths.\n\nPriority 3 - Containerization (Docker, weeks 4-6)\nReason: one image runs the same in dev, test and prod, which removes 'works on my machine' problems and makes deployments repeatable.\n\nPriority 4 - CI/CD pipeline (GitHub Actions, weeks 6-8)\nReason: every push builds, tests and packages automatically; merges to main deploy to staging and then production, replacing manual, error-prone steps.\n\nPriority 5 - Monitoring and alerting (Prometheus/Grafana or a hosted tool, weeks 8-10)\nReason: once deploys are frequent you need fast feedback on health, errors and latency, plus alerts so incidents are caught before users report them.\n\nSuccess measures: deployment frequency, lead time, change failure rate, time to restore.",
   "explanation": "Tests whether you can order DevOps practices by dependency: version control first, then tests, containers, a pipeline that uses both, and monitoring to close the feedback loop. Each item should carry a short, concrete reason; bonus points for timelines and measurable outcomes such as the DORA metrics."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "DevOps Engineer Roadmap",
 "label": "Session 1"
};
