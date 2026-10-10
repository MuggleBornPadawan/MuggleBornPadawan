---
name: review
description: Review git diff/file for bugs, security, perf, style. Delegates to code-review skill.
argument-hint: "[file|diff]"
---

Review {{ARGS}} (file or current git diff if empty).

Delegates to `code-review` skill for full checklist.
Prompt shortcut: check bugs | security | perf | naming/readability | missing error handling
For each finding: severity (critical/major/minor), file:line, what's wrong, concrete fix.
Large diff: critical/major first. Clojure also: clj-kondo, cljfmt, unused requires, ->/->>, new deps without ask.
