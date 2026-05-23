import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-[var(--color-primary)] text-white hover:opacity-90 shadow-sm",
      secondary: "bg-[var(--surface-raised)] text-[var(--fg-primary)] hover:bg-[var(--surface-border)] border border-[var(--surface-border)]",
      outline: "border border-[var(--surface-border)] text-[var(--fg-primary)] hover:border-[var(--color-primary)] bg-transparent",
      ghost: "text-[var(--fg-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-raised)]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
          variants[variant],
          sizes[size],
          loading && "opacity-80 pointer-events-none",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        <span className="relative z-10">{children as React.ReactNode}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
