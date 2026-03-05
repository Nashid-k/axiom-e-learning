import { NextRequest } from 'next/server';
import { ResourceService } from '@/features/learning/resource.service';
import { Logger, getOrCreateRequestId, createLogContext } from '@/lib/api/logger';
import { validateInput, ValidationError, SearchResourcesSchema } from '@/lib/api/validation';
import { successResponse, errorResponse, getHttpStatus, toNextResponse } from '@/lib/api/api-response';
import { classifyError, getUserMessage } from '@/lib/utils/errors';
import { withApiVitals } from '@/lib/monitoring/api-vitals';
import { auth } from '@/lib/auth';

async function POSTHandler(request: NextRequest) {
    const startTime = Date.now();
    const requestId = getOrCreateRequestId(request.headers);

    try {
        const session = await auth();
        if (!session?.user?.email) {
            return toNextResponse(
                errorResponse('UNAUTHORIZED', 'Authentication required', 'contact-support', requestId),
                401
            );
        }

        const body = await request.json();
        const validated = validateInput(SearchResourcesSchema, body);
        const { topicTitle, curriculum, phase } = validated;

        const context = createLogContext(requestId, {
            endpoint: '/api/resources/search',
            topic: topicTitle,
            curriculum,
            phase,
        });

        Logger.info('Resource search request received', context);

        const finalCurriculum = curriculum || 'General';
        const finalPhase = phase || 'Phase 1';

        const result = await ResourceService.findResources(
            topicTitle,
            finalCurriculum,
            finalPhase
        );

        const duration = Date.now() - startTime;
        Logger.info('Resource search completed', {
            ...context,
            source: result.source,
            duration,
            videoCount: (result.resources as { videos?: unknown[] })?.videos?.length || 0,
            articleCount: (result.resources as { articles?: unknown[] })?.articles?.length || 0,
            statusCode: 200,
        });

        const response = successResponse(
            {
                resources: result.resources,
                source: result.source,
            },
            requestId,
            `Found ${(result.resources as { videos?: unknown[] })?.videos?.length || 0} videos and ${(result.resources as { articles?: unknown[] })?.articles?.length || 0} articles`
        );

        return toNextResponse(response, 200);

    } catch (error: unknown) {
        const duration = Date.now() - startTime;

        if (error instanceof ValidationError) {
            const context = createLogContext(requestId, {
                endpoint: '/api/resources/search',
                duration,
                statusCode: 400,
                validationError: error.message,
            });

            Logger.warn('Invalid input to resource search', context);

            const response = errorResponse(
                'INVALID_INPUT',
                error.message,
                'contact-support',
                requestId
            );

            return toNextResponse(response, 400);
        }

        const errorCode = classifyError(error);
        const userMessage = getUserMessage(errorCode);
        const statusCode = getHttpStatus(errorCode);

        const context = createLogContext(requestId, {
            endpoint: '/api/resources/search',
            duration,
            statusCode,
            errorCode,
        });

        Logger.error('Resource search critical error', context, error as Error);

        const response = errorResponse(errorCode, userMessage, 'show-alternatives', requestId);
        return toNextResponse(response, statusCode);
    }
}

export const POST = withApiVitals('/api/resources/search:POST', POSTHandler);
