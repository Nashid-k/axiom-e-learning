import { CurriculumData } from '@/types';

export const INTERVIEW_PREP_CURRICULUM: Record<string, CurriculumData> = {
    "interview-1": {
        id: "interview-1",
        fileName: "interview-1",
        description: "The Scout's Report (Foundations & Internals)",
        category: "Interview Prep",
        subDescription: "Master the 'Physics of the Game'. A deep dive into JS Internals, Call Stacks, closures, and TypeScript's elite type system. Prove you know the ball's path before it's kicked.",
        phases: [
            {
                phase: 1,
                title: "Core Mechanics: JS Internals",
                theory: [
                    "Execution Context & Call Stack (The game clock and field position)",
                    "Hoisting & TDZ (Predicting player movement before the whistle)",
                    "Closures & Lexical Scope (The player's 'memory' of the play)",
                    "The Event Loop & Queues (Managing multiple balls on the field)",
                    "Explicit vs Implicit Binding (Team captain orders vs natural play)",
                    "Prototypal Inheritance (Passing traits down from legend players)",
                    "Garbage Collection & Memory Leaks (Clearing the field of debris)"
                ],
                practicals: [
                    "Implement a polyfill for `Array.prototype.reduce`",
                    "Build a custom `Promise` class to understand sync/async flow",
                    "Create a `debounce` function to limit player actions",
                    "Fix a memory leak in a high-speed simulation"
                ]
            },
            {
                phase: 2,
                title: "The Elite Equipment: TypeScript",
                theory: [
                    "Interface vs Type (The contract vs the player profile)",
                    "Generics (Creating versatile player roles)",
                    "Union vs Intersection (Hybrid positions on the field)",
                    "Utility Types: Partial, Pick, Omit (Customizing the player's kit)",
                    "Conditional Types & Infer (Smart scouting rules)",
                    "Mapped Types (Automating player stats updates)",
                    "Type Guards & Discriminated Unions (The referee's decision logic)"
                ],
                practicals: [
                    "Implement a type-safe Event Emitter for game events",
                    "Create a complex Discriminated Union for API response states",
                    "Draft a generic `useFetch` hook with strict typing",
                    "Build a utility type that makes specific properties optional"
                ]
            }
        ]
    },
    "interview-2": {
        id: "interview-2",
        fileName: "interview-2",
        description: "The Team Playbook (Full-Stack Mastery)",
        category: "Interview Prep",
        subDescription: "Master 'Team Coordination'. Learn advanced React architecture, Node.js infrastructure, and the art of Full-Stack communication. Play like a pro champion.",
        phases: [
            {
                phase: 1,
                title: "Attack Strategy: React Patterns",
                theory: [
                    "Virtual DOM & Reconciliation (The blueprint vs the actual city)",
                    "Hooks Internals: useState/useEffect (The player's state and side-effects)",
                    "Performance: useMemo/useCallback (Optimizing the player's energy)",
                    "Design Patterns: HOC, Render Props, Compound Components",
                    "State Management: Context vs Redux/Zustand (Local huddle vs Coach's orders)",
                    "React 18: Transitions & Concurrent Mode (Handling high-pressure crowds)",
                    "Server Components (RSC): Moving the play to the back-office"
                ],
                practicals: [
                    "Build a Compound Component (e.g., `<Toggle>`) for UI flexibility",
                    "Implement an Infinite Scroll 'News Feed' for the stadium news",
                    "Optimize a slow list using memoization and windowing",
                    "Create a custom `useLocalStorage` hook for persistent player stats"
                ]
            },
            {
                phase: 2,
                title: "Defense Infrastructure: Node.js",
                theory: [
                    "Event Loop Phases (The back-office processing cycle)",
                    "Streams & Buffers (Handling the firehose of data)",
                    "Cluster vs Worker Threads (Multiplying the staff to handle fans)",
                    "JWT & OAuth Flow (Security guards and tickets)",
                    "Scalability: Horizontal vs Vertical (More stadiums vs bigger stadiums)",
                    "Database Optimization: Indexing & Sharding (The archive and the vaults)",
                    "Microservices vs Monolith (Specialized departments vs one big office)"
                ],
                practicals: [
                    "Implement a JWT authentication middleware with refresh tokens",
                    "Create a high-speed log aggregator using Node Streams",
                    "Setup a Cluster to utilize all CPU cores for high traffic",
                    "Design a Rate Limiter to prevent stadium gate crashes"
                ]
            }
        ]
    },
    "interview-3": {
        id: "interview-3",
        fileName: "interview-3",
        description: "The Championship Strategy (Design & Skills)",
        category: "Interview Prep",
        subDescription: "Winning the title. Master High-Level System Design, DSA Patterns for complex problem solving, and the Locker Room talk (Behavioral mastery).",
        phases: [
            {
                phase: 1,
                title: "Stadium Design: System Architecture",
                theory: [
                    "Frontend System Design: The RADIO framework",
                    "Critical Rendering Path & Performance (The speed of entry)",
                    "Web Vitals (LCP, FID, CLS): The stadium's health rating",
                    "Accessibility (A11y): Ensuring every fan can enjoy the game",
                    "Scaling UI: Component Libraries & Micro-Frontends",
                    "Real-time Data: WebSockets vs Polling (Live scoreboards)",
                    "Security: XSS, CSRF (Protecting the fans and the players)"
                ],
                practicals: [
                    "Draft an API interface for a Global Chat/Comment System",
                    "Design the state shape for a complex E-commerce 'Draft Board'",
                    "Plan the architecture for a Video Streaming platform",
                    "Perform an Accessibility audit on a complex dashboard"
                ]
            },
            {
                phase: 2,
                title: "Winning Plays: DSA Patterns",
                theory: [
                    "The Physics of Choice: When to use Hash Maps vs Arrays",
                    "Two Pointers & Sliding Window (The fast break and the tight press)",
                    "BFS vs DFS (Exploring the field vs targeting the goal)",
                    "Dynamic Programming (Learning from past plays to win the match)",
                    "Backtracking (Revisiting decisions to find the winning path)",
                    "Complexities: Big O (The efficiency of the team's training)"
                ],
                practicals: [
                    "Solve: Longest Substring Without Repeating (Sliding Window)",
                    "Solve: Number of Islands (Graph DFS/BFS)",
                    "Solve: Climbing Stairs (Dynamic Programming)",
                    "Solve: Merge Intervals (Sorting & Logic)"
                ]
            },
            {
                phase: 3,
                title: "Locker Room Talk: Behavioral",
                theory: [
                    "The STAR Method (Situation, Task, Action, Result)",
                    "Handling Conflict: The teammate disagreement play",
                    "Demonstrating Leadership: Captaining the squad during a crisis",
                    "Technical Communication: Explaining tactics to the owners",
                    "The Growth Mindset: Analysis of past failures"
                ],
                practicals: [
                    "Prepare a 2-minute elevator pitch for the 'Scout'",
                    "Draft 3 detailed STAR stories for major career milestones",
                    "Practice 'Whiteboard Communication' for complex designs"
                ]
            }
        ]
    },
    "interview-questions": {
        id: "interview-questions",
        fileName: "interview-questions",
        description: "The Draft Board (300+ Q&A Bank)",
        category: "Interview Prep",
        subDescription: "The definitive vault. Master the vocabulary of the Premier League to prove you belong in the top flight.",
        phases: [
            {
                phase: 1,
                title: "Junior Prospect",
                theory: [
                    "Difference between == and === (Type Coercion)",
                    "What is Hoisting? (The variable lift)",
                    "React: Prop Drilling vs Context",
                    "JS: The difference between null and undefined",
                    "TS: interface vs type",
                    "Node: express middleware basics"
                ],
                practicals: [
                    "Explain 'Closures' using a 'Backpack' analogy",
                    "Differentiate 'Arrow' vs 'Regular' functions"
                ]
            },
            {
                phase: 2,
                title: "Senior Captain",
                theory: [
                    "Event Loop detailed mechanics (The staff cycle)",
                    "React Reconciliation (Tree diffing)",
                    "Micro-Services deployment strategies",
                    "System Design: Database Sharding vs Replication",
                    "Advanced TS: Conditional & Mapped types",
                    "The impact of 'State Colocation' in React"
                ],
                practicals: [
                    "Design a recovery plan for a 'Global App Crash'",
                    "Optimize a slow API that is holding up the 'Team Play'"
                ]
            }
        ]
    }
};
