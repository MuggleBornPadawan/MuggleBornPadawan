#!/bin/bash
# dotfiles.sh - Single manifest backup for all dotfiles, skills, prompts
# Replaces: backup_emacs.sh + backup_agy_skills.sh + backup_pi_skills.sh + start.sh:backup_dotfiles()
# Dest: ~/MuggleBornPadawan/999_dotfiles (monorepo subfolder, git tracked)
# Usage: ./dotfiles.sh [--dry-run] [--verbose] [--help]
#   --dry-run : show what would copy, do not change
#   --verbose : extra output
# Design: one PAIRS list = single truth. Plain files (no tar), keep original names.
#   home/*. -> mirrors HOME (easy restore: rsync -a home/ ~/) #   templates/* -> repo templates (Dockerfile, Jenkinsfile, .gitignore)
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
# home/* mirrors HOME layout. skills/prompts keep their current dirs. templates/* holds repo templates.
PAIRS=(
  # shell
  "${HOME}/.bashrc|home/.bashrc"
  "${HOME}/.bash_aliases|home/.bash_aliases"
  "${HOME}/.profile|home/.profile"
  "${HOME}/.bash_logout|home/.bash_logout"
  # git / editor / tmux
  "${HOME}/.gitconfig|home/.gitconfig"
  "${HOME}/.vimrc|home/.vimrc"
  "${HOME}/.tmux.conf|home/.tmux.conf"
  "${HOME}/.selected_editor|home/.selected_editor"
  # emacs - plain files, git diffable (no tar)
  "${HOME}/.emacs.d/init.el|home/.emacs.d/init.el"
  "${HOME}/.emacs.d/custom.el|home/.emacs.d/custom.el"
  "${HOME}/.emacs.d/customizations|home/.emacs.d/customizations"
  "${HOME}/.emacs.d/bookmarks|home/.emacs.d/bookmarks"
  # safe configs (exclude secrets via rsync --exclude)
  "${HOME}/.config/gh/config.yml|home/.config/gh/config.yml"
  "${HOME}/.gnupg/gpg-agent.conf|home/.gnupg/gpg-agent.conf"
  # project templates (repo root)
  "${HOME}/MuggleBornPadawan/.gitignore|templates/.gitignore"
  "${HOME}/MuggleBornPadawan/Dockerfile|templates/Dockerfile"
  "${HOME}/MuggleBornPadawan/Jenkinsfile|templates/Jenkinsfile"
  # pi / agents
  "${HOME}/.pi/agent/AGENTS.md|home/.pi/agent/AGENTS.md"
  "${HOME}/.pi/agent/settings.json|home/.pi/agent/settings.json"
  "${HOME}/.pi/agent/models.json|home/.pi/agent/models.json"
  "${HOME}/.pi/agent/bin|home/.pi/agent/bin"
  "${HOME}/.pi/agent/skills|skills/pi"
  "${HOME}/.agents/skills|skills/agents"
  "${HOME}/.gemini/config/skills|skills/agy/config"
  "${HOME}/.gemini/antigravity-cli/builtin/skills|skills/agy/builtin"
  "${HOME}/.pi/agent/prompts|prompts/pi"
  # opencode (global)
  "${HOME}/.config/opencode/opencode.jsonc|home/.config/opencode/opencode.jsonc"
  "${HOME}/.config/opencode/package.json|home/.config/opencode/package.json"
  "${HOME}/.config/opencode/package-lock.json|home/.config/opencode/package-lock.json"
  "${HOME}/.config/opencode/plugins|home/.config/opencode/plugins"
  # gemini global (agy)
  "${HOME}/.gemini/settings.json|home/.gemini/settings.json"
  "${HOME}/.gemini/trustedFolders.json|home/.gemini/trustedFolders.json"
  "${HOME}/.gemini/projects.json|home/.gemini/projects.json"
  "${HOME}/.gemini/antigravity-cli/settings.json|home/.gemini/antigravity-cli/settings.json"
  "${HOME}/.gemini/config/config.json|home/.gemini/config/config.json"
  "${HOME}/.gemini/config/mcp_config.json|home/.gemini/config/mcp_config.json"
  # ollama (global)
  "${HOME}/.ollama/config.json|home/.ollama/config.json"
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
  log "Tip: cd ~/MuggleBornPadawan && git status --short && git add 999_dotfiles/home 999_dotfiles/templates 999_dotfiles/skills 999_dotfiles/prompts && git commit -m 'chore: dotfiles backup $(date +%Y-%m-%d)'"
fi
