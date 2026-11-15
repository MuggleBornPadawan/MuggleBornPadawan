---
title: "Breaking the 2D Plane: OpenGL, Shaders, and the 3D Graphics Pipeline in Clojure & Quil"
published: true
description: "From CPU software rasterization to OpenGL hardware pipelines and GLSL shaders. Extending The Invisible Brush into 3D procedural terrain meshes with Clojure, Quil, and JOGL."
tags: clojure, creativecoding, opengl, shaders
series: The Invisible Brush
cover_image: https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/19ojx050a9bmh71zfrtk.png
canonical_url: "https://dev.to/ganesh_rajendran_art/breaking-the-2d-plane-opengl-shaders-and-the-3d-graphics-pipeline-in-clojure-quil-3663"
devto_id: 5042650 
---

> *This is **Part 3** of a 3-part series on **The Invisible Brush: Generative Art & Creative Computation**:*
> 1. [Part 1: The Invisible Brush — Generative Art and the Algorithms That Paint](https://dev.to/ganesh_rajendran_art/the-invisible-brush-generative-art-and-the-algorithms-that-paint-32ig)
> 2. [Part 2: Who Made This? The Author Shift and the Philosophy of Generative Art](https://dev.to/ganesh_rajendran_art/who-made-this-the-author-shift-and-the-philosophy-of-generative-art-o3e)
> 3. **Part 3: Breaking the 2D Plane — OpenGL, Shaders, and the 3D Graphics Pipeline in Clojure & Quil** (this article)

---

*In [Part 1](https://dev.to/ganesh_rajendran_art/the-invisible-brush-generative-art-and-the-algorithms-that-paint-32ig), we explored procedural content generation by coding a scrolling 2D Perlin noise terrain cross-section. In [Part 2](https://dev.to/ganesh_rajendran_art/who-made-this-the-author-shift-and-the-philosophy-of-generative-art-o3e), we explored the philosophical author shift: the transition from executing individual marks to designing possibility spaces. Now, we pull back the canvas itself and examine what happens when mathematical functions meet raw silicon.*

---

There is a comfortable lie at the center of creative coding tutorials. 

You write a function. You call `rect`, `ellipse`, or `line`. A window appears, bathed in vibrant colors, and 60 times a second an organic universe unfurls across your monitor. We tell ourselves that code is paint, that functions are brushes, and that the canvas is an infinite, frictionless plane.

Until you scale it.

Add ten thousand animated particles. Increase your window resolution from 720p to 4K. Layer five octaves of noise across a dense spatial grid. Suddenly, the illusion shatters. The frame rate plummets from 60 to 12. The CPU fan spins up like a jet engine preparing for takeoff. Your garbage collector struggles to reclaim megabytes of short-lived heap allocations, and frame jitter turns your serene landscape into a stuttering slideshow.

This is the **CPU ceiling**. 

In Part 1, our terrain sketch ran comfortably on **Java2D** — Processing’s default software renderer. Java2D is brilliant for learning: it requires zero GPU driver configuration, runs everywhere, and executes directly on the CPU. But it renders pixels by calculating geometry in host RAM and blitting rasterized scanlines into a software framebuffer byte array.

To build living, immersive computational worlds, we must break out of the 2D plane. We must leave the comfort of CPU rasterization, bridge the JVM to native graphics drivers, and hand the heavy mathematical lifting to where it belongs: the massively parallel execution units of the GPU.

In this article, we will deconstruct the full visual processing stack from Clojure down to the silicon. We will transform our 2D terrain slice into a full **3D continuous landscape mesh**, navigate it with dynamic camera projections, illuminate it with calculated surface normals, and write custom **GLSL hardware shaders** running directly on the GPU — all orchestrated through pure, functional Clojure.

---

## 1. The Graphics Stack Deconstructed: From JVM to Silicon

When you write Clojure code with [Quil](http://quil.info/) (a Clojure wrapper around Processing’s `PApplet`), what actually happens between your expression and the photons emitting from your monitor?

The pipeline crosses four distinct architectural boundaries:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Application Layer (Clojure / Quil)                       │
│    • Pure immutable simulation state (m/fun-mode)           │
│    • Functional geometry generation & noise evaluation      │
├─────────────────────────────────────────────────────────────┤
│ 2. Host Runtime (JVM / Processing PApplet)                  │
│    • State loop clock & event dispatch                      │
│    • Scene matrix stack (push-matrix, pop-matrix)           │
├─────────────────────────────────────────────────────────────┤
│ 3. API Abstraction Bridge (JOGL / JNI)                      │
│    • Java Native Interface bindings to desktop libGL        │
│    • Vertex Buffer Object (VBO) marshalling & draw calls    │
├─────────────────────────────────────────────────────────────┤
│ 4. Hardware Driver & GPU Silicon                            │
│    • Vertex Shader → Rasterizer → Fragment Shader           │
│    • Framebuffer depth test & blending → Monitor scanout    │
└─────────────────────────────────────────────────────────────┘
```

### The Rendering Paradigms: CPU vs. GPU

To understand why 3D demands hardware acceleration, consider how rasterization works across both processors:

| Dimension                   | CPU Software Rendering (`:java2d`)                          | GPU Hardware Pipeline (`:p3d` / OpenGL)                                  |
|-----------------------------|-------------------------------------------------------------|--------------------------------------------------------------------------|
| **Execution Architecture**  | Few powerful, latency-optimized cores (4–16 threads)        | Thousands of high-throughput SIMD ALU cores                              |
| **Rasterization Mechanism** | Scans polygon edges in CPU cache; writes to JVM byte arrays | Dedicated hardware rasterizer chips processing billions of fragments/sec |
| **Memory Bandwidth**        | DDR4/DDR5 system RAM (~40–80 GB/s)                          | Dedicated GDDR6/HBM VRAM (~500–1,000+ GB/s)                              |
| **Draw Call Overhead**      | Low per-call cost; high per-pixel execution penalty         | High per-draw invocation cost; near-zero per-fragment cost               |
| **Programmability**         | Standard JVM bytecode; CPU SIMD auto-vectorization          | Dedicated shader programs (GLSL / SPIR-V / WGSL)                         |

Under `:java2d`, drawing 100,000 shaded pixels requires the CPU to iterate through nested loops, calculate color values, and copy bytes to memory. The CPU’s branch predictors and deep instruction caches are completely wasted on this work.

Under `:p3d`, Quil switches its backend to **JOGL** (Java OpenGL). Instead of coloring pixels in JVM memory, your Clojure code sends compact vertex arrays over the PCIe bus to GPU VRAM. The GPU’s rasterizer maps those vertices to screen tiles, while thousands of parallel fragment processors calculate colors and lighting in a single hardware cycle.

---

## 2. Breaking into the Third Dimension: Coordinate Systems & Matrices

In 2D canvas drawing, the coordinate system is trivial: origin `(0, 0)` sits at the top-left corner, `+X` moves right, and `+Y` moves down.

In 3D, space is governed by linear algebra and homogeneous coordinates. When switching to `:p3d`, Quil introduces the Z-axis and a 3-stage coordinate transformation pipeline:

```
Local Mesh Coordinates [X, Y, Z, 1.0]
              │
              ▼   (Model Matrix: position, rotation, scale)
World Space Coordinates
              │
              ▼   (View Matrix: camera eye, target, up-vector)
Camera / Eye Space Coordinates
              │
              ▼   (Projection Matrix: perspective field-of-view, near/far clipping)
Clip Space Coordinates (Homogeneous [-W..+W])
              │
              ▼   (Perspective Divide: divide by W)
Normalized Device Coordinates (NDC [-1.0..+1.0])
              │
              ▼   (Viewport Transform: map to window pixels)
Screen Framebuffer Coordinates
```

### 1. The Model-View Transform (`q/camera`)

To position our viewpoint in the world, we configure the view matrix. Rather than manually translating and rotating every vertex, we define the camera using three 3D vectors:
- **Eye position:** Where the observer stands in world space.
- **Target point:** The coordinate the camera is aimed at.
- **Up vector:** Which direction in the world represents "up" (typically `[0, 1, 0]`).

```clojure
(defn camera-position
  "Calculates camera eye coordinates from distance, orbit angle, and height."
  [cam-distance cam-angle cam-height]
  [(* cam-distance (Math/sin cam-angle))
   cam-height
   (* cam-distance (Math/cos cam-angle))])

(defn setup-scene-camera [state]
  (let [{:keys [cam-distance cam-angle cam-height]} state
        [eye-x eye-y eye-z] (camera-position cam-distance cam-angle cam-height)]
    ;; (camera eye-x eye-y eye-z target-x target-y target-z up-x up-y up-z)
    (q/camera eye-x eye-y eye-z
              0.0 40.0 0.0
              0.0 1.0 0.0)
    ;; (perspective fov-radians aspect-ratio near-clip far-clip)
    (q/perspective (/ Math/PI 3.0)
                   (/ (float (q/width)) (float (q/height)))
                   10.0
                   3000.0)))
```

### 2. Perspective vs. Orthographic

By default, `:p3d` applies **perspective projection** via `(q/perspective fov aspect near far)`. Objects farther from the camera diminish in size, creating depth cues and foreshortening. 

If you prefer architectural, isometric, or constructivist aesthetics where parallel lines never converge, Quil allows you to switch to **orthographic projection** via `(q/ortho)`. In an orthographic projection, a mountain ridge 2,000 units away retains the exact geometric scale as a pebble 50 units away.

---

## 3. Constructing the 3D Procedural Terrain

In Part 1, our terrain was a one-dimensional height function:

```text
y = f(x, t)
```

To generate a true 3D topography, we expand the domain into a two-dimensional spatial continuous field:

```text
y = f(x, z, t)
```

Every point `(x, z)` on a discrete grid receives an elevation derived from layered 2D Perlin noise.

### Multi-Frequency Octave Harmonics

A raw Perlin noise query produces gentle, featureless swells. Real mountain geography exhibits fractal characteristics: large tectonic ridges modulated by medium hills, which are in turn carved by fine, rugged boulders.

We synthesize this by summing noise across multiple **octaves**, doubling the frequency and halving the amplitude at each step:

```clojure
(defn height-at
  "Calculates terrain elevation at grid coordinate (x, z) at time t.
   Uses multi-frequency octave Perlin noise to combine broad rolling contours
   with high-frequency surface roughness."
  [x z t octaves roughness elevation-scale]
  (let [octave-sum (reduce
                    (fn [acc i]
                      (let [freq (* roughness (Math/pow 2.0 i))
                            amp  (/ 1.0 (Math/pow 2.0 i))]
                        (+ acc (* amp (q/noise (* (float x) freq)
                                               (+ (* (float z) freq) t))))))
                    0.0
                    (range octaves))
        ;; Normalization factor for sum of geometric progression 1/2^i
        norm (/ 1.0 (- 2.0 (/ 1.0 (Math/pow 2.0 (dec octaves)))))]
    (* octave-sum norm elevation-scale)))
```

Notice the normalization factor `norm`. Because each octave adds an amplitude of `1 / 2^i`, the theoretical sum approaches `2.0`. Normalizing guarantees our elevation output remains strictly bounded in `[0.0, elevation-scale]`, ensuring mathematical safety and preventing clipping artifacts.

---

## 4. Mesh Topology: The Power of Triangle Strips

How should we send this grid of (X, Z) points to the GPU?

If you draw individual independent triangles with `(q/begin-shape :triangles)`, a grid of 50 × 50 cells requires:

```text
50 × 50 × 2 = 5,000 triangles × 3 vertices = 15,000 vertex calls
```

Every interior vertex is specified and transformed up to 6 times.

Instead, we use **Triangle Strips** (`:triangle-strip`). In a triangle strip, every vertex after the first two creates a new triangle sharing the previous edge:

```
Row Z:   v0 ───── v2 ───── v4 ───── v6
         │ ╲      │ ╲      │ ╲      │
         │   ╲    │   ╲    │   ╲    │
Row Z+1: v1 ───── v3 ───── v5 ───── v7
```

Each row of our grid becomes a single continuous strip. To render 50 rows of 50 columns, we submit:

```text
50 strips × (50 × 2) = 5,000 vertex calls
```

We eliminate 66% of vertex memory traffic over the bus with zero visual loss.

### Deriving Surface Normals via Finite Differences

Without lighting, a 3D terrain looks like a flat, silhouette polygon. To interact with light, the GPU requires a **normal vector** `n = (nx, ny, nz)` at every vertex — a unit vector perpendicular to the surface.

Because our terrain is defined by a mathematical heightfield function, we do not need to pre-bake geometry. We can calculate the exact surface gradient analytically on the fly using **finite differences**:

```clojure
(defn surface-normal
  "Calculates the unit surface normal vector [nx ny nz] at grid (x, z)
   using finite-difference height gradients along X and Z."
  [x z t octaves roughness elevation-scale cell-size]
  (let [hl (height-at (dec x) z t octaves roughness elevation-scale)
        hr (height-at (inc x) z t octaves roughness elevation-scale)
        hu (height-at x (dec z) t octaves roughness elevation-scale)
        hd (height-at x (inc z) t octaves roughness elevation-scale)
        dx (- hr hl)
        dz (- hd hu)
        dy (* 2.0 cell-size)
        ;; Vector (-dx, dy, -dz) pointing outward and upward
        nx (- dx)
        ny dy
        nz (- dz)
        len (Math/sqrt (+ (* nx nx) (* ny ny) (* nz nz)))]
    (if (zero? len)
      [0.0 1.0 0.0]
      [(/ nx len) (/ ny len) (/ nz len)])))
```

When directional sunlight strikes the surface, the dot product between the sun vector `L` and our normal `n` creates realistic diffuse shading: slopes facing the light brighten, while backfaces fall into shadow.

---

## 5. Hardware Shaders: Injecting GLSL into the JVM

Processing’s built-in lighting (`q/lights`, `q/directional-light`) is convenient, but it binds you to fixed-function shading models. What if you want non-linear atmospheric depth, distance fog, or iridescent terrain coloring?

You write custom **GLSL (OpenGL Shading Language)** programs.

In Quil `:p3d`, a shader is split into two stages compiled and executed entirely on the GPU:

```
Clojure / Host Memory
   │
   ├── Attributes:  position, normal, color (per vertex)
   ├── Uniforms:    transform matrices, u_time, fog_color (global)
   │
   ▼
[Vertex Shader: terrain.vert]
   └── Transforms vertex positions from world space to clip space
   └── Interpolates normals and colors across triangle faces
         │
         ▼
[Hardware Rasterizer]
   └── Discretizes triangles into fragments (candidate pixels)
         │
         ▼
[Fragment Shader: terrain.frag]
   └── Runs for every visible pixel simultaneously
   └── Computes depth attenuation, sunlight diffusion, and atmospheric fog
         │
         ▼
[Framebuffer / Screen]
```

### The Vertex Shader (`terrain.vert`)

```glsl
uniform mat4 transform;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat3 normalMatrix;

attribute vec4 position;
attribute vec4 color;
attribute vec3 normal;

varying vec4 vertColor;
varying vec3 vertNormal;
varying vec4 vertPosition;

void main() {
    gl_Position = transform * position;
    vertColor = color;
    vertNormal = normalize(normalMatrix * normal);
    vertPosition = position;
}
```

Processing automatically binds its active transformation matrices (`transform`, `normalMatrix`) and per-vertex attributes (`position`, `color`, `normal`). The vertex shader simply projects the vertex into screen clip space and passes the interpolated varyings to the fragment stage.

### The Fragment Shader (`terrain.frag`)

```glsl
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform float u_time;
uniform vec3 fog_color;
uniform float fog_near;
uniform float fog_far;

varying vec4 vertColor;
varying vec3 vertNormal;
varying vec4 vertPosition;

void main() {
    // 1. Perspective depth calculation
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fog_factor = smoothstep(fog_near, fog_far, depth);

    // 2. Directional sunlight diffuse shading
    vec3 light_dir = normalize(vec3(0.5, 0.8, 0.4));
    float diff = max(dot(vertNormal, light_dir), 0.0);
    vec3 lit_color = vertColor.rgb * (0.35 + 0.65 * diff);

    // 3. Blend lit surface into atmospheric horizon fog
    vec3 final_color = mix(lit_color, fog_color, clamp(fog_factor, 0.0, 1.0));
    gl_FragColor = vec4(final_color, vertColor.a);
}
```

### Feeding Clojure Data into GPU Uniforms

In Clojure, we compile the shader during `setup` and update its uniforms dynamically in each frame of `draw-state`:

```clojure
(defn draw-state [state]
  (q/background 22 26 38)
  (setup-scene-camera state)

  (let [sh (:shader state)]
    (if (and sh (:use-shader? state))
      (do
        (q/shader sh)
        ;; Update GLSL uniforms on the GPU
        (.set ^processing.opengl.PShader sh "u_time" (float (:t state)))
        (.set ^processing.opengl.PShader sh "fog_color" (float 0.086) (float 0.102) (float 0.149))
        (.set ^processing.opengl.PShader sh "fog_near" (float 500.0))
        (.set ^processing.opengl.PShader sh "fog_far" (float 1600.0)))
      (setup-lighting))

    (draw-terrain-mesh state)

    (when (and sh (:use-shader? state))
      (q/reset-shader))))
```

By pushing atmospheric fog calculation to `terrain.frag`, the GPU calculates smooth, distance-attenuated atmospheric haze for hundreds of thousands of fragments with zero CPU cycle penalty.

---

## 6. The Pure Functional GPU Loop (`m/fun-mode`)

There is an inherent philosophical tension when coupling Clojure with OpenGL:
- **Clojure's world:** Immutable values, pure functions, persistent data structures.
- **OpenGL's world:** A mutable global state machine with framebuffers, bound contexts, and side-effecting draw calls.

How does Quil bridge this divide without corrupting functional purity?

Through the **`m/fun-mode`** middleware.

In `fun-mode`, the sketch lifecycle is divided into two strictly isolated phases:

```
┌─────────────────────────────────────────────────────────────┐
│ Pure Functional Domain (No Side Effects)                    │
│                                                             │
│   state_0 ──► (update-state state_0) ──► state_1 ──► ...    │
│   (pure immutable Clojure maps: time, camera angles)       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼  (passed as read-only snapshot)
┌─────────────────────────────────────────────────────────────┐
│ Imperative Hardware Domain (Side Effects Confined)          │
│                                                             │
│   (draw-state state_n)                                      │
│   └── Sets camera uniforms                                  │
│   └── Binds GLSL PShader                                    │
│   └── Submits triangle strip vertex streams to OpenGL VBO   │
└─────────────────────────────────────────────────────────────┘
```

Because `update-state` is a pure function:

```clojure
(defn update-state [state]
  (-> state
      (update :t + (:fly-speed state))
      (update :cam-angle + 0.003)))
```

Our entire generative simulation — camera trajectory, flight velocity, spatial noise evolution — can be tested, stepped, or replayed in a headless REPL without ever opening an X11 window or touching an OpenGL context:

```clojure
(deftest update-state-test
  (testing "Update state increments flight time and camera orbit angle"
    (let [s0 (t3d/initial-state)
          s1 (t3d/update-state s0)]
      (is (> (:t s1) (:t s0)))
      (is (> (:cam-angle s1) (:cam-angle s0))))))
```

The messy, stateful reality of OpenGL is confined entirely to the leaf boundary of `draw-state`.

---

## 7. Architectural Comparison: Where Does Your Code Live?

As your generative art expands from interactive experiments to large-scale gallery installations, choosing the correct layer in the processing stack becomes an engineering decision:

| Architecture                       | Pipeline Core               | Latency / FPS                | Max Complexity | Best Use Case                                                       |
|------------------------------------|-----------------------------|------------------------------|----------------|---------------------------------------------------------------------|
| **Quil :java2d**                   | CPU (Java2D rasterizer)     | 60 FPS up to ~5k elements    | Low            | 2D vector art, book typography, pen plotter SVG exports             |
| **Quil :p3d (OpenGL)**             | GPU (JOGL / Desktop OpenGL) | 60 FPS up to ~500k vertices  | Medium-High    | Live desktop visuals, audiovisual REPL sets, 3D generative terrains |
| **Browser (p5.js / Three.js)**     | GPU (WebGL 2 / WebGPU)      | 60 FPS up to ~2M instances   | High           | Instant URL sharing, web installations, on-chain generative tokens  |
| **Native Compute (Vulkan / WGSL)** | GPU Compute Shaders         | 120 FPS up to 10M+ particles | Extreme        | Real-time Navier-Stokes fluid grids, Physarum slime mold swarms     |

---

## 8. Running the Complete 3D Engine

To assemble and run the complete 3D engine, organize the project with a standard Clojure CLI layout:

### Project Layout

```text
terrain-3d/
├── deps.edn                     # Clojure CLI configuration & Quil dependency
├── resources/
│   └── shaders/
│       ├── terrain.vert         # Vertex projection shader
│       └── terrain.frag         # Fragment shader (depth fog & directional lighting)
├── src/
│   └── generative/
│       └── terrain_3d.clj       # 3D terrain generator, camera math & Quil P3D sketch
├── test/
│   └── generative/
│       ├── terrain_3d_test.clj  # Headless test suite (math, normal vectors, state)
│       └── test_runner.clj      # Test runner
└── README.md
```

### Dependency Configuration (`deps.edn`)

```clojure
{:paths ["src" "resources"]
 :deps {quil/quil {:mvn/version "4.3.1563"}}
 :aliases
 {:run {:main-opts ["-m" "generative.terrain-3d"]}
  :test {:extra-paths ["test"]
         :main-opts ["-m" "generative.test-runner"]}}}
```

### Running the Test Suite (Headless)

Because the mathematical models and normal derivations are pure functions, you can verify the entire simulation pipeline without an active display server:

```bash
clojure -M:test
```

```text
Testing generative.terrain-3d-test

Ran 6 tests containing 134 assertions.
0 failures, 0 errors.
```

### Launching the Interactive 3D Window

If you are running in a desktop environment with an active display server (`X11` or `Wayland`):

```bash
# Launch interactive 3D terrain flight
clojure -M:run

# Launch in wireframe inspection mode
clojure -M:run --wireframe

# Render a single high-resolution snapshot frame to disk
clojure -M:run --snapshot terrain_3d.png
```

---

## Closing the Loop: The Three Layers of Creative Coding

Over the course of *The Invisible Brush* series, we have traveled across three complementary perspectives on generative computation:

1. **Part 1 (The Technique):** How algorithms act as paintbrushes — using Perlin noise, grammars, and cellular automata to compute content on demand.
2. **Part 2 (The Philosophy):** The upstream author shift — recognizing that the generative artist designs possibility spaces and tunes the spectrum of control between rigid order and static chaos.
3. **Part 3 (The Silicon):** The mechanical substrate — lifting the canvas into the third dimension, understanding graphics memory bandwidth, and pairing Clojure’s functional purity with the raw parallel power of the GPU.

Code is not paint, and monitors are not canvases. But when functional abstractions and hardware architectures align, algorithms become something far more powerful: an engine of endless, structured surprise.

---

### References & Further Reading

- [Processing Foundation Documentation](https://processing.org) — Official API specifications for `PApplet` and `PShader`.
- [Quil API Documentation](http://quil.info/) — Functional Clojure wrappers for Processing and JOGL.
- [OpenGL Specification & GLSL Reference](https://www.khronos.org/opengl/) — The Khronos Group.
- Inigo Quilez — [Articles on Shaders, SDFs, and Distance Fog](https://iquilezles.org).
- Real-Time Rendering, 4th Edition — Tomas Akenine-Möller, Eric Haines, Naty Hoffman.

---

*Crafted with AI: Research, drafting, review, and refinement assisted by frontier AI models.*
