---
name: graphify
description: >-
  Use this skill when researching, navigating, or searching inside a codebase.
  Enforces using structured maps and project graphs instead of brute-force grep.
---

# Graphify Skill

Optimize navigation and codebase comprehension using structured mapping:

## Guidelines

1. **Locate Codebase Maps First**:
   * Look for existing documentation maps, structured reports (like `GRAPH_REPORT.md`), or architecture charts.
   * Understand module relationships before attempting to read all raw files.

2. **Structured Navigation**:
   * Navigate files systematically based on import/export dependencies or class hierarchies.
   * Do not guess where code components are; query the structure first.

3. **Minimize Brute-Force Searching**:
   * Use specific tools like `find_by_name` and `grep_search` with narrow, target directory parameters rather than searching the entire codebase unconditionally.
