export const HTML_CURRICULUM = {
    "html": {
        fileName: "html",
        description: "Ultimate HTML Extreme Mastery",
        category: "HTML",
        subDescription: "The absolute definitive HTML encyclopedia. Structurally aligned with W3Schools for a linear learning path, reinforced with professional project-based mastery.",
        phases: [
            {
                phase: 1,
                title: "The Grand Tour: How the Web Works",
                theory: [
                    "The Big Picture: Frontend (Face), Backend (Brain), Database (Memory)",
                    "Internet vs. World Wide Web (The Wires vs. The Content)",
                    "What is HTML? (The Skeleton of a Website)",
                    "Why HTML5? (The modern standard for everyone)",
                    "Boilerplate Breakdown: The 'Secret' Code in every Page",
                    "- <!DOCTYPE html>: Telling the browser 'I am a modern page'",
                    "- <html>: The container for everything",
                    "- <head>: The page's 'Brain' (Title, Settings, Meta Tags)",
                    "- <body>: The page's 'Body' (Everything you actually see)",
                    "Introduction to Meta Tags: How Google reads your mind",
                    "Common Tag Anatomy: <opening> content </closing>"
                ],
                practicals: [
                    "Mental Model: 'The Fullstack Sketch' - Map out your favorite app's Face, Brain, and Memory",
                    "The Annotated Skeleton: Build your first .html file and comment every line in plain English",
                    "Project: 'The Page's ID Card' - Creating a basic page with a Title and Meta Description"
                ],
                games: [
                    { title: "Nester", url: "https://codepip.com/games/nester/", description: "Master HTML hierarchy and nesting. Perfect for visualizing the 'Skeleton' analogy." }
                ]
            },
            {
                phase: 2,
                title: "Text & Structure: The Basics",
                theory: [
                    "Headings (h1-h6): The Page Hierarchy",
                    "Paragraphs (p) & Line Breaks (br, hr)",
                    "Text Formatting (strong, em, mark, small, del, ins)",
                    "HTML Comments: Leaving notes for yourself",
                    "The concept of 'The Family Tree' (DOM Basics)",
                    "HTML Styles attribute: Quick visual wins with Colors"
                ],
                practicals: [
                    "Project: Personal Bio Page - Using Headings and Paragraphs to tell your story",
                    "Experiment: Try every Heading level (h1-h6) to see the visual difference",
                    "Formatting Challenge: Use <mark> and <strong> to highlight a news article snippet"
                ]
            },
            {
                phase: 3,
                title: "Links, Quotes & Navigation",
                theory: [
                    "HTML Links (Hyperlinks, Syntax, Absolute vs Relative)",
                    "Quotations & Citations (blockquote, q, address, cite)",
                    "Link States: Where do they go? (target='_blank')",
                    "HTML File Paths: Navigating your project folder",
                    "Page Titles & Favicons: Your site's identity",
                    "The <abbr> Tag: Explaining technical terms"
                ],
                practicals: [
                    "Build a 2-page website and link them together using Relative Paths",
                    "Create a 'Book Quote' section using <blockquoteContent>",
                    "Project: Digital Business Card - A single page with social links and a personal motto"
                ]
            },
            {
                phase: 4,
                title: "Visuals: Images & Lists",
                theory: [
                    "HTML Images (src, alt, width/height)",
                    "Why 'Alt' text matters (Accessibility for everyone)",
                    "Background Images vs Image Tags",
                    "HTML Lists (Unordered vs Ordered)",
                    "Nested Lists: Creating a 'Menu' structure",
                    "Block vs Inline Elements: The 'Box' mental model"
                ],
                practicals: [
                    "Project: Digital Photo Gallery - Using Images with meaningful Alt text",
                    "Task: Create a 'Recipe' page with an Ingredient List (Ordered) and Steps (Unordered)",
                    "Visual Check: Use <div> vs <span> to see how elements stack"
                ]
            },
            {
                phase: 5,
                title: "Meaningful Structure: Layout & Tables",
                theory: [
                    "Semantic HTML: Header, Footer, Nav, Main, Section, Article",
                    "Why Semantics? (Helping browsers and screen readers understand 'Why')",
                    "HTML Tables: Organizing data (Rows, Cells, Headers)",
                    "The <iframe> Tag: Windows to other websites",
                    "HTML Classes & IDs: Giving names to your elements",
                    "Layout Basics: How to structure a full webpage"
                ],
                practicals: [
                    "Refactor a 'Div-soup' layout into a Semantic masterpiece",
                    "Build a 'Student Roster' table with appropriate headers",
                    "Project: News Portal Skeleton - A complete page layout using Semantic tags and an embedded map"
                ]
            },
            {
                phase: 6,
                title: "HTML Forms & Input",
                theory: [
                    "The <form> Element (Action, Method, Target)",
                    "Form Elements (Input, Label, Select, Textarea, Button, Fieldset, Legend)",
                    "Input Types (Text, Password, Email, Number, Date, Color, Range, etc.)",
                    "Input Attributes (Value, Readonly, Disabled, Size, Maxlength, Min/Max)",
                    "Form Attributes (Autocomplete, Novalidate)"
                ],
                practicals: [
                    "Build a strict 'User Registration' form to implement varied Input Types and Labels",
                    "Create a 'Search Filter' interface to practice Form Attributes like autocomplete",
                    "Project: Job Application Wizard - using Fieldsets, Selects, and Input Constraints (Min/Max)"
                ]
            },
            {
                phase: 7,
                title: "Graphics & Media",
                theory: [
                    "HTML5 Canvas Graphics (Drawing basics)",
                    "HTML5 SVG (Scalable Vector Graphics)",
                    "HTML Media: Video & Audio Elements",
                    "Media Attributes (Controls, Autoplay, Loop, Muted)",
                    "YouTube & Plugin Embed techniques"
                ],
                practicals: [
                    "Draw basic shapes and text to verify HTML5 Canvas API understanding",
                    "Implement a Custom Video Player using <video> and Media Attributes",
                    "Project: Interactive Media Showcase - Integrating SVG icons, Audio tracks, and YouTube embeds"
                ]
            },
            {
                phase: 8,
                title: "APIs & Dynamic HTML",
                theory: [
                    "HTML Geolocation API",
                    "HTML Drag and Drop API",
                    "HTML Web Storage (LocalStorage vs SessionStorage)",
                    "HTML Web Workers (Background processing)",
                    "HTML Server-Sent Events (SSE)"
                ],
                practicals: [
                    "Build a 'Find Me' button to implement the Geolocation API",
                    "Create a 'Todo List' that persists data using LocalStorage/SessionStorage",
                    "Project: Drag-and-Drop Task Board - A functional UI built purely on HTML5 API standards"
                ]
            },
            {
                phase: 9,
                title: "Standards & Accessibility",
                theory: [
                    "HTML Entities, Symbols, and Emojis",
                    "HTML Charsets & URL Encoding",
                    "HTML vs. XHTML differences",
                    "Accessibility (A11Y) Principles",
                    "ARIA Roles (Landmarks, Alerts)",
                    "Coding Conventions & Style Guide"
                ],
                practicals: [
                    "Perform an Accessibility Audit to identify missing ARIA Roles and Labels",
                    "Implement URL Encoding and HTML Entities in a text-content demo",
                    "Project: The 'Universal' Page - Building a 100% W3C-validated, A11Y-compliant document"
                ]
            },
            {
                phase: 10,
                title: "Ultimate Mastery (Professional Extras)",
                theory: [
                    "Advanced Meta Tags (OpenGraph, Twitter Cards)",
                    "Structured Data & Microdata (Schema.org)",
                    "Web Components Basics (Custom Elements, Shadow DOM)",
                    "Critical Rendering Path optimization",
                    "Preload, Prefetch, and Resource Hints"
                ],
                practicals: [
                    "Add OpenGraph and Twitter Cards to a page to verify Social Metadata",
                    "Implement 'Product' Schema markup to test Structured Data knowledge",
                    "Final Project: The Ultimate Portfolio - A capstone combining Semantics, A11Y, and SEO Mastery"
                ]
            }
        ]
    }
};
