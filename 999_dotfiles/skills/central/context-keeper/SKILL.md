---
name: context-keeper
triggers: [long session, token limit, roadmap]
anti-triggers: [short single task]
description: >-
  Use this skill to optimize token usage, clear inactive context, and maintain
  a consolidated state/roadmap file across long coding sessions.
---

# Context Keeper
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill context-keeper
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Use this skill to systematically manage your token context when performing long-running tasks.

## Steps

1. **Maintain a Roadmap/State File**:
   - Write important task milestones, unresolved bugs, and active preferences to a single `MEMORIES.md` or `ROADMAP.md` at the project root.
   - Do not rely on chat history for long-term memory. Read and update this file frequently.

2. **Clean up Workspace Trash**:
   - Delete temporary files, unused scratch scripts, and redundant log files to prevent directory listing tools from bloating the context window.

3. **Reset Context Verbose Logs**:
   - Run `/clear` or reset terminal sessions when pivoting to a new subtask.
## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
