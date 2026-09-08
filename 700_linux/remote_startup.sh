#!/bin/bash
# remote_startup.sh - Safe remote Debian server startup
# Usage: ./MuggleBornPadawan/700_linux/remote_startup.sh [--dry-run] [--skip-upgrade] 2>&1 | tee -a ./MuggleBornPadawan/700_linux/bckp/shell_log.log
# Fixes: no SSH lockout, non-interactive, idempotent, modular, fail-fast
set -euo pipefail
IFS=$'\n\t'

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------
readonly SSH_PORT="22"
readonly TMUX_SESSION="alpha"
readonly LOG_FILE="${HOME}/MuggleBornPadawan/700_linux/bckp/shell_log.log"
readonly SENTRY_SCRIPT="${HOME}/MuggleBornPadawan/700_linux/scripts/sentry.sh"
readonly SNOW_SCRIPT="${HOME}/MuggleBornPadawan/700_linux/scripts/snow.sh"
readonly EMACS_BACKUP_SCRIPT="${HOME}/MuggleBornPadawan/700_linux/bckp/backup_emacs.sh"
readonly EMACS_BACKUP_SRC="${HOME}/emacs_backups"
readonly EMACS_BACKUP_DST="${HOME}/MuggleBornPadawan/999_dotfiles"

DRY_RUN=false
SKIP_UPGRADE=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --skip-upgrade) SKIP_UPGRADE=true ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [--skip-upgrade]"
      echo "  --dry-run      : print actions, do not execute"
      echo "  --skip-upgrade : skip apt dist-upgrade (fast run)"
      exit 0
      ;;
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

run_sudo() {
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN sudo] $*"
  else
    sudo bash -c "$*"
  fi
}

has_cmd() { command -v "$1" >/dev/null 2>&1; }

# ensure log dir exists
mkdir -p "$(dirname "$LOG_FILE")"

# trap errors
trap 'die "Failed at line $LINENO: $BASH_COMMAND"' ERR

# --------------------------------------------------------------------------
# 1. Init
# --------------------------------------------------------------------------
init_system() {
  info "--- Init ---"
  clear || true
  cd "$HOME" || die "Cannot cd to HOME"

  if [[ -x "$SENTRY_SCRIPT" ]]; then
    info "Run sentry.sh"
    run "\"$SENTRY_SCRIPT\""
  else
    warn "Sentry not found: $SENTRY_SCRIPT"
  fi

  if has_cmd gpg-connect-agent; then
    run "gpg-connect-agent reloadagent /bye || true"
  fi

  # ulimit - safer: only lower if current > 1000, and do not hard-limit remote shell
  local current_limit
  current_limit=$(ulimit -u 2>/dev/null || echo "unlimited")
  info "Current ulimit -u: $current_limit (target 1000 if higher)"
  if [[ "$current_limit" != "unlimited" ]] && [[ "$current_limit" -gt 1000 ]] 2>/dev/null; then
    run "ulimit -u 1000 || true"
  fi

  if [[ -d "${HOME}/.ollama" ]]; then
    mkdir -p "${HOME}/.ollama"
    # append, do not overwrite history - original overwrote
    run "touch \"${HOME}/.ollama/history\""
    info "Ollama history preserved"
  fi

  if has_cmd espeak; then
    run "espeak -v en-gb -s 175 -p 50 \"roger that\" || true"
  fi

  log "Date: $(date) | OS: $(uname -s) | Kernel: $(uname -r)"
}

# --------------------------------------------------------------------------
# 2. Firewall - SAFE: allow SSH before enable
# --------------------------------------------------------------------------
configure_firewall() {
  info "--- Firewall (UFW) ---"
  if ! has_cmd ufw; then
    warn "ufw not installed, skip"
    return 0
  fi

  # Never block SSH on remote host. Order matters.
  info "Set defaults"
  run_sudo "ufw default deny incoming"
  run_sudo "ufw default allow outgoing"

  info "Allow SSH port $SSH_PORT before enable (prevent lockout)"
  run_sudo "ufw allow ${SSH_PORT}/tcp comment 'allow SSH' || true"

  # Deny risky ports - only if not SSH. Default deny already covers these,
  # explicit deny is for logging/clarity. Sorted, deduped list.
  local deny_ports=(20 21 25 53 80 110 137 138 139 143 443 445)
  for p in "${deny_ports[@]}"; do
    run_sudo "ufw deny $p || true"
  done
  # also handle named services if ufw recognizes them
  for svc in ftp smtp dns http pop3 imap https; do
    # only if service exists in ufw app list - ignore error
    run_sudo "ufw deny $svc || true"
  done

  info "Enable UFW non-interactively"
  run_sudo "ufw --force enable"

  run_sudo "ufw version || true"
  run_sudo "ufw status verbose numbered | sort -u || true"
  info "UFW done. Check: sudo ufw app list ; alias security"
}

# --------------------------------------------------------------------------
# 3. System cleanup
# --------------------------------------------------------------------------
system_cleanup() {
  info "--- System Cleanup ---"
  run_sudo "apt-get clean"
  run_sudo "apt-get autoclean -y || true"
  run_sudo "apt-get autoremove -y || true"

  info "Reset apt lists"
  run_sudo "rm -rf /var/lib/apt/lists/*"
  run_sudo "mkdir -p /var/lib/apt/lists/partial"

  if has_cmd journalctl; then
    info "Vacuum journal (2 days)"
    run_sudo "journalctl --vacuum-time=2d || true"
  fi

  info "Rebuild apt index"
  run_sudo "apt-get update"
  info "Cleanup complete"
}

# --------------------------------------------------------------------------
# 4. Packages - use install, not upgrade <pkg>
# --------------------------------------------------------------------------
upgrade_packages() {
  if [[ "$SKIP_UPGRADE" == true ]]; then
    warn "Skip upgrade (--skip-upgrade)"
    return 0
  fi
  info "--- Upgrade Packages ---"
  run_sudo "apt-get update"
  # full upgrade non-interactive
  run_sudo "DEBIAN_FRONTEND=noninteractive apt-get dist-upgrade -y --no-install-recommends || DEBIAN_FRONTEND=noninteractive apt-get full-upgrade -y || true"

  # Define package groups once - deduped
  # NOTE: clojure + leiningen REMOVED from apt (would pull openjdk-17 via default-jre-headless)
  # They are installed via upstream scripts in install_clojure_stack() using Temurin-25
  local base_pkgs=(vim nano bubblewrap debsums pulseaudio-utils vorbis-tools gh calc uuid-runtime fonts-dejavu fzf zoxide gnuplot nasm ffmpeg lm-sensors sqlite3 mpg123 dnsutils make bats jq cron postfix mailutils pass gnupg pv tldr tree bat fd-find git rig espeak espeak-ng nodejs npm python3 python3-pip sbcl mit-scheme racket rlwrap emacs magit clisp r-base build-essential firefox-esr fortune cowsay trash-cli)
  local build_pkgs=(gcc make pkg-config python3 python3-pip python3-pytest valgrind cmake check libbz2-dev libcurl4-openssl-dev libjson-c-dev libmilter-dev libncurses5-dev libpcre2-dev libssl-dev libxml2-dev zlib1g-dev)
  local net_pkgs=(ufw netcat-openbsd iproute2 tcpdump lsof neofetch rsync htop gnupg ncdu parallel tmux dnsutils nmap)
  local devops_pkgs=(podman crun)
  local latex_pkgs=(texlive-latex-recommended texlive-latex-extra texlive-fonts-recommended dvipng dvisvgm latexmk texlive-base texlive-latex-base texlive-plain-generic texlive-pictures texlive-binaries preview-latex-style)

  info "Install base packages (${#base_pkgs[@]})"
  (IFS=' '; run_sudo "DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ${base_pkgs[*]} || true")

  info "Install build deps"
  (IFS=' '; run_sudo "DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ${build_pkgs[*]} || true")

  info "Install net tools"
  (IFS=' '; run_sudo "DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ${net_pkgs[*]} || true")

  info "Install devops"
  (IFS=' '; run_sudo "DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ${devops_pkgs[*]} || true")

  info "Install latex"
  (IFS=' '; run_sudo "DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ${latex_pkgs[*]} || true")

  # final cleanup
  run_sudo "apt-get autoremove -y || true"
  run_sudo "apt-get clean; apt-get autoclean -y || true"

  info "Verify with debsums"
  run_sudo "debsums -s || true"

  if has_cmd npm; then
    info "NPM globals"
    run "npm list -g --depth=0 || true"
  fi

  # Remove Debian clojure/leiningen if they were installed before (avoid duplicate JDK)
  if dpkg -l | grep -q "^ii  clojure "; then
    info "Remove Debian clojure (avoid openjdk-17, use upstream)"
    run_sudo "apt-get purge -y clojure || true"
  fi
  if dpkg -l | grep -q "^ii  leiningen "; then
    info "Remove Debian leiningen (avoid openjdk-17, use upstream)"
    run_sudo "apt-get purge -y leiningen || true"
  fi

  install_clojure_stack
}

# --------------------------------------------------------------------------
# 4b. Clojure stack - upstream (no openjdk-17)
# --------------------------------------------------------------------------
install_clojure_stack() {
  info "--- Clojure stack (upstream, Temurin-25) ---"
  # Need java (Temurin) and curl
  if ! has_cmd java; then
    warn "java not found - install Temurin first, skip clojure stack"
    return 0
  fi
  log "java: $(java -version 2>&1 | head -1)"

  # --- Clojure CLI (deps.edn) ---
  if has_cmd clojure; then
    info "clojure already: $(clojure --version 2>&1 | head -1 || clojure -version 2>&1 | head -1)"
  else
    info "Install Clojure CLI (official)"
    local inst_dir="/tmp/clojure-install-$$"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] curl -O https://download.clojure.org/install/linux-install.sh && sudo bash linux-install.sh"
    else
      mkdir -p "$inst_dir" && cd "$inst_dir" || return 1
      if has_cmd curl; then
        curl -fsSL -O https://download.clojure.org/install/linux-install.sh || { warn "curl clojure install failed"; return 0; }
      elif has_cmd wget; then
        wget -q https://download.clojure.org/install/linux-install.sh || { warn "wget clojure install failed"; return 0; }
      else
        warn "no curl/wget, skip clojure CLI"; return 0
      fi
      chmod +x linux-install.sh
      sudo bash ./linux-install.sh || warn "clojure CLI install failed"
      cd - >/dev/null || true
      rm -rf "$inst_dir"
      has_cmd clojure && info "clojure now: $(clojure --version 2>&1 | head -1 || echo ok)" || warn "clojure still missing"
    fi
  fi

  # --- Leiningen ---
  if has_cmd lein; then
    info "lein already: $(lein version 2>&1 | head -1 || echo ok)"
  else
    info "Install Leiningen (stable)"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] curl lein -> /usr/local/bin/lein && chmod +x"
    else
      local lein_url="https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein"
      if has_cmd curl; then
        sudo curl -fsSL -o /usr/local/bin/lein "$lein_url" || { warn "curl lein failed"; return 0; }
      elif has_cmd wget; then
        sudo wget -q -O /usr/local/bin/lein "$lein_url" || { warn "wget lein failed"; return 0; }
      else
        warn "no curl/wget, skip lein"; return 0
      fi
      sudo chmod +x /usr/local/bin/lein
      info "lein installed to /usr/local/bin/lein (run 'lein version' to fetch jar)"
    fi
  fi

  # --- Babashka (bb) ---
  if has_cmd bb; then
    info "bb already: $(bb --version 2>&1 | head -1 || echo ok)"
  else
    info "Install Babashka (bb)"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] curl babashka install -> /usr/local/bin/bb"
    else
      local bb_inst="/tmp/bb-install-$$"
      mkdir -p "$bb_inst" && cd "$bb_inst" || return 1
      if has_cmd curl; then
        curl -fsSL -o install https://raw.githubusercontent.com/babashka/babashka/master/install || { warn "curl bb install failed"; cd - >/dev/null || true; return 0; }
      elif has_cmd wget; then
        wget -q -O install https://raw.githubusercontent.com/babashka/babashka/master/install || { warn "wget bb install failed"; cd - >/dev/null || true; return 0; }
      else
        warn "no curl/wget, skip bb"; cd - >/dev/null || true; return 0
      fi
      chmod +x install
      sudo bash ./install --dir /usr/local/bin || warn "bb install failed"
      cd - >/dev/null || true
      rm -rf "$bb_inst"
      has_cmd bb && info "bb now: $(bb --version 2>&1 | head -1 || echo ok)" || warn "bb still missing"
    fi
  fi

  # --- clj-kondo (linter) ---
  if has_cmd clj-kondo; then
    info "clj-kondo already: $(clj-kondo --version 2>&1 | head -1 || clj-kondo --help 2>&1 | head -1)"
  else
    info "Install clj-kondo"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] curl clj-kondo install -> /usr/local/bin/clj-kondo"
    else
      local kondo_inst="/tmp/clj-kondo-install-$$"
      mkdir -p "$kondo_inst" && cd "$kondo_inst" || return 1
      if has_cmd curl; then
        curl -fsSL -o install https://raw.githubusercontent.com/clj-kondo/clj-kondo/master/script/install-clj-kondo || { warn "curl clj-kondo install failed"; cd - >/dev/null || true; return 0; }
      elif has_cmd wget; then
        wget -q -O install https://raw.githubusercontent.com/clj-kondo/clj-kondo/master/script/install-clj-kondo || { warn "wget clj-kondo install failed"; cd - >/dev/null || true; return 0; }
      else
        warn "no curl/wget, skip clj-kondo"; cd - >/dev/null || true; return 0
      fi
      chmod +x install
      sudo bash ./install --dir /usr/local/bin || warn "clj-kondo install failed"
      cd - >/dev/null || true
      rm -rf "$kondo_inst"
      has_cmd clj-kondo && info "clj-kondo now: $(clj-kondo --version 2>&1 | head -1 || echo ok)" || warn "clj-kondo still missing"
    fi
  fi

  # --- clojure-lsp (LSP server) ---
  if has_cmd clojure-lsp; then
    info "clojure-lsp already: $(clojure-lsp --version 2>&1 | head -1 || echo ok)"
  else
    info "Install clojure-lsp"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] curl clojure-lsp install -> /usr/local/bin/clojure-lsp"
    else
      local lsp_inst="/tmp/clojure-lsp-install-$$"
      mkdir -p "$lsp_inst" && cd "$lsp_inst" || return 1
      if has_cmd curl; then
        curl -fsSL -o install https://raw.githubusercontent.com/clojure-lsp/clojure-lsp/master/install || { warn "curl clojure-lsp install failed"; cd - >/dev/null || true; return 0; }
      elif has_cmd wget; then
        wget -q -O install https://raw.githubusercontent.com/clojure-lsp/clojure-lsp/master/install || { warn "wget clojure-lsp install failed"; cd - >/dev/null || true; return 0; }
      else
        warn "no curl/wget, skip clojure-lsp"; cd - >/dev/null || true; return 0
      fi
      chmod +x install
      sudo bash ./install --dir /usr/local/bin || warn "clojure-lsp install failed"
      cd - >/dev/null || true
      rm -rf "$lsp_inst"
      has_cmd clojure-lsp && info "clojure-lsp now: $(clojure-lsp --version 2>&1 | head -1 || echo ok)" || warn "clojure-lsp still missing"
    fi
  fi

  # --- neil (add dep for deps.edn) - bb script ---
  if has_cmd neil; then
    info "neil already: $(neil --help 2>&1 | head -1 || echo ok)"
  else
    info "Install neil (bb script)"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] curl neil -> /usr/local/bin/neil && chmod +x"
    else
      if ! has_cmd bb; then warn "bb needed for neil, skip"; else
        if has_cmd curl; then
          sudo curl -fsSL -o /usr/local/bin/neil https://raw.githubusercontent.com/babashka/neil/main/neil || warn "curl neil failed"
        elif has_cmd wget; then
          sudo wget -q -O /usr/local/bin/neil https://raw.githubusercontent.com/babashka/neil/main/neil || warn "wget neil failed"
        fi
        sudo chmod +x /usr/local/bin/neil 2>/dev/null || true
        has_cmd neil && info "neil installed" || warn "neil still missing"
      fi
    fi
  fi

  # --- jet (EDN/JSON/transit tool) ---
  if has_cmd jet; then
    info "jet already: $(jet --version 2>&1 | head -1 || echo ok)"
  else
    info "Install jet"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] curl jet install -> /usr/local/bin/jet"
    else
      local jet_inst="/tmp/jet-install-$$"
      mkdir -p "$jet_inst" && cd "$jet_inst" || return 1
      if has_cmd curl; then
        curl -fsSL -o install https://raw.githubusercontent.com/borkdude/jet/master/install || { warn "curl jet install failed"; cd - >/dev/null || true; return 0; }
      elif has_cmd wget; then
        wget -q -O install https://raw.githubusercontent.com/borkdude/jet/master/install || { warn "wget jet install failed"; cd - >/dev/null || true; return 0; }
      else
        warn "no curl/wget, skip jet"; cd - >/dev/null || true; return 0
      fi
      chmod +x install
      sudo bash ./install --dir /usr/local/bin || sudo bash ./install /usr/local/bin || warn "jet install failed"
      cd - >/dev/null || true
      rm -rf "$jet_inst"
      has_cmd jet && info "jet now: $(jet --version 2>&1 | head -1 || echo ok)" || warn "jet still missing"
    fi
  fi

  # --- cljfmt (formatter) - static binary ---
  if has_cmd cljfmt; then
    info "cljfmt already: $(cljfmt --help 2>&1 | head -1 || cljfmt version 2>&1 | head -1)"
  else
    info "Install cljfmt (static binary 0.16.5)"
    if [[ "$DRY_RUN" == true ]]; then
      log "[DRY-RUN] download cljfmt-0.16.5-linux-amd64-static.tar.gz -> /usr/local/bin/cljfmt"
    else
      local fmt_inst="/tmp/cljfmt-install-$$"
      mkdir -p "$fmt_inst" && cd "$fmt_inst" || return 1
      local fmt_url="https://github.com/weavejester/cljfmt/releases/download/0.16.5/cljfmt-0.16.5-linux-amd64-static.tar.gz"
      if has_cmd curl; then
        curl -fsSL -o cljfmt.tar.gz "$fmt_url" || { warn "curl cljfmt failed"; cd - >/dev/null || true; return 0; }
      elif has_cmd wget; then
        wget -q -O cljfmt.tar.gz "$fmt_url" || { warn "wget cljfmt failed"; cd - >/dev/null || true; return 0; }
      else
        warn "no curl/wget, skip cljfmt"; cd - >/dev/null || true; return 0
      fi
      tar -xzf cljfmt.tar.gz 2>/dev/null || { warn "tar cljfmt failed"; cd - >/dev/null || true; return 0; }
      # tar contains single binary named cljfmt (exclude tar.gz)
      if [[ -f "./cljfmt" ]]; then
        sudo mv ./cljfmt /usr/local/bin/cljfmt 2>/dev/null || sudo cp ./cljfmt /usr/local/bin/cljfmt
        sudo chmod +x /usr/local/bin/cljfmt
        info "cljfmt installed (static)"
      else
        local bin=$(find . -type f -name "cljfmt" ! -name "*.tar.gz" ! -name "*.zip" | head -1)
        if [[ -n "$bin" && -f "$bin" ]]; then
          sudo mv "$bin" /usr/local/bin/cljfmt 2>/dev/null || sudo cp "$bin" /usr/local/bin/cljfmt
          sudo chmod +x /usr/local/bin/cljfmt
          info "cljfmt installed"
        else
          warn "cljfmt binary not found in tar (ls: $(ls -1))"
        fi
      fi
      cd - >/dev/null || true
      rm -rf "$fmt_inst"
      has_cmd cljfmt && info "cljfmt now installed" || warn "cljfmt still missing"
    fi
  fi
}

# --------------------------------------------------------------------------
# 5. Git + aliases (persistent)
# --------------------------------------------------------------------------
configure_git_and_aliases() {
  info "--- Git + Aliases ---"
  if has_cmd git; then
    run "git config --global user.name \"MuggleBornPadawan\" || true"
    run "git config --global user.email \"mugglebornpadawan@icloud.com\" || true"
  fi

  # Persist alias - do not just set in current shell
  local bashrc="${HOME}/.bashrc"
  local alias_line='alias rm="trash-put"'
  if [[ -f "$bashrc" ]] && ! grep -qF "$alias_line" "$bashrc"; then
    info "Add trash-put alias to .bashrc"
    if [[ "$DRY_RUN" == false ]]; then
      echo "" >> "$bashrc"
      echo "# safe rm - added by remote_startup.sh $(date +%Y-%m-%d)" >> "$bashrc"
      echo "$alias_line" >> "$bashrc"
    else
      log "[DRY-RUN] would add alias to $bashrc"
    fi
  fi
  # also set for current shell
  # shellcheck disable=SC2139
  alias rm="trash-put" 2>/dev/null || true

  info "IMPORTANT: restore bkp if not done. Check tmux, emacs, alias, gitignore"
  info "Use trash-list / trash-restore / trash-empty as needed"
}

# --------------------------------------------------------------------------
# 6. History - safe (archive, do not delete silently)
# --------------------------------------------------------------------------
archive_history() {
  info "--- History ---"
  local hist_backup="${HOME}/.bash_history.bak.$(date +%Y%m%d_%H%M%S)"
  if [[ -f "${HOME}/.bash_history" ]]; then
    info "Archive history to $hist_backup (not delete)"
    run "cp \"${HOME}/.bash_history\" \"$hist_backup\" || true"
    # optional: clear current session history but keep file for audit
    # history -c is session-only, do not rm file
    if [[ "$DRY_RUN" == false ]]; then
      history -c 2>/dev/null || true
      history -w 2>/dev/null || true
    fi
  fi
  if has_cmd pass; then
    run "pass ls || true"
  fi
}

# --------------------------------------------------------------------------
# 7. Tmux - detached, not blocking
# --------------------------------------------------------------------------
setup_tmux() {
  info "--- Tmux ---"
  if ! has_cmd tmux; then
    warn "tmux not installed"
    return 0
  fi
  if tmux has-session -t "$TMUX_SESSION" 2>/dev/null; then
    info "Tmux session $TMUX_SESSION exists, skip"
  else
    info "Create detached tmux $TMUX_SESSION"
    run "tmux new -d -s \"$TMUX_SESSION\" || true"
  fi
  info "Toggle bar: tmux set-option -g status on/off"
}

# --------------------------------------------------------------------------
# 8. ClamAV
# --------------------------------------------------------------------------
setup_clamav() {
  info "--- ClamAV ---"
  if has_cmd freshclam; then
    run_sudo "freshclam || true"
  fi
  if has_cmd clamscan; then
    run "clamscan --version || true"
  fi
  if has_cmd systemctl; then
    run "systemctl list-timers clamav-weekly.timer 2>/dev/null || systemctl list-timers | grep clam || true"
    run "systemctl is-active clamav-freshclam 2>/dev/null || sudo systemctl status clamav-freshclam --no-pager || true"
  fi
  info "Run 'sudo clamscan -r /' daily"
  run_sudo "ufw status verbose numbered | sort -u || true"
}

# --------------------------------------------------------------------------
# 9. Throwaway user + emacs backup (opt-in, confirm)
# --------------------------------------------------------------------------
handle_optional_tasks() {
  info "--- Optional tasks ---"
  if [[ -x "$SNOW_SCRIPT" ]]; then
    warn "snow.sh - throwaway user. Run manually: $SNOW_SCRIPT --force [--with-sudo]"
    warn "Skip auto-run (needs confirm). To auto-run, uncomment next line:"
    # run "\"$SNOW_SCRIPT\" --force || true"
    if has_cmd espeak; then
      run "espeak -v en-gb -s 175 -p 50 \"Tux out\" || true"
    fi
  fi

  if [[ -x "$EMACS_BACKUP_SCRIPT" ]]; then
    info "Run emacs backup (handles copy + retention)"
    run "\"$EMACS_BACKUP_SCRIPT\" || true"
  else
    warn "Emacs backup script not found"
  fi
}

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
main() {
  info "Start remote_startup.sh (DRY_RUN=$DRY_RUN SKIP_UPGRADE=$SKIP_UPGRADE)"
  info "Log: $LOG_FILE"
  init_system
  configure_firewall
  system_cleanup
  upgrade_packages
  configure_git_and_aliases
  archive_history
  setup_tmux
  setup_clamav
  handle_optional_tasks
  info "--- Done. All safe ---"
  info "Next: sudo ufw status verbose | sudo clamscan -r / --log=scan.log"
}

main "$@"
