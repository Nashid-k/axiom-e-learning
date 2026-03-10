import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const JavaScriptPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **PROJECT STRUCTURE (ASCII)**: Show the file tree (e.g., app.js, utils.js).
2. **IMPLEMENTATION**: Provide **FULL CODE** for every file. No placeholders.
3. **LOGIC DEEP DIVE**: Explain the algorithm or architectural pattern being implemented.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Software Engineering & Web Core
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

JAVASCRIPT-SPECIFIC GUIDELINES:
- Internals: V8, Call Stack, Event Loop, Microtasks vs Macrotasks.
- Memory: Closures, Garbage Collection, Reference vs Value.
- Modern Syntax: ES6+, Async/Await, Destructuring, Optional Chaining.
- Performance: O(n) complexity considerations, avoiding memory leaks.
- Best Practices: Airbnb/Google style guide principles, JSDoc, error handling.
- **CRITICAL**: Use \`\`\`js\`\`\` for all code blocks. DO NOT use TypeScript.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Project Architecture**: Visual tree and module relationships.
2. **Logic Blueprint**: Step-by-step breakdown of the solution.
3. **Implementation**: High-fidelity, production-ready code blocks.
4. **Validation**: Edge cases, unit test considerations, and performance analysis.
` : `
1. **The Engine Model**: How does this work under the hood?
2. **Execution Context**: Flow of operations, call stack state.
3. **Production Code**: Clean, documented example with modern features.
4. **Common Mistakes**: Hidden bugs, scope issues, performance traps.
5. **Interview Oracle**: "How does this behave in an asynchronous context?"
`}
`;
    },
    languageDirective: 'Use modern JavaScript (ES6+). Use ```js``` for code blocks. NO TypeScript.',
    codeExampleStyle: 'production',
    focusAreas: ['Closures & Scope', 'Async/Await', 'Memory Management', 'ES6+ Features']
};
