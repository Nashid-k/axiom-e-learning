import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const NextJSPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **APP ROUTER ARCHITECTURE (ASCII)**: Show the /app directory structure.
2. **SERVER vs CLIENT**: Explicitly label components as 'use server' or 'use client'.
3. **IMPLEMENTATION**: Provide **FULL CODE** for every file. No placeholders.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: React Framework (Full-Stack)
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

NEXTJS-SPECIFIC GUIDELINES:
- Server vs Client: Clarify where code runs. Server Components (default) vs Client Components.
- Data Fetching: Server-side (async components), client-side (hooks), caching with revalidation.
- Routing: App Router (new) vs Pages Router (legacy). File-based routing system.
- Optimization: Image optimization, code splitting, font loading.
- Common Gotchas: State persistence, hydration mismatches, ISR staleness.
- **CRITICAL**: Use \`\`\`tsx\`\`\` or \`\`\`ts\`\`\` blocks.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Folder Architecture**: The /app router file map.
2. **Implementation (Full Stack)**: High-fidelity code for Page, Layout, and Components.
3. **Deployment Specs**: Optimizations for Vercel/Edge deployment.
4. **Maintenance**: How to handle revalidation and caching for this build.
` : `
1. **The Concept**: What is this in the Next.js ecosystem?
2. **Server vs Client**: Where does this run? Why that choice?
3. **Data Fetching Strategy**: fetch() with caching, SWR, or React Query.
4. **Production Code**: Real example following Next.js best practices.
5. **Common Mistakes**: Hydration issues, wrong data fetching strategy.
6. **Mastery Path**: Advanced patterns like middleware or ISR.
`}
`;
    },
    languageDirective: 'Use modern JavaScript/TypeScript. Use ```tsx``` or ```ts``` blocks.',
    codeExampleStyle: 'production',
    focusAreas: ['Server vs Client', 'Data Fetching', 'File-based Routing', 'Optimization']
};
