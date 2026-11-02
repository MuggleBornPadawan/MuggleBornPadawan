# Writing Plans — Templates + Review

Disclosed reference for `writing-plans`. Load when drafting tasks.

## Plan Document Header (REQUIRED)

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** [One sentence]

**Architecture:** [2-3 sentences]

**Tech Stack:** [Key libs]

**Spec:** [path to spec]

## Global Constraints

[Version floors, dep limits, naming rules — exact values from spec.]
---
```

## Task Structure Template

````markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

**Interfaces:**
- Consumes: [exact signatures from earlier tasks]
- Produces: [exact names/types later tasks use]

- [ ] **Step 1: Write failing test**
```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```
- [ ] **Step 2: Run to verify fail**
Run: `pytest tests/path/test.py::test_name -v` Expected: FAIL
- [ ] **Step 3: Minimal impl**
```python
def function(input):
    return expected
```
- [ ] **Step 4: Run to verify pass**
- [ ] **Step 5: Commit**
```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
````

## No Placeholders (failures)

- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" without code
- "Write tests for above" without test code
- "Similar to Task N" — repeat code, tasks read out of order
- Steps without how (code blocks required)
- Refs to undefined types/functions

## Self-Review

1. Spec coverage: every spec section → task? List gaps.
2. Placeholder scan: search red flags above. Fix inline.
3. Type consistency: signatures/names match across tasks? (`clearLayers` vs `clearFullLayers` = bug.)

Fix inline, no re-review needed.

## Execution Handoff Wording

"Plan complete at `docs/superpowers/plans/<file>.md`. Two options: 1. Subagent-Driven (fresh subagent per task) 2. Inline (executing-plans, batch + checkpoints). Which?"

## Outside Review Gate

Draft → second opinion (Pi/Gemini/OpenCode subagent). Ask: score 1-10, top 3 risks, missing edges.
- >=7: build. <7: revise once, re-review.
- No reviewer: note `REVIEW: skipped`. Proceed. Never block user.
