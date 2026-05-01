import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const WebFundamentalsPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **CONCEPT DEMO (ASCII)**: Visual structure of the request/response or workflow.
2. **IMPLEMENTATION**: Provide **FULL CODE** (HTML/JS/HTTP-spec) for the demo.
3. **PRODUCTION GOAL**: Focus on a working, secure implementation.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Foundation Web Concepts
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

WEB-FUNDAMENTALS-SPECIFIC GUIDELINES:
- HTTP: Request-response model, status codes, headers.
- Cookies & Sessions: When to use each. Security implications.
- CORS: Cross-Origin Resource Sharing. Why it exists.
- Web Performance: Metrics, optimization techniques.
- Accessibility: WCAG standards, inclusive design.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Mechanism Map**: Visual breakdown of the web concept in action.
2. **Implementation**: High-fidelity code/config blocks.
3. **Key takeaways**: What global web standard was demonstrated?
` : `
1. **The Web Concept**: What fundamental web concept is this?
2. **Why It Matters**: Security, performance, accessibility implications.
3. **How It Works**: Technical details, browser behavior.
4. **Best Practices**: Modern approach, security hardening.
5. **Real-World Scenarios**: When and how you'd encounter this.
`}
`;
    },
    languageDirective: 'Use HTTP syntax, browser developer tools, clear examples.',
    codeExampleStyle: 'educational',
    focusAreas: ['HTTP Protocol', 'CORS', 'Security', 'Performance', 'Accessibility']
};
