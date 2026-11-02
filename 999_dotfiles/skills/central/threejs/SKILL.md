---
name: threejs
description: "Build browser 3D with Scittle + Three.js WebGL via pcg router. Use when pcg delegates instanced arrays, geometries, or shaders."
---

# Scittle + Three.js Skill: Browser Procedural 3D Art
## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill threejs
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Build WebGL art without npm — CDN `three` + `scittle` in single `index.html`, serve via `bb serve`.

## 1. Golden Rules
- No build tools — CDN only, saves GB RAM.
- Always `#js {:color 0x00ffcc}` — Clojure maps fail silently.
- Interop: `(.-x (.-position mesh))` / `(set! (.-x (.-position mesh)) 10)`.
- Deterministic PRNG: Mulberry32 (JS `Math.random` not seeded).
- `InstancedMesh` for >500 objects — 20k in one draw call.
- Serve via HTTP `bb serve`, not `file://` (blocks shaders).

## 2. Seeded PRNG Mulberry32 — include pure fn
```clojure
(defn make-prng [seed] (let [s (atom (int seed))] (fn [] (swap! s #(bit-or (+ % 0x6D2B79F5) 0)) (let [t (Math/imul (bit-xor @s (unsigned-bit-shift-right @s 15)) (bit-or @s 1)) t2 (bit-xor t (+ t (Math/imul (bit-xor t (unsigned-bit-shift-right t 7)) (bit-or t 61))))] (/ (double (unsigned-bit-shift-right (bit-xor t2 (unsigned-bit-shift-right t2 14)) 0)) 4294967296.0)))))
```

## 3. Template A: Instanced Field — see `references/templates.md` §3
8000 boxes on spiral, OrbitControls — full HTML in reference. Key: Dummy matrix, `setMatrixAt`, `setColorAt`, `needsUpdate`.

## 4. Templates B-C + Serving — see `references/templates.md`
B=Lorenz attractor BufferGeometry, C=ShaderMaterial vertex/fragment, Serving `bb.edn` http-server — full in ref.

## 5. Troubleshooting — see `references/templates.md` table (6 rows)

## 6. USD — WebGL `z -1..1` ≠ WebGPU `0..1`. Use `webgpu` for USD share.

## References
- Full templates: `references/templates.md`
