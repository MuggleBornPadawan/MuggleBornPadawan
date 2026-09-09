# by-tool - per-agent view (index only, no data move)

- Physical data stays in `home/` (mirrors `~`) + `skills/` + `prompts/` for simple `rsync -a home/ ~` restore.
- This folder is docs only - links to where each tool lives.

## pi (coding agent - model agnostic, v0.85.1)
- Harness: pi - provider/model from `settings.json` + `models.json` (now `opencode/muse-spark-1.2`, can change anytime)
- Context: `home/.pi/agent/AGENTS.md`
- Globals: `home/.pi/agent/AGENTS.md`, `settings.json`, `models.json`, `bin/clean-opencode-free.bb`
- Skills: 23 loaded as startup shows (`skills/pi` 9: codebase-design, domain-modeling, grilling, grill-with-docs, improve-codebase-architecture, prototype, research, wayfinder, wizard + `skills/agents` 14: brainstorming, context-keeper, executing-plans, finishing-a-development-branch, hf-cli, karpathy-guidelines, receiving-code-review, systematic-debugging, test-driven-development, using-git-worktrees, using-superpowers, verification-before-completion, writing-plans, writing-skills)
- Prompts: 15 (`prompts/pi` -> `/changelog`, `/cleanup`, `/commit`, `/docs`, `/explain`, `/find-bugs`, `/fix`, `/onboard`, `/plan`, `/pr`, `/refactor`, `/review`, `/simplify`, `/sync-free-models`, `/test`)
- Controls: `esc` interrupt, `ctrl+c/d` clear/exit, `/` commands, `!` bash, `ctrl+o` help
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

## agents (shared spec - model agnostic — also loaded by pi, counted above)
- Note: same 14 skills already counted in `pi` 23 above — pi loads both `skills/pi` + `skills/agents`. This section is upstream index only.
- Skills: `skills/agents/` (14: brainstorming, context-keeper, executing-plans, finishing-a-development-branch, hf-cli, karpathy-guidelines, receiving-code-review, systematic-debugging, test-driven-development, using-git-worktrees, using-superpowers, verification-before-completion, writing-plans, writing-skills)
- Home source: `~/.agents/skills/` (no globals, skills only)

## templates (repo)
- `templates/Dockerfile`, `Jenkinsfile`, `.gitignore` <- `~/MuggleBornPadawan/` (not `~/`)
