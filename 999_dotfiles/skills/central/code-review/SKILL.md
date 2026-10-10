---
name: code-review
triggers: [review diff, pr review, security audit, lint]
anti-triggers: [fix, find-bugs]
description: >-
  Review git diff or files for bugs, security vulnerabilities, performance, and Clojure/lean-machine conventions.
---

# Code Review & Quality Audit
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill code-review
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Review the specified namespace, file, or the current git diff sequentially.

Look for:
1. Bugs and logic errors
2. Security vulnerabilities
3. Performance issues
4. Naming, readability, and missing error handling

For each finding report: severity (critical/major/minor), `file:line`, what's wrong, and a concrete suggested fix.
If the diff is large, prioritize critical and major findings first.

Clojure / lean-machine (AGENTS.md):
- Also check: `clj-kondo --lint src` warnings, `cljfmt` drift, unused `ns` requires, non-idiomatic `->`/`->>` threading, data-oriented violations, new deps added without asking.
- Batch heavy checks: prefer `bb` on 6 Gi box; avoid memory-heavy tooling.
- Respect `AGENTS.md` stack: `deps.edn` + Clojure CLI 1.12.6 preferred, `bb` for scripts, `SQLite :memory:` for local tests, `PostgreSQL` for prod.
> **Delegation:** Prompt `review.md` delegates here — do not duplicate logic. Prompt is slash-command entry; this skill is the engine.

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
