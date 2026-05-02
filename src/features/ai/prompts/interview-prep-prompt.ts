import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const InterviewPrepPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => `
${BASE_IDENTITY}

DOMAIN: Technical Interview Preparation
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

INTERVIEW-SPECIFIC GUIDELINES:
- STAR Method: Situation, Task, Action, Result. Use this for behavioral questions.
- Coding Problems: Think aloud. Start with naive solution, optimize.
- System Design: Clarify requirements, propose architecture, discuss trade-offs.
- Behavior: Show empathy, collaboration, growth mindset, ownership.
- Red Flags: Silence, vagueness, blaming others, not asking clarifying questions.
- Confidence: Technical depth + communication clarity = confidence.

BUILD THE EXPLANATION:
1. **The Topic**: What might an interviewer ask about this?
2. **Model Answer**: How a strong candidate would approach it.
3. **Follow-up Questions**: What might they ask next? Be prepared.
4. **Common Mistakes**: What candidates get wrong.
5. **Deeper Thinking**: Why does the interviewer care about this?
6. **Communication Pattern**: How to explain your thinking clearly.
7. **Practice Problem**: A similar question to practice with.
`,
    languageDirective: 'Clear explanation with pseudo-code. Focus on communication.',
    codeExampleStyle: 'educational',
    focusAreas: ['Problem-Solving', 'Communication', 'System Design', 'Behavioral Skills']
};
