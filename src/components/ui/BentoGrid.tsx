'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type GridPattern = 'asymmetric' | 'masonry' | 'uniform' | 'featured';
export type CellSpan = '1x1' | '1x2' | '2x1' | '2x2' | '1x3' | '3x1';

interface BentoGridProps {
    children: ReactNode;
    pattern?: GridPattern;
    className?: string;
    staggerDelay?: number;
}

export default function BentoGrid({
    children,
    pattern = 'uniform',
    staggerDelay = 0.05,
    className = ''
}: BentoGridProps) {
    const baseClasses = 'grid auto-rows-fr w-full';
    const gapClasses = 'gap-[var(--space-2)] md:gap-[var(--space-3)]';

    const colClasses: Record<GridPattern, string> = {
        asymmetric: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        masonry: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto',
        featured: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
        uniform: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
    };

    return (
        <motion.div
            className={`${baseClasses} ${gapClasses} ${colClasses[pattern]} ${className}`}
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: staggerDelay } }
            }}
        >
            {children}
        </motion.div>
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
        <motion.div
            className={`${spanClasses[span]} ${className}`}
            variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
            }}
        >
            {children}
        </motion.div>
    );
}
