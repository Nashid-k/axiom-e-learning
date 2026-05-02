export const SYSTEM_DESIGN_PROJECTS = {
    fileName: "system-design-projects",
    rules: {
        category: "System Design",
        subDescription: "Put on your Architect's Hard Hat. Build the blueprints for scalable cities, traffic-proof highways, and utility grids that never fail.",
        studyOrder: "Strict",
        progression: "Metropolis Foundations → Infrastructure Grid → City Operations",
        alignment: "Mapped strictly to the consolidated System Design syllabus"
    },
    individualProjects: [
        {
            id: 1,
            systemDesignLevel: "system-design",
            name: "The Skyscraper vs The Village (Scaling)",
            difficulty: "Medium",
            features: ["Design a scaling plan for a social app hitting 1M users", "Simulate 'Vertical' vs 'Horizontal' costs and benefits", "Implement a 'Disaster Recovery' plan for a city outage"],
            concepts: ["Scaling Patterns", "Reliability"]
        },
        {
            id: 2,
            systemDesignLevel: "system-design",
            name: "Zoning Board Review (CAP Trade-offs)",
            difficulty: "Medium",
            features: ["Compare 'Zoning Laws' for 3 different city types (Bank, Chat, News)", "Identify which part of the CAP Theorem to break for each", "Draft a 'Service Level Agreement' for the citizens"],
            concepts: ["CAP Theorem", "Trade-offs"]
        },
        {
            id: 3,
            systemDesignLevel: "system-design",
            name: "The Traffic Controller (Load Balancing)",
            difficulty: "Hard",
            features: ["Setup a Load Balancer to distribute traffic to 3 buildings", "Implement 'Health Checks' to automatically bypass a broken building", "Configure 'VIP Lanes' (Priority) for premium traffic"],
            concepts: ["Load Balancing", "High Availability"]
        },
        {
            id: 4,
            systemDesignLevel: "system-design",
            name: "The Local Store Network (Caching)",
            difficulty: "Hard",
            features: ["Implement a multi-level cache (Browser → CDN → Redis)", "Design a 'Shelf Clearing' policy (LRU) for out-of-date stock", "Measure the speed difference between 'Local Store' and 'Main Warehouse'"],
            concepts: ["Caching Layers", "Latency Reduction"]
        },
        {
            id: 5,
            systemDesignLevel: "system-design",
            name: "The Power Grid (Microservices)",
            difficulty: "Very Hard",
            features: ["Break a giant Monolith into 3 utility services", "Setup an 'API Gateway' receptionist to handle visitor requests", "Implement a 'Circuit Breaker' to stop a localized fire from spreading"],
            concepts: ["Microservices", "Resilience"]
        },
        {
            id: 6,
            systemDesignLevel: "system-design",
            name: "The Daily Post (Message Queues)",
            difficulty: "Very Hard",
            features: ["Build an event-driven notification system using a post office (Queue)", "Ensure 'Certified Mail' delivery even if the receiver is sleeping", "Setup a 'Dead Letter Office' for undelivered mail"],
            concepts: ["Async Processing", "Message Reliability"]
        }
    ]
};
