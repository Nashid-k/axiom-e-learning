export const HTTP_PROTOCOL_FOUNDATION = {
    "http-protocol-foundation": {
        id: "http-protocol-foundation",
        fileName: "http-protocol",
        description: "HTTP & Network Protocols",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "From basic HTTP/1.1 requests to Server-Sent Events and WebSockets for real-time AI streams.",
        estimatedHours: 4,
        difficulty: "Intermediate",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "HTTP Anatomy & REST",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "HTTP Request & Response lifecycle",
                    "Methods (GET, POST, PUT, DELETE, PATCH) & Status Codes",
                    "Headers (Accept, Content-Type, Authorization)",
                    "RESTful API Design principles",
                    "CORS (Cross-Origin Resource Sharing) mechanisms"
                ],
                practicals: [
                    "Design a RESTful API for a blog",
                    "Fix a tricky CORS preflight issue in the browser"
                ]
            },
            {
                phase: 2,
                title: "Caching & Optimization",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Cache-Control, ETag, and Last-Modified headers",
                    "Browser Caching vs CDN Caching",
                    "HTTP/2 vs HTTP/1.1 (Multiplexing, Server Push)",
                    "Compression (Gzip, Brotli)"
                ],
                practicals: [
                    "Configure Cache-Control headers for static assets vs dynamic APIs",
                    "Implement an ETag validation check"
                ]
            },
            {
                phase: 3,
                title: "Streaming & Real-Time (AI Focus)",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "Server-Sent Events (SSE): The backbone of LLM chat streams",
                    "WebSockets for bidirectional real-time communication",
                    "gRPC vs REST for internal microservices",
                    "ReadableStream API in the browser",
                    "Handling connection drops and retries during long LLM inferences"
                ],
                practicals: [
                    "Build an SSE endpoint that streams fake LLM tokens chunk-by-chunk",
                    "Consume a ReadableStream in React and render text as it arrives"
                ]
            }
        ]
    }
};
