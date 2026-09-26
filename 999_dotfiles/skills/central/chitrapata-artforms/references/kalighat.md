# Kalighat — Algorithmic Specification

> Calligraphic Stroke Family · Geographic Locus: Calcutta (Kolkata), Bengal Presidency

## Core Algorithm

Pressure-modulated calligraphic spline strokes with one-sided normal-vector volumetric shading on a blank canvas.

### Pipeline

1. **Blank Canvas**: Start with a completely empty background. Zero horizon line, zero perspective grid, zero landscape elements. Kalighat figures float in void — this is not a bug, it is the defining compositional rule.
2. **Figure Silhouette as Stroke Sequence**: Define each figure as an ordered sequence of calligraphic stroke paths. Each stroke is a cubic Bézier or Catmull-Rom spline representing one continuous brush movement (arm, torso contour, sari drape, fish body, cat spine).
3. **Pressure-Width Modulation**: Along each stroke spline, modulate the rendered width using a pressure envelope function `w(t)`. This simulates the loaded brush: thick where pressure is high (mid-stroke), tapering to fine points at entry and exit. The envelope is typically a bell curve or parabolic profile.
4. **Tangent & Normal Computation**: At each sample point along the spline, compute the tangent vector `T(t) = dC/dt` and the perpendicular normal vector `N(t)`. The normal defines the direction of volumetric shading.
5. **One-Sided Normal Shading (Key Technique)**: Apply a wash gradient extending from the stroke contour outward along `N(t)` on ONE side only. The wash fades from the stroke color to the background color over a fixed perpendicular distance `d_wash`. This creates the illusion of 3D volume from a flat 2D stroke — the signature Kalighat visual effect.
   - The "shaded side" is chosen per stroke and remains consistent along the entire curve length.
   - Shade side convention: For body contours, shade toward the body interior (convex side).
6. **Flat Interior Fills**: Large body areas enclosed by strokes receive flat solid color fills — typically a single warm hue (ochre, yellow, or red). No gradients within fills, only at contour boundaries.
7. **Minimal Detail Accents**: Eyes, jewelry, and facial features are rendered as small, precise, secondary strokes with narrower width envelopes and no wash shading.
8. **Composition Constraint**: Maximum 1–3 figures per canvas. Generous negative space surrounds the figure(s). The figure occupies roughly 40–70% of the canvas area.

### The One-Sided Shading Model (Detail)

This is the most computationally distinctive feature of Kalighat:

```
    Stroke contour (thick line)
    ──────────────────────────────
    │                            │
    │  Wash gradient fades       │  ← shaded side (ONE side only)
    │  from stroke color         │
    │  toward background         │
    │  over distance d_wash      │
    │                            │
    ──────────────────────────────
                                    ← unshaded side (hard edge, no gradient)
```

For each sample point `p(t)` on the stroke:
- Shaded side pixel at distance `d` from contour: `color = lerp(stroke_color, bg_color, d / d_wash)`
- Unshaded side: hard edge, no gradient whatsoever.

## Visual Invariants (MUST Hold for Recognition)

1. **Blank background**: Zero ground plane, zero perspective, zero decorative background elements. Pure empty space.
2. **Bold continuous contour strokes**: Each major body contour is a single sweeping curve, not an assembly of short segments.
3. **Variable stroke width**: Strokes must be thick in the middle and taper at both ends. Uniform-width strokes are NOT Kalighat.
4. **One-sided volumetric wash**: Shading gradient extends on exactly one side of each contour. Both-sided shading = NOT Kalighat. No shading at all = NOT Kalighat.
5. **Flat interior fills**: Body interiors are solid flat color. No interior gradients, textures, or patterns.
6. **Minimal composition**: 1–3 figures maximum. Large negative space.
7. **No fine detail in backgrounds**: All visual weight is in the figure strokes. Background is absolutely empty.

## State Parameters & Invariants

```clojure
{:figure-count          1         ;; in [1, 3]
 :figure-scale          0.6       ;; fraction of canvas occupied, in [0.4, 0.7]
 :stroke-count          8         ;; major contour strokes per figure, in [5, 15]
 :stroke-samples        40        ;; sample points per spline, in [20, 80]
 :pressure-profile      :bell     ;; :bell, :parabolic, :asymmetric — width envelope shape
 :stroke-width-max      0.025     ;; maximum width at peak pressure, in [0.015, 0.04]
 :stroke-width-min      0.003     ;; minimum width at stroke ends, in [0.001, 0.005]
 :wash-distance         0.06      ;; perpendicular fade distance for one-sided shading, in [0.03, 0.12]
 :wash-opacity-start    0.7       ;; opacity at contour edge, in [0.5, 0.9]
 :shade-side            :interior ;; :interior (convex body side) or :exterior
 :fill-color            "#E3A857" ;; flat interior fill (turmeric yellow default)
 :contour-color         "#1A1A1A" ;; lampblack stroke color
 :wash-color            "#1A1A1A" ;; wash gradient base (same as contour, fades to bg)
 :bg-color              "#FAF0E6" ;; conch white background
 :accent-stroke-width   0.008     ;; width for eyes, jewelry, fine detail, in [0.004, 0.012]
 :palette               [:lampblack :turmeric-yellow :vermilion :conch-white :chalk-dust]}
```

## Clojure Pseudocode

```clojure
(ns art.artforms.kalighat
  "Pure Kalighat generator. Calligraphic strokes + one-sided shading.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn cubic-bezier
  "Evaluate cubic Bézier spline at parameter t."
  [[p0 p1 p2 p3] t]
  (let [u (- 1.0 t)]
    [(+ (* u u u (p0 0)) (* 3 u u t (p1 0)) (* 3 u t t (p2 0)) (* t t t (p3 0)))
     (+ (* u u u (p0 1)) (* 3 u u t (p1 1)) (* 3 u t t (p2 1)) (* t t t (p3 1)))]))

(defn spline-tangent
  "Tangent vector dC/dt at parameter t on cubic Bézier."
  [[p0 p1 p2 p3] t]
  (let [u (- 1.0 t)]
    [(+ (* -3 u u (p0 0)) (* 3 (- 1 (* 3 t)) u (p1 0))
        (* 3 t (- 2 (* 3 t)) (p2 0)) (* 3 t t (p3 0)))
     (+ (* -3 u u (p0 1)) (* 3 (- 1 (* 3 t)) u (p1 1))
        (* 3 t (- 2 (* 3 t)) (p2 1)) (* 3 t t (p3 1)))]))

(defn normal-vec
  "Perpendicular normal to a 2D tangent vector (rotate 90° CCW)."
  [[tx ty]]
  (let [len (Math/sqrt (+ (* tx tx) (* ty ty)))]
    [(/ (- ty) len) (/ tx len)]))

(defn pressure-width
  "Stroke width at parameter t given a bell-curve pressure envelope."
  [t w-min w-max]
  (let [bell (* 4.0 t (- 1.0 t))]  ;; peaks at t=0.5, zero at t=0 and t=1
    (+ w-min (* bell (- w-max w-min)))))

(defn calligraphic-stroke
  "Generate a single calligraphic stroke with pressure width and one-sided wash."
  [control-points params]
  (let [{:keys [stroke-samples stroke-width-min stroke-width-max
                wash-distance wash-opacity-start contour-color shade-side]} params
        ts (mapv #(/ (double %) stroke-samples) (range (inc stroke-samples)))]
    {:type :calligraphic-stroke
     :spine (mapv #(cubic-bezier control-points %) ts)
     :widths (mapv #(pressure-width % stroke-width-min stroke-width-max) ts)
     :normals (mapv #(normal-vec (spline-tangent control-points %)) ts)
     :shade-side shade-side
     :wash-distance wash-distance
     :wash-opacity-start wash-opacity-start
     :stroke-color contour-color}))

(defn figure-contour-strokes
  "Generate the major contour strokes for a figure silhouette.
   Each stroke is defined by 4 control points (cubic Bézier)."
  [figure-center figure-scale stroke-count rng]
  ;; Generate anatomically plausible contour arcs
  ;; Each stroke is a sweeping arc representing one body segment
  (let [spread (* figure-scale 0.4)]
    (mapv (fn [i]
            (let [angle-base (* 2 Math/PI (/ i (double stroke-count)))
                  r1 (* spread (+ 0.6 (* 0.4 (rng))))
                  r2 (* spread (+ 0.6 (* 0.4 (rng))))
                  p0 [(+ (figure-center 0) (* r1 (Math/cos angle-base)))
                      (+ (figure-center 1) (* r1 (Math/sin angle-base)))]
                  p3 [(+ (figure-center 0) (* r2 (Math/cos (+ angle-base (* 0.8 (/ Math/PI stroke-count))))))
                      (+ (figure-center 1) (* r2 (Math/sin (+ angle-base (* 0.8 (/ Math/PI stroke-count))))))]
                  ;; control points biased outward for sweeping arcs
                  mid-angle (+ angle-base (* 0.4 (/ Math/PI stroke-count)))
                  bulge (* spread 0.3 (+ 0.5 (rng)))
                  p1 [(+ (/ (+ (p0 0) (p3 0)) 2.0) (* bulge (Math/cos mid-angle)))
                      (+ (/ (+ (p0 1) (p3 1)) 2.0) (* bulge (Math/sin mid-angle)))]
                  p2 [(+ (/ (+ (p0 0) (p3 0)) 2.0) (* bulge 0.8 (Math/cos mid-angle)))
                      (+ (/ (+ (p0 1) (p3 1)) 2.0) (* bulge 0.8 (Math/sin mid-angle)))]]
              [p0 p1 p2 p3]))
          (range stroke-count))))

(defn generate
  "Pure Kalighat generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [figure-count figure-scale stroke-count fill-color
                contour-color bg-color accent-stroke-width palette]} params

        ;; Layer 0: blank background
        bg-layer {:id :background :z-index 0
                  :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0 :fill bg-color}]}

        ;; Generate figures
        figure-centers (case (int figure-count)
                         1 [[0.0 0.0]]
                         2 [[-0.3 0.0] [0.3 0.0]]
                         3 [[-0.4 0.0] [0.0 0.1] [0.4 0.0]])

        figure-layers
        (mapcat
          (fn [fig-idx center]
            (let [control-pts (figure-contour-strokes center figure-scale stroke-count rng)
                  strokes (mapv #(calligraphic-stroke % params) control-pts)]
              ;; flat fill layer (behind strokes)
              [{:id (keyword (str "fill-" fig-idx)) :z-index (+ 1 (* fig-idx 3))
                :primitives [{:type :closed-fill
                              :boundary (mapcat :spine strokes)
                              :fill fill-color}]}
               ;; contour stroke layer
               {:id (keyword (str "contour-" fig-idx)) :z-index (+ 2 (* fig-idx 3))
                :primitives (vec strokes)}
               ;; detail accent layer (eyes, jewelry)
               {:id (keyword (str "accent-" fig-idx)) :z-index (+ 3 (* fig-idx 3))
                :primitives [{:type :accent-marks :center center
                              :stroke-width accent-stroke-width
                              :color contour-color}]}]))
          (range figure-count) figure-centers)]

    {:seed     seed
     :artform  :kalighat
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   (into [bg-layer] figure-layers)
     :metadata {:artform-family    :calligraphic-stroke
                :visual-invariants [:blank-background :bold-continuous-strokes
                                    :variable-stroke-width :one-sided-wash
                                    :flat-interior-fills :minimal-composition
                                    :no-background-detail]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Kalighat |
|---|---|---|
| Lampblack | `#1A1A1A` | All contour strokes and wash base color |
| Turmeric Yellow | `#E3A857` | Primary flat interior fill (skin, garment) |
| Vermilion | `#E34234` | Accent details — lips, bindis, border of saris |
| Conch White | `#FAF0E6` | Background canvas color |
| Chalk Dust | `#D3D3D3` | Secondary muted fill for fabric folds |

## Cultural Guard Rails

- **DO**: Make strokes bold, sweeping, and confident. Hesitant or sketchy lines are not Kalighat.
- **DO**: Leave generous empty space around figures. The void is compositionally essential.
- **DO**: Apply volumetric wash shading on exactly one side of each contour stroke.
- **DO NOT**: Add background scenery, perspective grids, or decorative patterns behind figures.
- **DO NOT**: Use both-sided gradient shading (that is academic figure drawing, not Kalighat).
- **DO NOT**: Use fine cross-hatching or stippling for volume. Volume comes ONLY from one-sided wash.
- **DO NOT**: Render more than 3 figures per composition.
