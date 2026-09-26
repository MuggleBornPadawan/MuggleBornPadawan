---
name: clojure-webgpu
description: >-
  Use when rendering browser 3D with WebGPU/WGSL from Clojure/bb, sharing USD-correct art.json (xformOpOrder, local ±1, perspectiveZO 0..1), or fixing NDC/framebuffer/depth bugs.
---

# Clojure WebGPU Skill: Browser USD + WGSL

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

## 4. Template D: Single-File WebGPU/WGSL (`public/index.html`)

Reads `art.json` from `clojure-pcg` `bb export`. Copy this as `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>PCG WebGPU</title>
<style>body{margin:0;background:#08080c}canvas{width:100vw;height:100vh;display:block}</style>
</head><body><canvas id="c"></canvas>
<script type="module">
// --- inline 4x4 math (no gl-matrix) ---
const mul=(a,b)=>{const o=new Float32Array(16);for(let i=0;i<4;i++)for(let j=0;j<4;j++){o[j*4+i]=0;for(let k=0;k<4;k++)o[j*4+i]+=a[k*4+i]*b[j*4+k]}return o}
const perspectiveZO=(fovy,aspect,near,far)=>{const f=1/Math.tan(fovy/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0, 0,f,0,0, 0,0,far*nf, -1, 0,0,far*near*nf,0])}
const invert=m=>{const o=new Float32Array(16),a=m,b=o,inv=new Float32Array(16);
 inv[0]=a[5]*a[10]*a[15]-a[5]*a[11]*a[14]-a[9]*a[6]*a[15]+a[9]*a[7]*a[14]+a[13]*a[6]*a[11]-a[13]*a[7]*a[10];
 inv[4]=-a[4]*a[10]*a[15]+a[4]*a[11]*a[14]+a[8]*a[6]*a[15]-a[8]*a[7]*a[14]-a[12]*a[6]*a[11]+a[12]*a[7]*a[10];
 inv[8]=a[4]*a[9]*a[15]-a[4]*a[11]*a[13]-a[8]*a[5]*a[15]+a[8]*a[7]*a[13]+a[12]*a[5]*a[11]-a[12]*a[7]*a[9];
 inv[12]=-a[4]*a[9]*a[14]+a[4]*a[10]*a[13]+a[8]*a[5]*a[14]-a[8]*a[6]*a[13]-a[12]*a[5]*a[10]+a[12]*a[6]*a[9];
 inv[1]=-a[1]*a[10]*a[15]+a[1]*a[11]*a[14]+a[9]*a[2]*a[15]-a[9]*a[3]*a[14]-a[13]*a[2]*a[11]+a[13]*a[3]*a[10];
 inv[5]=a[0]*a[10]*a[15]-a[0]*a[11]*a[14]-a[8]*a[2]*a[15]+a[8]*a[3]*a[14]+a[12]*a[2]*a[11]-a[12]*a[3]*a[10];
 inv[9]=-a[0]*a[9]*a[15]+a[0]*a[11]*a[13]+a[8]*a[1]*a[15]-a[8]*a[3]*a[13]-a[12]*a[1]*a[11]+a[12]*a[3]*a[9];
 inv[13]=a[0]*a[9]*a[14]-a[0]*a[10]*a[13]-a[8]*a[1]*a[14]+a[8]*a[2]*a[13]+a[12]*a[1]*a[10]-a[12]*a[2]*a[9];
 inv[2]=a[1]*a[6]*a[15]-a[1]*a[7]*a[14]-a[5]*a[2]*a[15]+a[5]*a[3]*a[14]+a[13]*a[2]*a[7]-a[13]*a[3]*a[6];
 inv[6]=-a[0]*a[6]*a[15]+a[0]*a[7]*a[14]+a[4]*a[2]*a[15]-a[4]*a[3]*a[14]-a[12]*a[2]*a[7]+a[12]*a[3]*a[6];
 inv[10]=a[0]*a[5]*a[15]-a[0]*a[7]*a[13]-a[4]*a[1]*a[15]+a[4]*a[3]*a[13]+a[12]*a[1]*a[7]-a[12]*a[3]*a[5];
 inv[14]=-a[0]*a[5]*a[14]+a[0]*a[6]*a[13]+a[4]*a[1]*a[14]-a[4]*a[2]*a[13]-a[12]*a[1]*a[6]+a[12]*a[2]*a[5];
 inv[3]=-a[1]*a[6]*a[11]+a[1]*a[7]*a[10]+a[5]*a[2]*a[11]-a[5]*a[3]*a[10]-a[9]*a[2]*a[7]+a[9]*a[3]*a[6];
 inv[7]=a[0]*a[6]*a[11]-a[0]*a[7]*a[10]-a[4]*a[2]*a[11]+a[4]*a[3]*a[10]+a[8]*a[2]*a[7]-a[8]*a[3]*a[6];
 inv[11]=-a[0]*a[5]*a[11]+a[0]*a[7]*a[9]+a[4]*a[1]*a[11]-a[4]*a[3]*a[9]-a[8]*a[1]*a[7]+a[8]*a[3]*a[5];
 inv[15]=a[0]*a[5]*a[10]-a[0]*a[6]*a[9]-a[4]*a[1]*a[10]+a[4]*a[2]*a[9]+a[8]*a[1]*a[6]-a[8]*a[2]*a[5];
 const det=a[0]*inv[0]+a[1]*inv[4]+a[2]*inv[8]+a[3]*inv[12]; if(Math.abs(det)<1e-12) return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
 const d=1/det; for(let i=0;i<16;i++) o[i]=inv[i]*d; return o}
function fromXformOps(order,ops){ // USD GetLocalTransformation: reverse walk
  let M=new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
  for(let i=order.length-1;i>=0;i--){const op=ops[order[i]]; let T=M;
    if(op.translate) {const t=op.translate, Tm=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,t[0],t[1],t[2],1]); T=mul(Tm,T)}
    if(op.rotateXYZ){const [rx,ry,rz]=op.rotateXYZ.map(v=>v*Math.PI/180); const cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry),cz=Math.cos(rz),sz=Math.sin(rz);
     const Rx=new Float32Array([1,0,0,0,0,cx,sx,0,0,-sx,cx,0,0,0,0,1]), Ry=new Float32Array([cy,0,-sy,0,0,1,0,0,sy,0,cy,0,0,0,0,1]), Rz=new Float32Array([cz,sz,0,0,-sz,cz,0,0,0,0,1,0,0,0,0,1]);
     const R=mul(Rz,mul(Ry,Rx)); T=mul(R,T)}
    if(op.scale){const s=op.scale, Sm=new Float32Array([s[0],0,0,0,0,s[1],0,0,0,0,s[2],0,0,0,0,1]); T=mul(Sm,T)}
    M=T}
  return M
}
async function loadArt(){const r=await fetch('./art.json');return r.json()}
async function init(){
  const art=await loadArt();
  const canvas=document.getElementById('c'); canvas.width=innerWidth; canvas.height=innerHeight;
  const adapter=await navigator.gpu.requestAdapter(); const device=await adapter.requestDevice();
  const ctx=canvas.getContext('webgpu'); const format=navigator.gpu.getPreferredCanvasFormat();
  ctx.configure({device,format,alphaMode:'opaque'});
  const shader=`@vertex fn vs(@location(0) pos:vec3f, @builtin(instance_index) idx:u32)->@builtin(position) vec4f {
    // mvp uniform would be here; simplified
    return vec4f(pos,1.0);
  } @fragment fn fs()->@location(0) vec4f {return vec4f(0.2,0.8,1.0,1.0);}`;
  const module=device.createShaderModule({code:shader});
  // pipeline, buffers, uniform mvp = projZO * view * world, draw...
}
init();
</script></body></html>
```

> Full `invert` + `rotateXYZ` now inline (no stub). Keep `v=1-v` when building `primvars:st` buffer. For `xformOp:rotateX/Y/Z` or `xformOp:orient` see `pcg-spaces` doc.

Serve: `bb serve` (`babashka/http-server` port 8000) — do not use `file://`.

---

## 5. Generate (Pure) — from `clojure-pcg`

```clojure
(ns art.generate)
(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))
(defn generate [{:keys [seed params]}]
  (let [rnd (make-rng seed) {:keys [n]} params]
    {:points (for [i (range n)] (let [t (/ i (double n)) a (* t Math/PI 2 5)] [(* 0.8 (Math/cos a)) (* 0.8 (Math/sin a)) 0.0]))
     :xformOpOrder ["xformOp:translate" "xformOp:scale"]
     :xformOps {"xformOp:translate" {:translate [0 0 0]} "xformOp:scale" {:scale [1 1 1]}}}))
```

Export: `art/export.clj` → `public/art.json` + `usda`. See `clojure-pcg` `bb.edn` tasks `export` + `serve`.

---

## 6. Gotchas

*   Use `perspectiveZO` (`far*nf`, `far*near*nf`). `perspectiveNO` breaks depth (WebGPU `0≤z≤w`).
*   `depthClearValue` `0..1`, `depthCompare` `less` (or reverse-Z: swap near/far, `clear 0`, `greater`).
*   Camera: `view = inverse(cameraWorld)` where `cameraWorld = ComputeLocalToWorldTransform(cameraXform)`. `proj` from `focalLength`/`horizontalAperture`/`clippingRange`.
*   Picking: `ndc.x = px/W*2-1`, `ndc.y = (1-py/H)*2-1` (flip y), `world = inverse(proj*view)*vec4(ndc,1)`, `world/=w`.

---

## 7. Troubleshooting

| Symptom | Cause | Fix |
| :--- | :--- | :--- |
| Canvas black, `navigator.gpu is undefined` | Browser not WebGPU | Use Chrome 113+ / Edge, enable `chrome://flags/#enable-unsafe-webgpu`. |
| Depth fighting / far clip | Used `perspectiveNO` | Switch to `perspectiveZO` `0..1`. |
| UV upside down | USD `primvars:st` top-left | Flip `v=1-v` in JS or WGSL. |
| CORS on `art.json` | Opened via `file://` | `bb serve` + `http://localhost:8000`. |
| World double-scaled | Baked world + `fromXformOps` | Store local `±1` only, compute world each frame. |

---

## 8. Checklist

- [ ] `generate` has no `quil`/`raylib`/`js` imports, seed logs
- [ ] `art.json` <1MB, local `±1`
- [ ] Browser inlines `mul/invert/perspectiveZO/fromXformOps`, no deps
- [ ] `v=1-v` for `primvars:st`
