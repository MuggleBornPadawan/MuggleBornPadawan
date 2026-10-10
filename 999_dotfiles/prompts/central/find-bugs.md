---
name: find-bugs
description: Hunt bugs in file/module (edge cases, error handling, concurrency, leaks). Delegates to find-bugs skill.
argument-hint: "[file|module]"
---

Proactively hunt bugs in {{ARGS}} (file or module).

Delegates to `find-bugs` skill for full workflow. Do not duplicate logic here.
Quick prompt path:
1. Read relevant code (no speculation without reading)
2. Check: edge cases | error handling | concurrency/state | resource leaks | off-by-one/timezone/overflow
3. For each finding: scenario that triggers, likelihood × impact, concrete fix
4. Write failing test for confirmed bugs

If detailed scan needed, invoke skill `find-bugs`.
