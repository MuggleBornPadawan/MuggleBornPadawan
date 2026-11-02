# Worktrees — Fallback + Reference

Disclosed reference for `using-git-worktrees`. Load only for manual `git worktree` fallback.

## Directory Selection (priority)

1. Explicit user preference wins.
2. Existing project-local: `.worktrees/` preferred, `worktrees/` alternative. Both exist → `.worktrees/` wins.
3. Default: `.worktrees/` at project root.

```bash
ls -d .worktrees 2>/dev/null
ls -d worktrees 2>/dev/null
```

## Safety Verification (project-local only)

MUST verify ignored before create:

```bash
git check-ignore -q .worktrees 2>/dev/null || git check-ignore -q worktrees 2>/dev/null
```

If NOT ignored: add to `.gitignore`, commit, then proceed. Prevents committing worktree contents.

## Create

```bash
path="$LOCATION/$BRANCH_NAME"
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

Sandbox denial → tell user, work in place, run setup + baseline in place.

## Project Setup

```bash
if [ -f package.json ]; then npm install; fi
if [ -f Cargo.toml ]; then cargo build; fi
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f pyproject.toml ]; then poetry install; fi
if [ -f go.mod ]; then go mod download; fi
# Clojure: deps.edn present → no install. Run `bb tasks` to list.
```

## Quick Reference

| Situation | Action |
|---|---|
| Already in linked worktree | Skip creation |
| In submodule | Treat as normal repo |
| Native tool available | Use it |
| No native tool | Git fallback here |
| Dir not ignored | Add to .gitignore + commit |
| Permission error | Sandbox fallback, work in place |
| Baseline fails | Report + ask |

## Common Rationalizations

| Excuse | Reality |
|---|---|
| "Obviously not in worktree" | Run Step 0. Harness isolation + submodules fool eyeballing. |
| "`git worktree add` is quicker" | Native tool owns placement/cleanup. Bypassing creates phantom state. |
| "Dir surely ignored" | Run `git check-ignore`. Unignored commits whole tree. |
| "Any dir works" | Instructions > existing dir > `.worktrees/` default. |
| "Baseline can wait" | Dirty baseline makes later failures ambiguous. Run now. |
