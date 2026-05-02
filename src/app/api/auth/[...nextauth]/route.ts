import { handlers } from "@/lib/auth";
import { withApiVitals } from '@/lib/monitoring/api-vitals';








const GETHandler = (...args: Parameters<typeof handlers.GET>) => handlers.GET(...args);
const POSTHandler = (...args: Parameters<typeof handlers.POST>) => handlers.POST(...args);

export const GET = withApiVitals('/api/auth/[...nextauth]:GET', GETHandler as unknown as (request: Request, context: unknown) => Promise<Response> | Response);
export const POST = withApiVitals('/api/auth/[...nextauth]:POST', POSTHandler as unknown as (request: Request, context: unknown) => Promise<Response> | Response);
