'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CyclingTypewriterProps {
    messages: string[];
    className?: string;
}

export function CyclingTypewriter({ messages, className }: CyclingTypewriterProps) {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        if (!messages.length) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [messages.length]);

    if (!messages.length) return null;

    return (
        <span className={cn("inline-block", className)}>
            {messages[index]}
        </span>
    );
}
