
export const AUTHENTICATION_FOUNDATION = {
    "authentication-foundation": {
        id: "authentication-foundation",
        fileName: "authentication",
        description: "Authentication & Authorization Fundamentals",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Master the difference between authentication and authorization, and understand modern authentication patterns (Session, JWT, OAuth). Critical for any web application.",
        estimatedHours: 6,
        difficulty: "Intermediate",
        phases: [
            {
                phase: 1,
                title: "Authentication vs Authorization",
                theory: [
                    "What is Authentication (Verifying who you are)",
                    "What is Authorization (Verifying what you can do)",
                    "Authentication examples: Login, password verification",
                    "Authorization examples: Role-based access, permission levels",
                    "Why both are needed",
                    "Order of operations: Authenticate first, then authorize",
                    "Common misconception: Conflating authentication and authorization",
                    "Identity (Who are you?)",
                    "Permissions (What can you access?)",
                    "Roles (Job categories with specific permissions)"
                ],
                practicals: [
                    "Identify authentication vs authorization in real applications",
                    "Design a simple role-based permission system",
                    "Understand why authorization without authentication is insecure",
                    "Create examples of different authorization patterns"
                ]
            },
            {
                phase: 2,
                title: "Session-Based Authentication",
                theory: [
                    "How Session-Based Auth works",
                    "Step 1: User provides credentials (username/password)",
                    "Step 2: Server verifies credentials",
                    "Step 3: Server creates a session (stores in memory/database)",
                    "Step 4: Server sends session ID to client (in cookie)",
                    "Step 5: Client sends session ID with every request",
                    "Server validates session ID from request",
                    "Cookies (HttpOnly flag, Secure flag, SameSite attribute)",
                    "Session storage (In-memory, Database, Redis)",
                    "Session expiration and timeout",
                    "Stateful authentication (server maintains state)"
                ],
                practicals: [
                    "Create a session-based login system",
                    "Set secure cookie flags (HttpOnly, Secure, SameSite)",
                    "Implement session timeout",
                    "Handle session validation on protected routes",
                    "Understand cookie format and transmission",
                    "Create logout functionality (destroy session)"
                ]
            },
            {
                phase: 3,
                title: "Token-Based Authentication (JWT)",
                theory: [
                    "How Token-Based Auth works (Stateless)",
                    "JSON Web Tokens (JWT) structure",
                    "JWT Header (Algorithm, Token Type)",
                    "JWT Payload (Claims, User Info)",
                    "JWT Signature (HMAC with secret or RSA)",
                    "Token creation process",
                    "Token validation process",
                    "Signed vs Unsigned tokens",
                    "Token expiration (exp claim)",
                    "Refresh tokens vs Access tokens",
                    "Storing tokens (localStorage, sessionStorage, cookies)",
                    "Security implications of each storage location",
                    "Stateless authentication (no server-side session storage)"
                ],
                practicals: [
                    "Create and sign a JWT",
                    "Validate a JWT signature",
                    "Implement token expiration",
                    "Create refresh token flow",
                    "Handle token errors and expiration",
                    "Decide between access and refresh tokens",
                    "Choose secure token storage method",
                    "Decode JWT payload without validation (dangers)"
                ]
            },
            {
                phase: 4,
                title: "OAuth 2.0 & Third-Party Authentication",
                theory: [
                    "Why OAuth 2.0 (Delegated authorization)",
                    "OAuth 2.0 Flow (High-level overview)",
                    "Authorization Code Flow (Most common, most secure)",
                    "Implicit Flow (Deprecated, security concerns)",
                    "Client Credentials Flow (Service-to-service)",
                    "Resource Owner Password Credentials (Legacy)",
                    "Tokens in OAuth: Access Token, Refresh Token, ID Token",
                    "OpenID Connect (OIDC) - Authentication layer on OAuth",
                    "Social Login (Google, GitHub, Facebook)",
                    "Scopes in OAuth (What permissions user grants)",
                    "Consent screens",
                    "Refresh token rotation",
                    "Difference between OAuth for authentication vs authorization"
                ],
                practicals: [
                    "Implement OAuth login with a provider (Google/GitHub)",
                    "Handle OAuth callback",
                    "Store and refresh OAuth tokens",
                    "Understand scope permissions",
                    "Handle user consent flow",
                    "Implement logout with OAuth provider",
                    "Create hybrid auth (Local + OAuth)"
                ]
            },
            {
                phase: 5,
                title: "Authorization Patterns",
                theory: [
                    "Role-Based Access Control (RBAC)",
                    "Define Roles (Admin, User, Moderator)",
                    "Assign roles to users",
                    "Check user role on protected resources",
                    "Attribute-Based Access Control (ABAC)",
                    "Fine-grained permissions",
                    "Dynamic authorization (based on context)",
                    "Permission inheritance",
                    "Authorization vs Authentication (server-side)",
                    "Middleware for authorization checks",
                    "Resource-level permissions",
                    "Field-level permissions (data filtering)"
                ],
                practicals: [
                    "Implement RBAC system",
                    "Create permission middleware",
                    "Handle authorization errors (403 Forbidden)",
                    "Implement role-based route protection",
                    "Create fine-grained permissions",
                    "Filter data based on user permissions",
                    "Audit authorization decisions"
                ]
            },
            {
                phase: 6,
                title: "Security Best Practices",
                theory: [
                    "Never store passwords in plain text (Hash passwords)",
                    "Hashing algorithms (bcrypt, scrypt, Argon2)",
                    "Salting (Protect against rainbow tables)",
                    "Secure password comparison (Timing attack prevention)",
                    "Password requirements (Length, complexity)",
                    "Rate limiting on login endpoints",
                    "HTTPS requirement for authentication",
                    "Secure session/token transmission",
                    "CSRF protection (Cross-Site Request Forgery)",
                    "CORS configuration for auth",
                    "Secure logout (Clear tokens, invalidate sessions)",
                    "Account recovery (Secure reset flows)",
                    "Multi-Factor Authentication (MFA/2FA)",
                    "Device fingerprinting and suspicious login detection",
                    "Audit logging (Track auth events)",
                    "Secrets management (Never commit secrets)"
                ],
                practicals: [
                    "Hash passwords using bcrypt",
                    "Implement rate limiting on login",
                    "Add CSRF tokens to login forms",
                    "Configure CORS for authentication",
                    "Implement secure password reset flow",
                    "Add MFA/2FA support",
                    "Create audit logs for auth events",
                    "Detect and prevent brute force attacks",
                    "Use environment variables for secrets"
                ]
            }
        ],
        comparisonTable: {
            headers: ["Aspect", "Session-Based", "Token-Based (JWT)", "OAuth 2.0"],
            rows: [
                ["Stateful?", "Yes (server stores)", "No (stateless)", "Delegated"],
                ["Token Storage", "Cookie (secure)", "localStorage/Cookie", "Server (secure)"],
                ["Scalability", "Harder (session replication)", "Easier (any server)", "N/A (delegated)"],
                ["CSRF Vulnerability", "Yes (needs protection)", "No (token in header)", "No"],
                ["Use Case", "Simple web apps", "APIs, SPAs", "Third-party access"],
                ["Best For", "Monoliths", "Microservices, Mobile", "Federated auth"]
            ]
        },
        commonMisunderstandings: [
            "JWT is not encrypted (it's signed) - anyone can read the payload",
            "Storing JWT in localStorage is vulnerable to XSS attacks",
            "OAuth is not authentication (it's delegated authorization), though OIDC adds auth",
            "Authentication and authorization are different and both needed",
            "Hashing is one-way; encryption is two-way",
            "Session ID and token are different (session ID is just an identifier)"
        ],
        relatedTopics: [
            "HTTP Protocol & Headers",
            "Cookies & Headers",
            "HTTPS & SSL/TLS",
            "Cryptography Basics",
            "Password Hashing",
            "API Security",
            "CORS",
            "CSRF Protection"
        ],
        securityChecklist: [
            "[ ] Passwords hashed with strong algorithm (bcrypt/Argon2)",
            "[ ] Session/Token over HTTPS only",
            "[ ] HttpOnly and Secure flags on cookies",
            "[ ] SameSite protection against CSRF",
            "[ ] Rate limiting on auth endpoints",
            "[ ] Logout clears all tokens/sessions",
            "[ ] Authorization checked on every protected endpoint",
            "[ ] Sensitive operations require re-authentication",
            "[ ] Failed login attempts logged and monitored",
            "[ ] Password reset flow is secure"
        ]
    }
};
