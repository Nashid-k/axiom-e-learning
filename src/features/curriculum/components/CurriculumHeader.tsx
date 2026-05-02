"use client";

import { CategoryIcon } from '@/features/curriculum/components/CategoryIcon';
import { motion } from 'framer-motion';

interface CurriculumHeaderProps {
    categorySlug: string;
    curriculumTitle: string;
    description: string;
}

export function CurriculumHeader({ categorySlug, curriculumTitle, description }: CurriculumHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-brand/20 blur-2xl rounded-full" />
                <div className="relative glass-card p-5 rounded-3xl group">
                    <CategoryIcon 
                        category={categorySlug} 
                        className="w-16 h-16 md:w-20 md:h-20 shrink-0 group-hover:scale-110 transition-transform duration-500" 
                    />
                </div>
            </motion.div>

            <div className="max-w-3xl">
                <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]"
                >
                    {curriculumTitle}
                </motion.h1>
                <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-fg-secondary text-lg md:text-xl leading-relaxed font-medium opacity-80"
                >
                    {description || "Master this technology path with our AI-driven specialized curriculum."}
                </motion.p>
            </div>
        </div>
    );
}
