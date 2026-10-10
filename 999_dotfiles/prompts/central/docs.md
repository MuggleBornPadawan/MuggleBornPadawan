---
name: docs
description: Generate docstrings/comments for exported functions. Use when user asks to document code.
argument-hint: "[file|diff]"
---

Generate docs for {{ARGS}} (file or current git diff if empty).

1. Read neighboring files to match doc style first
2. For each exported/public defn/class/module: write docstring covering purpose, params, return, side effects, usage example if non-trivial
3. Document *why*, not just *what* — skip trivial getters
4. If README/docs mention this area, flag update needed

Do not add noise comments to obvious code. Clojure: idiomatic docstrings, not `//`.
