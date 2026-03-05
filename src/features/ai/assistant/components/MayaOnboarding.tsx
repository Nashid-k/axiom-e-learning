'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/features/auth/AuthContext';

interface MayaOnboardingProps {
    onComplete: (nickname: string, vibe: string) => void;
}

export function MayaOnboarding({ onComplete }: MayaOnboardingProps) {
    const { user } = useAuth();
    const [step, setStep] = useState(0);
    const [nickname, setNickname] = useState(user?.name?.split(' ')[0] || '');
    const [vibe, setVibe] = useState<'chill' | 'professional' | 'active'>('chill');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch('/api/user/preferences')
            .then(res => res.json())
            .then(data => {
                if (data.preferences) {
                    if (data.preferences.nickname) setNickname(data.preferences.nickname);
                    if (data.preferences.vibe) setVibe(data.preferences.vibe);
                }
            })
            .catch(() => { });  
    }, []);

    const handleNext = async () => {
        if (step < 2) {
            setStep(prev => prev + 1);
        } else {
            setIsSaving(true);
            try {
                const res = await fetch('/api/user/preferences', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nickname, vibe, introSeen: true })
                });

                if (!res.ok) throw new Error('Failed to save');

                onComplete(nickname, vibe);
            } catch {
                onComplete(nickname, vibe);
            } finally {
                setIsSaving(false);
            }
        }
    };

    const variants = {
        enter: { opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' },
        center: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <motion.div
                layout
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-sm bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-xl"
            >
                {}
                <div className="flex gap-1 mb-8 justify-center">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-blue-500' : 'w-2 bg-gray-200 dark:bg-white/10'}`} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center shadow-lg text-2xl mb-6">
                                👋
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hi, I&apos;m Maya!</h2>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                                I&apos;m your new AI coding partner. I&apos;ve got a few quick questions to make sure we vibe correctly.
                            </p>
                            <button
                                onClick={handleNext}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
                            >
                                Let&apos;s Go
                            </button>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-center"
                        >
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What should I call you?</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                I like using names, it feels more human.
                            </p>

                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-white/5 axiom-input-field rounded-xl px-4 py-3 text-lg text-center text-gray-900 dark:text-white mb-8"
                                placeholder="Your preferred name"
                                autoFocus
                            />

                            <button
                                onClick={handleNext}
                                disabled={!nickname.trim()}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                            >
                                Next
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-center"
                        >
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What&apos;s your vibe?</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                How should I talk to you?
                            </p>

                            <div className="grid gap-3 mb-8">
                                {[
                                    {
                                        id: 'chill',
                                        label: 'The Partner',
                                        icon: '🤝',
                                        desc: "Collaborative, highly-skilled peer. We pair program together."
                                    },
                                    {
                                        id: 'professional',
                                        label: 'The Tech Lead',
                                        icon: '👓',
                                        desc: "Pragmatic, code-centric, standards-obsessed. Clean code only."
                                    },
                                    {
                                        id: 'active',
                                        label: 'The Architect',
                                        icon: '🏛️',
                                        desc: "Focuses on System Design, Scalability, and Trade-offs."
                                    },
                                ].map((opt, idx) => (
                                    <motion.button
                                        key={opt.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setVibe(opt.id as 'chill' | 'professional' | 'active')}
                                        className={`p-4 rounded-xl border text-left transition-all ${vibe === opt.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                                            : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                <span>{opt.icon}</span> {opt.label}
                                            </span>
                                            {vibe === opt.id && <motion.div layoutId="selection" className="w-3 h-3 rounded-full bg-blue-500" />}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p>
                                    </motion.button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={isSaving}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {isSaving ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : null}
                                {isSaving ? 'Saving...' : 'Finish Setup'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
