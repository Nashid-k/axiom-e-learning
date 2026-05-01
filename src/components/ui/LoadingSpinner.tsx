"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

const sizeMap: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-2",
};

export function LoadingSpinner({
  size = "md",
  label,
  className = "",
  ...rest
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-live="polite"
      aria-label={label ? undefined : "Loading"}
      {...rest}
    >
      <div
        className={cn(
          "rounded-full animate-spin",
          "border-neutral-200 dark:border-neutral-800",
          "border-t-black dark:border-t-white",
          sizeMap[size]
        )}
      />

      {label && (
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
          {label}
        </p>
      )}
      {!label && <span className="sr-only">Loading</span>}
    </div>
  );
}

export default LoadingSpinner;
