window.SESSION = {
 "num": 6,
 "slug": "session6-7-docker",
 "mcqs": [
  {
   "n": 1,
   "q": "What is a Docker image?",
   "options": [
    "A running virtual machine only",
    "A Git branch",
    "A DNS record",
    "A read-only template for creating containers"
   ],
   "answer": 3,
   "explanation": "A Docker image is a read-only template for creating containers: stacked filesystem layers plus metadata such as the default command. A container adds a writable layer on top.",
   "distractors": "An image is not a VM, a Git branch or a DNS record; containers share the host kernel instead of booting their own OS."
  },
  {
   "n": 2,
   "q": "Which command builds an image from a Dockerfile?",
   "options": [
    "docker start",
    "docker logs",
    "docker build",
    "docker exec"
   ],
   "answer": 2,
   "explanation": "`docker build` builds an image from a Dockerfile and a build context, e.g. `docker build -t myapp:1.0 .`.",
   "distractors": "`docker start` starts an existing container, `docker logs` shows output and `docker exec` runs a command in a running container."
  },
  {
   "n": 3,
   "q": "Which Dockerfile instruction sets the base image?",
   "options": [
    "COPY",
    "CMD",
    "EXPOSE",
    "FROM"
   ],
   "answer": 3,
   "explanation": "`FROM` sets the base image and must be the first instruction (only `ARG` may come before it), e.g. `FROM nginx:alpine`.",
   "distractors": "`COPY` adds files, `CMD` sets the default command and `EXPOSE` documents a port."
  },
  {
   "n": 4,
   "q": "Which Dockerfile instruction copies files into an image?",
   "options": [
    "USER",
    "WORKDIR",
    "COPY",
    "RUN"
   ],
   "answer": 2,
   "explanation": "`COPY` copies files from the build context into the image, e.g. `COPY index.html /usr/share/nginx/html/`.",
   "distractors": "`USER` sets the runtime user, `WORKDIR` sets the working directory and `RUN` executes a command at build time."
  },
  {
   "n": 5,
   "q": "Which command lists running containers?",
   "options": [
    "docker images",
    "docker ps",
    "docker build",
    "docker pull"
   ],
   "answer": 1,
   "explanation": "`docker ps` lists running containers; add `-a` to include stopped ones.",
   "distractors": "`docker images` lists images, `docker build` builds and `docker pull` downloads images."
  },
  {
   "n": 6,
   "q": "What does docker run -p 8080:80 map?",
   "options": [
    "A volume to port 80",
    "Host port 80 to container port 8080",
    "Host port 8080 to container port 80",
    "Two host ports together"
   ],
   "answer": 2,
   "explanation": "`-p 8080:80` maps host port 8080 to container port 80; the format is `HOST:CONTAINER`, so you browse to localhost:8080.",
   "distractors": "The order is host first, container second, and `-p` publishes ports, not volumes (that is `-v`)."
  },
  {
   "n": 7,
   "q": "What does docker logs show?",
   "options": [
    "Container standard output and error",
    "Registry credentials",
    "Git commit history",
    "Host kernel source"
   ],
   "answer": 0,
   "explanation": "`docker logs` shows a container's standard output and error streams, e.g. `docker logs -f web`.",
   "distractors": "Registry credentials are in Docker's config, Git history comes from `git log` and Docker never shows kernel source."
  },
  {
   "n": 8,
   "q": "Which command executes a command inside a running container?",
   "options": [
    "docker exec",
    "docker save",
    "docker tag",
    "docker push"
   ],
   "answer": 0,
   "explanation": "`docker exec` executes a command inside a running container, e.g. `docker exec -it web sh`.",
   "distractors": "`docker save` exports an image to a tar file, `docker tag` names an image and `docker push` uploads it."
  },
  {
   "n": 9,
   "q": "What is the purpose of .dockerignore?",
   "options": [
    "Block network access",
    "Ignore runtime errors",
    "Exclude paths from the build context",
    "Hide containers from ps"
   ],
   "answer": 2,
   "explanation": ".dockerignore is used to exclude paths from the build context (e.g. `.git`, `node_modules`, `.env`), making builds faster and keeping secrets out of images.",
   "distractors": "It does not affect networking, runtime errors or what `docker ps` shows."
  },
  {
   "n": 10,
   "q": "Which Dockerfile instruction defines a default command?",
   "options": [
    "LABEL",
    "ARG",
    "EXPOSE",
    "CMD"
   ],
   "answer": 3,
   "explanation": "`CMD` defines the default command a container runs, which can be overridden by arguments to `docker run`.",
   "distractors": "`LABEL` adds metadata, `ARG` defines build-time variables and `EXPOSE` documents ports."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Run an Nginx container with host port 8080 mapped to container port 80. Verify access using curl and inspect the container logs.",
   "checks": [
    {
     "label": "Runs nginx (docker run)",
     "patterns": [
      "\\bdocker\\s+(container\\s+)?run\\b[^\\n]*nginx"
     ]
    },
    {
     "label": "Maps host 8080 to container 80 (-p 8080:80)",
     "patterns": [
      "-p\\s+8080:80\\b",
      "--publish\\s+8080:80\\b"
     ]
    },
    {
     "label": "Runs detached (-d)",
     "patterns": [
      "\\s-d\\b",
      "--detach\\b",
      "\\s-\\w*d\\w*\\s"
     ]
    },
    {
     "label": "Verifies with curl",
     "patterns": [
      "\\bcurl\\b[^\\n]*:8080"
     ]
    },
    {
     "label": "Inspects logs (docker logs)",
     "patterns": [
      "\\bdocker\\s+(container\\s+)?logs\\b"
     ]
    }
   ],
   "modelAnswer": "docker run -d --name web -p 8080:80 nginx:latest\ndocker ps                       # STATUS Up, PORTS 0.0.0.0:8080->80/tcp\n\ncurl -I http://localhost:8080   # HTTP/1.1 200 OK, Server: nginx\ncurl http://localhost:8080      # 'Welcome to nginx!' page\n\ndocker logs web                 # access log line for each curl request\ndocker logs -f --tail 20 web    # follow live (Ctrl+C to stop)\n\n# clean up\ndocker rm -f web",
   "explanation": "Tests running a container with port publishing and basic verification. Check the `-p HOST:CONTAINER` order (8080:80), that curl hits localhost:8080 and gets a 200 from nginx, and that `docker logs` shows the matching access log entries (the official nginx image sends its logs to stdout/stderr)."
  },
  {
   "n": 2,
   "task": "Create a Dockerfile for a simple HTML page using FROM, WORKDIR, COPY, and CMD. Build the image, run it, and verify the page.",
   "checks": [
    {
     "label": "Uses FROM",
     "patterns": [
      "(^|\\n)\\s*FROM\\s+\\S"
     ]
    },
    {
     "label": "Uses WORKDIR",
     "patterns": [
      "(^|\\n)\\s*WORKDIR\\s+\\S"
     ]
    },
    {
     "label": "Uses COPY",
     "patterns": [
      "(^|\\n)\\s*COPY\\s+\\S"
     ]
    },
    {
     "label": "Uses CMD",
     "patterns": [
      "(^|\\n)\\s*CMD\\b"
     ]
    },
    {
     "label": "Builds the image (docker build)",
     "patterns": [
      "\\bdocker\\s+(image\\s+)?build\\b",
      "\\bdocker\\s+buildx\\s+build\\b"
     ]
    },
    {
     "label": "Runs the image (docker run -p)",
     "patterns": [
      "\\bdocker\\s+(container\\s+)?run\\b[^\\n]*-p\\s*\\d"
     ]
    },
    {
     "label": "Verifies the page (curl / browser)",
     "patterns": [
      "\\bcurl\\b",
      "\\bbrowser\\b"
     ]
    }
   ],
   "modelAnswer": "# index.html\n<!DOCTYPE html>\n<html><body><h1>Hello from Docker</h1></body></html>\n\n# Dockerfile\nFROM nginx:alpine\nWORKDIR /usr/share/nginx/html\nCOPY index.html .\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]\n\n# build, run, verify\ndocker build -t my-html:1.0 .\ndocker run -d --name site -p 8080:80 my-html:1.0\ncurl http://localhost:8080      # returns the <h1>Hello from Docker</h1> page",
   "explanation": "Tests writing a minimal Dockerfile and the build-run-verify loop. FROM picks nginx as the base, WORKDIR sets nginx's web root so COPY with `.` lands in the right place, and CMD runs nginx in the foreground (`daemon off;`) so the container keeps running. Verify the custom page (not the default nginx welcome page) is returned."
  },
  {
   "n": 3,
   "task": "Add a .dockerignore file and an environment variable to the Docker build. Rebuild and run the image, then explain the purpose of each added instruction.",
   "checks": [
    {
     "label": "Creates a .dockerignore",
     "patterns": [
      "\\.dockerignore"
     ]
    },
    {
     "label": "Defines an environment variable (ENV / ARG)",
     "patterns": [
      "(^|\\n)\\s*ENV\\s+\\w",
      "(^|\\n)\\s*ARG\\s+\\w"
     ]
    },
    {
     "label": "Rebuilds the image (docker build)",
     "patterns": [
      "\\bdocker\\s+(image\\s+)?build\\b",
      "\\bdocker\\s+buildx\\s+build\\b"
     ]
    },
    {
     "label": "Runs the image (docker run)",
     "patterns": [
      "\\bdocker\\s+(container\\s+)?run\\b"
     ]
    },
    {
     "label": "Verifies the variable (env / printenv / echo)",
     "patterns": [
      "\\bprintenv\\b",
      "\\bdocker\\s+exec\\b[^\\n]*\\benv\\b",
      "\\becho\\s+\\$"
     ]
    },
    {
     "label": "Explains the purpose of each",
     "patterns": [
      "\\bpurpose\\b",
      "\\bexplain",
      "\\bbecause\\b"
     ]
    }
   ],
   "modelAnswer": "# .dockerignore\n.git\n*.log\n.env\nnode_modules\nDockerfile\n.dockerignore\n\n# Dockerfile\nFROM nginx:alpine\nARG APP_VERSION=1.0\nENV APP_ENV=production \\\n    APP_VERSION=${APP_VERSION}\nWORKDIR /usr/share/nginx/html\nCOPY index.html .\nCMD [\"nginx\", \"-g\", \"daemon off;\"]\n\n# rebuild and run\ndocker build --build-arg APP_VERSION=1.1 -t my-html:1.1 .\ndocker run -d --name site2 -p 8081:80 my-html:1.1\ndocker exec site2 printenv APP_ENV APP_VERSION   # production / 1.1\ndocker run --rm -e APP_ENV=staging my-html:1.1 printenv APP_ENV   # override at runtime -> staging\n\n# Purpose of each addition\n# .dockerignore: excludes files from the build context, so builds are faster and secrets such as .env or the .git history never end up in the image.\n# ARG: a build-time variable (set with --build-arg); it is not available in the running container unless copied into ENV.\n# ENV: sets an environment variable baked into the image and visible to the running process; it can be overridden with docker run -e.",
   "explanation": "Tests two build-time features: shrinking and securing the build context with .dockerignore, and configuring the image with environment variables. Verify the variable inside the running container (`docker exec ... printenv`), and that the explanation distinguishes ARG (build time only) from ENV (persists into the container, overridable with `-e`). Never put real secrets in ENV or ARG, since they are visible in the image history."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Docker Fundamentals & Images",
 "label": "Session 6 & 7"
};
