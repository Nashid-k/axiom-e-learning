export const DSA_PROJECTS = {
    fileName: "dsa-projects",
    rules: {
        category: "DSA",
        subDescription: "Apply the Global Logistics Strategy. Solve real-world efficiency problems using optimized data structures and algorithms.",
        studyOrder: "Strict",
        progression: "Warehouse Essentials → The Smart GPS",
        alignment: "Mapped strictly to dsa-1, dsa-2, dsa-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            dsaLevel: "dsa-1",
            name: "The Smart Inventory Scanner",
            difficulty: "Easy",
            features: [
                "Scan an array of product IDs and find missing stock in O(n)",
                "Reverse the order of incoming packages on a rail line (Linked List)",
                "Calculate total weight using the 'Russian Doll' (Recursion) method"
            ],
            concepts: ["Complexity Analysis", "Arrays/Linked Lists", "Recursion"]
        },
        {
            id: 2,
            dsaLevel: "dsa-2",
            name: "The Instant Retrieval Shelf",
            difficulty: "Medium",
            features: [
                "Implement a Hash Map to store 10,000 items with O(1) lookup",
                "Handle shelf collisions using separate chaining",
                "Built a 'First In Stock' tracker using a Queue system"
            ],
            concepts: ["Hash Tables", "Queues", "Collision Handling"]
        },
        {
            id: 3,
            dsaLevel: "dsa-2",
            name: "The High-Speed Conveyor Belt",
            difficulty: "Medium",
            features: [
                "Implement Merge Sort to organize 5,000 chaotic shipping labels",
                "Analyze the sorting time difference for sorted vs unsorted piles",
                "Find the 'Target Package' using Binary Search in a sorted row"
            ],
            concepts: ["Searching & Sorting", "Merge Sort", "Binary Search"]
        },
        {
            id: 4,
            dsaLevel: "dsa-3",
            name: "The Corporate Management Tree",
            difficulty: "Hard",
            features: [
                "Build a company hierarchy using a Tree structure",
                "Implement a 'CEO Search' using Breadth-First Search (BFS)",
                "Identify if two departments are under the same branch (Lowest Common Ancestor)"
            ],
            concepts: ["Trees", "BFS/DFS", "Hierarchy Logic"]
        },
        {
            id: 5,
            dsaLevel: "dsa-3",
            name: "The GPS Route Finder",
            difficulty: "Hard",
            features: [
                "Model a city's highway web using a Graph structure",
                "Calculate the shortest route between two warehouses using Dijkstra's",
                "Detect traffic bottlenecks (Cycles) in the delivery network"
            ],
            concepts: ["Graphs", "Dijkstra's Algorithm", "Edge/Node Logic"]
        },
        {
            id: 6,
            dsaLevel: "dsa-3",
            name: "The Smart Fuel Optimizer",
            difficulty: "Expert",
            features: [
                "Solve the Knapsack problem to fit the most value into a limited truck",
                "Use Memoization to remember previously calculated sub-routes",
                "Find the longest common delivery path between two global schedules"
            ],
            concepts: ["Dynamic Programming", "Optimization", "Memoization"]
        }
    ]
};
