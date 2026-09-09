#!/bin/bash
# restore.sh - Restore dotfiles from 999_dotfiles -> HOME (reverse of dotfiles.sh)
# Usage: ./restore.sh [--dry-run] [--verbose] [--force] [file...]
#   --dry-run : show what would restore
#   --force   : skip confirm prompt
#   file args : only restore those basenames (e.g. .bashrc .tmux.conf)
# Safety: creates .bak.<timestamp> before overwrite
set -euo pipefail
IFS=$'\n\t'

readonly DEST_ROOT="${HOME}/MuggleBornPadawan/999_dotfiles"
DRY_RUN=false; VERBOSE=false; FORCE=false
FILTER=()

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --verbose|-v) VERBOSE=true ;;
    --force|-f) FORCE=true ;;
    -h|--help) echo "Usage: $0 [--dry-run] [--verbose] [--force] [.bashrc ...]"; exit 0 ;;
    --*) echo "Unknown arg $arg" >&2; exit 1 ;;
    *) FILTER+=("$arg") ;;
  esac
done

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }
vlog() { [[ "$VERBOSE" == true ]] && log "[verbose] $*"; }

# Same manifest as dotfiles.sh but reversed: dest_rel|src
PAIRS=(
  "dotfiles/.bashrc|${HOME}/.bashrc"
  "dotfiles/.bash_aliases|${HOME}/.bash_aliases"
  "dotfiles/.profile|${HOME}/.profile"
  "dotfiles/.bash_logout|${HOME}/.bash_logout"
  "dotfiles/.gitconfig|${HOME}/.gitconfig"
  "dotfiles/.vimrc|${HOME}/.vimrc"
  "dotfiles/.tmux.conf|${HOME}/.tmux.conf"
  "dotfiles/.selected_editor|${HOME}/.selected_editor"
  "dotfiles/.emacs.d/init.el|${HOME}/.emacs.d/init.el"
  "dotfiles/.emacs.d/custom.el|${HOME}/.emacs.d/custom.el"
  "dotfiles/.emacs.d/customizations|${HOME}/.emacs.d/customizations"
  "dotfiles/.emacs.d/bookmarks|${HOME}/.emacs.d/bookmarks"
  "dotfiles/.config/gh/config.yml|${HOME}/.config/gh/config.yml"
  "dotfiles/.gnupg/gpg-agent.conf|${HOME}/.gnupg/gpg-agent.conf"
  "dotfiles/.gitignore|${HOME}/MuggleBornPadawan/.gitignore"
  "dotfiles/Dockerfile|${HOME}/MuggleBornPadawan/Dockerfile"
  "dotfiles/Jenkinsfile|${HOME}/MuggleBornPadawan/Jenkinsfile"
  "dotfiles/.pi/agent/AGENTS.md|${HOME}/.pi/agent/AGENTS.md"
  "dotfiles/.pi/agent/settings.json|${HOME}/.pi/agent/settings.json"
  "dotfiles/.pi/agent/models.json|${HOME}/.pi/agent/models.json"
  "dotfiles/.pi/agent/bin|${HOME}/.pi/agent/bin"
  "skills/pi|${HOME}/.pi/agent/skills"
  "skills/agents|${HOME}/.agents/skills"
  "skills/agy/config|${HOME}/.gemini/config/skills"
  "skills/agy/builtin|${HOME}/.gemini/antigravity-cli/builtin/skills"
  "prompts/pi|${HOME}/.pi/agent/prompts"
  "dotfiles/.config/opencode/opencode.jsonc|${HOME}/.config/opencode/opencode.jsonc"
  "dotfiles/.config/opencode/package.json|${HOME}/.config/opencode/package.json"
  "dotfiles/.gemini/settings.json|${HOME}/.gemini/settings.json"
  "dotfiles/.gemini/trustedFolders.json|${HOME}/.gemini/trustedFolders.json"
  "dotfiles/.ollama/config.json|${HOME}/.ollama/config.json"
)

# rg is excluded from backup (see dotfiles.sh), so restore will skip it
HAS_RSYNc=false; command -v rsync >/dev/null 2>&1 && HAS_RSYNc=true
TS="$(date +%Y%m%d_%H%M%S)"

should_restore() {
  local dst="$1" # HOME path
  [[ ${#FILTER[@]} -eq 0 ]] && return 0
  local base; base="$(basename "$dst")"
  for f in "${FILTER[@]}"; do
    [[ "$base" == "$f" || "$dst" == *"$f"* ]] && return 0
  done
  return 1
}

if [[ "$FORCE" != true && "$DRY_RUN" != true ]]; then
  echo "Restore will overwrite HOME files from $DEST_ROOT"
  echo "Filter: ${FILTER[*]:-(all)}"
  read -p "Continue? [y/N] " ans
  [[ "$ans" == y || "$ans" == Y ]] || { echo "Abort"; exit 1; }
fi

log "Start restore $DEST_ROOT -> HOME (dry_run=$DRY_RUN)"

for pair in "${PAIRS[@]}"; do
  bkp_rel="${pair%%|*}"
  home_path="${pair##*|}"
  bkp_abs="${DEST_ROOT}/${bkp_rel}"

  should_restore "$home_path" || { vlog "skip filter $home_path"; continue; }
  if [[ ! -e "$bkp_abs" ]]; then vlog "skip missing backup $bkp_abs"; continue; fi

  log "[$(basename "$home_path")] $bkp_abs -> $home_path"

  if [[ "$DRY_RUN" == true ]]; then
    if command -v rsync >/dev/null 2>&1; then
      rsync -a --dry-run --itemize-changes "$bkp_abs" "$home_path" 2>&1 | head -n 20 >&2 || true
    else
      echo "[dry-run] cp -a $bkp_abs $home_path" >&2
    fi
    continue
  fi

  # backup original
  if [[ -e "$home_path" ]]; then
    bak="${home_path}.bak.${TS}"
    cp -a "$home_path" "$bak" 2>/dev/null || true
    log "  backup original -> $bak"
  fi
  mkdir -p "$(dirname "$home_path")"

  if [[ "$HAS_RSYNc" == true ]]; then
    if [[ -d "$bkp_abs" ]]; then
      mkdir -p "$home_path"
      rsync -a "$bkp_abs/" "$home_path/" >&2
    else
      rsync -a "$bkp_abs" "$home_path" >&2
    fi
  else
    if [[ -d "$bkp_abs" ]]; then
      mkdir -p "$home_path"
      cp -a "$bkp_abs/." "$home_path/"
    else
      cp -a "$bkp_abs" "$home_path"
    fi
  fi
done

log "Restore done. Tip: source ~/.bashrc or restart shell."
