---
name: clojure-quil
triggers: [quil, flow field, noise, l-system, plotter, svg]
anti-triggers: [raylib, webgpu]
description: >-
  Use when building 2D/3D procedural art with Quil/Processing, or when previewing USD-shared local ±1 art in Quil via clojure-pcg (flow fields, noise, L-systems, seeded art, plotter/SVG).
---

# Clojure Quil Skill: Procedural Visual Art
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill clojure-quil
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Use this skill to build procedural content generation (PCG) systems and generative visual art in Clojure with [Quil](http://quil.info/) (Processing).

> **Mode:** `Standalone` = pixels + GL `z -1..1` (this skill, fast preview) vs `USD-shared` = local `±1` + `xformOpOrder` via `clojure-pcg` + `pcg-spaces` (pure `java.util.Random`). See §10.

---

## 1. Golden Rules for Procedural Art

* **Separate Data Generation From Drawing**:
  * Write pure Clojure functions to generate art data.
  * Generate point lists, shapes, and colors as pure data first.
  * Send the generated data to Quil only to render pixels.
* **Guarantee Determinism With Seeds**:
  * Set `(q/random-seed seed)` and `(q/noise-seed seed)`.
  * The same seed must always produce the same image.
  * Store the seed in metadata or file names.
* **Always Use Functional Mode (`fun-mode`)**:
  * Do not mutate global variables in `draw`.
  * Pass `:middleware [m/fun-mode m/pause-on-error]`.
  * Pass state immutably: `setup` -> `update` -> `draw`.
* **Pass Vars for Live REPL Reloading**:
  * Use `#'setup`, `#'update-state`, and `#'draw-state` in `(q/sketch ...)`.
  * Store the sketch in `(defonce sketch ...)`.
  * Re-evaluating a function in Emacs (`C-c C-c` or `C-j`) updates the canvas immediately.
* **Stop the Animation Loop for Static PCG**:
  * Call `(q/no-loop)` in `setup` for static renders.
  * Call `(.redraw sketch)` from the REPL to generate a new variation.
* **Never Call Quil Math Outside Sketches**:
  * `(q/random)`, `(q/width)`, and `(q/noise)` fail outside active sketches.
  * Use pure Clojure functions (`rand`, `rand-int`) outside sketches.
  * Or wrap outside calls in `(quil.applet/with-applet sketch ...)`.

---

## 2. Standard `deps.edn` Setup

```clojure
{:paths ["src"]
 :deps
 {org.clojure/clojure {:mvn/version "1.12.0"}
  quil/quil {:mvn/version "4.3.1563"}
  genartlib/genartlib {:mvn/version "1.4.0"}}

 :aliases
 {:run
  {:main-opts ["-m" "art.core"]}}}
```

---

## 3. Core PCG Algorithms in Clojure

### Cosine Color Palettes (Inigo Quilez Formula)

Generate procedural color palettes with cosine functions:
`color(t) = a + b * cos(2 * PI * (c * t + d))`

```clojure
(defn cosine-palette
  "Return [r g b] vector (0.0 to 1.0) for phase t."
  [t {:keys [a b c d]}]
  (mapv (fn [ai bi ci di]
          (let [tau (* 2.0 Math/PI)
                val (+ ai (* bi (Math/cos (* tau (+ (* ci t) di)))))]
            (max 0.0 (min 1.0 val))))
        a b c d))

;; Preset: Neon Rainbow
(def neon-palette
  {:a [0.5 0.5 0.5]
   :b [0.5 0.5 0.5]
   :c [1.0 1.0 1.0]
   :d [0.0 0.33 0.67]})

;; Preset: Warm Desert
(def desert-palette
  {:a [0.5 0.5 0.5]
   :b [0.5 0.5 0.5]
   :c [2.0 1.0 0.0]
   :d [0.5 0.20 0.25]})
```

### 2D Noise Flow Field Generator

Generate particle paths that follow 2D Perlin noise angles:

```clojure
(defn trace-flow-path
  "Generate a procedural curve through a noise vector field."
  [start-x start-y {:keys [steps step-len noise-scale]}]
  (loop [step 0
         x (double start-x)
         y (double start-y)
         path [[start-x start-y]]]
    (if (>= step steps)
      path
      (let [angle (* (q/noise (* x noise-scale) (* y noise-scale)) (* 2.0 Math/PI) 2.0)
            nx (+ x (* step-len (Math/cos angle)))
            ny (+ y (* step-len (Math/sin angle)))]
        (recur (inc step) nx ny (conj path [nx ny]))))))
```

### Recursive Grid Subdivision (Quadtree PCG)

Subdivide rectangles recursively for generative layouts:

```clojure
(defn subdivide-rect
  "Recursively split a rectangle into smaller generative cells."
  [x y w h depth max-depth min-size]
  (let [split? (< (rand) 0.75)]
    (if (or (>= depth max-depth)
            (< w (* min-size 2))
            (< h (* min-size 2))
            (not split?))
      [{:x x :y y :w w :h h :depth depth}]
      (let [half-w (/ w 2.0)
            half-h (/ h 2.0)
            next-depth (inc depth)]
        (concat
         (subdivide-rect x y half-w half-h next-depth max-depth min-size)
         (subdivide-rect (+ x half-w) y half-w half-h next-depth max-depth min-size)
         (subdivide-rect x (+ y half-h) half-w half-h next-depth max-depth min-size)
         (subdivide-rect (+ x half-w) (+ y half-h) half-w half-h next-depth max-depth min-size))))))
```

---
## 4. Templates A-D — see `references/templates.md` + `references/pcg-algorithms.md`
> A=Live flow field (interactive fun-mode), B=Static high-res save, C=Plotter SVG Chaikin, D=3D :p3d/DXF. Full code moved.
> SKILL.md keeps Golden Rules (fun-mode, var quoting, q/no-loop, seeded), deps.edn, and PCG cosine/flow/quadtree summaries.

## 5. Genartlib + Troubleshooting — see `references/templates.md`
> Poisson-disc, gauss, sort-curves, w/h helpers, 8-row troubleshooting table moved.

## 6. USD Compatibility — Quil is pixels preview only, stores local ±1 + xformOpOrder for sharing. See `references/templates.md` §10.

## References
- Full templates: `references/templates.md`
- PCG algorithms: `references/templates.md` §3

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args
- **Outputs:** concise markdown: table or bullets
- **Tools allowed:** read, bash, edit, write
- **Stop condition:** verified + confirmed if destructive
- **Lean box:** 6.3 Gi — prefer bb
