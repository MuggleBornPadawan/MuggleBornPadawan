#!/bin/bash
# commits.sh - Test hello_world blocks + daily git commits (polished)
# Usage: ./commits.sh [--dry-run] [r]
#   --dry-run : print actions, do not execute
#   r         : random delay 60-240s between blocks (keep for cron jitter)
set -euo pipefail
IFS=$'\n\t'

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------
readonly REPO="${HOME}/MuggleBornPadawan"
DRY_RUN=false
DELAY_ARG=""

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [r]"
      echo "  --dry-run : show what would run"
      echo "  r         : random delay 60-240s between blocks"
      exit 0
      ;;
    r) DELAY_ARG="r" ;;
    *) echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------
log()  { echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
info() { log "INFO: $*"; }
warn() { log "WARN: $*"; }
die()  { log "ERROR: $*"; exit 1; }

run() {
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] $*"
  else
    eval "$@"
  fi
}

has_cmd() { command -v "$1" >/dev/null 2>&1; }

delay_timer() {
  local func_arg="${1:-}"
  if [[ "$func_arg" == "r" ]]; then
    local d
    d=$(shuf -i 60-240 -n 1)
    log "Delay 'r' -> sleep ${d}s..."
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] would sleep ${d}s"
    else
      sleep "$d"
      log "Sleep done"
    fi
  fi
}

# Run one language block and commit only that folder if changed
# Usage: run_block <label> <rel_dir> <commit_msg> <cmd...>
run_block() {
  local label="$1"
  local rel_dir="$2"
  local commit_msg="$3"
  shift 3
  local cmd="$*"

  info "--- $label ($rel_dir) ---"
  local abs_dir="${REPO}/${rel_dir}"

  if [[ ! -d "$abs_dir" ]]; then
    warn "Skip $label: dir not found $abs_dir"
    return 0
  fi

  # run hello_world in its dir
  if [[ -n "$cmd" ]]; then
    # check primary binary exists (first word of cmd, before | etc)
    local bin
    bin=$(echo "$cmd" | awk '{print $1}')
    # only warn if bin looks like a command (not ./hello)
    if [[ "$bin" != ./* ]] && ! has_cmd "$bin"; then
      warn "Command not found: $bin, still try: $cmd"
    fi
    run "cd \"$abs_dir\" && $cmd || true"
  fi

  # git add only that subdir (not repo-wide) + commit if staged changes
  if [[ ! -d "${REPO}/.git" ]]; then
    warn "No git repo at $REPO"
    return 0
  fi

  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] cd $REPO && git add $rel_dir && git commit -m \"$commit_msg\" (if changes)"
  else
    cd "$REPO" || die "Cannot cd to $REPO"
    # add that folder (and also hello_world.log if created)
    git add -- "$rel_dir" 2>/dev/null || git add "$rel_dir" || true
    # also stage log files explicitly (in case ignored)
    git add -f "${rel_dir}/hello_world.log" "${rel_dir}/log.txt" 2>/dev/null || true

    if git diff --cached --quiet 2>/dev/null; then
      info "No changes in $rel_dir, skip commit"
    else
      info "Commit: $commit_msg"
      git commit -m "$commit_msg" || warn "Commit failed for $label"
    fi
    cd - >/dev/null || true
  fi

  delay_timer "$DELAY_ARG"
}

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
main() {
  log "Start commits.sh (DRY_RUN=$DRY_RUN DELAY=$DELAY_ARG)"
  echo " - - - "
  echo "test programming blocks"

  run_block "mit-scheme" "130_mit_scheme" "daily mit-scheme" \
    "scheme --load hello_world.scm --eval '(exit)' | tail -n 4 2>&1 | tee -a hello_world.log"

  run_block "racket" "150_racket_scheme" "daily racket" \
    "racket hello_world.rkt | head -n 2 2>&1 | tee -a hello_world.log"

  run_block "cpp" "100_cpp" "daily cpp" \
    "./hello > hello_world.log"

  # nasm: runs twice (once stdout, once append to log.txt)
  run_block "nasm" "100_nasm" "daily nasm" \
    "./hellotime; ./hellotime >> log.txt"

  run_block "java" "200_java" "daily java" \
    "java -jar HelloWorld.jar"

  run_block "python" "300_python" "daily python" \
    "python3 hello_world.py"

  run_block "clisp" "140_clisp" "daily clisp" \
    "clisp hello-world.lisp"

  run_block "R" "400_r" "daily r" \
    "Rscript hello_world.R"

  run_block "clojure" "110_clojure" "daily clj" \
    "clojure hello_world.clj"

  run_block "elisp" "120_elisp" "daily elisp" \
    "emacs -Q --script hello_world.el"

  # shell + nuggets: two dirs but one commit as before
  info "--- shell and nuggets (700_linux) ---"
  local bckp_dir="${REPO}/700_linux/bckp"
  local scripts_dir="${REPO}/700_linux/scripts"
  if [[ -d "$bckp_dir" ]]; then
    if [[ -f "${bckp_dir}/daily_nuggets.txt.enc" ]]; then
      run "cd \"$REPO\" && git add -- \"700_linux/bckp/daily_nuggets.txt.enc\" 2>/dev/null || true"
    else
      warn "Skip daily_nuggets.txt.enc not found"
    fi
  fi
  if [[ -x "${scripts_dir}/hello_world.sh" ]]; then
    run "cd \"$scripts_dir\" && ./hello_world.sh || true"
  else
    warn "hello_world.sh not found in $scripts_dir"
  fi
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] cd $REPO && git add 700_linux/ && git commit -m \"daily shell and nuggets\" (if changes)"
  else
    cd "$REPO" || die "Cannot cd to $REPO"
    git add -- "700_linux/bckp" "700_linux/scripts" 2>/dev/null || true
    git add -f "700_linux/scripts/hello_world.log" 2>/dev/null || true
    if git diff --cached --quiet 2>/dev/null; then
      info "No changes in 700_linux, skip commit"
    else
      git commit -m "daily shell and nuggets" || warn "Commit failed for shell and nuggets"
    fi
    cd - >/dev/null || true
  fi
  delay_timer "$DELAY_ARG"

  echo " - - - "
  if has_cmd neofetch; then
    run "neofetch || true"
  fi
  log "Done commits.sh"
}

main "$@"
