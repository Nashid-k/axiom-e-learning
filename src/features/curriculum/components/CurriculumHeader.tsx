import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';

interface CurriculumHeaderProps {
    categorySlug: string;
    curriculumTitle: string;
    description: string;
}

export function CurriculumHeader({ categorySlug, curriculumTitle, description }: CurriculumHeaderProps) {
    return (
        <div className="flex items-start gap-4 md:gap-6">
            <CategoryIcon category={categorySlug} className="w-12 h-12 md:w-16 md:h-16 shrink-0 grayscale dark:invert" />
            <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{curriculumTitle}</h1>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl text-base md:text-lg leading-relaxed">
                    {description || ""}
                </p>
            </div>
        </div>
    );
}
