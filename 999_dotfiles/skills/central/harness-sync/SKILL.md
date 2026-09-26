---
name: harness-sync
description: >-
  Bi-directional memory, prompt, and skill synchronization across all coding harnesses (Gemini, Pi, OpenCode).
---

# Multi-Harness Sync & Importer (Gemini, Pi, OpenCode)

Syncs and imports memory, skills, and prompts from the **Pi coding harness** (`~/.pi/agent`) into the **Antigravity Gemini coding harness** (`~/.gemini/config`).

## Core Mappings

1. **Memory (`AGENTS.md` / `GEMINI.md`)**:
   - Source: `~/.pi/agent/AGENTS.md`
   - Destination: `~/.gemini/config/AGENTS.md` and `~/.gemini/config/GEMINI.md` (Global)
   - Transformations:
     - Maintains all lean-box hardware specs (Debian 12, Intel i3-1215U, 6.3 Gi RAM, 31 GB disk).
     - Enforces Clojure Lean Stack guidelines (`deps.edn`, `lein`, `bb`, Emacs CIDER, PCG triple render, zero-build Scittle/Three.js).
     - Rewrites assistant identity to Antigravity Gemini pair programmer.
     - Adds Antigravity tool guidelines (`view_file`, `replace_file_content`, `run_command`, no `cd`, clickable `file://` links).

2. **Skills (`skills/<name>/`)**:
   - Source: `~/.pi/agent/skills/*`
   - Destination: `~/.gemini/config/skills/*`
   - Transformations:
     - Normalizes YAML frontmatter (`name`, third-person `description`).
     - Rewrites tool references (`read` -> `view_file`, `bash` -> `run_command`).
     - Adapts subagents (`research` -> `research-topic` using `invoke_subagent`).
     - Integrates interactive tools (`grilling` with `ask_question`).
     - Removes Pi-specific artifacts (`agents/openai.yaml`).
     - Copies reference documents and helper scripts (`scripts/`).

3. **Prompts (`prompts/*.md`)**:
   - Source: `~/.pi/agent/prompts/*`
   - Destination: `~/.gemini/config/skills/*`
   - Transformations:
     - Prompts become first-class Antigravity skills.
     - Exposes slash commands: `/healthcheck`, `/git-sync`, `/git-commit`, `/code-review`, `/clojure-test`, `/onboard`, etc.
     - Enables progressive semantic activation when corresponding tasks are requested.

## Execution & Workflow (Clojure Lean Stack)

Prefer Babashka for instant startup and low memory footprint on this 6.3 GiB box:

### 1. Run Full Sync (Babashka)
```bash
bb ~/.gemini/config/skills/pi-sync/scripts/sync_pi.bb
```

### 2. Audit / Dry-Run (Babashka)
```bash
bb ~/.gemini/config/skills/pi-sync/scripts/sync_pi.bb --dry-run
```

### 3. Alternative (Python 3)
```bash
python3 ~/.gemini/config/skills/pi-sync/scripts/sync_pi.py
```

## Helper Scripts
- [`sync_pi.bb`](./scripts/sync_pi.bb): Fast Clojure/Babashka lean engine.
- [`sync_pi.py`](./scripts/sync_pi.py): Python 3 alternative engine.
