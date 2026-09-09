Diagnose and fix this problem:

{{error|description of the bug or the stack trace}}

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
