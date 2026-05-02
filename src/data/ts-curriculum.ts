import { CurriculumData } from '@/types';

export const TYPESCRIPT_CURRICULUM: Record<string, CurriculumData> = {
    "typescript": {
        id: "typescript",
        fileName: "typescript",
        description: "The Strict Blueprint (TypeScript Mastery)",
        category: "TypeScript",
        subDescription: "Master the TypeScript 'Strict Foreman'. From basic material labeling to advanced universal tools and enterprise-grade integrations.",
        phases: [
            {
                phase: 1,
                title: "The Strict Foreman: TSC & Config",
                theory: [
                    "What is TypeScript? (JavaScript with a Foreman)",
                    "TSC: The Inspector who checks your blueprint",
                    "tsconfig.json: The Site Rules (strict, noImplicitAny)",
                    "Compiling: Turning the blueprint into a real building (JS)"
                ],
                practicals: [
                    "Install the Inspector (TS) on your machine",
                    "Set the 'Strict Rules' in a tsconfig.json"
                ]
            },
            {
                phase: 2,
                title: "Labeling the Materials: Basic Types",
                theory: [
                    "Primitive Labels: string, number, boolean",
                    "Type Inference: When the Inspector guesses the material correctly",
                    "The 'Any' Hazard: Why you shouldn't label everything as 'Mystery Box'",
                    "Arrays & Tuples: Organizing your material stacks"
                ],
                practicals: [
                    "Label 5 different variables accurately",
                    "Fix a 'Mystery Box' (any) error by using a specific label"
                ]
            },
            {
                phase: 3,
                title: "Building Contracts: Interfaces & Objects",
                theory: [
                    "Objects: Modeling a Building Wing",
                    "Interfaces: The Legal Contract for a specific station",
                    "Optional Properties: Materials we *might* need (? symbol)",
                    "Readonly: Materials that cannot be moved once placed"
                ],
                practicals: [
                    "Write a 'Chef Contract' (Interface) for a kitchen",
                    "Create an object that follows a strict contract"
                ]
            },
            {
                phase: 4,
                title: "Standard Units: Enums & Type Aliases",
                theory: [
                    "Enums: Fixed measurement units (Sm, Md, Lg)",
                    "Type Aliases: Giving a nickname to a complex material",
                    "Unions (|): Materials that can be either Wood OR Steel",
                    "Literal Types: When only *one* specific value is allowed"
                ],
                practicals: [
                    "Create a 'Shirt Size' Enum",
                    "Build a 'User ID' alias that can be string or number"
                ]
            },
            {
                phase: 5,
                title: "Adjustable Wrenches: Generics",
                theory: [
                    "What are Generics? (Tools that fit any material)",
                    "Generic Functions: The reusable wrench",
                    "Generic Interfaces: Blueprints for any material type",
                    "Constraints (extends): Ensuring the tool only works on valid materials"
                ],
                practicals: [
                    "Build a 'Storage Box' (Generic Class) that holds any material",
                    "Create a function that calculates weight for any material type"
                ]
            },
            {
                phase: 6,
                title: "Blueprint Modifiers: Utility Types",
                theory: [
                    "Partial: Making a required contract optional for a moment",
                    "Pick & Omit: Cutting out specific sections of a blueprint",
                    "Readonly: Lamination for your material lists",
                    "Record: Creating a map of organized storage bins"
                ],
                practicals: [
                    "Use 'Omit' to remove a 'Secret' field from a User blueprint",
                    "Create a 'ReadOnly' inventory list that cannot be edited"
                ]
            },
            {
                phase: 7,
                title: "The Site Guards: Type Guards & Unions",
                theory: [
                    "Typeof & Instanceof: Checking the ID of a material at the gate",
                    "User-Defined Guards: Building your own security scanner",
                    "Discriminated Unions: Using 'Material Tags' to tell Wood from Steel apart",
                    "Exhaustiveness Checking: Ensuring every material has been inspected"
                ],
                practicals: [
                    "Write a security scanner (Type Guard) that identifies if a material is 'Flammable'",
                    "Implement a switch case that handles all 'Material Tags' (Unions)"
                ]
            },
            {
                phase: 8,
                title: "The Smart Kitchen: React + TS",
                theory: [
                    "Typing Components: Blueprints for Kitchen Stations",
                    "Typing Props: The Order Slip contract",
                    "Hooks with TS: Training your kitchen tools (useState, useEffect)",
                    "Event Types: Handling Guest Inputs safely"
                ],
                practicals: [
                    "Convert a 'Manual Station' (Component) into a 'Smart Station' (TS)",
                    "Build a typed Form that catches 'Wrong Ingredient' errors"
                ]
            },
            {
                phase: 9,
                title: "The Secure Warehouse: Node.js + TS",
                theory: [
                    "Express with TS: The Secure Intake Valve",
                    "Request/Response Typing: Verifying what enters and leaves the warehouse",
                    "Middleware Typing: The internal inspection checkpoints",
                    "Validation (Zod/Yup): Automatic blueprint verification at the door"
                ],
                practicals: [
                    "Set up an Express server with 'Strict Entry Rules'",
                    "Write a middleware that verifies 'Employee ID' (Typed Request)"
                ]
            },
            {
                phase: 10,
                title: "Cataloged Inventory: Mongoose + TS",
                theory: [
                    "Models vs Interfaces: The Map vs the Actual Goods",
                    "Schema Validation: Ensuring the database follows the blueprint",
                    "Populate & Aggregate: Organizing the warehouse records",
                    "Lean Queries: Fast-tracking the inventory count"
                ],
                practicals: [
                    "Create a typed Mongoose Schema for 'Building Materials'",
                    "Perform a type-safe aggregation of inventory costs"
                ]
            }
        ]
    },
    "typescript-questions": {
        id: "typescript-questions",
        fileName: "typescript-questions",
        description: "TypeScript Question Bank",
        category: "TypeScript",
        subDescription: "Master 40+ TypeScript interview questions using the Construction Blueprint analogy.",
        phases: [
            {
                phase: 1,
                title: "The Site Inspection: Fundamentals",
                theory: [
                    "Why use TypeScript? (The Blueprint argument)",
                    "Interface vs Type: Which contract is more flexible?",
                    "The 'Any' Hazard: Why the Foreman hates Mystery Boxes",
                    "Enums vs Unions: Choosing the right measurement standard"
                ],
                practicals: [
                    "Explain the difference between 'Unknown' and 'Any' using a security guard metaphor",
                    "Map 5 TS terms to 5 Construction Site items"
                ]
            },
            {
                phase: 2,
                title: "The Master Builder: Advanced Types",
                theory: [
                    "Generics: Explaining the Adjustable Wrench",
                    "Utility Types: How to quickly modify a contract",
                    "Type Guards: How to verify a material before using it",
                    "Infer keyword: How the Inspector reads between the lines"
                ],
                practicals: [
                    "Explain 'Covariance' using a box of building materials metaphor",
                    "Explain 'Discriminated Unions' using color-coded ID tags"
                ]
            }
        ]
    }
};
