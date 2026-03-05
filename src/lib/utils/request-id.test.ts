import { generateRequestId } from '@/lib/utils/request-id';

describe('generateRequestId', () => {
    test('returns unique string IDs with timestamp prefix', () => {
        const first = generateRequestId();
        const second = generateRequestId();

        expect(first).toMatch(/^\d{13}-[a-z0-9]{9}$/);
        expect(second).toMatch(/^\d{13}-[a-z0-9]{9}$/);
        expect(first).not.toBe(second);
    });
});
