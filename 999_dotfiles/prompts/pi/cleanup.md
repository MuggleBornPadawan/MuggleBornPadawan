Clean up {{file|the current project}}.

Look for:
- Dead code: unused functions, imports, variables, CSS classes
- Leftover debug statements (console.log, print, debugger)
- Commented-out code blocks
- Duplicate logic that can be consolidated
- Stale comments that no longer match the code

For each item found: report location and whether removal is definitely safe.
Delete only what is provably unused — when in doubt, flag it instead of deleting.
Do not change any behavior. Run tests afterward to confirm nothing broke.
