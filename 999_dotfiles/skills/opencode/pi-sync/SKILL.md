---
name: pi-sync
description: Sync pi prompts and skills into opencode. Use when checking drift between ~/.pi/agent and ~/.config/opencode, importing a pi prompt as a command, or importing a pi skill.
---

# Pi Sync

Pi (`~/.pi/agent`) is the source of truth. Opencode (`~/.config/opencode`) holds wrapped copies. This skill keeps them in sync.

## 1. Audit (read-only first)

Run these checks and report a verdict table before changing anything:

```bash
diff ~/.pi/agent/AGENTS.md ~/.config/opencode/AGENTS.md && echo IDENTICAL
ls -1 ~/.pi/agent/prompts/
ls -1 ~/.config/opencode/commands/
ls -1 ~/.pi/agent/skills/
ls -1 ~/.config/opencode/skills/
```

- Prompts: every pi prompt must exist either in `commands/` (on-demand slash command) or in `instructions[]` inside `opencode.jsonc` (always-loaded context). Flag gaps.
- Skills: every pi skill must exist in `skills/` OR in `permission.skill` as `deny` (deliberately excluded). Flag gaps.
- Never import `dotfiles-sync` (pi-machine backup script) or `wizard` (bash wizard authoring). Both are correctly set to `deny`.

## 2. Verdict table

For each gap output one row: name | import / skip | reason.

- Import: generally useful in opencode, no pi-machine coupling.
- Skip: pi-specific tooling, duplicates an opencode built-in, or superseded.

## 3. Import a prompt as a command

Target: `~/.config/opencode/commands/<name>.md`. Follow the existing wrapper pattern (see `commands/commit.md`):

- Frontmatter: `description:` only. Drop pi-only keys like `argument-hint`.
- Body: pi prompt text verbatim, except `${@}` becomes `$ARGUMENTS`.
- Append `$ARGUMENTS` on its own line, then a blank line plus `> Source: \`~/.pi/agent/prompts/<name>.md\``.

## 4. Import a skill

- Copy the whole directory (`SKILL.md` plus any refs like `LOGIC.md`, `scripts/`). Skip caches (`__pycache__`). The loader scans `**/SKILL.md`.
- Keep `name` (= folder name, lowercase, max 64 chars).
- Keep `description` in third person with `Use when...` plus trigger keywords. Skills without a description are filtered out and never surface.
- Strip pi-isms:
  - `Location: ~/.pi/...`, `/reload`, `/skill:` invocations.
  - "Pi Lean Edition" titles, "turn-based", "no subagents" claims. Opencode supports subagents via the Task tool.
  - Absolute `~/.pi/...` paths. Repoint to `~/.config/opencode/skills/<name>/`.
- `disable-model-invocation: true` is a pi-only key. Opencode routes unknown frontmatter into `options` (harmless). Keep or drop, and note the choice in the report.

## 5. Validate and finish

- Validate `opencode.jsonc` still parses if touched. Never add unknown top-level keys. Opencode hard-fails on invalid config.
- If unsure of a field shape, fetch `https://opencode.ai/config.json` (the authoritative schema) instead of guessing.
- Preserve `$schema` and untouched fields.
- `diff -r` the imported skill against the pi source to confirm only intended lines changed.
- Tell the user to quit and restart opencode. Config is loaded once at startup, not hot-reloaded.
