export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export interface Quiz {
    topic: string;
    questions: QuizQuestion[];
}
