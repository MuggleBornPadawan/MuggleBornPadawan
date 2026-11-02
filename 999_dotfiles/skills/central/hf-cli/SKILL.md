---
name: hf-cli
description: "Manage Hugging Face Hub via hf CLI. Use when hf download, upload, auth, or cache on lean box."
disable-model-invocation: true
---

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill hf-cli
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Install: `curl -LsSf https://hf.co/cli/install.sh | bash -s`.

> **Lean-machine guard (verify via `sysinfo.sh --tech`, trust output over pinned).**
> This skill is `disable-model-invocation: true` — only run when user says `/skill:hf-cli`.
> Before any `hf download` / `hf upload` / `hf jobs run`:
> 1. Run `df -h` and `free -h` — refuse if <5 GB disk or <1 GB RAM free.
> 2. Ask user to confirm: model size + cache dir. Prefer `--dry-run` first.
> 3. Never auto-download large models/datasets on this machine. Small metadata/list/info commands are safe.
> 4. For disk pressure, run `hf cache prune --dry-run` or `hf cache rm` to free space.

`hf` replaces deprecated `huggingface-cli`. Auth under `hf auth` (e.g. `hf auth whoami`).

## Core Workflow

1. Check: `hf env`, `hf auth whoami`, `df -h` + `free -h`.
2. Small ops safe: `info`, `list`, `env`, `auth`, `cache list`.
3. Large ops gate: `download`, `upload`, `jobs run` → confirm size + cache-dir + `--dry-run` first.
4. Cleanup: `hf cache prune --dry-run`, then `hf cache rm`.

```bash
hf download <REPO_ID> --dry-run
hf download <REPO_ID> --include "*.safetensors" --local-dir ./models
hf upload <REPO_ID> ./local-path --commit-message "feat: add weights"
hf cache list --limit 20
```

Full command list: `references/commands.md`. Live help: `hf --help`. Regenerate: `hf skills add --force`.
