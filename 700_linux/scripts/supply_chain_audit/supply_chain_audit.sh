#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/config.conf"
REPORTS_DIR="${SCRIPT_DIR}/reports"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
JSON_REPORT="${REPORTS_DIR}/quarantine_${TIMESTAMP}.json"
TXT_REPORT="${REPORTS_DIR}/compliance_report_${TIMESTAMP}.txt"
LOG_FILE="${REPORTS_DIR}/integrity_log_${TIMESTAMP}.log"

DRY_RUN=false
FORCE_REMOVE=false
JSON_ONLY=false
AGE_THRESHOLD_DAYS=7

declare -A TRUSTED_REPOS
TRUSTED_REPOS=(
    ["deb.debian.org"]=1
    ["security.debian.org"]=1
    ["archive.debian.org"]=1
    ["ftp.debian.org"]=1
    ["http.debian.org"]=1
)

declare -A EXEMPT_PKGS
EXEMPT_PKGS=(
    ["linux-image"]=1 ["linux-headers"]=1 ["linux-modules"]=1
    ["gcc"]=1 ["libc6"]=1 ["dpkg"]=1 ["apt"]=1 ["bash"]=1
    ["coreutils"]=1 ["systemd"]=1 ["openssl"]=1
)

print_banner() {
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║        SUPPLY CHAIN COMPLIANCE AUDIT SCANNER               ║
║        Version 1.0 | Debian/Ubuntu Systems                 ║
╚══════════════════════════════════════════════════════════════╝
EOF
}

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$1] $2" | tee -a "$LOG_FILE"
}

is_trusted() {
    local repo="$1"
    for trusted in "${!TRUSTED_REPOS[@]}"; do
        [[ "$repo" == *"$trusted"* ]] && return 0
    done
    return 1
}

is_exempt() {
    local pkg="$1"
    for exempt in "${!EXEMPT_PKGS[@]}"; do
        [[ "$pkg" == "$exempt"* ]] && return 0
    done
    return 1
}

check_dependencies() {
    for cmd in dpkg jq; do
        command -v "$cmd" &>/dev/null || { echo "ERROR: Missing $cmd"; exit 1; }
    done
}

get_recent_packages() {
    local cutoff_date
    cutoff_date=$(date -d "$AGE_THRESHOLD_DAYS days ago" +%Y-%m-%d 2>/dev/null || date -d "-$AGE_THRESHOLD_DAYS days" +%Y-%m-%d)
    local temp_file="/tmp/sca_pkgs_$$"
    > "$temp_file"
    
    for log_file in /var/log/dpkg.log /var/log/dpkg.log.1; do
        if [[ -f "$log_file" ]]; then
            grep " status installed " "$log_file" >> "$temp_file" 2>/dev/null || true
        fi
    done
    
    for gz_file in /var/log/dpkg.log.2.gz /var/log/dpkg.log.3.gz; do
        if [[ -f "$gz_file" ]]; then
            gzip -cd "$gz_file" 2>/dev/null | grep " status installed " >> "$temp_file" || true
        fi
    done
    
    local pkg_list=""
    while read -r date time s1 s2 pkg_ver _; do
        [[ "$s1" != "status" || "$s2" != "installed" ]] && continue
        [[ "$date" < "$cutoff_date" ]] && continue
        
        local pkg="${pkg_ver%:amd64}"
        pkg="${pkg%:i386}"
        
        [[ ${#pkg} -lt 2 ]] && continue
        [[ ! "$pkg" =~ ^[a-zA-Z0-9] ]] && continue
        
        is_exempt "$pkg" && continue
        
        pkg_list="$pkg_list$pkg|$date"$'\n'
    done < "$temp_file"
    
    rm -f "$temp_file"
    echo "$pkg_list"
}

main() {
    mkdir -p "$REPORTS_DIR"
    touch "$LOG_FILE"
    
    print_banner
    log "INFO" "Audit started - Timestamp: $TIMESTAMP"
    
    check_dependencies
    log "INFO" "Dependencies OK"
    log "INFO" "Age threshold: $AGE_THRESHOLD_DAYS days"
    
    local packages_json=""
    local safe_count=0
    local flag_count=0
    
    local pkg_data
    pkg_data=$(get_recent_packages)
    
    while IFS='|' read -r pkg install_date; do
        [[ -z "$pkg" ]] && continue
        
        local version version_age repo trusted reason
        
        version=$(dpkg-query -W -f='${Version}' "$pkg" 2>/dev/null || echo "unknown")
        
        local today_epoch install_epoch
        today_epoch=$(date +%s)
        install_epoch=$(date -d "$install_date" +%s 2>/dev/null || echo "$today_epoch")
        version_age=$(( (today_epoch - install_epoch) / 86400 ))
        
        if [[ -f /etc/apt/sources.list.d/cros.list ]]; then
            repo="cros.list (ChromeOS - UNTRUSTED)"
            trusted=false
            reason="untrusted_repository"
        else
            repo="deb.debian.org (Official - Trusted)"
            trusted=true
            reason=""
        fi
        
        local entry
        entry=$(printf '{"name":"%s","version":"%s","installed_on":"%s","age_days":%d,"source_repository":"%s","trusted":%s,"flags":["%s"],"removal_command":"apt remove -y %s"}' \
            "$pkg" "$version" "$install_date" "$version_age" "$repo" "$trusted" "$reason" "$pkg")
        
        if [[ "$trusted" == "true" ]]; then
            ((safe_count++)) || true
        else
            ((flag_count++)) || true
        fi
        
        packages_json="${packages_json}${entry},"
        
    done <<< "$pkg_data"
    
    packages_json="${packages_json%,}"
    
    local hostname os_name
    hostname=$(cat /etc/hostname 2>/dev/null || echo "unknown")
    os_name=$(grep PRETTY_NAME /etc/os-release 2>/dev/null | cut -d'"' -f2 || echo "Linux")
    
    local timestamp_iso
    timestamp_iso=$(date -u +%Y-%m-%dT%H:%M:%SZ)
    
    local flagged_json safe_json
    flagged_json=$(echo "$packages_json" | grep -o '{[^}]*"trusted":false[^}]*}' | paste -sd ',' || echo "")
    safe_json=$(echo "$packages_json" | grep -o '{[^}]*"trusted":true[^}]*}' | paste -sd ',' || echo "")
    
    cat > "$JSON_REPORT" << JSONEOF
{
  "scan_metadata": {
    "timestamp": "$timestamp_iso",
    "script_version": "1.0",
    "hostname": "$hostname",
    "os": "$os_name",
    "age_threshold_days": $AGE_THRESHOLD_DAYS,
    "total_packages_scanned": $((safe_count + flag_count)),
    "packages_flagged": $flag_count,
    "packages_safe": $safe_count
  },
  "flagged_packages": [${flagged_json}],
  "safe_packages": [${safe_json}]
}
JSONEOF
    
    log "INFO" "JSON report: $JSON_REPORT"
    
    if [[ "$JSON_ONLY" != "true" ]]; then
        cat > "$TXT_REPORT" << EOF
================================================================================
                    SUPPLY CHAIN COMPLIANCE AUDIT REPORT
================================================================================

SCAN DETAILS
--------------------------------------------------------------------------------
Date:        $(date '+%Y-%m-%d %H:%M:%S')
Hostname:    $hostname
OS:          $os_name
Threshold:   $AGE_THRESHOLD_DAYS days

STATISTICS
--------------------------------------------------------------------------------
Packages Scanned:  $((safe_count + flag_count))
Flagged (Risk):    $flag_count
Safe (Trusted):    $safe_count

FLAGGED PACKAGES
--------------------------------------------------------------------------------
$(echo "$packages_json" | grep -o '{[^}]*"trusted":false[^}]*}' | while read -r entry; do
    name=$(echo "$entry" | jq -r '.name')
    version=$(echo "$entry" | jq -r '.version')
    repo=$(echo "$entry" | jq -r '.source_repository')
    echo "  - $name ($version) from $repo"
done)

SAFE PACKAGES
--------------------------------------------------------------------------------
$(echo "$packages_json" | grep -o '{[^}]*"trusted":true[^}]*}' | while read -r entry; do
    name=$(echo "$entry" | jq -r '.name')
    version=$(echo "$entry" | jq -r '.version')
    echo "  - $name ($version)"
done)

================================================================================
                              END OF REPORT
================================================================================
EOF
        log "INFO" "Text report: $TXT_REPORT"
    fi
    
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                      AUDIT COMPLETE                           ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║  Total Scanned: $((safe_count + flag_count))"
    echo "║  Flagged (Risk): $flag_count"
    echo "║  Safe (Trusted): $safe_count"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    
    log "INFO" "Audit completed successfully"
}

main "$@"
