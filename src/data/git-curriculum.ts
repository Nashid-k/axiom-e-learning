export const GIT_CURRICULUM = {
    "git": {
        fileName: "git",
        description: "Version Control & Git",
        category: "Git",
        subDescription: "Master Git and GitHub from basics to advanced workflows. Essential skill for every developer.",
        phases: [
            {
                phase: 1,
                title: "Git Fundamentals & Setup",
                theory: [
                    "What is Version Control",
                    "Centralized vs Distributed Version Control",
                    "What is Git",
                    "Git vs GitHub vs GitLab",
                    "Installing Git",
                    "Git Configuration (user.name, user.email)",
                    "Global vs Local Configuration",
                    "SSH Keys Setup",
                    "Git Help Command",
                    "Git Terminology (Repository, Commit, Branch, etc.)"
                ],
                practicals: [
                    "Install Git on your system",
                    "Configure Git with your details",
                    "Generate SSH key and add to GitHub",
                    "Verify Git installation"
                ],
                games: [
                    {
                        title: "Oh My Git!",
                        url: "https://ohmygit.org/",
                        description: "An open source game about learning Git!"
                    }
                ]
            },
            {
                phase: 2,
                title: "Basic Git Commands",
                theory: [
                    "git init (Initialize Repository)",
                    "Working Directory, Staging Area, Repository",
                    "git add (Stage Files)",
                    "git add . vs git add -A",
                    "git status (Check Status)",
                    "git commit (Commit Changes)",
                    "Commit Messages Best Practices",
                    "git log (View History)",
                    "git log Formatting Options",
                    "git diff (View Changes)",
                    ".gitignore File",
                    "Common .gitignore Patterns"
                ],
                practicals: [
                    "Initialize a Git repository",
                    "Add and commit files",
                    "Write meaningful commit messages",
                    "View commit history",
                    "Create .gitignore for Node.js project"
                ],
                games: [
                    {
                        title: "Git Immersion",
                        url: "https://gitimmersion.com/",
                        description: "A guided tour that walks you through the fundamentals of Git, inspired by the premise that to know a thing is to do it."
                    }
                ]
            },
            {
                phase: 3,
                title: "Branching & Merging",
                theory: [
                    "What are Branches",
                    "Why Branches are Important",
                    "git branch (List/Create Branches)",
                    "git checkout (Switch Branches)",
                    "git switch (Modern Alternative)",
                    "git checkout -b vs git switch -c",
                    "main vs master Branch",
                    "git merge (Merge Branches)",
                    "Fast-Forward Merge",
                    "Three-Way Merge",
                    "Merge Conflicts",
                    "Resolving Merge Conflicts",
                    "git branch -d (Delete Branch)",
                    "HEAD Pointer Concept"
                ],
                practicals: [
                    "Create and switch between branches",
                    "Make changes on different branches",
                    "Merge branches together",
                    "Resolve merge conflicts manually",
                    "Delete merged branches"
                ],
                games: [
                    {
                        title: "Learn Git Branching",
                        url: "https://learngitbranching.js.org/",
                        description: "A visual and interactive way to learn Git branching."
                    }
                ]
            },
            {
                phase: 4,
                title: "Remote Repositories & Collaboration",
                theory: [
                    "Remote Repositories Concept",
                    "git clone (Clone Repository)",
                    "git remote (Manage Remotes)",
                    "origin Remote Name",
                    "git fetch vs git pull",
                    "git push (Push Changes)",
                    "git push -u origin main",
                    "Upstream Branch Concept",
                    "Forking vs Cloning",
                    "Pull Requests (PRs)",
                    "Code Review Process",
                    "SSH vs HTTPS for Git"
                ],
                practicals: [
                    "Clone a repository from GitHub",
                    "Push local repository to GitHub",
                    "Pull changes from remote",
                    "Create a Pull Request",
                    "Review and merge PR"
                ],
                games: []
            },
            {
                phase: 5,
                title: "Git Workflows & Branching Strategies",
                theory: [
                    "Centralized Workflow",
                    "Feature Branch Workflow",
                    "Git Flow",
                    "GitHub Flow",
                    "GitLab Flow",
                    "Trunk-Based Development",
                    "main/master Branch Protection",
                    "Naming Conventions (feature/, bugfix/, hotfix/)",
                    "When to Use Each Workflow",
                    "Team Collaboration Best Practices"
                ],
                practicals: [
                    "Implement feature branch workflow",
                    "Practice GitHub Flow",
                    "Create feature branches with naming conventions",
                    "Protect main branch on GitHub"
                ]
            },
            {
                phase: 6,
                title: "Advanced Git Commands",
                theory: [
                    "git stash (Save Work Temporarily)",
                    "git stash apply vs git stash pop",
                    "git stash list",
                    "git reset (Undo Changes)",
                    "git reset --soft vs --mixed vs --hard",
                    "git revert (Safe Undo)",
                    "git reset vs git revert",
                    "git checkout -- filename (Discard Changes)",
                    "git restore (Modern Alternative)",
                    "git clean (Remove Untracked Files)",
                    "git rm (Remove Files)",
                    "git mv (Rename/Move Files)",
                    "Amending Commits (git commit --amend)"
                ],
                practicals: [
                    "Use git stash to save work in progress",
                    "Reset commits with different modes",
                    "Revert a commit safely",
                    "Amend the last commit message",
                    "Clean untracked files"
                ]
            },
            {
                phase: 7,
                title: "Rebasing & History Rewriting",
                theory: [
                    "git rebase Concept",
                    "Rebase vs Merge",
                    "When to Rebase vs Merge",
                    "git rebase -i (Interactive Rebase)",
                    "Squash Commits",
                    "Reword Commit Messages",
                    "Reorder Commits",
                    "Drop Commits",
                    "Golden Rule of Rebasing (Never Rebase Public History)",
                    "Handling Rebase Conflicts",
                    "git reflog (Recovery Tool)",
                    "Recovering Lost Commits"
                ],
                practicals: [
                    "Rebase feature branch onto main",
                    "Use interactive rebase to squash commits",
                    "Reorder commits using interactive rebase",
                    "Recover lost commits with reflog"
                ]
            },
            {
                phase: 8,
                title: "Git Best Practices & Advanced Topics",
                theory: [
                    "Atomic Commits",
                    "Commit Message Conventions (Conventional Commits)",
                    "Semantic Versioning with Git Tags",
                    "git tag (Lightweight vs Annotated)",
                    "git blame (Find Code Authors)",
                    "git bisect (Debug with Binary Search)",
                    "Git Hooks (pre-commit, pre-push)",
                    "Husky for Git Hooks",
                    "Git Submodules",
                    "Git Worktrees",
                    "Monorepo vs Polyrepo",
                    "Large File Storage (Git LFS)",
                    "Security (Never Commit Secrets)",
                    "Git Performance Optimization"
                ],
                practicals: [
                    "Write atomic commits",
                    "Follow conventional commit format",
                    "Create and push tags",
                    "Set up pre-commit hooks with Husky",
                    "Use git blame to find code history",
                    "Debug issues with git bisect"
                ]
            },
            {
                phase: 9,
                title: "GitHub/GitLab Features & Open Source",
                theory: [
                    "GitHub Issues",
                    "GitHub Projects",
                    "GitHub Actions (CI/CD Basics)",
                    "GitHub Pages",
                    "GitHub Gists",
                    "Wiki Documentation",
                    "README Best Practices",
                    "LICENSE Files",
                    "CONTRIBUTING.md Guidelines",
                    "Code of Conduct",
                    "Open Source Contribution Workflow",
                    "Finding Good First Issues",
                    "Fork → Clone → Branch → Commit → Push → PR",
                    "Managing Notifications"
                ],
                practicals: [
                    "Create GitHub Issues for a project",
                    "Set up GitHub Actions workflow",
                    "Contribute to an open source project",
                    "Write a comprehensive README",
                    "Create Pull Request with proper description"
                ]
            }
        ]
    }
};
