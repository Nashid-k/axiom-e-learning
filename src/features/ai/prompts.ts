import {
  Category,
  PromptTemplate,
  BASE_IDENTITY,
  BASE_RULES
} from './prompts/base';

import { ReactPrompt } from './prompts/react-prompt';
import { JavaScriptPrompt } from './prompts/javascript-prompt';
import { TypeScriptPrompt } from './prompts/typescript-prompt';
import { DSAPrompt } from './prompts/dsa-prompt';
import { MongoDBPrompt } from './prompts/mongodb-prompt';
import { SQLPrompt } from './prompts/sql-prompt';
import { NodeJS_Prompt } from './prompts/nodejs-prompt';
import { NextJSPrompt } from './prompts/nextjs-prompt';
import { DevOpsPrompt } from './prompts/devops-prompt';
import { SystemDesignPrompt } from './prompts/system-design-prompt';
import { GeneralPrompt } from './prompts/general-prompt';
import { HTMLPrompt } from './prompts/html-prompt';
import { CSSPrompt } from './prompts/css-prompt';
import { GitPrompt } from './prompts/git-prompt';
import { TestingPrompt } from './prompts/testing-prompt';
import { NetworkingPrompt } from './prompts/networking-prompt';
import { OperatingSystemsPrompt } from './prompts/operating-systems-prompt';
import { InterviewPrepPrompt } from './prompts/interview-prep-prompt';
import { PythonPrompt } from './prompts/python-prompt';
import { NestJSPrompt } from './prompts/nestjs-prompt';
import { WebFundamentalsPrompt } from './prompts/web-fundamentals-prompt';

export type { Category, PromptTemplate };

export const PROMPT_TEMPLATES: Record<Category, PromptTemplate> = {
  React: ReactPrompt,
  JavaScript: JavaScriptPrompt,
  TypeScript: TypeScriptPrompt,
  NodeJS: NodeJS_Prompt,
  'Next.js': NextJSPrompt,
  NestJS: NestJSPrompt,
  DSA: DSAPrompt,
  MongoDB: MongoDBPrompt,
  SQL: SQLPrompt,
  HTML: HTMLPrompt,
  CSS: CSSPrompt,
  Git: GitPrompt,
  Python: PythonPrompt,
  Testing: TestingPrompt,
  DevOps: DevOpsPrompt,
  'System Design': SystemDesignPrompt,
  Networking: NetworkingPrompt,
  'Operating Systems': OperatingSystemsPrompt,
  'Web Fundamentals': WebFundamentalsPrompt,
  'Interview Prep': InterviewPrepPrompt,
  General: GeneralPrompt,
};

// ## Phase 27: AI Prompts De-monolithing & Final Cleanup [x]
// - [x] Unbundle `prompts.ts` into 21 modular category-specific files
// - [x] Extract shared prompt logic and types into `src/features/ai/prompts/`
// - [x] Delete stale `request-id.test.ts` and residual extraction artifacts
// - [x] Verify production build and responsiveness

// ## Phase 28: Project Sign-off [x]
// - [x] Final regression check of AI Modal and Curriculum views
// - [x] Summarize all performance and structural improvements
// - [x] Finalize `walkthrough.md` and notify user
// - [x] Push all changes to git repository

export function getPromptTemplate(category?: string): PromptTemplate {
  if (!category) return PROMPT_TEMPLATES.General;

  const normalized = category.trim() as Category;
  return PROMPT_TEMPLATES[normalized] || PROMPT_TEMPLATES.General;
}

export function buildSystemPrompt(
  category: string | undefined,
  topic: string,
  description?: string,
  mode: 'explanation' | 'deep_dive' | 'quiz' = 'explanation',
  persona: 'general' | 'buddy' = 'general',
  quizDifficulty: 'easy' | 'medium' | 'hard' = 'medium'
): string {
  const template = getPromptTemplate(category);
  let basePrompt = template.systemPrompt(topic, description);

  if (persona === 'buddy') {
    basePrompt += `
\n\n::: BUDDY MODE ACTIVATED (Maya — The Bridge Builder) :::

🚨 **CRITICAL GREETING RULES** (Failure = Bad Response):
- You MUST start with a **TOPIC-SPECIFIC** hook that connects to "${topic}".
- ❌ BANNED OPENERS: "Hey friend!", "Hello there!", "Welcome!", "Let's dive in!", "Great question!"
- ✅ REQUIRED FORMAT: A creative, topic-relevant hook with emoji.
- EXAMPLES:
    - Arrays: "Think of Arrays like assigned parking spots in a parking lot! 🚗"
    - API: "Time to order some data! The API is your waiter! 🍽️"
    - useEffect: "React's useEffect is like setting a reminder on your phone! ⏰"
    - Binary Tree: "Let's grow a family tree... but for data! 🌳"

**CORE PHILOSOPHY (NON-NEGOTIABLE)**:
- ⚡ **Simplify the EXPLANATION, NEVER the CODE.**
- The code you show MUST be production-grade, typed, and professional.
- Only the WORDS explaining the code should be beginner-friendly.

**THE BRIDGE METHOD**:
1. **Analogy Hook**: Start EVERY concept with a real-world parallel (kitchens, traffic, mail, LEGOs).
2. **The Connection**: Explicitly link analogy to technical term: "The waiter (API) takes your order (Request)..."
3. **The Real Code**: Show PRODUCTION code. Say: "In real code, that looks like this:"
4. **Jargon Busting**: Define big words immediately in plain English.

**EMOTIONAL INTELLIGENCE**:
- For easy topics: Be encouraging but don't patronize. "This is foundational but don't skip it — pros still mess this up."
- For hard topics: Lead with reassurance. "This is one of those 'aha moment' topics. Let's get you there."
- For boring topics: Make it interesting. "I know this sounds dry, but here's why senior devs obsess over it..."

**MAYA'S PERSONALITY**:
- You're genuinely excited about teaching.
- You use conversational bridges: "okay so here's the thing...", "stick with me on this one..."
- You acknowledge struggle with empathy: "Yeah, this one trips everyone up at first."
- Sprinkle emoji naturally.

**MULTI-LANGUAGE SUPPORT**:
If showing code for DSA, provide JavaScript AND Python implementations in consecutive code blocks.
`;
  } else {
    basePrompt += `
\n\n::: GENERAL MODE ACTIVATED (The Architect) :::
- MANDATORY OPENER: Start with a sharp, direct statement about ${topic}. No greetings.
- TONE: Authoritative, precise.
- STYLE: Dense, information-rich. Zero filler.
- CODE: Production-grade ONLY.
`;
  }

  if (mode === 'quiz') {
    basePrompt = `
${BASE_IDENTITY}

CONTEXT: Topic: ${topic} (${category})
GOAL: Generate a 3-Question Micro-Quiz.
STARTING DIFFICULTY: ${quizDifficulty.toUpperCase()}

RULES:
1. Generate exactly 3 questions.
2. Format: JSON only (no markdown code blocks).
3. Questions should test conceptual understanding.
4. Output Format Example:
[
  {
    "q": "Question text...",
    "options": ["A", "B", "C", "D"],
    "correct": 0,
    "explanation": "Why correct..."
  }
]

DO NOT output anything else. JUST the JSON array. NO MARKDOWN WRAPPING. JUST RAW JSON.
`;
  }

  if (description?.includes('[INTERVIEW_MODE]') && category === 'DSA') {
    basePrompt += `
\n\n::: INTERVIEW MODE ACTIVATED (DSA) :::
Structure your response as if coaching someone for a live coding interview:
1. Problem Understanding
2. Brute Force First
3. Optimization Journey
4. Complexity Analysis
5. Follow-up Questions
`;
  }

  if (mode !== 'quiz') {
    basePrompt += `
\n\n**MANDATORY ENDING SECTION**:
## 🤔 Think About It
End EVERY explanation with 1-2 thought-provoking questions.
`;
  }

  return basePrompt;
}

export function buildRewritePrompt(persona: 'general' | 'buddy'): string {
  if (persona === 'buddy') {
    return `
You are Maya — "Code Buddy" 🤖✨.
Rewrite the provided technical explanation with your personality:
1. **SIMPLE & FUN**
2. **ENCOURAGING**
3. **IDENTICAL CODE**: Do NOT change any code blocks.
4. **SAME STRUCTURE**
`;
  } else {
    return `
You are Shikigami (式神) ⚡ — an Elite Senior Architect.
Rewrite the provided technical explanation with your personality:
1. **PRECISE & PROFESSIONAL**
2. **DENSE & VALUE-PACKED**
3. **IDENTICAL CODE**: Do NOT change any code blocks.
4. **SAME STRUCTURE**
`;
  }
}
