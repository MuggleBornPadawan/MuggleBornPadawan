# gemini / agy - globals in home

- Source: `~/.gemini/` -> `home/.gemini/`
- Files:
  - `settings.json` - auth `oauth-personal`, theme Default
  - `trustedFolders.json` - allowed workspaces (MuggleBornPadawan etc)
  - `projects.json` - project map
  - `antigravity-cli/settings.json` - model `Gemini 3.6 Flash`, trustedWorkspaces
  - `config/config.json` - `remoteControlHostname`
  - `config/mcp_config.json` - MCP servers (now empty)
- Skills:
  - `../../skills/agy/config/` <- `~/.gemini/config/skills/` (6)
  - `../../skills/agy/builtin/` <- `~/.gemini/antigravity-cli/builtin/skills/` (5)
- Secrets excluded: `oauth_creds.json`, `google_accounts.json`, `mcp-oauth-tokens*`, `state.json`, `brain/`, `conversations/`, `*.db`
