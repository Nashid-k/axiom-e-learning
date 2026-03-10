export const REACT_CURRICULUM = {
    "react-1": {
        fileName: "reactjs-1",
        description: "React Fundamentals",
        category: "React",
        subDescription: "Start your journey with JSX, components, and state management essentials.",
        phases: [
            {
                phase: 1,
                title: "The Digital Restaurant: Introduction to React",
                theory: [
                    "The Problem: Vanilla JS is like a chef cooking everything on one burner (Hard to scale)",
                    "The Solution: React (The Restaurant Manager) - Organizes work into stations",
                    "Single Page Applications (SPA): The menu stays the same, only the plates change",
                    "React vs Others: Why the world loves this specific manager",
                    "Vite Setup: Building your professional kitchen in 60 seconds"
                ],
                practicals: [
                    "Vite Installation: Run `npm create vite@latest` and see the magic",
                    "The Clean Break: Delete the boilerplate code and start with a blank canvas",
                    "The Hello Chef: Render 'Welcome to my Kitchen' in your first React app"
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
                title: "The Recipe Language: JSX Basics",
                theory: [
                    "JSX: Writing 'HTML' inside your JavaScript (The Recipe)",
                    "Why JSX? Keeping the look and the logic in the same folder",
                    "Rules of the Recipe: Single parent elements (Putting everything on one tray)",
                    "JavaScript in JSX: Using `{}` to inject logic (The 'Secret Ingredient' syntax)",
                    "Naming Conventions: Why components MUST start with Capital Letters"
                ],
                practicals: [
                    "The Variable Injection: Create a variable `chefName` and display it using `{}`",
                    "The Tray Rule: Wrap three elements in a `<React.Fragment>` and see why it's better than a div",
                    "The Style Object: Apply inline styles using the double-curly `{{ }}` syntax"
                ]
            },
            {
                phase: 3,
                title: "Cooking Stations: Functional Components",
                theory: [
                    "Components: Independent Stations (Salad, Grill, Drinks)",
                    "Reusability: Creating one 'Card' station and using it 100 times",
                    "Organization: Moving stations into separate files (The Modular Kitchen)",
                    "The Return Statement: What the station 'Serves' to the customer",
                    "Export/Import: How different stations talk to each other"
                ],
                practicals: [
                    "Station Creation: Build a `MenuCard` component in a separate file",
                    "The Multi-Serve: Render your `MenuCard` 5 times on the page",
                    "The Folder Structure: Organize your components into a `components/` folder"
                ]
            },
            {
                phase: 4,
                title: "The Blueprint: Virtual DOM & Reconciliation",
                theory: [
                    "Real DOM vs Virtual DOM: Updating the wall vs updating a sketch (Blueprint)",
                    "React Fiber: The Manager's ability to pause and prioritize work",
                    "The 'Diffing' Algorithm: Checking 'What's different?' before printing the menu",
                    "Reconciliation: The process of making the wall match the sketch",
                    "Keys: The unique 'Order Number' that helps the manager track every item"
                ],
                practicals: [
                    "The Key Test: Map through an array and see the warning if you forget a `key`",
                    "The DevTools Inspector: Use React DevTools to see your 'Virtual' world",
                    "The High-Speed Update: Create a list that updates and watch React only change one line"
                ]
            },
            {
                phase: 5,
                title: "The Order Slip: Props Basics",
                theory: [
                    "Props: The 'Order Slip' (Instructions passed from Manager to Chef)",
                    "One-Way Flow: Information always goes down (Manager -> Chef)",
                    "Destructuring: Getting the instructions quickly (No more `props.name`) ",
                    "Default Props: What to cook if the customer doesn't specify (Backup instructions)",
                    "Children: Passing 'Special Content' inside a component"
                ],
                practicals: [
                    "The Custom Order: Pass a `dishName` and `price` to your `MenuCard`",
                    "The Avatar: Pass an image URL as a prop and display it",
                    "The Wrapper: Create a `BorderBox` component that uses `props.children`"
                ]
            },
            {
                phase: 6,
                title: "The Kitchen Memory: useState Hook",
                theory: [
                    "State: The Station's Memory (Is the stove on? How many burgers are left?)",
                    "The Counter Analogy: Keeping track of 'Likes' or 'Items in Cart'",
                    "Immutability: Why we use `setCount` instead of `count++` (Standardizing the signal)",
                    "Re-rendering: When memory changes, the chef 're-cooks' the component",
                    "Hook Rules: Why hooks always stay at the top of the station"
                ],
                practicals: [
                    "The Burger Counter: Create a button that increments a 'Burgers Cooked' number",
                    "The Light Switch: Create a toggle that switches between 'Open' and 'Closed'",
                    "The Input Mirror: Create a text box that displays what you type in real-time"
                ]
            },
            {
                phase: 7,
                title: "Advanced Memory: Objects & Arrays in State",
                theory: [
                    "The Spread Operator (`...`): 'Copy the old tray and add one new thing'",
                    "Updating Lists: Adding and removing items without 'breaking' the memory",
                    "Derived State: Calculating the 'Total' without saving it separately",
                    "Lifting State Up: Moving the memory to the Manager so two chefs can see it",
                    "The Callback Pattern: How a chef tells the Manager 'The order is done!'"
                ],
                practicals: [
                    "The Todo List: Build a list where you can add items using a text box",
                    "The Delete Button: Implement a feature to remove one specific item from a list",
                    "The Total Price: Calculate the sum of an array of prices in your state"
                ]
            },
            {
                phase: 8,
                title: "Communicating Between Stations: Advanced Props",
                theory: [
                    "Passing Functions: Giving a chef a 'Bell' to ring when they're done",
                    "Drilling: The problem of passing slips through too many stations",
                    "Lifting State (The Bridge): Solving disagreements between sibling stations",
                    "Prop Types / Type Safety: Ensuring the 'Order Slip' is filled out correctly",
                    "Best Practices: Keeping Props simple and readable"
                ],
                practicals: [
                    "The Bell Ring: Pass a function from `App` to `Kitchen` that alerts 'Order Ready!'",
                    "The Sibling Sync: Change a value in `Station A` and see it update in `Station B`",
                    "The Validation: Try to pass a number where a string is expected and check the console"
                ]
            },
            {
                phase: 9,
                title: "The Ticket System: Map & Keys Deep Dive",
                theory: [
                    "Map: Cloning 100 stations from 1 array of data (Automatic Printing)",
                    "Why Keys? Preventing the 'Mix-up' when items are re-ordered",
                    "Index vs ID: Why IDs are the 'Employee ID' and Indexes are just 'Line Positions'",
                    "Filtering the Menu: Displaying only 'Vegan' or 'Dessert' items",
                    "Sorting: Arranging orders by price or priority"
                ],
                practicals: [
                    "The Menu Feed: Map through a JSON list of products and render cards",
                    "The Dynamic Filter: Create 3 buttons that filter your list by category",
                    "The Index Test: Intentionally use index as a key and see why it glitches during deletes"
                ]
            },
            {
                phase: 10,
                title: "React 1 Final Exam: The Mini-Restaurant",
                theory: [
                    "Consolidation: Putting Components, Props, and State together",
                    "The 'React Way': Thinking in small, independent pieces",
                    "Preparation for React 2: The transition from 'Cooking' to 'Managing a Team'"
                ],
                practicals: [
                    "Project 'Axiom Cafe': Build a menu where users can increment items, see a total, and clear the cart.",
                    "The Validation: Ensure your app doesn't crash if the cart is empty",
                    "The UI Polish: Use everything you learned in CSS to make it look premium"
                ]
            }
        ]
    },
    "react-2": {
        fileName: "reactjs-2",
        description: "React Hooks & Patterns",
        category: "React",
        subDescription: "Master hooks, specialized kitchen tools, and advanced cooking patterns.",
        phases: [
            {
                phase: 11,
                title: "The Side Hustle: useEffect Hook",
                theory: [
                    "Side Effects: Tasks outside the main cooking (Cleaning the floor, Ordering supplies)",
                    "Dependency Array: When should we start the task? (Every shift, Once a week, or Only when flour runs out?)",
                    "Cleanup Function: Turning off the stove before leaving (Preventing Memory Leaks)",
                    "API Fetching (Introduction): The Delivery Truck bringing fresh ingredients",
                    "Infinite Loops: Why you shouldn't clean the floor while people are still walking on it"
                ],
                practicals: [
                    "The Greeting: Make an alert pop up only the FIRST time the kitchen opens",
                    "The Timer: Build a clock that updates every second and stops when the station closes",
                    "The Basic Fetch: Get a list of 'Daily Specials' from a placeholder API"
                ]
            },
            {
                phase: 12,
                title: "The Secret Drawer: useRef Hook",
                theory: [
                    "useRef: A drawer that keeps its contents even if the chef re-cooks (No Re-renders)",
                    "DOM Access: Reaching out to touch the actual kitchen equipment (Focusing an input)",
                    "Persistent Variables: Storing a 'Timer ID' that doesn't trigger a re-draw",
                    "useRef vs useState: When to use a 'Post-it Note' vs a 'Digital Scoreboard'",
                    "Forwarding Refs: Giving someone else the key to your secret drawer"
                ],
                practicals: [
                    "The Auto-Focus: Make the text box focus automatically when the page loads",
                    "The Click Counter: Count clicks WITHOUT causing the UI to change (Check console)",
                    "The Stop-Watch: Use a ref to store the interval ID for a timer"
                ]
            },
            {
                phase: 13,
                title: "The Loudspeaker: useContext API",
                theory: [
                    "Prop Drilling: Passing a slip through 10 chefs (Slow and messy)",
                    "Context: The Kitchen Loudspeaker (One message for EVERYONE to hear)",
                    "Provider: The person holding the microphone",
                    "Consumer/useContext: The chefs wearing headsets to listen",
                    "Best Practice: Don't use the loudspeaker for every small secret"
                ],
                practicals: [
                    "The Theme Toggle: Use Context to change the kitchen from 'Day Mode' to 'Night Mode'",
                    "The User Profile: Display the Chef's Name in 3 different components using Context",
                    "The Shopping Cart: Keep track of total items across the whole restaurant"
                ]
            },
            {
                phase: 14,
                title: "The Complex Order: useReducer Hook",
                theory: [
                    "useReducer: A professional 'Order Form' for complex cooking",
                    "State & Action: 'The current kitchen state' + 'What just happened?'",
                    "The Reducer Function: The logic that decides how to change the state",
                    "Dispatch: Sending the 'Action' to the manager",
                    "useReducer vs useState: When a simple counter becomes a full POS system"
                ],
                practicals: [
                    "The Advanced Todo: Use useReducer to Add, Delete, and Clear all items",
                    "The Multi-Counter: One reducer to manage 5 different counters at once",
                    "The Form Handler: Manage a complex signup form with multiple inputs in one state"
                ]
            },
            {
                phase: 15,
                title: "Sharp Kitchen Tools: useMemo & useCallback",
                theory: [
                    "Performance: Why re-calculating the bill 100 times is a waste of time",
                    "useMemo: Storing the result of a 'Heavy Recipe' so you don't cook it again",
                    "useCallback: Remembering how to 'Do a Task' without re-learning it every time",
                    "Referential Integrity: Why `{}` is not the same as `{}` in JavaScript",
                    "When NOT to Optimize: Premature optimization is the root of all burnt food"
                ],
                practicals: [
                    "The Heavy Filter: Filter a list of 10,000 items and see the lag without useMemo",
                    "The Memoized Function: Use useCallback to prevent a child component from re-rendering",
                    "The Profiler: Use Chrome DevTools to see which components are over-cooking"
                ]
            },
            {
                phase: 16,
                title: "Custom Equipment: Building Custom Hooks",
                theory: [
                    "Reusing Logic: Creating your own 'Smart Spatula' (useWindowSize, useTheme)",
                    "Prefix: Why every custom hook MUST start with 'use'",
                    "Separation: Keeping the 'Chef Logic' separate from the 'Plating (UI)'",
                    "Composition: Building big tools out of small tools (`useState` + `useEffect`) ",
                    "Sharing hooks: How to share your 'Secret Recipes' across the app"
                ],
                practicals: [
                    "The Fetch Hook: Create `useFetch` to handle API calls with loading/error states",
                    "The Storage Hook: Create `useLocalStorage` to save data automatically",
                    "The Toggle Hook: Create `useToggle` for a reusable true/false switch"
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
                phase: 17,
                title: "The Central Warehouse: Redux Toolkit Basics",
                theory: [
                    "The Problem: When every station needs to know the 'Stock Levels', Prop Drilling fails",
                    "The Solution: Redux (The Central Warehouse) - One place for all 'Global' data",
                    "Store: The Warehouse building",
                    "Slices: Different sections of the warehouse (Produce, Meat, Dairy)",
                    "Actions & Reducers: The 'Delivery Slips' and 'Update Logic'"
                ],
                practicals: [
                    "The Global Count: Move your burger counter from local state to a Redux slice",
                    "The Feature Slice: Create a `userSlice` to manage login status globally",
                    "The Inspector: Link Redux DevTools and see your warehouse in real-time"
                ]
            },
            {
                phase: 18,
                title: "The Delivery Service: createAsyncThunk",
                theory: [
                    "Async Logic: Fetching data from the warehouse's external suppliers",
                    "Thunks: The 'Delivery Drivers' who wait for the response",
                    "Pending, Fulfilled, Rejected: Tracking the truck (On the way, Arrived, Crahed)",
                    "ExtraReducers: How a slice listens to the delivery driver's report",
                    "Loading States: Showing a 'Loading...' spinner while the truck is driving"
                ],
                practicals: [
                    "The API Menu: Fetch a list of products using `createAsyncThunk`",
                    "The Loading Spinner: Show a spinner only while the data is fetching",
                    "The Error Handling: Show an alert if the supplier's API is down"
                ]
            },
            {
                phase: 19,
                title: "The Standardized Filter: Axios Interceptors",
                theory: [
                    "Axios: A more powerful delivery truck than standard `fetch`",
                    "Interceptors: The 'Security Guard' who checks every truck leaving the warehouse",
                    "Request Interceptor: Automatically adding the 'Security Badge' (Token) to every request",
                    "Response Interceptor: Automatically handling errors (like a 401 'Expired Badge')",
                    "Instances: Creating a specialized truck for a specific supplier"
                ],
                practicals: [
                    "The Axios Global: Set up a base URL so you don't type it every time",
                    "The Silent Security: Use an interceptor to add an `Authorization` header automatically",
                    "The Auto-Logout: Use a response interceptor to log out the user if the token expires"
                ]
            },
            {
                phase: 20,
                title: "The ID Badge: JWT & Authentication",
                theory: [
                    "Authentication: Proving you are an employee (The Login)",
                    "JWT (JSON Web Token): The digital ID Badge",
                    "Payload: The information printed on the badge (Name, Role, Expiry)",
                    "Storage: Where to keep the badge (Local Storage vs Cookies)",
                    "Security: Why we never store the 'Kitchen Key' (Password) on the frontend"
                ],
                practicals: [
                    "The Login Flow: Build a page that sends credentials and saves the token",
                    "The Persistent ID: Make sure the user stays logged in even after refreshing the page",
                    "The Token Decoder: Parse the JWT to display the user's name in the header"
                ]
            },
            {
                phase: 21,
                title: "Locked Doors: Protected Routing",
                theory: [
                    "Routing: Navigating different floors of the restaurant (Home, Menu, Admin)",
                    "Protected Routes: Lock the 'Admin Office' so only employees (Logged in) can enter",
                    "The Guard Component: A component that checks for an ID Badge before letting you in",
                    "Redirects: Sending uninvited guests back to the Login page",
                    "Nested Routes: Creating a 'Staff Only' section with multiple sub-rooms"
                ],
                practicals: [
                    "The Guard: Create a `ProtectedRoute` component that wraps private pages",
                    "The Redirect: Test your app by trying to go to `/dashboard` without a token",
                    "The Sidebar: Create a navigation menu that changes based on whether you're logged in"
                ]
            },
            {
                phase: 22,
                title: "The Fire Extinguisher: Error Boundaries",
                theory: [
                    "Runtime Errors: When a chef accidentally drops a plate (App crashes)",
                    "Error Boundaries: The Fire Extinguisher that stops the flame from spreading",
                    "Fallback UI: Showing a 'Something went wrong' message instead of a white screen",
                    "Lifecycle: `componentDidCatch` (The manager's report on the fire)",
                    "Global Errors: Catching failures in the whole restaurant at once"
                ],
                practicals: [
                    "The Crash Test: Create a button that intentionally throws an error",
                    "The Boundary: Wrap the component in an Error Boundary and show a custom message",
                    "The Reset: Add a 'Try Again' button to your error page"
                ]
            },
            {
                phase: 23,
                title: "Pre-Packaged Meals: Introduction to Next.js",
                theory: [
                    "React vs Next.js: Building a kitchen vs Buying a fully-equipped restaurant",
                    "Server Components: Cooking in the back-office (Faster for the customer)",
                    "File-Based Routing: Every folder is a new room automatically",
                    "SEO: Making sure customers can find your restaurant on Google",
                    "Deployment: Putting your restaurant on the internet (Vercel)"
                ],
                practicals: [
                    "The Next Move: Run `npx create-next-app` and explore the folder structure",
                    "The Server Fetch: Fetch data on the server and see it appear instantly",
                    "The Route: Create a new page just by making a new folder"
                ]
            },
            {
                phase: 24,
                title: "The Health Inspector: React Testing",
                theory: [
                    "Testing: Checking if the food is safe before serving (Quality Assurance)",
                    "Vitest & RTL: The 'Inspector Tools'",
                    "Unit Tests: Checking one single ingredient (Is the button blue?)",
                    "Integration Tests: Checking a whole dish (Does the form submit?)",
                    "Mocking: Using 'Plastic Food' for testing so you don't waste real ingredients"
                ],
                practicals: [
                    "The First Test: Write a test to check if a component renders its title",
                    "The User Event: Write a test that clicks a button and checks if state changes",
                    "The API Mock: Test a component's loading state without actually calling the API"
                ]
            },
            {
                phase: 25,
                title: "The Executive Chef: Career & Interview Prep",
                theory: [
                    "Portfolio: Showing off your best dishes to get a job",
                    "Technical Interviews: Solving 'Cooking Puzzles' in front of a manager",
                    "System Design: Explaining how you would build a 5-star restaurant chain",
                    "Soft Skills: How to talk to your team and the customers",
                    "Continuous Learning: Keeping up with new kitchen tools (React 19+)"
                ],
                practicals: [
                    "The Portfolio: Add your 'Axiom Cafe' project to a live URL (Vercel/Netlify)",
                    "The Mock Interview: Answer 5 common React interview questions using analogies",
                    "The Resume: Highlight your 'Kitchen Tools' (Hooks, Redux, Next.js)"
                ]
            }
        ]
    },
    "react-questions": {
        fileName: "reactjs-questions",
        description: "React Question Bank",
        category: "React",
        subDescription: "Master 50+ real-world React interview questions with analogy-driven explanations.",
        phases: [
            {
                phase: 1,
                title: "The Entrance Exam: Fundamentals",
                theory: [
                    "What is React? (The Restaurant Manager)",
                    "Virtual DOM: Why update a blueprint instead of the whole wall?",
                    "JSX: Why write recipes in JavaScript?",
                    "Components: The importance of segregated cooking stations",
                    "Props vs State: Order Slips vs Chef's Memory"
                ],
                practicals: [
                    "Explain the 'Restaurant' analogy to a partner",
                    "Map 5 technical terms to 5 kitchen items"
                ]
            },
            {
                phase: 2,
                title: "The Advanced Exam: Hooks & State",
                theory: [
                    "useState: Why does the chef need a digital scoreboard?",
                    "useEffect: How to handle 'Side Hustles' without burning the food",
                    "useContext: When to use the Loudspeaker vs passing slips",
                    "useRef: The Secret Drawer that stays same between shifts",
                    "useReducer: When the order form gets too complex for a scoreboard"
                ],
                practicals: [
                    "Explain the difference between useEffect and useLayoutEffect using a kitchen example",
                    "Demonstrate 'Prop Drilling' with a physical object vs 'Context' with a shout"
                ]
            },
            {
                phase: 3,
                title: "The Executive Exam: Industry Patterns",
                theory: [
                    "Redux: The Central Warehouse vs Station Storage",
                    "Axios Interceptors: The Security Guard at the Warehouse gate",
                    "JWT: Why keep the ID Badge in the pocket (LocalStorage)?",
                    "Protected Routes: Locking the Admin Office",
                    "Compound Components: Making a 'Combo Meal' where ingredients work together",
                    "HOCs (Legacy): Giving every chef a standard 'Uniform' (The Uniform Hook/Wrapper)",
                    "Render Props (Legacy): Letting the customer bring their own 'Toppings' to the station"
                ],
                practicals: [
                    "Explain the Redux flow using a delivery truck analogy",
                    "Draw a diagram of how a JWT 'Badge' is used to get 'Locked' ingredients",
                    "Mock explain HOCs vs Hooks to a Senior Manager"
                ]
            }
        ]
    }
};

