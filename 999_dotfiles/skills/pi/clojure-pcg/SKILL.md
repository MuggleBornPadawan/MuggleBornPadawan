---
name: clojure-pcg
description: "One pure Clojure PCG core rendered via Quil, Raylib, and WebGPU/WGSL. Use when you want a single seeded generate function to preview in Quil, run real-time in Raylib, and export JSON for browser WebGPU from the same data."
---

# Clojure PCG — One Generate, Three Renders

Compose `clojure-quil` + `clojure-raylib` + `clojure-webgpu` + `pcg-spaces`. `clojure-threejs` is WebGL-only preview — not USD. Do not duplicate. This skill is the glue.

## When to Use

- Single `generate` fn → Quil (quick preview) + Raylib (real-time) + WebGPU (browser) from same data.
- Seeded, deterministic art where all three show same result.

## Golden Rule

**Generate is pure.** No `q/*`, no `raylib/*`, no JS in `art.generate`. Only `java.util.Random` / pure math + params. Renderers map data to their own spaces.

## Layout

```
deps.edn               ; quil, raylib-clj, data.json
bb.edn                 ; tasks below
src/art/generate.clj   ; pure: (generate {:seed 42 :params {...}}) -> {:points [...] :indices [...] :colors [...]}
src/art/render_quil.clj   ; uses quil skill (§10)
src/art/render_raylib.clj ; uses raylib skill (§8)
src/art/export.clj     ; -> public/art.json (for WebGPU)
public/index.html      ; single-file WebGPU/WGSL, reads art.json, no npm (see clojure-webgpu Template D)
MuggleBornPadawan/999_art/pcg-spaces-usd-webgpu.md ; spaces reference (via pcg-spaces skill)
```

## Generate — Pure (copy this)

```clojure
(ns art.generate)
(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))
(defn generate [{:keys [seed params]}]
  (let [rnd (make-rng seed)
        {:keys [n scale]} params]
    {:points (for [i (range n)]
               (let [t (/ i (double n)) a (* t Math/PI 2 5)]
                 [(* scale (Math/cos a)) (* scale (Math/sin a))]))
     :colors [] :indices []}))
```

Keep local coords ±1. Log seed with output. Params map for REPL tuning.

## Render A — Quil (preview)

- See `clojure-quil` skill. Fun-mode, `#'setup` vars, `q/no-loop` for static.
- `(draw-points (:points (generate opts)))` — map ±1 → pixels via `w`/`h`.

## Render B — Raylib (real-time)

- See `clojure-raylib` skill. Panama FFM, no `-XstartOnFirstThread` on Linux.
- Draw mesh/points in 3D world. 60 FPS, handles 10k+ instances.

## Render C — WebGPU (browser)

- See `clojure-webgpu` skill (renderer) + `pcg-spaces` skill (spaces) for correct pipeline.
- `bb.edn` task `export` writes `public/art.json` `{stage, prims:[{xformOpOrder,xformOps,mesh}]}`.
- `index.html` inline WGSL + JS (~40 lines mat4, `perspectiveZO` 0..1 depth, top-left framebuffer). `bb http-server` to serve. No USD parser, no gl-matrix.

Spaces: Model=`GetLocalTransformation()`, World=`ComputeLocalToWorldTransform()`, Clip `vec4`, NDC `z 0..1`, Framebuffer top-left y-down. Flip `v=1-v` for UVs.

## bb.edn Tasks

```clojure
{:tasks
 {generate:quil  {:doc "Quil preview" :task (clojure "-M -m art.render-quil")}
  generate:raylib {:doc "Raylib window" :task (clojure "-M -m art.render-raylib")}
  export          {:doc "Write public/art.json" :task (clojure "-M -m art.export/write-json!")}
  serve           {:doc "Serve WebGPU" :extra-deps {babashka/http-server {:mvn/version "0.1.13"}} :exec-fn babashka.http-server/exec :exec-args {:port 8000 :dir "public"}}}}
```

Run: `bb generate:quil --seed 42` → `bb generate:raylib --seed 42` → `bb export --seed 42 && bb serve`

## Checklist

- [ ] `generate` has no renderer imports
- [ ] Same seed gives same `art.json` + Quil + Raylib output
- [ ] `art.json` <1MB, local ±1, world scale via Xform
- [ ] WebGPU uses `perspectiveZO` (not NO), handles `upAxis`
