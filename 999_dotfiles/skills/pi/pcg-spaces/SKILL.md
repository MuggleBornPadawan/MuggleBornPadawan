---
name: pcg-spaces
description: >-
  USD model/world + WebGPU render spaces for PCG visual art. Use when building WebGPU/WGSL browser art from Clojure/bb with USD share, mapping xformOpOrder to world matrices, or handling WebGPU NDC 0..1, clip, framebuffer, and depth.
---

# PCG Spaces — USD + WebGPU

Lean pointer to full research: `/home/rgroot/MuggleBornPadawan/999_art/pcg-spaces-usd-webgpu.md` (20KB, 14 primary sources: openusd.org + W3C WebGPU/WGSL).

Do not copy that file into AGENTS.md. Load this skill only when needed.

## When to Use

- You author PCG in Clojure/bb and render in browser via WebGPU/WGSL.
- You need USD-correct `xformOpOrder` → `GetLocalTransformation()` → `ComputeLocalToWorldTransform()`.
- You hit depth, NDC, or framebuffer y-flip bugs.

## TL;DR — 5 Rules

1. **Model = USD local:** `UsdGeomXformable` + `xformOpOrder` (least-to-most-local, last = applied first). `M = T * R` if order = `[translate, rotate]`. API: `GetLocalTransformation()`.
2. **World = USD stage:** walk hierarchy → `ComputeLocalToWorldTransform()`. Do not store world per prim. Handle `!resetXformStack!` and `upAxis`/`metersPerUnit` once at root.
3. **After world, USD ends.** View → Clip vec4 → NDC vec3 → Framebuffer pixels is WebGPU/GPU only.
4. **WebGPU = DirectX, not GL:** NDC `z 0..1` (not -1..1), clip volume `0 ≤ z ≤ w`, framebuffer `(0,0)` top-left y-down, texture `uv (0,0)` top-left. Flip `v = 1 - v` for USD `primvars:st`.
5. **Lean:** no USD parser in browser, no gl-matrix/npm. Inline 4×4 math (~40 lines). PCG pure fn seeded in bb, browser renders JSON mirror `{stage, prims:[{xformOpOrder, xformOps, points}]}`.

## Pipeline

```
bb/Clojure generate {:seed 42} → {points, indices, primvars} (local ±1)
  → usda on disk (share) + art.json (browser)
  → JS: localToWorld = fromXformOps(order,ops); world = parentWorld * localToWorld
  → view = inverse(cameraWorld); clip = projZO * view * world * vec4(pos,1)
  → GPU: ndc = clip.xyz/clip.w; viewport → pixels (top-left)
```

Helper (inline, no deps): `mul(a,b)`, `invert(m)`, `perspectiveZO(fovy,aspect,near,far)` with `far*nf / far*near*nf`, `fromXformOps(order,ops)` walk reverse, `normalMat3FromMat4`.

## Gotchas

- Use `perspectiveZO` (0..1 depth). `perspectiveNO` (-1..1) breaks WebGPU depth.
- `depthClearValue` in 0..1 + `depthCompare` sets near/far. Reverse-Z: swap near/far in proj (preferred) or `setViewport(…,1,0)`, with `depthClearValue=0, depthCompare="greater"`.
- Camera world is `UsdGeomCamera` Xformable world. `view = inverse(cameraWorld)`, `proj` from `focalLength`/`horizontalAperture`/`clippingRange` (tenths of scene units).
- Picking: `ndc.x = px/W*2-1`, `ndc.y = (1-py/H)*2-1` (flip y), `world = inverse(proj*view)*vec4(ndc,1)`, `world/=w`.

## What to Store vs Compute

- **Store:** hierarchy, `xformOpOrder`+ops, points/normals/`primvars:st`+interpolation, `upAxis`/`metersPerUnit`, camera attrs.
- **Ship:** same as lean JSON (`art.json` <1MB).
- **Compute each frame:** `localToWorld`, `view`, `projZO`, `mvp`, `normalMatrix`.
- **Never store:** clip/NDC/screen, view/proj matrices.

Full details, code, and 14 sources in the file above.
