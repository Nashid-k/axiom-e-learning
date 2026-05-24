import { CurriculumData } from '@/types';

export const TYPESCRIPT_CURRICULUM: Record<string, CurriculumData> = {
    "typescript": {
        id: "typescript",
        fileName: "typescript",
        description: "The Strict AI Blueprint (TypeScript Mastery)",
        category: "TypeScript",
        subDescription: "Master TypeScript for modern AI apps. From basic type safety to forcing LLMs into strictly typed JSON structures using Zod.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Strict Foreman: TSC & Config",
                targetExperience: ["1yoe"],
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
                targetExperience: ["1yoe"],
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
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Objects: Modeling a Building Wing",
                    "Interfaces: The Legal Contract for a specific station",
                    "Optional Properties: Materials we *might* need (? symbol)",
                    "Readonly: Materials that cannot be moved once placed"
                ],
                practicals: [
                    "Write an 'LLM Response Contract' (Interface) for a JSON output",
                    "Create an object that follows a strict contract"
                ]
            },
            {
                phase: 4,
                title: "Standard Units: Enums & Type Aliases",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Enums: Fixed measurement units (Sm, Md, Lg)",
                    "Type Aliases: Giving a nickname to a complex material",
                    "Unions (|): Materials that can be either Wood OR Steel",
                    "Literal Types: When only *one* specific value is allowed"
                ],
                practicals: [
                    "Create a 'Model Size' Enum (e.g., Llama7B, GPT4)",
                    "Build a 'User ID' alias that can be string or number"
                ]
            },
            {
                phase: 5,
                title: "Adjustable Wrenches: Generics",
                targetExperience: ["2yoe"],
                theory: [
                    "What are Generics? (Tools that fit any material)",
                    "Generic Functions: The reusable wrench",
                    "Generic Interfaces: Blueprints for any material type",
                    "Constraints (extends): Ensuring the tool only works on valid materials"
                ],
                practicals: [
                    "Build a 'Response Wrapper' (Generic Interface) that holds any type of AI payload",
                    "Create a function that calculates weight for any material type"
                ]
            },
            {
                phase: 6,
                title: "Blueprint Modifiers: Utility Types",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Partial: Making a required contract optional for a moment",
                    "Pick & Omit: Cutting out specific sections of a blueprint",
                    "Readonly: Lamination for your material lists",
                    "Record: Creating a map of organized storage bins"
                ],
                practicals: [
                    "Use 'Omit' to remove a 'Secret' field from a User blueprint",
                    "Create a 'ReadOnly' prompt template that cannot be edited"
                ]
            },
            {
                phase: 7,
                title: "The Site Guards: Type Guards & Unions",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Typeof & Instanceof: Checking the ID of a material at the gate",
                    "User-Defined Guards: Building your own security scanner",
                    "Discriminated Unions: Using 'Tags' to tell success from failure apart",
                    "Exhaustiveness Checking: Ensuring every LLM response scenario is handled"
                ],
                practicals: [
                    "Write a security scanner (Type Guard) that checks if an API response is an Error",
                    "Implement a switch case that handles all 'Response Tags' (Unions)"
                ]
            },
            {
                phase: 8,
                title: "The Smart AI UI: React + TS",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Typing Components: Blueprints for Chat Interfaces",
                    "Typing Props: The Component contract",
                    "Hooks with TS: Training your state (useState, useEffect)",
                    "Event Types: Handling Guest Inputs safely in a chat box"
                ],
                practicals: [
                    "Convert a 'Vanilla Component' into a 'Smart Typed Component'",
                    "Build a typed Form that catches 'Empty Prompt' errors"
                ]
            },
            {
                phase: 9,
                title: "The Secure AI Backend: Node.js + TS",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Express/Fastify with TS: The Secure Intake Valve",
                    "Request/Response Typing: Verifying what enters and leaves the API",
                    "Middleware Typing: The internal inspection checkpoints",
                    "AI SDKs: Using typed SDKs (OpenAI, Anthropic) in backend services"
                ],
                practicals: [
                    "Set up a Node server with strict entry rules for LLM prompts",
                    "Write a middleware that verifies 'Employee ID' (Typed Request)"
                ]
            },
            {
                phase: 10,
                title: "Strict AI Outputs: Zod & Structured JSON",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "The Hallucination Problem: Why we can't trust LLM outputs",
                    "Zod: Creating bulletproof schemas for runtime validation",
                    "Structured Outputs: Passing Zod schemas to OpenAI to force correct JSON",
                    "Inferring TS Types: Generating Typescript interfaces directly from Zod schemas"
                ],
                practicals: [
                    "Create a Zod schema for an 'E-Commerce Product Extraction' task",
                    "Pass the schema to the Vercel AI SDK `generateObject` function",
                    "Infer the TypeScript type from the Zod schema to use in your React UI"
                ]
            }
        ]
    },
    "typescript-questions": {
        id: "typescript-questions",
        fileName: "typescript-questions",
        description: "TypeScript & AI Interview Bank",
        category: "TypeScript",
        subDescription: "Master 40+ TypeScript interview questions including modern AI structured outputs.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Site Inspection: Fundamentals",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Why use TypeScript? (The Blueprint argument)",
                    "Interface vs Type: Which contract is more flexible?",
                    "The 'Any' Hazard: Why the Foreman hates Mystery Boxes",
                    "Enums vs Unions: Choosing the right measurement standard"
                ],
                practicals: [
                    "Explain the difference between 'Unknown' and 'Any'",
                    "Map 5 TS terms to 5 Construction Site items"
                ]
            },
            {
                phase: 2,
                title: "The Master AI Builder: Advanced Types & Zod",
                targetExperience: ["3yoe", "4yoe", "4+yoe"],
                theory: [
                    "Generics: Explaining the Adjustable Wrench",
                    "How does Zod differ from standard TypeScript interfaces?",
                    "Why is runtime validation (like Zod) necessary when working with LLMs?",
                    "Type Guards vs Zod parsers"
                ],
                practicals: [
                    "Explain 'Covariance' using a box of building materials metaphor",
                    "Design a generic wrapper type for an AI API response"
                ]
            }
        ]
    }
};
