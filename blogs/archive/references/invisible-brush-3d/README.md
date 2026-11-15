# The Invisible Brush 3D — OpenGL, Shaders, and the Graphics Pipeline

A 3D generative landscape engine built with Clojure and [Quil](http://quil.info/) (backed by Processing's P3D OpenGL/JOGL runtime), based on the article **"Breaking the 2D Plane: OpenGL, Shaders, and the 3D Graphics Pipeline in Clojure & Quil"** (Part 3 of *The Invisible Brush* series).

The project lifts the 2D Perlin noise terrain cross-section from Part 1 into a full 3D continuous surface, rendered on the GPU with dynamic camera orbits, directional lighting, and custom GLSL atmospheric depth shaders.

---

## Core Techniques & Architecture

- **P3D OpenGL Hardware Acceleration (`:renderer :p3d`):** Bridges Clojure directly to GPU rasterization through JOGL (Java OpenGL) rather than CPU software rasterization (Java2D).
- **2D Continuous Octave Perlin Noise:** Combines multi-frequency harmonics across $(X, Z)$ space coordinates and time $t$ for broad mountain ridges and fine rock details.
- **Triangle Strip Mesh Generation (`:triangle-strip`):** Renders the terrain grid as continuous vertex strips, reducing vertex specification overhead.
- **Finite-Difference Surface Normals:** Calculates accurate mathematical normal vectors $\mathbf{n} = \text{normalize}(-\Delta x, 2 \cdot \text{step}, -\Delta z)$ for realistic diffuse lighting and shadows.
- **GLSL Hardware Shaders (`terrain.vert` & `terrain.frag`):** Passes vertex attributes, transformation matrices, and uniform parameters (`u_time`, `fog_color`, etc.) directly to the GPU for real-time atmospheric depth fog and lighting.
- **Pure Functional State Pipeline (`m/fun-mode`):** Enforces an immutable Clojure simulation state loop (`initial-state` → `update-state` → `draw-state`).

---

## Project Structure

```
archive/references/invisible-brush-3d/
├── deps.edn                     # Clojure CLI configuration & aliases
├── resources/
│   └── shaders/
│       ├── terrain.vert         # GLSL Vertex Shader (transforms & normal pass)
│       └── terrain.frag         # GLSL Fragment Shader (depth fog & directional sun)
├── src/
│   └── generative/
│       └── terrain_3d.clj       # 3D terrain generation, camera math & Quil P3D sketch
├── test/
│   └── generative/
│       ├── terrain_3d_test.clj  # Headless unit tests (elevation, normals, camera, state)
│       └── test_runner.clj      # CLI test runner
└── README.md
```

---

## Getting Started

### Prerequisites

- Clojure CLI (`clojure`)
- Java 17+ (e.g. OpenJDK / Temurin)
- Graphical display server (X11 / Wayland) or OpenGL driver for live 3D GUI rendering

---

## Running Headless Tests

The mathematical models, normal vector derivations, and state pipelines can be verified headlessly without an active display server or X11 session:

```bash
clojure -M:test
```

Output:
```text
Testing generative.terrain-3d-test

Ran 6 tests containing 134 assertions.
0 failures, 0 errors.
```

---

## Running with Display ON (Interactive 3D GUI)

Ensure your graphical environment is accessible (`$DISPLAY` or Wayland socket):

```bash
# 1. Launch interactive 3D flight window (60 FPS)
clojure -M:run

# 2. Launch in wireframe geometry mode
clojure -M:run --wireframe

# 3. Render a single 3D frame snapshot to disk
clojure -M:run --snapshot terrain_3d.png
```
