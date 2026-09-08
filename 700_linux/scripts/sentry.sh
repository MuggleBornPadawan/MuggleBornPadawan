#!/bin/bash
# sentry.sh - Rogue AP / suspicious subnet detector (safe, read-only)
# Refactored to match remote_startup.sh idioms: strict mode, helpers, dry-run
# Usage: ./sentry.sh [--dry-run] [--verbose] [--json] [--no-color] [-h|--help]
# Exit: 0 clean, 1 threat found, 2 error
set -euo pipefail
IFS=$'\n\t'

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------
declare -A THREAT_MAP
THREAT_MAP["172.16.42."]="CRITICAL: WiFi Pineapple Detected (Evil Twin Attack)"
THREAT_MAP["10.0.0."]="HIGH: LAN Turtle / Shark Jack (Physical Implant)"
THREAT_MAP["10.1.1."]="HIGH: Pwnagotchi / Bettercap (Automated Cracker)"
THREAT_MAP["169.254."]="INFO: APIPA Address (DHCP Failure/Isolation)"
THREAT_MAP["192.168.1."]="WARNING: Generic Subnet (Potential Router Spoofing)"

readonly LOG_FILE="/var/log/omni_sentry.log"
readonly GREEN='\033[0;32m'
readonly RED='\033[0;31m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m'

DRY_RUN=false
VERBOSE=false
JSON_OUT=false
NO_COLOR=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --verbose) VERBOSE=true ;;
    --json) JSON_OUT=true ;;
    --no-color) NO_COLOR=true ;;
    -h|--help)
      echo "Usage: $0 [--dry-run] [--verbose] [--json] [--no-color]"
      echo "  --dry-run   : show what would be checked, do not log to syslog/file"
      echo "  --verbose   : show per-subnet checks"
      echo "  --json      : output JSON (threat/ip list)"
      echo "  --no-color  : disable color codes"
      echo "  Checks current IPs against known bad subnets (read-only)."
      exit 0
      ;;
    *) echo "Unknown arg: $arg (try --help)" >&2; exit 2 ;;
  esac
done

# --------------------------------------------------------------------------
# Helpers - match remote_startup.sh
# --------------------------------------------------------------------------
has_cmd() { command -v "$1" >/dev/null 2>&1; }

use_color() {
  [[ "$NO_COLOR" == true ]] && return 1
  [[ "$JSON_OUT" == true ]] && return 1
  [[ -t 1 ]] || [[ "$VERBOSE" == true ]] # allow color in verbose even if piped? keep simple: only if tty
  [[ -t 1 ]]
}

color_echo() {
  local color="$1"; shift
  if use_color; then
    echo -e "${color}$*${NC}"
  else
    echo -e "$*"
  fi
}

log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
info() { log "INFO: $*"; }
warn() { log "WARN: $*"; }
die()  { log "ERROR: $*"; exit 2; }

trap 'die "Failed at line $LINENO: $BASH_COMMAND"' ERR

log_alert() {
  local message="$1"
  color_echo "$RED" "[ALERT] $(date): $message"
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] would log to syslog/file: $message"
    return 0
  fi
  # Try LOG_FILE if writable, else logger
  if [[ -w "$LOG_FILE" ]] || { [[ ! -e "$LOG_FILE" ]] && touch "$LOG_FILE" 2>/dev/null && rm -f "$LOG_FILE"; }; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] OMNI-SENTRY: $message" >> "$LOG_FILE" 2>/dev/null || true
  fi
  if has_cmd logger; then
    logger -p user.crit "OMNI-SENTRY: $message" 2>/dev/null || true
  fi
}

# --------------------------------------------------------------------------
# IP detection - all IPs, no macOS noise
# --------------------------------------------------------------------------
get_ips() {
  local ips=()
  local raw=""
  if has_cmd hostname; then
    raw=$(hostname -I 2>/dev/null || true)
    if [[ -n "$raw" ]]; then
      # split on space - override IFS for this
      IFS=' ' read -ra parts <<< "$raw"
      for p in "${parts[@]}"; do
        [[ -n "$p" ]] && ips+=("$p")
      done
    fi
  fi
  # Fallback: ip -4 addr show (guarded)
  if [[ ${#ips[@]} -eq 0 ]] && has_cmd ip; then
    while IFS= read -r line; do
      # line like: inet 192.168.1.10/24
      local ip
      ip=$(echo "$line" | awk '{print $2}' | cut -d/ -f1)
      [[ -n "$ip" ]] && ips+=("$ip")
    done < <(ip -4 addr show 2>/dev/null | grep -oP 'inet \K[0-9.]+' || true)
  fi
  # Unique, non-empty
  printf '%s\n' "${ips[@]}" | sort -u | grep -v '^$' || true
}

audit_network() {
  local ips
  mapfile -t ips < <(get_ips)

  if [[ ${#ips[@]} -eq 0 ]]; then
    color_echo "$YELLOW" "[!] No network connection detected."
    return 0
  fi

  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] would audit ${#ips[@]} IP(s)"
  fi

  # Mask IPs in normal mode, show if verbose+json needs it
  if [[ "$JSON_OUT" == true ]]; then
    : # json will list masked? Keep real for json but allow dry-run to show
  else
    color_echo "$GREEN" "[*] Auditing Connection: xxx.xxx.xx.xxx # ${#ips[@]} IP(s) - use --verbose to see count, --json for detail"
  fi

  if [[ "$VERBOSE" == true || "$DRY_RUN" == true ]]; then
    for ip in "${ips[@]}"; do
      log "Found IP: ${ip:0:3}xxx.xxx # masked"
      if [[ "$VERBOSE" == true ]]; then
        # also log raw for operator who asked verbose
        log "  raw: $ip (verbose)"
      fi
    done
  fi

  local threatFound=false
  local threats=()

  for currentIp in "${ips[@]}"; do
    for subnet in "${!THREAT_MAP[@]}"; do
      if [[ "$VERBOSE" == true ]]; then
        log "checking $subnet against $currentIp ..."
      elif [[ "$DRY_RUN" == true ]]; then
        log "[DRY-RUN] checking $subnet ..."
      fi
      if [[ "$currentIp" == "$subnet"* ]]; then
        log_alert "${THREAT_MAP[$subnet]} (IP $currentIp matches $subnet*)"
        threats+=("{\"ip\":\"$currentIp\",\"subnet\":\"$subnet\",\"msg\":\"${THREAT_MAP[$subnet]}\"}")
        threatFound=true
      fi
    done
  done

  if [[ "$JSON_OUT" == true ]]; then
    # JSON output - always, even if dry-run (prefixed with DRY-RUN log)
    local json_threats
    if [[ ${#threats[@]} -eq 0 ]]; then
      json_threats="[]"
    else
      json_threats=$(printf '%s,' "${threats[@]}" | sed 's/,$//')
      json_threats="[$json_threats]"
    fi
    local json_ips
    json_ips=$(printf '"%s",' "${ips[@]}" | sed 's/,$//')
    echo "{\"ips\":[${json_ips}],\"threats\":${json_threats},\"clean\":$([ "$threatFound" = false ] && echo true || echo false)}"
  else
    if [[ "$threatFound" == false ]]; then
      color_echo "$GREEN" "[+] Subnet appears to be outside of known hacker default ranges."
    fi
  fi

  if [[ "$threatFound" == true ]]; then
    return 1
  fi
  return 0
}

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
main() {
  if [[ "$DRY_RUN" == true ]]; then
    log "[DRY-RUN] Omni-Sentry v2.1 (dry-run)"
  else
    echo "--- Omni-Sentry v2.1 Initialized ---"
  fi
  local rc=0
  audit_network || rc=$?
  exit $rc
}

main "$@"
