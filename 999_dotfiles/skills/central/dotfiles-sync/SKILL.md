---
name: dotfiles-sync
description: >-
  Backup dotfiles via dotfiles.bb, commit and push to chromebook and main branches. Runs dotfiles backup, checks git status, commits changes, pushes chromebook, merges to main and pushes main. Use after editing dotfiles, prompts, skills, sysinfo.sh, or templates, or for daily backup. Use when: dotfiles, backup, harness sync.
---

# Dotfiles Sync
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill dotfiles-sync
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Backup dotfiles and push to both branches (`chromebook` + `main` -> `origin`).

## When to use

- After you edit: `~/.local/share/agent-prompts/*`, `~/.local/share/skills/*`, `~/.local/share/agent-memory/*`, `~/.bashrc`, `~/.emacs.d/*`, `700_linux/scripts/sysinfo.sh`, templates
- Before you ask for help or before shutdown
- Daily backup on lean box (6.3 Gi RAM, 31G disk)

## Quick start

```bash
/skill:dotfiles-sync
/skill:dotfiles-sync --dry-run
/skill:dotfiles-sync "feat: add new prompt"
/skill:dotfiles-sync --verbose
```

## Workflow (agent must follow in order)

### 1. Backup

```bash
bb ~/MuggleBornPadawan/700_linux/bckp/dotfiles.bb --verbose
# or --dry-run if user passed --dry-run (dotfiles.sh also supported)
```

- Source: manifest `PAIRS` in `manifest.edn` / `dotfiles.bb` (single truth)
- Dest: `~/MuggleBornPadawan/999_dotfiles/` (plain files, git tracked)
- Excludes secrets: `auth.json`, `hosts.yml`, `oauth_creds.json`, `*.db`, `*.log`, `node_modules/`, `sessions/`, `blobs/`
- Verify: `Done: X ok, Y skipped, 0 failed`
- Compat mirrors (`skills/pi`, `skills/agy/config`, `skills/opencode`, `prompts/pi`, opencode `commands`) are NOT stored (`:backup? false` in manifest). Re-derived via harness-sync. Do not stage them if present.

### 2. Check git status

```bash
git -C ~/MuggleBornPadawan status --short
git -C ~/MuggleBornPadawan diff --stat
git -C ~/MuggleBornPadawan log --oneline -3
git -C ~/MuggleBornPadawan branch -vv
```

- If no changes: stop and report "Nothing to commit - backup was clean"
- If changes: continue

### 3. Stage

```bash
git add 700_linux/bckp 700_linux/scripts/sysinfo.sh 999_dotfiles/home 999_dotfiles/prompts 999_dotfiles/skills 999_dotfiles/memory 999_dotfiles/templates 999_dotfiles/by-tool 2>/dev/null || true
# Also check for other modified tracked files:
git status --short
# If untracked files outside 999_dotfiles are needed, ask user before adding
git diff --cached --stat
```

- Prefer explicit add per manifest. Do NOT `git add -A` blindly - may add temp files like `test.tmp`.
- Show user what will be committed.

### 4. Commit on chromebook

```bash
git rev-parse --abbrev-ref HEAD  # must be chromebook, if on main checkout chromebook first
git commit -m "chore: dotfiles backup $(date +%Y-%m-%d) - $MSG"
# or use user-provided $ARGUMENTS as msg, fallback to auto msg
```

- Use `user.name=MuggleBornPadawan`, `user.email=mugglebornpadawan@icloud.com` (already set)
- If `--dry-run`: stop here, do not commit

### 5. Push chromebook

```bash
git push origin chromebook
```

- On fail: show error, do not continue to main

### 6. Merge to main and push

```bash
git checkout main
git merge chromebook --no-edit   # fast-forward expected, both at same base
git push origin main
git checkout chromebook
git branch -vv
git log --oneline --graph --all -5
```

- This keeps `chromebook` and `main` in sync (as done in past: ce241a0c0..55c2609a0)
- If merge conflict (rare for dotfiles): stop, report, do NOT force push, ask user
- If `--dry-run`: skip pushes, just show what would merge

### 7. Verify

```bash
git -C ~/MuggleBornPadawan log --oneline -3
git -C ~/MuggleBornPadawan status --short  # should be clean
```

## Helper script

Use `scripts/backup_push.bb` for one-command run (has dry-run, verbose, commit msg support):

```bash
bb ./scripts/backup_push.bb --dry-run --verbose
bb ./scripts/backup_push.bb --verbose "feat(sysinfo): add --tech prompt"
```

See `bb ./scripts/backup_push.bb --help` for options.

## Safety rules

- Never log secrets. `manifest.edn` already excludes `auth.json`, `hosts.yml`, `oauth_creds.json`.
- Lean box: do not run `ollama run`, `clojure -P`, `lein deps`, `docker pull`.
- Timeout 30s for backup step.
- Never force push (`--force`) without user confirm.
- If `git status` shows `test.tmp` or `sysinfo.log` or `*.log`: do NOT add them (in `.gitignore`).

## Verification before done

- Show: commit hash on both branches (e.g., `55c2609a0`)
- Show: `git branch -vv` both tracking `origin`
- Show: `Done` msg from `dotfiles.bb` (or `dotfiles.sh`)
