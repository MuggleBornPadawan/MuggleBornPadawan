---
name: brainstorming
description: "Brainstorm features into designs. Use when creating components, adding functionality, or modifying behavior before code."

---

# Brainstorming Ideas Into Designs

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill brainstorming
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Classify how much process is needed, then understand → refine → present → get approval.

<HARD-GATE>
Do NOT invoke implementation skill, write code, or scaffold until human approves intent. Ceremony scales, gate never does.
</HARD-GATE>

## Three Paths — classify out loud

- **Spike** — feasibility ("can we..."), output is answer not kept code. 2-3 sentence probe plan, get nod, investigate cheaply, report throwaway.
- **Bounded** — well-scoped change to existing flow (flag, endpoint, one file). No existing flow = not bounded. Questions → short design IN CHAT → STOP, wait explicit yes. No spec file.
- **Architectural** — new project/subsystem, reshapes interfaces. Full: questions → 2-3 approaches → sectioned design → spec → `writing-plans`.

When in doubt, take heavier path. Hidden complexity upgrades path — stop, say so.

## Anti-Pattern: "Too Simple To Need Approval"
Every path needs approval. Two sentences in chat is enough for simple, but must present + wait.

## Red Flags
| Thought | Reality |
|---|---|
| "Too simple" | Short design, not no design. |
| "I'll call it bounded and skip spec" | Doubt = heavier path. |
| "I'll start while they read" | Gate is approval. Stop. |
| "I know this app kind" | Bounded = repo has flow, not familiarity. |
| "Spike works, keep code" | New request — re-classify. |
| "Approved spike → follow-up approved" | Each task own classification. |

## Checklist

**Spike:** 1 Explore context 2 Probe plan 2-3 sentences 3 Get approval 4 Investigate 5 Report throwaway

**Bounded:** 1 Explore context 2 Ask clarifying (one at a time) 3 Short design in chat (approach/files/tests) 4 Get approval STOP 5 Implement via TDD (no plan doc)

**Architectural:** 1 Explore context 2 Offer visual companion just-in-time (see below) 3 Ask clarifying 4 Propose 2-3 approaches with trade-offs 5 Present design sections, approval per section 6 Write spec to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` + commit 7 Self-review (placeholders/consistency/scope/ambiguity) 8 User reviews spec 9 Invoke `writing-plans`

## Process & Flow Detail
→ `references/process.md` (dot graph, full Understanding/Approaches/Presenting, After Design)
→ Visual companion: offer just-in-time as own message, per-question browser vs terminal. Full guide: `visual-companion.md`
