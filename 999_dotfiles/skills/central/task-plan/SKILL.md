---
name: task-plan
description: >-
  Formulate a step-by-step implementation plan before writing code, flagging risks and trade-offs.
---

# Task Implementation Planner

## Preamble (run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill task-plan
```
- Read `SESSION_ID`. Use for `skill-end` at close.

Create an implementation plan for the specified requirement or feature.
Structure the plan strictly as ordered, sequential steps (no parallel subtasks).

Do NOT write any implementation code yet. Instead:
1. Explore the relevant parts of the codebase to understand current structure and conventions
2. State your understanding of the requirement and list any open questions
3. Propose an approach with trade-offs considered (mention alternatives briefly if relevant)
4. Break it down into ordered, small, verifiable steps — each step should be independently checkable
5. Flag risks, edge cases, and files that will need changes

Save the plan to a markdown file so it can be reviewed and executed later.

## Outside review gate (plan gate)
- After draft plan: get second opinion.
- Use other harness if present: Pi, Gemini, or OpenCode subagent.
- Ask: score 1-10. List top 3 risks. List missing edge cases.
- Rule:
  - Score >=7: proceed to build.
  - Score <7: revise plan. Re-review once.
  - No reviewer present: note `REVIEW: skipped, no outside voice`. Proceed.
- Never block user. User decides. Agreement is signal, not proof.

Do NOT write any implementation code yet. Instead:
1. Explore the relevant parts of the codebase to understand current structure and conventions
2. State your understanding of the requirement and list any open questions
3. Propose an approach with trade-offs considered (mention alternatives briefly if relevant)
4. Break it down into ordered, small, verifiable steps — each step should be independently checkable
5. Flag risks, edge cases, and files that will need changes

Save the plan to a markdown file so it can be reviewed and executed later.
