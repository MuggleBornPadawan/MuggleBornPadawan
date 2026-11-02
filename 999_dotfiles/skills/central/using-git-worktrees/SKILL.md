---
name: using-git-worktrees
description: "Isolate work in git worktrees. Use when feature isolation or native worktree fallback needed."
---

# Using Git Worktrees

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill using-git-worktrees
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

## Overview

Detect isolation first. Then native tools. Then git fallback. Never fight harness.

**Announce:** "I'm using the using-git-worktrees skill to set up an isolated workspace."

## Step 0: Detect

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
git rev-parse --show-superproject-working-tree 2>/dev/null
```

- `GIT_DIR != GIT_COMMON` + not submodule → already in worktree. Skip to Step 2.
- `GIT_DIR == GIT_COMMON` or submodule → normal checkout. Ask consent before create:
> "Would you like me to set up an isolated worktree? It protects your current branch."

Declined → work in place, go to Step 2.

## Step 1: Create

1a. Native tool first (`EnterWorktree`, `/worktree`, `--worktree`). Use it, go to Step 2.
1b. No native tool → see `references/worktrees-fallback.md` for dir selection, ignore-check, `git worktree add`.

## Step 2: Setup

Auto-detect: `package.json` → `npm install`, `Cargo.toml` → `cargo build`, `go.mod` → `go mod download`. Clojure `deps.edn` → no install, run `bb tasks`.

## Step 3: Baseline

Run project tests (`npm test` / `cargo test` / `bb test`). Fail → report, ask. Pass → report:

```
Worktree ready at <full-path>
Tests passing (<N> tests, 0 failures)
```

Full fallback + rationalizations: `references/worktrees-fallback.md`.
