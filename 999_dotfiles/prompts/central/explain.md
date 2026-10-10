---
name: explain
description: Explain file/module purpose, parts, data flow, and gotchas. Use when user asks to explain code.
argument-hint: "[file]"
---

Explain {{ARGS}}.

Structure (max 60 lines):
1. **Purpose** — 1-2 sentences
2. **Key parts** — important fns/classes, skip boilerplate
3. **Data flow** — inputs, outputs, side effects, connections (follow imports)
4. **Gotchas** — surprising, fragile, non-obvious

Read actual code — not file names. Assume dev knows language, not codebase.
