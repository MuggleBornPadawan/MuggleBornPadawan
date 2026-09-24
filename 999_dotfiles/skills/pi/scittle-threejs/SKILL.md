---
name: scittle-threejs
description: "Build interactive 3D browser graphics, WebGL scenes, and spatial prototypes in Clojure with zero build tools using Scittle and Three.js. Use when creating browser 3D visualizations, WebGL prototypes, or lightweight 3D web apps without Node.js or shadow-cljs."
---

# Scittle + Three.js Skill (Zero-Build Browser 3D)

Use this skill to build interactive 3D browser visualizations and WebGL scenes in Clojure without `npm`, `node_modules`, or `shadow-cljs`.

---

## 1. Golden Rules (Read Before Writing Code)

* **Never Use Heavy Build Tooling for Prototypes**:
  * Do NOT create `package.json` or run `npm install three`.
  * Do NOT install `shadow-cljs` (saves 2 GiB of RAM).
  * Load Three.js and Scittle directly via CDN in a single HTML file.
* **Always Use `#js` Literals for Three.js Options**:
  * Three.js expects JavaScript objects.
  * Correct: `#js {:color 0x00ffcc :roughness 0.5}`.
  * Incorrect: `{:color 0x00ffcc}` (Clojure persistent map fails silently in Three.js).
* **Always Use Property Interop**:
  * Read property: `(.-x (.-rotation mesh))`.
  * Set property: `(set! (.-x (.-rotation mesh)) 0.05)`.
* **Always Include Window Resize Handling**:
  * Update camera aspect ratio and projection matrix on window resize to prevent image distortion.
* **Always Serve via Local HTTP Server**:
  * Do NOT open `index.html` via `file://` URL (breaks shader compilation and asset loading).
  * Serve with Babashka: `bb serve` (~15 MB RAM).

---

## 2. Minimal Standalone Starter (`index.html`)

Create a single file named `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clojure 3D (Scittle + Three.js)</title>
  <style>
    body { margin: 0; overflow: hidden; background: #0a0a0f; }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>

  <!-- 1. Three.js and OrbitControls from CDN -->
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

  <!-- 2. Scittle (Clojure in the browser) -->
  <script src="https://cdn.jsdelivr.net/npm/scittle@0.6.15/js/scittle.js" type="application/javascript"></script>
</head>
<body>
  <!-- 3. Clojure 3D Logic -->
  <script type="application/x-scittle">
    (ns app.core)

    ;; Setup Scene, Camera, and WebGL Renderer
    (def scene (js/THREE.Scene.))
    (def camera (js/THREE.PerspectiveCamera. 75 (/ js/window.innerWidth js/window.innerHeight) 0.1 1000))
    (def renderer (js/THREE.WebGLRenderer. #js {:antialias true :alpha true}))

    (.setSize renderer js/window.innerWidth js/window.innerHeight)
    (.setPixelRatio renderer js/window.devicePixelRatio)
    (.appendChild js/document.body (.-domElement renderer))

    ;; Enable Mouse Orbit Controls (Drag to rotate, scroll to zoom)
    (def controls (js/THREE.OrbitControls. camera (.-domElement renderer)))
    (set! (.-enableDamping controls) true)
    (set! (.-dampingFactor controls) 0.05)

    ;; Add Lights
    (def ambient-light (js/THREE.AmbientLight. 0x404040 2.0))
    (.add scene ambient-light)

    (def dir-light (js/THREE.DirectionalLight. 0xffffff 2.5))
    (.set (.-position dir-light) 10 20 15)
    (.add scene dir-light)

    ;; Create 3D Mesh (Torus Knot)
    (def geometry (js/THREE.TorusKnotGeometry. 8 2.5 120 16))
    (def material (js/THREE.MeshStandardMaterial.
                   #js {:color 0x00ffcc
                        :metalness 0.85
                        :roughness 0.2}))
    (def mesh (js/THREE.Mesh. geometry material))
    (.add scene mesh)

    (set! (.-z (.-position camera)) 30)

    ;; Handle Window Resize
    (defn on-resize []
      (set! (.-aspect camera) (/ js/window.innerWidth js/window.innerHeight))
      (.updateProjectionMatrix camera)
      (.setSize renderer js/window.innerWidth js/window.innerHeight))

    (.addEventListener js/window "resize" on-resize)

    ;; Main Animation Loop
    (defn animate []
      (js/requestAnimationFrame animate)
      ;; Auto-rotate mesh
      (set! (.-x (.-rotation mesh)) (+ (.-x (.-rotation mesh)) 0.005))
      (set! (.-y (.-rotation mesh)) (+ (.-y (.-rotation mesh)) 0.008))
      ;; Update camera controls
      (.update controls)
      ;; Render frame
      (.render renderer scene camera))

    (animate)
  </script>
</body>
</html>
```

---

## 3. Serving the Project (Babashka Task)

Create a `bb.edn` file in the project folder:

```clojure
{:tasks
 {serve
  {:doc "Serve current directory via lightweight Babashka HTTP server"
   :extra-deps {babashka/http-server {:mvn/version "0.1.13"}}
   :exec-fn babashka.http-server/exec
   :exec-args {:port 8000 :dir "."}}}}
```

Start the server:
```bash
bb serve
```
Open `http://localhost:8000` in your web browser.

---

## 4. Organizing Larger Codebases (`.cljs` Files)

For larger apps, separate Clojure logic into files instead of inline scripts:

```html
<!-- Load an external ClojureScript file via Scittle -->
<script type="application/x-scittle" src="src/app/scene.cljs"></script>
```

---

## 5. Live REPL in the Browser (`scittle.nrepl`)

To connect Emacs CIDER or a live REPL to your running browser 3D scene:

1. Add the Scittle nREPL plugin to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/scittle@0.6.15/js/scittle.nrepl.js"></script>
   ```
2. The browser automatically starts a WebSocket REPL bridge on port 1339.
3. Evaluate code directly to modify colors, geometries, or speeds in the active canvas.

---

## 6. Troubleshooting Checklist

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| Mesh displays solid black | Used Clojure map for material options | Change `{:color 0xff0000}` to `#js {:color 0xff0000}`. |
| Mesh is invisible / black screen | Missing light source | Add an `AmbientLight` or `DirectionalLight` to `scene`. |
| Scene distorts when resizing window | Camera aspect ratio not updated | Call `(set! (.-aspect camera) ...)` and `(.updateProjectionMatrix camera)`. |
| Browser shows CORS error | Opened file directly via `file://` | Run `bb serve` and access via `http://localhost:8000`. |
| OrbitControls throws `not a constructor` | Script load order issue | Load `three.min.js` *before* `OrbitControls.js`. |
