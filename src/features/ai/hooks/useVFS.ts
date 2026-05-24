'use client';

import { useState, useEffect, useCallback } from 'react';
import { VFS, VFSFile } from '../types/vfs-types';

const DEFAULT_TEMPLATES: Record<string, VFS> = {
    html: {
        '/index.html': {
            name: 'index.html',
            path: '/index.html',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Axiom Project</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="card">
        <h1>Welcome to Axiom OS</h1>
        <p>This is a live multi-file preview. Edit index.html, styles.css, or app.js to begin.</p>
        <button id="action-btn">Trigger System</button>
    </div>
    <script src="app.js"></script>
</body>
</html>`
        },
        '/styles.css': {
            name: 'styles.css',
            path: '/styles.css',
            language: 'css',
            content: `body {
    background: radial-gradient(circle at center, #0d1117 0%, #07090e 100%);
    color: #f5f5f7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    margin: 0;
}

.card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 32px;
    text-align: center;
    max-width: 400px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
}

h1 {
    font-size: 24px;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #0a84ff 0%, #64d2ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

p {
    color: #86868b;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 24px;
}

button {
    background: #0a84ff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

button:hover {
    background: #0070e3;
    box-shadow: 0 0 12px rgba(10, 132, 255, 0.4);
}`
        },
        '/app.js': {
            name: 'app.js',
            path: '/app.js',
            language: 'javascript',
            content: `// Axiom Interactive Project Script
console.log("Axiom VFS Workspace initialized! 🚀");

const btn = document.getElementById('action-btn');
if (btn) {
    btn.addEventListener('click', () => {
        console.log("Action button triggered!");
        alert("Greetings from Axiom Learning OS!");
    });
}`
        }
    },
    javascript: {
        '/index.js': {
            name: 'index.js',
            path: '/index.js',
            language: 'javascript',
            content: `// JavaScript Playground
const student = {
    name: "Axiom Student",
    level: 42,
    skills: ["JS", "TS", "Next.js"]
};

console.log("User Profile:", student);
`
        }
    },
    typescript: {
        '/index.ts': {
            name: 'index.ts',
            path: '/index.ts',
            language: 'typescript',
            content: `// TypeScript Playground
interface User {
    name: string;
    role: string;
    active: boolean;
}

const user: User = {
    name: "Developer",
    role: "Fullstack Eng",
    active: true
};

console.log("Typed Object:", user);
`
        }
    },
    python: {
        '/main.py': {
            name: 'main.py',
            path: '/main.py',
            language: 'python',
            content: `# Python Sandbox
def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

result = calculate_factorial(5)
print(f"Factorial of 5 is: {result}")
`
        }
    },
    sql: {
        '/query.sql': {
            name: 'query.sql',
            path: '/query.sql',
            language: 'sql',
            content: `-- SQL Playground
-- Available sample tables: users, orders
SELECT 
    u.name, 
    u.email, 
    COUNT(o.id) as order_count,
    SUM(o.amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_spent DESC;`
        }
    },
    mongodb: {
        '/query.js': {
            name: 'query.js',
            path: '/query.js',
            language: 'javascript',
            content: `// Simulated MongoDB Query
// Available sample collections: users, orders
db.users.aggregate([
    { $match: { status: "active" } },
    { $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "userId",
        as: "orders"
    }},
    { $project: {
        name: 1,
        age: 1,
        totalOrders: { $size: "$orders" }
    }}
]);`
        }
    }
};

const getLanguageFromExtension = (name: string): string => {
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'html': return 'html';
        case 'css': return 'css';
        case 'js': return 'javascript';
        case 'ts': return 'typescript';
        case 'py': return 'python';
        case 'sql': return 'sql';
        default: return 'plaintext';
    }
};

export function useVFS(topicId: string, defaultLang: string = 'html') {
    const storageKey = `axiom_vfs_${topicId}`;

    const [files, setFiles] = useState<VFS>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error("VFS restore failed, falling back to template:", e);
                }
            }
        }
        return DEFAULT_TEMPLATES[defaultLang] || DEFAULT_TEMPLATES.html;
    });

    const [activeFilePath, setActiveFilePath] = useState<string>(() => {
        const paths = Object.keys(DEFAULT_TEMPLATES[defaultLang] || DEFAULT_TEMPLATES.html);
        return paths.find(p => p.includes('index') || p.includes('main') || p.includes('query')) || paths[0] || '';
    });

    const [openTabs, setOpenTabs] = useState<string[]>(() => {
        return Object.keys(DEFAULT_TEMPLATES[defaultLang] || DEFAULT_TEMPLATES.html);
    });

    // Auto-save VFS content to localStorage
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(files));
    }, [files, storageKey]);

    // Create File
    const createFile = useCallback((filePath: string, content: string = '') => {
        const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
        const name = cleanPath.split('/').pop() || 'untitled';
        const language = getLanguageFromExtension(name);

        setFiles(prev => {
            if (prev[cleanPath]) return prev; // avoid overwrites
            return {
                ...prev,
                [cleanPath]: {
                    name,
                    path: cleanPath,
                    content,
                    language
                }
            };
        });

        setOpenTabs(prev => {
            if (prev.includes(cleanPath)) return prev;
            return [...prev, cleanPath];
        });

        setActiveFilePath(cleanPath);
    }, []);

    // Delete File
    const deleteFile = useCallback((filePath: string) => {
        setFiles(prev => {
            const next = { ...prev };
            delete next[filePath];
            return next;
        });

        setOpenTabs(prev => {
            const nextTabs = prev.filter(t => t !== filePath);
            return nextTabs;
        });

        setActiveFilePath(prevActive => {
            if (prevActive === filePath) {
                const remaining = Object.keys(files).filter(k => k !== filePath);
                return remaining[0] || '';
            }
            return prevActive;
        });
    }, [files]);

    // Update Content
    const updateFileContent = useCallback((filePath: string, content: string) => {
        setFiles(prev => {
            if (!prev[filePath]) return prev;
            return {
                ...prev,
                [filePath]: {
                    ...prev[filePath],
                    content
                }
            };
        });
    }, []);

    // Rename File
    const renameFile = useCallback((oldPath: string, newPath: string) => {
        const cleanNew = newPath.startsWith('/') ? newPath : `/${newPath}`;
        const name = cleanNew.split('/').pop() || 'untitled';
        const language = getLanguageFromExtension(name);

        setFiles(prev => {
            if (!prev[oldPath] || prev[cleanNew]) return prev;
            const next = { ...prev };
            const content = next[oldPath].content;
            delete next[oldPath];
            next[cleanNew] = {
                name,
                path: cleanNew,
                content,
                language
            };
            return next;
        });

        setOpenTabs(prev => {
            return prev.map(t => t === oldPath ? cleanNew : t);
        });

        setActiveFilePath(prev => prev === oldPath ? cleanNew : prev);
    }, []);

    // Open/Close tabs
    const openTab = useCallback((filePath: string) => {
        setOpenTabs(prev => {
            if (prev.includes(filePath)) return prev;
            return [...prev, filePath];
        });
        setActiveFilePath(filePath);
    }, []);

    const closeTab = useCallback((filePath: string) => {
        setOpenTabs(prev => {
            const nextTabs = prev.filter(t => t !== filePath);
            return nextTabs;
        });

        setActiveFilePath(prevActive => {
            if (prevActive === filePath) {
                const index = openTabs.indexOf(filePath);
                const nextIndex = index > 0 ? index - 1 : index + 1;
                const remainingTabs = openTabs.filter(t => t !== filePath);
                return remainingTabs[nextIndex] || remainingTabs[0] || '';
            }
            return prevActive;
        });
    }, [openTabs]);

    return {
        files,
        activeFilePath,
        openTabs,
        createFile,
        deleteFile,
        updateFileContent,
        renameFile,
        openTab,
        closeTab,
        setActiveFilePath,
        setFiles,
        setOpenTabs
    };
}
