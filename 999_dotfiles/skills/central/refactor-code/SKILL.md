---
name: refactor-code
triggers: [refactor, no behavior change, structure]
anti-triggers: [fix, feature]
description: >-
  Perform safe, incremental code refactoring without changing public behavior or adding features.
---

# Incremental Code Refactorer
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill refactor-code
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Refactor the specified target namespace or file sequentially.

Clojure Stack Conventions:
- Idiomatic threading (`->`, `->>`), pure functions, and minimal state.
- Clean `ns` requires; run `clj-kondo --lint src` and `cljfmt check` after edits.

Constraints:
- Behavior must not change — no new features, no fixes mixed in
- Improve structure, naming, duplication, and readability only
- Preserve public APIs unless renaming is clearly safe and local

Steps:
1. Identify concrete problems first (list them briefly)
2. Refactor incrementally in small steps
3. Run existing tests after each significant step
4. Summarize what changed at the end

If there are no tests covering this code, say so before starting.
> **Delegation:** Prompt `refactor.md` delegates here.

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
