# DEPRECATED: use 700_linux/bckp/dotfiles.sh (single manifest) - this wrapper kept for history, will be removed 2026-10-01
#!/bin/bash
# backup_emacs.sh - Safe backup of Emacs config (polished)
# Usage: ./backup_emacs.sh [--dry-run] [--dest DIR] [--keep N]
set -euo pipefail
IFS=$'\n\t'

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------
SOURCE_DIR="${HOME}/.emacs.d"
BACKUP_PARENT_DIR="${HOME}/emacs_backups"
FINAL_DST="${HOME}/MuggleBornPadawan/999_dotfiles"  # optional move target
TIMESTAMP="$(date +"%Y%m%d_%H%M%S")"  # per-second, no overwrite
BACKUP_DIR="${BACKUP_PARENT_DIR}/emacs_backup_${TIMESTAMP}"
TAR_FILE="${BACKUP_PARENT_DIR}/emacs_backup_${TIMESTAMP}.tar.gz"
KEEP=12  # keep last 12 backups
DRY_RUN=false
DEST_OVERRIDE=""

# robust arg parse - supports --dest DIR and --dest=DIR, --keep N and --keep=N
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=true; shift ;;
    --keep=*) KEEP="${1#*=}"; shift ;;
    --keep)
      if [[ -z "${2:-}" ]]; then echo "ERROR: --keep needs value --keep N" >&2; exit 1; fi
      KEEP="$2"; shift 2 ;;
    --dest=*) DEST_OVERRIDE="${1#*=}"; shift ;;
    --dest)
      if [[ -z "${2:-}" ]]; then echo "ERROR: --dest needs value --dest DIR" >&2; exit 1; fi
      DEST_OVERRIDE="$2"; shift 2 ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [--dest DIR] [--keep N]"
      echo "  Backup ~/.emacs.d to emacs_backups/ tar.gz"
      echo "  --keep N : keep last N archives (default 12)"
      exit 0
      ;;
    *) echo "Unknown arg $1" >&2; exit 1 ;;
  esac
done
if [[ -n "$DEST_OVERRIDE" ]]; then FINAL_DST="$DEST_OVERRIDE"; fi

ESSENTIAL_ITEMS=(
  "init.el"
  "early-init.el"
  "custom.el"
  "customizations"
  "bookmarks"
)
OPTIONAL_ITEMS=(
  "minimal-emacs-test.el"
  "minimal-ob-scheme-integrity-test.el"
)

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
# safe run - no eval, direct exec
run() {
  if [[ "$DRY_RUN" == true ]]; then
    (IFS=' '; log "[DRY-RUN] $*")
  else
    "$@"
  fi
}

# --------------------------------------------------------------------------
# Pre-checks
# --------------------------------------------------------------------------
log "Start Emacs backup -> $TAR_FILE"

if [[ ! -d "$SOURCE_DIR" ]]; then
  log "ERROR: Source $SOURCE_DIR not exists" >&2; exit 1
fi

# disk space check - need at least 100MB free in parent
if command -v df >/dev/null 2>&1; then
  avail_kb=$(df -k "$HOME" | awk 'NR==2{print $4}')
  if [[ "$avail_kb" -lt 102400 ]]; then
    log "WARN: low disk space ${avail_kb}KB free"
  fi
fi

mkdir -p "$BACKUP_PARENT_DIR"
mkdir -p "$BACKUP_DIR"
log "Backup dir: $BACKUP_DIR"

# trap to clean temp dir on error - do NOT rm tar file
cleanup() {
  local ec=$?
  if [[ $ec -ne 0 ]]; then
    log "ERROR: backup failed (exit $ec), keeping temp dir for debug: $BACKUP_DIR"
  fi
}
trap cleanup ERR

# --------------------------------------------------------------------------
# Copy
# --------------------------------------------------------------------------
copied=0
for item in "${ESSENTIAL_ITEMS[@]}"; do
  src="$SOURCE_DIR/$item"
  if [[ -e "$src" ]]; then
    log "Copy essential: $item"
    run cp -a "$src" "$BACKUP_DIR/"
    copied=$((copied+1))
  else
    log "WARN: essential '$item' not found, skip"
  fi
done

for item in "${OPTIONAL_ITEMS[@]}"; do
  src="$SOURCE_DIR/$item"
  if [[ -f "$src" ]]; then
    log "Copy optional: $item"
    run cp -a "$src" "$BACKUP_DIR/"
    copied=$((copied+1))
  fi
done

if [[ "$copied" -eq 0 ]]; then
  log "ERROR: nothing copied, abort"
  run rmdir "$BACKUP_DIR" 2>/dev/null || true
  exit 1
fi

# --------------------------------------------------------------------------
# Tar + verify - only delete temp if tar succeeds
# --------------------------------------------------------------------------
log "Create tar.gz: $TAR_FILE"
if [[ "$DRY_RUN" == true ]]; then
  log "[DRY-RUN] tar -czf $TAR_FILE -C $BACKUP_PARENT_DIR emacs_backup_$TIMESTAMP"
else
  tar -czf "$TAR_FILE" -C "$BACKUP_PARENT_DIR" "emacs_backup_${TIMESTAMP}"
  # verify
  if ! tar -tzf "$TAR_FILE" >/dev/null 2>&1; then
    log "ERROR: tar verify failed $TAR_FILE" >&2
    exit 1
  fi
  sha256sum "$TAR_FILE" > "${TAR_FILE}.sha256" 2>/dev/null || true
  log "Verify OK, sha256: $(cut -d' ' -f1 "${TAR_FILE}.sha256" 2>/dev/null || echo "n/a")"
fi

# Only now remove uncompressed dir
log "Clean temp dir"
run rm -rf "$BACKUP_DIR"

log "----------------------------------------"
log "Backup OK: $TAR_FILE"
ls -lh "$TAR_FILE" 2>/dev/null || true
log "----------------------------------------"

# --------------------------------------------------------------------------
# Move/copy to final dst if requested - keep original tar as well
# --------------------------------------------------------------------------
if [[ -n "$FINAL_DST" && -d "$FINAL_DST" ]]; then
  log "Copy tar to $FINAL_DST (keep original)"
  run cp -a "$TAR_FILE" "$FINAL_DST/" 2>/dev/null || true
  run cp -a "${TAR_FILE}.sha256" "$FINAL_DST/" 2>/dev/null || true
fi

# --------------------------------------------------------------------------
# Retention - keep last KEEP archives, delete older
# --------------------------------------------------------------------------
log "Retention: keep last $KEEP archives in $BACKUP_PARENT_DIR"
if [[ "$DRY_RUN" == false ]]; then
  # List sorted newest first, delete tail
  mapfile -t old_files < <(ls -1t "${BACKUP_PARENT_DIR}"/emacs_backup_*.tar.gz 2>/dev/null | tail -n +$((KEEP+1)) || true)
  for f in "${old_files[@]}"; do
    if [[ -f "$f" ]]; then
      log "Delete old: $f"
      rm -f "$f" "${f}.sha256" || true
    fi
  done
  # also in FINAL_DST if different
  if [[ "$FINAL_DST" != "$BACKUP_PARENT_DIR" && -d "$FINAL_DST" ]]; then
    mapfile -t old2 < <(ls -1t "${FINAL_DST}"/emacs_backup_*.tar.gz 2>/dev/null | tail -n +$((KEEP+1)) || true)
    for f in "${old2[@]}"; do
      log "Delete old in dst: $f"
      rm -f "$f" "${f}.sha256" || true
    done
  fi
else
  log "[DRY-RUN] would prune old backups"
fi

log "Done"
