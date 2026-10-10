---
name: commit
description: Craft conventional commit from staged or working diff. Use when user asks to commit.
argument-hint: "[message]"
---

Craft commit message from diff.

1. Run `git status` then `git diff --cached --stat`. If nothing staged, run `git diff --stat` and TELL user you used working tree (not staged).
2. Summarize what changed and why in one sentence
3. Propose message: `type(scope): short imperative summary` (conventional commits)
4. Body only if non-trivial (what + why, not how)
5. Show message and ASK for confirmation before `git commit`

Do not push. Do not add co-author unless asked.
