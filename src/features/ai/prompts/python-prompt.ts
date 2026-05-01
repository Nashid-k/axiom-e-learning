import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const PythonPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **PROJECT STRUCTURE (ASCII)**: Visual file tree (e.g., main.py, requirements.txt).
2. **ENVIRONMENT**: Specific libraries (built-in or pip).
3. **IMPLEMENTATION**: Provide **FULL CODE** with type hints. No placeholders.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: General-Purpose Programming Language (Backend, Data)
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

PYTHON-SPECIFIC GUIDELINES:
- Philosophy: "Explicit is better than implicit." Readability counts.
- Data Types: Tuples, lists, dicts, sets. Know complexities.
- Decorators & Context Managers: Powerful meta-programming tools.
- Type Hints: Use them. Follow PEP 8 strictly.
- AsyncIO: Understanding the async event loop in Python.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Architectural Blueprint**: High-level map of the script/module.
2. **Implementation**: High-fidelity, PEP 8 compliant code blocks.
3. **Logic Deep Dive**: Break down the Pythonic mechanisms used.
4. **Performance Oracle**: O(n) analysis and scalability tips.
` : `
1. **The Python Concept**: What is this in the Python ecosystem?
2. **Pythonic Style**: How Python developers prefer to solve this.
3. **Production Code**: Real example with type hints and error handling.
4. **Common Pitfalls**: What Python developers get wrong.
5. **Mastery Path**: Advanced concepts that build on this.
`}
`;
    },
    languageDirective: 'Use Python 3.9+ with type hints. Follow PEP 8.',
    codeExampleStyle: 'production',
    focusAreas: ['Pythonic Style', 'Data Structures', 'Decorators', 'Type Hints']
};
