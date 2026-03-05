export type SupportedLanguage = 'javascript' | 'typescript' | 'python' | 'sql' | 'mongodb' | 'html' | 'css';

export interface ExecutionResult {
    success: boolean;
    output: string;
    error?: string;
    executionTime?: number;
}

interface PyodideInterface {
    runPython: (code: string) => unknown;
}

let pyodideInstance: PyodideInterface | null = null;
let pyodideLoading: Promise<PyodideInterface> | null = null;

interface SQLJSInterface {
    Database: new () => {
        exec: (code: string) => unknown[];
        run: (code: string) => void;
        close: () => void;
    };
}

let sqlInstance: SQLJSInterface | null = null;
let sqlLoading: Promise<SQLJSInterface> | null = null;

async function loadSQLJS(): Promise<SQLJSInterface> {
    if (sqlInstance) return sqlInstance;
    if (sqlLoading) return sqlLoading;

    sqlLoading = (async () => {
        const globalWindow = window as unknown as Record<string, unknown>;
        if (typeof window !== 'undefined' && !globalWindow.initSqlJs) {
            await new Promise<void>((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://sql.js.org/dist/sql-wasm.js';
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load sql.js'));
                document.head.appendChild(script);
            });
        }

        const initSqlJs = globalWindow.initSqlJs as (config: unknown) => Promise<SQLJSInterface>;
        const loadedSQL = await initSqlJs({
            locateFile: (file: string) => `https://sql.js.org/dist/${file}`
        });
        sqlInstance = loadedSQL;
        return loadedSQL;
    })();

    return sqlLoading;
}

async function loadPyodide(): Promise<PyodideInterface> {
    if (pyodideInstance) return pyodideInstance;
    if (pyodideLoading) return pyodideLoading;

    pyodideLoading = (async () => {
        const globalWindow = window as unknown as Record<string, unknown>;
        if (typeof window !== 'undefined' && !globalWindow.loadPyodide) {
            await new Promise<void>((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load Pyodide'));
                document.head.appendChild(script);
            });
        }

        const loadPyodideFn = globalWindow.loadPyodide as (config: unknown) => Promise<PyodideInterface>;
        const loadedPyodide = await loadPyodideFn({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
        pyodideInstance = loadedPyodide;
        return loadedPyodide;
    })();

    return pyodideLoading;
}

export async function runCode(language: SupportedLanguage, code: string): Promise<ExecutionResult> {
    const startTime = performance.now();

    try {
        let result: ExecutionResult;

        switch (language) {
            case 'javascript':
            case 'typescript':
                result = await runJavaScript(code);
                break;
            case 'python':
                result = await runPython(code);
                break;
            case 'sql':
                result = await runSQL(code);
                break;
            case 'mongodb':
                result = await runMongoDB(code);
                break;
            case 'html':
            case 'css':
                result = { success: true, output: '> Use Live Preview for HTML/CSS' };
                break;
            default:
                result = { success: false, output: '', error: `Unsupported language: ${language}` };
        }

        result.executionTime = Math.round(performance.now() - startTime);
        return result;

    } catch (err: unknown) {
        return {
            success: false,
            output: '',
            error: (err as Error).message || 'Execution failed',
            executionTime: Math.round(performance.now() - startTime)
        };
    }
}

async function runJavaScript(code: string): Promise<ExecutionResult> {
    if (typeof window === 'undefined') {
        return { success: false, output: '', error: 'JavaScript execution requires a browser environment' };
    }

    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            cleanup();
            resolve({ success: false, output: '', error: 'Execution timed out (5s limit)' });
        }, 5000);

        let iframe: HTMLIFrameElement | null = null;

        function cleanup() {
            clearTimeout(timeout);
            window.removeEventListener('message', onMessage);
            if (iframe && iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        }

        function onMessage(event: MessageEvent) {
            if (event.data?.type === 'code-runner-result') {
                cleanup();
                resolve({
                    success: event.data.success,
                    output: event.data.output || '> Code executed successfully (no output)',
                    error: event.data.error,
                });
            }
        }

        window.addEventListener('message', onMessage);

        iframe = document.createElement('iframe');
        iframe.sandbox.add('allow-scripts');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const iframeCode = `
            <script>
                const logs = [];
                const origConsole = { log: console.log, error: console.error, warn: console.warn };
                console.log = (...args) => logs.push(args.map(v => typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)).join(' '));
                console.error = (...args) => logs.push('[ERROR] ' + args.map(v => String(v)).join(' '));
                console.warn = (...args) => logs.push('[WARN] ' + args.map(v => String(v)).join(' '));
                try {
                    const result = (function() { ${code} })();
                    const output = logs.join('\\n');
                    const returnValue = result !== undefined ? '\\n> Return: ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)) : '';
                    parent.postMessage({ type: 'code-runner-result', success: true, output: output + returnValue }, '*');
                } catch (err) {
                    parent.postMessage({ type: 'code-runner-result', success: false, output: logs.join('\\n'), error: err.message }, '*');
                }
            <\/script>
        `;

        iframe.srcdoc = iframeCode;
    });
}

async function runPython(code: string): Promise<ExecutionResult> {
    try {
        const pyodide = await loadPyodide();

        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
        `);

        try {
            (pyodide as { runPython: (code: string) => void }).runPython(code);
        } catch (pythonErr: unknown) {
            const stderr = (pyodide as { runPython: (code: string) => string }).runPython('sys.stderr.getvalue()');
            return {
                success: false,
                output: '',
                error: stderr || (pythonErr as Error).message
            };
        }

        const stdout = pyodide.runPython('sys.stdout.getvalue()');

        return {
            success: true,
            output: String(stdout || '') || '> Code executed successfully (no output)'
        };

    } catch (err: unknown) {
        return {
            success: false,
            output: '',
            error: `Python runtime error: ${(err as Error).message}`
        };
    }
}

async function runSQL(code: string): Promise<ExecutionResult> {
    let db: {
        run: (code: string) => void;
        exec: (code: string) => unknown[];
        close: () => void;
    } | null = null;

    try {
        const SQL = await loadSQLJS();
        db = new SQL.Database();

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT,
                age INTEGER,
                status TEXT,
                created_at TEXT
            );
            INSERT INTO users VALUES 
                (1, 'Alice', 'alice@example.com', 28, 'active', '2024-01-15'),
                (2, 'Bob', 'bob@example.com', 34, 'active', '2024-02-20'),
                (3, 'Charlie', 'charlie@example.com', 22, 'inactive', '2024-03-10'),
                (4, 'Diana', 'diana@example.com', 31, 'active', '2024-01-05'),
                (5, 'Eve', 'eve@example.com', 27, 'pending', '2024-04-01');
                
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY,
                user_id INTEGER,
                product TEXT,
                amount REAL,
                order_date TEXT
            );
            INSERT INTO orders VALUES
                (1, 1, 'Laptop', 1200.00, '2024-02-01'),
                (2, 1, 'Mouse', 25.00, '2024-02-01'),
                (3, 2, 'Keyboard', 75.00, '2024-02-15'),
                (4, 3, 'Monitor', 350.00, '2024-03-01'),
                (5, 4, 'Laptop', 1100.00, '2024-03-15');
        `);

        const results = db.exec(code) as Array<{ columns: string[]; values: (string | number | null)[][] }>;

        if (results.length === 0) {
            return { success: true, output: '> Query executed successfully (no results)' };
        }

        const output = results.map((result: { columns: string[]; values: (string | number | null)[][] }) => {
            const header = result.columns.join(' | ');
            const separator = result.columns.map(() => '---').join(' | ');
            const rows = result.values.map((row: (string | number | null)[]) => row.join(' | ')).join('\n');
            return `${header}\n${separator}\n${rows}`;
        }).join('\n\n');

        return { success: true, output };

    } catch (err: unknown) {
        return {
            success: false,
            output: '',
            error: `SQL Error: ${(err as Error).message}`
        };
    } finally {
        if (db) {
            db.close();
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function runMongoDB(_code: string): Promise<ExecutionResult> {
    const sampleCollections = {
        users: [
            { _id: '1', name: 'Alice', age: 28, status: 'active', tags: ['developer', 'node'] },
            { _id: '2', name: 'Bob', age: 34, status: 'active', tags: ['developer', 'python'] },
            { _id: '3', name: 'Charlie', age: 22, status: 'inactive', tags: ['designer'] },
            { _id: '4', name: 'Diana', age: 31, status: 'active', tags: ['developer', 'rust'] },
        ],
        orders: [
            { _id: '1', userId: '1', product: 'Laptop', amount: 1200, date: '2024-02-01' },
            { _id: '2', userId: '1', product: 'Mouse', amount: 25, date: '2024-02-01' },
            { _id: '3', userId: '2', product: 'Keyboard', amount: 75, date: '2024-02-15' },
        ]
    };

    try {
        const output = `⚠️ SIMULATED MongoDB Environment (Read-Only Demo)
> This does NOT execute real database queries.
> Available sample collections: users, orders

Sample Data:
${JSON.stringify(sampleCollections.users, null, 2)}

> To run real MongoDB queries, use MongoDB Atlas, Compass, or a local MongoDB instance.`;

        return { success: true, output };

    } catch (err: unknown) {
        return {
            success: false,
            output: '',
            error: (err as Error).message
        };
    }
}

function formatValue(val: unknown): string {
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    if (typeof val === 'object') {
        try {
            return JSON.stringify(val, null, 2);
        } catch {
            return String(val);
        }
    }
    return String(val);
}
