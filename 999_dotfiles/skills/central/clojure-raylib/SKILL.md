---
name: clojure-raylib
triggers: [raylib, realtime 60fps, particles, sdf shader]
anti-triggers: [quil static, webgpu]
description: >-
  Use when building real-time procedural art with Raylib (Panama FFM) or when previewing USD-shared local ±1 art at 60 FPS via clojure-pcg (particles, SDF shaders, meshes, seeded generate).
---

# Clojure Raylib Skill: Procedural Visual Art & Real-Time PCG
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill clojure-raylib
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Use this skill to build real-time procedural visual art, GPU shader simulations, and procedural 3D environments with [Raylib](https://www.raylib.com/) in Clojure.

> **Mode:** `Standalone` = GL `z -1..1` (this skill, 60 FPS preview) vs `USD-shared` = local `±1` + `xformOpOrder` via `clojure-pcg` + `pcg-spaces` (pure `java.util.Random`). See §8.

---

## 1. Golden Rules for Procedural Raylib

* **Linux vs macOS JVM Flags**:
  * **On Linux**: NEVER pass `-XstartOnFirstThread`. The JVM will crash.
  * **On macOS**: ALWAYS pass `-XstartOnFirstThread`. OpenGL needs thread 0 on macOS.
  * **On all platforms**: ALWAYS pass `--enable-native-access=ALL-UNNAMED` for Panama FFM.
* **CLI Execution**:
  * Run with `clojure -M:run`, NOT `clj`.
  * `clj` runs `rlwrap`. `rlwrap` breaks GUI window event processing.
* **Store PCG Parameters in an Atom**:
  * Put all generative parameters in a single state map: `{:seed 42 :frequency 0.05 :speed 1.0}`.
  * Use `swap!` from the REPL to alter the procedural world in real time.
* **Separate Entity Generation From Frame Drawing**:
  * Generate procedural data (vertices, particles, grids) with pure functions.
  * Keep the inner drawing loop light to maintain 60 FPS.
* **Embedded nREPL Connection**:
  * Raylib blocks the main OS thread with its game loop.
  * Start an embedded nREPL server on port 7888 before opening the window.
  * Connect Emacs CIDER or VS Code Calva to `localhost:7888`.

---

## 2. Recommended Stack: `b12n-oss/raylib-clj`

Uses JDK 22+ Foreign Function & Memory (FFM) API via `coffi` with bundled Raylib binaries.

### `deps.edn` Template

```clojure
{:paths ["src"]
 :deps
 {org.clojure/clojure {:mvn/version "1.12.0"}
  nrepl/nrepl {:mvn/version "1.3.0"}
  io.github.b12n-oss/raylib-clj
  {:git/url "https://github.com/b12n-oss/raylib-clj"
   :git/sha "5404ec049ff2d036fcf219d309b2b5a09706cfb5"}}

 :aliases
 {:run
  {:jvm-opts ["--enable-native-access=ALL-UNNAMED"
              "-Djava.library.path=libs/linux_amd64:/usr/local/lib:/usr/lib"]
   :main-opts ["-m" "art.core"]}}}
```

---

## 3. Template A: Live Generative Agent / Particle System [Standalone — Not USD]

Use this template for real-time procedural simulations with live REPL parameter tuning.

Create `src/art/core.clj`:

```clojure
(ns art.core
  (:require [raylib.core.window :as window]
            [raylib.core.drawing :as drawing]
            [raylib.core.timing :as timing]
            [raylib.shapes.basic :as shapes]
            [raylib.colors :as colors]
            [nrepl.server :as nrepl])
  (:gen-class))

;; PCG Parameters and Entity State
(defonce pcg-params
  (atom {:particle-count 800
         :speed-scale 2.0
         :field-frequency 0.008
         :color-mode :gold}))

(defn create-particles [n]
  (vec (for [_ (range n)]
         {:x (rand 800)
          :y (rand 600)
          :vx 0.0
          :vy 0.0})))

(defonce particles (atom (create-particles 800)))

(defn step-particles [ps {:keys [speed-scale field-frequency]}]
  (mapv (fn [{:keys [x y]}]
          (let [angle (* (Math/sin (* x field-frequency))
                         (Math/cos (* y field-frequency))
                         Math/PI 4.0)
                nx (+ x (* speed-scale (Math/cos angle)))
                ny (+ y (* speed-scale (Math/sin angle)))]
            (cond
              (< nx 0) (assoc {:x 800 :y (rand 600) :vx 0.0 :vy 0.0} :y ny)
              (> nx 800) (assoc {:x 0 :y (rand 600) :vx 0.0 :vy 0.0} :y ny)
              (< ny 0) (assoc {:x (rand 800) :y 600 :vx 0.0 :vy 0.0} :x nx)
              (> ny 600) (assoc {:x (rand 800) :y 0 :vx 0.0 :vy 0.0} :x nx)
              :else {:x nx :y ny :vx 0.0 :vy 0.0})))
        ps))

(defn draw-frame [ps params]
  ;; Dark slate clear
  (drawing/clear-background! [12 14 20 255])

  (let [pt-color (if (= (:color-mode params) :gold)
                   colors/gold
                   colors/skyblue)]
    (doseq [{:keys [x y]} ps]
      (shapes/draw-circle! (int x) (int y) 1.5 pt-color))))

(defn -main [& _args]
  ;; 1. Embedded nREPL for live controls
  (nrepl/start-server :port 7888 :bind "127.0.0.1")
  (println "nREPL running on port 7888. Connect CIDER or Calva.")

  ;; 2. Window setup
  (window/init-window! 800 600 "Clojure Raylib: Procedural Field")
  (timing/set-target-fps! 60)

  ;; 3. Main render loop
  (while (not (window/window-should-close?))
    (swap! particles step-particles @pcg-params)
    (drawing/begin-drawing!)
    (draw-frame @particles @pcg-params)
    (drawing/end-drawing!))

  ;; 4. Cleanup
  (window/close-window!)
  (System/exit 0))
```

### Live REPL Controls:
```clojure
;; Connect via M-x cider-connect-clj to localhost:7888
;; Change simulation parameters live:
(swap! art.core/pcg-params assoc :field-frequency 0.02 :speed-scale 4.0)

;; Switch color palette live:
(swap! art.core/pcg-params assoc :color-mode :skyblue)

;; Reset particle population:
(reset! art.core/particles (art.core/create-particles 1500))
```

---



## 4. Templates B-C + Troubleshooting — see `references/templates.md`
> SDF shader, heightmap mesh, perf options, troubleshooting moved.

## 5. USD Compatibility — see `references/templates.md`

## References
- Full templates: `references/templates.md`

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
