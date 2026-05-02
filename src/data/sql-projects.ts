export const SQL_PROJECTS = {
    fileName: "sql-projects",
    rules: {
        category: "SQL",
        subDescription: "Master the warehouse management system. Build robust, optimized, and secure database structures for real-world scenarios.",
        studyOrder: "Strict",
        progression: "Floor Cleaning → Regional Audit",
        alignment: "Mapped strictly to the consolidated SQL syllabus"
    },
    individualProjects: [
        {
            id: 1,
            sqlLevel: "sql",
            name: "The Staff Registry (Fundamentals)",
            difficulty: "Very Easy",
            features: ["Create a 'Staff' table with appropriate labels", "Add and update employee records", "Find staff by department and join date"],
            concepts: ["Warehouse Building (Database)", "Filing Cabinets (Tables)"]
        },
        {
            id: 2,
            sqlLevel: "sql",
            name: "Inventory Filter Bot (Searching)",
            difficulty: "Easy",
            features: ["Filter products by price range', 'Search for products using name wildcards", "Sort inventory by stock quantity"],
            concepts: ["Robot Searching (SELECT)", "Label Matching (LIKE)"]
        },
        {
            id: 3,
            sqlLevel: "sql",
            name: "The Multi-Zonal Tracker (Joins)",
            difficulty: "Medium",
            features: ["Link 'Customers' to 'Orders'", "Link 'Orders' to 'Products'", "Find the total number of orders placed by each customer"],
            concepts: ["Logistic Bridges (Joins)", "Order Barcodes (Keys)"]
        },
        {
            id: 4,
            sqlLevel: "sql",
            name: "Monthly Revenue Auditor (Aggregates)",
            difficulty: "Medium",
            features: ["Group sales by month', 'Calculate average order value per category", "Identify products that are out of stock"],
            concepts: ["Stock Counting (Aggregates)", "Category Grouping (GROUP BY)"]
        },
        {
            id: 5,
            sqlLevel: "sql",
            name: "The Optimized Catalog (Indexing & Normalization)",
            difficulty: "Hard",
            features: ["Normalize a flat file into a relational structure", "Implement indexes to speed up heavy search queries", "Use EXPLAIN to verify performance"],
            concepts: ["Warehouse Cleanup (Normalization)", "Fast Tracking (Indexes)"]
        },
        {
            id: 6,
            sqlLevel: "sql",
            name: "The Secure Billing System (Transactions)",
            difficulty: "Hard",
            features: ["Handle complex orders with multiple items", "Implement ACID transactions for safe inventory reduction", "Protect against SQL injection in search fields"],
            concepts: ["Safe Shipping (Transactions)", "The Bouncer (Security)"]
        }
    ]
};
