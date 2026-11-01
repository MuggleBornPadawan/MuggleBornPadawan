# Diagnosing Bugs — Phases 2-6 (Reference)

## Phase 2: Reproduce + minimise
Run loop. Watch it go red. Confirm: user symptom, reproducible, captured. Then minimise — cut inputs/config/steps one at a time, re-run loop, keep only load-bearing elements. Done when removing any element makes loop green.

## Phase 3: Hypothesise
Generate 3–5 ranked, **falsifiable** hypotheses. Format: "If <X> is cause, then <changing Y> will make bug disappear". Show ranked list to user before testing.

## Phase 4: Instrument
Map one probe per hypothesis. Change one variable at a time. Preference: 1) REPL/CIDER inspect 2) `tap>` + `println` at ns boundaries with `[DBG-xxxx]` tag 3) Never log everything. Perf regressions: measure first (`criterium/bench`, `time`, `EXPLAIN QUERY PLAN`).

## Phase 5: Fix + regression test
If correct seam exists: turn minimised repro into failing `deftest` → watch fail → fix → watch pass → re-run Phase 1 loop. If no correct seam, document architecture gap (flag for `codebase-design`).

## Phase 6: Cleanup
- [ ] Original repro no longer reproduces
- [ ] Regression test passes (or gap documented)
- [ ] All `[DBG-...]` removed (`grep -r "DBG-" src/`)
- [ ] Throwaway bb prototypes deleted
- [ ] Correct hypothesis in commit/PR
- [ ] `clj-kondo --lint src` clean

## Lean Notes
Prefer `bb` for loops; warm REPL > cold JVM. Keep tests pure data in→data out. Don't add `criterium`/`test.check` without approval.
