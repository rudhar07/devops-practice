window.SESSION = {
 "num": 3,
 "slug": "session3-shell-scripting",
 "mcqs": [
  {
   "n": 1,
   "q": "Which line commonly selects Bash as script interpreter?",
   "options": [
    "#bash/start",
    "//bin/bash",
    "#!/bin/bash",
    "#!/usr/git"
   ],
   "answer": 2,
   "explanation": "`#!/bin/bash` is the shebang line: when the script is executed directly, the kernel runs it with `/bin/bash`. `#!/usr/bin/env bash` is a portable alternative.",
   "distractors": "A shebang must start with `#!`; `#bash/start` is just a comment, `//bin/bash` is not a shebang, and `/usr/git` is not a shell."
  },
  {
   "n": 2,
   "q": "How do you reference the first positional argument in Bash?",
   "options": [
    "$0",
    "$#",
    "$?",
    "$1"
   ],
   "answer": 3,
   "explanation": "`$1` holds the first positional argument passed to the script or function; `$2`, `$3` follow, and `\"$@\"` is all of them.",
   "distractors": "`$0` is the script name, `$#` is the number of arguments and `$?` is the last exit status."
  },
  {
   "n": 3,
   "q": "Which operator tests whether a regular file exists in Bash?",
   "options": [
    "[ -p file ]",
    "[ -d file ]",
    "[ -f file ]",
    "[ -z file ]"
   ],
   "answer": 2,
   "explanation": "`[ -f file ]` is true if the path exists and is a regular file.",
   "distractors": "`-d` tests for a directory, `-p` for a named pipe (FIFO), and `-z` tests whether a string is empty."
  },
  {
   "n": 4,
   "q": "What does $? contain immediately after a command?",
   "options": [
    "Exit status of the previous command",
    "Current username",
    "Number of script lines",
    "Current process ID"
   ],
   "answer": 0,
   "explanation": "`$?` holds the exit status of the previous command: 0 means success, any non-zero value means failure.",
   "distractors": "The username is in `$USER`, the current shell's PID is `$$`, and Bash has no variable for script line count."
  },
  {
   "n": 5,
   "q": "Which loop iterates over a sequence of values?",
   "options": [
    "exit",
    "for",
    "case",
    "if"
   ],
   "answer": 1,
   "explanation": "A `for` loop iterates over a sequence of values, e.g. `for f in *.log; do ...; done` or `for i in {1..5}`.",
   "distractors": "`case` and `if` are conditionals, and `exit` ends the script."
  },
  {
   "n": 6,
   "q": "How do you make a script executable?",
   "options": [
    "grep +x script.sh",
    "pwd script.sh",
    "chmod +x script.sh",
    "cat +x script.sh"
   ],
   "answer": 2,
   "explanation": "`chmod +x script.sh` adds the execute permission so you can run it as `./script.sh`.",
   "distractors": "`grep`, `pwd` and `cat` do not change permissions; `+x` is meaningless to them."
  },
  {
   "n": 7,
   "q": "Which construct makes a conditional decision?",
   "options": [
    "for ... done",
    "echo ... print",
    "if ... then ... fi",
    "read ... exit"
   ],
   "answer": 2,
   "explanation": "`if ... then ... fi` makes a conditional decision based on a command's exit status, e.g. `if [ -f file ]; then ...; fi`.",
   "distractors": "`for ... done` is a loop, `echo` prints text, and `read`/`exit` handle input and termination."
  },
  {
   "n": 8,
   "q": "How do you assign a variable in Bash?",
   "options": [
    "$NAME=value",
    "NAME=value",
    "set NAME := value",
    "NAME = value"
   ],
   "answer": 1,
   "explanation": "`NAME=value` assigns a variable; there must be no spaces around `=`, and you read it with `$NAME`.",
   "distractors": "`NAME = value` runs a command called NAME, `$NAME=value` expands the variable instead of assigning, and `:=` is not Bash assignment syntax."
  },
  {
   "n": 9,
   "q": "Which command reads input from the terminal?",
   "options": [
    "touch",
    "echo",
    "printf",
    "read"
   ],
   "answer": 3,
   "explanation": "`read` reads a line from standard input (the terminal) into a variable, e.g. `read -p 'Name: ' name`.",
   "distractors": "`echo` and `printf` write output, and `touch` creates files."
  },
  {
   "n": 10,
   "q": "What does && mean between two commands?",
   "options": [
    "Run the second only if first fails",
    "Run the second only if the first succeeds",
    "Always run both in parallel",
    "Append output to a file"
   ],
   "answer": 1,
   "explanation": "`cmd1 && cmd2` runs the second only if the first succeeds (exits with status 0).",
   "distractors": "Running on failure is `||`, running in the background is `&`, and appending to a file is `>>`."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Write a shell script that accepts a directory path as an argument and displays the number of files and subdirectories. Handle a missing or invalid argument.",
   "checks": [
    {
     "label": "Uses a shebang (#!/bin/bash)",
     "patterns": [
      "#!\\s*/(usr/)?bin/(env\\s+)?(ba)?sh"
     ]
    },
    {
     "label": "Reads the argument ($1)",
     "patterns": [
      "\\$\\{?1\\b"
     ]
    },
    {
     "label": "Handles a missing argument ($# / -z)",
     "patterns": [
      "\\$#",
      "-z\\s+\"?\\$\\{?1"
     ]
    },
    {
     "label": "Checks it is a directory ([ -d ])",
     "patterns": [
      "-d\\s+\"?\\$"
     ]
    },
    {
     "label": "Counts files (find -type f / ls)",
     "patterns": [
      "-type\\s+f",
      "\\bls\\b"
     ]
    },
    {
     "label": "Counts subdirectories (find -type d)",
     "patterns": [
      "-type\\s+d",
      "\\bls\\b[^\\n]*\\*/"
     ]
    },
    {
     "label": "Exits non-zero on error",
     "patterns": [
      "\\bexit\\s+[1-9]"
     ]
    }
   ],
   "modelAnswer": "#!/bin/bash\n# Usage: ./count.sh <directory>\n\nif [ $# -ne 1 ]; then\n  echo \"Usage: $0 <directory>\" >&2\n  exit 1\nfi\n\ndir=\"$1\"\n\nif [ ! -d \"$dir\" ]; then\n  echo \"Error: '$dir' is not a valid directory\" >&2\n  exit 2\nfi\n\nfiles=$(find \"$dir\" -mindepth 1 -maxdepth 1 -type f | wc -l)\ndirs=$(find \"$dir\" -mindepth 1 -maxdepth 1 -type d | wc -l)\n\necho \"Directory: $dir\"\necho \"Files: $files\"\necho \"Subdirectories: $dirs\"",
   "explanation": "Tests argument handling and input validation in Bash. Check that the script rejects zero (or too many) arguments and non-directories with a message on stderr and a non-zero exit code, and that counting uses `find -type f` / `-type d` with `-mindepth 1 -maxdepth 1` so the directory itself is not counted. Quoting `\"$dir\"` keeps paths with spaces working."
  },
  {
   "n": 2,
   "task": "Write a script that checks whether a supplied file exists and is readable, writable, and executable. Print a clear result for each check.",
   "checks": [
    {
     "label": "Uses a shebang (#!/bin/bash)",
     "patterns": [
      "#!\\s*/(usr/)?bin/(env\\s+)?(ba)?sh"
     ]
    },
    {
     "label": "Checks the file exists (-e / -f)",
     "patterns": [
      "-[ef]\\s+\"?\\$"
     ]
    },
    {
     "label": "Checks readable (-r)",
     "patterns": [
      "-r\\s+\"?\\$"
     ]
    },
    {
     "label": "Checks writable (-w)",
     "patterns": [
      "-w\\s+\"?\\$"
     ]
    },
    {
     "label": "Checks executable (-x)",
     "patterns": [
      "-x\\s+\"?\\$"
     ]
    },
    {
     "label": "Handles a missing argument",
     "patterns": [
      "\\$#",
      "-z\\s+\"?\\$\\{?1"
     ]
    }
   ],
   "modelAnswer": "#!/bin/bash\n# Usage: ./checkfile.sh <file>\n\nif [ -z \"$1\" ]; then\n  echo \"Usage: $0 <file>\" >&2\n  exit 1\nfi\n\nfile=\"$1\"\n\nif [ ! -e \"$file\" ]; then\n  echo \"$file: does not exist\"\n  exit 2\nfi\necho \"$file: exists\"\n\nif [ -r \"$file\" ]; then echo \"Readable: yes\"; else echo \"Readable: no\"; fi\nif [ -w \"$file\" ]; then echo \"Writable: yes\"; else echo \"Writable: no\"; fi\nif [ -x \"$file\" ]; then echo \"Executable: yes\"; else echo \"Executable: no\"; fi",
   "explanation": "Tests Bash file test operators: `-e` (exists), `-r`, `-w` and `-x`, which check permissions for the user running the script. Each check should print its own clear yes/no result rather than stopping at the first failure. Test it with `chmod` changes (e.g. `chmod -w file`) to see the output change; note root passes most -r/-w checks regardless of mode bits."
  },
  {
   "n": 3,
   "task": "Write a reusable system-health script using variables, conditions, loops, and functions. Report disk usage, memory, and uptime.",
   "checks": [
    {
     "label": "Defines functions",
     "patterns": [
      "\\w+\\s*\\(\\)\\s*\\{",
      "\\bfunction\\s+\\w+"
     ]
    },
    {
     "label": "Uses variables",
     "patterns": [
      "\\b[A-Za-z_]\\w*=\\S"
     ]
    },
    {
     "label": "Uses a condition (if)",
     "patterns": [
      "\\bif\\b"
     ]
    },
    {
     "label": "Uses a loop (for / while)",
     "patterns": [
      "\\bfor\\b",
      "\\bwhile\\b"
     ]
    },
    {
     "label": "Reports disk usage (df)",
     "patterns": [
      "\\bdf\\b"
     ]
    },
    {
     "label": "Reports memory (free / /proc/meminfo)",
     "patterns": [
      "\\bfree\\b",
      "meminfo",
      "\\bvm_stat\\b"
     ]
    },
    {
     "label": "Reports uptime",
     "patterns": [
      "\\buptime\\b"
     ]
    }
   ],
   "modelAnswer": "#!/bin/bash\n# health.sh - simple reusable system health report\n\nDISK_THRESHOLD=${DISK_THRESHOLD:-80}   # percent, override via env\n\ncheck_disk() {\n  echo \"== Disk usage ==\"\n  df -h --output=target,pcent -x tmpfs -x devtmpfs | tail -n +2 | while read -r mount pct; do\n    used=${pct%\\%}\n    if [ \"$used\" -ge \"$DISK_THRESHOLD\" ]; then\n      echo \"WARNING: $mount is ${used}% full\"\n    else\n      echo \"OK: $mount ${used}%\"\n    fi\n  done\n}\n\ncheck_memory() {\n  echo \"== Memory ==\"\n  free -h\n}\n\ncheck_uptime() {\n  echo \"== Uptime / load ==\"\n  uptime\n}\n\nfor section in check_disk check_memory check_uptime; do\n  \"$section\"\n  echo\ndone",
   "explanation": "Tests combining Bash building blocks (variables, functions, if, loops) into a reusable tool. Verify that each metric is in its own function, a threshold variable drives a warning condition, and a loop is used meaningfully (over mounts or over the check functions). Note `df --output` is GNU coreutils; on macOS use `df -h` and `vm_stat` instead of `free`."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Shell Scripting",
 "label": "Session 3"
};
