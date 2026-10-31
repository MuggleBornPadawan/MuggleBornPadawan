---
name: context-keeper
description: >-
  Use this skill to optimize token usage, clear inactive context, and maintain a consolidated state/roadmap file across long coding sessions. Use when: long session, token limit, roadmap.
---

# Context Keeper
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill context-keeper
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Use this skill to systematically manage your token context when performing long-running tasks.

## Steps

1. **Maintain a Single `STATE.md`**:
   - Merge tasks and progress into a single root file `STATE.md`.
   - Never create separate task and progress files.
   - Use this exact compact format:
     ```markdown
     # Current State
     **Goal:** [1 sentence goal]
     - [x] Done: [completed step]
     - [!] Blocked/Broken: [known bugs or blockers]
     - [ ] Next: [single atomic next action]
     ```
   - Update `STATE.md` at turn boundaries. Overwrite stale notes to keep the file under 30 lines.

2. **Clean up Workspace Trash**:
   - Delete temporary files, unused scratch scripts, and redundant log files.
   - Prevents file search and directory listing from inflating the context window.

3. **Reset Context Verbose Logs**:
   - Run `/compact`, `/clear`, or reset terminal sessions when pivoting to a new subtask.
