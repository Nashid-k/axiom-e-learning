import { CurriculumData } from '@/types';

export const DSA_CURRICULUM: Record<string, CurriculumData> = {
    "dsa-1": {
        fileName: "dsa-1",
        description: "AI-Assisted DSA Foundations",
        category: "DSA",
        subDescription: "Master fundamental data structures while utilizing AI models for algorithmic visualization, explanation, and complexity analysis.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Algorithmic Thinking & AI Prompts",
                targetExperience: ["1yoe"],
                theory: [
                    "Complexity Analysis: Measuring how fast we can move goods",
                    "Big O Notation: The Worst-Case delivery time",
                    "How to prompt an LLM to explain Big O for custom algorithms"
                ],
                practicals: [
                    "Analyze a single loop 'Inventory Check'",
                    "Use AI to trace the execution steps of a simple array iteration"
                ]
            },
            {
                phase: 2,
                title: "Standard Containers: Arrays & Strings",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Arrays: Fixed-size vs Dynamic allocations",
                    "Strings: Immutability and standard transformations",
                    "Two-Pointer Technique: Having two workers scan from both ends",
                    "Writing clear logic vs asking AI to 'solve' it"
                ],
                practicals: [
                    "Reverse an inventory array in-place without AI, then compare with AI's optimal solution",
                    "Identify if a string is a palindrome"
                ]
            },
            {
                phase: 3,
                title: "Linked Lists & Pointers",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Linked Lists: Node-based memory structures",
                    "Fast & Slow Pointers: The 'Tortoise and Hare' inspection strategy",
                    "Cycle Detection: Finding a loop in the rail line",
                    "How LLMs struggle with pointer manipulation and how to guide them"
                ],
                practicals: [
                    "Connect a broken rail line (Linked List reversal)",
                    "Prompt an LLM to find the middle node of a linked list and fix its boundary errors"
                ]
            },
            {
                phase: 4,
                title: "Recursion & Trees",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Recursion: The Call Stack and Base Cases",
                    "Binary Trees: Branched decision paths",
                    "Traversals (BFS/DFS): Ways to visit every node",
                    "Generating structural trees via AI text representations (Mermaid JS)"
                ],
                practicals: [
                    "Calculate 'Factorials' recursively",
                    "Generate a 'Fibonacci' tree diagram using ChatGPT and Mermaid"
                ]
            },
            {
                phase: 5,
                title: "Graphs & Dynamic Programming",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Graphs: A web of cities (Nodes) and roads (Edges)",
                    "Dijkstra's Algorithm: Finding the fastest GPS route",
                    "Dynamic Programming: Memoization and state transitions",
                    "Using AI Copilots to draft DP state transitions and debug subproblems"
                ],
                practicals: [
                    "Find the shortest path between two cities on a map",
                    "Solve the 'Coin Change' problem using AI for DP optimization"
                ]
            }
        ]
    },
    "dsa-questions": {
        id: "dsa-questions",
        fileName: "dsa-questions",
        description: "AI-Augmented Code Challenge Prep",
        category: "DSA",
        subDescription: "Master technical interviews while leveraging AI tools for mock interviews and algorithm refinement.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Complexity & Basic Structures",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Big O Notation: Analyzing Worst-Case Performance",
                    "Hash Collisions: Chaining vs Open Addressing",
                    "Conducting mock interviews with AI voices"
                ],
                practicals: [
                    "Explain why Hash Table operations are O(1) average time",
                    "Use ChatGPT Voice Mode for a mock string manipulation interview"
                ]
            },
            {
                phase: 2,
                title: "Advanced Structures & Optimization",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "Trees & BST: Balanced search hierarchies",
                    "Heaps: Managing Priority Queue order",
                    "Dynamic Programming: Memoization vs Tabulation",
                    "System Design overlaps with DSA"
                ],
                practicals: [
                    "Perform tree traversal sequences",
                    "Explain a DP tabulation matrix to an AI acting as a junior developer"
                ]
            }
        ]
    }
};
