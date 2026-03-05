'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { extractVideoId, getThumbnailUrl, formatDuration } from '@/features/learning/youtube-utils';
import { VideoData } from '@/types';

interface VideoCardProps {
    video: VideoData;
    onClick: () => void;
    index?: number;
}

export default function VideoCard({ video, onClick, index = 0 }: VideoCardProps) {
    const videoId = extractVideoId(video.url);

    if (!videoId) return null;

    const thumbnailUrl = getThumbnailUrl(videoId, 'maxres');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className="group cursor-pointer bg-white dark:bg-[#1C1C1E] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all hover:shadow-xl"
        >
            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => {
                    }}
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all"
                    >
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </motion.div>
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-semibold rounded">
                    {formatDuration(video.duration)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#007AFF] transition-colors">
                    {video.title}
                </h3>

                {video.channel && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {video.channel}
                    </p>
                )}

                {video.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2">
                        {video.description}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
