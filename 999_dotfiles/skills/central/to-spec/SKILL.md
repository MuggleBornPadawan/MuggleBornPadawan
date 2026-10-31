---
name: to-spec
description: Turn the current conversation into a concrete Clojure/data-oriented specification in docs/specs/ without repetitive interview questions.
disable-model-invocation: true
---

# To Spec

Synthesize the active conversation, decisions, and codebase context into a clean, actionable specification. 
Do NOT start a new interview. Synthesize what is already decided.

## Process

1. **Inspect Codebase Context**:
   - Check existing ADRs and domain vocabulary (`domain-modeling` concepts).
   - Locate existing seams before proposing new ones.

2. **Define the Testing Seam**:
   - In Clojure, a seam is a public namespace boundary or pure data transformation.
   - Prefer the highest public seam possible (the fewer seams across the codebase, the better; target = 1).
   - Briefly state the proposed public seam to the user before writing the full document.

3. **Write the Specification File**:
   - Save the spec to `docs/specs/<feature-slug>.md` in the current repository.
   - If an issue tracker CLI (`gh`, `glab`) is explicitly requested, publish the spec body there.

---

## Spec Template

Use this markdown structure for the specification:

```markdown
# Spec: <Feature Name>

## 1. Problem Statement
Concise description of the problem from the user's perspective. Keep under 2 paragraphs.

## 2. Proposed Solution
High-level summary of the architectural approach.

## 3. Namespace Seams & Public API
The primary public namespace boundary. List public functions, argument types, and return values:
- Namespace: `<project>.<domain>.<feature>`
- Public function: `(<fn-name> [arg1 arg2])`
- Pure transformations vs stateful boundaries (e.g. database, side-effects).

## 4. Data Contracts & Schemas
Define inputs, outputs, and internal state shapes using EDN maps or Malli schemas:
```clojure
;; Example schema or EDN payload
{:feature/id   uuid?
 :feature/status #{:pending :active :completed}}
```

## 5. Acceptance Criteria
Bulleted checklist of concrete, testable behaviors (no generic user-story boilerplate):
- [ ] Returns expected output map when given valid input.
- [ ] Rejects invalid payload with `:error/type`.
- [ ] Preserves deterministic behavior when seeded.

## 6. Verification & Test Plan
Define how tests run against the primary seam:
- **Test namespace**: `<project>.<domain>.<feature>-test`
- **Runner**: Live REPL socket evaluation, `bb test -n <ns>`, or `clojure -M:test -n <ns>`.
- **Edge cases**: Boundary conditions, nil handling, and concurrency considerations.

## 7. Out of Scope
Explicitly list what this change will NOT do.
```
