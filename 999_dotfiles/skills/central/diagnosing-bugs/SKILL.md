---
name: diagnosing-bugs
description: "Diagnosis loop for hard bugs and performance regressions. Clojure-adapted: tight feedback via clojure.test/bb/REPL first, then curl/harness. Lean-machine safe."
---

# Diagnosing Bugs — Clojure Patch

A discipline for hard bugs. Skip phases only when explicitly justified. Do this sequentially — **pi has no background agents**, so run each phase in this session.

> **Clojure adaption of `mattpocock/skills:diagnosing-bugs`.** Pure Markdown, 0 deps. Lean-machine safe. See original at `https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs`. Location: `~/.agents/skills/diagnosing-bugs/` (global). `/reload` after edit.

When exploring the codebase, read `CONTEXT.md` (if it exists) to get a clear mental model of the relevant `ns` modules, and check ADRs in `docs/adr/` in the area you're touching.

## Redact

This skill has you show commands, outputs and captured artifacts. **Redact every secret first**: write `<REDACTED>` in its place. Build loops against env vars, so the credential stays in the environment rather than in what you show. Captured artifacts carry auth headers: quote only the lines that carry the signal.

If the redacted output is not enough to diagnose the bug, say so and ask the user.

## Phase 1: Build a feedback loop

**This is the skill.** Everything else is mechanical. If you have a **tight** pass/fail signal for the bug (one that goes red on _this_ bug), you will find the cause; bisection, hypothesis-testing, and instrumentation all just consume it. If you don't have one, no amount of staring at code will save you.

Spend disproportionate effort here. **Be aggressive. Be creative. Refuse to give up.**

### Ways to construct one — Clojure priority order

1. **Failing `clojure.test` at the `ns` seam** that reaches the bug: unit at pure `defn`, integration with `PostgreSQL`/`SQLite` fake. Runner: `bb test` (fast, low RAM) → `clojure -M:test -n my.ns` → `lein test`. Preferred on this 6 Gi box.
2. **REPL harness** — minimal `(comment ...)` call that exercises the bug `ns` with one fn call. Eval via CIDER or `clojure -M -e "(require 'my.ns) (my.ns/f …)"`. Fast, no JVM restart if REPL already up.
3. **CLI `bb` invocation** with a fixture EDN/JSON input, diffing stdout against a known-good snapshot. Use `bb` for shell speed.
4. **Curl / HTTP script** against a running dev server (`clojure -M:run` or `bb` server) if bug is at handler boundary.
5. **Replay a captured trace.** Save a real request / payload / event log (EDN) to disk; replay it through the code path in isolation.
6. **Throwaway `bb` harness.** Spin up a minimal subset (`--classpath` one `ns`, mocked deps via `with-redefs`) that exercises the bug code path.
7. **Property / fuzz loop.** If "sometimes wrong output", run 1000 random inputs via `test.check` and look for failure.
8. **Bisection harness.** If bug appeared between two known commits/datasets/versions, automate "boot at state X, check, repeat" so you can `git bisect run` it.
9. **Differential loop.** Run same EDN input through old vs new `ns` version (or two configs) and diff outputs.
10. **Headless browser script** (Playwright / Puppeteer) — **last resort on this machine**. Heavy (RAM/disk). Avoid unless bug is truly frontend.
11. **HITL bash script.** If a human must click, drive _them_ with a script so loop is still structured.

Build the right feedback loop, and the bug is 90% fixed.

### Tighten the loop

Treat the loop as a product. Once you have _a_ loop, **tighten** it:

- Can I make it faster? (Cache JVM via `bb`, skip unrelated `ns` init, narrow to one `deftest`.)
- Can I make the signal sharper? (Assert on the specific symptom `ex-data`, not "didn't throw".)
- Can I make it more deterministic? (Pin `*seed*`, freeze `java.time` clock, isolate `SQLite` temp DB, stub `http`).

A 30-sec flaky loop is barely better than no loop; a 2-sec deterministic `bb test -n my.ns` is a superpower. On this i3/6 Gi box, `bb` beats `clojure -M:test` for tightness.

### Non-deterministic bugs

Goal is not a clean repro but a **higher reproduction rate**. Loop trigger 100× (`bb -e "(dotimes [_ 100] …)"`), parallelise via `pmap`, add stress, narrow timing, inject sleeps. A 50%-flake bug is debuggable; 1% is not — keep raising rate until debuggable.

### When you genuinely cannot build a loop

Stop and say so explicitly. List what you tried. Ask the user for: (a) access to whatever env reproduces it, (b) a redacted captured artifact (EDN log, `tap>`, core dump, screen recording with timestamps), or (c) permission to add temporary prod instrumentation via `tap>`/`add-tap`. Do **not** proceed to hypothesise without a loop.

### Completion criterion: a tight loop that goes red

Phase 1 is done when the loop is **tight** and **red-capable**: you can name **one command** (a script path, `bb test -n my.ns`, `clojure -M:test`, `curl`) that you have **already run at least once** (show invocation + output, redacted), and that is:

- [ ] **Red-capable**: it drives the actual bug code path and asserts the **user's exact symptom**, so it can go red on this bug and green once fixed. Not "runs without erroring".
- [ ] **Deterministic**: same verdict every run (flaky bugs: a pinned, high reproduction rate).
- [ ] **Fast**: seconds, not minutes. Prefer `bb`.
- [ ] **Agent-runnable**: you can run it unattended.

If you catch yourself reading code to build a theory before this command exists, **stop: jumping to a hypothesis is the exact failure this skill prevents.** No red-capable command, no Phase 2.

## Phase 2: Reproduce + minimise

Run the loop. Watch it go red as the bug appears.

Confirm:

- [ ] The loop produces the failure mode the **user** described, not a different nearby failure. Wrong bug = wrong fix.
- [ ] The failure is reproducible across multiple runs (or high rate for non-deterministic).
- [ ] You have captured the exact symptom (exception, wrong EDN, slow timing) so later phases verify the fix.

### Minimise

Once red, shrink repro to **smallest scenario that still goes red**. Cut inputs, callers, config, data, steps **one at a time**, re-running loop after each cut, keep only what's load-bearing.

Why: minimal repro shrinks hypothesis space (Phase 3) and becomes clean regression `deftest` in Phase 5.

Done when **every remaining element is load-bearing**: removing any one makes loop go green.

Do not proceed until reproduced **and** minimised.

## Phase 3: Hypothesise

Generate **3–5 ranked hypotheses** before testing any. Single-hypothesis anchors on first plausible idea.

Each hypothesis must be **falsifiable**: state the prediction.

> Format: "If <X> is the cause, then <changing Y> will make bug disappear / <changing Z> will make it worse."

If you cannot state prediction, it's a vibe: discard or sharpen.

**Show ranked list to user before testing.** They often re-rank instantly ("we just changed `app.orders`"), or know already-ruled-out ones. Cheap checkpoint.

## Phase 4: Instrument

Each probe must map to a specific prediction from Phase 3. **Change one variable at a time.**

Tool preference for Clojure:

1. **REPL inspection** / debugger if env supports it (CIDER `C-c C-v` inspect). One breakpoint beats ten logs.
2. **`tap>` / `add-tap` + targeted `println`/`log` at `ns` boundaries** that distinguish hypotheses. Prefer `tap>` — keeps `ns` clean.
3. Never "log everything and grep".

**Tag every debug tap/log** with unique prefix, e.g. `[DBG-a4f2]`. Cleanup becomes one grep. Untagged logs survive; tagged die.

**Perf branch.** For perf regressions, logs are usually wrong. Instead: baseline measurement (`criterium/bench`, `time`, `EXPLAIN QUERY PLAN` for DB), then bisect. Measure first, fix second.

## Phase 5: Fix + regression test

Write regression `deftest` **before the fix**, but only if there is a **correct seam**.

A correct seam is one where test exercises **real bug pattern** as it occurs at call site. If only available seam is too shallow (single-caller test when bug needs multiple callers, test that can't replicate chain), that test gives false confidence.

**If no correct seam exists, that itself is the finding.** Note it. Architecture is preventing bug lockdown. Flag for next phase / `codebase-design`.

If correct seam exists:

1. Turn minimised repro into failing `deftest` at that `ns` seam.
2. Watch it fail (`bb test -n my.ns`).
3. Apply fix.
4. Watch it pass.
5. Re-run Phase 1 feedback loop against original (un-minimised) scenario.

## Phase 6: Cleanup

Required before done:

- [ ] Original repro no longer reproduces (re-run Phase 1 loop)
- [ ] Regression test passes (or absence of seam documented)
- [ ] All `[DBG-...]` taps/logs removed (`grep -r "DBG-" src/`)
- [ ] Throwaway `bb` prototypes deleted (or moved to clearly-marked debug location)
- [ ] Hypothesis that was correct is stated in commit / PR message
- [ ] `clj-kondo --lint src` shows no new warnings introduced

## Clojure Lean Notes

- Prefer `bb` for loops — JVM `clojure -M:test` is heavy on 6 Gi. Warm REPL > cold JVM.
- Keep tests pure data in → data out. Use `with-redefs` sparingly; prefer protocol/port fake for DB/HTTP.
- Do not add `criterium` or `test.check` without asking (per `AGENTS.md`). If needed, `neil add` after approval.
