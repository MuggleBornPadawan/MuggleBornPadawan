---
name: clojure-raylib
description: >-
  Use when building real-time procedural art with Raylib (Panama FFM) or when previewing USD-shared local ±1 art at 60 FPS via clojure-pcg (particles, SDF shaders, meshes, seeded generate).
---

# Clojure Raylib Skill: Procedural Visual Art & Real-Time PCG

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

## 4. Template B: Real-Time Procedural GPU Shaders (Raymarching / SDF) [Standalone — Not USD]

Use this template to generate real-time mathematical procedural art directly on the GPU.

### GLSL Fragment Shader (`resources/shaders/sdf_art.fs`):

```glsl
#version 330

in vec2 fragTexCoord;
out vec4 finalColor;

uniform float uTime;
uniform vec2 uResolution;

// Sphere SDF
float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

// Procedural scene distance
float map(vec3 p) {
    // Domain repetition for infinite procedural grid
    vec3 q = mod(p + vec3(2.0), 4.0) - vec3(2.0);
    return sdSphere(q, 0.8 + 0.2 * sin(uTime * 2.0 + p.x));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    vec3 ro = vec3(0.0, 0.0, -5.0 + uTime * 0.5); // Camera ray origin
    vec3 rd = normalize(vec3(uv, 1.0));             // Ray direction

    float dTotal = 0.0;
    for (int i = 0; i < 64; i++) {
        vec3 p = ro + rd * dTotal;
        float d = map(p);
        if (d < 0.001 || dTotal > 50.0) break;
        dTotal += d;
    }

    if (dTotal < 50.0) {
        float fog = 1.0 / (1.0 + dTotal * dTotal * 0.02);
        vec3 col = vec3(0.1, 0.5, 0.9) * fog;
        finalColor = vec4(col, 1.0);
    } else {
        finalColor = vec4(0.02, 0.02, 0.04, 1.0);
    }
}
```

### Clojure Shader Host:

```clojure
(ns art.shader
  (:require [raylib.core.window :as window]
            [raylib.core.drawing :as drawing]
            [raylib.core.timing :as timing]
            [raylib.shaders.core :as shaders]
            [raylib.shapes.basic :as shapes]
            [raylib.colors :as colors])
  (:gen-class))

(defn -main [& _args]
  (window/init-window! 800 600 "Procedural Raymarching")
  (timing/set-target-fps! 60)

  ;; Load fragment shader
  (let [shader (shaders/load-shader nil "resources/shaders/sdf_art.fs")
        time-loc (shaders/get-shader-location shader "uTime")
        res-loc (shaders/get-shader-location shader "uResolution")]

    (while (not (window/window-should-close?))
      (let [time (float (timing/get-time))]
        ;; Send uniform parameters to GPU
        (shaders/set-shader-value! shader time-loc (float-array [time]) :float)
        (shaders/set-shader-value! shader res-loc (float-array [800.0 600.0]) :vec2)

        (drawing/begin-drawing!)
        (drawing/clear-background! colors/black)

        ;; Render procedural shader across full screen quad
        (shaders/begin-shader-mode! shader)
        (shapes/draw-rectangle! 0 0 800 600 colors/white)
        (shaders/end-shader-mode!)

        (drawing/end-drawing!)))

    (shaders/unload-shader! shader)
    (window/close-window!)))
```

---

## 5. Template C: Procedural 3D Parametric Meshes [Standalone — Not USD]

Use this template to generate 3D mathematical surfaces and procedural terrain:

```clojure
(ns art.mesh-3d
  (:require [raylib.core.window :as window]
            [raylib.core.drawing :as drawing]
            [raylib.core.timing :as timing]
            [raylib.models.mesh :as mesh]
            [raylib.models.drawing :as models]
            [raylib.models.camera :as camera]
            [raylib.colors :as colors]))

(defn generate-heightmap-image
  "Generate a procedural 2D noise image for terrain elevation."
  [width height]
  ;; Pure Clojure generation of height pixel values
  (let [data (byte-array (* width height))]
    (dotimes [y height]
      (dotimes [x width]
        (let [val (byte (* 255 (Math/sin (+ (* 0.05 x) (* 0.05 y)))))]
          (aset data (+ x (* y width)) val))))
    data))

;; Use raylib.models.mesh/gen-mesh-heightmap to turn height data into a 3D terrain mesh.
```

---

## 6. Performance Options

### Option A: `b12n-oss/raylib-clj` (Standard)
* Idiomatic Clojure.
* Panama FFM on JDK 25.
* Best balance between interactive REPL speed and performance.

### Option B: `uk.co.electronstudio.jaylib/jaylib` (Maximum Inner-Loop Speed)
* Dependency: `uk.co.electronstudio.jaylib/jaylib {:mvn/version "6.0.1-0"}`.
* JavaCPP JNI binding.
* Use when drawing more than 20,000 procedural shapes per frame.

### Option C: `babashka.ffi` (Instant CLI Generator)
* Sub-50ms startup time.
* Requires system `libraylib.so`.
* Best for CLI utilities that render single images or batch exports.

---

## 7. Troubleshooting Checklist

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| `Unrecognized option: -XstartOnFirstThread` | Running macOS flag on Linux | Remove `-XstartOnFirstThread` from `deps.edn` `:jvm-opts`. |
| `IllegalCallerException: native access` | Missing Panama permission | Add `--enable-native-access=ALL-UNNAMED` to `:jvm-opts`. |
| Window freezes or input deadlocks | Executed with `clj` | Use `clojure -M:run` instead of `clj`. |
| REPL hangs when evaluating window code | Opened window from standalone REPL thread | Launch the game process first. Connect editor to port 7888. |
| Shader compilation fails silently | Invalid GLSL version | Ensure `#version 330` header matches your graphics driver. |
| Memory leaks during procedural regeneration | Recreating meshes without unloading | Call `unload-mesh!` or `unload-texture!` before allocating new procedural GPU assets. |

---

## 8. OpenUSD / `pcg-spaces` Compatibility (Real-Time Preview)

Raylib is **not** USD-native (OpenGL `z -1..1`). Use it as the 60 FPS real-time preview in the `clojure-pcg` triple-render pipeline. For USD-correct browser see `clojure-webgpu` + `pcg-spaces` skills + `MuggleBornPadawan/999_art/pcg-spaces-usd-webgpu.md`.

*   **Rule 1 Model = USD local:** `art.generate` must be pure `java.util.Random` + math, no `raylib/*` imports. Emit local `±1` `points`/`indices`/`primvars:st`. Raylib maps local→world via its own draw calls, but the shared `art.json` stores USD `xformOpOrder`/`xformOps`.
*   **Rule 2 World = USD stage:** Do not bake world matrices into points. Export `{stage:{upAxis, metersPerUnit, !resetXformStack!}, prims:[{xformOpOrder,xformOps,mesh}]}` via `clojure-pcg` `art/export.clj`. Compute `world = parentWorld * localToWorld(fromXformOps)` each frame only in the browser; Raylib just draws the preview mesh (store `!resetXformStack!` even if preview ignores it).
*   **Rule 3 USD ends after world:** Raylib camera (`raylib.models.camera`) is NOT the USD `UsdGeomCamera`. For sharing, store camera `xformOpOrder` + `focalLength`/`horizontalAperture`/`clippingRange` in JSON. Browser computes `view = inverse(cameraWorld)` + `projZO`.
*   **Rule 4 WebGPU vs Raylib GL:** Raylib/GL uses `perspectiveNO` (`z -1..1`). WebGPU uses `perspectiveZO` (`z 0..1`, clip `0≤z≤w`). Never reuse Raylib projection in WebGPU. Use `pcg-spaces` inline helpers `mul/invert/perspectiveZO` (~40 lines, no gl-matrix).
*   **Rule 5 Lean:** Keep `art.json` <1MB. Do not ship `clip/NDC/screen` or baked matrices. See `clojure-pcg` skill for pure `generate` template and `bb export && bb serve` flow.
