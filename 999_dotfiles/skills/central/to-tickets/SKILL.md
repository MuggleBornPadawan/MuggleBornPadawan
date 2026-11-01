---
name: to-tickets
description: "Break spec/plan/conversation into tracer-bullet vertical tickets with blocking edges. Clojure-adapted: slice via ns APIs, expand-contract for wide refactors. Use when: tickets, tracer bullet, blocked by, vertical slice."
disable-model-invocation: true
---

# To Tickets -- Central + Clojure Patch

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill to-tickets
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`
- Run at end:
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --skill to-tickets --outcome success --session-id $SESSION_ID
```

Break a plan, spec, or conversation into **tracer-bullet tickets**: narrow end-to-end vertical slices, each declaring **blocking dependencies**.

> **Merged:** central ticket file conventions (`docs/tickets/`) + `mattpocock/skills:to-tickets` Clojure adaption (vertical slices, `ns` APIs, `expand-contract`). Original at `https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets`.

## Slice Rules

1. **Vertical, not horizontal:**
   - Each slice cuts through whole path: `malli`/`spec` + `ns` public fns + handler/repo + `clojure.test` at seam + (if needed) `SQLite`/`PostgreSQL` migration. UI is optional; when no UI, demo is REPL call or `bb` task.
   - Do not create single-layer tickets (e.g., "build all schemas").
2. **Context Window Constraint:** Each ticket fits in single fresh context window (<32k, ~one `ns`, few fns).
3. **Executable & Verifiable:** Each completed ticket is runnable via `clojure -M:test`, `bb test`, or REPL eval on its own.
4. **Expand-Contract for Wide Refactors:** When a change fans across codebase (rename EDN key, retype shared spec) -- no vertical slice can land green:
   - **Expand:** Add new form beside old so nothing breaks.
   - **Migrate:** Update call sites in batches per `src/` subdir or `ns`, each batch its own ticket blocked by expand, keeping CI green.
   - **Contract:** Delete old form once no caller remains, blocked by every migrate batch.
   - If batches can't stay green alone, share an integration branch and block a final `integrate-and-verify` ticket; green promised only there.
5. **Prefactoring First:** Scan `deps.edn` / `project.clj`, `src/` layout, `bb.edn` tasks. Look to prefactor to make slices easy -- "make the change easy, then make the easy change."

## Process

### 1. Gather Input
Work from conversation context. If user passes reference (spec path `docs/specs/<slug>.md`, issue URL, plan), fetch and read full body + comments. Use `CONTEXT.md` vocabulary, respect `docs/adr/`.

### 2. Explore Codebase (if needed)
If not already explored, scan `deps.edn`/`project.clj`, `src/` ns layout, test runner, `bb.edn` tasks, DB choice (PostgreSQL vs SQLite) so slices pick right seam.

### 3. Draft Vertical Slices
- Number sequentially `01`, `02`, `03`... in dependency order (blockers first).
- Define explicit **Blocked by** -- tickets that must complete first. No blockers = "can start immediately".
- Quiz user -- present table:
  | ID & Title | Blocked by | Delivered Behavior |
  Ask:
  - Is granularity right? (too coarse / too fine)
  - Are blocking edges correct -- does each only depend on genuine gates?
  - Merge or split further?
  Iterate until user approves.

### 4. Publish to Tracker

**How** depends on `docs/agents/issue-tracker.md` / `/setup-matt-pocock-skills` config -- tickets same, shape differs:

- **Local files (default `docs/tickets/<feature-slug>/`):** Write one file per ticket `docs/tickets/<slug>/<NN>-<slug>.md` (or `.scratch/<feature-slug>/issues/<NN>-<slug>.md` for legacy). Use template below -- one ticket per file, never combined.
- **Real tracker (GitHub, Linear, …):** Publish one issue per ticket in dependency order so blocking edges use real IDs. Use platform's native blocking / sub-issue where available; otherwise set "Blocked by" to blocking issues. Apply `ready-for-agent` label.

Work the **frontier:** any ticket whose blockers are all done. For linear chain, top to bottom.

### Ticket File Template -- `docs/tickets/<slug>/<NN>-<slug>.md`

```markdown
# <NN>: <Ticket Title>

**Delivered Behavior:**
Concise end-to-end behaviour this ticket makes work (user perspective, not layer list).

**Blocked By:**
- `<MM>-<slug>` (or "None: can start immediately")

**Status:** ready-for-agent

**Clojure seam:** `ns`/public `defn` under test (e.g. `app.orders/create-order`)

**Acceptance Criteria:**
- [ ] Core transformation handles valid data in REPL.
- [ ] Boundary integration verified with `clojure.test`.
- [ ] Edge cases (nil, invalid shape) tested.
- [ ] Criterion is behaviour, not impl (not `defn-` internals)
```

Legacy local alternative (`.scratch/issues/`):

```markdown
# <NN>: <Ticket title>

**What to build:** End-to-end behaviour, user perspective.

**Blocked by:** Numbers/titles of gating tickets, or "None (can start immediately)".

**Status:** ready-for-agent

**Clojure seam:** `ns`/public `defn` and verification: `clojure -M:test` or `bb test` or REPL snippet.

- [ ] Acceptance criterion 1 (observable via public API)
- [ ] Acceptance criterion 2
```

Avoid specific file paths or code snippets -- they stale fast. Exception: prototype snippet that encodes decision precisely; trim to decision-rich parts, note provenance.

## Clojure Guardrails

- No `npm`/`tsc`. Use `clojure -M:test`, `bb test`, `clj-kondo --lint`, `cljfmt check`.
- Prefer `deps.edn`; respect existing `project.clj`. Keep deps minimal -- ask before adding.
