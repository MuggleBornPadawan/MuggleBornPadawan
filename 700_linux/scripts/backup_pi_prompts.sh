#!/bin/bash
# backup_pi_prompts.sh - Back up pi coding agent prompt templates to dotfiles repo
# Source (global location per pi docs/prompt-templates.md):
#   1) ~/.pi/agent/prompts  (*.md files, non-recursive; invoked as /<name>)
#   Note: project-local templates live in <project>/.pi/prompts and are NOT backed up here.
# Destination:
#   ~/MuggleBornPadawan/999_dotfiles/prompts/pi
#
# Usage: ./backup_pi_prompts.sh [--dry-run] [--verbose]
#        --dry-run  : show what would be copied without making changes
#        --verbose  : extra output
#
# Idempotent & safe to re-run (uses rsync --delete to mirror source).

set -euo pipefail

# --- config ---
PI_SOURCE="${HOME}/.pi/agent/prompts"
PI_DEST="${HOME}/MuggleBornPadawan/999_dotfiles/prompts/pi"
PI_PATTERN="999_dotfiles/prompts/pi"

# Legacy aliases (backward compat for any external caller)
SOURCE_DIR="$PI_SOURCE"
PRIMARY_DEST="$PI_DEST"
FALLBACK_DEST_SEARCH_ROOT="${HOME}"
FALLBACK_DEST_PATTERN="$PI_PATTERN"

DRY_RUN=false
VERBOSE=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --verbose|-v) VERBOSE=true ;;
    --help|-h)
      echo "Usage: $0 [--dry-run] [--verbose]"
      echo "  Backs up pi prompt templates from:"
      echo "    $PI_SOURCE -> $PI_DEST"
      exit 0
      ;;
    *) echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
vlog() { if [[ "$VERBOSE" == true ]]; then log "[verbose] $*"; fi; }
error() { echo "[ERROR] $*" >&2; }

# --- 1. Resolve destination (find & map) ---
resolve_dest() {
  local primary_dest="$1"
  local pattern="$2"
  local dest=""

  # Try primary (realpath mapping)
  if [[ -d "$primary_dest" ]]; then
    dest="$(realpath "$primary_dest")"
    vlog "Mapped primary_dest via realpath: $dest"
    echo "$dest"
    return 0
  fi

  log "Primary dest not found at $primary_dest, searching under $FALLBACK_DEST_SEARCH_ROOT ..."
  # find the folder dynamically (bounded depth for speed)
  dest="$(find "$FALLBACK_DEST_SEARCH_ROOT" -maxdepth 5 -type d -path "*${pattern}" 2>/dev/null | head -n 1 || true)"
  if [[ -n "$dest" && -d "$dest" ]]; then
    dest="$(realpath "$dest")"
    log "Discovered dest via find: $dest"
    echo "$dest"
    return 0
  fi

  # Create it if not found but parent exists
  local parent
  parent="$(dirname "$primary_dest")"
  if [[ -d "$parent" ]]; then
    log "Creating destination folder: $primary_dest"
    mkdir -p "$primary_dest"
    echo "$(realpath "$primary_dest")"
    return 0
  fi

  error "Cannot resolve destination folder. Searched: $primary_dest and find *$pattern"
  return 1
}

# --- 2+3+4. Backup (validate → rsync/cp → verify) ---
backup_prompts() {
  local src="$1"
  local primary_dest="$2"
  local pattern="$3"

  log "────────────────────────────────────────"
  log "Resolving destination..."
  local dest
  if ! dest="$(resolve_dest "$primary_dest" "$pattern")"; then
    error "Skipping: cannot resolve destination for $primary_dest"
    return 1
  fi
  # strip any stray whitespace/newlines (defensive against log leakage)
  dest="$(echo "$dest" | tail -n1 | tr -d '\r')"
  log "Source      : $src"
  log "Destination : $dest (mapped via: realpath + find fallback)"

  # --- Validate source ---
  if [[ ! -d "$src" ]]; then
    error "Source prompts folder not found: $src — skipping"
    error "Is pi coding agent installed? Check $src"
    return 1
  fi

  # Count templates for summary
  local template_count template_list
  template_count="$(find "$src" -maxdepth 1 -type f -name '*.md' | wc -l)"
  template_list="$(find "$src" -maxdepth 1 -type f -name '*.md' -printf '%f ' 2>/dev/null || ls -1 "$src" 2>/dev/null | tr '\n' ' ')"
  log "Found $template_count prompt template(s): $template_list"
  vlog "Source size: $(du -sh "$src" | cut -f1)"

  # Ensure dest exists
  mkdir -p "$dest"

  # --- Backup (rsync preferred, cp fallback) ---
  local -a rsync_opts=(-a --delete)
  if [[ "$VERBOSE" == true ]]; then rsync_opts+=(-v); fi
  if [[ "$DRY_RUN" == true ]]; then rsync_opts+=(--dry-run); fi
  if [[ "$DRY_RUN" == true ]]; then log "*** DRY RUN MODE - no changes will be made ***"; fi

  if command -v rsync >/dev/null 2>&1; then
    log "Backing up with rsync ${rsync_opts[*]} ..."
    rsync "${rsync_opts[@]}" "$src/" "$dest/"
    local rsync_exit=$?
    if [[ $rsync_exit -ne 0 ]]; then
      error "rsync failed with exit code $rsync_exit"
      return $rsync_exit
    fi
  else
    log "rsync not found, falling back to cp -a ..."
    if [[ "$DRY_RUN" == true ]]; then
      log "[dry-run] would run: cp -a $src/*.md $dest/"
    else
      # emulate --delete: remove dest contents first (mirror behavior)
      # safety: only if DEST matches expected pattern; use find -delete to handle dotfiles
      if [[ "$dest" == *"$pattern"* ]]; then
        find "$dest" -mindepth 1 -delete 2>/dev/null || rm -rf "${dest:?}/"* "${dest:?}/".* 2>/dev/null || true
      fi
      cp -a "$src/." "$dest/"
    fi
  fi

  # --- Verify ---
  if [[ "$DRY_RUN" == false ]]; then
    log "Verifying backup..."
    local src_files dst_files
    src_files=$(find "$src" -type f -name '*.md' | wc -l)
    dst_files=$(find "$dest" -type f -name '*.md' | wc -l)
    log "  Source .md files: $src_files"
    log "  Dest   .md files: $dst_files"

    if command -v rsync >/dev/null 2>&1; then
      local diff_out
      diff_out=$(rsync -a --dry-run --itemize-changes "$src/" "$dest/" 2>&1 || true)
      if [[ -z "$diff_out" ]]; then
        log "✅ Verification passed: destination is in sync with source"
      else
        error "Verification found differences (should be empty if synced):"
        echo "$diff_out" | head -n 20 >&2
      fi
    else
      if diff -qr "$src" "$dest" >/dev/null 2>&1; then
        log "✅ Verification passed (diff -qr)"
      else
        error "Verification failed: diff found differences"
        diff -qr "$src" "$dest" | head -n 20 >&2 || true
        return 1
      fi
    fi

    log "Destination contents:"
    if [[ "$VERBOSE" == true ]]; then ls -l "$dest" >&2; else ls -1 "$dest" >&2; fi
    vlog "Dest size: $(du -sh "$dest" | cut -f1)"
  fi

  if [[ "$DRY_RUN" == true ]]; then
    log "Done. Backup (dry-run) completed: $src -> $dest"
  else
    log "Done. Backup completed: $src -> $dest"
  fi
  log "Destination mapped absolute path: $(realpath "$dest")"
  return 0
}

# --- Main ---
EXIT_CODE=0
if backup_prompts "$PI_SOURCE" "$PI_DEST" "$PI_PATTERN"; then
  log "Summary: 1 succeeded, 0 failed out of 1 pair"
else
  log "Summary: 0 succeeded, 1 failed out of 1 pair"
  EXIT_CODE=1
fi

# Optional: hint for git
if [[ -d "${HOME}/MuggleBornPadawan/999_dotfiles/.git" ]]; then
  log "Tip: cd ~/MuggleBornPadawan/999_dotfiles/prompts && git status && git add pi && git commit -m 'chore: backup pi prompts $(date +%Y-%m-%d)'"
fi

exit "$EXIT_CODE"
