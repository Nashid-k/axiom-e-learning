'use client';

import { motion } from "framer-motion";

interface MayaOrbProps {
    onClick: () => void;
    isOpen: boolean;
}

export function MayaOrb({ onClick, isOpen }: MayaOrbProps) {
    if (isOpen) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <motion.button
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClick}
                className="relative flex items-center justify-center w-16 h-16 rounded-2xl glass-card overflow-hidden group shadow-2xl shadow-brand/20"
                type="button"
                aria-label="Open AI assistant"
            >
                {/* Neural Pulsing Background */}
                <motion.div
                    className="absolute inset-0 bg-brand/10"
                    animate={{ 
                        background: [
                            "radial-gradient(circle at center, var(--color-brand) 0%, transparent 70%)",
                            "radial-gradient(circle at center, var(--color-brand) 0%, transparent 100%)",
                            "radial-gradient(circle at center, var(--color-brand) 0%, transparent 70%)"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand group-hover:text-white transition-colors">
                        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                        <path d="M12 12L2.1 12.1" />
                        <path d="M12 12L12 22.1" />
                        <path d="M12 12l7.07-7.07" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                    </svg>
                </div>

                <div className="absolute inset-0 border-2 border-brand/20 rounded-2xl group-hover:border-brand transition-colors" />
            </motion.button>
        </div>
    );
}
