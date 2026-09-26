---
name: clojure-quil
description: >-
  Use when building 2D/3D procedural art with Quil/Processing, or when previewing USD-shared local ±1 art in Quil via clojure-pcg (flow fields, noise, L-systems, seeded art, plotter/SVG).
---

# Clojure Quil Skill: Procedural Visual Art

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

## 4. Template A: Live Generative Flow Field (Interactive) [Standalone — Not USD]

Use this template for real-time procedural animations and particle systems.

Create `src/art/core.clj`:

```clojure
(ns art.core
  (:require [quil.core :as q]
            [quil.middleware :as m])
  (:gen-class))

(defn setup []
  (q/frame-rate 60)
  (q/color-mode :rgb 1.0)
  ;; State holds PCG parameters and active entities
  {:seed 42
   :time 0.0
   :noise-scale 0.005
   :particles (for [_ (range 200)]
                {:x (q/random 800)
                 :y (q/random 800)
                 :speed (q/random 1.5 3.5)
                 :life (q/random 100 300)})})

(defn update-state [state]
  (let [ns-scale (:noise-scale state)
        t (:time state)]
    (-> state
        (update :time + 0.005)
        (update :particles
                (fn [ps]
                  (map (fn [p]
                         (let [angle (* (q/noise (* (:x p) ns-scale)
                                                 (* (:y p) ns-scale)
                                                 t)
                                        (* 2.0 Math/PI) 4.0)
                               nx (+ (:x p) (* (:speed p) (Math/cos angle)))
                               ny (+ (:y p) (* (:speed p) (Math/sin angle)))]
                           (if (or (< nx 0) (> nx 800) (< ny 0) (> ny 800))
                             {:x (q/random 800) :y (q/random 800) :speed (:speed p) :life 200}
                             (assoc p :x nx :y ny))))
                       ps))))))

(defn draw-state [state]
  ;; Semi-transparent fade gives motion trails
  (q/fill 0.05 0.05 0.08 0.1)
  (q/no-stroke)
  (q/rect 0 0 (q/width) (q/height))

  ;; Render procedural particles
  (doseq [{:keys [x y speed]} (:particles state)]
    (let [t-val (/ speed 3.5)]
      (q/stroke 0.2 (+ 0.4 (* 0.6 t-val)) 1.0 0.8)
      (q/stroke-weight 2)
      (q/point x y))))

(defn create-sketch []
  (q/sketch
    :title "Live PCG Flow Field"
    :size [800 800]
    :setup #'setup
    :update #'update-state
    :draw #'draw-state
    :features [:keep-on-top]
    :middleware [m/fun-mode m/pause-on-error]))

(defonce sketch (create-sketch))

(defn -main [& _args]
  (create-sketch))
```

### Live REPL Workflow:
1. Start REPL: `M-x cider-jack-in-clj`.
2. Load buffer: `C-c C-k`. The window opens.
3. Edit `noise-scale`, `update-state`, or colors.
4. Evaluate form: `C-c C-c` or `C-j`.
5. The window updates instantly.

---

## 5. Template B: Reproducible High-Resolution Static Art [Standalone — Not USD]

Use this template for static procedural artworks. It logs seeds and saves output images.

```clojure
(ns art.static
  (:require [quil.core :as q]
            [genartlib.util :refer [w h]])
  (:gen-class))

(defn generate-art-data [seed]
  (q/random-seed seed)
  (q/noise-seed seed)
  (let [count 600]
    (for [i (range count)]
      (let [t (/ (double i) count)
            radius (w (* 0.35 (Math/sqrt t)))
            angle (* t 40.0 Math/PI)
            noise-offset (* (w 0.05) (- (q/noise (* t 5.0)) 0.5))]
        {:x (+ (w 0.5) (* (+ radius noise-offset) (Math/cos angle)))
         :y (+ (h 0.5) (* (+ radius noise-offset) (Math/sin angle)))
         :size (+ (w 0.003) (* (w 0.015) (q/noise (* t 10.0))))
         :alpha (+ 0.2 (* 0.7 (q/noise (+ 100.0 (* t 3.0)))))}))))

(defn render-art [seed]
  (println "Rendering seed:" seed)
  (let [elements (generate-art-data seed)]
    ;; Dark background
    (q/background 15 15 22)
    (q/no-stroke)
    ;; Draw procedural elements
    (doseq [{:keys [x y size alpha]} elements]
      (q/fill 240 180 80 (* alpha 255))
      (q/ellipse x y size size))))

(defn setup []
  (q/smooth)
  (q/no-loop))

(defn draw []
  (let [seed (System/currentTimeMillis)
        filename (str "output/pcg-" seed ".png")]
    (render-art seed)
    (q/save filename)
    (println "Saved static PCG render:" filename)))

(defn create-static-sketch []
  (q/sketch
    :title "Static PCG Artwork"
    :size [1200 1200]
    :setup setup
    :draw draw))

(defonce static-sketch (create-static-sketch))

;; Call from REPL to generate a new seed:
(defn redraw! []
  (.redraw static-sketch))
```

---

## 6. Template C: Pen Plotter & Vector Art (SVG Export) [Standalone — Not USD]

Use this template to generate procedural vector paths for pen plotters (AxiDraw) and laser cutters.

```clojure
(ns art.plotter
  (:require [quil.core :as q]
            [genartlib.curves :refer [chaikin-curve]]
            [genartlib.random :refer [gauss]]))

(defn generate-plotter-lines [seed]
  (q/random-seed seed)
  (for [y (range 150 850 15)]
    (let [raw-points (for [x (range 100 900 30)]
                       (let [dist-center (Math/abs (- x 500))
                             envelope (max 0.0 (- 1.0 (/ dist-center 400.0)))
                             y-offset (* envelope (gauss 0 18))]
                         [x (+ y y-offset)]))]
      ;; Smooth points with Chaikin algorithm
      (chaikin-curve raw-points 3))))

(defn export-svg [filepath seed]
  (q/sketch
    :size [1000 1000]
    :renderer :svg
    :output-file filepath
    :draw (fn []
            (let [lines (generate-plotter-lines seed)]
              (q/background 255)
              (q/no-fill)
              (q/stroke 0)
              (q/stroke-weight 1.5)
              (doseq [polyline lines]
                (q/begin-shape)
                (doseq [[x y] polyline]
                  (q/vertex x y))
                (q/end-shape))
              (println "SVG exported to:" filepath)
              (q/exit)))))
```

---

## 7. Template D: 3D Procedural Sculptures (`:renderer :p3d`) [Standalone — Not USD]

Use this template for 3D procedural structures, polyhedra, and DXF export for 3D printing.

```clojure
(ns art.sculpture-3d
  (:require [quil.core :as q]
            [quil.middleware :as m])
  (:gen-class))

(defn setup []
  (q/frame-rate 60)
  {:rot 0.0
   :seed 99})

(defn update-state [state]
  (update state :rot + 0.01))

(defn draw-state [state]
  (q/background 15)
  (q/lights)
  (q/with-translation [(/ (q/width) 2) (/ (q/height) 2) 0]
    (q/rotate-x (:rot state))
    (q/rotate-y (* 1.3 (:rot state)))
    (q/stroke 100 200 255)
    (q/no-fill)

    ;; Render procedural helix ring
    (let [steps 120]
      (dotimes [i steps]
        (let [theta (* (/ (double i) steps) (* 4.0 Math/PI))
              r (+ 180 (* 40 (Math/sin (* theta 3.0))))
              x (* r (Math/cos theta))
              y (* r (Math/sin theta))
              z (* 80 (Math/sin (* theta 2.0)))]
          (q/with-translation [x y z]
            (q/box 12)))))))

(defn create-3d-sketch []
  (q/sketch
    :title "3D Procedural Sculpture"
    :size [800 800]
    :renderer :p3d
    :setup #'setup
    :update #'update-state
    :draw #'draw-state
    :middleware [m/fun-mode m/pause-on-error]))

(defonce sketch-3d (create-3d-sketch))
```

*Note: Export 3D geometry to DXF with `(q/begin-raw :dxf "model.dxf")` and `(q/end-raw)`.*

---

## 8. Generative Art Toolkit (`genartlib`)

Use `thobbs/genartlib` for procedural generation tasks:

| Namespace | Function | Purpose |
| :--- | :--- | :--- |
| `genartlib.curves` | `(chaikin-curve pts depth)` | Smooths rough segments into organic curves. |
| `genartlib.poisson-disc` | `(poisson-disc-sample min-dist w h)` | Blue noise distribution with minimum distance. |
| `genartlib.random` | `(gauss mean sd)` | Gaussian normal distribution sampling. |
| `genartlib.plotter` | `(sort-curves-for-plotting curves)` | Optimizes paths to reduce pen-up transit. |
| `genartlib.util` | `(w pct)`, `(h pct)` | Dimensions relative to canvas (resolution-independent). |

---

## 9. Troubleshooting Checklist

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| `NullPointerException` on `(q/random)` | Called outside sketch context | Use pure Clojure `rand` or wrap in `(quil.applet/with-applet ...)`. |
| Modifying code does not update running window | Forgot var quotation | Pass `#'draw-state` and `#'update-state`, not `draw-state`. |
| Re-evaluating file opens a second window | Re-called `(q/sketch)` | Wrap sketch in `(defonce sketch (create-sketch))`. |
| Sketch window crashes on typo | Missing error middleware | Add `m/pause-on-error` to `:middleware` vector. |
| CPU usage stays at 100% on static sketch | Loop running at 60 FPS | Call `(q/no-loop)` in `setup`. Trigger redraws with `(.redraw sketch)`. |
| Random values differ across identical seeds | Mixed Clojure `rand` with Quil `q/random` | Use only Quil seeded functions or a seeded `java.util.Random` instance. |

---

## 10. OpenUSD / `pcg-spaces` Compatibility (Preview Only)

Quil is **not** USD-native. Use it as the fast 2D preview in the `clojure-pcg` triple-render pipeline. For USD-correct browser see `clojure-webgpu` + `pcg-spaces` skills + `MuggleBornPadawan/999_art/pcg-spaces-usd-webgpu.md`.

*   **Rule 1 Model = USD local:** Do NOT generate pixels in `art.generate`. Generate local `±1` points/normals/`primvars:st` with pure `java.util.Random` (no `q/random`/`q/noise` in generate). Map `±1 → pixels` only in `render_quil.clj` via `w`/`h`. Quil never stores `xformOpOrder` — store it in `art.json` for sharing.
*   **Rule 2 World = hierarchy:** Quil has no USD stage. Do not bake `ComputeLocalToWorldTransform()` into points. Export hierarchy + `xformOpOrder`/`xformOps` + `upAxis`/`metersPerUnit` + `!resetXformStack!` via `clojure-pcg` `art/export.clj` → `public/art.json`. Keep Quil `draw` flat (ignore `!resetXformStack!` in preview, but store it).
*   **Rule 3 USD ends after world:** Quil `draw` is screen space only. Never compute `view/clip/NDC` in Clojure. That is WebGPU-only (see `pcg-spaces`).
*   **Rule 4 WebGPU vs Quil p3d:** Quil `:p3d` is GL `z -1..1`. WebGPU is DirectX `z 0..1`. Do not reuse Quil projection for USD/WebGPU. Browser must use `perspectiveZO` (`far*nf / far*near*nf`).
*   **Pattern:** `art.generate/generate {:seed 42}` (pure) → `render_quil/draw` (pixels) + `export/write-json!` (local ±1 + xformOps). Same seed = same Quil + Raylib + WebGPU image. See `clojure-pcg` skill for `bb.edn` tasks.
