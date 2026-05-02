"use client";

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    icon,
    className,
    action
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-16 text-center glass-card rounded-[40px] relative overflow-hidden",
            className
        )}>
            <div className="absolute inset-0 bg-brand/5 -z-10" />
            
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 rounded-3xl bg-brand-soft/30 border border-brand/20 flex items-center justify-center mb-10 text-4xl shadow-xl shadow-brand/10"
            >
                {icon || "🔍"}
            </motion.div>

            <h3 className="text-3xl font-black tracking-tighter mb-4 text-fg-primary">
                {title}
            </h3>

            {description && (
                <p className="text-lg text-fg-secondary max-w-sm mb-12 font-medium leading-relaxed opacity-80">
                    {description}
                </p>
            )}

            {action && (
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {action}
                </motion.div>
            )}
        </div>
    );
}
