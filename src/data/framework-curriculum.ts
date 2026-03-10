import { CurriculumData } from '@/types';

export const NEXTJS_CURRICULUM: Record<string, CurriculumData> = {
    "nextjs-1": {
        fileName: "nextjs-1",
        description: "The Delivery Hub (Routing & Layouts)",
        category: "Next.js",
        subDescription: "Master the GPS of your delivery network. Learn how to map out routes, create shared delivery bags (layouts), and handle missing addresses (404s).",
        phases: [
            {
                phase: 1,
                title: "Setting up the Hub: Intro & Setup",
                theory: [
                    "Next.js vs React: The Delivery Network vs the Kitchen",
                    "Installation: Building the warehouse headquarters",
                    "Project Structure: Navigating the warehouse folders",
                    "The App Router: The modern GPS system"
                ],
                practicals: [
                    "Install a new Next.js 'Franchise'",
                    "Run the warehouse dev server"
                ]
            },
            {
                phase: 2,
                title: "Mapping the Routes: Navigation",
                theory: [
                    "Folder-based Routing: Each folder is a delivery destination",
                    "Nested Routes: Branching out your delivery network",
                    "Dynamic Routes [id]: Handling unique 'Order IDs' in the URL",
                    "The <Link> Component: The fast-track delivery line"
                ],
                practicals: [
                    "Create routes for '/menu', '/orders', and '/profile'",
                    "Build a dynamic route for specific 'Dish IDs'"
                ]
            },
            {
                phase: 3,
                title: "Shared Equipment: Layouts & Templates",
                theory: [
                    "Layouts: The permanent branding on every delivery truck",
                    "Root Layout: The master blueprint for the entire network",
                    "Nested Layouts: Specialized equipment for specific branches",
                    "Loading & Error UI: Displaying 'Cooking...' and 'Out of Stock' messages"
                ],
                practicals: [
                    "Create a shared Sidebar for the '/dashboard' branch",
                    "Implement a custom loading spinner for slow deliveries"
                ]
            }
        ]
    },
    "nextjs-2": {
        fileName: "nextjs-2",
        description: "The Warehouse Chef (Server vs Client)",
        category: "Next.js",
        subDescription: "Decide where to cook the food. Master Server Components (Warehouse) and Client Components (Customer's Table) for maximum speed.",
        phases: [
            {
                phase: 1,
                title: "Where to Cook? Server vs Client",
                theory: [
                    "Server Components: Pre-cooked at the warehouse (Secure & Fast)",
                    "Client Components: Cooking at the customer's table (Interactive)",
                    "The 'use client' Directive: Marking the table-side cooking zone",
                    "Composition Patterns: When to use the warehouse vs the table"
                ],
                practicals: [
                    "Build a fast 'Display Menu' (Server Component)",
                    "Build an interactive 'Review Button' (Client Component)"
                ]
            },
            {
                phase: 2,
                title: "Sourcing Ingredients: Data Fetching",
                theory: [
                    "Async Server Components: Fetching ingredients directly in the warehouse",
                    "Streaming & Suspense: Delivering the drinks while the main course is cooking",
                    "Caching: Keeping common ingredients ready on the counter",
                    "Data Validation: Checking ingredient quality (Zod)"
                ],
                practicals: [
                    "Fetch a list of 'Top Dishes' from an API in a Server Component",
                    "Use 'Suspense' to show a skeleton while the food is prepared"
                ]
            },
            {
                phase: 3,
                title: "Freshness Control: Rendering Strategies",
                theory: [
                    "Static Rendering (SSG): Pre-packaged snacks (Instantly available)",
                    "Dynamic Rendering (SSR): Made-to-order meals (Fresh, but needs time)",
                    "ISR: Re-stocking the pre-packaged snacks every hour",
                    "Revalidation: Forcing a fresh batch of food when the menu changes"
                ],
                practicals: [
                    "Build a 'Daily Special' page that updates every 60 seconds (ISR)",
                    "Observe the speed difference between Static and Dynamic orders"
                ]
            }
        ]
    },
    "nextjs-3": {
        fileName: "nextjs-3",
        description: "The Global Franchise (Advanced & Deployment)",
        category: "Next.js",
        subDescription: "Scale your delivery network. Master Server Actions, Middleware, and shipping your franchise to the world.",
        phases: [
            {
                phase: 1,
                title: "The Direct Line: Server Actions",
                theory: [
                    "What are Server Actions? Sending orders directly to the chef",
                    "Form Handling: Securely capturing guest orders",
                    "Revalidating Paths: Updating the menu immediately after an order",
                    "Optimistic Updates: Displaying 'Order Received' before the chef even sees it"
                ],
                practicals: [
                    "Build a 'Contact the Franchise' form using Server Actions",
                    "Implement an 'Instant Like' count that feels lightning fast"
                ]
            },
            {
                phase: 2,
                title: "The Security Guard: Middleware & Auth",
                theory: [
                    "Middleware: The bouncer checking ID cards at the gate",
                    "Route Protection: Locking the 'Staff Only' kitchen doors",
                    "Authentication (NextAuth): Issuing ID badges to staff and guests",
                    "SEO & Metadata: Advertising your delivery network to Google"
                ],
                practicals: [
                    "Redirect unannounced guests away from the '/admin' route",
                    "Add custom logos and descriptions for social media sharing"
                ]
            },
            {
                phase: 3,
                title: "Grand Opening: Optimization & Deployment",
                theory: [
                    "Image Optimization: Compressing food photos for fast loading",
                    "Font & Script Optimization: Choosing the best delivery routes",
                    "Deploying to Vercel: Opening your franchise to the public",
                    "Environment Variables: Keeping the warehouse safe codes secret"
                ],
                practicals: [
                    "Optimize a heavy high-res food image using <Image />",
                    "Deploy your first Next.js project to the cloud"
                ]
            }
        ]
    },
    "nextjs-questions": {
        fileName: "nextjs-questions",
        description: "Next.js Interview Warehouse",
        category: "Next.js",
        subDescription: "40+ common questions about the modern delivery network. Master the 'Global Food Delivery' analogy for interviews.",
        phases: [
            {
                phase: 1,
                title: "Ground Floor: Fundamentals",
                theory: [
                    "Next.js vs Vanilla React (The Delivery Metaphor)",
                    "Server Components vs Client Components (Warehouse vs Table)",
                    "Why use the App Router? (The GPS argument)",
                    "SEO in Next.js (The Billboard Metaphor)"
                ],
                practicals: [
                    "Explain ISR using a 'Freshness Timer' analogy",
                    "Compare SSG and SSR using 'Pre-packaged' vs 'Cook-to-order'"
                ]
            },
            {
                phase: 2,
                title: "Second Floor: Advanced Logistics",
                theory: [
                    "Server Actions vs API Routes (Direct vs Middleman)",
                    "Hydration: Bringing the 'Dry' pre-cooked food to life at the table",
                    "Middleware use cases (The Bouncer Metaphor)",
                    "Caching levels in Next.js"
                ],
                practicals: [
                    "Solve a simulation where a 'Hydration Error' occurs",
                    "Write a 1-minute pitch on why Next.js is better for SEO"
                ]
            }
        ]
    }
};

export const NESTJS_CURRICULUM: Record<string, CurriculumData> = {
    "nestjs-1": {
        fileName: "nestjs-1",
        description: "The Office Headquarters (Foundations)",
        category: "NestJS",
        subDescription: "Welcome to the city government office. Learn the master blueprint (Architecture), how to talk to receptionists (Controllers), and hire specialists (Services).",
        phases: [
            {
                phase: 1,
                title: "Building the Headquarters: Architecture & CLI",
                theory: [
                    "NestJS vs Express: The Master Blueprint vs the Carpenter's Tool-belt",
                    "Installation & CLI: Setting up the office headquarters instantly",
                    "Module Structure: Dividing the building into departments",
                    "The Decorator Pattern: Adding 'Department Labels' to your code"
                ],
                practicals: [
                    "Install the NestJS CLI and create a new 'City Hall' building",
                    "Tour the default 'Root Department' (AppModule)"
                ]
            },
            {
                phase: 2,
                title: "The Receptionists: Controllers & Routing",
                theory: [
                    "What is a Controller? The front-desk receptionist",
                    "Routing: Directing citizens to the right window (/users, /orders)",
                    "Handling Documents (Request Body/Params): Reading citizens' forms",
                    "Sending Replies (Response): Handing back the processed paperwork"
                ],
                practicals: [
                    "Create a 'StaffController' with windows for hiring and firing",
                    "Read a 'Staff ID' from the URL to find a specific employee"
                ]
            },
            {
                phase: 3,
                title: "The Specialists: Providers & Services",
                theory: [
                    "What is a Service? The back-office specialist who does the work",
                    "Dependency Injection (DI): Hiring a specialist for the receptionist automatically",
                    "Injection Scopes: Is the specialist dedicated to one person or the whole building?",
                    "Custom Providers: Bringing in outside consultants"
                ],
                practicals: [
                    "Create a 'TaxService' that calculates math for the 'TaxController'",
                    "Register the service in the 'FinanceModule'"
                ]
            }
        ]
    },
    "nestjs-2": {
        fileName: "nestjs-2",
        description: "Rules & Regulations (Logic & Safety)",
        category: "NestJS",
        subDescription: "Enforce city laws. Hire security guards (Guards), hire stamp inspectors (Pipes), and use interpreters (Interceptors) to handle special requests.",
        phases: [
            {
                phase: 1,
                title: "The Security Guard: Guards & Auth",
                theory: [
                    "What is a Guard? The bouncer checking ID cards at the gate",
                    "Execution Context: Knowing which office the citizen is trying to enter",
                    "Role-based Access: Checking if the citizen is a 'VIP' or 'Admin'",
                    "Passport.js Integration: The global identification system"
                ],
                practicals: [
                    "Lock the 'MayorOfficeController' so only 'Admins' can enter",
                    "Implement a simple guard that checks for a 'Security Badge'"
                ]
            },
            {
                phase: 2,
                title: "The Stamp Inspector: Pipes & Validation",
                theory: [
                    "What is a Pipe? The inspector checking if forms are filled correctly",
                    "Transformation: Translating a string into a number automatically",
                    "Validation (class-validator): Ensuring an email actually looks like an email",
                    "Built-in Pipes: The standard inspection tools"
                ],
                practicals: [
                    "Install the 'Validation Inspector' (class-validator/class-transformer)",
                    "Create a 'ProjectForm' that errors if the 'Title' is too short"
                ]
            },
            {
                phase: 3,
                title: "The Interpreters: Interceptors & Filters",
                theory: [
                    "Interceptors: Modifying the paperwork before and after it hits the desk",
                    "Exception Filters: Handling 'Emergency Calls' (Errors) gracefully",
                    "Standardizing Responses: Ensuring all departments use the same letterhead",
                    "Logging: Keeping a record of every citizen who visited"
                ],
                practicals: [
                    "Create a 'UniformInterceptor' that wraps all replies in a standard box",
                    "Build a 'PanicFilter' to handle 404/500 errors with a friendly message"
                ]
            }
        ]
    },
    "nestjs-3": {
        fileName: "nestjs-3",
        description: "The City Network (Advanced Infrastructure)",
        category: "NestJS",
        subDescription: "Connect the city to the world. Master the Record Room (Databases), Global Security (JWT), and Regional Branches (Microservices).",
        phases: [
            {
                phase: 1,
                title: "The Record Room: Database Integration",
                theory: [
                    "TypeORM & Prisma: The digital filing cabinets",
                    "Entities & Repositories: Designing the folder structure",
                    "Migrations: Updating the filing cabinet drawers without losing data",
                    "Synchronize vs Migrations: Manual vs Automatic updates"
                ],
                practicals: [
                    "Connect your 'City Hall' to a PostgreSQL Record Room",
                    "Persist 'Citizen Records' using TypeORM decorators"
                ]
            },
            {
                phase: 2,
                title: "Global Security: JWT & Session Management",
                theory: [
                    "JWT Strategy: Issuing digital keys that never expire",
                    "Login Flow: Authenticating citizens and giving them a key",
                    "Secret Keys: The master codes for the city vault",
                    "Strategy & Local Auth: Traditional ID/Password checks"
                ],
                practicals: [
                    "Build a 'Login Window' that returns a signed JWT key",
                    "Use the JWT key to access a 'Private Library' route"
                ]
            },
            {
                phase: 3,
                title: "Regional Branches: Microservices",
                theory: [
                    "What are Microservices? Opening small satellite offices (Redis/TCP)",
                    "Message Patterns: Sending letters between offices",
                    "Event Patterns: Announcing news to all offices simultaneously",
                    "Testing & Deployment: Verifying the whole city works before going live"
                ],
                practicals: [
                    "Create a second 'MailOffice' service that talks to 'City Hall'",
                    "Simulate a power outage (Failure) and see how the offices recover"
                ]
            }
        ]
    },
    "nestjs-questions": {
        fileName: "nestjs-questions",
        description: "The Civil Service Exam (Interview Prep)",
        category: "NestJS",
        subDescription: "50+ common questions. Master the 'City Administration' vocabulary to prove you can manage complex systems.",
        phases: [
            {
                phase: 1,
                title: "Junior Administrator",
                theory: [
                    "NestJS vs Express (The Blueprint vs Tool-belt)",
                    "Dependency Injection (The Phone System analogy)",
                    "Providers vs Controllers (Specialists vs Receptionists)",
                    "Modules (Departmental isolation)"
                ],
                practicals: [
                    "Explain the lifecycle of a request using the 'Walking through the building' path",
                    "Differentiate 'Guard' vs 'Middleware' using the 'Gate' metaphor"
                ]
            },
            {
                phase: 2,
                title: "Senior Mayor",
                theory: [
                    "Circular Dependencies: When two departments get stuck waiting for each other",
                    "Dynamic Modules: Setting up a department that configures itself",
                    "Microservices Transports (Redis, RabbitMQ, Kafka)",
                    "Advanced Testing (Unit vs E2E in NestJS)"
                ],
                practicals: [
                    "Solve a simulation where two services are stuck in a loop",
                    "Optimize a database query that is slowing down the whole building"
                ]
            }
        ]
    }
};

export const PYTHON_CURRICULUM: Record<string, CurriculumData> = {
    "python-1": {
        fileName: "python-1",
        description: "The Writer's Foundations (Logic & OOP)",
        category: "Python",
        subDescription: "Welcome to the studio. Learn to write clean scripts, create memorable characters (Variables), and design scene rehearsals (Functions & OOP).",
        phases: [
            {
                phase: 1,
                title: "Drafting the Script: Syntax & Characters",
                theory: [
                    "Python Syntax: The Writer's shorthand",
                    "Variables & Types: Casting your characters (Strings, Integers, Lists)",
                    "Control Flow: Plot twists (if/else) and repetitive scenes (Loops)",
                    "Virtual Environments: The Private Rehearsal Room (venv)"
                ],
                practicals: [
                    "Write a 'Hello Studio' script",
                    "Design a character sheet using Dictionaries and Lists"
                ]
            },
            {
                phase: 2,
                title: "Scene Rehearsals: Functions & Modules",
                theory: [
                    "Functions: Reusable scene rehearsals",
                    "Arguments (*args, **kwargs): Giving actors flexible instructions",
                    "Decorators: Changing an actor's performance without rewriting the script",
                    "Modules & Pip: Borrowing scripts and costumes from the Global Props Shop"
                ],
                practicals: [
                    "Build a 'Scene Repeater' function with flexible arguments",
                    "Create a custom decorator that logs when a 'Scene' starts"
                ]
            },
            {
                phase: 3,
                title: "Character Prototypes: OOP & Errors",
                theory: [
                    "Classes & Objects: Blueprints for complex character types",
                    "Inheritance: Giving a 'Lead Actor' traits from a 'Supporting Actor'",
                    "Error Handling: Dealing with 'Forgotten Lines' (Exceptions)",
                    "File I/O: Reading and writing the final script files"
                ],
                practicals: [
                    "Build a 'CastMember' class with inheritance",
                    "Write a script that safely reads 'dialogue.txt' using a Context Manager"
                ]
            }
        ]
    },
    "python-2": {
        fileName: "python-2",
        description: "The Hollywood Studio (Django Full-Stack)",
        category: "Python",
        subDescription: "Step into the multi-million dollar production hub. Learn the Master Blueprint (MVT), the Record Room (ORM), and build high-quality film portals.",
        phases: [
            {
                phase: 1,
                title: "The Production Office: Django MVC/MVT",
                theory: [
                    "Django vs Others: The All-in-One Hollywood Studio",
                    "Project Structure: Navigating the production office folders",
                    "URLs & Views: Directing the audience to the right scene",
                    "Templates: The stage sets where the action happens"
                ],
                practicals: [
                    "Start a new 'Studio' project and 'Movies' app",
                    "Connect a URL to a 'Welcome to Hollywood' view"
                ]
            },
            {
                phase: 2,
                title: "The Film Archives: Models & ORM",
                theory: [
                    "Models: Designing the database filing cabinets",
                    "Migrations: Updating the record room without losing data",
                    "Django ORM: Talking to the record room in plain English",
                    "Admin Panel: The director's dashboard for managing records"
                ],
                practicals: [
                    "Create a 'Movie' model and sync it with the Record Room",
                    "Use the Admin dashboard to add three new 'Film' records"
                ]
            },
            {
                phase: 3,
                title: "Cast Interviews: Forms & DRF",
                theory: [
                    "Django Forms: Capturing citizen input on set",
                    "Django REST Framework (DRF): Opening an 'API Window' for other studios",
                    "Serializers: Translating film records into a universal language (JSON)",
                    "Authentication: Checking ID badges on the studio lot"
                ],
                practicals: [
                    "Build a 'Casting Call' form for new actors",
                    "Expose your Movie list through a DRF 'API Window'"
                ]
            }
        ]
    },
    "python-3": {
        fileName: "python-3",
        description: "Speed Dubbing & Production (FastAPI & Deployment)",
        category: "Python",
        subDescription: "Maximum speed. Master the Speed-Dubbing Booth (FastAPI), Background Workers (Celery), and Shipping to the world.",
        phases: [
            {
                phase: 1,
                title: "The Speed-Dubbing Booth: FastAPI",
                theory: [
                    "FastAPI Fundamentals: The specialized, high-speed API booth",
                    "Pydantic: Ensuring strict character scripts (Data Validation)",
                    "Async/Await: Handling multiple recordings at once",
                    "Path & Query Operations: Specialized recording controls"
                ],
                practicals: [
                    "Build a lightning-fast 'Subtitle API' with FastAPI",
                    "Validate a 'User Script' using Pydantic models"
                ]
            },
            {
                phase: 2,
                title: "The Back-Stage Crew: Celery & Task Queues",
                theory: [
                    "Asyncio vs Celery: Manual vs Automated background tasks",
                    "Task Queues: Sending heavy editing work to the back-stage crew",
                    "Redis: The messenger boy between the booth and the crew",
                    "WebSockets: Live updates from the production floor"
                ],
                practicals: [
                    "Offload a 'Heavy Script Export' task to a Celery worker",
                    "Implement a live 'Recording Status' update using WebSockets"
                ]
            },
            {
                phase: 3,
                title: "The Film Festival: Deployment & QA",
                theory: [
                    "GraphQL with Python: A smarter way to request film data",
                    "Pytest: Testing the script before the grand opening",
                    "Docker: Packaging the entire studio in a portable container",
                    "CI/CD: Automating the premiere process"
                ],
                practicals: [
                    "Write 'Script Review' tests using Pytest",
                    "Dockerize your 'Studio' for global distribution"
                ]
            }
        ]
    },
    "python-questions": {
        fileName: "python-questions",
        description: "The Script Review (Interview Prep)",
        category: "Python",
        subDescription: "50+ common questions. Master the 'Scriptwriter' vocabulary to impress production houses (Interviews).",
        phases: [
            {
                phase: 1,
                title: "Entry-Level Writer",
                theory: [
                    "Python Memory Management (The Studio's trash collector)",
                    "List vs Tuple vs Set (Different types of prop boxes)",
                    "Python's GIL (The 'One-Scene-at-a-Time' rule)",
                    "Virtual Environments (The Rehearsal Room metaphor)"
                ],
                practicals: [
                    "Explain 'Decorators' using the 'Actor's Outfit' analogy",
                    "Differentiate 'if' from 'switch/match' using script plot-twists"
                ]
            },
            {
                phase: 2,
                title: "Executive Producer",
                theory: [
                    "Django ORM Optimization (Faster Record Room retrieval)",
                    "Asyncio vs Multiprocessing (Parallel shoots)",
                    "Microservices with gRPC (Talking between satellite studios)",
                    "Testing strategies for large-scale productions"
                ],
                practicals: [
                    "Optimize a database query that is stalling the production",
                    "Design a scalable API for a 'Global Film Festival' traffic spike"
                ]
            }
        ]
    }
};
