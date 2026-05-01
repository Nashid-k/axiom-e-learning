import { useState, useEffect, useRef, useCallback } from 'react';

interface TextToSpeechOptions {
    onEnd?: () => void;
    onStart?: () => void;
    onError?: (event: unknown) => void;
}

export const useTextToSpeech = (options: TextToSpeechOptions = {}) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            synthesisRef.current = window.speechSynthesis;

            const updateVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);
            };

            updateVoices();

            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = updateVoices;
            }
        }
    }, []);

    const stripMarkdown = (markdown: string) => {
        if (!markdown) return '';
        return markdown
            .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
            .replace(/```[\s\S]*?```/g, " I have provided a code example for this. ")
            .replace(/`([^`]+)`/g, '$1')
            .replace(/^#+\s+(.*)$/gm, '$1. ')
            .replace(/[*_]{1,3}(.*?)[*_]{1,3}/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/^\s*[-*+]\s+/gm, ', ')
            .replace(/\n\n+/g, '. ')
            .replace(/\n/g, ', ')
            .replace(/\s+/g, ' ')
            .replace(/\.\./g, '.')
            .replace(/,,/g, ',')
            .trim();
    };

    const speak = useCallback((text: string, persona: 'general' | 'buddy' = 'general') => {
        if (!synthesisRef.current) return;

        synthesisRef.current.cancel();

        const cleanText = stripMarkdown(text);
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utteranceRef.current = utterance;

        const preferredVoices = voices.filter(v =>
            (v.name.includes('Microsoft') || v.name.includes('Google')) &&
            v.lang.startsWith('en')
        );

        let selectedVoice = voices.find(v => v.default) || voices[0];

        if (preferredVoices.length > 0) {
            if (persona === 'general') {
                selectedVoice = preferredVoices.find(v =>
                    v.name.includes('David') ||
                    v.name.includes('Mark') ||
                    v.name.includes('Daniel') ||
                    v.name.match(/Male/i)
                ) || preferredVoices[0];
            } else {
                selectedVoice = preferredVoices.find(v =>
                    v.name.includes('Zira') ||
                    v.name.includes('Hazel') ||
                    v.name.includes('Samantha') ||
                    v.name.match(/Female/i)
                ) || preferredVoices[preferredVoices.length - 1];
            }
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        if (persona === 'general') {
            utterance.rate = 0.95; 
            utterance.pitch = 1.0;
        } else {
            utterance.rate = 1.05; 
            utterance.pitch = 1.1;
        }

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
            if (options.onStart) options.onStart();
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            if (options.onEnd) options.onEnd();
        };

        utterance.onerror = (event) => {
            setIsSpeaking(false);
            setIsPaused(false);
            if (options.onError) options.onError(event);
        };

        synthesisRef.current.speak(utterance);
    }, [voices, options]);

    const pause = useCallback(() => {
        if (synthesisRef.current && isSpeaking && !isPaused) {
            synthesisRef.current.pause();
            setIsPaused(true);
        }
    }, [isSpeaking, isPaused]);

    const resume = useCallback(() => {
        if (synthesisRef.current && isPaused) {
            synthesisRef.current.resume();
            setIsPaused(false);
        }
    }, [isPaused]);

    const cancel = useCallback(() => {
        if (synthesisRef.current) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
        };
    }, []);

    return {
        isSpeaking,
        isPaused,
        speak,
        pause,
        resume,
        cancel,
        voices
    };
};
