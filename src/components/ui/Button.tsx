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
      primary: "bg-gradient-to-r from-[#6366f1] to-[#06b6d4] text-white font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-[0.97] transition-all",
      secondary: "bg-[var(--surface-raised)] text-[var(--fg-primary)] hover:bg-[var(--surface-border)] border border-[var(--surface-border)] hover:border-[var(--color-primary)]/40 active:scale-[0.97] transition-all",
      outline: "border border-[var(--surface-border)] text-[var(--fg-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 active:scale-[0.97] hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all",
      ghost: "text-[var(--fg-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-raised)] active:scale-[0.97] transition-all",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded-md",
      md: "px-6 py-3 text-sm rounded-md",
      lg: "px-8 py-4 text-base rounded-md font-bold tracking-tight",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold transition-all duration-150 ease-out select-none cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
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
        <span className="relative z-10 flex items-center gap-1.5">{children as React.ReactNode}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
