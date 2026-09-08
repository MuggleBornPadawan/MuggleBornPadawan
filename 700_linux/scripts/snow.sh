#!/bin/bash
# snow.sh - Create or reset throwaway user 'snow' (safe version)
# Author: Gemini (refactored)
# License: GNU GPL v3
# Usage: ./snow.sh [--dry-run] [--with-sudo] [--password PASS] [--force]
#   --dry-run   : show actions, do not change system
#   --with-sudo : add user to sudo group (default: no sudo)
#   --password  : set password (default: generate random, print once)
#   --force     : remove existing user without prompt
set -euo pipefail
IFS=$'\n\t'

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------
TARGET_USER="snow"
ADMIN_GROUP="sudo"
DEFAULT_SHELL="/bin/bash"
DRY_RUN=false
WITH_SUDO=false
FORCE=false
PROVIDED_PASS=""

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --with-sudo) WITH_SUDO=true ;;
    --force) FORCE=true ;;
    --password) echo "ERROR: --password needs value: --password=XXX" >&2; exit 1 ;;
    --password=*) PROVIDED_PASS="${arg#*=}" ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [--with-sudo] [--password=PASS] [--force]"
      echo "  Creates throwaway user snow with private HOME (0700, UMASK 077)."
      echo "  Default: NO sudo, random password. Use --with-sudo to allow sudo."
      exit 0
      ;;
    *) echo "Unknown arg: $arg (try --help)" >&2; exit 1 ;;
  esac
done

# Handle --password as separate arg: --password foo
if [[ "${1:-}" == "--password" ]]; then
  echo "Use --password=VALUE" >&2; exit 1
fi
# support: ./snow.sh --password myPass  (two args)
for ((i=1;i<=$#;i++)); do
  if [[ "${!i}" == "--password" ]]; then
    j=$((i+1)); PROVIDED_PASS="${!j:-}"; break
  fi
done

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
run() {
  if [[ "$DRY_RUN" == true ]]; then log "[DRY-RUN] $*"; else eval "$@"; fi
}
run_sudo() {
  if [[ "$DRY_RUN" == true ]]; then log "[DRY-RUN sudo] $*"; else sudo bash -c "$*"; fi
}

# --------------------------------------------------------------------------
# Pre-checks
# --------------------------------------------------------------------------
if ! command -v sudo >/dev/null 2>&1; then
  echo "ERROR: sudo not found" >&2; exit 1
fi
if ! sudo -n true 2>/dev/null; then
  log "Need sudo password - will prompt"
fi

# --------------------------------------------------------------------------
# 1. If exists, remove safely
# --------------------------------------------------------------------------
if id "$TARGET_USER" &>/dev/null; then
  EXISTING_UID=$(id -u "$TARGET_USER" 2>/dev/null || echo "")
  EXISTING_HOME=$(getent passwd "$TARGET_USER" | cut -d: -f6 || echo "/home/$TARGET_USER")
  log "User $TARGET_USER exists (UID=$EXISTING_UID HOME=$EXISTING_HOME)"

  if [[ "$FORCE" != true && "$DRY_RUN" != true ]]; then
    read -rp "Remove user $TARGET_USER and home $EXISTING_HOME? [y/N] " ans
    if [[ "$ans" != y && "$ans" != Y ]]; then
      log "Abort - keep existing user"; exit 0
    fi
  fi

  log "Remove user $TARGET_USER --remove-home"
  # Kill processes of that user first (safe)
  if pgrep -u "$TARGET_USER" >/dev/null 2>&1; then
    log "Kill processes of $TARGET_USER"
    run_sudo "pkill -u \"$TARGET_USER\" || true; sleep 1; pkill -9 -u \"$TARGET_USER\" || true"
  fi
  run_sudo "deluser --remove-home \"$TARGET_USER\" || userdel -r \"$TARGET_USER\" || true"

  # Verify removal - skip in dry-run (user still exists by design)
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] skip verify - user would be removed"
  else
    if id "$TARGET_USER" &>/dev/null; then
      log "ERROR: user still exists after deluser"; exit 1
    fi
    if [[ -d "$EXISTING_HOME" ]]; then
      log "WARN: home still exists $EXISTING_HOME"; run_sudo "rm -rf \"$EXISTING_HOME\" || true"
    fi
    if [[ -n "$EXISTING_UID" ]]; then
      log "Check leftover files for UID $EXISTING_UID (in /home, /tmp)"
      run_sudo "find /home /tmp -uid \"$EXISTING_UID\" 2>/dev/null | head -20 || true"
    fi
  fi
  log "User $TARGET_USER removed"
else
  log "User $TARGET_USER not exists - will create"
fi

# --------------------------------------------------------------------------
# 2. Create user
# --------------------------------------------------------------------------
log "Create user $TARGET_USER (UMASK 077, shell $DEFAULT_SHELL)"
run_sudo "useradd -m -s \"$DEFAULT_SHELL\" -K UMASK=077 \"$TARGET_USER\""

# Lockdown home
run_sudo "chmod 700 \"/home/$TARGET_USER\""
run_sudo "chown \"$TARGET_USER:$TARGET_USER\" \"/home/$TARGET_USER\""

# --------------------------------------------------------------------------
# 3. Password - generate random if not provided
# --------------------------------------------------------------------------
if [[ -n "$PROVIDED_PASS" ]]; then
  USER_PASS="$PROVIDED_PASS"
  log "Use provided password (will not log value)"
else
  if command -v openssl >/dev/null 2>&1; then
    USER_PASS=$(openssl rand -base64 12 | tr -d '\n' | cut -c1-16)
  else
    USER_PASS=$(head -c 32 /dev/urandom | base64 | tr -d '\n' | cut -c1-16)
  fi
  log "Generated random password for $TARGET_USER"
fi

# Use printf + chpasswd via stdin - no password in ps
if [[ "$DRY_RUN" == true ]]; then
  log "[DRY-RUN] would set password for $TARGET_USER"
else
  printf '%s:%s\n' "$TARGET_USER" "$USER_PASS" | sudo chpasswd
  log "Password set"
fi

# Force change on first login? For throwaway, no - but set expiry 30 days
run_sudo "chage -M 30 \"$TARGET_USER\" || true"

# --------------------------------------------------------------------------
# 4. Sudo - opt-in only
# --------------------------------------------------------------------------
if [[ "$WITH_SUDO" == true ]]; then
  log "Add $TARGET_USER to $ADMIN_GROUP"
  run_sudo "usermod -aG \"$ADMIN_GROUP\" \"$TARGET_USER\""
else
  log "No sudo for $TARGET_USER (use --with-sudo to enable)"
  # ensure NOT in sudo if recreated
  run_sudo "deluser \"$TARGET_USER\" \"$ADMIN_GROUP\" 2>/dev/null || gpasswd -d \"$TARGET_USER\" \"$ADMIN_GROUP\" 2>/dev/null || true"
fi

# --------------------------------------------------------------------------
# 5. Verify
# --------------------------------------------------------------------------
log "Verify:"
run "id \"$TARGET_USER\" || true"
run "getent passwd \"$TARGET_USER\" || true"
run "getent group \"$ADMIN_GROUP\" | grep -w \"$TARGET_USER\" && echo \"IN sudo\" || echo \"NOT in sudo\""
run_sudo "ls -ld \"/home/$TARGET_USER\" || true"

log "User $TARGET_USER ready"
if [[ -z "$PROVIDED_PASS" ]]; then
  log "Password (save now, shown once): $USER_PASS"
  log "Login: ssh $TARGET_USER@host  or  su - $TARGET_USER"
else
  log "Password was provided - not shown"
fi
log "To delete: sudo deluser --remove-home $TARGET_USER"
log "-------------------------------------------------------"
