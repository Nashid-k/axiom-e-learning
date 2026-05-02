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
    small: "col-span-12 md:col-span-4 min-h-[160px]",
    medium: "col-span-12 md:col-span-6 min-h-[300px]",
    large: "col-span-12 md:col-span-8 min-h-[400px]",
    wide: "col-span-12 md:col-span-8 min-h-[300px]",
    tall: "col-span-12 md:col-span-4 md:row-span-2 min-h-[600px]",
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
                "bento-card block w-full h-full cursor-default",
                sizeMap[size],
                !noPadding ? "p-6" : "p-0",
                (onClick || href) && "cursor-pointer",
                className
            )}
        >
            <div className="h-full">
                {children}
            </div>
        </Component>
    );
}
