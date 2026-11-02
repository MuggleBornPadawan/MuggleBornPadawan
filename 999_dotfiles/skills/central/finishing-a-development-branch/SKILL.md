---
name: finishing-a-development-branch
description: "Finish branch and integrate work. Use when tests pass and merge, push PR, or keep decision needed."

---

# Finishing a Development Branch — Clojure Patch

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill finishing-a-development-branch
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

**Announce:** "I'm using the finishing-a-development-branch skill to complete this work."
> Clojure prio: `bb test` → `clojure -M:test` → `lein test`. See `references/steps.md` for full Steps 2-6.

## Step 1: Verify Tests — Clojure First
```bash
bb test                          # preferred, low RAM
clojure -M:test
clj-kondo --lint src
```
If fail: report failures, stop. If pass: continue.

## Steps 2-6 — Summary
2. **Detect env:** `GIT_DIR` vs `GIT_COMMON`, `WORKTREE_PATH` → determines menu/cleanup.
3. **Base branch:** confirm fork point ("split from <guess>?").
4. **Present menu:** Normal/named: 1) Merge locally 2) Push+PR 3) Keep. Detached HEAD: 1) Push new branch+PR 2) Keep. Exact wording, wait for choice. Discard only on explicit `discard`.
5. **Execute:** Merge → `checkout base && pull && merge && bb test && clj-kondo`; Push → `push -u origin <branch>` + forge PR; Keep → report path.
6. **Cleanup:** From `MAIN_ROOT`, remove worktree only if under `.worktrees/`/`worktrees/`, else leave. Never `--force` on refusal — show `status --porcelain`.

→ Full commands, menus, rationalizations: `references/steps.md`

## Quick Ref
| Option | Merge | Push | Keep Worktree | Verify |
|--------|-------|------|---------------|--------|
| 1 Merge | yes | - | - | `bb test && clj-kondo` |
| 2 PR | - | yes | yes | - |
| 3 Keep | - | - | yes | - |
