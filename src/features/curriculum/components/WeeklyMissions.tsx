import { WeeklyMission } from '@/features/learning/weakness-engine';

interface WeeklyMissionsProps {
    weeklyMissions: WeeklyMission[];
    onTopicClick: (topic: string, description: string) => void;
}

export function WeeklyMissions({ weeklyMissions, onTopicClick }: WeeklyMissionsProps) {
    if (weeklyMissions.length === 0) return null;

    return (
        <div className="px-4 md:px-12 lg:px-20 max-w-[95vw] 2xl:max-w-[1920px] mx-auto mb-8">
            <div className="p-4 rounded-2xl border border-emerald-200/70 dark:border-emerald-500/25 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">Weekly Focus Missions</h3>
                    <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">Auto-generated from weak signals</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {weeklyMissions.map(mission => (
                        <button
                            key={mission.id}
                            type="button"
                            onClick={() => onTopicClick(
                                mission.topic,
                                `${mission.reason}. ${mission.action}`
                            )}
                            className="text-left px-3 py-2 rounded-xl border border-emerald-200/70 dark:border-emerald-500/25 bg-white/70 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.06] transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${mission.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'}`}>
                                    {mission.priority}
                                </span>
                                <span className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 truncate">{mission.title}</span>
                            </div>
                            <p className="text-[11px] text-gray-700 dark:text-gray-300 line-clamp-2">{mission.reason}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
