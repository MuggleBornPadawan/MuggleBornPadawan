# Raylib Templates B-C + Performance Options

> Load only when user asks for raylib shader/mesh code.

 (Raymarching / SDF) [Standalone — Not USD]

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

### Option D: High-Density Mesh Buffers (`ByteBuffer` / Native Memory)
* For dynamic meshes or particle arrays with > 10,000 vertices:
  * Do NOT allocate new Clojure sequences inside the 60 FPS drawing loop.
  * Use off-heap direct buffers (`ByteBuffer/allocateDirect` with `ByteOrder/LITTLE_ENDIAN`).
  * Pass buffer pointers directly to Raylib C structs to prevent garbage collection pauses.
  * Keep `art.generate` pure Clojure data. Convert to `ByteBuffer` only at the Raylib render boundary.

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
## References
- Full templates: `references/templates.md` (load only when needed)

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
