"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ExperienceLevel = "1yoe" | "2yoe" | "3yoe" | "4yoe" | "4+yoe";

interface ExperienceContextType {
  experienceLevel: ExperienceLevel;
  setExperienceLevel: (level: ExperienceLevel) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [experienceLevel, setExperienceLevelState] = useState<ExperienceLevel>("1yoe");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("axiom_experience_level");
    if (saved && ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"].includes(saved)) {
      setExperienceLevelState(saved as ExperienceLevel);
    }
  }, []);

  const setExperienceLevel = (level: ExperienceLevel) => {
    setExperienceLevelState(level);
    localStorage.setItem("axiom_experience_level", level);
  };

  // We can render children before mount, but doing so might cause hydration mismatch if we rely on it immediately.
  // We'll just return it, and let components handle the '1yoe' default gracefully.

  return (
    <ExperienceContext.Provider value={{ experienceLevel, setExperienceLevel }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
}
