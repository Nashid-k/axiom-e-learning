import { NextResponse } from 'next/server';
import { withApiVitals } from '@/lib/monitoring/api-vitals';

async function GETHandler() {
    return NextResponse.json({
        struggles: []
    });
}

export const GET = withApiVitals('/api/ai/intervention/active:GET', GETHandler);
