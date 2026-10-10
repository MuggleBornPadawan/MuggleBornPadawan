---
name: clojure-webgpu
triggers: [webgpu, wgsl, usd, xformOpOrder, ndc 0..1]
anti-triggers: [threejs webgl only]
description: >-
  Use when rendering browser 3D with WebGPU/WGSL from Clojure/bb, sharing USD-correct art.json (xformOpOrder, local ±1, perspectiveZO 0..1), or fixing NDC/framebuffer/depth bugs.
---

# Clojure WebGPU Skill: Browser USD + WGSL
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill clojure-webgpu
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Use this skill to render `clojure-pcg` pure art in the browser via **WebGPU/WGSL** with USD-correct spaces. No Three.js, no npm, no gl-matrix.

---

## 1. When to Use vs `clojure-threejs`

*   **Use `clojure-webgpu`** when you need USD share, `xformOpOrder`, `local ±1`, long-term asset, or `pcg-spaces` correctness.
*   **Use `clojure-threejs`** when you need quick WebGL `THREE.WebGLRenderer` demo only (`z -1..1`, no USD).
*   Do not mix. WebGL NDC `-1..1` ≠ WebGPU `0..1`.

Requires `pcg-spaces` + `clojure-pcg` (pure `generate`).

---

## 2. Golden Rules (from `pcg-spaces`)

1.  **Model = USD local:** `UsdGeomXformable` + `xformOpOrder` least→most-local, last = applied first. `M=T*R` if `[translate,rotate]`. Do not bake world.
2.  **World = stage:** `world = parentWorld * localToWorld(fromXformOps)`. Handle `!resetXformStack!` + `upAxis`/`metersPerUnit` at root once.
3.  **USD ends after world.** `view = inverse(cameraWorld)`, `clip = projZO * view * world * vec4(pos,1)`, `ndc = clip.xyz/clip.w` is WebGPU only.
4.  **WebGPU = DirectX:** NDC `z 0..1`, clip `0≤z≤w`, framebuffer `(0,0)` top-left y-down, texture `uv (0,0)` top-left. Flip `v=1-v` for `primvars:st`.
5.  **Lean:** No USD parser, no gl-matrix. Inline 4×4 math ~40 lines. `art.json` <1MB `{stage, prims:[{xformOpOrder,xformOps,points,indices,primvars:st}]}`.

Full research: `/home/rgroot/MuggleBornPadawan/999_art/pcg-spaces-usd-webgpu.md`

---

## 3. Pipeline

```
bb generate {:seed 42} → local ±1 points (java.util.Random only)
  → art.json + usda on disk (share)
  → browser JS: fromXformOps → world → view → projZO → mvp
  → WGSL vertex: clip = mvp * vec4(pos,1) → ndc → viewport
```

*   **Store:** hierarchy, `xformOpOrder`+ops, points/normals/`primvars:st`, `upAxis`, camera `focalLength`/`horizontalAperture`/`clippingRange`.
*   **Compute each frame:** `localToWorld`, `view`, `projZO`, `mvp`, `normalMatrix`.
*   **Never store:** clip/NDC/screen, baked matrices.

---

## 4. Template D + Helpers — see `references/helpers.md`
> Single-file index.html + WGSL + inline mat4 moved.
> SKILL.md keeps: When to use (vs threejs), Golden Rules, Pipeline, Gotchas.

## References
- Full template+helpers: `references/helpers.md`

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args
- **Outputs:** concise markdown: table or bullets, no walls
- **Tools allowed:** read, bash, edit, write
- **Stop condition:** verified + confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb
