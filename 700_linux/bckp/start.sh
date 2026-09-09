#!/bin/bash
# start.sh - Daily orchestrator (polished)
# Runs: commits -> dotfile bkps -> emacs/skills bkps -> git commit -> remote_startup -> yadda -> cleanup
# Usage: ./MuggleBornPadawan/700_linux/bckp/start.sh [--dry-run] [--yes] [--skip-commits] [--skip-remote] 2>&1 | tee ./MuggleBornPadawan/700_linux/bckp/shell_log.log
# Logs: pure overwrite (no -a) to keep disk lean on 11GB free machine
set -euo pipefail
IFS=$'\n\t'

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------
readonly LOG_FILE="${HOME}/MuggleBornPadawan/700_linux/bckp/shell_log.log"
readonly COMMITS_SCRIPT="${HOME}/MuggleBornPadawan/700_linux/bckp/commits.sh"
readonly DOTFILES_SCRIPT="${HOME}/MuggleBornPadawan/700_linux/bckp/dotfiles.sh"
readonly REMOTE_STARTUP_SCRIPT="${HOME}/MuggleBornPadawan/700_linux/remote_startup.sh"
readonly YADDA_SCRIPT="${HOME}/MuggleBornPadawan/700_linux/scripts/yadda_yadda.sh"
readonly DOTFILES_DST="${HOME}/MuggleBornPadawan/999_dotfiles"

DRY_RUN=false
VERBOSE=false
AUTO_YES=false
SKIP_COMMITS=false
SKIP_REMOTE=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --yes|-y) AUTO_YES=true ;;
    --skip-commits) SKIP_COMMITS=true ;;
    --skip-remote) SKIP_REMOTE=true ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [--yes] [--skip-commits] [--skip-remote]"
      echo "  --dry-run      : print actions, do not execute"
      echo "  --yes          : skip pause prompt"
      echo "  --skip-commits : skip commits.sh"
      echo "  --skip-remote  : skip remote_startup.sh"
      exit 0
      ;;
    *) echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------
log()  { echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
info() { log "INFO: $*"; }
warn() { log "WARN: $*"; }
vlog() { log "VERBOSE: $*"; }
die()  { log "ERROR: $*"; exit 1; }

run() {
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] $*"
  else
    eval "$@"
  fi
}

has_cmd() { command -v "$1" >/dev/null 2>&1; }

trap 'die "Failed at line $LINENO: $BASH_COMMAND"' ERR
mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$DOTFILES_DST"

# --------------------------------------------------------------------------
# 1. Commits (language hello_worlds)
# --------------------------------------------------------------------------
run_commits() {
  if [[ "$SKIP_COMMITS" == true ]]; then
    warn "Skip commits (--skip-commits)"
    return 0
  fi
  info "--- Commits ---"
  if [[ -x "$COMMITS_SCRIPT" ]]; then
    run "\"$COMMITS_SCRIPT\""
  else
    warn "Commits script not found or not executable: $COMMITS_SCRIPT"
  fi
}

# --------------------------------------------------------------------------
# 2. Dotfile backups (single manifest -> dotfiles.sh)
# --------------------------------------------------------------------------
backup_dotfiles() {
  info "--- Dotfile backups -> $DOTFILES_DST (via dotfiles.sh) ---"
  if [[ -x "$DOTFILES_SCRIPT" ]]; then
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] $DOTFILES_SCRIPT --dry-run --verbose"
      "$DOTFILES_SCRIPT" --dry-run --verbose || warn "dotfiles.sh dry-run failed"
    else
      "$DOTFILES_SCRIPT" --verbose || warn "dotfiles.sh failed"
    fi
  else
    warn "dotfiles.sh not found: $DOTFILES_SCRIPT"
  fi
}

# --------------------------------------------------------------------------
# 3. Emacs + skills backups (DEPRECATED - now in dotfiles.sh)
# --------------------------------------------------------------------------
backup_emacs_and_skills() {
  info "--- Emacs + Skills (deprecated, covered by dotfiles.sh) ---"
  # Keep old tars for 30 days then phase out. No action needed daily.
  # If you still want tar history, run: ~/MuggleBornPadawan/700_linux/bckp/backup_emacs.sh --keep 12
  vlog "Skip: skills/prompts/emacs now via dotfiles.sh manifest"
}

# --------------------------------------------------------------------------
# 4. Git commit dotfiles (only if changes)
# --------------------------------------------------------------------------
git_commit_dotfiles() {
  info "--- Git commit (MuggleBornPadawan) ---"
  local repo="${HOME}/MuggleBornPadawan"
  if [[ ! -d "$repo/.git" ]]; then
    warn "No git repo at $repo, skip"
    return 0
  fi
  # show status for log
  run "cd \"$repo\" && git status --short || true"

  # only commit if there are changes (including untracked relevant files)
  local has_changes=false
  if [[ "$DRY_RUN" == true ]]; then
    has_changes=true
  else
    if [[ -n "$(cd "$repo" && git status --porcelain 2>/dev/null)" ]]; then
      has_changes=true
    fi
  fi

  if [[ "$has_changes" == true ]]; then
    info "Commit dotfiles"
    run "cd \"$repo\" && git add . || true"
    # second check after add - avoid empty commit error
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] would run: git commit -m \"daily commit\""
    else
      if [[ -n "$(cd "$repo" && git diff --cached --quiet 2>&1 || echo "has-staged")" ]]; then
        # diff --quiet exits 1 if has diff, so we check exit code
        if ! cd "$repo" && git diff --cached --quiet 2>/dev/null; then
          run "cd \"$repo\" && git commit -m \"daily commit\" || true"
        else
          info "Nothing staged, skip commit"
        fi
      fi
    fi
    run "cd \"$repo\" && git status --short || true"
  else
    info "No changes, skip commit"
  fi
}

# --------------------------------------------------------------------------
# 5. Pause (opt-in, skip with --yes or non-interactive)
# --------------------------------------------------------------------------
maybe_pause() {
  if [[ "$AUTO_YES" == true ]]; then
    info "Skip pause (--yes)"
    return 0
  fi
  # skip if not interactive (e.g. piped)
  if [[ ! -t 0 ]]; then
    info "Non-interactive stdin, skip pause"
    return 0
  fi
  echo "Do you want to continue? (Press Enter)"
  # shellcheck disable=SC2162
  read -p "" || true
  echo "Continuing..."
}

# --------------------------------------------------------------------------
# 6. Remote startup (pure overwrite, no -a)
# --------------------------------------------------------------------------
run_remote_startup() {
  if [[ "$SKIP_REMOTE" == true ]]; then
    warn "Skip remote_startup (--skip-remote)"
    return 0
  fi
  info "--- Remote startup ---"
  if [[ -x "$REMOTE_STARTUP_SCRIPT" ]]; then
    # tee without -a = overwrite (pure update) to keep log lean
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] $REMOTE_STARTUP_SCRIPT 2>&1 | tee $LOG_FILE"
    else
      # run and tee to log (overwrite, also keep stdout)
      "$REMOTE_STARTUP_SCRIPT" 2>&1 | tee "$LOG_FILE" || warn "remote_startup.sh exited non-zero"
    fi
  else
    warn "Remote startup not found: $REMOTE_STARTUP_SCRIPT"
  fi
}

# --------------------------------------------------------------------------
# 7. Yadda diagnostics
# --------------------------------------------------------------------------
run_yadda() {
  info "--- Yadda yadda ---"
  if [[ -x "$YADDA_SCRIPT" ]]; then
    run "\"$YADDA_SCRIPT\" || true"
  else
    warn "Yadda script not found: $YADDA_SCRIPT"
  fi
}

# --------------------------------------------------------------------------
# 8. Editor backups (monthly, >30 days) - keep disk lean
# --------------------------------------------------------------------------
cleanup_editor_backups() {
  info "--- Editor backups (monthly, >30 days) ---"
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] find ~/.emacs.d/backups -type f -mtime +30 -delete"
    log "[DRY-RUN] find ~/ -maxdepth 1 -name '*~' -type f -mtime +30 -delete"
    log "[DRY-RUN] find ~/MuggleBornPadawan -name '*~' -type f -mtime +30 -delete"
  else
    find "${HOME}/.emacs.d/backups" -type f -mtime +30 -delete 2>/dev/null || true
    find "${HOME}" -maxdepth 1 -name '*~' -type f -mtime +30 -delete 2>/dev/null || true
    find "${HOME}/MuggleBornPadawan" -name '*~' -type f -mtime +30 -delete 2>/dev/null || true
    # also clean Emacs auto-save list older than 30d (safe)
    find "${HOME}/.emacs.d/auto-save-list" -type f -mtime +30 -delete 2>/dev/null || true
    info "Editor backups cleaned (>30d)"
  fi
}

# --------------------------------------------------------------------------
# 9. Cleanup (safe rm -f, fix old artifact files)
# --------------------------------------------------------------------------
cleanup_temps() {
  info "--- Cleanup ---"
  # work from HOME as original did
  local to_rm=(
    "${HOME}/daily_nuggets.txt"
    "${HOME}/model_answers.log"
    "${HOME}/aeo_results_log.txt"
    "${HOME}/startup_log.log"
    "${HOME}/tmp.txt"
    "${HOME}/a"      # artifact from old bug: tee - a
    "${HOME}/-"      # artifact from old bug: rm startup_log.log -
  )
  for f in "${to_rm[@]}"; do
    if [[ -e "$f" ]]; then
      info "Remove $(basename "$f")"
      run "rm -f \"$f\""
    fi
  done

  # tempFile_* created by yadda_yadda.sh (seq -f tempFile_%02g.txt)
  # Use -f and limit to HOME to avoid expanding to nothing
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] rm -f ~/tempFile_*.txt ~/tempF* 2>/dev/null || true"
  else
    rm -f "${HOME}"/tempFile_*.txt 2>/dev/null || true
    rm -f "${HOME}"/tempF* 2>/dev/null || true
    info "Temp files cleaned"
  fi
}

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
main() {
  log "Start start.sh (DRY_RUN=$DRY_RUN AUTO_YES=$AUTO_YES SKIP_COMMITS=$SKIP_COMMITS SKIP_REMOTE=$SKIP_REMOTE)"
  cd "$HOME" || die "Cannot cd to HOME"

  echo -e "\nBckps - tbd"
  run_commits
  backup_dotfiles
  backup_emacs_and_skills
  git_commit_dotfiles
  maybe_pause
  run_remote_startup

  # Backups (commented in old script - kept as info, not run)
  info "Backup log - done"

  run_yadda
  cleanup_editor_backups
  cleanup_temps

  log "Done. start.sh complete"
}

main "$@"
