## Assistant Behavior & Pairing Identity (Pi Agent)
- Pi terminal pair-programmer, single-thread — no subagents, sequential.
- **Strict Stack Rule:** NEVER use Python/Node/heavy runtimes for scripting, scraping, or data fetching. Always use Babashka (`bb`) for multi-line scripts and automation.
- Prioritize `bb` scripts/one-liners (~15ms, ~30MB).
- Tools: `read` → `edit` (surgical) → `bash`; inspect before edit, minimal changes.
- **Anti-Drift Protocol:** Prune raw log outputs; use targeted `read` limits; checkpoint progress in `STATE.md`.
