---
name: linux-security
description: Audit and remediate Debian 12 / Crostini security configurations (POSIX, ACLs, UFW, and AppArmor)
---

INSPECTION-ONLY DEFAULT: Run checks and report. Only remediate if user explicitly says `remediate` or `fix`.

Audit and remediate system security for: {{target|path or host, default to local Debian container}}

Execute inspection, anti-pattern detection, and compliance verification across container security primitives:

## 1. Inspection Protocol

Run non-destructive checks:
- **POSIX Permissions:** Find world-writable or insecure permissions.
  ```bash
  find {{target}} -type f -perm -002 ! -path "*/tmp/*"
  ```
- **Extended ACLs:** Check for broad grants.
  ```bash
  getfacl -R {{target}} 2>/dev/null | grep -E "group::rwx|other::rwx"
  ```
- **Mandatory Access Control (AppArmor):** Check service confinement.
  ```bash
  aa-status
  ```
- **Firewall (UFW):** Check active rules and status.
  ```bash
  sudo ufw status verbose
  ```

## 2. Anti-Pattern Detection Matrix (Debian / Crostini)

| Pattern ID | Signature | Risk | Remediation |
|------------|-----------|------|-------------|
| **SEC-AP-01** | `chmod -R 777` or broad `a+rwx` | CRITICAL | Restore package integrity (`dpkg --verify`) or reset dirs to `0755`, files to `0644`, secrets to `0600`. |
| **SEC-AP-02** | `setfacl -R -m ... o::rwx` | CRITICAL | Purge global ACLs: `setfacl -R -b <path>`. Apply narrow grants only. |
| **SEC-AP-03** | Disabling AppArmor / security modules | HIGH | Keep security profiles enforced. Use `aa-enforce` on profiles. |
| **SEC-AP-04** | Disabling UFW / flushing firewall | HIGH | Maintain default deny inbound policy: `sudo ufw default deny incoming`, `sudo ufw default allow outgoing`. |

## 3. Surgical Remediation Protocols

- **POSIX Fix:** Set system dirs to `0755`, executables to `0755`, configs to `0644`, keys/secrets to `0600` owned by runtime user.
- **ACL Fix:** Strip broad ACLs (`setfacl -R -b <path>`).
- **Firewall (UFW) Fix:** 
  ```bash
  sudo ufw default deny incoming
  sudo ufw default allow outgoing
  sudo ufw allow 22/tcp
  sudo ufw enable
  ```

## 4. Post-Remediation Verification Invariants

Assert all invariants evaluate to TRUE:
1. `inv_ufw_active`: `sudo ufw status` outputs `Status: active`.
2. `inv_root_world_writable`: No files in root partition have octal mode matching `*77` except sticky directories (`/tmp`, `/var/tmp` with `1777`).
3. `inv_daemon_privilege`: No application server runs with UID `0` (`root`).

Report findings, anti-patterns detected, actions taken, and verification results.
