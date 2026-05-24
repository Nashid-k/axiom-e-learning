import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.email;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { repoName, description, files } = body;

        if (!repoName || typeof repoName !== 'string' || !repoName.trim()) {
            return NextResponse.json({ error: 'Repository name is required.' }, { status: 400 });
        }

        const cleanRepoName = repoName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '');

        if (!files || typeof files !== 'object' || Object.keys(files).length === 0) {
            return NextResponse.json({ error: 'Workspace is empty. No files to publish.' }, { status: 400 });
        }

        // Connect DB and pull GitHub credentials
        await connectToDatabase();
        const user = await User.findOne({ email: userId }).select('githubToken githubUsername').lean() as any;

        if (!user || !user.githubToken || !user.githubUsername) {
            return NextResponse.json({ 
                error: 'GitHub Account Not Linked.', 
                details: 'Please link your GitHub account in Profile Settings before publishing.' 
            }, { status: 401 });
        }

        const { githubToken, githubUsername } = user;

        // 1. Create Repository on GitHub
        const repoResponse = await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Axiom-Learning-OS'
            },
            body: JSON.stringify({
                name: cleanRepoName,
                description: description || 'Portfolio project built inside the Axiom Learning OS.',
                private: false,
                auto_init: false // We will commit files directly ourselves
            })
        });

        if (!repoResponse.ok) {
            const errData = await repoResponse.json().catch(() => ({}));
            
            // Check if repo already exists
            if (repoResponse.status === 422 && errData.errors?.[0]?.message?.includes('already exists')) {
                return NextResponse.json({ 
                    error: 'Repository Name Conflict', 
                    details: `The repository "${cleanRepoName}" already exists on your GitHub account. Choose a different name.` 
                }, { status: 409 });
            }
            
            return NextResponse.json({ 
                error: 'Failed to create GitHub repository.', 
                details: errData.message || 'Verification failed.' 
            }, { status: repoResponse.status });
        }

        const repoData = await repoResponse.json();
        const repoHtmlUrl = repoData.html_url;

        // 2. Add dynamic, beautiful Axiom README.md to VFS upload list
        const readmeContent = `# ${repoName}

${description || 'Portfolio project built inside the Axiom Learning OS.'}

## 🚀 Powered by Axiom Learning OS
This project was compiled, executed, and validated in-browser using the **Axiom Learning OS**—a cinematic dōjō platform for developers.
- **Autonomic VFS Compiler**: Multi-file workspaces with hot-reloading browser frames.
- **Cognitive Science Engine**: Granular weakness monitors and spaced repetition.
- **Dual AI Mentors**: shikigami architect critique audits and Maya buddy analogy flows.
- **Embedded Console Sandbox**: Sandboxed JavaScript iframe runtime, Pyodide python executions, and WASM SQL databases.

## 🛠️ Project Structures
This repository has been fully sync-uploaded from the local in-browser Workspace:
${Object.keys(files).map(path => `- \`${path.substring(1)}\``).join('\n')}

---
*Built with 💜 by [Nashid K](https://github.com/Nashid-k) and Axiom AI.*
`;

        const uploadFiles: Record<string, { content: string }> = {
            ...files,
            '/README.md': { content: readmeContent }
        };

        // 3. Commit/Write all files to the repository contents sequentially
        for (const [path, fileObj] of Object.entries(uploadFiles)) {
            // Remove starting slash for GitHub paths
            const cleanPath = path.startsWith('/') ? path.substring(1) : path;
            const base64Content = Buffer.from(fileObj.content, 'utf-8').toString('base64');

            const fileRes = await fetch(`https://api.github.com/repos/${githubUsername}/${cleanRepoName}/contents/${cleanPath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Axiom-Learning-OS'
                },
                body: JSON.stringify({
                    message: `Initial commit: upload ${cleanPath} from Axiom Learning OS`,
                    content: base64Content
                })
            });

            if (!fileRes.ok) {
                const errDetail = await fileRes.json().catch(() => ({}));
                console.error(`Failed to upload ${cleanPath}:`, errDetail);
                // Continue with other files or throw error? Let's throw error to guarantee repository completeness
                throw new Error(`Failed to commit file "${cleanPath}" to the repository. Please try again.`);
            }
        }

        return NextResponse.json({
            success: true,
            repoUrl: repoHtmlUrl,
            repoName: cleanRepoName
        });

    } catch (error: any) {
        console.error('[Project Publish POST Error]:', error);
        return NextResponse.json({ 
            error: error.message || 'Internal Server Error' 
        }, { status: 500 });
    }
}
