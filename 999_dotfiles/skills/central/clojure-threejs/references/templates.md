# Three.js Templates B-C + Serving

> Load only when user asks for lorenz/shaderMaterial/bb serve code.

## 4. Template B: Custom Procedural Geometry
 (Strange Attractor)

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
## References
- Full templates: `references/templates.md` (load only when needed)

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
