export const CSS_CURRICULUM = {
    "css": {
        fileName: "css",
        description: "Modern CSS & Generative UI",
        category: "CSS",
        subDescription: "Master CSS for the AI era. From flexbox and grid basics to glassmorphism, animations, and collaborating with UI-generating LLMs (v0, Tailwind).",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Styling Mindset: Dressing the Skeleton",
                targetExperience: ["1yoe"],
                theory: [
                    "What is CSS? (The Designer of the Web)",
                    "The Syntax: 'Who' (Selector) + 'What' (Property) + 'How' (Value)",
                    "Classes vs. IDs: Group Uniforms vs. Unique Names",
                    "Understanding how AI models output CSS classes"
                ],
                practicals: [
                    "The Identity Crisis: Give multiple elements the same Class",
                    "Take an unstyled AI HTML output and add a basic CSS stylesheet to it"
                ]
            },
            {
                phase: 2,
                title: "The Physical World: Everything is a Box",
                targetExperience: ["1yoe"],
                theory: [
                    "The Physical Box Model: Content, Padding, Border, Margin",
                    "Padding vs Margin: Breathing room inside vs outside",
                    "Width & Max-width: Controlling the container's size",
                    "The auto trick: Centering your box"
                ],
                practicals: [
                    "The Wallpaper Wall: Creating a defined border",
                    "Project: 'The Centered Chat Card' - A clean, professional card perfectly centered"
                ]
            },
            {
                phase: 3,
                title: "Aesthetics: Colors, Fonts & Shadows",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "HEX & RGBa Colors (The professional way)",
                    "Typography: Importing Google Fonts (Inter, Roboto)",
                    "Text Shadows & Box Shadows: Adding depth and 'Pop'",
                    "CSS Transitions: Making changes feel smooth (Hover effects)",
                    "Modern UI Trends: Glassmorphism and Backdrop Filters"
                ],
                practicals: [
                    "Hover Magic: Create a send button that changes color when touched",
                    "Design an AI response card that looks like frosted glass (backdrop-filter)"
                ]
            },
            {
                phase: 4,
                title: "Alignment Magic: Flexbox",
                targetExperience: ["2yoe"],
                theory: [
                    "The Savior: Flexbox (The Professional Organizer)",
                    "The Big Three: justify-content, align-items, gap",
                    "Flex Direction: Switching from Rows to Columns",
                    "Building chat interfaces with flex-column and overflow-y"
                ],
                practicals: [
                    "The Centering Challenge: Center a 'Checkmark' perfectly",
                    "The Navigation Bar: Build a standard header",
                    "Project: 'The Chat Log' - A flex container where messages align left or right"
                ]
            },
            {
                phase: 5,
                title: "Precision & Power Ups: Grid & Variables",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "CSS Grid: The Ultimate Layout (Rows + Columns)",
                    "CSS Variables: Giving names to your colors (e.g., --brand-color)",
                    "Responsive Design: Media Queries (Adapting to phones)",
                    "Dark Mode: Using variables to easily switch themes"
                ],
                practicals: [
                    "The Dashboard Layout: Build a 3-column AI dashboard",
                    "Theme Master: Implement a Dark Mode toggle using CSS Variables"
                ]
            },
            {
                phase: 6,
                title: "Interaction: State & Pseudo-elements",
                targetExperience: ["3yoe"],
                theory: [
                    "User Feedback: :hover, :active, :focus",
                    "Pseudo-elements: ::before and ::after",
                    "Styling scrollbars (`::-webkit-scrollbar`) for premium chat UIs",
                    "CSS-only typing indicators"
                ],
                practicals: [
                    "Interactive List: Create a sidebar history list with hover states",
                    "Create a custom sleek scrollbar for your chat window"
                ]
            },
            {
                phase: 7,
                title: "Motion & Depth: Keyframes & Rendering",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "2D & 3D Transforms: Rotating and Scaling",
                    "Keyframe Animations: Making things move on their own",
                    "The Critical Rendering Path: Hardware acceleration (`transform: translateZ(0)`)",
                    "Animating height from 0 to auto (The age-old CSS trick)"
                ],
                practicals: [
                    "The Rotating Spinner: Build an 'AI is thinking' loading icon",
                    "Project: 'The Generative UI Reveal' - Animate a card expanding as the LLM generates it"
                ]
            },
            {
                phase: 8,
                title: "Architecture: Tailwind & Generative UIs",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Utility-First CSS: Why Tailwind is the standard for AI-generated code (v0, Cursor)",
                    "SASS vs Tailwind in the modern enterprise",
                    "Designing atomic design systems that an LLM can easily utilize",
                    "Container Queries: The evolution of responsive design"
                ],
                practicals: [
                    "Take a prompt and use an LLM to generate a complex Tailwind layout",
                    "Refactor raw CSS into a reusable Design System"
                ]
            }
        ]
    }
};
