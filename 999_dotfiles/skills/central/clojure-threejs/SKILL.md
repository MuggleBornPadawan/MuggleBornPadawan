---
name: clojure-threejs
triggers: [threejs, scittle, browser 3d, instanced mesh]
anti-triggers: [webgpu usd, quil]
description: >-
  Use when creating browser 3D with Scittle + Three.js WebGL (zero build, no npm) for instanced particle arrays, procedural geometries, or custom shader materials without USD/WebGPU share.
---

# Scittle + Three.js Skill: Browser Procedural 3D Art
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill clojure-threejs
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

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

## 4. Templates B-C + Serving — see `references/templates.md`
> B=Lorenz attractor, C=ShaderMaterial vertex/fragment, Serving=bb.edn http-server, REPL=scittle.nrepl.

## 5. Troubleshooting — see references/templates.md for full table (6 rows)

## 6. OpenUSD — WebGL (this skill) vs WebGPU (pcg-spaces). GL z -1..1 != DirectX z 0..1. Use clojure-webgpu for USD share.

## References
- Full templates: `references/templates.md` (load only when needed)

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
