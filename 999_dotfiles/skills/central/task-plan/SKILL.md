---
name: task-plan
triggers: [implementation plan, steps, trade-offs]
anti-triggers: [code now]
description: >-
  Formulate a step-by-step implementation plan before writing code, flagging risks and trade-offs.
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

> **Delegation:** Prompt `plan.md` delegates here.

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask