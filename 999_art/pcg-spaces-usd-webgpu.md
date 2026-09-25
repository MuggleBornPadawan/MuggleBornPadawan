# Spaces for PCG Visual Art — OpenUSD (model/world) + WebGPU (render/interaction)

**Date:** 2026-09-25
**Place:** `/home/rgroot/MuggleBornPadawan/999_art/pcg-spaces-usd-webgpu.md`
**Question:** What are all coordinate spaces/views in game engines, re-done with OpenUSD-correct model/world and WebGPU-correct render spaces, for procedural content generation (PCG) of visual art with simple browser interaction?
**Context:** Generate art procedurally (data-first, seeded), store/share as USD where useful, render + interact in browser via WebGPU + WGSL.
**Lean stack:** Clojure + bb (PCG, pure fns, seeded) → `usda` on disk for share → lean JSON mirror in browser → single-file `index.html` (inline WGSL + JS, no npm/build) served by `bb http-server` → raw WebGPU/WGSL. Zero build, minimal RAM/disk.

## TL;DR

- **Model space = USD "local/prim space"** — `UsdGeomXformable` + `xformOpOrder` → `GetLocalTransformation()`.
- **World space = USD "stage/world space"** — walk hierarchy → `ComputeLocalToWorldTransform()`.
- **Everything after that is NOT USD.** It is Hydra/WebGPU/GPU: `View` → `Clip (vec4)` → `NDC (vec3, WebGPU z 0..1)` → `Framebuffer/Viewport (pixels, top-left origin)`.
- WebGPU matches **DirectX** conventions, not OpenGL: NDC z is `0..1` (not `-1..1`), framebuffer y goes **down**.
- **Lean rule:** no USD parser in browser, no `gl-matrix`/npm. Inline 4×4 math (~40 lines), PCG in Clojure/bb, browser only renders JSON mirror.

> This file cites only primary sources (openusd.org release docs + W3C WebGPU/WGSL specs).

---

## 1. USD Model & World (source of truth)

### 1.1 Stage coordinate system

- A `UsdStage` defines two stage-level metrics:
  - `upAxis` — `"Y"` (default) or `"Z"`. Controls which axis is up.
  - `metersPerUnit` — scale of 1 stage unit in meters (default `1` = 1m; many DCCs author `0.01` = 1cm).
- Both affect interpretation of all `Xformable` transforms and camera apertures.

> Sources: `openusd.org/release/api/class_usd_stage.html` (`GetUpAxis`, `GetMetersPerUnit`, `SetUpAxis`), `openusd.org/release/user_guides/render_user_guide.html#configuring-the-stage-coordinate-system`.

### 1.2 Model / Local / Prim space (USD-correct)

- Every `UsdGeomXformable` prim (mesh, camera, light, scope `Xform`) owns an **ordered local stack** `xformOpOrder: token[]` and op attributes like `xformOp:translate`, `xformOp:rotateXYZ`, `xformOp:scale`.
- `xformOpOrder` order is **least-to-most-local** and is inverse to matrix multiply order (the last op in the array is the "most local" / applied first). Example: `xformOpOrder = ["xformOp:translate", "xformOp:rotateXYZ"]` → `M = T * R`, so `M * p = T * (R * p)` (R first, then T).

```usda
def Xform "Chair" {
  double3 xformOp:translate = (2, 0, 0)
  double3 xformOp:rotateXYZ = (0, 45, 0)
  uniform token[] xformOpOrder = ["xformOp:translate", "xformOp:rotateXYZ"]
}
```

- API: `UsdGeomXformable::GetLocalTransformation(GfMatrix4d *transform, bool *resetsXformStack, UsdTimeCode)` computes local-to-parent `Matrix4d`.
- Special token `"!resetXformStack!"` as first `xformOpOrder` entry = **do not inherit parent transform**. Use only for HUD/skybox-style prims that must ignore parent; never for normal PCG art.

> Sources: `openusd.org/release/api/class_usd_geom_xformable.html` (`GetLocalTransformation`, `GetOrderedXformOps`, `SetResetXformStack`, `xformOpOrder` docs + Examples 1-3), `openusd.org/release/api/usd_geom_page_front.html#UsdGeom_LinAlgBasics`.

### 1.3 World / Stage space (USD-correct)

- USD does **not** store world matrices per prim. It composes them by walking the namespace hierarchy.
- `UsdGeomImageable::ComputeLocalToWorldTransform(time)` → `GfMatrix4d` local-to-world (includes all ancestors).
- `ComputeParentToWorldTransform(time)` → world of parent only.
- `ComputeWorldBound(time, purpose...)` / `UsdGeomBBoxCache` → bounds in world space (cached).
- Instancing adds extra levels:
  - `UsdGeomPointInstancer` — `protoIndices` + `positions`/`orientations`/`scales` = per-instance world is `parentWorld * instanceTransform`.
  - Native instancing via `instanceable=true` references — prototype prims live under `__Prototype_*`; prototype space is distinct.

> Sources: `openusd.org/release/api/class_usd_geom_imageable.html` (`ComputeLocalToWorldTransform`, `ComputeWorldBound`, `UsdGeomBBoxCache` note), `openusd.org/release/api/class_usd_geom_point_instancer.html`, `openusd.org/release/glossary.html` (Stage, Prim, Instanceable, Prototype).

### 1.4 Camera defines View & Clip (but does not compute them)

- `UsdGeomCamera` is an `Xformable + Imageable` prim. Its **local transform** = camera-to-world (like any Xformable).
- Core attributes (all authored on the prim):
  - `projection: token` = `"perspective"` or `"orthographic"`
  - `horizontalAperture`, `verticalAperture`, `horizontalApertureOffset`, `verticalApertureOffset` — **tenths of scene units**
  - `focalLength` — tenths of scene units (perspective only)
  - `clippingRange: GfVec2f` — `(near, far)` in scene units
  - `clippingPlanes: GfVec4f[]` — extra clip planes (world-space equation)
  - `shutter:open` / `shutter:close`, `fStop`, `focusDistance`, `exposure*`, `stereoRole`
- Renderer (Hydra `HdCamera`, or your WebGPU engine) reads these + the world transform to build **View** and **Projection** matrices. USD itself never stores those matrices.

> Sources: `openusd.org/release/api/class_usd_geom_camera.html` (full attribute list + `UsdGeom_CameraUnits` notes).

### 1.5 Extra USD spaces you need for PCG

| Space | USD name / API | Note for PCG |
|---|---|---|
| **Prototype space** | `__Prototype_*` under native instances | Author once, instance N times; edits to prototype fan out. |
| **Skeleton / Joint space** | `UsdSkelRoot`, `UsdSkelSkeleton`, `jointNames` | `skel:jointLocalXforms` are in joint-parent space. `UsdSkel` computes `world = skelRootWorld * jointWorld`. |
| **Material / Primvar interpolation space** | `primvars:st`, `normals`, `tangents` + `interpolation: constant/uniform/vertex/varying/faceVarying` | PCG must pick interpolation **before** authoring; `faceVarying` for UV seams, `vertex` for smooth color. |
| **Tangent space** | `primvar:tangent`, `bitangent` on `UsdGeomPointBased` | For normal maps; orthogonal basis per surface point. Not a built-in USD space, just primvar data. |

> Sources: `openusd.org/release/api/class_usd_skel*` docs, `openusd.org/release/user_guides/primvars.html` (interpolation modes), `openusd.org/release/user_guides/render_user_guide.html#primvar-interpolation`.

---

## 2. Render spaces (WebGPU + WGSL, for browser PCG)

These apply **after** USD world. You implement them in WGSL + JS with `GPUDevice` / `GPURenderPassEncoder`.

### 2.1 View / Eye / Camera space

- `viewMatrix = inverse(cameraWorldMatrix)` where `cameraWorldMatrix = ComputeLocalToWorldTransform(cameraPrim)`.
- **Locked convention for this stack (pick one, stick to it):** USD stage is right-handed, `upAxis="Y"` (or `"Z"` with one root fix). View space is right-handed with **`-Z` forward** (camera looks down `-Z`), `+Y` up. Projection is `perspectiveZO` (WebGPU `0..1` depth). This matches USD right-handed world and maps cleanly to WebGPU NDC.
- If `upAxis="Z"`, apply one root rotation (`-90°` around X) once at stage root; do not mix per prim.

> Source: informal (view convention); USD camera world is source of truth — see `UsdGeomCamera` is `Xformable`.

### 2.2 Clip space (`vec4`)

- Vertex shader output ` @builtin(position) : vec4<f32>` is **clip position** = `projection * view * world * vec4(localPos, 1)`.
- 4 dims `(x, y, z, w)`; `w` is perspective divisor.
- `clip_distances: array<f32>` builtin (requires `enable clip_distances` + `"clip-distances"` feature) for user clip planes (`UsdGeomCamera.clippingPlanes` maps here).

> Sources: `w3.org/TR/WGSL/#built-in-values-position` ("An output value (x,y,z,w) will map to (x/w, y/w, z/w) in NDC"), `w3.org/TR/WGSL/#built-in-values-clip_distances` (array ≤8, positive = inside half-space), `w3.org/TR/webgpu/#coordinate-systems` ("Clip space coordinates have four dimensions: (x,y,z,w)").

### 2.3 NDC — Normalized Device Coordinates

- After **perspective divide**: `ndc = clip.xyz / clip.w`.
- **WebGPU NDC** (normative, DirectX-like):
  - `x ∈ [-1, 1]`
  - `y ∈ [-1, 1]`
  - `z ∈ [0, 1]` ← **differs from OpenGL `-1..1`**
  - Bottom-left corner is `(-1, -1, z)` in NDC.
- Clip volume that survives is `-w ≤ x ≤ w`, `-w ≤ y ≤ w`, `0 ≤ z ≤ w` (z lower bound is `0`, not `-w`).

> Sources: `w3.org/TR/webgpu/#coordinate-systems` §3.3 listing verbatim (`-1 ≤ x ≤ 1, -1 ≤ y ≤ 1, 0 ≤ z ≤ 1, bottom-left (-1,-1)`), `w3.org/TR/webgpu/#primitive-clipping`.

### 2.4 Framebuffer / Window / Viewport / Fragment

- **Framebuffer coordinates** (pixels): 2D, `(0,0)` = **top-left**, `x` right, `y` **down**, each pixel spans 1 unit.
- **Viewport coordinates**: framebuffer `xy` + depth `z` remapped via `GPURenderPassEncoder.setViewport(x,y,width,height,minDepth,maxDepth)` where normally `0 ≤ z ≤ 1` but `minDepth/maxDepth` can remap (e.g. reverse-Z `1..0`).
- **Fragment coordinates** (`@builtin(position)` in fragment shader, aka `fragCoord`): **matches viewport coordinates**. Use for `if fragCoord.y` logic — remember y is **down** vs NDC y **up**.
- **Texture / UV coordinates** ("UV"): components ∈ `[0,1]` per dimension; WebGPU 2D image `uv=(0,0)` is **top-left** of texture (see spec figures). USD `primvars:st` and glTF `TEXCOORD_0` use **bottom-left** `(0,0)` by convention — flip `v = 1 - v` when you upload PCG textures or sample, else textures appear upside-down vs NDC.
- **Present / Window coordinates**: alias for framebuffer coordinates when presenting to canvas (`GPUCanvasContext`).

> Sources: `w3.org/TR/webgpu/#coordinate-systems` (framebuffer/viewport/fragment/texture/window definitions + figures), `w3.org/TR/webgpu/#render-passes` / `§23.2.5 Rasterization`, `w3.org/TR/WGSL/#built-in-values-position` + `frag_depth`.

### 2.5 Depth handling gotcha (critical for PCG art)

- NDC `z=0` is **near** by default, but effective near/far is set by **(projection matrix) × `depthClearValue` × `depthCompare`**.
- WebGPU requires `depthClearValue` ∈ `[0,1]`; `depthCompare` (`"less"`, `"greater"`, etc.) chooses which direction is "nearer".
- For high-precision PCG (large worlds): use **reverse-Z** (better float distribution near far plane). Pick **one**:
  - **A — reverse projection (preferred):** build `perspectiveZO` with swapped near/far so near → `1`, far → `0`; `depthClearValue = 0`, `depthCompare = "greater"`, viewport `minDepth=0, maxDepth=1`.
  - **B — reverse viewport:** keep normal projection (near → `0`, far → `1`); `depthClearValue = 0`, `depthCompare = "greater"`, `setViewport(..., 1, 0)` to flip Z. Same result — A is easier to reason about.

> Sources: `w3.org/TR/webgpu/#coordinate-systems` note on `depthClearValue`/`depthCompare`, `w3.org/TR/webgpu/#dom-gpudepthstencilstate-depthcompare`, `w3.org/TR/webgpu/#dom-gpurenderpassdepthstencilattachment-depthclearvalue`.

---

## 3. Full pipeline — lean stack (bb/Clojure → JSON mirror → single-file WebGPU)

```
bb/Clojure PCG (JVM/bb) — pure fn, seeded
  generate-art {:seed 42 :params {...}} → {:points [...] :indices [...] :primvars {:st [...]}}  ← local, ±1
  └─ write usda on disk for share (optional): bb -cp src -m art.export/write-usda!
  └─ write lean JSON mirror for browser: bb -m art.export/write-json!  → art.json
        ↓
Browser: single index.html (no build, bb http-server)
  JSON mirror {xformOpOrder, xformOps, points, indices, upAxis, metersPerUnit}  ← model/local
    ComputeLocalToWorldTransform() in tiny JS (walk parents, no USD lib)
        ↓
      JS/WGSL: worldPos = localToWorld * vec4(local,1)
      viewPos = viewMatrix * worldPos              ← view (from UsdGeomCamera world)
      clipPos = projectionMatrix * viewPos         ← clip (vec4, @builtin(position) output)
        ↓ GPU does: ndc = clip.xyz / clip.w        ← NDC  x,y [-1,1]  z [0,1]
        ↓ GPU does: framebuffer/viewport transform  ← pixels, top-left origin
        ↓ fragment shader: @builtin(position) = viewport coords
```

> Lean choice (1A): browser never parses USD. It reads small JSON that mirrors USD concepts. USD stays on disk for DCC/share. This saves RAM, disk, and 100KB+ parser.

**JS helper — lean, no deps (~40 lines inline, no gl-matrix):**

```js
// --- tiny mat4 — column-major, single HTML file, no import ---
const mul = (a,b) => { const o=new Float32Array(16); for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3]; return o; };
const invert = (m) => { /* 4x4 invert via cofactor — 1 fn, ~20 lines; omit for brevity */ return inv; };
const perspectiveZO = (fovy, aspect, near, far) => { const f=1/Math.tan(fovy/2), nf=1/(near-far); const o=new Float32Array(16); o[0]=f/aspect; o[5]=f; o[10]=far*nf; o[11]=-1; o[14]=far*near*nf; return o; };
const fromXformOps = (order, ops) => { let m=new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]); for(let i=order.length-1;i>=0;i--) m=mul(m, matFromOp(ops[order[i]])); return m; };
const normalMat3FromMat4 = (m) => { /* inverse(transpose(upper3x3(m))) — 3x3 only */ return n3; };

// --- USD world — lean JSON mirror, no USD parser ---
// art.json from bb: {stage:{upAxis, metersPerUnit}, prims:[{name, xformOpOrder, xformOps, points, indices}]}
const localToWorld = fromXformOps(prim.xformOpOrder, prim.xformOps); // = GetLocalTransformation(time)
const parentWorld = getParentWorld(prim, time); // walk ancestors; handle !resetXformStack!
let world = mul(parentWorld, localToWorld); // = ComputeLocalToWorldTransform(time)

// Stage metrics: apply once at root (do not bake per prim)
if (stage.upAxis === "Z") world = mul(world, fromXRotation(-Math.PI/2));
if (stage.metersPerUnit !== 1) world = scale(world, stage.metersPerUnit);

// WebGPU side — right-handed, -Z forward, ZO depth 0..1
const viewMatrix = invert(cameraWorld); // cameraWorld = ComputeLocalToWorldTransform(cameraPrim, time)
const proj = perspectiveZO(fovy, aspect, near, far); // ZO = 0..1 depth, matches WebGPU NDC
const mvp = mul(proj, mul(viewMatrix, world));
const normalMatrix = normalMat3FromMat4(world); // for lighting; use mul(viewMatrix,world) if view-space
```

> Note: `perspectiveZO` (zero-to-one depth) is required for WebGPU. `perspectiveNO` (-1..1) is OpenGL-only and will break depth.
> `normalMatrix` is required for correct lighting with non-uniform scale; tangents use same fix.
> Lean: all above lives inline in `index.html` <script type="module"> — no npm, no bundler, `bb http-server` only.

---

## 4. PCG + interaction recipes (browser)

### 4.1 Generate in local, place in world (bb/Clojure — lean)
- PCG is a **pure Clojure fn in bb/JVM**, seeded, data-first. Browser only renders.

```clojure
;; src/art/blob.clj — pure, deterministic, REPL-tunable
(ns art.blob)
(defn generate [{:keys [seed params]}]
  ;; seed -> RNG, keep local small ±1 for precision
  {:points [...] :indices [...] :primvars {:st [...] :normals [...]}})

;; src/art/export.clj — bb writes both usda (share) and lean json (browser)
(ns art.export (:require [art.blob :as blob]))
(defn write-json! [path seed params]
  (let [mesh (blob/generate {:seed seed :params params})]
    (spit path (cheshire.core/generate-string ; or clojure.data.json
                {:stage {:upAxis "Y" :metersPerUnit 1}
                 :prims [{:name "Blob"
                          :xformOpOrder ["xformOp:translate" "xformOp:scale"]
                          :xformOps {"xformOp:translate" [0 0 0] "xformOp:scale" [1 1 1]}
                          :mesh mesh}]}))))
;; bb task: bb generate --seed 42 --out public/art.json && bb http-server
```
- Wrap result in a single `Xform` with transform = placement. Keep mesh local small (±1) and scale via `Xform` — cheaper for precision + instancing.

### 4.2 Instancing for forests / particles (lean)
- Generate **one prototype mesh** (local) in Clojure/bb → browser draws with `instanceCount` (one GPU buffer + per-instance `pos/ori/scale` buffer). Do **not** bake N copies into one mesh — loses culling and seeds.
- Each instance: `worldInstance = worldPrototype * translate(pos) * rotate(ori) * scale(s)`.
- Lean JSON: `{:proto mesh :instances [{:pos [...] :ori [...] :scale ...}]}` → WGSL `instance_index` reads it. ~2 buffers, not N meshes.

### 4.3 Picking / simple interaction (mouse → world ray)
- Canvas pixel `(px, py)` in **framebuffer coords** (top-left origin, y down) → NDC:
  ```
  ndc.x =  (px / canvasWidth) * 2 - 1
  ndc.y =  (1 - py / canvasHeight) * 2 - 1   // flip y
  ndc.z =  depthSample  // 0..1, or 0 for near plane
  ```
- Unproject: `clip = vec4(ndc.xy, ndc.z, 1)`, then `world = inverse(proj*view) * clip`, `world /= world.w`.
- Ray: `origin = cameraWorld.translation`, `dir = normalize(world - origin)`.

### 4.4 UI / overlay (lean: single HTML)
- Draw UI in **framebuffer space** — 2D canvas layer on top of WebGPU canvas, or second WebGPU pass with orthographic `0..width, 0..height` projection, y down. Do not mix with world NDC.
- Lean: UI lives in same `index.html` as WebGPU pass; Scittle `[:canvas#webgpu]` + `[:div#ui]` overlay. No framework.

---

## 5. USD vs WebGPU cheat sheet

| Concept | USD (authoring) | WebGPU/WGSL (runtime) |
|---|---|---|
| Model space | `UsdGeomXformable` local: `GetLocalTransformation()` | Vertex attribute `position` in local |
| World space | `ComputeLocalToWorldTransform()` on `UsdGeomImageable` | `world = parentWorld * local` in JS/WGSL uniform |
| View space | Camera **world** is authoring only | `view = inverse(cameraWorld)` on CPU |
| Projection | Camera attrs `focalLength`, `horizontalAperture`, `clippingRange` | `mat4.perspectiveZO(...)` built in JS |
| Clip | Not stored | `vec4` in vertex shader `@builtin(position)` |
| NDC | Not stored | `vec3 = clip.xyz/clip.w`, `z 0..1` |
| Screen/pixels | Not stored | Framebuffer top-left, `setViewport` + frag `position` |

---

## 6. What to store vs what to compute — lean

- **Store on disk as USD (share/DCC):** `hierarchy`, `xformOpOrder` + ops, `points`, `normals`, `primvars:st` + `interpolation` meta, `upAxis`/`metersPerUnit`, camera `projection`/aperture/`clippingRange`. Write via bb `write-usda!` (text `usda`, no binary dep).
- **Ship to browser as lean JSON mirror:** same fields as above, but JSON + typed arrays (`art.json` ~KB). No USD parser fetched. `bb generate --out public/art.json` each edit.
- **Compute in browser each frame (single HTML, no lib):** `localToWorld` cache (dirty-flagged), `viewMatrix`, `projectionMatrix (ZO)`, `mvp`, `normalMatrix`, NDC divide + viewport (GPU does last two).
- **Never store:** clip/NDC/screen positions, view/projection matrices, depth remaps.
- **Disk/RAM rule:** keep `public/art.json` < 1MB per piece for 6GB machine; stream large instanced sets, do not bake.

---

## Primary sources used

1. https://openusd.org/release/glossary.html
2. https://openusd.org/release/api/usd_geom_page_front.html (Linear Algebra, UsdGeom basics)
3. https://openusd.org/release/api/class_usd_geom_xformable.html (GetLocalTransformation, xformOpOrder, resetXformStack)
4. https://openusd.org/release/api/class_usd_geom_imageable.html (ComputeLocalToWorldTransform, ComputeWorldBound, BBoxCache)
5. https://openusd.org/release/api/class_usd_geom_camera.html (UsdGeomCamera attributes + UsdGeom_CameraUnits)
6. https://openusd.org/release/api/class_usd_stage.html (GetUpAxis, GetMetersPerUnit)
7. https://openusd.org/release/user_guides/render_user_guide.html#configuring-the-stage-coordinate-system
8. https://openusd.org/release/user_guides/primvars.html (interpolation modes)
9. https://www.w3.org/TR/webgpu/#coordinate-systems (§3.3 NDC/clip/framebuffer/viewport/fragment/texture/window + DirectX match note)
10. https://www.w3.org/TR/webgpu/#primitive-clipping (§23.2.4 clip volume: -w≤x≤w, -w≤y≤w, 0≤z≤w)
11. https://www.w3.org/TR/WGSL/#built-in-values-position (position: clip → NDC via /w, w≠0)
12. https://www.w3.org/TR/WGSL/#built-in-values-clip_distances (clip_distances, array ≤8, enable)
13. https://www.w3.org/TR/webgpu/#dom-gpurenderpassencoder-setviewport (viewport minDepth/maxDepth z remap)
14. https://www.w3.org/TR/webgpu/#dom-gpudepthstencilstate-depthcompare + depthClearValue (near/far mapping)
