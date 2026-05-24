export const AUTHENTICATION_FOUNDATION = {
    "authentication-foundation": {
        id: "authentication-foundation",
        fileName: "authentication",
        description: "Authentication & Authorization",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Master modern security patterns from basic session auth to complex OAuth flows and M2M AI communications.",
        estimatedHours: 5,
        difficulty: "Advanced",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Core Concepts & Passwords",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Authentication vs Authorization (Who are you vs What can you do)",
                    "Hashing vs Encryption",
                    "Salt and Pepper in password hashing (Bcrypt/Argon2)",
                    "Rainbow table attacks and how to prevent them"
                ],
                practicals: [
                    "Implement basic password hashing with bcrypt",
                    "Create a secure registration endpoint"
                ]
            },
            {
                phase: 2,
                title: "Session vs Token Based Auth",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Stateful vs Stateless authentication",
                    "Session IDs and Server Memory",
                    "JSON Web Tokens (JWT) structure (Header, Payload, Signature)",
                    "Symmetric (HS256) vs Asymmetric (RS256) signing",
                    "Where to store tokens (Local Storage vs HttpOnly Cookies)"
                ],
                practicals: [
                    "Generate and verify a JWT token",
                    "Implement an HttpOnly cookie strategy for token storage"
                ]
            },
            {
                phase: 3,
                title: "OAuth 2.0 & OpenID Connect",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "The OAuth 2.0 Actors (Resource Owner, Client, Authorization Server)",
                    "Authorization Code Flow vs Implicit Flow",
                    "OpenID Connect (OIDC) and the ID Token",
                    "PKCE (Proof Key for Code Exchange) for SPAs",
                    "Social Login Providers (GitHub, Google, Apple)"
                ],
                practicals: [
                    "Implement an OAuth flow using NextAuth or Passport",
                    "Decode and validate an OIDC ID Token"
                ]
            },
            {
                phase: 4,
                title: "AI Agents & M2M Auth",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Machine-to-Machine (M2M) Authentication using Client Credentials Flow",
                    "Providing secure, scoped API keys to Autonomous AI Agents",
                    "Zero Trust Architecture for multi-agent workflows",
                    "Sandboxing: Running untrusted AI code securely",
                    "Rate limiting and token usage quotas for AI keys"
                ],
                practicals: [
                    "Issue a restricted API Key for an AI agent to execute DB queries",
                    "Implement an API Gateway rate limiter based on LLM token costs"
                ]
            }
        ]
    }
};
