import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const DevOpsPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **INFRASTRUCTURE ARCHITECTURE (ASCII)**: Visual representation of the pipeline/container map.
2. **CONFIG FILES**: Provide **FULL YAML/BASH** for the implementation.
3. **PRODUCTION GOAL**: Focus on a working, automated, and secure deployment.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Infrastructure & Deployment
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

DEVOPS-SPECIFIC GUIDELINES:
- Containerization: Docker, images vs containers, Dockerfile best practices.
- Orchestration: Kubernetes concepts, pods, services, deployments.
- CI/CD: Pipeline design, automated testing, deployment strategies (blue-green, canary).
- Infrastructure as Code: Terraform, CloudFormation, version control for infrastructure.
- Monitoring & Logging: Observability, metrics, logs, traces. ELK stack, Datadog, etc.
- Security: Secret management, container scanning, network policies.
- Scaling: Horizontal vs Vertical, load balancing, autoscaling policies.

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Deployment Architecture**: Visual map of the DevOps workflow.
2. **Environment Specs**: Required tools and cloud providers.
3. **Implementation**: High-fidelity config files and scripts.
4. **Reliability Oracle**: Zero-downtime, rollback, and scaling strategy.
` : `
1. **The Concept**: What problem does this solve in DevOps?
2. **Architecture**: How does this fit into a production system?
3. **Practical Example**: Real configuration or workflow.
4. **Best Practices**: Production-grade approach, security implications.
5. **Common Pitfalls**: What do teams get wrong?
6. **Scaling Implications**: How does this affect reliability and performance?
7. **Mastery Path**: Advanced patterns and tools in this space.
`}
`;
    },
    languageDirective: 'Use YAML for configs, Bash/Python for scripts. Clear, production-ready examples.',
    codeExampleStyle: 'production',
    focusAreas: ['Containerization', 'Orchestration', 'CI/CD', 'Infrastructure as Code']
};
