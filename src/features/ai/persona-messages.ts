
export interface PersonaMessage {
    general: string;
    buddy: string;
    expert?: {
        general: string;
        buddy: string;
    }
}

export const PERSONA_MESSAGES: Record<string, PersonaMessage> = {
    'React': {
        general: "Focus on component purity, memoization, and the re-render cycle.",
        buddy: "Think of React components like LEGO bricks — snap them together to build anything! 🧱",
        expert: {
            general: "Advanced: Optimize with useDeferredValue and Transition APIs for complex state updates.",
            buddy: "You're a React architect now! Time to build silky-smooth, high-perf UIs! 🚀"
        }
    },
    'Next.js': {
        general: "Consider server-side rendering implications and hydration boundaries.",
        buddy: "Next.js is like a smart restaurant: some dishes are pre-cooked so they reach you faster! 🍳",
        expert: {
            general: "Optimization: Fine-tune ISR revalidation and middleware edge execution.",
            buddy: "Your apps are lightning fast! Let's push the bleeding edge of what's possible! ⚡"
        }
    },
    'DSA': {
        general: "Analyze time and space complexity. Brute force is unacceptable.",
        buddy: "Algorithms are just recipes — we want the one that cooks the fastest! 🧑‍🍳",
        expert: {
            general: "Heuristic: When dealing with NP-complete problems, look for approximation algorithms.",
            buddy: "Your logic is razor-sharp! You're finding the most elegant solutions every time! 💎"
        }
    },
    'JavaScript': {
        general: "Understand the event loop and closure scope. Avoid blocking the main thread.",
        buddy: "JavaScript is the brain of the web — it decides what happens and when! 🧠",
        expert: {
            general: "Deep Dive: Leverage Web Workers and structured cloning for parallel computation.",
            buddy: "You're a JS wizard! Those async flows are clean and production-grade! 🧙‍♂️"
        }
    },
    'TypeScript': {
        general: "Strict typing is mandatory. Use interfaces for extensibility.",
        buddy: "TypeScript is like a spell-checker for your code — it catches mistakes before they happen! 🛡️",
        expert: {
            general: "Advanced: Use Template Literal Types and Conditional Types for maximum type safety.",
            buddy: "No more `any` for you! Your types are bulletproof and incredibly defensive! 🔥"
        }
    },
    'MongoDB': {
        general: "Document design drives query performance. Embed for locality, reference for flexibility.",
        buddy: "MongoDB is like a filing cabinet where each drawer can hold different-shaped folders! 🗄️",
        expert: {
            general: "Production: Design compound indexes aligned with your query patterns for covered queries.",
            buddy: "Your aggregation pipelines are chef's kiss! Time to flex those sharding skills! 🍣"
        }
    },
    'SQL': {
        general: "Normalize thoughtfully. Join performance depends on index strategy.",
        buddy: "SQL is like asking very specific questions to a very organized librarian! 📚",
        expert: {
            general: "Optimization: Analyze execution plans and consider materialized views for heavy reads.",
            buddy: "Your queries are surgical! Window functions and CTEs like a pro! 🎯"
        }
    },
    'NodeJS': {
        general: "Non-blocking I/O is the core contract. Respect the event loop.",
        buddy: "Node.js is like a super-efficient waiter juggling many orders at once! 🎪",
        expert: {
            general: "Architecture: Use worker threads for CPU-bound tasks and streams for memory efficiency.",
            buddy: "You're building enterprise-grade backends! Your error handling is rock solid! 🏗️"
        }
    },
    'DevOps': {
        general: "Infrastructure as Code. Every environment must be reproducible.",
        buddy: "DevOps is like building an assembly line — automate everything so nothing breaks! 🏭",
        expert: {
            general: "Strategy: Implement blue-green deployments and chaos engineering for resilience.",
            buddy: "Your CI/CD pipelines are works of art! Zero-downtime deployments like a boss! 🎨"
        }
    },
    'System Design': {
        general: "Start with requirements, then scale. Consistency vs availability is your first decision.",
        buddy: "System Design is like being a city planner — you decide where the roads, buildings, and pipes go! 🏙️",
        expert: {
            general: "Architecture: Consider event sourcing and CQRS for complex domain models at scale.",
            buddy: "You're thinking like a principal engineer! Your designs handle millions of users! 🌍"
        }
    },
    'HTML': {
        general: "Semantic markup is non-negotiable. Structure drives accessibility and SEO.",
        buddy: "HTML is the skeleton of every webpage — strong bones make everything else look great! 🦴",
        expert: {
            general: "Mastery: Leverage Web Components and Shadow DOM for truly encapsulated UI primitives.",
            buddy: "Your semantic HTML is pristine! Screen readers love your pages! ♿"
        }
    },
    'CSS': {
        general: "Layout with Grid and Flexbox. Avoid magic numbers. Think in systems.",
        buddy: "CSS is like dressing up your webpage — make it look stunning! 👗",
        expert: {
            general: "Refinement: CSS Container Queries and :has() selector for truly responsive component design.",
            buddy: "Your CSS is pixel-perfect! Those animations are smooth as butter! 🧈"
        }
    },
    'Git': {
        general: "Atomic commits. Meaningful messages. A clean history tells a story.",
        buddy: "Git is like a time machine for your code — you can always go back! ⏰",
        expert: {
            general: "Workflow: Interactive rebase and bisect are your power tools for large codebases.",
            buddy: "Your git log reads like poetry! Cherry-picks and rebases like a pro! 📖"
        }
    },
    'Testing': {
        general: "Test behavior, not implementation. The testing pyramid guides your strategy.",
        buddy: "Testing is like proofreading — catch the typos before the reader does! 🔍",
        expert: {
            general: "Strategy: Property-based testing and mutation testing for robust test suites.",
            buddy: "Your test coverage is legendary! Mocks and fixtures are chef's kiss! 📋"
        }
    },
    'Networking': {
        general: "Understand the OSI model. Every layer solves a specific problem.",
        buddy: "Networking is like a postal system — packets are letters finding their way to mailboxes! 📬",
        expert: {
            general: "Deep Dive: Analyze TCP congestion control algorithms and HTTP/3's QUIC protocol.",
            buddy: "You understand packets like a network surgeon! Wireshark is your stethoscope! 🩺"
        }
    },
    'Operating Systems': {
        general: "Processes, threads, and memory. The OS is the orchestra conductor.",
        buddy: "The OS is like a traffic controller at a busy intersection — managing who goes first! 🚦",
        expert: {
            general: "Architecture: Virtual memory, page replacement algorithms, and kernel-space optimization.",
            buddy: "You're thinking at the systems level! Context switches and page faults? No sweat! 💪"
        }
    },
    'Interview Prep': {
        general: "Communicate your thought process. Ask clarifying questions. Optimize iteratively.",
        buddy: "Interviews are just conversations about how you think — let's make your thinking shine! 💡",
        expert: {
            general: "Strategy: Lead with trade-off analysis and demonstrate system-level thinking.",
            buddy: "You're interview-ready! Your explanations are clear, confident, and impressive! 🎤"
        }
    },
    'Python': {
        general: "Pythonic code is readable code. Follow PEP 8 and embrace duck typing.",
        buddy: "Python reads almost like English — it's the friendliest language to learn! 🐍",
        expert: {
            general: "Advanced: Use decorators, metaclasses, and async generators for elegant abstractions.",
            buddy: "Your Python is Pythonic perfection! Comprehensions and generators everywhere! ✨"
        }
    },
    'NestJS': {
        general: "Dependency injection and decorators are the foundation. Think modularly.",
        buddy: "NestJS is like a well-organized office — every department has its own room! 🏢",
        expert: {
            general: "Architecture: Custom decorators, interceptors, and microservice patterns for scale.",
            buddy: "Your NestJS architecture is enterprise-grade! Clean, modular, and scalable! 🏛️"
        }
    },
    'Web Fundamentals': {
        general: "HTTP, CORS, security headers — the invisible infrastructure of the web.",
        buddy: "Web Fundamentals are like understanding how roads work before you drive on them! 🛣️",
        expert: {
            general: "Mastery: Content Security Policy, HSTS preloading, and performance budgets.",
            buddy: "You understand the web at its deepest level! Lighthouse scores through the roof! 🏆"
        }
    },
    'default': {
        general: "Focus on the architectural implications. Efficiency is not optional.",
        buddy: "Let's break this down step by step — you've totally got this! ✨",
        expert: {
            general: "Refinement: Look for micro-optimizations in the hot paths of your implementation.",
            buddy: "Incredible progress! You're operating at a professional level. Keep pushing! 🌟"
        }
    }
};

export const getPersonaMessage = (
    category: string | undefined,
    persona: 'general' | 'buddy',
    masteryPercentage: number = 0
): string => {
    const isExpert = masteryPercentage >= 70;
    const catKey = category || 'default';
    const messages = PERSONA_MESSAGES[catKey] || PERSONA_MESSAGES['default'];

    if (isExpert && messages.expert) {
        return messages.expert[persona];
    }

    return messages[persona];
};
