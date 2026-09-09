---
name: to-spec
description: "Turn the current conversation into a spec and publish it to the project issue tracker: no interview, just synthesis of what you've already discussed. Clojure-adapted: seams are ns public APIs, deps.edn not package.json."
disable-model-invocation: true
---

# To Spec — Clojure Patch

This skill takes the current conversation context and codebase understanding and produces a spec. Do NOT interview the user; just synthesize what you already know.

> **Clojure adaption of `mattpocock/skills:to-spec`.** Pure Markdown, no deps. Lean-machine safe. See original at `https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec`.

## Pi Global Install

- Location: `~/.agents/skills/to-spec/` (global, cross-harness: pi, Codex, Claude all see it). Pi also scans `~/.pi/agent/skills/` — do not duplicate there.
- Reload after edit: `/reload`

The issue tracker and triage label vocabulary should have been provided to you. If not, check `docs/agents/issue-tracker.md` or ask the user which tracker to use (`GitHub Issues`, `Linear`, or local `.scratch/` files). For new Clojure projects with no tracker, default to local `.scratch/` and note it in the spec.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary (`CONTEXT.md`) vocabulary throughout the spec, and respect any ADRs in `docs/adr/`.

   **Clojure check:** look for `deps.edn` (preferred) or `project.clj`. Note test runner: `clojure -M:test` / `bb test` / `lein test`. Note lint: `clj-kondo`, formatter `cljfmt`. Do not propose `npm` or `tsc`.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better - the ideal number is one.

   **Clojure seams:** a seam is a public `ns` API (public `defn`s) — not private `defn-` or internals. Prefer pure-function seams that take data and return data. If you need I/O (DB, HTTP), put the seam at the protocol/port boundary so you can swap `PostgreSQL` ↔ `SQLite`/in-memory fake. Ask: "What's the public ns API, and which seams should we test?"

   Check with the user that these seams match their expectations. If `codebase-design` vocabulary helps, call it for seam placement.

3. Write the spec using the template below, then publish it to the project issue tracker. Apply the `ready-for-agent` triage label — no need for additional triage. If local files, write to `.scratch/<feature-slug>/spec.md` and reference it.

<spec-template>

## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A LONG, numbered list of user stories. Each user story should be in the format of:

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

This list of user stories should be extremely extensive and cover all aspects of the feature.

## Implementation Decisions

A list of implementation decisions that were made. This can include:

- The namespaces / modules that will be built/modified (e.g. `app.orders`, `app.billing`)
- The public `defn` interfaces that will be exposed or changed (keep small; hide impl behind data)
- Technical clarifications from the developer
- Architectural decisions (e.g. pure functions at core, side-effects at edges)
- Schema changes: DDL for PostgreSQL (prod) / SQLite (local), or `clojure.spec` / `malli` schemas
- API contracts: EDN/JSON shapes, handler signatures
- Specific interactions between namespaces

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it within the relevant decision and note briefly that it came from a prototype. Trim to the decision-rich parts, not a working demo, just the important bits.

**Clojure notes:**
- Prefer `deps.edn` + `clojure CLI` (1.12.6) for new work; `project.clj`/`lein` only if repo already uses it.
- Keep dependencies minimal; use `neil` to add, `bb` for shell scripts.
- Keep functions data-oriented, idiomatic `->`/`->>` threading, namespaces clean of unused requires.

## Testing Decisions

A list of testing decisions that were made. Include:

- A description of what makes a good test (only test external behaviour through public `ns` API, not `defn-` internals)
- Which namespaces/seams will be tested
- Prior art for the tests (i.e. similar `clojure.test` tests in the codebase)
- Lint/format gates: `clj-kondo --lint src`, `cljfmt check`

## Out of Scope

A description of the things that are out of scope for this spec.

## Further Notes

Any further notes about the feature. Mention if REPL-driven workflow with Emacs/CIDER is expected for this area.

</spec-template>

## After Writing

- If you ran a prototype earlier, cite its path and what decision it proved.
- Keep the spec free of `npm`/`tsc` assumptions. Use `clojure -M:test` or `bb test` as the verification command.
