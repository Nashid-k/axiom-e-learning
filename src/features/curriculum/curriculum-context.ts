
import { getCurriculaByCategory, getCategory } from './curriculum-registry';
import type { Category } from './curriculum-registry';

export interface CurriculumContextInfo {
  topic: string;
  category: Category;
  phase?: number;
  description?: string;
  contextString: string;
}

interface RawCurriculum {
  phases?: Array<{
    phase?: number | string;
    theory?: Array<string | { title?: string }>;
    practicals?: Array<string | { title?: string }>;
  }>;
}

function extractTopicsFromCurriculum(entry: RawCurriculum): { title: string; phase: number }[] {
  const topics: { title: string; phase: number }[] = [];

  if (!entry.phases || !Array.isArray(entry.phases)) {
    return topics;
  }

  entry.phases.forEach((phase, index) => {
    const phaseNum = Number(phase.phase) || (index + 1);

    if (phase.theory && Array.isArray(phase.theory)) {
      phase.theory.forEach((item) => {
        const title = typeof item === 'string' ? item : item?.title;
        if (title) {
          topics.push({ title, phase: phaseNum });
        }
      });
    }

    if (phase.practicals && Array.isArray(phase.practicals)) {
      phase.practicals.forEach((item) => {
        const title = typeof item === 'string' ? item : item?.title;
        if (title) {
          topics.push({ title, phase: phaseNum });
        }
      });
    }
  });

  return topics;
}

function findAdjacentTopics(
  category: Category,
  targetPhase?: number,
  budget: number = 800
): string {
  if (!targetPhase) return '';

  const entries = getCurriculaByCategory(category);
  const allTopics: { title: string; phase: number }[] = [];

  entries.forEach(entry => {
    try {
      const data = entry.getData?.();
      if (data) {
        const topics = extractTopicsFromCurriculum(data);
        allTopics.push(...topics);
      }
    } catch {
    }
  });

  const adjacent = allTopics.filter(
    t => t.phase === targetPhase ||
      t.phase === targetPhase - 1 ||
      t.phase === targetPhase + 1
  );

  if (adjacent.length === 0) return '';

  adjacent.sort((a, b) => a.phase - b.phase);

  let context = '';
  const topics = adjacent.map(t => `• ${t.title} (Phase ${t.phase})`).join('\n');

  if (topics.length < budget) {
    context = `**Adjacent Learning Path:**\n${topics}`;
  } else {
    const truncated = adjacent
      .slice(0, Math.min(5, adjacent.length))
      .map(t => `• ${t.title}`)
      .join('\n');
    context = `**Adjacent Topics:**\n${truncated}`;
  }

  return context;
}

function findPrerequisites(
  category: Category,
  targetPhase?: number,
): string {
  if (!targetPhase || targetPhase <= 1) return '';

  const entries = getCurriculaByCategory(category);
  const allTopics: { title: string; phase: number }[] = [];

  entries.forEach(entry => {
    try {
      const data = entry.getData?.();
      if (data) {
        const topics = extractTopicsFromCurriculum(data);
        allTopics.push(...topics);
      }
    } catch {
    }
  });

  const prerequisites = allTopics.filter(t => t.phase < targetPhase);

  if (prerequisites.length === 0) return '';

  const maxPhaseBefore = Math.max(...prerequisites.map(t => t.phase));
  const directPrereqs = prerequisites.filter(t => t.phase === maxPhaseBefore);

  const topics = directPrereqs
    .slice(0, Math.min(4, directPrereqs.length))
    .map(t => `• ${t.title}`)
    .join('\n');

  if (topics.length === 0) return '';

  return `**Prerequisites (Phase ${maxPhaseBefore}):**\n${topics}`;
}

function findFollowUps(
  category: Category,
  targetPhase?: number,
): string {
  if (!targetPhase) return '';

  const entries = getCurriculaByCategory(category);
  const allTopics: { title: string; phase: number }[] = [];

  entries.forEach(entry => {
    try {
      const data = entry.getData?.();
      if (data) {
        const topics = extractTopicsFromCurriculum(data);
        allTopics.push(...topics);
      }
    } catch {
    }
  });

  const followups = allTopics.filter(t => t.phase > targetPhase);

  if (followups.length === 0) return '';

  const minPhaseAfter = Math.min(...followups.map(t => t.phase));
  const nextPhaseTopics = followups.filter(t => t.phase === minPhaseAfter);

  const topics = nextPhaseTopics
    .slice(0, Math.min(4, nextPhaseTopics.length))
    .map(t => `• ${t.title}`)
    .join('\n');

  if (topics.length === 0) return '';

  return `**Follow-Up Topics (Phase ${minPhaseAfter}):**\n${topics}`;
}

export function buildCurriculumContextForTopic(
  category: Category,
  topic: string,
  phase?: number,
  maxChars: number = 2000
): string {
  const sections: string[] = [];
  let usedChars = 0;

  let categoryInfo = `Learning Path: **${category}**\nCurrent Topic: **${topic}**`;
  if (phase !== undefined) {
    categoryInfo += ` (Phase ${phase})`;
  }
  sections.push(categoryInfo);
  usedChars += categoryInfo.length;

  if (phase && phase > 1 && usedChars < maxChars * 0.7) {
    const prereqs = findPrerequisites(category, phase);
    if (prereqs) {
      sections.push(prereqs);
      usedChars += prereqs.length;
    }
  }

  if (phase && usedChars < maxChars * 0.8) {
    const adjacent = findAdjacentTopics(category, phase, maxChars - usedChars);
    if (adjacent) {
      sections.push(adjacent);
      usedChars += adjacent.length;
    }
  }

  if (phase && usedChars < maxChars) {
    const followups = findFollowUps(category, phase);
    if (followups) {
      sections.push(followups);
    }
  }

  return sections.filter(Boolean).join('\n\n');
}

export function buildEnhancedCategoryContext(
  category: string | undefined,
  topic?: string,
  phase?: number,
  maxChars: number = 3000
): string {
  if (!category || typeof category !== 'string') {
    return 'No specific curriculum context. General programming mentorship.';
  }

  const normalizedCategory = getCategory(category);

  if (normalizedCategory === 'Other') {
    return `Category: ${category}. General programming concepts.`;
  }

  if (topic && phase) {
    return buildCurriculumContextForTopic(
      normalizedCategory as Category,
      topic,
      phase,
      maxChars
    );
  }

  const entries = getCurriculaByCategory(normalizedCategory as Category);
  if (entries.length === 0) {
    return `No curriculum found for "${category}". General programming mentorship.`;
  }

  let total = 0;
  const parts: string[] = [];

  for (const entry of entries) {
    if (total >= maxChars) break;

    try {
      const data = entry.getData();
      const topics = extractTopicsFromCurriculum(data);

      if (topics.length === 0) continue;

      const topicList = topics
        .slice(0, Math.min(8, topics.length))
        .map(t => `• ${t.title}`)
        .join('\n');

      const remaining = maxChars - total;
      const truncated = topicList.length > remaining - 50
        ? topicList.substring(0, Math.max(0, remaining - 50)) + '...'
        : topicList;

      const block = `### ${entry.category}\n${truncated}`;
      if (total + block.length > maxChars) break;

      parts.push(block);
      total += block.length;
    } catch {
    }
  }

  return parts.length > 0
    ? `**${normalizedCategory} Learning Path:**\n\n${parts.join('\n\n')}`
    : 'No specific curriculum context. General programming mentorship.';
}
