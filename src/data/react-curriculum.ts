export const REACT_CURRICULUM = {
    "react-1": {
        fileName: "reactjs-1",
        description: "React Fundamentals",
        category: "React",
        subDescription: "Start your journey with JSX, components, and state management essentials.",
        phases: [
            {
                phase: 0,
                title: "Web & Rendering Foundations",
                theory: [
                    "Benefits of Client-Side Rendering (CSR) in React",
                    "Challenges of CSR (SEO, Initial Load)",
                    "Introduction to Server-Side Rendering (SSR) with Next.js (Brief)"
                ],
                practicals: []
            },
            {
                phase: 1,
                title: "React Basics",
                theory: [
                    {
                        title: "Introduction to React",
                        videos: [
                            {
                                title: "React JS Crash Course",
                                url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
                                duration: "1:48:48",
                                channel: "Traversy Media"
                            },
                            {
                                title: "React in 100 Seconds",
                                url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
                                duration: "02:05",
                                channel: "Fireship"
                            }
                        ]
                    },
                    "Features of React",
                    "Advantages and disadvantages of React",
                    "Why React is called a SPA",
                    "React 19 features",
                    "Directives (use client, use server)",
                    "Compiler vs Transpiler",
                    "Babel (transpilation)",
                    "Webpack",
                    "Hot module replacement",
                    "Purpose of index.html in React",
                    "Purpose of root DOM element",
                    "One-way data binding",
                    "Naming conventions in React",
                    "Why component names start with capital letters",
                    "Why components must return a single parent"
                ],
                practicals: [
                    "Create a React app using Vite",
                    "Create and render a basic component",
                    "Return JSX under a single parent element"
                ],
                games: [
                    {
                        title: "React.gg Visuals",
                        url: "https://react.gg/visualized",
                        description: "Interactive mental models for React principles."
                    }
                ]
            },
            {
                phase: 2,
                title: "JSX & Syntax",
                theory: [
                    "JSX vs JavaScript",
                    "Is JSX mandatory",
                    "JSX vs HTML",
                    "Empty tags in JSX vs HTML",
                    "class vs className",
                    "htmlFor attribute",
                    "Rules of JSX",
                    "React.createElement",
                    "React.cloneElement"
                ],
                practicals: [
                    "Create element using React.createElement",
                    "Use className and htmlFor",
                    "Replace div with Fragment"
                ]
            },
            {
                phase: 3,
                title: "Virtual DOM & Reconciliation",
                theory: [
                    "Real DOM vs Virtual DOM",
                    "Virtual DOM concept and benefits",
                    "React Fiber (Detailed)",
                    "Phases of state updation (triggering, rendering, committing)",
                    "Incremental rendering",
                    {
                        title: "Reconciliation process & Fibre",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=MPQVvKyHRdA",
                                title: "Virtual DOM, Fibre & Reconciliation",
                                duration: "22:15",
                                channel: "Hitesh Choudhary"
                            }
                        ]
                    },
                    "Diffing algorithm basics",
                    "Keys in list rendering",
                    "Why array index should not be used as key",
                    "Why to give key while mapping",
                    "Diffing Algorithm (key usage)",
                    "Reconciliation vs Diffing",
                    "How React updates the actual DOM efficiently"
                ],
                practicals: [
                    "Render list and update one item",
                    "Change list order and observe re-render",
                    "Use proper keys in list rendering"
                ]
            },
            {
                phase: 4,
                title: "State & Props",
                theory: [
                    {
                        title: "What is state",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
                                title: "React useState Hook",
                                duration: "15:30",
                                channel: "Fireship"
                            }
                        ]
                    },
                    "What are props",
                    "State vs props",
                    "Props immutability",
                    "Rules of Hooks",
                    "Where can we use Hooks?",
                    "State immutability",
                    "State vs normal variables",
                    "useState (basics, controlled vs uncontrolled components)",
                    "useState vs useReducer",
                    "useState vs useRef",
                    "Difference between useState and normal JS variables",
                    "State vs local variables",
                    "Why spread operator is used instead of push",
                    "Updating arrays and objects in state",
                    "One-way data flow"
                ],
                practicals: [
                    {
                        title: "Counter using useState",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=4ORZ1GmjaMc",
                                title: "useState Hook Tutorial",
                                duration: "16:45",
                                channel: "Ben Awad"
                            }
                        ]
                    },
                    "Update array state using spread operator",
                    "Pass props from parent to child"
                ],
                games: []
            },
            {
                phase: 5,
                title: "Component Communication",
                theory: [
                    "Passing data from parent to child",
                    "Passing data from child to parent",
                    "Lifting state up",
                    "Default props",
                    "PropTypes",
                    "Prop drilling",
                    "Preventing prop drilling"
                ],
                practicals: [
                    "Send data from parent to child",
                    "Send data from child to parent using callback",
                    "Share state between sibling components"
                ]
            },
            {
                phase: 6,
                title: "Components Deep Dive",
                theory: [
                    "What is a component",
                    "Functional components",
                    "Class components",
                    "Functional vs class components",
                    "Stateless vs stateful components",
                    "Custom components",
                    "Pure components",

                    "super() and super(props)",
                    "forceUpdate",
                    "React.memo"
                ],
                practicals: [
                    "Convert class component to functional",
                    "Optimize re-render using React.memo"
                ]
            },
            {
                phase: 7,
                title: "Hooks Core",
                theory: [
                    "Why hooks are not inside conditionals",
                    "Hooks inside conditionals",
                    "Hooks vs functions",
                    "Rules of hooks",
                    "Why hooks cannot be used in loops or conditions",
                    "useState syntax and usage",
                    "useEffect syntax and usage",
                    "useEffect dependency array (empty, no deps, with deps)",
                    "What will happen if we not pass dependency array in useEffect",
                    "Purpose of return statement in useEffect",
                    "useEffect cleanup function",
                    "Code cleanup using useEffect",
                    "Why can't we use async in useEffect",
                    "Passing Async Callbacks in useEffect",
                    {
                        title: "Component lifecycle with useEffect (mounting, updating, unmounting)",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=0fsC1MSxHwI",
                                title: "useEffect Hook Guide",
                                duration: "18:20",
                                channel: "Hitesh Choudhary"
                            }
                        ]
                    },
                    "Unmount in functional components",
                    "Unmounted event using useEffect"
                ],
                practicals: [
                    "Counter using useState (Functional updates)",
                    "Log mount and unmount using useEffect",
                    "Cleanup interval using useEffect"
                ]
            },
            {
                phase: 8,
                title: "Hooks Advanced",
                theory: [
                    "useRef",
                    "useRef (storing values, DOM reference, timer example)",
                    "Can we store data inside useRef",
                    "Return value of useRef",
                    "Updating useRef",
                    "Access uncontrolled components using useRef",
                    "useRef vs forwardRef",
                    "Create ref vs forwardRef",
                    "forwardRef",
                    "useLayoutEffect cleanup function",
                    "useLayoutEffect vs useEffect",
                    "Difference between useEffect and useLayoutEffect",
                    "useId",
                    "useId (generating unique IDs)",
                    "useTransition (React 18)",
                    "useDeferredValue (React 18)",
                    "useContext",
                    "Limitations of useContext",
                    "useReducer",
                    "useCallback",
                    "When does useCallback re-render?",
                    "useMemo",
                    "Does useMemo prevent re-renders",
                    "Why functions need to be memoized",
                    "Stale closure",
                    "Custom hooks",
                    "Rules of custom hooks",
                    "useImperativeHandle hook",
                    "Event Pooling in React"
                ],
                practicals: [
                    "Focus input using useRef",
                    "Share state using useContext",
                    "Replace useState with useReducer",
                    "Create a simple custom hook"
                ],
                games: []
            },
            {
                phase: 9,
                title: "Controlled & Uncontrolled Components",
                theory: [
                    "Controlled components",
                    "Uncontrolled components",
                    "Controlled vs uncontrolled components",
                    "Benefits of uncontrolled components",
                    "Manipulating uncontrolled components"
                ],
                practicals: [
                    "Controlled input with validation",
                    "Uncontrolled input using ref",
                    "Convert uncontrolled input to controlled"
                ]
            },

            {
                phase: 10,
                title: "Lifecycle Methods",
                theory: [
                    "componentDidMount",
                    "componentDidUpdate",
                    "componentWillUnmount",
                    "Lifecycle using useEffect"
                ],
                practicals: [
                    "Simulate lifecycle using useEffect",
                    "Cleanup logic on component unmount"
                ]
            },
            {
                phase: 11,
                title: "Event Handling",
                theory: [
                    "Event handling in React",
                    "Synthetic events",
                    "Advantages of synthetic events",
                    "Event pooling",
                    "Native vs synthetic events",
                    "Event delegation",
                    "Pointer events",
                    "Event.preventDefault",
                    "HTML sanitization",
                    "preventDefault"
                ],
                practicals: [
                    "Handle button click",
                    "Handle input change",
                    "Prevent default form submit"
                ]
            },
            {
                phase: 12,
                title: "Conditional & Dynamic Rendering",
                theory: [
                    "Conditional rendering",
                    "Conditional rendering using &&",
                    "Dynamic rendering"
                ],
                practicals: [
                    "Show and hide component",
                    "Conditional styling based on value"
                ]
            },
            {
                phase: 13,
                title: "Built-in & Special Components",
                theory: [
                    "React.Fragment",
                    "Fragment vs div",
                    "StrictMode",
                    "Why console logs appear twice",
                    "Suspense",
                    "Fallback",
                    "Error boundaries",
                    "React Portals"
                ],
                practicals: [
                    "Wrap components with Fragment",
                    "Lazy load a component",
                    "Catch error using Error Boundary"
                ]
            },
            {
                phase: 14,
                title: "Routing",
                theory: [
                    "React Router",
                    "Routes vs Route",
                    "BrowserRouter vs HashRouter",
                    "Link vs NavLink",
                    "useNavigate vs useHistory",
                    "useParams",
                    "useLocation",
                    "MemoryRouter",
                    "Switch (Legacy React Router v5)",
                    "Reading query params (useSearchParams)",
                    "Customize tab title and favicon",
                    "Outlet"
                ],
                practicals: [
                    "Create multiple routes",
                    "Navigate programmatically",
                    "Read route parameters"
                ]
            },
            {
                phase: 15,
                title: "Performance & Optimization",
                theory: [
                    "Reduce initial load in CSR",
                    "Code splitting",
                    "Lazy loading",
                    "Tree shaking",
                    "Memoization techniques",
                    "Pros and cons of memoization",
                    "React Profiler",
                    "Debugging React",
                    "Throttling",
                    "Debouncing",
                    "Clearing intervals/timeouts (Cleanup)",
                    "Shallow rendering",
                    "Techniques to improve performance (virtualization)",
                    "Improving initial load time (CSR vs SSR detailed)",
                    "React Concurrent Mode (automatic batching)"
                ],
                practicals: [
                    "Lazy load a route",
                    "Prevent unnecessary re-renders",
                    "Profile component renders"
                ]
            },
            {
                phase: 16,
                title: "Tooling & Module System",
                theory: [
                    "ESModules in React",
                    "Named vs default exports",
                    "Curly braces in imports",
                    "package.json vs package-lock.json",
                    "Hot Module Replacement",
                    "Vite advantages over older bundlers"
                ],
                practicals: []
            },
            {
                phase: 17,
                title: "Final Practice",
                practicals: [
                    "Render array of objects using map",
                    "Add, edit, delete list items",
                    "Prevent duplicate entries",
                    "Confirm before delete",
                    "Move completed items to bottom",
                    "Count completed and pending items",
                    "Display time-ago text",
                    "Toggle checkbox using parent-child communication"
                ]
            }
        ]
    },
    "react-2": {
        fileName: "reactjs-2",
        description: "React Hooks & Patterns",
        category: "React",
        subDescription: "Deep dive into hooks, effects, forms, and scalable component patterns.",
        phases: [
            {
                phase: 1,
                title: "Forms, Validation & User Input",
                theory: [
                    "Form handling in React",
                    "Controlled form patterns",
                    "Handling multiple inputs",
                    "Form validation strategies",
                    "Custom validation logic",
                    "Error message handling",
                    "Prevent default form submission",
                    "Password validation rules",
                    "File input handling",
                    "Accessibility basics in forms"
                ],
                practicals: [
                    "Create a signup form with controlled inputs",
                    "Add validation for email and password",
                    "Show validation errors below inputs",
                    "Disable submit button on invalid form",
                    "Implement confirm password validation",
                    "Create a login form with proper validation",
                    "Check if text in two input fields matches",
                    "Signup input validation"
                ]
            },

            {
                phase: 2,
                title: "Data Fetching & API Communication",
                theory: [
                    "Data Fetching with useEffect",
                    "Managing Loading & Error States in Components",
                    "Using AbortController with React",
                    "Setting up Axios in React",
                    "Using Axios Interceptors for Auth",
                    "Introduction to React Query (TanStack Query)",
                    "Optimistic UI Updates pattern"
                ],
                practicals: [
                    "Fetch data from public API using fetch",
                    "Fetch data using axios",
                    "Show loading spinner while fetching",
                    "Handle API error gracefully",
                    "Create axios instance with base URL",
                    "Cancel API request on component unmount"
                ]
            },

            {
                phase: 3,
                title: "Application Architecture & Patterns",
                theory: [
                    "Component composition",
                    "Container vs presentational components",
                    "Separation of concerns",
                    "Folder structure best practices",
                    "Reusable component design",
                    "Props proxy pattern",
                    "Smart vs dumb components",
                    "Scalable React architecture"
                ],
                practicals: [
                    "Refactor UI into reusable components",
                    "Create a layout component",
                    "Extract repeated logic into reusable components",
                    "Apply container-presentational pattern"
                ]
            },
            {
                phase: 4,
                title: "Testing & Debugging",
                theory: [
                    "Testing React Components (Unit vs Integration)",
                    "React Testing Library (RTL) Core Concepts",
                    "Querying Elements (getBy, findBy, queryBy)",
                    "Testing User Interactions (fireEvent, userEvent)",
                    "Mocking Modules & API Calls in Jest",
                    "Snapshot Testing in React"
                ],
                practicals: [
                    "Write a unit test for a button click",
                    "Test conditional rendering",
                    "Test form submission",
                    "Debug component re-render using DevTools"
                ]
            },

            {
                phase: 5,
                title: "Interview-Oriented Practical Scenarios",
                theory: [
                    "Common React interview pitfalls",
                    "State vs props decision making",
                    "When to lift state",
                    "When to split components",
                    "Performance trade-offs",
                    "Real-world React mistakes"
                ],
                practicals: [
                    "Build login-logout flow end-to-end",
                    "Implement route protection scenario",
                    "Create CRUD flow with API",
                    "Optimize unnecessary re-renders manually"
                ]
            },
            {
                phase: 6,
                title: "Advanced Practicals",
                practicals: [
                    "Create custom hook – convert string to capital letter",
                    "Implementation toggle theme functionality using Context API",
                    "Add edit option for todo",
                    "Mark todo as completed",
                    "Implement a basic stopwatch",
                    "Create nested dropdown and map the array of objects based on the selection of 1st dropdown",
                    "Create a component to add items to a list using useReducer",
                    "Increment and decrement counter using useContext",
                    "Implement lazy loading. Load the component after 5 sec",
                    "Find the average of 2 numbers using ref",
                    "Make a component to find the square of a number using useMemo"
                ]
            }
        ]
    },
    "react-3": {
        fileName: "reactjs-3",
        description: "Advanced React Ecosystem",
        category: "React",
        subDescription: "Master performance optimization, Redux state management, and enterprise architecture.",
        phases: [
            {
                phase: 1,
                title: "Why Redux & State Management Evolution",
                theory: [
                    "Flux architecture",
                    "Problems with lifting state up at scale",
                    "Limits of props lifting",
                    "Why Context API breaks at scale",
                    "Limitations of the Context API",
                    "Local storage vs Context API",
                    "Context API toggle theme example",
                    "Drawbacks of Context API",
                    "Context API vs Redux",
                    "Single Source of Truth concept",
                    "Unidirectional data flow",
                    "Why Redux is predictable",
                    "Redux vs local component state",
                    "Redux vs Context API",
                    "Framework vs Library",
                    "Why Redux is a library, not a framework"
                ],
                practicals: [
                    "Demonstrate deep props lifting problem with 4-level component tree",
                    "Replace props lifting with Redux store"
                ]
            },
            {
                phase: 2,
                title: "Redux Core Fundamentals",
                theory: [
                    "Core principles of Redux",
                    "Redux data flow",
                    "Store",
                    "Action",
                    "Action types",
                    "Action creators",
                    "Reducer",
                    "Why reducers must be pure",
                    "Immutability in Redux",
                    "Why Redux is unidirectional",
                    "Initial state",
                    "Resetting state",
                    "combineReducers",
                    "Redux store methods",
                    "Subscribe mechanism"
                ],
                practicals: [
                    "Create a Redux store with a counter reducer",
                    "Increment and decrement counter using dispatch",
                    "Reset counter state",
                    "Split reducers using combineReducers"
                ]
            },
            {
                phase: 3,
                title: "React Redux Integration",
                theory: [
                    "React Redux architecture",
                    "Provider component",
                    "useDispatch",
                    "useSelector",
                    "mapStateToProps",
                    "mapDispatchToProps",
                    "connect function",
                    "useSelector vs mapStateToProps",
                    "useDispatch vs mapDispatchToProps"
                ],
                practicals: [
                    "Wrap app with Provider",
                    "Read state using useSelector",
                    "Dispatch action using useDispatch",
                    "Same counter using connect()"
                ]
            },
            {
                phase: 4,
                title: "Redux Toolkit (Modern Redux)",
                theory: [
                    "Problems with classic Redux boilerplate",
                    "What is Redux Toolkit",
                    "configureStore",
                    "createSlice",
                    "Reducers vs extraReducers",
                    "Immer and immutability",
                    "Benefits of slices",
                    "Redux Toolkit folder structure",
                    "Redux Toolkit vs classic Redux"
                ],
                practicals: [
                    "Create counter using createSlice",
                    "Replace classic Redux with Redux Toolkit",
                    "Add reset action in slice"
                ]
            },
            {
                phase: 5,
                title: "Async State & Middleware",
                theory: [
                    "Why async logic needs middleware",
                    "What is middleware in Redux",
                    "Purpose of middleware",
                    "Redux Thunk",
                    "How Redux Thunk works",
                    "Redux Saga",
                    "Generator functions",
                    "call and put effects",
                    "Redux Thunk vs Redux Saga",
                    "When to use Saga over Thunk",
                    "Limitations of Thunk"
                ],
                practicals: [
                    "Fetch API data using Redux Thunk",
                    "Create loading and error states",
                    "Simulate delay using thunk",
                    "Basic Redux Saga watcher and worker"
                ]
            },
            {
                phase: 6,
                title: "createAsyncThunk & Async Flow",
                theory: [
                    "createAsyncThunk",
                    "Pending, fulfilled, rejected lifecycle",
                    "extraReducers usage",
                    "Error handling in async reducers",
                    "Async flow debugging"
                ],
                practicals: [
                    "Fetch users using createAsyncThunk",
                    "Handle loading, success, error states",
                    "Render API data from Redux store"
                ]
            },
            {
                phase: 7,
                title: "Redux DevTools & Debugging",
                theory: [
                    "Redux DevTools purpose",
                    "Action inspection",
                    "State time travel",
                    "Debugging async actions",
                    "Common Redux bugs",
                    "Why UI shows success but backend fails"
                ],
                practicals: [
                    "Inspect dispatched actions in DevTools",
                    "Debug incorrect reducer logic",
                    "Track async API failure"
                ]
            },
            {
                phase: 8,
                title: "Understanding & Using JWT on Frontend",
                theory: [
                    "Handling JWTs in React Applications",
                    "Storing Tokens Securely (Best Practices for SPA)",
                    "Attaching Tokens to Axios Requests",
                    "Handling Token Expiration in Frontend"
                ],
                practicals: [
                    "Decode JWT payload on frontend",
                    "Check token expiration from payload",
                    "Attach token to request headers"
                ]
            },
            {
                phase: 9,
                title: "Token Storage & Security",
                theory: [
                    "Implementing Logout (Clearing State & Storage)",
                    "Implementing Silent Refresh Logic"
                ],
                practicals: [
                    "Store token securely",
                    "Clear Redux and storage on logout",
                    "Simulate refresh token flow"
                ]
            },
            {
                phase: 10,
                title: "Axios, Interceptors & Error Handling",
                theory: [
                    "Axios vs fetch",
                    "Axios instance",
                    "Axios interceptors (Detailed)",
                    "Axios interceptors",
                    "Request interceptors",
                    "Response interceptors",
                    "Handling 401, 403, 400",
                    "HTTP status codes",
                    "200 vs 201",
                    "Global error handling"
                ],
                practicals: [
                    "Create axios instance",
                    "Attach token using interceptor",
                    "Handle 401 globally",
                    "Auto logout on token expiry"
                ]
            },
            {
                phase: 11,
                title: "Error Boundaries & App Stability",
                theory: [
                    "What is Error Boundary",
                    "Why hooks can't catch render errors",
                    "componentDidCatch",
                    "Error boundary limitations",
                    "Global error handling strategy"
                ],
                practicals: [
                    "Create Error Boundary component",
                    "Wrap crashing component",
                    "Show fallback UI on error"
                ]
            },
            {
                phase: 12,
                title: "Environment Variables & Configuration",
                theory: [
                    "Why not store secrets in code",
                    "Using .env in frontend",
                    "Environment based configuration",
                    "Vite env variables",
                    "Build-time vs runtime config"
                ],
                practicals: [
                    "Move API URL to .env",
                    "Access env variable in app",
                    "Hide tokens from source code"
                ]
            },
            {
                phase: 13,
                title: "Advanced Redux Patterns",
                theory: [
                    "Boilerplate reduction strategies",
                    "Redux Persist",
                    "Persist vs manual storage",
                    "Clearing persisted state",
                    "MakeObservable vs MakeAutoObservable",
                    "Redux vs MobX vs Zustand",
                    "Redux limitations"
                ],
                practicals: [
                    "Persist auth state using Redux Persist",
                    "Clear persisted state on logout"
                ]
            },
            {
                phase: 14,
                title: "Real World Architecture & Practice",
                theory: [
                    "Folder structure for large apps",
                    "Feature-based Redux structure",
                    "Debugging production issues",
                    "Common auth bugs",
                    "Improving error messages",
                    "API naming and status codes",
                    "Frontend-backend contract"
                ],
                practicals: [
                    "Auth flow with login, logout, refresh",
                    "Protected route using Redux auth state",
                    "Global loading and error handler"
                ]
            },
            {
                phase: 15,
                title: "Server-Side Rendering & Next.js",
                theory: [
                    "CSR vs SSR vs SSG vs ISR",
                    "Benefits of Server-Side Rendering (SEO, performance)",
                    "When to use SSR, SSG, or CSR",
                    "Next.js overview and installation",
                    "App Router vs Pages Router in Next.js 13+",
                    "File-based routing in Next.js",
                    "Dynamic routes and catch-all routes",
                    "Data fetching methods (getServerSideProps, getStaticProps, getStaticPaths)",
                    "Client Components vs Server Components",
                    "Hydration (in SSR/Next.js context)",
                    "Incremental Static Regeneration (ISR)",
                    "API routes in Next.js",
                    "next/image for optimized images",
                    "next/link for client-side navigation",
                    "Middleware in Next.js",
                    "Environment variables in Next.js",
                    "Deployment to Vercel"
                ],
                practicals: [
                    "Create Next.js app with App Router",
                    "Build blog with SSG (getStaticProps + getStaticPaths)",
                    "Fetch data server-side (getServerSideProps)",
                    "Create API route for backend functionality",
                    "Implement ISR for product pages",
                    "Optimize images with next/image",
                    "Deploy Next.js app to Vercel"
                ]
            },
            {
                phase: 16,
                title: "State Management at Scale (Redux, Zustand)",
                theory: [
                    "When Context is not enough",
                    "Redux vs Zustand vs Jotai vs Recoil",
                    "Redux Toolkit (modern Redux)",
                    "createSlice and configureStore",
                    "Redux async with createAsyncThunk",
                    "RTK Query for data fetching",
                    "Redux DevTools for debugging",
                    "Zustand — minimal state management",
                    "Zustand middleware (persist, devtools)",
                    "Jotai atoms for atomic state",
                    "When to use global state vs local state",
                    "State normalization patterns",
                    "Selecting state with selectors (Reselect)",
                    "Avoiding prop drilling at scale"
                ],
                practicals: [
                    "Set up Redux Toolkit in React app",
                    "Create slice for user authentication",
                    "Async action with createAsyncThunk (fetch users)",
                    "Use RTK Query for API calls",
                    "Build shopping cart with Redux",
                    "Set up Zustand store with persist middleware",
                    "Compare Redux vs Zustand for same feature"
                ]
            },
            {
                phase: 17,
                title: "Advanced React Patterns",
                theory: [
                    "Compound Components pattern",
                    "Render Props pattern (legacy, for understanding)",
                    "Higher-Order Components (HOCs)",
                    "Custom hooks patterns and best practices",
                    "Controlled vs Uncontrolled components deep dive",
                    "Prop getters pattern",
                    "State reducer pattern",
                    "Provider pattern for shared logic",
                    "Container/Presentational component separation",
                    "Composition vs Inheritance in React",
                    "Inversion of Control (IoC)",
                    "Headless component pattern",
                    "Building reusable component libraries",
                    "TypeScript with React patterns",
                    "Design system considerations"
                ],
                practicals: [
                    "Build Tabs component using Compound Components",
                    "Create Dropdown with Compound Components",
                    "Implement HOC for authentication (withAuth)",
                    "Build reusable custom hook (useForm, useToggle)",
                    "Create headless UI component (no styling)",
                    "Refactor render props to custom hooks",
                    "Build Modal using provider pattern"
                ]
            },
            {
                phase: 18,
                title: "React Testing (Integration with Testing Curriculum)",
                theory: [
                    "Why testing React components matters",
                    "React Testing Library philosophy",
                    "Testing component rendering and props",
                    "Testing user interactions (click, type, submit)",
                    "Testing async components and API calls",
                    "Mocking dependencies",
                    "Testing custom hooks",
                    "Testing components with Context and Redux",
                    "Testing forms and validation",
                    "Testing authenticated routes",
                    "Integration tests for complete flows",
                    "Snapshot testing for UI",
                    "Accessibility testing with jest-axe",
                    "Test coverage goals"
                ],
                practicals: [
                    "Test button component with click handler",
                    "Test form submission with validation",
                    "Test async component with mocked API",
                    "Test custom hook (useLocalStorage)",
                    "Test component with Context provider",
                    "Test protected route logic",
                    "Integration test: login flow → dashboard",
                    "Run accessibility tests with jest-axe"
                ]
            }
        ]
    }
};

