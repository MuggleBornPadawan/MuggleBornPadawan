#!/usr/bin/env bash
#
# sysinfo.sh
# Display Hardware Specifications, Resource Utilization, Network Status, 
# System Services, User Logs, and OS Specifications.
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

print_header "Execution Finished Successfully"
