---
name: open-source-telemetry
description: >-
  Audit, design, or implement telemetry in open-source projects. Use when adding metrics, reviewing network tracking, or enforcing privacy standards.
---

# Open Source Telemetry Standard

Follow this workflow for all telemetry design, coding, and code reviews.

## Core Principles
1. **Explicit Opt-In:** Telemetry is disabled until the user actively gives consent.
2. **Strict Allowlist:** Transmit only fields that are explicitly defined on the allowlist.
3. **Fail Silently:** Network timeouts or telemetry crashes must never interrupt user tasks.

---

## Workflow Steps

### Step 1: Verify Opt-In and Kill-Switches
Check that telemetry does NOT send data if ANY of these conditions are true:
* User did not explicitly opt in.
* Environment variable `DO_NOT_TRACK=1` exists.
* Environment variable `CI=true` exists (continuous integration environments).
* Tool-specific disable variable exists (e.g., `<TOOL>_TELEMETRY_DISABLED=1`).
* Config file contains `telemetry = false`.
* User passes `--no-telemetry`.

### Step 2: Validate Data Against Allowlist
Confirm the payload contains ONLY allowlisted fields:
* **Allowed:** OS type, CPU architecture, tool version, runtime version.
* **Allowed:** Command name invoked, execution duration (ms), exit code.
* **Allowed:** Generic error names (e.g., `FileNotFoundException`).
* **FORBIDDEN (Hard Stop):** Usernames, home directories, file paths, URLs, secrets, environment variables, code snippets, IP addresses.

### Step 3: Implement Local Transparency
* Provide a dry-run flag (e.g., `--telemetry-dry-run`) to print the JSON payload to stdout instead of sending it.
* Document the full JSON payload schema in the project README or docs.

### Step 4: Verification and Completion Criteria
Do not complete the task until you verify:
* [ ] Telemetry does not send network packets on clean install without consent.
* [ ] Telemetry halts immediately when `DO_NOT_TRACK=1` is set.
* [ ] Payload audit passes: zero file paths, zero PII, zero environment secrets.
* [ ] Automated tests pass for both enabled and disabled states.
