export const SQL_CURRICULUM = {
    "sql": {
        fileName: "sql",
        description: "SQL",
        category: "SQL",
        subDescription: "Complete SQL mastery covering fundamentals, joins, subqueries, normalization, indexing, transactions, and interview scenarios.",
        phases: [
            {
                phase: 1,
                title: "SQL Fundamentals & Core Concepts",
                theory: [
                    "DBMS vs RDBMS",
                    "SQL vs NoSQL (Brief Comparison)",
                    "3-Schema Architecture",
                    "Table, Row, Column, Schema",
                    "ACID Properties (High Level)",
                    "Horizontal vs Vertical Scaling",
                    "SQL Command Types (DDL, DML, DCL, TCL, DQL)"
                ],
                practicals: [
                    "Identify SQL usage patterns",
                    "Explain RDBMS structure"
                ]
            },
            {
                phase: 2,
                title: "SQL Commands & Data Types",
                theory: [
                    "DDL, DML, DCL, TCL, DQL",
                    "CREATE, ALTER, DROP, TRUNCATE",
                    "INSERT, UPDATE, DELETE",
                    "SELECT query structure",
                    "CHAR vs VARCHAR vs TEXT",
                    "DATE, TIME, TIMESTAMP",
                    "ENUM",
                    "BLOB",
                    "DEFAULT values",
                    "AUTO INCREMENT / SERIAL / BIGSERIAL",
                    "UUID usage and when to use it"
                ],
                practicals: [
                    "Create tables using multiple data types",
                    "Insert multiple rows in a single query",
                    "Rename columns and change data types"
                ]
            },
            {
                phase: 3,
                title: "Keys, Constraints & Data Integrity",
                theory: [
                    "Primary Key",
                    "Foreign Key",
                    "Unique Key",
                    "Candidate Key",
                    "Super Key",
                    "Alternate Key",
                    "Composite Key",
                    "Natural Key",
                    "NOT NULL constraint",
                    "CHECK constraint",
                    "DEFAULT constraint",
                    "Data integrity",
                    "Referential integrity",
                    "Cascading actions"
                ],
                practicals: [
                    "Create table with composite primary key",
                    "Add foreign key to an existing table",
                    "Demonstrate cascade delete and update",
                    "Validate CHECK constraint behavior"
                ]
            },
            {
                phase: 4,
                title: "Filtering, Sorting & Basic Queries",
                theory: [
                    "WHERE clause",
                    "ORDER BY",
                    "DISTINCT",
                    "LIMIT vs OFFSET",
                    "BETWEEN",
                    "IN",
                    "LIKE and ILIKE",
                    "Wildcards (% , _)",
                    "IS NULL vs IS NOT NULL",
                    "Alias usage"
                ],
                practicals: [
                    "Find records matching pattern conditions",
                    "Paginate results using LIMIT and OFFSET",
                    "Filter data using multiple conditions"
                ],
                games: [
                    {
                        title: "SQL Island",
                        url: "https://sql-island.informatik.uni-kl.de/",
                        description: "Survive a crash landing by writing SQL queries in this adventure game."
                    }
                ]
            },
            {
                phase: 5,
                title: "Scalar & Aggregate Functions",
                theory: [
                    "Scalar functions",
                    "String functions",
                    "Date functions",
                    "Arithmetic operations",
                    "Aggregate functions (COUNT, SUM, AVG, MIN, MAX)",
                    "GROUP BY clause",
                    "HAVING clause",
                    "WHERE vs HAVING"
                ],
                practicals: [
                    "Count students in each department",
                    "Find department with lowest average salary",
                    "Find longest full name",
                    "Increase salary if below average salary"
                ]
            },
            {
                phase: 6,
                title: "Joins (Core Focus Area)",
                theory: [
                    "Why joins are needed",
                    "INNER JOIN",
                    "LEFT JOIN",
                    "RIGHT JOIN",
                    "FULL OUTER JOIN",
                    "CROSS JOIN",
                    "SELF JOIN",
                    "NATURAL JOIN",
                    "JOIN vs UNION",
                    "Join without foreign key"
                ],
                practicals: [
                    "Customers with their orders and products",
                    "Customers who never placed an order",
                    "Products never ordered",
                    "Department with no employees",
                    "Employee-manager self join"
                ],
                games: [
                    {
                        title: "SQL Police Department",
                        url: "https://sqlpd.com/",
                        description: "Solve crimes using SQL queries to catch criminals. Great for practicing joins."
                    },
                    {
                        title: "SQL Murder Mystery",
                        url: "https://mystery.knightlab.com/",
                        description: "Solve a crime using SQL queries to navigate a database of evidence."
                    },
                    {
                        title: "SQL Bolt",
                        url: "https://sqlbolt.com/",
                        description: "Interactive lessons and exercises to learn SQL from scratch to mastery."
                    },
                ]
            },
            {
                phase: 7,
                title: "Subqueries & Advanced Filtering",
                theory: [
                    "Subquery basics",
                    "Single-row subquery",
                    "Multiple-row subquery",
                    "Correlated subquery",
                    "Non-correlated subquery",
                    "Subquery in SELECT",
                    "Subquery in FROM",
                    "Subquery in WHERE",
                    "EXISTS",
                    "ANY vs ALL"
                ],
                practicals: [
                    "Second highest salary",
                    "Employees earning more than department average",
                    "Customers who spent more than average spending",
                    "Products priced above average price"
                ]
            },
            {
                phase: 8,
                title: "UNION & Set Operations",
                theory: [
                    "UNION",
                    "UNION ALL",
                    "INTERSECT",
                    "MINUS / EXCEPT",
                    "Conditions for UNION",
                    "UNION vs JOIN"
                ],
                practicals: [
                    "Merge two tables with UNION",
                    "Identify duplicate rows using UNION ALL",
                    "Compare UNION vs UNION ALL output"
                ]
            },
            {
                phase: 9,
                title: "Normalization & Database Design",
                theory: [
                    "Data redundancy",
                    "Functional dependency",
                    "Partial dependency",
                    "Transitive dependency",
                    "1NF",
                    "2NF",
                    "3NF",
                    "BCNF",
                    "Denormalization",
                    "Over-normalization issues",
                    "ER diagram",
                    "Types of relationships (1:1, 1:M, M:M)"
                ],
                practicals: [
                    "Normalize a given table to 3NF",
                    "Design ER diagram for employee-department system",
                    "Convert many-to-many relationship into tables"
                ]
            },
            {
                phase: 10,
                title: "Indexes & Query Optimization",
                theory: [
                    "What is indexing",
                    "How index works internally",
                    "Clustered index",
                    "Non-clustered index",
                    "Composite index",
                    "Hash index",
                    "Index advantages",
                    "Index disadvantages",
                    "When not to use index",
                    "EXPLAIN",
                    "EXPLAIN ANALYZE",
                    "Covered query"
                ],
                practicals: [
                    "Create and list indexes",
                    "Compare query performance using EXPLAIN",
                    "Decide correct column for indexing"
                ]
            },
            {
                phase: 11,
                title: "Views, CTE & Window Functions",
                theory: [
                    "View concept",
                    "View vs table",
                    "Updatable views",
                    "Materialized view",
                    "CTE (WITH clause)",
                    "Recursive CTE",
                    "Window functions",
                    "RANK vs DENSE_RANK",
                    "PARTITION BY"
                ],
                practicals: [
                    "Create view with filtered data",
                    "Find highest paid employee per department",
                    "Rank employees by salary using window function"
                ]
            },
            {
                phase: 12,
                title: "Transactions & ACID",
                theory: [
                    "Transaction concept",
                    "ACID properties",
                    "Atomicity",
                    "Consistency",
                    "Isolation",
                    "Durability",
                    "Isolation levels",
                    "Deadlock",
                    "Savepoint",
                    "COMMIT",
                    "ROLLBACK"
                ],
                practicals: [
                    "Perform transaction with rollback",
                    "Demonstrate savepoint usage",
                    "Simulate transaction failure"
                ]
            },
            {
                phase: 13,
                title: "Stored Procedures, Functions & Triggers",
                theory: [
                    "Stored procedure",
                    "Procedure vs function",
                    "Input and output parameters",
                    "Cursor",
                    "Trigger concept",
                    "Types of triggers",
                    "Pros and cons of triggers"
                ],
                practicals: [
                    "Create stored procedure for insertion",
                    "Create trigger for audit logging",
                    "Update salary using stored procedure"
                ]
            },
            {
                phase: 14,
                title: "Security, DCL & SQL Injection",
                theory: [
                    "SQL injection",
                    "Common SQL injection types",
                    "How SQL injection happens",
                    "Prevention techniques",
                    "GRANT",
                    "REVOKE",
                    "Roles and privileges"
                ],
                practicals: [
                    "Prevent SQL injection using parameterized queries",
                    "Create user and grant read-only access"
                ],
                games: [
                    {
                        title: "SQL Police Department",
                        url: "https://sqlpd.com/",
                        description: "Solve crimes using SQL queries to catch criminals."
                    }
                ]
            },
            {
                phase: 15,
                title: "Backup, Restore & Production Concepts",
                theory: [
                    "Backup strategies",
                    "Restore strategies",
                    "pg_dump",
                    "Dump vs export",
                    "Partitioning",
                    "Sharding (concept)",
                    "Database migration",
                    "Performance tuning basics"
                ],
                practicals: [
                    "Backup database using pg_dump",
                    "Restore database from backup"
                ]
            },
            {
                phase: 16,
                title: "Interview-Oriented SQL Scenarios",
                theory: [
                    "SQL order of execution",
                    "Common interview traps",
                    "Query optimization thinking",
                    "When to use JOIN vs SUBQUERY",
                    "When to use CTE"
                ],
                practicals: [
                    "Remove duplicate rows from table",
                    "Employee earning less than department average",
                    "Department with highest and lowest average salary",
                    "Find employees joined in last 6 months"
                ]
            }
        ]
    }
};
