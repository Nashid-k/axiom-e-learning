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
            className="group block w-full text-left bg-[var(--surface-base)] border border-[var(--surface-border)] rounded-md overflow-hidden hover:border-[var(--fg-muted)] transition-none"
        >
            <div className="relative aspect-video bg-[var(--surface-raised)]">
                <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-none"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black text-[10px] font-bold text-white rounded-md">
                    {formatDuration(video.duration)}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-[var(--color-primary)] transition-none">
                    {video.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                    <span className="truncate">{video.channel}</span>
                    {video.description && <span className="shrink-0 text-[var(--color-primary)]">Play →</span>}
                </div>
            </div>
        </button>
    );
}
