import { useMemo } from 'react';
import { CurriculumData } from '@/types';

interface ArcadeSectionProps {
    data: CurriculumData;
}

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
        <section className="max-w-7xl mx-auto px-6 mb-24">
            <header className="flex items-baseline gap-3 mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Simulators</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{allGames.length} Available</span>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allGames.map((game, idx) => (
                    <a
                        key={`${game.title}-${idx}`}
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-5 border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-black hover:border-neutral-400 dark:hover:border-neutral-600 transition-none"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-8 h-8 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400">
                                {game.title.charAt(0)}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                Phase {game.phaseId}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-1 group-hover:text-[var(--color-primary)] transition-none truncate">{game.title}</h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 truncate">
                                {game.description || `Master ${game.phaseTitle}`}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
