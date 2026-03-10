'use client';

import { motion } from 'framer-motion';

interface MayaOrbProps {
    onClick: () => void;
    isOpen: boolean;
    shouldReduceMotion: boolean;
}

export function MayaOrb({ onClick, isOpen, shouldReduceMotion }: MayaOrbProps) {
    if (isOpen) return null;

    return (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
            <button
                onClick={onClick}
                className="group relative flex items-center justify-center cursor-pointer"
                type="button"
                aria-label="Open Maya assistant"
            >
                {/* Background Glow */}
                <div
                    className="absolute -inset-6 rounded-full bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform-gpu"
                />

                {/* The Orb */}
                <div className="relative w-16 h-16 rounded-full bg-[var(--surface-raised)] dark:bg-[#0D0D0E]/80 backdrop-blur-3xl border border-[var(--border-default)] dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-[var(--border-strong)] transform-gpu group-active:scale-95">

                    {/* Living Gradient - Swirled with CSS for performance */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-emerald-500/30 animate-spin-slow-custom opacity-70" />

                    {/* Inner Core */}
                    <div className="relative z-10 flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center shadow-inner ring-1 ring-white/20">
                            <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20 opacity-50" />
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-md">
                                <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                </div>
            </button>
        </div>
    );
}
