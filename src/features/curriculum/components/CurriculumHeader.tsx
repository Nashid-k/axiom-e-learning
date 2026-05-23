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
                <div className="absolute inset-0 bg-[var(--color-primary)]/10 blur-2xl rounded-2xl" />
                <div className="relative bg-gradient-to-br from-[var(--surface-raised)] to-transparent border border-white/10 rounded-2xl p-6 group hover:border-[var(--color-primary)]/40 transition-colors duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                    <CategoryIcon 
                        category={categorySlug} 
                        className="w-16 h-16 md:w-20 md:h-20 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" 
                    />
                </div>
            </div>

            <div className="max-w-3xl">
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-cyan)] mb-3">
                    SYLLABUS MATRIX ARCHIVE
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-[1.1] text-gradient-primary">
                    {curriculumTitle}
                </h1>
                <p className="text-[var(--fg-secondary)] text-base md:text-lg leading-relaxed font-semibold opacity-90 max-w-2xl">
                    {description || "Master this technology path with our AI-driven specialized curriculum."}
                </p>
            </div>
        </div>
    );
}

