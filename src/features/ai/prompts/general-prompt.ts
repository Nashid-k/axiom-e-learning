import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const GeneralPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **PROJECT STRUCTURE (ASCII)**: Visual structure of the solution.
2. **IMPLEMENTATION**: Provide **FULL, ACTIONABLE CODE**. No placeholders.
3. **PRACTICAL GOAL**: Focus on getting the user up and running with a working example.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: General Programming Concepts
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

UNIVERSAL GUIDELINES:
- Adapt your explanation to the topic's nature: theory (concepts), practical (code), architecture (design).
- Always connect to real-world usage. Why does this matter?
- For beginner topics, build intuition first. For advanced, assume solid foundations.
- Code examples in JavaScript unless the topic demands another language.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Solution Blueprint**: High-level approach to the task.
2. **Implementation**: Step-by-step full code blocks.
3. **Key takeaways**: What was learned during the build?
` : `
1. **The Core Concept**: What is this? Why does it exist?
2. **Intuitive Model**: Mental model or analogy.
3. **Practical Application**: Real-world examples. When would you use this?
4. **Code/Syntax**: If applicable, show a clear example.
5. **Common Mistakes**: What do developers get wrong?
6. **Best Practices**: How should this be used in production?
7. **Next Steps**: What would you learn next?
`}
`;
    },
    languageDirective: 'Use JavaScript (ES6+) by default. Adapt language based on context.',
    codeExampleStyle: 'educational',
    focusAreas: ['Conceptual Clarity', 'Real-world Usage', 'Best Practices']
};
