---
name: typesafe-ai
triggers: [typesafe, jev, choice/score/noul]
anti-triggers: [freeform llm text]
description: >-
  Use when integrating with TypeSafe AI, querying the Jev model, formulating Choice, Score, or Noul questions, or building calibrated decision workflows.
---

# TypeSafe AI (Jev)
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill typesafe-ai
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

## Overview

TypeSafe AI provides the **Jev** model (`jev-latest`). Jev is a **System One** model:
* It does **not** generate text for humans.
* It evaluates typed questions against state data.
* It returns calibrated probabilities and confidence values as JSON.

---

## When to Use

Use TypeSafe AI when software needs narrow, structured judgments rather than open-ended text.

### Choosing the Question Primitive

| Goal                               | Primitive | Return Fields                           | Behavior                                           |
|------------------------------------|-----------|-----------------------------------------|----------------------------------------------------|
| Select one item from fixed options | `choice`  | `choice`, `probabilities`, `confidence` | Highest probability option selected.               |
| Rate content on ordered scale      | `score`   | `score`, `probabilities`, `confidence`  | Continuous score can interpolate between steps.    |
| Check if statement is true         | `noul`    | `noul` (0.0 to 1.0)                     | Returns probability of "yes". No confidence field. |

---

## Core Rules

1. **Keep questions atomic**:
   * Ask one specific question per item.
   * Do not ask complex multi-factor questions.
   * Combine separate factors in your own application code.
2. **Batch aggressively**:
   * Send all questions for the same state in **one** API request.
   * Questions run in parallel with negligible latency difference.
3. **Use speculative questions**:
   * Include optional questions in the call.
   * Ignore unwanted answers in code.
4. **Use confidence thresholds**:
   * **High confidence**: execute automated actions.
   * **Medium confidence**: ask user for confirmation or flag for review.
   * **Low confidence**: hand off to human agent.

---

## API Specification

* **Endpoint**: `POST https://api.typesafe.ai/v1/systemone`
* **Headers**:
  * `Authorization: Bearer <TYPESAFE_API_KEY>`
  * `Content-Type: application/json`
* **API Key Retrieval (`pass`)**:
  * Store in pass: `pass insert TYPESAFE_API_KEY`
  * Load in shell: `export TYPESAFE_API_KEY=$(pass show TYPESAFE_API_KEY)`
  * Never hardcode secrets in code or skill files.
* **Model**: `jev-latest`
* **Token limit**: ~32k tokens (~150k characters) shared across state and questions.

### Request Body Schema

```json
{
  "state": { "ticket_id": "123", "text": "Payment failed twice today." },
  "model": "jev-latest",
  "questions": {
    "category": {
      "type": "choice",
      "instructions": "Select the correct support department",
      "criteria": {
        "billing": "Invoices, payments, refunds",
        "technical": "Software bugs and crashes"
      }
    },
    "severity": {
      "type": "score",
      "instructions": "Customer frustration level",
      "criteria": [
        "Calm and informative",
        "Annoyed but professional",
        "Extremely angry"
      ]
    },
    "is_urgent": {
      "type": "noul",
      "instructions": "The customer reports production downtime"
    }
  }
}
```

---

## Preflight Check (LLM)
- Before calling API: check `TYPESAFE_API_KEY` via `(System/getenv "TYPESAFE_API_KEY")` or `pass show TYPESAFE_API_KEY`.
- If missing: **SKIP** — warn user `TYPESAFE_API_KEY not set, skipping Jev call` and do not fabricate response. Offer mock/no-op path.
- Never block task on missing key; degrade gracefully.

## Clojure Example — see `references/client.md`
> http-client + get-api-key + evaluate-state example moved. SKILL.md keeps: endpoint, headers, typed primitives (choice/score/noul), batch rules.

## References
- Full client: `references/client.md`

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
