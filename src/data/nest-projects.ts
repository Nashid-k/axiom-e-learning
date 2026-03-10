export const NEST_PROJECTS = {
    fileName: "nestjs-projects",
    rules: {
        category: "NestJS",
        subDescription: "Master the city administration building. Build enterprise-ready, scalable, and highly organized backend systems using NestJS.",
        studyOrder: "Strict",
        progression: "Office Setup → Global Infrastructure",
        alignment: "Mapped strictly to nestjs-1, nestjs-2, nestjs-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            nestjsLevel: "nestjs-1",
            name: "The Digital DMV (Foundations)",
            difficulty: "Very Easy",
            features: ["Create 'Vehicle' and 'License' modules", "Implement controllers for registration requests", "Use services to handle business logic in the back-office"],
            concepts: ["Departments (Modules)", "Receptionists (Controllers)"]
        },
        {
            id: 2,
            nestjsLevel: "nestjs-1",
            name: "Tax Calculation Engine (Providers/DI)",
            difficulty: "Easy",
            features: ["Implement complex tax math in a dedicated service", "Inject the service into multiple departments", "Use environment variables for tax rates"],
            concepts: ["Specialists (Services)", "Telephone System (DI)"]
        },
        {
            id: 3,
            nestjsLevel: "nestjs-2",
            name: "The Global Embassy Portal (Guards/Pipes)",
            difficulty: "Medium",
            features: ["Implement security guards for 'Visa Approval' routes", "Use validation pipes to check passport formats", "Handle citizenship errors with custom exception filters"],
            concepts: ["Security Guards (Guards)", "Stamp Inspectors (Pipes)"]
        },
        {
            id: 4,
            nestjsLevel: "nestjs-2",
            name: "Priority Lane Interceptor (Interceptors)",
            difficulty: "Medium",
            features: ["Build an interceptor that logs the speed of every request", "Transform response shapes to include a 'City Logo' header", "Implement a caching layer for common requests"],
            concepts: ["Interpreters (Interceptors)", "Activity Logging"]
        },
        {
            id: 5,
            nestjsLevel: "nestjs-3",
            name: "The Master Census Room (Database/TypeORM)",
            difficulty: "Hard",
            features: ["Model complex relationships between Citizens, Families, and Addresses", "Implement database migrations for city expansion", "Set up a Postgres record room"],
            concepts: ["Record Room (Databases)", "Blueprint Design (Entities)"]
        },
        {
            id: 6,
            nestjsLevel: "nestjs-3",
            name: "The Regional Mail Network (Microservices)",
            difficulty: "Hard",
            features: ["Decouple the notification system into a microservice", "Use Redis as a message bridge between offices", "Implement JWT-secured inter-service communication"],
            concepts: ["Regional Branches (Microservices)", "Global ID Badges (JWT)"]
        }
    ]
};
