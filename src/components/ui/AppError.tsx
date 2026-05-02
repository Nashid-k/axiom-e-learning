"use client";

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface AppErrorProps {
    error: Error;
    reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center p-16 text-center glass-card rounded-[40px] border-accent/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 -z-10" />
            
            <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-accent/10"
            >
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </motion.div>

            <h2 className="text-3xl font-black tracking-tighter mb-4 text-fg-primary">System Override Detected</h2>
            
            <div className="text-sm font-mono bg-accent/5 p-6 rounded-2xl border border-accent/10 text-accent mb-12 max-w-md break-all leading-relaxed">
                {error.message || "An unexpected neural synchronization error occurred."}
            </div>

            <Button onClick={reset} size="lg" className="bg-accent text-white hover:bg-accent/80 shadow-xl shadow-accent/20 rounded-2xl px-12">
                Re-initialize System
            </Button>
        </div>
    );
}
