'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BentoCardSize = 'small' | 'medium' | 'large' | 'wide' | 'tall';

interface BentoCardProps {
    children: ReactNode;
    size?: BentoCardSize;
    className?: string;
    onClick?: () => void;
    href?: string;
    noPadding?: boolean;
}

const sizeMap: Record<BentoCardSize, string> = {
    small: "min-h-[160px]",
    medium: "min-h-[300px]",
    large: "min-h-[400px]",
    wide: "md:col-span-2 min-h-[300px]",
    tall: "md:row-span-2 min-h-[600px]",
};

export default function BentoCard({
    children,
    size = 'medium',
    className = '',
    onClick,
    href,
    noPadding = false,
}: BentoCardProps) {
    const Component = href ? 'a' : 'div';
    
    return (
        <Component 
            href={href}
            onClick={onClick}
            className={cn(
                "block h-full w-full",
                "bg-white dark:bg-black",
                "border border-neutral-200 dark:border-neutral-800",
                "rounded-md",
                "transition-none",
                !noPadding && "p-6",
                sizeMap[size],
                (onClick || href) && "cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600",
                className
            )}
        >
            <div className="h-full">
                {children}
            </div>
        </Component>
    );
}
