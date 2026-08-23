#!/bin/bash
# backup_agy_skills.sh - Back up gemini/antigravity skills to dotfiles repo
# Sources:
#   1) ~/.gemini/config/skills                  (custom/user skills)
#   2) ~/.gemini/antigravity-cli/builtin/skills  (builtin/system skills)
# Destinations (mapped via realpath/find):
#   1) ~/MuggleBornPadawan/999_dotfiles/skills/agy/config
#   2) ~/MuggleBornPadawan/999_dotfiles/skills/agy/builtin
#
# Usage: ./backup_agy_skills.sh [--dry-run] [--verbose]
#        --dry-run  : show what would be copied without making changes
#        --verbose  : extra output
#
# Idempotent & safe to re-run (uses rsync --delete to mirror source).

set -euo pipefail

# --- config ---
# Pair 1: custom skills
AGY_CONFIG_SOURCE="${HOME}/.gemini/config/skills"
AGY_CONFIG_DEST="${HOME}/MuggleBornPadawan/999_dotfiles/skills/agy/config"
AGY_CONFIG_PATTERN="999_dotfiles/skills/agy/config"

# Pair 2: builtin skills
AGY_BUILTIN_SOURCE="${HOME}/.gemini/antigravity-cli/builtin/skills"
AGY_BUILTIN_DEST="${HOME}/MuggleBornPadawan/999_dotfiles/skills/agy/builtin"
AGY_BUILTIN_PATTERN="999_dotfiles/skills/agy/builtin"

# Legacy aliases (backward compat for any external caller)
SOURCE_DIR="$AGY_CONFIG_SOURCE"
PRIMARY_DEST="$AGY_CONFIG_DEST"
FALLBACK_DEST_SEARCH_ROOT="${HOME}"
FALLBACK_DEST_PATTERN="$AGY_CONFIG_PATTERN"

# Arrays for loop — keeps backup logic DRY
SOURCES=("$AGY_CONFIG_SOURCE" "$AGY_BUILTIN_SOURCE")
DESTS=("$AGY_CONFIG_DEST" "$AGY_BUILTIN_DEST")
PATTERNS=("$AGY_CONFIG_PATTERN" "$AGY_BUILTIN_PATTERN")
LABELS=("agy-config" "agy-builtin")

DRY_RUN=false
VERBOSE=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --verbose|-v) VERBOSE=true ;;
    --help|-h)
      echo "Usage: $0 [--dry-run] [--verbose]"
      echo "  Backs up agy skills from both config and builtin locations:"
      echo "    - \$AGY_CONFIG_SOURCE ($AGY_CONFIG_SOURCE) -> $AGY_CONFIG_DEST"
      echo "    - \$AGY_BUILTIN_SOURCE ($AGY_BUILTIN_SOURCE) -> $AGY_BUILTIN_DEST"
      exit 0
      ;;
    *) echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
vlog() { if [[ "$VERBOSE" == true ]]; then log "[verbose] $*"; fi; }
error() { echo "[ERROR] $*" >&2; }

# --- 1. Resolve destination (find & map) ---
# Usage: resolve_dest <primary_dest> <pattern>
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
  # Walk up to find the closest existing parent directory
  local existing_parent="$parent"
  while [[ ! -d "$existing_parent" ]]; do
    local grand_parent
    grand_parent="$(dirname "$existing_parent")"
    if [[ "$grand_parent" == "$existing_parent" ]]; then
      break
    fi
    existing_parent="$grand_parent"
  done

  if [[ -d "$existing_parent" && "$existing_parent" == *"/MuggleBornPadawan/999_dotfiles"* ]]; then
    log "Creating destination folder: $primary_dest"
    if [[ "$DRY_RUN" == false ]]; then
      mkdir -p "$primary_dest"
      echo "$(realpath "$primary_dest")"
    else
      echo "$primary_dest"
    fi
    return 0
  fi

  error "Cannot resolve destination folder. Searched: $primary_dest and find *$pattern"
  return 1
}

# --- 2+3+4. Backup one pair (validate → rsync/cp → verify) ---
# Usage: backup_pair <source> <primary_dest> <pattern> <label>
backup_pair() {
  local src="$1"
  local primary_dest="$2"
  local pattern="$3"
  local label="$4"

  log "────────────────────────────────────────"
  log "[$label] Resolving destination..."
  local dest
  if ! dest="$(resolve_dest "$primary_dest" "$pattern")"; then
    error "[$label] Skipping: cannot resolve destination for $primary_dest"
    return 1
  fi
  # strip any stray whitespace/newlines (defensive against log leakage)
  dest="$(echo "$dest" | tail -n1 | tr -d '\r')"
  log "[$label] Source      : $src"
  log "[$label] Destination : $dest (mapped via: realpath + find fallback)"

  # --- Validate source ---
  if [[ ! -d "$src" ]]; then
    error "[$label] Source skills folder not found: $src — skipping"
    error "[$label] Is gemini/antigravity configured? Check $src"
    return 1
  fi

  # Count skills for summary
  local skill_count skill_list
  skill_count="$(find "$src" -maxdepth 1 -mindepth 1 -type d | wc -l)"
  skill_list="$(ls -1 "$src" 2>/dev/null | tr '\n' ' ')"
  log "[$label] Found $skill_count skills: $skill_list"
  vlog "[$label] Source size: $(du -sh "$src" | cut -f1)"

  # Ensure dest exists
  mkdir -p "$dest"

  # --- Backup (rsync preferred, cp fallback) ---
  local -a rsync_opts=(-a --delete)
  if [[ "$VERBOSE" == true ]]; then rsync_opts+=(-v); fi
  if [[ "$DRY_RUN" == true ]]; then rsync_opts+=(--dry-run); fi
  if [[ "$DRY_RUN" == true ]]; then log "[$label] *** DRY RUN MODE - no changes will be made ***"; fi

  if command -v rsync >/dev/null 2>&1; then
    log "[$label] Backing up with rsync ${rsync_opts[*]} ..."
    rsync "${rsync_opts[@]}" "$src/" "$dest/"
    local rsync_exit=$?
    if [[ $rsync_exit -ne 0 ]]; then
      error "[$label] rsync failed with exit code $rsync_exit"
      return $rsync_exit
    fi
  else
    log "[$label] rsync not found, falling back to cp -a ..."
    if [[ "$DRY_RUN" == true ]]; then
      log "[$label] [dry-run] would run: cp -a $src/* $dest/"
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
    log "[$label] Verifying backup..."
    local src_files dst_files
    src_files=$(find "$src" -type f | wc -l)
    dst_files=$(find "$dest" -type f | wc -l)
    log "[$label]   Source files: $src_files"
    log "[$label]   Dest   files: $dst_files"

    if command -v rsync >/dev/null 2>&1; then
      local diff_out
      diff_out=$(rsync -a --dry-run --itemize-changes "$src/" "$dest/" 2>&1 || true)
      if [[ -z "$diff_out" ]]; then
        log "[$label] ✅ Verification passed: destination is in sync with source"
      else
        error "[$label] Verification found differences (should be empty if synced):"
        echo "$diff_out" | head -n 20 >&2
      fi
    else
      if diff -qr "$src" "$dest" >/dev/null 2>&1; then
        log "[$label] ✅ Verification passed (diff -qr)"
      else
        error "[$label] Verification failed: diff found differences"
        diff -qr "$src" "$dest" | head -n 20 >&2 || true
        return 1
      fi
    fi

    log "[$label] Destination contents:"
    if [[ "$VERBOSE" == true ]]; then ls -R "$dest" >&2 | head -n 100; else ls -1 "$dest" >&2; fi
    vlog "[$label] Dest size: $(du -sh "$dest" | cut -f1)"
  fi

  if [[ "$DRY_RUN" == true ]]; then
    log "[$label] Done. Backup (dry-run) completed: $src -> $dest"
  else
    log "[$label] Done. Backup completed: $src -> $dest"
  fi
  log "[$label] Destination mapped absolute path: $(realpath "$dest")"
  return 0
}

# --- Main loop: backup both pairs ---
FAILED=0
SUCCEEDED=0
for i in "${!SOURCES[@]}"; do
  if backup_pair "${SOURCES[$i]}" "${DESTS[$i]}" "${PATTERNS[$i]}" "${LABELS[$i]}"; then
    SUCCEEDED=$((SUCCEEDED + 1))
  else
    FAILED=$((FAILED + 1))
  fi
done

log "────────────────────────────────────────"
log "Summary: $SUCCEEDED succeeded, $FAILED failed out of ${#SOURCES[@]} pairs"
if [[ "$DRY_RUN" == true ]]; then
  log "Done. Backup (dry-run) completed for $SUCCEEDED pair(s)"
else
  log "Done. Backup completed for $SUCCEEDED pair(s)"
fi

# Optional: hint for git
if [[ -d "${HOME}/MuggleBornPadawan/999_dotfiles/.git" ]]; then
  log "Tip: cd ~/MuggleBornPadawan/999_dotfiles/skills && git status && git add agy && git commit -m 'chore: backup agy skills $(date +%Y-%m-%d)'"
fi

# Exit non-zero if any pair failed (and not just skipped missing source in dry-run)
if [[ $FAILED -gt 0 ]]; then
  exit 1
fi
