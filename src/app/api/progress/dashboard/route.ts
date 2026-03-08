import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/features/ai/ai-service";
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import { auth } from '@/lib/auth';
import { validateInput, DojoChallengeSchema, DojoChallengeInput } from "@/lib/api/validation";
import { Logger, createLogContext, getOrCreateRequestId } from "@/lib/api/logger";

async function POSTHandler(req: NextRequest) {
    const requestId = getOrCreateRequestId(req.headers);
    const startTime = Date.now();

    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        const body = await req.json();
        const validated = validateInput(DojoChallengeSchema, body);
        const { topic, category, language } = validated;

        const context = createLogContext(requestId, {
            endpoint: '/api/progress/dashboard',
            topic,
            category,
            language,
            userId: session.user.email,
        });

        Logger.info('Generating Dojo challenge', context);

        const isPython = language.toLowerCase() === 'python';
        let contextInstruction = isPython
            ? "Generate a purely Python 3 challenge."
            : "Generate a JavaScript/TypeScript challenge.";

        const cat = (category || '').toLowerCase();

        if (cat.includes('dsa') || cat.includes('algorithm')) {
            contextInstruction = isPython
                ? "Generate a purely algorithmic challenge in Python. Focus on complexity and logic. Use standard types only."
                : "Generate a purely algorithmic challenge in JavaScript (DSA focus). Focus on time complexity, recursion, or data structures like Arrays/Maps. Do NOT use DOM APIs.";
        } else if (cat.includes('sql') || cat.includes('database')) {
            contextInstruction = "Generate a challenge that simulates database logic using language primitives (arrays/lists). The student should use functional patterns (filter/map) to 'query' this data. Provide the mock data.";
        } else if (cat.includes('html') || cat.includes('css') || cat.includes('web')) {
            contextInstruction = isPython
                ? "Generate a Python challenge that processes web data (e.g. parsing a string of HTML/JSON) or simulates a backend controller logic."
                : "Generate a JavaScript challenge related to DOM manipulation logic or simulating rendering state. For example: 'Write a function that generates an HTML string' or 'Manage class names based on state'.";
        }

        const systemPrompt = `You are a Sensei in a Coding Dojo, part of the Axiom platform built by **Nashid**. 
        Your task is to generate a single, self-contained ${isPython ? 'Python' : 'JavaScript/TypeScript'} coding challenge for the student.
        The topic is: "${topic}" (Category: ${category}).
        Context: ${contextInstruction}

        Rules:
        1. Output ONLY valid ${isPython ? 'Python' : 'JavaScript'} code.
        2. Include comments explaining the goal.
        3. Do NOT include markdown blocks (\`\`\`). Just raw code.
        4. The code should have a specific goal (e.g. "Fix this function" or "Implement this algorithm").
        5. It should range from 15-40 lines.
        6. Start with: "// Challenge: [Title] - ${topic}" (Use # for Python comments)
        7. If Python, ensure code is runnable in Pyodide (standard library only).
        `;

        const challengeCode = await aiService.complete(
            [{ role: "system", content: systemPrompt }],
            'coding'
        ) || "// Failed to summon challenge.";

        const cleanCode = challengeCode
            .replace(/```javascript/g, '')
            .replace(/```python/g, '')
            .replace(/```/g, '')
            .trim();

        const duration = Date.now() - startTime;
        Logger.info('Dojo challenge generated', { ...context, duration });

        return NextResponse.json({ challengeCode: cleanCode });
    } catch (error: any) {
        const duration = Date.now() - startTime;
        Logger.error("Dojo API Error", { requestId, duration }, error);
        return NextResponse.json({ error: "Failed to generate challenge" }, { status: 500 });
    }
}

export const POST = withApiVitals('/api/progress/dashboard:POST', POSTHandler);

