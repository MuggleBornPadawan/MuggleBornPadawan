---
name: test-driven-development
description: "Use when implementing any feature or bugfix, before writing implementation code. Clojure-adapted: clojure.test + bb, REPL-first, ns seams."
---

# Test-Driven Development — Clojure Patch

## Overview
Write test first, watch fail, minimal code to pass. **If you didn't watch it fail, it proves nothing.**

## When to Use
Always: features, bugfixes, refactoring, behavior changes. Exception (ask): throwaway prototypes, generated code, `deps.edn` itself.

## Iron Law
```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```
Wrote code before test? Delete, start over. No "reference" keep.

## Red-Green-Refactor — Clojure Loop
RED: one minimal `deftest` at public ns seam (clear name, real defn, one thing, literal want via EDN). → Verify RED: `bb test -n app.ns` must fail with expected message (not error). → GREEN: simplest defn to pass, no extra arities. → Verify GREEN: `bb test -n app.ns` passes + `clj-kondo --lint src` clean. → REFACTOR: dedup, name per CONTEXT.md, keep green. → Repeat.

Runners: `bb test -n app.ns` (preferred, low RAM) → `clojure -M:test -n app.ns` → `lein test` → REPL `C-c C-t`.

## Good Tests — Clojure
- Minimal, Clear name, Shows intent via ns API, Data in→data out (pure).
- Before writing deftest: name the production break it catches, derive want as literal EDN not code under test.
- Helpers only in `test/`, not `src/`. `with-redefs` only at port/DB boundary.

See `writing-good-tests.md` + `references/details.md` for dot graph, examples, rationalizations, red flags.

## Quick Rules
- One behaviour per deftest. `and` in name? Split.
- `with-redefs` setup > deftest? Simplify ns or use SQLite real.
- Bug fix? Write failing deftest first, pair with `diagnosing-bugs`.

```
Production defn → deftest exists and failed first at ns seam. Otherwise → not TDD.
```
Prefer `bb test` on 6 Gi box; full `clojure -M:test` at ticket end.
