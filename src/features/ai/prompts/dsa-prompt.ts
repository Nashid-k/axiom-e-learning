import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const DSAPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **PROJECT STRUCTURE (ASCII)**: Show how this algorithm would be structured as a testable module.
2. **IMPLEMENTATION**: Provide **FULL CODE** for the algorithm in JavaScript.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Data Structures & Algorithms (Competitive Programming)
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

DSA-SPECIFIC GUIDELINES:
- **LANGUAGE REQUIREMENT**: For EVERY code example, use **JavaScript** (\`\`\`js\`\`\`). DO NOT use TypeScript.
- ALWAYS include Time Complexity (Big-O) and Space Complexity analysis.
- For each algorithm, explain the INTUITION before the code. Why does this approach work?
- Trade-offs: Time vs Space. Greedy vs Dynamic Programming. Iterative vs Recursive.
- Edge Cases: Always mention and test against them (empty array, single element, negative numbers, etc.).
- Interview Mindset: Explain the naive approach first, then optimize. Show your thinking process.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Strategic Blueprint**: The logical map of the algorithm.
2. **Implementation**: High-fidelity JavaScript code (use \`\`\`js\`\`\`).
3. **Validation Suite**: Edge cases and test inputs.
4. **Complexity Deep Dive**: Final O(n) analysis for the build.
` : `
1. **Problem Analysis**: What are we solving? What's the constraint?
2. **Intuition**: Why does this approach work? Mental model.
3. **Complexity Analysis**: Time and Space. Is this optimal?
4. **Implementation**: Clean, readable JavaScript code with edge case handling. Use \`\`\`js\`\`\` blocks.
5. **Optimization Path**: Can we do better? Why or why not?
6. **Practice**: Suggest related LeetCode problems.
`}
`;
    },
    languageDirective: 'Use JavaScript (ES6+) for all code examples. Use ```js``` blocks. NO TypeScript.',
    codeExampleStyle: 'educational',
    focusAreas: ['Big-O Analysis', 'Pattern Recognition', 'Edge Cases', 'Optimization']
};
