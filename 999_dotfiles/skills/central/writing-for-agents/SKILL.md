---
name: writing-for-agents
description: Guidelines and mechanics for authoring skills, prompt templates, and AGENTS_CORE.md memory.
---

# Writing for Agents

## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill writing-for-agents
```
- Capture `SESSION_ID` from output.
- Run at end:
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --skill writing-for-agents --outcome success --session-id $SESSION_ID
```

Reference for authoring documents consumed by coding agents: skills in `~/.local/share/skills`, prompts in `~/.local/share/agent-prompts`, and rules in `~/.local/share/agent-memory/AGENTS_CORE.md`.

---

## 1. The Two Loads

Every added rule or pointer spends one of two budgets:

- **Context Load**: Tokens loaded into the agent's context window on every turn. Active window must stay **under 32k tokens**.
- **Cognitive Load**: Effort required by the human to remember which tools exist.
- **Rule**: Inline what every task needs; push specialized reference behind pointers into standalone skills.

---

## 2. Context Pointers

A **context pointer** is a reference in active memory that points to an external file (e.g. a skill description or a link in `AGENTS.md`).

- **Front-load the trigger word**: Place the activating noun or command at the start of the description.
- **One trigger per branch**: Do not use lists of synonyms. Keep only distinct operational triggers.
- **Cut identity already in the body**: Do not explain what the file is; explain when to load it.

---

## 3. Information Hierarchy & Progressive Disclosure

Organize instructions on a three-tier ladder:

1. **In-File Steps**: Ordered actions the agent performs immediately.
2. **In-File Reference**: Definitions and rules consulted during execution.
3. **Disclosed Reference**: Secondary material pushed to external files or skills, loaded only on demand.

- **Progressive disclosure rule**: If only 20% of sessions use a rule, disclose it behind a pointer or skill. Do not put it in `AGENTS_CORE.md`.
- **Co-location rule**: Keep a concept's definition, rules, and caveats together under one heading.

---

## 4. Completion Criteria & Anti-Rush

Agents rush toward completion when visible future steps distract them:

- **Sharpen the bound**: Replace vague goals ("ensure code is clean") with checkable conditions ("all `clojure.test` assertions pass in REPL").
- **Demand legwork**: Use exacting requirements ("account for all modified namespaces") rather than vague summaries.
- **Split across context boundaries**: If an agent rushes multi-step sequences, split them across subagents or sequential tickets.

---

## 5. Leading Words & Positive Steering

- **Use Pretrained Leading Words**: Use concepts models already understand (*tight loop*, *tracer bullet*, *expand-contract*, *pure function*). Avoid inventing novel jargon.
- **Prompt the Positive**: State target behavior directly.
  - *Bad*: "Do not write complex nested functions."
  - *Good*: "Keep functions flat using `->` and `->>` threading macros."
- **Avoid elephant triggers**: Prohibitions focus attention on the forbidden action. Use bans only for strict safety guardrails.

---

## 6. Pruning & Anti-Sediment

- **Single Source of Truth**: Define each rule once in the central authority store (`~/.local/share/`).
- **Environment as Truth**: Do not document what `--help`, `deps.edn`, or `git status` already report.
- **Hunt No-Ops**: Delete instructions that the model already obeys by default.
- **Prune Stale Layers**: Remove rules for abandoned tools or fixed edge cases to prevent sediment buildup.

## LLM Contract
- **Inputs:** skill | prompt | rule authoring request
- **Outputs:** concise markdown document adhering to token economy and single truth
- **Tools allowed:** read, bash (lean: `bb`, `rg`), edit (surgical), write (only new files)
- **Stop condition:** authored document verified against context constraints (<32k context)
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
