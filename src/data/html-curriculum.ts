export const HTML_CURRICULUM = {
    "html": {
        fileName: "html",
        description: "Modern HTML & Semantic Web",
        category: "HTML",
        subDescription: "The definitive HTML path. Master semantic web, accessibility, and structuring data for both human users and AI web scrapers.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Grand Tour: How the Web Works",
                targetExperience: ["1yoe"],
                theory: [
                    "The Big Picture: Frontend (Face), Backend (Brain), Database (Memory)",
                    "What is HTML? (The Skeleton of a Website)",
                    "Boilerplate Breakdown: The 'Secret' Code in every Page",
                    "How LLMs (like GPT) parse and understand your HTML structure"
                ],
                practicals: [
                    "Mental Model: Map out an AI chat app's Face, Brain, and Memory",
                    "The Annotated Skeleton: Build your first .html file"
                ]
            },
            {
                phase: 2,
                title: "Text & Structure: The Basics",
                targetExperience: ["1yoe"],
                theory: [
                    "Headings (h1-h6): The Page Hierarchy",
                    "Paragraphs (p) & Line Breaks (br)",
                    "Text Formatting (strong, em, mark)",
                    "Why Heading Hierarchy is crucial for SEO and AI understanding"
                ],
                practicals: [
                    "Project: Personal Bio Page - Using Headings and Paragraphs",
                    "Formatting Challenge: Use <mark> to highlight the AI's response in a chat UI"
                ]
            },
            {
                phase: 3,
                title: "Links, Navigation & Meta Data",
                targetExperience: ["1yoe"],
                theory: [
                    "HTML Links (Hyperlinks, Syntax, Absolute vs Relative)",
                    "Page Titles & Favicons: Your site's identity",
                    "Introduction to Meta Tags: How Google and AI crawlers read your mind"
                ],
                practicals: [
                    "Build a 2-page website and link them together",
                    "Add Meta descriptions optimized for Search Generative Experience (SGE)"
                ]
            },
            {
                phase: 4,
                title: "Visuals: Images & Lists",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "HTML Images (src, alt, width/height)",
                    "Why 'Alt' text matters (Accessibility for everyone & Vision AI models)",
                    "HTML Lists (Unordered vs Ordered) for rendering AI bullet points",
                    "Block vs Inline Elements"
                ],
                practicals: [
                    "Project: Digital Photo Gallery - Using Images with descriptive Alt text for AI",
                    "Task: Create a 'Recipe' page with an Ingredient List"
                ]
            },
            {
                phase: 5,
                title: "Meaningful Structure: Semantic HTML",
                targetExperience: ["2yoe"],
                theory: [
                    "Semantic HTML: Header, Footer, Nav, Main, Section, Article",
                    "Why Semantics? (Helping browsers, screen readers, and LLMs understand 'Why')",
                    "HTML Tables: Organizing structured data outputs from an AI"
                ],
                practicals: [
                    "Refactor an AI-generated 'Div-soup' layout into a Semantic masterpiece",
                    "Build a 'Student Roster' table with appropriate headers"
                ]
            },
            {
                phase: 6,
                title: "Forms & Prompt Inputs",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "The <form> Element",
                    "Form Elements (Input, Textarea, Button)",
                    "Building the perfect Chat Prompt `<textarea>` (autoresize, submitting on Enter)",
                    "Form Attributes (Autocomplete, Novalidate)"
                ],
                practicals: [
                    "Build a strict 'Prompt Injection' test form",
                    "Create a 'Search Filter' interface"
                ]
            },
            {
                phase: 7,
                title: "APIs, Media & Storage",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "HTML Web Storage (LocalStorage) to save chat histories",
                    "HTML Web Workers for background AI processing",
                    "HTML Server-Sent Events (SSE) for streaming text",
                    "Media: Video & Audio Elements for AI Voice responses"
                ],
                practicals: [
                    "Create a 'Todo List' that persists data using LocalStorage",
                    "Implement a Custom Audio Player for an AI Text-to-Speech output"
                ]
            },
            {
                phase: 8,
                title: "Advanced Standards & Accessibility",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Accessibility (A11Y) Principles for modern web apps",
                    "ARIA Roles (Live Regions for announcing AI responses)",
                    "Advanced Meta Tags (OpenGraph, Twitter Cards)",
                    "Structured Data & Microdata (Schema.org) for AI search engines"
                ],
                practicals: [
                    "Perform an Accessibility Audit on a streaming chat interface",
                    "Implement 'Product' Schema markup to test Structured Data knowledge"
                ]
            }
        ]
    }
};
