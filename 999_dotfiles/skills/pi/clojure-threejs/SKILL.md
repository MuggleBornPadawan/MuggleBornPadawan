---
name: clojure-threejs
description: >-
  Use when creating browser 3D with Scittle + Three.js WebGL (zero build, no npm) for instanced particle arrays, procedural geometries, or custom shader materials without USD/WebGPU share.
---

# Scittle + Three.js Skill: Browser Procedural 3D Art

Use this skill to build procedural 3D visual art, WebGL generative algorithms, and mathematical forms in Clojure without `npm`, `node_modules`, or `shadow-cljs`.

---

## 1. Golden Rules for Browser PCG

* **No Build Tools or Bundlers**:
  * Do NOT use `package.json`, `npm`, or `shadow-cljs`.
  * Load Three.js and Scittle directly from CDN in a single `index.html`.
  * Saves gigabytes of memory and starts instantly.
* **Always Use `#js` Literals for Three.js**:
  * Three.js requires native JavaScript objects.
  * Correct: `#js {:color 0x00ffcc :roughness 0.2}`.
  * Incorrect: `{:color 0x00ffcc}` (Clojure maps cause silent failures).
* **Use Property Interop**:
  * Read property: `(.-x (.-position mesh))`.
  * Set property: `(set! (.-x (.-position mesh)) 10.0)`.
* **Use Deterministic PRNG for Procedural Art**:
  * JavaScript `Math.random` does not support seeds.
  * Use a seeded PRNG function (e.g. Mulberry32) in Clojure to make art reproducible.
* **Use `InstancedMesh` for Large Numbers of Objects**:
  * Standard meshes cause performance drops above 500 objects.
  * `THREE.InstancedMesh` renders 20,000+ procedural objects in one single draw call.
* **Serve Over Local HTTP**:
  * Do NOT open `index.html` via `file://` (blocks shader compilation and WebGL textures).
  * Serve with Babashka: `bb serve` (~15 MB RAM).

---

## 2. Seeded PRNG Generator (Mulberry32)

Include this pure Clojure seeded PRNG in your generative code:

```clojure
(defn make-prng
  "Return a seeded 32-bit PRNG function. Produces values between 0.0 and 1.0."
  [seed]
  (let [s (atom (int seed))]
    (fn []
      (swap! s (fn [v] (bit-or (+ v (int 0x6D2B79F5)) 0)))
      (let [t (Math/imul (bit-xor @s (unsigned-bit-shift-right @s 15)) (bit-or @s 1))
            t2 (bit-xor t (+ t (Math/imul (bit-xor t (unsigned-bit-shift-right t 7)) (bit-or t 61))))]
        (/ (double (unsigned-bit-shift-right (bit-xor t2 (unsigned-bit-shift-right t2 14)) 0))
           4294967296.0)))))
```

---

## 3. Template A: High-Density Procedural Field (`InstancedMesh`)

Use this template to generate thousands of procedural objects organized by mathematical fields.

Save as `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Procedural 3D Instanced Field</title>
  <style>
    body { margin: 0; overflow: hidden; background: #08080c; }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/scittle@0.6.15/js/scittle.js" type="application/javascript"></script>
</head>
<body>
  <script type="application/x-scittle">
    (ns pcg.instanced)

    (def count 8000)

    ;; 1. Scene, Camera, Renderer
    (def scene (js/THREE.Scene.))
    (def camera (js/THREE.PerspectiveCamera. 60 (/ js/window.innerWidth js/window.innerHeight) 0.1 1000))
    (set! (.-z (.-position camera)) 80)

    (def renderer (js/THREE.WebGLRenderer. #js {:antialias true}))
    (.setSize renderer js/window.innerWidth js/window.innerHeight)
    (.setPixelRatio renderer js/window.devicePixelRatio)
    (.appendChild js/document.body (.-domElement renderer))

    (def controls (js/THREE.OrbitControls. camera (.-domElement renderer)))
    (set! (.-enableDamping controls) true)

    ;; 2. Lighting
    (def ambient (js/THREE.AmbientLight. 0xffffff 0.6))
    (.add scene ambient)
    (def dir-light (js/THREE.DirectionalLight. 0x00e5ff 1.8))
    (.set (.-position dir-light) 30 50 40)
    (.add scene dir-light)

    ;; 3. Procedural Instanced Mesh
    (def geom (js/THREE.BoxGeometry. 0.8 0.8 0.8))
    (def mat (js/THREE.MeshStandardMaterial. #js {:roughness 0.3 :metalness 0.8}))
    (def inst-mesh (js/THREE.InstancedMesh. geom mat count))

    ;; Dummy transform object for matrix calculation
    (def dummy (js/THREE.Object3D.))
    (def color-helper (js/THREE.Color.))

    (dotimes [i count]
      (let [u (/ (double i) count)
            radius (+ 10.0 (* 30.0 (Math/sqrt u)))
            theta (* u 50.0 Math/PI)
            x (* radius (Math/cos theta))
            z (* radius (Math/sin theta))
            y (* 15.0 (Math/sin (* u 12.0 Math/PI)))]
        ;; Set position and scale
        (.set (.-position dummy) x y z)
        (let [s (+ 0.4 (* 1.2 (Math/sin (* u 20.0))))]
          (.set (.-scale dummy) s s s))
        (.updateMatrix dummy)
        (.setMatrixAt inst-mesh i (.-matrix dummy))

        ;; Set procedural color
        (.setHSL color-helper (+ 0.5 (* 0.4 u)) 0.85 0.55)
        (.setColorAt inst-mesh i color-helper)))

    (set! (.-needsUpdate (.-instanceMatrix inst-mesh)) true)
    (when (.-instanceColor inst-mesh)
      (set! (.-needsUpdate (.-instanceColor inst-mesh)) true))
    (.add scene inst-mesh)

    ;; 4. Resize and Render Loop
    (.addEventListener js/window "resize"
      (fn []
        (set! (.-aspect camera) (/ js/window.innerWidth js/window.innerHeight))
        (.updateProjectionMatrix camera)
        (.setSize renderer js/window.innerWidth js/window.innerHeight)))

    (defn animate []
      (js/requestAnimationFrame animate)
      (set! (.-y (.-rotation inst-mesh)) (+ (.-y (.-rotation inst-mesh)) 0.002))
      (.update controls)
      (.render renderer scene camera))

    (animate)
  </script>
</body>
</html>
```

---

## 4. Template B: Custom Procedural Geometry (Strange Attractor)

Generate dynamic mathematical curves using `THREE.BufferGeometry` and `Float32Array`:

```clojure
(ns pcg.attractor)

(defn generate-lorenz-points
  "Generate vertices for a Lorenz strange attractor."
  [steps dt {:keys [sigma rho beta]}]
  (loop [i 0
         x 0.1 y 0.0 z 0.0
         coords []]
    (if (>= i steps)
      coords
      (let [dx (* sigma (- y x))
            dy (- (* x (- rho z)) y)
            dz (- (* x y) (* beta z))
            nx (+ x (* dx dt))
            ny (+ y (* dy dt))
            nz (+ z (* dz dt))]
        (recur (inc i) nx ny nz (conj coords nx ny nz))))))

(defn create-attractor-line []
  (let [pts (generate-lorenz-points 5000 0.008 {:sigma 10.0 :rho 28.0 :beta (/ 8.0 3.0)})
        flat-arr (js/Float32Array. (into-array Float pts))
        geom (js/THREE.BufferGeometry.)
        attr (js/THREE.BufferAttribute. flat-arr 3)]
    (.setAttribute geom "position" attr)
    (let [mat (js/THREE.LineBasicMaterial. #js {:color 0xff3366 :linewidth 1.5})]
      (js/THREE.Line. geom mat))))
```

---

## 5. Template C: Procedural Noise ShaderMaterial

Deform geometry procedurally on the GPU with custom vertex and fragment shaders:

```clojure
(ns pcg.shader)

(def vertex-shader
  "uniform float uTime;
   varying vec2 vUv;
   varying float vElevation;

   void main() {
     vUv = uv;
     vec3 pos = position;
     float elevation = sin(pos.x * 2.0 + uTime) * cos(pos.z * 2.0 + uTime) * 0.5;
     pos.y += elevation;
     vElevation = elevation;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
   }")

(def fragment-shader
  "uniform float uTime;
   varying vec2 vUv;
   varying float vElevation;

   void main() {
     vec3 colorA = vec3(0.05, 0.2, 0.5);
     vec3 colorB = vec3(0.9, 0.4, 0.1);
     vec3 finalColor = mix(colorA, colorB, vElevation + 0.5);
     gl_FragColor = vec4(finalColor, 1.0);
   }")

(defn create-shader-mesh []
  (let [geom (js/THREE.PlaneGeometry. 20 20 64 64)
        uniforms #js {:uTime #js {:value 0.0}}
        mat (js/THREE.ShaderMaterial.
             #js {:vertexShader vertex-shader
                  :fragmentShader fragment-shader
                  :uniforms uniforms
                  :wireframe false})]
    {:mesh (js/THREE.Mesh. geom mat)
     :uniforms uniforms}))
```

---

## 6. Serving the Project (Babashka Task)

Create `bb.edn` in your project folder:

```clojure
{:tasks
 {serve
  {:doc "Serve directory with Babashka HTTP server"
   :extra-deps {babashka/http-server {:mvn/version "0.1.13"}}
   :exec-fn babashka.http-server/exec
   :exec-args {:port 8000 :dir "."}}}}
```

Start the server:
```bash
bb serve
```
Open `http://localhost:8000` in the browser.

---

## 7. Live REPL in the Browser (`scittle.nrepl`)

To connect Emacs CIDER or a live REPL to your running browser scene:

1. Add the Scittle nREPL script to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/scittle@0.6.15/js/scittle.nrepl.js"></script>
   ```
2. The browser opens a WebSocket REPL bridge on port 1339.
3. Connect your editor to inspect and modify procedural parameters live.

---

## 8. Troubleshooting Checklist

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| Mesh displays solid black | Clojure map used instead of `#js` | Change `{:color 0xff0000}` to `#js {:color 0xff0000}`. |
| Instanced mesh does not appear | Forgot update flag | Set `(set! (.-needsUpdate (.-instanceMatrix mesh)) true)`. |
| Browser framerate drops below 15 FPS | Allocated too many individual Mesh objects | Switch from individual `THREE.Mesh` to `THREE.InstancedMesh`. |
| Scene distorts when resizing window | Camera aspect ratio not updated | Update `(.-aspect camera)` and call `(.updateProjectionMatrix camera)`. |
| Browser shows CORS error | Opened file directly via `file://` | Start `bb serve` and load via `http://localhost:8000`. |
| Shaders fail to compile | Syntax error in GLSL strings | Check browser developer console (F12) for detailed GLSL compiler logs. |

---

## 9. OpenUSD / `pcg-spaces` Compatibility — WebGL vs WebGPU

> **Scope:** This skill is **WebGL** (`THREE.WebGLRenderer`, `three@0.128.0`, GL NDC `z -1..1`). `pcg-spaces` is **WebGPU/WGSL** (DirectX NDC `z 0..1`). They are not interchangeable. Choose one per project.

**When you need USD-correct sharing, prefer `clojure-webgpu` + `pcg-spaces` + `clojure-pcg` Render C.** Use this Three.js skill for quick WebGL previews only. Do not mix `THREE.Object3D` hierarchy with USD `xformOpOrder`.

*   **Rule 1-2 Model/World = USD:** Three.js `scene.add()` + `Object3D.matrix` is NOT USD `GetLocalTransformation()` → `ComputeLocalToWorldTransform()`. USD requires least-to-most-local `xformOpOrder` (last = applied first, `M=T*R` if `[translate,rotate]`), `!resetXformStack!`, and `upAxis`/`metersPerUnit` at root. Store `xformOpOrder`/`xformOps` in `art.json` via `clojure-pcg`, compute `fromXformOps(order,ops)` walking reverse in JS (~40 lines, no gl-matrix). Do not bake world.
*   **Rule 3 USD ends after world:** Three.js `PerspectiveCamera.projectionMatrix` is GL `-1..1`. If you must reuse Three.js for USD data, replace its projection with `perspectiveZO` and set `depthClearValue` `0..1`. Browser must compute `view=inverse(cameraWorld)` from `UsdGeomCamera` Xformable world, not `camera.matrixWorldInverse`.
*   **Rule 4 WebGPU = DirectX:** NDC `z 0..1` (not `-1..1`), clip `0≤z≤w`, framebuffer `(0,0)` top-left y-down, texture `uv (0,0)` top-left. Flip `v=1-v` for `primvars:st`. Three.js `uv` is GL bottom-left — flip on export/import. Use `perspectiveZO` with `far*nf / far*near*nf`.
*   **Rule 5 Lean:** For USD/WebGPU do NOT use this skill's `THREE.InstancedMesh`/`OrbitControls` path. Use `clojure-webgpu` Template D: single-file WGSL + JS inline math, reads `art.json` `{stage,prims:[{xformOpOrder,xformOps,points}]}` via `bb http-server` (no npm, no gl-matrix, no USD parser). See `clojure-webgpu` + `pcg-spaces` for full pipeline `bb generate → art.json → WebGPU`.
*   **Decision:** Need USD share / long-term asset? → `pcg-spaces` WebGPU. Need quick WebGL demo only? → this skill.
