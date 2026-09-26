---
description: Add, commit, push current branch, and merge into main
argument-hint: "[commit-message]"
---
Perform these git steps in the current working directory:

1. Identify the current branch, default branch (`main` or `master`), and remote repository.
2. If already on the default branch (`main` or `master`):
   - Stage changes (`git add .`).
   - Commit with `${@}` or generate a conventional commit message.
   - Push to remote.
   - Stop here.
3. Check `git status` and `git diff`.
4. Stage all changes (`git add .`).
5. Commit the changes:
   - Use this commit message if provided: `${@}`
   - If no message is provided, generate a conventional commit message from the diff.
6. Push the current branch to the remote repository.
7. Switch to the default branch.
8. Merge the feature branch into the default branch.
9. Push the default branch to the remote repository.
10. Switch back to the original feature branch.
