# home - mirrors HOME

- Source: manifest in `~/MuggleBornPadawan/700_linux/bckp/dotfiles.sh` (PAIRS array)
- Dest: this folder mirrors `~` layout. Restore: `../../700_linux/bckp/restore.sh --dry-run`
- Why plain files not tar: git can diff, blame, restore one file.

## Restore

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
```

## What's covered (this folder)

- shell: `.bashrc` `.bash_aliases` `.profile` `.bash_logout`
- git/tmux/vim: `.gitconfig` `.tmux.conf` `.vimrc` `.selected_editor`
- emacs: `.emacs.d/init.el` `custom.el` `customizations/` `bookmarks` (no tar)
- safe configs: `.config/gh/config.yml` (hosts.yml excluded), `.gnupg/gpg-agent.conf`
- pi: `.pi/agent/AGENTS.md` `settings.json` `models.json` `bin/`
- opencode: `.config/opencode/opencode.jsonc` `package.json` `package-lock.json` `plugins/`
- gemini/agy: `.gemini/settings.json` `trustedFolders.json` `projects.json` `antigravity-cli/settings.json` `config/config.json` `config/mcp_config.json`
- ollama: `.ollama/config.json` (models/blobs excluded, lean)

## Secrets - never commit

- `.ssh/*`, `.gnupg/private*`, `.config/gh/hosts.yml`, `.pi/auth.json`, `.gemini/oauth_creds.json`, `google_accounts.json`, `mcp-oauth-tokens*`, `.env`
- These are excluded via `RSYNC_EXCLUDES` in `dotfiles.sh`.
