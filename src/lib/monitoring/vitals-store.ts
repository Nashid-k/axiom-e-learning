import {
    buildVitalsSnapshot,
    type ApiVitalPoint,
    type WebVitalPoint,
} from '@/lib/monitoring/vitals-summary';

interface VitalsState {
    api: ApiVitalPoint[];
    web: WebVitalPoint[];
}

const MAX_API_POINTS = 4000;
const MAX_WEB_POINTS = 4000;

declare global {
    var __axiomVitalsState: VitalsState | undefined;
}

function getState(): VitalsState {
    if (!globalThis.__axiomVitalsState) {
        globalThis.__axiomVitalsState = { api: [], web: [] };
    }
    return globalThis.__axiomVitalsState;
}

function clampPush<T>(arr: T[], value: T, max: number) {
    arr.push(value);
    if (arr.length > max) {
        arr.shift();
    }
}

function round(value: number): number {
    return Math.round(value * 100) / 100;
}

export function recordApiVital(point: ApiVitalPoint) {
    const state = getState();
    clampPush(state.api, point, MAX_API_POINTS);

    if (process.env.AXIOM_VITALS_LOG !== '0') {
        console.info(
            `[vitals:api] ${point.method} ${point.path} status=${point.status} durationMs=${round(point.durationMs)} endpoint=${point.endpoint}`
        );
    }
}

export function recordWebVital(point: WebVitalPoint) {
    const state = getState();
    clampPush(state.web, point, MAX_WEB_POINTS);

    if (process.env.AXIOM_VITALS_LOG !== '0') {
        console.info(
            `[vitals:web] metric=${point.metric} value=${round(point.value)} path=${point.path}${point.rating ? ` rating=${point.rating}` : ''}`
        );
    }
}

export function clearVitals() {
    const state = getState();
    state.api = [];
    state.web = [];
}

export function getVitalsSnapshot() {
    const state = getState();
    return buildVitalsSnapshot(state.api, state.web);
}

export type { PrimitiveTag, ApiVitalPoint, WebVitalPoint } from '@/lib/monitoring/vitals-summary';
