"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_MESSAGES = [
    "Consulting the archives...",
    "Analyzing context...",
    "Synthesizing knowledge...",
    "Formulating response...",
    "Double checking logic...",
    "Applying best practices..."
];

interface CyclingStatusProps {
    loading: boolean;
    messages?: string[];
    className?: string;
}

export function CyclingStatus({ loading, messages = DEFAULT_MESSAGES, className = "" }: CyclingStatusProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!loading) {
            setIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [loading, messages.length]);

    if (!loading) return null;

    return (
        <div className={cn("text-xs font-bold uppercase tracking-widest text-neutral-400", className)}>
            {messages[index]}
        </div>
    );
}
