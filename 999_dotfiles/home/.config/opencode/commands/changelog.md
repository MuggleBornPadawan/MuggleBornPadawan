Update the changelog.

1. List all commits since the last tag (`git log $(git describe --tags --abbrev=0)..HEAD --oneline`)
2. Review the actual diffs for anything noteworthy that commit messages miss
3. Group entries by type: Added / Changed / Fixed / Removed / Security (Keep a Changelog style)
4. Write user-facing descriptions — skip internal chores unless they affect consumers
5. Prepend the entries under an `## [Unreleased]` heading (or ask me for the version number)

Match the existing changelog format exactly.
