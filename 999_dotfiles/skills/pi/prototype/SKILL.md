---
name: prototype
description: >-
  Build a throwaway prototype to answer a design question. Use when sanity-checking state logic, exploring UI layouts, or evaluating procedural generation (PCG) algorithms and visual parameters. Clojure-adapted: bb + HTML logic demo, Quil/Raylib/Three.js for visual art.
---

# Prototype — Clojure Patch

A prototype is **throwaway code that answers a question**. The question decides the shape. **Clojure + lean-machine adapted.** See original at `https://github.com/mattpocock/skills` logic + pi `~/.pi/agent/skills/prototype`. Pure Markdown, 0 deps. Location: `~/.pi/agent/skills/prototype/` (global, pi). `/reload` after edit.

## Pick a branch

Identify which question is being answered, using the user's prompt, the surrounding code, or by asking if the user is around:

- **"Does this logic / state model feel right?"** → [LOGIC.md](LOGIC.md). Build a single shareable HTML file (free-play buttons plus tabbed guided walkthroughs) that pushes the state machine through cases that are hard to reason about on paper, and that a non-developer can drive. **Clojure option:** if the state is a pure `ns` (data in → data out), also offer a `bb` REPL harness: `bb -e "(require 'my.ns) (my.ns/transition state event)"` or a one-file `src/prototype_logic.clj` with `(comment ...)` blocks for CIDER `C-c C-e`. HTML is still best when non-devs must click.
- **"What should this look like?"** → [UI.md](UI.md). Generate several radically different UI variations on a single route, switchable via a URL search param and a floating bottom bar. Otherwise HTML/CSS.
- **"Does this procedural generation algorithm or parameter space look good?"** → Generative Art & PCG. Build a lean visual easel to test noise scales, recursion rules, seeds, and color palettes:
  - **Quil**: 2D/3D flow fields, static renders, or plotter paths (`clojure-quil`).
  - **Raylib**: Real-time particle simulations or GPU raymarching shaders (`clojure-raylib`).
  - **Three.js**: Zero-build 3D browser scenes and instanced geometries (`clojure-threejs`).
  - Always expose parameters in an atom or keyboard controls (`r` to re-seed, arrows to adjust scale) for fast parameter exploration.

The three branches produce very different artifacts, so getting this wrong wastes the whole prototype. If the question is genuinely ambiguous and the user isn't reachable, default to whichever branch better matches the surrounding code (a backend `ns` → logic; a page or component → UI; generative functions or graphics deps → PCG visual) and state the assumption at the top of the prototype.

## Rules that apply to both

1. **Throwaway from day one, and clearly marked as such.** Locate the prototype code close to where it will actually be used (next to the `ns` or page it's prototyping for) so context is obvious, but name it so a casual reader can see it's a prototype, not production (`prototype_*`, `scratch.clj`, `prototype-logic.html`). For throwaway UI routes, obey whatever routing convention the project already uses; don't invent a new top-level structure.

2. **Trivial to run — Clojure lean.** A prototype starts from one command in the project's task runner:
   - Logic (Clojure): `bb prototype-logic` (via `bb.edn` task) or `clojure -M -e "(load-file \"prototype.clj\")"` or single HTML file double-click
   - UI (Clojure/Quil): `bb quil-prototype` or `clojure -M -m my.prototype-sketch`; UI (Browser 3D): `bb serve` (`clojure-threejs` single HTML); Simulation/Game (Raylib): `clojure -M:run` (`clojure-raylib` template)
   - Generic fallback: `bb <name>`, `clojure -M <path>`, `python <path>`, etc.
   Either way, no thinking required to start it. Prefer `bb` on this 6 Gi box (fast, low RAM) over cold JVM.

3. **No persistence by default.** State lives in memory (atom). Persistence is the thing the prototype is _checking_, not something it should depend on. If the question explicitly involves a database, hit a scratch DB (in-memory `SQLite` `:memory:`) or a local EDN file with a clear "PROTOTYPE, wipe me" name. For Quil, no DB at all.

4. **Skip the polish.** No `clojure.test`, no error handling beyond what makes the prototype _runnable_, no abstractions, no `spec` unless the question is about `spec`. The point is to learn fast. Keep `deps.edn` unchanged — don't add libs without asking.

5. **Surface the state.** After every action (logic) or on every variant switch (UI/Quil frame), print or render the full relevant state (EDN `pr-str` or `tap>` table) so the user can see what changed. In Clojure logic demo, `clojure.pprint/pprint` the state map.

6. **Capture it when done.** Fold any validated decision into the real `ns`, then capture the prototype itself as a **primary source**: commit it to a throwaway branch, out of main, and leave a context pointer to that branch on the implementation issue. Capture the answer too (the verdict and the question it settled) in the issue or a commit. The main branch keeps only the validated decision.

## Clojure Guardrails

- Don't add `quil` or `http-kit` to `deps.edn` without asking (per `AGENTS.md` minimal deps).
- For browser 3D prototypes, use `clojure-threejs` (zero-build HTML via CDN); do not introduce `shadow-cljs` or `npm`.
- Raylib prototype: use `clojure-raylib` (`b12n-oss/raylib-clj`); run with `clojure`, not `clj`; never use `-XstartOnFirstThread` on Linux.
- For pure logic, prefer `bb` + EDN over HTML if the audience is devs + CIDER. For non-devs, HTML wins.
- Quil prototype: use `clojure-quil`; keep sketch single-file, no `lein` plugins unless already in repo.
