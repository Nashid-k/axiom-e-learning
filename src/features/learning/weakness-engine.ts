import type { Topic } from "@/types";

export interface WeaknessSignal {
  topic: string;
  severity: number; // 1-100
  source: "flashcard" | "quiz" | "review";
  reason: string;
}

export interface WeeklyMission {
  id: string;
  topic: string;
  title: string;
  reason: string;
  action: string;
  priority: "high" | "medium";
}

function normalizeTopic(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function collectWeaknessSignals(
  topics: Topic[],
  category?: string
): WeaknessSignal[] {
  if (typeof window === "undefined") return [];

  const byTopic = new Map<string, WeaknessSignal>();

  const upsert = (signal: WeaknessSignal) => {
    const key = normalizeTopic(signal.topic);
    const prev = byTopic.get(key);
    if (!prev || signal.severity > prev.severity) {
      byTopic.set(key, signal);
    }
  };

  try {
    const raw = localStorage.getItem("flashcard-progress");
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, { masteryLevel?: number }>;
      for (const [id, data] of Object.entries(parsed)) {
        const mastery = typeof data?.masteryLevel === "number" ? data.masteryLevel : 5;
        if (mastery >= 3) continue;
        upsert({
          topic: id.replace(/-/g, " "),
          severity: mastery <= 1 ? 90 : 75,
          source: "flashcard",
          reason: `low flashcard mastery (${mastery}/5)`,
        });
      }
    }
  } catch {
  }

  try {
    const prefix = "quiz_perf_";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(prefix)) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as { scoreRate?: number };
      if (typeof parsed.scoreRate !== "number") continue;
      if (parsed.scoreRate >= 0.65) continue;

      const slug = key.replace(prefix, "");
      const topic = slug.split("_").slice(1).join(" ").replace(/-/g, " ");
      upsert({
        topic,
        severity: parsed.scoreRate < 0.45 ? 88 : 70,
        source: "quiz",
        reason: `quiz accuracy ${Math.round(parsed.scoreRate * 100)}%`,
      });
    }
  } catch {
  }

  const now = Date.now();
  for (const t of topics) {
    if (!t.studied || !t.nextReviewDate) continue;
    if (category && t.category && t.category.toLowerCase() !== category.toLowerCase()) continue;
    const dueMs = new Date(t.nextReviewDate).getTime();
    if (Number.isNaN(dueMs) || dueMs > now) continue;

    const overdueDays = Math.max(0, Math.floor((now - dueMs) / (1000 * 60 * 60 * 24)));
    upsert({
      topic: t.title,
      severity: Math.min(95, 65 + overdueDays * 5),
      source: "review",
      reason: overdueDays > 0 ? `${overdueDays} day(s) overdue for review` : "review due now",
    });
  }

  return [...byTopic.values()].sort((a, b) => b.severity - a.severity);
}

export function getWeakTopicNames(signals: WeaknessSignal[], limit = 6): string[] {
  return signals.slice(0, limit).map(s => s.topic);
}

export function buildWeeklyMissions(signals: WeaknessSignal[], limit = 3): WeeklyMission[] {
  return signals.slice(0, limit).map((signal, index) => ({
    id: `${signal.source}-${index}-${normalizeTopic(signal.topic).replace(/\s+/g, "-")}`,
    topic: signal.topic,
    title: `Strengthen ${signal.topic}`,
    reason: signal.reason,
    action: signal.source === "review"
      ? "Open topic and do a focused review session."
      : signal.source === "quiz"
        ? "Retake quiz and target 80%+ accuracy."
        : "Run flashcards and bring mastery above 3.",
    priority: signal.severity >= 85 ? "high" : "medium",
  }));
}
