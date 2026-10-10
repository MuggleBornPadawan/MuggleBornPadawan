---
name: plan-critique
triggers: [critique plan, challenge assumptions]
anti-triggers: [execute plan]
description: >-
  Use this skill immediately after formulating a plan and before executing any tool or writing code.
  Enforces challenging your assumptions and critiquing the current plan.
---

# Plan Critique Skill
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill plan-critique
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Critique and challenge your proposed approach before executing tasks to prevent over-engineering or wrong assumptions:

## Guidelines

1. **Challenge Assumptions**:
   * Ask: Where will this plan fail?
   * Ask: Are we making unverified assumptions about the environment, libraries, or dependencies?
   * Ask: What are the potential side effects of this implementation?

2. **Check Alternatives**:
   * Is there a simpler, cleaner way to accomplish this?
   * Can we reuse existing patterns or helpers in the codebase instead of introducing a new one?

3. **Verify Compliance**:
   * Does the plan adhere to all repository guidelines, safety rules, and architectural styles?
## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
