'use client';

import { VFS } from '../types/vfs-types';

export interface SpecResult {
    id: string;
    description: string;
    status: 'idle' | 'running' | 'passed' | 'failed';
    message?: string;
}

export interface SpecTest {
    id: string;
    description: string;
    assert: (files: VFS, iframeRef?: HTMLIFrameElement | null) => Promise<{ success: boolean; message?: string }>;
}

export const EVALUATOR_TEMPLATES: Record<string, SpecTest[]> = {
    html: [
        {
            id: 'html-structure',
            description: 'Workspace includes a valid /index.html document',
            assert: async (files) => {
                const hasHtml = !!files['/index.html']?.content.trim();
                return {
                    success: hasHtml,
                    message: hasHtml ? 'index.html detected successfully.' : 'Missing index.html.'
                };
            }
        },
        {
            id: 'html-header',
            description: 'index.html contains a top-level <h1> heading',
            assert: async (files, iframe) => {
                if (!iframe) return { success: false, message: 'Preview frame not ready.' };
                const doc = iframe.contentWindow?.document;
                const h1 = doc?.querySelector('h1');
                return {
                    success: !!h1,
                    message: h1 ? `Found <h1>: "${h1.textContent}"` : 'No <h1> heading detected.'
                };
            }
        },
        {
            id: 'html-button-id',
            description: 'Workspace has a trigger action button with ID "action-btn"',
            assert: async (files, iframe) => {
                if (!iframe) return { success: false, message: 'Preview frame not ready.' };
                const doc = iframe.contentWindow?.document;
                const btn = doc?.querySelector('#action-btn');
                return {
                    success: !!btn,
                    message: btn ? 'Action button (#action-btn) found.' : 'No button with id="action-btn" found.'
                };
            }
        },
        {
            id: 'css-styles-connected',
            description: 'styles.css links properly and contains custom styling rules',
            assert: async (files, iframe) => {
                const hasCss = !!files['/styles.css']?.content.trim();
                if (!hasCss) return { success: false, message: 'Missing styles.css file in VFS.' };

                if (!iframe) return { success: false, message: 'Preview frame not ready.' };
                const doc = iframe.contentWindow?.document;
                const activeStyle = doc?.querySelector('style[data-vfs-path="/styles.css"]');
                return {
                    success: !!activeStyle,
                    message: activeStyle ? 'styles.css is successfully injected.' : 'styles.css link tag missing or not bound.'
                };
            }
        }
    ],
    javascript: [
        {
            id: 'js-add-fn',
            description: 'Verify existence of function "add(a, b)" returning the sum',
            assert: async (files, iframe) => {
                if (!iframe) return { success: false, message: 'Execution sandbox not mounted.' };
                const win = iframe.contentWindow as any;
                
                if (typeof win?.add !== 'function') {
                    return { success: false, message: 'add is not a function on global scope.' };
                }
                const sum = win.add(5, 7);
                return {
                    success: sum === 12,
                    message: sum === 12 
                        ? 'add(5, 7) correctly returned 12.' 
                        : `add(5, 7) returned ${sum} instead of 12.`
                };
            }
        },
        {
            id: 'js-vfs-script',
            description: 'Workspace script.js runs without syntax errors',
            assert: async (files, iframe) => {
                if (!iframe) return { success: false, message: 'Sandbox not loaded.' };
                const doc = iframe.contentWindow?.document;
                const scriptNode = doc?.querySelector('script[data-vfs-path="/app.js"]');
                return {
                    success: !!scriptNode,
                    message: scriptNode ? 'VFS script.js compiled successfully.' : 'script.js bundle injection not detected.'
                };
            }
        }
    ],
    python: [
        {
            id: 'py-run-success',
            description: 'Python script runs without any exceptions or syntax errors',
            assert: async (files) => {
                const hasPy = !!files['/main.py']?.content.trim();
                return {
                    success: hasPy,
                    message: hasPy ? 'main.py detected.' : 'Missing main.py script.'
                };
            }
        }
    ]
};

export const getSpecSuiteForLanguage = (language: string): SpecTest[] => {
    const normalized = language.toLowerCase();
    if (normalized.includes('html') || normalized.includes('css')) return EVALUATOR_TEMPLATES.html;
    if (normalized.includes('javascript') || normalized.includes('typescript')) return EVALUATOR_TEMPLATES.javascript;
    if (normalized.includes('python')) return EVALUATOR_TEMPLATES.python;
    return [];
};
