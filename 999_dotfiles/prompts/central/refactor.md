---
name: refactor
description: Refactor for structure/naming without behavior change. Delegates to refactor-code skill.
argument-hint: "[file]"
---

Refactor {{ARGS}}.

Delegates to `refactor-code` skill.
Constraints:
- No behavior change, no new features, no fixes mixed in
- Preserve public APIs unless renaming is local + safe

Steps: 1. List concrete problems 2. Small incremental steps 3. Run tests after each step 4. Summarize changes
If no tests cover code, say so before starting.
