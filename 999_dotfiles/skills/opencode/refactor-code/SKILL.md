---
name: refactor-code
description: >-
  Perform safe, incremental code refactoring without changing public behavior or adding features.
---

# Incremental Code Refactorer

Refactor the specified target namespace or file sequentially.

Clojure Stack Conventions:
- Idiomatic threading (`->`, `->>`), pure functions, and minimal state.
- Clean `ns` requires; run `clj-kondo --lint src` and `cljfmt check` after edits.

Constraints:
- Behavior must not change — no new features, no fixes mixed in
- Improve structure, naming, duplication, and readability only
- Preserve public APIs unless renaming is clearly safe and local

Steps:
1. Identify concrete problems first (list them briefly)
2. Refactor incrementally in small steps
3. Run existing tests after each significant step
4. Summarize what changed at the end

If there are no tests covering this code, say so before starting.
