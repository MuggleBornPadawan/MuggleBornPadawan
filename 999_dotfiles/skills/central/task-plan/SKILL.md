---
name: task-plan
description: >-
  Formulate a step-by-step implementation plan before writing code, flagging risks and trade-offs. Use when: implementation plan, steps, trade-offs.
---

# Task Implementation Planner

## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill task-plan
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Create an implementation plan for the specified requirement or feature.
Structure the plan strictly as ordered, sequential steps (no parallel subtasks).

Do NOT write any implementation code yet. Instead:
1. **Explore the codebase**: Check existing namespaces, contracts, and data flows.
2. **State understanding**: Summarize the requirement and surface open questions.
3. **Define negative scope (Prohibitions)**: Explicitly state what the agent must **NOT** do, touch, add, or refactor (e.g., no new dependencies, no unrequested rewrites).
4. **Evaluate trade-offs**: Propose the technical approach, check architectural invariants (`codebase-design/references/invariants.md`), and contrast with alternatives.
5. **Break into atomic steps**: Ordered, verifiable increments. Each step must have a clear verification test or check.
6. **Flag risks and affected files**: List exact file paths and potential edge-case failures.

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

> **Delegation:** Prompt `plan.md` delegates here.
