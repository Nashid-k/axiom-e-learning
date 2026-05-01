import { api } from '@/lib/api/client';
import { Topic } from '@/types';
import { getTopics, updateTopic as localUpdate, toggleStudied as localToggle } from "@/lib/utils/storage";

const isAuth = (user: unknown) => !!user;

export const topicService = {
    getAll: async (user: unknown): Promise<Topic[]> => {
        if (isAuth(user)) {
            const response = await api.get<{ topics: Topic[] }>('/api/topics', { cache: 'no-store' });
            return response.topics || [];
        }
        return getTopics();
    },

    getById: async (id: string, user: unknown): Promise<Topic | null> => {
        if (isAuth(user)) {
            try {
                const response = await api.get<{ topic: Topic }>(`/api/topics/${id}`, { cache: 'no-store' });
                return response.topic;
            } catch (error) {
                console.error("Failed to fetch topic by id:", error);
                return null;
            }
        }

        const localTopics = getTopics();
        return localTopics.find(t => t.id === id) || null;
    },

    update: async (id: string, updates: Partial<Topic>, user: unknown): Promise<Topic> => {
        if (isAuth(user)) {
            await api.put('/api/topics', { id, ...updates });
            return { id, ...updates } as Topic;
        }
        localUpdate(id, updates);
        return { id, ...updates } as Topic;
    },


    toggleStudied: async (id: string, updates: Partial<Topic>, user: unknown): Promise<void> => {
        if (isAuth(user)) {
            await api.put('/api/topics', { id, ...updates });
            return;
        }
        localToggle(id);
    }
};
