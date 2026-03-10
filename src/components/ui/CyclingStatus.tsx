"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
    const previousLoadingRef = useRef(loading);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        if (loading && !previousLoadingRef.current) {
            timeoutId = setTimeout(() => setIndex(0), 0);
        }
        previousLoadingRef.current = loading;

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [loading]);

    useEffect(() => {
        if (!loading || shouldReduceMotion) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % (messages?.length || 1));
        }, 2000);

        return () => clearInterval(interval);
    }, [loading, messages?.length, shouldReduceMotion]);

    if (!loading) return null;

    return (
        <div className={`grid place-items-center ${className}`}>
            <AnimatePresence mode="popLayout">
                <motion.p
                    key={index}
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="col-start-1 row-start-1 text-center"
                >
                    {messages[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}
