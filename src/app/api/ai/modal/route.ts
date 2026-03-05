export const maxDuration = 30;

import connectToDatabase from '@/lib/db/mongodb';
import { StudyGuideCache } from '@/lib/db/models';
import { NextResponse } from 'next/server';
import { aiService } from '@/features/ai/ai-service';
import { buildSystemPrompt, buildRewritePrompt } from '@/features/ai/prompts';
import { buildEnhancedCategoryContext } from '@/features/curriculum/curriculum-context';
import { classifyError } from '@/lib/utils/errors';
import { Logger, getOrCreateRequestId, createLogContext } from '@/lib/api/logger';
import { ValidationError } from '@/lib/api/validation';
import { errorResponse, getHttpStatus, toNextResponse } from '@/lib/api/api-response';
import { cache as redisCache, cacheKeys } from '@/lib/db/redis';
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import { auth } from '@/lib/auth';

const REDIS_TTL = 24 * 60 * 60;

const CONCEPTUAL_CATEGORIES = new Set([
    'system design', 'networking', 'operating systems', 'interview prep', 'general', 'devops'
]);

function getSmartTemperature(category: string, mode: string, isFollowUp: boolean): number {
    if (mode === 'quiz') return 0.7;
    if (isFollowUp) return 0.5;
    if (CONCEPTUAL_CATEGORIES.has(category?.toLowerCase())) return 0.4;
    return 0.15;
}

async function POSTHandler(req: Request) {
    const startTime = Date.now();
    const requestId = getOrCreateRequestId(req.headers);

    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        const body = await req.json();
        const { topic, category, description, phase, forceRefresh, mode, persona, difficulty, messages: history, existingContent } = body;
        const quizDifficulty: 'easy' | 'medium' | 'hard' =
            difficulty === 'easy' || difficulty === 'hard' ? difficulty : 'medium';

        if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
            throw new ValidationError('Topic is required');
        }

        const isFollowUp = history && history.length > 0;
        const isRewrite = !!existingContent && !isFollowUp;

        const context = createLogContext(requestId, {
            endpoint: '/api/ai/modal',
            topic,
            category,
            phase,
            mode,
            persona,
            quizDifficulty,
            isRewrite
        });


        const difficultySuffix = mode === 'quiz' ? `-${quizDifficulty}` : '';
        const cacheKey = `${topic}-${category}-${mode}-${persona}-${phase || 0}${difficultySuffix}`.toLowerCase().replace(/\s+/g, '-');
        const redisCacheKey = `${cacheKeys.aiModal(topic, category, mode, persona, phase)}${difficultySuffix}`;

        if (!isRewrite && !isFollowUp && !forceRefresh && redisCache.isAvailable()) {
            const cached = await redisCache.get<string>(redisCacheKey);
            if (cached) {
                Logger.info('Cache hit (Redis)', { ...context, cache: 'L1' });
                return new Response(cached, {
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'X-Cache': 'HIT_REDIS',
                        'X-Request-ID': requestId,
                    }
                });
            }
        }

        if (!isRewrite && !isFollowUp && !forceRefresh) {
            await connectToDatabase();
            const cached = await StudyGuideCache.findOne({
                topicId: cacheKey,
                mode: mode === 'quiz' ? 'quiz' : 'theory'
            }).lean();

            if (cached && cached.content) {
                Logger.info('Cache hit (MongoDB)', { ...context, cache: 'L2' });
                if (redisCache.isAvailable()) {
                    redisCache.set(redisCacheKey, cached.content, REDIS_TTL).catch(() => { });
                }

                return new Response(cached.content, {
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'X-Cache': 'HIT_MONGODB',
                        'X-Request-ID': requestId,
                    }
                });
            }
        }


        let systemPrompt = '';
        if (isRewrite) {
            systemPrompt = buildRewritePrompt(persona);
        } else {
            const basePrompt = buildSystemPrompt(category, topic, description, mode, persona, quizDifficulty);
            const curriculumContext = buildEnhancedCategoryContext(category, topic, phase, 1500);
            systemPrompt = mode === 'quiz' ? basePrompt : `${basePrompt}\n\n${curriculumContext}`;
        }

        let aiMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
            { role: 'system', content: systemPrompt }
        ];

        if (isFollowUp) {
            const recentHistory = Array.isArray(history) ? history.slice(-8) : [];
            const sanitizedHistory = recentHistory
                .filter((msg): msg is { role: 'user' | 'assistant' | 'system'; content: string } =>
                    !!msg &&
                    typeof msg === 'object' &&
                    'role' in msg &&
                    'content' in msg &&
                    typeof (msg as { role?: unknown }).role === 'string' &&
                    typeof (msg as { content?: unknown }).content === 'string'
                )
                .map(msg => ({
                    role: msg.role,
                    content: msg.content.length > 3000 ? msg.content.slice(0, 3000) + '...' : msg.content
                }));
            aiMessages = [...aiMessages, ...sanitizedHistory];
        } else if (isRewrite) {
            aiMessages.push({
                role: 'user',
                content: `Here is the content to rewrite:\n\n${existingContent}\n\nRewrite the explanations in the style of ${persona === 'buddy' ? 'Code Buddy' : 'Senior Architect'}. KEEP CODE BLOCKS EXACTLY THE SAME.`
            });
        } else {
            aiMessages.push({ role: 'user', content: `Explain "${topic}" in a structured, educational way.` });
        }

        const modelType = isFollowUp
            ? 'fast'
            : isRewrite
                ? 'fast'
                : mode === 'quiz'
                    ? 'creative'
                    : 'reasoning';

        const rawStream = await aiService.stream(
            aiMessages,
            modelType,
            getSmartTemperature(category, mode, isFollowUp)
        );

        let fullContent = '';
        const cachingStream = new TransformStream({
            transform(chunk, controller) {
                const text = new TextDecoder().decode(chunk);
                fullContent += text;
                controller.enqueue(chunk);
            },
            flush() {
                const duration = Date.now() - startTime;
                Logger.info('Stream completed', { ...context, duration, contentLength: fullContent.length });

                const isQualityContent = fullContent
                    && fullContent.length > 200
                    && !fullContent.includes('[Error]')
                    && (mode === 'quiz' || fullContent.includes('#'));

                if (isQualityContent && !isFollowUp) {
                    redisCache.set(redisCacheKey, fullContent, REDIS_TTL).catch(() => { });
                    StudyGuideCache.findOneAndUpdate(
                        { topicId: cacheKey, mode: mode === 'quiz' ? 'quiz' : 'theory' },
                        {
                            $set: {
                                content: fullContent,
                                category: category || 'General',
                                lastAccessed: new Date(),
                            },
                            $inc: { accessCount: 1 },
                            $setOnInsert: { createdAt: new Date() }
                        },
                        { upsert: true }
                    ).catch(dbErr => {
                        Logger.warn('Cache save failed', {
                            ...context,
                            cacheError: dbErr instanceof Error ? dbErr.message : 'unknown'
                        });
                    });
                }
            }
        });

        return new Response(rawStream.pipeThrough(cachingStream), {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'X-Request-ID': requestId,
                'X-Cache': 'GENERATED',
            },
        });

    } catch (error: unknown) {
        const duration = Date.now() - startTime;

        if (error instanceof ValidationError) {
            const context = createLogContext(requestId, {
                endpoint: '/api/ai/modal',
                duration,
                statusCode: 400,
                validationError: error.message,
            });
            Logger.warn('Invalid input to AI modal', context);
            return toNextResponse(errorResponse('INVALID_INPUT', error.message, 'contact-support', requestId), 400);
        }

        const errorCode = classifyError(error);
        const statusCode = getHttpStatus(errorCode);

        const context = createLogContext(requestId, {
            endpoint: '/api/ai/modal',
            duration,
            statusCode,
            errorCode,
        });

        Logger.error('AI Modal API critical error', context, error as Error);
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}

export const POST = withApiVitals('/api/ai/modal:POST', POSTHandler);
