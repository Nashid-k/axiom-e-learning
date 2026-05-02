'use client';

import { AIExplanationView } from '@/features/ai/components/AIExplanationView';

interface TypewriterProps {
    content?: string;
    text?: string;
    delay?: number;
    cursor?: boolean;
    hideContainer?: boolean;
}

export const Typewriter = ({ content, text, hideContainer = false }: TypewriterProps) => {
    const targetContent = content || text || '';

    if (hideContainer) {
        return <>{targetContent}</>;
    }

    return (
        <AIExplanationView
            content={targetContent}
            loading={false}
            error={null}
            onRegenerate={() => { }}
        />
    );
};
