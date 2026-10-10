---
name: simplify
description: Find overcomplicated/YAGNI code. Analysis only, no edits until approved.
argument-hint: "[file|project]"
---

Find overcomplicated code in {{ARGS}} (file or project if empty). **Analysis only — do not edit until approved.**

Principles: Necessity | Native over custom | Reuse existing utils | Minimal footprint
Look for: unnecessary abstractions, over-generic, unused config/options, deep nesting, premature optimization.
For each finding (ranked by impact):
1. Snippet + location 2. Why overcomplicated 3. Simplest alternative (std lib) 4. Impact rank
