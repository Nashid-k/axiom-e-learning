'use client';

import { useState, useEffect } from 'react';
import { AIExplanationView } from '@/features/ai/components/AIExplanationView';

interface TypewriterProps {
    content?: string;
    text?: string;
    delay?: number;
    cursor?: boolean;
    hideContainer?: boolean;
}

export const Typewriter = ({ content, text, delay, hideContainer = false }: TypewriterProps) => {
    const targetContent = content || text || '';
    const [displayedContent, setDisplayedContent] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => setDisplayedContent(''), 0);
        return () => clearTimeout(timeout);
    }, [targetContent]);

    useEffect(() => {
        if (displayedContent.length < targetContent.length) {
            const timeout = setTimeout(() => {
                setDisplayedContent(targetContent.slice(0, displayedContent.length + 1));
            }, delay ?? 25);
            return () => clearTimeout(timeout);
        }
    }, [targetContent, displayedContent, delay]);

    if (hideContainer) {
        return <>{displayedContent}</>;
    }

    return (
        <AIExplanationView
            content={displayedContent}
            loading={false}
            error={null}
            onRegenerate={() => { }}
        />
    );
};
