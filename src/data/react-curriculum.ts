export const REACT_CURRICULUM = {
    "react-1": {
        fileName: "reactjs-1",
        description: "React & AI Fundamentals",
        category: "React",
        subDescription: "Start your journey with JSX, components, and state management essentials for building AI-ready chat interfaces.",
        experienceLevels: ["1yoe"],
        phases: [
            {
                phase: 1,
                title: "The Digital Restaurant: Introduction to React",
                targetExperience: ["1yoe"],
                theory: [
                    "The Problem: Vanilla JS is hard to scale when managing complex AI chat states",
                    "The Solution: React (The Restaurant Manager) - Organizes work into stations",
                    "Single Page Applications (SPA): The menu stays the same, only the plates change",
                    "Vite Setup: Building your professional kitchen in 60 seconds"
                ],
                practicals: [
                    "Vite Installation: Run `npm create vite@latest`",
                    "The Clean Break: Delete the boilerplate code and start with a blank canvas",
                    "The Hello Chef: Render 'Welcome to my AI Kitchen'"
                ]
            },
            {
                phase: 2,
                title: "The Recipe Language: JSX Basics",
                targetExperience: ["1yoe"],
                theory: [
                    "JSX: Writing 'HTML' inside your JavaScript",
                    "Rules of the Recipe: Single parent elements",
                    "JavaScript in JSX: Using `{}` to inject logic or AI responses dynamically"
                ],
                practicals: [
                    "The Variable Injection: Display an AI-generated string using `{}`",
                    "The Style Object: Apply inline styles to a chat bubble"
                ]
            },
            {
                phase: 3,
                title: "Cooking Stations: Functional Components",
                targetExperience: ["1yoe"],
                theory: [
                    "Components: Independent Stations (ChatBubble, PromptInput, Header)",
                    "Reusability: Creating one 'Chat Bubble' and using it 100 times",
                    "The Return Statement: What the component renders"
                ],
                practicals: [
                    "Station Creation: Build a `ChatBubble` component in a separate file",
                    "The Multi-Serve: Render your `ChatBubble` 5 times on the page"
                ]
            },
            {
                phase: 4,
                title: "The Order Slip: Props Basics",
                targetExperience: ["1yoe"],
                theory: [
                    "Props: The 'Order Slip' (Instructions passed from Manager to Chef)",
                    "One-Way Flow: Information always goes down",
                    "Destructuring: Getting the instructions quickly (`{ message, role }`)",
                    "Children: Passing 'Special Content' inside a wrapper"
                ],
                practicals: [
                    "The Custom Order: Pass a `role` (user/ai) to your `ChatBubble` to change its color",
                    "The Avatar: Pass an image URL as a prop and display it next to the chat bubble"
                ]
            },
            {
                phase: 5,
                title: "The Kitchen Memory: useState Hook",
                targetExperience: ["1yoe"],
                theory: [
                    "State: The Station's Memory (What did the user just type?)",
                    "Immutability: Why we use `setCount` instead of `count++`",
                    "Re-rendering: When memory changes, the UI updates instantly"
                ],
                practicals: [
                    "The Input Mirror: Create a text box that displays the prompt as you type",
                    "The Toggle: Build a switch to change between GPT-3.5 and GPT-4 models"
                ]
            },
            {
                phase: 6,
                title: "Advanced Memory: Arrays in State",
                targetExperience: ["1yoe"],
                theory: [
                    "The Spread Operator (`...`): Adding a new message to the chat history array",
                    "Updating Lists: Adding items without 'breaking' the memory",
                    "Lifting State Up: Moving the message array to the Manager so both input and display can see it"
                ],
                practicals: [
                    "The Chat History: Build a state array that holds objects `{role: 'user', content: 'hello'}`",
                    "The Send Button: Append a new message to the array when clicked"
                ]
            },
            {
                phase: 7,
                title: "The Ticket System: Map & Keys",
                targetExperience: ["1yoe"],
                theory: [
                    "Map: Rendering 100 chat bubbles from 1 array of messages",
                    "Why Keys? Preventing the 'Mix-up' when items are re-ordered or appended",
                    "Filtering the Menu: Displaying only system logs vs user chat"
                ],
                practicals: [
                    "The Chat Feed: Map through the state array and render `ChatBubble` components",
                    "The Scroll: Ensure the latest mapped item forces the window to scroll down"
                ]
            }
        ]
    },
    "react-2": {
        fileName: "reactjs-2",
        description: "React AI Integrations & Hooks",
        category: "React",
        subDescription: "Master hooks and streaming text patterns to build realtime AI applications.",
        experienceLevels: ["2yoe", "3yoe"],
        phases: [
            {
                phase: 8,
                title: "The Side Hustle: useEffect & AI Fetching",
                targetExperience: ["2yoe"],
                theory: [
                    "Side Effects: Tasks outside main rendering (Fetching from OpenAI)",
                    "Dependency Array: When should we fetch? (On mount, or when prompt changes?)",
                    "Cleanup Function: Aborting a fetch request if the user navigates away"
                ],
                practicals: [
                    "The Basic Fetch: Send a prompt to a mock API and display the result when it arrives",
                    "The Loading State: Show an animated typing indicator while waiting for the API"
                ]
            },
            {
                phase: 9,
                title: "The Secret Drawer: useRef for Streaming",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "useRef: A drawer that keeps its contents without triggering a re-render",
                    "DOM Access: Reaching out to auto-scroll the chat window to the bottom",
                    "Streaming Text: Using a ref to hold the accumulated text stream before forcing a batch UI update"
                ],
                practicals: [
                    "The Auto-Scroll: Make the chat window scroll to the bottom automatically when a new message arrives",
                    "The Stream Buffer: Use a ref to collect SSE (Server Sent Events) chunks smoothly"
                ]
            },
            {
                phase: 10,
                title: "Global State & Context",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Prop Drilling: Passing a 'theme' or 'api_key' through 10 components",
                    "Context: The Loudspeaker (One message for EVERYONE to hear)",
                    "Provider: The person holding the microphone"
                ],
                practicals: [
                    "The Theme Toggle: Use Context to switch the entire chat UI to 'Dark Mode'",
                    "The Settings: Store the user's selected AI model in a context provider"
                ]
            },
            {
                phase: 11,
                title: "Complex State: useReducer for Chat Sessions",
                targetExperience: ["3yoe"],
                theory: [
                    "useReducer: A professional 'Order Form' for complex state changes",
                    "State & Action: Handling multiple events (STREAM_START, CHUNK_ARRIVED, STREAM_END, ERROR)",
                    "useReducer vs useState: Why complex AI chat logic needs reducers"
                ],
                practicals: [
                    "Build a reducer that manages a multi-thread chat interface (sidebar with sessions, main active window)"
                ]
            },
            {
                phase: 12,
                title: "Sharp Tools & Performance",
                targetExperience: ["3yoe"],
                theory: [
                    "useMemo: Storing the result of heavy Markdown parsing so you don't re-parse the whole chat log on every keystroke",
                    "useCallback: Preventing child components from re-rendering unnecessarily",
                    "React.memo for expensive syntax-highlighter components"
                ],
                practicals: [
                    "Use useMemo to parse a large markdown AI response without lagging the text input",
                    "Use Chrome DevTools to identify render bottlenecks during high-speed text streaming"
                ]
            }
        ]
    },
    "react-3": {
        fileName: "reactjs-3",
        description: "Enterprise React & Vercel AI SDK",
        category: "React",
        subDescription: "Master the Vercel AI SDK, Generative UI, Next.js Server Components, and Enterprise State.",
        experienceLevels: ["4yoe", "4+yoe"],
        phases: [
            {
                phase: 13,
                title: "Vercel AI SDK: The useChat Hook",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Introduction to `ai` package (Vercel AI SDK)",
                    "The `useChat` hook: Managing messages, loading states, and automatic streaming",
                    "The `useCompletion` hook for autocomplete text areas",
                    "Connecting the frontend hook to a Next.js Edge API route"
                ],
                practicals: [
                    "Replace a 50-line custom fetch/stream implementation with 3 lines of `useChat`",
                    "Implement a stop button (`stop()`) to halt an AI generation mid-stream"
                ]
            },
            {
                phase: 14,
                title: "Generative UI (RSC & AI SDK)",
                targetExperience: ["4+yoe"],
                theory: [
                    "React Server Components (RSC): Cooking in the back-office",
                    "Streaming React Components directly from the LLM (Generative UI)",
                    "The `ai/rsc` package: Streaming UI states instead of plain text",
                    "Creating dynamic interactive widgets (Weather card, Stock chart) based on LLM intent"
                ],
                practicals: [
                    "Build a chat app that streams an interactive 'Flight Booking' component instead of text",
                    "Manage `AIState` and `UIState` in a Server Component architecture"
                ]
            },
            {
                phase: 15,
                title: "The Central Warehouse: Redux Toolkit (Optional)",
                targetExperience: ["4yoe"],
                theory: [
                    "Redux vs Context in 2026: Do we still need it?",
                    "Store, Slices, Actions, and Reducers",
                    "When to use Redux for enterprise configurations (e.g., global prompt templates, user configs)"
                ],
                practicals: [
                    "Move user settings and global prompt library into a Redux slice"
                ]
            },
            {
                phase: 16,
                title: "The ID Badge: JWT & Edge Middleware",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Authentication: Protecting expensive LLM API routes",
                    "JWT (JSON Web Token) and Edge Middleware in Next.js",
                    "Rate Limiting on the Edge to prevent API bankruptcy"
                ],
                practicals: [
                    "Protect an AI route using Next.js Middleware and verify the JWT before allowing generation"
                ]
            }
        ]
    },
    "react-questions": {
        fileName: "reactjs-questions",
        description: "React & AI Interview Bank",
        category: "React",
        subDescription: "Master real-world React interview questions, focusing on hooks, streaming performance, and Next.js.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Entrance Exam: Fundamentals",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Virtual DOM: Why update a blueprint instead of the whole wall?",
                    "Props vs State: Order Slips vs Chef's Memory",
                    "Why do we need a unique `key` when mapping over arrays?"
                ],
                practicals: [
                    "Explain the difference between useEffect and useLayoutEffect"
                ]
            },
            {
                phase: 2,
                title: "The Senior UI Exam: Streaming & Performance",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "How do you handle a rapidly streaming chunk of text without causing massive React re-render lag?",
                    "Explain what React Server Components (RSC) are and how they differ from SSR.",
                    "What is Generative UI and how does the Vercel AI SDK implement it?",
                    "When would you use `useReducer` over `useState` for an AI chat application?"
                ],
                practicals: [
                    "Draw a mental map of how a stream chunk moves from the Edge Network, to a hook, to the DOM"
                ]
            }
        ]
    }
};
