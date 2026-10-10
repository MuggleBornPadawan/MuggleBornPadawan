---
name: codebase-design
triggers: [deep module, seam, interface design, depth]
anti-triggers: [shallow pass-through]
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

## References
- Full glossary: `references/glossary.md`
- Deepening: `DEEPENING.md` | Design it twice: `DESIGN-IT-TWICE.md`

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
