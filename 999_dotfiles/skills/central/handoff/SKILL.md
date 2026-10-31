---
name: handoff
triggers: [handoff, compact session, next agent, resume session]
anti-triggers: [mid-task quick check]
description: >-
  Compact the current session into a structured handoff document for a fresh agent session when nearing token limits.
---

# Session Handoff
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill handoff
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Write a compact handoff document summarizing the active conversation so a fresh agent session can continue immediately without context bloat.

---

## Process

1. **Check Environment State**:
   - Run `git status -s` to list dirty/uncommitted files.
   - Note active socket REPL or background server ports if applicable.

2. **Summarize Session State**:
   - Focus on what the next session must execute.
   - Point to existing artifacts and files (`file://` links); do not copy large code snippets.
   - Redact all credentials, tokens, and private hostnames (`<REDACTED>`).

3. **Destination Path**:
   - Default: `docs/handoffs/<YYYY-MM-DD-HHmm>.md` in the current repository.
   - Ephemeral transfer: `/tmp/agent-handoff.md` if the user specifies temporary.

---

## Handoff Document Template

```markdown
# Session Handoff: <Topic / Goal>

**Date/Time:** <ISO Timestamp>  
**Target Goal:** 1-sentence description of the current task.

## 1. Current State
- **Completed in this session**: Bulleted list of finished steps.
- **Git status**: Dirty files or pending commits.
- **Runtime**: Active socket REPL or server ports.

## 2. Blockers & Surprises
- Any failing tests, unexpected environment quirks, or open questions.

## 3. Immediate Next Step
- The single atomic action the fresh agent must execute first.

## 4. Suggested Skills
- Skills the next agent should invoke (e.g. `clj-test`, `fix-issue`, `commit`).

## 5. Artifact Pointers
- Specs: `docs/specs/<slug>.md`
- Tickets: `docs/tickets/<slug>/`
```

---

## LLM Contract
- **Inputs:** current conversation | user hint for next session | `git status`
- **Outputs:** concise markdown document adhering to ASD-STE100
- **Tools allowed:** read, bash (lean: `git`, `bb`), write (handoff file only)
- **Stop condition:** handoff file written + user notified to reset or start fresh session
- **Lean box:** keep active window under 32k; do not duplicate full file contents into handoff
