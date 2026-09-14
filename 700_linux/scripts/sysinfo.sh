#!/usr/bin/env bash
#
# sysinfo.sh
# Display Hardware Specifications, Resource Utilization, Network Status,
# System Services, User Logs, and OS Specifications.
#
# Usage:
#   ./sysinfo.sh              # generic system snapshot (fast, safe for any host)
#   ./sysinfo.sh --tech       # also run tech stack healthcheck (Section 7)
#   ./sysinfo.sh --stack      # alias for --tech
#
# Output:
#   Overwrites ~/sysinfo.log. All stdout goes to log, only startup msg to stderr.
#   View with: cat ~/sysinfo.log  or  less ~/sysinfo.log
#
# Notes - When to use what:
#   - Default (no flag): use for general debug, before asking for help, cron snapshot.
#     Fast, no side effects, works without extra tools.
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

# Redirect all stdout to ~/sysinfo.log (overwriting it)
echo "Gathering system information... saving to $HOME/sysinfo.log" >&2
exec > "$HOME/sysinfo.log"

# ANSI Color Codes for formatting
BOLD="\033[1m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
RESET="\033[0m"

print_header() {
    echo -e "\n${BOLD}${BLUE}=====================================================${RESET}"
    echo -e "${BOLD}${CYAN}  $1 ${RESET}"
    echo -e "${BOLD}${BLUE}=====================================================${RESET}"
}
print_subheader() {
    echo -e "\n${BOLD}${YELLOW}--- $1 ---${RESET}"
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

# ----------------------------------------------------
# 2) RESOURCE UTILIZATION & TOP PROCESSES
# ----------------------------------------------------
print_header "2. Resource Utilization & Top Processes"

print_subheader "Top 5 CPU-Consuming Processes"
ps -eo pid,user,%cpu,%mem,command --sort=-%cpu 2>/dev/null | head -n 6 | cut -c 1-80 || ps aux 2>/dev/null | head -n 6 | cut -c 1-80

print_subheader "Top 5 Memory-Consuming Processes"
ps -eo pid,user,%cpu,%mem,command --sort=-%mem 2>/dev/null | head -n 6 | cut -c 1-80 || ps aux 2>/dev/null | head -n 6 | cut -c 1-80

print_subheader "Disk I/O Statistics"
if command -v iostat &> /dev/null; then
    iostat -xz 1 2 2>/dev/null | tail -n +6 | cut -c 1-80 || echo "iostat command execution failed."
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
if command -v curl &> /dev/null; then
    curl -s --max-time 5 https://ipinfo.io/json 2>/dev/null || echo "Unable to fetch public IP (timeout/no connection)."
elif command -v wget &> /dev/null; then
    wget -qO- --timeout=5 https://ipinfo.io/json 2>/dev/null || echo "Unable to fetch public IP (timeout/no connection)."
else
    echo "Neither curl nor wget is available."
fi

print_subheader "Internet Connectivity Test"
if ping -c 2 -W 2 8.8.8.8 &> /dev/null; then
    echo -e "${GREEN}✔ Internet Reachable (Ping to 8.8.8.8 successful)${RESET}"
else
    echo -e "${RED}✖ Internet Ping Failed${RESET}"
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
# 7) TECH STACK HEALTHCHECK (opt-in via --tech / --stack)
# ----------------------------------------------------
# Notes:
#   - Gated behind flag to keep default sysinfo fast/lean.
#   - Each check: version + lightweight readiness only. No heavy ops.
#   - Timeouts used for network/service checks. Failures show as MISSING/SKIPPED.
if [[ "${1:-}" == "--tech" || "${1:-}" == "--stack" ]]; then
    print_header "7. Tech Stack Healthcheck (Debian / Clojure / DB / Tools / AI)"
    echo -e "${YELLOW}Note: gated check -- run with --tech to include. Lightweight only, no downloads/model loads.${RESET}"

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
    for p in ~/.config/gemini ~/.config/antigravity ~/.config/google ~/.gemini ~/.antigravitycli ~/.cache/antigravity ~/.config/Antigravity\ IDE; do
        test -e "$p" && echo "  config path exists: $p" || true
    done
    test -f ~/.gemini/antigravity-cli/antigravity-oauth-token && echo "  oauth token: found (~/.gemini/antigravity-cli/antigravity-oauth-token)" || true
    echo "  Note: token/creds never logged -- only file existence checked."
fi

print_header "Execution Finished Successfully"
