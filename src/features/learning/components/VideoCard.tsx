'use client';

import Image from 'next/image';
import { extractVideoId, getThumbnailUrl, formatDuration } from '@/features/learning/youtube-utils';
import { VideoData } from '@/types';

interface VideoCardProps {
    video: VideoData;
    onClick: () => void;
    index?: number;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
    const videoId = extractVideoId(video.url);
    if (!videoId) return null;

    const thumbnailUrl = getThumbnailUrl(videoId, 'maxres');

    return (
        <button
            onClick={onClick}
            className="group block w-full text-left bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden hover:border-neutral-400 transition-none"
        >
            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-900">
                <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-none"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black text-[10px] font-bold text-white rounded-sm">
                    {formatDuration(video.duration)}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-brand-500 transition-none">
                    {video.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    <span className="truncate">{video.channel}</span>
                    {video.description && <span className="shrink-0 text-brand-500">Play →</span>}
                </div>
            </div>
        </button>
    );
}
