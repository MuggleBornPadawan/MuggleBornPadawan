---
name: diagnosing-bugs
description: "Diagnosis loop for hard bugs and performance regressions. Clojure-adapted: tight feedback via clojure.test/bb/REPL first, then curl/harness. Lean-machine safe."
---

# Diagnosing Bugs — Clojure Patch

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill diagnosing-bugs
```
- Close: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

A discipline for hard bugs. Sequential — **pi has no background agents**. Skip phases only when justified.

> Delegation: `fix.md` → here. `mattpocock/skills:diagnosing-bugs` adapted. See `references/phases.md` for full Phases 2-6.

Read `CONTEXT.md` + `docs/adr/` before touching code. Redact secrets as `<REDACTED>`.

## Phase 1: Build a tight feedback loop (this IS the skill)

No tight red-capable loop = no diagnosis. Be aggressive building it.

**Clojure priority order:**
1. Failing `clojure.test` at ns seam (`bb test -n my.ns` preferred) 2. REPL harness `(comment (my.ns/f ...))` 3. `bb` CLI with fixture EDN vs snapshot 4. `curl` vs dev server 5. Captured EDN trace replay 6. Throwaway `bb --classpath` harness 7. `test.check` fuzz 8. Bisection 9. Differential old vs new 10. Headless browser (last resort) 11. HITL script

Then tighten: faster (`bb` vs JVM, one `deftest`), sharper (assert `ex-data` not "throws"), deterministic (pin seed/clock, isolate SQLite, stub http).

**Non-deterministic:** raise repro rate — `dotimes 100`, `pmap`, stress/sleeps — until 50%+ flake.

**Cannot build loop?** Stop, list tried, ask for env/artifact/`tap>` permission. Don't hypothesise.

**Done when you have one command** (`bb test -n my.ns` / `curl` / script) already run once, that is:
- [ ] Red-capable (drives bug path, asserts user symptom)
- [ ] Deterministic (or pinned high rate)
- [ ] Fast (seconds, `bb` preferred)
- [ ] Agent-runnable

If you read code to theorise before this exists, stop.

## Phases 2-6 — Summary

1. **Reproduce+minimise:** confirm user symptom, minimise to load-bearing repro. 2) **Hypothesise:** 3-5 ranked falsifiable hypotheses ("If X then changing Y fixes"), show user. 3) **Instrument:** one variable per probe, `tap>` with `[DBG-xxxx]` tag, REPL inspect > logs. 4) **Fix:** regression `deftest` before fix if seam is correct, else flag design gap. 5) **Cleanup:** repro green, logs removed, `clj-kondo` clean.

→ Full detail: `references/phases.md`
