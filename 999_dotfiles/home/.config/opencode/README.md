# opencode - globals in home

- Source: `~/.config/opencode/` -> `home/.config/opencode/`
- Files:
  - `opencode.jsonc` - provider `ollama` (`baseURL http://localhost:11434/v1`, models `hermes3:3b`, `qwen2.5-coder:3b`)
  - `package.json` - `@opencode-ai/plugin 1.18.18`
  - `package-lock.json` - lockfile (14KB)
  - `.gitignore` - ignore `node_modules`
  - `plugins/compaction-optimizer.js` - custom: preserve state on compact (architectural constraints, file paths, errors, roadmap)
- Excluded: `node_modules/` (584 files), `cache/`
- Restore: `restore.sh --dry-run opencode.jsonc`
