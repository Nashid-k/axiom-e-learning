'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/motion/motion-config';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destruct';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    disabled,
    ...props
}, ref) => {
    const shouldReduceMotion = useReducedMotion();

    const baseStyles = [
        "inline-flex items-center justify-center",
        "font-[var(--font-weight-semibold)]",
        "rounded-[var(--radius-full)]",
        "min-w-[44px]",
        "transition-colors",
        "transition-shadow",
        "duration-[var(--duration-base)]",
        "focus:outline-none",
        "disabled:opacity-50",
        "disabled:pointer-events-none",
    ].join(' ');

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary: [
            "bg-[var(--color-500)] text-white",
            "hover:bg-[var(--color-600)]",
            "shadow-[var(--shadow-sm)]",
            "dark:bg-[var(--color-500)] dark:text-white dark:hover:bg-[var(--color-600)]",
        ].join(' '),

        secondary: [
            "bg-[var(--color-100)] text-[var(--fg-primary)]",
            "hover:bg-[var(--color-200)]",
            "dark:bg-[var(--surface-overlay)] dark:text-[var(--fg-primary)] dark:hover:bg-[var(--border-default)]",
        ].join(' '),

        outline: [
            "border border-[var(--border-default)] bg-transparent text-[var(--fg-primary)]",
            "hover:bg-[var(--color-50)] hover:border-[var(--border-strong)]",
            "dark:border-[var(--border-default)] dark:hover:bg-[var(--surface-overlay)]",
        ].join(' '),

        ghost: [
            "bg-transparent text-[var(--fg-secondary)]",
            "hover:bg-[var(--color-50)] hover:text-[var(--fg-primary)]",
            "dark:hover:bg-[var(--surface-overlay)]",
        ].join(' '),

        destruct: [
            "bg-[var(--color-destruct)] text-white",
            "hover:opacity-90",
            "shadow-[var(--shadow-sm)]",
        ].join(' '),
    };

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
        sm: "h-9  px-[var(--space-2)] text-[var(--text-caption)] gap-[var(--space-1)]",
        md: "h-11 px-[var(--space-3)] text-[var(--text-body)]    gap-[var(--space-1)]",
        lg: "h-13 px-[var(--space-4)] text-[var(--text-body)]    gap-[var(--space-2)]",
    };

    return (
        <motion.button
            ref={ref}
            whileHover={shouldReduceMotion ? undefined : {
                scale: 1.04,
                y: -2,
                transition: springs.snap
            }}
            whileTap={shouldReduceMotion ? undefined : {
                scale: 0.96,
                y: 1,
                transition: springs.snap
            }}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                "relative overflow-hidden group",
                className
            )}
            disabled={disabled || isLoading}
            {...(props as HTMLMotionProps<"button">)}
        >
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-700 ease-in-out" />
            </div>

            <div className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                    <div className="mr-[var(--space-1)] h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </div>
        </motion.button>
    );
});

Button.displayName = "Button";

export { Button };