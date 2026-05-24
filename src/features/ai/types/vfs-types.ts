export interface VFSFile {
    name: string;
    content: string;
    path: string; // Absolute path, e.g. "/index.html" or "/src/app.js"
    language: string;
}

export type VFS = Record<string, VFSFile>;
