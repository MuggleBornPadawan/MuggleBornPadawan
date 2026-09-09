---
name: writing-for-agents
description: "Writing documents for agents. Clojure+Pi adapted: context pointers, two loads, leading words, pruning — for skills, AGENTS.md, CLAUDE.md."
---

# Writing For Agents — Clojure + Pi Patch

Reference for writing any document an agent consumes: a skill, an `AGENTS.md` / `CLAUDE.md`, a doc reached by a pointer. Packaging differs; writing does not: same levers make each predictable, since agent takes same _process_ every run rather than same output.

> **Clojure + Pi adaption of `mattpocock/skills:writing-for-agents`.** Original at `https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents`. Pure Markdown, 0 deps. Location: `~/.agents/skills/writing-for-agents/` (global). Covers pi's `~/.agents/skills/`, `~/.pi/agent/skills/`, `.pi/skills/`, `.agents/skills/` discovery.

When document you're writing is a skill, read `SKILL-MECHANICS.md` logic (frontmatter, invocation) if available; otherwise use pi's rules below.

## Pi Frontmatter Rules (must follow)

Per `https://agentskills.io/specification` and `docs/skills.md` (pi is lenient but warn):

```yaml
---
name: my-skill          # 1-64 chars, a-z0-9-hyphen, no leading/trailing/consecutive hyphen
description: "Does X. Use when Y mentions Z or wants W." # max 1024, specific triggers
# optional: disable-model-invocation: true  # user must /skill:name
---
```

- In `~/.agents/skills/` dirs, pi discovers `SKILL.md` recursively; root `*.md` with frontmatter also loaded. Do not put two skills with same `name` in both `~/.agents/skills/` and `~/.pi/agent/skills/` — first wins, second warns.
- Description = pointer. Be specific: `Extracts text from PDFs` beats `Helps with PDFs`.

## Context Pointers

A **context pointer** is a reference held in agent's context that names out-of-context material and encodes condition for reaching it. A skill's `description` is one; a line in `AGENTS.md` naming a doc is same object. Pointer's _wording_, not target, decides when agent reaches material.

A pointer does two jobs: state what material is, and list **branches** that trigger it (distinct cases, different runs take different paths). Every word of an always-loaded pointer costs every turn, so prune harder than body:

- **Front-load the leading word**: pointer does triggering work there.
- **One trigger per branch.** Synonyms renaming one branch = one branch written twice; collapse.
- **Cut identity body already carries.**

**Clojure example — good vs bad `AGENTS.md` pointer:**

- Bad: `See docs for how we do testing in this repo.` (vague, no branch)
- Good: `clojure.test — run `bb test -n my.ns` for ns seams; clj-kondo for lint.`

## The Two Loads

Every doc/pointer spends one of two budgets:

- **Context load** — cost of always-loaded material on window: `AGENTS.md` line, skill `description`, anything in context every turn, spending tokens whether or not it fires.
- **Cognitive load** — cost on human: which docs exist and when to reach. Human is index. Not a cost to minimise: it is price of human agency; spend where human judgement matters.

Material reached only through pointer escapes context load at price of pointer's own line; material with no pointer rides entirely on cognitive load.

**Clojure rule:** `deps.edn` scripts, `bb.edn` tasks, `clj-kondo` config are already sources of truth — don't restate them in `AGENTS.md`. Point to them: `bb tasks` lists them.

## Information Hierarchy

Built from two content types: **steps** (ordered actions) and **reference** (definitions, rules, facts). Core decision is where each sits on ladder:

1. **In-file step** — primary tier: what agent does, in order.
2. **In-file reference** — consulted on demand. Flat peer-set (every rule of a review on one rung) is fine, not a smell.
3. **Disclosed reference** — pushed into separate file, reached by pointer, loaded only when pointer fires. Sibling file in same folder through fully external ref.

Push too little down → top bloats; push too much → hide material agent needs. **Progressive disclosure** is move down ladder so top stays legible. Not token optimisation: hierarchy protection. Branching is cleanest test: inline what every branch needs, push behind pointer what only some need. When doc has steps, in-file ref that should be disclosed buries them → coin-flip variance.

**Co-location** — within-file companion: where ladder decides _how far down_, co-location decides _what sits beside it_. Keep concept's definition, rules, caveats under one heading so one read brings neighbours. Grouped reads like docs; scattered fragments one meaning across many.

**Sprawl** — failure mode: doc simply too long, even when every line live/unique. Attention thins. Cure is ladder: disclose ref behind pointers, split by branch/sequence so each path carries only what it needs.

**Clojure application:**
- `AGENTS.md` should be steps (how to verify: `bb test`, `clj-kondo`) + pointers to `CONTEXT.md`, `docs/adr/*`, `docs/agents/issue-tracker.md`. Not a dump of `deps.edn`.
- Skill `SKILL.md` = steps. Heavy reference (e.g. full Fowler smell list for `code-review`) stays in-file as reference, not disclosed — every branch needs it. But `bb.edn` task list is disclosed — point, don't paste.

## Steps and Completion Criteria

Every step ends on **completion criterion** — condition that tells agent work is done. Two properties:

- **Clarity**: can agent tell done from not-done? Vague bound ("understanding reached") invites **premature completion** — ending step before genuinely done, pull of post-completion steps winning. Defend: **sharpen bound first** (local, cheap); only if irreducibly fuzzy _and_ you observe rush, hide later steps by splitting sequence. Hiding only works across real context boundary (handoff or subagent; inline call leaves later steps in context).
- **Demand**: how much it requires. "Every modified `ns` linted via `clj-kondo`" forces thorough work where "produce change list" does not. Demand drives **legwork** (digging latent in wording). Strongest criteria are both checkable and exhaustive (e.g. `clojure -M:test` green + `clj-kondo` clean).

## When to Split

Splitting spends one of two loads, so split only when cut earns it:

- **By sequence**: split run of steps where post-completion steps tempt rush of one in front. Keeping them out of view drives legwork.
- **By invocation**, skill-specific: `disable-model-invocation: true` = user must `/skill:name` (for `to-spec`, `implement` etc.). Leave `false` for `codebase-design`, `diagnosing-bugs` that agent should auto-reach.

## Leading Words

A **leading word** is compact concept already in model's pretraining that agent thinks with (`seam`, `tracer bullet`, `tight loop`, `red`). Repeated as token, never sentence, it anchors behaviour in fewest tokens by recruiting priors. Made-up word recruits no priors: pay in definition tokens; reach for existing word first.

Anchors twice. In body, _execution_: agent reaches for same behaviour every time word appears. In pointer, _invocation_: when same word lives in prompts, docs, codebase, agent links shared language to material.

Hunt opportunities: triad spelled out at three sites → collapse into token: "fast, deterministic, low-overhead" → _tight_ (_tight_ loop). "Loop you believe in" → _red_ (loop goes _red_ on bug). Win twice: fewer tokens, sharper hook.

**Clojure leading words to reuse:** `seam` (ns public API), `depth` / `leverage` / `locality` (from `codebase-design`), `tracer bullet` (vertical slice), `tight` + `red` (diagnosing loop), `CONTEXT.md` terms (domain). Don't coin new ones if existing fits.

**Negation** — failure beside this lever: steering by prohibition drags forbidden behaviour into context and makes it _more_ available. _Don't think of elephant_ → elephant is all there is. Prompt **positive**: "write one-line `;;` comments" so banned one never spoken. Prohibition earns place only as hard guardrail you cannot phrase positively; pair with positive target.

## Pruning

- Keep each meaning in **single source of truth**: one authoritative place, so changing behaviour is one-place edit. **Duplication** (same meaning in 2 places) costs maintenance + tokens, inflates prominence past rank. (Inverse of leading word, which repeats token on purpose, never meaning.)
- **Environment is source of truth too** (`deps.edn` scripts, `bb.edn`, `clj-kondo` config, `ls src/`). Document restating it is **cache**: copy of lookup, earning load only when lookup expensive. Cache what agent cannot find by looking: unwritten convention, reason behind choice, gotcha no config confesses. Leave one-file, one-command lookups to environment.
- Check every line for **relevance**: does it still bear on what doc does? Line loses relevance by never bearing on task or going stale. Shorter docs easier to keep relevant. Without pruning, default fate is **sediment**: stale layers settle because adding feels safe and removing risky, until you must core down.
- Hunt **no-ops** sentence by sentence: instruction model already obeys by default pays load to say nothing. Test (`does it change behaviour vs default?`) is model-relative: settle by running doc, not debate. When fails, delete whole sentence not trim words. Grades leading words too: word too weak to beat default (_be thorough_ when already thorough-ish) is no-op; fix is stronger word (_relentless_).

## Pi + Clojure Checklist Before Saving Skill/AGENTS.md

- [ ] `name` valid, `description` specific with branches
- [ ] No `npm`/`tsc` where `deps.edn`/`bb` belongs
- [ ] `AGENTS.md` points to `CONTEXT.md` / `docs/adr/` / `bb tasks`, not duplicates them
- [ ] Every step has checkable, demanding completion criterion (`bb test` green, `clj-kondo` clean)
- [ ] No duplication across `AGENTS.md` + skills; single source of truth
- [ ] Negation only as paired guardrail; otherwise positive phrasing
- [ ] `/reload` to hot-load, then test with trivial prompt triggering the pointer
