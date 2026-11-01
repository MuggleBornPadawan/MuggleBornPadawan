---
name: writing-for-agents
description: "Guidelines for authoring skills, prompts, AGENTS_CORE.md -- two loads, context pointers, leading words, pruning, hierarchy. Use when: writing skill, AGENTS.md, prompt template."
---

# Writing for Agents -- Central + Clojure/Pi Patch

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill writing-for-agents
```
- Capture `SESSION_ID` from output.
- Run at end:
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --skill writing-for-agents --outcome success --session-id $SESSION_ID
```

Reference for writing any document an agent consumes: skills in `~/.local/share/skills`, prompts in `~/.local/share/agent-prompts`, rules in `~/.local/share/agent-memory/AGENTS_CORE.md`, plus Pi discovery (`~/.agents/skills/`, `~/.pi/agent/skills/`, `.pi/skills/`, `.agents/skills/`).

> **Merged:** central harness-sync store conventions + `mattpocock/skills:writing-for-agents` Clojure+Pi adaption (context pointers, two loads, leading words). Original at `https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents`.

## Pi Frontmatter Rules (must follow)

Per `https://agentskills.io/specification` and `docs/skills.md` (Pi is lenient but warn):

```yaml
---
name: my-skill          # 1-64 chars, a-z0-9-hyphen, no leading/trailing/consecutive hyphen
description: "Does X. Use when Y mentions Z or wants W." # max 1024, specific triggers
# optional: disable-model-invocation: true  # user must /skill:name
---
```

- In `~/.agents/skills/` dirs, Pi discovers `SKILL.md` recursively; root `*.md` with frontmatter also loaded. Do not put two skills with same `name` in both `~/.agents/skills/` and `~/.pi/agent/skills/` -- first wins, second warns. **After consolidation, keep only central** (`~/.local/share/skills/` -> symlinked).
- Description = pointer. Be specific: `Extracts text from PDFs` beats `Helps with PDFs`.

## 1. The Two Loads

Every added rule or pointer spends one of two budgets:

- **Context Load:** Tokens in agent's context window on every turn. Active window must stay **<32k tokens**. Cost whether skill fires or not.
- **Cognitive Load:** Effort for human to remember which tools exist and when to reach. Not minimized -- it's price of agency; spend where judgement matters.
- **Rule:** Inline what every task needs; push specialized reference behind pointers into standalone skills. Material behind pointer escapes context load at price of pointer's line.

**Clojure rule:** `deps.edn` scripts, `bb.edn` tasks, `clj-kondo` config are sources of truth -- don't restate them in `AGENTS.md`. Point: `bb tasks` lists them.

## 2. Context Pointers

A **context pointer** is a reference in active memory that points to external file (skill `description`, link in `AGENTS.md`).

- **Front-load the trigger word:** Place activating noun/command at start.
- **One trigger per branch:** Distinct operational triggers only. Synonyms renaming one branch = one branch written twice; collapse.
- **Cut identity body already carries:** Don't explain what file is; explain when to load it.
- **Every word of always-loaded pointer costs every turn** -- prune harder than body.

**Clojure example -- good vs bad `AGENTS.md` pointer:**
- Bad: `See docs for how we do testing in this repo.` (vague, no branch)
- Good: `clojure.test -- run `bb test -n my.ns` for ns seams; clj-kondo for lint.`

## 3. Information Hierarchy & Progressive Disclosure

Built from two content types: **steps** (ordered actions) and **reference** (definitions, rules, facts).

1. **In-File Steps:** Ordered actions agent performs immediately.
2. **In-File Reference:** Definitions/rules consulted during execution. Flat peer-set (e.g., full review checklist) is fine.
3. **Disclosed Reference:** Secondary material pushed to external files/skills, loaded only on demand.

- **Progressive disclosure rule:** If only 20% of sessions use a rule, disclose behind pointer. Not token optimisation -- hierarchy protection. Branching is test: inline what every branch needs, push what only some need. When doc has steps, in-file ref that should be disclosed buries them → coin-flip variance.
- **Co-location rule:** Keep concept's definition, rules, caveats under one heading so one read brings neighbours.
- **Sprawl:** Doc too long even when every line live/unique -- attention thins. Cure is ladder: disclose ref behind pointers, split by branch/sequence.

**Clojure application:**
- `AGENTS.md` should be steps (how to verify: `bb test`, `clj-kondo`) + pointers to `CONTEXT.md`, `docs/adr/*`, `docs/agents/issue-tracker.md`.
- Skill `SKILL.md` = steps. Heavy reference (e.g., Fowler smell list for `code-review`) stays in-file as reference -- every branch needs it. But `bb.edn` task list is disclosed -- point, don't paste.

## 4. Completion Criteria & Anti-Rush

Agents rush when visible future steps distract them.

- **Sharpen the bound:** Replace vague ("ensure code is clean") with checkable ("all `clojure.test` assertions pass in REPL", `bb test -n my.ns` green).
- **Demand legwork:** Use exacting requirements ("account for all modified namespaces") not vague summaries.
- **Split across context boundaries:** If multi-step sequence tempts rush, split across subagents or tickets (handoff boundary); inline call leaves later steps in context.

## 5. Leading Words & Positive Steering

- **Use pretrained leading words:** Concepts models already know (`tight loop`, `tracer bullet`, `expand-contract`, `pure function`, `seam`, `depth`/`leverage`/`locality`). Repeated as token, never sentence, it anchors behaviour by recruiting priors. Made-up word recruits nothing -- pay in definition tokens.
  - Clojure leading words: `seam` (ns public API), `depth`/`leverage`/`locality` (`codebase-design`), `tracer bullet` (vertical slice), `tight` + `red` (diagnosing loop), `CONTEXT.md` terms.
- **Prompt the Positive:** State target directly.
  - Bad: "Do not write complex nested functions."
  - Good: "Keep functions flat using `->` and `->>` threading macros."
- **Avoid elephant triggers:** Prohibitions focus attention on forbidden action (`Don't think of elephant` → elephant). Use bans only for strict guardrails; pair with positive.

## 6. Pruning & Anti-Sediment

- **Single Source of Truth:** Define each rule once in central authority store (`~/.local/share/`). Duplication costs maintenance + tokens.
- **Environment as Truth:** Don't document what `--help`, `deps.edn`, `git status` already report. Cache only what agent cannot find by lookup: unwritten convention, reason, gotcha.
- **Hunt No-Ops:** Delete instructions model already obeys by default. Test: does it change behaviour vs default? Run doc, not debate. Delete whole sentence if fails. Applies to leading words too (`be thorough` when already thorough-ish is no-op; use `relentless`).
- **Prune Stale Layers:** Remove rules for abandoned tools/fixed edge cases -- otherwise sediment settles (adding feels safe, removing risky).

## Pi + Clojure Checklist Before Saving Skill/AGENTS.md

- [ ] `name` valid, `description` specific with branches, front-loaded trigger
- [ ] No `npm`/`tsc` where `deps.edn`/`bb` belongs
- [ ] `AGENTS.md` points to `CONTEXT.md` / `docs/adr/` / `bb tasks`, not duplicates them
- [ ] Every step has checkable, demanding completion criterion (`bb test` green, `clj-kondo` clean)
- [ ] No duplication across `AGENTS.md` + skills; single source of truth in `~/.local/share/`
- [ ] Negation only as paired guardrail; otherwise positive phrasing
- [ ] `/reload` to hot-load, then test with trivial prompt triggering the pointer
- [ ] Run `bb ~/.local/share/skills/harness-sync/scripts/sync_harness.bb` after edit
