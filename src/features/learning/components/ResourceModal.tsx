'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ModalShell, ModalCloseButton } from '@/components/ui/ModalShell';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface Video { url: string; title: string; channel: string; duration?: string; thumbnail?: string; }
interface Article { url: string; title: string; source: string; }
interface ResourceModalProps { topicTitle: string; curriculum: string; phase: string; onClose: () => void; }

export default function ResourceModal({ topicTitle, curriculum, phase, onClose }: ResourceModalProps) {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<Video[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [fallbackUrls, setFallbackUrls] = useState<{ youtubeSearchUrl?: string; articleSearchUrls?: Record<string, string> } | null>(null);

    useEffect(() => {
        let mounted = true;
        fetch('/api/resources/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topicTitle, curriculum, phase }),
        }).then(res => res.json()).then(data => {
            if (mounted) {
                if (data.fallback) setFallbackUrls(data);
                else if (data.resources) { setVideos(data.resources.videos || []); setArticles(data.resources.articles || []); }
                setLoading(false);
            }
        }).catch(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, [topicTitle, curriculum, phase]);

    return (
        <ModalShell isOpen onClose={onClose} containerClassName="w-[95vw] max-w-4xl max-h-[90vh]">
            <div className="sticky top-0 z-10 bg-[var(--surface-base)] border-b border-[var(--surface-border)] p-6 flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold mb-1">{topicTitle}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{curriculum} · {phase}</p>
                </div>
                <ModalCloseButton onClose={onClose} />
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
                {loading ? (
                    <div className="py-20 flex items-center justify-center">
                        <LoadingSpinner size="lg" label="Loading resources" />
                    </div>
                ) : fallbackUrls ? (
                    <div className="py-12 space-y-4 text-center">
                        <p className="text-sm text-neutral-500">API keys not configured. Use these search links:</p>
                        {fallbackUrls.youtubeSearchUrl && (
                            <a href={fallbackUrls.youtubeSearchUrl} target="_blank" rel="noopener noreferrer" className="block p-4 bg-red-50 text-red-600 border border-red-200 rounded-md font-bold text-sm">Search YouTube</a>
                        )}
                        {fallbackUrls.articleSearchUrls && Object.entries(fallbackUrls.articleSearchUrls).map(([source, url]) => (
                            <a key={source} href={url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-neutral-50 text-black border border-neutral-200 rounded-md font-bold text-sm capitalize">Search {source}</a>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12">
                        {videos.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Videos</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {videos.map((video, idx) => (
                                        <a key={idx} href={video.url} target="_blank" rel="noopener noreferrer" className="group border border-[var(--surface-border)] rounded-md overflow-hidden bg-[var(--surface-base)] hover:border-neutral-400">
                                            {video.thumbnail && (
                                                <div className="aspect-video relative bg-[var(--surface-raised)]">
                                                    <Image src={video.thumbnail} alt={video.title} fill className="object-cover grayscale group-hover:grayscale-0" />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h4 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-[var(--color-primary)]">{video.title}</h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{video.channel} {video.duration && `· ${video.duration}`}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                        {articles.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Articles</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {articles.map((article, idx) => (
                                        <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer" className="p-4 border border-[var(--surface-border)] rounded-md hover:border-neutral-400 group">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{article.source}</div>
                                            <h4 className="font-bold text-sm group-hover:text-[var(--color-primary)]">{article.title}</h4>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </ModalShell>
    );
}
