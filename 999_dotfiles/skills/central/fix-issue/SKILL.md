---
name: fix-issue
triggers: [bug fix, stack trace, failing test]
anti-triggers: [refactor, feature]
description: >-
  Diagnose root causes and apply minimal surgical fixes with test verification and Clojure lean-machine checks.
---

# Issue Diagnosis & Surgical Fix Protocol
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill fix-issue
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Diagnose and fix the target problem, error message, or stack trace sequentially:

Approach:
1. Reproduce or confirm the failure first (run the failing test/command if possible)
2. Form a hypothesis about the root cause before changing anything — state it explicitly
3. Verify the hypothesis by reading the relevant code (don't guess-and-patch)
4. Apply the minimal fix that addresses the root cause, not the symptom
5. Re-run to confirm the fix; check for similar issues nearby

Report: root cause, what you changed and why, and verification results.

Clojure / lean-machine (AGENTS.md):
- Reproduce via `bb test -n my.ns` (fast, low RAM) -> `clojure -M:test -n my.ns` -> `lein test`. Use REPL harness `(comment ...)` with CIDER if faster.
- Verify with `clj-kondo --lint src` and `cljfmt check` after fix. Keep deps minimal (ask before adding).
- Prefer pure data-in/data-out fixes; keep `ns` seams small, error maps via `ex-info`.
> **Delegation:** Prompt `fix.md` delegates here.

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
