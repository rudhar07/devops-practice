window.SESSION = {
 "num": 13,
 "slug": "session-13-storage-hpa-probes",
 "mcqs": [
  {
   "n": 1,
   "q": "What is a PersistentVolumeClaim (PVC)?",
   "options": [
    "A request for persistent storage",
    "A network firewall",
    "A container image",
    "A Git tag"
   ],
   "answer": 0,
   "explanation": "A PersistentVolumeClaim is a request for persistent storage: a Pod asks for a size, access mode and optionally a StorageClass, and Kubernetes binds the claim to a matching PersistentVolume.",
   "distractors": "Firewalls, images and Git tags are unrelated to storage."
  },
  {
   "n": 2,
   "q": "What is a PersistentVolume (PV)?",
   "options": [
    "An Ingress controller",
    "A cluster storage resource",
    "A Deployment revision",
    "A DNS zone"
   ],
   "answer": 1,
   "explanation": "A PersistentVolume is a cluster storage resource (an EBS volume, NFS share, local disk, etc.) with its own lifecycle, provisioned by an admin or dynamically by a StorageClass.",
   "distractors": "Ingress controllers route traffic, Deployment revisions are ReplicaSets, and DNS zones are outside Kubernetes."
  },
  {
   "n": 3,
   "q": "What does a StorageClass help define?",
   "options": [
    "Which Git branch is default",
    "Which HTTP path is matched",
    "Which Dockerfile is used",
    "How dynamic storage provisioning occurs"
   ],
   "answer": 3,
   "explanation": "A StorageClass defines how dynamic storage provisioning occurs: which provisioner/CSI driver to use, parameters such as disk type, reclaimPolicy and volumeBindingMode. A PVC naming the class gets a PV created automatically.",
   "distractors": "Git branches, HTTP paths and Dockerfiles have nothing to do with storage classes."
  },
  {
   "n": 4,
   "q": "What does HPA stand for?",
   "options": [
    "HTTP Proxy Adapter",
    "Helm Package Archive",
    "Horizontal Pod Autoscaler",
    "Host Port Allocator"
   ],
   "answer": 2,
   "explanation": "HPA stands for Horizontal Pod Autoscaler: \"horizontal\" means adding or removing Pods, as opposed to vertical scaling which changes a Pod's CPU/memory.",
   "distractors": "The other expansions are invented."
  },
  {
   "n": 5,
   "q": "What does an HPA commonly adjust?",
   "options": [
    "Container image contents",
    "Number of Pod replicas",
    "Git history",
    "Node operating system"
   ],
   "answer": 1,
   "explanation": "An HPA adjusts the number of Pod replicas of a Deployment/StatefulSet based on metrics such as average CPU utilisation relative to requests, between `minReplicas` and `maxReplicas`.",
   "distractors": "It does not change images, Git history, or node operating systems (node count is the Cluster Autoscaler's / Karpenter's job)."
  },
  {
   "n": 6,
   "q": "What does a readiness probe determine?",
   "options": [
    "Whether a container image exists",
    "Whether a container should receive traffic",
    "Whether Git is clean",
    "Whether a node is a control plane"
   ],
   "answer": 1,
   "explanation": "A readiness probe determines whether a container should receive traffic: while it fails, the Pod is marked NotReady and removed from Service endpoints, but it is not restarted.",
   "distractors": "Image existence is checked at pull time, Git state is irrelevant, and node roles are not probed."
  },
  {
   "n": 7,
   "q": "What does a liveness probe help detect?",
   "options": [
    "Whether a Service has a public IP",
    "Whether a volume is encrypted",
    "Whether Terraform is initialized",
    "When a container should be restarted"
   ],
   "answer": 3,
   "explanation": "A liveness probe detects when a container should be restarted: if it fails `failureThreshold` times in a row, the kubelet kills the container and restarts it according to restartPolicy.",
   "distractors": "Public IPs, volume encryption and Terraform state are not things probes check."
  },
  {
   "n": 8,
   "q": "What does a startup probe help with?",
   "options": [
    "Allowing slow-starting apps time to initialize",
    "Provisioning a cloud account",
    "Creating a Docker network",
    "Checking Git credentials"
   ],
   "answer": 0,
   "explanation": "A startup probe gives slow-starting apps time to initialize: liveness and readiness checks are held off until it succeeds, so a slow boot is not mistaken for a hang and killed.",
   "distractors": "Cloud accounts, Docker networks and Git credentials are unrelated."
  },
  {
   "n": 9,
   "q": "What can happen if a Pod's PVC remains unbound?",
   "options": [
    "The image is rebuilt automatically",
    "The Pod may remain Pending",
    "The Pod is always Running",
    "The Deployment is deleted"
   ],
   "answer": 1,
   "explanation": "If a Pod's PVC remains unbound, the Pod may remain Pending, because the scheduler cannot place a Pod whose volume is not available; `kubectl describe pod` shows an event like 'unbound immediate PersistentVolumeClaims'.",
   "distractors": "Nothing is rebuilt or deleted automatically, and the Pod cannot be Running without its volume. (With WaitForFirstConsumer the PVC is expected to stay Pending until a Pod is scheduled; that is normal.)"
  },
  {
   "n": 10,
   "q": "Which command lists PVCs?",
   "options": [
    "kubectl get hpa-only",
    "kubectl get routes",
    "kubectl get mounts",
    "kubectl get pvc"
   ],
   "answer": 3,
   "explanation": "`kubectl get pvc` lists PersistentVolumeClaims with their STATUS (Bound/Pending), bound volume, capacity, access modes and StorageClass.",
   "distractors": "hpa-only, routes and mounts are not Kubernetes resource types."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Create a PersistentVolumeClaim, mount it into a Pod, write a file, recreate the Pod, and verify that the file remains.",
   "checks": [
    {
     "label": "Creates a PersistentVolumeClaim",
     "patterns": [
      "kind:\\s*persistentvolumeclaim\\b"
     ]
    },
    {
     "label": "Mounts it in the Pod (claimName + mountPath)",
     "patterns": [
      "claimname\\s*:"
     ]
    },
    {
     "label": "Writes a file to the volume",
     "patterns": [
      "echo\\b[^\\n]*>",
      "\\btouch\\b",
      "\\btee\\b"
     ]
    },
    {
     "label": "Deletes / recreates the Pod",
     "patterns": [
      "kubectl\\s+delete\\s+(pods?|po)\\b",
      "kubectl\\s+delete\\s+-f\\b"
     ]
    },
    {
     "label": "Reads the file back after recreation",
     "patterns": [
      "\\bcat\\b",
      "\\bls\\b"
     ]
    },
    {
     "label": "Checks the PVC is Bound (kubectl get pvc)",
     "patterns": [
      "kubectl\\s+get\\s+(pvc|persistentvolumeclaims?)\\b"
     ]
    }
   ],
   "modelAnswer": "# pvc-pod.yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: data-pvc\nspec:\n  accessModes: [\"ReadWriteOnce\"]\n  resources:\n    requests:\n      storage: 1Gi\n  # storageClassName omitted -> cluster default StorageClass\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: writer\nspec:\n  containers:\n    - name: app\n      image: busybox:1.36\n      command: [\"sh\", \"-c\", \"sleep 3600\"]\n      volumeMounts:\n        - name: data\n          mountPath: /data\n  volumes:\n    - name: data\n      persistentVolumeClaim:\n        claimName: data-pvc\n\nkubectl apply -f pvc-pod.yaml\nkubectl get pvc data-pvc                    # STATUS Bound\nkubectl wait --for=condition=Ready pod/writer\nkubectl exec writer -- sh -c 'echo \"hello from $(date)\" > /data/note.txt'\n\nkubectl delete pod writer                   # PVC (and its PV) remain\nkubectl apply -f pvc-pod.yaml               # recreate the Pod\nkubectl wait --for=condition=Ready pod/writer\nkubectl exec writer -- cat /data/note.txt   # same content -> data persisted",
   "explanation": "Tests that data on a PVC outlives a Pod. Verify the PVC is Bound (Pending usually means no default StorageClass), the file is written under the mountPath, the Pod is actually deleted and recreated, and the file is still there. Deleting the PVC itself would, with the usual Delete reclaim policy, destroy the data."
  },
  {
   "n": 2,
   "task": "Configure readiness and liveness probes for a sample application. Demonstrate how Kubernetes reacts when the application is not ready or becomes unhealthy.",
   "checks": [
    {
     "label": "Configures a readiness probe",
     "patterns": [
      "readinessprobe\\s*:"
     ]
    },
    {
     "label": "Configures a liveness probe",
     "patterns": [
      "livenessprobe\\s*:"
     ]
    },
    {
     "label": "Uses a probe handler (httpGet / exec / tcpSocket / grpc)",
     "patterns": [
      "httpget\\s*:",
      "\\bexec\\s*:",
      "tcpsocket\\s*:",
      "\\bgrpc\\s*:"
     ]
    },
    {
     "label": "Simulates not-ready / unhealthy",
     "patterns": [
      "\\brm\\b",
      "\\bkill\\b",
      "\\bpkill\\b"
     ]
    },
    {
     "label": "Observes the reaction (READY column, restarts, events)",
     "patterns": [
      "kubectl\\s+(get|describe)\\s+(pods?|po)\\b",
      "restarts?",
      "--watch\\b"
     ]
    }
   ],
   "modelAnswer": "# probes.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: probe-demo\n  labels:\n    app: probe-demo\nspec:\n  containers:\n    - name: app\n      image: busybox:1.36\n      command: [\"sh\", \"-c\", \"touch /tmp/ready /tmp/healthy; sleep 3600\"]\n      readinessProbe:\n        exec:\n          command: [\"cat\", \"/tmp/ready\"]\n        periodSeconds: 5\n        failureThreshold: 1\n      livenessProbe:\n        exec:\n          command: [\"cat\", \"/tmp/healthy\"]\n        initialDelaySeconds: 5\n        periodSeconds: 5\n        failureThreshold: 3\n\nkubectl apply -f probes.yaml\nkubectl expose pod probe-demo --port=80     # Service only to show endpoint changes\nkubectl get pod probe-demo                  # READY 1/1\n\n# Not ready: readiness fails -> Pod stays Running but is removed from endpoints\nkubectl exec probe-demo -- rm /tmp/ready\nkubectl get pod probe-demo                  # READY 0/1, RESTARTS 0\nkubectl get endpointslices -l kubernetes.io/service-name=probe-demo   # no ready address\nkubectl exec probe-demo -- touch /tmp/ready # back to 1/1\n\n# Unhealthy: liveness fails 3 times -> kubelet restarts the container\nkubectl exec probe-demo -- rm /tmp/healthy\nkubectl get pod probe-demo --watch          # RESTARTS goes 0 -> 1\nkubectl describe pod probe-demo             # Events: Liveness probe failed ... will be restarted",
   "explanation": "Tests the different reactions to readiness vs liveness failures. Verify that a failing readiness probe makes READY 0/1 and drops the Pod from Service endpoints without restarting it, while a failing liveness probe increments RESTARTS and shows 'Liveness probe failed' in events. An httpGet probe against a real web app (e.g. /healthz and /ready endpoints) is equally valid."
  },
  {
   "n": 3,
   "task": "Configure an HPA for a Deployment with CPU requests defined. Generate load and observe replica scaling; document any cluster prerequisites.",
   "checks": [
    {
     "label": "Sets CPU requests on the Deployment",
     "patterns": [
      "requests\\s*:[\\s\\S]{0,80}\\bcpu\\s*:",
      "--requests[\\s=]+\\S*cpu",
      "set\\s+resources\\b[^\\n]*cpu"
     ]
    },
    {
     "label": "Creates the HPA (HorizontalPodAutoscaler / kubectl autoscale)",
     "patterns": [
      "kind:\\s*horizontalpodautoscaler\\b",
      "kubectl\\s+autoscale\\b"
     ]
    },
    {
     "label": "Sets a CPU utilisation target",
     "patterns": [
      "averageutilization\\s*:",
      "--cpu-percent\\b",
      "--cpu[\\s=]"
     ]
    },
    {
     "label": "Generates load",
     "patterns": [
      "\\bwget\\b",
      "\\bcurl\\b",
      "\\bhey\\b",
      "\\bab\\s+-n\\b"
     ]
    },
    {
     "label": "Watches scaling (kubectl get hpa / top)",
     "patterns": [
      "kubectl\\s+get\\s+hpa\\b",
      "kubectl\\s+top\\b"
     ]
    },
    {
     "label": "Documents the metrics-server prerequisite",
     "patterns": [
      "metrics[\\s-]server"
     ]
    }
   ],
   "modelAnswer": "# Prerequisite: metrics-server must be installed (kubectl top pods must work)\n#   minikube addons enable metrics-server\n#   or: kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml\nkubectl top nodes\n\n# hpa-demo.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: php-apache\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: php-apache\n  template:\n    metadata:\n      labels:\n        app: php-apache\n    spec:\n      containers:\n        - name: php-apache\n          image: registry.k8s.io/hpa-example\n          ports:\n            - containerPort: 80\n          resources:\n            requests:\n              cpu: 200m          # HPA utilisation is measured against this\n            limits:\n              cpu: 500m\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: php-apache\nspec:\n  selector:\n    app: php-apache\n  ports:\n    - port: 80\n---\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: php-apache\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: php-apache\n  minReplicas: 1\n  maxReplicas: 10\n  metrics:\n    - type: Resource\n      resource:\n        name: cpu\n        target:\n          type: Utilization\n          averageUtilization: 50\n\nkubectl apply -f hpa-demo.yaml\nkubectl get hpa php-apache                   # TARGETS cpu: 0%/50% (not <unknown>)\n\n# Generate load (separate terminal)\nkubectl run load-generator --rm -it --image=busybox:1.36 --restart=Never -- \\\n  /bin/sh -c \"while sleep 0.01; do wget -q -O- http://php-apache; done\"\n\nkubectl get hpa php-apache --watch           # CPU rises above 50%, REPLICAS 1 -> several\nkubectl get deployment php-apache\n# Stop the load (Ctrl+C); after the ~5 minute scale-down stabilisation window replicas return to 1",
   "explanation": "Tests autoscaling and its prerequisites. Verify metrics-server is running (otherwise TARGETS shows `<unknown>`), that the containers have CPU requests (utilisation is a percentage of requests), that load pushes utilisation over the target, and that REPLICAS increases and later decreases. `kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10` is an imperative alternative to the YAML."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Storage, HPA & Probes",
 "label": "Session 13"
};
