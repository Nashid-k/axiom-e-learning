'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
    pattern?: string; // Kept for backwards compatibility, but not actively used for structure now
}

export default function BentoGrid({
    children,
    className = ''
}: BentoGridProps) {
    return (
        <div className={cn("bento-grid", className)}>
            {children}
        </div>
    );
}
