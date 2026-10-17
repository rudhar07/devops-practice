window.SESSION = {
 "num": 18,
 "slug": "session18-terraform-iac",
 "mcqs": [
  {
   "n": 1,
   "q": "What is Terraform used for?",
   "options": [
    "Writing application unit tests",
    "Serving static HTML only",
    "Monitoring CPU usage only",
    "Provisioning and managing infrastructure as code"
   ],
   "answer": 3,
   "explanation": "Terraform provisions and manages infrastructure as code: you declare the resources you want in HCL and Terraform creates, updates or deletes them through provider APIs.",
   "distractors": "Testing, static hosting and monitoring are done by other tools; Terraform can provision the infrastructure for them but doesn't do them itself."
  },
  {
   "n": 2,
   "q": "Which command initializes providers and backend?",
   "options": [
    "terraform output",
    "terraform destroy",
    "terraform apply",
    "terraform init"
   ],
   "answer": 3,
   "explanation": "`terraform init` initialises the working directory: it downloads providers (and modules), configures the backend and writes .terraform.lock.hcl.",
   "distractors": "apply and destroy change real infrastructure and output reads state; none of them install providers, so init must come first."
  },
  {
   "n": 3,
   "q": "Which command previews infrastructure changes?",
   "options": [
    "terraform show-only",
    "terraform plan",
    "terraform state rm",
    "terraform fmt"
   ],
   "answer": 1,
   "explanation": "`terraform plan` previews changes by comparing configuration with state and real infrastructure, showing + create, ~ update and - destroy actions without making changes.",
   "distractors": "fmt only reformats files, `state rm` removes an item from state, and show-only is not a command."
  },
  {
   "n": 4,
   "q": "Which command applies the planned changes?",
   "options": [
    "terraform fmt",
    "terraform validate",
    "terraform apply",
    "terraform graph"
   ],
   "answer": 2,
   "explanation": "`terraform apply` executes the planned changes (after confirmation, or straight from a saved plan file) and updates state.",
   "distractors": "fmt and validate only check files, and graph prints a dependency diagram; none of them change infrastructure."
  },
  {
   "n": 5,
   "q": "What does Terraform state track?",
   "options": [
    "Only shell command history",
    "Only application logs",
    "Mappings between configuration and managed resources",
    "Only Docker images"
   ],
   "answer": 2,
   "explanation": "Terraform state records the mapping between resources in your configuration and the real objects they manage (IDs, attributes, dependencies), so Terraform knows what exists and what to change.",
   "distractors": "Shell history, logs and images are not tracked; note state can contain sensitive values, so protect it."
  },
  {
   "n": 6,
   "q": "What is a Terraform provider?",
   "options": [
    "A Kubernetes Pod",
    "Plugin for interacting with an API or platform",
    "A Linux package manager",
    "A Git commit"
   ],
   "answer": 1,
   "explanation": "A provider is a plugin that lets Terraform talk to an API or platform (aws, azurerm, google, kubernetes, random, local), defining the resource and data source types you can use.",
   "distractors": "Pods, OS package managers and commits are unrelated, although there are providers that manage Kubernetes or GitHub."
  },
  {
   "n": 7,
   "q": "What is a Terraform module?",
   "options": [
    "Reusable group of Terraform configuration",
    "A DNS record type",
    "A container image",
    "An HTTP load balancer"
   ],
   "answer": 0,
   "explanation": "A module is a reusable group of Terraform configuration (a directory of .tf files) called with a `module` block and inputs; every configuration is itself the root module.",
   "distractors": "DNS records, images and load balancers are resources a module might create, not modules themselves."
  },
  {
   "n": 8,
   "q": "Which command checks Terraform configuration syntax and consistency?",
   "options": [
    "terraform destroy",
    "terraform output",
    "terraform import",
    "terraform validate"
   ],
   "answer": 3,
   "explanation": "`terraform validate` checks syntax and internal consistency (types, references, required arguments) without contacting remote APIs; run it after init.",
   "distractors": "destroy removes resources, output prints outputs, and import brings an existing resource under management."
  },
  {
   "n": 9,
   "q": "What is a variable in Terraform?",
   "options": [
    "An automatically encrypted password",
    "An input used to parameterize configuration",
    "A Helm release",
    "A running cloud VM"
   ],
   "answer": 1,
   "explanation": "A variable is an input that parameterises configuration (`variable` block), set via .tfvars files, -var, TF_VAR_ environment variables or defaults.",
   "distractors": "Variables are not automatically encrypted; `sensitive = true` only hides them in CLI output, and they still appear in state."
  },
  {
   "n": 10,
   "q": "Why use a remote backend with locking?",
   "options": [
    "Share state safely and reduce concurrent update conflicts",
    "Run Pods without nodes",
    "Replace all version control",
    "Eliminate the need for credentials"
   ],
   "answer": 0,
   "explanation": "A remote backend with locking (S3 with lockfile or DynamoDB, Terraform Cloud, azurerm) shares state safely and stops two people applying at once, which could corrupt state.",
   "distractors": "Remote state still needs credentials, doesn't replace version control for code, and has nothing to do with Pods."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Write Terraform configuration that declares a provider and creates a small supported resource. Run fmt, init, validate, and plan, then explain the output.",
   "checks": [
    {
     "label": "Declares a provider (required_providers / provider block)",
     "patterns": [
      "required_providers",
      "\\bprovider\\s+\""
     ]
    },
    {
     "label": "Creates a resource (resource block)",
     "patterns": [
      "\\bresource\\s+\""
     ]
    },
    {
     "label": "Formats the code (terraform fmt)",
     "patterns": [
      "\\bterraform\\s+fmt\\b"
     ]
    },
    {
     "label": "Initialises (terraform init)",
     "patterns": [
      "\\bterraform\\s+init\\b"
     ]
    },
    {
     "label": "Validates (terraform validate)",
     "patterns": [
      "\\bterraform\\s+validate\\b"
     ]
    },
    {
     "label": "Plans and explains the output (terraform plan)",
     "patterns": [
      "\\bterraform\\s+plan\\b"
     ]
    }
   ],
   "modelAnswer": "# main.tf\nterraform {\n  required_version = \">= 1.5\"\n  required_providers {\n    local = {\n      source  = \"hashicorp/local\"\n      version = \"~> 2.5\"\n    }\n  }\n}\n\nprovider \"local\" {}\n\nresource \"local_file\" \"hello\" {\n  filename = \"${path.module}/hello.txt\"\n  content  = \"Hello from Terraform\\n\"\n}\n\nterraform fmt        # rewrites files in canonical style; prints names of changed files\nterraform init       # downloads hashicorp/local into .terraform/, writes .terraform.lock.hcl\nterraform validate   # Success! The configuration is valid.\nterraform plan\n# Terraform will perform the following actions:\n#   # local_file.hello will be created\n#   + resource \"local_file\" \"hello\" { + filename = \"./hello.txt\" ... }\n# Plan: 1 to add, 0 to change, 0 to destroy.",
   "explanation": "Tests the core workflow order: fmt (style), init (providers/backend), validate (static correctness), plan (diff against state). Explain the plan symbols: + create, ~ update in place, -/+ replace, - destroy, plus the summary line 'Plan: X to add, Y to change, Z to destroy'. Any small resource works (local_file, random_pet, an S3 bucket in a sandbox)."
  },
  {
   "n": 2,
   "task": "Use variables and outputs in a Terraform configuration. Pass a variable through a .tfvars file and print a useful output after apply.",
   "checks": [
    {
     "label": "Declares a variable (variable block)",
     "patterns": [
      "\\bvariable\\s+\""
     ]
    },
    {
     "label": "Uses the variable (var.)",
     "patterns": [
      "\\bvar\\."
     ]
    },
    {
     "label": "Declares an output (output block)",
     "patterns": [
      "\\boutput\\s+\""
     ]
    },
    {
     "label": "Uses a .tfvars file",
     "patterns": [
      "\\.tfvars\\b"
     ]
    },
    {
     "label": "Applies (terraform apply)",
     "patterns": [
      "\\bterraform\\s+apply\\b"
     ]
    },
    {
     "label": "Prints the output (terraform output / Outputs:)",
     "patterns": [
      "\\bterraform\\s+output\\b",
      "outputs\\s*:"
     ]
    }
   ],
   "modelAnswer": "# variables.tf\nvariable \"environment\" {\n  type        = string\n  description = \"Deployment environment name\"\n  default     = \"dev\"\n}\nvariable \"greeting\" {\n  type = string\n}\n\n# main.tf (provider block as in lab 1)\nresource \"local_file\" \"config\" {\n  filename = \"${path.module}/${var.environment}.txt\"\n  content  = \"${var.greeting} from ${var.environment}\\n\"\n}\n\n# outputs.tf\noutput \"config_path\" {\n  description = \"Path of the generated file\"\n  value       = local_file.config.filename\n}\n\n# dev.tfvars\nenvironment = \"staging\"\ngreeting    = \"Hello\"\n\nterraform init\nterraform plan -var-file=dev.tfvars\nterraform apply -var-file=dev.tfvars\n# Outputs:\n# config_path = \"./staging.txt\"\nterraform output config_path\nterraform output -json",
   "explanation": "Tests parameterising configuration and exposing results. Variables are referenced as `var.name`, and values come from a .tfvars file (terraform.tfvars and *.auto.tfvars load automatically; others need `-var-file`). Outputs print after apply and can be read later with `terraform output`. Check that changing the tfvars value changes the plan."
  },
  {
   "n": 3,
   "task": "Modify a resource configuration, inspect the plan before applying, and explain how Terraform state maps configuration to real infrastructure. Do not commit secrets or state files.",
   "checks": [
    {
     "label": "Modifies the resource configuration",
     "patterns": [
      "modif",
      "chang",
      "edit",
      "updat"
     ]
    },
    {
     "label": "Inspects the plan before applying (terraform plan)",
     "patterns": [
      "\\bterraform\\s+plan\\b"
     ]
    },
    {
     "label": "Applies the change (terraform apply)",
     "patterns": [
      "\\bterraform\\s+apply\\b"
     ]
    },
    {
     "label": "Explains or inspects state mapping (state list / show / terraform.tfstate)",
     "patterns": [
      "\\bterraform\\s+state\\s+(list|show)\\b",
      "\\bterraform\\s+show\\b",
      "tfstate"
     ]
    },
    {
     "label": "Keeps state and secrets out of Git (.gitignore)",
     "patterns": [
      "\\.gitignore"
     ]
    }
   ],
   "modelAnswer": "# Change the resource: edit content in main.tf\nresource \"local_file\" \"hello\" {\n  filename = \"${path.module}/hello.txt\"\n  content  = \"Hello again, modified\\n\"\n}\n\nterraform plan -out=tfplan\n# -/+ local_file.hello must be replaced (content forces replacement for local_file)\n# Plan: 1 to add, 0 to change, 1 to destroy.\nterraform apply tfplan          # applies exactly the reviewed plan\n\nterraform state list            # local_file.hello\nterraform state show local_file.hello   # id, filename, content recorded for this address\n\n# State maps the address local_file.hello in config to the real object's ID and attributes.\n# On plan, Terraform refreshes the real object, compares it with the config, and diffs the result.\n\n# .gitignore\n.terraform/\n*.tfstate\n*.tfstate.*\n# ignore tfvars that hold secrets; commit a non-secret example.tfvars instead\n*.tfvars\ntfplan\ncrash.log\n# (do commit .terraform.lock.hcl)",
   "explanation": "Tests reading a plan before acting and understanding state. Notice whether a change is an in-place update (~) or a forced replacement (-/+, 'forces replacement'). Saving the plan with `-out` and applying that file guarantees you apply what you reviewed. State binds each resource address to a real object ID; it can contain secrets in plain text, so it belongs in a protected remote backend and in .gitignore, never in Git."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Terraform & Infrastructure as Code",
 "label": "Session 18"
};
