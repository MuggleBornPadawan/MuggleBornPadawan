# Visual Art Processing Stack

> [!NOTE]
> This document maps the full stack from pixel-level GPU hardware up through creative coding frameworks — covering both native desktop (Quil/Processing/JVM) and browser-based (Canvas 2D / WebGL / WebGPU / p5.js / on-chain) generative art pipelines.

---

## The Stack at a Glance

### End-to-End Visual Art Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 8: Ingestion & Control (MIDI / OSC / Audio FFT / CV)  │  ← live triggers & inputs
├─────────────────────────────────────────────────────────────┤
│ Layer 10: Curation & Seed Determinism (PRNG / GUI Knobs)    │  ← parameter exploration
├─────────────────────────────────────────────────────────────┤
│ Layer 3: Creative Framework (Quil / Three.js / p5.js / R3F) │  ← artist-facing authoring
├─────────────────────────────────────────────────────────────┤
│ Layer 7: Compute & Simulation (WebGPU WGSL / SSBOs / Fluid) │  ← GPU-driven simulations
├─────────────────────────────────────────────────────────────┤
│ Layer 4: Host Engine / Sketch Loop (PApplet / requestAnim)  │  ← lifecycle & frame clock
├─────────────────────────────────────────────────────────────┤
│ Layer 2: Graphics API (Vulkan / WebGPU / OpenGL / Metal)    │  ← API abstraction bridge
├─────────────────────────────────────────────────────────────┤
│ Layer 1: Hardware GPU & Rasterizer / Ray Tracing Cores      │  ← geometry → pixels
├─────────────────────────────────────────────────────────────┤
│ Layer 5: Color Pipeline & Transforms (ACES / sRGB / LUT)    │  ← color consistency
├─────────────────────────────────────────────────────────────┤
│ Layer 6: Post-Processing & Screen Buffers (Bloom / AA / DoF)│  ← final-frame polish
├─────────────────────────────────────────────────────────────┤
│ Layer 9: Physical Output & Export (Plotter / Print / Video) │  ← G-code / SVG / 300 DPI
└─────────────────────────────────────────────────────────────┘
```

### Native / Desktop Path (JVM, C++, Rust)

```
┌────────────────────────────────────────────────────┐
│  Creative Framework  (Quil / OPENRNDR / Nannou)    │  ← artist-facing API
├────────────────────────────────────────────────────┤
│  Engine / Sketch Loop  (defsketch, fun-mode)        │  ← setup → update → draw
├────────────────────────────────────────────────────┤
│  Graphics API  (Java2D / OpenGL / Vulkan / Metal)   │  ← CPU→GPU bridge
├────────────────────────────────────────────────────┤
│  Rasterization / Ray-Tracing Pipeline  (GPU)        │  ← geometry → pixels
├────────────────────────────────────────────────────┤
│  Post-Processing / Color Pipeline                   │  ← tone mapping, AA
├────────────────────────────────────────────────────┤
│  OS Window Manager / Swap-Chain                     │  ← pixels on screen
└────────────────────────────────────────────────────┘
```

### Browser / Web Path (JS, WASM)

```
┌──────────────────────────────────────────────────────────┐
│  Creative Framework  (p5.js / Three.js / vanilla JS)     │  ← artist-facing API
├──────────────────────────────────────────────────────────┤
│  Browser Rendering API  (Canvas 2D / WebGL / WebGPU)     │  ← JS→GPU bridge
├──────────────────────────────────────────────────────────┤
│  GLSL / WGSL Shader Pipeline (vertex, frag, compute)     │  ← GPU programs
├──────────────────────────────────────────────────────────┤
│  GPU Rasterization / Compositing                          │  ← geometry → pixels
├──────────────────────────────────────────────────────────┤
│  Browser Compositor  (Skia / Chromium / WebKit)           │  ← DOM overlay, UI
├──────────────────────────────────────────────────────────┤
│  Display / Monitor                                        │  ← pixels on screen
└──────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Hardware & GPU

The GPU is a massively parallel processor built for one job: transform geometry into pixels fast.

### Rendering Paradigms

| Paradigm          | Mechanism                                                                     | Strength                                            | Weakness                                                                 |
|-------------------|-------------------------------------------------------------------------------|-----------------------------------------------------|--------------------------------------------------------------------------|
| **Rasterization** | Projects 3D triangles onto 2D screen space; fragment shaders color each pixel | Billions of triangles/sec; real-time capable        | Lighting is approximated (shadow maps, SSAO hacks)                       |
| **Ray Tracing**   | Simulates physical light rays bouncing through the scene                      | Accurate global illumination, reflections, caustics | 30–50% frame-rate cost without hardware RT cores (NVIDIA RTX, AMD RDNA3) |
| **Hybrid**        | Rasterize geometry; ray trace only shadows/reflections                        | Best of both for real-time                          | Complex pipeline management                                              |
| **Path Tracing**  | Brute-force multi-bounce light simulation                                     | Film-quality realism                                | Offline or heavily AI-denoised                                           |

Modern pipelines (Unreal 5 Lumen, Blender Cycles) use **hybrid rasterization + hardware ray tracing + AI upscaling** (DLSS, FSR, XeSS).

### Rendering Pipeline Stages

```
Vertices → Vertex Shader → Tessellation (optional)
         → Geometry Shader (optional)
         → Clipping / Primitive Assembly
         → Rasterization → Fragment Shader
         → Depth / Alpha Tests → Blending
         → Framebuffer → Post-processing → Display
```

---

## Layer 2 — Graphics APIs

The API layer translates your code into GPU machine instructions.

| API        | Model                               | Best For                         | Overhead                             |
|------------|-------------------------------------|----------------------------------|--------------------------------------|
| **OpenGL** | Global state machine (1990s design) | Legacy desktop; learning         | High — driver guesses intent         |
| **Vulkan** | Explicit, low-level                 | High-perf native apps, AAA games | Minimal — developer owns memory/sync |
| **Metal**  | Explicit (Apple only)               | macOS/iOS apps                   | Low                                  |
| **WebGPU** | Modern; maps to Vulkan/Metal/DX12   | Browser + cross-platform apps    | Low                                  |
| **Java2D** | Software renderer                   | Simple 2D; Quil default renderer | Medium                               |

> [!TIP]
> Quil defaults to Java2D but can switch to OpenGL/P3D via `:renderer :p3d` for 3D and GPU-accelerated 2D.

---

## Layer 3 — Creative Framework Stack

The creative coding ecosystem, ordered from highest-level to lowest:

### By Language

| Language       | Framework                    | Sweet Spot                                                |
|----------------|------------------------------|-----------------------------------------------------------|
| **Clojure**    | Quil                         | Functional generative art, REPL-driven live coding        |
| **Kotlin**     | OPENRNDR                     | High-perf 2D/3D; production generative design             |
| **Rust**       | Nannou                       | Audio-reactive; memory-safe near-metal speed (via `wgpu`) |
| **Java**       | Processing                   | Offline desktop sketches; massive library ecosystem       |
| **JavaScript** | p5.js                        | Web / browser; instant sharing; interactive art           |
| **JavaScript** | Three.js / React Three Fiber | 3D web art; WebGL abstraction                             |
| **C++**        | openFrameworks / Cinder      | Installations; projection mapping; CV; hardware I/O       |
| **GLSL**       | Shadertoy                    | Fragment-shader-only raymarching; procedural textures     |
| **Node-based** | TouchDesigner / vvvv         | Real-time AV performance; live VJ tools                   |

---

## Layer 3b — Browser-Based Generative Art (Deep Dive)

The browser is a complete creative runtime — not a second-class citizen. Modern browser generative art has its own full stack.

### Browser Rendering Surface Options

Three distinct drawing surfaces, each with a different model:

| Surface           | Mode                       | Rendered by                            | Best for                                                   |
|-------------------|----------------------------|----------------------------------------|------------------------------------------------------------|
| **Canvas 2D API** | Immediate (pixel buffer)   | CPU (software) or GPU composited       | Dense particles, flow fields, pixel manipulation           |
| **WebGL 1/2**     | Immediate (GPU draw calls) | GPU via OpenGL ES                      | GLSL shaders, 3D art, Shadertoy-style                      |
| **WebGPU**        | Explicit (command buffers) | GPU via Vulkan/Metal/DX12 backend      | Compute shaders, next-gen real-time web art                |
| **SVG**           | Retained (DOM nodes)       | Browser layout engine                  | Plotter-style vector art, geometric patterns, print export |
| **CSS / Houdini** | Layout/composite           | Browser compositor + Houdini Paint API | Lightweight procedural backgrounds, animated patterns      |

#### Choosing a surface

```
Need vectors / plotter export?         → SVG
Dense animation (10k+ elements)?       → Canvas 2D
GPU-driven shaders / full-screen quad? → WebGL
Compute shaders / next-gen perf?       → WebGPU
Layout-driven / zero canvas overhead?  → CSS Custom Properties
```

---

### Canvas 2D API

The `CanvasRenderingContext2D` is the simplest immediate-mode surface. The browser paints pixels and forgets — no retained scene graph.

```javascript
const ctx = canvas.getContext('2d');

function draw(t) {
  ctx.clearRect(0, 0, W, H);         // wipe frame
  ctx.fillStyle = `hsl(${t % 360}, 70%, 50%)`;
  ctx.beginPath();
  ctx.arc(W/2, H/2, 100 + Math.sin(t * 0.01) * 50, 0, Math.PI * 2);
  ctx.fill();
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
```

**Key primitives:** `arc`, `lineTo`, `bezierCurveTo`, `fillRect`, `drawImage`, `getImageData` / `putImageData` (direct pixel array access).

> [!TIP]
> `getImageData` + `putImageData` lets you manipulate raw RGBA byte arrays — essential for reaction-diffusion simulations and per-pixel procedural generation.

---

### WebGL / GLSL Shader Pipeline

WebGL exposes the GPU's shader pipeline directly. The core pattern for generative art is a **fullscreen quad** — a rectangle covering the entire canvas — with all the generative logic inside the **fragment shader**.

#### Data flow

```
JavaScript (CPU)
  │
  ├── Attributes  → per-vertex data  (position array: 4 corners of the quad)
  ├── Uniforms    → global constants (u_time, u_resolution, u_mouse, seed)
  │
  ▼
Vertex Shader (runs once per vertex)
  └── outputs gl_Position in clip space
        ▼
  Rasterization  (GPU figures out which pixels are inside the quad)
        ▼
Fragment Shader (runs once per pixel — massively parallel)
  └── reads uniforms + varyings
  └── computes procedural noise, SDFs, math
  └── outputs gl_FragColor (RGBA)
        ▼
  Framebuffer → browser compositor → display
```

#### Shader variable types

| Qualifier   | Scope                           | Per-frame cost              | Generative use                                     |
|-------------|---------------------------------|-----------------------------|----------------------------------------------------|
| `attribute` | Per-vertex                      | Uploaded once (quad coords) | Vertex positions                                   |
| `uniform`   | Whole draw call                 | JS → GPU each frame         | `u_time`, `u_resolution`, color palette, seed hash |
| `varying`   | Vertex → fragment, interpolated | Auto                        | Pass UV/screen coords from vertex to fragment      |

#### Minimal fullscreen-quad sketch (GLSL)

**Vertex shader:**
```glsl
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
```

**Fragment shader:**
```glsl
precision highp float;
uniform vec2  u_resolution;
uniform float u_time;

// Simplex / FBM noise would go here...

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;    // 0..1 normalized
    vec2 st = uv * 2.0 - 1.0;                   // -1..1 centered
    st.x *= u_resolution.x / u_resolution.y;    // aspect-correct

    float d = length(st);
    float c = abs(sin(d * 10.0 - u_time));

    gl_FragColor = vec4(vec3(c), 1.0);
}
```

#### Advanced fragment shader techniques

| Technique                            | What it does                                                                                           |
|--------------------------------------|--------------------------------------------------------------------------------------------------------|
| **FBM (Fractional Brownian Motion)** | Layered octave noise for organic clouds/terrain                                                        |
| **SDF (Signed Distance Fields)**     | Math-only shapes: circles, boxes, polygons — no geometry                                               |
| **Raymarching**                      | Renders complex 3D worlds with zero polygon meshes; entire scene is a GLSL distance function           |
| **Domain warping**                   | Distort the input coordinates of a noise function with another noise function — Inigo Quilez technique |
| **Feedback / ping-pong buffers**     | Write output to a texture, read it next frame → reaction-diffusion, cellular automata                  |

---

### p5.js Architecture

p5.js wraps either Canvas 2D or WebGL depending on renderer mode:

```javascript
createCanvas(800, 600);         // → Canvas 2D (p5.Renderer2D)
createCanvas(800, 600, WEBGL);  // → WebGL   (p5.RendererGL)
createCanvas(800, 600, WEBGPU); // → WebGPU  (p5 2.x, experimental)
```

#### Under the hood (WEBGL mode)

The `p5.RendererGL` class:
1. Tessellates p5 vector shapes into triangles (via `libtess`)
2. Manages VBOs (Vertex Buffer Objects) on the GPU
3. Compiles and links GLSL shader programs for fill, stroke, lighting, texture
4. Supplies standard uniforms: `uModelViewMatrix`, `uProjectionMatrix`, `uNormalMatrix`

**Geometry modes:**
- **Immediate mode** — shapes recalculated + re-uploaded to GPU every frame (`sphere()` inside `draw()`)
- **Retained mode** — pre-bake once with `buildGeometry()`, reuse via `model()` — bypasses CPU recalc each frame

#### Coordinate system differences

| Mode              | Origin           | Y direction                        | Z axis          |
|-------------------|------------------|------------------------------------|-----------------|
| Canvas 2D / `P2D` | Top-left `(0,0)` | Increases downward                 | None            |
| `WEBGL`           | Center `(0,0,0)` | Increases upward (math convention) | Z toward viewer |

#### Loading custom shaders

```javascript
let sh;
function preload() {
    sh = loadShader('vert.glsl', 'frag.glsl');
}
function draw() {
    shader(sh);
    sh.setUniform('u_time', millis() / 1000.0);
    sh.setUniform('u_resolution', [width, height]);
    rect(0, 0, width, height);  // fullscreen quad
}
```

---

### On-Chain Generative Art (Art Blocks Architecture)

Art Blocks pushed browser generative art into a new paradigm: the code and the token are **the same object**, permanently on-chain.

#### How it works

```
Artist writes JS script (p5.js / Three.js / vanilla)
    ↓ stored immutably in Ethereum smart contract
Collector mints → blockchain produces 32-byte hash
    ↓
tokenData = { hash: "0xabc123...", tokenId: "42000001" }
    ↓ injected as a global into browser environment
Art Blocks Generator assembles HTML on the fly:
  1. Import map / dependency registry (on-chain p5.js version)
  2. <script> tokenData injection
  3. <script> artist's project code
    ↓
Browser executes JS → canvas renders deterministically
    ↓
Same hash → same pixels, forever, on any device
```

#### Determinism rule

```javascript
// ❌ NOT ALLOWED — non-deterministic
let x = Math.random();
let t = Date.now();

// ✅ REQUIRED — seed everything from tokenData.hash
function mulberry32(seed) { /* deterministic PRNG */ }
let rand = mulberry32(parseInt(tokenData.hash.slice(0, 10), 16));
```

The immutable hash + immutable code = the artwork is **the algorithm**, not the render. Any browser can reproduce it independently by pulling the smart contract.

#### On-chain dependency registry

Art Blocks maintains an on-chain registry of approved libraries (specific versions of p5.js, Three.js, etc.) so no external CDN is required. The browser resolves:

```
Ethereum → script bytecode → decompress → eval in iframe sandbox
```

---

### SVG Generative Art

SVG is a **retained-mode DOM** — every shape is a live node. Preferred when:
- Output must be print-quality / resolution-independent
- Plotter-compatible (SVG exports directly to pen plotter G-code)
- Individual shape interactivity (click, hover on generated elements) is needed

**Performance ceiling:** ~1,000–5,000 DOM nodes before layout thrashing degrades frame rate. Work around with a single complex `<path d="M...">` string instead of thousands of `<circle>` nodes.

```javascript
// Efficient: one path node, thousands of bezier segments
const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', buildFlowFieldPath(seed));
svg.appendChild(path);
```

---

### 3D Generative Art in the Browser

#### Framework landscape

| Framework                     | Language | 3D API                 | Sweet Spot                                         |
|-------------------------------|----------|------------------------|----------------------------------------------------|
| **Three.js**                  | JS       | WebGL 2 / WebGPU       | General-purpose 3D art; largest ecosystem          |
| **React Three Fiber (R3F)**   | JSX/TS   | WebGL 2 / WebGPU       | Declarative 3D; pairs with React UI                |
| **Babylon.js**                | JS/TS    | WebGL 2 + WebGPU-first | Game-grade engine; best Gaussian Splatting support |
| **p5.js WEBGL mode**          | JS       | WebGL 1/2              | Low-friction 3D for Processing-familiar artists    |
| **Nannou** (compiled to WASM) | Rust     | wgpu → WebGPU          | High-perf, memory-safe; niche but powerful         |
| **Shadertoy / GLSL**          | GLSL     | WebGL                  | Full-screen raymarched 3D; zero mesh geometry      |

---

#### Three.js Architecture

Three.js organizes a 3D world into a **scene graph** — a hierarchical tree of `Object3D` nodes.

```
THREE.Scene
  ├── THREE.PerspectiveCamera
  ├── THREE.DirectionalLight
  ├── THREE.Group  (parent transform cascades to all children)
  │     ├── THREE.Mesh (BufferGeometry + Material)
  │     └── THREE.Mesh
  └── THREE.InstancedMesh  (thousands of copies, 1 draw call)
```

**Render loop:**

```javascript
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, W/H, 0.1, 1000);

function animate(t) {
    requestAnimationFrame(animate);
    // mutate scene graph — noise, uniforms, matrix updates
    renderer.render(scene, camera);
}
animate();
```

**Post-processing** via `EffectComposer`: stack passes over the rendered frame — Bloom, DOF, film grain, glitch, chromatic aberration.

---

#### Procedural Geometry — Key Techniques

| Technique                     | Mechanism                                                                           | Use in generative art                                                  |
|-------------------------------|-------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| **Vertex displacement (CPU)** | Iterate `BufferGeometry.attributes.position`, apply noise, set `needsUpdate = true` | Organic terrain, pulsating blobs (low-to-mid poly)                     |
| **Vertex displacement (GPU)** | Custom vertex shader; pass `uTime` uniform; compute displacement in GLSL            | Millions of vertices deforming at 60fps                                |
| **Instanced mesh**            | `THREE.InstancedMesh(geo, mat, count)` + per-instance matrix                        | Particle fields, forest, swarm art — single draw call                  |
| **Custom BufferGeometry**     | Build `position` / `normal` / `uv` `Float32Array`s by hand                          | Mathematical surfaces: torus knots, sphere harmonics, Lissajous meshes |
| **Noise-driven color**        | Fragment shader reads vertex `uv` or world position → HSL gradient                  | Height-aware palette, iridescent PBR                                   |
| **Curl noise particles**      | Divergence-free noise drives particle velocity → no clustering                      | Fluid trails, ribbon geometry, organic tendrils                        |
| **Ping-pong FBO**             | Render to texture A, sample A in next frame, write to texture B; swap               | Reaction-diffusion on GPU, flocking simulation                         |

**Noise in 3D:** pass `(x, y, z, t)` to 4D Simplex noise → smooth animated volumes.

```javascript
import { createNoise3D } from 'simplex-noise';
const noise3D = createNoise3D();

// In animation loop — displace vertices along normals
for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const d = noise3D(x * 0.3, y * 0.3, t * 0.5) * 0.8;
    pos.setXYZ(i, x + nx*d, y + ny*d, z + nz*d);  // nx/ny/nz from normal attr
}
pos.needsUpdate = true;
geo.computeVertexNormals();
```

---

#### React Three Fiber (R3F)

R3F swaps Three.js's imperative API for a **React reconciler** that maps JSX → Three.js object instances.

```jsx
// Every JSX tag = THREE.Constructor()
// Props = properties or constructor args

<mesh ref={meshRef}>
    <icosahedronGeometry args={[2, 6]} />         // detail=6 subdivisions
    <meshStandardMaterial color="#4f46e5" wireframe />
</mesh>
```

**Key hooks:**

| Hook                            | Purpose                                                                  |
|---------------------------------|--------------------------------------------------------------------------|
| `useFrame((state, Δt) => ...)`  | Per-frame callback — mutate refs without triggering React reconciliation |
| `useThree()`                    | Access `scene`, `camera`, `gl` (renderer), `size`                        |
| `useLoader(TextureLoader, url)` | Suspense-compatible asset loading                                        |
| `useMemo(fn, deps)`             | Cache expensive `BufferGeometry` construction                            |

**Drei helpers** (`@react-three/drei`): `<OrbitControls>`, `<Environment preset="sunset">`, `<Text>`, `<Float>`, `<MeshReflectorMaterial>`, `<Sparkles>`, `<GradientTexture>` — ready-made generative components.

**Post-processing** via `@react-three/postprocessing`:

```jsx
<EffectComposer>
    <Bloom luminanceThreshold={0.3} intensity={1.5} />
    <ChromaticAberration offset={[0.002, 0.002]} />
    <Noise opacity={0.04} />
</EffectComposer>
```

---

#### Raymarching — 3D Without Meshes

The most extreme form of browser 3D generative art: the **entire scene is a math function**. No geometry, no vertex buffers — a fullscreen quad + fragment shader.

```glsl
// Signed Distance Function for a sphere
float sdSphere(vec3 p, float r) { return length(p) - r; }

// Scene SDF — combine primitives with min() (union)
float scene(vec3 p) {
    return min(sdSphere(p, 1.0), p.y + 1.5);  // sphere + floor plane
}

// March a ray from camera origin ro in direction rd
float raymarch(vec3 ro, vec3 rd) {
    float t = 0.0;
    for (int i = 0; i < 100; i++) {
        float d = scene(ro + rd * t);
        if (d < 0.001) return t;   // hit
        t += d;                     // step forward by SDF distance
        if (t > 100.0) break;       // miss
    }
    return -1.0;
}
```

**What you can raytrace in a fragment shader:** fractals (Mandelbulb, Menger sponge), infinite tiled rooms, organic metaballs, twisted tori, any SDF primitive — all at 60fps on modern GPUs.

Canonical resource: [iquilezles.org](https://iquilezles.org) — Inigo Quilez's SDF library.

---

#### 3D in Processing / Quil (P3D Renderer)

For the native JVM stack, 3D is unlocked via the `:p3d` renderer:

```clojure
;; Quil 3D sketch
(q/defsketch my-3d
  :size     [800 800]
  :renderer :p3d          ; ← OpenGL via JOGL
  :setup    setup
  :draw     draw-state
  :middleware [m/fun-mode])
```

**Camera:**

```clojure
;; Orbiting camera — sin/cos parametric
(let [cam-x (+ (/ (q/width) 2) (* (Math/sin (* t 0.02)) 400))
      cam-z (* (Math/cos (* t 0.02)) 400)]
  (q/camera cam-x (/ (q/height) 2) cam-z  ; eye
            (/ (q/width) 2) (/ (q/height) 2) 0  ; target
            0 1 0))                              ; up
```

**Lighting:**

| Function | Type |
|---|---|
| `(q/ambient-light r g b)` | Flat fill — no direction |
| `(q/directional-light r g b nx ny nz)` | Sun-like, infinite distance |
| `(q/point-light r g b x y z)` | Positional; falloff with distance |
| `(q/spot-light r g b x y z nx ny nz angle conc)` | Cone spotlight |

**Custom mesh (vertex-by-vertex):**

```clojure
;; Procedural grid surface
(q/begin-shape :triangles)
(doseq [x (range cols) z (range rows)]
  (let [y (* (q/noise (* x 0.05) (* z 0.05) t) 100)]
    (q/vertex (* x step) y (* z step))))
(q/end-shape)
```

Projection modes:
- `(q/perspective fov aspect near far)` — default; depth cues
- `(q/ortho)` — no perspective foreshortening; favored for geometric/architectural generative work

---

#### Neural / Volumetric 3D (Emerging)

| Format                           | What it is                                             | Browser support                                              |
|----------------------------------|--------------------------------------------------------|--------------------------------------------------------------|
| **NeRF** (Neural Radiance Field) | Volume reconstructed from photos via neural network    | Babylon.js, Three.js — requires pre-baking to mesh or splats |
| **3D Gaussian Splatting (3DGS)** | Scene represented as millions of oriented 3D Gaussians | Babylon.js WebGPU compute shaders — 120fps at 4.5M splats    |
| **Text-to-3D / Image-to-3D**     | AI pipelines outputting `.glb` / splat assets          | Drop into any Three.js / Babylon.js scene via `GLTFLoader`   |

Gaussian Splatting in Babylon.js uses **WebGPU compute shaders** to sort and accumulate splats — the first 3D format where WebGPU's compute model is mandatory, not just faster.

---

### Browser vs Native — Side-by-Side

| Dimension              | Browser (p5.js / Three.js / WebGL)       | Native (Quil / Processing / openFrameworks)       |
|------------------------|------------------------------------------|---------------------------------------------------|
| **Distribution**       | URL — instant, shareable                 | Jar / binary — install required                   |
| **GPU access**         | WebGL (OpenGL ES subset) or WebGPU       | Full OpenGL / Vulkan via JOGL / platform SDK      |
| **3D scene graph**     | Three.js / R3F / Babylon.js              | Processing P3D / OPENRNDR / openFrameworks        |
| **Custom 3D shaders**  | GLSL via `ShaderMaterial` / `loadShader` | GLSL via JOGL; full Vulkan via Nannou             |
| **Instanced 3D**       | `THREE.InstancedMesh`                    | `PShape` instancing / VBO via JOGL                |
| **On-chain archival**  | ✅ Art Blocks pattern                    | ❌ Not applicable                                 |
| **REPL / live coding** | Hot-reload via browser dev tools         | Hot-swap via nREPL (superior for Clojure)         |
| **Export**             | `canvas.toDataURL()` / `saveCanvas()`    | `q/save` → PNG; SVG/PDF renderers                 |
| **Plotter output**     | SVG export (D3, paper.js)                | Processing PDF/SVG renderer                       |
| **Gaussian Splatting** | Babylon.js WebGPU (120fps/4.5M splats)   | Native tools (Luma AI, Gaussian Splatting viewer) |
| **State management**   | Manual or React/signals                  | Quil fun-mode — pure functional                   |

---

## Layer 4 — Quil / Processing Architecture (Deep Dive)

This is the layer used in the `invisible-brush` project.

### Processing as the Host

Quil wraps **Processing's `PApplet`** (Java). The rendering backend is chosen at sketch definition:

```
defsketch :renderer keyword
  :java2d  → Java2D software renderer (default, 2D only)
  :p2d     → OpenGL-accelerated 2D
  :p3d     → OpenGL-accelerated 3D (P3D renderer)
  :pdf     → Vector export to PDF
  :svg     → Vector export to SVG
```

### The Sketch Lifecycle

```
JVM start
  └─ setup []           ; once — sets frame-rate, color-mode, returns initial state
       ↓
  ┌─ update-state [s]   ; per-frame (fun-mode) — pure fn: state → next-state
  │    ↓
  └─ draw-state   [s]   ; per-frame — imperative draw calls; side effects on canvas
       ↓
  frame-rate timer → repeat
```

The `fun-mode` middleware enforces this pure functional pipeline — state never leaks between frames implicitly.

### Coordinate System

```
(0,0) ───── x+  →
  │
  y+          screen-space: origin top-left
  ↓           y increases downward (inverted vs math convention)
```

Transforms stack on a matrix:
- `push-matrix` / `pop-matrix` — save/restore coordinate frame
- `translate [x y]`, `rotate [angle]`, `scale [sx sy]` — standard affine transforms

### Color Model

Quil supports two color modes, set once in `setup`:

```clojure
(q/color-mode :rgb 255)        ; R G B each 0–255 (default)
(q/color-mode :hsb 360 100 100); H 0–360°, S 0–100, B 0–100
```

**HSB is preferred for generative art** — color harmony (hue cycling, saturation fade) is arithmetic, not RGB juggling.

```clojure
;; Gradient: cycle hue across x positions
(q/color-mode :hsb 360 100 100)
(q/fill (* (/ x width) 360) 80 90)
```

### Noise Functions

`q/noise` calls Processing's **Perlin noise** — a coherent gradient noise function:

| Call | Returns |
|---|---|
| `(q/noise x)` | 1D smooth value in `[0, 1]` |
| `(q/noise x t)` | 2D — space × time for animated terrain |
| `(q/noise x y z)` | 3D — volumetric or animated 2D |

**Fractal / octave noise** = sum of `noise(x·freq, t·freq) / freq` over multiple frequencies. Adds fine detail without destroying large-scale shape.

```clojure
;; invisible-brush fractal-noise pattern
(reduce (fn [acc [freq amp]]
          (+ acc (* amp (q/noise (* x freq) (* t freq)))))
        0
        (map (fn [i] [(* 0.008 (Math/pow 2 i))
                      (/ 1.0 (Math/pow 2 i))])
             (range octaves)))
```

### Key Drawing Primitives

| Primitive    | Function                                               |
|--------------|--------------------------------------------------------|
| Rectangle    | `(q/rect x y w h)`                                     |
| Ellipse      | `(q/ellipse cx cy rx ry)`                              |
| Line         | `(q/line x1 y1 x2 y2)`                                 |
| Bezier       | `(q/bezier x1 y1 cx1 cy1 cx2 cy2 x2 y2)`               |
| Vertex path  | `(q/begin-shape)` … `(q/vertex x y)` … `(q/end-shape)` |
| Pixel buffer | `(q/pixels)` → mutate array → `(q/update-pixels)`      |

---

## Layer 5 — Color Management Pipeline

For serious visual work, color is not just numbers — it has to survive format changes:

```
Camera / Texture Input
    ↓  OCIO/ACES linearize
Scene-Linear Working Space  (ACEScg for 3D/VFX; sRGB-linear for web)
    ↓  Render / composite
HDR Buffer  (EXR layers: beauty + depth + normals + AOVs)
    ↓  Tone Mapping / View Transform
    │   · sRGB monitor   → Rec.709 SDR  
    │   · HDR display    → Rec.2100 / PQ / ST.2084
    ↓  Delivery bake
Final Output  (sRGB JPEG/PNG; HDR10; ACES2065-1 archival EXR)
```

### Key Concepts

| Term               | What it is                                               |
|--------------------|----------------------------------------------------------|
| **sRGB**           | Standard web/consumer color space; small gamut; SDR only |
| **ACEScg**         | Wide-gamut scene-linear space; industry VFX standard     |
| **OCIO**           | OpenColorIO — open-source color pipeline manager         |
| **LUT**            | Look-Up Table — maps input→output colors (1D or 3D)      |
| **Tone Mapping**   | Compresses HDR→SDR without hard-clipping highlights      |
| **View Transform** | LUT applied only at display; working data untouched      |

> [!IMPORTANT]
> **Non-color textures** (roughness, normals, displacement maps) must bypass linearization — they encode scalar data, not light intensity.

---

## Layer 6 — Post-Processing

After the 3D scene is rendered into a 2D buffer:

| Effect             | Technique                                                                            |
|--------------------|--------------------------------------------------------------------------------------|
| **Anti-aliasing**  | FXAA (fast, blurry) / TAA (temporal, ghosting risk) / MSAA (high quality, expensive) |
| **Bloom**          | Extract bright pixels → Gaussian blur → additive composite                           |
| **SSAO**           | Screen-Space Ambient Occlusion — darkens crevices cheaply                            |
| **Depth of Field** | Bokeh blur keyed to depth buffer                                                     |
| **Motion Blur**    | Per-object velocity buffer → directional blur                                        |
| **AI Upscaling**   | DLSS / FSR / XeSS — reconstruct high-res from low-res samples                        |

---

## Layer 7 — Compute Shaders & GPU Simulation Pipeline

Modern visual art moves heavy mathematical simulation out of the CPU entirely and into **GPGPU compute pipelines**.

### Render Pipeline vs Compute Pipeline

```
Render Pipeline:
  Vertices → Vertex Shader → Rasterization → Fragment Shader → Framebuffer

Compute Pipeline:
  Arbitrary Data Buffer ──► Compute Shader (Workgroups: X × Y × Z) ──► Mutated Buffer
                                (no triangles, no pixels, pure math)
```

| Dimension                | Render Pipeline (GLSL Fragment / Vertex) | Compute Pipeline (WebGPU WGSL / Vulkan Compute)                  |
|--------------------------|------------------------------------------|------------------------------------------------------------------|
| **Execution unit**       | Per vertex or per rasterized fragment    | Dispatched 1D/2D/3D thread workgroups                            |
| **Output target**        | Framebuffer color attachment             | Storage buffers (`var<storage, read_write>`) or storage textures |
| **Random memory access** | Read-only textures; fixed output address | Random read AND write to any buffer index                        |
| **Synchronization**      | Implicit between draw passes             | Workgroup barrier (`workgroupBarrier()`) for shared memory       |
| **Best generative use**  | Surface coloring, post-processing        | Particle physics, fluid grids, reaction-diffusion, flocking      |

---

### GPU Simulation Archetypes

#### 1. Massive Particle Systems (1M+ Particles)
Traditional CPU particle loops choke above ~50,000 particles due to CPU-to-GPU memory transfer bottlenecks. With compute shaders:
- Particles exist entirely in a **GPU Storage Buffer** (position, velocity, life, color).
- **Compute pass:** Updates positions, handles attractor/repulsor fields, evaluates 3D curl noise.
- **Render pass:** The storage buffer is bound directly as an instance buffer or vertex attribute (`InstancedMesh` / points). The CPU never touches the particle data during runtime.

#### 2. Physarum (Slime Mold) & Agent Simulations
Simulates emergent foraging networks based on biological mold:
1. **Sense:** Thousands of agents sample a trail-pheromone texture ahead of their heading.
2. **Rotate & Move:** Steer toward the highest chemical concentration and step forward.
3. **Deposit:** Write new chemical pheromones to the grid at current positions.
4. **Diffuse & Evaporate:** A compute blur pass spreads the pheromones and decays them over time.

#### 3. Grid-Based Eulerian Fluid Simulation (Stable Fluids)
Solves the Navier-Stokes equations directly on a 2D/3D texture grid across sequential compute passes:
```
Velocity Grid ──► Advection Pass ──► Divergence Calculation ──► Pressure Solve (Jacobi) ──► Velocity Projection
```
Dye particles or visual ink are advected along the resulting divergence-free velocity vector field.

---

## Layer 8 — Real-Time Ingestion & Live Performance Stack

Generative art for live performance, interactive installations, and audiovisual sets requires low-latency input ingestion.

```
                    ┌─ MIDI Controller (Web MIDI / USB)
                    ├─ Microphone / Audio Stream (Web Audio FFT)
Physical World ────►├─ Depth Camera / Webcam (OpenCV / MediaPipe)
                    └─ Live Coding DAW (OSC / UDP Packets)
                                   │
                                   ▼
                   Normalized Parameters / Uniforms
                                   │
                                   ▼
                   Generative Art Runtime Engine
```

### 1. Audio Reactivity & Spectral Analysis

Audio is decomposed into spectral bands using the **Fast Fourier Transform (FFT)**:

```
Raw Audio Signal (Time Domain) ──► FFT ──► Frequency Spectrum (0 Hz – 20 kHz)
```

| Audio Feature         | Frequency Range      | Generative Art Application                           |
|-----------------------|----------------------|------------------------------------------------------|
| **Sub-Bass**          | 20 Hz – 60 Hz        | Camera kick-shake, global bloom pulse                |
| **Bass**              | 60 Hz – 250 Hz       | Particle burst triggers, terrain height displacement |
| **Midrange**          | 250 Hz – 4 kHz       | Geometry rotation, noise frequency warping           |
| **Highs / Treble**    | 4 kHz – 20 kHz       | Wireframe brightness, grain/sparkle intensity        |
| **RMS Amplitude**     | Full spectrum        | Overall scale, scene energy                          |
| **Spectral Centroid** | Timbral "brightness" | Color palette hue shift                              |

> [!TIP]
> **Envelope Following:** Never pass raw FFT outputs directly to shader uniforms. Apply smoothing (exponential decay: `val = lerp(val, target, 0.2)`) to eliminate high-frequency visual flickering while preserving punchy transients.

### 2. Live Performance Protocols (MIDI & OSC)

- **MIDI (Musical Instrument Digital Interface):**
  - Standard for hardware control surfaces (fader banks, rotary knobs, launchpads).
  - In browsers: **Web MIDI API** (`navigator.requestMIDIAccess()`) listens directly to CC (Control Change) messages with near-zero latency.
- **OSC (Open Sound Control):**
  - Network-based packet protocol over UDP.
  - Bridges creative audio tools (TidalCycles, SuperCollider, Ableton Live via Max for Live, Overtone in Clojure) to visual engines (TouchDesigner, Quil, Three.js).
  - Example packet: `/param/twist 0.82` sent to `localhost:9000`.

### 3. Spatial & Vision Sensing
- **Color & Depth Cameras:** Intel RealSense, Microsoft Azure Kinect.
- **Vision ML Libraries:** MediaPipe (face mesh, hands, skeletal pose), OpenCV.
- Human silhouettes or skeletal joints act as dynamic attractor/repulsor forces within particle fields and flow systems.

---

## Layer 9 — Physical Fabrication & Print Toolchain

Translating algorithmic code from backlit screens to physical matter requires a dedicated fabrication pipeline.

```
Algorithmic Code ──► Vector Geometry (Paths) ──► Path Optimization (vpype) ──► G-Code/HPGL ──► Pen Plotter
                 └── High-Res Canvas Buffer ──► Tiled Render ──► CMYK / ICC ──► 300+ DPI Giclée Print
```

### 1. Pen Plotter Architecture (AxiDraw, CNC)

Unlike monitors that render pixels, pen plotters physically move a carriage and servo-actuated pen across paper.

#### Key constraints & challenges:
- **No Gray Values:** Shading is achieved strictly through line density, hatching, or stippling.
- **The "Air Travel" Problem:** If paths are drawn in random generation order, the pen spends 80% of its time lifted in the air moving between segments.
- **Physical Ink Bleed:** Overlapping paths puddle wet ink and tear paper fibers.

#### Plotter preparation pipeline:
1. **Deduplication:** Merge contiguous segments; remove exact duplicate lines.
2. **Path Sorting (`vpype` / 2-opt Traveling Salesperson):** Re-orders paths to minimize pen-up travel distance.
3. **Single-Stroke Typography (Hershey Fonts):** Standard TTF/OTF fonts are outlines with fills. Plotters require stroke-centerline fonts (Hershey format) so text is drawn with single, clean pen passes.

---

### 2. Fine Art Print Pipeline (Giclée & Large Format)

Screens display at 72–144 DPI; professional gallery prints require **300+ DPI** (Dots Per Inch).

#### Resolution scaling table:

| Print Size | Metric Dimensions | Pixels at 300 DPI | Megapixels |
|------------|-------------------|-------------------|------------|
| **A4**     | 210 × 297 mm      | 2,480 × 3,508     | ~8.7 MP    |
| **A3**     | 297 × 420 mm      | 3,508 × 4,960     | ~17.4 MP   |
| **A2**     | 420 × 594 mm      | 4,960 × 7,016     | ~34.8 MP   |
| **A1**     | 594 × 841 mm      | 7,016 × 9,933     | ~69.7 MP   |

#### The Tiled Rendering Strategy
Attempting to allocate a 70 MP canvas in WebGL or Quil will crash the GPU driver (`CONTEXT_LOST_WEBGL` or JVM OutOfMemory). 
- **Solution:** Partition the output into a grid of smaller tiles (e.g., 4 × 4 grid of 2048×2048 buffers).
- Shift camera projection frustum bounds per tile (`camera.setViewOffset(...)`).
- Stitch rendered tiles offline via `sharp`, ImageMagick, or Java image buffers.

#### Color Profile Conversion:
- Generative art lives natively in wide RGB / sRGB.
- Physical printing uses pigment inks: **CMYK + Light Cyan/Light Magenta/Light Black**.
- Pipeline must preserve tonal gradients via ICC soft-proofing before sending to print masters.

---

## Layer 10 — Curation, Seed Determinism & Recording Pipeline

Generative art is an ongoing dialogue between algorithm authoring and curatorial selection.

### 1. Cryptographic & Deterministic PRNGs

Standard `Math.random()` or Java `(rand)` uses unseeded or platform-dependent state. In long-form generative art, **identical seeds must guarantee bit-for-bit identical visual output forever**.

| Generator        | Bits    | Period           | Evaluation                                        |
|------------------|---------|------------------|---------------------------------------------------|
| **Mulberry32**   | 32-bit  | $\approx 2^{32}$ | Ultra-compact, fast, ideal for browser JS         |
| **SplitMix64**   | 64-bit  | $2^{64}$         | Robust; standard for seeding other generators     |
| **XorShift128+** | 128-bit | $2^{128} - 1$    | Extremely fast; passes BigCrush statistical tests |

```javascript
// Minimal 32-bit deterministic PRNG (Mulberry32)
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
```

### 2. Parameter Curation GUIs
To explore the possibility space of a system without editing source code:
- **Tweakpane / Lil-GUI:** Lightweight parameter controllers bound to generative variables.
- **Leva:** Declarative React/R3F parameter panels with state history and preset export.
- Presets are serialized to URL query parameters or JSON files, capturing specific mint seeds and trait combinations.

### 3. Frame-Perfect Video Capture

Real-time screen recorders drop frames when GPU load spikes. To record smooth, gallery-ready 60 FPS animation:

1. **Decouple time:** Replace system clock (`performance.now()`) with an explicit virtual clock:
   $$t_{n+1} = t_n + \frac{1}{\text{FPS}}$$
2. **Render & Dump:** Advance one frame $\rightarrow$ pause loop $\rightarrow$ export canvas buffer (`canvas.toBlob()` or WebCodecs API) $\rightarrow$ advance time.
3. **Encode Lossless Video with FFmpeg:**

```bash
# High-bitrate master for gallery projection (Apple ProRes 422 HQ)
ffmpeg -r 60 -i frame_%05d.png -c:v prores_ks -profile:v 3 -pix_fmt yuv422p10le output.mov

# Web-optimized streaming MP4 (H.264, perceptually lossless)
ffmpeg -r 60 -i frame_%05d.png -c:v libx264 -crf 17 -pix_fmt yuv420p output.mp4
```

---

## Modern Trends (2024–2026)

| Trend                          | What it means                                                                                                                    |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **OpenUSD**                    | Pixar's Universal Scene Description; backbone of VFX/virtual production pipelines for multi-dept. non-destructive scene assembly |
| **Neural Rendering**           | NeRF, 3D Gaussian Splatting — volume reconstructed from photos; first-class production asset type                                |
| **Compute-Dominant Pipelines** | Vertex + fragment shaders replaced by compute shaders for more flexible GPU execution                                            |
| **Mesh Shaders**               | Replace fixed vertex → geometry pipeline with programmable amplification stages                                                  |
| **In-loop AI Denoising**       | AI denoiser is *inside* the render loop, not post-process — enables real-time path tracing                                       |
| **WebGPU maturation**          | Near-Vulkan power in browsers; successor to WebGL; p5.js 2.0 targeting it                                                        |

---

## Mapping to This Project

| Component                   | Stack Layer                               |
|-----------------------------|-------------------------------------------|
| `q/noise` calls             | Perlin noise math — pure software, no GPU |
| `q/rect`, `q/line`          | Java2D calls → Java2D software rasterizer |
| `q/lerp`, `q/map-range`     | CPU interpolation; no GPU involvement     |
| `fun-mode` middleware       | Enforces pure functional state pipeline   |
| `q/frame-rate 60`           | Controls Java event loop tick rate        |
| `:renderer :p3d` (not used) | Would hand off to OpenGL via JOGL         |

> [!NOTE]
> The invisible-brush terrain sketch runs entirely on **Java2D (CPU)** — not GPU-accelerated. For large canvases or high frame counts, switching to `:renderer :p2d` (OpenGL-backed 2D) would yield a significant speedup.

---

## References

**Native / Desktop**
- Processing Foundation — [processing.org](https://processing.org) (official docs)
- Quil — [quil.info](http://quil.info) & [cljdoc.org/d/quil/quil](https://cljdoc.org/d/quil/quil)
- OPENRNDR — [openrndr.org](https://openrndr.org)
- Nannou — [nannou.cc](https://nannou.cc)
- Khronos Group — Vulkan spec, OpenGL spec ([khronos.org](https://khronos.org))
- ACES — [acescentral.com](https://acescentral.com)
- OpenColorIO — [opencolorio.org](https://opencolorio.org)
- Alain Galvan — *Raw Vulkan / Raw WebGPU* (alain.xyz)
- Real-Time Rendering 4th Ed. — Akenine-Möller, Haines, Hoffman

**Browser / Web**
- MDN — Canvas 2D API ([developer.mozilla.org/en-US/docs/Web/API/Canvas_API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API))
- MDN — WebGL API ([developer.mozilla.org/en-US/docs/Web/API/WebGL_API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API))
- WebGL Fundamentals — [webglfundamentals.org](https://webglfundamentals.org)
- WebGPU W3C Spec — [w3.org/TR/webgpu](https://www.w3.org/TR/webgpu/)
- p5.js — [p5js.org](https://p5js.org) (renderer architecture docs)
- Shadertoy — [shadertoy.com](https://www.shadertoy.com) (community GLSL shaders)
- Inigo Quilez — *Articles on SDFs, raymarching, domain warping* ([iquilezles.org](https://iquilezles.org))
- Art Blocks — *Generator Specification* ([artblocks.io](https://artblocks.io))

**3D / Web 3D**
- Three.js — [threejs.org](https://threejs.org) (official docs + examples)
- React Three Fiber — [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- Drei — [github.com/pmndrs/drei](https://github.com/pmndrs/drei)
- Babylon.js — [babylonjs.com](https://www.babylonjs.com) (Gaussian Splatting + WebGPU docs)
- WebGL Fundamentals — 3D section — [webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html](https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html)
- simplex-noise — [npmjs.com/package/simplex-noise](https://www.npmjs.com/package/simplex-noise)
- Inigo Quilez — *SDF primitives, raymarching* ([iquilezles.org/articles/distfunctions](https://iquilezles.org/articles/distfunctions/))

**Compute, Fabrication, Audio & Tools**
- WebGPU Compute Explanation — [surma.dev/things/webgpu/](https://surma.dev/things/webgpu/)
- vpype (Vector Graphics Preparation Pipeline for Pen Plotters) — [vpype.readthedocs.io](https://vpype.readthedocs.io)
- Evil Mad Scientist / Bantam Tools — *AxiDraw Documentation* ([axidraw.com](https://axidraw.com))
- Web Audio API — [developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- Web MIDI API — [developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API)
- Open Sound Control (OSC) Specification — [opensoundcontrol.stanford.edu](https://opensoundcontrol.stanford.edu)
- MediaPipe Vision Solutions — [ai.google.dev/edge/mediapipe](https://ai.google.dev/edge/mediapipe)
- Tweakpane — [cocopon.github.io/tweakpane/](https://cocopon.github.io/tweakpane/)

---
*Crafted with AI: Research, drafting, review, and refinement assisted by frontier AI models.*
