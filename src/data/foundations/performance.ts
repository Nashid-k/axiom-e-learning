export const PERFORMANCE_FOUNDATION = {
    "performance-foundation": {
        id: "performance-foundation",
        fileName: "performance",
        description: "Web Performance & Optimization",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Master the Critical Rendering Path, Web Vitals, and Edge-optimized inference for lightning-fast applications.",
        estimatedHours: 5,
        difficulty: "Advanced",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Critical Rendering Path",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "DOM and CSSOM Construction",
                    "Render Tree, Layout, and Paint",
                    "Render-blocking vs Parser-blocking resources",
                    "Async and Defer attributes for scripts",
                    "Optimizing image loading (lazy loading, srcsets)"
                ],
                practicals: [
                    "Identify render-blocking resources in a slow webpage",
                    "Implement a responsive image strategy using picture/srcset"
                ]
            },
            {
                phase: 2,
                title: "Core Web Vitals & Metrics",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "LCP (Largest Contentful Paint)",
                    "INP (Interaction to Next Paint) / FID",
                    "CLS (Cumulative Layout Shift)",
                    "Using Lighthouse and the Chrome UX Report",
                    "Bundle splitting and Tree Shaking"
                ],
                practicals: [
                    "Fix a severe CLS issue caused by late-loading images",
                    "Analyze a webpack/vite bundle size and remove dead code"
                ]
            },
            {
                phase: 3,
                title: "Edge Computing & Edge Inference",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "Running code on the Edge (Vercel Edge, Cloudflare Workers)",
                    "Reducing Time to First Byte (TTFB) globally",
                    "WebAssembly (Wasm) for high-performance browser tasks",
                    "Running local ML models using WebGPU and WebLLM",
                    "Memory management and off-loading heavy processing"
                ],
                practicals: [
                    "Deploy an Edge function that returns an ultra-fast response",
                    "Load a small ONNX model in the browser using WebAssembly"
                ]
            }
        ]
    }
};
