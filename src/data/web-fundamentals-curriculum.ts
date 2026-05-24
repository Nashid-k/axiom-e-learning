export const WEB_FUNDAMENTALS_CURRICULUM = {
    "web-fundamentals": {
        fileName: "web-fundamentals",
        description: "Modern Web & AI Architecture",
        category: "Web Fundamentals",
        subDescription: "Master how the web works in the AI era. From Edge Networks and SSE streaming to WebSockets, WebAssembly, and Security.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Big Picture: Clients, Servers, & AI",
                targetExperience: ["1yoe"],
                theory: [
                    "The Restaurant Analogy: Frontend (Dining Area) vs Backend (Kitchen)",
                    "Where do LLMs fit? (The 'Smart Chef' API)",
                    "Data Centers & GPUs: Why AI requires specialized hardware",
                    "Cloud Computing: Why 'The Cloud' is just someone else's computer"
                ],
                practicals: [
                    "Reverse Engineer: Look at ChatGPT and list what is 'Dining Area' vs 'Kitchen'",
                    "Trace a digital packet from your home to an OpenAI server"
                ]
            },
            {
                phase: 2,
                title: "The Phonebook & The Request",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "IP Addresses & DNS: The 'Home Address' of every computer",
                    "HTTP Basics: The language of 'Please' and 'Thank You'",
                    "Methods: GET vs POST (Why AI prompts use POST)",
                    "Headers: Authentication tokens and content types"
                ],
                practicals: [
                    "The Header Check: Identify the payload of a POST request in DevTools",
                    "Project: 'The Order Form' - Write a mock request for an AI prompt in HTTP format"
                ]
            },
            {
                phase: 3,
                title: "Security & The Secret Code",
                targetExperience: ["2yoe"],
                theory: [
                    "HTTPS & SSL/TLS: The Locked Suitcase analogy",
                    "CORS (Cross-Origin Resource Sharing): The Gatekeeper",
                    "Preflight Requests: The 'Knock before you enter' rule",
                    "Why you can't securely call the OpenAI API directly from a browser"
                ],
                practicals: [
                    "The Man-in-the-Middle: Explain how a hacker could steal an API key on HTTP",
                    "The Blocked Request: Try to fetch data from a site that doesn't allow it and see the CORS error"
                ]
            },
            {
                phase: 4,
                title: "Authentication & Authorization",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Authentication: 'Who are you?' vs Authorization: 'What can you do?'",
                    "Cookies vs LocalStorage for session persistence",
                    "JWT (JSON Web Token): A digital, tamper-proof ticket",
                    "Stateless Authentication for scaling massive AI apps"
                ],
                practicals: [
                    "Token Decode: Paste a mock JWT into `jwt.io` and see the hidden information inside",
                    "Explain why storing JWTs in HTTP-only cookies is safer than LocalStorage"
                ]
            },
            {
                phase: 5,
                title: "Streaming & Real-Time Web",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Polling vs Long-Polling vs Server-Sent Events (SSE)",
                    "Why LLM chat apps use SSE for streaming text (One-way stream)",
                    "WebSockets: A 'Live Link' that stays open forever (Two-way stream)",
                    "Using WebSockets for Real-time Voice AI and Agents"
                ],
                practicals: [
                    "Open ChatGPT and watch the Network tab—notice the event stream",
                    "Compare the bandwidth usage of SSE vs WebSockets for a simple chat"
                ]
            },
            {
                phase: 6,
                title: "Performance & The Rendering Pipeline",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "DOM & CSSOM Construction: Building the skeleton and skin",
                    "Reflow vs. Repaint: Why changing layout is expensive",
                    "Core Web Vitals (LCP, FID, CLS)",
                    "Lighthouse: The 'Report Card' for your website"
                ],
                practicals: [
                    "The Audit: Run a Lighthouse test on your favorite site",
                    "The Jitter Test: Fix a Cumulative Layout Shift (CLS) caused by an image loading late"
                ]
            },
            {
                phase: 7,
                title: "Edge Computing & Advanced Caching",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "CDNs (Content Delivery Networks): Hosting close to the user",
                    "Edge Computing: Running backend code (like Vercel Edge) globally for lowest latency",
                    "Why Edge functions are perfect for AI streaming proxies",
                    "Cache-Control and Invalidating stale data"
                ],
                practicals: [
                    "The CDN Search: Find out which CDN is hosting a major AI app",
                    "Design an architecture that caches common AI responses using Edge caching"
                ]
            },
            {
                phase: 8,
                title: "The Future: WebAssembly & WebGPU",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "HTTP/3: Sending data over 'UDP' for ultra-speed",
                    "WebAssembly (WASM): Running C/Rust code in the browser",
                    "WebGPU: Accessing the graphics card directly from JavaScript",
                    "Running LLMs directly in the browser (WebLLM, ONNX Runtime) using WebGPU"
                ],
                practicals: [
                    "WASM Demo: Test a browser-based AI model running locally via WASM/WebGPU",
                    "Explain the privacy and latency benefits of running AI entirely client-side"
                ]
            }
        ]
    }
};
