# 999_dotfiles - monorepo for dotfiles, skills, prompts, templates

- Source: `~/MuggleBornPadawan/700_linux/bckp/manifest.edn` (`:pairs` + `:excludes` = single truth)
- Backup: `~/MuggleBornPadawan/700_linux/bckp/dotfiles.bb` (via `dotfiles.sh` wrapper)
- Restore: `~/MuggleBornPadawan/700_linux/bckp/restore.sh`
- Why plain files: git diff/blame per file, no tar.

## Layout

```
999_dotfiles/
  README.md           # this file (map)
  home/               # mirrors HOME -> restore with rsync -a home/ ~/
    .bashrc, .bash_aliases, .profile, .bash_logout, .sommelierrc
    .gitconfig, .gitignore, .dockerignore, .vimrc, .tmux.conf, .selected_editor
    .ssh/config, .emacs.d/{init.el,custom.el,customizations/,bookmarks,.mc-lists.el}
    .config/{gh/config.yml,clojure/deps.edn,pass-git-helper/,gh/,weston.ini,...}
    .gnupg/gpg-agent.conf
    bin/{cleanup.sh,cleanup-boot.sh}   # from ~/bin/
    .pi/agent/{AGENTS.md,settings.json,models.json,models-store.json,bin/}
    .config/opencode/{AGENTS.md,opencode.jsonc,package.json,package-lock.json,plugins/,.gitignore}
    .gemini/{settings.json,trustedFolders.json,projects.json,antigravity-cli/settings.json,config/}
    .ollama/config.json, .vibe/config.toml, .qwen/settings.json
    .antigravity-ide/argv.json, ".config/Antigravity IDE/User/settings.json"
    README.md         # details for home/
  by-tool/            # per-tool index (docs only, no data move)
    README.md
  templates/          # repo templates (not dotfiles) - from ~/MuggleBornPadawan/
    Dockerfile, Jenkinsfile, .gitignore
  skills/
    central/          # from ~/.local/share/skills (ground truth)
    agents/           # from ~/.agents/skills
    agy/builtin/      # from ~/.gemini/antigravity-cli/builtin/skills
    # NOT STORED (:backup? false, re-derived via harness-sync): pi/, agy/config/, opencode/
  prompts/
    central/          # from ~/.local/share/agent-prompts (ground truth)
    # NOT STORED (:backup? false, re-derived via harness-sync): pi/
  memory/
    central/          # from ~/.local/share/agent-memory (core + tails + assembled + analytics)
```

- Per-tool view: `by-tool/README.md`.
- Details for `home/`: `home/README.md`.

## Map: source -> repo

Truth: `:pairs` in `manifest.edn`. Compat mirrors (`:compat? true`) are symlinks to central on host. Skipped rows (`:backup? false`) are NOT STORED. Re-derive via harness-sync.

| Source | Dest (repo) | Notes |
|---|---|---|
| `~/.bashrc` | `home/.bashrc` | shell |
| `~/.bash_aliases` | `home/.bash_aliases` | shell |
| `~/.profile` | `home/.profile` | shell |
| `~/.bash_logout` | `home/.bash_logout` | shell |
| `~/.sommelierrc` | `home/.sommelierrc` | sommelier |
| `~/.config/weston.ini` | `home/.config/weston.ini` | weston |
| `~/.config/cros-garcon.conf` | `home/.config/cros-garcon.conf` | cros |
| `~/.config/fontconfig/fonts.conf` | `home/.config/fontconfig/fonts.conf` | fonts |
| `~/.config/htop/htoprc` | `home/.config/htop/htoprc` | htop |
| `~/bin/cleanup.sh` | `home/bin/cleanup.sh` | user script |
| `~/bin/cleanup-boot.sh` | `home/bin/cleanup-boot.sh` | user script |
| `~/.gitconfig` | `home/.gitconfig` | git |
| `~/.gitignore` | `home/.gitignore` | git |
| `~/.dockerignore` | `home/.dockerignore` | docker |
| `~/.vimrc` | `home/.vimrc` | vim |
| `~/.tmux.conf` | `home/.tmux.conf` | tmux |
| `~/.selected_editor` | `home/.selected_editor` | editor |
| `~/.ssh/config` | `home/.ssh/config` | ssh (keys never stored) |
| `~/.config/pass-git-helper/git-pass-mapping.ini` | `home/.config/pass-git-helper/git-pass-mapping.ini` | git helper |
| `~/.emacs.d/init.el` | `home/.emacs.d/init.el` | emacs |
| `~/.emacs.d/custom.el` | `home/.emacs.d/custom.el` | emacs |
| `~/.emacs.d/customizations/` | `home/.emacs.d/customizations/` | emacs |
| `~/.emacs.d/bookmarks` | `home/.emacs.d/bookmarks` | emacs |
| `~/.emacs.d/.mc-lists.el` | `home/.emacs.d/.mc-lists.el` | emacs |
| `~/.config/gh/config.yml` | `home/.config/gh/config.yml` | safe, hosts.yml excluded |
| `~/.gnupg/gpg-agent.conf` | `home/.gnupg/gpg-agent.conf` | gpg |
| `~/.config/clojure/deps.edn` | `home/.config/clojure/deps.edn` | clojure |
| `~/.config/cliamp/config.toml` | `home/.config/clamp/config.toml` | clamp |
| `~/.config/cliamp/radios.toml` | `home/.config/clamp/radios.toml` | clamp |
| `~/MuggleBornPadawan/.gitignore` | `templates/.gitignore` | template |
| `~/MuggleBornPadawan/Dockerfile` | `templates/Dockerfile` | template |
| `~/MuggleBornPadawan/Jenkinsfile` | `templates/Jenkinsfile` | template |
| `~/.pi/agent/AGENTS.md` | `home/.pi/agent/AGENTS.md` | pi global |
| `~/.pi/agent/settings.json` | `home/.pi/agent/settings.json` | pi global |
| `~/.pi/agent/models.json` | `home/.pi/agent/models.json` | pi global |
| `~/.pi/agent/models-store.json` | `home/.pi/agent/models-store.json` | pi global |
| `~/.pi/agent/bin/` | `home/.pi/agent/bin/` | pi bin (rg excluded) |
| `~/.local/share/agent-memory/` | `memory/central/` | memory core + tails + assembled + analytics |
| `~/.local/share/agent-prompts/` | `prompts/central/` | prompts ground truth |
| `~/.local/share/skills/` | `skills/central/` | skills ground truth |
| `~/.agents/skills/` | `skills/agents/` | agents skills |
| `~/.gemini/antigravity-cli/builtin/skills/` | `skills/agy/builtin/` | agy builtin |
| `~/.config/opencode/AGENTS.md` | `home/.config/opencode/AGENTS.md` | opencode global |
| `~/.config/opencode/opencode.jsonc` | `home/.config/opencode/opencode.jsonc` | opencode global |
| `~/.config/opencode/package.json` | `home/.config/opencode/package.json` | opencode |
| `~/.config/opencode/package-lock.json` | `home/.config/opencode/package-lock.json` | opencode lock |
| `~/.config/opencode/.gitignore` | `home/.config/opencode/.gitignore` | opencode ignore |
| `~/.config/opencode/plugins/` | `home/.config/opencode/plugins/` | opencode plugins (node_modules excluded) |
| `~/.config/opencode/commands/` | — | NOT STORED (`:backup? false`, symlink to central prompts) |
| `~/.config/opencode/skills/` | `skills/opencode/` | NOT STORED (`:backup? false`, re-derived) |
| `~/.gemini/config/GEMINI.md` | `home/.gemini/config/GEMINI.md` | agy global |
| `~/.gemini/config/AGENTS.md` | `home/.gemini/config/AGENTS.md` | agy global |
| `~/.gemini/settings.json` | `home/.gemini/settings.json` | gemini global |
| `~/.gemini/trustedFolders.json` | `home/.gemini/trustedFolders.json` | gemini |
| `~/.gemini/projects.json` | `home/.gemini/projects.json` | gemini |
| `~/.gemini/antigravity-cli/settings.json` | `home/.gemini/antigravity-cli/settings.json` | gemini |
| `~/.gemini/config/config.json` | `home/.gemini/config/config.json` | agy config |
| `~/.gemini/config/mcp_config.json` | `home/.gemini/config/mcp_config.json` | agy mcp |
| `~/.gemini/config/projects/` | `home/.gemini/config/projects/` | agy projects |
| `~/.ollama/config.json` | `home/.ollama/config.json` | ollama (models/blobs excluded, lean) |
| `~/.vibe/config.toml` | `home/.vibe/config.toml` | vibe |
| `~/.qwen/settings.json` | `home/.qwen/settings.json` | qwen |
| `~/.antigravity-ide/argv.json` | `home/.antigravity-ide/argv.json` | antigravity ide |
| `~/.config/Antigravity IDE/User/settings.json` | `home/.config/Antigravity IDE/User/settings.json` | antigravity ide |
| `~/.pi/agent/skills/` | `skills/pi/` | NOT STORED (`:backup? false`, re-derived) |
| `~/.pi/agent/prompts/` | `prompts/pi/` | NOT STORED (`:backup? false`, re-derived) |
| `~/.gemini/config/skills/` | `skills/agy/config/` | NOT STORED (`:backup? false`, re-derived) |

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

- Secrets/tokens: `hosts.yml`, `auth.json`, `oauth_creds.json`, `google_accounts.json`, `mcp-oauth-tokens*`, `state.json`
- Caches/large: `*.db`, `*.log`, `*.pyc`, `.cache/`, `__pycache__/`, `node_modules/`, `sessions/`, `models/`, `blobs/`, `cache/`, `rg` binary
- Defined in `:excludes` in `manifest.edn`.

## Lean

- Disk: 13GB free (59% used, 31GB total, 2026-09-30). Do not backup `~/.ollama/models/blobs` (1-2GB, re-downloadable).
- `node_modules` excluded for opencode.
