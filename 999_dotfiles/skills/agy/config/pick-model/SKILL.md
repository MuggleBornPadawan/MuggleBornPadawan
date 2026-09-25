---
name: pick-model
description: >-
  Analyze a task and recommend the optimal model from the Pareto frontier.
---

# Pareto Model Selector

Analyze the following task and select the best model from the 4 primary models:

Task:
$@

### Primary Model Roster:

1. `deepseek-v4-flash` (Speed Tier)
   - Best for: Quick questions, small edits, commit messages, lint errors, simple unit tests.
   - Profile: Sub-second speed, near-zero cost.

2. `qwen3.6-plus` (Daily Driver Tier)
   - Best for: Standard feature development, general implementation, idiomatic refactoring.
   - Profile: High coding accuracy, balanced cost.

3. `kimi-k2.6` (Repository / Context Tier)
   - Best for: Multi-file analysis, cross-module debugging, large prompt context, repo audits.
   - Profile: Optimized for large codebases and dependency tracking.

4. `deepseek-v4-pro` (Deep Reasoning Tier)
   - Best for: Complex algorithms, difficult concurrency/logic bugs, mathematical logic.
   - Profile: Frontier chain-of-thought reasoning, deep diagnosis.

### Output Format:
- **Recommended Model:** `<model-name>`
- **Why:** 2 short bullet points explaining the fit.
- **Emacs gptel command:**
  ```elisp
  (setq-local gptel-model "<model-name>")
  ```
- Use short sentences and bullet points. No long paragraphs.
