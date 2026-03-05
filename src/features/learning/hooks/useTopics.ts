import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/AuthContext";
import { Topic } from "@/types";
import { topicService } from "@/features/learning/services/topicService";
import { calculateNextReviewDate } from "@/features/learning/spaced-repetition";

export function useTopics() {
    const { user, loading: authLoading } = useAuth();
    const queryClient = useQueryClient();
    const queryKey = ['topics', user?.email];

    const { data: topics = [], isLoading, error } = useQuery({
        queryKey,
        queryFn: () => topicService.getAll(user),
        enabled: !authLoading,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Topic> }) =>
            topicService.update(id, updates, user),
        retry: 2,
        onMutate: async ({ id, updates }) => {
            await queryClient.cancelQueries({ queryKey });
            const previousTopics = queryClient.getQueryData<Topic[]>(queryKey);

            queryClient.setQueryData(queryKey, (old: Topic[] = []) =>
                old.map(t => t.id === id ? { ...t, ...updates } : t)
            );

            return { previousTopics };
        },
        onError: (err, variables, context) => {
            if (context?.previousTopics) {
                queryClient.setQueryData(queryKey, context.previousTopics);
            }
            console.error("Topic update failed:", err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        }
    });


    const toggleStudied = async (id: string) => {
        const currentTopics = queryClient.getQueryData<Topic[]>(queryKey) || [];
        const topic = currentTopics.find(t => t.id === id);
        if (!topic) return;

        const newStatus = !topic.studied;
        const currentReviewCount = topic.reviewCount || 0;

        const updates: Partial<Topic> = {
            studied: newStatus,
            lastStudied: newStatus ? new Date().toISOString() : topic.lastStudied,
            ...(newStatus ? {
                nextReviewDate: calculateNextReviewDate(currentReviewCount),
                reviewCount: currentReviewCount + 1
            } : {
                nextReviewDate: undefined,
                reviewCount: 0
            })
        };

        updateMutation.mutate({ id, updates });
    };

    return {
        topics,
        loading: isLoading || authLoading,
        error,
        updateTopic: (id: string, updates: Partial<Topic>) => updateMutation.mutateAsync({ id, updates }),
        toggleStudied
    };
}

export function useTopic(id: string) {
    const { user, loading: authLoading } = useAuth();
    const queryKey = ['topic', id, user?.email];

    const { data: topic, isLoading, error } = useQuery({
        queryKey,
        queryFn: () => topicService.getById(id, user),
        enabled: !authLoading && !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    return {
        topic,
        loading: isLoading || authLoading,
        error
    };
}
