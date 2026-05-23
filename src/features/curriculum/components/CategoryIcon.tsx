import React from 'react';
import { TechIcon } from '@/components/ui/TechIcon';
import { cn } from '@/lib/utils';

interface CategoryIconProps {
    category: string;
    className?: string;
}

export const CategoryIcon = ({ category, className = "w-12 h-12" }: CategoryIconProps) => {
    return (
        <div className={cn("relative flex items-center justify-center shrink-0", className)}>
            <TechIcon name={category.toLowerCase()} className="w-full h-full" />
        </div>
    );
};
