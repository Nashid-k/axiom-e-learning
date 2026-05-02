export const REACT_PROJECTS = {
    fileName: "reactjs-projects",
    rules: {
        category: "React",
        subDescription: "Bridge the gap between theory and practice. Build 30+ industry-grade projects across different mastery levels.",
        studyOrder: "Strict",
        progression: "Simple → Advanced",
        themeToggle: "Introduced early and enhanced per level",
        hooksUsage: "Explicitly mentioned per project",
        alignment: "Mapped strictly to reactjs-1, reactjs-2, reactjs-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            reactjsLevel: "reactjs-1",
            name: "The Staff Badge (Profile Card)",
            difficulty: "Very Easy",
            features: ["Display chef name and role", "Show a profile picture", "Reusable badge component"],
            hooksUsed: [],
            concepts: ["The Recipe (JSX)", "The Order Slip (Props)", "Cooking Stations (Components)"]
        },
        {
            id: 2,
            reactjsLevel: "reactjs-1",
            name: "The Burger Counter",
            difficulty: "Easy",
            features: ["Increment burger count", "Decrement count", "Reset counter"],
            hooksUsed: ["useState"],
            concepts: ["The Kitchen Memory (useState)", "Updating the Scoreboard (State)", "Handling Orders (Events)"]
        },
        {
            id: 3,
            reactjsLevel: "reactjs-1",
            name: "Kitchen Light Switch (Theme Toggle)",
            difficulty: "Easy",
            features: ["Day/Night mode toggle", "Change background color"],
            hooksUsed: ["useState"],
            concepts: ["Conditional Cooking (Rendering)", "True/False state"]
        },
        {
            id: 4,
            reactjsLevel: "reactjs-1",
            name: "The Waiter's Order List (Todo)",
            difficulty: "Easy",
            features: ["Add new orders", "Remove completed orders", "List all current tasks"],
            hooksUsed: ["useState"],
            concepts: ["Managing the Order Tray (Arrays in State)", "Cleaning the Tray (Filtering)"]
        },
        {
            id: 5,
            reactjsLevel: "reactjs-1",
            name: "The Customer Feedback Form",
            difficulty: "Easy",
            features: ["Live typing preview", "Form validation on submit"],
            hooksUsed: ["useState"],
            concepts: ["The Controlled Oven (Controlled Components)", "Capturing Guest Info"]
        },
        {
            id: 6,
            reactjsLevel: "reactjs-2",
            name: "The Kitchen Loudspeaker (Theme Context)",
            difficulty: "Medium",
            features: ["Toggle theme globally across all stations"],
            hooksUsed: ["useState", "useContext"],
            concepts: ["The Loudspeaker (Context API)", "Global Kitchen Settings"]
        },
        {
            id: 7,
            reactjsLevel: "reactjs-2",
            name: "The Auto-Focus Reservation Book",
            difficulty: "Medium",
            features: ["Form field focuses automatically on load"],
            hooksUsed: ["useRef", "useEffect"],
            concepts: ["The Secret Drawer (useRef)", "Side Hustles (useEffect)"]
        },
        {
            id: 8,
            reactjsLevel: "reactjs-2",
            name: "The Smart Bill Calculator",
            difficulty: "Medium",
            features: ["Fast filtering of large menu prices using memoization"],
            hooksUsed: ["useMemo", "useCallback"],
            concepts: ["Sharp Kitchen Tools (Performance)", "Avoiding Over-cooking"]
        },
        {
            id: 9,
            reactjsLevel: "reactjs-2",
            name: "The Professional Order Form (useReducer)",
            difficulty: "Medium",
            features: ["Manage complex order state with multiple items and subtotals"],
            hooksUsed: ["useReducer"],
            concepts: ["The Complex Order Form (useReducer)", "Advanced Manager Logic"]
        },
        {
            id: 10,
            reactjsLevel: "reactjs-2",
            name: "The Recipe Fetcher (Custom Hook)",
            difficulty: "Medium",
            features: ["Create a reusable hook to fetch food data from an API"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Custom Equipment (Custom Hooks)", "The Delivery Truck (API)"]
        },
        {
            id: 11,
            reactjsLevel: "reactjs-3",
            name: "The Central Warehouse Dashboard (Redux)",
            difficulty: "Hard",
            features: ["Manage restaurant inventory globally with Redux Toolkit"],
            hooksUsed: ["useSelector", "useDispatch"],
            concepts: ["The Central Warehouse (Redux)", "Inventory Management"]
        },
        {
            id: 12,
            reactjsLevel: "reactjs-3",
            name: "Secure Staff Portal (Auth + JWT)",
            difficulty: "Hard",
            features: ["Login with ID Badge (JWT)", "Locked routes for Admins only"],
            hooksUsed: ["useEffect", "useSelector"],
            concepts: ["The ID Badge (JWT)", "Locked Doors (Protected Routes)", "Security Guards (Interceptors)"]
        },
        {
            id: 13,
            reactjsLevel: "reactjs-3",
            name: "The Global Food App (Next.js Intro)",
            difficulty: "Hard",
            features: ["Build a multi-page restaurant site with SEO and fast loading"],
            hooksUsed: [],
            concepts: ["Pre-Packaged Meals (Next.js)", "Modern Kitchen Setup"]
        }
    ]
};
