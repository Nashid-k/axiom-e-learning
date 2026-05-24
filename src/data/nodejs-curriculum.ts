export const NODEJS_CURRICULUM = {
    "nodejs": {
        id: "nodejs",
        fileName: "nodejs",
        description: "The AI-Powered Engine Room (Node.js Mastery)",
        category: "NodeJS",
        subDescription: "Master Node.js for 2026+. From Event Loops and Streams to LLM API Integration, RAG Architectures, and Multi-Agent Orchestration.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Starting the Engine: Intro & Event Loop",
                targetExperience: ["1yoe"],
                theory: [
                    "What is Node.js? (The Factory Engine vs The Browser Kitchen)",
                    "V8 Engine: The high-octane fuel for your factory",
                    "The Event Loop: The single conveyor belt that never stops",
                    "Non-blocking I/O: Handling massive shipments without stopping the belt",
                    "AI Coding Assistants: Using Cursor and Copilot to scaffold Node servers instantly"
                ],
                practicals: [
                    "Install the Engine on your machine",
                    "Write a script that reads and logs factory settings (environment variables)",
                    "Use an AI assistant to generate a basic HTTP server boilerplate"
                ]
            },
            {
                phase: 2,
                title: "The Tool Box: Core Modules",
                targetExperience: ["1yoe"],
                theory: [
                    "NPM: The massive warehouse of pre-made tools",
                    "File System (FS): The Factory Wrench (Read/Write/Delete)",
                    "Path: The Factory Ruler (Measuring file addresses)",
                    "OS & Utils: Checking engine temperature and health",
                    "Understanding Deterministic vs Probabilistic code execution"
                ],
                practicals: [
                    "Build a 'Log Recorder' that writes factory events to a file",
                    "Create a basic server that greets visitors at the gate",
                    "Use Copilot to auto-complete error handling blocks"
                ]
            },
            {
                phase: 3,
                title: "Building the Tracks: Express & LLM APIs",
                targetExperience: ["2yoe"],
                theory: [
                    "Why Express? Building specialized tracks for different products",
                    "Routes (GET, POST): Defining where products go",
                    "Request & Response: The raw materials in and finished goods out",
                    "LLM API Integration: Connecting your Node backend to OpenAI or Anthropic",
                    "Prompt Construction: Building dynamic prompts from request data"
                ],
                practicals: [
                    "Set up an Express assembly line",
                    "Build a `/chat` endpoint that calls an LLM API and returns the response",
                    "Handle API rate limits and timeouts cleanly"
                ]
            },
            {
                phase: 4,
                title: "The Quality Filter: Middleware & AI Guards",
                targetExperience: ["2yoe"],
                theory: [
                    "What is Middleware? The checkpoints on the conveyor belt",
                    "Global vs Local Middleware: Constant checks vs specialized inspections",
                    "AI Observability: Logging prompts and token usage for cost tracking",
                    "Security Middleware: Defending against Prompt Injection and jailbreaks",
                    "Error Handling: Dealing with 'Broken Products' and API failures"
                ],
                practicals: [
                    "Build a 'Token Tracker' middleware that logs LLM usage costs",
                    "Create a security guard (Auth Middleware) that checks for ID badges",
                    "Implement basic input sanitization before sending data to an LLM"
                ]
            },
            {
                phase: 5,
                title: "Streaming AI Responses: Streams & SSE",
                targetExperience: ["3yoe"],
                theory: [
                    "Buffers: Small storage bins for raw data",
                    "Streams: The firehose for massive datasets",
                    "Server-Sent Events (SSE): Streaming LLM text token-by-token to the client",
                    "Piping: Connecting an AI stream directly to the Express response",
                    "Handling stream interruptions and client disconnects"
                ],
                practicals: [
                    "Refactor your `/chat` endpoint to use streaming (SSE)",
                    "Pipe a file through a 'Compressor' (Zlib) to save space",
                    "Build a client that consumes the streamed tokens in real-time"
                ]
            },
            {
                phase: 6,
                title: "The Knowledge Base: RAG & Vector DBs",
                targetExperience: ["3yoe"],
                theory: [
                    "Retrieval-Augmented Generation (RAG): Giving your LLM a memory",
                    "Embeddings: Turning text into math (Vectors)",
                    "Vector Databases: Storing and querying embeddings (pgvector, Pinecone)",
                    "Cosine Similarity: Finding the most relevant context for a user's prompt",
                    "Chunking Strategies: Splitting large documents efficiently"
                ],
                practicals: [
                    "Generate embeddings for a set of text documents using an embedding model",
                    "Store and query embeddings in a local Vector DB",
                    "Build a full RAG pipeline: Query -> Search Vector DB -> Inject Context -> Call LLM"
                ]
            },
            {
                phase: 7,
                title: "Heavy Machinery: Agentic Workflows & Tool Calling",
                targetExperience: ["4yoe"],
                theory: [
                    "Function Calling (Tool Use): Giving LLMs the ability to execute Node functions",
                    "Agentic Workflows: LLMs that plan, execute, and evaluate their own work",
                    "Multi-Agent Orchestration: Setting up specialized agents (Researcher, Coder, Reviewer)",
                    "Worker Threads: Offloading heavy vector math or agent processing",
                    "State Machines: Managing long-running AI tasks reliably"
                ],
                practicals: [
                    "Create a tool that allows the LLM to read the local file system",
                    "Build a simple ReAct (Reason + Act) loop agent in Node",
                    "Offload heavy task orchestration to a Worker Thread"
                ]
            },
            {
                phase: 8,
                title: "Enterprise AI Architecture & Testing",
                targetExperience: ["4+yoe"],
                theory: [
                    "AI-First System Design: Architecting for high latency and non-deterministic outputs",
                    "Local LLMs: Running open-weights models locally via Node bindings",
                    "Autonomous Testing: Using AI to generate unit and integration tests",
                    "Evaluating AI Outputs (LLM-as-a-Judge): Automated quality assurance",
                    "Compliance & Data Privacy: Handling PII before it reaches external APIs"
                ],
                practicals: [
                    "Secure your factory routes with digital ID badges (JWT) and PII scrubbers",
                    "Write an LLM evaluator script that grades the output of your main agent",
                    "Design an enterprise architecture diagram for an AI-native product"
                ]
            }
        ]
    },
    "nodejs-questions": {
        id: "nodejs-questions",
        fileName: "nodejs-questions",
        description: "Node.js & AI Integration Interview",
        category: "NodeJS",
        subDescription: "Master 50+ questions about modern Node.js, AI streams, RAG pipelines, and Agentic orchestration.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Entry-Level Inspection",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Node.js vs Browser (The Engine Room vs The Kitchen)",
                    "The Event Loop (The Conveyor Belt metaphor)",
                    "What is an LLM API and how do you call it from Node?",
                    "How do you safely store API keys in a Node environment?"
                ],
                practicals: [
                    "Explain the 'Single Threaded' nature of Node",
                    "Compare 'Sync' vs 'Async' in the context of calling a slow AI API"
                ]
            },
            {
                phase: 2,
                title: "The Senior Manager Inspection",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "How do you implement Server-Sent Events (SSE) for streaming AI responses?",
                    "Explain the RAG (Retrieval-Augmented Generation) pipeline architecture.",
                    "What are the security implications of LLM Tool Calling (Function Calling)?",
                    "How do you scale a Node.js service that handles long-running Agentic workflows?"
                ],
                practicals: [
                    "Identify a 'Memory Leak' in a continuous streaming connection",
                    "Sketch a 'High-Availability AI Factory' architecture with Vector DBs"
                ]
            }
        ]
    }
};
