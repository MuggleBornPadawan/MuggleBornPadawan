Review {{file|the current git diff}}.

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
