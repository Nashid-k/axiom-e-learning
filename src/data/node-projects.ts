export const NODE_PROJECTS = {
    fileName: "nodejs-projects",
    rules: {
        category: "Node.js",
        subDescription: "Master the factory engine. Build high-performance, scalable backend systems using core Node.js and Express.",
        studyOrder: "Strict",
        progression: "Engine Maintenance → Global Logistics",
        alignment: "Mapped strictly to the consolidated Node.js syllabus"
    },
    individualProjects: [
        {
            id: 1,
            nodeLevel: "nodejs",
            name: "The Engine Settings Logger",
            difficulty: "Very Easy",
            features: ["Read environment variables", "Log system memory and CPU usage", "Format output for simple reading"],
            concepts: ["Engine Dashboard (process)", "OS Metrics (os module)"]
        },
        {
            id: 2,
            nodeLevel: "nodejs",
            name: "Automated Log Sorter (FS)",
            difficulty: "Easy",
            features: ["Create a script that reads all files in a folder", "Sort files into 'Logs' and 'Archives' folders", "Rename files with timestamps"],
            concepts: ["Factory Wrench (FS)", "Factory Ruler (Path)"]
        },
        {
            id: 3,
            nodeLevel: "nodejs",
            name: "The Warehouse Inventory API (Express)",
            difficulty: "Medium",
            features: ["Build CRUD routes for warehouse items", "Implement a search route using query params", "Add basic logging middleware"],
            concepts: ["Assembly Line (Express)", "Inspection Checks (Middleware)"]
        },
        {
            id: 4,
            nodeLevel: "nodejs",
            name: "The Secure Staff Directory (MVC)",
            difficulty: "Medium",
            features: ["Structure the project into Models, Views, and Controllers", "Use a template engine to render staff profiles"],
            concepts: ["Department Managers (Controllers)", "Blueprints (Models)"]
        },
        {
            id: 5,
            nodeLevel: "nodejs",
            name: "The High-Speed CSV Pipe",
            difficulty: "Hard",
            features: ["Read a massive CSV file using Streams", "Transform data during piping", "Compress the final output"],
            concepts: ["Firehose (Streams)", "Direct Piping", "Compressor (Zlib)"]
        },
        {
            id: 6,
            nodeLevel: "nodejs",
            name: "The Secure Factory Vault (Auth)",
            difficulty: "Hard",
            features: ["Implement User signup with hashed passwords", "Issue and verify JWT ID badges", "Protect sensitive factory routes"],
            concepts: ["Shredding (Bcrypt)", "ID Badges (JWT)", "The Bouncer (Middleware)"]
        }
    ]
};
