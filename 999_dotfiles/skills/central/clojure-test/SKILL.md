---
name: clojure-test
description: >-
  Write and run tests adhering to Clojure/lean-machine conventions, public ns seams, and bb/clojure.test.
---

# Test Authoring & Verification (Clojure / Polyglot)

## Preamble (run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill clojure-test
```
- Read `SKILL_START_PROTO`, `SESSION_ID`, `TEL_START`.
- If missing: use safe defaults. Continue task. Report stale install.
- At end:
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --skill clojure-test --outcome success --session-id SESSION_ID
```

Write tests for the specified namespace or target code sequentially. Do not run parallel test workers.

Rules:
1. Match the existing test framework and style in this project — look at neighboring test files first
2. Cover the happy path first, then edge cases, error paths, and boundary values
3. One behavior per test; use descriptive test names that read as specifications
4. Arrange–Act–Assert structure; keep fixtures minimal
5. Do not modify production code to make testing easier unless you flag it explicitly

Clojure / lean-machine (AGENTS.md):
- Test at the public `ns` seam: public `defn`, not `defn-`. Pure data in -> data out.
- Runner priority: `bb test -n my.ns` (fast, low RAM on 6 Gi) -> `clojure -M:test -n my.ns` -> `lein test`.
- Use `clojure.test` + `bb`; ask before adding `test.check`/`criterium`. Keep deps minimal.
- Style: idiomatic `->`/`->>` threading, clean `ns` requires; respect `clj-kondo` + `cljfmt`.

Run the tests when done and report results (`bb test -n <ns>` + `clj-kondo --lint src` if Clojure).

## QA evidence (full notes)
- For each probe: write `.context/exploration-NNN.json`.
- Fields: `result`, `assumption`, `next`.
- Link notes in final report.
- For each bug:
  - Reproduce first.
  - Write failing test. Must fail before fix.
  - Fix cause. Re-run. Must pass after.
  - Check adjacent paths.
- Report blocks:
  - `FAIL`: with command + expected + actual.
  - `BLOCKED`: with cause + untested contracts.
  - `UNTESTED`: list what you did not check.
- Bounded run: stop at deadline. Show unfinished checks. No silent pass.
