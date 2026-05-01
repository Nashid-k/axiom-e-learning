'use client';

interface MayaOrbProps {
    onClick: () => void;
    isOpen: boolean;
}

export function MayaOrb({ onClick, isOpen }: MayaOrbProps) {
    if (isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={onClick}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black border border-neutral-200 dark:border-neutral-800 shadow-none hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-none"
                type="button"
                aria-label="Open AI assistant"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </button>
        </div>
    );
}
