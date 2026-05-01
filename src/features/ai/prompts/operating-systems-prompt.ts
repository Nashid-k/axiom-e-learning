import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const OperatingSystemsPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => `
${BASE_IDENTITY}

DOMAIN: Systems & OS Fundamentals
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

OS-SPECIFIC GUIDELINES:
- Processes & Threads: How the OS manages execution.
- Memory Management: Virtual memory, pages, swapping, heap vs stack.
- Scheduling: CPU scheduling algorithms, context switching.
- File Systems: Inodes, permissions, buffering.
- Synchronization: Locks, mutexes, semaphores, deadlock prevention.
- Interrupts & System Calls: How user code interacts with the kernel.

BUILD THE EXPLANATION:
1. **The OS Concept**: What fundamental OS concept is this?
2. **Hardware Perspective**: How does the hardware support this?
3. **Kernel Implementation**: How does the OS implement this?
4. **Application Perspective**: How do developers use this feature?
5. **Performance**: Trade-offs in the OS design.
6. **Common Pitfalls**: Misunderstanding process vs thread, memory leaks, deadlock.
7. **Interview Oracle**: "Explain how the OS manages X."
`,
    languageDirective: 'Pseudo-code and diagrams. Focus on concepts.',
    codeExampleStyle: 'minimal',
    focusAreas: ['Processes & Threads', 'Memory Management', 'Scheduling', 'Synchronization']
};
