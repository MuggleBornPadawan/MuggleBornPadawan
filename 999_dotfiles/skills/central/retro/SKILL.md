---
name: retro
description: Conduct a retrospective on a coding session to optimize agent instructions, automated checks, and token economy.
disable-model-invocation: true
---

# Retro

## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill retro
```
- Capture `SESSION_ID` from output.
- Run at end:
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --skill retro --outcome success --session-id $SESSION_ID
```

Analyze a completed coding session to recommend permanent improvements to the agent's harness environment, automated checks, and memory rules.

Default to inspecting the active conversation unless an external transcript path is provided.

---

## Analysis Categories

Audit the session against these 5 areas:

### 1. Navigation & Seams
- Did the agent struggle or burn turns hunting for files or symbols?
- Would a concise domain pointer in `docs/` or a clear namespace seam reduce file lookups?

### 2. Automated Checks vs Prompt Rules
- Did the agent make mechanical code errors (syntax, unthreaded forms, bad namespaces, unused imports)?
- **The Rule**: Never add a prompt instruction for a mechanical violation. Add a deterministic check instead (`clj-kondo` rule, `cljfmt`, or git hook).
- Reserve prompt rules exclusively for high-level judgment and trade-off decisions.

### 3. Memory & Central Rules (`AGENTS_CORE.md`)
- Did the agent violate existing ground truth, or obey redundant no-op instructions?
- Are prompt rules accumulating sediment?
- **Authority Rule**: Propose edits to `~/.local/share/agent-memory/AGENTS_CORE.md` or tails only; never edit symlinks or assembled files directly.

### 4. Tool & Token Economy
- Did the agent trigger heavy commands (`docker`, `ollama`, memory-heavy JVM restarts)?
- Could JVM restarts have been avoided by evaluating in a live socket REPL (`test_repl.bb`)?
- Did the context window threaten the <32k token limit?

### 5. Information Access & Friction
- Was the agent blocked by missing credentials, inaccessible ports, or unreadable errors?
- Could a quick Babashka diagnostic script eliminate manual steps?

---

## Output Format

Present findings as a prioritized table:

| Priority | Category | Problem Observed | Proposed Action / Fix |
| :--- | :--- | :--- | :--- |
| **P1** | Automated Check | Agent added unused requires in 3 namespaces. | Add `clj-kondo --lint src` check to pre-commit hook. |
| **P2** | Token Economy | Restarted JVM 4 times for tests. | Point agent to active socket REPL runner. |
| **P3** | Memory Rule | Obsolete rule in `gemini_tail.md` never triggers. | Prune stale line from central tail. |

Provide the exact code snippets or file edits needed to implement each approved fix.

## LLM Contract
- **Inputs:** active conversation transcript | harness configs | error traces
- **Outputs:** prioritized markdown table (ASD-STE100) + exact minimal edits
- **Tools allowed:** read, bash (lean: `bb`, `rg`, `git`), edit (surgical)
- **Stop condition:** session analyzed + actionable recommendations presented
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
