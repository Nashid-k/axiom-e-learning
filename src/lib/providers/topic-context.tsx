'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Topic } from '@/types';

interface TopicContextType {
    activeTopic: Topic | null;
    selectTopic: (topic: Topic) => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export function TopicProvider({ children }: { children: ReactNode }) {
    const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
    const selectTopic = (topic: Topic) => {
        setActiveTopic(topic);
    };


    return (
        <TopicContext.Provider value={{ activeTopic, selectTopic }}>
            {children}
        </TopicContext.Provider>
    );
}

export function useTopicContext() {
    const context = useContext(TopicContext);
    if (context === undefined) {
        throw new Error('useTopicContext must be used within a TopicProvider');
    }
    return context;
}
