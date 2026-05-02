'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type GridPattern = 'asymmetric' | 'masonry' | 'uniform' | 'featured';
export type CellSpan = '1x1' | '1x2' | '2x1' | '2x2' | '1x3' | '3x1';

interface BentoGridProps {
    children: ReactNode;
    pattern?: GridPattern;
    className?: string;
}

export default function BentoGrid({
    children,
    pattern = 'uniform',
    className = ''
}: BentoGridProps) {
    const baseClasses = 'grid w-full gap-4';

    const colClasses: Record<GridPattern, string> = {
        asymmetric: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        masonry: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        featured: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        uniform: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    };

    return (
        <div className={cn(baseClasses, colClasses[pattern], className)}>
            {children}
        </div>
    );
}

interface BentoGridItemProps {
    children: ReactNode;
    span?: CellSpan;
    className?: string;
}

export function BentoGridItem({ children, span = '1x1', className = '' }: BentoGridItemProps) {
    const spanClasses: Record<CellSpan, string> = {
        '1x1': 'md:col-span-1 md:row-span-1',
        '2x1': 'md:col-span-2 md:row-span-1',
        '1x2': 'md:col-span-1 md:row-span-2',
        '2x2': 'md:col-span-2 md:row-span-2',
        '1x3': 'md:col-span-1 md:row-span-3',
        '3x1': 'md:col-span-3 md:row-span-1',
    };

    return (
        <div className={cn(spanClasses[span], className)}>
            {children}
        </div>
    );
}
