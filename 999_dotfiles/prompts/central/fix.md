---
name: fix
description: Diagnose and surgically fix a bug/error. Delegates to fix-issue skill.
argument-hint: "[error|description]"
---

Diagnose and fix: {{ARGS}} (error message, stack trace, or bug description).

Delegates to `fix-issue` skill for full workflow.
Prompt shortcut:
1. Reproduce first — run failing test/command
2. State hypothesis before changing code — verify by reading code (no guess-and-patch)
3. Minimal fix at root cause, not symptom
4. Re-run to confirm; check nearby similar issues
5. Report: root cause, what changed + why, verification

Clojure lean: `bb test -n my.ns` -> `clojure -M:test -n my.ns` -> `lein test`; `clj-kondo --lint src` + `cljfmt check` after fix.
