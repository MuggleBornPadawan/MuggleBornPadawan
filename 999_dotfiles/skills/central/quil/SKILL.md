---
name: quil
description: "Build 2D/3D art with Quil via pcg router. Use when pcg delegates flow fields, noise, L-systems, or plotter SVG."
---

# Clojure Quil Skill: Procedural Visual Art
## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill quil
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Build PCG with [Quil](http://quil.info/). Mode: `Standalone` = pixels + GL `z -1..1` vs `USD-shared` = local `±1` + `xformOpOrder` via `pcg` + `pcg-spaces`.

## 1. Golden Rules
- Separate generation from drawing — pure fns first, send data to Quil.
- Guarantee determinism: `(q/random-seed seed)` + `(q/noise-seed seed)`.
- Use `fun-mode`: `:middleware [m/fun-mode m/pause-on-error]`, state via `setup->update->draw`.
- Pass vars `#'setup #'update-state #'draw-state` + `(defonce sketch ...)` for REPL reload.
- Static PCG: `(q/no-loop)` in setup, `(.redraw sketch)` for new seed.
- Never call `q/random`/`q/noise`/`q/width` outside sketch — use pure `rand` or `with-applet`.

## 2. Standard deps.edn
```clojure
{:paths ["src"]
 :deps {org.clojure/clojure {:mvn/version "1.12.0"} quil/quil {:mvn/version "4.3.1563"} genartlib/genartlib {:mvn/version "1.4.0"}}
 :aliases {:run {:main-opts ["-m" "art.core"]}}}
```

## 3. PCG Algorithms — see `references/templates.md` §3
Cosine palette (Quilez), flow field `trace-flow-path`, quadtree `subdivide-rect` — full code in reference. Keep signatures lean here.

## 4. Templates A-D — see `references/templates.md`
A=Live flow field, B=Static high-res save, C=Plotter Chaikin, D=3D :p3d/DXF. Load on demand.

## 5. Genartlib + Troubleshooting — see `references/templates.md`
Poisson-disc, gauss, sort-curves, w/h helpers, 8-row table in reference.

## 6. USD — Quil is pixels preview only; store local ±1 + xformOpOrder for share. See `references/templates.md` §10.

## References
- Full templates: `references/templates.md`
