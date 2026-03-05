
export const DEVOPS_CURRICULUM = {
    "devops": {
        fileName: "devops",
        description: "DevOps & Deployment",
        category: "DevOps",
        subDescription: "Master DevOps practices, Docker, Kubernetes, CI/CD, AWS, and production deployment strategies.",
        phases: [
            { phase: 1, title: "DevOps Fundamentals", theory: ["DevOps Culture", "CI/CD Concepts", "Infrastructure as Code", "Automation Benefits"], practicals: ["Understand DevOps workflow"] },
            { phase: 2, title: "Linux & Command Line", theory: ["Linux Basics", "File System", "Permissions", "Shell Scripting", "Package Managers"], practicals: ["Navigate Linux filesystem", "Create bash scripts"] },
            { phase: 3, title: "Docker Fundamentals", theory: ["Containers vs VMs", "Docker Architecture", "Images vs Containers", "Dockerfile", "Docker Commands"], practicals: ["Create Dockerfile", "Build and run containers"] },
            { phase: 4, title: "Docker Compose", theory: ["Multi-container Apps", "docker-compose.yml", "Volumes", "Networks", "Environment Variables"], practicals: ["Set up full-stack app with Docker Compose"] },
            { phase: 5, title: "Kubernetes Basics", theory: ["K8s Architecture", "Pods", "Deployments", "Services", "ConfigMaps", "Secrets"], practicals: ["Deploy app to Kubernetes cluster"] },
            { phase: 6, title: "CI/CD with GitHub Actions", theory: ["CI/CD Pipeline", "GitHub Actions Workflow", "Jobs and Steps", "Parallel Builds", "Secrets Management"], practicals: ["Create CI/CD pipeline for Node.js app"] },
            { phase: 7, title: "AWS Fundamentals", theory: ["AWS EC2", "AWS S3", "AWS RDS", "AWS Lambda", "IAM", "Security Groups"], practicals: ["Deploy app to AWS EC2", "Store files in S3"] },
            { phase: 8, title: "Serverless Architecture", theory: ["Serverless Concept", "Lambda Functions", "API Gateway", "Serverless Framework", "Vercel/Netlify"], practicals: ["Deploy serverless API"] },
            { phase: 9, title: "Infrastructure as Code", theory: ["Terraform Basics", "Providers", "Resources", "Variables", "State Management"], practicals: ["Provision AWS infrastructure with Terraform"] },
            { phase: 10, title: "Monitoring & Logging", theory: ["Application Monitoring", "Prometheus", "Grafana", "ELK Stack", "Error Tracking", "Sentry"], practicals: ["Set up monitoring dashboard"] },
            { phase: 11, title: "Nginx & Reverse Proxy", theory: ["Web Servers", "Nginx Configuration", "Reverse Proxy", "Load Balancing", "SSL/TLS Setup"], practicals: ["Configure Nginx as reverse proxy"] },
            { phase: 12, title: "Production Best Practices", theory: ["Zero-Downtime Deployment", "Blue-Green Deployment", "Canary Releases", "Rollback Strategies", "Security Hardening"], practicals: ["Implement CI/CD with rollback"] }
        ]
    }
};

export const TESTING_CURRICULUM = {
    "testing": {
        fileName: "testing",
        description: "Testing & QA",
        category: "Testing",
        subDescription: "Master testing strategies from unit tests to E2E, ensuring code quality and reliability.",
        phases: [
            { phase: 1, title: "Testing Fundamentals", theory: ["Why Testing Matters", "Types of Testing", "Test Pyramid", "Unit vs Integration vs E2E", "TDD vs BDD"], practicals: ["Write first unit test"] },
            { phase: 2, title: "Unit Testing with Jest", theory: ["Jest Setup", "Test Syntax (describe, it, expect)", "Matchers", "Setup and Teardown", "Mocking"], practicals: ["Write unit tests for functions", "Mock dependencies"] },
            { phase: 3, title: "Component Testing (React)", theory: ["React Testing Library", "Rendering Components", "Querying Elements", "User Events", "Async Testing"], practicals: ["Test React components", "Test user interactions"] },
            { phase: 4, title: "Integration Testing", theory: ["Integration Test Scope", "Testing API Endpoints", "Database Mocking", "Test Fixtures"], practicals: ["Write integration tests for API"] },
            { phase: 5, title: "E2E Testing with Cypress", theory: ["Cypress Architecture", "Selectors", "Commands", "Assertions", "Custom Commands"], practicals: ["Create E2E test suite", "Test user flows"] },
            { phase: 6, title: "E2E Testing with Playwright", theory: ["Playwright vs Cypress", "Cross-Browser Testing", "Parallel Execution", "Visual Testing"], practicals: ["Migrate Cypress tests to Playwright"] },
            { phase: 7, title: "API Testing", theory: ["Testing REST APIs", "Supertest", "Postman/Newman", "Contract Testing"], practicals: ["Write API tests with Supertest"] },
            { phase: 8, title: "Test-Driven Development (TDD)", theory: ["TDD Cycle (Red-Green-Refactor)", "Benefits of TDD", "TDD Best Practices"], practicals: ["Implement feature using TDD"] },
            { phase: 9, title: "Mocking & Stubbing", theory: ["Mocks vs Stubs vs Spies", "jest.mock()", "jest.fn()", "Mocking Modules", "Mocking Timers"], practicals: ["Mock external dependencies", "Test async code"] },
            { phase: 10, title: "Test Coverage & Quality", theory: ["Code Coverage Metrics", "Statement vs Branch vs Function Coverage", "Coverage Tools", "Quality over Coverage"], practicals: ["Generate coverage reports", "Improve test coverage"] }
        ]
    }
};

export const SYSTEM_DESIGN_CURRICULUM = {
    "system-design": {
        fileName: "system-design",
        description: "System Design & Architecture",
        category: "System Design",
        subDescription: "Master system design for scalable applications and ace system design interviews.",
        phases: [
            { phase: 1, title: "System Design Fundamentals", theory: ["Scalability", "Reliability", "Availability", "Latency vs Throughput", "CAP Theorem"], practicals: ["Design a simple system"] },
            { phase: 2, title: "Scalability Patterns", theory: ["Horizontal vs Vertical Scaling", "Stateless Applications", "Load Balancing", "Database Sharding"], practicals: ["Design scalable architecture"] },
            { phase: 3, title: "Load Balancing", theory: ["Load Balancer Types", "Algorithms (Round Robin, Least Connections)", "Health Checks", "Sticky Sessions"], practicals: ["Implement load balancing strategy"] },
            { phase: 4, title: "Caching Strategies", theory: ["Caching Layers", "Cache-Aside", "Write-Through", "Write-Behind", "Redis", "Memcached", "CDN"], practicals: ["Design caching strategy"] },
            { phase: 5, title: "Database Design", theory: ["SQL vs NoSQL Trade-offs", "Normalization", "Denormalization", "Indexing", "Replication", "Partitioning"], practicals: ["Design database schema for scale"] },
            { phase: 6, title: "Microservices Architecture", theory: ["Monolith vs Microservices", "Service Communication", "API Gateway", "Service Discovery", "Circuit Breaker"], practicals: ["Design microservices system"] },
            { phase: 7, title: "Message Queues", theory: ["Asynchronous Processing", "RabbitMQ", "Kafka", "Event-Driven Architecture", "Pub/Sub Pattern"], practicals: ["Design event-driven system"] },
            { phase: 8, title: "API Design", theory: ["RESTful Design", "API Versioning", "Rate Limiting", "Pagination", "Error Handling", "GraphQL Basics"], practicals: ["Design API for social media"] },
            { phase: 9, title: "SOLID Principles", theory: ["Single Responsibility Principle (SRP)", "Open/Closed Principle (OCP)", "Liskov Substitution Principle (LSP)", "Interface Segregation Principle (ISP)", "Dependency Inversion Principle (DIP)", "SOLID in Real-World Applications"], practicals: ["Refactor code to follow SRP", "Apply OCP with plugins/extensions", "Implement DIP with dependency injection"] },
            { phase: 10, title: "Design Patterns", theory: ["Singleton", "Factory", "Observer", "Strategy", "Adapter", "Decorator", "MVC", "MVVM", "Repository Pattern", "Command Pattern"], practicals: ["Implement design patterns", "Build app using MVC pattern"] },
            { phase: 11, title: "Clean Code Principles", theory: ["DRY (Don't Repeat Yourself)", "KISS (Keep It Simple, Stupid)", "YAGNI (You Aren't Gonna Need It)", "Code Readability", "Naming Conventions", "Function Design", "Code Comments vs Self-Documenting Code"], practicals: ["Refactor messy code to be clean", "Apply DRY principle to repeated logic", "Simplify complex functions"] },
            { phase: 12, title: "Code Smells & Refactoring", theory: ["Long Method", "Large Class", "Feature Envy", "Data Clumps", "Primitive Obsession", "Switch Statements", "Parallel Inheritance", "Refactoring Techniques"], practicals: ["Identify code smells in legacy code", "Refactor using Extract Method", "Apply Replace Conditional with Polymorphism"] },
            { phase: 13, title: "Distributed Systems", theory: ["Consistency Models", "Distributed Transactions", "Consensus (Paxos, Raft)", "Leader Election"], practicals: ["Design distributed system"] },
            { phase: 14, title: "System Design Interview Prep", theory: ["Interview Framework", "Requirements Clarification", "Capacity Estimation", "High-Level Design", "Detailed Design"], practicals: ["Practice mock interviews"] },
            { phase: 15, title: "Case Study: URL Shortener", theory: ["Requirements", "API Design", "Database Schema", "Scalability", "Analytics"], practicals: ["Design URL shortener end-to-end"] },
            { phase: 16, title: "Case Study: Social Media Feed", theory: ["Feed Generation", "Fanout Strategies", "Ranking Algorithm", "Real-time Updates"], practicals: ["Design Twitter/Facebook feed"] },
            { phase: 17, title: "Case Study: Chat System", theory: ["Real-time Messaging", "WebSockets", "Message Storage", "Group Chats", "Read Receipts"], practicals: ["Design WhatsApp-like system"] },
            { phase: 18, title: "Case Study: Video Streaming", theory: ["Video Encoding", "Adaptive Bitrate", "CDN", "Storage Strategy", "Recommendations"], practicals: ["Design YouTube/Netflix system"] }
        ]
    }
};

export const NETWORKING_CURRICULUM = {
    "networking": {
        fileName: "networking",
        description: "Computer Networking",
        category: "Networking",
        subDescription: "Master networking fundamentals essential for every software engineer.",
        phases: [
            { phase: 1, title: "Networking Basics", theory: ["Network Types (LAN, WAN, MAN)", "Network Topologies", "Network Protocols", "Bandwidth vs Latency"], practicals: ["Understand network architecture"] },
            { phase: 2, title: "OSI Model", theory: ["7 Layers of OSI", "Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer", "Session/Presentation/Application Layers"], practicals: ["Map protocols to OSI layers"] },
            { phase: 3, title: "TCP/IP Stack", theory: ["TCP/IP Model", "Internet Layer", "Transport Layer", "Application Layer", "OSI vs TCP/IP"], practicals: ["Analyze TCP/IP packet"] },
            { phase: 4, title: "IP Addressing", theory: ["IPv4 Addressing", "IPv6 Basics", "Public vs Private IPs", "Subnetting", "CIDR Notation", "NAT"], practicals: ["Calculate subnet masks", "Plan IP address scheme"] },
            { phase: 5, title: "DNS Deep Dive", theory: ["DNS Hierarchy", "DNS Resolution Process", "DNS Records (A, AAAA, CNAME, MX, TXT)", "DNS Caching", "DNS Security"], practicals: ["Query DNS records", "Configure DNS"] },
            { phase: 6, title: "TCP vs UDP", theory: ["Connection-Oriented vs Connectionless", "3-Way Handshake", "TCP Flow Control", "UDP Use Cases", "When to Use Each"], practicals: ["Analyze TCP handshake", "Compare TCP and UDP performance"] },
            { phase: 7, title: "HTTP/HTTPS Protocols", theory: ["HTTP Methods", "Status Codes", "Headers", "Cookies", "HTTPS and TLS", "HTTP/2", "HTTP/3 (QUIC)"], practicals: ["Inspect HTTP requests", "Analyze HTTPS certificate"] },
            { phase: 8, title: "WebSockets & Real-time", theory: ["WebSocket Protocol", "Full-Duplex Communication", "WebSocket vs HTTP", "Server-Sent Events", "Long Polling"], practicals: ["Implement WebSocket communication"] },
            { phase: 9, title: "CDN & Content Delivery", theory: ["What is a CDN", "CDN Benefits", "Edge Servers", "Cache Invalidation", "Popular CDNs (Cloudflare, Akamai)"], practicals: ["Set up CDN for static assets"] },
            { phase: 10, title: "Network Security & Debugging", theory: ["Firewall Basics", "VPN", "SSL/TLS", "Network Attacks (DDoS, MITM)", "Debugging Tools (ping, traceroute, netstat, tcpdump)"], practicals: ["Debug network issues", "Use Wireshark"] }
        ]
    }
};

export const OS_CURRICULUM = {
    "os": {
        fileName: "os",
        description: "Operating Systems",
        category: "Operating Systems",
        subDescription: "Understand OS fundamentals: processes, memory, file systems, and concurrency.",
        phases: [
            { phase: 1, title: "OS Fundamentals", theory: ["What is an OS", "OS Functions", "Types of OS", "Kernel vs User Space", "System Calls"], practicals: ["Explore system calls"] },
            { phase: 2, title: "Processes", theory: ["Process Concept", "Process States", "Process Control Block (PCB)", "Process Creation (fork, exec)", "Process Termination"], practicals: ["Create processes in code"] },
            { phase: 3, title: "Threads & Concurrency", theory: ["Thread Concept", "Process vs Thread", "Multithreading", "Thread States", "Concurrency vs Parallelism"], practicals: ["Create multi-threaded application"] },
            { phase: 4, title: "CPU Scheduling", theory: ["Scheduling Algorithms", "FCFS", "SJF", "Round Robin", "Priority Scheduling", "Preemptive vs Non-Preemptive"], practicals: ["Simulate scheduling algorithms"] },
            { phase: 5, title: "Synchronization", theory: ["Race Condition", "Critical Section", "Mutex", "Semaphore", "Monitors", "Deadlock"], practicals: ["Implement mutex in code", "Handle deadlock"] },
            { phase: 6, title: "Memory Management", theory: ["Memory Hierarchy", "Contiguous Allocation", "Paging", "Segmentation", "Virtual Memory"], practicals: ["Understand paging with examples"] },
            { phase: 7, title: "Virtual Memory", theory: ["Virtual Address Space", "Page Tables", "TLB", "Page Replacement Algorithms (FIFO, LRU, Optimal)", "Thrashing"], practicals: ["Simulate page replacement"] },
            { phase: 8, title: "File Systems", theory: ["File Concept", "File Operations", "Directory Structure", "File Allocation Methods", "Disk Scheduling (FCFS, SSTF, SCAN)"], practicals: ["Understand file system structure"] },
            { phase: 9, title: "I/O Systems", theory: ["I/O Hardware", "Polling vs Interrupts", "DMA", "Buffering", "Spooling"], practicals: ["Understand I/O mechanisms"] },
            { phase: 10, title: "OS Security", theory: ["Authentication", "Access Control", "Encryption", "Security Threats", "Protection Mechanisms"], practicals: ["Understand OS security concepts"] }
        ]
    }
};
