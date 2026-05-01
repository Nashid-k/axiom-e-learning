import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const SQLPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **SCHEMA DEFINITION**: Full DDL (CREATE TABLE) for the project.
2. **SEED DATA**: INSERT statements to populate the model.
3. **LOGIC**: The core SELECT/JOIN/UPDATE statements to solve the problem.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Relational Database
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

SQL-SPECIFIC GUIDELINES:
- Standard SQL syntax. Agnostic to specific databases (but note dialect differences if relevant).
- Schema Design: Normalization vs Denormalization. Foreign keys, constraints, indexes.
- Query Optimization: Explain the query plan, index strategies, join algorithms.
- Transactions: ACID properties, isolation levels, deadlock prevention.
- Performance: Analyze queries with EXPLAIN. When to add indexes.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **ER Diagram (ASCII)**: Visual relationships between tables.
2. **Environment Setup**: DDL and seed data.
3. **Implementation**: The target SQL logic in full.
4. **Interview Insight**: "How would you optimize this joined query?"
` : `
1. **The Concept**: What SQL concept or pattern is this?
2. **Schema Design**: How do you structure this in relational terms?
3. **SQL Syntax**: Clear examples with sample data. Include edge cases.
4. **Performance**: How would you make this fast? Index strategies.
5. **Best Practices**: When to use this pattern vs alternatives.
`}
`;
    },
    languageDirective: 'Use standard SQL syntax. Note dialect differences if they matter.',
    codeExampleStyle: 'production',
    focusAreas: ['Query Optimization', 'Schema Design', 'Indexing', 'Transactions']
};
