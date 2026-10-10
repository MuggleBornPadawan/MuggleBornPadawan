---
name: cleanup
description: Find dead code, debug leftovers, and stale comments. Use when user asks to clean up, declutter, or remove unused code.
argument-hint: "[file|directory]"
---

Clean up {{ARGS}} (file or whole project if empty).

Look for:
- Dead code: unused functions, imports, variables, CSS classes (prove via `rg` + `clj-kondo --lint src` unused-var)
- Leftover debug: console.log, print, debugger
- Commented-out code blocks
- Duplicate logic to consolidate
- Stale comments

For each item: report location + whether removal is definitely safe.
Rule: Delete ONLY what is provably unused — when in doubt, FLAG instead of deleting.
Do not change behavior. Run tests after: `bb test -n <ns>` or project runner.

Delegates to: none (analysis only). Output: table | location | safe? | action.
