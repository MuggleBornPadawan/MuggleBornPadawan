---
name: writing-plans
description: "Write step-by-step implementation plans. Use when planning multi-step tasks from specs."
---

# Writing Plans

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill writing-plans
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

> **Delegation:** Prompt `plan.md` delegates here.

## Overview

Write plans for engineer with zero codebase context. Document files, code, tests, docs. Bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

**Announce:** "I'm using the writing-plans skill to create the implementation plan."
**Save to:** `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` (user pref overrides).
**Context:** Isolated branch or workspace if needed.

## Steps

1. Scope check: multi-subsystem spec → suggest split, one plan per subsystem.
2. File structure: map create/modify per file, one responsibility each. Follow existing patterns.
3. Right-size tasks: smallest unit with own test cycle. Fold setup into task that needs it.
4. Draft tasks: 2-5 min steps (fail test → run fail → minimal code → run pass → commit). Full template: `references/plan-template.md`.
5. No placeholders: every step has actual code/commands. No TBD/TODO, no "similar to Task N".
6. Self-review: spec coverage, placeholder scan, type consistency. Fix inline.
7. Outside gate: second opinion score 1-10. >=7 build, <7 revise once, none → note skipped.
8. Handoff: save, offer Subagent-Driven vs Inline (executing-plans).

Template + checklist: `references/plan-template.md`.
