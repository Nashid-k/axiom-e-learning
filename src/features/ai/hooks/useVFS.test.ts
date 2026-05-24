import { renderHook, act } from '@testing-library/react';
import { useVFS } from './useVFS';

describe('useVFS Hook', () => {
    beforeEach(() => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    });

    it('initializes with default templates', () => {
        const { result } = renderHook(() => useVFS('test_topic', 'html'));

        expect(result.current.files['/index.html']).toBeDefined();
        expect(result.current.files['/styles.css']).toBeDefined();
        expect(result.current.files['/app.js']).toBeDefined();
        expect(result.current.activeFilePath).toBe('/index.html');
        expect(result.current.openTabs).toContain('/index.html');
    });

    it('creates files and updates openTabs', () => {
        const { result } = renderHook(() => useVFS('test_topic', 'html'));

        act(() => {
            result.current.createFile('/test.js', 'console.log("test");');
        });

        expect(result.current.files['/test.js']).toBeDefined();
        expect(result.current.files['/test.js'].content).toBe('console.log("test");');
        expect(result.current.files['/test.js'].language).toBe('javascript');
        expect(result.current.openTabs).toContain('/test.js');
        expect(result.current.activeFilePath).toBe('/test.js');
    });

    it('deletes files and updates active file path if active was deleted', () => {
        const { result } = renderHook(() => useVFS('test_topic', 'html'));

        act(() => {
            result.current.deleteFile('/app.js');
        });

        expect(result.current.files['/app.js']).toBeUndefined();
        expect(result.current.openTabs).not.toContain('/app.js');
    });

    it('updates file content', () => {
        const { result } = renderHook(() => useVFS('test_topic', 'html'));

        act(() => {
            result.current.updateFileContent('/styles.css', 'body { color: red; }');
        });

        expect(result.current.files['/styles.css'].content).toBe('body { color: red; }');
    });

    it('renames files correctly', () => {
        const { result } = renderHook(() => useVFS('test_topic', 'html'));

        act(() => {
            result.current.renameFile('/app.js', '/main.js');
        });

        expect(result.current.files['/app.js']).toBeUndefined();
        expect(result.current.files['/main.js']).toBeDefined();
        expect(result.current.files['/main.js'].name).toBe('main.js');
        expect(result.current.activeFilePath).toBe('/main.js');
        expect(result.current.openTabs).toContain('/main.js');
        expect(result.current.openTabs).not.toContain('/app.js');
    });

    it('manages tab focus and closure', () => {
        const { result } = renderHook(() => useVFS('test_topic', 'html'));

        act(() => {
            result.current.openTab('/styles.css');
        });
        expect(result.current.activeFilePath).toBe('/styles.css');

        act(() => {
            result.current.closeTab('/styles.css');
        });
        expect(result.current.openTabs).not.toContain('/styles.css');
        expect(result.current.activeFilePath).not.toBe('/styles.css');
    });
});
