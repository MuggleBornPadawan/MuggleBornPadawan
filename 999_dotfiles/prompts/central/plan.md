---
name: plan
description: Create implementation plan (no code). Delegates to task-plan skill.
argument-hint: "[task]"
---

Create plan for: {{ARGS}}.

Delegates to `task-plan` skill for full workflow including outside review gate.
Steps:
1. Explore codebase for structure/conventions
2. State understanding + open questions
3. Propose approach with trade-offs (alternatives briefly)
4. Ordered small verifiable steps (each checkable)
5. Flag risks, edge cases, files to change

Do NOT write implementation code. Save plan to markdown file for review.
