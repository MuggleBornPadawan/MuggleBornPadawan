# Supply Chain Compliance Audit Scanner

A security tool for Debian/Ubuntu systems that scans for recently installed packages and identifies potential supply chain risks.

## Overview

This script audits your system's package installations to detect potentially malicious or untrusted software that may have been introduced through supply chain attacks. It flags packages that are:

- Installed within the last 7 days (configurable)
- From non-trusted or unknown repositories
- Not matching exempt patterns (kernel, security updates, etc.)

## Features

- Scans dpkg logs for recent installations
- Flags packages from untrusted repositories (e.g., cros.list, ChromeOS)
- Generates JSON and human-readable compliance reports
- Dry-run mode for safe testing
- Configurable exemptions and thresholds

## Requirements

- Debian 10+ or Ubuntu 18.04+
- Bash 4.0+
- Required tools: `dpkg`, `jq`
- Root/sudo access for package removal

## Installation

```bash
git clone <repository-url>
cd supply_chain_audit
chmod +x supply_chain_audit.sh
```

## Usage

```bash
./supply_chain_audit.sh              # Full audit
./supply_chain_audit.sh --dry        # Dry run (simulate without changes)
```

## Configuration

Edit `supply_chain_audit.sh` directly to customize:

### Age Threshold
```bash
AGE_THRESHOLD_DAYS=7
```

### Trusted Repositories
```bash
declare -A TRUSTED_REPOS
TRUSTED_REPOS=(
    ["deb.debian.org"]=1
    ["security.debian.org"]=1
    ["archive.debian.org"]=1
)
```

### Exempt Packages
```bash
declare -A EXEMPT_PKGS
EXEMPT_PKGS=(
    ["linux-image"]=1
    ["linux-headers"]=1
    ["gcc"]=1
    ["libc6"]=1
)
```

## Output Reports

Reports are saved to `./reports/`:

| File | Description |
|------|-------------|
| `quarantine_*.json` | Machine-readable flagged packages |
| `compliance_report_*.txt` | Human-readable summary |
| `integrity_log_*.log` | Detailed audit trail |

## JSON Output

```json
{
  "scan_metadata": {
    "timestamp": "2026-04-02T12:00:00Z",
    "age_threshold_days": 7,
    "total_packages_scanned": 23,
    "packages_flagged": 23,
    "packages_safe": 0
  },
  "flagged_packages": [
    {
      "name": "suspicious-package",
      "version": "1.2.3",
      "installed_on": "2026-03-30",
      "age_days": 3,
      "source_repository": "cros.list (ChromeOS - UNTRUSTED)",
      "trusted": false,
      "flags": ["untrusted_repository"],
      "removal_command": "apt remove -y suspicious-package"
    }
  ]
}
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error |

## Security Considerations

- Run with appropriate privileges (root/sudo)
- Review exemptions carefully
- Keep the script secure from tampering
- Regular audits recommended (cron weekly)

## License

MIT License
