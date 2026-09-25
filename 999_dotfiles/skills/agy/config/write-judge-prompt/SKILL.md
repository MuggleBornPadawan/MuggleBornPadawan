---
name: write-judge-prompt
description: >-
  Design binary Pass/Fail LLM evaluators for specific failure modes. Use when writing an LLM judge, testing AI output quality, or evaluating subjective criteria. Lean Pi adapted: binary checks, code-first, TypeSafe AI (Jev) compatible.
---

# Write LLM Judge Prompt — Pi Lean Edition

Design a focused, binary Pass/Fail evaluator for one specific failure mode.

---

## Order of Precedence

Always choose the simplest evaluator:

1. **Code checks first:**
   * Use regex, JSON schemas, keyword checks, or unit tests.
   * If an error is objectively testable, do not use an LLM.
2. **TypeSafe AI (Jev model):**
   * Use Jev with the `noul` primitive for calibrated boolean probabilities (0.0 to 1.0).
   * Fast, structured, and avoids long prompt text.
3. **LLM Judge Prompt:**
   * Use only when the check requires natural language interpretation (e.g. tone, nuance, complex intent).

---

## Core Rules

* **Strictly binary:** Output must be `PASS` or `FAIL`. Never use 1–5 scales or letter grades.
* **One failure mode per judge:** Never combine multiple checks into one prompt.
* **No vanity criteria:** Do not measure generic "helpfulness" or "coherence". Measure the exact observed failure mode.

---

## Judge Prompt Template

Every judge prompt must contain four components:

### 1. Task Definition
Specify the exact role and failure mode:
```text
You are an evaluator assessing if a real estate assistant ignores client budget limits.
```

### 2. Binary Definitions
Define pass and fail criteria unambiguously:
```text
PASS: The assistant only offers units at or below the client stated maximum budget.
FAIL: The assistant offers one or more units where price exceeds the client budget.
```

### 3. Input Format
Provide the exact trace fields:
```text
User Input: {{user_input}}
Tool Results: {{tool_results}}
Assistant Output: {{assistant_output}}
```

### 4. Real Few-Shot Examples
Include 2 Pass and 2 Fail examples from your error discovery data:
```text
Example 1:
User Input: Max budget is $2500 per month.
Assistant Output: We have Unit 302 available for $2700 per month.
Verdict: FAIL
Reason: $2700 exceeds the $2500 maximum budget.

Example 2:
User Input: Max budget is $2500 per month.
Assistant Output: Unit 101 is $2400 per month.
Verdict: PASS
Reason: $2400 is below the $2500 budget.
```

---

## Validation Protocol

1. **Do not trust unvalidated judges:**
   * An unvalidated judge may report high accuracy while missing real bugs.
2. **Balanced data splits:**
   * Collect ~50 Pass and ~50 Fail examples labeled by a domain expert.
   * Split into Train (few-shot source), Dev (iteration), and Test (final measurement).
3. **Evaluation metrics:**
   * Measure **True Positive Rate (TPR)**: correctly identified Pass traces.
   * Measure **True Negative Rate (TNR)**: correctly caught Fail traces.
   * **Never use raw accuracy:** In skewed distributions, raw accuracy hides missed failures.