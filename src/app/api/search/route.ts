import { NextResponse } from 'next/server';
import { CURRICULUM_REGISTRY } from '@/features/curriculum/curriculum-registry';
import { Phase, RichItem } from '@/types';
import { SearchResult } from '@/features/search/engine';

export async function GET() {
    const newIndex: SearchResult[] = [];

    Object.entries(CURRICULUM_REGISTRY).forEach(([slug, entry]) => {
        const data = entry.getData();
        if (!data) return;

        newIndex.push({
            type: 'curriculum',
            title: data.description || slug,
            category: entry.category,
            slug: slug,
            score: 20
        });

        if (data.subDescription) {
            newIndex.push({
                type: 'curriculum',
                title: data.subDescription,
                category: entry.category,
                slug: slug,
                score: 5,
            });
        }

        data.phases?.forEach((phase: Phase) => {
            phase.theory?.forEach((item: string | RichItem) => {
                const title = typeof item === 'string' ? item : item.title;
                newIndex.push({
                    type: 'item',
                    title: title,
                    category: entry.category,
                    slug: slug,
                    phase: String(phase.phase),
                    itemType: 'theory',
                    score: 10
                });
            });

            phase.practicals?.forEach((item: string | RichItem) => {
                const title = typeof item === 'string' ? item : item.title;
                newIndex.push({
                    type: 'item',
                    title: title,
                    category: entry.category,
                    slug: slug,
                    phase: String(phase.phase),
                    itemType: 'practical',
                    score: 10
                });
            });
        });
    });

    return NextResponse.json(newIndex, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
