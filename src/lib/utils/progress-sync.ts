import { CURRICULUM_REGISTRY } from '@/features/curriculum/curriculum-registry';

export interface ProgressData {
    [slug: string]: string[];
}

export function migrateLegacyData(data: ProgressData): { migrated: ProgressData; hasChanges: boolean } {
    const migrated: ProgressData = { ...data };
    let hasChanges = false;

    Object.values(CURRICULUM_REGISTRY).forEach(entry => {
        try {
            const entryData = entry.getData();
            const correctSlug = entryData.fileName;
            const legacyTitle = entryData.title || entryData.description || entry.category;

            const possibleLegacyKeys = [
                legacyTitle,
                `progress_${legacyTitle}`,
                entry.category
            ].filter(k => k && k !== correctSlug);

            possibleLegacyKeys.forEach(legacyKey => {
                if (migrated[legacyKey]) {

                    const legacyItems = migrated[legacyKey];
                    const currentCorrect = migrated[correctSlug] || [];
                    const merged = Array.from(new Set([...currentCorrect, ...legacyItems]));

                    migrated[correctSlug] = merged;
                    delete migrated[legacyKey]; 
                    hasChanges = true;
                }
            });
        } catch { }
    });
    return { migrated, hasChanges };
}

export function mergeProgress(localState: ProgressData, serverState: ProgressData): ProgressData {
    const nextState = { ...localState };

    Object.entries(serverState).forEach(([slug, serverItems]) => {
        const localItems = nextState[slug] || [];
        const mergedForSlug = Array.from(new Set([...localItems, ...serverItems]));
        nextState[slug] = mergedForSlug;
    });

    return nextState;
}
