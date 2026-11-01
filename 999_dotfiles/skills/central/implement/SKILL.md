---
name: implement
description: "Implement a piece of work based on a spec or set of tickets. Clojure-adapted: TDD at ns seams, clojure.test, clj-kondo, REPL-friendly."
disable-model-invocation: true
---

# Implement — Clojure Patch

Implement the work described by the user in the spec or tickets.

> **Clojure adaption of `mattpocock/skills:implement`.** Pure Markdown, no deps. Lean-machine safe. See original at `https://github.com/mattpocock/skills/tree/main/skills/engineering/implement`.

## Pi Global Install

- Location: `~/.agents/skills/implement/` (global). Run `/reload` after edit.

## Preconditions

- Spec or tickets exist (from `/to-spec` or `/to-tickets`). If not, synthesize from current conversation and confirm seams with user.
- Seams are pre-agreed: public `ns` APIs. If not agreed, ask now.
- Respect `CONTEXT.md` vocabulary and `docs/adr/` decisions.

## Process — Clojure Loop

For each ticket (or the single spec if no tickets), do:

### 1. Drive TDD at the seam

- Use `/skill:test-driven-development` (or `clojure.test` directly) — one vertical slice: **one failing test → minimal code → green**.
- Seam = public `defn` in a `ns`. Do not test `defn-` internals. Test data in → data out.
- Runner: pick what the repo uses, in order: `bb test` → `clojure -M:test` → `lein test`. For quick feedback, `clojure -M:test -n <ns>` or REPL eval in Emacs/CIDER.
- Keep tests behaviour-focused. No mocks unless port/adapter truly needs it.

### 2. Fast feedback gates (often, lightweight)

- `clj-kondo --lint src test` — type/shape lint (replaces `tsc`)
- `cljfmt check` if present
- Single ns test run: `clojure -M:test -n my.ns` or `bb test --ns my.ns`
- Keep machine lean: avoid running full suite every cycle on this 6 Gi box; run targeted ns first, full suite at end.

### 3. Full verification (once, at end of ticket)

- `clojure -M:test` (or `bb test` / `lein test`) — whole suite, must be green
- `clj-kondo --lint src` — no new warnings

### 4. Code review, then commit

- Once green, run `/skill:code-review` against the ticket's fixed point (`git diff main...HEAD` or ticket branch). Address findings if cheap; otherwise note as follow-up ticket.
- Commit to current branch. Use conventional commit msg referencing ticket id: `feat(<ns>): <what> (#<id>)`. Do not push without asking.

## Lean-Machine Notes

- Modest CPU/RAM: prefer `bb` for scripts, run JVM tests in focused ns, not whole suite in tight loop.
- Do not add dependencies without asking (per `AGENTS.md`). Use `neil add ...` only after user approves.
- REPL-driven: structure code so it can be eval'd in CIDER (`(comment ...)` blocks OK), but do not skip `clojure.test` coverage.

## Anti-Patterns to Avoid

- Horizontal slicing (all tests first, then all impl) — work vertical per ticket.
- Testing internals (`defn-`). If you need to test past the seam, the seam is wrong — fix seam via `codebase-design`.
- `npm`/`tsc` commands — never in this stack.

## Handoff

If interrupted, write `.scratch/<feature>/handoff.md` with done / next ticket / frontier, so next session can resume via `/skill:to-tickets` frontier.
