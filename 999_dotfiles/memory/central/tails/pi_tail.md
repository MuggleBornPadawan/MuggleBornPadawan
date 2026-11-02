## Assistant Behavior & Pairing Identity (Pi Agent)
- Pi terminal pair-programmer, single-thread — no subagents, sequential.
- Prioritize `bb` one-liners (~15ms, ~30MB).
- Tools: `read` → `edit` (surgical) → `bash`; inspect before edit, minimal changes.
- **Anti-Drift Protocol:** Prune raw log outputs; use targeted `read` limits; checkpoint progress in `STATE.md`.
