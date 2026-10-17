window.SESSION = {
 "num": 2,
 "slug": "session2-linux",
 "mcqs": [
  {
   "n": 1,
   "q": "Which command prints the working directory?",
   "options": [
    "mv",
    "ls",
    "cd",
    "pwd"
   ],
   "answer": 3,
   "explanation": "`pwd` (print working directory) prints the absolute path of the directory you are currently in.",
   "distractors": "`ls` lists contents, `cd` changes directory and `mv` moves or renames files."
  },
  {
   "n": 2,
   "q": "Which command lists files including hidden files?",
   "options": [
    "pwd -a",
    "rm -a",
    "ls -a",
    "mkdir -a"
   ],
   "answer": 2,
   "explanation": "`ls -a` lists all entries, including hidden dotfiles such as `.bashrc` and the `.` and `..` entries.",
   "distractors": "`pwd`, `rm` and `mkdir` do not list files; `rm -a` and `mkdir -a` are not valid options."
  },
  {
   "n": 3,
   "q": "What does chmod change?",
   "options": [
    "File permissions",
    "Hostname",
    "File ownership only",
    "Network interface"
   ],
   "answer": 0,
   "explanation": "`chmod` changes file permissions (read, write, execute for user, group and others), e.g. `chmod 755 script.sh`.",
   "distractors": "Ownership is changed with `chown`/`chgrp`, the hostname with `hostnamectl`, and interfaces with `ip`."
  },
  {
   "n": 4,
   "q": "Which command searches text in files?",
   "options": [
    "pwd",
    "touch",
    "mv",
    "grep"
   ],
   "answer": 3,
   "explanation": "`grep` searches text in files for lines matching a pattern, e.g. `grep -rn ERROR logs/`.",
   "distractors": "`pwd` prints the directory, `touch` creates files or updates timestamps, and `mv` moves files."
  },
  {
   "n": 5,
   "q": "Which command displays a file's contents?",
   "options": [
    "kill",
    "rmdir",
    "mkdir",
    "cat"
   ],
   "answer": 3,
   "explanation": "`cat` displays a file's contents (it concatenates files to standard output).",
   "distractors": "`kill` signals processes, `rmdir` removes empty directories and `mkdir` creates directories."
  },
  {
   "n": 6,
   "q": "What does the pipe operator do?",
   "options": [
    "Redirects all input to a file",
    "Runs commands only as root",
    "Deletes temporary files",
    "Passes one command's output to another"
   ],
   "answer": 3,
   "explanation": "The pipe `|` passes one command's output (stdout) to another command's input, e.g. `ps aux | grep nginx`.",
   "distractors": "Redirecting to a file is `>` or `>>`; the pipe has nothing to do with root privileges or deleting files."
  },
  {
   "n": 7,
   "q": "Which command shows running processes?",
   "options": [
    "cp",
    "ls",
    "ps",
    "mkdir"
   ],
   "answer": 2,
   "explanation": "`ps` shows running processes, e.g. `ps aux` for all processes; `top`/`htop` show them live.",
   "distractors": "`cp` copies, `ls` lists files and `mkdir` creates directories."
  },
  {
   "n": 8,
   "q": "Which command changes the current directory?",
   "options": [
    "cd",
    "echo",
    "pwd",
    "cat"
   ],
   "answer": 0,
   "explanation": "`cd` changes the current directory, e.g. `cd /var/log` or `cd ..`.",
   "distractors": "`echo` prints text, `pwd` only shows where you are, and `cat` prints file contents."
  },
  {
   "n": 9,
   "q": "What does sudo typically allow?",
   "options": [
    "Run commands with elevated privileges",
    "Download a container image",
    "Create a symbolic link",
    "Show DNS records"
   ],
   "answer": 0,
   "explanation": "`sudo` lets a permitted user run commands with elevated privileges (as root by default), as configured in `/etc/sudoers`.",
   "distractors": "Pulling images is `docker pull`, symlinks come from `ln -s`, and DNS records from `dig`/`nslookup`."
  },
  {
   "n": 10,
   "q": "Which command displays disk space usage by filesystem?",
   "options": [
    "du -a",
    "uname -a",
    "free -m",
    "df -h"
   ],
   "answer": 3,
   "explanation": "`df -h` shows disk space usage by filesystem (size, used, available, mount point) in human-readable units.",
   "distractors": "`du` reports space used by files/directories, `free -m` shows memory and `uname -a` shows kernel info."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Create a project directory with app, logs, and config subdirectories. Create sample files and demonstrate listing, copying, moving, searching, and deleting files.",
   "checks": [
    {
     "label": "Creates the directories (mkdir -p)",
     "patterns": [
      "\\bmkdir\\b"
     ]
    },
    {
     "label": "Creates sample files (touch / echo >)",
     "patterns": [
      "\\btouch\\b",
      "\\becho\\b[^\\n]*>",
      "\\bcat\\s*>"
     ]
    },
    {
     "label": "Lists files (ls)",
     "patterns": [
      "\\bls\\b",
      "\\btree\\b"
     ]
    },
    {
     "label": "Copies a file (cp)",
     "patterns": [
      "\\bcp\\b",
      "\\brsync\\b"
     ]
    },
    {
     "label": "Moves or renames a file (mv)",
     "patterns": [
      "\\bmv\\b"
     ]
    },
    {
     "label": "Searches files (grep / find)",
     "patterns": [
      "\\bgrep\\b",
      "\\bfind\\b"
     ]
    },
    {
     "label": "Deletes files (rm)",
     "patterns": [
      "\\brm\\b",
      "\\brmdir\\b"
     ]
    }
   ],
   "modelAnswer": "# create the structure\nmkdir -p ~/project/{app,logs,config}\ncd ~/project\n\n# sample files\necho 'print(\"hello\")' > app/main.py\necho 'ERROR disk full' > logs/app.log\necho 'INFO started' >> logs/app.log\necho 'port=8080' > config/app.conf\ntouch app/notes.txt\n\n# list\nls -la\nls -R\n\n# copy and move\ncp config/app.conf config/app.conf.bak\nmv app/notes.txt logs/notes.txt\n\n# search\ngrep -rn 'ERROR' logs/\nfind . -name '*.conf'\n\n# delete\nrm config/app.conf.bak\nrm logs/notes.txt\nls -R",
   "explanation": "Tests everyday file management: building a directory tree, creating files, and using ls, cp, mv, grep/find and rm. When verifying, check that `mkdir -p` (or brace expansion) builds all three subdirectories, and that each operation is followed by an `ls` or similar so the result is visible. Be careful with `rm -r`: always confirm the path first."
  },
  {
   "n": 2,
   "task": "Create a user named examuser and a group named devops. Add the user to the group and configure suitable ownership and permissions on a project directory.",
   "checks": [
    {
     "label": "Creates the user (useradd / adduser)",
     "patterns": [
      "\\buseradd\\b",
      "\\badduser\\b"
     ]
    },
    {
     "label": "Creates the group (groupadd / addgroup)",
     "patterns": [
      "\\bgroupadd\\b",
      "\\baddgroup\\b"
     ]
    },
    {
     "label": "Adds the user to the group (usermod -aG / gpasswd -a)",
     "patterns": [
      "\\busermod\\b[^\\n]*-a\\s*G",
      "\\busermod\\b[^\\n]*-aG",
      "\\bgpasswd\\b[^\\n]*-a\\b",
      "\\badduser\\s+examuser\\s+devops\\b"
     ]
    },
    {
     "label": "Sets ownership (chown / chgrp)",
     "patterns": [
      "\\bchown\\b",
      "\\bchgrp\\b"
     ]
    },
    {
     "label": "Sets permissions (chmod)",
     "patterns": [
      "\\bchmod\\b"
     ]
    },
    {
     "label": "Verifies (id / groups / ls -l)",
     "patterns": [
      "\\bid\\b",
      "\\bgroups\\b",
      "\\bls\\s+-\\w*l"
     ]
    }
   ],
   "modelAnswer": "sudo groupadd devops\nsudo useradd -m -s /bin/bash examuser\nsudo passwd examuser        # set a password interactively\nsudo usermod -aG devops examuser\nid examuser                  # shows devops in the group list\n\n# project directory owned by the group\nsudo mkdir -p /opt/project\nsudo chown -R examuser:devops /opt/project\nsudo chmod -R 2770 /opt/project   # rwx for owner and group, nothing for others; setgid keeps new files in group devops\nls -ld /opt/project\n# drwxrws--- 2 examuser devops 4096 ... /opt/project",
   "explanation": "Tests user and group administration plus ownership and permissions. Key point: `usermod -aG` must include `-a` (append) or the user is removed from other supplementary groups. Verify with `id examuser` and `ls -ld`; the setgid bit (2 in 2770) makes new files inherit the devops group, which is useful for shared team directories. Group membership only applies to new login sessions."
  },
  {
   "n": 3,
   "task": "Check the status of a Linux service, inspect its logs, and document the commands used to diagnose a simulated service problem.",
   "checks": [
    {
     "label": "Checks service status (systemctl status)",
     "patterns": [
      "\\bsystemctl\\s+(status|is-active|is-failed)\\b",
      "\\bservice\\s+\\S+\\s+status\\b"
     ]
    },
    {
     "label": "Reads service logs (journalctl -u)",
     "patterns": [
      "\\bjournalctl\\b"
     ]
    },
    {
     "label": "Restarts or starts the service",
     "patterns": [
      "\\bsystemctl\\s+(restart|start)\\b",
      "\\bservice\\s+\\S+\\s+(restart|start)\\b"
     ]
    },
    {
     "label": "Simulates the failure (stop / kill / bad config)",
     "patterns": [
      "\\bsystemctl\\s+stop\\b",
      "\\bkill\\b",
      "\\bconfig"
     ]
    },
    {
     "label": "Checks port, process or config (ss / ps / nginx -t)",
     "patterns": [
      "\\bss\\b",
      "\\bnetstat\\b",
      "\\bps\\b",
      "\\bnginx\\s+-t\\b",
      "\\blsof\\b"
     ]
    }
   ],
   "modelAnswer": "# 1. Check the service\nsystemctl status nginx          # Active: active (running) / failed, plus last log lines\nsystemctl is-active nginx\n\n# 2. Simulate a problem: break the config and restart\nsudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak\necho 'this is not valid;' | sudo tee -a /etc/nginx/nginx.conf\nsudo systemctl restart nginx    # fails\n\n# 3. Diagnose\nsystemctl status nginx          # shows 'failed'\njournalctl -u nginx -n 50 --no-pager   # recent logs for this unit\njournalctl -u nginx --since '10 min ago'\nsudo nginx -t                   # config test points at the bad line\nsudo tail -n 20 /var/log/nginx/error.log\nss -tlnp | grep ':80'           # is anything listening on port 80?\nps aux | grep [n]ginx\n\n# 4. Fix and verify\nsudo cp /etc/nginx/nginx.conf.bak /etc/nginx/nginx.conf\nsudo nginx -t\nsudo systemctl restart nginx\nsystemctl status nginx\ncurl -I http://localhost",
   "explanation": "Tests a systematic service troubleshooting workflow with systemd: status, logs via `journalctl -u <unit>`, then narrowing the cause (config test, listening ports, process list) before fixing and re-verifying. A good answer documents each command and what its output told you, and ends by proving the service is healthy again."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Linux Fundamentals",
 "label": "Session 2"
};
