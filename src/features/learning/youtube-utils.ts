export function extractVideoId(url: string): string | null {
    if (!url) return null;

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

export function getThumbnailUrl(
    videoId: string,
    quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'maxres'
): string {
    const qualityMap = {
        default: 'default',
        hq: 'hqdefault',
        mq: 'mqdefault',
        sd: 'sddefault',
        maxres: 'maxresdefault'
    };

    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

export function getEmbedUrl(videoId: string, autoplay: boolean = false): string {
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`;
}

export function formatDuration(duration: string): string {
    const parts = duration.split(':');
    if (parts.length === 2) {
        return `${parseInt(parts[0])}:${parts[1]}`;
    }
    if (parts.length === 3) {
        const hours = parseInt(parts[0]);
        return hours > 0 ? `${hours}:${parts[1]}:${parts[2]}` : `${parseInt(parts[1])}:${parts[2]}`;
    }
    return duration;
}

export function formatISODuration(isoDuration: string | undefined): string {
    if (!isoDuration) return '';

    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '';

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${minutes}:${pad(seconds)}`;
}
