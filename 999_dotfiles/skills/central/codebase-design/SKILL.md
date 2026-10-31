---
name: codebase-design
description: >-
  Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam goes, make code more testable or AI-navigable, or when another skill needs the deep-module vocabulary. Clojure-adapted: ns seams, pure fns, data-oriented examples.
---

# Codebase Design — Clojure Patch
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill codebase-design
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Use when designing **deep modules**: small interface, deep implementation, testable at seam.

## Quick Vocab (full in `references/glossary.md`)
| Term | Meaning |
|---|---|
| Module | ns + interface + implementation |
| Interface | public defns + spec + invariants + error modes |
| Seam | where interface lives (ns / protocol) |
| Adapter | impl that satisfies seam |
| Depth | leverage per interface unit |
| Locality | change concentrates in one ns |

## Principles (full in refs)
- Depth = leverage, not lines. Deletion test: if deleted, does complexity vanish (shallow) or scatter (deep)?
- Interface = test surface. One adapter = hypothetical, two = real seam.
- 4 Invariants: Data Authority, Minimal Runtime, Persistence Seam, Config as Data (see `references/invariants.md`).

## References
- Full glossary: `references/glossary.md`
- Invariants checklist: `references/invariants.md`
- Deepening: `DEEPENING.md` | Design it twice: `DESIGN-IT-TWICE.md`
