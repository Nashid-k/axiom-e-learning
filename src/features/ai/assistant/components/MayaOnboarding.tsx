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
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="w-full max-w-sm bg-white/80 dark:bg-[#0D0D0E]/80 backdrop-blur-2xl border border-black/[0.03] dark:border-white/5 p-8 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-50" />
                <div className="relative z-10">
                    { }
                    <div className="flex gap-1.5 mb-10 justify-center">
                        {[0, 1, 2].map(i => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-blue-500' : 'w-2 bg-gray-200 dark:bg-white/10'}`} />
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
                                <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/30 text-3xl mb-8 border border-white/20">
                                    👋
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Hi, I&apos;m Maya!</h2>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 font-medium">
                                    I&apos;m your new AI coding partner. Let&apos;s tune my settings to make sure we vibe perfectly.
                                </p>
                                <button
                                    onClick={handleNext}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98]"
                                >
                                    Let&apos;s Begin
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
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">What&apos;s your name?</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 font-medium">
                                    I like using names, it makes our pairing feedback more personal.
                                </p>

                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.03] rounded-2xl px-4 py-4 text-xl text-center text-gray-900 dark:text-white mb-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-bold outline-none"
                                    placeholder="Nickname..."
                                    autoFocus
                                />

                                <button
                                    onClick={handleNext}
                                    disabled={!nickname.trim()}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98]"
                                >
                                    Continue
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
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Choose my &quot;Vibe&quot;</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 font-medium">
                                    How should I talk to you during sessions?
                                </p>

                                <div className="grid gap-4 mb-10 text-left">
                                    {[
                                        {
                                            id: 'chill',
                                            label: 'The Peer',
                                            icon: '🤝',
                                            desc: "Casual, collaborative, and helpful."
                                        },
                                        {
                                            id: 'professional',
                                            label: 'The Tech Lead',
                                            icon: '👓',
                                            desc: "Standard-focused and code-centric."
                                        },
                                        {
                                            id: 'active',
                                            label: 'The Architect',
                                            icon: '🏛️',
                                            desc: "Deep system design and scaling."
                                        },
                                    ].map((opt, idx) => (
                                        <motion.button
                                            key={opt.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            onClick={() => setVibe(opt.id as 'chill' | 'professional' | 'active')}
                                            className={`p-5 rounded-[24px] border-2 transition-all duration-300 relative group ${vibe === opt.id
                                                ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10'
                                                : 'border-black/[0.03] dark:border-white/[0.03] hover:border-black/10 dark:hover:border-white/10'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                                                    <span className="text-xl group-hover:scale-110 transition-transform">{opt.icon}</span> {opt.label}
                                                </span>
                                                {vibe === opt.id && <motion.div layoutId="selection" className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />}
                                            </div>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold leading-relaxed">{opt.desc}</p>
                                        </motion.button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={isSaving}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    {isSaving ? <span className="animate-spin w-5 h-5 border-3 border-white/30 border-t-white rounded-full" /> : null}
                                    {isSaving ? 'Awaiting System...' : 'Initiate Maya'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
