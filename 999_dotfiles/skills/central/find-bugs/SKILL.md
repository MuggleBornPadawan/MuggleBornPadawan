---
name: find-bugs
description: >-
  Proactively hunt for edge cases, error handling flaws, concurrency issues, and resource leaks.
---

# Proactive Bug Hunting & Vulnerability Scanner
## Preamble (run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill find-bugs
```
- Read SESSION_ID. Use for skill-end at close.

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
