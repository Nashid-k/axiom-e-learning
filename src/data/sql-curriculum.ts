export const SQL_CURRICULUM = {
    "sql": {
        id: "sql",
        fileName: "sql",
        description: "The AI Warehouse Floor (SQL & Vector DBs)",
        category: "SQL",
        subDescription: "Master modern SQL logistics. From advanced joins and normalization to pgvector embeddings and LLM similarity search.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Opening the Warehouse: Databases & Tables",
                targetExperience: ["1yoe"],
                theory: [
                    "What is a Database? (The Warehouse Building)",
                    "Tables & Rows: Filing Cabinets and individual folders",
                    "Columns: The labels on folder tabs (Data Types)",
                    "NULL values: Empty bins in the warehouse",
                    "Schema: The master layout of the warehouse floor"
                ],
                practicals: [
                    "Identify tables and columns in a 'Store' warehouse",
                    "Choose the correct labels (Data Types) for a 'Staff' cabinet"
                ]
            },
            {
                phase: 2,
                title: "Finding Items: Basic Searching",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "SELECT: Telling the robot which folders to grab",
                    "WHERE: Filtering by color, price, or size",
                    "ORDER BY: Sorting folders from newest to oldest",
                    "LIMIT & OFFSET: Grabbing only the first 10 items or skipping some",
                    "LIKE & Wildcards: Finding labels that 'Start with' or 'Contain' text"
                ],
                practicals: [
                    "Find all products more expensive than $50",
                    "Sort customers by their last name in the filing cabinet"
                ]
            },
            {
                phase: 3,
                title: "Safety Rules: Keys & Constraints",
                targetExperience: ["2yoe"],
                theory: [
                    "Primary Key: The unique barcode on every item",
                    "Foreign Key: A sticker pointing to a folder in another cabinet",
                    "Unique & Not Null: Rules to stop messy storage",
                    "Referential Integrity: Ensuring no 'ghost' orders exist"
                ],
                practicals: [
                    "Apply barcodes (Primary Keys) to a new table",
                    "Link 'Orders' to 'Customers' using a pointer (Foreign Key)"
                ]
            },
            {
                phase: 4,
                title: "The Great Link: Joins",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "What are Joins? Reading folders from two cabinets at once",
                    "INNER JOIN: Items that exist in both cabinets",
                    "LEFT/RIGHT JOIN: Including items even if they don't have a match",
                    "FULL JOIN: Merging both cabinets completely",
                    "SELF JOIN: When a staff member reports to another staff member"
                ],
                practicals: [
                    "List all customers along with the items they bought",
                    "Find customers who have never placed an order (Left Join)"
                ]
            },
            {
                phase: 5,
                title: "Inventory Counting: Aggregates",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "SUM, AVG, COUNT: Calculating total stock and averages",
                    "MIN & MAX: Finding the cheapest and most expensive items",
                    "GROUP BY: Counting items 'By Category' or 'By Brand'",
                    "HAVING: Filtering the groups (e.g., 'Only show brands with 10+ items')"
                ],
                practicals: [
                    "Calculate the total revenue from all orders",
                    "Count how many products are in the 'Electronics' zone"
                ]
            },
            {
                phase: 6,
                title: "Clean Storage: Normalization",
                targetExperience: ["3yoe"],
                theory: [
                    "The Problem of Redundancy: Why storing info twice is bad",
                    "1NF, 2NF, 3NF: Step-by-step warehouse cleanup",
                    "ER Diagrams: Drawing the warehouse blueprint",
                    "Denormalization: When it's okay to be a little messy for speed"
                ],
                practicals: [
                    "Break a messy 'Receipt' table into 3 clean, normalized tables",
                    "Draw a mini blueprint for a Library management system"
                ]
            },
            {
                phase: 7,
                title: "AI Memory: pgvector & Embeddings",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "What are Vector Embeddings? High-dimensional arrays of numbers",
                    "The `vector` data type in PostgreSQL (pgvector extension)",
                    "Cosine Similarity (<=>) and Euclidean Distance (<->) operators",
                    "Using SQL to perform Semantic Similarity Search for LLMs",
                    "HNSW and IVFFlat indexes: Speeding up vector search"
                ],
                practicals: [
                    "Enable the pgvector extension and create a table with a `vector(1536)` column",
                    "Write a query to find the top 5 most similar documents to an AI's query vector",
                    "Build an HNSW index on the vector column to optimize RAG lookups"
                ]
            },
            {
                phase: 8,
                title: "Fast Tracking: Indexes & Performance",
                targetExperience: ["4yoe"],
                theory: [
                    "Indexes: The 'Back-of-book' index for finding pages instantly",
                    "Clustered vs Non-Clustered: How the robots physically move the folders",
                    "EXPLAIN ANALYZE: Timing the robots to see why they are slow",
                    "CTEs & Views: Saving common search results for later"
                ],
                practicals: [
                    "Create a composite index to speed up complex queries",
                    "Use 'Explain Analyze' to optimize a slow Vector Search query"
                ]
            },
            {
                phase: 9,
                title: "Safe Shipping: Transactions & Security",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "ACID Properties: The 'All-or-Nothing' rule for shipments",
                    "Transactions (COMMIT/ROLLBACK): Finalizing or canceling an action",
                    "SQL Injection & LLM Data Leakage: Stopping thieves from tricking the DB",
                    "Privileges (GRANT/REVOKE): Deciding who can enter which zone",
                    "Row-Level Security (RLS): Ensuring an AI agent only reads its user's data"
                ],
                practicals: [
                    "Simulate a bank transfer: if part B fails, the whole thing rolls back",
                    "Implement RLS to prevent an LLM from reading unauthorized tenant data"
                ]
            }
        ]
    },
    "sql-questions": {
        id: "sql-questions",
        fileName: "sql-questions",
        description: "SQL & Vector DB Audit",
        category: "SQL",
        subDescription: "Master SQL explanations and pgvector concepts for modern AI backend interviews.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Junior Inspector",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "SQL vs NoSQL (Fixed Cabinets vs Flexible Bins)",
                    "DELETE vs TRUNCATE (Removing items vs Emptying the cabinet)",
                    "Primary vs Unique Key",
                    "HAVING vs WHERE"
                ],
                practicals: [
                    "Explain the 'Second Highest Salary' logic using a 'Sorting Folders' analogy",
                    "Explain why we need Joins instead of one big messy table"
                ]
            },
            {
                phase: 2,
                title: "The Senior AI Database Auditor",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "Explain how `pgvector` calculates similarity using Cosine Distance.",
                    "Why would you use an HNSW index over IVFFlat for vector embeddings?",
                    "ACID Properties (Atomicity, Consistency, Isolation, Durability)",
                    "Explain the security risks of SQL Injection when connecting a database directly to an LLM tool."
                ],
                practicals: [
                    "Debug a 'Deadlock' simulation where two robots are stuck",
                    "Design a normalized schema that also stores unstructured vector embeddings for RAG"
                ]
            }
        ]
    }
};
