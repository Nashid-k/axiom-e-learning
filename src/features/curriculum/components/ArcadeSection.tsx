import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CurriculumData } from '@/types';

interface ArcadeSectionProps {
    data: CurriculumData;
}

const getGameArt = (title: string, phaseId: number) => {
    const colors = [
        'from-blue-500 to-cyan-400',
        'from-blue-500 to-pink-500',
        'from-emerald-500 to-teal-400',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-blue-500',
        'from-pink-500 to-rose-500',
    ];

    const sum = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = (sum + phaseId) % colors.length;

    return {
        gradient: colors[colorIndex],
        icon: getIconForTitle(title)
    };
};

const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('frog')) return '🐸';
    if (t.includes('css')) return '🎨';
    if (t.includes('grid')) return '📅';
    if (t.includes('box')) return '📦';
    if (t.includes('flex')) return '💪';
    if (t.includes('elevator')) return '🛗';
    if (t.includes('defense')) return '🛡️';
    if (t.includes('garden')) return '🌻';
    if (t.includes('diner')) return '🍽️';
    if (t.includes('sql')) return '💾';
    if (t.includes('query')) return '🔍';
    if (t.includes('tree')) return '🌳';
    if (t.includes('graph')) return '🕸️';
    if (t.includes('sort')) return '📶';
    return '🎮';
};

export function ArcadeSection({ data }: ArcadeSectionProps) {
    const allGames = useMemo(() => {
        return data.phases.flatMap(phase =>
            (phase.games || []).map(game => {
                const gameObj = typeof game === 'string' ? { title: game, url: '#', description: '' } : game;
                return {
                    ...gameObj,
                    phaseId: Number(phase.phase),
                    phaseTitle: phase.title
                };
            })
        );
    }, [data.phases]);

    if (allGames.length === 0) return null;

    return (
        <section className="px-6 md:px-12 lg:px-20 max-w-[95vw] 2xl:max-w-[1920px] mx-auto mb-12">
            <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500">
                    🎮
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Training Simulators
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-[10px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider">
                    {allGames.length} Available
                </span>
            </div>

            {}
            <div className="relative group">
                <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
                    {allGames.map((game, idx) => {
                        const art = getGameArt(game.title, game.phaseId);

                        return (
                            <motion.a
                                key={`${game.title}-${idx}`}
                                href={game.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="snap-start shrink-0 w-[240px] h-[160px] relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group/card bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10"
                            >
                                {}
                                <div className={`absolute inset-0 bg-gradient-to-br ${art.gradient} opacity-20 group-hover/card:opacity-30 transition-opacity`} />

                                {}
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 contrast-150 mix-blend-overlay" />

                                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-gray-200 dark:border-white/10">
                                            {art.icon}
                                        </div>
                                        <span className="px-2 py-1 rounded bg-black/5 dark:bg-black/40 backdrop-blur border border-black/5 dark:border-white/5 text-[9px] font-bold text-gray-600 dark:text-white/80 uppercase tracking-wider">
                                            Phase {game.phaseId}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 line-clamp-2 drop-shadow-sm dark:drop-shadow-md">
                                            {game.title}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 dark:text-white/60 line-clamp-1">
                                            {game.description || `Master ${game.phaseTitle}`}
                                        </p>
                                    </div>
                                </div>

                                {}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity backdrop-blur-[2px]">
                                    <span className="px-4 py-2 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        Play
                                    </span>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {}
                <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-[#050505] to-transparent pointer-events-none md:block hidden" />
            </div>
        </section>
    );
}
