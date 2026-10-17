window.SESSION = {
 "num": 12,
 "slug": "session-12-ingress-configmaps-secrets",
 "mcqs": [
  {
   "n": 1,
   "q": "What does Ingress commonly define?",
   "options": [
    "HTTP/HTTPS routing rules to Services",
    "Git branch protections",
    "Node CPU architecture",
    "Container build steps"
   ],
   "answer": 0,
   "explanation": "Ingress defines HTTP/HTTPS routing rules to Services: host names and URL paths map to backend Services, optionally with TLS.",
   "distractors": "Branch protection, CPU architecture and build steps are not Kubernetes networking concerns."
  },
  {
   "n": 2,
   "q": "What is needed to implement Ingress rules?",
   "options": [
    "A Git tag",
    "A Terraform lock file",
    "A Docker registry only",
    "An Ingress controller"
   ],
   "answer": 3,
   "explanation": "An Ingress controller (e.g. Traefik, HAProxy, NGINX, or a cloud controller like AWS Load Balancer Controller) is needed: an Ingress object is only configuration, and nothing routes traffic until a controller watches it and programs a proxy.",
   "distractors": "Git tags, Terraform lock files and registries play no part in routing traffic."
  },
  {
   "n": 3,
   "q": "What is a ConfigMap intended to store?",
   "options": [
    "Persistent disk blocks",
    "Passwords by default",
    "Container images",
    "Non-sensitive configuration data"
   ],
   "answer": 3,
   "explanation": "A ConfigMap is for non-sensitive configuration data such as feature flags, URLs or config files, stored as plain key/value pairs.",
   "distractors": "Passwords belong in Secrets, disks in PersistentVolumes, and images in registries."
  },
  {
   "n": 4,
   "q": "What is a Secret intended to store?",
   "options": [
    "Sensitive configuration values",
    "Container images",
    "Cluster logs only",
    "Helm binaries"
   ],
   "answer": 0,
   "explanation": "A Secret stores sensitive configuration values (passwords, tokens, keys, TLS certificates). It is kept separate so RBAC, encryption at rest and external secret managers can protect it.",
   "distractors": "Images live in registries, logs go to a logging stack, and Helm binaries are not stored in the cluster."
  },
  {
   "n": 5,
   "q": "How can a ConfigMap be consumed by a Pod?",
   "options": [
    "Node kernel flags only",
    "Docker build cache only",
    "Git commit messages only",
    "Environment variables or mounted files"
   ],
   "answer": 3,
   "explanation": "A Pod can consume a ConfigMap as environment variables (`env.valueFrom.configMapKeyRef` or `envFrom.configMapRef`) or as mounted files via a `configMap` volume. Mounted files update when the ConfigMap changes; env vars only change when the Pod restarts.",
   "distractors": "Kernel flags, build cache and commit messages are not ways Pods read configuration."
  },
  {
   "n": 6,
   "q": "What does a path rule in Ingress match?",
   "options": [
    "Container filesystem path",
    "The HTTP request path",
    "Host disk mount path",
    "Git remote path"
   ],
   "answer": 1,
   "explanation": "An Ingress path rule matches the HTTP request path (e.g. `/api`), with `pathType` Prefix, Exact or ImplementationSpecific deciding how it matches.",
   "distractors": "It is unrelated to filesystem, mount or Git paths."
  },
  {
   "n": 7,
   "q": "What does TLS termination usually provide at Ingress?",
   "options": [
    "Automatic Pod autoscaling",
    "Persistent volumes",
    "Build artifact signing",
    "HTTPS encryption for client connections"
   ],
   "answer": 3,
   "explanation": "TLS termination at the Ingress provides HTTPS encryption for client connections: the controller presents the certificate from a TLS Secret, decrypts the traffic, and usually forwards plain HTTP to the Services.",
   "distractors": "Autoscaling, volumes and artifact signing are separate features."
  },
  {
   "n": 8,
   "q": "Which command lists ConfigMaps?",
   "options": [
    "kubectl get configmaps",
    "kubectl get secrets-only",
    "kubectl get networks",
    "kubectl get charts"
   ],
   "answer": 0,
   "explanation": "`kubectl get configmaps` (short `cm`) lists ConfigMaps in the namespace.",
   "distractors": "`secrets-only`, `networks` and `charts` are not Kubernetes resource types."
  },
  {
   "n": 9,
   "q": "Are Kubernetes Secret values encrypted merely because YAML uses base64?",
   "options": [
    "Yes, base64 is strong encryption",
    "No, base64 is encoding rather than encryption",
    "Yes, they are always hashed",
    "No, Secrets cannot contain strings"
   ],
   "answer": 1,
   "explanation": "No: base64 is encoding rather than encryption. Anyone who can read the Secret can decode it with `base64 -d`. Real protection comes from RBAC, encryption at rest for etcd (EncryptionConfiguration/KMS) and external secret managers.",
   "distractors": "Base64 is not encryption or hashing, and Secrets can hold any string or binary data."
  },
  {
   "n": 10,
   "q": "Which Kubernetes resource commonly holds a TLS certificate and key for Ingress?",
   "options": [
    "ConfigMap",
    "Deployment",
    "Secret",
    "ServiceAccount only"
   ],
   "answer": 2,
   "explanation": "A Secret of type `kubernetes.io/tls` (keys `tls.crt` and `tls.key`) holds the certificate and key, referenced from the Ingress `spec.tls[].secretName`.",
   "distractors": "ConfigMaps are for non-sensitive data, Deployments run Pods, and ServiceAccounts are identities."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Deploy an application and configure an Ingress rule that routes requests by host or URL path to the correct Service.",
   "checks": [
    {
     "label": "Defines an Ingress (kind: Ingress / kubectl create ingress)",
     "patterns": [
      "kind:\\s*ingress\\b",
      "kubectl\\s+create\\s+ingress\\b"
     ]
    },
    {
     "label": "Routes by host or path",
     "patterns": [
      "\\bhost:",
      "\\bpath:",
      "--rule\\b"
     ]
    },
    {
     "label": "Points rules at backend Services",
     "patterns": [
      "\\bbackend\\s*:",
      "--rule\\b"
     ]
    },
    {
     "label": "Uses an Ingress controller / class",
     "patterns": [
      "ingressclass",
      "ingress\\s+controller",
      "addons\\s+enable\\s+ingress",
      "traefik",
      "ingress-nginx"
     ]
    },
    {
     "label": "Tests the routing (curl / wget)",
     "patterns": [
      "\\bcurl\\b",
      "\\bwget\\b"
     ]
    }
   ],
   "modelAnswer": "# Prerequisite: an Ingress controller, e.g. `minikube addons enable ingress` or Traefik via Helm\nkubectl get ingressclass                     # note the class name (nginx / traefik ...)\n\nkubectl create deployment web --image=nginx:1.27\nkubectl expose deployment web --port=80\nkubectl create deployment api --image=hashicorp/http-echo:1.0 -- /http-echo -text=api -listen=:5678\nkubectl expose deployment api --port=80 --target-port=5678\n\n# ingress.yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: demo\nspec:\n  ingressClassName: nginx            # use your controller's class\n  rules:\n    - host: demo.local\n      http:\n        paths:\n          - path: /api\n            pathType: Prefix\n            backend:\n              service:\n                name: api\n                port:\n                  number: 80\n          - path: /\n            pathType: Prefix\n            backend:\n              service:\n                name: web\n                port:\n                  number: 80\n\nkubectl apply -f ingress.yaml\nkubectl get ingress demo                     # ADDRESS filled in by the controller\nkubectl describe ingress demo                # rules and backends with endpoints\ncurl -H \"Host: demo.local\" http://<ingress-ip>/api   # -> api\ncurl -H \"Host: demo.local\" http://<ingress-ip>/      # -> nginx welcome page",
   "explanation": "Tests that you can route HTTP traffic by host and path to different Services. Verify an Ingress controller is running and the Ingress uses its class, that each path points at an existing Service and port, and that curl with the right Host header reaches the expected backend. The upstream ingress-nginx project was retired in 2026, so new clusters often use another controller or the Gateway API, but the Ingress resource itself is unchanged."
  },
  {
   "n": 2,
   "task": "Create a ConfigMap and inject its values into a Deployment as environment variables. Verify the values inside a running Pod.",
   "checks": [
    {
     "label": "Creates a ConfigMap",
     "patterns": [
      "kind:\\s*configmap\\b",
      "create\\s+configmap\\b"
     ]
    },
    {
     "label": "Injects it as env vars (configMapRef / configMapKeyRef)",
     "patterns": [
      "configmapref\\b",
      "configmapkeyref\\b"
     ]
    },
    {
     "label": "Defines the Deployment",
     "patterns": [
      "kind:\\s*deployment\\b",
      "create\\s+deployment\\b"
     ]
    },
    {
     "label": "Checks values inside a Pod (kubectl exec ... printenv/env)",
     "patterns": [
      "kubectl\\s+exec\\b[^\\n]*\\b(printenv|env|echo)\\b"
     ]
    }
   ],
   "modelAnswer": "kubectl create configmap app-config \\\n  --from-literal=APP_MODE=production \\\n  --from-literal=LOG_LEVEL=info\nkubectl get configmap app-config -o yaml\n\n# deploy.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: app\n  template:\n    metadata:\n      labels:\n        app: app\n    spec:\n      containers:\n        - name: app\n          image: busybox:1.36\n          command: [\"sh\", \"-c\", \"sleep 3600\"]\n          envFrom:\n            - configMapRef:\n                name: app-config          # all keys become env vars\n          env:\n            - name: MODE                  # or pick a single key\n              valueFrom:\n                configMapKeyRef:\n                  name: app-config\n                  key: APP_MODE\n\nkubectl apply -f deploy.yaml\nkubectl rollout status deployment/app\nkubectl exec deploy/app -- printenv APP_MODE LOG_LEVEL MODE\n# production\n# info\n# production",
   "explanation": "Tests decoupling configuration from the image with a ConfigMap. Verify the ConfigMap keys show up as environment variables inside the running container. Remember env vars are read at container start: after changing the ConfigMap you must restart the Pods (`kubectl rollout restart deployment/app`) to see new values."
  },
  {
   "n": 3,
   "task": "Create a Kubernetes Secret for a sample credential and consume it from a Pod without hard-coding the credential in the Deployment manifest.",
   "checks": [
    {
     "label": "Creates a Secret (kubectl create secret / kind: Secret)",
     "patterns": [
      "create\\s+secret\\b",
      "kind:\\s*secret\\b"
     ]
    },
    {
     "label": "References it from the workload (secretKeyRef / secretRef / secret volume)",
     "patterns": [
      "secretkeyref\\b",
      "secretref\\b",
      "secretname\\s*:"
     ]
    },
    {
     "label": "Defines the Pod or Deployment",
     "patterns": [
      "kind:\\s*(pod|deployment)\\b",
      "kubectl\\s+run\\b"
     ]
    },
    {
     "label": "Verifies the Pod received it (kubectl exec / logs)",
     "patterns": [
      "kubectl\\s+exec\\b",
      "kubectl\\s+logs\\b"
     ]
    }
   ],
   "modelAnswer": "# Credential comes from a local file, not the manifest (and not shell history)\nprintf 'app_user' > ./username.txt\nprintf '<generate-a-random-password>' > ./password.txt\nkubectl create secret generic db-cred \\\n  --from-file=username=./username.txt \\\n  --from-file=password=./password.txt\nrm ./username.txt ./password.txt\nkubectl get secret db-cred            # TYPE Opaque, DATA 2 (values not shown)\n\n# pod.yaml - contains only a reference to the Secret\napiVersion: v1\nkind: Pod\nmetadata:\n  name: app\nspec:\n  containers:\n    - name: app\n      image: busybox:1.36\n      command: [\"sh\", \"-c\", \"sleep 3600\"]\n      env:\n        - name: DB_USER\n          valueFrom:\n            secretKeyRef:\n              name: db-cred\n              key: username\n      volumeMounts:\n        - name: creds\n          mountPath: /etc/creds\n          readOnly: true\n  volumes:\n    - name: creds\n      secret:\n        secretName: db-cred\n\nkubectl apply -f pod.yaml\nkubectl exec app -- printenv DB_USER          # app_user\nkubectl exec app -- ls /etc/creds             # password  username",
   "explanation": "Tests consuming a credential through a Secret reference so the value never appears in the Deployment/Pod manifest. Check that the manifest only names the Secret and key, that the value is created from a file, env file or external secret manager, and that the Pod can see it as an env var or mounted file. Avoid printing the real password as evidence, and remember base64 in a Secret YAML is not encryption."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Ingress, ConfigMaps & Secrets",
 "label": "Session 12"
};
