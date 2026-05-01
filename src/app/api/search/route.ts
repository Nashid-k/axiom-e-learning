import { NextResponse } from 'next/server';
import { CURRICULUM_REGISTRY } from '@/features/curriculum/curriculum-registry';
import { Phase, RichItem } from '@/types';
import { SearchResult } from '@/features/search/engine';

let searchIndexCache: SearchResult[] | null = null;
let searchIndexPromise: Promise<SearchResult[]> | null = null;

async function buildSearchIndex(): Promise<SearchResult[]> {
    const fullIndex: SearchResult[] = [];

    for (const [slug, entry] of Object.entries(CURRICULUM_REGISTRY)) {
        const data = await entry.getData();
        if (!data) continue;

        fullIndex.push({
            type: 'curriculum',
            title: data.description || slug,
            category: entry.category,
            slug: slug,
            score: 20
        });

        if (data.subDescription) {
            fullIndex.push({
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
                fullIndex.push({
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
                fullIndex.push({
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
    }

    return fullIndex;
}

async function getSearchIndex(): Promise<SearchResult[]> {
    if (searchIndexCache) {
        return searchIndexCache;
    }

    if (!searchIndexPromise) {
        searchIndexPromise = buildSearchIndex()
            .then((index) => {
                searchIndexCache = index;
                return index;
            })
            .finally(() => {
                searchIndexPromise = null;
            });
    }

    return searchIndexPromise;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const cursor = parseInt(searchParams.get('cursor') || '0');
    const limit = parseInt(searchParams.get('limit') || '20');
    const fullIndex = await getSearchIndex();

    // Simple server-side filtering if query exists
    let results = fullIndex;
    if (query) {
        const normalizedQuery = query.toLowerCase().trim();
        results = fullIndex.filter(item => 
            item.title.toLowerCase().includes(normalizedQuery) || 
            item.category.toLowerCase().includes(normalizedQuery) ||
            item.slug.toLowerCase().includes(normalizedQuery)
        ).sort((a, b) => (b.score || 0) - (a.score || 0));
    }

    const paginatedResults = results.slice(cursor, cursor + limit);
    const nextCursor = cursor + limit < results.length ? cursor + limit : null;

    return NextResponse.json({
        results: paginatedResults,
        nextCursor,
        total: results.length
    }, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
