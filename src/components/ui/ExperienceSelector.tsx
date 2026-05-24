"use client";

import { useState, useRef, useEffect } from "react";
import { useExperience, ExperienceLevel } from "@/lib/providers/ExperienceProvider";
import { cn } from "@/lib/utils";

const LEVELS: { value: ExperienceLevel; label: string; icon: string; description: string }[] = [
  { value: "1yoe", label: "1 YOE", icon: "🌱", description: "Foundations & Basics" },
  { value: "2yoe", label: "2 YOE", icon: "🚀", description: "Intermediate Concepts" },
  { value: "3yoe", label: "3 YOE", icon: "⚡", description: "Advanced Patterns" },
  { value: "4yoe", label: "4 YOE", icon: "🏗️", description: "Architecture & Scale" },
  { value: "4+yoe", label: "4+ YOE", icon: "👑", description: "System Design & Mastery" },
];

export function ExperienceSelector() {
  const { experienceLevel, setExperienceLevel } = useExperience();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLevel = LEVELS.find((l) => l.value === experienceLevel) || LEVELS[0];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 group",
          isOpen 
            ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
        )}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-cyan)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <span className="relative z-10 text-base">{currentLevel.icon}</span>
        <span className="relative z-10 text-sm font-semibold tracking-wide text-white">
          {currentLevel.label}
        </span>
        <svg 
          className={cn("w-4 h-4 text-white/50 transition-transform duration-300 relative z-10", isOpen && "rotate-180")} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 p-2 rounded-2xl bg-[var(--surface-raised)] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <div className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider mb-2 px-2 pt-1">
            Target Experience
          </div>
          <div className="space-y-1">
            {LEVELS.map((level) => {
              const isSelected = level.value === experienceLevel;
              return (
                <button
                  key={level.value}
                  onClick={() => {
                    setExperienceLevel(level.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left relative overflow-hidden group",
                    isSelected 
                      ? "bg-[var(--color-primary)]/20 text-white" 
                      : "hover:bg-white/5 text-[var(--fg-secondary)] hover:text-white"
                  )}
                >
                  {isSelected && (
                     <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent opacity-50" />
                  )}
                  <span className="text-lg relative z-10">{level.icon}</span>
                  <div className="flex flex-col relative z-10">
                    <span className={cn("text-sm font-bold", isSelected && "text-[var(--color-cyan)]")}>
                      {level.label}
                    </span>
                    <span className="text-xs opacity-70 truncate">{level.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
