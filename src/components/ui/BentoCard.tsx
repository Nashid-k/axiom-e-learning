'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type BentoCardSize = 'small' | 'medium' | 'large' | 'wide' | 'tall';
export type BentoCardVariant = 'default' | 'feature' | 'stat' | 'media';

interface BentoCardProps {
    children: ReactNode;
    size?: BentoCardSize;
    variant?: BentoCardVariant;
    className?: string;
    onClick?: () => void;
    href?: string;
    noPadding?: boolean;
}

const paddingMap: Record<BentoCardVariant | 'none', string> = {
    default: "p-[var(--space-3)]",
    feature: "p-[var(--space-3)] md:p-[var(--space-4)]",
    stat: "p-[var(--space-2)] md:p-[var(--space-3)]",
    media: "p-0 overflow-hidden",
    none: "p-0",
};

const sizeMap: Record<BentoCardSize, string> = {
    small: "min-h-[180px] md:min-h-[200px]",
    medium: "min-h-[320px] md:min-h-[400px]",
    large: "min-h-[380px] md:min-h-[450px]",
    wide: "col-span-1 md:col-span-2 min-h-[320px] md:min-h-[400px]",
    tall: "row-span-2 min-h-[700px] md:min-h-[850px]",
};

export default function BentoCard({
    children,
    size = 'medium',
    variant = 'default',
    className = '',
    onClick,
    href,
    noPadding = false,
}: BentoCardProps) {
    const shouldReduceMotion = useReducedMotion();

    const hoverAnimation: import('framer-motion').TargetAndTransition = shouldReduceMotion
        ? { opacity: 0.9, transition: { duration: 0.2 } }
        : {
            y: -10,
            scale: 1.02,
            boxShadow: "var(--shadow-xl)",
            transition: { type: 'spring', stiffness: 200, damping: 18, mass: 0.8 },
        };

    const Component = href ? 'a' : 'div';
    const linkProps = href ? { href } : {};

    return (
        <Component {...linkProps} className={cn("block h-full w-full outline-none", className)}>
            <motion.div
                className={cn(
                    "group relative h-full w-full overflow-hidden",
                    "rounded-[var(--radius-2xl)]",
                    "bg-[var(--surface-raised)]",
                    "border border-[var(--border-default)]",
                    "dark:glass-card",
                    "transition-all duration-[var(--duration-slow)]",
                    "hover:border-[var(--border-strong)]",
                    "focus-ring", // High-visibility focus state
                    noPadding ? paddingMap.none : paddingMap[variant],
                    sizeMap[size],
                    className
                )}
                style={{ willChange: 'transform, opacity' }}
                whileHover={hoverAnimation}
                whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
                onClick={onClick}
                tabIndex={onClick || href ? 0 : -1}
            >
                <div className="absolute inset-0 rounded-[var(--radius-2xl)] border border-white/[0.04] pointer-events-none" />

                <div className="relative z-10 h-full">
                    {children}
                </div>
            </motion.div>
        </Component>
    );
}