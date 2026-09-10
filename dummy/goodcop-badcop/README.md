# Pi Good-Cop / Bad-Cop Workflow on Opencode Zen

> Lean dev loop for Pi `v0.85.1` on Debian 12 (6.3 Gi RAM) — 2 free models, sequential, no bloat.

![Pi startup — skills and prompts loaded](./Screenshot%202026-09-10%209.55.00%20AM.png)

*Screenshot: Pi `v0.85.1` startup in `~/d` — `muse-spark-1.2` at `high` thinking — 28 skills and 14 prompt templates loaded.*

---

## Why 2 Models?

- **Builder (good cop)** makes it pass. **Critic (bad cop)** tries to break it. You decide.
- Pi has no sub-agents. Sequential `pi -p` keeps RAM low and context clean.
- Opencode Zen free tier: rate limits exist. One call at a time + 8s sleep is safe.

Free models used (from `~/.pi/agent/settings.json`):

| Role | Model | Thinking | Strength |
|------|-------|----------|----------|
| Builder | `opencode/muse-spark-1.3-contributor-free` | high | code, TDD |
| Critic | `opencode/big-pickle` | high | reasoning, bug hunt |
| Fixer | `opencode/muse-spark-1.2-contributor-free` | high | small fixes |

Swap via env: `BUILDER=opencode/mimo-v2.5-free:high CRITIC=opencode/nemotron-3-ultra-free:high`

---

## Quick Start

```bash
chmod +x goodcop-badcop.sh

# single task
./goodcop-badcop.sh "implement task 1 from @docs/plans/2026-09-10-auth.md - TDD"

# with file context
./goodcop-badcop.sh "fix bug in @src/core.clj - add missing edge case test"

# custom models
BUILDER=opencode/mimo-v2.5-free:high CRITIC=opencode/nemotron-3-ultra-free:high ./goodcop-badcop.sh "my task"
```

Output goes to `.pi-runs/YYYY-MM-DD_HHMMSS/`:

- `1-build.md` — builder output
- `2-critic.md` — `MUST-FIX` vs `NICE-TO-HAVE` (or `LGTM`)
- `3-fix.md` — applied fixes (skipped if `LGTM`)

Inspect then continue interactively:

```bash
cat .pi-runs/*/2-critic.md
pi -c   # back to interactive, full history
```

### Loop Over a Whole Plan

```bash
for i in 1 2 3; do
  ./goodcop-badcop.sh "implement task $i from @docs/plans/2026-09-10-auth.md - TDD, run clojure.test after"
done
```

---

## Recommended Pi Workflow (6 Phases)

1. **Start session** — `pi --name "feature-x"` or `pi -c` to resume. Name early.
2. **Design** — `/skill:brainstorming` → `/skill:writing-plans` → `docs/plans/*.md` (wayfinder if huge).
3. **Isolate** — `/skill:using-git-worktrees` — one branch per plan, never on `main`.
4. **Build loop (TDD + REPL)** — `/skill:test-driven-development` — `bb` for speed, CIDER for REPL, `clojure.test` + `clj-kondo` + `cljfmt`.
5. **Branch & recover** — `Enter` = steering, `Alt+Enter` = follow-up, `/tree` to try alt path, `/clone` for new file, `/compact` when long.
6. **Verify & finish** — `/skill:verification-before-completion` → `/skill:code-review` → `/skill:finishing-a-development-branch`.

Skill quick map: `research` (facts), `diagnosing-bugs` (hunt), `codebase-design` (deepen), `wizard` (manual setup), `context-keeper` (long tasks).

---

## Pi Session Tips

- `@` to attach files, `Tab` to complete, `Shift+Enter` multi-line, `!cmd` send to LLM, `!!cmd` silent.
- `Ctrl+P` cycle free models, `Shift+Tab` cycle thinking, `Ctrl+O` collapse tools, `Esc Esc` = `/tree`.
- `/reload` after editing skills or `AGENTS.md`. `/export` or `/share` to save session HTML.

---

## Files in This Repo

- `goodcop-badcop.sh` — 3-step loop (build → critic → fix), env-overrideable models
- `Screenshot 2026-09-10 9.55.00 AM.png` — Pi startup reference
- `README.md` — this file
- `README.pdf` — printable version with embedded screenshot

Lean machine note: prefer `bb` over cold JVM, keep deps minimal, avoid large `npm install` on 11 GB free disk.

