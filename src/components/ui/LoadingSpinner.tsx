"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

const sizeMap = {
  sm: 16,
  md: 32,
  lg: 48,
};

export function LoadingSpinner({
  size = "md",
  label,
  className = "",
  ...rest
}: LoadingSpinnerProps) {
  const pixelSize = sizeMap[size];

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      {...rest}
    >
      <div 
        className={cn(
          "rounded-full border-[3px] border-[var(--surface-border)] border-t-[var(--color-primary)] animate-spin"
        )}
        style={{ width: pixelSize, height: pixelSize }}
      />

      {label && (
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
          {label}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
