export const GIT_CURRICULUM = {
    "git": {
        fileName: "git",
        description: "Version Control & Git",
        category: "Git",
        subDescription: "Master Git and GitHub from basics to advanced workflows. Essential skill for every developer.",
        phases: [
            {
                phase: 1,
                title: "The Magic of Version Control: The Anti-Chaos Tool",
                theory: [
                    "The Problem: 'Final_v2_REALLY_FINAL.zip' (The nightmare of manual saving)",
                    "The Solution: Version Control (The Time Machine for code)",
                    "Git vs GitHub: The tool (The Camera) vs The storage (The Photo Album)",
                    "Why Git? Freedom to make mistakes without losing work",
                    "Installation: Getting your personal Time Machine ready"
                ],
                practicals: [
                    "The Cleanup: Find a folder where you've manually 'versioned' files and see the mess",
                    "The Promise: Write down 3 times you've lost work because you didn't save correctly",
                    "Installation Test: Run `git --version` to make sure your machine is ready"
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
                title: "The Local Vault: Init & Config",
                theory: [
                    "Repository (The Vault): Making a folder 'Git-aware'",
                    "Identity: Telling the Time Machine who you are (Name & Email)",
                    "Hidden Secrets: The `.git` folder (The engine room)",
                    "The Command Line: Your direct link to the Time Machine",
                    "Global vs Local: Setting your identity once vs per project"
                ],
                practicals: [
                    "The Handshake: Configure your Git name and email globally",
                    "Initializing: Turn a boring folder into a professional 'Vault' using `git init`",
                    "The Hidden Peek: Use your file explorer to see the hidden `.git` folder"
                ]
            },
            {
                phase: 3,
                title: "The Save Slot: Add & Commit",
                theory: [
                    "The Polaroid Analogy: Framing the shot vs taking the photo",
                    "Staging (`git add`): Picking which files go into the next 'Save Slot'",
                    "Committing (`git commit`): Clicking the shutter and saving the moment",
                    "Commit Messages: Writing a note to your 'Future Self'",
                    "Working Area vs Staging vs Repository: The three rooms of Git"
                ],
                practicals: [
                    "The Frame: Use `git add` to pick one file and leave another behind",
                    "The Snapshot: Commit your changes with a clear 'Why I did this' message",
                    "Project: 'The Storybook' - Make 3 commits that tell a short story of an app's growth"
                ]
            },
            {
                phase: 4,
                title: "Looking at the Past: Log & Status",
                theory: [
                    "The Time Travel Log: Using `git log` to see everything that ever happened",
                    "The Status Check: Asking 'What's the current situation?' with `git status`",
                    "Identifiers (Hashes): The unique fingerprints of every commit",
                    "Difference (`git diff`): Seeing exactly which lines changed since the last save",
                    "Navigation: How to read a terminal log without getting lost"
                ],
                practicals: [
                    "The Log Explorer: View your history and find the unique 'Fingerprint' of your first commit",
                    "The Difference: Make a small change and use `git diff` to see the lines turn green/red",
                    "Project: 'The Audit' - Use `git status` to identify 3 files in different states (Modified, Staged, Untracked)"
                ]
            },
            {
                phase: 5,
                title: "The Safety Net: Ignore & Undo Basics",
                theory: [
                    "Ignoring (.gitignore): Telling Git to ignore 'The Garbage' (Node modules, private keys)",
                    "Patterns: How to ignore all folders or specific file types",
                    "Discarding: Using `git restore` to undo changes that haven't been saved yet",
                    "Safety First: Why we never 'Commit' secrets like passwords",
                    "The Clean Slate: Checking if your project is 'Clean' before starting new work"
                ],
                practicals: [
                    "The Trash Can: Create a `.gitignore` and make Git 'forget' a temporary text file",
                    "The Panic Button: Make a huge mistake in a file and use `git restore` to bring it back to normal",
                    "Project: 'The Secret Guardian' - Set up a project that automatically ignores `.env` files"
                ]
            },
            {
                phase: 6,
                title: "Parallel Universes: Branching Basics",
                theory: [
                    "The 'What If?' Scenario: Creating a new branch to try an idea safely",
                    "The Main Branch: The source of truth (The 'Main' timeline)",
                    "Feature Branches: Working on one specific 'Part' of the app without breaking the rest",
                    "Isolation: Why changes on one branch don't affect others",
                    "Naming: Best practices for naming your 'Universes' (e.g., `feature/login-button`)"
                ],
                practicals: [
                    "Universe Creation: Create a branch called `experiment` and switch to it",
                    "Parallel Work: Make a change on `experiment` that doesn't exist on `main`",
                    "Project: 'The Multi-Verse' - Create 3 branches for 3 different features (Header, Footer, Content)"
                ]
            },
            {
                phase: 7,
                title: "Switching Realities: Traveling Between Branches",
                theory: [
                    "The Teleporter (`git switch`): Moving your files back and forth in time",
                    "The HEAD: The 'You Are Here' marker in your Git history",
                    "Uncommitted Changes: What happens when you try to switch while the kitchen is messy",
                    "Visualizing: Thinking of Git as a tree with many branches",
                    "The Identity of a Branch: Why `main` is just another branch with a special name"
                ],
                practicals: [
                    "Teleporting: Switch between your `experiment` and `main` branches and watch your files change",
                    "The Messy Switch: Try to switch branches with unsaved work and see how Git protects you",
                    "Project: 'The Reality Toggle' - Build a simple change on two branches and flip between them in your editor"
                ]
            },
            {
                phase: 8,
                title: "Merging Realities: Coming Together",
                theory: [
                    "The Reunion (`git merge`): Bringing the 'Experiment' back to the 'Main' timeline",
                    "Fast-Forward: When one timeline is just ahead of the other",
                    "The Merge Commit: Creating a 'Marriage' between two independent histories",
                    "Strategy: Why we merge *into* the branch we want to update",
                    "Preparation: Pulling the latest changes before you merge"
                ],
                practicals: [
                    "The Reunion: Merge your `experiment` branch into `main` and see the code combine",
                    "Fast-Forward Test: Create a branch, add a commit, and merge it immediately",
                    "Project: 'The Feature Launch' - Complete a feature on a branch and 'Launch' it into the main app"
                ]
            },
            {
                phase: 9,
                title: "The Collision: Conflict Resolution",
                theory: [
                    "The Two Chefs Analogy: When two people try to edit the same line at the same time",
                    "Conflict Warning: Why Git stops and asks for your help",
                    "The Conflict Markers: Reading the `<<<<`, `====`, and `>>>>` signs",
                    "The Choice: Accepting 'Yours', 'Theirs', or 'Both'",
                    "Finalizing: How to mark a conflict as 'Resolved'"
                ],
                practicals: [
                    "Creating Chaos: Intentionally edit the same line on two branches and try to merge them",
                    "The Fix: Use your code editor's conflict tool to pick the 'Winning' code",
                    "Project: 'The Peace Maker' - Walk through a complex 5-line conflict and resolve it manually"
                ]
            },
            {
                phase: 10,
                title: "The Cleanup: Tidying the Timelines",
                theory: [
                    "Pruning: Why we delete branches after they are merged",
                    "Renaming: How to fix a branch name that was spelled wrong",
                    "The Archive: Keeping your 'Main' timeline clean for other developers",
                    "Git Clean: Removing local files that aren't part of the 'Vault' history",
                    "Organization: The mindset of a clean developer"
                ],
                practicals: [
                    "The Delete: Remove 3 old experiment branches after merging them",
                    "The Rename: Change a branch name from `test` to `feature/refactor-styles`",
                    "Project: 'The Spring Clean' - Audit a repository with 10 branches and tidy it down to 1"
                ]
            },
            {
                phase: 11,
                title: "The Global Library: GitHub & Remotes",
                theory: [
                    "The Cloud Vault: Using GitHub as the 'Global Library' for your code",
                    "Remotes: The link between your computer and the outside world",
                    "SSH vs HTTPS: The 'Secret Handshake' vs The 'Username/Password'",
                    "Cloning: Taking a full copy of someone else's 'Time Machine'",
                    "Identity at Scale: Why GitHub is the 'Resume' for modern developers"
                ],
                practicals: [
                    "The SSH Key: Generate a secure 'Digital Key' and give it to GitHub",
                    "Remote Link: Connect your local 'Vault' to a new GitHub repository",
                    "Project: 'The Portfolio Start' - Create your first public repository and description"
                ]
            },
            {
                phase: 12,
                title: "Sending & Receiving: Push & Pull",
                theory: [
                    "Pushing (`git push`): Sending your 'Photo Album' to the Global Library",
                    "Fetching vs Pulling: Asking 'What's new?' vs 'Download and combine everything'",
                    "Upstream: Setting the default 'Home' for your branches",
                    "Collaboration Friction: Why you can't push if someone else pushed first",
                    "The Remote View: Seeing your code live on the GitHub website"
                ],
                practicals: [
                    "The Launch: Push your first set of commits to GitHub",
                    "The Sync: Edit a file directly on GitHub.com and then `pull` the change to your laptop",
                    "Project: 'The Live Backup' - Ensure your local project and GitHub project match perfectly"
                ]
            },
            {
                phase: 13,
                title: "Collaboration: Pull Requests & Reviews",
                theory: [
                    "The Librarian Analogy (Pull Request): 'I've written something, can you check it?'",
                    "Forking: Making your own 'Copy' of a famous project to play with",
                    "Code Review: Conversations about code (Leaving comments and emojis)",
                    "Approval: The 'Green Light' from a teammate",
                    "Open Source: How the whole world builds software together"
                ],
                practicals: [
                    "The Fork: Fork a small open-source project and clone it to your machine",
                    "The PR: Create a branch, change one line, push it, and open a 'Pull Request' on GitHub",
                    "Project: 'The Team Player' - Give feedback on a friend's PR (or a mock one) using GitHub comments"
                ]
            },
            {
                phase: 14,
                title: "History Rewriting: Amend & Reset",
                theory: [
                    "The 'Aha!' Moment: Realizing you forgot one file right after you committed",
                    "Amending: 'Tack on' a change to the very last commit without making a new one",
                    "Reset (Soft vs Hard): The 'Undo' button for history (Dangerous but powerful)",
                    "History Ethics: Why we NEVER rewrite history that others have already seen",
                    "The Mistake Fixer: Fixing a typo in a commit message"
                ],
                practicals: [
                    "The Amend: Commit a file, then use `--amend` to change the message without creating a 2nd commit",
                    "The Soft Reset: Move your 3 latest commits back to the 'Staging' area",
                    "Project: 'The Clean History' - Take a messy group of 5 commits and refine them into 1 perfect one"
                ]
            },
            {
                phase: 15,
                title: "Advanced Time Travel: Stash & Reflog",
                theory: [
                    "The Stash: Quickly 'Hiding' your unfinished work to switch tasks",
                    "The Reflog: The 'Safety Net of the Safety Net' (Finding 'Deleted' commits)",
                    "Rebasing: A cleaner way to merge? (The advanced timeline moving)",
                    "Git Hooks: Automating tasks (like checking for typos) whenever you commit",
                    "Mastery: When you stop fearing Git and start using it as a creative tool"
                ],
                practicals: [
                    "The Stash: Start a change, `stash` it, switch branches, and then `pop` it back",
                    "The Rescue: Intentionally 'lose' a commit and use `git reflog` to find its ghost",
                    "Project: 'The Git Pro' - Set up a simple 'Pre-commit' hook that says 'Good job!' every time you save"
                ]
            }
        ]
    }
};
