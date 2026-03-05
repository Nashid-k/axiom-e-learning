
export const EVENT_LOOP_FOUNDATION = {
    "event-loop-foundation": {
        id: "event-loop-foundation",
        fileName: "event-loop",
        description: "Event Loop Fundamentals",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Master the JavaScript Event Loop - the core mechanism that makes asynchronous JavaScript possible. Essential foundation for all async programming.",
        estimatedHours: 4,
        difficulty: "Intermediate",
        phases: [
            {
                phase: 1,
                title: "Event Loop Architecture & Components",
                theory: [
                    "What is the Event Loop (Definition & Purpose)",
                    "Why Event Loop exists (Non-blocking I/O)",
                    "The Call Stack (LIFO data structure)",
                    "The Event Queue / Task Queue (FIFO data structure)",
                    "The Microtask Queue (Promise callbacks, queueMicrotask)",
                    "The Macrotask Queue (setTimeout, setInterval, I/O operations)",
                    "Web APIs / APIs provided by runtime (Timer, DOM, Fetch, etc.)",
                    "Single-threaded execution model",
                    "JavaScript is single-threaded, browser/runtime is not",
                    "Why setTimeout 0 doesn't execute immediately"
                ],
                practicals: [
                    "Visualize the call stack using browser DevTools",
                    "Understand why setTimeout callback executes after synchronous code",
                    "Trace execution order of sync/async code",
                    "Identify what gets pushed to different queues"
                ]
            },
            {
                phase: 2,
                title: "Event Loop Execution Phases",
                theory: [
                    "Event Loop iteration (one complete cycle)",
                    "Phase 1: Execute all synchronous code (Call Stack)",
                    "Phase 2: Process all Microtasks (Promises, queueMicrotask)",
                    "Phase 3: Render/Paint if needed (for browser)",
                    "Phase 4: Process ONE Macrotask (setTimeout, setInterval, I/O)",
                    "Back to Phase 2: Process any new Microtasks from Macrotask",
                    "Repeat until queues are empty",
                    "Microtask precedence over Macrotask",
                    "Why Promises always execute before setTimeout",
                    "Event Loop in browser vs Node.js (libuv model)",
                    "Phases in Node.js libuv (timers, pending, idle, poll, check, close)"
                ],
                practicals: [
                    "Predict execution order of mixed sync/async code",
                    "Understand Promise execution relative to setTimeout",
                    "Write code that demonstrates microtask vs macrotask behavior",
                    "Use queueMicrotask to see microtask queue behavior",
                    "Analyze real-world code execution order"
                ]
            },
            {
                phase: 3,
                title: "Blocking & Non-Blocking Operations",
                theory: [
                    "Blocking operations (long synchronous code blocking the queue)",
                    "Janky UI (poor responsiveness due to blocking)",
                    "Non-blocking patterns (using callbacks, promises, async-await)",
                    "What happens to the UI when JavaScript is blocked",
                    "Why long tasks freeze the browser",
                    "Breaking long tasks into chunks",
                    "Using setTimeout to yield to browser (long task scheduling)",
                    "RequestAnimationFrame for smooth animations",
                    "requestIdleCallback for background work",
                    "Performance implications of blocking"
                ],
                practicals: [
                    "Create a blocking loop and observe UI freeze",
                    "Refactor blocking code using setTimeout chunks",
                    "Use requestAnimationFrame for smooth animations",
                    "Measure impact of blocking on responsiveness",
                    "Implement background work with requestIdleCallback"
                ]
            },
            {
                phase: 4,
                title: "Common Patterns & Pitfalls",
                theory: [
                    "Callback Hell (Pyramid of Doom)",
                    "Multiple nested callbacks",
                    "Promise chaining to flatten callback hell",
                    "Async/Await for cleaner syntax",
                    "Error handling in callbacks vs promises vs async-await",
                    "Race conditions with callbacks",
                    "Memory leaks from event listeners",
                    "Unresolved promises (hanging callbacks)",
                    "setTimeout precision (not guaranteed execution time)",
                    "Race conditions with async operations",
                    "When to use callbacks vs promises vs async-await"
                ],
                practicals: [
                    "Refactor callback hell code to use promises",
                    "Convert promise chains to async-await",
                    "Handle errors in different async patterns",
                    "Identify potential race conditions",
                    "Write robust async code with proper error handling",
                    "Debug async code using DevTools"
                ]
            }
        ],
        coreConceptMaps: {
            "Browser Event Loop": {
                context: "Use this variant in browser-specific contexts",
                specifics: ["DOM rendering between macrotasks", "requestAnimationFrame timing", "Paint events"]
            },
            "Node.js Event Loop": {
                context: "Use this variant in Node.js-specific contexts",
                specifics: ["libuv phases", "File I/O timing", "Stream events"]
            }
        },
        commonMisunderstandings: [
            "setTimeout doesn't execute 'in 100ms', it's added to queue after 100ms",
            "Event loop doesn't interrupt execution - it waits for call stack to be empty",
            "Promises DON'T bypass the event loop - they use microtask queue",
            "The event loop is not an infinite loop waiting - it stops when all queues are empty"
        ],
        relatedTopics: [
            "Callbacks & Callback Functions",
            "Promises & Promise Chains",
            "Async/Await Syntax",
            "Error Handling in Async Code",
            "Performance & Janky Frames"
        ],
        resources: [
            {
                type: "video",
                title: "What the heck is the event loop anyway?",
                url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
                duration: "26:52",
                channel: "JSConf"
            },
            {
                type: "interactive",
                title: "Loupe - Event Loop Visualizer",
                url: "http://latentflip.com/loupe/",
                description: "Visualize JavaScript execution with event loop"
            }
        ]
    }
};
