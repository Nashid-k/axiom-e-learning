export const HTML_CURRICULUM = {
    "html": {
        fileName: "html",
        description: "Ultimate HTML Extreme Mastery",
        category: "HTML",
        subDescription: "The absolute definitive HTML encyclopedia. Structurally aligned with W3Schools for a linear learning path, reinforced with professional project-based mastery.",
        phases: [
            {
                phase: 1,
                title: "HTML Basics & Structure",
                theory: [
                    "HTML Introduction & Editors",
                    "Basic Document Structure (<!DOCTYPE>, html, head, body)",
                    "HTML Elements & Attributes",
                    "Headings (h1-h6), Paragraphs (p) & Line Breaks (br, hr)",
                    "HTML Comments & Formatting Code",
                    "The concept of 'The DOM Tree' basics"
                ],
                practicals: [
                    "Setup a professional VS Code environment to verify 'Editor' theory",
                    "Build a validated 'Hello World' file to clear 'Document Structure' concepts",
                    "Project: Personal Bio Page - Implementing Headings, Paragraphs, and Comments into a structured document"
                ],
                games: [
                    { title: "Duck Hunt CSV", url: "https://duckhuntjs.com/", description: "A fun way to understand screen coordinates and basic logic within HTML5 canvas." },
                    { title: "Nester", url: "https://codepip.com/games/nester/", description: "Master HTML hierarchy and nesting. From the creators of Flexbox Froggy." }
                ]
            },
            {
                phase: 2,
                title: "Formatting & Presentation",
                theory: [
                    "Text Formatting (b, strong, i, em, u, s, mark, small, del, ins, sub, sup)",
                    "Quotations (blockquote, q, abbr, address, cite, bdo)",
                    "HTML Styles attribute (Introduction to inline CSS)",
                    "HTML Colors (Names, RGB, HEX, HSL)",
                    "CSS Integration: Inline, Internal, External styling",
                ],
                practicals: [
                    "Format a news article using <b>, <i>, and <mark> to test Formatting tags",
                    "Create a 'Color Palette' showcase to demonstrate RBG, HEX, and HSL values",
                    "Project: Stylized Quote Card - Combining <blockquote> with Inline Styles and specific Colors"
                ]
            },
            {
                phase: 3,
                title: "Links, Images & Navigation",
                theory: [
                    "HTML Links (Hyperlinks, Syntax, Targets, Absolute vs Relative)",
                    "Link States & Bookmarks",
                    "HTML Images (src, alt, width/height, floating)",
                    "Image Maps & Background Images",
                    "The <picture> Element & Favicons",
                    "HTML File Paths & Page Titles"
                ],
                practicals: [
                    "Build a multi-page website skeleton to master Relative vs Absolute File Paths",
                    "Create a clickable Image Map to link specific coordinates of an Image",
                    "Project: Digital Photo Gallery - Using Images with Alt text, Favicons, and Navigation Links"
                ]
            },
            {
                phase: 4,
                title: "Tables, Lists & Blocks",
                theory: [
                    "HTML Tables (Rows, Cells, Headers, Borders, Sizes)",
                    "Advanced Tables (Colspan, Rowspan, Grouping)",
                    "HTML Lists (Unordered, Ordered, Description Lists)",
                    "Block-level vs. Inline Elements",
                    "The <div> and <span> container elements",
                    "HTML Classes & IDs"
                ],
                practicals: [
                    "Design a 'Pricing Table' to practice Rowspan, Colspan, and Borders",
                    "Create a nested 'Table of Contents' to master Unordered and Ordered Lists",
                    "Project: Restaurant Menu - Structuring data with Tables, Divs, Classes, and IDs"
                ]
            },
            {
                phase: 5,
                title: "Layout & Embeds",
                theory: [
                    "HTML Iframes (Embedding external content)",
                    "The <script> Tag & NoScript",
                    "HTML Head Metadata (Meta tags, Base, Viewport)",
                    "HTML Layout Elements (Header, Footer, Nav, Section, Article, Aside)",
                    "Responsive Web Design Basics (Viewport, Media Queries concept)",
                    "Semantic HTML vs. Non-Semantic"
                ],
                practicals: [
                    "Embed third-party content (YouTube, Maps) to test Iframe attributes",
                    "Refactor a Div-soup layout using <header>, <main>, and <article> Semantic tags",
                    "Project: News Portal Layout - A complete skeleton demonstrating proper Meta tags and Semantic partitioning"
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
