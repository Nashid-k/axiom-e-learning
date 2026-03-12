import fs from 'fs';
import path from 'path';

// AI-driven curriculum generator for Axiom
// This script would normally be powered by an LLM via API in the workflow.
// For the implementation, we create a template-based generator that follows the 'Construction' metaphor.

const ISSUE_TITLE = process.env.ISSUE_TITLE || 'New Curriculum Request';
const ISSUE_BODY = process.env.ISSUE_BODY || '';

function generateCurriculum(topic) {
    const id = topic.toLowerCase().replace(/\s+/g, '-');
    const className = topic.toUpperCase().replace(/\s+/g, '_');

    return `import { CurriculumData } from '@/types';

export const ${className}_CURRICULUM: Record<string, CurriculumData> = {
    "${id}": {
        id: "${id}",
        fileName: "${id}",
        description: "${topic} Mastery (Construction Style)",
        category: "${topic}",
        subDescription: "Mastering ${topic} with the Axiom Blueprint method.",
        phases: [
            {
                phase: 1,
                title: "Laying the Foundation",
                theory: [
                    "What is ${topic}?",
                    "Core architectural principles",
                    "Setting up your workstation"
                ],
                practicals: [
                    "Install the necessary tools",
                    "Create your first blueprint"
                ]
            }
        ]
    }
};
`;
}

const topic = ISSUE_TITLE.replace('Request:', '').trim();
if (topic) {
    const content = generateCurriculum(topic);
    const fileName = `${topic.toLowerCase().replace(/\s+/g, '-')}-curriculum.ts`;
    fs.writeFileSync(path.join('src/data', fileName), content);
    console.log(`Successfully generated ${fileName}`);
} else {
    console.error('No topic found in issue title.');
}
