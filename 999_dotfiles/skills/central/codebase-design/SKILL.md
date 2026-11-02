---
name: codebase-design
description: "Design deep modules and ns seams. Use when defining interfaces, depth, or adapter boundaries."

---

# Codebase Design — Clojure Patch
## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill codebase-design
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

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
