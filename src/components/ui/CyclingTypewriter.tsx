'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';

interface CyclingTypewriterProps {
    messages: string[];
    className?: string;
}

export function CyclingTypewriter({ messages, className }: CyclingTypewriterProps) {
    const shouldReduceMotion = useReducedMotion();
    const [index, setIndex] = React.useState(0);
    const [subIndex, setSubIndex] = React.useState(0);
    const [reverse, setReverse] = React.useState(false);
    const [blink, setBlink] = React.useState(true);

    React.useEffect(() => {
        if (shouldReduceMotion) return;
        const timeout2 = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout2);
    }, [shouldReduceMotion]);

    React.useEffect(() => {
        if (shouldReduceMotion) return;
        if (subIndex === messages[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % messages.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 30 : subIndex === messages[index].length ? 2000 : 50, Math.random() * 30)); 

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, messages, shouldReduceMotion]);

    if (shouldReduceMotion) {
        return (
            <span className={`inline-block ${className || ""}`}>
                {messages[0]}
            </span>
        );
    }

    return (
        <span className={`inline-block min-h-[1.5em] ${className || ""}`}>
            {`${messages[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </span>
    );
}
