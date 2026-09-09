---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up. Clojure-adapted: references specs/tickets/ADRs by path, lean temp-dir save.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

# Handoff — Clojure Patch

Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save to the **temporary directory** of the user's OS — not the current workspace (avoids polluting `src/`).

> **Clojure adaption of `mattpocock/skills:handoff`.** Pure Markdown, 0 deps. See original at `https://github.com/mattpocock/skills/tree/main/skills/productivity/handoff`. Location: `~/.agents/skills/handoff/` (global). `/reload` after edit.

## Where to Save

- Linux (this machine, Debian 12): `/tmp/<feature>-handoff-<date>.md` or `$TMPDIR` if set. Use `echo $TMPDIR` if unsure.
- Do not save to `src/`, `test/`, `.scratch/` unless user explicitly asks — temp dir is ephemeral by design. If user wants persistence, note the temp path and offer to copy to `.scratch/<feature>/handoff.md`.

## What to Include

Keep it **compact** — reference, don't duplicate.

1. **Context (2-3 lines):** What the original task was, in `CONTEXT.md` vocabulary.
2. **Done:** Commits / files changed (`git log --oneline <base>..HEAD`), specs/tickets closed. Reference by path: `.scratch/<slug>/spec.md`, `.scratch/<slug>/issues/01-*.md`, `docs/adr/0001-*.md`. Do not paste their bodies.
3. **Now / Next:** Current frontier — which tickets are `ready-for-agent` (blocking edges satisfied) vs blocked. If using local `.scratch/`, list `NN` numbers.
4. **How to verify (Clojure):**
   ```
   bb test -n my.ns          # or clojure -M:test -n my.ns
   clj-kondo --lint src
   cljfmt check
   ```
   Note the exact command that gives green, and which `ns` seam to test.
5. **Suggested skills for next agent** — name them via `Skill tool` invocation, e.g.:
   - `Skill: to-tickets` if spec still needs slicing
   - `Skill: implement` if frontier tickets ready
   - `Skill: diagnosing-bugs` if bug still open
   - `Skill: code-review` before commit
   - `Skill: codebase-design` / `Skill: domain-modeling` if seam or glossary still open
6. **Open questions / Decisions deferred:** What the next agent must ask the human.
7. **Paths, not bodies:** Every artifact is a path/URL: `git diff main...HEAD`, `.scratch/...`, `docs/adr/...`. No code dumps.

## What to Omit

- Do not duplicate content already captured in specs, plans, ADRs, issues, commits, diffs. Reference by path/URL instead.
- Do not include secrets, `DATABASE_URL`, `SESSION_TOKEN`. Redact to `<REDACTED>` and note `env var` name.
- Do not include full chat transcript — compress to decisions + frontier.

## Clojure Guardrails

- Mention `deps.edn` vs `project.clj` choice if made, and test runner chosen (`bb` vs `clojure -M:test`).
- If `nREPL` / CIDER REPL was running, note host/port if safe, else just "REPL available".
- Keep it lean: this machine has 11 GB free — don't write large logs to handoff; reference `logs/` path instead.

## If User Passed Arguments

Treat them as "what the next session will focus on" and tailor the doc. E.g. `"/handoff implement ticket 03"` → focus handoff on that ticket's seams + verification command.

## Template

```md
# Handoff — <feature>

**Date:** 2026-09-10
**From:** <session id>
**Temp file:** /tmp/<slug>-handoff.md

## Context
One paragraph, CONTEXT.md terms.

## Done
- spec: .scratch/<slug>/spec.md
- tickets: .scratch/<slug>/issues/01-..., 02-...
- commits: a1b2c3d — feat(x): …

## Now — Frontier
- Ready: 03 — <title> (blocked by 01)
- Blocked: 04 — <title> (blocked by 03)

## Verify (Clojure)
bb test -n app.orders
clj-kondo --lint src

## Next Agent — Suggested Skills
Skill: implement, Skill: code-review

## Open Questions
- …

## References
- diff: git diff main...HEAD
- ADR: docs/adr/0002-*.md
```

After writing, print the temp file path and ask if user wants it copied to `.scratch/<feature>/handoff.md` for persistence.
