import { CurriculumData } from '@/types';

export const DEVOPS_CURRICULUM: Record<string, CurriculumData> = {
    "devops": {
        id: "devops",
        fileName: "devops",
        description: "DevOps & LLMOps",
        category: "DevOps",
        subDescription: "Setup your workstation, build containers, automate shipping (CI/CD), and deploy AI models to global warehouses (Cloud & K8s).",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Linux, CLI & Container Basics",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "The Terminal: Talking directly to the machines",
                    "What are Containers? The 'Shipping Container' for your code",
                    "Dockerfiles: The step-by-step assembly guide",
                    "Running local open-source LLMs using Docker (e.g., Ollama)"
                ],
                practicals: [
                    "Write a script that creates a 'Daily Report' file automatically",
                    "Build a Docker container that exposes a small LLM API"
                ]
            },
            {
                phase: 2,
                title: "CI/CD & Cloud Basics",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "CI/CD Explained: The automated assembly line",
                    "GitHub Actions: Your digital factory workers",
                    "Serverless Deployments (Vercel/Netlify) for AI frontends",
                    "AWS Basics: EC2, S3, RDS"
                ],
                practicals: [
                    "Create a GitHub Action that runs unit tests on push",
                    "Deploy a Retrieval-Augmented Generation (RAG) backend on a Cloud provider"
                ]
            },
            {
                phase: 3,
                title: "Kubernetes & Infrastructure as Code",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Kubernetes (K8s): The global fleet manager",
                    "Terraform: Writing the blueprints for your entire factory complex",
                    "Deploying GPU-enabled Nodes in K8s for AI Model inference",
                    "Monitoring (Prometheus/Grafana) for GPU utilization and Token metrics"
                ],
                practicals: [
                    "Use a blueprint (Terraform) to build a 'Cloud Workshop'",
                    "Setup a Grafana dashboard to track LLM response latency"
                ]
            },
            {
                phase: 4,
                title: "LLMOps & Advanced Automation",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "What is LLMOps? Continuous integration and deployment for AI models",
                    "Model Registry & Versioning (e.g., HuggingFace, MLflow)",
                    "A/B Testing language models in production",
                    "AI DevOps Agents: Using AI to automatically monitor and heal infrastructure"
                ],
                practicals: [
                    "Set up an automated pipeline to fine-tune and redeploy a small model",
                    "Simulate an error and have an AI agent read the 'Black Box' logs to suggest a fix"
                ]
            }
        ]
    }
};

export const TESTING_CURRICULUM: Record<string, CurriculumData> = {
    "testing": {
        id: "testing",
        fileName: "testing",
        description: "AI-Augmented Testing",
        category: "Testing",
        subDescription: "Master individual inspections (Unit), assembly checks (Integration), and full Test Drives (E2E) using AI generators.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Safety First: Unit & Jest",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "The Test Pyramid: From small bolt tests to full test drives",
                    "Jest Setup: Calibrating your inspection tools",
                    "Using AI (Copilot/Cursor) to rapidly generate boilerplate unit tests",
                    "Reviewing AI-generated tests for hallucinations and edge cases"
                ],
                practicals: [
                    "Draft a 'Safety Manual' (Test Case) for a complex utility function using AI",
                    "Manually fix the edge cases the AI missed"
                ]
            },
            {
                phase: 2,
                title: "Integration & E2E (Playwright/Cypress)",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Integration Scope: Checking the handoff between two departments",
                    "Playwright Architecture: The automated customer in the browser",
                    "Visual Regression Testing: AI tools for catching UI anomalies",
                    "Testing LLM integrations: How to assert 'fuzzy' text outputs"
                ],
                practicals: [
                    "Automate a 'Complete Purchase' journey in Playwright",
                    "Write an integration test for an AI chat endpoint using semantic similarity checks"
                ]
            },
            {
                phase: 3,
                title: "Autonomous Testing Agents",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Test Coverage: Measuring how much of the building was inspected",
                    "Agentic Testing: LLMs that navigate the UI and write their own Playwright scripts",
                    "Mutation Testing: Modifying code to ensure tests fail",
                    "Integrating Autonomous QA Agents into the CI/CD pipeline"
                ],
                practicals: [
                    "Generate a 'Code Coverage' lab report for your project",
                    "Configure an open-source autonomous QA agent to explore a local web app"
                ]
            }
        ]
    }
};

export const SYSTEM_DESIGN_CURRICULUM: Record<string, CurriculumData> = {
    "system-design": {
        id: "system-design",
        fileName: "system-design",
        description: "Modern System Design & AI Architecture",
        category: "System Design",
        subDescription: "From basic scaling and zoning laws to full AI architecture (RAG, Vector DBs, Edge streaming).",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Growth Plan: Scalability & CAP",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Vertical vs Horizontal Scaling: Building taller vs building more houses",
                    "CAP Theorem: Consistency, Availability, and Partition Tolerance",
                    "Load Balancers: The traffic police at the city gates",
                    "Caching Strategies: Redis & Memcached"
                ],
                practicals: [
                    "Design a growth plan for a village becoming a metropolis",
                    "Identify 'High-Demand Items' (Data) that need a convenience store (Cache)"
                ]
            },
            {
                phase: 2,
                title: "Databases & Microservices",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "SQL vs NoSQL: Filing cabinets vs storage bins",
                    "Database Replication and Sharding",
                    "Monolith vs Microservices: One giant building vs a specialized grid",
                    "Message Queues (Kafka/RabbitMQ) for async tasks"
                ],
                practicals: [
                    "Design a 'Sharding Key' for a city of 10 million people",
                    "Break a 'Giant Mall' (Monolith) into 5 specialized shops (Services)"
                ]
            },
            {
                phase: 3,
                title: "AI Architecture & RAG",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Retrieval-Augmented Generation (RAG) System Design",
                    "Vector Databases (Pinecone, pgvector) integration at scale",
                    "Handling high-latency LLM API calls with WebSockets/SSE",
                    "Cost Optimization: Prompt Caching and Token Management"
                ],
                practicals: [
                    "Design a scalable Enterprise AI Chatbot Architecture",
                    "Implement a rate-limiter based on token usage rather than request count"
                ]
            },
            {
                phase: 4,
                title: "Multi-Agent Systems at Scale",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Agentic Workflows: Orchestrating multiple LLM agents (e.g., LangGraph, AutoGen)",
                    "Distributed Memory for Agents: Shared Redis vs Local context",
                    "Streaming partial tool calls to the frontend",
                    "Security: Sandboxing AI code execution"
                ],
                practicals: [
                    "Draw the 'Master Blueprint' for a multi-agent software development system",
                    "Design an architecture for safely executing untrusted AI-generated code"
                ]
            }
        ]
    }
};

export const NETWORKING_CURRICULUM: Record<string, CurriculumData> = {
    "networking": {
        id: "networking",
        fileName: "networking",
        description: "The Global Delivery Network",
        category: "Networking",
        subDescription: "From OSI and TCP/IP to DNS, WebSockets, and Edge Networks.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Network Fundamentals",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "OSI Model: The 7 protective layers around your data",
                    "TCP (Certified Mail) vs UDP (Postcard)",
                    "IP Addresses, LAN, WAN, and DNS",
                    "HTTPS & TLS: The Secure Envelope"
                ],
                practicals: [
                    "Label an 'Email' using only OSI layer metaphors",
                    "Use `nslookup` to find the secret numbers behind 3 famous websites"
                ]
            },
            {
                phase: 2,
                title: "Real-time & Edge Computing",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "WebSockets: A 'Live Line' that stays open forever",
                    "Server-Sent Events (SSE) for AI streaming",
                    "CDN (Content Delivery Network): Keeping a copy of your site in every city",
                    "Edge Computing: Running inference closer to the user to reduce latency"
                ],
                practicals: [
                    "Establish a 'Live Walkie-Talkie' link between a server and a client",
                    "Compare latency between a centralized AI server and an Edge AI deployment"
                ]
            }
        ]
    }
};

export const OS_CURRICULUM: Record<string, CurriculumData> = {
    "os": {
        id: "os",
        fileName: "os",
        description: "Operating Systems & Local AI",
        category: "Operating Systems",
        subDescription: "Processes, Memory Management, and optimizing local OS resources for large language models.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "OS Fundamentals",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "The Kernel: The manager who actually pulls the levers",
                    "Processes vs Threads",
                    "Concurrency: Mutex & Semaphores",
                    "Virtual Memory and Paging"
                ],
                practicals: [
                    "Spawn a 'New Resident' (Process) using the terminal",
                    "Simulate a 'Hallway Jam' (Deadlock) in code"
                ]
            },
            {
                phase: 2,
                title: "Resource Management for Local AI",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "CPU Scheduling vs GPU scheduling",
                    "VRAM constraints: How large LLMs are loaded into GPU memory",
                    "Quantization (GGUF, AWQ): Compressing models to fit in RAM",
                    "File Systems & High-speed read/write for Vector Databases"
                ],
                practicals: [
                    "Monitor which 'Residents' (Apps/Models) are hogging the most VRAM",
                    "Load a quantized LLM locally and observe its memory footprint vs a full precision model"
                ]
            }
        ]
    }
};
