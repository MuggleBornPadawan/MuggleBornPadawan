---
name: receiving-code-review
description: "Evaluate review feedback rigorously. Use when verifying, challenging, or implementing review suggestions."
---

# Code Review Reception

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill receiving-code-review
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

## Overview

Verify before implementing. Ask before assuming. Correctness over comfort.

## Response Pattern

1. READ: full feedback, no reacting.
2. UNDERSTAND: restate or ask.
3. VERIFY: check codebase reality.
4. EVALUATE: sound for THIS codebase?
5. RESPOND: ack or reasoned pushback.
6. IMPLEMENT: one item at a time, test each.

## Forbidden

NEVER: "You're absolutely right!" / "Great point!" / "Let me implement now" (before verify).
INSTEAD: restate requirement, ask, push back with reason, or just act.

## Unclear Feedback

Unclear item → STOP, ask before implementing anything. Partial understanding = wrong impl.
Ex: "Fix 1-6", understand 1,2,3,6 → "Need 4,5 before proceeding."

## Implementation Order

1. Clarify all unclear first.
2. Then: blocking/security → simple (typos/imports) → complex (refactor/logic).
3. Test each individually. Verify no regressions.

Details + examples + pushback scripts: `references/review-patterns.md`.
