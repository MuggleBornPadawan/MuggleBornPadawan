---
name: pr
description: Prepare PR title + description from branch diff. Use when user asks to open PR.
argument-hint: ""
---

Prepare PR for current branch.

1. Find merge base: `git merge-base HEAD main||master`
2. Review commits/diffs on branch
3. Self-review diff first: flag debug code, TODOs, unintended changes
4. Title: short imperative `type(scope): ...`
5. Description:
   - **What** — bullets
   - **Why** — motivation
   - **Testing** — how verified, what not tested
   - **Risks** — reviewers focus

Output markdown ready for `gh pr create --title ... --body ...` (or glab). Do not create PR until confirmed.
