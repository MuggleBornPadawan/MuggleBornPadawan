---
name: context-keeper
description: >-
  Use this skill to optimize token usage, clear inactive context, and maintain
  a consolidated state/roadmap file across long coding sessions.
---

# Context Keeper

Use this skill to systematically manage your token context when performing long-running tasks.

## Steps

1. **Maintain a Roadmap/State File**:
   - Write important task milestones, unresolved bugs, and active preferences to a single `MEMORIES.md` or `ROADMAP.md` at the project root.
   - Do not rely on chat history for long-term memory. Read and update this file frequently.

2. **Clean up Workspace Trash**:
   - Delete temporary files, unused scratch scripts, and redundant log files to prevent directory listing tools from bloating the context window.

3. **Reset Context Verbose Logs**:
   - Run `/clear` or reset terminal sessions when pivoting to a new subtask.
