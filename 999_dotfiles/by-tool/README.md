# by-tool - per-agent view (index only, no data move)

- Physical data stays in `home/` (mirrors `~`) + `skills/central/` + `prompts/central/` + `memory/central` for simple restores.
- Ground truth is central (`~/.local/share/`). Compat copies (`skills/pi`, `skills/opencode`, `skills/agy/config`, `prompts/pi`, opencode `commands/`) are NOT stored. Re-derived via harness-sync.
- This folder is docs only - links to where each tool lives.

## pi (coding agent)
- Context: `home/.pi/agent/AGENTS.md` (symlink to `memory/central/assembled/pi.md`)
- Globals: `home/.pi/agent/AGENTS.md`, `settings.json`, `models.json`, `bin/`
- Skills: `skills/central/` (symlinked as `~/.pi/agent/skills`)
- Prompts: `prompts/central/` (symlinked as `~/.pi/agent/prompts`)
- Home source: `~/.pi/agent/`
- Restore: `restore.sh --dry-run AGENTS.md`

## agy / gemini (Antigravity)
- Globals: `home/.gemini/settings.json`, `trustedFolders.json`, `projects.json`, `home/.gemini/antigravity-cli/settings.json`, `home/.gemini/config/config.json`, `mcp_config.json`
- Skills:
  - `skills/central/` (symlinked as `~/.gemini/config/skills`)
  - `skills/agy/builtin/` <- `~/.gemini/antigravity-cli/builtin/skills/`
- Home source: `~/.gemini/`
- Secrets excluded: `oauth_creds.json`, `google_accounts.json`, `mcp-oauth-tokens*`, `state.json`, `brain/`, `conversations/`

## opencode
- Globals: `home/.config/opencode/opencode.jsonc`, `package.json`, `package-lock.json`, `.gitignore`, `plugins/`
- Commands: `prompts/central/` (symlinked as `~/.config/opencode/commands`)
- Skills: `skills/central/` (symlinked as `~/.config/opencode/skills`)
- Home source: `~/.config/opencode/`
- Excluded: `node_modules/`, lean

## ollama
- Globals: `home/.ollama/config.json`
- Home source: `~/.ollama/`
- Excluded: `models/blobs/` + `manifests/` (1-2GB, re-downloadable), `cache/`

## agents (shared skills)
- Skills: `skills/agents/` <- `~/.agents/skills/` (no globals, skills only)

## memory (all harnesses)
- Core: `memory/central/AGENTS_CORE.md` <- `~/.local/share/agent-memory/`
- Assembled per harness: `memory/central/assembled/{gemini,pi,opencode}.md` (generated, do not hand-edit)

## templates (repo)
- `templates/Dockerfile`, `Jenkinsfile`, `.gitignore` <- `~/MuggleBornPadawan/` (not `~/`)
