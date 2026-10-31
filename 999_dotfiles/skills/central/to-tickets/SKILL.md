---
name: to-tickets
description: Break a plan, spec, or discussion into vertical tracer-bullet tickets with explicit blocking dependencies.
disable-model-invocation: true
---

# To Tickets

Break a plan, spec, or conversation into **tracer-bullet tickets**: narrow end-to-end vertical slices that each declare their **blocking dependencies**.

## Rules for Slices

1. **Vertical, not horizontal**:
   - Each slice cuts through the whole path: input data shape → pure core function → persistence/system boundary → `clojure.test` verification.
   - Do not create single-layer horizontal tickets (e.g., "build all database schemas").
2. **Context Window Constraint**:
   - Every ticket must be small enough to complete in a single agent session within <32k context tokens.
3. **Executable & Verifiable**:
   - Each completed ticket must be runnable and verifiable in a live REPL or test runner on its own.
4. **Expand-Contract for Wide Refactors**:
   - When a change touches many namespaces (e.g., renaming a core domain key or changing a shared spec), do not force a single vertical slice.
   - **Expand**: Add the new data key or function beside the old one so nothing breaks.
   - **Migrate**: Update caller namespaces in batches.
   - **Contract**: Remove the old key/function once callers are migrated.

---

## Process

### 1. Gather Input
Read the referenced spec (e.g. `docs/specs/<feature>.md`) or extract context from the active discussion.

### 2. Draft Tickets & Dependencies
- Assign each ticket a sequential number (`01`, `02`, `03`...).
- Define explicit **Blocked by** references. A ticket with no blockers can start immediately.

### 3. Review Breakdown with User
Present the draft plan as a concise table:
- **ID & Title**
- **Blocked by** (IDs)
- **Delivered Behavior** (observable end-to-end outcome)

Ask:
- Is ticket granularity appropriate?
- Are dependency blockers strictly necessary?
- Should any tickets merge or split?

### 4. Write Ticket Files
Save approved tickets locally to `docs/tickets/<feature-slug>/<NN>-<slug>.md`:
- One file per ticket in dependency order.
- If a project tracker CLI (`gh`, `glab`) is configured and requested, publish issues there with blocker links.

---

## Ticket File Template

Save as `docs/tickets/<feature-slug>/<NN>-<slug>.md`:

```markdown
# <NN>: <Ticket Title>

**Delivered Behavior:**
Concise summary of the end-to-end feature or behavior delivered.

**Blocked By:**
- `<MM>-<slug>` (or "None: can start immediately")

**Acceptance Criteria:**
- [ ] Core transformation handles valid data in REPL.
- [ ] Boundary integration verified with `clojure.test`.
- [ ] Edge cases (nil, invalid shape) tested.
```
