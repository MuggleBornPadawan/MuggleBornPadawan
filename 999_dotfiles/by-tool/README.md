# by-tool - per-agent view (index only, no data move)

- Physical data stays in `home/` (mirrors `~`) + `skills/` + `prompts/` for simple `rsync -a home/ ~` restore.
- This folder is docs only - links to where each tool lives.

## pi (Muse Spark)
- Globals: `home/.pi/agent/AGENTS.md`, `settings.json`, `models.json`, `bin/clean-opencode-free.bb`
- Skills: `skills/pi/` (9: codebase-design, domain-modeling, grilling, grill-with-docs, improve-codebase-architecture, prototype, research, wayfinder, wizard)
- Prompts: `prompts/pi/` (15 prompts)
- Home source: `~/.pi/agent/`
- Restore: `restore.sh --dry-run AGENTS.md`

## agy / gemini (Antigravity)
- Globals: `home/.gemini/settings.json`, `trustedFolders.json`, `projects.json`, `home/.gemini/antigravity-cli/settings.json`, `home/.gemini/config/config.json`, `mcp_config.json`
- Skills:
  - `skills/agy/config/` (6: andrej-karpathy-skills, context-keeper, graphify, plan-critique, ponytail, superpowers) <- `~/.gemini/config/skills/`
  - `skills/agy/builtin/` (5: agy-customizations, antigravity_guide, generative_ui, migrate-workflows, permissioned-github) <- `~/.gemini/antigravity-cli/builtin/skills/`
- Home source: `~/.gemini/`
- Secrets excluded: `oauth_creds.json`, `google_accounts.json`, `mcp-oauth-tokens*`, `state.json`, `brain/`, `conversations/`

## opencode
- Globals: `home/.config/opencode/opencode.jsonc`, `package.json`, `package-lock.json`, `plugins/compaction-optimizer.js`
- Home source: `~/.config/opencode/`
- Excluded: `node_modules/` (584 files, 30MB), lean
- Plugin: custom `compaction-optimizer.js` (preserve state on compact)

## ollama
- Globals: `home/.ollama/config.json`
- Home source: `~/.ollama/`
- Excluded: `models/blobs/` + `manifests/` (1-2GB, re-downloadable), `cache/`
- Config: `ollama` provider for opencode + pi (`baseURL http://localhost:11434/v1`, models `hermes3:3b`, `qwen2.5-coder:3b`)

## agents (Muse)
- Skills: `skills/agents/` (14: brainstorming, context-keeper, executing-plans, finishing-a-development-branch, hf-cli, karpathy-guidelines, receiving-code-review, systematic-debugging, test-driven-development, using-git-worktrees, using-superpowers, verification-before-completion, writing-plans, writing-skills)
- Home source: `~/.agents/skills/` (no globals, skills only)

## templates (repo)
- `templates/Dockerfile`, `Jenkinsfile`, `.gitignore` <- `~/MuggleBornPadawan/` (not `~/`)
