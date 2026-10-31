---
name: to-questionnaire
triggers: [questionnaire, interview external, stakeholder question, missing info]
anti-triggers: [internal code query]
description: >-
  Turn an unresolved decision or ambiguous requirement into an async markdown discovery questionnaire for an external stakeholder.
---

# To Questionnaire
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill to-questionnaire
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Turn an unresolved technical or product decision into a structured questionnaire. Hand it to a stakeholder or expert to complete asynchronously.

---

## Core Rule: Grill the Send, Not the Subject

Do not question the user about domain facts they already lack. Ask only two questions about the **send**:

1. **Who is the recipient?** (Role, domain knowledge, relationship).
2. **What decisions depend on their answers?** (Concrete facts needed before code can proceed).

---

## Process

1. **Conduct 1 Brief Exchange with User**:
   - Clarify recipient identity and required decisions in a single prompt.

2. **Draft the Questionnaire**:
   - Target the gap between what the user knows and what the recipient knows.
   - Group questions by theme (most-important first).
   - Keep each question to a single atomic idea. Add a 1-line "*Why this matters*" to clarify impact.

3. **Save File**:
   - Write to `docs/questionnaires/<slug>.md` in the current repository.

---

## Questionnaire Template

```markdown
# Discovery: <Title>

**Purpose:** The concrete decision or implementation gated on this input.  
**From:** <User / Team>  
**To:** <Recipient Name / Role>  
**How answers will be used:** <Implementation path or design choice>

## Context
One short paragraph explaining the problem. Provide sufficient background so the recipient understands the question without reading code.

## How to Answer
- Estimated time: 5–10 minutes.
- "I don't know" or rough estimates are helpful. Flag uncertainties clearly.

## 1. <Theme 1 Heading>

### <Question 1>?
*Why this matters: Explains what technical choice depends on this answer.*
> 

### <Question 2>?
*Why this matters: ...*
> 

## 2. Anything Else?
Is there any constraint or risk we did not ask about?
> 
```

---

## LLM Contract
- **Inputs:** unresolved decision | recipient description | user goal
- **Outputs:** clean markdown questionnaire saved to `docs/questionnaires/<slug>.md`
- **Tools allowed:** read, write (only the questionnaire file), bash (lean: `bb`)
- **Stop condition:** questionnaire file written + file path reported to user
- **Lean box:** keep questions atomic; no sprawling text
