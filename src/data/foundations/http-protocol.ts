
export const HTTP_PROTOCOL_FOUNDATION = {
    "http-protocol-foundation": {
        id: "http-protocol-foundation",
        fileName: "http-protocol",
        description: "HTTP Protocol & RESTful API Design",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Understand HTTP fundamentals, status codes, methods, and headers. Learn RESTful API design principles. Foundation for all web APIs and client-server communication.",
        estimatedHours: 5,
        difficulty: "Beginner",
        phases: [
            {
                phase: 1,
                title: "HTTP Protocol Basics",
                theory: [
                    "What is HTTP (HyperText Transfer Protocol)",
                    "HTTP is stateless (each request independent)",
                    "HTTP Request/Response cycle",
                    "HTTP Request Structure",
                    "- Request Line (Method, URL, HTTP Version)",
                    "- Headers (Metadata about request)",
                    "- Body (Optional data)",
                    "HTTP Response Structure",
                    "- Status Line (HTTP Version, Status Code, Status Message)",
                    "- Headers (Metadata about response)",
                    "- Body (Response data)",
                    "HTTP vs HTTPS (Encryption)",
                    "Ports (80 for HTTP, 443 for HTTPS)",
                    "HTTP/1.1 vs HTTP/2 vs HTTP/3 (Performance improvements)"
                ],
                practicals: [
                    "Use browser DevTools to inspect HTTP requests",
                    "Use curl or Postman to make manual HTTP requests",
                    "Observe request headers and response headers",
                    "Understand HTTP request/response cycle",
                    "Compare raw HTTP with developer tools representation"
                ]
            },
            {
                phase: 2,
                title: "HTTP Methods & Semantics",
                theory: [
                    "GET (Retrieve resource, no side effects)",
                    "POST (Create new resource)",
                    "PUT (Replace entire resource)",
                    "PATCH (Partial update to resource)",
                    "DELETE (Remove resource)",
                    "HEAD (Like GET but no response body)",
                    "OPTIONS (Describe communication options)",
                    "TRACE (For debugging - rarely used)",
                    "CONNECT (For tunneling - rarely used)",
                    "GET vs POST differences",
                    "PUT vs PATCH differences",
                    "Idempotency (Multiple calls = single call)",
                    "Safe methods (Don't modify state)",
                    "GET, HEAD, OPTIONS are safe",
                    "PUT, PATCH, DELETE are idempotent",
                    "POST is neither safe nor idempotent"
                ],
                practicals: [
                    "Create GET, POST, PUT, PATCH, DELETE requests",
                    "Understand difference between PUT and PATCH",
                    "Identify idempotent vs non-idempotent operations",
                    "Choose correct HTTP method for operation",
                    "Understand method semantics"
                ]
            },
            {
                phase: 3,
                title: "HTTP Status Codes",
                theory: [
                    "Status Code Categories",
                    "1xx (Informational: request received, processing)",
                    "2xx (Success: request received, understood, accepted)",
                    "- 200 OK (Request successful)",
                    "- 201 Created (Resource created)",
                    "- 204 No Content (Success, no body)",
                    "3xx (Redirection: further action needed)",
                    "- 301 Moved Permanently",
                    "- 302 Found (Temporary redirect)",
                    "- 304 Not Modified (Cache validation)",
                    "4xx (Client Error: request has wrong syntax or semantics)",
                    "- 400 Bad Request (Malformed request)",
                    "- 401 Unauthorized (Authentication required)",
                    "- 403 Forbidden (Authenticated but not authorized)",
                    "- 404 Not Found (Resource doesn't exist)",
                    "- 422 Unprocessable Entity (Validation failed)",
                    "5xx (Server Error: server failed to fulfill valid request)",
                    "- 500 Internal Server Error",
                    "- 503 Service Unavailable",
                    "Choosing appropriate status codes"
                ],
                practicals: [
                    "Use correct status code for different scenarios",
                    "Understand 401 vs 403 differences",
                    "Create proper error responses with status codes",
                    "Handle redirects correctly",
                    "Test API response codes"
                ]
            },
            {
                phase: 4,
                title: "HTTP Headers & Content Negotiation",
                theory: [
                    "Request Headers",
                    "- Host (Domain name)",
                    "- User-Agent (Client information)",
                    "- Accept (Requested content types)",
                    "- Accept-Encoding (Requested compression)",
                    "- Authorization (Auth credentials)",
                    "- Content-Type (Request body format)",
                    "- Content-Length (Request body size)",
                    "Response Headers",
                    "- Content-Type (Response body format)",
                    "- Content-Length (Response size)",
                    "- Cache-Control (Caching instructions)",
                    "- Set-Cookie (Set cookies)",
                    "- Location (Redirect target)",
                    "- WWW-Authenticate (Authentication scheme)",
                    "Custom Headers (X- prefix convention)",
                    "CORS Headers (Access-Control-*)",
                    "Content Negotiation (Choosing response format based on Accept)"
                ],
                practicals: [
                    "Set and read custom headers",
                    "Implement content negotiation",
                    "Configure caching headers",
                    "Set secure cookie flags",
                    "Handle CORS headers",
                    "Understand Content-Type negotiation"
                ]
            },
            {
                phase: 5,
                title: "REST API Design Principles",
                theory: [
                    "REST (Representational State Transfer)",
                    "REST Principles",
                    "1. Client-Server Architecture",
                    "2. Statelessness (No server-side session)",
                    "3. Uniform Interface (Consistent API design)",
                    "4. Resource-Based URLs (Not action-based)",
                    "5. Representations (JSON, XML, etc.)",
                    "6. HATEOAS (Hypermedia - optional but powerful)",
                    "Resource Naming",
                    "- Use nouns, not verbs (/users not /getUsers)",
                    "- Plural resources (/users not /user)",
                    "- Hierarchical for relationships (/users/123/posts)",
                    "Query Parameters for filtering, sorting, pagination",
                    "Path Parameters for resource identification",
                    "Versioning strategies (URL, Header, Accept header)",
                    "API Documentation (OpenAPI/Swagger)",
                    "Richardson Maturity Model (Levels 0-3 of REST compliance)"
                ],
                practicals: [
                    "Design RESTful URLs for a resource",
                    "Map CRUD operations to HTTP methods",
                    "Implement filtering and pagination",
                    "Version an API properly",
                    "Document API endpoints",
                    "Choose between nested and query params",
                    "Implement error responses following REST principles"
                ]
            },
            {
                phase: 6,
                title: "Caching & Performance",
                theory: [
                    "Why Caching (Reduce server load, faster response)",
                    "Browser Cache",
                    "Cache-Control Header directives",
                    "- public/private (Shareable or not)",
                    "- max-age (Cache duration in seconds)",
                    "- no-cache (Must revalidate)",
                    "- no-store (Don't cache)",
                    "ETag (Entity Tag for cache validation)",
                    "Last-Modified (For 304 Not Modified)",
                    "Conditional Requests (If-None-Match, If-Modified-Since)",
                    "Expires Header (Legacy caching)",
                    "Server-Side Caching (Redis, Memcached)",
                    "Cache Invalidation (When to clear cache)",
                    "Cache Busting (File versioning for static assets)"
                ],
                practicals: [
                    "Configure Cache-Control headers",
                    "Implement ETag validation",
                    "Handle 304 Not Modified responses",
                    "Set up browser caching",
                    "Implement cache busting for assets",
                    "Design cache invalidation strategy",
                    "Measure cache effectiveness"
                ]
            }
        ],
        httpMethodsTable: {
            headers: ["Method", "Safe?", "Idempotent?", "Has Body?", "Use Case"],
            rows: [
                ["GET", "Yes", "Yes", "No", "Retrieve resource"],
                ["POST", "No", "No", "Yes", "Create resource"],
                ["PUT", "No", "Yes", "Yes", "Replace entire resource"],
                ["PATCH", "No", "No", "Yes", "Partial update"],
                ["DELETE", "No", "Yes", "No", "Remove resource"],
                ["HEAD", "Yes", "Yes", "No", "Like GET, no body"],
                ["OPTIONS", "Yes", "Yes", "No", "Describe options"]
            ]
        },
        statusCodeExamples: {
            "2xx Success": [
                "200 OK - Request succeeded",
                "201 Created - Resource created",
                "204 No Content - Success, no body"
            ],
            "3xx Redirect": [
                "301 Moved Permanently - Permanent redirect",
                "302 Found - Temporary redirect",
                "304 Not Modified - Use cache"
            ],
            "4xx Client Error": [
                "400 Bad Request - Invalid request",
                "401 Unauthorized - Auth required",
                "403 Forbidden - Not authorized",
                "404 Not Found - Resource doesn't exist",
                "422 Unprocessable - Validation failed"
            ],
            "5xx Server Error": [
                "500 Internal Error - Unexpected error",
                "503 Unavailable - Service temporarily down"
            ]
        },
        commonMisunderstandings: [
            "GET should never have a body (server must ignore it)",
            "PUT replaces entire resource, PATCH does partial update",
            "POST is not idempotent - multiple calls create multiple resources",
            "404 doesn't mean 'endpoint doesn't exist', just 'resource not found'",
            "401 is auth required, 403 is auth succeeded but not authorized",
            "REST is not about JSON (it's about principles)",
            "Cache-Control: no-cache doesn't mean 'don't cache' (must revalidate)"
        ],
        relatedTopics: [
            "URL Structure & Query Parameters",
            "HTTP Headers",
            "Cookies",
            "CORS & Same-Origin Policy",
            "Authentication & Authorization",
            "API Documentation",
            "Error Handling"
        ]
    }
};
