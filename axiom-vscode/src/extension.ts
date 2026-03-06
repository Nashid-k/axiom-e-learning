import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as util from 'util';

const execAsync = util.promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    const provider = new MayaChatViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(MayaChatViewProvider.viewType, provider)
    );

    // Register Inline Autocomplete (Ghost Text)
    const inlineCompletionProvider = vscode.languages.registerInlineCompletionItemProvider(
        { pattern: '**' },
        new MayaInlineCompletionProvider()
    );
    context.subscriptions.push(inlineCompletionProvider);

    const askMaya = vscode.commands.registerCommand('axiom.askMaya', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText.trim()) {
            vscode.window.showWarningMessage('Please select some code first.');
            return;
        }

        const language = editor.document.languageId;
        const fileName = editor.document.fileName.split(/[/\\]/).pop() || 'unknown';

        // Focus the sidebar view
        await vscode.commands.executeCommand('axiom.chatView.focus');

        // Send context to the webview
        provider.addContext({
            type: 'selection',
            code: selectedText,
            language,
            fileName,
            fullPath: editor.document.fileName
        });
    });

    const addContext = vscode.commands.registerCommand('axiom.addContext', async (uri: vscode.Uri) => {
        let fileUri = uri;

        // If called from command palette without a specific file, use active editor
        if (!fileUri) {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('No active file to add.');
                return;
            }
            fileUri = editor.document.uri;
        }

        try {
            const document = await vscode.workspace.openTextDocument(fileUri);
            const text = document.getText();
            const fileName = fileUri.path.split(/[/\\]/).pop() || 'unknown';

            await vscode.commands.executeCommand('axiom.chatView.focus');

            provider.addContext({
                type: 'file',
                code: text,
                language: document.languageId,
                fileName,
                fullPath: fileUri.fsPath
            });

            vscode.window.showInformationMessage(`Added ${fileName} to Maya's context.`);
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to read file: ${e}`);
        }
    });

    const applyEdit = vscode.commands.registerCommand('axiom.applyEdit', async (options: { filePath: string, newContent: string }) => {
        try {
            const uri = vscode.Uri.file(options.filePath);
            const edit = new vscode.WorkspaceEdit();

            // Check if file exists to determine if it's a creation or modification
            try {
                await vscode.workspace.fs.stat(uri);
                // File exists, replace entirely
                const document = await vscode.workspace.openTextDocument(uri);
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );
                edit.replace(uri, fullRange, options.newContent);
            } catch {
                // File does not exist, create it
                edit.createFile(uri, { ignoreIfExists: true });
                edit.insert(uri, new vscode.Position(0, 0), options.newContent);
            }

            const success = await vscode.workspace.applyEdit(edit);
            if (success) {
                vscode.window.showInformationMessage(`Maya successfully updated ${options.filePath.split(/[/\\]/).pop()}`);
                await vscode.window.showTextDocument(uri);
            } else {
                vscode.window.showErrorMessage('Failed to apply Maya\'s edit.');
            }
        } catch (e) {
            vscode.window.showErrorMessage(`Error applying edit: ${e}`);
        }
    });

    context.subscriptions.push(askMaya, addContext, applyEdit);
}

export function deactivate() { }

class MayaChatViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'axiom.chatView';
    private _view?: vscode.WebviewView;
    private _chatHistory: any[] = [];

    constructor(private readonly _extensionUri: vscode.Uri) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview();

        webviewView.webview.onDidReceiveMessage(async data => {
            switch (data.type) {
                case 'sendMessage':
                    await this.handleSendMessage(data.message, data.context);
                    break;
                case 'applyCode':
                    await vscode.commands.executeCommand('axiom.applyEdit', {
                        filePath: data.filePath,
                        newContent: data.code
                    });
                    break;
                case 'toolPermission':
                    this.handleToolPermission(data.allow, data.alwaysAllow);
                    break;
            }
        });
    }

    private _permissionResolver: ((value: { allow: boolean, alwaysAllow: boolean }) => void) | null = null;
    private _alwaysAllowMode = false;

    private handleToolPermission(allow: boolean, alwaysAllow: boolean) {
        if (alwaysAllow) this._alwaysAllowMode = true;
        if (this._permissionResolver) {
            this._permissionResolver({ allow, alwaysAllow });
            this._permissionResolver = null;
        }
    }

    private async requestToolPermission(toolName: string, path: string): Promise<boolean> {
        if (this._alwaysAllowMode) return true;

        return new Promise(resolve => {
            this._permissionResolver = resolve;
            this._view?.webview.postMessage({
                type: 'requestPermission',
                toolName,
                path
            });
        }).then((res: any) => res.allow);
    }

    public addContext(context: any) {
        if (this._view) {
            this._view.show?.(true);
            this._view.webview.postMessage({ type: 'setContext', context });
        }
    }

    private async handleSendMessage(userMessage: string, codeContext?: any) {
        let prompt = userMessage;

        // Truncate code if too large (fix for HTTP 400 Payload Too Large)
        if (codeContext && codeContext.code) {
            let code = codeContext.code;
            const MAX_CHARS = 48000;
            if (code.length > MAX_CHARS) {
                code = code.substring(0, MAX_CHARS) + '\n... (truncated for length)';
            }
            prompt += `\n\n--- ATTACHED CONTEXT ---\nFile: ${codeContext.fullPath} (${codeContext.language})\n\`\`\`${codeContext.language}\n${code}\n\`\`\`\n`;
        }

        const config = vscode.workspace.getConfiguration('axiom');
        const baseUrl = config.get<string>('apiUrl') || 'https://axiom-learn.com';
        const accessToken = config.get<string>('accessToken') || '';

        const systemPrompt = `You are Maya, an autonomous AI Coding Agent operating inside VS Code. You can think, read files, execute terminal commands, and write code.
You have access to the following workspace tools through XML tags:

1. READ FILE:
<tool_call>
<name>read_file</name>
<path>absolute/path/to/file.ts</path>
</tool_call>

2. LIST DIRECTORY:
<tool_call>
<name>list_dir</name>
<path>absolute/path/to/folder</path>
</tool_call>

3. RUN TERMINAL COMMAND:
<tool_call>
<name>run_command</name>
<command>npm test</command>
</tool_call>

4. GET PROBLEMS:
<tool_call>
<name>get_problems</name>
</tool_call>

5. CREATE NEW FILE:
<tool_call>
<name>create_file</name>
<path>absolute/path/to/new.ts</path>
<content>text</content>
</tool_call>

6. APPLY EDIT:
Provide the FULL text for an existing file using:
<<<EDIT absolute/path/to/file.ts>>>
// content
<<<END>>>

7. GIT ACTION:
<tool_call>
<name>git_action</name>
<action>commit</action>
<message>msg</message>
</tool_call>

8. SEARCH CODE:
<tool_call>
<name>search_code</name>
<query>pattern</query>
</tool_call>

9. GET ENV INFO:
<tool_call>
<name>get_env_info</name>
</tool_call>

10. ROADMAP:
<tool_call>
<name>read_roadmap</name>
</tool_call>
<tool_call>
<name>update_roadmap</name>
<content>markdown</content>
</tool_call>

11. READ TERMINAL:
<tool_call>
<name>read_terminal</name>
</tool_call>

CRITICAL RULES:
- You can call MULTIPLE tools in one turn.
- If you use a <tool_call>, DO NOT write anything else after </tool_call>.
- USE TEST-DRIVEN DEVELOPMENT.
- ALWAYS update the roadmap after progress.
- Always use absolute paths.`;

        const newMessages = [
            { role: 'system', content: systemPrompt },
            ...this._chatHistory,
            { role: 'user', content: prompt }
        ];

        this._chatHistory.push({ role: 'user', content: prompt });

        let agentLoopActive = true;
        let currentMessages = [...newMessages];

        while (agentLoopActive) {
            try {
                const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                if (accessToken) headers['x-agent-access-token'] = accessToken;

                const response = await fetch(`${baseUrl}/api/ai/agent`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ messages: currentMessages }),
                });

                if (!response.ok) {
                    this._view?.webview.postMessage({ type: 'error', message: `HTTP ${response.status} Error` });
                    agentLoopActive = false;
                    return;
                }

                const contentType = response.headers.get('content-type') || '';
                let fullResponse = '';
                this._view?.webview.postMessage({ type: 'streamStart' });

                if (contentType.includes('text/event-stream')) {
                    const reader = response.body?.getReader();
                    if (!reader) return;
                    const decoder = new TextDecoder();
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n');
                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6).trim();
                                if (data === '[DONE]') continue;
                                try {
                                    const parsed = JSON.parse(data);
                                    const content = parsed.choices?.[0]?.delta?.content || '';
                                    fullResponse += content;
                                    this._view?.webview.postMessage({ type: 'streamChunk', content });
                                } catch { }
                            }
                        }
                    }
                } else {
                    const data: any = await response.json();
                    fullResponse = data.choices?.[0]?.message?.content || data.text || '';
                    this._view?.webview.postMessage({ type: 'streamChunk', content: fullResponse });
                }

                this._view?.webview.postMessage({ type: 'streamEnd' });
                currentMessages.push({ role: 'assistant', content: fullResponse });

                const toolCalls = Array.from(fullResponse.matchAll(/<tool_call>([\s\S]*?)<\/tool_call>/g));

                if (toolCalls.length > 0) {
                    for (const tMatch of toolCalls) {
                        const toolContent = tMatch[1];
                        let toolName = toolContent.match(/<name>(.*?)<\/name>/s)?.[1].trim() || "";
                        let toolPath = toolContent.match(/<path>(.*?)<\/path>/s)?.[1].trim() || "";
                        let toolCommand = toolContent.match(/<command>(.*?)<\/command>/s)?.[1].trim() || "";
                        let fileContent = toolContent.match(/<content>(.*?)<\/content>/s)?.[1].trim() || "";

                        const permTarget = toolPath || toolCommand || 'workspace';
                        const allowed = await this.requestToolPermission(toolName, permTarget);

                        if (!allowed) {
                            this._view?.webview.postMessage({ type: 'toolResult', name: toolName, status: 'denied' });
                            currentMessages.push({ role: 'user', content: `<tool_result>\n<name>${toolName}</name>\n<error>User denied permission.</error>\n</tool_result>` });
                            continue;
                        }

                        this._view?.webview.postMessage({ type: 'toolStart', name: toolName, path: permTarget });

                        try {
                            let toolOutput = "";
                            const workspaceUri = vscode.workspace.workspaceFolders?.[0]?.uri;
                            const resolveUri = (p: string) => {
                                if (p.startsWith('/') || p.match(/^[a-zA-Z]:\\/)) return vscode.Uri.file(p);
                                return vscode.Uri.joinPath(workspaceUri || vscode.Uri.file('/'), p);
                            };

                            if (toolName === 'read_file') {
                                toolOutput = new TextDecoder().decode(await vscode.workspace.fs.readFile(resolveUri(toolPath)));
                            } else if (toolName === 'list_dir') {
                                const entries = await vscode.workspace.fs.readDirectory(resolveUri(toolPath));
                                toolOutput = entries.map(([n, t]) => `${t === vscode.FileType.Directory ? '[DIR]' : '[FILE]'} ${n}`).join('\n');
                            } else if (toolName === 'run_command') {
                                if (!workspaceUri) throw new Error("No workspace");
                                const { stdout, stderr } = await execAsync(toolCommand, { cwd: workspaceUri.fsPath });
                                toolOutput = stdout + (stderr ? `\nSTDERR:\n${stderr}` : '');
                            } else if (toolName === 'get_problems') {
                                toolOutput = vscode.languages.getDiagnostics().map(([uri, diags]) => diags.length ? `File: ${uri.fsPath}\n` + diags.map(d => `Line ${d.range.start.line + 1}: ${d.message}`).join('\n') : '').filter(Boolean).join('\n---\n') || "No problems.";
                            } else if (toolName === 'create_file') {
                                const uri = resolveUri(toolPath);
                                const edit = new vscode.WorkspaceEdit();
                                edit.createFile(uri, { ignoreIfExists: false });
                                edit.insert(uri, new vscode.Position(0, 0), fileContent);
                                await vscode.workspace.applyEdit(edit);
                                toolOutput = `Created ${toolPath}`;
                            } else if (toolName === 'git_action') {
                                if (!workspaceUri) throw new Error("No workspace");
                                const action = toolContent.match(/<action>(.*?)<\/action>/s)?.[1].trim();
                                const msg = toolContent.match(/<message>(.*?)<\/message>/s)?.[1].trim();
                                if (action === 'status') toolOutput = (await execAsync('git status', { cwd: workspaceUri.fsPath })).stdout;
                                else if (action === 'diff') toolOutput = (await execAsync('git diff', { cwd: workspaceUri.fsPath })).stdout;
                                else if (action === 'commit') {
                                    await execAsync('git add .', { cwd: workspaceUri.fsPath });
                                    toolOutput = (await execAsync(`git commit -m "${msg || 'Update'}"`, { cwd: workspaceUri.fsPath })).stdout;
                                }
                            } else if (toolName === 'search_code') {
                                const query = toolContent.match(/<query>(.*?)<\/query>/s)?.[1].trim();
                                const results = await vscode.workspace.findFiles('**/*', '**/node_modules/**');
                                let matches: string[] = [];
                                for (const file of results.slice(0, 30)) {
                                    const text = new TextDecoder().decode(await vscode.workspace.fs.readFile(file));
                                    if (text.toLowerCase().includes(query?.toLowerCase() || "")) matches.push(file.fsPath);
                                }
                                toolOutput = matches.length > 0 ? matches.join('\n') : "No matches.";
                            } else if (toolName === 'get_env_info') {
                                toolOutput = `OS: ${require('os').platform()}\nNode: ${process.version}\nWorkspace: ${workspaceUri?.fsPath}`;
                            } else if (toolName === 'read_roadmap') {
                                if (!workspaceUri) throw new Error("No workspace");
                                toolOutput = new TextDecoder().decode(await vscode.workspace.fs.readFile(vscode.Uri.joinPath(workspaceUri, '.maya', 'roadmap.md')));
                            } else if (toolName === 'update_roadmap') {
                                if (!workspaceUri) throw new Error("No workspace");
                                const content = toolContent.match(/<content>(.*?)<\/content>/s)?.[1].trim();
                                await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(workspaceUri, '.maya', 'roadmap.md'), new TextEncoder().encode(content || ""));
                                toolOutput = "Roadmap updated.";
                            } else if (toolName === 'read_terminal') {
                                toolOutput = "Use 'run_command' to cat logs. Direct terminal reading is limited.";
                            }

                            if (toolOutput.length > 30000) toolOutput = toolOutput.substring(0, 30000) + "\n...[TRUNCATED]";
                            currentMessages.push({ role: 'user', content: `<tool_result>\n<name>${toolName}</name>\n<content>\n${toolOutput}\n</content>\n</tool_result>` });
                            this._view?.webview.postMessage({ type: 'toolResult', name: toolName, status: 'success' });
                        } catch (e) {
                            currentMessages.push({ role: 'user', content: `<tool_result>\n<name>${toolName}</name>\n<error>${e}</error>\n</tool_result>` });
                            this._view?.webview.postMessage({ type: 'toolResult', name: toolName, status: 'error' });
                        }
                    }
                } else {
                    agentLoopActive = false;
                    this._chatHistory.push({ role: 'assistant', content: fullResponse });
                }
            } catch (err) {
                this._view?.webview.postMessage({ type: 'error', message: `Connection error: ${err}` });
                agentLoopActive = false;
            }
        }
    }

    private _getHtmlForWebview() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maya AI</title>
    <style>
        :root {
            --maya-accent: #6366f1;
            --maya-accent-light: #818cf8;
            --maya-bg-subtle: rgba(99, 102, 241, 0.05);
        }
        
        body { font-family: var(--vscode-font-family); background-color: var(--vscode-editor-background); color: var(--vscode-editor-foreground); margin: 0; padding: 0; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
        
        /* Premium Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--vscode-widget-border); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--vscode-descriptionForeground); }

        .chat-container { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 20px; scroll-behavior: smooth; }
        
        /* Message Animations */
        .message { padding: 12px 16px; border-radius: 12px; max-width: 92%; word-wrap: break-word; line-height: 1.6; font-size: 13.5px; position: relative; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); animation: slideIn 0.4s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        
        .user { background: var(--maya-accent); color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }
        .assistant { background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); align-self: flex-start; border-bottom-left-radius: 2px; }
        
        /* Tool Chips - Cinematic Expansion */
        .tool-chip { 
            display: flex; flex-direction: column; gap: 4px; font-size: 11px; padding: 8px 12px; 
            background: var(--maya-bg-subtle); border-left: 3px solid var(--maya-accent); 
            margin: 8px 0; border-radius: 0 8px 8px 0; color: var(--vscode-descriptionForeground); 
            font-family: var(--vscode-editor-font-family, monospace); 
            animation: expandSide 0.3s ease-out; overflow: hidden;
        }
        @keyframes expandSide { from { max-width: 0; opacity: 0; } to { max-width: 100%; opacity: 1; } }

        .tool-chip .chip-header { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .tool-chip.pending { border-left-color: var(--vscode-charts-yellow); background: rgba(234, 179, 8, 0.05); }
        .tool-chip.success { border-left-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        .tool-chip.error { border-left-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
        
        /* Shimmer Loading State */
        .shimmer { position: relative; overflow: hidden; background: var(--vscode-editorWidget-background); }
        .shimmer::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, var(--maya-bg-subtle), transparent); animation: shimmerMove 1.5s infinite; }
        @keyframes shimmerMove { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

        /* Permission UI */
        .permission-modal { border: 1px solid var(--vscode-charts-yellow); background: var(--vscode-editorWidget-background); border-radius: 12px; padding: 16px; margin: 12px 0; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); animation: popScale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes popScale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .permission-modal h4 { margin: 0; font-size: 13px; color: var(--vscode-charts-yellow); display: flex; align-items: center; gap: 6px; }
        .permission-modal p { margin: 0; font-size: 12px; opacity: 0.8; font-family: monospace; }
        .perm-buttons { display: flex; gap: 8px; }
        .btn-allow { flex: 1; background: var(--maya-accent); color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; }
        .btn-deny { background: transparent; border: 1px solid var(--vscode-widget-border); color: var(--vscode-foreground); padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; }
        
        /* Code Editor Blocks */
        .agent-block { border: 1px solid var(--vscode-widget-border); border-radius: 10px; overflow: hidden; margin: 16px 0; background: #1e1e1e; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
        .agent-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 11px; }
        .apply-btn { background: #10b981; color: white; border: none; padding: 5px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 11px; transition: all 0.2s; }
        .apply-btn:hover { background: #059669; transform: translateY(-1px); }
        .agent-block pre { margin: 0; padding: 16px; border-radius: 0; max-height: 450px; scrollbar-width: thin; }

        .typing-indicator { display: none; padding: 0 16px; margin-bottom: 8px; }
        .input-container { padding: 16px; background: var(--vscode-editor-background); border-top: 1px solid var(--vscode-widget-border); display: flex; flex-direction: column; gap: 10px; }
        textarea { width: 100%; padding: 12px; border-radius: 10px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); resize: none; font-family: var(--vscode-font-family); box-sizing: border-box; font-size: 13px; line-height: 1.5; transition: border 0.2s; }
        textarea:focus { outline: none; border-color: var(--maya-accent); box-shadow: 0 0 0 2px var(--maya-bg-subtle); }
        
        .context-indicator { display: none; background: var(--maya-bg-subtle); border: 1px solid var(--maya-accent); color: var(--maya-accent-light); font-size: 11px; padding: 5px 10px; border-radius: 20px; align-self: flex-start; align-items: center; gap: 6px; }
        .ctx-close { cursor: pointer; opacity: 0.7; margin-left: 4px; }
        .ctx-close:hover { opacity: 1; }
        .input-row { display: flex; gap: 8px; align-items: flex-end; }
        .send-btn { width: 38px; height: 38px; border-radius: 10px; border: none; background: var(--maya-accent); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
        .send-btn:hover { background: #4f46e5; transform: scale(1.05); }
        .send-btn:active { transform: scale(0.95); }
        .send-btn svg { width: 18px; height: 18px; }

        /* Brain/Thinking Pulse */
        .thinking-container { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
        .brain-pulse { width: 18px; height: 18px; position: relative; }
        .brain-pulse span { position: absolute; width: 100%; height: 100%; background: var(--maya-accent); border-radius: 50%; opacity: 0.6; animation: pulse 2s infinite ease-in-out; }
        .brain-pulse span:nth-child(2) { animation-delay: 1s; }
        @keyframes pulse { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
        .thinking-text { font-size: 11px; font-weight: 500; color: var(--vscode-descriptionForeground); text-transform: uppercase; letter-spacing: 1px; }
    </style>
</head>
<body>
    <div class="chat-container" id="chat">
        <div class="message assistant"><strong>Hey! I'm Maya</strong> — your autonomous coding agent. I can read files, run commands, search your codebase, and write edits. Just ask! 🧠</div>
    </div>
    
    <div class="typing-indicator" id="typingIndicator">
        <div class="thinking-container">
            <div class="brain-pulse"><span></span><span></span></div>
            <div class="thinking-text">Maya is thinking...</div>
        </div>
    </div>
    
    <div class="input-container">
        <div class="context-indicator" id="contextIndicator">
            <span>📎</span> <span id="contextLabel"></span>
            <span class="ctx-close" id="clearContext" title="Remove">✕</span>
        </div>
        <div class="input-row">
            <textarea id="prompt" rows="1" placeholder="Ask Maya anything..."></textarea>
            <button class="send-btn" id="sendBtn" title="Send (Enter)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        const chat = document.getElementById('chat');
        const prompt = document.getElementById('prompt');
        const contextIndicator = document.getElementById('contextIndicator');
        const contextLabel = document.getElementById('contextLabel');
        const clearContext = document.getElementById('clearContext');
        const typingIndicator = document.getElementById('typingIndicator');
        const sendBtn = document.getElementById('sendBtn');
        
        let activeContext = null;
        let currentAssistantMessage = null;
        let activeToolChip = null;

        function escapeHtml(text) {
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        // Clean internal tool calls from the final markdown view
        function cleanToolCalls(text) {
            return text.replace(/<tool_call>[\s\S]*?<\\/tool_call>/g, '');
        }

        function formatMarkdown(text) {
            let html = escapeHtml(cleanToolCalls(text));
            html = html.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
            html = html.replace(/\\*(.*?)\\*/g, '<em>$1</em>');
            html = html.replace(/\\n/g, '<br/>');
            
            // Parse <<<EDIT path>>> ... <<<END>>> blocks
            html = html.replace(/&lt;&lt;&lt;EDIT (.*?)&gt;&gt;&gt;<br\/>([\s\S]*?)<br\/>&lt;&lt;&lt;END&gt;&gt;&gt;/g, (match, path, code) => {
                const unescapedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/<br\/>/g, '\\n');
                const encodedCode = btoa(encodeURIComponent(unescapedCode));
                return \`
                    <div class="agent-block">
                        <div class="agent-header">
                            <span>📝 Modify: \${path.split('/').pop().split('\\\\').pop()}</span>
                            <button class="apply-btn" onclick="applyCode('\${path}', '\${encodedCode}')">🚀 Apply Edit</button>
                        </div>
                        <pre><code>\${code}</code></pre>
                    </div>\`;
            });
            
            html = html.replace(/\\\\\`\\\\\`\\\\\`[\\s\\S]*?\\\\\`\\\\\`\\\\\`/g, match => {
                const code = match.slice(3, -3);
                return '<pre><code>' + code + '</code></pre>';
            });
            html = html.replace(/\\\`(.*?)\\\`/g, '<code>$1</code>');
            return html;
        }

        window.applyCode = function(path, encodedCode) {
            const code = decodeURIComponent(atob(encodedCode));
            vscode.postMessage({ type: 'applyCode', filePath: path, code: code });
            event.target.textContent = "✅ Applied!";
            event.target.style.background = "#059669";
            setTimeout(() => {
                event.target.textContent = "🚀 Apply Again";
                event.target.style.background = "var(--vscode-button-background)";
            }, 2000);
        };

        window.allowTool = function(btnElem, alwaysAllow) {
            const modal = btnElem.closest('.permission-modal');
            modal.style.display = 'none';
            vscode.postMessage({ type: 'toolPermission', allow: true, alwaysAllow });
        };

        window.denyTool = function(btnElem) {
            const modal = btnElem.closest('.permission-modal');
            modal.style.display = 'none';
            vscode.postMessage({ type: 'toolPermission', allow: false, alwaysAllow: false });
        };

        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
                case 'setContext':
                    activeContext = message.context;
                    contextLabel.textContent = message.context.fileName;
                    contextIndicator.style.display = 'flex';
                    prompt.focus();
                    break;
                case 'streamStart':
                    typingIndicator.style.display = 'none';
                    if (!currentAssistantMessage || currentAssistantMessage.dataset.finalized === 'true') {
                        currentAssistantMessage = document.createElement('div');
                        currentAssistantMessage.className = 'message assistant';
                        currentAssistantMessage.dataset.raw = ""; 
                        chat.appendChild(currentAssistantMessage);
                    }
                    scrollToBottom();
                    break;
                case 'streamChunk':
                    if (currentAssistantMessage) {
                        currentAssistantMessage.dataset.raw += message.content;
                        currentAssistantMessage.innerHTML = formatMarkdown(currentAssistantMessage.dataset.raw);
                        scrollToBottom();
                    }
                    break;
                case 'streamEnd':
                    typingIndicator.style.display = 'none';
                    break;
                case 'error':
                    typingIndicator.style.display = 'none';
                    const err = document.createElement('div');
                    err.className = 'message assistant';
                    err.style.color = 'var(--vscode-errorForeground)';
                    err.textContent = message.message;
                    chat.appendChild(err);
                    scrollToBottom();
                    break;
                case 'requestPermission':
                    typingIndicator.style.display = 'none';
                    const permHtml = \`
                        <div class="permission-modal" style="display: flex;">
                            <h4>🛡️ Permission Required</h4>
                            <p>Maya wants to run <b>\${message.toolName}</b> on <b>\${message.path.split(/[\\\\/]/).pop()}</b></p>
                            <div class="perm-buttons">
                                <button class="btn-allow" onclick="allowTool(this, false)">Allow Once</button>
                                <button class="btn-allow" onclick="allowTool(this, true)" title="Allow for the rest of this session">Always Allow</button>
                                <button class="btn-deny" onclick="denyTool(this)">Deny</button>
                            </div>
                        </div>
                    \`;
                    chat.insertAdjacentHTML('beforeend', permHtml);
                    scrollToBottom();
                    break;
                case 'toolStart':
                    typingIndicator.style.display = 'flex';
                    activeToolChip = document.createElement('div');
                    activeToolChip.className = 'tool-chip pending shimmer';
                    activeToolChip.innerHTML = \`
                        <div class="chip-header">
                            <span>⚙️ Maya is using \${message.name}...</span>
                        </div>
                        <div style="font-size: 10px; opacity: 0.7;">Target: \${message.path.split(/[\\\\/]/).pop()}</div>
                    \`;
                    chat.appendChild(activeToolChip);
                    currentAssistantMessage = null; // force new message block next time
                    scrollToBottom();
                    break;
                case 'toolResult':
                    typingIndicator.style.display = 'none';
                    if (activeToolChip) {
                        activeToolChip.classList.remove('shimmer', 'pending');
                        if (message.status === 'success') {
                            activeToolChip.classList.add('success');
                            activeToolChip.querySelector('.chip-header span').textContent = \`✅ Finished \${message.name}\`;
                        } else if (message.status === 'denied') {
                             activeToolChip.classList.add('error');
                             activeToolChip.querySelector('.chip-header span').textContent = \`🚫 Denied \${message.name}\`;
                        } else {
                            activeToolChip.classList.add('error');
                            activeToolChip.querySelector('.chip-header span').textContent = \`❌ \${message.name} failed\`;
                        }
                    }
                    // Relocate typing indicator to the bottom
                    chat.appendChild(typingIndicator);
                    scrollToBottom();
                    break;
            }
        });

        clearContext.addEventListener('click', () => {
            activeContext = null;
            contextIndicator.style.display = 'none';
        });

        function doSend() {
            const text = prompt.value.trim();
            if (!text) return;
            const msg = document.createElement('div');
            msg.className = 'message user';
            let c = escapeHtml(text);
            if (activeContext) c = '<strong>📎 ' + escapeHtml(activeContext.fileName) + '</strong><br/>' + c;
            msg.innerHTML = c;
            chat.appendChild(msg);
            const ctx = activeContext;
            prompt.value = '';
            prompt.style.height = 'auto';
            typingIndicator.style.display = 'block';
            chat.appendChild(typingIndicator);
            scrollToBottom();
            vscode.postMessage({ type: 'sendMessage', message: text, context: ctx ? [ctx] : undefined });
            activeContext = null;
            contextIndicator.style.display = 'none';
        }

        sendBtn.addEventListener('click', doSend);

        prompt.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                e.preventDefault();
                doSend();
            }
        });

        prompt.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        function scrollToBottom() {
            chat.scrollTop = chat.scrollHeight;
        }
    </script>
</body>
</html>`;
    }
}

class MayaInlineCompletionProvider implements vscode.InlineCompletionItemProvider {
    private _debouncer: NodeJS.Timeout | null = null;

    async provideInlineCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.InlineCompletionContext,
        token: vscode.CancellationToken
    ): Promise<vscode.InlineCompletionItem[]> {
        return new Promise((resolve) => {
            if (this._debouncer) clearTimeout(this._debouncer);

            this._debouncer = setTimeout(async () => {
                if (token.isCancellationRequested) return resolve([]);

                const config = vscode.workspace.getConfiguration('axiom');
                const baseUrl = config.get<string>('apiUrl') || 'https://axiom-learn.com';
                const accessToken = config.get<string>('accessToken') || '';

                const textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
                const textAfterCursor = document.getText(new vscode.Range(position, new vscode.Position(document.lineCount, 0)));

                // Fast context snapshot
                const prefix = textBeforeCursor.slice(-1000);
                const suffix = textAfterCursor.slice(0, 200);

                if (prefix.trim() === '') return resolve([]);

                try {
                    const response = await fetch(`${baseUrl}/api/ai/autocomplete`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(accessToken ? { 'x-agent-access-token': accessToken } : {})
                        },
                        body: JSON.stringify({ prefix, suffix, language: document.languageId })
                    });

                    if (!response.ok) return resolve([]);

                    const data: any = await response.json();
                    if (data && data.completion) {
                        return resolve([new vscode.InlineCompletionItem(data.completion)]);
                    }
                } catch (e) {
                    // Fail silently for inline autocomplete so we don't spam the user
                }

                resolve([]);
            }, 300); // 300ms debounce to avoid spamming the backend during rapid typing
        });
    }
}

