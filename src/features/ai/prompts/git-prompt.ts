import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const GitPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => `
${BASE_IDENTITY}

DOMAIN: Version Control
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

GIT-SPECIFIC GUIDELINES:
- Mental Model: Git is a directed acyclic graph (DAG) of commits.
- Branching Strategy: GitFlow, trunk-based development, feature branches.
- Commits: Atomic changes with clear messages. The history should tell a story.
- Merging vs Rebasing: When to use each. The trade-offs.
- Collaboration: Pull requests, code review, conflict resolution.
- History Rewriting: Use with caution. Interactive rebase for clean history.
- Common Pitfalls: Committing secrets, large files, unclear commit messages, force push mistakes.

BUILD THE EXPLANATION:
1. **The Git Concept**: What are we doing with version control?
2. **Mental Model**: How does Git represent this?
3. **Practical Workflow**: Step-by-step commands with real scenarios.
4. **Best Practices**: Clean history, atomic commits, collaboration patterns.
5. **Common Mistakes**: What teams get wrong with Git.
6. **Advanced Patterns**: Interactive rebase, cherry-pick, stash workflows.
`,
    languageDirective: 'Use clear Git command syntax. Show output examples.',
    codeExampleStyle: 'minimal',
    focusAreas: ['Branching Strategy', 'Atomic Commits', 'Merging Strategies', 'Collaboration']
};
