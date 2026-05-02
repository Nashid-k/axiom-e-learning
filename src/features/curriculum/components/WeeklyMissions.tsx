import { WeeklyMission } from '@/features/learning/weakness-engine';
import { cn } from '@/lib/utils';

interface WeeklyMissionsProps {
    weeklyMissions: WeeklyMission[];
    onTopicClick: (topic: string, description: string) => void;
}

export function WeeklyMissions({ weeklyMissions, onTopicClick }: WeeklyMissionsProps) {
    if (weeklyMissions.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="p-6 border border-[var(--surface-border)] rounded-md bg-[var(--surface-base)]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Weekly Focus</h3>
                    <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest">Weakness Signal Detection</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {weeklyMissions.map(mission => (
                        <button
                            key={mission.id}
                            type="button"
                            onClick={() => onTopicClick(mission.topic, `${mission.reason}. ${mission.action}`)}
                            className="text-left p-4 border border-[var(--surface-border)] bg-[var(--surface-raised)] rounded-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-none group"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className={cn(
                                    "text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-widest",
                                    mission.priority === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                                )}>
                                    {mission.priority}
                                </span>
                                <span className="text-xs font-bold truncate group-hover:text-[var(--color-primary)] transition-none">{mission.title}</span>
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">{mission.reason}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
