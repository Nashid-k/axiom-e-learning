export const OS_PROJECTS = {
    fileName: "os-projects",
    rules: {
        category: "Operating Systems",
        subDescription: "Enter the Master Building Manager's Office. Build virtual systems that manage residents, rooms, and security with precision and efficiency.",
        studyOrder: "Strict",
        progression: "Manager's Office → Room Allotment → Building Security",
        alignment: "Mapped strictly to the consolidated Operating Systems syllabus"
    },
    individualProjects: [
        {
            id: 1,
            osLevel: "os",
            name: "The Guest List Manager (Processes)",
            difficulty: "Easy",
            features: ["Create a script that 'Spawns' and 'Terminates' guest residents", "Monitor CPU/RAM usage of each guest", "Handle 'Resident Requests' (System Calls)"],
            concepts: ["Residents (Processes)", "Manager's Dashboard"]
        },
        {
            id: 2,
            osLevel: "os",
            name: "The Shared Bathroom (Mutex)",
            difficulty: "Easy",
            features: ["Simulate 5 residents trying to use one bathroom", "Implement a 'Door Lock' (Mutex) to prevent clashes", "Create a 'Waiting Lobby' for residents"],
            concepts: ["Concurrency", "Locks (Mutex)"]
        },
        {
            id: 3,
            osLevel: "os",
            name: "The Room Assigner (Memory)",
            difficulty: "Medium",
            features: ["Allot Apartment Rooms (Memory Blocks) to new residents", "Implement a 'Fragment Collector' to clean up empty spaces", "Simulate a 'Full House' scenario"],
            concepts: ["Room Allotment (Memory)", "Allocation Strategies"]
        },
        {
            id: 4,
            osLevel: "os",
            name: "The Basement Robot (File Systems)",
            difficulty: "Medium",
            features: ["Build a virtual File System in the Storage Basement", "Store 'Boxes' (Data) and organize them into 'Shelves' (Folders)", "Implement a 'Search Robot' to find items by label"],
            concepts: ["Storage Basement (Disk)", "The Shelf System (Folders)"]
        },
        {
            id: 5,
            osLevel: "os",
            name: "The Fair Elevator (CPU Scheduling)",
            difficulty: "Hard",
            features: ["Simulate an elevator with diverse residents (VIP, Slow, Fast)", "Implement Round Robin and FCFS rules", "Measure 'Wait Time' for different resident types"],
            concepts: ["The Elevator Queue (Scheduling)", "Fairness vs Priority"]
        },
        {
            id: 6,
            osLevel: "os",
            name: "The Vault Penetration Test (Security)",
            difficulty: "Hard",
            features: ["Identify hidden 'Intruders' (Unauthorized Processes)", "Sanitize 'Visitor Bags' (Input Validation)", "Manage 'Root Keys' (Admin Access)"],
            concepts: ["Building Security", "Permissions & Protection"]
        }
    ]
};
