export const DSA_CURRICULUM = {
    "dsa-1": {
        fileName: "dsa-1",
        description: "DSA Foundations",
        category: "DSA",
        subDescription: "Strong foundations of Data Structures like arrays, linked lists, and recursion.",
        phases: [
            {
                phase: 0,
                title: "Foundations of Data Structures",
                theory: [
                    "What is Data Structure",
                    "Types of Data Structures (Linear vs Non-Linear)",
                    "Primitive vs Non-Primitive Data Types",
                    "What is an Algorithm",
                    "Hierarchical data structures",
                    "WeakSet and WeakMap"
                ],
                practicals: [
                    "Draw memory layout of array vs linked list",
                    "Identify stack vs heap usage in simple programs"
                ]
            },
            {
                phase: 1,
                title: "Complexity & Asymptotic Analysis",
                theory: [
                    {
                        title: "What is Complexity Analysis",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=7_98l73l6Mk",
                                title: "Time Complexity Analysis",
                                duration: "12:30",
                                channel: "Codevolution"
                            }
                        ]
                    },
                    {
                        title: "Time Complexity vs Space Complexity",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=D6xkbGLQesk",
                                title: "Big O Notation in 100 Seconds",
                                duration: "01:58",
                                channel: "Fireship"
                            }
                        ]
                    },
                    "Why Asymptotic Analysis is Needed",
                    "Big-O Notation",
                    "Big-Theta Notation",
                    "Big-Omega Notation",
                    "Best Case, Average Case, Worst Case",
                    "Common Time Complexities (O(1), O(log n), O(n), O(n²))",
                    "Complexity of Loops",
                    "Complexity of Nested Loops",
                    "Complexity of Recursion",
                    "Complexity of Common Operations",
                    "Time complexity of nested loops (e.g., 4 nested loops)",
                    "When to choose space complexity over time complexity",
                    "Logarithmic functions and values",
                    "O(1) complexity",
                    "O(log n) vs O(n log n)"
                ],
                practicals: [
                    "Find time complexity of single loop",
                    "Find time complexity of nested loops",
                    "Compare O(n) vs O(log n) with examples",
                    "Identify best, average, worst case for linear search"
                ],
                games: [
                    {
                        title: "VisuAlgo",
                        url: "https://visualgo.net/en",
                        description: "Visualizing data structures and algorithms through animation."
                    }
                ]
            },
            {
                phase: 2,
                title: "Arrays – Concepts & Operations",
                theory: [
                    {
                        title: "What is an Array",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=3YjX_3h7f5E",
                                title: "Arrays Data Structure",
                                duration: "10:15",
                                channel: "Codevolution"
                            }
                        ]
                    },
                    "Array Memory Allocation",
                    "Array memory allocation (padding, contiguous)",
                    "Types of Arrays (1D, 2D, Multidimensional)",
                    "Heterogeneous vs Homogeneous arrays",
                    "Jagged Array",
                    "Sparse Array",
                    "Array Operations (Access, Insert, Delete)",
                    "Linear Search vs Random Access",
                    "Time Complexity of Array Operations",
                    "Subarray Concept",
                    "Difference Between Array and Linked List"
                ],
                practicals: [
                    "Reverse an array",
                    "Implement Linear Search",
                    "Find sum of elements in an array",
                    "Find second largest element in an array",
                    "Find third largest element without sorting",
                    "Find kth largest element in an array",
                    "Find frequency of each element in an array",
                    "Find average of even numbers in an array",
                    "Move zero elements to the end of an array",
                    "Calculate frequency of each number",
                    "Find common elements between two arrays",
                    "Remove subarray containing largest number from a 2D array",
                    "Flatten a multidimensional array"
                ],
                games: [
                    {
                        title: "LeetCode",
                        url: "https://leetcode.com/problemset/all/",
                        description: "Practice coding problems to improve your algorithmic skills."
                    }
                ]
            },
            {
                phase: 3,
                title: "Advanced Array Problems",
                theory: [
                    "Subarray Problems",
                    "Sliding Window Technique",
                    "Two Pointer Technique",
                    "Binary Search Concept",
                    "Limitations of Binary Search",
                    "Array vs Linked List in Searching"
                ],
                practicals: [
                    "Find subarray with maximum increasing elements",
                    "Find minimum element in a sorted rotated array",
                    "Two Sum problem",
                    "Product of array except self",
                    "Binary search implementation",
                    "Find last occurrence in sorted array with duplicates"
                ],
                games: [
                    {
                        title: "Binary Search Game",
                        url: "https://www.advanced-ict.info/interactive/binary_search.html",
                        description: "Interactive game to understand binary search logic."
                    }
                ]
            },
            {
                phase: 4,
                title: "Strings – Concepts & Manipulation",
                theory: [
                    "What is a String",
                    "String Immutability",
                    "Character Encoding (ASCII, UTF-8)",
                    "Escape sequences",
                    "Control characters",
                    "Memory Used by Strings",
                    "String Operations Without Built-in Methods",
                    "String Operations without built-in methods (emphasis)"
                ],
                practicals: [
                    "Reverse a string",
                    "Reverse each word in a string",
                    "Check if a string is palindrome",
                    "Check if two strings are anagrams",
                    "Find first non-repeating character",
                    "Remove vowels from a string",
                    "Remove extra whitespaces from a string",
                    "Convert object to query string format",
                    "String permutations",
                    "PascalCase to snake_case",
                    "Find shortest word in a string",
                    "Find longest word in a string",
                    "Find all words starting with a vowel",
                    "Count words in a sentence without built-in methods",
                    "Extract digits from a string",
                    "Title Case a string",
                    "Ensure string ends with a period"
                ]
            },
            {
                phase: 5,
                title: "Linked Lists – Singly Linked List",
                theory: [
                    {
                        title: "What is a Linked List",
                        videos: [
                            {
                                url: "https://www.youtube.com/watch?v=Hj_rA0dhr2I",
                                title: "Linked List Data Structure",
                                duration: "15:20",
                                channel: "Codevolution"
                            }
                        ]
                    },
                    "Why Linked List is Linear",
                    "Types of Linked Lists",
                    "Singly Linked List Structure",
                    "Time Complexity of Linked List Operations",
                    "Array vs Linked List",
                    "Linked list vs arrays (Memory allocation, Time complexity details)",
                    "Multi-linked list",
                    "Polynomial representation using linked list"
                ],
                practicals: [
                    "Create a singly linked list",
                    "Insert at beginning",
                    "Insert at specific position",
                    "Delete node by value",
                    "Delete nth node from end (two pointer)",
                    "Find middle of linked list (fast & slow pointer)",
                    "Reverse a singly linked list",
                    "Detect cycle in linked list (Floyd's Algorithm)",
                    "Convert array to linked list",
                    "Delete kth element from end",
                    "Remove odd element nodes",
                    "Swap first and last nodes",
                    "Remove last instance of a value",
                    "Print all elements in order and reverse order"
                ]
            },
            {
                phase: 6,
                title: "Linked Lists – Doubly & Circular",
                theory: [
                    "Doubly Linked List Structure",
                    "Circular Linked List Concept",
                    "Advantages of Doubly Linked List",
                    "Applications of Circular Linked List"
                ],
                practicals: [
                    "Create a doubly linked list",
                    "Insert node in doubly linked list",
                    "Delete node from doubly linked list",
                    "Reverse a doubly linked list",
                    "Convert singly linked list to doubly linked list",
                    "Create circular linked list",
                    "Validate circular linked list",
                    "Josephus problem using circular linked list",
                    "Delete front and back nodes with specific data (Doubly)",
                    "Doubly to circular linked list",
                    "Insert at beginning/end/specific position (Circular)",
                    "Delete head/last/specific node (Circular)",
                    "Split circular linked list into two halves",
                    "Check if two circular linked lists are identical",
                    "Traverse circular linked list from any given node",
                    "Delete every kth node in circular linked list"
                ]
            },
            {
                phase: 7,
                title: "Recursion – Concepts & Practice",
                theory: [
                    "What is Recursion",
                    "Base Case and Recursive Case",
                    "Recursion vs Loop",
                    "Types of Recursion (Direct, Indirect, Tail, Head, Binary)",
                    "Space Complexity of Recursion",
                    "Stack Overflow",
                    "Advantages and Disadvantages of Recursion",
                    "Applications of Recursion",
                    "Mutual recursion",
                    "Backtracking concept"
                ],
                practicals: [
                    "Factorial using recursion",
                    "Fibonacci series using recursion",
                    "Sum of array elements using recursion",
                    "Reverse a string using recursion",
                    "Remove a character from string using recursion",
                    "Binary search using recursion",
                    "Sum of even numbers using recursion",
                    "Print Fibonacci series under a limit",
                    "Recursion that recurses only 5 times",
                    "Remove duplicates using recursion"
                ],
                games: [
                    {
                        title: "Human Resource Machine",
                        url: "https://tomorrowcorporation.com/humanresourcemachine",
                        description: "Puzzle game that teaches assembly-like logic and recursion concepts."
                    },
                    {
                        title: "Recursion visualizer",
                        url: "https://recursion.vercel.app/",
                        description: "Visualise recursion tree for common algorithms."
                    }
                ]
            },
            {
                phase: 8,
                title: "Memory Management",
                theory: [
                    "Memory allocation (static vs dynamic)",
                    "Advantages of static memory allocation",
                    "Disadvantages of dynamic memory allocation",
                    "Stack vs heap memory",
                    "Memory leak",
                    "How to prevent memory leaks in JavaScript",
                    "Garbage collector",
                    "Memory deallocation",
                    "Circular reference",
                    "Memory units (byte, kilobyte vs kibibyte, gigabyte)",
                    "Virtual memory",
                    "Memory pool",
                    "Memory padding",
                    "Stack overflow and heap overflow",
                    "Security benefits of virtual memory",
                    "Unity-specific memory leak awareness (Unity Profiler, OnDisable event, DontDestroyOnLoad)"
                ],
                practicals: [
                    "Demonstrate stack overflow with recursion",
                    "Identify memory leak in closure",
                    "Simulate circular reference"
                ]
            }
        ]
    },
    "dsa-2": {
        fileName: "dsa-2",
        description: "DSA 2",
        category: "DSA",
        subDescription: "Intermediate and Advanced Data Structures. Focused on stacks, queues, hash tables, sorting, searching, patterns, and real-world applications.",
        phases: [
            {
                phase: 1,
                title: "Advanced Array & String Problem Solving",
                theory: [
                    "Time complexity of accessing array elements by index",
                    "Limitations of arrays in real-world applications",
                    "In-place vs out-of-place operations",
                    "Why strings are immutable (revisited with performance angle)",
                    "Brute force vs optimized approach"
                ],
                practicals: [
                    "Append an element at the front of an array without built-in methods",
                    "Check if an array is sorted in O(n)",
                    "Remove duplicates from an array in O(n)",
                    "Move zeroes to the end of an array",
                    "Find the third largest element in an unsorted array",
                    "Remove the longest string from an array",
                    "Find the longest consecutive repeating character in a string",
                    "Find the second longest word in a sentence",
                    "Find duplicate students in an array of objects",
                    "Convert 'APPLE' to 'A-pp-ppp-llll-eeeee'",
                    "Swap first and last characters of a string"
                ]
            },
            {
                phase: 2,
                title: "Stack – Design, Internals & Applications",
                theory: [
                    "Stack abstract data type",
                    "Purpose of stack pointer",
                    "Stack overflow vs stack underflow",
                    "Why stack is not suitable for searching",
                    "Stack vs array – usage comparison",
                    "Call stack and recursion relation"
                ],
                practicals: [
                    "Implement stack using array",
                    "Implement stack using linked list",
                    "Implement stack using queue",
                    "Implement stack that rejects duplicate values",
                    "Implement MinStack (push, pop, getMax in O(1))",
                    "Reverse a string using stack",
                    "Check palindrome using stack",
                    "Validate parentheses (LeetCode 20)",
                    "Reverse a stack using recursion",
                    "Sort a stack using a temporary stack",
                    "Delete middle element from a stack",
                    "Implement undo-redo functionality using stack"
                ],
                games: [
                    {
                        title: "Stack Visualizer",
                        url: "https://www.cs.usfca.edu/~galles/visualization/StackArray.html",
                        description: "Visualize stack operations (push, pop) in real-time."
                    }
                ]
            },
            {
                phase: 3,
                title: "Queue – Variants & Real-World Usage",
                theory: [
                    "Queue abstract data type",
                    "Why queues are FIFO",
                    "Types of queues",
                    "Bounded vs unbounded queues",
                    "Circular queue concept",
                    "Deque (double-ended queue)",
                    "Priority queue fundamentals",
                    "Monotonic queue concept"
                ],
                practicals: [
                    "Implement queue using array",
                    "Implement queue using linked list",
                    "Implement queue using stack",
                    "Implement circular queue",
                    "Circular queue with fixed maximum length",
                    "Implement deque (insert/remove from both ends)",
                    "Reverse a queue",
                    "Convert queue into stack",
                    "Implement priority queue",
                    "Use monotonic queue to track maximum in a window"
                ],
                games: [
                    {
                        title: "Queue Visualizer",
                        url: "https://www.cs.usfca.edu/~galles/visualization/QueueArray.html",
                        description: "Visualize queue operations (enqueue, dequeue) in real-time."
                    }
                ]
            },
            {
                phase: 4,
                title: "Hash Tables – Design & Collision Handling",
                theory: [
                    "Why hash tables are faster than arrays",
                    "Hash function characteristics",
                    "Load factor and its impact",
                    "Hash collision and why it happens",
                    "Open hashing vs closed hashing",
                    "Separate chaining",
                    "Open addressing",
                    "Linear probing",
                    "Quadratic probing",
                    "Double hashing",
                    "Rehashing",
                    "Hash table vs Hash set",
                    "Hashing vs encryption",
                    "Popular hashing algorithms (MD5, SHA1, CRC32)",
                    "Time complexity of hash table operations"
                ],
                practicals: [
                    "Implement a hash table from scratch",
                    "Handle collisions using chaining",
                    "Handle collisions using linear probing",
                    "Handle collisions using quadratic probing",
                    "Implement double hashing",
                    "Implement rehashing",
                    "Find frequency of characters in a string using hash table",
                    "Find first non-repeating character using hash table",
                    "Find least occurred number using hash table",
                    "Remove duplicates from a string using hash table",
                    "Find uncommon elements from two arrays using hash table",
                    "Solve Two Sum using hash table in O(n)"
                ],
                games: [
                    {
                        title: "Hash Map Simulation",
                        url: "https://www.cs.usfca.edu/~galles/visualization/OpenHash.html",
                        description: "Interactive hash table simulation with collision handling."
                    }
                ]
            },
            {
                phase: 5,
                title: "Sorting Algorithms – Deep Dive & Use Cases",
                theory: [
                    "Purpose of sorting",
                    "Stable vs unstable sorting",
                    "In-place vs non in-place sorting",
                    "Why comparison sorts differ in complexity",
                    "Divide and conquer strategy",
                    "Why merge sort is preferred for linked lists",
                    "Why quick sort degrades to O(n^2)",
                    "Pivot selection impact in quick sort",
                    "Space complexity trade-offs",
                    "Non-comparison sorts (Counting, Radix, Bucket)",
                    "When to use non-comparison sorts"
                ],
                practicals: [
                    "Bubble sort (with swapped flag analysis)",
                    "Insertion sort implementation",
                    "Selection sort implementation",
                    "Merge sort implementation",
                    "Merge sort in descending order",
                    "Quick sort implementation",
                    "Quick sort without extra array",
                    "Sort array of students using merge sort",
                    "Sort array of objects based on property (.age, .amount)",
                    "Sort strings using merge sort",
                    "Sort strings using stack",
                    "Sort an array alphabetically using QuickSort",
                    "Implement Counting Sort",
                    "Implement Radix Sort",
                    "Compare sorting algorithms on different inputs",
                    "Sort nodes in a linked list",
                    "Merge two sorted linked lists",
                    "Maintain a sorted singly linked list"
                ],
                games: [
                    {
                        title: "Sorting Visualizer",
                        url: "https://www.toptal.com/developers/sorting-algorithms",
                        description: "Interactive visualization of various sorting algorithms."
                    }
                ]
            },
            {
                phase: 6,
                title: "Advanced Binary Search",
                theory: [
                    "Binary Search on Answer (Search Space)",
                    "Lower Bound & Upper Bound",
                    "Peak Element in Unsorted Array",
                    "Search in Rotated Sorted Array II (with duplicates)",
                    "Aggressive Cows / Book Allocation Problems",
                    "Medicines/Capacity to Ship Packages Problems"
                ],
                practicals: [
                    "Implement Lower Bound and Upper Bound",
                    "Find Peak Element in 2D Grid",
                    "Search in Rotated Sorted Array II",
                    "Solve 'Capacity to Ship Packages within D Days'",
                    "Solve 'Aggressive Cows' (Min distance maximization)",
                    "Find K-th missing positive number",
                    "Binary search in an array of strings",
                    "Replace elements in binary search"
                ]
            },

            {
                phase: 7,
                title: "Algorithmic Patterns",
                theory: [
                    "Two pointer technique",
                    "Fast and slow pointer technique",
                    "Sliding window pattern",
                    "Divide and conquer",
                    "Backtracking overview"
                ],
                practicals: [
                    "Two sum using two pointers",
                    "Two-pointer approach (remove nth node from end)",
                    "Buy and sell stock (sliding window approach)",
                    "Find the subarray with the maximum sum (Kadane's Algorithm)",
                    "Subarray with max elements in continuously increasing order",
                    "Find largest substring without vowels",
                    "Longest substring without repeating characters",
                    "Remove nth node from end using two pointers",
                    "Detect cycle in linked list using fast & slow pointer",
                    "Buy and sell stock using sliding window",
                    "Generate combinations using backtracking"
                ]
            },

        ]
    },
    "dsa-3": {
        fileName: "dsa-3",
        description: "DSA 3",
        category: "DSA",
        subDescription: "Advanced: Trees, Heaps, Tries, Graphs, and Range Queries with interview-grade practicals.",
        phases: [
            {
                phase: 1,
                title: "Tree Fundamentals & Terminology",
                theory: [
                    "Tree data structure definition",
                    "Why tree is a non-linear data structure",
                    "Root, parent, child relationship",
                    "Leaf nodes and internal nodes",
                    "Degree of a node",
                    "Degree of a tree",
                    "Height of a tree",
                    "Depth of a node",
                    "Relationship between height and depth",
                    "Level of a node",
                    "Internal nodes vs Leaf nodes",
                    "Siblings",
                    "Degree of a tree",
                    "Why trees are recursive structures",
                    "Difference between tree and graph"
                ],
                practicals: [
                    "Identify root, leaf, and internal nodes in a given tree",
                    "Calculate degree of each node",
                    "Find height of a given binary tree",
                    "Find depth of a given node",
                    "Count leaf and internal nodes"
                ],
                games: [
                    {
                        title: "Binary Tree Visualizer",
                        url: "https://www.cs.usfca.edu/~galles/visualization/BST.html",
                        description: "Build and manipulate binary trees interactively."
                    }
                ]
            },
            {
                phase: 2,
                title: "Binary Tree Types & Properties",
                theory: [
                    "Binary Tree definition",
                    "Full binary tree",
                    "Complete binary tree",
                    "Perfect binary tree",
                    "Balanced vs unbalanced tree",
                    "Degenerate tree",
                    "Ternary tree",
                    "N-ary tree",
                    "Maximum number of nodes in a binary tree of height h",
                    "Difference between Binary Tree and Binary Search Tree"
                ],
                practicals: [
                    "Check if a binary tree is full",
                    "Check if a binary tree is complete",
                    "Check if a binary tree is perfect",
                    "Identify whether a tree is balanced or unbalanced",
                    "Count nodes in an N-ary tree"
                ]
            },
            {
                phase: 3,
                title: "Tree Traversals & BFS vs DFS",
                theory: [
                    "Tree traversal definition",
                    "Preorder traversal (DFS)",
                    "Inorder traversal (DFS)",
                    "Postorder traversal (DFS)",
                    "Level order traversal (BFS)",
                    "Use cases of BFS in trees",
                    "Use cases of DFS in trees",
                    "Traversal patterns and recursion relation"
                ],
                practicals: [
                    "Implement preorder traversal",
                    "Implement inorder traversal",
                    "Implement postorder traversal",
                    "Implement level order traversal",
                    "Print all leaf nodes using traversal",
                    "Find sum of left leaf nodes"
                ]
            },
            {
                phase: 4,
                title: "Binary Search Tree (BST) Deep Dive",
                theory: [
                    "Binary Search Tree property",
                    "Why BST improves search efficiency",
                    "Applications of BST",
                    "Complexity of BST operations",
                    "Allowing duplicates in BST",
                    "Special case deletion in BST",
                    "Difference between BT and BST",
                    "Time complexity of BT vs BST",
                    "Allow duplicates in BST"
                ],
                practicals: [
                    "Validate whether a tree is BST",
                    "Find minimum in BST using recursion",
                    "Find second largest element in BST",
                    "Find third largest element in BST",
                    "Find closest element in BST to target",
                    "Count single-child nodes in BST",
                    "Check if BST is perfect"
                ]
            },
            {
                phase: 5,
                title: "BST Transformations & Advanced Problems",
                theory: [
                    "Convert Binary Tree to Binary Search Tree",
                    "Convert sorted array to balanced BST",
                    "Lowest Common Ancestor (LCA)",
                    "Check if two trees are identical",
                    "Check if one tree is a subtree of another"
                ],
                practicals: [
                    "Convert BT to BST",
                    "Create balanced BST from sorted array",
                    "Find LCA of two nodes",
                    "Check if two trees are identical",
                    "Check if a tree is a subtree",
                    "Remove duplicates from Binary Tree"
                ]
            },
            {
                phase: 6,
                title: "Self-Balancing Trees",
                theory: [
                    "Why self-balancing trees are required",
                    "AVL Tree concept",
                    "AVL balance factor",
                    "Rotations in AVL trees",
                    "Red-Black Tree properties",
                    "Difference between AVL and Red-Black Tree",
                    "Splay Tree concept"
                ],
                practicals: [
                    "Check if a tree is height-balanced",
                    "Perform LL, RR, LR, RL rotations",
                    "Insert nodes in AVL tree",
                    "Identify Red-Black Tree properties violations",
                    "Find access pattern benefits in Splay Tree"
                ]
            },
            {
                phase: 7,
                title: "Heap & Priority Queue (Tree-Based)",
                theory: [
                    "Heap as a complete binary tree",
                    "Min heap vs max heap",
                    "Heapify up and heapify down",
                    "Priority queue concept",
                    "Applications of heap",
                    "BST vs Heap",
                    "Time complexity of heap insert",
                    "Is heap complete binary tree",
                    "Find right child in heap"
                ],
                practicals: [
                    "Build a min heap from array",
                    "Build a max heap from array",
                    "Convert min heap to max heap",
                    "Find kth largest element using heap",
                    "Delete node from heap",
                    "Heap sort implementation",
                    "Heap sort to sort the string"
                ],
                games: [
                    {
                        title: "Heap Visualizer",
                        url: "https://www.cs.usfca.edu/~galles/visualization/Heap.html",
                        description: "Visualize Min/Max Heap construction and operations."
                    }
                ]
            },
            {
                phase: 8,
                title: "Trie (Prefix Tree)",
                theory: [
                    "Trie data structure definition",
                    "Why trie is used over BST for strings",
                    "Prefix trie vs suffix trie",
                    "Compressed trie",
                    "Trie memory inefficiency",
                    "Trie serialization",
                    "Applications of trie",
                    "Suffix vs prefix trie",
                    "Self balancing trie",
                    "Complexity of trie operations"
                ],
                practicals: [
                    "Insert word into trie",
                    "Search word in trie",
                    "Prefix search in trie",
                    "Find longest common prefix",
                    "Autocomplete using trie",
                    "Delete word from trie"
                ]
            },
            {
                phase: 9,
                title: "Graph Fundamentals & Representation",
                theory: [
                    "Graph data structure definition",
                    "Graph vs tree",
                    "Types of graphs",
                    "Directed vs undirected graph",
                    "Weighted vs unweighted graph",
                    "Adjacency representation",
                    "Adjacency list",
                    "Degree of a vertex",
                    "Connected vs disconnected graph",
                    "Classification of graph",
                    "Graph indexing",
                    "Graph used in maps",
                    "Social media graph for mutual friends"
                ],
                practicals: [
                    "Represent graph using adjacency list",
                    "Represent graph using adjacency structure",
                    "Calculate degree of each vertex",
                    "Detect disconnected graph"
                ]
            },
            {
                phase: 10,
                title: "Graph Traversal & Algorithms",
                theory: [
                    "BFS traversal in graph",
                    "DFS traversal in graph",
                    "Cycle detection in graph",
                    "Shortest path in unweighted graph (BFS)",
                    "Dijkstra's Algorithm (Weighted)",
                    "Bellman-Ford Algorithm (Negative weights)",
                    "Floyd-Warshall Algorithm (All-pairs)",
                    "Minimum spanning tree concept",
                    "Prims algorithm",
                    "Kruskal algorithm",
                    "Bipartite graph",
                    "Tarjan's algorithm overview"
                ],
                practicals: [
                    "Implement BFS in graph",
                    "Implement DFS in graph",
                    "Detect cycle in undirected graph",
                    "Detect cycle in directed graph",
                    "Find shortest path using BFS",
                    "Implement Dijkstra's Algorithm",
                    "Implement Bellman-Ford to detect negative cycles",
                    "Find MST using Prim's algorithm",
                    "Find MST using Kruskal's algorithm",
                    "Solve Number of Islands problem",
                    "Clone Graph (133)",
                    "Find shortest distance between vertices",
                    "Detect cycle in an undirected graph (BFS/DFS)"
                ],
                games: [
                    {
                        title: "Graph Traversal Visualizer",
                        url: "https://visualgo.net/en/dfsbfs",
                        description: "Visualize DFS and BFS graph traversals."
                    }
                ]
            },
            {
                phase: 11,
                title: "Advanced Trees & Range Queries",
                theory: [
                    "B-Tree concept",
                    "Use cases of B-Tree",
                    "Segment Tree",
                    "Range query problems",
                    "Binary Indexed Tree (Fenwick Tree)",
                    "Splay tree"
                ],
                practicals: [
                    "Build a segment tree",
                    "Perform range sum query",
                    "Update value in segment tree",
                    "Implement Fenwick Tree",
                    "Perform prefix sum query"
                ]
            },
            {
                phase: 12,
                title: "Interview Mapping & LeetCode Alignment",
                theory: [
                    "Why trees and graphs dominate interviews",
                    "Common mistakes in tree problems",
                    "When to use BFS vs DFS",
                    "Choosing correct tree structure",
                    "Optimization thinking"
                ],
                practicals: [
                    "Binary Tree Level Order Traversal (102)",
                    "Kth Smallest Element in BST (230)",
                    "Clone Graph (133)",
                    "Number of Islands (200)",
                    "Kth Largest Element in Array (215)"
                ]
            }
        ]
    },
    "dsa-questions": {
        fileName: "dsa-questions",
        description: "DSA Question Bank",
        category: "DSA",
        subDescription: "Comprehensive Theory & Practical Question Bank. Master these to crack any interview.",
        phases: [
            {
                phase: 1,
                title: "DSA Intro & Complexity",
                theory: [
                    "What is a data structure and why do we need it?",
                    "How do data structures affect performance?",
                    "What is an algorithm?",
                    "What makes an algorithm efficient?",
                    "What is time complexity?",
                    "What is space complexity?",
                    "What are asymptotic notations?",
                    "What is Big O notation?",
                    "What is Big Theta notation?",
                    "What is Big Omega notation?",
                    "Why do we analyze worst-case complexity?",
                    "What is constant time O(1)?",
                    "What is linear time O(n)?",
                    "What is logarithmic time O(log n)?",
                    "What is quadratic time O(n²)?",
                    "What is exponential time O(2ⁿ)?",
                    "How do nested loops affect time complexity?",
                    "How does recursion affect space complexity?",
                    "What is auxiliary space?",
                    "What is in-place algorithm?",
                    "What is stable vs unstable algorithm?",
                    "What is adaptive algorithm?",
                    "What is best case, average case, and worst case?",
                    "What is amortized complexity?",
                    "Why is Big O not an exact measurement of time?",
                    "What is cache locality and how does it affect performance?"
                ],
                practicals: []
            },
            {
                phase: 2,
                title: "Arrays",
                theory: [
                    "What is an array data structure?",
                    "How are arrays stored in memory?",
                    "What is random access in arrays?",
                    "What are advantages of arrays?",
                    "What are disadvantages of arrays?",
                    "What is the difference between static and dynamic arrays?",
                    "How does JavaScript handle arrays internally?",
                    "Why are JS arrays not true arrays?",
                    "Why should arrays not be compared using == or ===?"
                ],
                practicals: [
                    "How do you remove an element from an array without splice?",
                    "How do you insert an element at a specific index without splice?",
                    "How do you rotate an array by k positions?",
                    "How do you reverse an array in place?",
                    "How do you find the second largest element in an array?",
                    "How do you find the nth largest element?",
                    "How do you remove duplicates from an array?",
                    "How do you find common elements between two arrays?",
                    "How do you find missing numbers in a sequence?",
                    "How do you move all zeros to the end of an array?",
                    "How do you separate even and odd numbers in an array?",
                    "How do you find the maximum subarray sum?",
                    "How do you find the longest increasing subarray?",
                    "How do you merge two sorted arrays?",
                    "How do you check if an array is sorted?",
                    "How do you check if an array is empty properly?"
                ]
            },
            {
                phase: 3,
                title: "Linked Lists",
                theory: [
                    "What is a linked list?",
                    "Why do we need linked lists?",
                    "What is the difference between array and linked list?",
                    "What is a singly linked list?",
                    "What is a doubly linked list?",
                    "What is a circular linked list?",
                    "What is node structure in a linked list?",
                    "Why is linked list traversal O(n)?"
                ],
                practicals: [
                    "How do you insert a node at the beginning of a linked list?",
                    "How do you insert a node at the end?",
                    "How do you delete a node by value?",
                    "How do you delete a node by position?",
                    "How do you reverse a linked list?",
                    "How do you detect a loop in a linked list?",
                    "What is Floyd’s cycle detection algorithm?",
                    "How do you find the middle of a linked list?"
                ]
            },
            {
                phase: 4,
                title: "Stack",
                theory: [
                    "What is a stack data structure?",
                    "What is LIFO principle?",
                    "What are real-world use cases of stacks?",
                    "How is stack used in function calls?",
                    "What is call stack?",
                    "What is stack overflow?",
                    "How does undo/redo work using stack?"
                ],
                practicals: [
                    "How do you implement a stack using array?",
                    "How do you implement a stack using linked list?",
                    "How do you reverse a string using stack?",
                    "How do you check balanced parentheses using stack?"
                ]
            },
            {
                phase: 5,
                title: "Queue",
                theory: [
                    "What is a queue data structure?",
                    "What is FIFO principle?",
                    "What are real-world use cases of queues?",
                    "What is circular queue?",
                    "What is deque?",
                    "What is priority queue?",
                    "How is queue used in event loop?",
                    "How is queue used in OS scheduling?"
                ],
                practicals: [
                    "How do you implement a queue using array?",
                    "How do you implement a queue using stack?"
                ]
            },
            {
                phase: 6,
                title: "Recursion",
                theory: [
                    "What is recursion?",
                    "What is base case?",
                    "What happens if base case is missing?",
                    "What is recursion stack?",
                    "What is tail recursion?",
                    "Why recursion can cause stack overflow?",
                    "When should recursion be avoided?"
                ],
                practicals: [
                    "How do you convert recursion to iteration?",
                    "How do you calculate factorial using recursion?",
                    "How do you generate Fibonacci series using recursion?",
                    "How do you flatten a nested array using recursion?"
                ]
            },
            {
                phase: 7,
                title: "Searching",
                theory: [
                    "What is searching?",
                    "What is linear search?",
                    "What is binary search?",
                    "Why does binary search require sorted array?",
                    "What is iterative vs recursive binary search?",
                    "What is the time complexity of binary search?"
                ],
                practicals: [
                    "How do you find first and last occurrence of an element?",
                    "How do you find element closest to a given value?"
                ]
            },
            {
                phase: 8,
                title: "Sorting",
                theory: [
                    "What is sorting?",
                    "Why is sorting important?",
                    "What is bubble sort?",
                    "What is selection sort?",
                    "What is insertion sort?",
                    "Which sorting algorithm is stable?",
                    "Which sorting algorithm is in-place?",
                    "Why is bubble sort inefficient?",
                    "What is the time complexity of insertion sort?",
                    "Why is insertion sort good for nearly sorted arrays?",
                    "How does JavaScript sort work internally?",
                    "Why does default JS sort behave unexpectedly for numbers?"
                ],
                practicals: []
            },
            {
                phase: 9,
                title: "Hashing",
                theory: [
                    "What is hashing?",
                    "What is hash function?",
                    "What is collision?",
                    "What are collision resolution techniques?",
                    "What is chaining?",
                    "What is open addressing?",
                    "What is load factor?",
                    "How do Map and Set use hashing?",
                    "Why is hashing fast?",
                    "When does hashing degrade to O(n)?"
                ],
                practicals: []
            },
            {
                phase: 10,
                title: "Advanced Algorithms",
                theory: [
                    "What is greedy algorithm?",
                    "What is divide and conquer?",
                    "What is dynamic programming?",
                    "What is memoization?",
                    "What is tabulation?",
                    "What is overlapping subproblems?",
                    "What is optimal substructure?",
                    "How does memoization improve performance?"
                ],
                practicals: [
                    "How do you optimize recursive solutions using DP?"
                ],
                games: [
                    {
                        title: "AlgoMonster",
                        url: "https://algo.monster/",
                        description: "Master coding interview patterns with interactive lessons."
                    }
                ]
            },
            {
                phase: 11,
                title: "Strings",
                theory: [],
                practicals: [
                    "How do you count character frequency in a string?",
                    "How do you find first non-repeating character?",
                    "How do you check if two strings are anagrams?",
                    "How do you find longest word in a sentence?",
                    "How do you reverse each word in a sentence?",
                    "How do you count vowels in a string?",
                    "How do you remove vowels from a string?",
                    "How do you check if a string is palindrome?"
                ]
            },
            {
                phase: 12,
                title: "Interview Strategy",
                theory: [
                    "How do you solve DSA problems step by step?",
                    "How do you identify the correct data structure?",
                    "How do you trade space for time?",
                    "How do you write optimized solutions in interviews?",
                    "Why brute force is not always bad?",
                    "How do you explain time complexity in interviews?",
                    "How do you approach unseen DSA problems?"
                ],
                practicals: []
            },
            {
                phase: 13,
                title: "Practice Recommendations",
                theory: [
                    "Practice problems from Blind 75 LeetCode",
                    "Refer to neetcode.io/practice for problem selection",
                    "Learn brute force and optimal solutions",
                    "Solve problems without referring to solutions after learning",
                    "Practice on LeetCode, HackerRank, GeeksforGeeks",
                    "Focus on practical coding and debugging",
                    "Improve coding speed and explanation skills",
                    "Practice without built-in methods",
                    "Practice medium-level questions with time constraints"
                ],
                practicals: [
                    "Use print statements to understand code flow instead of AI tools",
                    "Solve one Blind 75 problem daily"
                ]
            },
            {
                phase: 14,
                title: "Miscellaneous & Best Practices",
                theory: [
                    "Why algorithms are needed",
                    "Guidelines to write an algorithm",
                    "Dynamic vs statically typed languages",
                    "Contiguous vs non-contiguous data structures",
                    "Debugging techniques",
                    "Recursion vs loops",
                    "Typed arrays in JavaScript",
                    "Traditional arrays vs JavaScript arrays"
                ],
                practicals: [
                    "Generator function to yield numbers from a 2D list",
                    "Program to find the depth of a binary tree",
                    "Program to check whether tree is balanced or not",
                    "Array to max/min heap",
                    "Queue with ability to dequeue from both ends",
                    "Sort transaction objects based on amount"
                ]
            }
        ]
    }
};
