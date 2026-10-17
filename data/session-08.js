window.SESSION = {
 "num": 8,
 "slug": "session8-docker-networking-volume",
 "mcqs": [
  {
   "n": 1,
   "q": "Why use Docker volumes?",
   "options": [
    "Increase CPU frequency",
    "Disable networking",
    "Persist data beyond a container lifecycle",
    "Replace container images"
   ],
   "answer": 2,
   "explanation": "Docker volumes exist so data can persist beyond a container lifecycle: a container's writable layer is deleted with the container, but a volume is managed separately by Docker and survives `docker rm`. That is why databases keep their data directory on a volume.",
   "distractors": "Volumes are about storage only; they have nothing to do with CPU speed, networking or swapping images."
  },
  {
   "n": 2,
   "q": "Which command lists Docker volumes?",
   "options": [
    "docker volumes show",
    "docker storage ps",
    "docker volume ls",
    "docker volume ps"
   ],
   "answer": 2,
   "explanation": "`docker volume ls` lists volumes. Docker's CLI follows the pattern `docker <object> <verb>`, so volumes are managed with `docker volume create/ls/inspect/rm/prune`.",
   "distractors": "`docker volumes show`, `docker storage ps` and `docker volume ps` are not real subcommands; `ps` is for containers."
  },
  {
   "n": 3,
   "q": "What is a bind mount?",
   "options": [
    "A remote Git branch",
    "A Kubernetes namespace",
    "A host path mounted inside a container",
    "An image registry"
   ],
   "answer": 2,
   "explanation": "A bind mount is a host path mounted inside a container, e.g. `-v /home/me/src:/app` or `--mount type=bind,source=...,target=...`. Unlike a named volume, the host controls the exact location and contents.",
   "distractors": "Git branches, Kubernetes namespaces and registries are unrelated concepts that just share vocabulary."
  },
  {
   "n": 4,
   "q": "Which Docker network driver is the typical default for standalone containers?",
   "options": [
    "overlay",
    "macvtap only",
    "host-only VM",
    "bridge"
   ],
   "answer": 3,
   "explanation": "bridge is the default driver: a standalone container started without `--network` joins the built-in `bridge` network (docker0) and reaches the outside world through NAT.",
   "distractors": "overlay is for multi-host Swarm networking; 'macvtap only' and 'host-only VM' are not Docker network drivers."
  },
  {
   "n": 5,
   "q": "What does a user-defined bridge network provide?",
   "options": [
    "Host kernel upgrades",
    "Container-to-container name resolution",
    "Automatic cloud load balancing",
    "Persistent image layers"
   ],
   "answer": 1,
   "explanation": "A user-defined bridge network gives container-to-container name resolution: Docker's embedded DNS (127.0.0.11) resolves container names and aliases on that network. The default `bridge` network does not do this, so there you would need IPs or the legacy `--link`.",
   "distractors": "It does not touch the host kernel, provide cloud load balancers, or affect image layers."
  },
  {
   "n": 6,
   "q": "Which flag publishes a container port?",
   "options": [
    "-w",
    "-e",
    "-v",
    "-p"
   ],
   "answer": 3,
   "explanation": "`-p` (`--publish`) publishes a container port on the host, e.g. `-p 8080:80` maps host port 8080 to container port 80.",
   "distractors": "`-w` sets the working directory, `-e` sets an environment variable and `-v` mounts a volume."
  },
  {
   "n": 7,
   "q": "Which command creates a Docker network?",
   "options": [
    "docker net init",
    "docker bridge build",
    "docker network create",
    "docker network push"
   ],
   "answer": 2,
   "explanation": "`docker network create` creates a network (a bridge by default; `-d overlay` etc. for other drivers).",
   "distractors": "`docker net init`, `docker bridge build` and `docker network push` do not exist; networks are not pushed to registries."
  },
  {
   "n": 8,
   "q": "What is Docker Compose mainly for?",
   "options": [
    "Replacing source control",
    "Defining and running multi-container applications",
    "Managing Linux users",
    "Creating DNS root servers"
   ],
   "answer": 1,
   "explanation": "Docker Compose is for defining and running multi-container applications: services, networks and volumes are declared in one YAML file and started together with one command.",
   "distractors": "It does not replace Git, manage Linux users, or run DNS root servers."
  },
  {
   "n": 9,
   "q": "Which file is commonly used by Docker Compose?",
   "options": [
    "Chart.yaml",
    "terraform.tfstate",
    "Jenkinsfile",
    "compose.yaml"
   ],
   "answer": 3,
   "explanation": "compose.yaml is the preferred Compose file name (the Compose Specification); `docker-compose.yml` and `compose.yml` are still recognised for backwards compatibility.",
   "distractors": "Chart.yaml belongs to Helm, terraform.tfstate to Terraform and Jenkinsfile to Jenkins."
  },
  {
   "n": 10,
   "q": "Which command starts services from a Compose file?",
   "options": [
    "docker compose attach-all",
    "docker compose init-only",
    "docker compose up",
    "docker compose commit"
   ],
   "answer": 2,
   "explanation": "`docker compose up` creates and starts the services, networks and volumes in the Compose file; add `-d` to run detached.",
   "distractors": "attach-all, init-only and commit are not Compose subcommands."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Create a custom Docker network and run two containers on it. Demonstrate name-based communication between the containers.",
   "checks": [
    {
     "label": "Creates a custom network (docker network create)",
     "patterns": [
      "docker\\s+network\\s+create\\b"
     ]
    },
    {
     "label": "Attaches containers to it (--network)",
     "patterns": [
      "--network[\\s=]",
      "--net[\\s=]",
      "docker\\s+network\\s+connect\\b"
     ]
    },
    {
     "label": "Runs named containers (docker run --name)",
     "patterns": [
      "--name[\\s=]"
     ]
    },
    {
     "label": "Tests name-based communication (ping / curl / wget / nslookup)",
     "patterns": [
      "\\bping\\b",
      "\\bcurl\\b",
      "\\bwget\\b",
      "\\bnslookup\\b",
      "\\bgetent\\b",
      "\\bnc\\b"
     ]
    }
   ],
   "modelAnswer": "# 1. Create a user-defined bridge network\ndocker network create appnet\ndocker network ls\n\n# 2. Run two containers on it\ndocker run -d --name web --network appnet nginx:alpine\ndocker run -d --name client --network appnet busybox:1.36 sleep 3600\n\n# 3. Name-based communication: \"web\" resolves via Docker's embedded DNS\ndocker exec client ping -c 3 web\ndocker exec client wget -qO- http://web     # prints the nginx welcome page\ndocker exec client nslookup web             # shows the container IP on appnet\n\n# 4. Evidence: both containers are attached to appnet\ndocker network inspect appnet\n\n# Cleanup\ndocker rm -f web client && docker network rm appnet",
   "explanation": "Tests that you know containers on a user-defined bridge network can reach each other by container name (embedded DNS), which does not work on the default bridge. Verify that both containers were started with `--network appnet`, that a ping/wget/curl uses the name `web` rather than an IP, and that `docker network inspect` lists both containers."
  },
  {
   "n": 2,
   "task": "Run a database container with a named volume, create sample data, remove and recreate the container, and verify that the data persists.",
   "checks": [
    {
     "label": "Uses a named volume (-v name:/path or --mount source=)",
     "patterns": [
      "(-v|--volume)[\\s=]+[a-z0-9][\\w.-]*:/",
      "--mount\\s+\\S*(source|src)=[a-z0-9]"
     ]
    },
    {
     "label": "Runs a database container",
     "patterns": [
      "\\b(postgres|mysql|mariadb|mongo|redis)\\b"
     ]
    },
    {
     "label": "Creates sample data",
     "patterns": [
      "\\binsert\\b",
      "\\bcreate\\s+table\\b",
      "\\binsertOne\\b",
      "\\bset\\s+\\w+"
     ]
    },
    {
     "label": "Removes the container (docker rm)",
     "patterns": [
      "docker\\s+(container\\s+)?rm\\b"
     ]
    },
    {
     "label": "Queries the data again after recreating",
     "patterns": [
      "\\bselect\\b",
      "\\.find\\(",
      "\\bget\\s+\\w+"
     ]
    }
   ],
   "modelAnswer": "# 1. Create a named volume and start PostgreSQL using it\ndocker volume create pgdata\ndocker run -d --name db -e POSTGRES_PASSWORD=example-only \\\n  -v pgdata:/var/lib/postgresql/data postgres:16\nsleep 5   # wait for initdb to finish\n\n# 2. Create sample data\ndocker exec -it db psql -U postgres -c \"CREATE TABLE notes(id serial PRIMARY KEY, body text);\"\ndocker exec -it db psql -U postgres -c \"INSERT INTO notes(body) VALUES ('survives container removal');\"\n\n# 3. Remove the container (the volume is NOT removed)\ndocker rm -f db\ndocker volume ls          # pgdata is still listed\n\n# 4. Recreate the container with the same volume\ndocker run -d --name db -e POSTGRES_PASSWORD=example-only \\\n  -v pgdata:/var/lib/postgresql/data postgres:16\nsleep 5\n\n# 5. Verify the data persisted\ndocker exec -it db psql -U postgres -c \"SELECT * FROM notes;\"\n#  id |           body\n#   1 | survives container removal",
   "explanation": "Tests that data written to a named volume outlives the container. Check that the same volume name is mounted on the database's data directory both times, that the container is really removed (`docker rm`, not just stopped), and that a query after recreation returns the row created earlier. Note: `docker rm -v` or `docker volume rm` would delete the data."
  },
  {
   "n": 3,
   "task": "Write a compose.yaml file for a web application and database. Start the stack, verify service communication, inspect logs, and shut it down.",
   "checks": [
    {
     "label": "Defines services in compose.yaml",
     "patterns": [
      "\\bservices\\s*:"
     ]
    },
    {
     "label": "Includes a database service",
     "patterns": [
      "\\b(postgres|mysql|mariadb|mongo|redis)\\b"
     ]
    },
    {
     "label": "Starts the stack (docker compose up)",
     "patterns": [
      "docker[\\s-]compose\\s+up\\b"
     ]
    },
    {
     "label": "Verifies service-to-service communication",
     "patterns": [
      "\\bcurl\\b",
      "\\bwget\\b",
      "\\bping\\b",
      "\\bgetent\\b",
      "\\bpg_isready\\b",
      "docker[\\s-]compose\\s+exec\\b"
     ]
    },
    {
     "label": "Inspects logs (docker compose logs)",
     "patterns": [
      "docker[\\s-]compose\\s+logs\\b"
     ]
    },
    {
     "label": "Shuts it down (docker compose down)",
     "patterns": [
      "docker[\\s-]compose\\s+(down|stop)\\b"
     ]
    }
   ],
   "modelAnswer": "# .env  (not committed; keeps credentials out of compose.yaml)\nDB_PASSWORD=change-me-locally\n\n# compose.yaml\nservices:\n  db:\n    image: mariadb:11\n    environment:\n      MARIADB_DATABASE: wordpress\n      MARIADB_USER: wp\n      MARIADB_PASSWORD: ${DB_PASSWORD}\n      MARIADB_RANDOM_ROOT_PASSWORD: \"1\"\n    volumes:\n      - db-data:/var/lib/mysql\n  web:\n    image: wordpress:6\n    ports:\n      - \"8080:80\"\n    environment:\n      WORDPRESS_DB_HOST: db:3306      # service name = DNS name\n      WORDPRESS_DB_USER: wp\n      WORDPRESS_DB_PASSWORD: ${DB_PASSWORD}\n      WORDPRESS_DB_NAME: wordpress\n    depends_on:\n      - db\nvolumes:\n  db-data:\n\n# Commands\ndocker compose up -d\ndocker compose ps\ndocker compose exec web getent hosts db      # \"db\" resolves on the project network\ncurl -I http://localhost:8080                # 302 to /wp-admin/install.php = web reached the DB\ndocker compose logs web db\ndocker compose logs -f db                    # follow (Ctrl+C to stop)\ndocker compose down                          # add -v to also delete the db-data volume",
   "explanation": "Tests writing a multi-service Compose file and the Compose lifecycle (up, ps/logs, down). Check that the web service reaches the database by its service name (Compose puts all services on a default project network with DNS), that credentials come from an .env file or variables rather than being hard-coded, and that `docker compose down` cleanly removes the containers and network."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Docker Networking & Volumes",
 "label": "Session 8"
};
