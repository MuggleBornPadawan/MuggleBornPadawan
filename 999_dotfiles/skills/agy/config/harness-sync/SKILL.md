---
name: harness-sync
description: >-
  Centralized memory, skills, and prompt symlink manager across all coding harnesses (Antigravity Gemini, Pi, OpenCode).
---

# Centralized Harness Symlink Manager (Gemini, Pi, OpenCode)

Maintains a single centralized repository for system memory, skills, and prompts in `~/.local/share/`, and automatically establishes symbolic links across all active AI coding harnesses.

## Centralized Repository Layout (`~/.local/share/`)

- **Memory (Assembled Model):**
  - **Ground Truth Core:** `~/.local/share/agent-memory/AGENTS_CORE.md` (Hardware specs, lean Clojure/Babashka rules, Chitrapata ontology, brand tokens)
  - **Harness Tails:** `~/.local/share/agent-memory/tails/` (`gemini_tail.md`, `pi_tail.md`, `opencode_tail.md`)
  - **Assembled Targets:** `~/.local/share/agent-memory/assembled/` (Compiled per harness: `AGENTS_CORE.md` + tail)
- **Skills:** `~/.local/share/skills/` (Shared skill collection)
- **Prompts / Commands:** `~/.local/share/agent-prompts/` (Shared prompt and slash command collection)

## Harness Symlink Topology

### 1. Antigravity Gemini (`~/.gemini/config/`)
- `AGENTS.md` -> `~/.local/share/agent-memory/assembled/gemini.md`
- `GEMINI.md` -> `~/.local/share/agent-memory/assembled/gemini.md`
- `skills` -> `~/.local/share/skills`
- `prompts` -> `~/.local/share/agent-prompts`

### 2. Pi Coding Agent (`~/.pi/agent/`)
- `AGENTS.md` -> `~/.local/share/agent-memory/assembled/pi.md`
- `skills` -> `~/.local/share/skills`
- `prompts` -> `~/.local/share/agent-prompts`

### 3. OpenCode Agent (`~/.config/opencode/`)
- `AGENTS.md` -> `~/.local/share/agent-memory/assembled/opencode.md`
- `skills` -> `~/.local/share/skills`
- `commands` -> `~/.local/share/agent-prompts`

## Execution & Maintenance (Babashka)

Fast Clojure/Babashka engine (`sync_harness.bb`):

### 1. Run Live Sync & Link
Assembles memory files (Core + Tails), establishes missing symlinks, repairs invalid symlinks, and merges legacy local skills:
```bash
bb ~/.local/share/skills/harness-sync/scripts/sync_harness.bb
```

### 2. Audit / Dry-Run
Previews memory assembly and symlink status without making filesystem changes:
```bash
bb ~/.local/share/skills/harness-sync/scripts/sync_harness.bb --dry-run
```

## Helper Scripts
- [`sync_harness.bb`](./scripts/sync_harness.bb): Fast Clojure/Babashka symlink and memory assembly engine.
