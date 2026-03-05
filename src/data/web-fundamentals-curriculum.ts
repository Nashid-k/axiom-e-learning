export const WEB_FUNDAMENTALS_CURRICULUM = {
    "web-fundamentals": {
        fileName: "web-fundamentals",
        description: "Web Fundamentals & Performance",
        category: "Web Fundamentals",
        subDescription: "Master how the web works, from HTTP protocols to browser rendering, security, and performance optimization.",
        phases: [
            {
                phase: 1,
                title: "How the Web Works",
                theory: [
                    "Client-Server Architecture",
                    "What Happens When You Type a URL",
                    "DNS (Domain Name System)",
                    "DNS Resolution Process",
                    "IP Addresses (IPv4 vs IPv6)",
                    "Ports and Port Numbers",
                    "What is a Web Server",
                    "Static vs Dynamic Websites",
                    "Web Hosting Basics",
                    "Domain Registration"
                ],
                practicals: [
                    "Trace DNS lookup using command line tools",
                    "Inspect network traffic in browser DevTools",
                    "Understand request-response cycle"
                ]
            },
            {
                phase: 2,
                title: "HTTP/HTTPS Protocol",
                theory: [
                    "HTTP Protocol Fundamentals",
                    "HTTP Request Structure (Method, URL, Headers, Body)",
                    "HTTP Response Structure (Status Code, Headers, Body)",
                    "HTTP Methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)",
                    "GET vs POST",
                    "PUT vs PATCH",
                    "Idempotency Concept",
                    "HTTP Status Codes (1xx, 2xx, 3xx, 4xx, 5xx)",
                    "Common Status Codes (200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 500, 503)",
                    "HTTP Headers (Request and Response)",
                    "Content-Type Header",
                    "Cache-Control Header",
                    "Authorization Header",
                    "HTTP/1.1 vs HTTP/2 vs HTTP/3",
                    "HTTPS and SSL/TLS",
                    "How HTTPS Works (Encryption)",
                    "SSL Certificates"
                ],
                practicals: [
                    "Make HTTP requests using fetch API",
                    "Inspect HTTP headers in DevTools",
                    "Understand different status codes in practice",
                    "Compare HTTP/1.1 and HTTP/2 performance"
                ],
                games: [
                    {
                        title: "The Status Rebellion",
                        url: "https://statusrebellion.com/",
                        description: "Master HTTP status codes in this tower defense style game."
                    },
                    {
                        title: "HTTP Cat",
                        url: "https://http.cat/",
                        description: "Learn HTTP status codes with cats."
                    }
                ]
            },
            {
                phase: 3,
                title: "Browser Fundamentals",
                theory: [
                    "Browser Architecture",
                    "Rendering Engine (Blink, WebKit, Gecko)",
                    "JavaScript Engine (V8, SpiderMonkey)",
                    "Browser Rendering Pipeline",
                    "Critical Rendering Path",
                    "DOM Construction",
                    "CSSOM Construction",
                    "Render Tree Construction",
                    "Layout (Reflow)",
                    "Paint",
                    "Compositing",
                    "Reflow vs Repaint",
                    "How to Avoid Unnecessary Reflows",
                    "Browser DevTools Mastery",
                    "Network Tab",
                    "Performance Tab",
                    "Memory Profiling"
                ],
                practicals: [
                    "Profile page rendering in Performance tab",
                    "Identify reflow triggers",
                    "Optimize layout shifts",
                    "Use Lighthouse for audits"
                ]
            },
            {
                phase: 4,
                title: "RESTful API Design",
                theory: [
                    "REST Principles",
                    "Resource-Based URLs",
                    "Stateless Communication",
                    "CRUD Operations Mapping to HTTP Methods",
                    "API Endpoint Naming Conventions",
                    "Singular vs Plural Resource Names",
                    "Nested Resources",
                    "Query Parameters vs Path Parameters",
                    "Filtering, Sorting, Pagination",
                    "API Versioning Strategies (URL, Header, Query)",
                    "HATEOAS Principle",
                    "Richardson Maturity Model",
                    "REST vs GraphQL vs gRPC"
                ],
                practicals: [
                    "Design RESTful API for a blog",
                    "Implement pagination and filtering",
                    "Version an API properly",
                    "Document API endpoints"
                ]
            },
            {
                phase: 5,
                title: "Web Security Fundamentals",
                theory: [
                    "OWASP Top 10",
                    "Cross-Site Scripting (XSS)",
                    "Stored XSS vs Reflected XSS vs DOM-based XSS",
                    "XSS Prevention (Input Validation, Output Encoding)",
                    "Cross-Site Request Forgery (CSRF)",
                    "CSRF Tokens",
                    "SQL Injection",
                    "SQL Injection Prevention (Parameterized Queries)",
                    "Cross-Origin Resource Sharing (CORS)",
                    "Same-Origin Policy",
                    "Preflight Requests",
                    "Content Security Policy (CSP)",
                    "HTTPS Enforcement",
                    "Secure Headers (X-Frame-Options, X-XSS-Protection, X-Content-Type-Options)",
                    "Input Validation vs Sanitization",
                    "Never Trust User Input"
                ],
                practicals: [
                    "Identify XSS vulnerabilities",
                    "Implement CSRF protection",
                    "Configure CORS properly",
                    "Add security headers to responses",
                    "Sanitize user input"
                ]
            },
            {
                phase: 6,
                title: "Authentication & Authorization",
                theory: [
                    "Authentication vs Authorization",
                    "Session-Based Authentication",
                    "Cookies (HttpOnly, Secure, SameSite)",
                    "Token-Based Authentication",
                    "JSON Web Tokens (JWT)",
                    "JWT Structure (Header, Payload, Signature)",
                    "Access Token vs Refresh Token",
                    "Where to Store Tokens (LocalStorage vs SessionStorage vs Cookies)",
                    "OAuth 2.0 Fundamentals",
                    "OAuth Flow (Authorization Code, Implicit, Client Credentials)",
                    "OpenID Connect (OIDC)",
                    "Social Login (Google, GitHub)",
                    "Multi-Factor Authentication (MFA)",
                    "Role-Based Access Control (RBAC)",
                    "Attribute-Based Access Control (ABAC)"
                ],
                practicals: [
                    "Implement session-based auth",
                    "Create JWT authentication system",
                    "Implement OAuth login",
                    "Build role-based access control",
                    "Secure API endpoints with authentication"
                ]
            },
            {
                phase: 7,
                title: "Web Performance Optimization",
                theory: [
                    "Why Performance Matters",
                    "Core Web Vitals (LCP, FID, CLS)",
                    "Largest Contentful Paint (LCP)",
                    "First Input Delay (FID)",
                    "Cumulative Layout Shift (CLS)",
                    "Time to First Byte (TTFB)",
                    "First Contentful Paint (FCP)",
                    "Critical Rendering Path Optimization",
                    "Minimize Critical Resources",
                    "Defer Non-Critical JavaScript",
                    "Async vs Defer Script Loading",
                    "Image Optimization (Format, Compression, Lazy Loading)",
                    "WebP and AVIF Formats",
                    "Responsive Images (srcset, sizes)",
                    "Code Splitting",
                    "Lazy Loading (Images, Components)",
                    "Prefetch and Preload",
                    "Resource Hints (dns-prefetch, preconnect, prefetch, preload)",
                    "Bundle Size Optimization"
                ],
                practicals: [
                    "Optimize Core Web Vitals",
                    "Implement lazy loading for images",
                    "Set up code splitting",
                    "Use resource hints for performance",
                    "Analyze bundle size with tools"
                ]
            },
            {
                phase: 8,
                title: "Caching Strategies",
                theory: [
                    "Browser Caching",
                    "Cache-Control Header",
                    "max-age vs s-maxage",
                    "no-cache vs no-store",
                    "must-revalidate",
                    "ETag Header",
                    "Last-Modified Header",
                    "Conditional Requests (If-None-Match, If-Modified-Since)",
                    "HTTP Caching Flow",
                    "Service Worker Caching",
                    "Cache API",
                    "CDN Caching",
                    "Redis for Application Caching",
                    "Memoization",
                    "Cache Invalidation Strategies",
                    "Cache Busting"
                ],
                practicals: [
                    "Configure cache headers",
                    "Implement browser caching strategy",
                    "Set up service worker caching",
                    "Use ETags for validation",
                    "Implement cache busting"
                ]
            },
            {
                phase: 9,
                title: "Progressive Web Apps (PWA)",
                theory: [
                    "What is a PWA",
                    "PWA Benefits",
                    "Service Workers",
                    "Service Worker Lifecycle",
                    "Offline Support",
                    "Background Sync",
                    "Push Notifications",
                    "Web App Manifest",
                    "Add to Home Screen",
                    "App Shell Architecture",
                    "Workbox Library",
                    "PWA vs Native Apps"
                ],
                practicals: [
                    "Create a basic PWA",
                    "Implement service worker for offline support",
                    "Create web app manifest",
                    "Add push notification support",
                    "Test PWA with Lighthouse"
                ]
            },
            {
                phase: 10,
                title: "Web APIs & Modern Features",
                theory: [
                    "Fetch API",
                    "XMLHttpRequest (Legacy)",
                    "fetch vs axios",
                    "WebSockets",
                    "Server-Sent Events (SSE)",
                    "WebSockets vs SSE vs HTTP Polling",
                    "Web Storage (LocalStorage, SessionStorage)",
                    "IndexedDB",
                    "Geolocation API",
                    "Notification API",
                    "Intersection Observer API",
                    "Mutation Observer API",
                    "ResizeObserver API",
                    "Web Workers",
                    "Shared Workers",
                    "Clipboard API",
                    "File API"
                ],
                practicals: [
                    "Use Fetch API for HTTP requests",
                    "Implement real-time updates with WebSockets",
                    "Store data with IndexedDB",
                    "Use Intersection Observer for lazy loading",
                    "Offload tasks to Web Workers"
                ]
            }
        ]
    }
};
