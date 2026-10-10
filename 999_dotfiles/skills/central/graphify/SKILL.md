---
name: graphify
triggers: [codebase map, navigation, ns dependencies]
anti-triggers: [brute grep]
description: >-
  Use this skill when researching, navigating, or searching inside a codebase.
  Enforces using structured maps and project graphs instead of brute-force grep.
---

# Graphify Skill
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill graphify
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Optimize navigation and codebase comprehension using structured mapping:

## Guidelines

1. **Locate Codebase Maps First**:
   * Look for existing documentation maps, structured reports (like `GRAPH_REPORT.md`), or architecture charts.
   * Understand module relationships before attempting to read all raw files.

2. **Structured Navigation**:
   * Navigate files systematically based on import/export dependencies or class hierarchies.
   * Do not guess where code components are; query the structure first.

3. **Minimize Brute-Force Searching**:
   * Use targeted search utilities with narrow directory parameters rather than searching the entire repository unconditionally.
   * Prefer checking public namespace declarations (`ns`) and function maps over wide grep.
## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
