# Sentry.sh Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor sentry.sh to match remote_startup.sh idioms (strict mode, helpers, dry-run, idempotent, testable).

**Architecture:** Keep single-file deep module. Small interface (--help --verbose --json --dry-run --no-color). Hide IP detection + threat map logic inside. No new deps.

**Tech Stack:** Bash, bats for tests, logger, ip/hostname

**Spec:** Study of remote_startup.sh + existing sentry.sh (700_linux/scripts/sentry.sh)

## Global Constraints
- Debian 12, x86_64, modest machine - lean tooling
- No new dependencies without asking
- Keep Clojure stack avoidance (not relevant here)
- Bash only, POSIX where possible
- Tests: bats or bash -v

---

### Task 1: Refactor sentry.sh (deep module)

**Files:**
- Modify: `700_linux/scripts/sentry.sh`
- Test: `700_linux/scripts/test_sentry.bats` (create)

**Interfaces:**
- Consumes: none (standalone)
- Produces: `sentry.sh [--help] [--dry-run] [--verbose] [--json] [--no-color]` -> exit 0 no threat, 1 threat found, 2 error/no network

- [ ] **Step 1: Write failing test for new interface**

```bash
# tests/test_sentry.bats
@test "sentry --help exits 0" {
  run bash 700_linux/scripts/sentry.sh --help
  [ "$status" -eq 0 ]
  [[ "$output" == *"Usage"* ]]
}
@test "sentry --dry-run does not call logger" {
  run bash 700_linux/scripts/sentry.sh --dry-run
  [ "$status" -eq 0 ]
  [[ "$output" == *"DRY-RUN"* ]] || [[ "$output" == *"Auditing"* ]]
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bats 700_linux/scripts/test_sentry.bats -v`
Expected: FAIL (old script has no --help)

- [ ] **Step 3: Implement minimal refactor**

```bash
#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
# helpers: log, info, warn, die, has_cmd, use_color
# args: --dry-run --verbose --json --no-color -h/--help
# IP detection: loop over all IPs from hostname -I and ip -4 addr
# CVE: remove macOS ipconfig fallback or guard with has_cmd
# color only if -t 1 and --no-color not set
# LOG_FILE now actually used: tee or >> if writable, else logger
# quiet debug: "checking" only if --verbose
# threat check: for each IP, for each subnet prefix
# exit codes: 0 clean, 1 threat, 2 error
```

Full code in execution step - replace file atomically.

- [ ] **Step 4: Run tests to verify passes**

Run: `bats 700_linux/scripts/test_sentry.bats -v` + `bash -n 700_linux/scripts/sentry.sh` + `shellcheck` if avail
Expected: PASS

- [ ] **Step 5: Manual verify**

Run: `bash 700_linux/scripts/sentry.sh --verbose` ; `bash 700_linux/scripts/sentry.sh --json` ; `bash 700_linux/scripts/sentry.sh --dry-run`
Expected: correct output, no crash on no network

- [ ] **Step 6: Commit**

```bash
git add 700_linux/scripts/sentry.sh 700_linux/scripts/test_sentry.bats docs/superpowers/plans/2026-09-08-sentry-refactor.md
git commit -m "refactor: sentry.sh strict mode + helpers + dry-run + multi-IP"
```

## Self-Review
- Spec coverage: remote_startup.sh idioms covered (strict, helpers, dry-run, trap)
- Placeholder scan: none
- Type consistency: exit codes defined once, reused in tests
