'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ModalShell, ModalCloseButton, ModalContent, ModalItem, modalItemVariants } from '@/components/ui/ModalShell';

interface Video {
    url: string;
    title: string;
    channel: string;
    duration?: string;
    thumbnail?: string;
}

interface Article {
    url: string;
    title: string;
    source: string;
}

interface ResourceModalProps {
    topicTitle: string;
    curriculum: string;
    phase: string;
    onClose: () => void;
}

export default function ResourceModal({ topicTitle, curriculum, phase, onClose }: ResourceModalProps) {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<Video[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [fallbackUrls, setFallbackUrls] = useState<{ youtubeSearchUrl?: string; articleSearchUrls?: Record<string, string> } | null>(null);
    const [visibleVideoCount, setVisibleVideoCount] = useState(4);

    useEffect(() => {
        let mounted = true;
        const fetchResources = async () => {
            try {
                const response = await fetch('/api/resources/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topicTitle, curriculum, phase }),
                });
                const data = await response.json();
                if (mounted) {
                    if (data.fallback) setFallbackUrls(data);
                    else if (data.resources) { setVideos(data.resources.videos || []); setArticles(data.resources.articles || []); }
                    setLoading(false);
                }
            } catch { if (mounted) setLoading(false); }
        };
        fetchResources();
        return () => { mounted = false; };
    }, [topicTitle, curriculum, phase]);

    return (
        <>
            <ModalShell isOpen onClose={onClose} ariaLabelledBy="resource-modal-title" containerClassName="w-[95vw] max-w-4xl max-h-[90vh]">
                <div className="sticky top-0 z-10 bg-[var(--surface-base)] border-b border-[var(--border-default)]">
                    <ModalContent className="flex items-start justify-between px-[var(--space-3)] py-[var(--space-3)]">
                        <ModalItem variants={modalItemVariants} className="flex-1 pr-[var(--space-2)]">
                            <h2 id="resource-modal-title" className="text-[var(--text-heading)] font-[var(--font-weight-bold)] text-[var(--fg-primary)] mb-[4px]">
                                {topicTitle}
                            </h2>
                            <p className="text-[var(--text-caption)] text-[var(--fg-muted)]">
                                {curriculum} · {phase}
                            </p>
                        </ModalItem>
                        <ModalItem variants={modalItemVariants} className="flex-shrink-0">
                            <ModalCloseButton onClose={onClose} />
                        </ModalItem>
                    </ModalContent>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-[var(--space-3)] py-[var(--space-3)]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-[var(--space-5)]">
                            <div className="w-12 h-12 border-4 border-[var(--color-500)]/30 border-t-[var(--color-500)] rounded-[var(--radius-full)] animate-spin mb-[var(--space-2)]" />
                            <p className="text-[var(--fg-muted)]">Searching for resources...</p>
                        </div>
                    ) : fallbackUrls ? (
                        <ModalContent className="flex flex-col gap-[var(--space-2)] py-[var(--space-3)] text-center">
                            <ModalItem variants={modalItemVariants}>
                                <p className="text-[var(--fg-secondary)] mb-[var(--space-2)]">
                                    API keys not configured. Use these search links to find resources:
                                </p>
                            </ModalItem>
                            {fallbackUrls.youtubeSearchUrl && (
                                <ModalItem variants={modalItemVariants}>
                                    <a
                                        href={fallbackUrls.youtubeSearchUrl}
                                        target="_blank" rel="noopener noreferrer"
                                        className="block p-[var(--space-2)] bg-red-500/5 border border-red-500/20 rounded-[var(--radius-xl)] text-red-500 hover:bg-red-500/10 transition-colors"
                                    >
                                        🎥 Search YouTube Videos
                                    </a>
                                </ModalItem>
                            )}
                            {fallbackUrls.articleSearchUrls && Object.entries(fallbackUrls.articleSearchUrls).map(([source, url]) => (
                                <ModalItem key={source} variants={modalItemVariants}>
                                    <a
                                        href={url} target="_blank" rel="noopener noreferrer"
                                        className="block p-[var(--space-2)] bg-[var(--color-500)]/5 border border-[var(--color-500)]/20 rounded-[var(--radius-xl)] text-[var(--color-500)] hover:bg-[var(--color-500)]/10 transition-colors capitalize"
                                    >
                                        📄 Search {source}
                                    </a>
                                </ModalItem>
                            ))}
                        </ModalContent>
                    ) : (
                        <ModalContent className="flex flex-col gap-[var(--space-4)]">
                            {videos.length > 0 && (
                                <ModalItem variants={modalItemVariants}>
                                    <h3 className="text-[var(--text-body)] font-[var(--font-weight-bold)] text-[var(--fg-primary)] mb-[var(--space-2)] flex items-center gap-[var(--space-1)]">
                                        <span className="text-2xl">🎥</span> Video Tutorials
                                    </h3>
                                    <div className="flex flex-col gap-[var(--space-1)]">
                                        {videos.slice(0, visibleVideoCount).map((video, index) => (
                                            <motion.a
                                                key={index}
                                                href={video.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.01, y: -2, boxShadow: "0 8px 24px hsl(258 50% 10% / 0.12)" }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                                                className={[
                                                    "group w-full p-[var(--space-2)]",
                                                    "bg-[var(--surface-raised)] border border-[var(--border-default)]",
                                                    "rounded-[var(--radius-xl)] hover:border-[var(--color-500)]/30",
                                                    "transition-colors text-left cursor-pointer",
                                                ].join(' ')}
                                            >
                                                <div className="flex items-start gap-[var(--space-2)]">
                                                    {video.thumbnail && (
                                                        <div className="relative w-32 h-20 flex-shrink-0 rounded-[var(--radius-lg)] overflow-hidden">
                                                            <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-[var(--font-weight-semibold)] text-[var(--fg-primary)] mb-[4px] line-clamp-2 group-hover:text-[var(--color-500)] transition-colors">
                                                            {video.title}
                                                        </h4>
                                                        <p className="text-[var(--text-caption)] text-[var(--fg-muted)]">
                                                            {video.channel} {video.duration && `· ${video.duration}`}
                                                        </p>
                                                    </div>
                                                    <span className="flex-shrink-0 w-10 h-10 rounded-[var(--radius-full)] bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                                    </span>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                    {videos.length > visibleVideoCount && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setVisibleVideoCount(videos.length)}
                                            className="w-full py-[var(--space-2)] mt-[var(--space-1)] text-[var(--text-caption)] font-[var(--font-weight-medium)] text-[var(--color-500)] bg-[var(--color-50)] dark:bg-[var(--color-950)]/30 hover:bg-[var(--color-100)] dark:hover:bg-[var(--color-900)]/30 rounded-[var(--radius-lg)] transition-colors flex items-center justify-center gap-[var(--space-1)] min-h-[44px]"
                                            type="button"
                                        >
                                            <span>View More Videos ({videos.length - visibleVideoCount} more)</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                                        </motion.button>
                                    )}
                                </ModalItem>
                            )}

                            {articles.length > 0 && (
                                <ModalItem variants={modalItemVariants}>
                                    <h3 className="text-[var(--text-body)] font-[var(--font-weight-bold)] text-[var(--fg-primary)] mb-[var(--space-2)] flex items-center gap-[var(--space-1)]">
                                        <span className="text-2xl">📄</span> Articles &amp; Guides
                                    </h3>
                                    <div className="flex flex-col gap-[var(--space-1)]">
                                        {articles.map((article, index) => (
                                            <motion.a
                                                key={index}
                                                href={article.url}
                                                target="_blank" rel="noopener noreferrer"
                                                whileHover={{ scale: 1.01, y: -2, boxShadow: "0 8px 24px hsl(258 50% 10% / 0.12)" }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                                                className={[
                                                    "block group p-[var(--space-2)]",
                                                    "bg-[var(--surface-raised)] border border-[var(--border-default)]",
                                                    "rounded-[var(--radius-xl)] hover:border-[var(--color-500)]/30",
                                                    "transition-colors",
                                                ].join(' ')}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 pr-[var(--space-2)]">
                                                        <h4 className="font-[var(--font-weight-semibold)] text-[var(--fg-primary)] mb-[4px] group-hover:text-[var(--color-500)] transition-colors">
                                                            {article.title}
                                                        </h4>
                                                        <p className="text-[var(--text-caption)] text-[var(--fg-muted)] capitalize">{article.source}</p>
                                                    </div>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--fg-muted)] group-hover:text-[var(--color-500)] transition-colors flex-shrink-0" aria-hidden="true">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                                    </svg>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </ModalItem>
                            )}

                            {videos.length === 0 && articles.length === 0 && (
                                <ModalItem variants={modalItemVariants} className="text-center py-[var(--space-5)]">
                                    <div className="text-6xl mb-[var(--space-2)]">🔍</div>
                                    <p className="text-[var(--fg-secondary)] mb-[4px]">No resources found yet</p>
                                    <p className="text-[var(--text-caption)] text-[var(--fg-muted)]">Try searching manually or check back later</p>
                                </ModalItem>
                            )}
                        </ModalContent>
                    )}
                </div>
            </ModalShell>

        </>
    );
}