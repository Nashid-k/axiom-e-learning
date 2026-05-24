'use client';

import { useState, useEffect } from 'react';
import { VFS } from '../types/vfs-types';
import { getSpecSuiteForLanguage, SpecResult } from './evaluator-templates';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface TestPanelProps {
    files: VFS;
    language: string;
    onConsoleLog: (text: string) => void;
}

export function TestPanel({
    files,
    language,
    onConsoleLog
}: TestPanelProps) {
    const [specs, setSpecs] = useState<SpecResult[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const testSuite = getSpecSuiteForLanguage(language);

    // Sync specs list when active suite changes
    useEffect(() => {
        setSpecs(
            testSuite.map(test => ({
                id: test.id,
                description: test.description,
                status: 'idle'
            }))
        );
    }, [language, testSuite]);

    const runTestSuite = async () => {
        if (testSuite.length === 0 || isRunning) return;
        
        setIsRunning(true);
        onConsoleLog('\n> Starting automated unit execution checks...');

        // Query compiled iframe dynamically from document
        const iframe = document.querySelector(
            'iframe[title="Axiom VFS Compiler Sandbox"]'
        ) as HTMLIFrameElement | null;

        const results: SpecResult[] = [...specs];

        for (let i = 0; i < testSuite.length; i++) {
            const spec = testSuite[i];
            
            // Mark as running in UI
            setSpecs(prev => prev.map(s => s.id === spec.id ? { ...s, status: 'running' } : s));
            await new Promise(resolve => setTimeout(resolve, 300)); // micro delay for high-end feel

            try {
                const check = await spec.assert(files, iframe);
                
                results[i] = {
                    id: spec.id,
                    description: spec.description,
                    status: check.success ? 'passed' : 'failed',
                    message: check.message
                };

                onConsoleLog(
                    check.success 
                        ? `✓ [PASS] ${spec.description}` 
                        : `✗ [FAIL] ${spec.description}: ${check.message || ''}`
                );

            } catch (err: any) {
                results[i] = {
                    id: spec.id,
                    description: spec.description,
                    status: 'failed',
                    message: err.message || 'Execution error.'
                };
                onConsoleLog(`✗ [FAIL] ${spec.description}: Runtime exception encountered.`);
            }

            // Sync single update to state
            setSpecs([...results]);
        }

        const allPassed = results.every(s => s.status === 'passed');
        setIsRunning(false);

        if (allPassed) {
            onConsoleLog('🎉 All test conditions synchronized successfully! Matrix COMPLETE.');
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#0a84ff', '#64d2ff', '#30d158']
            });
        } else {
            onConsoleLog('⚠️ Some test conditions failed. Refactor your code and run again.');
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#030406]/95 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative font-sans text-xs">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 cyber-grid-bg opacity-[0.02] pointer-events-none" />

            {/* Panel Header */}
            <div className="px-4 py-3 bg-white/[0.01] border-b border-white/5 flex justify-between items-center select-none shrink-0 relative z-10">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">Test Suite</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-[var(--fg-secondary)]">
                        {specs.length} spec(s)
                    </span>
                </div>
                {specs.length > 0 && (
                    <Button
                        onClick={runTestSuite}
                        loading={isRunning}
                        size="sm"
                        className="h-7 text-[9px] uppercase tracking-widest bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-lg"
                    >
                        Run Specs
                    </Button>
                )}
            </div>

            {/* Test Spec List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar relative z-10">
                {specs.map((spec) => (
                    <div 
                        key={spec.id}
                        className="p-3 border border-white/5 rounded-lg bg-white/[0.01] flex items-start justify-between gap-4 group hover:border-white/10 transition-colors"
                    >
                        <div className="space-y-1 min-w-0">
                            <h4 className="font-semibold text-white tracking-wide truncate">{spec.description}</h4>
                            {spec.message && (
                                <p className="text-[10px] text-[var(--fg-secondary)] font-mono leading-relaxed">
                                    {spec.message}
                                </p>
                            )}
                        </div>

                        {/* Status Badges */}
                        <div className="shrink-0 pt-0.5 select-none">
                            {spec.status === 'idle' && (
                                <span className="px-2 py-1 rounded bg-white/5 text-[9px] font-black uppercase text-[var(--fg-secondary)] tracking-wider">
                                    Waiting
                                </span>
                            )}
                            {spec.status === 'running' && (
                                <span className="px-2 py-1 rounded bg-[var(--color-primary-glow)] text-[var(--color-primary)] text-[9px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1 border border-[var(--color-primary)]/15">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-ping" />
                                    Testing
                                </span>
                            )}
                            {spec.status === 'passed' && (
                                <span className="px-2 py-1 rounded bg-[var(--color-success-glow)] text-[var(--color-success)] text-[9px] font-black uppercase tracking-wider border border-[var(--color-success)]/15 shadow-[0_0_8px_rgba(48,209,88,0.1)]">
                                    Pass
                                </span>
                            )}
                            {spec.status === 'failed' && (
                                <span className="px-2 py-1 rounded bg-red-950/20 text-[var(--color-destruct)] text-[9px] font-black uppercase tracking-wider border border-[var(--color-destruct)]/15">
                                    Fail
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {specs.length === 0 && (
                    <div className="text-center py-12 text-[var(--fg-secondary)] italic opacity-60">
                        No automated test specs defined<br/>for language: {language}.
                    </div>
                )}
            </div>
        </div>
    );
}
