#!/usr/bin/env bash
#
# sysinfo.sh
# Display Hardware Specifications, Resource Utilization, Network Status,
# System Services, User Logs, OS Specifications, and Security Status.
#
# Usage:
#   ./sysinfo.sh              # generic system snapshot (fast, safe for any host)
#   ./sysinfo.sh --tech       # also run tech stack healthcheck (Section 8)
#   ./sysinfo.sh --stack      # alias for --tech
#
# Output:
#   Overwrites ~/sysinfo.log (old log saved to ~/sysinfo.log.prev). All stdout goes to log, only startup msg to stderr.
#   View with: cat ~/sysinfo.log  or  less ~/sysinfo.log
#   Clean log (no ANSI): NO_COLOR=1 ./sysinfo.sh
#   Skip public IP: SYSINFO_NO_IP=1 ./sysinfo.sh
#
# Notes - When to use what:
#   - Default (no flag): use for general debug, before asking for help, cron snapshot.
#     Fast, no side effects, works without extra tools. Includes Section 7 Security (light only, no scan).
#   - --tech / --stack: use when you debug YOUR stack on THIS machine.
#     Checks: Debian, Clojure stack (clojure/lein/bb/clj-kondo/clojure-lsp/neil/jet/java),
#             SQLite, PostgreSQL, Git, Ollama, Emacs, pi coding agent, Gemini Antigravity.
#     Each check is lightweight (version + is-active/is-ready, 2-3s timeout). No downloads,
#     no model loads, no deps fetch.
#
# Constraints - This is a lean machine (6 Gi RAM, ~11 Gi disk free):
#   - Tech check is GATED behind flag to keep default run fast and low-RAM.
#   - Do NOT add: ollama run, clojure -P, lein deps, docker pull — they fill disk/RAM.
#   - All tech checks have fallbacks ("MISSING" / "not installed") and short timeouts.
#   - Do NOT log secrets: Gemini/GCloud tokens are only checked for file existence.
#

set -uo pipefail

# Redirect all stdout to ~/sysinfo.log (overwriting it, backup old log)
echo "Gathering system information... saving to $HOME/sysinfo.log" >&2
[[ -f "$HOME/sysinfo.log" ]] && cp -f "$HOME/sysinfo.log" "$HOME/sysinfo.log.prev" 2>/dev/null || true
exec > "$HOME/sysinfo.log"

# ANSI Color Codes for formatting (disable with NO_COLOR=1 or when not a tty)
BOLD="\033[1m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
RESET="\033[0m"
if [[ -n "${NO_COLOR:-}" ]] || [[ ! -t 1 && -z "${FORCE_COLOR:-}" ]]; then
    BOLD="" GREEN="" BLUE="" CYAN="" YELLOW="" RED="" RESET=""
fi

print_header() {
    printf "\n${BOLD}${BLUE}=====================================================${RESET}\n"
    printf "${BOLD}${CYAN}  %s ${RESET}\n" "$1"
    printf "${BOLD}${BLUE}=====================================================${RESET}\n"
}
print_subheader() {
    printf "\n${BOLD}${YELLOW}--- %s ---${RESET}\n" "$1"
}

# ----------------------------------------------------
# 1) HARDWARE SPECIFICATIONS
# ----------------------------------------------------
print_header "1. Hardware Specifications"

print_subheader "CPU Information"
if command -v lscpu &> /dev/null; then
    lscpu | grep -E 'Model name|Architecture|CPU\(s\):|Thread\(s\) per core:|Core\(s\) per socket:|CPU max MHz|CPU min MHz'
elif [ -f /proc/cpuinfo ]; then
    grep -m 1 "model name" /proc/cpuinfo
    echo -n "Total CPU Cores: "
    grep -c "^processor" /proc/cpuinfo
fi

print_subheader "Memory (RAM & Swap)"
if command -v free &> /dev/null; then
    free -h
else
    grep -E 'MemTotal|MemFree|MemAvailable|SwapTotal|SwapFree' /proc/meminfo
fi

print_subheader "Disk & Storage Space"
df -h --output=source,fstype,size,used,avail,pcent,target -x tmpfs -x devtmpfs 2>/dev/null || df -h

if command -v lsblk &> /dev/null; then
    print_subheader "Block Devices (Disks / Partitions)"
    lsblk -o NAME,SIZE,TYPE,MOUNTPOINTS,FSTYPE 2>/dev/null || lsblk
fi

print_subheader "PCI / GPU Devices"
if command -v nvidia-smi &> /dev/null; then
    nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader
elif command -v lspci &> /dev/null; then
    lspci | grep -i -E 'vga|3d|display' || echo "No dedicated GPU detected via lspci."
else
    echo "lspci/nvidia-smi not available or no dedicated GPU detected."
fi

print_subheader "Battery Health"
# Light check: sysfs first (no deps), then upower/acpi if present. Handles desktops (no battery) gracefully.
_bat_found=0
for _bat in /sys/class/power_supply/BAT* /sys/class/power_supply/battery; do
    [[ -e "$_bat" ]] || continue
    [[ "$(cat "$_bat"/type 2>/dev/null)" == "Battery" ]] || continue
    _bat_found=1
    echo "Battery: $(basename "$_bat")"
    _cap=$(cat "$_bat"/capacity 2>/dev/null || echo "?")
    _status=$(cat "$_bat"/status 2>/dev/null || echo "?")
    _health=$(cat "$_bat"/health 2>/dev/null || echo "Unknown")
    _tech=$(cat "$_bat"/technology 2>/dev/null || echo "?")
    _cycles=$(cat "$_bat"/cycle_count 2>/dev/null || echo "?")
    _full=$(cat "$_bat"/charge_full 2>/dev/null || cat "$_bat"/energy_full 2>/dev/null || echo "")
    _design=$(cat "$_bat"/charge_full_design 2>/dev/null || cat "$_bat"/energy_full_design 2>/dev/null || echo "")
    _now=$(cat "$_bat"/charge_now 2>/dev/null || cat "$_bat"/energy_now 2>/dev/null || cat "$_bat"/charge_counter 2>/dev/null || echo "")
    echo "  Capacity: ${_cap}%  Status: ${_status}  Health: ${_health}  Tech: ${_tech}"
    echo "  Cycles: ${_cycles}"
    if [[ -n "$_full" && -n "$_design" && "$_design" != "0" && "$_full" =~ ^[0-9]+$ && "$_design" =~ ^[0-9]+$ ]]; then
        _wear=$(awk "BEGIN {printf \"%.1f\", $_full*100/$_design}")
        echo "  Wear: ${_wear}% (full=${_full} / design=${_design})"
        if awk "BEGIN {exit !($_wear < 60)}"; then
            echo "  Note: battery wear high (<60%), consider replacement"
        fi
    else
        [[ -n "$_full" ]] && echo "  Full: $_full  Design: ${_design:-?}  Now: ${_now:-?}"
    fi
done
if [[ $_bat_found -eq 0 ]]; then
    echo "No battery detected (desktop/VM or no /sys/class/power_supply/BAT*)"
fi
# Extra detail if upower is installed (light, 3s timeout)
if command -v upower &>/dev/null; then
    for _up in $(upower -e 2>/dev/null | grep -i battery); do
        echo "  upower: $_up"
        timeout 3 upower -i "$_up" 2>/dev/null | grep -E 'percentage|state|energy-full|capacity|technology' | head -n 10 || true
    done
fi
if command -v acpi &>/dev/null; then
    echo "  acpi: $(timeout 3 acpi -b 2>&1 | head -n 5 || echo "no acpi data")"
fi
unset _bat _cap _status _health _tech _cycles _full _design _now _wear _bat_found _up

# ----------------------------------------------------
# 2) RESOURCE UTILIZATION & TOP PROCESSES
# ----------------------------------------------------
print_header "2. Resource Utilization & Top Processes"

print_subheader "Top 5 CPU-Consuming Processes"
COLUMNS=80 ps -eo pid,user,%cpu,%mem,command --sort=-%cpu 2>/dev/null | head -n 6 || ps aux 2>/dev/null | head -n 6 | cut -c 1-80

print_subheader "Top 5 Memory-Consuming Processes"
COLUMNS=80 ps -eo pid,user,%cpu,%mem,command --sort=-%mem 2>/dev/null | head -n 6 || ps aux 2>/dev/null | head -n 6 | cut -c 1-80

print_subheader "Disk I/O Statistics"
if command -v iostat &> /dev/null; then
    # iostat -xz 1 2 waits ~2s for 2 samples; timeout 5 protects slow hosts
    timeout 5 iostat -xz 1 2 2>/dev/null | tail -n +6 | cut -c 1-80 || echo "iostat command execution failed."
else
    echo "iostat (sysstat package) is not installed."
fi

# ----------------------------------------------------
# 3) NETWORK STATUS & PORTS
# ----------------------------------------------------
print_header "3. Network Status & Ports"

print_subheader "Network Interfaces & IP Addresses"
if command -v ip &> /dev/null; then
    ip -brief address show 2>/dev/null || ip addr show
elif command -v ifconfig &> /dev/null; then
    ifconfig
fi

print_subheader "Default Gateway & Routing Table"
if command -v ip &> /dev/null; then
    ip route show
elif command -v netstat &> /dev/null; then
    netstat -rn
fi

print_subheader "DNS Configuration"
if [ -f /etc/resolv.conf ]; then
    grep "^nameserver" /etc/resolv.conf
fi

print_subheader "Listening Ports & Services"
if command -v ss &> /dev/null; then
    ss -tulpn 2>/dev/null || echo "Unable to retrieve ports (ss failed)."
elif command -v netstat &> /dev/null; then
    netstat -tulpn 2>/dev/null || echo "Unable to retrieve ports (netstat failed)."
else
    echo "ss or netstat utilities not available."
fi

print_subheader "Public IP & Geo Info"
# Note: contacts ipinfo.io and logs your public IP. Skip with SYSINFO_NO_IP=1
if [[ -n "${SYSINFO_NO_IP:-}" ]]; then
    echo "Skipped (SYSINFO_NO_IP=1)"
elif command -v curl &> /dev/null; then
    curl -s --max-time 5 https://ipinfo.io/json 2>/dev/null || echo "Unable to fetch public IP (timeout/no connection)."
elif command -v wget &> /dev/null; then
    wget -qO- --timeout=5 https://ipinfo.io/json 2>/dev/null || echo "Unable to fetch public IP (timeout/no connection)."
else
    echo "Neither curl nor wget is available."
fi

print_subheader "Internet Connectivity Test"
if ping -c 2 -W 2 8.8.8.8 &> /dev/null; then
    printf "${GREEN}✔ Internet Reachable (Ping to 8.8.8.8 successful)${RESET}\n"
else
    printf "${RED}✖ Internet Ping Failed${RESET}\n"
fi

# ----------------------------------------------------
# 4) SERVICES & ERROR LOGS
# ----------------------------------------------------
print_header "4. Services & Logs"

print_subheader "Failed Services (Systemd)"
if command -v systemctl &> /dev/null; then
    systemctl --failed --type=service 2>/dev/null || echo "No failed services or systemctl query failed."
else
    echo "systemctl not available."
fi

print_subheader "Recent System Error Logs (Journalctl)"
if command -v journalctl &> /dev/null; then
    # Show only the last 10 errors from this boot; redirect stderr to ignore permission warnings if not running as root
    journalctl -p 3 -xb --no-pager 2>/dev/null | tail -n 10 || echo "No recent error logs or permission denied to read logs."
else
    echo "journalctl not available."
fi

# ----------------------------------------------------
# 5) USER SESSIONS & LOGINS
# ----------------------------------------------------
print_header "5. User Sessions & Logins"

print_subheader "Currently Logged-in Users"
w 2>/dev/null || who 2>/dev/null || echo "Unable to get logged-in users."

print_subheader "Recent Login History"
last -n 5 2>/dev/null || echo "last command not available."

# ----------------------------------------------------
# 6) OS SPECIFICATIONS
# ----------------------------------------------------
print_header "6. OS Specifications"

print_subheader "Operating System & Distribution"
if [ -f /etc/os-release ]; then
    grep -E '^(PRETTY_NAME|NAME|VERSION|ID)=' /etc/os-release | tr -d '"'
elif command -v lsb_release &> /dev/null; then
    lsb_release -a
else
    uname -s
fi

print_subheader "Kernel & Architecture"
echo "Kernel Release: $(uname -r)"
echo "Architecture  : $(uname -m)"
echo "Full Kernel   : $(uname -v)"

print_subheader "Hostname & Uptime"
echo "Hostname      : $(hostname)"
echo "Current User  : ${USER:-$(whoami)}"
echo "System Uptime : $(uptime -p 2>/dev/null || uptime)"
if [ -f /proc/loadavg ]; then
    echo "Load Average  : $(cut -d' ' -f1-3 /proc/loadavg)"
else
    echo "Load Average  : $(uptime | awk -F'load average:' '{ print $2 }' | xargs)"
fi

# ----------------------------------------------------
# 7) SECURITY STATUS (Firewall / Antivirus) - light, default run
# ----------------------------------------------------
print_header "7. Security Status (Firewall / Antivirus)"

print_subheader "Firewall Status"
# UFW (Debian friendly)
if command -v ufw &>/dev/null; then
    echo -n "ufw: "; timeout 3 ufw status 2>&1 | head -n 10 || echo "ufw status: no response (need sudo?)"
else
    echo "ufw: not installed (optional, check nft/iptables)"
fi
# nftables (modern Debian default)
if command -v nft &>/dev/null; then
    echo -n "nft: "; timeout 3 nft list ruleset 2>&1 | head -n 20 || echo "nft ruleset: empty or need sudo"
    if command -v systemctl &>/dev/null; then
        echo "  nftables service: $(systemctl is-active nftables 2>&1 || echo "unknown")"
    fi
else
    echo "nft: not installed"
fi
# iptables (legacy fallback, list only, no change)
if command -v iptables &>/dev/null; then
    echo -n "iptables: "; timeout 3 iptables -L -n 2>&1 | head -n 20 || echo "iptables: no permission or empty"
else
    echo "iptables: not installed"
fi

print_subheader "Antivirus / Intrusion Tools"
for av in clamscan freshclam clamav rkhunter chkrootkit fail2ban-client; do
    if command -v "$av" &>/dev/null; then
        echo -n "$av: "; timeout 3 "$av" --version 2>&1 | head -n 1 || echo "installed (version unknown)"
        if [[ "$av" == "fail2ban-client" ]] && command -v systemctl &>/dev/null; then
            echo "  fail2ban service: $(systemctl is-active fail2ban 2>&1 || echo "unknown")"
        fi
    else
        echo "$av: not installed"
    fi
done
# ClamAV daemon check (light only, no scan)
if command -v systemctl &>/dev/null; then
    for svc in clamav-daemon clamav-freshclam; do
        if systemctl list-unit-files 2>/dev/null | grep -q "$svc"; then
            echo "  $svc: $(systemctl is-active "$svc" 2>&1 || true)"
        fi
    done
fi
echo "Note: no scan runs here (clamav scan is heavy, use 'clamscan -r' by hand)."

print_subheader "Security Updates"
if command -v apt &>/dev/null; then
    echo "  pending updates: $(apt list --upgradable 2>/dev/null | grep -c upgradable || echo "unknown") package(s) upgradable"
    test -f /var/run/reboot-required && echo "  reboot required: YES (/var/run/reboot-required exists)" || echo "  reboot required: no"
else
    echo "apt: not found"
fi

# ----------------------------------------------------
# 8) TECH STACK HEALTHCHECK (opt-in via --tech / --stack)
# ----------------------------------------------------
# Notes:
#   - Gated behind flag to keep default sysinfo fast/lean.
#   - Each check: version + lightweight readiness only. No heavy ops.
#   - Timeouts used for network/service checks. Failures show as MISSING/SKIPPED.
if [[ "${1:-}" == "--tech" || "${1:-}" == "--stack" ]]; then
    print_header "8. Tech Stack Healthcheck (Debian / Clojure / DB / Tools / AI)"
    printf "${YELLOW}Note: gated check -- run with --tech to include. Lightweight only, no downloads/model loads.${RESET}\n"

    print_subheader "Debian / OS"
    # Already covered in Section 6, repeat concise version here
    grep -E '^(PRETTY_NAME|VERSION)=' /etc/os-release 2>/dev/null | tr -d '"' || echo "os-release not found"
    echo "Kernel: $(uname -r) Arch: $(uname -m)"

    print_subheader "Clojure Stack (Temurin-25, CLI, Lein, bb, lsp, kondo, neil, jet, cljfmt)"
    echo -n "java (Temurin-25): "; java -version 2>&1 | head -n 1 || echo "MISSING"
    test -d /usr/lib/jvm/temurin-25-jdk-amd64 && echo "  JVM path OK: /usr/lib/jvm/temurin-25-jdk-amd64" || echo "  JVM path MISSING: /usr/lib/jvm/temurin-25-jdk-amd64"
    for cmd in clojure lein bb clj-kondo clojure-lsp neil jet cljfmt; do
        if command -v "$cmd" &>/dev/null; then
            echo -n "$cmd: "; timeout 3 "$cmd" --version 2>&1 | head -n 1 || timeout 3 "$cmd" version 2>&1 | head -n 1 || echo "installed (version unknown)"
        else
            echo "$cmd: MISSING (not in PATH /usr/local/bin)"
        fi
    done

    print_subheader "SQLite (local/embedded DB)"
    if command -v sqlite3 &>/dev/null; then
        echo "sqlite3: $(sqlite3 --version 2>&1 | head -n 1)"
        timeout 3 sqlite3 :memory: "select 1;" 2>&1 | head -n 1 && echo "  in-memory check: OK" || echo "  in-memory check: FAILED"
    else
        echo "sqlite3: MISSING"
    fi

    print_subheader "PostgreSQL (server DB)"
    if command -v psql &>/dev/null; then
        echo "psql: $(psql --version 2>&1 | head -n 1)"
    else
        echo "psql: MISSING"
    fi
    if command -v pg_isready &>/dev/null; then
        timeout 3 pg_isready -h localhost 2>&1 | head -n 1 || echo "pg_isready: no response (server down or no localhost)"
    else
        echo "pg_isready: MISSING (install postgresql-client)"
    fi

    print_subheader "Git"
    if command -v git &>/dev/null; then
        echo "git: $(git --version 2>&1 | head -n 1)"
        echo "  user.name: $(git config --get user.name 2>&1 || echo "(not set)")"
        echo "  user.email: $(git config --get user.email 2>&1 || echo "(not set)")"
    else
        echo "git: MISSING"
    fi

    print_subheader "Ollama (local LLM)"
    if command -v ollama &>/dev/null; then
        echo "ollama: $(ollama --version 2>&1 | head -n 1 || echo "installed")"
        if command -v systemctl &>/dev/null; then
            echo "  service: $(systemctl is-active ollama 2>&1 || true)"
        fi
        timeout 3 ollama list 2>&1 | head -n 5 || echo "  ollama list: no response / timeout (model not loaded is OK)"
    else
        echo "ollama: MISSING"
    fi
    echo "  Note: never runs 'ollama run' here -- would load model into RAM (OOM risk)."

    print_subheader "Emacs (REPL workflow)"
    if command -v emacs &>/dev/null; then
        echo "emacs: $(emacs --version 2>&1 | head -n 1)"
        test -f ~/.emacs.d/init.el && echo "  init.el: found" || echo "  init.el: MISSING"
        test -f ~/.emacs.d/customizations/setup-clojure.el && echo "  setup-clojure.el: found" || echo "  setup-clojure.el: MISSING"
    else
        echo "emacs: MISSING"
    fi

    print_subheader "Pi Coding Agent"
    if command -v pi &>/dev/null; then
        echo "pi: $(pi --version 2>&1 | head -n 1 || echo "installed")"
    else
        echo "pi: MISSING (check install at /usr/local/bin or npm)"
    fi
    test -f ~/.pi/agent/AGENTS.md && echo "  AGENTS.md: found" || echo "  AGENTS.md: not found"

    print_subheader "Google Gemini Antigravity"
    # Do NOT cat tokens. Only check for config presence.
    # Binary names: agy (CLI), antigravity-ide (IDE), gemini (Gemini CLI), antigravity (legacy alias)
    for cmd in agy antigravity antigravity-ide gemini; do
        if command -v "$cmd" &>/dev/null; then
            echo -n "$cmd: "; timeout 3 "$cmd" --version 2>&1 | head -n 1 || echo "installed (version unknown)"
            # show binary location for debug
            echo "  path: $(command -v "$cmd")"
        else
            echo "$cmd: not in PATH"
        fi
    done
    if command -v gcloud &>/dev/null; then
        echo "gcloud: $(gcloud --version 2>&1 | head -n 1)"
    else
        echo "gcloud: not installed (optional for Gemini)"
    fi
    # Check common config locations without reading secrets
    for p in ~/.config/gemini ~/.config/antigravity ~/.config/google ~/.gemini ~/.antigravitycli ~/.cache/antigravity ~/.config/"Antigravity IDE"; do
        test -e "$p" && echo "  config path exists: $p" || true
    done
    test -f ~/.gemini/antigravity-cli/antigravity-oauth-token && echo "  oauth token: found (~/.gemini/antigravity-cli/antigravity-oauth-token)" || true
    echo "  Note: token/creds never logged -- only file existence checked."
fi

print_header "Execution Finished Successfully"
