export const GIT_CURRICULUM = {
    "git": {
        fileName: "git",
        description: "Version Control, Git & AI Workflows",
        category: "Git",
        subDescription: "Master Git and GitHub from basics to advanced workflows, including AI-driven PR reviews and autonomous agents.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "The Magic of Version Control: The Anti-Chaos Tool",
                targetExperience: ["1yoe"],
                theory: [
                    "The Problem: 'Final_v2_REALLY_FINAL.zip' (The nightmare of manual saving)",
                    "Git vs GitHub: The tool (The Camera) vs The storage (The Photo Album)",
                    "Basic Commands: `git init`, `git add`, `git commit`",
                    "Using AI IDEs (Cursor/Copilot) to auto-generate commit messages"
                ],
                practicals: [
                    "Initialize a local repository",
                    "Commit a file using an AI-generated descriptive commit message"
                ]
            },
            {
                phase: 2,
                title: "Looking at the Past & Branching",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "The Time Travel Log: Using `git log` and `git diff`",
                    "Feature Branches: Working on one specific 'Part' of the app safely",
                    "Switching Realities: Traveling Between Branches (`git switch`)",
                    "Handling basic `.gitignore` configurations via AI generation"
                ],
                practicals: [
                    "Create a branch called `experiment` and switch to it",
                    "Use AI to generate a framework-specific `.gitignore`"
                ]
            },
            {
                phase: 3,
                title: "Merging and Conflict Resolution",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "The Reunion (`git merge`): Bringing the 'Experiment' back",
                    "Fast-Forward vs Merge Commits",
                    "The Collision: Resolving merge conflicts",
                    "Using AI chat to understand complex merge conflicts and suggest resolutions"
                ],
                practicals: [
                    "Intentionally create a merge conflict",
                    "Resolve the conflict by pasting the `diff` into an LLM for advice"
                ]
            },
            {
                phase: 4,
                title: "Collaboration & AI Code Reviews",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "The Cloud Vault: Using GitHub Remotes (Push/Pull)",
                    "Pull Requests (PRs): The formal code review process",
                    "AI Code Reviewers: Automating reviews using GitHub Actions and LLMs",
                    "Auto-generating PR descriptions from branch commit history"
                ],
                practicals: [
                    "Create a PR on GitHub",
                    "Configure an open-source AI PR reviewer action on a test repository"
                ]
            },
            {
                phase: 5,
                title: "Advanced Time Travel & Agent Workflows",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "History Rewriting: Amend & Interactive Rebase",
                    "Advanced Tools: `git stash`, `git reflog`, `git bisect`",
                    "Git Hooks: Running AI-based linters and test generation pre-commit",
                    "Autonomous Coding Agents: How systems like AutoGPT or SWE-agent interact with Git"
                ],
                practicals: [
                    "Squash 3 commits into 1 using interactive rebase",
                    "Set up a pre-commit hook that uses a local LLM to verify code formatting"
                ]
            }
        ]
    }
};
