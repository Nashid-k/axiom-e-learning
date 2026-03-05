import { ResourceResponse } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CyclingStatus } from '@/components/ui/CyclingStatus';
import { formatISODuration } from '@/features/learning/youtube-utils';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

interface ResourcesViewProps {
    resources: ResourceResponse | null;
    loading: boolean;
}

export function ResourcesView({ resources, loading }: ResourcesViewProps) {

    const [visibleVideoCount, setVisibleVideoCount] = useState(4);
    const [visibleArticleCount, setVisibleArticleCount] = useState(4);
    const [visibleProblemCount] = useState(4);

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[400px]">
                { }
                <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-r-blue-500/50 animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
                </div>

                { }
                <CyclingStatus
                    loading={loading}
                    className="text-xs text-gray-400 dark:text-gray-500 mt-3 max-w-xs text-center font-bold uppercase tracking-widest"
                    messages={[
                        "Scanning archives...",
                        "Decrypting data streams...",
                        "Locating visual guides...",
                        "Compiling mastery trials...",
                        "Finalizing resources..."
                    ]}
                />
            </div>
        );
    }

    if (!resources) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-[400px] opacity-40">
                <div className="text-6xl mb-6 grayscale saturate-0">📚</div>
                <p className="text-xl font-black text-black dark:text-white mb-2 uppercase tracking-tighter">Awaiting Search Queries</p>
                <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">Videos, articles, and practice problems</p>
            </div>
        );
    }

    const { videos, articles, practiceProblems } = resources;
    const hasAny = (videos?.length || 0) + (articles?.length || 0) + (practiceProblems?.length || 0) > 0;

    if (!hasAny) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 animate-pulse border-2 border-white dark:border-gray-900" />
                </div>
                <p className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">No resources discovered yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 max-w-xs mx-auto leading-relaxed">
                    The archives are currently silent on this topic.
                    Try breaking it down into smaller concepts or check back later.
                </p>
            </div>
        );

    }
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-16 pb-12"
        >
            { }
            {videos && videos.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-black dark:text-white tracking-tighter">Visual Demonstrations.</h3>
                    </div>
                    <motion.div
                        key="video-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                    >
                        {videos.slice(0, visibleVideoCount).map((v, i) => (
                            <motion.a
                                key={i}
                                variants={itemVariants}
                                href={v.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/video relative block w-full text-left rounded-[24px] bg-gray-50/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden shadow-2xl"
                            >
                                <div className="aspect-video relative overflow-hidden bg-black/40">
                                    {v.thumbnail ? (
                                        <Image
                                            src={v.thumbnail}
                                            alt={v.title}
                                            fill
                                            className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 group-hover/video:scale-110 transition-all duration-1000 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                                            <svg className="w-16 h-16 text-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover/video:opacity-40 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-all duration-700 transform translate-y-8 group-hover/video:translate-y-0">
                                        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                                            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                    {v.duration && (
                                        <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xl text-[10px] font-black text-white shadow-2xl border border-white/10 tracking-widest leading-none">
                                            {formatISODuration(v.duration)}
                                        </span>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h4 className="font-extrabold text-lg text-black dark:text-white/90 line-clamp-2 leading-tight group-hover/video:text-blue-500 transition-colors mb-4 tracking-tight">{v.title}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-white/20">{v.channel}</span>
                                        {v.viewCount && <span className="text-[10px] font-black text-gray-400 dark:text-white/10 uppercase tracking-widest">{new Intl.NumberFormat('en-US', { notation: "compact" }).format(v.viewCount)} views</span>}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    {videos.length > visibleVideoCount && (
                        <button
                            onClick={() => setVisibleVideoCount(prev => prev + 12)}
                            className="w-full py-6 mt-10 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-blue-500 hover:bg-blue-500/5 border border-black/5 dark:border-white/5 rounded-3xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
                        >
                            <span>Reveal More Demonstrations ({videos.length - visibleVideoCount})</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                    )}
                </section>
            )}

            { }
            {articles && articles.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/5">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.183 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-black dark:text-white tracking-tighter">Scrolls of Enlightenment.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {articles.slice(0, visibleArticleCount).map((a, i) => (
                            <motion.a
                                key={i}
                                variants={itemVariants}
                                href={a.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-6 rounded-[24px] bg-gray-50/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500 shadow-xl"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">{a.source}</span>
                                        <svg className="w-4 h-4 text-gray-400 transition-all transform group-hover:translate-x-1 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </div>
                                    <h4 className="font-extrabold text-base text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2 leading-relaxed tracking-tight">{a.title}</h4>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                    {articles.length > visibleArticleCount && (
                        <button
                            onClick={() => setVisibleArticleCount(prev => prev + 12)}
                            className="w-full py-6 mt-10 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-blue-500 hover:bg-blue-500/5 border border-black/5 dark:border-white/5 rounded-3xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
                        >
                            <span>Unroll More Scrolls ({articles.length - visibleArticleCount})</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                    )}
                </section>
            )}

            { }
            {practiceProblems && practiceProblems.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 shadow-lg shadow-pink-500/5">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-black dark:text-white tracking-tighter">Trials of Mastery.</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {practiceProblems.slice(0, visibleProblemCount).map((p, i) => (
                            <motion.a
                                key={i}
                                variants={itemVariants}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 rounded-[24px] bg-gray-50/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-pink-500/30 hover:bg-white/[0.04] transition-all duration-500 flex items-center justify-between shadow-xl"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:bg-pink-500/10 transition-colors shadow-sm">
                                        <span className="text-sm font-black text-gray-400 dark:text-white/20 group-hover:text-pink-500 transition-colors">{p.platform.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500/60">{p.platform}</span>
                                            {p.difficulty && (
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${p.difficulty.toLowerCase() === 'easy' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    p.difficulty.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                                                        'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    {p.difficulty}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-extrabold text-lg text-gray-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors tracking-tight">{p.title}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hidden sm:block opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all font-mono">Begin Trial</span>
                                    <div className="w-10 h-10 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:border-pink-500/30 group-hover:bg-pink-500/10 transition-all shadow-sm">
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-all transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>
            )}
        </motion.div>
    );
}
