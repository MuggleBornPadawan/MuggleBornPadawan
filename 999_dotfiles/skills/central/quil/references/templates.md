# Quil Templates B-D + Troubleshooting (lazy load)

> Full code for Templates B (static save), C (plotter Chaikin), D (3D p3d/DXF), genartlib, troubleshooting, USD §10.
> Original 419-line skill split — load only when user asks for quil static/plotter/3D code.

See git history for full code if ref empty.


> NOTE: Full Template A (flow field), B, C, D, PCG algorithms (cosine-palette, trace-flow-path, subdivide-rect) were moved here. Load on demand.

---
## 3. Core PCG Algorithms — Full Code (moved from SKILL.md Fix 3A)

### Cosine Color Palettes (Inigo Quilez)
```clojure
(defn cosine-palette [t {:keys [a b c d]}]
  (mapv (fn [ai bi ci di]
          (let [tau (* 2.0 Math/PI)
                val (+ ai (* bi (Math/cos (* tau (+ (* ci t) di)))))]
            (max 0.0 (min 1.0 val))))
        a b c d))
(def neon-palette {:a [0.5 0.5 0.5] :b [0.5 0.5 0.5] :c [1.0 1.0 1.0] :d [0.0 0.33 0.67]})
(def desert-palette {:a [0.5 0.5 0.5] :b [0.5 0.5 0.5] :c [2.0 1.0 0.0] :d [0.5 0.20 0.25]})
```

### 2D Noise Flow Field
```clojure
(defn trace-flow-path [start-x start-y {:keys [steps step-len noise-scale]}]
  (loop [step 0 x (double start-x) y (double start-y) path [[start-x start-y]]]
    (if (>= step steps) path
      (let [angle (* (q/noise (* x noise-scale) (* y noise-scale)) (* 2.0 Math/PI) 2.0)
            nx (+ x (* step-len (Math/cos angle))) ny (+ y (* step-len (Math/sin angle)))]
        (recur (inc step) nx ny (conj path [nx ny]))))))
```

### Recursive Grid Subdivision
```clojure
(defn subdivide-rect [x y w h depth max-depth min-size]
  (let [split? (< (rand) 0.75)]
    (if (or (>= depth max-depth) (< w (* min-size 2)) (< h (* min-size 2)) (not split?))
      [{:x x :y y :w w :h h :depth depth}]
      (let [half-w (/ w 2.0) half-h (/ h 2.0) next-depth (inc depth)]
        (concat
         (subdivide-rect x y half-w half-h next-depth max-depth min-size)
         (subdivide-rect (+ x half-w) y half-w half-h next-depth max-depth min-size)
         (subdivide-rect x (+ y half-h) half-w half-h next-depth max-depth min-size)
         (subdivide-rect (+ x half-w) (+ y half-h) half-w half-h next-depth max-depth min-size))))))
```

See git history for Templates A-D full code.

