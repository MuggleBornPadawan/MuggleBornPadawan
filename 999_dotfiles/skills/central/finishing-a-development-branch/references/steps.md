# Finishing a Development Branch — Steps 2-6 (Reference)

## Step 2: Detect Environment
```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
WORKTREE_PATH=$(git rev-parse --show-toplevel)
```
| State | Menu | Cleanup |
|---|---|---|
| `GIT_DIR == GIT_COMMON` | Standard 3 options | No worktree |
| `GIT_DIR != GIT_COMMON`, named branch | Standard 3 | Provenance-based |
| `GIT_DIR != GIT_COMMON`, detached HEAD | Reduced 2 | External |

## Step 3: Base Branch
Whatever work forked from — plan/conversation/upstream. Confirm: "This branch split from <guess> - is that correct?"

## Step 4: Present Options
**Normal/named branch — 3 options:**
1. Merge back to <base-branch> locally
2. Push and create Pull Request
3. Keep branch as-is

**Detached HEAD — 2 options:**
1. Push as new branch and create PR
2. Keep as-is

Discard only on explicit request (typed `discard`).

## Step 5: Execute Choice
**Option 1 Merge locally:**
```bash
MAIN_ROOT=$(git -C "$(git rev-parse --git-common-dir)/.." rev-parse --show-toplevel)
cd "$MAIN_ROOT"
git checkout <base-branch> && git pull && git merge <feature-branch>
bb test && clj-kondo --lint src
git branch -d <feature-branch>  # after green
```
**Option 2 Push+PR:**
```bash
git push -u origin <feature-branch>
# detached: git push origin HEAD:refs/heads/<new-branch>
```
Then create PR via forge CLI/URL. Keep worktree for feedback.
**Option 3 Keep:** Report path preserved.
**Discard (explicit only):** Confirm `discard`, then `git branch -D`.

## Step 6: Cleanup Workspace
Runs for Option 1/discards only; Options 2/3 preserve worktree. Must run from outside worktree (already cd'd to MAIN_ROOT) using values from Step 2.

- `GIT_DIR == GIT_COMMON`: done.
- `WORKTREE_PATH` under `.worktrees/` or `worktrees/`: `git worktree remove "$WORKTREE_PATH" && git worktree prune`
- Refused (`modified/untracked files`): show `git -C "$WORKTREE_PATH" status --porcelain -uall`, ask: 1) Commit 2) Move to main root 3) Delete. Never `--force` solo.
- Otherwise: leave in place / use workspace-exit tool.

## Common Rationalizations
"Tests passed earlier" → re-run on merged tree. "Obviously want merge" → ask. "Seem done, offer discard" → no. "Yeah get rid of it" → need typed `discard`. "PR up so worktree clutter" → keep. "Worktree looks stale" → only clean `.worktrees/`. "Removal refused --force" → show files. "Flaky merged failure" → stop. "Base obviously main" → confirm.
