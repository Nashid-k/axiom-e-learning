export const CSS_CURRICULUM = {
    "css": {
        fileName: "css",
        description: "Ultimate CSS Extreme Mastery",
        category: "CSS",
        subDescription: "The absolute definitive CSS encyclopedia. Structurally aligned with W3Schools for a linear learning path, reinforced with professional architectural methodologies (BEM, CUBE).",
        phases: [
            {
                phase: 1,
                title: "The Styling Mindset: Dressing the Skeleton",
                theory: [
                    "What is CSS? (The Designer of the Web)",
                    "The Syntax: 'Who' (Selector) + 'What' (Property) + 'How' (Value)",
                    "How to Style: The External Style Book (Best Practice)",
                    "Classes vs. IDs: Group Uniforms vs. Unique Names",
                    "CSS Comments: Reminders for your future self",
                    "Colors as Words: Introduction to Color Names"
                ],
                practicals: [
                    "The Identity Crisis: Give multiple elements the same Class and change them all at once",
                    "The Style Switch: Take an HTML page and create two CSS files with vastly different vibes",
                    "Project: 'The Named Palette' - A simple site showcasing your favorite colors using English names"
                ]
            },
            {
                phase: 2,
                title: "The Physical World: Everything is a Box",
                theory: [
                    "The Physical Box Model: Content, Padding, Border, Margin",
                    "Padding: Breathing room *inside* the box",
                    "Border: The solid walls of the box (Width, Style, Color)",
                    "Margin: Respecting the distance between neighbors",
                    "Width & Max-width: Controlling the container's size",
                    "The auto trick: Centering your box in the middle of the screen"
                ],
                practicals: [
                    "The Breathing Room Test: Add Padding vs Margin to see which one clears space inside vs outside",
                    "The Wallpaper Wall: Creating a defined border with a specific 'Wall Style'",
                    "Project: 'The Centered Card' - A clean, professional card perfectly centered in the viewport"
                ],
                games: [
                    {
                        title: "CSS Diner",
                        url: "https://flukeout.github.io/",
                        description: "A fun game to master 'Targeting' (Selectors) by picking items from a table."
                    }
                ]
            },
            {
                phase: 3,
                title: "Aesthetics: Colors, Fonts & Shadows",
                theory: [
                    "Beyond Names: HEX & RGBa Colors (The professional way)",
                    "Typography: Importing Google Fonts (Your site's voice)",
                    "Font Weights & Line-height: Making text readable",
                    "Text Shadows & Box Shadows: Adding depth and 'Pop'",
                    "CSS Transitions: Making changes feel smooth (Hover effects)"
                ],
                practicals: [
                    "The Premium Upgrade: Take a basic text page and apply a professional Google Font and a subtle Box Shadow",
                    "Hover Magic: Create a button that changes color and grows slightly when touched",
                    "Project: 'The Modern Blog Post' - A beautifully typeset article with a 'Floating' Image Card"
                ]
            },
            {
                phase: 4,
                title: "Alignment Magic: Flexbox",
                theory: [
                    "The Problem: Why is centering so hard? (The historical struggle)",
                    "The Savior: Flexbox (The Professional Organizer)",
                    "The Flex Container: display: flex",
                    "The Big Three: justify-content (Horizontal), align-items (Vertical), gap (Spacing)",
                    "Flex Direction: Switching from Rows to Columns",
                    "Responsive thinking: How boxes wrap when space runs out"
                ],
                practicals: [
                    "The Centering Challenge: Center a 'Checkmark' inside a circle perfectly using only 3 lines of Flexbox",
                    "The Navigation Bar: Build a standard header where the Logo is on the left and Links are on the right",
                    "Project: 'The Responsive Gallery' - A collection of cards that automatically stack on smaller screens"
                ],
                games: [
                    {
                        title: "Flexbox Froggy",
                        url: "https://flexboxfroggy.com/",
                        description: "The absolute best way to master Flexbox alignment by helping a frog get home."
                    }
                ]
            },
            {
                phase: 5,
                title: "Interaction: State & Selectors",
                theory: [
                    "User Feedback: :hover, :active, :focus, :visited",
                    "Targeting the right child: :nth-child(even/odd)",
                    "Pseudo-elements: ::before and ::after (The 'Ghost' elements)",
                    "Combinators: How parents and children talk to each other (> , +)",
                    "Attribute Selectors: Styling based on what an element *has*"
                ],
                practicals: [
                    "Interactive List: Create a list where the background changes color when you hover over an item",
                    "The 'Ghost' Icon: Use ::before to add a decorative icon without changing the HTML",
                    "Project: 'The Modern Form' - Styling inputs that change color when you click (focus) them"
                ]
            },
            {
                phase: 6,
                title: "Precision: Positioning & Layers",
                theory: [
                    "Static vs Relative: The normal flow vs 'Nudging'",
                    "Absolute: Breaking free from the group (Floating anywhere)",
                    "Fixed: The 'Sticker' that stays when you scroll",
                    "Sticky: The 'Magnet' that sticks at the top",
                    "Z-index: Who is in front? (The stacking order)"
                ],
                practicals: [
                    "The Floating Badge: Place a 'Sale' sticker on top of a product image using Absolute",
                    "The Sticky Header: Make a navigation bar that stays visible while scrolling",
                    "Project: 'The Modal Overlay' - Creating a pop-up window that darkens the rest of the screen"
                ]
            },
            {
                phase: 7,
                title: "Power Ups: Grid & Variables",
                theory: [
                    "CSS Grid: The Ultimate Layout (Rows + Columns)",
                    "Grid Areas: Drawing your layout map",
                    "CSS Variables: Giving names to your colors (e.g., --brand-color)",
                    "Responsive Design: Media Queries (Adapting to phones)",
                    "The border-box fix: Making sure your box doesn't grow when you add padding"
                ],
                practicals: [
                    "The Dashboard Layout: Build a 3-column dashboard in 5 minutes using CSS Grid",
                    "Theme Master: Change your entire site's color by updating only one CSS Variable",
                    "Project: 'The Universal Portfolio' - A single page that looks great on iPhone, iPad, and Desktop"
                ],
                games: [
                    { title: "Grid Garden", url: "https://cssgridgarden.com/", description: "Learn CSS Grid by watering your carrot garden. A perfect companion to Flexbox Froggy." }
                ]
            },
            {
                phase: 8,
                title: "Motion & Depth: The Modern Web",
                theory: [
                    "Gradients: Linear, Radial, and Glassmorphism",
                    "2D & 3D Transforms: Rotating and Scaling your boxes",
                    "Keyframe Animations: Making things move on their own",
                    "The Critical Rendering Path: How CSS affects speed",
                    "Advanced Layout: CSS Columns and Aspect-ratio"
                ],
                practicals: [
                    "The Rotating Spinner: Build a loading icon from scratch using @keyframes",
                    "Glassmorphism Card: Design a credit card that looks like frosted glass",
                    "Project: 'The Animated Portfolio' - A cinematic entry for your personal site"
                ]
            },
            {
                phase: 9,
                title: "Efficiency: SASS (The CSS Powerhouse)",
                theory: [
                    "What is SASS? (CSS with Superpowers)",
                    "Variables & Nesting in SASS",
                    "Mixins & Partials: Reusing your styles like a pro",
                    "The Modular approach: Organizing 1000s of lines of CSS"
                ],
                practicals: [
                    "The SASS Refactor: Take your CSS and compress it using Nesting",
                    "Style Library: Create a folder of 'Partials' for Buttons, Cards, and Typography",
                    "Project: 'The Design System' - A scalable structure for long-term projects"
                ]
            }
        ]
    },
};

export const BOOTSTRAP_CURRICULUM = {
    "bootstrap": {
        fileName: "bootstrap",
        description: "Bootstrap 5 Extreme Mastery",
        category: "Bootstrap",
        subDescription: "Master the world's most popular framework. From rapid prototyping to customizing SASS variables and utility APIs.",
        phases: [
            {
                phase: 1,
                title: "Bootstrap Basics & Grid",
                theory: [
                    "Bootstrap 5 Get Started (CDN vs NPM)",
                    "Bootstrap Containers (Fixed, Fluid, Breakpoints)",
                    "The Grid System (Rows, Columns, Sizes, Reordering, Offsetting)"
                ],
                practicals: [
                    "Setup a Bootstrap 5 project via NPM to understand file structure",
                    "Build a responsive layout using Rows, Columns, and Auto-layout",
                    "Project: Wireframe Prototype - Rapidly structured using Containers and Grid Offsets"
                ]
            },
            {
                phase: 2,
                title: "Typography, Colors & Content",
                theory: [
                    "Bootstrap Typography (Headings, Display, Lead, Lists)",
                    "Bootstrap Colors (Text, Background, Opacity)",
                    "Bootstrap Tables (Striped, Bordered, Hover, Responsive)",
                    "Bootstrap Images (Fluid, Thumbnail, Figures)"
                ],
                practicals: [
                    "Design an article page using Display Headings and Lead text",
                    "Create a Data Dashboard using Striped and Responsive Tables",
                    "Project: Corporate Report - Professional layout with Figures and Contextual Colors"
                ]
            },
            {
                phase: 3,
                title: "Core Components: Controls",
                theory: [
                    "Alerts & Dismissible Alerts",
                    "Buttons, Button Groups & Toolbar",
                    "Badges & Pills",
                    "Progress Bars (Striped, Animated)",
                    "Spinners (Border, Grow)"
                ],
                practicals: [
                    "Build a 'Status Dashboard' integrating Alerts, Badges, and Spinners",
                    "Create a custom Button Toolbar with grouped actions",
                    "Project: Admin Controls Panel - Utilizing Progress Bars and Button variations"
                ]
            },
            {
                phase: 4,
                title: "Navigation & Structure",
                theory: [
                    "Navs & Tabs (Pills, Vertical)",
                    "Navbar (Brand, Links, Forms, Text, Toggler, Offcanvas integration)",
                    "Pagination & Breadcrumbs"
                ],
                practicals: [
                    "Build a 'Mega Menu' Navbar with Brand, Links, and Toggler",
                    "Create a Tabbed Interface for switching content panes",
                    "Project: E-Commerce Header - Complete suite with Breadcrumbs and Search Form"
                ]
            },
            {
                phase: 5,
                title: "Rich Content Components",
                theory: [
                    "Bootstrap Cards (Body, Titles, Images, Overlays, Grid within Cards)",
                    "List Groups (Active, Disabled, Links, Buttons, Flushing)",
                    "Carousel (Slides, Controls, Indicators, Caption)",
                    "Collapse & Accordion"
                ],
                practicals: [
                    "Design a 'Pricing Tier' section using Card Headers, Bodies, and Footers",
                    "Build an FAQ section using the Accordion component",
                    "Project: Product Showcase - Combining Carousel for images and List Groups for specs"
                ]
            },
            {
                phase: 6,
                title: "Overlays & Interaction",
                theory: [
                    "Modals (Sizes, Fullscreen, Backdrop)",
                    "Tooltips & Popovers",
                    "Toasts (Notifications)",
                    "Offcanvas (Sidebars)",
                    "Scrollspy"
                ],
                practicals: [
                    "Create a 'Login' Modal with backdrop and keyboard interactions",
                    "Implement a Toast Notification system for user feedback",
                    "Project: Mobile App Layout - Using Offcanvas for a slide-out Navigation Drawer"
                ]
            },
            {
                phase: 7,
                title: "Utilities, Flexbox & Forms",
                theory: [
                    "Bootstrap Utilities (Borders, Clearfix, Close Icon, Display, Float, Position)",
                    "Bootstrap Flex Behaviors (Direction, Justify, Align, Order)",
                    "Bootstrap Forms (FormControl, Select, Checks, Radios, Range, Input Group, Floating Labels, Validation)"
                ],
                practicals: [
                    "Refactor custom layouts using only Bootstrap Flex and Spacing utilities",
                    "Build a validated 'Checkout Form' with Floating Labels and Input Groups",
                    "Project: High-Fidelity App Interface - Constructed purely with Utility Classes"
                ]
            }
        ]
    }
};
