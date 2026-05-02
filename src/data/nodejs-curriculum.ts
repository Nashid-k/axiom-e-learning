export const NODEJS_CURRICULUM = {
    "nodejs": {
        id: "nodejs",
        fileName: "nodejs",
        description: "The Engine Room (Node.js Mastery)",
        category: "NodeJS",
        subDescription: "Master the power source. From the Core Engine and Event Loop to high-performance assembly lines and scalable distributed factory networks.",
        phases: [
            {
                phase: 1,
                title: "Starting the Engine: Intro & Event Loop",
                theory: [
                    "What is Node.js? (The Factory Engine vs The Browser Kitchen)",
                    "V8 Engine: The high-octane fuel for your factory",
                    "The Event Loop: The single conveyor belt that never stops",
                    "Non-blocking I/O: Handling massive shipments without stopping the belt",
                    "Process & Environment: Reading the factory's dashboard (process.env)"
                ],
                practicals: [
                    "Install the Engine on your machine",
                    "Write a script that reads and logs factory settings (environment variables)"
                ]
            },
            {
                phase: 2,
                title: "The Tool Box: Core Modules",
                theory: [
                    "NPM: The massive warehouse of pre-made tools",
                    "File System (FS): The Factory Wrench (Read/Write/Delete)",
                    "Path: The Factory Ruler (Measuring file addresses)",
                    "OS & Utils: Checking engine temperature and health",
                    "HTTP Module: Building a basic reception desk at the factory gate"
                ],
                practicals: [
                    "Build a 'Log Recorder' that writes factory events to a file",
                    "Create a basic server that greets visitors at the gate"
                ]
            },
            {
                phase: 3,
                title: "Building the Tracks: Express Routing",
                theory: [
                    "Why Express? Building specialized tracks for different products",
                    "Routes (GET, POST): Defining where products go",
                    "Request & Response: The raw materials in and finished goods out",
                    "Dynamic Routing: Handling unique order IDs on the track"
                ],
                practicals: [
                    "Set up an Express assembly line",
                    "Build a 'Product Catalog' with dynamic routes for each item"
                ]
            },
            {
                phase: 4,
                title: "The Quality Filter: Middleware",
                theory: [
                    "What is Middleware? The checkpoints on the conveyor belt",
                    "Global vs Local Middleware: Constant checks vs specialized inspections",
                    "Custom Middleware: Building your own inspection machine",
                    "Error Handling: Dealing with 'Broken Products' on the belt"
                ],
                practicals: [
                    "Build a 'Time-Stamper' middleware that logs every request time",
                    "Create a security guard (Auth Middleware) that checks for ID badges"
                ]
            },
            {
                phase: 5,
                title: "Packaging the Goods: Controllers & Models",
                theory: [
                    "MVC Pattern: Organizing the factory into specialized departments",
                    "Controllers: The department managers who handle logic",
                    "Models: The blueprints for the data",
                    "Views: How the customer sees the final product"
                ],
                practicals: [
                    "Refactor your assembly line into a clean MVC structure",
                    "Build a 'Staff Directory' using the MVC blueprint"
                ]
            },
            {
                phase: 6,
                title: "High-Volume Shipping: Streams & Buffers",
                theory: [
                    "Buffers: Small storage bins for raw data",
                    "Streams: The firehose for massive datasets",
                    "Piping: Connecting one machine directly to another",
                    "Transform Streams: Modifying products as they pass through the pipe"
                ],
                practicals: [
                    "Stream a massive 'Inventory List' without crashing the engine",
                    "Pipe a file through a 'Compressor' (Zlib) to save space"
                ]
            },
            {
                phase: 7,
                title: "Heavy Machinery: Workers & Clusters",
                theory: [
                    "Worker Threads: Hiring extra hands for heavy math tasks",
                    "Cluster Module: Running multiple engines for massive load",
                    "Child Processes: Spawning specialized mini-factories",
                    "EventEmitter: The factory's internal intercom system"
                ],
                practicals: [
                    "Offload a 'Heavy Calculation' task to a Worker Thread",
                    "Build an intercom system that notifies the manager when an 'Error' occurs"
                ]
            },
            {
                phase: 8,
                title: "Factory Security & Testing",
                theory: [
                    "Bcrypt: Shredding sensitive blueprints (Password Hashing)",
                    "JWT: The digital staff badge for secure areas",
                    "Passport: The global security firm for factory auth",
                    "Jest/Supertest: The Quality Assurance (QA) team"
                ],
                practicals: [
                    "Secure your factory routes with digital ID badges (JWT)",
                    "Write a QA test (Jest) to ensure the assembly line never breaks"
                ]
            }
        ]
    },
    "nodejs-questions": {
        id: "nodejs-questions",
        fileName: "nodejs-questions",
        description: "Node.js Interview Inspector",
        category: "NodeJS",
        subDescription: "Master 50+ questions about the Factory Engine. Learn to explain the 'Conveyor Belt' and 'Loading Dock' to recruiters.",
        phases: [
            {
                phase: 1,
                title: "The Entry-Level Inspection",
                theory: [
                    "Node.js vs Browser (The Engine Room vs The Kitchen)",
                    "The Event Loop (The Conveyor Belt metaphor)",
                    "CommonJS vs ESM (Different tool organization standards)",
                    "Error-first callbacks (The old factory protocol)"
                ],
                practicals: [
                    "Explain the 'Single Threaded' nature of Node using a 'Single Chef' analogy",
                    "Compare 'Sync' vs 'Async' using 'Waiting in line' vs 'Being called later'"
                ]
            },
            {
                phase: 2,
                title: "The Senior Manager Inspection",
                theory: [
                    "Stream backpressure (When the belt is moving too fast)",
                    "Memory Leaks (Tools forgotten on the factory floor)",
                    "Microtasks vs Macrotasks (High priority vs Normal orders)",
                    "Scaling strategies (Horizontal vs Vertical)"
                ],
                practicals: [
                    "Identify a 'Memory Leak' in a simulation",
                    "Sketch a 'High-Availability Factory' architecture"
                ]
            }
        ]
    }
};
