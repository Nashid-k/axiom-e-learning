export const SLO = {
  mayaFirstResponseMs: 2000,
  mayaFailureRatePct: 1,
  progressSyncMs: 1500,
} as const;

export function isSloBreached(metric: keyof typeof SLO, value: number): boolean {
  return value > SLO[metric];
}
