export const MONGODB_CURRICULUM = {
    "mongodb": {
        fileName: "mongodb",
        description: "MongoDB Mastery - Practical Approach",
        category: "MongoDB",
        subDescription: "Hands-on MongoDB mastery with focused theory and extensive practice covering core concepts, querying, aggregation, indexing, modeling, and production essentials.",
        phases: [
            {
                phase: 1,
                title: "MongoDB Foundations",
                theory: [
                    "What is MongoDB - document-oriented NoSQL database",
                    "MongoDB vs SQL - flexible JSON-like documents vs rigid tables",
                    "When to use MongoDB - rapid development, flexible schemas, horizontal scaling",
                    "Core concepts - Database, Collection, Document",
                    "BSON format - Binary JSON with additional types (Date, ObjectId)",
                    "Document structure - nested objects and arrays, 16MB limit",
                    "ObjectId - unique 12-byte identifier with timestamp",
                    "MongoDB Atlas - cloud setup vs local installation",
                    "MongoDB Shell (mongosh) - command-line interface"
                ],
                practicals: [
                    "Setup: Install MongoDB locally OR create Atlas free tier account",
                    "Connect: Use mongosh to connect to database",
                    "Basic navigation: show dbs, use mydb, show collections",
                    "First insert: db.users.insertOne({name: 'John', age: 30, email: 'john@test.com'})",
                    "View data: db.users.find().pretty()",
                    "Understand ObjectId: Extract timestamp with ObjectId().getTimestamp()",
                    "Database operations: db.stats(), db.dropDatabase()",
                    "Create nested document: Insert user with address {street, city, zip}",
                    "Create document with array: Insert user with hobbies array"
                ],
                games: []
            },
            {
                phase: 2,
                title: "CRUD - Create & Read",
                theory: [
                    "insertOne() vs insertMany() - single vs multiple documents",
                    "find() returns cursor, findOne() returns single document",
                    "Query filters - match documents by field values",
                    "Comparison operators - $gt, $lt, $gte, $lte, $eq, $ne",
                    "Logical operators - $and, $or, $not",
                    "$in operator - match any value in array",
                    "Regex queries - pattern matching with /pattern/flags",
                    "Projection - include/exclude fields (1 for include, 0 for exclude)",
                    "Cursor methods - limit(), skip(), sort()",
                    "$exists and $type - check field existence and type"
                ],
                practicals: [
                    "Insert single: db.products.insertOne({name: 'Laptop', price: 999, stock: 10})",
                    "Insert multiple: Create 10 products at once, check insertedIds",
                    "Find all: db.products.find()",
                    "Find filtered: Products where price > 500",
                    "Multiple conditions: Active products with price between 100-1000",
                    "$in operator: Find products in categories ['electronics', 'books']",
                    "Regex search: Find products starting with 'Phone' (case-insensitive)",
                    "Nested queries: Find users where address.city = 'NYC'",
                    "Projection: Get only name and price, exclude _id",
                    "Pagination: skip(10).limit(5) for page 3",
                    "Sorting: Sort by price descending, then name ascending",
                    "Array queries: Find users with 'reading' in hobbies array",
                    "Exists check: Find products where discount field exists",
                    "Count: db.products.countDocuments({category: 'electronics'})",
                    "Mini project: design a small products catalog and build queries for search, filter by price range, category, and availability (with pagination and sorting)",
                    "Mini project: create a reporting script that prints top N most expensive and cheapest products using find, sort, limit"
                ]
            },
            {
                phase: 3,
                title: "CRUD - Update & Delete",
                theory: [
                    "updateOne() vs updateMany() - update first match vs all matches",
                    "$set - modify field values",
                    "$unset - remove fields",
                    "$inc - increment/decrement numbers",
                    "Array operators - $push, $addToSet, $pull",
                    "$push vs $addToSet - allow duplicates vs unique only",
                    "Positional $ - update specific array element",
                    "deleteOne() vs deleteMany()",
                    "Upsert - update if exists, insert if not (upsert: true)",
                    "findOneAndUpdate() - atomically find and update, return document"
                ],
                practicals: [
                    "Update single field: Change product price by _id",
                    "Update multiple fields: Use $set for {stock: 5, available: true}",
                    "Remove field: $unset to remove discount field",
                    "Increment: Increase view count by 1 using $inc",
                    "Decrement: Reduce stock by 5 using $inc with negative value",
                    "Array push: Add new tag to tags array",
                    "Array unique add: Use $addToSet to prevent duplicate tags",
                    "Array remove: $pull to remove specific value from array",
                    "Update array element: Use positional $ to update rating in reviews",
                    "Upsert example: Update product or create if doesn't exist",
                    "findOneAndUpdate: Increment likes and return updated document",
                    "Update many: Set isActive: false for all products with stock = 0",
                    "Delete one: Remove specific product by _id",
                    "Delete many: Remove all products where createdAt < 1 year ago"
                ],
                games: []
            },
            {
                phase: 4,
                title: "Aggregation Framework Essentials",
                theory: [
                    "Aggregation pipeline - array of stages for data transformation",
                    "$match - filter documents (use early for performance)",
                    "$project - reshape documents, compute fields",
                    "$group - group by key and perform calculations",
                    "Accumulators - $sum, $avg, $min, $max, $push, $addToSet",
                    "$sort, $limit, $skip - order and paginate results",
                    "$unwind - deconstruct arrays into separate documents",
                    "$lookup - join with another collection",
                    "$addFields - add computed fields without removing others"
                ],
                practicals: [
                    "Simple aggregation: Count all documents",
                    "$match: Filter orders where status = 'completed'",
                    "$group basics: Group by category, count products per category",
                    "$group with $sum: Total revenue by category",
                    "$group with $avg: Average price per category",
                    "$project: Calculate discounted price from price and discount%",
                    "Multi-stage: Match active products → group by category → sort by count",
                    "$unwind: Expand orders.items array for item-level analysis",
                    "$lookup: Join orders with users collection",
                    "$addFields: Add fullPrice field (price + tax)",
                    "Top N query: Find top 5 bestselling products (group, sort, limit)",
                    "Date grouping: Group sales by month/year",
                    "Complex pipeline: Match → lookup → unwind → group → sort → limit",
                    "Conditional fields: Use $cond to add 'expensive' flag if price > 1000",
                    "Mini project: build an order analytics pipeline that outputs revenue per month, top customers, and top products in a single aggregated result",
                    "Mini project: create a dashboard-style aggregation that ranks categories by revenue and includes average order value and count per category"
                ]
            },
            {
                phase: 5,
                title: "Indexing for Performance",
                theory: [
                    "What are indexes - B-tree structures for fast lookups",
                    "Why indexes matter - O(log n) vs O(n) for queries",
                    "Index trade-offs - faster reads but slower writes and storage cost",
                    "Single field index - index on one field",
                    "Compound index - multiple fields, order matters",
                    "Index prefix rule - compound {a, b, c} works for {a}, {a, b}, but not {b}",
                    "Unique index - enforce uniqueness",
                    "Text index - full-text search",
                    "TTL index - auto-delete documents after expiration",
                    "explain() - analyze query performance (executionStats mode)"
                ],
                practicals: [
                    "Create single index: db.users.createIndex({email: 1})",
                    "Create compound: db.products.createIndex({category: 1, price: -1})",
                    "Unique index: Prevent duplicate emails",
                    "Text index: db.articles.createIndex({content: 'text'})",
                    "Text search: db.articles.find({$text: {$search: 'mongodb tutorial'}})",
                    "TTL index: Auto-delete sessions after 30 minutes",
                    "List indexes: db.collection.getIndexes()",
                    "Drop index: db.collection.dropIndex('index_name')",
                    "Query analysis: Use explain('executionStats') before index",
                    "Compare performance: Same query with and without index",
                    "Check index usage: Verify IXSCAN vs COLLSCAN in explain",
                    "Covered query: Query using only indexed fields (no FETCH stage)",
                    "ESR optimization: Create optimal index for equality, sort, range query",
                    "Find unused indexes: Use $indexStats aggregation stage",
                    "Mini project: take a slow search query (by name/email/status) and design indexes + query shape changes to move from COLLSCAN to IXSCAN",
                    "Mini project: design indexes for an orders collection that needs fast queries by userId, status, and createdAt (including pagination by createdAt)"
                ]
            },
            {
                phase: 6,
                title: "Data Modeling Patterns",
                theory: [
                    "Embedding vs Referencing - store together vs separate collections",
                    "When to embed - one-to-one, one-to-few, data accessed together",
                    "When to reference - one-to-many (unbounded), many-to-many, large subdocs",
                    "One-to-few - embed small array (blog post → comments)",
                    "One-to-many - reference with parent ID in children (user → orders)",
                    "Many-to-many - arrays of references on both sides",
                    "Denormalization - duplicate data for read performance",
                    "Schema validation - enforce structure with JSON Schema"
                ],
                practicals: [
                    "Embedded one-to-one: User with embedded address",
                    "Embedded one-to-few: Blog post with comments array (max 20)",
                    "Referenced one-to-many: Users and orders in separate collections",
                    "Many-to-many: Students ↔ courses with reference arrays",
                    "Denormalization: Store author name with each post (duplicate from users)",
                    "Schema validation: Enforce required fields and types",
                    "Validation with regex: Email must match pattern",
                    "Enum validation: Status must be 'pending', 'active', or 'inactive'",
                    "Nested validation: Validate address subobject structure",
                    "Compare approaches: Build same data model embedded vs referenced, test performance"
                ]
            },
            {
                phase: 7,
                title: "Transactions & Bulk Operations",
                theory: [
                    "Transactions - multi-document ACID operations",
                    "When to use transactions - financial ops, inventory updates, related changes",
                    "Single document atomicity - always atomic, no transaction needed",
                    "bulkWrite() - multiple operations in one call",
                    "Ordered vs unordered bulk - stop on error vs continue",
                    "Read/write concerns - consistency vs performance trade-offs"
                ],
                practicals: [
                    "Simple transaction: Transfer money between two accounts",
                    "Transaction with validation: Rollback if insufficient balance",
                    "bulkWrite mixed: Insert 3, update 2, delete 1 in single call",
                    "Ordered bulk: Stop on first duplicate key error",
                    "Unordered bulk: Continue despite errors",
                    "Error handling: Catch and examine BulkWriteError",
                    "Performance test: 1000 individual operations vs single bulkWrite",
                    "Write concern majority: Ensure replication before acknowledging"
                ]
            },
            {
                phase: 8,
                title: "Replication Basics",
                theory: [
                    "Replica set - group of MongoDB instances with same data",
                    "Why replication - high availability, disaster recovery, read scaling",
                    "Primary and secondary nodes - writes to primary, replicate to secondaries",
                    "Automatic failover - new primary elected if current fails",
                    "Read preference - where to read from (primary, secondary, nearest)",
                    "Oplog - operations log for replication"
                ],
                practicals: [
                    "Check replica set status: rs.status()",
                    "View configuration: rs.conf()",
                    "Read from secondary: Test with read preference secondaryPreferred",
                    "Monitor lag: Compare optime between primary and secondary",
                    "Understand failover: Observe primary election after simulated failure",
                    "Write concern test: Insert with {w: 'majority'}"
                ]
            },
            {
                phase: 9,
                title: "Sharding Fundamentals",
                theory: [
                    "Sharding - horizontal data partitioning across servers",
                    "Why shard - scale beyond single server capacity",
                    "Shard key - determines data distribution (choose wisely!)",
                    "Good shard key - high cardinality, even distribution, query isolation",
                    "Bad shard key - low cardinality, monotonically increasing, hotspots",
                    "Hashed sharding - even distribution for non-sequential keys",
                    "mongos - query router that directs queries to correct shards"
                ],
                practicals: [
                    "Analyze shard key: Evaluate cardinality and distribution",
                    "Identify bad keys: Timestamp (hotspot), boolean (low cardinality)",
                    "Good key examples: UUID, compound {country, userId}",
                    "Enable sharding: sh.enableSharding('mydb')",
                    "Shard collection: sh.shardCollection('mydb.users', {userId: 'hashed'})",
                    "Check distribution: sh.status()",
                    "Targeted query: Include shard key, verify single shard with explain",
                    "Scatter-gather: Query without shard key, see all shards hit"
                ]
            },
            {
                phase: 10,
                title: "Mongoose ODM (Node.js)",
                theory: [
                    "Mongoose - ODM for MongoDB in Node.js",
                    "Schema - define structure with types and validation",
                    "Model - compiled schema representing collection",
                    "Built-in validation - required, min/max, enum, match (regex)",
                    "Middleware (hooks) - pre/post operations (save, update, remove)",
                    "Virtual properties - computed fields not stored in DB",
                    "Population - replace ObjectIds with actual documents",
                    "Lean queries - plain objects for better performance"
                ],
                practicals: [
                    "Define schema: User with name, email, age validation",
                    "Required validation: name and email must exist",
                    "Custom validation: Email format with regex",
                    "Enum validation: Role must be 'user', 'admin', or 'moderator'",
                    "Default values: createdAt defaults to Date.now",
                    "Timestamps: Auto-add createdAt and updatedAt",
                    "Virtual property: fullName from firstName + lastName",
                    "Pre-save hook: Hash password before saving",
                    "Instance method: user.comparePassword(candidatePassword)",
                    "Static method: User.findByEmail(email)",
                    "Create document: await User.create({name, email})",
                    "Query: await User.find({age: {$gte: 18}})",
                    "Update: await User.findByIdAndUpdate(id, {name}, {new: true})",
                    "Population: Populate user's posts in single query",
                    "Lean query: .lean() for read-only operations",
                    "Mini project: build a simple blog backend with User and Post models, including slugs, virtuals, hooks, and populated relations",
                    "Mini project: implement a small auth layer where User documents have hashed passwords, roles, and helper methods for verifying credentials and checking permissions"
                ]
            },
            {
                phase: 11,
                title: "Advanced Features",
                theory: [
                    "Aggregation operators - $concat, $substr, $dateToString, $cond",
                    "$facet - multiple pipelines in parallel",
                    "$bucket - categorize into ranges",
                    "Capped collections - fixed size, FIFO, for logs",
                    "GridFS - store files larger than 16MB",
                    "Change streams - watch real-time collection changes",
                    "Geospatial queries - location-based searches",
                    "Time series collections - optimized for timestamped data"
                ],
                practicals: [
                    "String manipulation: $concat for fullName in aggregation",
                    "Date formatting: $dateToString to format as 'YYYY-MM-DD'",
                    "Conditional: $cond to add discount flag based on quantity",
                    "$facet: Run age stats and category breakdown in parallel",
                    "$bucket: Categorize products by price ranges",
                    "Capped collection: Create 10MB log collection with FIFO",
                    "GridFS upload: Store large PDF file",
                    "GridFS retrieve: Download file by ID",
                    "Change stream: Watch for new orders in real-time",
                    "Geospatial index: Create 2dsphere index on location",
                    "Nearby query: Find stores within 5km of coordinates"
                ]
            },
            {
                phase: 12,
                title: "Performance & Production",
                theory: [
                    "Query optimization - use indexes, limit fields, early filtering",
                    "Aggregation best practices - $match early, minimize stages",
                    "Connection pooling - reuse connections efficiently",
                    "Monitoring - track slow queries, index usage, replication lag",
                    "Backup strategies - mongodump/restore, snapshots, Atlas automated",
                    "Security - enable authentication, use roles, encrypt connections",
                    "Profiler - log slow queries (>100ms) for analysis"
                ],
                practicals: [
                    "Enable profiler: db.setProfilingLevel(1, {slowms: 100})",
                    "Analyze slow queries: db.system.profile.find().sort({ts: -1})",
                    "Add missing index based on profiler data",
                    "Optimize aggregation: Move $match to start of pipeline",
                    "Projection optimization: Fetch only needed fields",
                    "Cursor pagination: Use indexed field instead of skip for large offsets",
                    "mongodump: Backup specific database",
                    "mongorestore: Restore from backup",
                    "Enable authentication: Create admin user and app users",
                    "Create read-only user: For reporting/analytics",
                    "Database stats: db.stats() to check size and indexes",
                    "Monitor operations: db.currentOp() to see running queries",
                    "Kill slow query: db.killOp(opid)",
                    "Connection pool config: Set appropriate pool size",
                    "Load testing: Benchmark with realistic data and queries",
                    "Mini project: simulate a production incident where a dashboard query is slow, then use profiler + explain to diagnose and fix it with indexes and pipeline changes",
                    "Mini project: design a backup and restore strategy for a small app (scripts + commands) and document RPO/RTO assumptions"
                ]
            }
        ]
    }
};