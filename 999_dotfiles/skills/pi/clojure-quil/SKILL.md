---
name: clojure-quil
description: "Build 2D/3D generative art, creative coding sketches, visual simulations, and vector/DXF plotter graphics with Quil and Processing in Clojure. Use when creating Quil 2D or 3D sketches, setting up live REPL visual workflows, exporting SVG/PDF/DXF, or implementing generative algorithms."
---

# Clojure Quil Skill

Use this skill to build visual art, generative graphics, and creative sketches in Clojure with [Quil](http://quil.info/) (Processing).

---

## 1. Golden Rules (Read Before Writing Sketches)

* **Always Use Functional Mode (`fun-mode`)**:
  * Never mutate global variables inside `draw`.
  * Pass `:middleware [m/fun-mode m/pause-on-error]`.
  * State flows immutably: `setup` -> `update` -> `draw`.
* **Always Pass Vars for Live REPL Reloading**:
  * Use `#'setup`, `#'update-state`, `#'draw-state` in `(q/sketch ...)`.
  * Store the sketch in `(defonce sketch ...)`.
  * When you re-evaluate a function in Emacs CIDER (`C-c C-e` or `C-j`), the running window updates immediately without closing.
* **Always Include `pause-on-error`**:
  * Add `m/pause-on-error` to `:middleware`.
  * If your code throws an exception during live evaluation, the sketch freezes instead of crashing. Fix the code and re-eval to resume.
* **Never Call Context Functions Outside Sketches**:
  * `(q/random)`, `(q/width)`, and `(q/color)` throw a `NullPointerException` if called at the top-level.
  * Use pure Clojure (`rand`, `rand-int`) outside sketches, or wrap calls in `(quil.applet/with-applet sketch ...)`.
* **Disable Loop for Static Art**:
  * For static images, call `(q/no-loop)` in `setup`.
  * Redraw on demand via `(.redraw sketch)` to avoid high CPU usage.
* **3D Mode Requires `:p3d`**:
  * For 3D geometry and lights, set `:renderer :p3d` in `(q/sketch ...)`.
  * Default renderer is `:java2d` (2D only).

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

## 3. Template A: Live Interactive REPL Easel (Animated)

Use this template for real-time animations, simulations, and particle systems.

Create `src/art/core.clj`:

```clojure
(ns art.core
  (:require [quil.core :as q]
            [quil.middleware :as m])
  (:gen-class))

(defn setup []
  (q/frame-rate 60)
  (q/color-mode :hsb 360 100 100 1.0)
  ;; Return initial immutable state map
  {:time 0.0
   :particles (for [_ (range 150)]
                {:x (q/random (q/width))
                 :y (q/random (q/height))
                 :speed (q/random 1.0 3.0)
                 :hue (q/random 180 260)})})

(defn update-state [state]
  (-> state
      (update :time + 0.02)
      (update :particles
              (fn [ps]
                (map (fn [p]
                       (-> p
                           (update :y #(mod (+ % (:speed p)) (q/height)))
                           (update :x #(+ % (Math/sin (+ (:y p) (:time state)))))))
                     ps)))))

(defn draw-state [state]
  (q/background 220 20 15)
  (doseq [{:keys [x y hue]} (:particles state)]
    (q/stroke hue 80 95 0.7)
    (q/stroke-weight 4)
    (q/point x y)))

(defn create-sketch []
  (q/sketch
    :title "Live Quil Easel"
    :size [800 800]
    :setup #'setup
    :update #'update-state
    :draw #'draw-state
    :features [:keep-on-top]
    :middleware [m/fun-mode m/pause-on-error]))

;; Defonce ensures evaluating the file does not open duplicate windows
(defonce sketch (create-sketch))

(defn -main [& _args]
  (create-sketch))
```

### Emacs CIDER Workflow:
1. Start REPL with `M-x cider-jack-in-clj`.
2. Load the buffer with `C-c C-k`. The window opens.
3. Edit `draw-state` or `update-state`.
4. Re-evaluate the function with `C-c C-c` or `C-j`.
5. The open window reflects changes on the next frame instantly.

---

## 4. Template B: Static Generative Art & Reproducibility

Use this template (inspired by Tyler Hobbs) for high-resolution static art with seed logging and code snapshots.

```clojure
(ns art.static
  (:require [quil.core :as q]
            [genartlib.util :refer [w h set-color-mode]])
  (:gen-class))

(defn draw-art [seed]
  (println "Rendering seed:" seed)
  (q/random-seed seed)
  (q/noise-seed seed)

  ;; Background
  (q/background 40 5 95)

  ;; Generative drawing operations
  (q/stroke 210 60 30 0.8)
  (q/stroke-weight (w 0.002))
  (dotimes [i 200]
    (let [x (w (+ 0.1 (* 0.8 (q/random 1.0))))
          y (h (+ 0.1 (* 0.8 (q/random 1.0))))
          len (w (* 0.05 (q/noise (* i 0.1))))]
      (q/line x y (+ x len) (+ y len)))))

(defn setup []
  (q/smooth)
  (q/no-loop)
  (set-color-mode))

(defn draw []
  (let [seed (System/nanoTime)
        filename (str "output/art-" seed ".png")]
    (draw-art seed)
    (q/save filename)
    (println "Saved image:" filename)))

(defn create-static-art []
  (q/sketch
    :title "Static Generative Artwork"
    :size [1200 1200]
    :setup setup
    :draw draw))

(defonce static-art (create-static-art))

;; Call from REPL to generate a new piece with a new seed:
(defn redraw! []
  (.redraw static-art))
```

---

## 5. Template C: Pen Plotter & Vector Export (SVG / PDF)

Use this template to generate resolution-independent vector files for pen plotters (AxiDraw) and laser cutters.

```clojure
(ns art.plotter
  (:require [quil.core :as q]
            [genartlib.curves :refer [chaikin-curve]]
            [genartlib.random :refer [gauss]]))

(defn generate-plot-paths []
  ;; Generate organic curves with Chaikin smoothing
  (for [y (range 100 900 20)]
    (let [points (for [x (range 100 900 40)]
                   [x (+ y (gauss 0 10))])]
      (chaikin-curve points 3))))

(defn export-svg [filepath]
  (q/sketch
    :size [1000 1000]
    :renderer :svg
    :output-file filepath
    :draw (fn []
            (let [paths (generate-plot-paths)]
              (q/background 255)
              (q/no-fill)
              (q/stroke 0)
              (q/stroke-weight 1.5)
              (doseq [path paths]
                (q/begin-shape)
                (doseq [[x y] path]
                  (q/vertex x y))
                (q/end-shape))
              (println "Plotter SVG exported successfully to:" filepath)
              (q/exit)))))
```

---

## 6. Template D: 3D Graphics & Navigation (`:renderer :p3d`)

Use this template for 3D sculptures, polyhedra, mathematical surfaces, or first-person camera navigation.

```clojure
(ns art.three-d
  (:require [quil.core :as q]
            [quil.middleware :as m])
  (:gen-class))

(defn setup []
  (q/frame-rate 60)
  {:rot 0.0})

(defn update-state [state]
  (update state :rot + 0.01))

(defn draw-state [state]
  (q/background 20)
  (q/lights)                          ;; Enable 3D lighting

  ;; Translate to center of 3D viewport
  (q/with-translation [(/ (q/width) 2) (/ (q/height) 2) 0]
    (q/rotate-x (:rot state))
    (q/rotate-y (* 1.5 (:rot state)))

    (q/fill 0 200 255)
    (q/stroke 255)
    (q/box 150)))                      ;; Render 3D cube (or q/sphere)

(defn create-3d-sketch []
  (q/sketch
    :title "Quil 3D Sketch"
    :size [800 800]
    :renderer :p3d                     ;; Enables OpenGL 3D engine
    :setup #'setup
    :update #'update-state
    :draw #'draw-state
    ;; Optional: add m/navigation-3d for instant WASD + mouse-look camera controls
    :middleware [m/fun-mode m/pause-on-error]))

(defonce sketch-3d (create-3d-sketch))
```

*Note: For 3D printing and CAD, export 3D geometry to DXF with `(q/begin-raw :dxf "model.dxf")` and `(q/end-raw)`.*

---

## 7. Generative Art Toolkit (`genartlib`)

When writing generative algorithms, use `thobbs/genartlib`:

| Namespace | Function | Purpose |
| :--- | :--- | :--- |
| `genartlib.curves` | `(chaikin-curve pts depth)` | Smooths rough line segments into organic hand-drawn curves. |
| `genartlib.poisson-disc` | `(poisson-disc-sample min-dist w h)` | Blue noise point distribution with guaranteed minimum spacing. |
| `genartlib.random` | `(gauss mean sd)` | Gaussian normal distribution sampling instead of uniform random. |
| `genartlib.plotter` | `(sort-curves-for-plotting curves)` | Optimizes toolpaths to minimize pen-up transit on physical plotters. |
| `genartlib.util` | `(w pct)`, `(h pct)` | Dimensions relative to image width/height (resolution-independent art). |

---

## 8. Troubleshooting Checklist

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| `NullPointerException` on `(q/random)` | Called outside sketch context | Use pure Clojure `rand` or wrap in `(quil.applet/with-applet sketch ...)`. |
| Modifying code does not update running window | Forgot var quotation | Pass `#'draw-state` and `#'update-state`, not `draw-state`. |
| Re-evaluating file opens a second window | Re-calling `(q/sketch)` | Wrap sketch definition in `(defonce sketch (create-sketch))`. |
| Sketch window crashes on typo | Missing error middleware | Add `m/pause-on-error` to `:middleware` vector. |
| CPU usage stays at 100% on static sketch | Loop running at 60 FPS | Call `(q/no-loop)` in `setup`. Trigger redraws with `(.redraw sketch)`. |
| Text does not show in exported PDF | Default text mode | Call `(q/text-mode :shape)` or `(q/text-mode :model)` at the start of draw. |
