'use client';

import { ReactNode, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type BentoCardSize = 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'auto';

interface BentoCardProps {
    children: ReactNode;
    size?: BentoCardSize;
    className?: string;
    onClick?: () => void;
    href?: string;
    noPadding?: boolean;
    style?: React.CSSProperties;
}

const sizeMap: Record<BentoCardSize, string> = {
    small: "col-span-12 md:col-span-4 min-h-[160px]",
    medium: "col-span-12 md:col-span-6 min-h-[300px]",
    large: "col-span-12 md:col-span-8 min-h-[400px]",
    wide: "col-span-12 md:col-span-8 min-h-[300px]",
    tall: "col-span-12 md:col-span-4 md:row-span-2 min-h-[600px]",
    auto: "min-h-[300px]",
};

export default function BentoCard({
    children,
    size = 'medium',
    className = '',
    onClick,
    href,
    noPadding = false,
    style,
}: BentoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        const element = e.currentTarget;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    };

    if (href) {
        return (
            <Link
                ref={linkRef}
                href={href}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                className={cn(
                    "bento-card spotlight-card block w-full h-full cursor-pointer transition-all duration-500 ease-out active:scale-[0.98] active:translate-y-[1px]",
                    sizeMap[size],
                    !noPadding ? "p-6" : "p-0",
                    className
                )}
                style={style}
            >
                <div className="h-full relative z-10">
                    {children}
                </div>
            </Link>
        );
    }
    
    return (
        <div 
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className={cn(
                "bento-card spotlight-card block w-full h-full cursor-default transition-all duration-500 ease-out",
                sizeMap[size],
                !noPadding ? "p-6" : "p-0",
                onClick && "cursor-pointer active:scale-[0.98] active:translate-y-[1px]",
                className
            )}
            style={style}
        >
            <div className="h-full relative z-10">
                {children}
            </div>
        </div>
    );
}
