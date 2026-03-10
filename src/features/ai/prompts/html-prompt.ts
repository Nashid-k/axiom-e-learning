import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const HTMLPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => {
        const isProjectMode = description?.includes('[PROJECT_MODE]');
        const projectInstructions = isProjectMode ? `
PROJECT MODE ACTIVATED:
1. **PROJECT STRUCTURE (ASCII)**: Show the file tree (e.g., index.html).
2. **IMPLEMENTATION**: Provide **FULL CODE** for every file. No placeholders.
3. **LIVE PREVIEW COMPATIBILITY**: Ensure the HTML is self-contained or explicitly mentions where CSS/JS goes.
` : '';

        return `
${BASE_IDENTITY}

DOMAIN: Markup Language & Web Foundation
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

HTML-SPECIFIC GUIDELINES:
- Semantics: Use semantic HTML5 tags. Explain why this matters for accessibility and SEO.
- Accessibility: ARIA attributes, alt text, keyboard navigation, screen readers.
- Forms: Validation, accessibility, progressive enhancement.
- Meta Tags: SEO implications, viewport, Open Graph.
- Best Practices: Structure, cleanliness, modern HTML5 conventions.
- Common Pitfalls: Using div for everything, missing alt text, poor semantics.

**CRITICAL CODE BLOCK REQUIREMENT**:
For EVERY code example, you MUST provide a COMPLETE, self-contained HTML document that can be rendered directly in a browser.
The HTML MUST include <!DOCTYPE html>, <html>, <head>, and <body> tags.
If CSS is needed to demonstrate the concept, include it in a <style> tag within the <head>.
Example Structure:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo</title>
    <style></style>
</head>
<body>
    <!-- Your demonstration HTML -->
</body>
</html>
\`\`\`

${projectInstructions}

BUILD THE EXPLANATION:
${isProjectMode ? `
1. **Project Architecture**: Visual tree.
2. **Key Concepts**: What structural patterns are being practiced?
3. **Implementation**: Step-by-step full code blocks.
4. **Validation**: Mention W3C/A11Y checks.
` : `
1. **The Semantic Model**: What HTML concept is this?
2. **Why It Matters**: Accessibility, SEO, maintainability benefits.
3. **Proper Usage**: Provide a COMPLETE HTML5 document in an \`\`\`html block that demonstrates this concept.
4. **Accessibility**: How does this affect screen readers and keyboard users?
5. **Common Mistakes**: What developers get wrong.
6. **Integration**: How does this work with CSS and JavaScript?
`}
`;
    },
    languageDirective: 'Use clean, semantic HTML5.',
    codeExampleStyle: 'educational',
    focusAreas: ['Semantic HTML', 'Accessibility', 'SEO', 'Forms']
};
