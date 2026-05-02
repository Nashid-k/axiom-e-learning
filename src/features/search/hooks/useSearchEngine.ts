import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchResult } from '@/features/search/engine';

interface SearchApiResponse {
    results: SearchResult[];
    nextCursor: number | null;
    total: number;
}

export function useSearchEngine(query: string) {
    const trimmedQuery = query.trim();

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<SearchApiResponse>({
        queryKey: ['search', trimmedQuery],
        queryFn: async ({ pageParam = 0 }) => {
            const searchParams = new URLSearchParams({
                q: trimmedQuery,
                cursor: (pageParam as number).toString(),
                limit: '12'
            });
            const res = await fetch(`/api/search?${searchParams.toString()}`);
            if (!res.ok) throw new Error('Search failed');
            return res.json();
        },
        getNextPageParam: (lastPage: SearchApiResponse) => lastPage.nextCursor ?? undefined,
        initialPageParam: 0,
        staleTime: 60000, // 1 minute
    });

    const results = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap((page: SearchApiResponse) => page.results);
    }, [data]);

    return { 
        results, 
        isLoading, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage,
        isReady: !isLoading 
    };
}
