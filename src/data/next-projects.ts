export const NEXT_PROJECTS = {
    fileName: "nextjs-projects",
    rules: {
        category: "Next.js",
        subDescription: "Scale your delivery network. Build high-performance, SEO-friendly applications using the latest Next.js features.",
        studyOrder: "Strict",
        progression: "Local Hubs → Global Franchises",
        alignment: "Mapped strictly to nextjs-1, nextjs-2, nextjs-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            nextjsLevel: "nextjs-1",
            name: "The Digital Menu (File-based Routing)",
            difficulty: "Easy",
            features: ["Create a multi-page menu with folders", "Implement a shared navbar layout", "Handle 404s for missing dishes"],
            concepts: ["Delivery GPS (Routing)", "Shared Branding (Layouts)"]
        },
        {
            id: 2,
            nextjsLevel: "nextjs-1",
            name: "The Order Tracking Page (Dynamic Routes)",
            difficulty: "Easy",
            features: ["Create a route that takes an Order ID as a parameter", "Display the ID on the page"],
            concepts: ["Order IDs ([id])", "Fast-track Links (<Link>)"]
        },
        {
            id: 3,
            nextjsLevel: "nextjs-2",
            name: "The Warehouse Dashboard (Server Components)",
            difficulty: "Medium",
            features: ["Fetch data from a dummy API inside a Server Component", "Use Suspense for loading skeletons"],
            concepts: ["Warehouse Cooking (Server Components)", "Streaming Appetizers (Suspense)"]
        },
        {
            id: 4,
            nextjsLevel: "nextjs-2",
            name: "Daily Special Ticker (ISR)",
            difficulty: "Medium",
            features: ["Create a page that updates its content every 10 seconds without a full rebuild"],
            concepts: ["Shelf-life Control (ISR)", "Static vs Dynamic Rendering"]
        },
        {
            id: 5,
            nextjsLevel: "nextjs-3",
            name: "The Feedback Franchise (Server Actions)",
            difficulty: "Hard",
            features: ["Build a feedback form that saves data directly via Server Actions", "Implement optimistic updates for the 'Sent' message"],
            concepts: ["Direct Order Line (Server Actions)", "Instant Success (Optimistic UI)"]
        },
        {
            id: 6,
            nextjsLevel: "nextjs-3",
            name: "The VIP Lounge (Middleware & Auth)",
            difficulty: "Hard",
            features: ["Set up NextAuth for login", "Protect specific routes using Middleware"],
            concepts: ["The Gate Bouncer (Middleware)", "ID Badges (Authentication)"]
        }
    ]
};
