'use client';

import { useRef } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

interface WebVitalMetric {
    id: string;
    name: string;
    value: number;
    delta: number;
    rating?: 'good' | 'needs-improvement' | 'poor';
    navigationType?: string;
}

function shouldReportVitals(): boolean {
    const flag = process.env.NEXT_PUBLIC_VITALS_ENABLED;
    if (flag === undefined) {
        return true;
    }
    return flag === '1' || flag.toLowerCase() === 'true';
}

export default function WebVitalsReporter() {
    const sentRef = useRef<Set<string>>(new Set());

    useReportWebVitals((metric: WebVitalMetric) => {
        if (!shouldReportVitals()) return;

        const key = `${metric.id}:${metric.name}:${metric.value}`;
        if (sentRef.current.has(key)) return;
        sentRef.current.add(key);

        const payload = {
            id: metric.id,
            metric: metric.name,
            value: metric.value,
            delta: metric.delta,
            rating: metric.rating,
            navigationType: metric.navigationType,
            path: window.location.pathname,
            ts: Date.now(),
        };

        if (process.env.NODE_ENV !== 'production') {
            console.info('[vitals:web]', payload);
        }

        try {
            const body = JSON.stringify(payload);
            if (navigator.sendBeacon) {
                const blob = new Blob([body], { type: 'application/json' });
                navigator.sendBeacon('/api/vitals/web', blob);
            } else {
                fetch('/api/vitals/web', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body,
                    keepalive: true,
                }).catch(() => { });
            }
        } catch {
        }
    });

    return null;
}
