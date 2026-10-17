window.SESSION = {
 "num": 9,
 "slug": "session9-k8s",
 "mcqs": [
  {
   "n": 1,
   "q": "What is Kubernetes primarily used for?",
   "options": [
    "Replacing Git history",
    "Editing photos",
    "Compiling Linux kernels",
    "Orchestrating containerized applications"
   ],
   "answer": 3,
   "explanation": "Kubernetes is primarily used for orchestrating containerized applications: it schedules containers across machines, keeps the desired number running, restarts failed ones, and handles service discovery, scaling and rolling updates.",
   "distractors": "It is not a version-control, photo-editing or kernel-build tool."
  },
  {
   "n": 2,
   "q": "What is a Kubernetes Pod?",
   "options": [
    "A Terraform provider",
    "A physical data center",
    "Smallest deployable unit containing one or more containers",
    "A Docker image registry"
   ],
   "answer": 2,
   "explanation": "A Pod is the smallest deployable unit, containing one or more containers that share a network namespace (one IP) and can share volumes. Kubernetes schedules Pods, not individual containers.",
   "distractors": "A Terraform provider, a data center and an image registry are all outside Kubernetes' object model."
  },
  {
   "n": 3,
   "q": "Which component stores Kubernetes cluster state?",
   "options": [
    "containerd",
    "CoreDNS",
    "etcd",
    "kube-proxy"
   ],
   "answer": 2,
   "explanation": "etcd is the consistent, distributed key-value store that holds all cluster state (objects, specs, status). Only the API server talks to it directly, which is why etcd backups are critical.",
   "distractors": "containerd runs containers, CoreDNS serves cluster DNS and kube-proxy programs Service routing; none of them store cluster state."
  },
  {
   "n": 4,
   "q": "Which component schedules Pods onto nodes?",
   "options": [
    "kube-scheduler",
    "kube-proxy",
    "kubectl",
    "kubelet"
   ],
   "answer": 0,
   "explanation": "kube-scheduler watches for Pods with no node assigned and picks a node based on resource requests, affinity, taints/tolerations and other constraints, then records the binding via the API server.",
   "distractors": "kube-proxy handles Service networking, kubectl is a client CLI, and the kubelet runs Pods after they are already assigned."
  },
  {
   "n": 5,
   "q": "What does the kubelet do?",
   "options": [
    "Stores all cluster state",
    "Builds Helm charts",
    "Approves pull requests",
    "Ensures Pod containers run on a node"
   ],
   "answer": 3,
   "explanation": "The kubelet is the node agent that ensures Pod containers run on a node: it watches the API server for Pods bound to its node, starts them through the container runtime (CRI), runs probes and reports status back.",
   "distractors": "Cluster state lives in etcd; Helm charts and pull requests have nothing to do with the kubelet."
  },
  {
   "n": 6,
   "q": "What is kubectl?",
   "options": [
    "A Linux filesystem",
    "A CLI for interacting with the Kubernetes API",
    "A DNS protocol",
    "A container image format"
   ],
   "answer": 1,
   "explanation": "kubectl is a CLI for interacting with the Kubernetes API: every `kubectl get/apply/describe` becomes an HTTPS request to the kube-apiserver using credentials from your kubeconfig.",
   "distractors": "It is not a filesystem, protocol or image format."
  },
  {
   "n": 7,
   "q": "Which command lists Pods?",
   "options": [
    "kubectl show nodes",
    "kubectl list images",
    "kubectl build pods",
    "kubectl get pods"
   ],
   "answer": 3,
   "explanation": "`kubectl get pods` lists Pods in the current namespace (add `-A` for all namespaces, `-o wide` for node and IP).",
   "distractors": "`kubectl show`, `kubectl list` and `kubectl build` are not kubectl verbs; the read verb is `get`."
  },
  {
   "n": 8,
   "q": "What is a Kubernetes namespace?",
   "options": [
    "A Dockerfile instruction",
    "A logical grouping for cluster resources",
    "A container image tag",
    "A dedicated physical server"
   ],
   "answer": 1,
   "explanation": "A namespace is a logical grouping for cluster resources inside one cluster: names must be unique per namespace, and RBAC, ResourceQuotas and policies can be scoped to it.",
   "distractors": "It is not a Dockerfile instruction, an image tag, or physical isolation on a dedicated server."
  },
  {
   "n": 9,
   "q": "Which component exposes the Kubernetes API?",
   "options": [
    "kubelet",
    "kube-apiserver",
    "CoreDNS",
    "kube-proxy"
   ],
   "answer": 1,
   "explanation": "kube-apiserver exposes the Kubernetes API: it is the front door that authenticates, authorises and validates requests and is the only component that reads and writes etcd.",
   "distractors": "The kubelet is a node agent, CoreDNS serves DNS and kube-proxy handles Service traffic."
  },
  {
   "n": 10,
   "q": "What is a worker node?",
   "options": [
    "A DNS resolver record",
    "A GitHub workflow file",
    "A Helm repository",
    "A machine that runs application Pods"
   ],
   "answer": 3,
   "explanation": "A worker node is a machine (VM or physical) that runs application Pods; it runs the kubelet, a container runtime and usually kube-proxy, while the control plane manages it.",
   "distractors": "DNS records, workflow files and Helm repositories are not compute machines."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Connect to a Kubernetes cluster and inspect nodes, namespaces, and cluster resources using kubectl. Record what each command shows.",
   "checks": [
    {
     "label": "Checks the cluster connection (cluster-info / config current-context)",
     "patterns": [
      "kubectl\\s+cluster-info\\b",
      "kubectl\\s+config\\s+(current-context|get-contexts|use-context)\\b",
      "kubectl\\s+version\\b"
     ]
    },
    {
     "label": "Lists nodes (kubectl get nodes)",
     "patterns": [
      "kubectl\\s+get\\s+(nodes?|no)\\b"
     ]
    },
    {
     "label": "Lists namespaces (kubectl get ns)",
     "patterns": [
      "kubectl\\s+get\\s+(namespaces?|ns)\\b"
     ]
    },
    {
     "label": "Inspects cluster resources (get all -A / api-resources)",
     "patterns": [
      "kubectl\\s+get\\s+all\\b",
      "kubectl\\s+api-resources\\b",
      "kubectl\\s+get\\s+\\S+\\s+(-A|--all-namespaces)\\b"
     ]
    },
    {
     "label": "Records what each command shows (comments)",
     "patterns": [
      "#\\s*\\w"
     ]
    }
   ],
   "modelAnswer": "kubectl config current-context     # which cluster/user kubeconfig points at\nkubectl cluster-info               # API server URL and CoreDNS endpoint\nkubectl get nodes -o wide          # nodes, Ready status, roles, version, internal IP, OS, runtime\nkubectl describe node <node-name>  # capacity/allocatable, conditions, taints, Pods on the node\nkubectl get namespaces             # default, kube-system, kube-public, kube-node-lease (+ your own)\nkubectl get pods -n kube-system    # control-plane and add-on Pods (coredns, kube-proxy, etcd, ...)\nkubectl get all -A                 # Pods, Services, Deployments, ReplicaSets in every namespace\nkubectl api-resources              # every resource type the API serves, short names, namespaced or not",
   "explanation": "Tests basic cluster navigation with kubectl and understanding of what the output means. A good answer confirms which context it is connected to, shows nodes are Ready, lists the default namespaces, and inspects resources across namespaces, with a short note on each command. Watch for confusing namespaced resources (Pods) with cluster-scoped ones (Nodes, Namespaces)."
  },
  {
   "n": 2,
   "task": "Deploy a simple web application and inspect it using kubectl get, describe, and logs. Confirm that the workload reaches a healthy state.",
   "checks": [
    {
     "label": "Deploys the app (kubectl create deployment / apply)",
     "patterns": [
      "kubectl\\s+create\\s+deployment\\b",
      "kubectl\\s+apply\\b",
      "kubectl\\s+run\\b"
     ]
    },
    {
     "label": "Inspects with kubectl get",
     "patterns": [
      "kubectl\\s+get\\b"
     ]
    },
    {
     "label": "Inspects with kubectl describe",
     "patterns": [
      "kubectl\\s+describe\\b"
     ]
    },
    {
     "label": "Reads logs (kubectl logs)",
     "patterns": [
      "kubectl\\s+logs\\b"
     ]
    },
    {
     "label": "Confirms a healthy state (rollout status / Running / Ready)",
     "patterns": [
      "rollout\\s+status\\b",
      "kubectl\\s+wait\\b",
      "\\brunning\\b",
      "\\bready\\b"
     ]
    }
   ],
   "modelAnswer": "kubectl create deployment web --image=nginx:1.27 --replicas=2\nkubectl rollout status deployment/web        # waits until \"successfully rolled out\"\nkubectl get deployments,pods -l app=web -o wide\n# Expect: READY 2/2, Pods STATUS Running, RESTARTS 0\nkubectl describe deployment web               # replicas, strategy, conditions (Available=True)\nkubectl describe pod -l app=web               # Events: Scheduled, Pulling, Pulled, Created, Started\nkubectl logs deployment/web                   # nginx startup messages\nkubectl logs -l app=web --tail=20",
   "explanation": "Tests deploying a workload and the three core inspection commands. Check that the Deployment reports all replicas ready, the Pods are Running with no restarts, the describe Events show a clean schedule/pull/start sequence, and logs show the app started. `kubectl rollout status` or `kubectl wait --for=condition=Available` is the cleanest health confirmation."
  },
  {
   "n": 3,
   "task": "Identify the role of the API Server, Scheduler, Controller Manager, etcd, kubelet, and kubectl in a short cluster architecture diagram.",
   "checks": [
    {
     "label": "API Server",
     "patterns": [
      "api[\\s-]?server"
     ]
    },
    {
     "label": "Scheduler",
     "patterns": [
      "scheduler"
     ]
    },
    {
     "label": "Controller Manager",
     "patterns": [
      "controller[\\s-]?manager"
     ]
    },
    {
     "label": "etcd",
     "patterns": [
      "\\betcd\\b"
     ]
    },
    {
     "label": "kubelet",
     "patterns": [
      "\\bkubelet\\b"
     ]
    },
    {
     "label": "kubectl",
     "patterns": [
      "\\bkubectl\\b"
     ]
    }
   ],
   "modelAnswer": "  [kubectl] --HTTPS--> +---------------- Control plane ----------------+\n                       |  kube-apiserver  <---->  etcd                 |\n                       |     ^      ^                                  |\n                       |     |      |                                  |\n                       |  kube-scheduler   kube-controller-manager     |\n                       +-----|-------------------------------------------+\n                             | watch / status\n              +--------------v-------------+   +------------------------+\n              | Worker node 1              |   | Worker node 2          |\n              | kubelet -> containerd      |   | kubelet -> containerd  |\n              | kube-proxy, Pods           |   | kube-proxy, Pods       |\n              +----------------------------+   +------------------------+\n\nkubectl: client CLI; sends requests to the API server using kubeconfig credentials.\nkube-apiserver: front door of the cluster; authenticates, validates, and is the only component that reads/writes etcd.\netcd: consistent key-value store holding all cluster state (desired and observed).\nkube-scheduler: assigns unscheduled Pods to nodes based on resources and constraints.\nkube-controller-manager: runs control loops (Deployment, ReplicaSet, Node, Job...) that drive actual state toward desired state.\nkubelet: agent on every node; starts Pods' containers via the container runtime, runs probes, reports status.",
   "explanation": "Tests the control-plane vs node split and how components talk. Key points to verify: everything goes through the API server (no component other than it touches etcd), the scheduler only decides placement, controllers reconcile desired state, and the kubelet actually runs containers on each node. kubectl is just a client of the API."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Kubernetes Fundamentals",
 "label": "Session 9"
};
