'use client';

import MayaAssistant from './maya-revamp/MayaAssistant';

/**
 * GlobalAssistant (Maya) - Revamped Implementation
 * 
 * This is the main entry point for the AI Assistant. 
 * The logic has been modularized into the ./maya-revamp/ directory 
 * for better performance and maintainability.
 */
export default function GlobalAssistant() {
    return <MayaAssistant />;
}

// Export the Message interface for use in other components
export type { Message } from '../types';
