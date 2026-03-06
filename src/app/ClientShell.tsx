'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/lib/providers/ThemeProvider';
import { AuthProvider } from '@/features/auth/AuthContext';
import ErrorBoundary from '@/lib/providers/ErrorBoundary';
import Header from '@/components/ui/Header';
import QueryProvider from '@/lib/providers/QueryProvider';
import PageTransition from '@/lib/providers/PageTransition';
import { ProgressProvider } from '@/lib/providers/ProgressProvider';
import { TopicProvider } from "@/lib/providers/topic-context";
import { ModalProvider } from "@/features/ai/context/ModalContext";

const GlobalAssistant = dynamic(() => import('@/features/ai/assistant/components/GlobalAssistant'), { ssr: false });
const AIModal = dynamic(() => import('@/features/ai/components/AIModal'), { ssr: false });
const GlobalSearch = dynamic(() => import('@/components/ui/GlobalSearch'), { ssr: false });
const WebVitalsReporter = dynamic(() => import('@/components/monitoring/WebVitalsReporter'), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <QueryProvider>
                    <ErrorBoundary>
                        <ProgressProvider>
                            <TopicProvider>
                                <ModalProvider>
                                    <Header />
                                    <GlobalSearch />
                                    <a
                                        href="#main-content"
                                        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-lg"
                                    >
                                        Skip to main content
                                    </a>
                                    <main id="main-content" className="min-h-screen pt-0">
                                        <PageTransition>
                                            {children}
                                        </PageTransition>
                                    </main>
                                    <GlobalAssistant />
                                    <AIModal />
                                    <WebVitalsReporter />
                                </ModalProvider>
                            </TopicProvider>
                        </ProgressProvider>
                    </ErrorBoundary>
                </QueryProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
