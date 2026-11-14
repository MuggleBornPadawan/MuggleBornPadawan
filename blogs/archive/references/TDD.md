# Test-Driven Development (TDD) Trade-offs

## Core Cycle
Red $\to$ Green $\to$ Refactor:
1. **Red**: Write a failing test that specifies expected behavior.
2. **Green**: Write the minimal code necessary to make the test pass.
3. **Refactor**: Clean up and optimize the implementation while maintaining passing tests.

---

## Comparison Matrix

| Dimension                  | Pros                                                                                                                                          | Cons                                                                                                                                      |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Design & Modularity**    | • Forces decoupled, testable interfaces.<br>• Natural barrier against accidental complexity.<br>• Surfaces API ergonomic flaws early.         | • Risk of over-mocking and coupling to internal implementation details.<br>• Can incentivize premature abstraction.                       |
| **Defect Rate & Safety**   | • Prevents regressions effectively.<br>• High branch and requirement coverage by default.<br>• Acts as a safety net during large refactors.   | • Unit tests miss integration, race-condition, and edge-case boundary errors.<br>• Tests can pass while business assumptions are wrong.   |
| **Velocity & Cost**        | • Drastically reduces debugging time later in the lifecycle.<br>• Simplifies maintenance and newcomer onboarding.                             | • Significant upfront time investment (~20–40% slower initially).<br>• High test maintenance burden during frequent early-stage pivots.   |
| **Documentation**          | • Executable specifications that never go out of date.<br>• Clarifies edge cases and expected input/output behavior.                          | • Poorly named or sprawling tests add cognitive noise.                                                                                    |
| **Developer Ergonomics**   | • Small, focused chunks of work reduce cognitive load.<br>• Clear definition of "done" for any given slice.                                   | • Steep learning curve for developers accustomed to test-after workflows.                                                                 |

---

## Decision Guide

### When to Apply
* **Core domain logic**: Parsers, calculations, rule engines, state machines.
* **Stable contracts**: Well-defined public interfaces, protocols, and APIs.
* **Bug fixes**: Write a reproducing test first to verify the issue and guard against recurrence.
* **Refactoring legacy systems**: Establish regression safety boundaries before restructuring.

### When to Skip or Defer
* **Spikes & exploratory prototypes**: Fast iterations where the API shape is unknown.
* **UI/Visual design**: Layouts, animations, and aesthetic tweaks better evaluated via visual feedback.
* **Volatile external integrations**: Initial exploratory mapping of third-party services.
