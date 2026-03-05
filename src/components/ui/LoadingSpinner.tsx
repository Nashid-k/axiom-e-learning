"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
} & HTMLAttributes<HTMLDivElement>;
const sizeMap: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "w-5  h-5  border-2",
  md: "w-8  h-8  border-[3px]",
  lg: "w-12 h-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  label,
  className = "",
  ...rest
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-[var(--space-1)]", className)}
      {...rest}
    >
      <div className="relative">
        <div
          className={cn(
            "rounded-full animate-spin",
            "border-t-[var(--color-500)]",
            "border-l-transparent",
            "border-r-transparent",
            "border-b-[var(--color-comp-400)]",
            sizeMap[size]
          )}
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute inset-1 rounded-full bg-[var(--surface-base)] blur-[2px] transition-colors"
        />
      </div>

      {label && (
        <p
          className={cn(
            "text-[var(--text-caption)]",
            "font-[var(--font-weight-medium)]",
            "text-[var(--fg-muted)]",
            "tracking-[var(--tracking-wide)]",
            "uppercase",
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
