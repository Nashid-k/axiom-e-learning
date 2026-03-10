import { memo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RichItem } from '@/types';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/motion/motion-config';

export const TopicRow = memo(function TopicRow({
    item,
    phaseTitle,
    isChecked,
    onClick,
    colorClass
}: {
    item: RichItem;
    phaseTitle: string;
    isChecked: boolean;
    onClick: (topic: string, desc: string, initialTab?: 'ai' | 'resources' | 'dojo' | 'quiz') => void;
    colorClass: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, x: 4, transition: springs.snap }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "py-2.5 px-3 rounded-xl transition-all group/item cursor-pointer flex items-center gap-3",
                isChecked
                    ? "bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
            )}
            onClick={() => {
                onClick(
                    item.title,
                    item.description || `Learn about ${item.title} in ${phaseTitle}`
                );
            }}
        >
            <div className={cn(
                "w-2 h-2 rounded-full shrink-0 transition-all duration-500",
                isChecked
                    ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-check-pop"
                    : "bg-gray-300 dark:bg-white/20"
            )} />

            <div className="flex-1 min-w-0">
                <div className={cn(
                    "text-sm font-medium transition-colors line-clamp-2",
                    isChecked
                        ? "text-green-700 dark:text-green-400/80 line-through"
                        : `text-gray-900 dark:text-white/90 ${colorClass}`
                )}>
                    {item.title}
                </div>
            </div>

            {isChecked && (
                <div className="flex items-center gap-1.5 bg-green-500/20 dark:bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/30">
                    <span className="text-[9px] font-black text-green-600 dark:text-green-400 uppercase tracking-tighter">Mastered</span>
                </div>
            )}
        </motion.div>
    );
});

const sharedObserver = typeof window !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-topic-id');
                    if (id) {
                        const event = new CustomEvent(`topic-visible-${id}`);
                        window.dispatchEvent(event);
                    }
                }
            });
        },
        { rootMargin: '100px', threshold: 0 }
    )
    : null;

export const VirtualizedTopic = memo(function VirtualizedTopic({ children, id }: { children: React.ReactNode, id: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sharedObserver || !ref.current) return;

        const handleVisible = () => {
            setIsVisible(true);
            if (ref.current) sharedObserver.unobserve(ref.current);
        };

        window.addEventListener(`topic-visible-${id}`, handleVisible);
        sharedObserver.observe(ref.current);

        return () => {
            window.removeEventListener(`topic-visible-${id}`, handleVisible);
            if (ref.current) sharedObserver.unobserve(ref.current);
        };
    }, [id]);

    return (
        <div ref={ref} data-topic-id={id} className="min-h-[44px]">
            {isVisible ? children : <div className="h-[44px] animate-pulse bg-gray-100/50 dark:bg-white/5 rounded-xl border border-transparent" />}
        </div>
    );
});
