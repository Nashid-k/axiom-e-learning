'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

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
    const baseStyles = [
        "inline-flex items-center justify-center",
        "font-semibold",
        "rounded-md",
        "transition-none",
        "focus:outline-none",
        "focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        "disabled:opacity-50",
        "disabled:pointer-events-none",
        "border",
    ].join(' ');

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary: [
            "bg-black text-white border-black",
            "hover:bg-neutral-800 hover:border-neutral-800",
            "dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200",
        ].join(' '),

        secondary: [
            "bg-neutral-100 text-black border-neutral-100",
            "hover:bg-neutral-200 hover:border-neutral-200",
            "dark:bg-neutral-800 dark:text-white dark:border-neutral-800 dark:hover:bg-neutral-700",
        ].join(' '),

        outline: [
            "border-neutral-200 bg-transparent text-black",
            "hover:bg-neutral-50",
            "dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900",
        ].join(' '),

        ghost: [
            "bg-transparent text-neutral-600 border-transparent",
            "hover:bg-neutral-100 hover:text-black",
            "dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
        ].join(' '),

        destruct: [
            "bg-red-600 text-white border-red-600",
            "hover:bg-red-700 hover:border-red-700",
        ].join(' '),
    };

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
        sm: "h-8 px-3 text-sm gap-2",
        md: "h-10 px-4 text-base gap-2",
        lg: "h-12 px-6 text-lg gap-3",
    };

    return (
        <button
            ref={ref}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
