import { Topic } from '@/types';

const STORAGE_KEY = 'axiom_topics';
const UNIQUE_ID_KEY = 'axiom_unique_id';

const isBrowser = typeof window !== 'undefined';

export const getTopics = (): Topic[] => {
    if (!isBrowser) return [];
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
};

const saveTopics = (topics: Topic[]) => {
    if (isBrowser) localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
};

export const addTopic = (topic: Omit<Topic, 'id' | 'createdAt'>): Topic => {
    const newTopic = { ...topic, id: crypto.randomUUID(), createdAt: new Date().toISOString() } as Topic;
    saveTopics([...getTopics(), newTopic]);
    return newTopic;
};

export const updateTopic = (id: string, updates: Partial<Topic>) => {
    saveTopics(getTopics().map(t => t.id === id ? { ...t, ...updates } : t));
};

export const deleteTopic = (id: string) => {
    saveTopics(getTopics().filter(t => t.id !== id));
};

export const toggleStudied = (id: string) => {
    saveTopics(getTopics().map(t => t.id === id
        ? { ...t, studied: !t.studied, lastStudied: !t.studied ? new Date().toISOString() : t.lastStudied }
        : t
    ));
};

export const getUniqueId = (): string => {
    if (!isBrowser) return '';
    let id = localStorage.getItem(UNIQUE_ID_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(UNIQUE_ID_KEY, id); }
    return id;
};
