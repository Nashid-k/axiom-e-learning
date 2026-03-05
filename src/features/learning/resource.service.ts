import { ResourceCache } from '@/lib/db/models';
import { connectToDatabase } from '@/lib/db/mongodb';
import { aiService } from '@/features/ai/ai-service';
import { Article } from '@/types';

export interface VideoResult {
    url: string;
    title: string;
    channel: string;
    channelUrl?: string;
    viewCount?: number;
    likeCount?: number;
    thumbnail?: string;
    duration?: string;
    relevanceScore?: number;
    searchSource: 'YouTube' | 'Google';
    description?: string;
}

export interface PracticeProblem {
    title: string;
    platform: 'LeetCode' | 'Neetcode' | 'HackerRank' | 'CodeSignal' | 'GeeksForGeeks' | 'Other';
    url: string;
    description: string;
}

export interface ProjectIdea {
    title: string;
    description: string;
    url: string;
    source: 'GitHub' | 'Medium' | 'Dev.to' | 'Other';
}


export interface InterviewQuestion {
    title: string;
    url: string;
    source: string;
    snippet: string;
}

const TRUSTED_CHANNELS = [
    'Fireship', 'Traversy Media', 'The Net Ninja', 'Web Dev Simplified',
    'freeCodeCamp.org', 'Academind', 'Codevolution', 'Programming with Mosh',
    'Theo - t3.gg', 'Jack Herrington', 'Kevin Powell', 'Coding in Flow',
    'Dave Gray', 'Ben Awad', 'TechWorld with Nana', 'Hussein Nasser'
];

const VIDEO_QUALITY_THRESHOLDS = {
    minViewCount: 5000,
    minDurationSeconds: 120,
    maxDurationSeconds: 7200,
};

function parseDuration(isoDuration: string | undefined): number {
    if (!isoDuration) return 0;
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
}

export class ResourceService {
    private static readonly GOOGLE_CSE_MAX_QUERIES_PER_CATEGORY = Math.max(
        0,
        Number.parseInt(process.env.GOOGLE_CSE_MAX_QUERIES_PER_CATEGORY || '2', 10) || 2
    );

    static async searchGoogle(query: string, numParams: number = 3): Promise<unknown[]> {
        const customSearchKey = process.env.GOOGLE_SEARCH_API_KEY;
        const customSearchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

        if (!customSearchKey || !customSearchEngineId) {
            console.warn('[Google Search] Missing API credentials. Check GOOGLE_SEARCH_API_KEY and GOOGLE_SEARCH_ENGINE_ID.');
            return [];
        }

        try {
            const url = new URL('https://www.googleapis.com/customsearch/v1');
            url.searchParams.append('key', customSearchKey);
            url.searchParams.append('cx', customSearchEngineId);
            url.searchParams.append('q', query);
            url.searchParams.append('num', String(Math.min(Math.max(numParams, 1), 10)));

            const response = await fetch(url.toString(), { signal: AbortSignal.timeout(15000) });
            const data = await response.json().catch(() => ({}));

            if (data.error) {
                console.error(`[Google Search API Error] "${query}":`, {
                    error: data.error,
                    code: data.error.code,
                    message: data.error.message
                });
                return [];
            }

            if (!response.ok) {
                console.error(`[Google Search HTTP Error] "${query}":`, {
                    status: response.status,
                    statusText: response.statusText,
                    error: data
                });
                return [];
            }

            const items = data.items || [];
            return items;
        } catch (error) {
            console.error(`[Google Search Error] "${query}":`, error);
            return [];
        }
    }

    static async searchYouTube(topic: string, curriculum: string): Promise<VideoResult[]> {
        if (!process.env.YOUTUBE_API_KEY) {
            console.warn('[YouTube Search] Missing YOUTUBE_API_KEY');
            return [];
        }

        const queries = [
            `${topic} tutorial for beginners ${curriculum}`,
            `${topic} crash course explained`,
            `${topic} deep dive advanced`
        ];

        const allVideos: VideoResult[] = [];
        const seenUrls = new Set<string>();

        const searchPromises = queries.map(async (query) => {
            try {
                const url = new URL('https://www.googleapis.com/youtube/v3/search');
                url.searchParams.append('part', 'snippet');
                url.searchParams.append('q', query);
                url.searchParams.append('key', process.env.YOUTUBE_API_KEY!);
                url.searchParams.append('type', 'video');
                url.searchParams.append('maxResults', '5');
                url.searchParams.append('order', 'relevance');

                const response = await fetch(url.toString(), { signal: AbortSignal.timeout(15000) });
                const data = await response.json().catch(() => ({}));

                if (data.error) {
                    console.error(`[YouTube Search API Error] "${query}":`, {
                        error: data.error,
                        code: data.error.code,
                        message: data.error.message
                    });
                    return [];
                }

                if (!response.ok) {
                    console.error(`[YouTube Search HTTP Error] "${query}":`, {
                        status: response.status,
                        statusText: response.statusText,
                        error: data
                    });
                    return [];
                }

                const videoIds = (data.items || []).map((item: { id?: { videoId?: string } }) => item.id?.videoId).filter(Boolean);

                if (videoIds.length > 0) return await this.getVideoDetails(videoIds);
                return [];
            } catch (e) {
                console.error(`[YouTube Search Exception] "${query}":`, e);
                return [];
            }
        });

        const results = await Promise.all(searchPromises);
        results.flat().forEach(v => {
            if (v && !seenUrls.has(v.url)) {
                allVideos.push(v);
                seenUrls.add(v.url);
            }
        });

        const qualityVideos = allVideos
            .filter(v => {
                const duration = parseDuration(v.duration);
                const viewCount = v.viewCount || 0;
                const isTrusted = TRUSTED_CHANNELS.some(ch =>
                    v.channel.toLowerCase().includes(ch.toLowerCase())
                );
                if (isTrusted) return true;
                return viewCount >= VIDEO_QUALITY_THRESHOLDS.minViewCount &&
                    duration >= VIDEO_QUALITY_THRESHOLDS.minDurationSeconds &&
                    duration <= VIDEO_QUALITY_THRESHOLDS.maxDurationSeconds;
            })
            .map(v => {
                const isTrusted = TRUSTED_CHANNELS.some(ch =>
                    v.channel.toLowerCase().includes(ch.toLowerCase())
                );
                return {
                    ...v,
                    relevanceScore: (v.relevanceScore || 1) * (isTrusted ? 1.5 : 1)
                };
            })
            .sort((a, b) => (b.relevanceScore || 1) - (a.relevanceScore || 1));

        if (qualityVideos.length < 5 && allVideos.length > qualityVideos.length) {
            const remaining = allVideos
                .filter(v => !qualityVideos.find(qv => qv.url === v.url))
                .slice(0, 5 - qualityVideos.length)
                .map(v => ({ ...v, relevanceScore: v.relevanceScore || 0.5 }));
            qualityVideos.push(...remaining);
        }

        return qualityVideos.slice(0, 20);
    }

    static async getVideoDetails(videoIds: string[]): Promise<VideoResult[]> {
        try {
            const url = new URL('https://www.googleapis.com/youtube/v3/videos');
            url.searchParams.append('part', 'snippet,statistics,contentDetails');
            url.searchParams.append('id', videoIds.join(','));
            url.searchParams.append('key', process.env.YOUTUBE_API_KEY!);

            const response = await fetch(url.toString(), { signal: AbortSignal.timeout(15000) });
            const data = await response.json().catch(() => ({}));

            if (data.error) {
                console.error(`[YouTube Video Details API Error]:`, {
                    error: data.error,
                    code: data.error.code,
                    message: data.error.message
                });
                return [];
            }

            if (!response.ok) {
                console.error(`[YouTube Video Details HTTP Error]:`, {
                    status: response.status,
                    statusText: response.statusText,
                    error: data
                });
                return [];
            }

            return (data.items || []).map((item: { id: string, snippet?: Record<string, unknown>, statistics?: Record<string, unknown>, contentDetails?: Record<string, unknown> }) => ({
                url: `https://www.youtube.com/watch?v=${item.id}`,
                title: item.snippet?.title as string,
                channel: item.snippet?.channelTitle as string,
                channelUrl: `https://www.youtube.com/channel/${item.snippet?.channelId}`,
                viewCount: parseInt(String(item.statistics?.viewCount || '0')),
                thumbnail: (item.snippet?.thumbnails as { medium?: { url?: string } })?.medium?.url,
                duration: item.contentDetails?.duration as string,
                searchSource: 'YouTube',
                description: item.snippet?.description as string
            }));
        } catch (e) {
            console.error('[YouTube Video Details Exception]:', e);
            return [];
        }
    }


    static async findArticles(topic: string,): Promise<Article[]> {
        const queries = [`${topic} guide`, `${topic} best practices`, `${topic} documentation`];
        const limitedQueries = queries.slice(0, this.GOOGLE_CSE_MAX_QUERIES_PER_CATEGORY);
        const searchResults = await Promise.all(limitedQueries.map(q => this.searchGoogle(q, 3)));

        const rawArticles: Article[] = [];
        searchResults.flat().forEach(item => {
            if (!item) return;
            const i = item as Record<string, unknown>;
            let source = 'Web';
            try { source = new URL(String(i.link)).hostname.replace('www.', ''); } catch { }

            rawArticles.push({
                url: String(i.link || ''),
                title: String(i.title || ''),
                source,
                snippet: String(i.snippet || '')
            });
        });

        return rawArticles;
    }

    static async findPracticeProblems(topic: string,): Promise<PracticeProblem[]> {
        const queries = [`${topic} practice problems`, `${topic} exercises`, `${topic} coding challenges`];
        const limitedQueries = queries.slice(0, this.GOOGLE_CSE_MAX_QUERIES_PER_CATEGORY);
        const searchResults = await Promise.all(limitedQueries.map(q => this.searchGoogle(q, 3)));

        const rawProblems: PracticeProblem[] = [];
        searchResults.flat().forEach(item => {
            if (!item) return;
            const i = item as Record<string, unknown>;
            let platform: PracticeProblem['platform'] = 'Other';

            const linkStr = String(i.link || '');
            if (linkStr.includes('leetcode')) platform = 'LeetCode';
            else if (linkStr.includes('neetcode')) platform = 'Neetcode';
            else if (linkStr.includes('hackerrank')) platform = 'HackerRank';
            else if (linkStr.includes('geeksforgeeks')) platform = 'GeeksForGeeks';

            rawProblems.push({
                title: String(i.title || ''),
                platform,
                url: linkStr,
                description: String(i.snippet || '')
            });
        });

        return rawProblems;
    }

    static async findProjectIdeas(topic: string,): Promise<ProjectIdea[]> {
        const queries = [`${topic} project ideas`, `${topic} build project`, `${topic} github project`];
        const limitedQueries = queries.slice(0, this.GOOGLE_CSE_MAX_QUERIES_PER_CATEGORY);
        const searchResults = await Promise.all(limitedQueries.map(q => this.searchGoogle(q, 3)));

        const rawProjects: ProjectIdea[] = [];
        searchResults.flat().forEach(item => {
            if (!item) return;
            const i = item as Record<string, unknown>;
            let source: ProjectIdea['source'] = 'Other';
            const linkStr = String(i.link || '');
            if (linkStr.includes('github')) source = 'GitHub';
            else if (linkStr.includes('medium')) source = 'Medium';
            else if (linkStr.includes('dev.to')) source = 'Dev.to';

            rawProjects.push({
                title: String(i.title || ''),
                description: String(i.snippet || ''),
                url: linkStr,
                source
            });
        });

        return rawProjects;
    }

    static async findInterviewQuestions(topic: string): Promise<InterviewQuestion[]> {
        const queries = [`${topic} interview questions`, `${topic} technical interview`];
        const limitedQueries = queries.slice(0, this.GOOGLE_CSE_MAX_QUERIES_PER_CATEGORY);
        const searchResults = await Promise.all(limitedQueries.map(q => this.searchGoogle(q, 3)));

        const rawQuestions: InterviewQuestion[] = [];
        searchResults.flat().forEach(item => {
            if (!item) return;
            const i = item as Record<string, unknown>;
            let source = 'Web';
            try { source = new URL(String(i.link)).hostname.replace('www.', ''); } catch { }

            rawQuestions.push({
                title: String(i.title || ''),
                url: String(i.link || ''),
                source,
                snippet: String(i.snippet || '')
            });
        });

        return rawQuestions;
    }

    static async generateAiPracticeProblems(topic: string): Promise<PracticeProblem[]> {
        try {
            const prompt = `
            You are a coding curriculum expert.
            The user is studying: "${topic}".
            
            Generate 5 relevant, high-quality coding practice problems for this specific topic found on popular platforms (LeetCode, HackerRank, CodeWars, etc.).
            
            Return ONLY a valid JSON array of objects with these fields:
            - title: string (The verified problem title)
            - platform: "LeetCode" | "HackerRank" | "CodeSignal" | "GeeksForGeeks" | "Other"
            - url: string (CRITICAL: Must be the EXACT direct link to the problem. Example: "https://leetcode.com/problems/reverse-linked-list/". Do NOT use search URLs. If the exact URL is unknown, reconstruct it using standard slug patterns like kebab-case).
            - description: string (Short 1-sentence summary of the task)
            - difficulty: "Easy" | "Medium" | "Hard"

            Ensure the problems are real, popular, and directly relevant to "${topic}".
            Do not include Markdown formatting (like \`\`\`json). Just the raw JSON string.
            `;

            const content = await aiService.complete(
                [{ role: 'user', content: prompt }],
                'reasoning',
                true
            );

            const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
            const generated = JSON.parse(cleanContent);
            return Array.isArray(generated) ? generated : [];

        } catch (error) {
            console.error('[ResourceService] AI Generate Error:', error);
            return [];
        }
    }

    static async findResources(topicTitle: string, curriculum: string, phase: string) {
        const cacheKey = `${curriculum}-${phase}-${topicTitle}`.toLowerCase().replace(/\s+/g, '-');
        let cached = null;

        try {
            await connectToDatabase();
            cached = await ResourceCache.findOne({ topicKey: cacheKey });
        } catch (dbError) {
            console.warn('[ResourceService] Database connection failed, bypassing cache:', dbError);
        }

        if (cached) {
            return {
                resources: cached.resources,
                source: 'cache'
            };
        }

        const hasGoogle = !!process.env.GOOGLE_SEARCH_API_KEY;
        const hasGoogleEngineId = !!process.env.GOOGLE_SEARCH_ENGINE_ID;


        let articleResults: Article[] = [];
        let practiceProblems: PracticeProblem[] = [];
        let projectIdeas: ProjectIdea[] = [];
        let interviewQuestions: InterviewQuestion[] = [];

        const videoResults = await this.searchYouTube(topicTitle, curriculum);

        if (hasGoogle && hasGoogleEngineId) {
            try {
                [articleResults, practiceProblems, projectIdeas, interviewQuestions] = await Promise.all([
                    this.findArticles(topicTitle),
                    this.findPracticeProblems(topicTitle),
                    this.findProjectIdeas(topicTitle),
                    this.findInterviewQuestions(topicTitle)
                ]);
            } catch (err) {
                console.error('[ResourceService] Google Search failed, using fallback:', err);
            }
        }

        if (practiceProblems.length < 3) {
            try {
                const aiProblems = await this.generateAiPracticeProblems(topicTitle);
                const existingUrls = new Set(practiceProblems.map(p => p.url));
                const existingTitles = new Set(practiceProblems.map(p => p.title));

                aiProblems.forEach(p => {
                    if (!existingUrls.has(p.url) && !existingTitles.has(p.title)) {
                        practiceProblems.push(p);
                    }
                });
            } catch (err) {
                console.error('[ResourceService] AI generation failed:', err);
            }
        }


        const resources = {
            videos: videoResults,
            articles: articleResults,
            practiceProblems,
            projectIdeas,
            interviewQuestions
        };

        try {
            await ResourceCache.create({
                topicKey: cacheKey,
                topicTitle,
                curriculum,
                phase,
                resources,
                hitCount: 1
            });
        } catch (e) {
            console.warn('[ResourceService] Failed to cache resources:', e);
        }

        return { resources, source: 'api' };
    }
}
