export const NODEJS_CURRICULUM = {
    "nodejs": {
        fileName: "nodejs",
        description: "Node.js Backend",
        category: "NodeJS",
        subDescription: "Build scalable, high-performance server-side applications and APIs.",
        phases: [
            {
                phase: 1,
                title: "Node.js Essentials",
                theory: [
                    {
                        title: "Node.js: JavaScript runtime built on V8 engine",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=LAUi8pPlcUM",
                                title: "Node.js Tutorial for Beginners: Intro & Install",
                                duration: "25:35",
                                channel: "Codevolution"
                            }
                        ]
                    },
                    "Single-threaded, Event-driven, Non-blocking I/O architecture",
                    "Global objects (global, process, Buffer)",
                    "Module wrapper function (__dirname, __filename, exports)",
                    "REPL (Read-Eval-Print Loop)",
                    "Node.js vs Browser JavaScript (Key differences)",
                    "Framework vs Library"
                ],
                practicals: [
                    "Access environment info via process.env and process.argv",
                    "Build a simple CLI script that echoes process.argv arguments in formatted output",
                    "Create a small utility that reads a .env file and logs a sanitized config object (hiding secrets)",
                    "Use the REPL to experiment with core modules (fs, path, os) and document findings"
                ],
                games: []
            },
            {
                phase: 2,
                title: "Node.js Tooling & Package Management",
                theory: [
                    "NPM – what it is and why it exists",
                    "NPX – purpose and difference from NPM",
                    "NVM – managing multiple Node versions",
                    "package.json – structure and important fields",
                    "package-lock.json – why it exists",
                    "Dependencies vs DevDependencies",
                    ".npmrc – configuration",
                    ".env – environment variables",
                    ".gitignore – ignoring files"
                ],
                practicals: [
                    "Initialize a project using npm init",
                    "Install a dependency and a devDependency",
                    "Use npx to run a package without installing",
                    "Create .env file and access variables using process.env",
                    "Add node_modules to .gitignore",
                    "Mini project: scaffold a small Node app with npm scripts for dev, build, and lint",
                    "Mini project: create a CLI `info` command that prints Node version, OS info, and selected env vars"
                ],
                games: [
                    {
                        title: "WarriorJS",
                        url: "https://warriorjs.com/",
                        description: "Code your warrior through levels using JavaScript to delete enemies and rescue captives."
                    }
                ]
            },
            {
                phase: 3,
                title: "Core Modules",
                theory: [
                    "What are core modules",
                    "fs operation (fs.stat, fs.link, fs.unlink)",
                    {
                        title: "FS module",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=EJ3KeZf-p9E",
                                title: "Node.js Tutorial - 12 - fs Module",
                                duration: "05:40",
                                channel: "Codevolution"
                            }
                        ]
                    },
                    "Path module (join, resolve, basename)",
                    "OS module (platform, cpus, freemem)",
                    "URL module (parse, format, resolve)",
                    "Util module",
                    "Zlib module"
                ],
                practicals: [
                    "Read and write file using fs",
                    "Rename and delete a file",
                    "Check file stats using fs.stat",
                    "Use path.join, path.resolve, path.basename",
                    "Check OS platform, CPU info, free memory",
                    "Compress and decompress a file using zlib",
                    "Mini project: build a log rotation script that moves large log files into a compressed archive with timestamps",
                    "Mini project: create a small backup utility that zips a folder and writes a manifest file with checksums"
                ]
            },
            {
                phase: 4,
                title: "HTTP & Native Server",
                theory: [
                    "Create a server using http",
                    "Request and Response lifecycle objects",
                    "Handling HTTP status codes in Node",
                    "Routing requests manually",
                    "Sending different content types"
                ],
                practicals: [
                    "Create HTTP server using http module",
                    "Send plain text response",
                    "Handle basic routing with if conditions",
                    "Send different status codes (200, 403, 404)",
                    "Read request method and URL",
                    "Mini project: implement a small REST-style API for notes using only the http module and in-memory storage",
                    "Add basic logging middleware to your native server that logs method, URL, and response status"
                ]
            },
            {
                phase: 5,
                title: "Express.js Basics",
                theory: [
                    "Why Express is needed",
                    "Express vs http module",
                    "Creating Express server",
                    "app.use, app.get, app.post",
                    "express.json and express.urlencoded",
                    "bodyparser",
                    "Serving static files",
                    "View engines and templates",
                    "Partials & Template Inheritance"
                ],
                practicals: [
                    "Create Express server",
                    "Create GET and POST routes",
                    "Parse JSON request body",
                    "Serve static HTML file",
                    "Render template using view engine",
                    "Mini project: build a simple blog API with CRUD endpoints for posts and in-memory data",
                    "Mini project: create a feedback form page that posts data to an Express route and renders a thank-you page"
                ]
            },
            {
                phase: 6,
                title: "Express Middleware & Routing",
                theory: [
                    "What is middleware",
                    "Types of middleware",
                    "Custom middleware creation",
                    "app.set and app.locals",
                    "Dynamic routing",
                    "Query parameters",
                    "Path parameters",
                    "req.params vs req.query",
                    "Query vs Params",
                    "Router Chaining"
                ],
                practicals: [
                    "Create middleware to log request time",
                    "Block POST requests using middleware",
                    "Create dynamic routes",
                    "Read query and path params",
                    "Chain routes using router",
                    "Mini project: implement an Express router for /products with list, detail, search, and filter by query params",
                    "Add a centralized error-handling middleware that formats all API errors consistently"
                ]
            },
            {
                phase: 7,
                title: "HTTP Methods & Headers",
                theory: [
                    "Implementing PUT and PATCH logic",
                    "Handling custom headers",
                    "Handling OPTIONS/Preflight requests in Node",
                    "Setting status codes (201, 204) programmatically"
                ],
                practicals: [
                    "Create PUT and PATCH routes",
                    "Send custom headers in response",
                    "Handle OPTIONS request",
                    "Return 201 vs 204 status",
                    "Validate request method",
                    "Mini project: design a RESTful API for a todo resource implementing GET/POST/PUT/PATCH/DELETE with proper status codes and headers"
                ]
            },
            {
                phase: 8,
                title: "Sessions, Cookies & Async Patterns",
                theory: [
                    "Cookies, Sessions, Session vs Cookies",
                    "express-session middleware",
                    "Cookie flags and expiry",
                    "maxAge vs Expires",
                    "Cookie vs sessionStorage vs localStorage",
                    "Browser Cache & Storage in detail",
                    "Disadvantages of Cookies",
                    "The Node.js Event Loop",
                    "EventEmitter Class & Observer Pattern",
                    "process.nextTick vs setImmediate vs setTimeout",
                    "Promisify (util.promisify) & Callback-to-Promise",
                    "Worker Threads for CPU-intensive tasks",
                    "Concurrency vs Parallelism"
                ],
                practicals: [
                    "Set and read cookies using express-session",
                    "Compare cookie and session behavior",
                    "Build custom Event Logger using EventEmitter",
                    "Observe execution order: nextTick vs setImmediate vs Promise",
                    "Convert legacy callback API to Promise using promisify",
                    "Offload heavy calculation to Worker Thread",
                    "Mini project: implement a simple login/session system using express-session and cookies for a small dashboard",
                    "Mini project: create an event-driven notification system where different modules subscribe to and react to events (e.g., USER_REGISTERED, ORDER_PLACED)"
                ],
                games: [
                    {
                        title: "Node.js Event Loop Visualizer",
                        url: "https://www.jsv9000.app/",
                        description: "Interactive visualization of the JavaScript Event Loop, Task Queue, and Microtask Queue."
                    }
                ]
            },
            {
                phase: 9,
                title: "Streams, Buffers & Files",
                theory: [
                    "Buffer",
                    "Buffer Class",
                    "Streams",
                    "Types of streams",
                    "Duplex vs Transform streams",
                    "Piping"
                ],
                practicals: [
                    "Read file using stream",
                    "Write file using stream",
                    "Pipe read stream to write stream",
                    "Transform stream to modify data",
                    "Mini project: build a CSV-to-JSON converter using readable/writable/transform streams",
                    "Mini project: implement a streaming file upload proxy that writes incoming data to disk while reporting progress"
                ],
                games: []
            },
            {
                phase: 10,
                title: "Backend Security Implementation",
                theory: [
                    "Implementing Authentication (Passport/Custom strategies)",
                    "Implementing RBAC Middleware",
                    "Using `cors` middleware",
                    "Setting Security Headers with `helmet`",
                    "Implementing CSRF Protection (csurf)",
                    "Using `bcrypt` for password hashing",
                    "Implementing Rate Limiting (express-rate-limit)"
                ],
                practicals: [
                    "Enable CORS in Express",
                    "Generate and verify JWT",
                    "Hash password using bcrypt",
                    "Apply rate limiting middleware",
                    "Mini project: build a full auth flow with signup/login/logout, hashed passwords, and JWT-based protected routes",
                    "Mini project: implement role-based access control (admin/user) for a small admin panel using middleware"
                ]
            },
            {
                phase: 11,
                title: "Advanced Node.js & Scalability",
                theory: [
                    "Node.js Module Resolution (CJS vs ESM Interop)",
                    "Environment variables and command-line arguments",
                    "Worker threads for parallel processing",
                    "Cluster module for multi-core utilization",
                    "Child processes (spawn, fork, exec)",
                    "Fork vs Spawn",
                    "exec vs execFile",
                    "Exit Codes in Node.js",
                    "WebSockets for real-time communication",
                    "Webhooks implementation",
                    "MVC architecture pattern",
                    "Reactor Pattern",
                    "ODM (Object-Document Mapper)",
                    "Microtask Queue vs Macrotask Queue (Detailed)",
                    "Thread Pool & Starvation",
                    "Content Negotiation & API Versioning"
                ],
                practicals: [
                    "Use CommonJS and ESM modules",
                    "Create worker thread for CPU-intensive task",
                    "Fork child process",
                    "Implement basic WebSocket server",
                    "Structure project using MVC pattern",
                    "Mini project: build a real-time chat server with WebSockets and a simple CLI or browser client",
                    "Mini project: create a background job processor using worker threads or child processes to handle CPU-heavy tasks off the main server"
                ]
            },
            {
                phase: 12,
                title: "Testing & Quality Assurance",
                theory: [
                    "Setting up Jest for Node.js",
                    "Supertest for API endpoint testing",
                    "Mocking Dependencies in Node (jest.mock)",
                    "Testing Database Interactions (In-memory MongoDB)",
                    "Code Coverage Reports"
                ],
                practicals: [
                    "Install and configure Jest",
                    "Write a simple unit test for a helper function",
                    "Setup Supertest with an Express app",
                    "Write an integration test for a generic API route",
                    "Mock a database response in a controller test",
                    "Generate and analyze a code coverage report",
                    "Refactor legacy code safely using tests"
                ]
            }
        ]
    }
};
