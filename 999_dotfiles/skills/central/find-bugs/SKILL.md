---
name: find-bugs
triggers: [edge case, error handling, concurrency, leak]
anti-triggers: [review only]
description: >-
  Proactively hunt for edge cases, error handling flaws, concurrency issues, and resource leaks.
---

# Proactive Bug Hunting & Vulnerability Scanner
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill find-bugs
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Proactively hunt for bugs in the specified namespace, file, or module sequentially.

Focus on:
1. **Edge cases** — empty inputs, null/undefined, zero, negative numbers, huge values, unicode
2. **Error handling** — swallowed exceptions, missing failure paths, unchecked results
3. **Concurrency/state** — race conditions, shared mutable state, ordering assumptions
4. **Resource leaks** — unclosed files/connections, missing cleanup on error paths
5. **Boundary assumptions** — off-by-one errors, timezone/locale issues, integer overflow

For each suspected bug: explain the exact scenario that triggers it, rate likelihood × impact, and propose a fix.
Verify claims against the actual code — no speculation without reading the relevant paths.
Write failing test cases for confirmed bugs.
> **Delegation:** Prompt `find-bugs.md` delegates here.

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
