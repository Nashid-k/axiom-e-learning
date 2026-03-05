import { useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchEngine, SearchResult } from '@/features/search/engine';
import { CATEGORIES } from '@/features/curriculum/curriculum-constants';

const SEARCH_CACHE_MAX_ENTRIES = 120;
const searchCache = new Map<string, SearchResult[]>();

function getSearchCache(query: string): SearchResult[] | null {
    const cached = searchCache.get(query);
    if (!cached) return null;

    searchCache.delete(query);
    searchCache.set(query, cached);
    return cached;
}

function setSearchCache(query: string, results: SearchResult[]) {
    if (searchCache.has(query)) {
        searchCache.delete(query);
    } else if (searchCache.size >= SEARCH_CACHE_MAX_ENTRIES) {
        const oldestKey = searchCache.keys().next().value;
        if (oldestKey) {
            searchCache.delete(oldestKey);
        }
    }

    searchCache.set(query, results);
}

export function useSearchEngine(query: string) {
    const engine = useMemo(() => SearchEngine.getInstance(), []);

    const { data: indexData, isLoading } = useQuery<SearchResult[]>({
        queryKey: ['search-index-global'],
        queryFn: async () => {
            const res = await fetch('/api/search');
            if (!res.ok) throw new Error('Search index failed to load');
            return res.json();
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });

    useEffect(() => {
        if (indexData) {
            engine.setIndex(indexData);
        }
    }, [indexData, engine]);

    const results = useMemo(() => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            return CATEGORIES.map(cat => ({
                type: 'curriculum',
                title: cat,
                category: cat,
                slug: cat.toLowerCase()
            } as any as SearchResult));
        }

        const cachedResults = getSearchCache(trimmedQuery);
        if (cachedResults) {
            return cachedResults;
        }

        if (!indexData) return [];

        const searchResults = engine.search(trimmedQuery, 8);
        setSearchCache(trimmedQuery, searchResults);
        return searchResults;
    }, [query, engine, indexData]);

    return { results, isReady: !!indexData && !isLoading };
}
