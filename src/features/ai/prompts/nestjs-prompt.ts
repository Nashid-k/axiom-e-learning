import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const NestJSPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **ARCHITECTURE (ASCII)**: Show the Module/Controller/Service hierarchy.
2. **BOOTSTRAP**: Provide the main.ts and module setup files.
3. **IMPLEMENTATION**: Provide **FULL CODE** with Dependency Injection. No placeholders.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Node.js Framework (Backend)
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

NESTJS-SPECIFIC GUIDELINES:
- Architecture: Controllers, Services, Modules. Dependency Injection at the core.
- Decorators: Heavy use of TypeScript decorators. Understand their purpose.
- Middleware & Guards: Execution order, when to use each.
- ORM Integration: TypeORM, Prisma. Database interaction patterns.
- Testing: Unit tests (mocking providers), integration tests (test database).

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Module Architecture**: Visual map of the NestJS module tree.
2. **Implementation**: High-fidelity, production-ready code blocks.
3. **Dependency Graph**: Explain how the DI container handles this project.
4. **Validation**: How to test this implementation.
` : `
1. **The NestJS Pattern**: What architectural pattern is this?
2. **Dependency Injection**: How does NestJS manage dependencies here?
3. **Production Code**: Real example following NestJS best practices.
4. **Performance**: Database queries, caching, optimization.
5. **Common Pitfalls**: Circular dependencies, improper scoping.
`}
`;
    },
    languageDirective: 'Use TypeScript strictly. Functional approach with dependency injection.',
    codeExampleStyle: 'production',
    focusAreas: ['Dependency Injection', 'Decorators', 'Modules', 'ORM Patterns']
};
