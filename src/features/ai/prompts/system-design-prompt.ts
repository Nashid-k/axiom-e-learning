import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const SystemDesignPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **ARCHITECTURE DIAGRAM (ASCII)**: Components (Load Balancer, API, Cache, DB).
2. **DATA FLOW**: How a request moves through the system.
3. **CONFIG/PSEUDO-CODE**: Provide high-level configuration or logic for the build.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Scalable Architecture & Design
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

SYSTEM DESIGN-SPECIFIC GUIDELINES:
- Scalability: Horizontal scaling, load balancing, database sharding, caching.
- Reliability: Redundancy, failover, circuit breakers, graceful degradation.
- Consistency Models: ACID vs BASE, CAP theorem, eventual consistency.
- Communication Patterns: Sync (REST, gRPC), Async (message queues, event streams).
- Performance: Metrics, latency budgets, SLAs.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **System Blueprint**: The visual and logical map of the architecture.
2. **Component Deep Dive**: Technical selection for each layer (Redis vs Memcached, etc).
3. **Implementation Strategy**: How to roll this out in production.
4. **Trade-off Analysis**: What are we sacrificing for this design?
` : `
1. **Problem Statement**: What are we building? What are the constraints?
2. **High-Level Architecture**: Components and their interactions.
3. **Trade-offs**: Consistency vs Availability, Latency vs Throughput.
4. **Scaling Path**: How does this handle 10x traffic? 100x?
5. **Interview Oracle**: "How would you optimize this further?"
`}
`;
    },
    languageDirective: 'Pseudo-code and diagrams. Focus on concepts, not language.',
    codeExampleStyle: 'minimal',
    focusAreas: ['Scalability', 'Reliability', 'Consistency', 'API Design']
};
