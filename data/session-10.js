window.SESSION = {
 "num": 10,
 "slug": "session10-k8s-core-objects",
 "mcqs": [
  {
   "n": 1,
   "q": "What is the purpose of a Deployment?",
   "options": [
    "Store cluster state",
    "Manage desired replicas and rolling updates",
    "Expose a public DNS zone",
    "Create container images"
   ],
   "answer": 1,
   "explanation": "A Deployment manages desired replicas and rolling updates: you declare the Pod template and replica count, and it creates ReplicaSets, replaces Pods gradually on change, and keeps revision history for rollback.",
   "distractors": "Cluster state lives in etcd, DNS zones are outside Kubernetes, and images are built by tools like Docker, not Deployments."
  },
  {
   "n": 2,
   "q": "What does a ReplicaSet ensure?",
   "options": [
    "A desired number of matching Pods are running",
    "Nodes never fail",
    "Every Pod has a public IP",
    "All images are signed"
   ],
   "answer": 0,
   "explanation": "A ReplicaSet ensures a desired number of matching Pods are running: it counts Pods matching its label selector and creates or deletes Pods to reach `spec.replicas`.",
   "distractors": "It cannot stop nodes failing (it reacts by recreating Pods elsewhere), does not give Pods public IPs, and does not sign images."
  },
  {
   "n": 3,
   "q": "Which field commonly sets Deployment replica count?",
   "options": [
    "status.desiredNodes",
    "spec.ports",
    "metadata.replicas",
    "spec.replicas"
   ],
   "answer": 3,
   "explanation": "`spec.replicas` sets how many Pods a Deployment should run. Desired state lives under `spec`; observed values appear under `status` (e.g. `status.readyReplicas`).",
   "distractors": "`metadata` holds names/labels, `spec.ports` belongs to Services/containers, and `status.desiredNodes` does not exist."
  },
  {
   "n": 4,
   "q": "What does a Pod label help with?",
   "options": [
    "Allocating disk partitions",
    "Installing Helm",
    "Selecting and organizing resources",
    "Encrypting image layers"
   ],
   "answer": 2,
   "explanation": "Labels are key/value pairs for selecting and organizing resources: Services, ReplicaSets and `kubectl get -l` all find Pods by label, and labels let you group by app, tier, environment, etc.",
   "distractors": "Labels do not partition disks, install Helm, or encrypt anything."
  },
  {
   "n": 5,
   "q": "What is a label selector used for?",
   "options": [
    "Selecting Git commits by date",
    "Matching resources with specified labels",
    "Choosing Docker build stages",
    "Filtering shell history"
   ],
   "answer": 1,
   "explanation": "A label selector is used for matching resources with specified labels, e.g. `app=web` or `tier in (frontend,backend)`. Services and controllers use it to decide which Pods they own or route to.",
   "distractors": "Git commits, Docker build stages and shell history are not selected with Kubernetes selectors."
  },
  {
   "n": 6,
   "q": "Which command scales a Deployment?",
   "options": [
    "kubectl duplicate image",
    "kubectl increase node",
    "kubectl scale deployment",
    "kubectl resize pod"
   ],
   "answer": 2,
   "explanation": "`kubectl scale deployment <name> --replicas=N` changes the replica count (equivalent to editing `spec.replicas`).",
   "distractors": "duplicate, increase and resize are not valid kubectl verbs for this; you scale the Deployment, not individual Pods or nodes."
  },
  {
   "n": 7,
   "q": "What happens when a Deployment Pod crashes?",
   "options": [
    "A controller works to restore desired state",
    "Git automatically rolls back",
    "Kubernetes deletes the Deployment permanently",
    "The cluster always stops"
   ],
   "answer": 0,
   "explanation": "When a Deployment Pod crashes, a controller works to restore desired state: the kubelet restarts the container per restartPolicy, and if the Pod is deleted or its node dies, the ReplicaSet controller creates a replacement.",
   "distractors": "Git does not roll back, the Deployment is not deleted, and the cluster keeps running."
  },
  {
   "n": 8,
   "q": "Which command views rollout status?",
   "options": [
    "kubectl get dns",
    "kubectl rollout status deployment/name",
    "kubectl helm status",
    "kubectl logs nodes"
   ],
   "answer": 1,
   "explanation": "`kubectl rollout status deployment/<name>` watches a rollout until it completes (or fails its progress deadline); `kubectl rollout history` and `rollout undo` are its companions.",
   "distractors": "There is no `kubectl get dns` or `kubectl helm` subcommand, and `kubectl logs` reads container logs, not rollout progress."
  },
  {
   "n": 9,
   "q": "What does a rolling update do?",
   "options": [
    "Gradually replace old Pods with new ones",
    "Change namespace ownership",
    "Restart the control plane",
    "Delete all nodes first"
   ],
   "answer": 0,
   "explanation": "A rolling update gradually replaces old Pods with new ones, bounded by `maxSurge` and `maxUnavailable`, so the application stays available during the change.",
   "distractors": "It does not change namespaces, restart the control plane, or delete nodes."
  },
  {
   "n": 10,
   "q": "Which resource usually creates and manages ReplicaSets?",
   "options": [
    "Secret",
    "PersistentVolume",
    "ConfigMap",
    "Deployment"
   ],
   "answer": 3,
   "explanation": "A Deployment creates and manages ReplicaSets: each Pod-template change creates a new ReplicaSet, and the Deployment scales the new one up and the old one down.",
   "distractors": "Secrets and ConfigMaps hold data and PersistentVolumes are storage; none of them own ReplicaSets."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Create a Pod running Nginx and inspect its status, labels, IP address, and logs using kubectl.",
   "checks": [
    {
     "label": "Creates an Nginx Pod (kubectl run / kind: Pod)",
     "patterns": [
      "kubectl\\s+run\\b",
      "kind:\\s*pod\\b"
     ]
    },
    {
     "label": "Checks status (kubectl get / describe pod)",
     "patterns": [
      "kubectl\\s+get\\s+(pods?|po)\\b",
      "kubectl\\s+describe\\s+(pods?|po)\\b"
     ]
    },
    {
     "label": "Shows labels (--show-labels / -L / -l)",
     "patterns": [
      "--show-labels\\b",
      "\\s-L\\s",
      "\\s-l\\s",
      "\\.metadata\\.labels"
     ]
    },
    {
     "label": "Shows the Pod IP (-o wide / podIP)",
     "patterns": [
      "-o\\s*wide\\b",
      "podIP"
     ]
    },
    {
     "label": "Reads logs (kubectl logs)",
     "patterns": [
      "kubectl\\s+logs\\b"
     ]
    }
   ],
   "modelAnswer": "kubectl run nginx --image=nginx:1.27 --labels=app=web,tier=frontend --port=80\nkubectl get pod nginx                         # STATUS Running, READY 1/1\nkubectl get pod nginx --show-labels           # app=web,tier=frontend\nkubectl get pod nginx -o wide                 # Pod IP and node\nkubectl get pod nginx -o jsonpath='{.status.podIP}{\"\\n\"}'\nkubectl describe pod nginx                    # labels, IP, conditions, events\nkubectl logs nginx                            # nginx startup / access logs",
   "explanation": "Tests creating a bare Pod and reading its key properties. Verify the Pod reaches Running with READY 1/1, that its labels are displayed, that the Pod IP is shown (from `-o wide`, describe, or jsonpath), and that logs are retrieved. A YAML manifest with `kind: Pod` applied via `kubectl apply -f` is equally valid."
  },
  {
   "n": 2,
   "task": "Create a Deployment with two replicas, scale it to five, and then scale it back to two. Verify the replica count at each step.",
   "checks": [
    {
     "label": "Creates a Deployment with 2 replicas",
     "patterns": [
      "--replicas[\\s=]+2\\b",
      "replicas:\\s*2\\b"
     ]
    },
    {
     "label": "Scales to 5 (kubectl scale --replicas=5)",
     "patterns": [
      "scale\\b[^\\n]*--replicas[\\s=]+5\\b"
     ]
    },
    {
     "label": "Scales back to 2",
     "patterns": [
      "scale\\b[^\\n]*--replicas[\\s=]+2\\b"
     ]
    },
    {
     "label": "Verifies replica count (kubectl get deploy / pods)",
     "patterns": [
      "kubectl\\s+get\\s+(deployments?|deploy|rs|replicasets?|pods?|po)\\b",
      "rollout\\s+status\\b"
     ]
    }
   ],
   "modelAnswer": "kubectl create deployment web --image=nginx:1.27 --replicas=2\nkubectl rollout status deployment/web\nkubectl get deployment web          # READY 2/2\n\nkubectl scale deployment web --replicas=5\nkubectl rollout status deployment/web\nkubectl get deployment web          # READY 5/5\nkubectl get pods -l app=web         # 5 Pods Running\n\nkubectl scale deployment web --replicas=2\nkubectl get deployment web          # READY 2/2 (3 Pods Terminating, then gone)\nkubectl get rs -l app=web           # same ReplicaSet, DESIRED/CURRENT 2",
   "explanation": "Tests imperative scaling of a Deployment and verifying the result. Check the READY column (e.g. 5/5) after each step and that the Pod count follows. Scaling does not create a new ReplicaSet or rollout revision because the Pod template is unchanged; editing `replicas:` in YAML and re-applying is an equally valid approach."
  },
  {
   "n": 3,
   "task": "Deploy version 1 of an application, perform a rolling update to version 2, verify the rollout, and roll back to version 1.",
   "checks": [
    {
     "label": "Deploys version 1",
     "patterns": [
      "kubectl\\s+create\\s+deployment\\b",
      "kubectl\\s+apply\\b"
     ]
    },
    {
     "label": "Rolls out version 2 (set image / apply / patch)",
     "patterns": [
      "set\\s+image\\b",
      "kubectl\\s+patch\\b",
      "kubectl\\s+edit\\b",
      "apply\\s+-f\\s+\\S*v2"
     ]
    },
    {
     "label": "Watches the rollout (kubectl rollout status)",
     "patterns": [
      "rollout\\s+status\\b"
     ]
    },
    {
     "label": "Rolls back (kubectl rollout undo)",
     "patterns": [
      "rollout\\s+undo\\b"
     ]
    },
    {
     "label": "Checks history or current image",
     "patterns": [
      "rollout\\s+history\\b",
      "jsonpath",
      "kubectl\\s+describe\\b",
      "-o\\s*wide\\b"
     ]
    }
   ],
   "modelAnswer": "# v1\nkubectl create deployment app --image=nginx:1.26 --replicas=3\nkubectl rollout status deployment/app\nkubectl annotate deployment/app kubernetes.io/change-cause=\"v1: nginx 1.26\"\n\n# Rolling update to v2\nkubectl set image deployment/app nginx=nginx:1.27\nkubectl annotate deployment/app kubernetes.io/change-cause=\"v2: nginx 1.27\" --overwrite\nkubectl rollout status deployment/app       # old Pods replaced gradually\nkubectl get rs -l app=app                   # new RS at 3, old RS at 0\nkubectl rollout history deployment/app      # revisions 1 and 2\n\n# Roll back to v1\nkubectl rollout undo deployment/app --to-revision=1\nkubectl rollout status deployment/app\nkubectl get deployment app -o jsonpath='{.spec.template.spec.containers[0].image}{\"\\n\"}'   # nginx:1.26",
   "explanation": "Tests the Deployment rollout lifecycle: update, monitor, history and rollback. Verify the image changes after the update, that `rollout status` reports success, that `rollout history` shows the revisions, and that after `rollout undo` the running image is v1 again (the rolled-back revision is renumbered as the newest). The container name created by `kubectl create deployment --image=nginx` is `nginx`."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Pods, ReplicaSets & Deployments",
 "label": "Session 10"
};
