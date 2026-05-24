'use client';

import { useEffect, useRef, useState } from 'react';
import { VFS } from '../types/vfs-types';
import { Button } from '@/components/ui/Button';

interface VFSCodePreviewProps {
    files: VFS;
    onConsoleMessage: (level: 'log' | 'warn' | 'error', text: string) => void;
    onClearConsole: () => void;
}

export function VFSCodePreview({
    files,
    onConsoleMessage,
    onClearConsole
}: VFSCodePreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [reloadKey, setReloadKey] = useState(0);

    // Compile virtual files into a single srcDoc
    const compileVFS = (): string => {
        let html = files['/index.html']?.content || `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        background: #0d1117;
                        color: #f5f5f7;
                        font-family: system-ui, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 80vh;
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <div style="text-align: center;">
                    <h3>No /index.html found in your workspace</h3>
                    <p style="color: #86868b; font-size: 14px;">Create /index.html in the sidebar to launch preview.</p>
                </div>
            </body>
            </html>
        `;

        // Intercepting Console Script
        const consoleHook = `
            <script>
                (function() {
                    const sendMsg = (level, args) => {
                        const message = args.map(arg => {
                            if (typeof arg === 'object') {
                                try {
                                    return JSON.stringify(arg, null, 2);
                                } catch (e) {
                                    return String(arg);
                                }
                            }
                            return String(arg);
                        }).join(' ');
                        
                        window.parent.postMessage({
                            type: 'vfs-console-msg',
                            level: level,
                            message: message
                        }, '*');
                    };

                    const originalConsole = {
                        log: console.log,
                        warn: console.warn,
                        error: console.error
                    };

                    console.log = (...args) => {
                        originalConsole.log(...args);
                        sendMsg('log', args);
                    };
                    console.warn = (...args) => {
                        originalConsole.warn(...args);
                        sendMsg('warn', args);
                    };
                    console.error = (...args) => {
                        originalConsole.error(...args);
                        sendMsg('error', args);
                    };

                    window.onerror = (message, source, lineno, colno) => {
                        sendMsg('error', ['Runtime Error: ' + message + ' (Line ' + lineno + ':' + colno + ')']);
                        return false;
                    };
                })();
            </script>
        `;

        // Inject Console intercept at very top of <head>
        if (html.includes('<head>')) {
            html = html.replace('<head>', `<head>\n${consoleHook}`);
        } else if (html.includes('<html>')) {
            html = html.replace('<html>', `<html>\n<head>\n${consoleHook}\n</head>`);
        } else {
            html = consoleHook + html;
        }

        // Inline CSS link elements
        // e.g. <link rel="stylesheet" href="styles.css">
        const linkRegex = /<link\s+[^>]*rel=["']stylesheet["']\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
        html = html.replace(linkRegex, (match, href) => {
            const cleanPath = href.startsWith('/') ? href : `/${href.replace(/^\.\//, '')}`;
            const cssFile = files[cleanPath];
            if (cssFile) {
                return `<style data-vfs-path="${cleanPath}">${cssFile.content}</style>`;
            }
            return match; // Keep remote sheets intact
        });

        // Inline Script elements
        // e.g. <script src="app.js"></script>
        const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi;
        html = html.replace(scriptRegex, (match, src) => {
            const cleanPath = src.startsWith('/') ? src : `/${src.replace(/^\.\//, '')}`;
            const jsFile = files[cleanPath];
            if (jsFile) {
                return `<script data-vfs-path="${cleanPath}">${jsFile.content}</script>`;
            }
            return match; // Keep remote scripts intact
        });

        return html;
    };

    // Re-compile whenever VFS files edit (hot reload with a debouncer or simple reload keys)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'vfs-console-msg') {
                onConsoleMessage(event.data.level, event.data.message);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onConsoleMessage]);

    const handleManualReload = () => {
        onClearConsole();
        onConsoleMessage('log', '> Re-compiling program VFS bundles...');
        setReloadKey(prev => prev + 1);
    };

    return (
        <div className="w-full h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl relative">
            {/* Header Preview Bar */}
            <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase select-none">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Output</span>
                </div>
                <button
                    onClick={handleManualReload}
                    className="px-2.5 py-1 rounded bg-white hover:bg-slate-200 border border-slate-200 text-[9px] font-black text-slate-700 active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                    Refresh Preview
                </button>
            </div>

            {/* Compiled Preview Iframe */}
            <div className="flex-1 w-full h-full bg-white relative">
                <iframe
                    key={reloadKey}
                    ref={iframeRef}
                    title="Axiom VFS Compiler Sandbox"
                    srcDoc={compileVFS()}
                    className="w-full h-full border-none bg-white"
                    sandbox="allow-scripts"
                />
            </div>
        </div>
    );
}
