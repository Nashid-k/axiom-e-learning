import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';

interface CurriculumHeaderProps {
    categorySlug: string;
    curriculumTitle: string;
    description: string;
    info: {
        color: string;
        grade: string;
        quote: string;
        character: string;
    };
}

export function CurriculumHeader({ categorySlug, curriculumTitle, description, info }: CurriculumHeaderProps) {
    return (
        <div className="flex items-start gap-6">
            <CategoryIcon category={categorySlug} className="w-16 h-16 shrink-0" />
            <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{curriculumTitle}</h1>
                <p className="text-gray-600 dark:text-white/60 max-w-2xl text-base md:text-lg leading-relaxed transition-colors">
                    {description || ""}
                </p>

                <div className={`mt-5 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] ${info.color} transition-colors`}>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">{info.grade}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/20" />
                    <span className="text-xs opacity-70 italic">&quot;{info.quote}&quot;</span>
                    <span className="text-[11px] opacity-50 ml-1">— {info.character}</span>
                </div>
            </div>
        </div>
    );
}
