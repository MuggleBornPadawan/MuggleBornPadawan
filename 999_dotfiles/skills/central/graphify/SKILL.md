---
name: graphify
description: "Map codebase with structured graphs. Use when researching, navigating, or generating GRAPH_REPORT.md."
---

# Graphify Skill
## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill graphify
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Optimize navigation and codebase comprehension using structured mapping:

## Guidelines

1. **Locate or Generate Codebase Maps First**:
   * Look for existing documentation maps, structured reports (like `GRAPH_REPORT.md`), or architecture charts.
   * If `GRAPH_REPORT.md` is missing, generate it immediately:
     ```bash
     bb ~/.local/share/skills/graphify/scripts/generate_graph.bb .
     ```
   * Understand module relationships before attempting to read all raw files.

2. **Structured Navigation**:
   * Navigate files systematically based on import/export dependencies or class hierarchies.
   * Do not guess where code components are; query the structure first.

3. **Minimize Brute-Force Searching**:
   * Use targeted search utilities with narrow directory parameters rather than searching the entire repository unconditionally.
   * Prefer checking public namespace declarations (`ns`) and function maps over wide grep.

4. **Query Graph Directly**:
   * Inspect `GRAPH_REPORT.md` for visual mermaid diagrams, hub warnings, and public API seams.
   * Query `graph.edn` with Babashka for instant programmatic checks:
     ```bash
     bb -e '(-> (read-string (slurp "graph.edn")) :nodes (get '\''my.namespace) :out-deps)'
     ```
