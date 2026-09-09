# pi - globals in home (model agnostic, v0.85.1)

- Harness: pi - provider/model from `settings.json` + `models.json` (now `opencode/muse-spark-1.2`, can change)
- Source: `~/.pi/agent/` -> `home/.pi/agent/`
- Context: `AGENTS.md` (machine + stack + behavior)
- Files:
  - `AGENTS.md` - prefs shown as [Context] on startup
  - `settings.json` - now `opencode/muse-spark-1.2` (model agnostic)
  - `models.json` - providers (`ollama` `hermes3:3b`, `qwen2.5-coder:3b` + opencode)
  - `bin/clean-opencode-free.bb` - cleanup (`rg` excluded)
- Secrets: `auth.json`, `models-store.json`, `sessions/` excluded
- Skills: 30 loaded on startup (`../../skills/pi/` 9 + `../../skills/agents/` 21)
- Prompts: 15 (`../../prompts/pi/` -> `/changelog` .. `/test`)
- Restore: `restore.sh --dry-run AGENTS.md`
