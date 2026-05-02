'use client';

import { cn } from "@/lib/utils";

interface MayaOrbProps {
    onClick: () => void;
    isOpen: boolean;
}

export function MayaOrb({ onClick, isOpen }: MayaOrbProps) {
    if (isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <button
                onClick={onClick}
                className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full",
                    "bg-[var(--color-primary)] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                )}
                type="button"
                aria-label="Open AI assistant"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                    <path d="M12 12L2.1 12.1" />
                    <path d="M12 12L12 22.1" />
                    <path d="M12 12l7.07-7.07" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
            </button>
        </div>
    );
}
