export const TYPE_SYSTEM_FOUNDATION = {
    "type-system-foundation": {
        id: "type-system-foundation",
        fileName: "type-system",
        description: "Advanced Type Systems (TypeScript)",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "From basic interfaces to extreme type gymnastics for type-safe AI function calling and data parsing.",
        estimatedHours: 6,
        difficulty: "Advanced",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Core Typing Concepts",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Structural Typing vs Nominal Typing",
                    "Interfaces vs Types",
                    "Enums (and why they are sometimes dangerous)",
                    "Type Inference & Type Assertions (as vs any vs unknown)"
                ],
                practicals: [
                    "Migrate a vanilla JS file to strict TypeScript",
                    "Replace usage of 'any' with 'unknown' and narrow the type safely"
                ]
            },
            {
                phase: 2,
                title: "Generics & Utility Types",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "Understanding Generics (Type Variables)",
                    "Generic Constraints (extends)",
                    "Utility Types: Partial, Pick, Omit, Record",
                    "Mapped Types (Iterating over keys)"
                ],
                practicals: [
                    "Create a generic API fetching function",
                    "Write a Mapped Type that makes all properties of an object readonly"
                ]
            },
            {
                phase: 3,
                title: "Conditional Types & Type Gymnastics",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "Conditional Types (T extends U ? X : Y)",
                    "The 'infer' keyword (Extracting types from within types)",
                    "Discriminated Unions for modeling complex state machines",
                    "Template Literal Types"
                ],
                practicals: [
                    "Write an 'UnwrapPromise' type using the infer keyword",
                    "Model a complex Redux/Zustand action state machine using Discriminated Unions"
                ]
            },
            {
                phase: 4,
                title: "Types for AI & JSON Schemas",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "Generating strict JSON Schemas from TypeScript interfaces for OpenAI Function Calling",
                    "Zod: Runtime validation bridging the gap with static types",
                    "Type-safe Prompt Engineering: Ensuring LLM outputs match structural types",
                    "Advanced validation patterns for hallucinated AI responses"
                ],
                practicals: [
                    "Define a Zod schema for an AI Agent output and infer the TS Type",
                    "Write a generic type-safe wrapper for an LLM parsing function"
                ]
            }
        ]
    }
};
