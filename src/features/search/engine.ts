import { Category } from '@/features/curriculum/curriculum-constants';
import { Phase, RichItem } from '@/types';

export interface SearchResult {
    type: 'curriculum' | 'item';
    title: string;
    category: Category;
    slug: string;
    phase?: string;
    itemType?: 'theory' | 'practical';
    score?: number;
}

export class SearchEngine {
    private static instance: SearchEngine;
    private index: SearchResult[] | null = null;

    private constructor() { }

    public static getInstance(): SearchEngine {
        if (!SearchEngine.instance) {
            SearchEngine.instance = new SearchEngine();
        }
        return SearchEngine.instance;
    }

    public setIndex(newIndex: SearchResult[]) {
        this.index = newIndex;
    }

    public getIndex(): SearchResult[] {
        return this.index || [];
    }

    public search(query: string, limit: number = 12): SearchResult[] {
        if (!query.trim()) return [];

        const normalizedQuery = query.toLowerCase().trim();
        const terms = normalizedQuery.split(/\s+/).filter(t => t.length > 2);
        const index = this.getIndex();
        const seen = new Set<string>();

        return index
            .map(item => {
                let matchScore = 0;
                const titleLower = item.title.toLowerCase();
                const categoryLower = item.category.toLowerCase();

                if (titleLower === normalizedQuery) matchScore += 100;
                else if (titleLower.startsWith(normalizedQuery)) matchScore += 50;
                else if (titleLower.includes(normalizedQuery)) matchScore += 20;

                terms.forEach(term => {
                    if (titleLower.includes(term)) matchScore += 10;
                    if (categoryLower.includes(term)) matchScore += 5;
                });

                if (item.phase && item.phase.toLowerCase().includes(normalizedQuery)) {
                    matchScore += 15;
                }

                return { ...item, score: (item.score || 0) + matchScore };
            })
            .filter(item => item.score && item.score > 10)
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .filter(item => {
                const key = `${item.title}-${item.slug}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            })
            .slice(0, limit);
    }
}
