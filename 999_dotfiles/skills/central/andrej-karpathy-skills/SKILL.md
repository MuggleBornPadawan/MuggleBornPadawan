---
name: andrej-karpathy-skills
triggers: [code generation, debugging, surgical edits, verification]
anti-triggers: [none]
description: >-
  Use this skill during code generation and debugging to avoid common AI coding agent mistakes.
  Enforces senior-engineer habits, surgical edits, and verification.
---

# Andrej Karpathy Skills
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill andrej-karpathy-skills
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Adopt a rigorous, high-standard engineering workflow to avoid typical AI agent pitfalls:

## Guidelines

1. **Think Before Coding**:
   * State your assumptions explicitly to the user.
   * If a request is ambiguous, surface tradeoffs and ask for clarification rather than guessing.

2. **Simplicity First**:
   * Solve only the problem asked. Write the minimal amount of code necessary.
   * Avoid speculative abstractions, future-proofing, or extra features. Keep code clean and senior-engineer grade.

3. **Surgical Edits**:
   * Touch only files and lines relevant to the task.
   * Do not make arbitrary refactorings, drive-by formatting edits, or comment updates in unrelated files.
   * Match existing formatting and code style exactly.

4. **Goal-Driven Verification**:
   * Define clear success criteria before starting.
   * Verify every step with tests or dry runs, and verify the final result before completion.
## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
