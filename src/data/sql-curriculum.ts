export const SQL_CURRICULUM = {
    "sql-1": {
        fileName: "sql-1",
        description: "The Warehouse Floor (Foundations)",
        category: "SQL",
        subDescription: "The basics of storage. Learn how to navigate the warehouse, read folder labels (columns), and find specific items (SELECT/WHERE).",
        phases: [
            {
                phase: 1,
                title: "Opening the Warehouse: Databases & Tables",
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
                title: "Updating the Inventory: DDL & DML",
                theory: [
                    "CREATE & DROP: Adding a new cabinet vs demolishing one",
                    "INSERT: Adding new items to the bins",
                    "UPDATE: Changing a price tag on an existing item",
                    "DELETE: Removing damaged goods from the warehouse",
                    "TRUNCATE: Emptying a whole cabinet instantly"
                ],
                practicals: [
                    "Add 5 new products to the warehouse",
                    "Change the address of a customer who moved"
                ]
            }
        ]
    },
    "sql-2": {
        fileName: "sql-2",
        description: "The Logistics Bridge (Connections)",
        category: "SQL",
        subDescription: "Link different storage zones. Master Foreign Keys, the 'Joins' that connect cabinets, and counting your stock.",
        phases: [
            {
                phase: 1,
                title: "Safety Rules: Keys & Constraints",
                theory: [
                    "Primary Key: The unique barcode on every item",
                    "Foreign Key: A sticker pointing to a folder in another cabinet",
                    "Unique & Not Null: Rules to stop messy storage",
                    "Referential Integrity: Ensuring no 'ghost' orders exist",
                    "Cascading Actions: If a customer is removed, remove their orders too"
                ],
                practicals: [
                    "Apply barcodes (Primary Keys) to a new table",
                    "Link 'Orders' to 'Customers' using a pointer (Foreign Key)"
                ]
            },
            {
                phase: 2,
                title: "The Great Link: Joins",
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
                phase: 3,
                title: "Inventory Counting: Aggregates",
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
            }
        ]
    },
    "sql-3": {
        fileName: "sql-3",
        description: "The Master Auditor (Advanced)",
        category: "SQL",
        subDescription: "Optimize and secure the warehouse. Master Normalization, Indexes for speed, and ACID Transactions.",
        phases: [
            {
                phase: 1,
                title: "Clean Storage: Normalization",
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
                phase: 2,
                title: "Fast Tracking: Indexes & Performance",
                theory: [
                    "Indexes: The 'Back-of-book' index for finding pages instantly",
                    "Clustered vs Non-Clustered: How the robots physically move the folders",
                    "EXPLAIN ANALYZE: Timing the robots to see why they are slow",
                    "CTEs & Views: Saving common search results for later"
                ],
                practicals: [
                    "Create an index for 'Customer Email' to speed up logins",
                    "Use 'Explain' to see the speed difference with and without an index"
                ]
            },
            {
                phase: 3,
                title: "Safe Shipping: Transactions & Security",
                theory: [
                    "ACID Properties: The 'All-or-Nothing' rule for shipments",
                    "Transactions (COMMIT/ROLLBACK): Finalizing or canceling an action",
                    "SQL Injection: Stopping thieves from tricking the robots",
                    "Privileges (GRANT/REVOKE): Deciding who can enter which zone"
                ],
                practicals: [
                    "Simulate a bank transfer: if part B fails, the whole thing rolls back",
                    "Grant 'Read Only' access to a new warehouse assistant"
                ]
            }
        ]
    },
    "sql-questions": {
        fileName: "sql-questions",
        description: "SQL Inventory Audit",
        category: "SQL",
        subDescription: "60+ common interview questions. Master the 'Warehouse' explanations for common SQL queries.",
        phases: [
            {
                phase: 1,
                title: "The Junior Inspector",
                theory: [
                    "SQL vs NoSQL (Fixed Cabinets vs Flexible Bins)",
                    "DELETE vs TRUNCATE (Removing items vs Emptying the cabinet)",
                    "Primary vs Unique Key (The Barcode vs the ID Label)",
                    "HAVING vs WHERE (Filtering Groups vs Filtering Items)"
                ],
                practicals: [
                    "Explain the 'Second Highest Salary' logic using a 'Sorting Folders' analogy",
                    "Explain why we need Joins instead of one big messy table"
                ]
            },
            {
                phase: 2,
                title: "The Senior Auditor",
                theory: [
                    "ACID Properties (Atomicity, Consistency, Isolation, Durability)",
                    "Stored Procedures vs Functions (Pre-set robot routines)",
                    "Execution Order: How the computer actually reads your instructions",
                    "Normalization Levels (When to stop cleaning)"
                ],
                practicals: [
                    "Debug a 'Deadlock' simulation where two robots are stuck",
                    "Write a query to find 'Duplicate Shipping Labels' in a table"
                ]
            }
        ]
    }
};
