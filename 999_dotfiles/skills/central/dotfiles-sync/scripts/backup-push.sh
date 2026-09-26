#!/usr/bin/env bash
# backup-push.sh - Backup dotfiles and push chromebook + main
# Usage:
#   ./backup-push.sh [--dry-run] [--verbose] ["commit message"]
#   ./backup-push.sh --help
# Design: lean, safe, mirrors SKILL.md steps
set -euo pipefail

DRY_RUN=false
VERBOSE=false
MSG=""

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --verbose|-v) VERBOSE=true ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [--verbose] [\"commit message\"]"
      echo "  Backup via dotfiles.sh, commit on chromebook, push chromebook+main"
      exit 0 ;;
    --*) echo "Unknown arg: $arg" >&2; exit 1 ;;
    *) MSG="$arg" ;; # last arg wins as msg
  esac
done

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
vlog() { [[ "$VERBOSE" == true ]] && log "[verbose] $*"; }

REPO="$HOME/MuggleBornPadawan"
DOTFILES_SH="$REPO/700_linux/bckp/dotfiles.sh"

if [[ ! -x "$DOTFILES_SH" ]]; then
  log "ERROR: not found/executable: $DOTFILES_SH"; exit 1
fi

# 1. Backup
log "Step 1: Backup dotfiles -> 999_dotfiles"
if [[ "$DRY_RUN" == true ]]; then
  "$DOTFILES_SH" --dry-run --verbose 2>&1 | tail -n 20
  log "(dry-run) backup done, skip commit/push"
  exit 0
else
  if [[ "$VERBOSE" == true ]]; then
    "$DOTFILES_SH" --verbose 2>&1 | tail -n 30
  else
    "$DOTFILES_SH" 2>&1 | tail -n 20
  fi
fi

cd "$REPO"

# 2. Check status
log "Step 2: git status"
git status --short 2>&1 | head -n 30 || true
CHANGES=$(git status --porcelain 2>&1 | wc -l)
if [[ "$CHANGES" -eq 0 ]]; then
  log "Nothing to commit - backup was clean"
  exit 0
fi
log "Changes: $CHANGES files"
git diff --stat 2>&1 | head -n 20 || true

# Show what would be added (explicit list per manifest)
STAGE_LIST=(
  "700_linux/bckp"
  "700_linux/scripts/sysinfo.sh"
  "999_dotfiles/home"
  "999_dotfiles/prompts"
  "999_dotfiles/skills"
  "999_dotfiles/templates"
  "999_dotfiles/by-tool"
)
log "Step 3: Stage explicit list: ${STAGE_LIST[*]}"
for p in "${STAGE_LIST[@]}"; do
  if [[ -e "$REPO/$p" ]]; then
    git add "$p" 2>&1 || true
  fi
done
# If there are still unstaged tracked changes, inform user but don't auto-add unknowns like test.tmp
if ! git diff --quiet 2>&1; then
  log "Note: some tracked files still unstaged (e.g., test.tmp not in manifest) - not adding:"
  git diff --name-only 2>&1 | head -n 20 || true
fi
git diff --cached --stat 2>&1 | head -n 30 || true
CACHED=$(git diff --cached --name-only 2>&1 | wc -l)
if [[ "$CACHED" -eq 0 ]]; then
  log "Nothing staged after explicit add - check git status"
  git status --short 2>&1 | head -n 20
  exit 1
fi

# 4. Ensure on chromebook
CUR=$(git rev-parse --abbrev-ref HEAD 2>&1)
log "Current branch: $CUR"
if [[ "$CUR" != "chromebook" ]]; then
  log "Checkout chromebook"
  git checkout chromebook 2>&1 | head -n 5
fi

# Commit
if [[ -z "$MSG" ]]; then
  MSG="chore: dotfiles backup $(date +%Y-%m-%d)"
fi
log "Step 4: Commit on chromebook: $MSG"
git commit -m "$MSG" 2>&1 | tail -n 10
COMMIT=$(git rev-parse --short HEAD 2>&1)
log "Committed: $COMMIT"

# 5. Push chromebook
log "Step 5: Push chromebook -> origin/chromebook"
git push origin chromebook 2>&1 | tail -n 10
log "Push chromebook OK"

# 6. Merge to main
log "Step 6: Merge chromebook -> main"
git checkout main 2>&1 | head -n 5
# Ensure main is up to date first (fast-forward)
git fetch origin 2>&1 | head -n 5 || true
if git merge-base --is-ancestor HEAD chromebook 2>&1; then
  vlog "chromebook is ahead of main, fast-forward merge expected"
fi
git merge chromebook --no-edit 2>&1 | tail -n 10
MERGED=$(git rev-parse --short HEAD 2>&1)
log "Merge result: $MERGED (msg should match $COMMIT if fast-forward)"

log "Push main -> origin/main"
git push origin main 2>&1 | tail -n 10
log "Push main OK"

git checkout chromebook 2>&1 | head -n 5
log "Back on chromebook"

# 7. Verify
log "Step 7: Verify"
git branch -vv 2>&1 | head -n 10
git log --oneline --graph --all -5 2>&1 | head -n 10
git status --short 2>&1 | head -n 10
log "Done: $COMMIT on both chromebook and main, pushed to origin"
