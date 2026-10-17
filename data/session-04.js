window.SESSION = {
 "num": 4,
 "slug": "session4-networking",
 "mcqs": [
  {
   "n": 1,
   "q": "What does DNS primarily do?",
   "options": [
    "Resolve names to IP addresses",
    "Build application binaries",
    "Schedule containers",
    "Encrypt disk volumes"
   ],
   "answer": 0,
   "explanation": "DNS (Domain Name System) primarily resolves names to IP addresses, e.g. example.com to an A (IPv4) or AAAA (IPv6) record.",
   "distractors": "Building binaries, scheduling containers and encrypting disks are unrelated to name resolution."
  },
  {
   "n": 2,
   "q": "What does an IP address identify?",
   "options": [
    "A Docker image tag",
    "A CPU instruction",
    "A network interface on an IP network",
    "A Git repository"
   ],
   "answer": 2,
   "explanation": "An IP address identifies a network interface on an IP network; a host with several NICs (or IPv4 and IPv6) has several addresses.",
   "distractors": "Image tags, CPU instructions and Git repositories have their own identifiers that have nothing to do with IP."
  },
  {
   "n": 3,
   "q": "Which protocol provides reliable ordered delivery?",
   "options": [
    "ICMP",
    "ARP",
    "TCP",
    "UDP"
   ],
   "answer": 2,
   "explanation": "TCP provides reliable, ordered delivery using a handshake, sequence numbers, acknowledgements and retransmission.",
   "distractors": "UDP is connectionless with no delivery or ordering guarantee, ICMP carries control messages like ping, and ARP maps IPs to MAC addresses."
  },
  {
   "n": 4,
   "q": "Which command can test basic ICMP reachability?",
   "options": [
    "ping",
    "git status",
    "chmod",
    "docker build"
   ],
   "answer": 0,
   "explanation": "`ping` sends ICMP echo requests and reports replies and round-trip time, testing basic reachability.",
   "distractors": "`git status`, `chmod` and `docker build` do not touch the network in this way. Note some hosts block ICMP, so no reply does not always mean down."
  },
  {
   "n": 5,
   "q": "What does HTTP status 404 mean?",
   "options": [
    "Authentication succeeded",
    "Resource not found",
    "Successful request",
    "Server started"
   ],
   "answer": 1,
   "explanation": "HTTP 404 means resource not found: the server is reachable and answered, but there is nothing at that path.",
   "distractors": "Success is 200, authentication problems are 401/403, and no HTTP status means 'server started'."
  },
  {
   "n": 6,
   "q": "What is the usual default port for HTTPS?",
   "options": [
    "22",
    "53",
    "443",
    "80"
   ],
   "answer": 2,
   "explanation": "HTTPS defaults to port 443 (HTTP over TLS).",
   "distractors": "22 is SSH, 53 is DNS and 80 is plain HTTP."
  },
  {
   "n": 7,
   "q": "Which tool can make HTTP requests from a terminal?",
   "options": [
    "tar",
    "mkdir",
    "grep",
    "curl"
   ],
   "answer": 3,
   "explanation": "`curl` makes HTTP (and many other protocol) requests from the terminal, e.g. `curl -I https://example.com`.",
   "distractors": "`tar` archives files, `mkdir` creates directories and `grep` searches text."
  },
  {
   "n": 8,
   "q": "What does a subnet mask/prefix indicate?",
   "options": [
    "A Docker volume size",
    "A password length",
    "The network portion of an IP address",
    "A DNS TTL only"
   ],
   "answer": 2,
   "explanation": "A subnet mask or prefix (e.g. /24 = 255.255.255.0) indicates the network portion of an IP address; the remaining bits identify hosts.",
   "distractors": "It has nothing to do with volumes, passwords or DNS TTLs."
  },
  {
   "n": 9,
   "q": "What is the role of a default gateway?",
   "options": [
    "Forward traffic to other networks",
    "Compile Java programs",
    "Start systemd services",
    "Resolve Git merge conflicts"
   ],
   "answer": 0,
   "explanation": "The default gateway forwards traffic to other networks: any destination not on a local subnet is sent to it (the default route).",
   "distractors": "Compiling, starting services and resolving merge conflicts are not routing functions."
  },
  {
   "n": 10,
   "q": "Which protocol is commonly used for secure remote shell access?",
   "options": [
    "DHCP",
    "FTP",
    "SSH",
    "SMTP"
   ],
   "answer": 2,
   "explanation": "SSH (Secure Shell, TCP port 22) gives encrypted remote shell access.",
   "distractors": "DHCP assigns addresses, FTP transfers files (unencrypted by default) and SMTP sends mail."
  }
 ],
 "labs": [
  {
   "n": 1,
   "task": "Use Linux commands to display the machine IP address, subnet information, default route, and listening ports. Include the command and a brief interpretation for each.",
   "checks": [
    {
     "label": "Shows IP address (ip addr / ifconfig)",
     "patterns": [
      "\\bip\\s+(-\\w+\\s+)*a(ddr(ess)?)?\\b",
      "\\bifconfig\\b",
      "\\bhostname\\s+-I\\b"
     ]
    },
    {
     "label": "Shows subnet / prefix",
     "patterns": [
      "\\bsubnet\\b",
      "/\\d{1,2}\\b",
      "\\bnetmask\\b",
      "\\bprefix\\b"
     ]
    },
    {
     "label": "Shows default route (ip route)",
     "patterns": [
      "\\bip\\s+(-\\w+\\s+)*r(oute)?\\b",
      "\\broute\\s+-n\\b",
      "\\bnetstat\\s+-r",
      "\\bdefault\\s+via\\b"
     ]
    },
    {
     "label": "Shows listening ports (ss / netstat)",
     "patterns": [
      "\\bss\\s+-\\w*l",
      "\\bnetstat\\s+-\\w*l",
      "\\blsof\\s+-i"
     ]
    },
    {
     "label": "Interprets the output",
     "patterns": [
      "\\bmeans\\b",
      "\\binterpret",
      "\\bshows\\b"
     ]
    }
   ],
   "modelAnswer": "# 1. IP address and subnet\nip -br addr        # or: ip addr show\n# eth0  UP  192.168.1.25/24\n# Interpretation: interface eth0 has IP 192.168.1.25; /24 is the prefix, i.e. subnet mask 255.255.255.0, so the local network is 192.168.1.0/24 (hosts .1-.254).\n\n# 2. Default route\nip route\n# default via 192.168.1.1 dev eth0\n# 192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.25\n# Interpretation: traffic to other networks goes to gateway 192.168.1.1 via eth0; the second line means the local subnet is reached directly.\n\n# 3. Listening ports\nsudo ss -tulnp\n# tcp LISTEN 0 128 0.0.0.0:22   users:((\"sshd\",...))\n# tcp LISTEN 0 511 127.0.0.1:80 users:((\"nginx\",...))\n# Interpretation: sshd accepts connections on port 22 from any address; nginx listens on port 80 but only on localhost, so it is not reachable from other machines.",
   "explanation": "Tests reading a Linux host's network configuration with the modern iproute2 tools (`ip addr`, `ip route`, `ss`). The interpretation matters as much as the command: identify the interface IP, convert the prefix to a subnet, name the gateway from the `default via` line, and note which address each listening socket is bound to (0.0.0.0 vs 127.0.0.1)."
  },
  {
   "n": 2,
   "task": "Use ping, ss, and curl to troubleshoot a web service. Determine whether a simulated failure is caused by reachability, a closed port, or an HTTP response.",
   "checks": [
    {
     "label": "Tests reachability (ping)",
     "patterns": [
      "\\bping\\b"
     ]
    },
    {
     "label": "Checks listening ports (ss)",
     "patterns": [
      "\\bss\\b",
      "\\bnetstat\\b"
     ]
    },
    {
     "label": "Tests HTTP (curl)",
     "patterns": [
      "\\bcurl\\b"
     ]
    },
    {
     "label": "Diagnoses reachability failure",
     "patterns": [
      "\\breachab",
      "\\bunreachable\\b",
      "\\bno route\\b",
      "packet loss"
     ]
    },
    {
     "label": "Diagnoses closed port",
     "patterns": [
      "connection refused",
      "\\bclosed port\\b",
      "port\\s+(is\\s+)?closed",
      "not listening"
     ]
    },
    {
     "label": "Diagnoses HTTP error status",
     "patterns": [
      "\\b[45]\\d\\d\\b"
     ]
    }
   ],
   "modelAnswer": "Target: web service on 10.0.0.5:80\n\n# Step 1 - reachability\nping -c 4 10.0.0.5\n# 100% packet loss / 'Destination Host Unreachable' => reachability problem (host down, routing, firewall dropping ICMP). Check ip route and security groups.\n\n# Step 2 - is the port open? (on the server)\nsudo ss -tlnp | grep ':80'\n# no output => nothing listening: closed port (service stopped or bound to another port)\n# from the client:\ncurl -v http://10.0.0.5/\n# 'Connection refused' => host reachable but port closed => systemctl status nginx, start it\n# 'Connection timed out' => a firewall is likely dropping packets to the port\n\n# Step 3 - HTTP response\ncurl -i http://10.0.0.5/health\n# HTTP/1.1 200 OK => healthy\n# HTTP/1.1 404 Not Found => wrong path; 502/503 => proxy up but backend app failing; check app logs\ncurl -s -o /dev/null -w '%{http_code}\\n' http://10.0.0.5/\n\nConclusion: ping fails => reachability; ping OK but 'connection refused' and ss shows no listener => closed port; TCP connects but status is 4xx/5xx => HTTP/application issue.",
   "explanation": "Tests layered troubleshooting: network layer (ping), transport layer (is a socket listening, does TCP connect) and application layer (HTTP status). Look for the decision logic: which symptom from each tool points to which cause. Remember ICMP may be blocked, so a failed ping with a working curl is not a contradiction."
  },
  {
   "n": 3,
   "task": "Resolve a domain using nslookup or dig, then use curl to verify HTTP/HTTPS connectivity. Record the DNS result and HTTP status.",
   "checks": [
    {
     "label": "Resolves the domain (nslookup / dig)",
     "patterns": [
      "\\bnslookup\\b",
      "\\bdig\\b"
     ]
    },
    {
     "label": "Records the DNS result (IP / A record)",
     "patterns": [
      "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b",
      "\\bA\\s+record\\b",
      "\\bIN\\s+A\\b"
     ]
    },
    {
     "label": "Tests HTTP with curl",
     "patterns": [
      "\\bcurl\\b[^\\n]*http://"
     ]
    },
    {
     "label": "Tests HTTPS with curl",
     "patterns": [
      "\\bcurl\\b[^\\n]*https://"
     ]
    },
    {
     "label": "Records the HTTP status code",
     "patterns": [
      "\\bhttp_code\\b",
      "HTTP/[\\d.]+\\s+\\d{3}",
      "\\bstatus\\b[^\\n]*\\d{3}"
     ]
    }
   ],
   "modelAnswer": "# DNS\ndig example.com +short\n# 93.184.215.14   (example output; your result may differ)\nnslookup example.com\n# Name: example.com  Address: 93.184.215.14\n# DNS result: example.com has an A record pointing to 93.184.215.14\n\n# HTTP\ncurl -sI http://example.com\n# HTTP/1.1 200 OK\ncurl -s -o /dev/null -w '%{http_code}\\n' http://example.com\n\n# HTTPS\ncurl -sI https://example.com\n# HTTP/2 200\ncurl -s -o /dev/null -w 'status %{http_code}\\n' https://example.com\n# status 200\n\n# Record: DNS -> 93.184.215.14; HTTP status 200; HTTPS status 200 (TLS handshake OK). A 301 on HTTP would mean a redirect to HTTPS; follow it with curl -L.",
   "explanation": "Tests the end-to-end path of a web request: name resolution, then HTTP and HTTPS over TCP. Check that the answer records the actual IP returned and the status code for both schemes, and explains anything unusual (e.g. 301/308 redirects from HTTP to HTTPS, or TLS certificate errors). `dig +short` and `curl -w '%{http_code}'` give clean, scriptable output."
  }
 ],
 "labFormat": "Complete the task in the relevant lab environment, submit commands/configuration files, and include brief evidence of verification. Do not hard-code credentials.",
 "title": "Networking Fundamentals",
 "label": "Session 4"
};
