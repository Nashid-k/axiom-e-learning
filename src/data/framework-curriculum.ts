
export const NEXTJS_CURRICULUM = {
    "nextjs": {
        fileName: "nextjs",
        description: "Next.js Advanced",
        category: "Next.js",
        subDescription: "Master Next.js App Router, Server Components, and production deployment.",
        phases: [
            { phase: 1, title: "Next.js Fundamentals", theory: ["Next.js vs React", "File-based Routing", "Pages vs App Router", "Installation & Setup"], practicals: ["Create Next.js app", "Set up routing"] },
            { phase: 2, title: "App Router Deep Dive", theory: ["App Directory", "Layouts", "Templates", "Loading UI", "Error Handling", "Route Groups"], practicals: ["Build app with App Router", "Create nested layouts"] },
            { phase: 3, title: "Server Components", theory: ["RSC Concept", "Server vs Client Components", "'use client' Directive", "Composition Patterns"], practicals: ["Build with Server Components", "Mix server and client components"] },
            { phase: 4, title: "Data Fetching", theory: ["fetch() in Server Components", "Streaming", "Suspense", "Parallel Data Fetching", "Sequential Data Fetching"], practicals: ["Implement data fetching patterns"] },
            { phase: 5, title: "Rendering Strategies", theory: ["Static Rendering (SSG)", "Dynamic Rendering (SSR)", "ISR (Incremental Static Regeneration)", "revalidate", "Dynamic Functions"], practicals: ["Implement different rendering strategies"] },
            { phase: 6, title: "Server Actions", theory: ["Server Actions Concept", "Form Actions", "Progressive Enhancement", "Revalidation"], practicals: ["Build forms with Server Actions"] },
            { phase: 7, title: "Route Handlers", theory: ["API Routes in App Router", "Request/Response", "Dynamic Routes", "Edge Runtime"], practicals: ["Create API endpoints"] },
            { phase: 8, title: "Middleware & Edge", theory: ["Middleware Concept", "Edge Runtime", "Geolocation", "A/B Testing"], practicals: ["Implement auth middleware"] },
            { phase: 9, title: "Optimization", theory: ["Image Optimization", "Font Optimization", "Script Optimization", "Metadata API", "Bundle Analysis"], practicals: ["Optimize Next.js app"] },
            { phase: 10, title: "Authentication in Next.js", theory: ["NextAuth.js", "Session Management", "Protected Routes", "JWT"], practicals: ["Implement authentication"] },
            { phase: 11, title: "Deployment", theory: ["Vercel Deployment", "Environment Variables", "Edge Functions", "Analytics"], practicals: ["Deploy to production"] },
            { phase: 12, title: "Advanced Patterns", theory: ["Parallel Routes", "Intercepting Routes", "Route Handlers", "Streaming SSR"], practicals: ["Build complex routing patterns"] }
        ]
    }
};

export const NESTJS_CURRICULUM = {
    "nestjs": {
        fileName: "nestjs",
        description: "NestJS Enterprise Backend",
        category: "NestJS",
        subDescription: "Master enterprise-grade Node.js backend development with NestJS framework.",
        phases: [
            { phase: 1, title: "NestJS Fundamentals", theory: ["NestJS Architecture", "Modules", "Controllers", "Providers", "Dependency Injection"], practicals: ["Create NestJS app", "Build CRUD controller"] },
            { phase: 2, title: "Controllers & Routing", theory: ["Route Parameters", "Query Parameters", "Request Body", "Decorators", "@Get, @Post, @Put, @Delete"], practicals: ["Build RESTful endpoints"] },
            { phase: 3, title: "Providers & DI", theory: ["Provider Concept", "Dependency Injection", "Custom Providers", "Injection Scopes"], practicals: ["Create services with DI"] },
            { phase: 4, title: "Modules", theory: ["Feature Modules", "Shared Modules", "Global Modules", "Dynamic Modules"], practicals: ["Organize code with modules"] },
            { phase: 5, title: "Middleware & Guards", theory: ["Middleware", "Guards", "Authentication Guard", "Authorization"], practicals: ["Implement auth middleware and guards"] },
            { phase: 6, title: "Interceptors & Pipes", theory: ["Interceptors Concept", "Transformation", "Validation Pipes", "Custom Pipes"], practicals: ["Create custom interceptors and pipes"] },
            { phase: 7, title: "Exception Handling", theory: ["Exception Filters", "Built-in HTTP Exceptions", "Custom Exceptions"], practicals: ["Handle errors properly"] },
            { phase: 8, title: "Database Integration", theory: ["TypeORM", "Prisma", "Entities", "Repositories", "Migrations"], practicals: ["Set up database with TypeORM"] },
            { phase: 9, title: "Authentication", theory: ["Passport.js", "JWT Strategy", "Local Strategy", "Guards"], practicals: ["Implement JWT authentication"] },
            { phase: 10, title: "GraphQL with NestJS", theory: ["GraphQL Module", "Resolvers", "Schema First vs Code First", "Mutations"], practicals: ["Build GraphQL API"] },
            { phase: 11, title: "Microservices", theory: ["Microservices Architecture", "TCP Transport", "Redis Transport", "Message Patterns"], practicals: ["Create microservice"] },
            { phase: 12, title: "Testing & Deployment", theory: ["Unit Testing", "E2E Testing", "Test Coverage", "Docker Deployment"], practicals: ["Write tests", "Deploy NestJS app"] }
        ]
    }
};

export const PYTHON_CURRICULUM = {
    "python": {
        fileName: "python",
        description: "Python Development",
        category: "Python",
        subDescription: "Master Python from basics to web development with Django and FastAPI.",
        phases: [
            { phase: 1, title: "Python Basics", theory: ["Python Syntax", "Variables", "Data Types", "Operators", "Input/Output"], practicals: ["Write first Python program", "Use variables and operators"] },
            { phase: 2, title: "Control Flow", theory: ["if/elif/else", "for loops", "while loops", "break/continue", "match/case (Python 3.10+)"], practicals: ["Implement control structures"] },
            { phase: 3, title: "Data Structures", theory: ["Lists", "Tuples", "Sets", "Dictionaries", "List Comprehensions"], practicals: ["Work with collections", "Use comprehensions"] },
            { phase: 4, title: "Functions", theory: ["Function Definition", "Arguments", "*args, **kwargs", "Lambda Functions", "Decorators"], practicals: ["Create functions", "Use decorators"] },
            { phase: 5, title: "OOP in Python", theory: ["Classes", "Inheritance", "Encapsulation", "Polymorphism", "Magic Methods"], practicals: ["Build classes", "Implement inheritance"] },
            { phase: 6, title: "File I/O & Exceptions", theory: ["Reading Files", "Writing Files", "try/except", "Custom Exceptions", "Context Managers"], practicals: ["Handle files", "Write exception handlers"] },
            { phase: 7, title: "Modules & Packages", theory: ["import", "Creating Modules", "Packages", "pip", "Virtual Environments"], practicals: ["Create package", "Use virtual environments"] },
            { phase: 8, title: "Django Fundamentals", theory: ["Django MVC", "Project Structure", "Apps", "URLs", "Views"], practicals: ["Create Django project", "Build views"] },
            { phase: 9, title: "Django Models & ORM", theory: ["Models", "Migrations", "ORM Queries", "Relationships"], practicals: ["Create models", "Query database"] },
            { phase: 10, title: "Django Templates & Forms", theory: ["Template Syntax", "Template Inheritance", "Forms", "Form Validation"], practicals: ["Build templates", "Create forms"] },
            { phase: 11, title: "FastAPI Basics", theory: ["FastAPI Fundamentals", "Path Operations", "Pydantic Models", "Async/Await"], practicals: ["Build FastAPI application"] },
            { phase: 12, title: "Database with FastAPI", theory: ["SQLAlchemy", "Async Database", "Alembic Migrations"], practicals: ["Integrate database with FastAPI"] },
            { phase: 13, title: "Advanced API Development", theory: ["Django REST Framework (DRF)", "Serializers", "ViewSets & Routers", "Authentication & Permissions", "Throttling"], practicals: ["Build REST API with DRF", "Implement JWT Auth"] },
            { phase: 14, title: "Real-time Communication", theory: ["WebSockets Concept", "Django Channels", "Consumers", "FastAPI WebSockets", "Redis Channel Layers"], practicals: ["Build real-time chat app", "Implement live notifications"] },
            { phase: 15, title: "GraphQL with Python", theory: ["GraphQL Concepts", "Strawberry (FastAPI)", "Graphene (Django)", "Schemas & types", "Queries & Mutations"], practicals: ["Build GraphQL API", "Integrate GraphiQL"] },
            { phase: 16, title: "Microservices with Python", theory: ["Microservices vs Monolith", "gRPC", "Event-Driven Architecture", "Nameko", "Inter-service Communication"], practicals: ["Create microservices mesh", "Implement gRPC communication"] },
            { phase: 17, title: "Testing & QA", theory: ["Pytest Framework", "Fixtures & Mocking", "Test Coverage", "Linting (Black/Flake8)", "Type Checking (MyPy)"], practicals: ["Write comprehensive test suite", "Set up pre-commit hooks"] },
            { phase: 18, title: "Async & Performance", theory: ["Advanced Asyncio", "Celery Task Queues", "Redis Caching", "Database Indexing", "Profiling Python Code"], practicals: ["Implement background tasks", "Optimize API performance"] },
            { phase: 19, title: "Deployment & DevOps", theory: ["Dockerizing Python Apps", "Gunicorn & Uvicorn", "Nginx Configuration", "GitHub Actions (CI/CD)", "Cloud Deployment (AWS/Heroku)"], practicals: ["Dockerize application", "Set up CI/CD pipeline"] }
        ]
    }
};
