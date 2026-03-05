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
            name: "Static Profile Card",
            difficulty: "Very Easy",
            features: ["Display static data", "Reusable component"],
            hooksUsed: [],
            concepts: ["JSX", "Props", "Functional components"]
        },
        {
            id: 2,
            reactjsLevel: "reactjs-1",
            name: "Basic Counter",
            difficulty: "Easy",
            features: ["Increment", "Decrement", "Reset"],
            hooksUsed: ["useState"],
            concepts: ["State", "Re-rendering", "Event handling"]
        },
        {
            id: 3,
            reactjsLevel: "reactjs-1",
            name: "Theme Toggle (Local State)",
            difficulty: "Easy",
            features: ["Light/Dark toggle"],
            hooksUsed: ["useState"],
            concepts: ["Conditional rendering"]
        },
        {
            id: 4,
            reactjsLevel: "reactjs-1",
            name: "Todo List (Local State)",
            difficulty: "Easy",
            features: ["Add", "Delete", "Render list"],
            hooksUsed: ["useState"],
            concepts: ["Lists & keys", "Immutability"]
        },
        {
            id: 5,
            reactjsLevel: "reactjs-1",
            name: "Controlled Form",
            difficulty: "Easy",
            features: ["Input handling", "Live preview"],
            hooksUsed: ["useState"],
            concepts: ["Controlled components", "Synthetic events"]
        },
        {
            id: 6,
            reactjsLevel: "reactjs-1",
            name: "Conditional Rendering App",
            difficulty: "Easy",
            features: ["Login/Logout UI"],
            hooksUsed: ["useState"],
            concepts: ["Conditional rendering"]
        },
        {
            id: 7,
            reactjsLevel: "reactjs-1",
            name: "Simple List Filter",
            difficulty: "Easy",
            features: ["Filter list using input"],
            hooksUsed: ["useState"],
            concepts: ["Map", "Filter"]
        },
        {
            id: 8,
            reactjsLevel: "reactjs-2",
            name: "Theme Toggle using Context API",
            difficulty: "Medium",
            features: ["Global theme state"],
            hooksUsed: ["useState", "useContext"],
            concepts: ["Context API", "Avoid prop drilling"]
        },
        {
            id: 9,
            reactjsLevel: "reactjs-2",
            name: "Auth UI with useEffect",
            difficulty: "Medium",
            features: ["Login persistence (UI only)"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Mount/Unmount", "Side effects"]
        },
        {
            id: 10,
            reactjsLevel: "reactjs-2",
            name: "Search with Debouncing",
            difficulty: "Medium",
            features: ["Debounced search"],
            hooksUsed: ["useState", "useEffect", "useRef"],
            concepts: ["Debouncing", "Performance"]
        },
        {
            id: 11,
            reactjsLevel: "reactjs-2",
            name: "Optimized Counter Dashboard",
            difficulty: "Medium",
            features: ["Multiple counters"],
            hooksUsed: ["useMemo", "useCallback", "React.memo"],
            concepts: ["Memoization", "Pure components"]
        },
        {
            id: 12,
            reactjsLevel: "reactjs-2",
            name: "Modal using Portal",
            difficulty: "Medium",
            features: ["Modal outside root"],
            hooksUsed: ["useState"],
            concepts: ["React portals"]
        },
        {
            id: 13,
            reactjsLevel: "reactjs-2",
            name: "Custom Hook Counter",
            difficulty: "Medium",
            features: ["Reusable logic"],
            hooksUsed: ["useState"],
            concepts: ["Custom hooks"]
        },
        {
            id: 14,
            reactjsLevel: "reactjs-2",
            name: "Sibling Communication via Context",
            difficulty: "Medium",
            features: ["Shared state"],
            hooksUsed: ["useContext"],
            concepts: ["State sharing"]
        },
        {
            id: 15,
            reactjsLevel: "reactjs-3",
            name: "Redux Counter",
            difficulty: "Medium",
            features: ["Global counter"],
            hooksUsed: ["useSelector", "useDispatch"],
            concepts: ["Redux flow"]
        },
        {
            id: 16,
            reactjsLevel: "reactjs-3",
            name: "Todo App using Redux Toolkit",
            difficulty: "Medium",
            features: ["Add/Delete todos"],
            hooksUsed: ["useSelector", "useDispatch"],
            concepts: ["createSlice", "configureStore"]
        },
        {
            id: 17,
            reactjsLevel: "reactjs-3",
            name: "Async API Fetch App",
            difficulty: "Hard",
            features: ["API fetch", "Loader", "Error UI"],
            hooksUsed: ["useSelector", "useDispatch"],
            concepts: ["createAsyncThunk", "extraReducers"]
        },
        {
            id: 18,
            reactjsLevel: "reactjs-3",
            name: "JWT Auth UI (Redux)",
            difficulty: "Hard",
            features: ["Login", "Logout", "Token store"],
            hooksUsed: ["useEffect"],
            concepts: ["JWT flow", "Access vs Refresh token"]
        },
        {
            id: 19,
            reactjsLevel: "reactjs-3",
            name: "Axios Interceptor App",
            difficulty: "Hard",
            features: ["Attach token to requests"],
            hooksUsed: [],
            concepts: ["Axios interceptors"]
        },
        {
            id: 20,
            reactjsLevel: "reactjs-3",
            name: "Error Boundary Demo",
            difficulty: "Hard",
            features: ["Fallback UI"],
            hooksUsed: [],
            concepts: ["Error boundaries"]
        },
        {
            id: 21,
            reactjsLevel: "reactjs-2",
            name: "User List with Pagination",
            difficulty: "Medium",
            features: ["Fetch users from API", "Page navigation", "Loading states"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Pagination logic", "API fetching", "JSONPlaceholder API"],
            apiSource: "https://jsonplaceholder.typicode.com/users"
        },
        {
            id: 22,
            reactjsLevel: "reactjs-2",
            name: "Posts Browser",
            difficulty: "Medium",
            features: ["List posts", "Load more button", "Post details modal"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Infinite scroll alternative", "Modal pattern"],
            apiSource: "https://jsonplaceholder.typicode.com/posts"
        },
        {
            id: 23,
            reactjsLevel: "reactjs-2",
            name: "Photo Gallery with Lazy Loading",
            difficulty: "Medium",
            features: ["Grid layout", "Pagination", "Image preview"],
            hooksUsed: ["useState", "useEffect", "useRef"],
            concepts: ["Lazy loading images", "Grid layout"],
            apiSource: "https://jsonplaceholder.typicode.com/photos"
        },
        {
            id: 24,
            reactjsLevel: "reactjs-2",
            name: "Comments Viewer",
            difficulty: "Medium",
            features: ["Nested comments UI", "Filter by post", "Pagination"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Nested data display", "Filtering"],
            apiSource: "https://jsonplaceholder.typicode.com/comments"
        },
        {
            id: 25,
            reactjsLevel: "reactjs-2",
            name: "Pokemon Explorer",
            difficulty: "Medium",
            features: ["Pokemon list", "Search", "Pagination", "Detail view"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["External API integration", "Data transformation"],
            apiSource: "https://pokeapi.co/api/v2/pokemon"
        },
        {
            id: 26,
            reactjsLevel: "reactjs-2",
            name: "Rick & Morty Characters",
            difficulty: "Medium",
            features: ["Character grid", "Filter by status", "Pagination"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Query parameters", "Filter + Pagination"],
            apiSource: "https://rickandmortyapi.com/api/character"
        },
        {
            id: 27,
            reactjsLevel: "reactjs-2",
            name: "Country Info App",
            difficulty: "Medium",
            features: ["Country list", "Search by name", "Region filter"],
            hooksUsed: ["useState", "useEffect", "useMemo"],
            concepts: ["Search + Filter combined", "Memoized filtering"],
            apiSource: "https://restcountries.com/v3.1/all"
        },
        {
            id: 28,
            reactjsLevel: "reactjs-2",
            name: "Random User Directory",
            difficulty: "Medium",
            features: ["User cards", "Load more", "Gender filter"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Randomized data", "Accumulating data"],
            apiSource: "https://randomuser.me/api/?results=10"
        },
        {
            id: 29,
            reactjsLevel: "reactjs-2",
            name: "GitHub Repos Browser",
            difficulty: "Medium-Hard",
            features: ["Search repos", "Sort by stars", "Pagination"],
            hooksUsed: ["useState", "useEffect", "useRef"],
            concepts: ["GitHub API", "Debounced search", "Sort logic"],
            apiSource: "https://api.github.com/search/repositories"
        },
        {
            id: 30,
            reactjsLevel: "reactjs-2",
            name: "News Headlines App",
            difficulty: "Medium",
            features: ["Category tabs", "Article list", "Read more links"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Tab-based navigation", "External links"],
            apiSource: "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json"
        },
        {
            id: 31,
            reactjsLevel: "reactjs-3",
            name: "Product Catalog with Redux",
            difficulty: "Hard",
            features: ["Product grid", "Category filter", "Pagination", "Add to cart"],
            hooksUsed: ["useSelector", "useDispatch", "useEffect"],
            concepts: ["Redux state for products", "Async actions"],
            apiSource: "https://fakestoreapi.com/products"
        },
        {
            id: 32,
            reactjsLevel: "reactjs-3",
            name: "Movie Database",
            difficulty: "Hard",
            features: ["Movie search", "Trending list", "Pagination", "Favorites"],
            hooksUsed: ["useState", "useEffect", "useContext"],
            concepts: ["OMDB/TMDB API", "Local storage favorites"],
            apiSource: "https://www.omdbapi.com/ (requires free API key)"
        },
        {
            id: 33,
            reactjsLevel: "reactjs-3",
            name: "Recipe Finder",
            difficulty: "Hard",
            features: ["Ingredient search", "Recipe details", "Save recipes"],
            hooksUsed: ["useState", "useEffect", "useReducer"],
            concepts: ["Complex state with useReducer", "Recipe API"],
            apiSource: "https://www.themealdb.com/api.php"
        },
        {
            id: 34,
            reactjsLevel: "reactjs-3",
            name: "Cryptocurrency Tracker",
            difficulty: "Hard",
            features: ["Live prices", "Price charts", "Watchlist", "Pagination"],
            hooksUsed: ["useState", "useEffect", "useMemo"],
            concepts: ["Real-time data", "Chart integration"],
            apiSource: "https://api.coingecko.com/api/v3/coins/markets"
        },
        {
            id: 35,
            reactjsLevel: "reactjs-3",
            name: "Weather Dashboard",
            difficulty: "Hard",
            features: ["City search", "5-day forecast", "Current weather"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["Geolocation API", "Weather API integration"],
            apiSource: "https://api.openweathermap.org/ (requires free API key)"
        },
        {
            id: 36,
            reactjsLevel: "reactjs-3",
            name: "Book Library",
            difficulty: "Hard",
            features: ["Search books", "Reading list", "Pagination", "Book details"],
            hooksUsed: ["useState", "useEffect", "useContext"],
            concepts: ["Google Books API", "Context for reading list"],
            apiSource: "https://www.googleapis.com/books/v1/volumes"
        },
        {
            id: 37,
            reactjsLevel: "reactjs-3",
            name: "Job Board",
            difficulty: "Hard",
            features: ["Job listings", "Filter by type", "Pagination", "Apply tracking"],
            hooksUsed: ["useSelector", "useDispatch", "useEffect"],
            concepts: ["Redux for state", "Filter + Pagination combined"],
            apiSource: "https://remotive.com/api/remote-jobs"
        },
        {
            id: 38,
            reactjsLevel: "reactjs-3",
            name: "Quotes App with Infinite Scroll",
            difficulty: "Medium-Hard",
            features: ["Random quotes", "Infinite scroll", "Copy to clipboard", "Share"],
            hooksUsed: ["useState", "useEffect", "useRef", "useCallback"],
            concepts: ["Intersection Observer", "Infinite scroll pattern"],
            apiSource: "https://api.quotable.io/quotes"
        },
        {
            id: 39,
            reactjsLevel: "reactjs-3",
            name: "Space Explorer (NASA API)",
            difficulty: "Hard",
            features: ["Astronomy picture of the day", "Mars rover photos", "Pagination"],
            hooksUsed: ["useState", "useEffect"],
            concepts: ["NASA API", "Date-based fetching"],
            apiSource: "https://api.nasa.gov/ (requires free API key)"
        },
        {
            id: 40,
            reactjsLevel: "reactjs-3",
            name: "Trivia Quiz App",
            difficulty: "Hard",
            features: ["Category selection", "Difficulty levels", "Score tracking", "Timer"],
            hooksUsed: ["useState", "useEffect", "useReducer"],
            concepts: ["Quiz logic", "Timer with useEffect", "Score calculation"],
            apiSource: "https://opentdb.com/api.php"
        }
    ]
};
