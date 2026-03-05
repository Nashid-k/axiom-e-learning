
export const PERFORMANCE_FOUNDATION = {
    "performance-foundation": {
        id: "performance-foundation",
        fileName: "performance",
        description: "Web Performance Optimization",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Master performance optimization strategies for web applications. Learn about Core Web Vitals, critical rendering path, and practical optimization techniques.",
        estimatedHours: 6,
        difficulty: "Intermediate",
        phases: [
            {
                phase: 1,
                title: "Performance Metrics & Core Web Vitals",
                theory: [
                    "Why Performance Matters (User experience, SEO, conversion rates)",
                    "Performance Perception (Perceived vs Actual)",
                    "Core Web Vitals (Google's key metrics)",
                    "Largest Contentful Paint (LCP - How fast content loads)",
                    "- LCP measures when largest content element is visible",
                    "- Target: < 2.5 seconds",
                    "- Good = Fast loading",
                    "First Input Delay (FID - Responsiveness to user input)",
                    "- FID measures time from input to response",
                    "- Target: < 100 milliseconds",
                    "- Good = Responsive page",
                    "Cumulative Layout Shift (CLS - Visual stability)",
                    "- CLS measures unexpected layout shifts",
                    "- Target: < 0.1",
                    "- Good = Stable layout",
                    "Other Important Metrics",
                    "- First Contentful Paint (FCP)",
                    "- Time to First Byte (TTFB)",
                    "- Speed Index",
                    "- Interaction to Next Paint (INP - replacing FID)",
                    "Lighthouse Audits",
                    "Performance scores (0-100)",
                    "Throttling (Simulating slow connections)"
                ],
                practicals: [
                    "Measure Core Web Vitals using Lighthouse",
                    "Use PageSpeed Insights",
                    "Monitor metrics using web-vitals library",
                    "Understand your current performance",
                    "Set performance budgets",
                    "Run Lighthouse audits regularly"
                ]
            },
            {
                phase: 2,
                title: "Critical Rendering Path",
                theory: [
                    "What is Critical Rendering Path (Sequence to render page)",
                    "Step 1: Process HTML → Build DOM Tree",
                    "Step 2: Process CSS → Build CSSOM Tree",
                    "Step 3: Combine DOM + CSSOM → Render Tree",
                    "Step 4: Layout (Calculate positions and sizes)",
                    "Step 5: Paint (Draw pixels to screen)",
                    "Step 6: Composite (Combine layers)",
                    "Blocking Resources",
                    "- CSS is render-blocking (must process before paint)",
                    "- JavaScript is parser-blocking (stops DOM building)",
                    "Minimizing Critical Resources",
                    "- Reduce number of critical resources",
                    "- Reduce critical bytes (compression, minification)",
                    "- Reduce critical path length (dependencies)",
                    "Inline vs External (Trade-offs)",
                    "Script Loading Strategies",
                    "- Default (Parser-blocking)",
                    "- async (Download parallel, execute immediately)",
                    "- defer (Download parallel, execute after parsing)"
                ],
                practicals: [
                    "Identify blocking resources in your app",
                    "Use async/defer for scripts appropriately",
                    "Inline critical CSS",
                    "Defer non-critical CSS",
                    "Preload critical resources",
                    "Analyze CRP waterfall in DevTools"
                ]
            },
            {
                phase: 3,
                title: "Asset Optimization",
                theory: [
                    "JavaScript Optimization",
                    "- Code Splitting (Break into smaller chunks)",
                    "- Tree Shaking (Remove unused code)",
                    "- Minification (Remove unnecessary characters)",
                    "- Uglification (Rename variables to shorter names)",
                    "CSS Optimization",
                    "- Remove unused CSS",
                    "- Minify CSS",
                    "- Critical CSS (Inline above-the-fold styles)",
                    "- CSS-in-JS considerations",
                    "Image Optimization",
                    "- Format selection (WebP, AVIF, JPEG, PNG)",
                    "- Compression (Quality vs file size trade-off)",
                    "- Responsive Images (srcset for different devices)",
                    "- Lazy Loading (Load images on demand)",
                    "- Aspect Ratio boxes (Prevent layout shifts)",
                    "Bundle Analysis",
                    "- Identify large dependencies",
                    "- Find duplicates",
                    "- Understand bundle composition"
                ],
                practicals: [
                    "Implement code splitting in Webpack/Vite",
                    "Set up tree shaking",
                    "Configure image optimization",
                    "Implement responsive images",
                    "Lazy load images and components",
                    "Analyze bundle with webpack-bundle-analyzer",
                    "Measure impact of optimizations"
                ]
            },
            {
                phase: 4,
                title: "Lazy Loading & Code Splitting",
                theory: [
                    "Lazy Loading Concept (Load only what's needed)",
                    "Route-Based Code Splitting",
                    "- Split by route for SPAs",
                    "- Load route bundle only when needed",
                    "Component-Based Code Splitting",
                    "- Dynamic imports",
                    "- Load heavy components on demand",
                    "Prefetch vs Preload",
                    "- Preload (High priority, load soon)",
                    "- Prefetch (Low priority, load later)",
                    "Intersection Observer API",
                    "- Detect when elements enter viewport",
                    "- Perfect for lazy loading images",
                    "Progressive Enhancement",
                    "- Core functionality first",
                    "- Enhanced features load later",
                    "Intersection Observer for Components"
                ],
                practicals: [
                    "Implement route-based code splitting",
                    "Dynamic import components",
                    "Lazy load images with Intersection Observer",
                    "Use React.lazy for component splitting",
                    "Implement prefetch for user interactions",
                    "Measure code split effectiveness"
                ]
            },
            {
                phase: 5,
                title: "Caching & CDN",
                theory: [
                    "Browser Caching (Client-side cache)",
                    "- Cache-Control headers",
                    "- Long-term caching with file versioning",
                    "- Hash-based filenames",
                    "Server-Side Caching",
                    "- Page caching",
                    "- Query result caching",
                    "- Redis/Memcached for expensive operations",
                    "CDN (Content Delivery Network)",
                    "- Geographically distributed servers",
                    "- Serve static assets from edge servers",
                    "- Reduce latency for global users",
                    "Cache Busting",
                    "- Filename hashing (app.abc123.js)",
                    "- Query parameters (app.js?v=1.2.3)",
                    "- ServiceWorker control",
                    "Cache Invalidation Strategy",
                    "- When to clear caches",
                    "- Selective invalidation",
                    "- Cache versioning"
                ],
                practicals: [
                    "Configure long-term browser caching",
                    "Implement hash-based cache busting",
                    "Set up CDN for static assets",
                    "Configure Cache-Control headers",
                    "Implement cache versioning",
                    "Monitor cache effectiveness"
                ]
            },
            {
                phase: 6,
                title: "Performance Monitoring & Continuous Improvement",
                theory: [
                    "Synthetic Monitoring (Lab testing)",
                    "- Lighthouse",
                    "- WebPageTest",
                    "- Controlled environment",
                    "Real User Monitoring (RUM)",
                    "- web-vitals library",
                    "- Measure real users' experience",
                    "- Long-term trends",
                    "Performance Budgets",
                    "- Set target file sizes",
                    "- Set metric targets",
                    "- Alert when exceeded",
                    "Continuous Integration",
                    "- Automated performance testing",
                    "- Fail tests if budget exceeded",
                    "- Track performance over time",
                    "Error Rate Monitoring",
                    "- JavaScript errors",
                    "- Resource loading errors",
                    "- API failures"
                ],
                practicals: [
                    "Set up performance monitoring",
                    "Track Core Web Vitals",
                    "Create performance budget",
                    "Implement RUM with web-vitals",
                    "Add performance testing to CI/CD",
                    "Create performance dashboards",
                    "Alert on performance regressions"
                ]
            }
        ],
        optimizationPriorities: {
            "Quick Wins (Easy, High Impact)": [
                "Enable gzip compression",
                "Minify CSS/JS",
                "Optimize images",
                "Enable browser caching",
                "Remove unused CSS/JS",
                "Defer non-critical JavaScript"
            ],
            "Medium Effort (Moderate Impact)": [
                "Implement code splitting",
                "Set up CDN",
                "Lazy load images and components",
                "Inline critical CSS",
                "Remove third-party scripts",
                "Upgrade to HTTP/2"
            ],
            "Large Effort (Significant Impact)": [
                "Rewrite heavy components",
                "Switch to static generation",
                "Implement service worker",
                "Move to edge computing",
                "Database query optimization",
                "API response optimization"
            ]
        },
        commonMisunderstandings: [
            "Minification is not encryption (code is still readable)",
            "async scripts execute immediately when ready (not in order)",
            "defer scripts execute in order after parsing",
            "Larger images on mobile doesn't mean wasted bytes with srcset",
            "LCP measures when largest element appears, not when it's useful",
            "FID only measures first interaction (not all interactions)",
            "CLS only includes unexpected shifts, intentional scrolls don't count"
        ],
        relatedTopics: [
            "HTTP Protocol",
            "Caching Strategies",
            "CDN",
            "Browser APIs",
            "Server Optimization",
            "Database Optimization",
            "Build Tools (Webpack, Vite)"
        ],
        tools: [
            { name: "Lighthouse", type: "Audit", url: "https://developers.google.com/web/tools/lighthouse" },
            { name: "PageSpeed Insights", type: "Audit", url: "https://pagespeed.web.dev" },
            { name: "WebPageTest", type: "Testing", url: "https://webpagetest.org" },
            { name: "web-vitals", type: "Monitoring", url: "https://github.com/GoogleChrome/web-vitals" },
            { name: "Webpack Bundle Analyzer", type: "Analysis", url: "https://github.com/webpack-contrib/webpack-bundle-analyzer" }
        ]
    }
};
