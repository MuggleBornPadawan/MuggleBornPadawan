---
name: code-review
description: "Review the changes since a fixed point along two axes: Standards and Spec. Clojure-adapted: sequential axes (pi has no sub-agents), clojure.test/clj-kondo/cljfmt aware."
---

# Code Review — Clojure Patch

Two-axis review of the diff between `HEAD` and a fixed point the user supplies:

- **Standards**: does the code conform to this repo's documented coding standards?
- **Spec**: does the code faithfully implement the originating issue / spec?

> **Clojure adaption of `mattpocock/skills:code-review`.** Original uses parallel sub-agents; **pi has no background agents** (`research` skill notes "do it sequentially"), so this patch runs axes **sequentially in this session**. Results are still reported side-by-side under `## Standards` / `## Spec` without merging. See original at `https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review`.

## Pi Global Install

- Location: `~/.agents/skills/code-review/` (global). `/reload` after edit.

## Process

### 1. Pin the fixed point

Whatever the user said is the fixed point (a commit SHA, branch name, tag, `main`, `HEAD~5`, etc.). If they didn't specify one, ask for it.

Capture the diff command once: `git diff <fixed-point>...HEAD` (three-dot, so the comparison is against the merge-base). Also note the list of commits via `git log <fixed-point>..HEAD --oneline`.

Before going further, confirm the fixed point resolves (`git rev-parse <fixed-point>`) and the diff is non-empty. A bad ref or empty diff should fail here — fix the ref, don't invent a review.

### 2. Identify the spec source

Look for the originating spec, in this order:

1. Issue references in the commit messages (`#123`, `Closes #45`, GitLab `!67`, etc.), fetched via the workflow in `docs/agents/issue-tracker.md` (if that file missing, tell the user to create it or default to local `.scratch/`).
2. A path the user passed as an argument.
3. A spec file under `docs/`, `specs/`, or `.scratch/` matching the branch name or feature.
4. If nothing is found, ask the user where the spec is. If they say there isn't one, the **Spec** axis will be skipped and reported as "no spec available".

### 3. Identify the standards sources — Clojure stack

Gather anything that documents how Clojure code should be written:

- `AGENTS.md` / `CLAUDE.md` / `CONTRIBUTING.md` / `CODING_STANDARDS.md` / `docs/adr/*`
- **Clojure community style guide** (idiomatic `->`/`->>` threading, namespaces clean of unused requires, data-oriented, simple)
- Tooling already enforced (skip what tooling covers): `clj-kondo` (lint), `cljfmt` (format), `clojure-lsp`

On top of whatever the repo documents, the Standards axis always carries the **smell baseline** below: a fixed set of Fowler code smells (_Refactoring_, ch.3) adapted for Clojure that applies even when a repo documents nothing. Two rules bind it:

- **The repo overrides.** A documented repo standard always wins; where it endorses something the baseline would flag, suppress the smell.
- **Always a judgement call.** Each smell is a labelled heuristic ("possible Feature Envy"), never a hard violation. Like any standard here, skip anything tooling already enforces. Keep diff-local.

**Smell baseline — Clojure reading:**

Each smell reads *what it is* → *how to fix*; match it against the diff:

- **Mysterious Name**: a `defn`/`def`/`ns` whose name doesn't reveal what it does or holds. → rename; if no honest name comes, the design is murky.
- **Duplicated Code**: the same logic shape appears in more than one hunk or `ns` in the change. → extract a pure `defn`, call it from both.
- **Feature Envy**: a fn that reaches into another `ns`'s data more than its own (e.g. threading through `(:x m)` chains). → move the fn onto the data it envies, or pass a map.
- **Data Clumps**: the same few keys/params keep travelling together (a map wanting to be a spec). → bundle into one map with `clojure.spec`/`malli` schema, pass that.
- **Primitive Obsession**: a string/keyword/number standing in for a domain concept that deserves its own spec/type. → give the concept a small spec or namespaced keyword.
- **Repeated Switches**: the same `cond`/`case`/`multimethod` dispatch on the same type recurs. → replace with `defmulti`/`defprotocol` or one dispatch map both sites share.
- **Shotgun Surgery**: one logical change forces scattered edits across many `ns` in the diff. → gather what changes together into one `ns` (depth).
- **Divergent Change**: one `ns`/`defn` is edited for several unrelated reasons. → split so each `ns` changes for one reason.
- **Speculative Generality**: extra arity, opts-map keys, or hooks added for needs the spec doesn't have. → delete it; inline back until a real need shows.
- **Message Chains**: long `(:a (:b (:c x)))` / `->` chains the caller shouldn't depend on. → hide the walk behind one `defn` on the first `ns`.
- **Middle Man**: a `ns`/`defn` that mostly delegates. → cut it, call the real target direct.
- **Refused Bequest**: a `defrecord`/`deftype` that ignores most of what it inherits. → drop inheritance, use composition.

### 4. Run both axes — sequentially (pi constraint)

Do **Standards** first, then **Spec** — not in parallel. Keep their contexts separate: do not let findings from one leak into the other until aggregation.

**Standards axis — prompt to self:**

- Inputs: full diff command + commit list + standards-source files + smell baseline above pasted in full.
- Brief: "Report, per file/hunk where relevant, (a) every place the diff violates a documented standard: cite the standard (file + rule); and (b) any baseline smell you spot: name it and quote the hunk. Distinguish hard violations from judgement calls: documented-standard breaches can be hard, but baseline smells are always judgement calls, and a documented repo standard overrides the baseline. Skip anything `clj-kondo`/`cljfmt` already enforces. Under 400 words."

**Spec axis — prompt to self:**

- Inputs: diff command + commit list + spec path/contents.
- Brief: "Report: (a) requirements the spec asked for that are missing or partial; (b) behaviour in the diff that wasn't asked for (scope creep); (c) requirements that look implemented but where the implementation looks wrong (e.g. wrong pure-fn contract, missing `clojure.test` at seam). Quote the spec line for each finding. Under 400 words."

If spec is missing, skip Spec axis and note "no spec available" in final report.

**Clojure verification before reporting:**

- Run `clj-kondo --lint src` and note new warnings introduced by diff (if `clj-kondo` not installed, say so — don't hallucinate).
- Run `clojure -M:test -n <touched-ns>` or `bb test` for a quick sanity check if cheap on this 6 Gi machine.

### 5. Aggregate

Present the two reports under `## Standards` and `## Spec` headings, verbatim or lightly cleaned. Do **not** merge or rerank findings, because the two axes are deliberately separate (see _Why two axes_).

End with a one-line summary: total findings per axis, and the worst issue _within each axis_ (if any). Don't pick a single winner across axes: that's the reranking the separation exists to prevent.

## Why two axes

A change can pass one axis and fail the other:

- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail.**
- Code that does exactly what the issue asked but breaks the project's conventions → **Spec pass, Standards fail.**

Reporting them separately stops one axis from masking the other.
