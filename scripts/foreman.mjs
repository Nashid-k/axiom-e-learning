import fs from 'fs';

// This script turns daily commit history into a 'Construction Foreman' report
const README_PATH = './README.md';

const commitMessages = process.env.COMMIT_MESSAGES || 'Minor adjustments to the blueprint.';
const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const report = `
<!-- FOREMAN-LOG:START -->
### 🏗️ Foreman's Daily Log: ${date}

**Today's Site Progress:**
${commitMessages.split('\n').map(msg => `- 🛠️ ${msg}`).join('\n')}

**Site Status:** 🟢 All systems nominal. Foundations holding strong.
<!-- FOREMAN-LOG:END -->`;

try {
    let readme = fs.readFileSync(README_PATH, 'utf-8');
    const regex = /<!-- FOREMAN-LOG:START -->[\s\S]*<!-- FOREMAN-LOG:END -->/;

    if (regex.test(readme)) {
        readme = readme.replace(regex, report.trim());
    } else {
        readme += `\n\n---\n${report.trim()}\n`;
    }

    fs.writeFileSync(README_PATH, readme);
    console.log('Foreman Log updated successfully.');
} catch (err) {
    console.error('Error updating Foreman Log:', err);
}
