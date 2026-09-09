# pi - globals in home

- Source: `~/.pi/agent/` -> `home/.pi/agent/`
- Files:
  - `AGENTS.md` - machine + stack + behavior prefs
  - `settings.json` - defaultProvider `opencode`, model `muse-spark-1.2`
  - `models.json` - ollama provider (`hermes3:3b`, `qwen2.5-coder:3b`)
  - `bin/clean-opencode-free.bb` - cleanup script (`rg` excluded, re-downloadable)
- Secrets: `auth.json`, `models-store.json`, `sessions/` excluded
- Skills: `../../skills/pi/` (9 skills)
- Prompts: `../../prompts/pi/` (15 prompts)
- Restore: `restore.sh --dry-run AGENTS.md`
