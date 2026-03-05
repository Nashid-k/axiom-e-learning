export type OutcomePackage = {
  id: "interview" | "frontend" | "system-design";
  title: string;
  promise: string;
  durationWeeks: number;
  milestones: string[];
  successMetric: string;
};

export const OUTCOME_PACKAGES: OutcomePackage[] = [
  {
    id: "interview",
    title: "Interview Readiness Plan",
    promise: "From uncertain to interview-ready in a structured sprint.",
    durationWeeks: 6,
    milestones: [
      "DSA fundamentals + timed drills",
      "Mock interview sessions",
      "System design communication reps"
    ],
    successMetric: ">= 75% mock interview pass rate"
  },
  {
    id: "frontend",
    title: "Frontend Acceleration Plan",
    promise: "Build production-grade React/Next.js apps with confidence.",
    durationWeeks: 8,
    milestones: [
      "Core React + TypeScript mastery",
      "Performance and accessibility pass",
      "Portfolio-grade project shipped"
    ],
    successMetric: "1 complete portfolio app + quality checklist pass"
  },
  {
    id: "system-design",
    title: "System Design Plan",
    promise: "Learn to make defendable architecture decisions under constraints.",
    durationWeeks: 8,
    milestones: [
      "Foundational distributed systems model",
      "Trade-off practice with case studies",
      "End-to-end architecture reviews"
    ],
    successMetric: "3 defended architecture case studies"
  }
];
