"use client";

import { useState, useMemo } from 'react';
import { Phase, RichItem } from '@/types';

interface Struggle {
    topicId: string;
    topicTitle: string;
    category: string;
    status: 'active' | 'resolved';
}

export function useMirror(curriculumSlug: string, phases: Phase[]) {
    const [struggles] = useState<Struggle[]>([]);
    const [loading] = useState(false);

    const mirrorPhases = useMemo(() => {
        if (!phases) return [];

        return phases.map(phase => {
            const reorderedTheory = [...(phase.theory || [])].sort((a, b) => {
                const aId = typeof a === 'string' ? null : a.id;
                const bId = typeof b === 'string' ? null : b.id;

                if (!aId || !bId) return 0;

                const aStruggle = struggles.find(s => s.topicId === aId);
                const bStruggle = struggles.find(s => s.topicId === bId);

                if (aStruggle && !bStruggle) return -1;
                if (!aStruggle && bStruggle) return 1;
                return 0;
            });

            return {
                ...phase,
                theory: reorderedTheory
            };
        });
    }, [phases, struggles]);

    const activeStruggle = useMemo(() => {
        return struggles.find(s => phases.some(p =>
            (p.theory || []).some((t: string | RichItem) => {
                const topicId = typeof t === 'string' ? null : t.id;
                return topicId === s.topicId;
            })
        ));
    }, [struggles, phases]);

    return {
        mirrorPhases,
        activeStruggle,
        loading
    };
}
