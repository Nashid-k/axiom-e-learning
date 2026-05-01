
const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export function calculateNextReviewDate(reviewCount: number = 0): string {
    const safeReviewCount = Math.max(0, Math.floor(reviewCount));
    const intervalIndex = Math.min(safeReviewCount, REVIEW_INTERVALS.length - 1);
    const daysUntilReview = REVIEW_INTERVALS[intervalIndex];

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysUntilReview);
    return nextDate.toISOString();
}

export function isDueForReview(nextReviewDate?: string, studied?: boolean): boolean {
    if (!studied || !nextReviewDate) return false;

    const reviewDate = new Date(nextReviewDate);
    const now = new Date();
    return reviewDate <= now;
}

export function getReviewStatus(nextReviewDate?: string, studied?: boolean): {
    isDue: boolean;
    daysUntil: number;
    label: string;
} {
    if (!studied) {
        return { isDue: false, daysUntil: -1, label: 'Not studied' };
    }

    if (!nextReviewDate) {
        return { isDue: false, daysUntil: -1, label: 'No review scheduled' };
    }

    const reviewDate = new Date(nextReviewDate);
    const now = new Date();
    const diffTime = reviewDate.getTime() - now.getTime();
    const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysUntil <= 0) {
        return { isDue: true, daysUntil: 0, label: 'Review now!' };
    } else if (daysUntil === 1) {
        return { isDue: false, daysUntil: 1, label: 'Review tomorrow' };
    } else {
        return { isDue: false, daysUntil, label: `Review in ${daysUntil} days` };
    }
}

export function getTopicsDueForReview<T extends { nextReviewDate?: string; studied?: boolean }>(
    topics: T[]
): T[] {
    return topics.filter(t => isDueForReview(t.nextReviewDate, t.studied));
}

export function getIntervalLabel(reviewCount: number = 0): string {
    const safeReviewCount = Math.max(0, Math.floor(reviewCount));
    const intervalIndex = Math.min(safeReviewCount, REVIEW_INTERVALS.length - 1);
    const days = REVIEW_INTERVALS[intervalIndex];

    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days === 7) return '1 week';
    if (days === 14) return '2 weeks';
    return '1 month';
}
