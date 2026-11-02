---
name: handoff
description: "Create session handoff doc. Use when compacting context for next agent via docs/handoffs."

---

# Handoff -- Central + Clojure Patch

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill handoff
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Write a handoff document summarising the current conversation so a fresh agent can continue without context bloat. Save efficiently -- reference, don't duplicate.

> **Merged:** central harness-sync routing + `mattpocock/skills:handoff` Clojure adaption (lean, `ns` seams, `deps.edn`). Original at `https://github.com/mattpocock/skills/tree/main/skills/productivity/handoff`.

## Where to Save

- **Default (central):** `docs/handoffs/<YYYY-MM-DD-HHmm>-<slug>.md` in current repo -- persistent, commit if useful.
- **Ephemeral/lean:** `/tmp/<feature>-handoff-<date>.md` or `$TMPDIR` if set (this machine: Debian 12, 6.3 Gi RAM, ~10 GB free -- prefer temp for large logs). Use `echo $TMPDIR` if unsure.
- Do not save to `src/`, `test/`, `.scratch/` unless user explicitly asks. If user wants persistence from temp, offer to copy to `.scratch/<feature>/handoff.md` or `docs/handoffs/`.

## What to Include -- Compact, Paths Not Bodies

1. **Context (2-3 lines):** Original task in `CONTEXT.md` vocabulary.
2. **Done:** Commits / files changed (`git log --oneline <base>..HEAD`), specs/tickets closed. Reference by path: `docs/specs/<slug>.md`, `docs/tickets/<slug>/01-*.md`, `.scratch/<slug>/spec.md`, `docs/adr/0001-*.md`. Do not paste bodies.
3. **Now / Next -- Frontier:** Which tickets are `ready-for-agent` (blocking edges satisfied) vs blocked. List `NN` numbers.
4. **How to Verify (Clojure):**
   ```
   bb test -n my.ns          # or clojure -M:test -n my.ns
   clj-kondo --lint src
   cljfmt check
   ```
   Note exact command that gives green and which `ns` seam to test.
5. **Suggested Skills for Next Agent:**
   - `to-tickets` if spec still needs slicing
   - `implement` if frontier tickets ready
   - `diagnosing-bugs` if bug open
   - `code-review` before commit
   - `codebase-design` / `domain-modeling` if seam or glossary open
6. **Open Questions / Decisions Deferred:** What next agent must ask human.
7. **Environment State:** `git status -s` dirty files, active socket REPL / server ports if applicable.
8. **Paths, not bodies:** Every artifact as `file://` link or `git diff main...HEAD`. No code dumps.

## What to Omit

- Do not duplicate specs/plans/ADRs/commits -- reference by path/URL.
- Do not include secrets, `DATABASE_URL`, `SESSION_TOKEN`. Redact to `<REDACTED>`.
- Do not paste full chat transcript -- compress to decisions + frontier.

## Clojure Guardrails

- Mention `deps.edn` vs `project.clj` choice and test runner (`bb` vs `clojure -M:test`).
- If `nREPL` / CIDER REPL was running, note host/port if safe, else "REPL available".
- Keep lean: don't write large logs to handoff; reference `logs/` path.

## If User Passed Arguments

Treat as focus for next session. E.g. `"/handoff implement ticket 03"` → focus handoff on that ticket's seams + verification command.

## Template -- Use This Structure

```md
# Handoff -- <feature>

**Date:** 2026-09-10
**From:** <session id>
**Target:** 1-sentence goal
**File:** docs/handoffs/<YYYY-MM-DD-HHmm>-<slug>.md (or /tmp/<slug>-handoff.md)

## Context
One paragraph, CONTEXT.md terms.

## Done
- spec: docs/specs/<slug>.md or .scratch/<slug>/spec.md
- tickets: docs/tickets/<slug>/01-..., 02-...
- commits: a1b2c3d -- feat(x): …

## Now -- Frontier
- Ready: 03 -- <title> (blocked by 01)
- Blocked: 04 -- <title> (blocked by 03)

## Verify (Clojure)
bb test -n app.orders
clj-kondo --lint src

## Next Agent -- Suggested Skills
implement, code-review

## Open Questions
- …

## References
- diff: git diff main...HEAD
- ADR: docs/adr/0002-*.md
- git status: <dirty files>
- runtime: REPL <host:port> or none
```

After writing, print file path and ask if user wants temp copy persisted to `docs/handoffs/`.
