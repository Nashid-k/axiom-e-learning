export const EVENT_LOOP_FOUNDATION = {
    "event-loop-foundation": {
        id: "event-loop-foundation",
        fileName: "event-loop",
        description: "Event Loop Fundamentals",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Master the JavaScript Event Loop - the core mechanism that makes asynchronous JavaScript possible.",
        estimatedHours: 4,
        difficulty: "Intermediate",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Event Loop Architecture & Components",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "What is the Event Loop (Definition & Purpose)",
                    "Why Event Loop exists (Non-blocking I/O)",
                    "The Call Stack (LIFO data structure)",
                    "The Event Queue / Task Queue (FIFO data structure)",
                    "The Microtask Queue (Promise callbacks, queueMicrotask)",
                    "The Macrotask Queue (setTimeout, setInterval, I/O operations)",
                    "Web APIs / APIs provided by runtime"
                ],
                practicals: [
                    "Visualize the call stack using browser DevTools",
                    "Trace execution order of sync/async code"
                ]
            },
            {
                phase: 2,
                title: "Event Loop Execution Phases",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Event Loop iteration (one complete cycle)",
                    "Phase 1: Execute all synchronous code (Call Stack)",
                    "Phase 2: Process all Microtasks (Promises, queueMicrotask)",
                    "Phase 3: Render/Paint if needed (for browser)",
                    "Microtask precedence over Macrotask",
                    "Event Loop in browser vs Node.js (libuv model)"
                ],
                practicals: [
                    "Predict execution order of mixed sync/async code",
                    "Use queueMicrotask to see microtask queue behavior"
                ]
            },
            {
                phase: 3,
                title: "Blocking & Non-Blocking Patterns",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Blocking operations (long synchronous code blocking the queue)",
                    "Janky UI (poor responsiveness due to blocking)",
                    "Non-blocking patterns (using callbacks, promises, async-await)",
                    "Using setTimeout to yield to browser (long task scheduling)",
                    "RequestAnimationFrame for smooth animations"
                ],
                practicals: [
                    "Create a blocking loop and observe UI freeze",
                    "Refactor blocking code using setTimeout chunks"
                ]
            },
            {
                phase: 4,
                title: "AI Streams & Event Loop Optimization",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Handling Server-Sent Events (SSE) and AI token streams without blocking the main thread",
                    "Web Workers vs Main Thread for formatting Markdown/Syntax highlighting on the fly",
                    "Backpressure handling when LLM inference outpaces UI rendering",
                    "Using requestIdleCallback for background telemetry and AI predictive fetching"
                ],
                practicals: [
                    "Implement a Web Worker to parse streaming Markdown chunks",
                    "Write an event-loop optimized throttle for a fast AI token stream"
                ]
            }
        ]
    }
};
