import { CurriculumData } from '@/types';

export const DSA_CURRICULUM: Record<string, CurriculumData> = {
    "dsa-1": {
        fileName: "dsa-1",
        description: "The Warehouse Essentials (Foundations)",
        category: "DSA",
        subDescription: "Welcome to the central warehouse. Learn the basics of storage, tracking performance (Complexity), and managing basic containers like Arrays and Linked Lists.",
        phases: [
            {
                phase: 1,
                title: "Warehouse Performance: Big O Notation",
                theory: [
                    "Complexity Analysis: Measuring how fast we can move goods",
                    "Big O Notation: The Worst-Case delivery time",
                    "Time vs Space: Speed vs Warehouse storage space",
                    "Common Benchmarks: O(1), O(log n), O(n), O(n log n), O(n²)"
                ],
                practicals: [
                    "Analyze a single loop 'Inventory Check'",
                    "Identify the Big O of a nested 'Full Audit'"
                ]
            },
            {
                phase: 2,
                title: "Standard Containers: Arrays & Strings",
                theory: [
                    "Arrays: Fixed-size shipping containers (Fast access, expensive to resize)",
                    "Memory Layout: Contiguous storage units",
                    "Strings: The labels on the packages (Immutability)",
                    "Two-Pointer Technique: Having two workers scan from both ends"
                ],
                practicals: [
                    "Reverse an inventory array in-place",
                    "Identify if a string 'Label' is a palindrome"
                ]
            },
            {
                phase: 3,
                title: "Linked Rail Cars: Linked Lists",
                theory: [
                    "Linked Lists: Rail cars connected by hooks (Easy to add/remove anywhere)",
                    "Singly vs Doubly: One-way vs Two-way track system",
                    "Fast & Slow Pointers: The 'Tortoise and Hare' inspection strategy",
                    "Cycle Detection: Finding a loop in the rail line"
                ],
                practicals: [
                    "Connect a broken rail line (Linked List reversal)",
                    "Find the middle car of a long train"
                ]
            },
            {
                phase: 4,
                title: "Russian Doll Delivery: Recursion",
                theory: [
                    "What is Recursion? Opening a box that contains a smaller version of the same box",
                    "The Base Case: The smallest box that finally contains the item",
                    "The Call Stack: Keeping track of which boxes are currently open",
                    "Stack Overflow: Running out of space on the packing table"
                ],
                practicals: [
                    "Calculate 'Factorials' using the box-in-box method",
                    "Generate a 'Fibonacci' shipment schedule recursively"
                ]
            }
        ]
    },
    "dsa-2": {
        fileName: "dsa-2",
        description: "The Packing Station (Flow & Organization)",
        category: "DSA",
        subDescription: "Manage the flow of goods. Master the Loading Docks (Stacks/Queues), the Instant Search Shelves (Hash Tables), and the Sorting Conveyor Belt.",
        phases: [
            {
                phase: 1,
                title: "The Loading Docks: Stacks & Queues",
                theory: [
                    "Stacks (LIFO): The stack of cafeteria trays (Last one in, first one out)",
                    "Queues (FIFO): The ticket line (First one in, first one out)",
                    "Circular Queues: A revolving door for shipments",
                    "Priority Queues: The 'VIP Express' line for urgent packages"
                ],
                practicals: [
                    "Implement an 'Undo' button using a Stack",
                    "Design a 'Printer Spooler' using a Queue"
                ]
            },
            {
                phase: 2,
                title: "Instant Search Shelves: Hash Tables",
                theory: [
                    "Hash Tables: Magic shelves where you know exactly where an item is (O(1))",
                    "Hashing: Turning a package label into a shelf number",
                    "Collisions: When two boxes want the same shelf spot",
                    "Chaining vs Probing: Strategies for dealing with crowded shelves"
                ],
                practicals: [
                    "Find the 'First Unique Item' in a delivery stream",
                    "Count the frequency of labels in O(n) time"
                ]
            },
            {
                phase: 3,
                title: "The Sorting Belt: Common Algorithms",
                theory: [
                    "Bubble/Selection/Insertion: Simple, manual sorting (Small shipments)",
                    "Merge Sort: Divide & Conquer (Splitting piles and merging them back)",
                    "Quick Sort: Picking a 'Pivot' and organizing around it",
                    "Complexity Trade-offs: When to use which belt"
                ],
                practicals: [
                    "Sort a messy inventory list using Merge Sort",
                    "Organize a 'Customer List' alphabetically using Quick Sort"
                ]
            },
            {
                phase: 4,
                title: "The Binary Locator: Advanced Search",
                theory: [
                    "Binary Search: The 'Lower/Higher' guessing game for sorted shelves",
                    "Search Space: Finding an answer even if it's not in an array",
                    "Aggressive Cows/Book Allocation: Optimizing storage constraints",
                    "Complexity: O(log n) efficiency"
                ],
                practicals: [
                    "Find a package in a sorted warehouse of 1 million items",
                    "Calculate the 'Maximum Minimum' distance for storage"
                ]
            }
        ]
    },
    "dsa-3": {
        fileName: "dsa-3",
        description: "The Global Route (Scale & Strategy)",
        category: "DSA",
        subDescription: "Master the big map. Organize data hierarchically with Trees, connect location webs with Graphs, and use Smart GPS logic (DP).",
        phases: [
            {
                phase: 1,
                title: "The Corporate Hierarchy: Trees",
                theory: [
                    "Binary Trees: Branched decision paths",
                    "Binary Search Trees (BST): Self-organizing hierarchies",
                    "Traversals (BFS/DFS): Ways to visit every office in the building",
                    "Heaps: The 'Power structure' where the boss is always at the top"
                ],
                practicals: [
                    "Verify if a management tree is valid (Validate BST)",
                    "Find the 'Tallest Path' in a branching delivery route"
                ]
            },
            {
                phase: 2,
                title: "The Global Highway: Graphs",
                theory: [
                    "Graphs: A web of cities (Nodes) and roads (Edges)",
                    "Directed vs Weighted: One-way streets and toll roads",
                    "Dijkstra's Algorithm: Finding the fastest GPS route",
                    "Cycle Detection: Preventing the delivery truck from going in circles"
                ],
                practicals: [
                    "Find the shortest path between two cities on a map",
                    "Determine if two people are 'Mutual Friends' in a social web"
                ]
            },
            {
                phase: 3,
                title: "The Smart GPS: Dynamic Programming",
                theory: [
                    "DP Fundamentals: Remembering the route to save gas (Memoization)",
                    "Base Cases & Transitions: Building the map from the ground up",
                    "Knapsack Problem: Packing the most valuable items into a limited truck",
                    "Climbing Stairs: Finding every possible way to reach the destination"
                ],
                practicals: [
                    "Solve the 'Coin Change' problem (Making change with least coins)",
                    "Find the longest common 'Delivery Route' between two schedules"
                ]
            },
            {
                phase: 4,
                title: "The Final Strategic Exam (Questions)",
                theory: [
                    "Top 50 DSA Interview Questions",
                    "The Logistics Metaphor Cheat Sheet",
                    "System Design Basics for Logistics",
                    "How to talk about Complexity like a Strategist"
                ],
                practicals: [
                    "Conduct a mock interview explaining 'Graphs' as 'Highways'",
                    "Solve a 45-minute unseen logistics challenge"
                ]
            }
        ]
    }
};
