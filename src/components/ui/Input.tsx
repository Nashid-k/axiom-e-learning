'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    containerClassName,
    label,
    error,
    id,
    ...props
}, ref) => {
    return (
        <div className={cn("flex flex-col gap-[var(--space-1)] w-full", containerClassName)}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--fg-muted)] px-[var(--space-1)]"
                >
                    {label}
                </label>
            )}

            <div className="relative group">
                <motion.div
                    className="absolute inset-0 rounded-[var(--radius-xl)] bg-[var(--color-500)]/0 blur-md transition-shadow group-focus-within:bg-[var(--color-500)]/5"
                    layoutId={label ? `input-glow-${label}` : undefined}
                />

                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        "relative w-full rounded-[var(--radius-xl)]",
                        "px-[var(--space-3)] py-[var(--space-2)]",
                        "bg-[var(--surface-overlay)]",
                        "border border-[var(--border-default)]",
                        "text-[var(--fg-primary)] text-[var(--text-body)]",
                        "font-[var(--font-weight-medium)]",
                        "placeholder:text-[var(--fg-muted)]/70",
                        "transition-all duration-[var(--duration-base)]",
                        "focus-ring",
                        "hover:border-[var(--border-strong)]",
                        error && "border-[var(--color-destruct)] focus:border-[var(--color-destruct)] focus:ring-[var(--color-destruct)]/20",
                        className
                    )}
                    {...props}
                />
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-[var(--color-destruct)] font-bold px-[var(--space-1)]"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
