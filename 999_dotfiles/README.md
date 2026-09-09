# 999_dotfiles - monorepo for dotfiles, skills, prompts, templates

- Source: `~/MuggleBornPadawan/700_linux/bckp/dotfiles.sh` (PAIRS = single truth)
- Restore: `~/MuggleBornPadawan/700_linux/bckp/restore.sh`
- Why plain files: git diff/blame per file, no tar.

## Layout

```
999_dotfiles/
  README.md           # this file (map)
  home/               # mirrors HOME (was dotfiles/) -> restore with rsync -a home/ ~/
    .bashrc, .bash_aliases, .profile, .bash_logout
    .gitconfig, .vimrc, .tmux.conf, .selected_editor
    .emacs.d/{init.el,custom.el,customizations/,bookmarks}
    .config/gh/config.yml, .gnupg/gpg-agent.conf
    .pi/agent/{AGENTS.md,settings.json,models.json,bin/}
    .config/opencode/{opencode.jsonc,package.json,package-lock.json,plugins/}
    .gemini/{settings.json,trustedFolders.json,projects.json,antigravity-cli/settings.json,config/config.json}
    .ollama/config.json
    README.md         # details for home/
  templates/          # repo templates (not dotfiles) - from ~/MuggleBornPadawan/
    Dockerfile, Jenkinsfile, .gitignore
  skills/
    pi/               # from ~/.pi/agent/skills
    agents/           # from ~/.agents/skills
    agy/config/       # from ~/.gemini/config/skills
    agy/builtin/      # from ~/.gemini/antigravity-cli/builtin/skills
  prompts/
    pi/               # from ~/.pi/agent/prompts
```

## Map: HOME -> repo

| Source (HOME) | Dest (repo) | Notes |
|---|---|---|
| `~/.bashrc` | `home/.bashrc` | shell |
| `~/.bash_aliases` | `home/.bash_aliases` | shell |
| `~/.profile` | `home/.profile` | shell |
| `~/.bash_logout` | `home/.bash_logout` | shell |
| `~/.gitconfig` | `home/.gitconfig` | git |
| `~/.vimrc` | `home/.vimrc` | vim |
| `~/.tmux.conf` | `home/.tmux.conf` | tmux |
| `~/.selected_editor` | `home/.selected_editor` | editor |
| `~/.emacs.d/init.el` | `home/.emacs.d/init.el` | emacs |
| `~/.emacs.d/custom.el` | `home/.emacs.d/custom.el` | emacs |
| `~/.emacs.d/customizations/` | `home/.emacs.d/customizations/` | emacs |
| `~/.emacs.d/bookmarks` | `home/.emacs.d/bookmarks` | emacs |
| `~/.config/gh/config.yml` | `home/.config/gh/config.yml` | safe, hosts.yml excluded |
| `~/.gnupg/gpg-agent.conf` | `home/.gnupg/gpg-agent.conf` | gpg |
| `~/MuggleBornPadawan/.gitignore` | `templates/.gitignore` | template |
| `~/MuggleBornPadawan/Dockerfile` | `templates/Dockerfile` | template |
| `~/MuggleBornPadawan/Jenkinsfile` | `templates/Jenkinsfile` | template |
| `~/.pi/agent/AGENTS.md` | `home/.pi/agent/AGENTS.md` | pi global |
| `~/.pi/agent/settings.json` | `home/.pi/agent/settings.json` | pi global |
| `~/.pi/agent/models.json` | `home/.pi/agent/models.json` | pi global |
| `~/.pi/agent/bin/` | `home/.pi/agent/bin/` | pi bin (rg excluded) |
| `~/.pi/agent/skills/` | `skills/pi/` | pi skills |
| `~/.pi/agent/prompts/` | `prompts/pi/` | pi prompts |
| `~/.agents/skills/` | `skills/agents/` | agents skills |
| `~/.gemini/config/skills/` | `skills/agy/config/` | agy config skills |
| `~/.gemini/antigravity-cli/builtin/skills/` | `skills/agy/builtin/` | agy builtin |
| `~/.config/opencode/opencode.jsonc` | `home/.config/opencode/opencode.jsonc` | opencode global |
| `~/.config/opencode/package.json` | `home/.config/opencode/package.json` | opencode |
| `~/.config/opencode/package-lock.json` | `home/.config/opencode/package-lock.json` | opencode lock |
| `~/.config/opencode/plugins/` | `home/.config/opencode/plugins/` | opencode plugins (node_modules excluded) |
| `~/.gemini/settings.json` | `home/.gemini/settings.json` | gemini global |
| `~/.gemini/trustedFolders.json` | `home/.gemini/trustedFolders.json` | gemini |
| `~/.gemini/projects.json` | `home/.gemini/projects.json` | gemini |
| `~/.gemini/antigravity-cli/settings.json` | `home/.gemini/antigravity-cli/settings.json` | gemini |
| `~/.gemini/config/config.json` | `home/.gemini/config/config.json` | agy config |
| `~/.gemini/config/mcp_config.json` | `home/.gemini/config/mcp_config.json` | agy mcp |
| `~/.ollama/config.json` | `home/.ollama/config.json` | ollama (blobs/models excluded, lean) |

## Quick use

```bash
# backup now
~/MuggleBornPadawan/700_linux/bckp/dotfiles.sh --verbose

# see what would change
~/MuggleBornPadawan/700_linux/bckp/dotfiles.sh --dry-run --verbose

# restore one file (with .bak backup)
~/MuggleBornPadawan/700_linux/bckp/restore.sh --dry-run .bashrc
~/MuggleBornPadawan/700_linux/bckp/restore.sh --verbose .bashrc

# full restore (asks confirm)
~/MuggleBornPadawan/700_linux/bckp/restore.sh --dry-run
~/MuggleBornPadawan/700_linux/bckp/restore.sh --force  # skip confirm
```

## What's excluded (never commit)

- Secrets: `.ssh/*`, `.gnupg/private*`, `.config/gh/hosts.yml`, `.pi/auth.json`, `.gemini/oauth_creds.json`, `google_accounts.json`, `mcp-oauth-tokens*`, `state.json`, `.env`
- Caches/large: `*.db`, `*.log`, `.cache/`, `__pycache__/`, `node_modules/`, `sessions/`, `models/`, `blobs/`, `cache/`, `brain/`, `conversations/`, `rg` binary
- Defined in `RSYNC_EXCLUDES` in `dotfiles.sh`.

## Lean

- Disk: 11GB free. Do not backup `~/.ollama/models/blobs` (1-2GB, re-downloadable).
- `node_modules` excluded for opencode (584 files).
