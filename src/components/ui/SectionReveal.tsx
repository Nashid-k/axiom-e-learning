"use client";

import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function SectionReveal({
  children,
  delay = 0,
  className = "",
}: SectionRevealProps) {
  return (
    <div 
      className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
