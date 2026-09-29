---
description: Explain commands from previous prompt
argument-hint: "[empty = previous prompt]"
---

Explain commands used in previous prompt only (not full session).

Rules:
- One row per command, in run order.
- Keep each explanation to one short sentence.
- Use ASD-STE100 Simplified Technical English.
- Use bullet points. No long text.
- If no commands in previous prompt, say so.

Output format:

- `command` — what it does and why it was run.

Example:

- `git status` — shows worktree state.
- `git diff --stat` — shows changed files.
- `git push origin <branch>` — pushes branch to remote.
