import { CurriculumData } from '@/types';

export const DEVOPS_CURRICULUM: Record<string, CurriculumData> = {
    "devops-1": {
        fileName: "devops-1",
        description: "The Factory Floor (Linux & Containers)",
        category: "DevOps",
        subDescription: "Setup your workstation. Learn to navigate the Factory Floor (Linux), build Shipping Containers (Docker), and keep your tools organized.",
        phases: [
            {
                phase: 1,
                title: "Opening the Workshop: Linux & CLI",
                theory: [
                    "Linux vs Windows: The Factory vs the Office",
                    "The Terminal: Talking directly to the machines",
                    "File Systems & Permissions: Locking the staff cabinets",
                    "Shell Scripting: Writing 'Auto-Run' manuals for the factory"
                ],
                practicals: [
                    "Navigate the factory floor using `cd`, `ls`, and `mkdir`",
                    "Write a script that creates a 'Daily Report' file automatically"
                ]
            },
            {
                phase: 2,
                title: "The Standard Box: Docker Fundamentals",
                theory: [
                    "What are Containers? The 'Shipping Container' for your code",
                    "Docker vs VMs: Lightweight crates vs whole buildings",
                    "Images: The blueprint for your shipping container",
                    "Dockerfiles: The step-by-step assembly guide"
                ],
                practicals: [
                    "Build an 'Assembly Guide' (Dockerfile) for a Node.js product",
                    "Run your first 'Shipping Container' (Docker Container) on your floor"
                ]
            },
            {
                phase: 3,
                title: "Multi-Crate Assembly: Docker Compose",
                theory: [
                    "Docker Compose: Coordinating multiple machines at once",
                    "Volumes: The factory's permanent storage shelves",
                    "Networks: The internal phone lines between containers",
                    "Environment Variables: Keeping the factory safe codes secret"
                ],
                practicals: [
                    "Use Docker Compose to link a 'Main Machine' (App) and a 'Record Room' (DB)",
                    "Persist data using 'Storage Shelves' (Volumes)"
                ]
            }
        ]
    },
    "devops-2": {
        fileName: "devops-2",
        description: "The Automated Conveyor (CI/CD & Cloud)",
        category: "DevOps",
        subDescription: "Automate the shipping process. Master the Automated Conveyor Belt (CI/CD) and rent space in the Global Warehouse (AWS).",
        phases: [
            {
                phase: 1,
                title: "The Conveyor Belt: CI/CD Basics",
                theory: [
                    "CI/CD Explained: The automated assembly line",
                    "GitHub Actions: Your digital factory workers",
                    "Workflows & Jobs: Scheduling the factory shifts",
                    "Build, Test, Deploy: The three stages of automation"
                ],
                practicals: [
                    "Create a 'QC Check' (CI) that runs every time you change a script",
                    "Automate the 'Packaging' stage of your product"
                ]
            },
            {
                phase: 2,
                title: "The Global Warehouse: AWS Fundamentals",
                theory: [
                    "AWS EC2: Renting a computer in the giant warehouse",
                    "AWS S3: The infinite filing cabinet for files",
                    "RDS: Managed Record Rooms in the cloud",
                    "Security Groups: The high-security fences around your warehouse space"
                ],
                practicals: [
                    "Setup a 'Mini Factory' (EC2 Instance) in the AWS Warehouse",
                    "Store your 'Project Photos' in a secure S3 cabinet"
                ]
            },
            {
                phase: 3,
                title: "The Direct Line: Serverless & Vercel",
                theory: [
                    "Serverless (Lambda): Paying workers only when they are working",
                    "Vercel/Netlify: The specialized 'Express Delivery' services",
                    "API Gateway: The receptionist for your cloud factory",
                    "Deployment Strategies: Shipping the new product without a 'Store Closing' sign"
                ],
                practicals: [
                    "Deploy a 'One-Task Specialist' (Lambda Function)",
                    "Ship a frontend project instantly using Vercel"
                ]
            }
        ]
    },
    "devops-3": {
        fileName: "devops-3",
        description: "The Mega-Franchise (Orchestration & Safety)",
        category: "DevOps",
        subDescription: "Scale to thousands of locations. Master the Fleet Manager (Kubernetes), Infrastructure Blueprints (Terraform), and Safety Gauges (Monitoring).",
        phases: [
            {
                phase: 1,
                title: "The Fleet Manager: Kubernetes",
                theory: [
                    "What is K8s? The city-wide manager for thousands of shipping containers",
                    "Pods & Deployments: Organizing teams of containers",
                    "Services: The global GPS for finding your containers",
                    "Auto-scaling: Hiring more workers automatically when it gets busy"
                ],
                practicals: [
                    "Deploy a 'Small Fleet' of 3 identical containers",
                    "Simulate a 'Worker Quitting' and watch K8s hire a replacement instantly"
                ]
            },
            {
                phase: 2,
                title: "Blueprints for Buildings: Infrastructure as Code",
                theory: [
                    "Terraform: Writing the blueprints for your entire factory complex",
                    "Providers & Resources: Defining the warehouse, the walls, and the gates",
                    "State Management: Keeping track of what you actually built",
                    "Nginx: The high-speed traffic director at the factory gates"
                ],
                practicals: [
                    "Use a blueprint (Terraform) to build a 'Cloud Workshop'",
                    "Configure Nginx to direct 'Visitors' to the right department"
                ]
            },
            {
                phase: 3,
                title: "The Control Room: Monitoring & Logging",
                theory: [
                    "Monitoring (Prometheus): The live gauges on the factory machines",
                    "Logging (ELK): The black-box recorder for when things crash",
                    "Dashboards (Grafana): The giant screens in the control room",
                    "Alerts: The sirens that go off before the factory explodes"
                ],
                practicals: [
                    "Setup a 'Safety Gauge' dashboard for your server",
                    "Simulate an error and find it in the 'Black Box' logs"
                ]
            }
        ]
    },
    "devops-questions": {
        fileName: "devops-questions",
        description: "The Foreman's Certification (Interview Prep)",
        category: "DevOps",
        subDescription: "50+ common questions. Master the 'Factory Manager' vocabulary to prove you can run global infrastructures.",
        phases: [
            {
                phase: 1,
                title: "General Foreman",
                theory: [
                    "Container vs VM (Crate vs Building)",
                    "CI vs CD (Testing vs Shipping)",
                    "Docker Layers (Stacking boxes)",
                    "Why automate? (The 'Human Error' argument)"
                ],
                practicals: [
                    "Explain 'Kubernetes' using a 'Fleet Manager' analogy",
                    "Differentiate 'Stateless' vs 'Stateful' using a factory line metaphor"
                ]
            },
            {
                phase: 2,
                title: "Chief Operations Officer",
                theory: [
                    "Blue-Green Deployment (The 'Switching Tracks' strategy)",
                    "IaC Benefits (Reproducible Factories)",
                    "Micro-services Networking (Inter-departmental phones)",
                    "Handling 'Traffic Spikes' at the gate"
                ],
                practicals: [
                    "Design a recovery plan for a 'Factory Power Outage' (Data loss)",
                    "Optimize a 'Conveyor Belt' that is moving too slow (Slow Builds)"
                ]
            }
        ]
    }
};

export const TESTING_CURRICULUM: Record<string, CurriculumData> = {
    "testing-1": {
        fileName: "testing-1",
        description: "The Inspector's Foundations (Unit Testing)",
        category: "Testing",
        subDescription: "Welcome to the Stress-Test Lab. Learn to inspect individual bolts (Unit Testing), use your Digital Magnifying Glass (Jest), and catch bugs before they spread.",
        phases: [
            {
                phase: 1,
                title: "Safety First: Testing Fundamentals",
                theory: [
                    "Why Testing Matters: Preventing the 'Broken Bolt' catastrophe",
                    "The Test Pyramid: From small bolt tests to full test drives",
                    "Unit vs Integration vs E2E: Different levels of inspection",
                    "TDD (Test-Driven Development): Writing the safety manual before building"
                ],
                practicals: [
                    "Draft a 'Safety Manual' (Test Case) for a simple Add function",
                    "Write your first 'Stress Test' using basic assertions"
                ]
            },
            {
                phase: 2,
                title: "The Digital Magnifying Glass: Jest",
                theory: [
                    "Jest Setup: Calibrating your inspection tools",
                    "Test Syntax: Describe, It, and Expect (The Inspector's language)",
                    "Matchers: Different ways to verify if a bolt is tight enough",
                    "Setup & Teardown: Cleaning the lab before and after each test"
                ],
                practicals: [
                    "Build a suite of tests for a 'Calculator' component",
                    "Use setup/teardown to reset test data for every 'Inspection'"
                ]
            },
            {
                phase: 3,
                title: "Stunt Doubles: Mocking & Spies",
                theory: [
                    "What is Mocking? Using 'Dummies' to test dangerous parts",
                    "Mocks vs Stubs vs Spies: Different types of lab assistants",
                    "jest.fn(): Creating a specialized 'Robot Assistant'",
                    "Dependency Isolation: Testing the bolt without the whole machine"
                ],
                practicals: [
                    "Mock a 'Database Specialist' to test a login function safely",
                    "Use a 'Spy' to see if a specific function was called during a test"
                ]
            }
        ]
    },
    "testing-2": {
        fileName: "testing-2",
        description: "The Assembly Line (Component & Integration)",
        category: "Testing",
        subDescription: "Check if the parts fit together. Master Component Testing (React Testing Library) and Integration Checks to ensure the assembly line is smooth.",
        phases: [
            {
                phase: 1,
                title: "Component Inspection: React Testing Library",
                theory: [
                    "RTL Philosophy: Testing like a user, not like a machine",
                    "Rendering Components: Putting the set on the lab table",
                    "Querying Elements: Finding buttons and labels like a customer would",
                    "User Events: Simulating clicks, typing, and interactions"
                ],
                practicals: [
                    "Test a 'Sign-Up' component to see if it shows errors correctly",
                    "Simulate a 'Button Click' and verify the state change"
                ]
            },
            {
                phase: 2,
                title: "The Assembly Check: Integration Testing",
                theory: [
                    "Integration Scope: Checking the handoff between two departments",
                    "Testing API Endpoints: Verifying communication with the 'Kitchen'",
                    "Supertest: Your secret tool for backend assembly checks",
                    "Async Testing: Handling tasks that take time to complete"
                ],
                practicals: [
                    "Write an assembly check for a 'User Registration' flow (Frontend + API)",
                    "Test a 'Checkout' process where multiple services talk to each other"
                ]
            }
        ]
    },
    "testing-3": {
        fileName: "testing-3",
        description: "The Customer Test Drive (E2E & QA)",
        category: "Testing",
        subDescription: "The absolute final check. Master the Crash-Test Dummies (Cypress & Playwright) and perform full 'Customer Journeys' across the entire app.",
        phases: [
            {
                phase: 1,
                title: "The Crash-Test Dummies: Cypress",
                theory: [
                    "Cypress Architecture: The automated customer in the browser",
                    "Selectors & Commands: Directing the dummy where to go",
                    "Assertions: Verifying the customer sees the 'Thank You' page",
                    "Custom Commands: Teaching the dummy common tasks (like logging in)"
                ],
                practicals: [
                    "Automate a 'Complete Purchase' journey in Cypress",
                    "Record a video of the 'Dummy' failing to find a broken link"
                ]
            },
            {
                phase: 2,
                title: "Advanced Proving Grounds: Playwright",
                theory: [
                    "Playwright vs Cypress: Cross-browser test tracks",
                    "Parallel Execution: Running multiple test drives at once",
                    "Visual Testing: Checking if the 'Paint Job' looks right (Screenshots)",
                    "Trace Viewer: Rewinding the tape to see exactly where the car crashed"
                ],
                practicals: [
                    "Migrate a Cypress journey to Playwright for multi-browser testing",
                    "Perform a 'Visual Regression' check on your homepage"
                ]
            },
            {
                phase: 3,
                title: "The Lab Report: Coverage & Metrics",
                theory: [
                    "Test Coverage: Measuring how much of the building was inspected",
                    "Statement vs Branch Coverage: Checking every possible 'Plot Twist'",
                    "Quality over Quantity: Why 100% coverage doesn't mean 100% safety",
                    "CI/CD Integration: Running the lab automatically on every update"
                ],
                practicals: [
                    "Generate a 'Code Coverage' lab report for your project",
                    "Identify an 'Unprotected Corner' of code and add a safety test"
                ]
            }
        ]
    },
    "testing-questions": {
        fileName: "testing-questions",
        description: "The Safety Manual (Interview Prep)",
        category: "Testing",
        subDescription: "40+ common questions. Master the 'Inspector' vocabulary to prove you can build unbreakable systems.",
        phases: [
            {
                phase: 1,
                title: "Junior Inspector",
                theory: [
                    "Unit vs Integration vs E2E (Bolt vs Assembly vs Test Drive)",
                    "Why mock? (The Stunt Double analogy)",
                    "What is TDD? (The Blueprint Metaphor)",
                    "Regression Testing (Checking if old fixes still work)"
                ],
                practicals: [
                    "Explain 'Mocking' using a 'Dummy Car' analogy",
                    "Differentiate 'Black Box' vs 'White Box' testing"
                ]
            },
            {
                phase: 2,
                title: "Chief Safety Officer",
                theory: [
                    "Testing Microservices (Regional office checks)",
                    "Performance Testing (Stress-testing the building's foundation)",
                    "Security Testing (Locked door penetration checks)",
                    "Contract Testing (Agreement checks between services)"
                ],
                practicals: [
                    "Design a testing strategy for a 'Global Payment Hub'",
                    "Identify the risks of 'Flaky Tests' in an automated assembly line"
                ]
            }
        ]
    }
};

export const SYSTEM_DESIGN_CURRICULUM: Record<string, CurriculumData> = {
    "system-design-1": {
        fileName: "system-design-1",
        description: "Metropolis Foundations (Scaling & Rules)",
        category: "System Design",
        subDescription: "Welcome to the Architect's Studio. Learn the fundamental laws of buildable cities: Scaling (Vertical vs Horizontal), Availability, and the Zoning Laws (CAP Theorem & SOLID).",
        phases: [
            {
                phase: 1,
                title: "The Growth Plan: Scalability & Reliability",
                theory: [
                    "What is System Design? Planning a city for millions",
                    "Vertical vs Horizontal Scaling: Building taller vs building more houses",
                    "Reliability & Availability: Keeping the city running during a storm",
                    "Throughput vs Latency: Road width vs the speed limit"
                ],
                practicals: [
                    "Design a growth plan for a village becoming a metropolis",
                    "Identify 'Single Points of Failure' in a city grid"
                ]
            },
            {
                phase: 2,
                title: "The Zoning Laws: CAP Theorem & PACELC",
                theory: [
                    "CAP Theorem: Consistency, Availability, and Partition Tolerance",
                    "Zoning Trade-offs: Why you can't have everything at once",
                    "Eventual Consistency: The 'Check is in the mail' approach",
                    "SLA/SLO/SLI: The architect's guarantee to the citizens"
                ],
                practicals: [
                    "Decide which Zoning Law (CAP) to favor for a Bank vs a Social Media site",
                    "Draft an 'Availability Guarantee' (SLA) for a new utility"
                ]
            },
            {
                phase: 3,
                title: "The Blueprints: SOLID & Design Principles",
                theory: [
                    "SOLID Principles: The gold standard for house blueprints",
                    "DRY & KISS: Keeping it simple and avoiding repeated work",
                    "Clean Architecture: Keeping the 'Plumbing' separate from the 'Paint'",
                    "Design Patterns: Using proven 'Building Templates' (Factory, Singleton)"
                ],
                practicals: [
                    "Refactor a 'Messy Blueprint' (Code) using SOLID rules",
                    "Identify the best 'Building Template' (Pattern) for a notification system"
                ]
            }
        ]
    },
    "system-design-2": {
        fileName: "system-design-2",
        description: "The Infrastructure Grid (Traffic & Storage)",
        category: "System Design",
        subDescription: "Build the vital services. Master Traffic Control (Load Balancing), Neighborhood Convenience Stores (Caching), and the Global Vaults (Database Design).",
        phases: [
            {
                phase: 1,
                title: "Traffic Control: Load Balancing",
                theory: [
                    "Load Balancers: The traffic police at the city gates",
                    "Algorithms: Round Robin, Least Connections, and IP Hash",
                    "Health Checks: Closing roads that have 'Construction' (Server down)",
                    "Sticky Sessions: Ensuring a visitor stays at the same hotel they booked"
                ],
                practicals: [
                    "Simulate a 'Traffic Jam' and use a Load Balancer to clear it",
                    "Design a 'Health Check' for a city service"
                ]
            },
            {
                phase: 2,
                title: "Convenience Stores: Caching Strategies",
                theory: [
                    "Why Cache? Reducing the 20-mile trip to the warehouse",
                    "Cache-Aside vs Write-Through: When to restock the shelves",
                    "Redis & Memcached: The high-speed 'Grab-and-Go' stores",
                    "CDN: Placing a store in every city across the world"
                ],
                practicals: [
                    "Identify 'High-Demand Items' (Data) that need a convenience store (Cache)",
                    "Design an 'Expiry Rule' (TTL) for fresh milk in your store"
                ]
            },
            {
                phase: 3,
                title: "The Global Vaults: Database Scaling",
                theory: [
                    "SQL vs NoSQL: The labeled filing cabinets vs the giant storage bins",
                    "Replication: Keeping a backup vault in another city",
                    "Sharding: Splitting one giant vault into smaller pieces based on zip code",
                    "Indexing: The 'A-Z' guide for finding things in the vault instantly"
                ],
                practicals: [
                    "Design a 'Sharding Key' for a city of 10 million people",
                    "Create an 'Index' for a vault containing millions of records"
                ]
            }
        ]
    },
    "system-design-3": {
        fileName: "system-design-3",
        description: "City Operations (Services & Events)",
        category: "System Design",
        subDescription: "Manage complex operations. Master the Utility Grid (Microservices), the Digital Post Office (Message Queues), and real-world Case Studies.",
        phases: [
            {
                phase: 1,
                title: "The Utility Grid: Microservices",
                theory: [
                    "Monolith vs Microservices: One giant building vs a specialized grid",
                    "Service Discovery: The 'City Map' for finding where a service lives",
                    "API Gateway: The central reception for the whole utility grid",
                    "Circuit Breakers: Shutting off power to a single block so the city doesn't go dark"
                ],
                practicals: [
                    "Break a 'Giant Mall' (Monolith) into 5 specialized shops (Services)",
                    "Implement a 'Fuse' (Circuit Breaker) for a failing service"
                ]
            },
            {
                phase: 2,
                title: "The Digital Post Office: Message Queues",
                theory: [
                    "Async Processing: Dropping a letter and knowing it will move eventually",
                    "Publish/Subscribe: The 'City Newspaper' that many people read",
                    "Kafka & RabbitMQ: The high-volume shipping hubs",
                    "Dead Letter Queues: Where lost and broken mail goes for inspection"
                ],
                practicals: [
                    "Design a 'Newspaper Delivery' (Pub/Sub) system for city alerts",
                    "Fix a 'Mail Logjam' (Queue Congestion) by adding more mailmen (Workers)"
                ]
            },
            {
                phase: 3,
                title: "The Grand Opening: Case Studies",
                theory: [
                    "URL Shortener: Building the 'Small Map' for long roads",
                    "Social Feed: Designing the 'Town Square' where everyone talks",
                    "Chat System: The 'Live Intercom' for billions of people",
                    "Video Streaming: The 'Global Cinema' that never buffers"
                ],
                practicals: [
                    "Draw the 'Master Blueprint' for a URL shortener",
                    "Estimate the 'Building Cost' (Capacity Estimation) for a Social Media city"
                ]
            }
        ]
    },
    "system-design-questions": {
        fileName: "system-design-questions",
        description: "The Architect's License (Interview Prep)",
        category: "System Design",
        subDescription: "50+ core questions. Master the 'City Architect' vocabulary to prove you can build the next digital metropolis.",
        phases: [
            {
                phase: 1,
                title: "Junior Planner",
                theory: [
                    "Horizontal vs Vertical Scaling (Houses vs Skyscrapers)",
                    "Load Balancer vs Reverse Proxy (Traffic cop vs Receptionist)",
                    "SQL vs NoSQL trade-offs (Filing cabinets vs Bins)",
                    "Why use a Cache? (The Convenience store analogy)"
                ],
                practicals: [
                    "Explain 'Microservices' using a 'Specialized Grid' analogy",
                    "Differentiate 'Throughput' vs 'Latency' using a 'Highway' metaphor"
                ]
            },
            {
                phase: 2,
                title: "Master Architect",
                theory: [
                    "How to handle a 'Viral Event' (The Traffic Spike problem)",
                    "Database sharding strategies (Zip code vs User ID)",
                    "Eventual Consistency vs Strong Consistency",
                    "Designing for 'High Availability' (The Disaster Plan)"
                ],
                practicals: [
                    "Draft a recovery plan for a 'Global Power Outage' (Data Center Failure)",
                    "Optimize a 'City Grid' (System) that is getting too expensive to run"
                ]
            }
        ]
    }
};

export const NETWORKING_CURRICULUM: Record<string, CurriculumData> = {
    "networking-1": {
        fileName: "networking-1",
        description: "The Local Post Office (Foundations)",
        category: "Networking",
        subDescription: "Welcome to the central sorting center. Learn about the Envelope Layers (OSI Model), the Global Delivery Rules (TCP/IP), and how the digital mail travels.",
        phases: [
            {
                phase: 1,
                title: "The 7-Layer Envelope: OSI Model",
                theory: [
                    "OSI Model: The 7 protective layers around your data letter",
                    "Physical & Data Link: The roads and tires of the internet",
                    "Network & Transport: Adding the address and the stamps",
                    "Session/Presentation/Application: Opening and reading the letter"
                ],
                practicals: [
                    "Label an 'Email' using only OSI layer metaphors",
                    "Analyze a 'Packet Trip' from your laptop to the router"
                ]
            },
            {
                phase: 2,
                title: "Global Delivery Rules: TCP vs UDP",
                theory: [
                    "TCP (Certified Mail): The '3-Way Handshake' that waits for a signature",
                    "UDP (Postcard): Fast, but doesn't care if it gets lost",
                    "Flow Control: Making sure you don't send letters faster than the mailbox can hold",
                    "Ports: The specific 'Window Number' at the post office (/80, /443, /22)"
                ],
                practicals: [
                    "Perform a '3-Way Handshake' roleplay with the terminal",
                    "Identify which apps on your computer are using 'Certified Mail' (TCP)"
                ]
            },
            {
                phase: 3,
                title: "Courier Routes: LAN, WAN & IP",
                theory: [
                    "LAN vs WAN: Your neighborhood post office vs the global network",
                    "The Router: The master sorting machine that knows every road",
                    "Bandwidth vs Latency: The width of the road vs the speed limit",
                    "Transmission Media: Fiber-optic 'Speedways' vs Wi-Fi 'Airwaves'"
                ],
                practicals: [
                    "Measure your 'Road Speed' (Bandwidth) vs 'Delivery Time' (Latency)",
                    "Trace the path of a letter to Google.com using `tracert`"
                ]
            }
        ]
    },
    "networking-2": {
        fileName: "networking-2",
        description: "The Global Address Book (Addressing & DNS)",
        category: "Networking",
        subDescription: "Never get lost. Master the Home Addresses (IP), the Digital Phonebook (DNS), and the secrets of Subnetting.",
        phases: [
            {
                phase: 1,
                title: "Home Addresses: IPv4 & IPv6",
                theory: [
                    "IP Addresses: The unique 'Home Address' of every device on earth",
                    "Public vs Private IP: Your house number vs your room number inside the house",
                    "NAT: The building manager who handles mail for the whole apartment",
                    "IPv6: Why the world outgrew its old phonebook and needed longer numbers"
                ],
                practicals: [
                    "Find your 'Public Address' vs your 'Private Room Number' (Local IP)",
                    "Configure a 'Gatekeeper' (NAT) on a mock network"
                ]
            },
            {
                phase: 2,
                title: "The Digital Phonebook: DNS",
                theory: [
                    "DNS (Domain Name System): Turning human names into IP numbers",
                    "DNS Hierarchy: The 'Librarians' who know where every site lives",
                    "A, CNAME, & MX Records: The different types of labels in the phonebook",
                    "DNS Caching: Remembering a friend's number so you don't have to look it up"
                ],
                practicals: [
                    "Use `nslookup` to find the secret numbers behind 3 famous websites",
                    "Check the 'Phonebook Records' (DNS) for your own domain name"
                ]
            },
            {
                phase: 3,
                title: "Neighborhood Planning: Subnetting",
                theory: [
                    "Subnetting: Dividing one big city into smaller, secure neighborhoods",
                    "Subnet Masks: The 'Fence' that decides who is on your street",
                    "CIDR Notation: The shorthand for writing down neighborhood plans",
                    "DHCP: The automated clerk who hands out addresses to new devices"
                ],
                practicals: [
                    "Calculate a 'Neighborhood Fence' (Subnet Mask) for 50 devices",
                    "Force your device to get a 'New Address' from the DHCP clerk"
                ]
            }
        ]
    },
    "networking-3": {
        fileName: "networking-3",
        description: "Special Delivery (Security & Real-time)",
        category: "Networking",
        subDescription: "Level up your courier service. Master Secure Envelopes (HTTPS), Live Walkie-Talkies (WebSockets), and Global CDNs.",
        phases: [
            {
                phase: 1,
                title: "The Secure Envelope: HTTPS & TLS",
                theory: [
                    "HTTPS vs HTTP: The 'Locked Suitcase' vs the 'Open Postcard'",
                    "TLS/SSL Handshake: Swapping 'Secret Keys' before the mail is sent",
                    "Certificates: The 'Inspector's Seal' that proves a site is safe",
                    "Port 443: The specialized secure window at the post office"
                ],
                practicals: [
                    "Inspect the 'Security Seal' (SSL Certificate) of your bank's website",
                    "Explain why 'Open Wi-Fi' is like sending postcards in a crowd"
                ]
            },
            {
                phase: 2,
                title: "The Live Walkie-Talkie: WebSockets",
                theory: [
                    "WebSockets: A 'Live Line' that stays open forever (unlike letters)",
                    "Real-time Data: Why chat and games can't wait for a mail truck",
                    "Socket.io: The high-speed dispatcher for live data",
                    "Push vs Pull: When the server 'Shouts' updates at you instantly"
                ],
                practicals: [
                    "Establish a 'Live Walkie-Talkie' link between a server and a client",
                    "Build a 'Live Heartbeat' monitor that pings every second"
                ]
            },
            {
                phase: 3,
                title: "The Local Branch: CDNs & Edge",
                theory: [
                    "CDN (Content Delivery Network): Keeping a copy of your site in every city",
                    "Edge Computing: Doing the 'Cooking' closer to the customer",
                    "Load Balancing: The traffic police directing mail to the least busy office",
                    "Network Security: Firewalls and DDoS (The 'Gatekeepers' and 'Traffic Jams')"
                ],
                practicals: [
                    "Find out which 'Local Branch' (CDN) is serving you Netflix videos",
                    "Simulate a 'Traffic Jam' (DDoS) and see how a Firewall blocks it"
                ]
            }
        ]
    },
    "networking-questions": {
        fileName: "networking-questions",
        description: "The Courier Manager Exam (Interview Prep)",
        category: "Networking",
        subDescription: "40+ common questions. Master the 'Digital Courier' vocabulary to prove you can connect the world.",
        phases: [
            {
                phase: 1,
                title: "Junior Courier",
                theory: [
                    "TCP vs UDP (Certified vs Postcard)",
                    "DNS Resolution flow (The Phonebook check)",
                    "IP Address components (Neighborhood vs House)",
                    "HTTP Status Codes (The Post Office return codes)"
                ],
                practicals: [
                    "Explain 'DNS' using a 'Phonebook' analogy",
                    "Differentiate 'Router' vs 'Switch' using a 'Sorting Center' metaphor"
                ]
            },
            {
                phase: 2,
                title: "Global Logistics Director",
                theory: [
                    "Load Balancing strategies (Traffic management)",
                    "BGP Routing (The 'International Highways')",
                    "WebSocket overhead vs HTTP polling",
                    "Network Security vulnerabilities (The 'Porch Pirate' problem)"
                ],
                practicals: [
                    "Design a networking plan for a 'Global Video Streaming' app",
                    "Optimize a 'Slow Connection' that is losing too many packets"
                ]
            }
        ]
    }
};

export const OS_CURRICULUM: Record<string, CurriculumData> = {
    "os-1": {
        fileName: "os-1",
        description: "The Manager's Office (Processes & Threads)",
        category: "Operating Systems",
        subDescription: "Meet the building boss. Learn how the Manager (Kernel) handles Residents (Processes), multi-tasking (Threads), and keeps the building running.",
        phases: [
            {
                phase: 1,
                title: "The Boss in Charge: Kernel & System Calls",
                theory: [
                    "What is an OS? The Building Manager of your computer",
                    "The Kernel: The manager who actually pulls the levers",
                    "User Space vs Kernel Space: The lobby vs the private office",
                    "System Calls: Residents knocking on the manager's door for help"
                ],
                practicals: [
                    "Identify 3 'Requests' (System Calls) your mouse/keyboard makes",
                    "Explore the 'Manager's Dashboard' (Task Manager/Activity Monitor)"
                ]
            },
            {
                phase: 2,
                title: "The Residents: Processes & Threads",
                theory: [
                    "Processes: The independent residents living in the tower",
                    "Process States: Loading, Working, and Waiting in the lobby",
                    "Threads: A resident doing two things at once (Cooking & Listening)",
                    "Context Switching: The manager quickly switching focus between residents"
                ],
                practicals: [
                    "Spawn a 'New Resident' (Process) using the terminal",
                    "Watch how much 'Room Space' (CPU/RAM) a single resident takes"
                ]
            },
            {
                phase: 3,
                title: "Resident Meetings: Concurrency & Sync",
                theory: [
                    "Race Conditions: Two residents trying to enter the door at once",
                    "Mutex & Semaphores: The 'Occupied' sign on the bathroom door",
                    "Deadlock: Residents stuck in the hallway waiting for each other",
                    "Inter-process Communication (IPC): Sending letters between rooms"
                ],
                practicals: [
                    "Simulate a 'Hallway Jam' (Deadlock) in code",
                    "Use a 'Door Lock' (Mutex) to keep a shared room safe"
                ]
            }
        ]
    },
    "os-2": {
        fileName: "os-2",
        description: "The Room Allotment (Memory & Storage)",
        category: "Operating Systems",
        subDescription: "Manage the tower's space. Allot Apartment Rooms (RAM), setup the Storage Basement (File System), and handle Virtual Space.",
        phases: [
            {
                phase: 1,
                title: "Apartment Allotment: Memory Management",
                theory: [
                    "RAM vs Disk: The living room vs the storage basement",
                    "Address Space: Giving every resident a unique room number",
                    "Paging: Dividing rooms into small, manageable squares",
                    "Allocation: Giving space to a resident when they check-in (malloc)"
                ],
                practicals: [
                    "Monitor which 'Residents' (Apps) are hogging the most rooms (RAM)",
                    "Simulate a 'Room Shortage' and see how the manager reacts"
                ]
            },
            {
                phase: 2,
                title: "Illusion of Space: Virtual Memory",
                theory: [
                    "Virtual Memory: Making residents think the building is infinite",
                    "Page Tables: The manager's map of where everyone really is",
                    "Swapping: Moving sleeping residents to the 'Basement' (Disk) temporarily",
                    "Thrashing: When the manager spends all day moving people and no one works"
                ],
                practicals: [
                    "Identify when your computer is 'Swapping' data to the basement",
                    "Analyze a 'Page Fault' (Searching for a resident who was moved to the basement)"
                ]
            },
            {
                phase: 3,
                title: "The Storage Basement: File Systems",
                theory: [
                    "File Concept: Labeled boxes in the storage basement",
                    "Directory Structure: The shelf and aisle system (Folders)",
                    "Disk Scheduling: How the basement robot finds boxes efficiently",
                    "Allocation Methods: Contiguous vs Linked vs Indexed boxes"
                ],
                practicals: [
                    "Visualize how a 'Large Box' (File) is actually split across basement shelves",
                    "Test your basement robot's speed (Disk Read/Write test)"
                ]
            }
        ]
    },
    "os-3": {
        fileName: "os-3",
        description: "Building Security (Scheduling & Protection)",
        category: "Operating Systems",
        subDescription: "Keep the tower safe and fair. Manage the Elevator Queue (CPU Scheduling) and hire Security Guards (Protection).",
        phases: [
            {
                phase: 1,
                title: "The Elevator Queue: CPU Scheduling",
                theory: [
                    "Why Scale? Too many residents, only one fast elevator (CPU)",
                    "First-Come-First-Serve: A simple, slow line",
                    "Round Robin: Everyone gets 1 minute in the elevator at a time",
                    "Priority Scheduling: The 'VIP Residents' get to go first"
                ],
                practicals: [
                    "Simulate an 'Elevator Queue' with 10 residents and 3 different rules",
                    "Identify 'VIP Processes' in your own operating system"
                ]
            },
            {
                phase: 2,
                title: "The Security Guard: Protection & Permissions",
                theory: [
                    "Authentication: Checking ID cards at the front gate",
                    "Access Control: Who is allowed in the 'Utilities Room'?",
                    "Protection Domains: Keeping residents inside their own rooms",
                    "Malware Security: Detecting 'Intruders' disguised as residents"
                ],
                practicals: [
                    "Change the 'Room Key' (Permissions) of a file using `chmod`",
                    "Try to enter the 'Manager's Private Office' (Root/Admin) without a key"
                ]
            },
            {
                phase: 3,
                title: "Universal Controls: I/O & Devices",
                theory: [
                    "I/O Management: Plugging in new appliances (Keyboards, Printers)",
                    "Device Drivers: The 'Instruction Manual' for a new appliance",
                    "Interrupts: When an appliance screams for attention ('The toaster is done!')",
                    "Buffering: A temporary tray for incoming data"
                ],
                practicals: [
                    "Watch your 'Manager' (OS) react to a 'New Appliance' (USB Plugin)",
                    "Read a 'Device Log' to see the appliance 'Screaming' (Interrupts)"
                ]
            }
        ]
    },
    "os-questions": {
        fileName: "os-questions",
        description: "The Manager's Certification (Interview Prep)",
        category: "Operating Systems",
        subDescription: "40+ common questions. Master the 'Building Manager' vocabulary to ace systems engineering interviews.",
        phases: [
            {
                phase: 1,
                title: "Junior Assistant",
                theory: [
                    "Process vs Thread (Single resident vs Multi-tasking)",
                    "RAM vs Virtual Memory (Real space vs Illusion of space)",
                    "Mutex vs Semaphore (Binary lock vs Group limit)",
                    "What is a System Call? (The Knock on the door)"
                ],
                practicals: [
                    "Explain 'Paging' using a 'Divided Apartment' analogy",
                    "Differentiate 'Soft Link' vs 'Hard Link' in the basement"
                ]
            },
            {
                phase: 2,
                title: "Chief Building Manager",
                theory: [
                    "Thrashing (The 'Endless Moving' problem)",
                    "Banker's Algorithm (Avoiding Deadlock)",
                    "TLB (The manager's speed-dial list)",
                    "Monolithic vs Micro-kernel (One manager vs a team of assistants)"
                ],
                practicals: [
                    "Design a recovery plan for a 'Global Deadlock' scenario",
                    "Optimize an 'Elevator Queue' for maximum building efficiency"
                ]
            }
        ]
    }
};
