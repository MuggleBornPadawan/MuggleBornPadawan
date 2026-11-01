# Brainstorming — Process & Flow (Reference)

## Dot Graph
```dot
digraph brainstorming {
 "Classify spike/bounded/architectural" -> "Probe 2-3 sentences" [label=spike];
 "Classify" -> "Ask clarifying (bounded)" [label=bounded];
 "Classify" -> "Explore context" [label=architectural];
 "Probe" -> "Human approves?" -> "Investigate; report" [label=spike:yes];
 "Ask clarifying (bounded)" -> "Present short design in chat" -> "Human approves?" -> "Implement via normal workflow";
 "Explore context" -> "Ask clarifying" -> "Propose 2-3 approaches" -> "Present design sections" -> "User approves?" -> "Write design doc" -> "Spec self-review" -> "User reviews spec?" -> "Invoke writing-plans";
 "Hidden complexity? Upgrade path" -> "Classify";
}
```
Terminal: Architectural → only `writing-plans` next. Bounded → direct implement. Spike → report.

## The Process (bounded + architectural)
**Understanding:** check files/docs/commits. If multi-subsystem ("platform with chat/storage/billing"), flag decomposition first, then first sub-project.
Ask one question at a time, multiple-choice when possible. Focus: purpose/constraints/success criteria.
**Exploring approaches:** 2-3 with trade-offs, lead with recommendation, YAGNI.
**Presenting design:** scale sections to complexity (sentences → 200w), ask approval per section, cover architecture/components/flow/errors/testing.
**Design for isolation:** one purpose per unit, well-defined interface, independently testable.
**Existing codebases:** follow patterns, include targeted improvements only if serving goal.

## After Design (architectural only)
- Write validated spec to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` + commit (use `writing-clearly` skill if available).
- Self-review: placeholders/TBD, consistency, scope, ambiguity — fix inline.
- User review gate: "Spec written to <path>. Please review before plan." Wait. Loop if changes.
- Invoke `writing-plans` only. No other skill.

## Visual Companion
Offer just-in-time, not upfront. First visual question ("which layout?") → offer as own message: "I can show mockups in browser tab, token-intensive. Want me?" If yes, `--open`. Per-question: browser for mockups/diagrams, terminal for conceptual choices. Full guide: `visual-companion.md`.
