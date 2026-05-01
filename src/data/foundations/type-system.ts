
export const TYPE_SYSTEM_FOUNDATION = {
    "type-system-foundation": {
        id: "type-system-foundation",
        fileName: "type-system",
        description: "Type System & Type Checking Fundamentals",
        category: "Foundation",
        type: "foundation-module",
        subDescription: "Understand JavaScript's dynamic type system, type coercion, and type checking mechanisms. Foundation for JavaScript, TypeScript, and safe programming practices.",
        estimatedHours: 5,
        difficulty: "Intermediate",
        phases: [
            {
                phase: 1,
                title: "JavaScript Primitive vs Reference Types",
                theory: [
                    "What are Data Types (Classification of values)",
                    "Primitive Types (String, Number, Boolean, Undefined, Null, Symbol, BigInt)",
                    "Reference Types (Object, Array, Function, Date, RegExp, etc.)",
                    "Characteristics of Primitives (Immutable, stored by value, fixed size)",
                    "Characteristics of Objects (Mutable, stored by reference, dynamic size)",
                    "Memory allocation (Stack for primitives, Heap for objects)",
                    "Type coercion (Implicit conversion)",
                    "Type conversion (Explicit conversion)",
                    "The typeof operator and its quirks",
                    "typeof null === 'object' (historical bug)"
                ],
                practicals: [
                    "Identify whether values are primitives or references",
                    "Demonstrate immutability of primitives vs mutability of objects",
                    "Show how primitive assignment copies value, object assignment copies reference",
                    "Use typeof to check different data types",
                    "Understand and predict type coercion behavior"
                ]
            },
            {
                phase: 2,
                title: "Type Coercion & Equality",
                theory: [
                    "Abstract Equality (== operator)",
                    "Strict Equality (=== operator)",
                    "Loose Equality Coercion Rules",
                    "When == converts types (String to Number, Boolean to Number, null == undefined)",
                    "Strict Equality (=== never coerces)",
                    "Object.is() (Comparison method)",
                    "Truthy and Falsy values",
                    "Falsy: false, 0, -0, 0n, '', null, undefined, NaN",
                    "Everything else is Truthy",
                    "Implicit coercion in if statements, logical operators",
                    "Type coercion with arithmetic operators",
                    "Type coercion with string concatenation"
                ],
                practicals: [
                    "Predict == vs === behavior for various comparisons",
                    "Understand why [] == false is true",
                    "Demonstrate truthy/falsy behavior in conditions",
                    "Identify implicit coercion in expressions",
                    "Solve type coercion puzzles",
                    "Write code that properly handles loose equality"
                ]
            },
            {
                phase: 3,
                title: "Type Checking Mechanisms",
                theory: [
                    "The typeof operator (limitations and quirks)",
                    "instanceof operator (checks prototype chain)",
                    "The in operator (checks property existence)",
                    "Object.prototype.toString.call() (precise type checking)",
                    "Array.isArray() (specialized check)",
                    "Number.isNaN() vs isNaN() (different behaviors)",
                    "Checking for undefined vs null",
                    "Checking for NaN (special cases)",
                    "Type guards and defensive programming",
                    "Creating custom type checking functions"
                ],
                practicals: [
                    "Write a robust type checker function",
                    "Use instanceof safely with inheritance",
                    "Understand why typeof is sometimes insufficient",
                    "Check for NaN correctly (Number.isNaN vs isNaN)",
                    "Distinguish between undefined and null in code",
                    "Create defensive checks for user input"
                ]
            },
            {
                phase: 4,
                title: "Special Values & Edge Cases",
                theory: [
                    "undefined (variable declared but not assigned)",
                    "null (intentional absence of value)",
                    "undefined vs null differences",
                    "NaN (Not a Number - special value)",
                    "Why NaN !== NaN (design quirk)",
                    "Infinity and -Infinity",
                    "BigInt for large integers",
                    "Symbol for unique identifiers",
                    "How to check for each special value",
                    "Type coercion with special values"
                ],
                practicals: [
                    "Demonstrate undefined vs null behavior",
                    "Handle NaN checking correctly",
                    "Work with BigInt for large numbers",
                    "Use Symbols for object property uniqueness",
                    "Predict type coercion with special values",
                    "Write robust checks for special values"
                ]
            },
            {
                phase: 5,
                title: "Objects as Dynamic Type Containers",
                theory: [
                    "Objects as collections of key-value pairs",
                    "Property descriptors (value, writable, enumerable, configurable)",
                    "Dynamic property assignment",
                    "Property deletion",
                    "Checking property existence (in, hasOwnProperty, Object.hasOwn)",
                    "Computed property names",
                    "Shorthand property syntax",
                    "Method syntax in objects",
                    "Objects don't have fixed structure (unlike typed languages)",
                    "Implications for type safety"
                ],
                practicals: [
                    "Create and modify objects dynamically",
                    "Check property existence correctly",
                    "Use property descriptors",
                    "Understand implications of dynamic typing",
                    "Create objects with computed properties",
                    "Write object manipulation code safely"
                ]
            }
        ],
        comparisonWithTypescript: {
            note: "TypeScript builds on this foundation with compile-time type checking",
            differences: [
                "TypeScript: Static types (compile-time)",
                "JavaScript: Dynamic types (runtime)",
                "TypeScript catches type errors before execution",
                "JavaScript catches type errors at runtime (if at all)"
            ]
        },
        commonMisunderstandings: [
            "typeof [] returns 'object', not 'array' (arrays are objects in JS)",
            "null is not 'nothing', it's 'intentional absence of value'",
            "undefined is what JavaScript assigns by default",
            "NaN is a number type, not a type itself",
            "Type coercion happens silently - == operator is unpredictable"
        ],
        relatedTopics: [
            "Variables & Scope",
            "Operators",
            "Functions & Return Types",
            "Objects & Prototypes",
            "TypeScript Type System"
        ],
        bestPractices: [
            "Always use === instead of == (avoid coercion confusion)",
            "Use explicit type conversion (String(), Number(), Boolean()) instead of relying on coercion",
            "Check for undefined and null explicitly",
            "Use typeof for primitives, instanceof for objects",
            "Use Object.hasOwn() instead of hasOwnProperty for property checks",
            "Use Number.isNaN() instead of isNaN()",
            "Be defensive with dynamic typing - validate user input"
        ]
    }
};
