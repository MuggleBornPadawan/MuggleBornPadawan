---
name: to-spec
description: "Synthesize conversation into spec. Use when writing spec for ns seams via docs/specs."
disable-model-invocation: true
---

# To Spec -- Central + Clojure Patch

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill to-spec
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Synthesize the active conversation, decisions, and codebase context into a clean, actionable specification. Do NOT start a new interview. Synthesize what is already decided.

> **Merged:** central `docs/specs/` routing + `mattpocock/skills:to-spec` Clojure adaption (lean, `ns` seams, `deps.edn`). See original at `https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec`.

## Issue Tracker Vocabulary

Check `docs/agents/issue-tracker.md` or ask which tracker (`GitHub Issues`, `Linear`, or local `.scratch/` files). For new Clojure projects with no tracker, default to local `docs/specs/<feature-slug>.md` and note it. Apply `ready-for-agent` triage label when publishing to tracker.

## Process

1. **Explore repo & domain context** -- Use `CONTEXT.md` vocabulary, respect ADRs in `docs/adr/`. Check `deps.edn` (preferred) vs `project.clj`. Note test runner (`clojure -M:test` / `bb test` / `lein test`), lint (`clj-kondo`), formatter (`cljfmt`). Do not propose `npm`/`tsc`.

2. **Sketch seams** -- Existing seams preferred to new ones. Use highest seam possible. Fewer seams is better -- ideal is one.
   - **Clojure seam:** public `ns` API (public `defn`s, not `defn-`). Prefer pure-function seams that take data and return data. For I/O (DB, HTTP), put seam at protocol/port boundary so you can swap `PostgreSQL` ↔ `SQLite`/in-memory fake.
   - Ask: "What's the public ns API, and which seams should we test?" Check with user. Invoke `codebase-design` if seam placement needs design review.

3. **Write spec** -- Save to `docs/specs/<feature-slug>.md` in repo. If tracker CLI (`gh`, `glab`) explicitly requested, also publish body there. Use template below.

## Spec Template -- Data-Oriented, Accepts Both Styles

Use this markdown structure:

```markdown
# Spec: <Feature Name>

## 1. Problem Statement
Concise problem from user's perspective (<2 paragraphs).

## 2. Proposed Solution
High-level architectural approach (user's perspective).

## 3. Namespace Seams & Public API
- Primary `ns`: `<project>.<domain>.<feature>`
- Public fns: `(<fn-name> [arg1 arg2]) -> return`
- Namespaces modified: `app.orders`, `app.billing`
- Pure transformations vs stateful boundaries (DB, side-effects)

## 4. Data Contracts & Schemas
Inputs, outputs, internal state as EDN maps or Malli schemas:
```clojure
{:feature/id   uuid?
 :feature/status #{:pending :active :completed}}
```
- DDL for PostgreSQL (prod) / SQLite (local) or `clojure.spec` / `malli`.
- API contracts: EDN/JSON shapes, handler signatures.
- Specific interactions between namespaces.

## 5. User Stories
Extensive numbered list, one per line:
1. As an <actor>, I want a <feature>, so that <benefit>
Example: 1. As a mobile bank customer, I want to see balance, so that I can make informed spending decisions.

## 6. Acceptance Criteria
Bulleted checklist of testable behaviours (not generic boilerplate):
- [ ] Returns expected output map when given valid input.
- [ ] Rejects invalid payload with `:error/type`.
- [ ] Preserves deterministic behavior when seeded.

## 7. Verification & Test Plan
- **Test namespace:** `<project>.<domain>.<feature>-test`
- **Runner:** Live REPL socket, `bb test -n <ns>`, or `clojure -M:test -n <ns>`.
- **Seams tested:** public `ns` API only, not `defn-` internals.
- **Gates:** `clj-kondo --lint src`, `cljfmt check`.
- **Edge cases:** nil handling, boundary conditions, concurrency.
- Prior art: similar `clojure.test` tests in codebase.

## 8. Out of Scope
What this change will NOT do.

## 9. Further Notes
REPL-driven workflow expectations (Emacs/CIDER), deps choice (`deps.edn` + `clojure CLI 1.12.6`, `neil` + `bb`).

> Do NOT include specific file paths or code snippets -- they stale fast. Exception: prototype snippet that encodes a decision more precisely than prose (state machine, reducer, schema). Trim to decision-rich parts, note it came from prototype.
```

## Clojure Notes for Implementation Decisions

- Prefer `deps.edn` + `clojure CLI` (1.12.6); `project.clj`/`lein` only if repo already uses it.
- Keep dependencies minimal; use `neil` to add, `bb` for shell scripts.
- Keep functions data-oriented, idiomatic `->`/`->>` threading, clean namespaces.

## After Writing

- If prototype existed, cite its path and what it proved.
- Ensure no `npm`/`tsc` assumptions; verification is `bb test` or `clojure -M:test`.
