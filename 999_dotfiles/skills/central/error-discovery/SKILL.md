---
name: error-discovery
triggers: [trace, eval dataset, failure modes]
anti-triggers: [code bug only]
description: >-
  Discover failure modes in LLM traces or agent logs before writing metrics. Use when inspecting traces, finding bugs in AI outputs, or starting an eval dataset. Lean Pi adapted: turn-based review, HTML app, sequential scanning.
---

# Error Discovery — Pi Lean Edition
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill error-discovery
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Discover failure modes in AI applications before writing metrics.
Adapted for Pi: turn-based workflow, no subagents, 0 extra dependencies.

---

## Core Principles

1. **Error discovery before metrics:**
   * Never write metrics before reading real user traces.
   * Reading traces causes **criteria drift**: your understanding of errors will change as you read.
2. **Division of labor:**
   * The human reads traces and writes free-text notes.
   * The agent groups notes into failure modes, clusters traces, and finds more examples.
3. **Lean and lightweight:**
   * No heavy embedding models or deep learning libraries.
   * Cluster with simple metadata: turn counts, tool call counts, lengths, and keyword heuristics.

---

## The 4-Phase Workflow

### Phase 1: Ingest and Sample
1. Read 5 to 10 sample records from the trace dataset (`traces.jsonl`, CSV, or JSON).
2. Map the data structure:
   * User prompt / query.
   * Intermediate tool calls and results.
   * Final model output.
   * Key metadata (channel, latency, user category).
3. Select an initial sample of 15 to 25 records:
   * **70% structural representatives:** Slice across length, turn count, and tool presence.
   * **30% random picks:** Cover areas the metadata ignores.

### Phase 2: Build the Review App
1. Create `review.html` in the current project root.
2. Interface design requirements:
   * Display messages in natural order (User, Assistant, Tool).
   * Use color borders to separate message roles.
   * Mute identical boilerplate (such as static system prompts).
   * Provide an inline text selection tool and a free-text notes input.
   * Auto-save annotations to `POST /api/annotations` on port 8080.
3. Start the helper server in the background:
   ```bash
   # Lean override: bb preferred, python allowed as exception for this skill only
   # If bb http-server available: bb -e "(babashka.http-server/exec {:port 8080 :dir "."})" &
   # Fallback (exception to lean Clojure rule — keep Python here):
   python3 ~/.local/share/skills/error-discovery/scripts/server.py 8080 &
   ```

### Phase 3: Human Review Turn
1. Instruct the user:
   * Open `http://localhost:8080/review.html` in the browser.
   * Review 10 to 20 traces.
   * Highlight bad sections and add free-text notes.
2. Review rules:
   * Do not diagnose root causes. Describe the visible failure.
   * Annotate the first upstream error you see.
   * Free-text only. No 1–5 stars. No dropdown menus.
3. **Turn boundary:** Stop the agent turn.
   Tell the user to prompt when done:
   > *"I finished reviewing traces. Analyze the annotations."*

### Phase 4: Categorize and Scan (Next Turn)
When the human returns:
1. Read `error_discovery_data/annotations.json`.
2. Group the notes into a taxonomy of failure modes:
   ```json
   {
     "failure_mode": "ignored_budget_limit",
     "description": "Assistant offered apartments above the requested price",
     "count": 5,
     "example_trace_ids": ["trace_012", "trace_089"]
   }
   ```
3. Run a sequential scan across the remaining unreviewed traces to flag candidate matches.
4. Report:
   * Summary of discovered failure modes.
   * Count of occurrences.
   * Proposed next 10 traces to inspect.
> **Stack exception:** This skill uses Python `server.py` for HTML annotation server. Exception to AGENTS_CORE lean Clojure rule — keep Python here. Do not port to bb without testing annotation POST handling.

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
