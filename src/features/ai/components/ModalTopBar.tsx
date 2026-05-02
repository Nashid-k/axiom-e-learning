'use client';

import { ModalCloseButton } from '@/components/ui/ModalShell';

interface ModalTopBarProps {
    category: string;
    onClose: () => void;
}

export function ModalTopBar({ category, onClose }: ModalTopBarProps) {
    return (
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
            <div className="pointer-events-auto">
                <div className="bg-[var(--surface-base)] border border-[var(--surface-border)] px-3 py-1 rounded-md">
                    <span className="text-[10px] text-[var(--fg-muted)] font-bold uppercase tracking-widest">{category}</span>
                </div>
            </div>
            <div className="pointer-events-auto">
                <ModalCloseButton
                    onClose={onClose}
                    className="w-8 h-8 bg-[var(--surface-base)] border border-[var(--surface-border)] rounded-md"
                />
            </div>
        </div>
    );
}
