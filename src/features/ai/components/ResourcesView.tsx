import { ResourceResponse } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { formatISODuration } from '@/features/learning/youtube-utils';
import { cn } from '@/lib/utils';

interface ResourcesViewProps {
    resources: ResourceResponse | null;
    loading: boolean;
}

export function ResourcesView({ resources, loading }: ResourcesViewProps) {
    const [visibleVideoCount, setVisibleVideoCount] = useState(4);
    const [visibleArticleCount, setVisibleArticleCount] = useState(4);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <LoadingSpinner size="lg" label="Searching Resources..." />
            </div>
        );
    }

    if (!resources) {
        return (
            <div className="py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mx-auto mb-6 text-2xl grayscale">
                    📚
                </div>
                <h3 className="text-xl font-bold mb-2">Awaiting Content</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Videos, articles, and practice problems will appear here.</p>
            </div>
        );
    }

    const { videos, articles, practiceProblems } = resources;
    const hasAny = (videos?.length || 0) + (articles?.length || 0) + (practiceProblems?.length || 0) > 0;

    if (!hasAny) {
        return (
            <div className="py-24 text-center">
                <h3 className="text-xl font-bold mb-2">No results discovered</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">The archives are silent on this specific topic.</p>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {/* Videos Section */}
            {videos && videos.length > 0 && (
                <section>
                    <header className="mb-8 flex items-baseline gap-3">
                        <h3 className="text-2xl font-bold tracking-tight">Videos</h3>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{videos.length} found</span>
                    </header>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {videos.slice(0, visibleVideoCount).map((v, i) => (
                            <a
                                key={i}
                                href={v.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden bg-white dark:bg-black transition-none"
                            >
                                <div className="aspect-video relative bg-neutral-100 dark:bg-neutral-900">
                                    {v.thumbnail && (
                                        <Image
                                            src={v.thumbnail}
                                            alt={v.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-none"
                                        />
                                    )}
                                    {v.duration && (
                                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black text-[10px] font-bold text-white rounded-sm">
                                            {formatISODuration(v.duration)}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-[var(--color-primary)] transition-none">{v.title}</h4>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{v.channel}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                    {videos.length > visibleVideoCount && (
                        <button
                            onClick={() => setVisibleVideoCount(v => v + 4)}
                            className="w-full mt-4 py-3 border border-neutral-200 dark:border-neutral-800 rounded-md text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black dark:hover:text-white transition-none"
                        >
                            Load More Videos
                        </button>
                    )}
                </section>
            )}

            {/* Articles Section */}
            {articles && articles.length > 0 && (
                <section>
                    <header className="mb-8 flex items-baseline gap-3">
                        <h3 className="text-2xl font-bold tracking-tight">Articles</h3>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{articles.length} found</span>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {articles.slice(0, visibleArticleCount).map((a, i) => (
                            <a
                                key={i}
                                href={a.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-none group"
                            >
                                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{a.source}</div>
                                <h4 className="font-bold text-sm group-hover:text-[var(--color-primary)] transition-none">{a.title}</h4>
                            </a>
                        ))}
                    </div>
                    {articles.length > visibleArticleCount && (
                        <button
                            onClick={() => setVisibleArticleCount(v => v + 6)}
                            className="w-full mt-4 py-3 border border-neutral-200 dark:border-neutral-800 rounded-md text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black dark:hover:text-white transition-none"
                        >
                            Load More Articles
                        </button>
                    )}
                </section>
            )}

            {/* Practice Problems Section */}
            {practiceProblems && practiceProblems.length > 0 && (
                <section>
                    <header className="mb-8 flex items-baseline gap-3">
                        <h3 className="text-2xl font-bold tracking-tight">Practice</h3>
                    </header>
                    <div className="space-y-2">
                        {practiceProblems.map((p, i) => (
                            <a
                                key={i}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-none group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded border border-neutral-100 dark:border-neutral-900 flex items-center justify-center font-bold text-xs text-neutral-400">
                                        {p.platform.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{p.platform}</span>
                                            {p.difficulty && (
                                                <span className={cn(
                                                    "text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest",
                                                    p.difficulty.toLowerCase() === 'easy' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' :
                                                    p.difficulty.toLowerCase() === 'medium' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600' :
                                                    'bg-red-100 dark:bg-red-900/20 text-red-600'
                                                )}>
                                                    {p.difficulty}
                                                </span>
                                            )}
                                        </div>
                                        <div className="font-bold text-sm group-hover:text-[var(--color-primary)] transition-none">{p.title}</div>
                                    </div>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-neutral-300 group-hover:text-black dark:group-hover:text-white">
                                    <path d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
