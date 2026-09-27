---
description: List all shell commands used and explain each one
argument-hint: "[session-or-diff]"
---

List all commands used in this session (or in `${@}`) and explain each one.

Rules:
- One row per command, in run order.
- Keep each explanation to one short sentence.
- Use ASD-STE100 Simplified Technical English.
- Use bullet points. No long text.

Output format:

- `command` — what it does and why it was run.

Reference: commands used by `git-sync` run on `chromebook` branch:

- `git branch --show-current` — shows current branch name.
- `git remote -v` — shows remote URL for fetch and push.
- `git status` — shows staged, modified, and untracked files.
- `git log --oneline -5` — shows last 5 commits in short form.
- `git branch -r` — lists remote branches.
- `git show-ref --verify refs/heads/main` — checks if local `main` exists.
- `git ls-remote --heads origin` — lists branch heads on remote.
- `git diff --stat` — shows changed files with line counts.
- `git diff` — shows full unstaged changes.
- `git status --porcelain` — shows machine-readable status.
- `git add .` — stages all changes.
- `git commit -m "type(scope): message"` — creates commit with message.
- `git push origin <branch>` — pushes branch to remote.
- `git checkout <branch>` — switches branch.
- `git pull origin main --ff-only` — updates `main` without merge commit.
- `git merge <branch>` — merges feature branch into current branch.
- `git rev-parse --abbrev-ref HEAD` — prints current branch name.
