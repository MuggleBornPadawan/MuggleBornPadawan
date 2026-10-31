---
name: code-review
description: >-
  Review git diff or files for bugs, security vulnerabilities, performance, and Clojure/lean-machine conventions. Use when: review diff, pr review, security audit, lint.
---

# Code Review & Quality Audit
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill code-review
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Review the specified namespace, file, or the current git diff sequentially.

**Anti-Pattern Warning (The PR Rubber-Stamp Trap):** Never perform superficial 10-minute browser diff reviews that only comment on variable names or minor syntax while transferring blind responsibility. Code review is active verification: check out the branch, run test suites (`bb test`), and trace execution.

Look for:
1. Bugs and logic errors
2. Security vulnerabilities
3. Performance issues
4. Naming, readability, and missing error handling
5. Architectural invariant violations: cross-domain queries, raw SQL in pure domain logic, hardcoded configs/credentials (see `codebase-design/references/invariants.md`)

For each finding report: severity (critical/major/minor), `file:line`, what's wrong, and a concrete suggested fix.
If the diff is large, prioritize critical and major findings first.

Clojure / lean-machine (AGENTS.md):
- Also check: `clj-kondo --lint src` warnings, `cljfmt` drift, unused `ns` requires, non-idiomatic `->`/`->>` threading, data-oriented violations, new deps added without asking.
- Batch heavy checks: prefer `bb` on 6 Gi box; avoid memory-heavy tooling.
- Respect `AGENTS.md` stack: `deps.edn` + Clojure CLI 1.12.6 preferred, `bb` for scripts, `SQLite :memory:` for local tests, `PostgreSQL` for prod.
> **Delegation:** Prompt `review.md` delegates here — do not duplicate logic. Prompt is slash-command entry; this skill is the engine.
