#!/bin/bash
# --------------------------------------------------------------------------
# Author: Gemini AI Thought Partner
# License: GNU GPL v3
# Description: Omni-Sentry - Comprehensive Rogue Access Point Detector
# --------------------------------------------------------------------------

# 1. Configuration: Known "Bad" Subnets & Tool Signatures
declare -A THREAT_MAP
THREAT_MAP["172.16.42."]="CRITICAL: WiFi Pineapple Detected (Evil Twin Attack)"
THREAT_MAP["10.0.0."]="HIGH: LAN Turtle / Shark Jack (Physical Implant)"
THREAT_MAP["10.1.1."]="HIGH: Pwnagotchi / Bettercap (Automated Cracker)"
THREAT_MAP["169.254."]="INFO: APIPA Address (DHCP Failure/Isolation)"
THREAT_MAP["192.168.1."]="WARNING: Generic Subnet (Potential Router Spoofing)"

# 2. Defensive Constants
readonly LOG_FILE="/var/log/omni_sentry.log"
readonly GREEN='\033[0;32m'
readonly RED='\033[0;31m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m' # No Color

log_alert() {
    local message="$1"
    echo -e "${RED}[ALERT] $(date): $message${NC}"
    # Use 'logger' to send to system syslog (Industry Best Practice)
    logger -p user.crit "OMNI-SENTRY: $message"
}

audit_network() {
    # Identify the primary IP address (Works on most Unix-like systems)
    local currentIp
    currentIp=$(hostname -I 2>/dev/null | awk '{print $1}')
    
    # Fallback for macOS users
    if [[ -z "$currentIp" ]]; then
        currentIp=$(ipconfig getifaddr en0 2>/dev/null)
    fi

    if [[ -z "$currentIp" ]]; then
        echo -e "${YELLOW}[!] No network connection detected.${NC}"
        return 0
    fi

    # echo -e "${GREEN}[*] Auditing Connection: $currentIp${NC}" #unmask this if you want IP to be displayed
    echo -e "${GREEN}[*] Auditing Connection: xxx.xxx.xx.xxx # Manually unmask if you want IP to be displayed "
    # Check against our Threat Map
    local threatFound=false
    for subnet in "${!THREAT_MAP[@]}"; do
        if [[ "$currentIp" == "$subnet"* ]]; then
            log_alert "${THREAT_MAP[$subnet]}"
            threatFound=true
        fi
    done

    if [ "$threatFound" = false ]; then
        echo -e "${GREEN}[+] Subnet appears to be outside of known hacker default ranges.${NC}"
    fi
}

# 3. Execution Main Loop
main() {
    echo "--- Omni-Sentry v2.0 Initialized ---"
    audit_network
}

main "$@"
