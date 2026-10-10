---
name: test
description: Write tests for file/code. Delegates to clojure-test skill.
argument-hint: "[file]"
---

Write tests for {{ARGS}} (file or specified code).

Delegates to `clojure-test` skill for Clojure discipline.
Steps:
1. Match existing test framework/style (read neighbor tests)
2. Happy path first, then edges, error paths, boundaries
3. One behavior per test, descriptive names (specification style)
4. Arrange–Act–Assert, minimal fixtures
5. Do not modify prod code to ease testing unless flagged

Clojure: public ns seam (`defn` not `defn-`), `bb test -n my.ns` -> `clojure -M:test -n my.ns`; run `bb test -n <ns>` + `clj-kondo --lint src` and report results.
