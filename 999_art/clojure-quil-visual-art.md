# Clojure Processing / Quil for Visual Art: Research Report

Date: 2026-09-24  
Primary Sources:
- [Quil Official Repository](https://github.com/quil/quil) (v4.3.1563, Processing 4.5)
- [Quil Documentation & API](http://quil.info/)
- [Tyler Hobbs' Genartlib](https://github.com/thobbs/genartlib)
- [Fastmath by Generateme](https://github.com/generateme/fastmath)
- [Processing 4 Core Source](https://github.com/processing/processing4)

---

## Executive Summary

[Quil](http://quil.info/) is the premier creative coding and generative art framework in Clojure. It combines the [Processing](https://processing.org/) graphics API with Clojure's functional programming and interactive REPL.

* **Current Version**: Quil `4.3.1563` on Clojars.
* **Underlying Engine**: Processing 4 (`4.2.3` / `4.5.3`), Java2D, and JOGL OpenGL.
* **JDK Compatibility**: Fully compatible with OpenJDK 17 through OpenJDK 25.
* **Key Visual Art Strengths**:
  * Functional State (`quil.middleware/fun-mode`): Elm-like immutable state flow.
  * Live REPL Evolution: Redefine art algorithms live without closing the window.
  * Vector Export (SVG & PDF): Native resolution-independent vector output for pen plotters and print.
  * Proven Pedigree: Used by renowned generative artists (notably Tyler Hobbs, creator of *Fidenza*).

---

## Architecture & Rendering Engines

Quil supports multiple backend renderers on desktop Clojure and ClojureScript:

| Renderer | Backend | Best For | Vector or Raster | Native Deps Needed |
| :--- | :--- | :--- | :--- | :--- |
| **`:java2d`** (Default) | Java AWT / Java2D | Clean 2D lines, static art, generative sketches | Raster (onscreen) | None (standard JVM) |
| **`:p2d`** | OpenGL via JOGL | Fast GPU-accelerated 2D, particle systems | Raster (GPU) | JOGL 2.5+ |
| **`:p3d`** | OpenGL via JOGL | 3D geometry, lighting, camera transforms | Raster (GPU) | JOGL 2.5+ |
| **`:svg`** | Apache Batik | Pen plotters (AxiDraw), laser cutters, scalable print | Pure Vector | None (bundled in Quil) |
| **`:pdf`** | iText | High-resolution publication prints, multi-page vector | Pure Vector | None (bundled in Quil) |

---

## Functional Art Architecture (`fun-mode`)

In standard Processing (Java/Python), programs rely on mutable global variables.  
Quil's **`fun-mode`** middleware transforms this into a pure functional pipeline:

```
[setup] -> initial-state (map)
   |
   v
[update] (state) -> next-state   <-- (Pure physics, agents, flow fields)
   |
   v
[draw]   (state) -> renders frame <-- (Read-only graphics calls)
```

### Pure Functional Sketch Example

```clojure
(ns my-art.core
  (:require [quil.core :as q]
            [quil.middleware :as m]))

(defn setup []
  (q/frame-rate 60)
  (q/color-mode :hsb 360 100 100 1.0)
  {:particles (for [_ (range 200)]
                {:x (q/random (q/width))
                 :y (q/random (q/height))
                 :hue (q/random 180 240)})})

(defn update-state [state]
  (update state :particles
          (fn [ps]
            (map (fn [p]
                   (-> p
                       (update :y #(mod (+ % 1.5) (q/height)))
                       (update :x #(+ % (q/random -1 1)))))
                 ps))))

(defn draw-state [state]
  (q/background 220 20 15)
  (doseq [{:keys [x y hue]} (:particles state)]
    (q/stroke hue 80 90 0.6)
    (q/stroke-weight 3)
    (q/point x y)))

(defn create-sketch []
  (q/sketch
    :title "Generative Flow"
    :size [800 800]
    :setup #'setup
    :update #'update-state
    :draw #'draw-state
    :middleware [m/fun-mode m/pause-on-error]))

(defonce sketch (create-sketch))
```

---

## Live REPL Workflow for Visual Artists

Quil provides two distinct REPL workflows:

### 1. The Interactive Animation Easel
* Pass functions as vars: `:draw #'draw-state`, `:update #'update-state`.
* Wrap the sketch initialization in `(defonce sketch ...)`.
* Add `m/pause-on-error` to the middleware vector.
* **Workflow**:
  1. Open the sketch window once.
  2. Edit math, colors, or shapes in Emacs / CIDER.
  3. Evaluate with `C-c C-e` or `C-j`.
  4. The canvas updates on the next frame immediately.
  5. If an error occurs, `pause-on-error` freezes the canvas without closing the window. Fix the code and re-eval to continue.

### 2. The Tyler Hobbs Static Art Workflow
Used for high-resolution static generative art pieces:
* Set `(q/no-loop)` in `setup`. The sketch draws only when requested.
* Seed both `(q/random-seed seed)` and `(q/noise-seed seed)` from a timestamp.
* Archive the source code alongside the image filename so every output is reproducible.
* Trigger redraws from the REPL:
  ```clojure
  (defn refresh []
    (use :reload 'my-art.dynamic)
    (.redraw sketch))
  ```

---

## Vector Export for Physical Art & Pen Plotters

For physical generative art (pen plotters like AxiDraw, Risograph printing, gallery vector prints), Quil exports direct vector files:

### Native SVG Export

```clojure
(ns my-art.plotter
  (:require [quil.core :as q]))

(defn draw-vector-art []
  (q/sketch
    :size [1000 1000]
    :renderer :svg
    :output-file "output/plot.svg"
    :draw (fn []
            (q/background 255)
            (q/no-fill)
            (q/stroke 0)
            (q/stroke-weight 1)
            ;; Drawing loops here:
            (dotimes [i 50]
              (q/ellipse 500 500 (* i 15) (* i 15)))
            (println "Saved vector SVG to output/plot.svg")
            (q/exit)))))
```

### Native PDF Export

```clojure
(q/sketch
  :size [1200 1200]
  :renderer :pdf
  :output-file "output/artwork.pdf"
  :draw (fn []
          (q/background 255)
          ;; Render commands...
          (q/exit)))
```

---

## Ecosystem Companions for Generative Art

Visual artists in Clojure combine Quil with several specialized libraries:

### 1. `thobbs/genartlib` (Tyler Hobbs)
- **Clojars**: `[genartlib "1.4.0"]`
- **Features**:
  - **Chaikin Curve Smoothing** (`chaikin-curve`): Softens angular polygons into organic hand-drawn curves.
  - **Poisson-Disc Sampling** (`poisson-disc-sample`): Natural, blue-noise point packing with minimum distance guarantees.
  - **Plotter Optimization** (`sort-curves-for-plotting`): Reorders paths to minimize pen-up travel time on pen plotters.
  - **Probability Distributions**: Gaussian (`gauss`), Pareto, and triangular sampling.
  - **Coordinate Helpers**: Percent-based dimensions `(w 0.5)` and `(h 0.5)` for resolution-independent composition.

### 2. `generateme/fastmath` (Tomasz Sulej)
- **Clojars**: `[generateme/fastmath "2.4.0"]`
- **Features**:
  - High-performance 2D/3D vectors and matrices.
  - Rich noise algorithms (Perlin, Simplex, OpenSimplex, Worley/Voronoi).
  - Signed Distance Fields (SDFs), fractals, and complex number mathematics.

### 3. `plotter-utils`
- **Clojars**: `[plotter-utils "0.1.2"]`
- Generates HPGL toolpaths directly for vintage flatbed plotters and vinyl cutters.

---

## Quil vs Raylib in Clojure

| Feature | Quil (Processing) | Raylib (`b12n-oss/raylib-clj`) |
| :--- | :--- | :--- |
| **Primary Domain** | Visual art, generative systems, plotters, creative coding | Games, simulations, physics engines |
| **Rendering Backend** | Java2D, JOGL OpenGL, Apache Batik (SVG), iText (PDF) | Native OpenGL via C ABI / Panama FFM |
| **State Paradigm** | Immutable functional state (`fun-mode`) | Mutable frame loop + Clojure atom |
| **Vector Export** | Built-in native SVG and PDF export | Raster only (PNG, BMP, framebuffer) |
| **Setup Complexity** | Zero native binary setup (pure Java/JVM dependency) | Requires shared C libraries / Panama flags |
| **3D / Performance** | Moderate (AWT / JOGL) | High (direct C engine performance) |

---

## Recommended Project Template (`deps.edn`)

```clojure
{:paths ["src"]
 :deps
 {org.clojure/clojure {:mvn/version "1.12.0"}
  quil/quil {:mvn/version "4.3.1563"}
  genartlib/genartlib {:mvn/version "1.4.0"}}

 :aliases
 {:run
  {:main-opts ["-m" "my-art.core"]}}}
```

---

## Summary Findings

1. **Quil is modern and stable**: Version `4.3.1563` runs smoothly on JDK 17, 21, and 25 with no extra flags needed for standard 2D art.
2. **`fun-mode` eliminates mutable spaghetti**: Allows clean, mathematical separation of generative logic from rendering.
3. **Best choice for physical/generative art**: Built-in SVG/PDF vector output makes Quil superior to game engines for plotters and print.
