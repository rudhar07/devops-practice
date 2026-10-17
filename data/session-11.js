window.SESSION = {
 "num": 11,
 "slug": "session-11-kubernetes-services",
 "mcqs": [
  {
   "n": 1,
   "q": "Why are Kubernetes Services used?",
   "options": [
    "Provide stable access to a set of Pods",
    "Compile application code",
    "Build container images",
    "Store Git history"
   ],
   "answer": 0,
   "explanation": "Services provide stable access to a set of Pods: Pods come and go with changing IPs, while a Service gives a fixed virtual IP and DNS name and load-balances across whichever matching Pods are ready.",
   "distractors": "Compiling code, building images and storing Git history happen outside Kubernetes."
  },
  {
   "n": 2,
   "q": "Which Service type is typically reachable only within the cluster?",
   "options": [
    "ClusterIP",
    "NodePort",
    "LoadBalancer",
    "ExternalName only"
   ],
   "answer": 0,
   "explanation": "ClusterIP is the default type and is reachable only within the cluster through its virtual IP and DNS name.",
   "distractors": "NodePort and LoadBalancer add external access; ExternalName just returns a DNS CNAME to an outside name and has no cluster IP."
  },
  {
   "n": 3,
   "q": "Which Service type exposes a port on each node?",
   "options": [
    "NodePort",
    "ExternalName",
    "Headless only",
    "ClusterIP"
   ],
   "answer": 0,
   "explanation": "NodePort exposes the Service on the same port (default range 30000-32767) on every node, so `<node-IP>:<nodePort>` reaches it from outside.",
   "distractors": "ExternalName is a DNS alias, a headless Service has no virtual IP, and ClusterIP is internal only. (LoadBalancer Services usually allocate a NodePort too, but NodePort is the type defined by that behaviour.)"
  },
  {
   "n": 4,
   "q": "Which Service type commonly provisions an external load balancer on supported clouds?",
   "options": [
    "LoadBalancer",
    "ClusterIP",
    "ExternalName",
    "Headless"
   ],
   "answer": 0,
   "explanation": "LoadBalancer asks the cloud provider's controller to provision an external load balancer (e.g. an AWS NLB) that forwards to the Service; on bare metal you need something like MetalLB.",
   "distractors": "ClusterIP is internal, ExternalName is just a DNS alias, and headless Services skip load balancing entirely."
  },
  {
   "n": 5,
   "q": "How does a Service identify backend Pods?",
   "options": [
    "Label selector",
    "Node hostname only",
    "Git branch name",
    "Docker image digest"
   ],
   "answer": 0,
   "explanation": "A Service finds its backend Pods with a label selector: Pods whose labels match `spec.selector` and are ready become its endpoints (tracked in EndpointSlices).",
   "distractors": "Node hostnames, Git branches and image digests play no part in Service routing."
  },
  {
   "n": 6,
   "q": "What does a Service port targetPort refer to?",
   "options": [
    "SSH port of the node",
    "Port on a Git remote",
    "Port on backend Pods",
    "Port of the API server"
   ],
   "answer": 2,
   "explanation": "`targetPort` is the port on backend Pods (the container port) that traffic is forwarded to; `port` is the port the Service itself listens on. They may differ, e.g. port 80 -> targetPort 8080, and targetPort can be a named container port.",
   "distractors": "Node SSH ports, Git remotes and the API server port are unrelated."
  },
  {
   "n": 7,
   "q": "What is the role of kube-proxy in many clusters?",
   "options": [
    "Build Dockerfiles",
    "Schedule Pods",
    "Store secrets in etcd",
    "Implement Service traffic routing rules"
   ],
   "answer": 3,
   "explanation": "kube-proxy implements Service traffic routing rules on each node, programming iptables, IPVS or nftables so traffic to a Service IP is load-balanced to endpoint Pods. (Some CNIs such as Cilium can replace it with eBPF.)",
   "distractors": "Scheduling is the scheduler's job, secrets are stored by the API server in etcd, and kube-proxy builds nothing."
  },
  {
   "n": 8,
   "q": "Which DNS name form can identify a Service across namespaces?",
   "options": [
    "pod.image.registry.local",
    "service.cluster.node.local",
    "service.namespace.svc.cluster.local",
    "namespace.service.github.io"
   ],
   "answer": 2,
   "explanation": "`<service>.<namespace>.svc.cluster.local` is the fully qualified Service DNS name, so `db.prod.svc.cluster.local` reaches Service `db` in namespace `prod` from anywhere in the cluster (assuming the default `cluster.local` domain).",
   "distractors": "The other forms are made up and do not match CoreDNS's Kubernetes naming scheme."
  },
  {
   "n": 9,
   "q": "What does a headless Service commonly set?",
   "options": [
    "replicas: 0",
    "type: NodePort",
    "hostNetwork: true",
    "clusterIP: None"
   ],
   "answer": 3,
   "explanation": "A headless Service sets `clusterIP: None`: no virtual IP is allocated and DNS returns the individual Pod IPs, which StatefulSets use for stable per-Pod names.",
   "distractors": "replicas belongs to workloads, NodePort is a different Service type, and hostNetwork is a Pod setting."
  },
  {
   "n": 10,
   "q": "Which command lists Services?",
   "options": [
    "kubectl build svc",
    "kubectl init service",
    "kubectl get svc",
    "kubectl get images"
   ],
   "answer": 2,
   "explanation": "`kubectl get svc` (short for services) lists Services with their type, cluster IP, external IP and ports.",
   "distractors": "build/init are not kubectl verbs and `images` is not a Kubernetes resource."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Deploy an application with multiple replicas and create a ClusterIP Service that selects the correct Pods. Verify its endpoints.",
   "checks": [
    {
     "label": "Runs multiple replicas",
     "patterns": [
      "--replicas[\\s=]+([2-9]|\\d{2,})\\b",
      "replicas:\\s*([2-9]|\\d{2,})\\b"
     ]
    },
    {
     "label": "Creates a Service (kind: Service / kubectl expose)",
     "patterns": [
      "kind:\\s*service\\b",
      "kubectl\\s+expose\\b",
      "kubectl\\s+create\\s+service\\b"
     ]
    },
    {
     "label": "Uses type ClusterIP (explicit or the default)",
     "patterns": [
      "clusterip",
      "kubectl\\s+expose\\b"
     ]
    },
    {
     "label": "Selects Pods by label (selector)",
     "patterns": [
      "selector\\s*:",
      "--selector\\b",
      "kubectl\\s+expose\\s+deploy"
     ]
    },
    {
     "label": "Verifies endpoints (endpoints / endpointslices)",
     "patterns": [
      "\\bendpoints?\\b",
      "endpointslices?\\b",
      "get\\s+ep\\b"
     ]
    }
   ],
   "modelAnswer": "# deploy.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n        - name: nginx\n          image: nginx:1.27\n          ports:\n            - containerPort: 80\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  type: ClusterIP\n  selector:\n    app: web\n  ports:\n    - port: 80\n      targetPort: 80\n\n# Commands\nkubectl apply -f deploy.yaml\nkubectl get pods -l app=web -o wide          # note the 3 Pod IPs\nkubectl get svc web                          # TYPE ClusterIP, CLUSTER-IP assigned\nkubectl get endpointslices -l kubernetes.io/service-name=web   # the same 3 Pod IPs on port 80\nkubectl describe svc web                     # Selector app=web, Endpoints list\nkubectl run tmp --rm -it --image=busybox:1.36 --restart=Never -- wget -qO- http://web",
   "explanation": "Tests that the Service selector matches the Pod template labels so the Service gets endpoints. Verify the EndpointSlice (or `kubectl describe svc`) lists one address per ready Pod, matching `kubectl get pods -o wide`, and that a request from inside the cluster to the Service name succeeds. `kubectl get endpoints` still works but is deprecated in favour of EndpointSlices since Kubernetes 1.33."
  },
  {
   "n": 2,
   "task": "Create a NodePort Service and demonstrate access to the application through the exposed node port.",
   "checks": [
    {
     "label": "Creates a NodePort Service",
     "patterns": [
      "nodeport"
     ]
    },
    {
     "label": "Checks the assigned port (kubectl get svc)",
     "patterns": [
      "kubectl\\s+get\\s+(svc|services?)\\b",
      "kubectl\\s+describe\\s+(svc|services?)\\b"
     ]
    },
    {
     "label": "Finds a node IP",
     "patterns": [
      "get\\s+nodes?\\s+-o\\s*wide\\b",
      "internalip",
      "minikube\\s+(ip|service)\\b",
      "<node-ip>"
     ]
    },
    {
     "label": "Accesses the app via the node port (curl / browser)",
     "patterns": [
      "\\bcurl\\b",
      "\\bwget\\b",
      "\\bbrowser\\b"
     ]
    }
   ],
   "modelAnswer": "kubectl create deployment web --image=nginx:1.27 --replicas=2\n\n# web-nodeport.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-nodeport\nspec:\n  type: NodePort\n  selector:\n    app: web\n  ports:\n    - port: 80\n      targetPort: 80\n      nodePort: 30080      # optional; must be in 30000-32767\n\nkubectl apply -f web-nodeport.yaml\nkubectl get svc web-nodeport               # PORT(S) 80:30080/TCP\nkubectl get nodes -o wide                  # INTERNAL-IP of any node\ncurl http://<node-ip>:30080                # nginx welcome page\n# minikube: minikube service web-nodeport --url   (or curl http://$(minikube ip):30080)\n# kind: the node is a Docker container, so map the port with extraPortMappings\n#       or use: kubectl port-forward svc/web-nodeport 8080:80",
   "explanation": "Tests exposing a workload outside the cluster with NodePort. Check that the Service shows `80:3xxxx/TCP`, that the request goes to a node IP (not the ClusterIP or Pod IP) on the node port, and that it returns the app. On local clusters (minikube, kind, Docker Desktop) the node IP may not be reachable from the host, so the helper command or port mapping used should be explained."
  },
  {
   "n": 3,
   "task": "Configure a Service whose port and targetPort differ. Verify that traffic reaches the intended container port.",
   "checks": [
    {
     "label": "Sets the Service port",
     "patterns": [
      "\\bport:\\s*\\d+",
      "--port[\\s=]+\\d+"
     ]
    },
    {
     "label": "Sets a different targetPort",
     "patterns": [
      "targetport"
     ]
    },
    {
     "label": "Sends traffic to the Service port (curl / wget / port-forward)",
     "patterns": [
      "\\bcurl\\b",
      "\\bwget\\b",
      "port-forward\\b"
     ]
    },
    {
     "label": "Confirms the backend port (endpoints / describe)",
     "patterns": [
      "\\bendpoints?\\b",
      "endpointslices?\\b",
      "describe\\s+(svc|service)\\b"
     ]
    }
   ],
   "modelAnswer": "kubectl create deployment web --image=nginx:1.27 --replicas=2   # nginx listens on 80\n\n# web-svc.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-svc\nspec:\n  selector:\n    app: web\n  ports:\n    - name: http\n      port: 8080        # what clients connect to\n      targetPort: 80    # the container port that receives traffic\n\nkubectl apply -f web-svc.yaml\nkubectl describe svc web-svc        # Port: http 8080/TCP, TargetPort: 80/TCP, Endpoints: <pod-ip>:80,...\nkubectl get endpointslices -l kubernetes.io/service-name=web-svc   # PORTS 80\nkubectl run tmp --rm -it --image=busybox:1.36 --restart=Never -- wget -qO- http://web-svc:8080   # works\nkubectl run tmp2 --rm -it --image=busybox:1.36 --restart=Never -- wget -qO- -T 3 http://web-svc:80 # times out: Service is not listening on 80",
   "explanation": "Tests the difference between `port` (what the Service listens on) and `targetPort` (the container port). Verify that clients use the Service port (8080) and that endpoints show the Pod IPs on the target port (80). A wrong targetPort is a classic cause of connection refused even though the Service has endpoints."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Kubernetes Networking & Services",
 "label": "Session 11"
};
