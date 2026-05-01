'use client';

import { Button } from '@/components/ui/Button';

interface AppErrorProps {
    error: Error;
    reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-black">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm font-mono bg-neutral-50 dark:bg-neutral-900 p-4 border border-neutral-200 dark:border-neutral-800 rounded-md">
                {error.message || "An unexpected error occurred."}
            </p>
            <Button onClick={reset} variant="primary">
                Try Again
            </Button>
        </div>
    );
}
