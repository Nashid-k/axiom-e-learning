export const MONGODB_PROJECTS = {
    fileName: "mongodb-projects",
    rules: {
        category: "MongoDB",
        subDescription: "Master the flexible storage system. Build dynamic, high-performance database solutions using MongoDB and Mongoose.",
        studyOrder: "Strict",
        progression: "Storage Setup → Global Facility Management",
        alignment: "Mapped strictly to mongodb-1, mongodb-2, mongodb-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            mongodbLevel: "mongodb-1",
            name: "The Flexible Vault (Foundations)",
            difficulty: "Very Easy",
            features: ["Create a storage building (Database) and units (Collections)", "Store folders (Documents) with varying fields", "Perform basic folder searches"],
            concepts: ["Storage Building (Database)", "Flexible Folders (Documents)"]
        },
        {
            id: 2,
            mongodbLevel: "mongodb-1",
            name: "Smart Search Robot (CRUD)",
            difficulty: "Easy",
            features: ["Implement price filters and name pattern matching", "Update folder labels dynamically", "Paginate large result sets"],
            concepts: ["Search Robot (find)", "Projection & Pagination"]
        },
        {
            id: 3,
            mongodbLevel: "mongodb-2",
            name: "The Barcode Scanner (Indexing)",
            difficulty: "Medium",
            features: ["Implement unique email indexing", "Design compound indexes for multi-field searches", "Analyze performance with explain()"],
            concepts: ["Barcode System (Indexing)", "Performance Timing (Explain)"]
        },
        {
            id: 4,
            mongodbLevel: "mongodb-2",
            name: "The Receipt Linker (Modeling)",
            difficulty: "Medium",
            features: ["Model normalized vs denormalized data", "Implement schema validation rules", "Manage many-to-many staff relationships"],
            concepts: ["Embedding vs Referencing", "Validation Rules"]
        },
        {
            id: 5,
            mongodbLevel: "mongodb-3",
            name: "The Intelligence Belt (Aggregation)",
            difficulty: "Hard",
            features: ["Build a multi-stage sales reporting pipeline", "Link multiple storage units in real-time", "Calculate complex group statistics"],
            concepts: ["Conveyor Belt (Aggregation Pipeline)", "Unit Linking ($lookup)"]
        },
        {
            id: 6,
            mongodbLevel: "mongodb-3",
            name: "The Automated Manager (Mongoose)",
            difficulty: "Hard",
            features: ["Built a full Node.js API using Mongoose", "Implement automated password hashing hooks", "Handle secure money transfers with Transactions"],
            concepts: ["Inventory App (Mongoose)", "Safe Contracts (Transactions)"]
        }
    ]
};
