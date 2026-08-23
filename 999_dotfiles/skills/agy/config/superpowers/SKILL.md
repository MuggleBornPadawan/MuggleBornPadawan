---
name: superpowers
description: >-
  Use this skill when you need to plan, implement, and test code changes systematically.
  Enforces a strict spec-driven and test-driven workflow before editing code.
---

# Superpowers Skill

Enforce a disciplined, spec-driven engineering methodology to ensure correctness, testability, and safety:

## Guidelines

1. **Spec and Plan First**:
   * Do not jump straight into writing code.
   * Brainstorm in the chat to define a clear specification and get alignment.
   * Create an explicit, step-by-step implementation plan breaking down tasks into 2-5 minute increments.

2. **Test-Driven Development (TDD)**:
   * Write failing tests *before* writing the implementation.
   * Verify the test fails (Red phase).
   * Write the minimum amount of code to make the test pass (Green phase).
   * Refactor the code for clean architecture, readability, and performance (Refactor phase).

3. **Verify Each Step**:
   * Run tests or verification commands after every small change.
   * Stop immediately if a test fails; do not accumulate issues.
