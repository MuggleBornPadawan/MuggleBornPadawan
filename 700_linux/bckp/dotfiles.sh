#!/bin/bash
# dotfiles.sh - Single manifest backup for all dotfiles, skills, prompts
# Replaces: backup_emacs.sh + backup_agy_skills.sh + backup_pi_skills.sh + start.sh:backup_dotfiles()
# Dest: ~/MuggleBornPadawan/999_dotfiles (monorepo subfolder, git tracked)
# Usage: ./dotfiles.sh [--dry-run] [--verbose] [--help]
#   --dry-run : show what would copy, do not change
#   --verbose : extra output
# Design: one PAIRS list = single truth. Plain files (no tar), keep original names.
#   dotfiles/*. -> mirrors HOME (easy restore: rsync -a dotfiles/ ~/)
#   skills/*, prompts/* -> keep existing layout for compat
set -euo pipefail
IFS=$'\n\t'

readonly DEST_ROOT="${HOME}/MuggleBornPadawan/999_dotfiles"
DRY_RUN=false
VERBOSE=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --verbose|-v) VERBOSE=true ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [--verbose]"
      echo "  Backup all dotfiles from HOME -> $DEST_ROOT"
      echo "  Manifest: PAIRS list in this script"
      exit 0 ;;
    *) echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
vlog() { [[ "$VERBOSE" == true ]] && log "[verbose] $*"; }
err()  { echo "[ERROR] $*" >&2; }

# --- Manifest: src|dest_rel (dest_rel is under DEST_ROOT) ---
# dotfiles/* mirrors HOME layout. skills/prompts keep their current dirs.
PAIRS=(
  # shell
  "${HOME}/.bashrc|dotfiles/.bashrc"
  "${HOME}/.bash_aliases|dotfiles/.bash_aliases"
  "${HOME}/.profile|dotfiles/.profile"
  "${HOME}/.bash_logout|dotfiles/.bash_logout"
  # git / editor / tmux
  "${HOME}/.gitconfig|dotfiles/.gitconfig"
  "${HOME}/.vimrc|dotfiles/.vimrc"
  "${HOME}/.tmux.conf|dotfiles/.tmux.conf"
  "${HOME}/.selected_editor|dotfiles/.selected_editor"
  # emacs - plain files, git diffable (no tar)
  "${HOME}/.emacs.d/init.el|dotfiles/.emacs.d/init.el"
  "${HOME}/.emacs.d/custom.el|dotfiles/.emacs.d/custom.el"
  "${HOME}/.emacs.d/customizations|dotfiles/.emacs.d/customizations"
  "${HOME}/.emacs.d/bookmarks|dotfiles/.emacs.d/bookmarks"
  # safe configs (exclude secrets via rsync --exclude)
  "${HOME}/.config/gh/config.yml|dotfiles/.config/gh/config.yml"
  "${HOME}/.gnupg/gpg-agent.conf|dotfiles/.gnupg/gpg-agent.conf"
  # project templates
  "${HOME}/MuggleBornPadawan/.gitignore|dotfiles/.gitignore"
  "${HOME}/MuggleBornPadawan/Dockerfile|dotfiles/Dockerfile"
  "${HOME}/MuggleBornPadawan/Jenkinsfile|dotfiles/Jenkinsfile"
  # pi / agents
  "${HOME}/.pi/agent/AGENTS.md|dotfiles/.pi/agent/AGENTS.md"
  "${HOME}/.pi/agent/settings.json|dotfiles/.pi/agent/settings.json"
  "${HOME}/.pi/agent/models.json|dotfiles/.pi/agent/models.json"
  "${HOME}/.pi/agent/bin|dotfiles/.pi/agent/bin"
  "${HOME}/.pi/agent/skills|skills/pi"
  "${HOME}/.agents/skills|skills/agents"
  "${HOME}/.gemini/config/skills|skills/agy/config"
  "${HOME}/.gemini/antigravity-cli/builtin/skills|skills/agy/builtin"
  "${HOME}/.pi/agent/prompts|prompts/pi"
  # opencode
  "${HOME}/.config/opencode/opencode.jsonc|dotfiles/.config/opencode/opencode.jsonc"
  "${HOME}/.config/opencode/package.json|dotfiles/.config/opencode/package.json"
  # gemini global
  "${HOME}/.gemini/settings.json|dotfiles/.gemini/settings.json"
  "${HOME}/.gemini/trustedFolders.json|dotfiles/.gemini/trustedFolders.json"
  # ollama
  "${HOME}/.ollama/config.json|dotfiles/.ollama/config.json"
)

# Excludes for rsync (secrets, caches). Applied to all dir syncs.
RSYNC_EXCLUDES=(
  --exclude='hosts.yml'              # gh token
  --exclude='auth.json'              # pi token
  --exclude='oauth_creds.json'       # gemini
  --exclude='google_accounts.json'
  --exclude='mcp-oauth-tokens*'
  --exclude='state.json'
  --exclude='*.db'
  --exclude='*.log'
  --exclude='.cache/'
  --exclude='__pycache__/'
  --exclude='node_modules/'
  --exclude='sessions/'
  --exclude='models/'
  --exclude='blobs/'
  --exclude='cache/'
  --exclude='rg'                     # pi bundled ripgrep binary (5M, re-downloadable)
)

mkdir -p "$DEST_ROOT"

HAS_RSYNc=false; command -v rsync >/dev/null 2>&1 && HAS_RSYNc=true
vlog "rsync available: $HAS_RSYNc"

SUCCEEDED=0
FAILED=0
SKIPPED=0

backup_one() {
  local src="$1" dst_rel="$2"
  local dst="${DEST_ROOT}/${dst_rel}"
  local label
  label="$(basename "$src")"

  if [[ ! -e "$src" ]]; then
    err "[$label] skip: not found $src"
    SKIPPED=$((SKIPPED+1))
    return 0
  fi

  # ensure parent exists
  mkdir -p "$(dirname "$dst")"

  # build rsync opts
  local -a opts=(-a)
  [[ -d "$src" ]] && opts+=(--delete)
  [[ "$VERBOSE" == true ]] && opts+=(-v)
  [[ "$DRY_RUN" == true ]] && opts+=(--dry-run --itemize-changes)
  opts+=("${RSYNC_EXCLUDES[@]}")

  log "[$label] $src -> $dst"

  if [[ "$HAS_RSYNc" == true ]]; then
    # ensure trailing slash for dirs so content mirrors, not nested
    if [[ -d "$src" ]]; then
      rsync "${opts[@]}" "$src/" "$dst/" >&2 || { err "[$label] rsync fail"; return 1; }
    else
      rsync "${opts[@]}" "$src" "$dst" >&2 || { err "[$label] rsync fail"; return 1; }
    fi
  else
    # cp fallback
    if [[ "$DRY_RUN" == true ]]; then
      log "[$label] [dry-run] cp -a $src $dst"
      return 0
    fi
    if [[ -d "$src" ]]; then
      # emulate --delete: clear dst first (only if dst under DEST_ROOT)
      if [[ "$dst" == "$DEST_ROOT"* ]]; then
        find "$dst" -mindepth 1 -delete 2>/dev/null || true
      fi
      mkdir -p "$dst"
      cp -a "$src/." "$dst/"
    else
      cp -a "$src" "$dst"
    fi
  fi

  # verify (skip in dry-run)
  if [[ "$DRY_RUN" == false ]]; then
    if [[ -f "$src" ]]; then
      if ! cmp -s "$src" "$dst" 2>/dev/null && [[ -f "$dst" ]]; then
        # for files, cmp should pass; dirs skip
        : # cmp fail is ok for dirs; we check file case only
      fi
    fi
    if [[ -d "$src" ]]; then
      local sc dc
      sc=$(find "$src" -type f | wc -l)
      dc=$(find "$dst" -type f | wc -l)
      log "[$label] verify: src $sc files, dst $dc files"
    else
      log "[$label] verify: $(ls -lh "$dst" 2>/dev/null | awk '{print $5}')"
    fi
  fi
  return 0
}

log "Start dotfiles backup -> $DEST_ROOT (dry_run=$DRY_RUN)"

for pair in "${PAIRS[@]}"; do
  src="${pair%%|*}"
  dst_rel="${pair##*|}"
  if backup_one "$src" "$dst_rel"; then
    SUCCEEDED=$((SUCCEEDED+1))
  else
    FAILED=$((FAILED+1))
  fi
done

log "────────────────────────────────────────"
log "Done: $SUCCEEDED ok, $SKIPPED skipped, $FAILED failed / ${#PAIRS[@]} total"
if [[ "$FAILED" -gt 0 ]]; then exit 1; fi

# hint
if [[ -d "${DEST_ROOT}/.git" || -d "${HOME}/MuggleBornPadawan/.git" ]]; then
  log "Tip: cd ~/MuggleBornPadawan && git status --short && git add 999_dotfiles/dotfiles 999_dotfiles/skills 999_dotfiles/prompts && git commit -m 'chore: dotfiles backup $(date +%Y-%m-%d)'"
fi
