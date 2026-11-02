---
name: changelog
description: Update Keep-a-Changelog from commits since last tag. Use when user asks to update changelog, cut release, or summarize commits.
argument-hint: "[version]"
---

Update the changelog for {{ARGS}} (version string or empty for Unreleased).

1. Read existing CHANGELOG.md to match format exactly.
2. List commits since last tag: `git log $(git describe --tags --abbrev=0 2>/dev/null || echo HEAD~20)..HEAD --oneline`
3. Review diffs for noteworthy changes commit messages miss
4. Group entries: Added / Changed / Fixed / Removed / Security (Keep a Changelog)
5. Write user-facing descriptions — skip internal chores unless they affect consumers
6. Prepend under `## [Unreleased]` or `## [{{ARGS}}]` if version given.

No code changes beyond CHANGELOG.md.
