'use client';

import { cn } from "@/lib/utils";

interface MayaOrbProps {
    onClick: () => void;
    isOpen: boolean;
}

export function MayaOrb({ onClick, isOpen }: MayaOrbProps) {
    if (isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-float-slow">
            {/* Ambient background glows */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full blur-md opacity-50 scale-110 animate-pulse pointer-events-none" />
            <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-xl opacity-20 scale-150 animate-pulse pointer-events-none" />

            <button
                onClick={onClick}
                className={cn(
                    "relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer",
                    "border border-white/20 bg-black/80 text-white shadow-2xl transition-all duration-300",
                    "hover:scale-110 hover:border-[var(--color-cyan)] active:scale-95 group"
                )}
                type="button"
                aria-label="Open AI assistant"
            >
                {/* 3D rotating rings around the orb */}
                <div className="absolute inset-0.5 rounded-full border border-dashed border-[var(--color-cyan)]/35 animate-[spin_8s_linear_infinite] pointer-events-none" />
                <div className="absolute inset-1.5 rounded-full border border-dotted border-[var(--color-accent)]/20 animate-[spin_5s_linear_infinite_reverse] pointer-events-none" />
                
                {/* Glowing inner core */}
                <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff] group-hover:scale-150 transition-transform duration-300" />
                
                {/* Breathing kinetic AI soundwave bars */}
                <div className="flex items-center gap-1">
                    <div className="w-[2.5px] h-3.5 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_alternate]" />
                    <div className="w-[2.5px] h-5 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_alternate_0.15s]" />
                    <div className="w-[2.5px] h-6.5 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_alternate_0.3s]" />
                    <div className="w-[2.5px] h-5 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_alternate_0.15s]" />
                    <div className="w-[2.5px] h-3.5 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-cyan)] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_alternate]" />
                </div>
            </button>
        </div>
    );
}
