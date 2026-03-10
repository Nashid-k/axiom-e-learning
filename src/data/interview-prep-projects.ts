export const INTERVIEW_PREP_PROJECTS = {
    fileName: "interview-prep-projects",
    rules: {
        category: "Interview Prep",
        subDescription: "Prepare for the Draft. Build 'Physics-Defying' internls, 'Team-Ready' full-stack apps, and 'Championship-Winning' systems.",
        studyOrder: "Strict",
        progression: "The Scout's Report → The Team Playbook → The Championship Strategy",
        alignment: "Mapped strictly to interview-1, interview-2, interview-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            interviewLevel: "interview-1",
            name: "The Physics Engine (JS Internals)",
            difficulty: "Hard",
            features: ["Implement a custom Promise class with .then() and .catch()", "Create a deep clone utility handling circular references", "Build a high-performance Event Emitter for game state"],
            concepts: ["JS Internals", "Closures", "Prototypes"]
        },
        {
            id: 2,
            interviewLevel: "interview-1",
            name: "The Elite Scouting App (TypeScript)",
            difficulty: "Hard",
            features: ["Design a type-safe player registry using Discriminated Unions", "Create utility types that automate 'Scout Report' generation", "Implement generic data fetchers with strict return type inference"],
            concepts: ["Generics", "Conditional Types", "Type Safety"]
        },
        {
            id: 3,
            interviewLevel: "interview-2",
            name: "The Team Coordinator (React Patterns)",
            difficulty: "Hard",
            features: ["Build a multi-step 'Contract Negotiation' flow using Compound Components", "Optimize a massive list of 10,000 players using Windowing", "Implement a custom Context provider with performance selectors"],
            concepts: ["React Patterns", "Performance Optimization"]
        },
        {
            id: 4,
            interviewLevel: "interview-2",
            name: "The Secure Locker Room (Node.js)",
            difficulty: "Hard",
            features: ["Setup a secure JWT auth system with 'Refresh Token' rotation", "Implement a high-throughput video stream processor using Node Streams", "Design an automated 'Backup Scout' using Cluster & Worker Threads"],
            concepts: ["Backend Security", "Node Streams", "Concurrency"]
        },
        {
            id: 5,
            interviewLevel: "interview-3",
            name: "The Stadium Blueprint (System Design)",
            difficulty: "Very Hard",
            features: ["Draft a full High-Level Design for a video streaming service", "Optimize the 'Critical Rendering Path' for sub-second page loads", "Design a real-time 'Live Match' system using WebSockets & Pub/Sub"],
            concepts: ["System Design", "Scalability", "Real-time Data"]
        },
        {
            id: 6,
            interviewLevel: "interview-3",
            name: "The Winning Playbook (DSA & Soft Skills)",
            difficulty: "Very Hard",
            features: ["Solve 10 'Pro-Level' problems using Two Pointers & Sliding Window", "Create a 'Career Highlight Reel' document using the STAR method", "Conduct a 'Mock Draft' (Whiteboard interview) with a peer"],
            concepts: ["Problem Solving", "Communication", "Career Strategy"]
        }
    ]
};
