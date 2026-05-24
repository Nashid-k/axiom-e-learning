import { CurriculumData } from '@/types';

export const INTERVIEW_PREP_CURRICULUM: Record<string, CurriculumData> = {
    "interview-prep": {
        id: "interview-prep",
        fileName: "interview-prep",
        description: "The Premier League Draft (Full-Stack Mastery)",
        category: "Interview Prep",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        subDescription: "The championship strategy. Master JS internals, advanced React architecture, Node.js infrastructure, high-level system design, and the winning DSA patterns.",
        phases: [
            {
                phase: 1,
                title: "Core Mechanics: JS Internals",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Execution Context & Call Stack",
                    "Hoisting & TDZ",
                    "Closures & Lexical Scope",
                    "The Event Loop & Queues"
                ],
                practicals: [
                    "Implement a polyfill for `Array.prototype.reduce`",
                    "Build a custom `Promise` class to understand sync/async flow"
                ]
            },
            {
                phase: 2,
                title: "The Elite Equipment: TypeScript",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Interface vs Type",
                    "Generics",
                    "Union vs Intersection",
                    "Utility Types: Partial, Pick, Omit",
                    "Conditional Types & Infer"
                ],
                practicals: [
                    "Implement a type-safe Event Emitter for game events",
                    "Create a complex Discriminated Union for API response states"
                ]
            },
            {
                phase: 3,
                title: "Attack Strategy: React Patterns",
                targetExperience: ["2yoe", "3yoe", "4yoe"],
                theory: [
                    "Virtual DOM & Reconciliation",
                    "Hooks Internals: useState/useEffect",
                    "Performance: useMemo/useCallback",
                    "Design Patterns: HOC, Render Props, Compound Components"
                ],
                practicals: [
                    "Build a Compound Component (e.g., `<Toggle>`) for UI flexibility",
                    "Implement an Infinite Scroll 'News Feed'"
                ]
            },
            {
                phase: 4,
                title: "System Design & AI Architecture",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Frontend System Design: The RADIO framework",
                    "Web Vitals (LCP, FID, CLS): The stadium's health rating",
                    "Scaling UI: Component Libraries & Micro-Frontends",
                    "Architecting Retrieval-Augmented Generation (RAG) Systems",
                    "Multi-Agent Orchestration & Vector DBs"
                ],
                practicals: [
                    "Draft an API interface for a Global Chat/Comment System",
                    "Design an architecture for an Enterprise AI Chatbot",
                    "Plan the architecture for a Video Streaming platform"
                ]
            }
        ]
    },
    "interview-questions": {
        id: "interview-questions",
        fileName: "interview-questions",
        description: "The Draft Board (300+ Q&A Bank)",
        category: "Interview Prep",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        subDescription: "The definitive vault. Master the vocabulary of the Premier League to prove you belong in the top flight.",
        phases: [
            {
                phase: 1,
                title: "Junior Prospect (1-2 YoE)",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Difference between == and === (Type Coercion)",
                    "What is Hoisting? (The variable lift)",
                    "React: Prop Drilling vs Context",
                    "JS: The difference between null and undefined"
                ],
                practicals: [
                    "Explain 'Closures' using a 'Backpack' analogy",
                    "Differentiate 'Arrow' vs 'Regular' functions"
                ]
            },
            {
                phase: 2,
                title: "Senior Captain (3-4 YoE)",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Event Loop detailed mechanics (The staff cycle)",
                    "React Reconciliation (Tree diffing)",
                    "Micro-Services deployment strategies",
                    "System Design: Database Sharding vs Replication"
                ],
                practicals: [
                    "Design a recovery plan for a 'Global App Crash'",
                    "Optimize a slow API that is holding up the 'Team Play'"
                ]
            },
            {
                phase: 3,
                title: "Principal Architect & AI (4+ YoE)",
                targetExperience: ["4+yoe"],
                theory: [
                    "Trade-offs between different Vector Databases (Pinecone vs pgvector)",
                    "Designing secure sandboxes for Code-executing LLMs",
                    "Optimizing LLM response latency via TTFT tracking",
                    "Zero-Trust patterns in Agentic workflows"
                ],
                practicals: [
                    "Whiteboard a multi-agent routing system",
                    "Debate fine-tuning vs RAG for a given use case"
                ]
            }
        ]
    }
};
