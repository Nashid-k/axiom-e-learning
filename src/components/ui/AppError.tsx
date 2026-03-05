'use client';

import { Button } from '@/components/ui/Button';

interface AppErrorProps {
    error: Error;
    reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
    return (
        <div className={[
            "min-h-[400px] flex flex-col items-center justify-center",
            "p-[var(--space-4)] text-center",
            "glass-card",
            "rounded-[var(--radius-2xl)]",
            "border border-[var(--border-default)]",
        ].join(' ')}>
            <div className="w-16 h-16 bg-[var(--color-destruct)]/10 rounded-[var(--radius-full)] flex items-center justify-center mb-[var(--space-2)]">
                <svg className="w-8 h-8 text-[var(--color-destruct)]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-[var(--text-heading)] font-[var(--font-weight-bold)] mb-[var(--space-1)] text-[var(--fg-primary)]">
                System Breach
            </h2>
            <p className={[
                "text-[var(--fg-muted)] mb-[var(--space-4)] max-w-sm break-words",
                "font-mono text-[var(--text-caption)]",
                "bg-[var(--surface-overlay)] p-[var(--space-2)] rounded-[var(--radius-lg)]",
                "border border-[var(--border-default)]",
            ].join(' ')}>
                {error.message || "An unexpected disturbance occurred in the system."}
            </p>
            <Button onClick={reset} size="lg">
                Initialize Recovery
            </Button>
        </div>
    );
}
