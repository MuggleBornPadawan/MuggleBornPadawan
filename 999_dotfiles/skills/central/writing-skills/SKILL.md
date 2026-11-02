---
name: writing-skills
description: "Author and verify central skills. Use when creating, editing, or testing skill design."
disable-model-invocation: true
---

# Writing Skills — Central Lean Harness

Skills are on-demand operational guides for AI agents. They provide procedural knowledge without polluting the root context window (<32k discipline).

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill writing-skills
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

---

## 1. Ground Truth Authority

* **Central Store:** Author all skills exclusively in `~/.local/share/skills/<skill-name>/`.
* **Symlink Invariant:** Never create or edit skills in harness-specific mirrors (`~/.gemini/config/skills/`, `~/.pi/agent/skills/`, `~/.config/opencode/skills/`).
* **Sync Command:** After creating or editing a skill, run:
  ```bash
  bb ~/.local/share/skills/harness-sync/scripts/sync_harness.bb
  ```

---

## 2. Frontmatter Contract (AgentSkills Spec)

Every skill requires `SKILL.md` with standard YAML frontmatter:

```yaml
---
name: my-skill-name
description: "High-signal action summary. Front-load activating verbs and nouns. Use when: trigger1, trigger2, trigger3."
# optional: disable-model-invocation: true  # use for pure human slash commands
---
```

### Frontmatter Rules
1. **Name:** `1-64` lowercase alphanumeric characters and hyphens (`[a-z0-9-]`). No leading, trailing, or double hyphens.
2. **Description (The Root Context Tax):** Descriptions load into root context every turn. Keep under 250 characters. Front-load actionable keywords.
3. **Collision Guard:** Check that `name` does not collide with built-in commands or existing skills (`ls ~/.local/share/skills/`).

---

## 3. Directory Layout & Progressive Disclosure

Follow the **Two Loads** rule: inline only steps needed on every execution; push deep reference into secondary files.

```
~/.local/share/skills/<skill-name>/
├── SKILL.md             # Required: Entrypoint and ordered procedural steps
├── references/          # Optional: Disclosed specs, domain tables, API contracts
└── scripts/             # Optional: Lean Babashka (.bb) helper scripts
```

* **No Heavy Runtimes:** Scripts must be Babashka (`.bb`) or pure shell. Never require `npm`, `python3` venvs, or heavy JVM boots.
* **Keep Dependencies Minimal:** Do not add external tools or libraries without user consent.

---

## 4. Authoring Structure (ASD-STE100)

Structure `SKILL.md` with high signal-to-noise:
1. **Frontmatter:** Specific trigger boundaries.
2. **Preamble:** `skill-start.bb` telemetry block.
3. **Ordered Steps:** Sequential actions using imperative verbs (`Inspect`, `Verify`, `Evaluate`).
4. **Completion Gate:** Checkable, deterministic verification criteria (`bb test` green, zero warnings).

### Anti-Patterns to Avoid
* **No Speculative Abstractions:** Solve the actual workflow, not hypothetical variants.
* **No Walls of Prose:** Use markdown tables and compact checklists.
* **No Unpaired Bans:** Never use "Do not X" without specifying the positive alternative ("Keep functions flat using `->`/`->>`").

---

## 5. TDD Skill Verification Cycle

1. **Baseline Failure (RED):** Prompt the agent with the target task without the skill loaded. Document failure or confusion.
2. **Author Minimal Spec (GREEN):** Write `SKILL.md` with explicit operational guardrails addressing the baseline failure.
3. **Synchronize:**
   ```bash
   bb ~/.local/share/skills/harness-sync/scripts/sync_harness.bb
   ```
4. **Verify in Live Harness (REFACTOR):**
   * **Pi / OpenCode:** Run `/reload` and trigger with task keywords.
   * **Antigravity Gemini:** Start a fresh task turn or inspect tool metadata.
   * Verify the agent invokes the skill without rationalizing or hallucinating steps.
