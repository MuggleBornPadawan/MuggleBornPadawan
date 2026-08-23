---
name: context-keeper
description: Use when a coding session runs long or spans multiple subtasks, when large tool outputs or stale chat history risk pushing important task state out of the context window, when pivoting to a new subtask mid-session, or when resuming work after a session reset.
---

# Context Keeper

Systematically manage context during long-running tasks so critical state never depends on chat history alone.

## Core Principle

Chat history is volatile. Anything that must survive — milestones, unresolved bugs, decisions, preferences — lives in a file on disk.

## Steps

1. **Maintain a State File**
   - Keep a single `MEMORIES.md` or `ROADMAP.md` at the project root containing: task milestones, unresolved bugs, active user preferences, and next steps.
   - Read it when resuming work; update it after every milestone, decision, or pivot. Do not rely on chat history for long-term memory.

2. **Prune Workspace Clutter**
   - Delete temporary files, scratch scripts, and redundant logs as work progresses. Bloated directories bloat future `ls`/`find` output and waste context.

3. **Reset Between Subtasks**
   - When pivoting to a new subtask, clear the session (e.g., `/clear` — use `/compact` on pi — or its equivalent in the current harness) after confirming the state file captures everything needed to resume.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Storing state only in conversation | Write it to the state file immediately |
| State file goes stale | Update after every milestone or decision, not at end of session |
| Accumulating scratch files "temporarily" | Delete as soon as a step completes |
| Clearing context before persisting state | Always update `MEMORIES.md`/`ROADMAP.md` first |

## Red Flags - STOP

- About to `/clear`/`/compact` but nothing is written to the state file
- Answering "what were we doing?" from memory instead of reading the state file
- Directory listings dominated by old temp files
