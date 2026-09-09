# ollama - globals in home

- Source: `~/.ollama/` -> `home/.ollama/`
- Files:
  - `config.json` - `last_selection: claude`, integrations `{}`
- Excluded (lean, 11GB free disk):
  - `models/blobs/` + `manifests/` (1-2GB, re-downloadable: `hermes3:3b`, `qwen2.5-coder:3b`)
  - `cache/model-recommendations.json`
- Used by: opencode (`baseURL http://localhost:11434/v1`) + pi `models.json`
- Restore: `restore.sh --dry-run config.json`
