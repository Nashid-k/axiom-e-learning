import fs from 'fs';
import path from 'path';

// Axiom Repo Showcase Script: Highlights curriculum topics in the Axiom README
const AXIOM_DATA_DIR = './src/data';
const README_PATH = './README.md';

function getRandomCurriculum() {
    const files = fs.readdirSync(AXIOM_DATA_DIR).filter(f => f.endsWith('-curriculum.ts'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const content = fs.readFileSync(path.join(AXIOM_DATA_DIR, randomFile), 'utf-8');

    const titleMatch = content.match(/title:\s*["'](.+?)["']/);
    const descMatch = content.match(/description:\s*["'](.+?)["']/);

    return {
        name: randomFile.replace('-curriculum.ts', '').toUpperCase(),
        title: titleMatch ? titleMatch[1] : 'Full-Stack Excellence',
        description: descMatch ? descMatch[1] : 'Building things that scale.'
    };
}

function updateReadme(curr) {
    let readme = fs.readFileSync(README_PATH, 'utf-8');
    const showcaseSection = `
<!-- AXIOM-SHOWCASE:START -->
### 💡 Daily Featured Topic: ${curr.name}
> **${curr.title}**
> ${curr.description}
<!-- AXIOM-SHOWCASE:END -->`;

    const regex = /<!-- AXIOM-SHOWCASE:START -->[\s\S]*<!-- AXIOM-SHOWCASE:END -->/;
    if (regex.test(readme)) {
        readme = readme.replace(regex, showcaseSection.trim());
    } else {
        // Find a good place to insert - before the Foreman Log
        if (readme.includes('<!-- FOREMAN-LOG:START -->')) {
            readme = readme.replace('<!-- FOREMAN-LOG:START -->', `${showcaseSection.trim()}\n\n---\n\n<!-- FOREMAN-LOG:START -->`);
        } else {
            readme += `\n\n---\n${showcaseSection.trim()}\n`;
        }
    }

    fs.writeFileSync(README_PATH, readme);
}

try {
    const curr = getRandomCurriculum();
    updateReadme(curr);
    console.log(`Updated Axiom README with ${curr.name}`);
} catch (err) {
    console.error('Error updating Axiom showcase:', err);
}
