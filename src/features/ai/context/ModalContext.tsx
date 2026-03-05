"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type TopicItem = {
    id?: string;
    topic: string;
    category: string;
    description: string;
    phase?: string;
};

export type TopicEvent = TopicItem & {
    allTopics?: TopicItem[];
    currentIndex?: number;
    curriculum?: string;
    phase?: string;
    fileName?: string;
    initialTab?: 'ai' | 'resources' | 'dojo' | 'quiz';
};

interface ModalContextType {
    isOpen: boolean;
    topicData: TopicEvent | null;
    allTopics: TopicItem[];
    currentIndex: number;
    openAIModal: (data: TopicEvent) => void;
    closeModal: () => void;
    navigateTopic: (direction: 'prev' | 'next') => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [topicData, setTopicData] = useState<TopicEvent | null>(null);
    const [allTopics, setAllTopics] = useState<TopicItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openAIModal = React.useCallback((data: TopicEvent) => {
        setTopicData(data);
        if (data.allTopics) setAllTopics(data.allTopics);
        if (data.currentIndex !== undefined) setCurrentIndex(data.currentIndex);
        setIsOpen(true);
    }, []);

    const closeModal = React.useCallback(() => {
        setIsOpen(false);
        setTopicData(null);
        setAllTopics([]);
        setCurrentIndex(0);
    }, []);

    const navigateTopic = React.useCallback((direction: 'prev' | 'next') => {
        if (allTopics.length === 0) return;

        let newIndex = currentIndex;
        if (direction === 'prev' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (direction === 'next' && currentIndex < allTopics.length - 1) {
            newIndex = currentIndex + 1;
        } else {
            return;
        }

        const newTopic = allTopics[newIndex];
        setCurrentIndex(newIndex);

        setTopicData(prev => ({
            ...newTopic,
            curriculum: prev?.curriculum,
            phase: newTopic.phase || prev?.phase,
            fileName: prev?.fileName,
            allTopics: allTopics,
            currentIndex: newIndex
        }));
    }, [allTopics, currentIndex]);

    const contextValue = React.useMemo(() => ({
        isOpen,
        topicData,
        allTopics,
        currentIndex,
        openAIModal,
        closeModal,
        navigateTopic
    }), [
        isOpen,
        topicData,
        allTopics,
        currentIndex,
        openAIModal,
        closeModal,
        navigateTopic
    ]);

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
