'use client';

let currentController: AbortController | null = null;
let debounceTimer: NodeJS.Timeout | null = null;

export function registerCopilotProvider(monaco: any) {
    const provider = {
        triggerCharacters: ['.', ' ', '\n', '(', '{', '=', ':'],
        provideCompletionItems: async (model: any, position: any) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });

            const textAfterPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: position.column,
                endLineNumber: model.getLineCount(),
                endColumn: model.getLineMaxColumn(model.getLineCount())
            });

            // Don't autocomplete if they haven't typed anything meaningful
            if (!textUntilPosition.trim()) {
                return { suggestions: [] };
            }

            // Cancel any active debounced timers or requests
            if (debounceTimer) clearTimeout(debounceTimer);
            if (currentController) currentController.abort();

            return new Promise((resolve) => {
                debounceTimer = setTimeout(async () => {
                    const controller = new AbortController();
                    currentController = controller;

                    try {
                        const response = await fetch('/api/ai/autocomplete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                prefix: textUntilPosition,
                                suffix: textAfterPosition,
                                language: model.getLanguageId()
                            }),
                            signal: controller.signal
                        });

                        if (!response.ok) {
                            resolve({ suggestions: [] });
                            return;
                        }

                        const data = await response.json();
                        const completion = data.completion;

                        if (!completion || !completion.trim()) {
                            resolve({ suggestions: [] });
                            return;
                        }

                        const shortLabel = completion.length > 40 
                            ? completion.trim().substring(0, 40) + '...' 
                            : completion.trim();

                        const item = {
                            label: `💡 Copilot: ${shortLabel}`,
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: {
                                value: `### Axiom Copilot Suggestion\n\`\`\`${model.getLanguageId()}\n${completion}\n\`\`\``
                            },
                            insertText: completion,
                            range: {
                                startLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endLineNumber: position.lineNumber,
                                endColumn: position.column
                            }
                        };

                        resolve({
                            suggestions: [item]
                        });

                    } catch (e: any) {
                        if (e.name !== 'AbortError') {
                            console.error('Copilot autocomplete error:', e);
                        }
                        resolve({ suggestions: [] });
                    }
                }, 600); // 600ms debounce to prevent hitting Groq sequentially while typing rapidly
            });
        }
    };

    // Register the provider across supported languages
    const languages = ['javascript', 'typescript', 'python', 'html', 'css', 'sql'];
    const disposables = languages.map(lang => 
        monaco.languages.registerCompletionItemProvider(lang, provider)
    );

    return () => {
        disposables.forEach(d => d.dispose());
    };
}
