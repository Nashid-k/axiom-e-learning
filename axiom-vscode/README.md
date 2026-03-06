# Axiom — Maya AI Agent 🧠

**The autonomous coding agent that lives inside your editor. Maya reads your code, runs commands, searches your codebase, writes edits, and manages her own task roadmap — all from a premium sidebar chat.**

> Think Cursor + Claude Code + GitHub Copilot — built into one lightweight extension.

---

## 🚀 What Maya Can Do

### 🤖 Autonomous Agent Loop
Maya doesn't just answer questions — she **thinks, plans, and executes**. She chains multiple tools together to solve complex problems without you lifting a finger.

### 📂 Deep Workspace Intelligence
- **Read & Analyze Files** — Maya reads any file in your workspace for context.
- **Search Across Your Entire Codebase** — Find patterns, functions, and logic project-wide.
- **Understand Your Environment** — She knows your OS, Node version, and framework.

### ✍️ Code Generation & Editing
- **Create New Files** — Generate tests, components, utilities from scratch.
- **Apply Edits** — Review Maya's proposed changes and apply them with one click.
- **Ghost Text Autocomplete** — Inline AI suggestions as you type, just like GitHub Copilot.

### 🛠️ Terminal & DevOps
- **Run Commands** — Execute build scripts, tests, linters directly from chat.
- **Git Integration** — Commit, diff, and check status without leaving the editor.
- **Linter Remediation** — Maya reads VS Code diagnostics and fixes warnings.

### 🧠 Self-Awareness & Roadmap
- **Autonomous Roadmap** — Maya tracks her own progress in `.maya/roadmap.md`.
- **Task-Driven Development** — She plans before she codes, just like a senior engineer.

### 🔒 You Stay in Control
- **Permission System** — Every action requires your approval (Allow Once / Always Allow / Deny).
- **No background scanning** — Maya only acts when you ask.

---

## ⚡ Getting Started

1. **Install** the extension from the VS Code Marketplace.
2. Open the **Axiom sidebar** (look for the 🧠 icon in your Activity Bar).
3. **Type a message** and press Enter or click the Send button.
4. Maya will analyze, think, and respond — chaining tools when needed.

---

## ⚙️ Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `axiom.apiUrl` | `https://axiom-e-learning.vercel.app` | Your Axiom API deployment URL |
| `axiom.accessToken` | *(empty)* | Access token for API authentication |

Go to **Settings → Extensions → Axiom** to configure.

---

## 🎯 Example Prompts

- `"Explain this function and find any bugs"`
- `"Search for all API routes and summarize them"`
- `"Create a test file for utils.ts"`
- `"Run npm test and fix any failures"`
- `"Commit all changes with a descriptive message"`
- `"Update your roadmap with the tasks we discussed"`

---

## 📋 Requirements

- VS Code **1.85.0** or later
- Internet connection (Maya uses Axiom's AI backend)

---

## 🐛 Found a Bug?

[Open an issue](https://github.com/Nashid-k/Axiom/issues) on GitHub.

---

## 📄 License

MIT © [Axiom Learn](https://axiom-learn.com)
