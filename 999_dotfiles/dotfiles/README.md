# dotfiles - backed up from HOME

- Source: manifest in `~/MuggleBornPadawan/700_linux/bckp/dotfiles.sh` (PAIRS array)
- Dest: this folder mirrors `~` layout. Restore: `../bckp/restore.sh --dry-run`
- Why plain files not tar: git can diff, blame, and restore one file.

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
```

## What's covered

- shell: .bashrc .bash_aliases .profile .bash_logout
- git/tmux/vim: .gitconfig .tmux.conf .vimrc .selected_editor
- emacs: init.el custom.el customizations/ bookmarks (no tar)
- safe configs: .config/gh/config.yml (hosts.yml excluded), .gnupg/gpg-agent.conf
- pi/agents/gemini skills + prompts (skills/*, prompts/* are outside this folder)

## Secrets - never commit

- .ssh/* , .gnupg/private*, .config/gh/hosts.yml, .pi/auth.json, .env
- These are excluded via RSYNC_EXCLUDES in dotfiles.sh
