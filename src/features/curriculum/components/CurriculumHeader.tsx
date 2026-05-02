"use client";

import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';

interface CurriculumHeaderProps {
    categorySlug: string;
    curriculumTitle: string;
    description: string;
}

export function CurriculumHeader({ categorySlug, curriculumTitle, description }: CurriculumHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">
            <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-2xl rounded-md" />
                <div className="relative bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-md p-5 group">
                    <CategoryIcon 
                        category={categorySlug} 
                        className="w-16 h-16 md:w-20 md:h-20 shrink-0 group-hover:scale-110 transition-transform duration-500" 
                    />
                </div>
            </div>

            <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1] text-[var(--fg-primary)]">
                    {curriculumTitle}
                </h1>
                <p className="text-[var(--fg-secondary)] text-lg md:text-xl leading-relaxed font-medium opacity-80">
                    {description || "Master this technology path with our AI-driven specialized curriculum."}
                </p>
            </div>
        </div>
    );
}
