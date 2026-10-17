window.SESSION = {
 "num": 14,
 "slug": "session-14-kubernetes-troubleshooting",
 "mcqs": [
  {
   "n": 1,
   "q": "Which command gives a quick overview of Pod status?",
   "options": [
    "kubectl get pods",
    "kubectl publish",
    "kubectl init",
    "kubectl build pods"
   ],
   "answer": 0,
   "explanation": "`kubectl get pods` gives the quick overview: READY, STATUS (Running, Pending, CrashLoopBackOff, ImagePullBackOff...), RESTARTS and AGE for each Pod. It is usually the first troubleshooting command.",
   "distractors": "publish, init and `build pods` are not kubectl commands."
  },
  {
   "n": 2,
   "q": "Which command displays detailed Pod events and conditions?",
   "options": [
    "kubectl top namespace",
    "kubectl apply -k",
    "kubectl delete pod",
    "kubectl describe pod"
   ],
   "answer": 3,
   "explanation": "`kubectl describe pod` shows a Pod's detailed configuration, container states (including last termination reason and exit code), conditions and recent Events at the bottom.",
   "distractors": "`kubectl top` shows resource usage, `apply -k` applies a Kustomization, and `delete pod` removes the Pod and its evidence."
  },
  {
   "n": 3,
   "q": "Which command reads a container's logs?",
   "options": [
    "kubectl version",
    "kubectl create",
    "kubectl label",
    "kubectl logs"
   ],
   "answer": 3,
   "explanation": "`kubectl logs` reads a container's stdout/stderr; use `-c` to pick a container and `--previous` to see the output of the last crashed instance.",
   "distractors": "version, create and label do not show application output."
  },
  {
   "n": 4,
   "q": "Which command runs a command inside a running container?",
   "options": [
    "kubectl exec",
    "kubectl config view",
    "kubectl explain",
    "kubectl diff"
   ],
   "answer": 0,
   "explanation": "`kubectl exec` runs a command inside a running container, e.g. `kubectl exec -it <pod> -- sh` or `kubectl exec <pod> -- printenv`.",
   "distractors": "`config view` shows kubeconfig, `explain` documents API fields, and `diff` compares manifests with live objects."
  },
  {
   "n": 5,
   "q": "What often causes ImagePullBackOff?",
   "options": [
    "An oversized log file only",
    "A healthy application",
    "A missing readiness probe only",
    "An image cannot be downloaded"
   ],
   "answer": 3,
   "explanation": "ImagePullBackOff means an image cannot be downloaded: usually a typo in the name or tag, a tag that does not exist, a private registry without `imagePullSecrets`, or registry rate limits/network issues. Kubernetes retries with increasing back-off.",
   "distractors": "Log size, application health and probes do not affect image pulling."
  },
  {
   "n": 6,
   "q": "What often causes CrashLoopBackOff?",
   "options": [
    "A stable Service IP",
    "A container repeatedly exits or crashes",
    "A successful rollout",
    "A valid PVC"
   ],
   "answer": 1,
   "explanation": "CrashLoopBackOff means a container repeatedly exits or crashes and the kubelet is waiting longer between restarts. Typical causes are bad config or missing env vars, a wrong command, a failing dependency, or liveness probe kills.",
   "distractors": "Stable Services, successful rollouts and valid PVCs are signs of health, not causes of crashes."
  },
  {
   "n": 7,
   "q": "What is a common reason for a Pod to remain Pending?",
   "options": [
    "Successful readiness probe",
    "Correct image tag",
    "Healthy DNS",
    "Insufficient schedulable resources"
   ],
   "answer": 3,
   "explanation": "Insufficient schedulable resources are a common reason for Pending: no node has enough CPU/memory to satisfy the Pod's requests (other causes are taints, node selectors/affinity, or an unbound PVC). The FailedScheduling event explains which.",
   "distractors": "A passing readiness probe, correct image tag and healthy DNS all happen after or independently of scheduling."
  },
  {
   "n": 8,
   "q": "Where can you see recent scheduling or pull errors?",
   "options": [
    "Kubernetes Events",
    "Git tags",
    "Docker Hub stars",
    "Helm templates only"
   ],
   "answer": 0,
   "explanation": "Kubernetes Events record recent scheduling, pull and probe errors (FailedScheduling, Failed to pull image, BackOff...). See them with `kubectl get events --sort-by=.lastTimestamp` or at the bottom of `kubectl describe`. They expire after about an hour by default.",
   "distractors": "Git tags, Docker Hub stars and Helm templates do not contain runtime errors."
  },
  {
   "n": 9,
   "q": "What should you check if a Service has no endpoints?",
   "options": [
    "Only the Git commit message",
    "Whether its selector matches ready Pods",
    "Only the cluster timezone",
    "Only Docker build cache"
   ],
   "answer": 1,
   "explanation": "If a Service has no endpoints, check whether its selector matches ready Pods: compare `kubectl describe svc` (Selector) with `kubectl get pods --show-labels`, and check that matching Pods are Ready and in the same namespace.",
   "distractors": "Commit messages, timezone and build cache do not affect Service endpoints."
  },
  {
   "n": 10,
   "q": "What is the final step after fixing an incident?",
   "options": [
    "Delete all logs",
    "Disable probes",
    "Verify the workload behaves correctly",
    "Skip testing"
   ],
   "answer": 2,
   "explanation": "The final step is to verify the workload behaves correctly: confirm Pods are Running/Ready with no new restarts, endpoints are populated, and real requests succeed, then record the root cause.",
   "distractors": "Deleting logs, disabling probes or skipping tests hide problems instead of confirming the fix."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Deploy a workload with an invalid image. Diagnose ImagePullBackOff using kubectl get, describe, and events, then correct the image.",
   "checks": [
    {
     "label": "Checks Pod status (kubectl get pods)",
     "patterns": [
      "kubectl\\s+get\\s+(pods?|po)\\b"
     ]
    },
    {
     "label": "Describes the Pod (kubectl describe)",
     "patterns": [
      "kubectl\\s+describe\\b"
     ]
    },
    {
     "label": "Reads events (kubectl get events)",
     "patterns": [
      "kubectl\\s+(get\\s+)?events\\b"
     ]
    },
    {
     "label": "Corrects the image (set image / edit / apply / patch)",
     "patterns": [
      "set\\s+image\\b",
      "kubectl\\s+edit\\b",
      "kubectl\\s+apply\\b",
      "kubectl\\s+patch\\b"
     ]
    },
    {
     "label": "Verifies recovery (rollout status / Running)",
     "patterns": [
      "rollout\\s+status\\b",
      "\\brunning\\b"
     ]
    }
   ],
   "modelAnswer": "# Break it: tag does not exist\nkubectl create deployment bad-img --image=nginx:1.27-doesnotexist\n\nkubectl get pods -l app=bad-img            # STATUS ErrImagePull -> ImagePullBackOff, READY 0/1\nkubectl describe pod -l app=bad-img        # Events: Failed to pull image \"nginx:1.27-doesnotexist\": ... not found\nkubectl get events --sort-by=.lastTimestamp --field-selector involvedObject.kind=Pod\n# Root cause: wrong image tag (not a registry auth problem: the error says \"not found\", not \"unauthorized\")\n\n# Fix: point the container (named \"nginx\") at a valid tag\nkubectl set image deployment/bad-img nginx=nginx:1.27\nkubectl rollout status deployment/bad-img\nkubectl get pods -l app=bad-img            # STATUS Running, READY 1/1",
   "explanation": "Tests reading image-pull failures from status, describe and events. The Events message distinguishes a wrong name/tag ('not found' / 'manifest unknown') from authentication problems ('unauthorized', needing imagePullSecrets) or network issues. Verify the fix by a successful rollout and Running Pods; the broken ReplicaSet is scaled to zero automatically."
  },
  {
   "n": 2,
   "task": "Diagnose a CrashLoopBackOff workload using logs and describe. Identify the root cause, fix the configuration, and verify recovery.",
   "checks": [
    {
     "label": "Reads container logs (kubectl logs, ideally --previous)",
     "patterns": [
      "kubectl\\s+logs\\b"
     ]
    },
    {
     "label": "Describes the Pod (exit code / last state)",
     "patterns": [
      "kubectl\\s+describe\\b"
     ]
    },
    {
     "label": "States the root cause",
     "patterns": [
      "root\\s+cause",
      "\\bcause\\b",
      "exit\\s+code"
     ]
    },
    {
     "label": "Fixes the configuration (set env / edit / apply / patch)",
     "patterns": [
      "set\\s+env\\b",
      "set\\s+image\\b",
      "kubectl\\s+edit\\b",
      "kubectl\\s+apply\\b",
      "kubectl\\s+patch\\b"
     ]
    },
    {
     "label": "Verifies recovery (rollout status / Running, restarts stop)",
     "patterns": [
      "rollout\\s+status\\b",
      "\\brunning\\b"
     ]
    }
   ],
   "modelAnswer": "# crashy.yaml - app exits if a required env var is missing\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: crashy\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: crashy\n  template:\n    metadata:\n      labels:\n        app: crashy\n    spec:\n      containers:\n        - name: app\n          image: busybox:1.36\n          command: [\"sh\", \"-c\", \"if [ -z \\\"$DB_HOST\\\" ]; then echo 'FATAL: DB_HOST not set'; exit 1; fi; echo connected to $DB_HOST; sleep 3600\"]\n\nkubectl apply -f crashy.yaml\nkubectl get pods -l app=crashy                 # CrashLoopBackOff, RESTARTS climbing\nkubectl logs deploy/crashy --previous          # FATAL: DB_HOST not set\nkubectl describe pod -l app=crashy             # Last State: Terminated, Reason: Error, Exit Code: 1; Events: Back-off restarting failed container\n# Root cause: required configuration DB_HOST is missing, so the process exits with code 1\n\n# Fix the configuration (or add the env entry to crashy.yaml and re-apply)\nkubectl set env deployment/crashy DB_HOST=db.example.internal\nkubectl rollout status deployment/crashy\nkubectl get pods -l app=crashy                 # Running, READY 1/1, RESTARTS 0 on the new Pod\nkubectl logs deploy/crashy                     # connected to db.example.internal",
   "explanation": "Tests a systematic CrashLoopBackOff diagnosis: logs (especially `--previous`, since the current container may have just restarted) show why the process exited, and describe shows the exit code and last state. Exit code 1 points at an application error, 137 at OOMKilled or a SIGKILL, and liveness-probe kills show in Events. Verify the new Pod stays Running and its restart count no longer climbs."
  },
  {
   "n": 3,
   "task": "Create a Service with an incorrect selector. Use labels, selectors, endpoints, and Service configuration to identify and fix the issue.",
   "checks": [
    {
     "label": "Inspects Pod labels (--show-labels / -l)",
     "patterns": [
      "--show-labels\\b",
      "get\\s+pods?\\s+-l\\b",
      "\\s-l\\s"
     ]
    },
    {
     "label": "Inspects the Service selector",
     "patterns": [
      "selector"
     ]
    },
    {
     "label": "Checks endpoints (endpoints / endpointslices)",
     "patterns": [
      "\\bendpoints?\\b",
      "endpointslices?\\b",
      "get\\s+ep\\b"
     ]
    },
    {
     "label": "Inspects the Service configuration (describe svc / get svc -o yaml)",
     "patterns": [
      "describe\\s+(svc|services?)\\b",
      "get\\s+(svc|services?)\\s+\\S+\\s+-o\\b"
     ]
    },
    {
     "label": "Fixes the selector (patch / edit / apply / set selector)",
     "patterns": [
      "kubectl\\s+patch\\b",
      "kubectl\\s+edit\\b",
      "kubectl\\s+apply\\b",
      "set\\s+selector\\b"
     ]
    },
    {
     "label": "Verifies traffic works (curl / wget)",
     "patterns": [
      "\\bcurl\\b",
      "\\bwget\\b"
     ]
    }
   ],
   "modelAnswer": "kubectl create deployment web --image=nginx:1.27 --replicas=2    # Pods labelled app=web\n\n# svc-broken.yaml - selector typo\napiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  selector:\n    app: wbe\n  ports:\n    - port: 80\n      targetPort: 80\n\nkubectl apply -f svc-broken.yaml\nkubectl describe svc web                     # Selector: app=wbe, Endpoints: <none>\nkubectl get endpointslices -l kubernetes.io/service-name=web   # no addresses\nkubectl get pods --show-labels               # Pods carry app=web\nkubectl get pods -l app=wbe                  # No resources found -> selector matches nothing\nkubectl get svc web -o yaml                  # confirm spec.selector\n\n# Fix\nkubectl patch svc web -p '{\"spec\":{\"selector\":{\"app\":\"web\"}}}'\nkubectl describe svc web                     # Endpoints: <pod-ip>:80, <pod-ip>:80\nkubectl run tmp --rm -it --image=busybox:1.36 --restart=Never -- wget -qO- http://web",
   "explanation": "Tests the 'Service has no endpoints' workflow: compare the Service selector with the actual Pod labels, confirm that `kubectl get pods -l <selector>` returns nothing, fix the selector (or the labels) and confirm endpoints appear. Also rule out Pods that match but are not Ready, since unready Pods are not served. Final proof is a successful request to the Service name."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Kubernetes Troubleshooting",
 "label": "Session 14"
};
