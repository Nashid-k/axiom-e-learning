import { recordApiVital } from '@/lib/monitoring/vitals-store';
import { persistApiVital } from '@/lib/monitoring/vitals-db';

type RouteContext = Record<string, unknown>;
type RouteHandler<TRequest extends Request = Request, TContext = RouteContext> = (
    request: TRequest,
    context: TContext
) => Promise<Response> | Response;

function nowMs(): number {
    return typeof performance !== 'undefined' && typeof performance.now === 'function'
        ? performance.now()
        : Date.now();
}

function getPathFromRequest(request: Request): string {
    try {
        return new URL(request.url).pathname;
    } catch {
        return 'unknown';
    }
}

function appendTimingHeaders(response: Response, durationMs: number, endpoint: string) {
    try {
        const existingTiming = response.headers.get('server-timing');
        const currentTiming = `app;dur=${durationMs.toFixed(1)};desc="${endpoint}"`;
        response.headers.set('server-timing', existingTiming ? `${existingTiming}, ${currentTiming}` : currentTiming);
        response.headers.set('x-response-time-ms', durationMs.toFixed(1));
        response.headers.set('x-vitals-endpoint', endpoint);
    } catch {
    }
}

function round(value: number): number {
    return Math.round(value * 100) / 100;
}

export function withApiVitals<TRequest extends Request = Request, TContext = RouteContext>(
    endpoint: string,
    handler: RouteHandler<TRequest, TContext>
): RouteHandler<TRequest, TContext> {
    return async function wrappedHandler(request: TRequest, context: TContext): Promise<Response> {
        const start = nowMs();
        const method = request.method || 'UNKNOWN';
        const path = getPathFromRequest(request);

        try {
            const response = await handler(request, context);
            const durationMs = round(nowMs() - start);
            const point = {
                ts: Date.now(),
                endpoint,
                method,
                path,
                status: response.status,
                durationMs,
            };

            recordApiVital(point);
            persistApiVital(point).catch(e => console.error('[Telemetry] Background write failed:', e));
            appendTimingHeaders(response, durationMs, endpoint);
            return response;
        } catch (error) {
            const durationMs = round(nowMs() - start);
            const point = {
                ts: Date.now(),
                endpoint,
                method,
                path,
                status: 500,
                durationMs,
            };
            recordApiVital(point);
            persistApiVital(point).catch(e => console.error('[Telemetry] Background write failed:', e));
            throw error;
        }
    };
}
