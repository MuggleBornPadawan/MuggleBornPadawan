#!/bin/bash
# yadda_yadda.sh - Fun diagnostics + network + weather + stress tests (polished)
# Usage: ./yadda_yadda.sh [--dry-run] [url]
#   url  : optional URL to probe (default https://openweathermap.org/)
set -euo pipefail
IFS=$'\n\t'

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------
DEFAULT_URL="https://openweathermap.org/"
DRY_RUN=false
URL="$DEFAULT_URL"

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [url]"
      echo "  Probes network + system info + weather + seq tests"
      exit 0
      ;;
    http*|*.*) URL="$arg" ;;
    *) echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

# strip scheme for tools that need host only (nmap, dig, host)
HOST_ONLY="${URL#https://}"
HOST_ONLY="${HOST_ONLY#http://}"
HOST_ONLY="${HOST_ONLY%%/*}"
[[ -z "$HOST_ONLY" ]] && HOST_ONLY="openweathermap.org"

# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------
log()  { echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
info() { log "INFO: $*"; }
warn() { log "WARN: $*"; }
has_cmd() { command -v "$1" >/dev/null 2>&1; }

run() {
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] $*"
  else
    eval "$@" || warn "Failed: $*"
  fi
}

run_or_warn() {
  local cmd="$1"
  local bin
  bin=$(echo "$cmd" | awk '{print $1}')
  if ! has_cmd "$bin"; then
    warn "Skip $bin not installed: $cmd"
    return 0
  fi
  run "$cmd"
}

speak() {
  local msg="$1"
  if has_cmd espeak; then
    run "espeak -v en-gb -s 175 -p 50 \"$msg\" || true"
  fi
}

# --------------------------------------------------------------------------
# Sections
# --------------------------------------------------------------------------
net_checks() {
  info "--- Net checks ($URL host=$HOST_ONLY) ---"
  run_or_warn "dig $HOST_ONLY"
  run_or_warn "host $HOST_ONLY"
  if has_cmd nmap; then
    info "nmap $HOST_ONLY (stripped scheme)"
    run "nmap $HOST_ONLY || true"
  else
    warn "Skip nmap not installed"
  fi
  if has_cmd ping; then
    run "ping -w 3 google.com > /tmp/yadda_ping_tmp.txt 2>&1 || true"
    run "cat /tmp/yadda_ping_tmp.txt 2>/dev/null | grep rtt || cat /tmp/yadda_ping_tmp.txt 2>/dev/null | head -n 5 || true"
  fi
}

sys_info() {
  info "--- System info ---"
  run "echo \"who is online?\" && w || true"
  run "id || true"
  run "groups || true"
  run "whoami || true"
  run "uname || true"
  run "uname -a || true"
  run "echo \$USER: \"\$USER\" || true"
  run "echo \$LOGNAME: \"\$LOGNAME\" || true"
  run "echo \$XDG_SESSION_TYPE: \"\$XDG_SESSION_TYPE\" || true"
  if has_cmd loginctl; then
    run "loginctl show-session \$(loginctl 2>/dev/null | grep \$(whoami) 2>/dev/null | awk '{print \$1}' | head -1) -p Type 2>/dev/null || echo \"no loginctl session\" || true"
  fi
  run "tty || true"
  run "hostname || true"
  run "hostname -i 2>/dev/null || true"
  run "pgrep emacs 2>/dev/null || echo \"no emacs\" || true"
  if has_cmd pstree; then run "pstree 2>/dev/null | head -n 30 || true"; fi
  run "echo \$PATH | tr : '\\n' | sort -u || true"
}

calc_and_trans() {
  info "--- Calc + translate ---"
  run_or_warn "calc 100 / 7"
  if has_cmd trans; then
    run "trans :fr hello 2>&1 | head -n 5 || true"
    run "trans :es hello 2>&1 | head -n 5 || true"
  else
    warn "Skip trans not installed"
  fi
}

tilde_demo() {
  info "--- Tilde demo ---"
  run "echo tilde || true"
  run "echo ~ || true"
  run "echo ~- || true"
  run "echo ~+ || true"
}

weather() {
  info "--- Weather ---"
  if has_cmd curl; then
    run "curl -s wttr.in/chennai 2>&1 | head -n 7 || true"
    run "curl -s wttr.in/pondicherry 2>&1 | head -n 7 || true"
  else
    warn "Skip curl not installed"
  fi
}

timestamps() {
  info "--- Timestamps ---"
  local start
  start=$(date +%s)
  for i in $(seq 0 9); do
    run "date -d \"@$(($start + i*60))\" +\"%Y-%m-%d %H:%M:%S\" || true"
  done
  run "echo \"random \$RANDOM: $RANDOM\" || true"
  run "echo \"shuffle: \$(shuf -i 1-1000 -n 5 2>/dev/null | tr '\\n' ',' | sed 's/,\$//')\" || true"
}

fun_stuff() {
  info "--- Fun ---"
  local pw_script="${HOME}/MuggleBornPadawan/700_linux/scripts/password_generator.sh"
  if [[ -x "$pw_script" ]]; then
    run "\"$pw_script\" > /dev/null 2>&1 || true"
  fi
  if has_cmd curl; then
    run "curl -sIL https://tinyurl.com/2sw62h3y 2>&1 | grep -i location: || echo \"no tinyurl location\" || true"
    run "curl -si --get https://naas.isalman.dev/no 2>&1 | grep reason || echo \"no naas reason\" || true"
  fi
  if has_cmd fortune && has_cmd cowsay; then
    run "fortune -a 2>/dev/null | cowsay 2>/dev/null || fortune -a 2>/dev/null | head -n 5 || true"
  elif has_cmd fortune; then
    run "fortune -a 2>/dev/null | head -n 5 || true"
  fi
}

seq_tests() {
  info "--- Seq tests (in /tmp, not HOME) ---"
  local tmpdir="/tmp/yadda_seq_$$"
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] would create seq files in $tmpdir"
    return 0
  fi
  mkdir -p "$tmpdir"
  run "seq -s \", \" 1 .71 10 || true"
  run "seq -f \"%02g\" -s \",\" 1 10 || true"
  run "seq -w -s \",\" 1 .71 10 || true"
  # create 5 + 31 touch files in tmpdir (avoid polluting HOME)
  run "seq -f \"$tmpdir/tempFile_%02g.txt\" 1 5 | xargs touch || true"
  run "seq -f \"$tmpdir/tempFile_2025-03-%02g.txt\" 1 31 | xargs touch || true"
  # generate 5 files with 100 lines each
  for i in $(seq 1 5); do
    for line in $(seq 1 100); do
      echo "File $i, Line $line: Some random content here"
    done > "$tmpdir/tempFile_$i.txt" 2>/dev/null || true
  done
  run "ls -lh $tmpdir | head -n 20 || true"
  run "echo \"Created 36 files in $tmpdir (cleaned by start.sh or /tmp)\" || true"
  # keep for inspection, but also link count for start.sh cleanup compat
  # also create compat files in HOME if start.sh expects tempF* in HOME (optional, not by default)
  info "Seq files kept in $tmpdir (not HOME) - start.sh cleans ~/tempF* separately"
}

stress_test() {
  info "--- Stress test (10 curls to $URL) ---"
  if has_cmd curl; then
    run "echo \"start time: \$(date)\" || true"
    run "seq 10 | xargs -I {} curl -s \"$URL\" >/dev/null 2>&1 || true"
    run "echo \"end time: \$(date)\" || true"
  fi
  info "ollama models are not run now to optimize space"
  run "echo \"$URL\" || true"
}

netstat_check() {
  info "--- Netstat ---"
  if has_cmd ss; then
    run "ss -tuln 2>/dev/null | head -n 20 || true"
  elif has_cmd netstat; then
    run "sudo netstat -pnltu 2>/dev/null | head -n 20 || netstat -pnltu 2>/dev/null | head -n 20 || true"
  else
    warn "Skip netstat/ss not installed"
  fi
}

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
main() {
  log "Start yadda_yadda.sh (DRY_RUN=$DRY_RUN URL=$URL)"
  cd "$HOME" || true
  speak "yaadda yaada"

  log "Probe URL: $URL (host: $HOST_ONLY)"
  net_checks
  sys_info
  calc_and_trans
  tilde_demo
  weather
  timestamps
  fun_stuff
  seq_tests
  stress_test
  netstat_check

  speak "yaada yaam out"
  log "Done yadda_yadda.sh"
}

main "$@"
