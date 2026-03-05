
import { CurriculumData } from '@/types';

export const TYPESCRIPT_CURRICULUM: Record<string, CurriculumData> = {
    "typescript": {
        id: "typescript",
        fileName: "typescript",
        description: "TypeScript for MERN Stack",
        category: "TypeScript",
        subDescription: "Complete TypeScript mastery for MERN stack developers. From basics to advanced patterns covering React, Node.js, Express, MongoDB integration with strict type safety.",
        experienceLevels: ["Intern", "0-1 Year", "1-2 Years"],
        duration: "3-6 Months Integration",
        prerequisites: ["JavaScript Fundamentals", "Basic MERN Experience"],
        phases: [
            {
                phase: 1,
                title: "TS Config & Type System Core",
                targetExperience: ["Intern", "0-1 Year"],
                focus: "Configuration & Inference Mastery",
                theory: [
                    "tsconfig.json Deep Dive (strict, noImplicitAny)",
                    "Compiler Options (target, module, lib)",
                    "Source Maps & Debugging flow",
                    "Type Inference Algorithms (Best common type)",
                    "Contextual Typing mechanics",
                    "Type Aliases vs Interfaces (Declaration merging)",
                    "Structural Typing vs Nominal Typing (Concepts)",
                    "The 'any' type vs 'unknown' (Why unknown is safer)",
                    "Never type & Exhaustiveness checking",
                    "Const Enums vs Regular Enums"
                ],
                practicals: [
                    "Configure a hardened tsconfig.json from scratch",
                    "Refactor loose 'any' code to use 'unknown' with type guards",
                    "Demonstrate declaration merging with interface extension",
                    "Implement a switch case with exhaustive ‘never’ check",
                    "Mini project: take a small JS utility file and migrate it to TypeScript with strict config (noImplicitAny, strictNullChecks)",
                    "Mini project: build a tiny CLI config loader that reads JSON/YAML and validates it against a typed schema"
                ],
                projects: [
                    "TypeScript configuration generator CLI",
                    "Type definitions for small library"
                ],
                games: [
                    {
                        title: "Total TypeScript",
                        url: "https://www.totaltypescript.com/",
                        description: "Interactive exercises to master TypeScript."
                    }
                ],
                commonErrors: [
                    "Property does not exist on type 'unknown'",
                    "Type 'null' is not assignable to type 'string' (strictNullChecks)",
                    "Implicit 'any' errors"
                ]
            },
            {
                phase: 2,
                title: "Advanced Types & Type Manipulation",
                targetExperience: ["0-1 Year", "1-2 Years"],
                focus: "Type System Mastery",
                theory: [
                    "Union & Intersection Types",
                    "Union types (|) for multiple possible types",
                    "Discriminated unions with literal types",
                    "Intersection types (&) for type combination",
                    "Type guards: typeof, instanceof, in operator",
                    "User-defined type guards",

                    "Generics",
                    "Generic functions and type parameters",
                    "Generic constraints with extends",
                    "Generic interfaces and classes",
                    "Default type parameters",
                    "Generic utility types overview",

                    "Utility Types",
                    "Partial<T> and Required<T>",
                    "Readonly<T> and ReadonlyArray<T>",
                    "Pick<T, K> and Omit<T, K>",
                    "Record<K, T> for object maps",
                    "Exclude<T, U> and Extract<T, U>",
                    "NonNullable<T> and Parameters<T>",
                    "ReturnType<T> and InstanceType<T>",

                    "Conditional Types",
                    "Basic conditional types (T extends U ? X : Y)",
                    "Infer keyword for type inference in conditionals",
                    "Distributive conditional types",
                    "Mapped types syntax",
                    "Template literal types",

                    "Advanced Type Patterns",
                    "Index signatures for dynamic properties",
                    "keyof operator and keyof typeof",
                    "typeof operator for type queries",
                    "Lookup types with indexed access",
                    "const assertions for literal types"
                ],
                practicals: [
                    "Create generic API response wrapper",
                    "Implement type-safe filter function with generics",
                    "Build utility types for form validation",
                    "Create conditional types for API endpoints",
                    "Use mapped types for configuration objects",
                    "Implement type-safe event emitter",
                    "Create discriminated union for API actions",
                    "Build type-safe builder pattern",
                    "Implement runtime type validation",
                    "Create type guards for API responses",
                    "Mini project: design a type-safe configuration module where different environments (dev/stage/prod) are modeled by discriminated unions and conditional types",
                    "Mini project: create a small SDK-style client for a fake REST API using generics, utility types, and discriminated unions for responses"
                ],
                projects: [
                    "Type-safe utility library",
                    "Runtime type validation library",
                    "API client with full type safety",
                    "Form validation with TypeScript"
                ],
                games: [
                    {
                        title: "TypeScript Gamified",
                        url: "https://www.typescript-gamified.com/",
                        description: "Learn TypeScript through gamified challenges."
                    }
                ],
                patterns: [
                    "Builder pattern with method chaining",
                    "Factory pattern with type inference",
                    "Strategy pattern with discriminated unions",
                    "Adapter pattern with generic interfaces"
                ]
            },
            {
                phase: 3,
                title: "TypeScript with React",
                targetExperience: ["Intern", "0-1 Year", "1-2 Years"],
                focus: "Frontend Type Safety",
                theory: [
                    "React Components with TypeScript",
                    "Typing functional components: FC vs direct return",
                    "Component props interfaces",
                    "Children prop typing with React.ReactNode",
                    "Default props and optional props",
                    "Event handlers typing",

                    "Hooks with TypeScript",
                    "useState with explicit types",
                    "useEffect and dependency array typing",
                    "useContext with TypeScript",
                    "useReducer with type-safe actions",
                    "Custom hooks with proper typing",
                    "useRef for DOM elements and mutable values",
                    "useMemo and useCallback with types",

                    "Forms and Events",
                    "Form event types: React.FormEvent",
                    "Input change events: React.ChangeEvent",
                    "Button click events: React.MouseEvent",
                    "Form state management with types",
                    "Form validation types",

                    "Advanced React Patterns",
                    "Higher-order components with TypeScript",
                    "Render props pattern typing",
                    "Compound components with context",
                    "Forwarding refs with forwardRef",
                    "Portals and error boundaries typing",

                    "State Management",
                    "Context API with TypeScript",
                    "Redux Toolkit with TypeScript",
                    "Zustand with TypeScript",
                    "React Query with TypeScript",
                    "Type-safe state machines (XState)"
                ],
                practicals: [
                    "Create typed functional component with props",
                    "Implement typed custom hook for API fetching",
                    "Build type-safe form with validation",
                    "Create context provider with TypeScript",
                    "Implement Redux slice with TypeScript",
                    "Build higher-order component with props forwarding",
                    "Create compound modal component",
                    "Implement type-safe drag and drop",
                    "Build paginated data table with types",
                    "Create theme switcher with context",
                    "Mini project: build a small dashboard (cards + table + filters) where all components and hooks are fully typed",
                    "Mini project: implement a multi-step form wizard with typed steps, form state, and validation"
                ],
                projects: [
                    "Type-safe todo application",
                    "E-commerce product listing with filters",
                    "Dashboard with typed charts",
                    "Form builder with validation",
                    "Real-time chat with typed messages"
                ],
                libraries: [
                    "React Hook Form with TypeScript",
                    "React Query with TypeScript",
                    "Material-UI/Chakra UI with TypeScript",
                    "React Router with TypeScript",
                    "Framer Motion with TypeScript"
                ]
            },
            {
                phase: 4,
                title: "TypeScript with Node.js & Express",
                targetExperience: ["0-1 Year", "1-2 Years"],
                focus: "Backend Type Safety",
                theory: [
                    "Node.js with TypeScript",
                    "Setting up Node.js project with TypeScript",
                    "Type definitions for Node.js (@types/node)",
                    "File system operations with types",
                    "Streams and buffers typing",
                    "Child processes and worker threads",

                    "Express.js with TypeScript",
                    "Request and Response type augmentation",
                    "Middleware typing with RequestHandler",
                    "Route parameters and query types",
                    "Body parsing with validation",
                    "Error handling middleware",

                    "API Design with TypeScript",
                    "REST API type definitions",
                    "DTO (Data Transfer Object) patterns",
                    "Request/Response type safety",
                    "API versioning with types",
                    "OpenAPI/Swagger integration",

                    "Authentication & Authorization",
                    "JWT typing and verification",
                    "Middleware for role-based access",
                    "Session management with types",
                    "OAuth flow typing",

                    "Database Integration",
                    "Type-safe database queries",
                    "Repository pattern with TypeScript",
                    "Data mapper pattern",
                    "Connection pooling typing"
                ],
                practicals: [
                    "Set up Express server with TypeScript",
                    "Create typed middleware for authentication",
                    "Implement CRUD API with type safety",
                    "Build validation middleware with Zod/Yup",
                    "Create type-safe database layer",
                    "Implement file upload with typing",
                    "Build WebSocket server with TypeScript",
                    "Create rate limiting middleware",
                    "Implement logging with types",
                    "Build health check endpoint",
                    "Mini project: build a small typed REST API for a blog or todo app (routes, DTOs, middleware, error handler, and tests)",
                    "Mini project: implement a typed WebSocket or Socket.io chat server with strongly typed events and payloads"
                ],
                projects: [
                    "Type-safe REST API for blog",
                    "Real-time API with Socket.io",
                    "Microservice with typed communication",
                    "GraphQL API with TypeScript",
                    "Serverless functions with TypeScript"
                ],
                tools: [
                    "ts-node and ts-node-dev",
                    "Nodemon with TypeScript",
                    "Jest with TypeScript",
                    "Supertest with TypeScript",
                    "ESLint/Prettier for TypeScript"
                ],
                games: [
                    {
                        title: "CheckiO",
                        url: "https://checkio.org/",
                        description: "Coding games and challenges to improve your TypeScript skills."
                    }
                ]
            },
            {
                phase: 5,
                title: "MongoDB & Mongoose with TypeScript",
                targetExperience: ["0-1 Year", "1-2 Years"],
                focus: "Database Type Safety",
                theory: [
                    "Mongoose with TypeScript",
                    "Schema definition with TypeScript",
                    "Model typing with Interface",
                    "Document vs Model types",
                    "Virtual properties typing",
                    "Middleware (pre/post hooks) typing",

                    "Advanced Schema Patterns",
                    "Nested documents typing",
                    "Array of subdocuments",
                    "Reference population typing",
                    "Discriminators for inheritance",
                    "Polymorphic references",

                    "Query Building",
                    "Type-safe find queries",
                    "Aggregation pipeline typing",
                    "Transaction support",
                    "Index definitions with types",

                    "Data Validation",
                    "Schema validation with TypeScript",
                    "Custom validators typing",
                    "Async validators",
                    "Unique constraints",

                    "Performance & Optimization",
                    "Lean queries typing",
                    "Select projections with types",
                    "Pagination typing",
                    "Bulk operations"
                ],
                practicals: [
                    "Create typed Mongoose schemas",
                    "Implement repository pattern with TypeScript",
                    "Build type-safe query builders",
                    "Create aggregation pipelines with types",
                    "Implement transactions with error handling",
                    "Build data migration scripts",
                    "Create seed scripts with types",
                    "Implement full-text search",
                    "Build analytics queries",
                    "Create database indexes",
                    "Mini project: design a type-safe data layer for an e-commerce app (Product, User, Order) using repositories and Mongoose models",
                    "Mini project: build a typed analytics service that exposes functions for common reports (e.g., revenueByDay, topProducts) with precise return types"
                ],
                projects: [
                    "Type-safe e-commerce database",
                    "Social media database schema",
                    "Analytics data layer",
                    "Multi-tenant database",
                    "Real-time data synchronization"
                ],
                patterns: [
                    "Repository pattern",
                    "Data Mapper pattern",
                    "Active Record pattern",
                    "Unit of Work pattern"
                ]
            },
            {
                phase: 6,
                title: "Full-Stack MERN with TypeScript",
                targetExperience: ["1-2 Years"],
                focus: "End-to-End Type Safety",
                theory: [
                    "Project Architecture",
                    "Monorepo setup with TypeScript",
                    "Shared types between frontend and backend",
                    "API client generation",
                    "Environment configuration typing",

                    "API Communication",
                    "Axios instance with TypeScript",
                    "API response type safety",
                    "Error handling patterns",
                    "Request/response interceptors",

                    "State Synchronization",
                    "Real-time updates with WebSocket",
                    "Server-sent events typing",
                    "Optimistic updates with types",
                    "Offline support",

                    "Testing Strategy",
                    "Unit testing with Jest",
                    "Integration testing",
                    "E2E testing with Cypress",
                    "API testing with Supertest",

                    "Deployment & DevOps",
                    "Docker configuration with TypeScript",
                    "CI/CD pipeline typing",
                    "Environment variables validation",
                    "Monitoring and logging"
                ],
                practicals: [
                    "Set up monorepo with shared types",
                    "Create type-safe API client",
                    "Implement real-time features",
                    "Build comprehensive test suite",
                    "Create Docker configuration",
                    "Implement CI/CD pipeline",
                    "Set up monitoring",
                    "Create deployment scripts",
                    "Implement feature flags",
                    "Build admin dashboard",
                    "Mini project: create a small MERN-style app where backend, frontend, and shared types live in a monorepo and are fully type-safe end-to-end",
                    "Mini project: implement a typed feature-flag system that is shared between client and server"
                ],
                projects: [
                    "Full-stack e-commerce platform",
                    "Real-time collaboration tool",
                    "Social media application",
                    "Project management system",
                    "Learning management system"
                ],
                deployment: [
                    "Vercel with TypeScript",
                    "Heroku with TypeScript",
                    "AWS with TypeScript",
                    "Docker compose setup",
                    "Kubernetes configuration"
                ]
            },
            {
                phase: 7,
                title: "Testing & Quality Assurance",
                targetExperience: ["1-2 Years"],
                focus: "Type-Safe Testing",
                theory: [
                    "Testing Fundamentals",
                    "Unit testing with TypeScript",
                    "Integration testing patterns",
                    "Mocking and stubbing",
                    "Test doubles: mocks, stubs, spies",

                    "Testing Tools",
                    "Jest configuration for TypeScript",
                    "Testing Library for React",
                    "Supertest for API testing",
                    "Cypress for E2E testing",

                    "Test Strategies",
                    "Test-driven development (TDD)",
                    "Behavior-driven development (BDD)",
                    "Property-based testing",
                    "Snapshot testing",

                    "Quality Assurance",
                    "Type checking as part of CI",
                    "Linting with ESLint",
                    "Code formatting with Prettier",
                    "Code coverage reports",

                    "Performance Testing",
                    "Load testing with types",
                    "Stress testing",
                    "Performance profiling",
                    "Memory leak detection"
                ],
                practicals: [
                    "Write unit tests for utility functions",
                    "Test React components with Testing Library",
                    "Test Express API endpoints",
                    "Write E2E tests with Cypress",
                    "Implement TDD workflow",
                    "Create integration tests",
                    "Set up code coverage",
                    "Implement CI pipeline",
                    "Write performance tests",
                    "Create smoke tests"
                ],
                projects: [
                    "Test suite for existing application",
                    "Performance benchmarking tool",
                    "Load testing framework",
                    "Quality assurance dashboard"
                ],
                tools: [
                    "Jest with ts-jest",
                    "@testing-library/react",
                    "Supertest with TypeScript",
                    "Cypress with TypeScript",
                    "Playwright with TypeScript"
                ]
            },
            {
                phase: 8,
                title: "Advanced Patterns & Optimization",
                targetExperience: ["1-2 Years"],
                focus: "Production Excellence",
                theory: [
                    "Advanced Type Patterns",
                    "Conditional types with inference",
                    "Template literal types",
                    "Mapped types as clauses",
                    "Recursive type aliases",

                    "Performance Optimization",
                    "Type-only imports/exports",
                    "Project references",
                    "Incremental compilation",
                    "Build caching strategies",

                    "Code Organization",
                    "Barrel exports with types",
                    "Namespace organization",
                    "Module augmentation",
                    "Declaration merging",

                    "Tooling Integration",
                    "Editor configuration (VSCode)",
                    "Debugging TypeScript",
                    "Source maps configuration",
                    "Bundle size optimization",

                    "Migration Strategies",
                    "JavaScript to TypeScript migration",
                    "Incremental adoption",
                    "Legacy code integration",
                    "Third-party library typing"
                ],
                practicals: [
                    "Optimize TypeScript compilation",
                    "Implement project references",
                    "Create declaration files",
                    "Migrate JavaScript project",
                    "Set up monorepo",
                    "Implement CI caching",
                    "Create custom ESLint rules",
                    "Build custom transformers",
                    "Implement code generation",
                    "Create documentation generator"
                ],
                projects: [
                    "TypeScript boilerplate generator",
                    "Code migration tool",
                    "Custom ESLint plugin",
                    "Documentation generator",
                    "Build optimization tool"
                ],
                advancedTopics: [
                    "Decorators and metadata",
                    "Custom transformers",
                    "Compiler API usage",
                    "Language service plugins",
                    "TypeScript server plugins"
                ]
            }
        ],
        "Learning Path": {
            "Week 1-2: Fundamentals": [
                "Basic types and interfaces",
                "TypeScript configuration",
                "Simple type annotations"
            ],
            "Week 3-4: React with TypeScript": [
                "Component typing",
                "Hooks with TypeScript",
                "Form handling"
            ],
            "Week 5-6: Backend with TypeScript": [
                "Node.js/Express setup",
                "API typing",
                "Middleware patterns"
            ],
            "Week 7-8: Database Integration": [
                "Mongoose schemas",
                "Repository pattern",
                "Query typing"
            ],
            "Month 3: Full-Stack Integration": [
                "Shared types",
                "End-to-end type safety",
                "Testing strategy"
            ],
            "Month 4-6: Advanced Mastery": [
                "Advanced types",
                "Performance optimization",
                "Production deployment"
            ]
        },
        "TypeScript Configuration Examples": {
            "Strict Configuration": `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}`,

            "React Configuration": `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`
        },
        "Common Type Definitions": {
            "API Response": `export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}`,

            "User Model": `export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}`,

            "React Component Props": `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
}`
        },
        "Assessment Criteria": {
            "Beginner (0-3 months)": [
                "Basic type annotations",
                "Simple interface creation",
                "TypeScript configuration",
                "Basic React component typing"
            ],
            "Intermediate (3-6 months)": [
                "Generic functions and interfaces",
                "Advanced utility types",
                "Full-stack type safety",
                "Testing with TypeScript"
            ],
            "Advanced (6+ months)": [
                "Conditional types and inference",
                "Type manipulation",
                "Performance optimization",
                "Migration strategies",
                "Tooling and automation"
            ]
        },
        "Recommended Tools": {
            "Development": [
                "Visual Studio Code with TypeScript support",
                "TypeScript ESLint",
                "Prettier with TypeScript",
                "ts-node for development"
            ],
            "Testing": [
                "Jest with ts-jest",
                "@testing-library/react",
                "Cypress with TypeScript",
                "Supertest for APIs"
            ],
            "Build & Deployment": [
                "tsc compiler",
                "esbuild for faster builds",
                "swc for compilation",
                "Webpack with ts-loader"
            ],
            "Documentation": [
                "TypeDoc for API documentation",
                "Storybook with TypeScript",
                "OpenAPI TypeScript generators"
            ]
        }
    }
};
