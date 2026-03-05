export const CSS_CURRICULUM = {
    "css": {
        fileName: "css",
        description: "Ultimate CSS Extreme Mastery",
        category: "CSS",
        subDescription: "The absolute definitive CSS encyclopedia. Structurally aligned with W3Schools for a linear learning path, reinforced with professional architectural methodologies (BEM, CUBE).",
        phases: [
            {
                phase: 1,
                title: "CSS Basics & Syntax",
                theory: [
                    "CSS Introduction, Syntax & Selectors",
                    "How To Add CSS (External, Internal, Inline)",
                    "CSS Comments & Colors (RGB, HEX, HSL)",
                    "CSS Backgrounds (Color, Image, Repeat, Attachment)",
                    "CSS Borders (Style, Width, Color, Radius)"
                ],
                practicals: [
                    "Setup a project with External CSS to differentiate from Inline and Internal methods",
                    "Design a 'Hero Section' applying specific Background properties and Border styles",
                    "Project: Color Theory Card - Exploring HSL transparency and RGBa Colors in a layout"
                ]
            },
            {
                phase: 2,
                title: "The Box Model & Spacing",
                theory: [
                    "CSS Margins (Collapse logic, auto)",
                    "CSS Padding",
                    "CSS Height, Width & Max-width",
                    "The CSS Box Model (Content, Padding, Border, Margin)",
                    "CSS Outline (Offset, Style)"
                ],
                practicals: [
                    "Build a 'Card Component' demonstrating strict Box Model layers (Padding vs Margin)",
                    "Create a centered container using margin: auto and Max-width constraints",
                    "Project: Spacing System - Creating a utility sheet for standardized Margins and Paddings"
                ],
                games: [
                    {
                        title: "CSS Diner",
                        url: "https://flukeout.github.io/",
                        description: "A fun game to learn and practice CSS selectors."
                    },
                    {
                        title: "Selector Showdown",
                        url: "https://selectorshowdown.com/",
                        description: "Test your CSS selector skills against the clock."
                    }
                ]
            },
            {
                phase: 3,
                title: "Text & Typography",
                theory: [
                    "CSS Text (Alignment, Decoration, Transformation, Spacing, Shadow)",
                    "CSS Fonts (Family, Web Safe, Google Fonts, Size, Weight)",
                    "CSS Icons (FontAwesome, Bootstrap Icons)",
                    "CSS Links (States: link, visited, hover, active)"
                ],
                practicals: [
                    "Design a Typography Article demonstrating Font families, Weights, and Line-heights",
                    "Create a stylized 'Button' utilizing all 4 Link States (hover, active, etc.)",
                    "Project: Blog Post Template - Focusing on vertical rhythm using Text Spacing properties"
                ]
            },
            {
                phase: 4,
                title: "Layout Primitives",
                theory: [
                    "CSS Lists (Markers, Images)",
                    "CSS Tables (Borders, Stripes, Hover, Responsive)",
                    "CSS Display (Block, Inline, None)",
                    "CSS Position (Static, Relative, Fixed, Absolute, Sticky)",
                    "CSS Z-index & Overflow",
                    "CSS Float & Clear (Legacy Layouts)",
                    "CSS Inline-block & Align"
                ],
                practicals: [
                    "Build a Sticky Navigation Bar using Position: Sticky and Z-Index",
                    "Create a 'Pricing Table' applying Table-specific borders and Hover effects",
                    "Project: Magazine Layout - Implementing Floats and Position: Absolute for complex alignment"
                ],
                games: [
                    {
                        title: "CSS Speedrun",
                        url: "https://css-speedrun.netlify.app/",
                        description: "Test your CSS knowledge with small, rapid-fire challenges."
                    }
                ]
            },
            {
                phase: 5,
                title: "Selectors & Components",
                theory: [
                    "CSS Combinators (Descendant, Child, Adjacent, General)",
                    "CSS Pseudo-classes (:hover, :nth-child, etc.)",
                    "CSS Pseudo-elements (::before, ::after)",
                    "CSS Opacity",
                    "Navigation Bars & Dropdowns",
                    "Image Gallery & Sprites",
                    "Attribute Selectors",
                    "CSS Forms & Counters"
                ],
                practicals: [
                    "Build a Dropdown Menu using Component Combinators (>) and Pseudo-classes (:hover)",
                    "Create an Image Gallery utilizing Pseudo-elements (::after) for overlay effects",
                    "Project: Custom Form Controls - Styling Checkboxes/Radios with Attribute Selectors"
                ]
            },
            {
                phase: 6,
                title: "CSS Advanced: Visuals",
                theory: [
                    "CSS Rounded Corners",
                    "CSS Border Images",
                    "CSS Gradients (Linear, Radial, Conic)",
                    "CSS Shadows (Box-shadow, Text-shadow)",
                    "CSS Text Effects & Web Fonts",
                    "CSS 2D & 3D Transforms",
                    "CSS Transitions",
                    "CSS Animations (@keyframes)"
                ],
                practicals: [
                    "Design 'Glassmorphism' cards using Background Gradients and Backdrop-filter",
                    "Create a Loading Spinner using @keyframes Animation and Rotation transforms",
                    "Project: 3D Product Card - Interactive depth using 3D Transforms and Transitions"
                ]
            },
            {
                phase: 7,
                title: "CSS Advanced: Layout & UI",
                theory: [
                    "CSS Flexbox Layout (Flex Container, Items, Axes)",
                    "CSS Grid Layout (Grid Template, Areas, Gap)",
                    "CSS Tooltips",
                    "CSS Image Styling (Filters, Reflection, Object-fit, Masking)",
                    "CSS Buttons & Pagination",
                    "CSS Multiple Columns",
                    "CSS User Interface (Resize, Outline-offset)",
                    "CSS Variables (Custom Properties)",
                    "CSS Box Sizing (border-box)",
                    "CSS Media Queries (Breakpoints)"
                ],
                practicals: [
                    "Build a Theme Switcher architecture using CSS Variables",
                    "Create a Masonry-like layout using CSS Grid",
                    "Project: Responsive Image Suite - Mastering Object-fit and Aspect-ratio"
                ],
                games: [
                    { title: "Flexbox Froggy", url: "https://flexboxfroggy.com/", description: "Master CSS Flexbox layout by positioning frogs." },
                    { title: "Grid Garden", url: "https://cssgridgarden.com/", description: "Learn CSS Grid by watering your carrot garden." }
                ]
            },
            {
                phase: 10,
                title: "CSS Responsive Design",
                theory: [
                    "RWD Viewport & Grid View",
                    "RWD Media Queries (Mobile First vs Desktop First)",
                    "RWD Images & Videos",
                    "RWD Frameworks theory"
                ],
                practicals: [
                    "Refactor a desktop site to Mobile-First using min-width Media Queries",
                    "Implement a responsive video component that scales with the Viewport",
                    "Project: The 'Any-Device' Landing Page - A fully fluid layout across 3 major breakpoints"
                ]
            },
            {
                phase: 11,
                title: "CSS SASS (Preprocessor)",
                theory: [
                    "SASS Introduction & Installation",
                    "SASS Variables & Nesting",
                    "SASS @import & @partials",
                    "SASS Mixins & @extend",
                    "SASS Functions & Inheritance"
                ],
                practicals: [
                    "Refactor raw CSS into modular SCSS using Nesting and Partials",
                    "Create a Mixin library to automate common vendor prefixes and layouts",
                    "Project: Scalable Design System - Built with SASS Variables and Inheritance features"
                ]
            }
        ]
    }
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
