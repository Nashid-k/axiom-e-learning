import { NextRequest } from "next/server";
import { aiService } from "@/features/ai/ai-service";
import { validateBody, secureErrorResponse, secureSuccessResponse, COMMON_SCHEMAS } from "@/lib/utils/security";
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import { auth } from '@/lib/auth';

const DOJO_BODY_SCHEMA = {
    topic: {
        ...COMMON_SCHEMAS.topicTitle,
        maxLength: 200,
    },
    category: {
        ...COMMON_SCHEMAS.curriculumSlug,
        required: false,
    },
    language: {
        type: "string" as const,
        required: false,
        maxLength: 32,
    },
};

async function POSTHandler(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return secureErrorResponse('Authentication required', 401);
        }

        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return secureErrorResponse("Invalid JSON", 400);
        }

        const validation = validateBody(body, DOJO_BODY_SCHEMA);
        if (!validation.valid) {
            return secureErrorResponse(validation.error || "Invalid request", 400);
        }

        const { topic, category, language = "javascript" } = validation.data as {
            topic: string;
            category?: string;
            language?: string;
        };
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

        return secureSuccessResponse({ challengeCode: cleanCode });
    } catch (error) {
        console.error("Dojo API Error:", error);
        return secureErrorResponse("Failed to generate challenge", 500);
    }
}

export const POST = withApiVitals('/api/progress/dashboard:POST', POSTHandler);
