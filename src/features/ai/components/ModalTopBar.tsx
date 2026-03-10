'use client';

import { ModalCloseButton } from '@/components/ui/ModalShell';

interface ModalTopBarProps {
    category: string;
    onClose: () => void;
}

export function ModalTopBar({ category, onClose }: ModalTopBarProps) {
    return (
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20 pointer-events-none transform-gpu translate-z-0">
            <div className="pointer-events-auto">
                <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-white/5 backdrop-blur-sm transform-gpu border border-black/5 dark:border-white/10 px-4 py-1.5 rounded-full shadow-sm">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">{category}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 pointer-events-auto">
                <ModalCloseButton
                    onClose={onClose}
                    className="w-10 h-10 shadow-lg backdrop-blur-sm transform-gpu bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10"
                />
            </div>
        </div>
    );
}
