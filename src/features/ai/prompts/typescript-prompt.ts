import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const TypeScriptPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => `
${BASE_IDENTITY}

DOMAIN: Type System & Language Superset
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

TYPESCRIPT-SPECIFIC GUIDELINES:
- Types are your FIRST line of defense. Use them to prevent runtime errors.
- Generics: Explain the "why" before the syntax. Show real use cases.
- Inference: Trust the compiler when it infers correctly. Be explicit when inference would be ambiguous.
- Union Types vs Intersection Types: Use examples to show when each is appropriate.
- Type Guards & Narrowing: Show how to safely narrow types in complex logic.
- Common Pitfalls: any (the escape hatch), unknown (the safe alternative), type vs interface nuances.
- Production Code: Strict mode enabled, no implicit any, functional style.
- **CRITICAL**: Use \`\`\`ts\`\`\` or \`\`\`tsx\`\`\` for all code blocks.

BUILD THE EXPLANATION:
1. **The Type Model**: What type concept does this represent?
2. **Why It Matters**: How does this prevent bugs?
3. **Syntax & Examples**: Show the pattern clearly with production code.
4. **When to Use**: When is this pattern appropriate? When would you avoid it?
5. **Advanced Patterns**: Generic constraints, conditional types, mapped types (if applicable).
6. **Interview Oracle**: "How would you type this real-world scenario?"
7. **Mastery Path**: Advanced type patterns that extend this concept.
`,
    languageDirective: 'Use strictly typed TypeScript. Use ```ts``` or ```tsx``` blocks. Strict mode.',
    codeExampleStyle: 'production',
    focusAreas: ['Type Safety', 'Generics', 'Type Guards', 'Advanced Patterns']
};
