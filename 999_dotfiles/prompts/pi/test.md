Write tests for {{file|the specified code}}.

Rules:
1. Match the existing test framework and style in this project — look at neighboring test files first
2. Cover the happy path first, then edge cases, error paths, and boundary values
3. One behavior per test; use descriptive test names that read as specifications
4. Arrange–Act–Assert structure; keep fixtures minimal
5. Do not modify production code to make testing easier unless you flag it explicitly

Clojure / lean-machine (AGENTS.md):
- Test at the public `ns` seam: public `defn`, not `defn-`. Pure data in -> data out.
- Runner priority: `bb test -n my.ns` (fast, low RAM on 6 Gi) -> `clojure -M:test -n my.ns` -> `lein test`.
- Use `clojure.test` + `bb`; ask before adding `test.check`/`criterium`. Keep deps minimal.
- Style: idiomatic `->`/`->>` threading, clean `ns` requires; respect `clj-kondo` + `cljfmt`.

Run the tests when done and report results (`bb test -n <ns>` + `clj-kondo --lint src` if Clojure).
