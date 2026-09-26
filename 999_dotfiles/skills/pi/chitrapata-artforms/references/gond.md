# Gond — Algorithmic Specification

> Texture Fill Family · Geographic Locus: Dindori & Mandla districts, Madhya Pradesh; Gondwana forest heartland

## Core Algorithm

Silhouette-first hull construction with interior vector-field micro-texture fills (parallel dashes, dots, fish scales, comb marks, wavy lines) and implicit SDF shape blending for cross-species organic morphing.

### Pipeline

1. **Organism Silhouette Hull**: Begin by defining the outer silhouette boundary of the subject (animal, tree, bird, fish) as a smooth closed polygon or spline:
   - Silhouettes are stylized and curvilinear — NOT anatomically realistic.
   - Organic forms: rounded bellies, flowing tails, sweeping antlers, branching canopies.
   - The silhouette is the FIRST decision. Interior fills come AFTER.
2. **Interior Texture Fill via Vector Field Flow**: The defining Gond visual technique — the silhouette interior is NOT flat-colored. Instead, it is filled with dense micro-pattern textures:
   - Generate a 2D vector field within the silhouette boundary (flow directions can be radial, tangential, laminar, or spiral).
   - Along each flow line, stamp a repeating micro-pattern:
     - **Parallel dashes**: Short line segments aligned to flow direction.
     - **Dots**: Regular dot grids or dot chains along flow lines.
     - **Fish scales**: Overlapping semicircular arcs, concavity facing the flow direction.
     - **Comb marks**: Parallel teeth perpendicular to the flow direction.
     - **Wavy lines**: Sinusoidal undulations following the flow.
   - Different organisms (or different body parts) receive DIFFERENT fill textures. This differentiation is how a viewer distinguishes species in a Gond painting.
3. **Cross-Species Morphing (Signature Feature)**: Gond art uniquely depicts organisms that morph between species:
   - A bird's wing transitions into a fish body.
   - A tree trunk becomes a serpent.
   - A deer antler branches into bird heads.
   - **Algorithm**: Use signed distance field (SDF) blending between two organism silhouettes:
     - `SDF_blend(A, B, t) = smooth_union(SDF_A(p), SDF_B(p), blend_radius)`
     - At the blend boundary, interior textures cross-fade: organism A's fill pattern transitions to organism B's pattern.
     - The morph parameter `t` controls where along the body the transition occurs.
4. **Eye Detail**: Gond organisms always have prominent, often oversized eyes:
   - Concentric circles: large outer ring, smaller iris, central pupil dot.
   - Eyes are the emotional anchor of each figure — they face the viewer directly even when the body is in profile.
5. **Background Treatment**: Unlike Madhubani (horror vacui), Gond typically has generous negative space:
   - Background can be bare (paper/canvas color) or a single flat tone.
   - Sparse decorative elements (sun, moon, small plants) placed in background, but NOT densely packed.
6. **Color Application**: Bright, saturated flat fills for background areas within texture patterns. Black outlines on all silhouettes. Individual fill textures can be in contrasting colors.

### Interior Texture Fill Model (Detail)

For a given organism silhouette polygon `S` with a vector field `V(x, y)`:

```
Silhouette boundary
┌────────────────────────────────────┐
│  ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱  │  ← dash fill (flow = horizontal)
│ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ │
│╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱  │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ · · · · · · · · · · · · · · · · · │  ← dot fill
│ · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ ))) ))) ))) ))) ))) ))) ))) ))) ) │  ← fish-scale fill
│))) ))) ))) ))) ))) ))) ))) ))) )) │
│ ))) ))) ))) ))) ))) ))) ))) ))) ) │
└────────────────────────────────────┘
```

Each fill type is parameterized by:
- `spacing`: distance between pattern elements.
- `element-scale`: size of individual dash/dot/scale.
- `flow-field`: the 2D direction field guiding alignment.

### SDF Morphing Model (Detail)

```clojure
;; Signed distance function for shape blending
(defn smooth-union [d1 d2 k]
  (let [h (max 0.0 (min 1.0 (/ (+ 0.5 (/ (- d2 d1) (* 2.0 k))) 1.0)))]
    (- (+ (* d2 (- 1.0 h)) (* d1 h))
       (* k h (- 1.0 h)))))
```

At any point `p`, `SDF_A(p)` gives distance to organism A, `SDF_B(p)` to organism B. Where the blend region occurs, the texture transitions from A's fill pattern to B's.

## Visual Invariants (MUST Hold for Recognition)

1. **Interior micro-texture fills**: Organism interiors are NEVER flat-colored. They MUST contain visible repeating micro-patterns (dashes, dots, fish scales, comb marks, or wavy lines).
2. **Different textures per organism/body-part**: Each organism or body segment uses a distinct fill pattern. A bird's wing fill differs from its body fill.
3. **Prominent oversized eyes**: Every animal/bird has large concentric-circle eyes that face the viewer.
4. **Smooth curvilinear silhouettes**: Outlines are flowing organic curves, not angular or geometric.
5. **Black outlines on all forms**: Every silhouette boundary has a black stroke.
6. **Cross-species morphing allowed**: Organisms may blend into each other. This is a feature, not a bug.
7. **Generous negative space**: Background is NOT densely packed (unlike Madhubani). Some breathing room around figures.
8. **Earth-tone palette**: Colors from natural clay deposits — warm yellows, reds, dark greens, charcoal black.

## State Parameters & Invariants

```clojure
{:organism-count        3         ;; number of distinct organism silhouettes, in [1, 6]
 :organisms             [:bird :deer :tree]  ;; from vocabulary below
 :organism-vocabulary   [:bird :deer :fish :tree :serpent :peacock :turtle :elephant]
 :morph-pairs           [[:bird :deer]]  ;; pairs that morph into each other, subset of organisms
 :morph-blend-radius    0.08      ;; SDF smooth-union radius, in [0.03, 0.15]
 :morph-t               0.5       ;; position along body where morph occurs, in [0.2, 0.8]
 :fill-textures         {:bird :dash :deer :fish-scale :tree :dot}  ;; texture per organism
 :fill-spacing          0.012     ;; distance between pattern elements, in [0.006, 0.025]
 :fill-element-scale    0.008     ;; size of individual pattern element, in [0.004, 0.015]
 :flow-field-type       :radial   ;; :radial, :tangential, :laminar, :spiral
 :eye-radius            0.02      ;; outer eye ring radius, in [0.01, 0.04]
 :eye-rings             3         ;; concentric rings in eye, in [2, 4]
 :silhouette-smoothness 0.12      ;; Catmull-Rom tension for outline splines, in [0.05, 0.25]
 :outline-width         0.005     ;; black contour width, in [0.003, 0.008]
 :bg-color              "#FAF0E6" ;; bare paper background, or flat earth tone
 :palette               [:lampblack :red-ochre :orpiment-yellow :charcoal-black :malachite]}
```

### Parameter Constraints

- `fill-textures` keys must cover all entries in `organisms`.
- `morph-pairs` entries must be subsets of `organisms`.
- `fill-spacing` must be > `2 * fill-element-scale` (elements must not overlap into solid mass).
- Each organism in the composition must have a DIFFERENT fill texture from its neighbors.

## Clojure Pseudocode

```clojure
(ns art.artforms.gond
  "Pure Gond generator. Silhouette hulls + vector-field texture fills + SDF morphing.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn organism-silhouette
  "Generate a smooth closed silhouette for an organism type."
  [org-type center scale rng]
  (let [pts (case org-type
              :bird    (let [s scale]
                         [[(- (center 0) (* s 0.5)) (center 1)]           ;; tail
                          [(- (center 0) (* s 0.3)) (+ (center 1) (* s 0.2))]  ;; back
                          [(center 0) (+ (center 1) (* s 0.25))]           ;; crown
                          [(+ (center 0) (* s 0.3)) (+ (center 1) (* s 0.1))]  ;; breast
                          [(+ (center 0) (* s 0.5)) (center 1)]           ;; beak
                          [(+ (center 0) (* s 0.3)) (- (center 1) (* s 0.15))] ;; belly
                          [(center 0) (- (center 1) (* s 0.2))]           ;; underbody
                          [(- (center 0) (* s 0.3)) (- (center 1) (* s 0.1))]])  ;; tail base
              :deer    (let [s scale]
                         [[(- (center 0) (* s 0.4)) (+ (center 1) (* s 0.5))]  ;; antler top
                          [(- (center 0) (* s 0.1)) (+ (center 1) (* s 0.3))]  ;; head
                          [(+ (center 0) (* s 0.2)) (+ (center 1) (* s 0.15))] ;; back
                          [(+ (center 0) (* s 0.4)) (center 1)]               ;; rump
                          [(+ (center 0) (* s 0.35)) (- (center 1) (* s 0.4))] ;; hind leg
                          [(center 0) (- (center 1) (* s 0.35))]              ;; belly
                          [(- (center 0) (* s 0.3)) (- (center 1) (* s 0.4))]  ;; fore leg
                          [(- (center 0) (* s 0.35)) (center 1)]])             ;; chest
              ;; other organisms follow similar control-point definitions
              (repeat 8 (center)))]
    {:type :silhouette :organism org-type :center center :scale scale
     :points (vec pts)
     :spline-type :catmull-rom-closed}))

(defn vector-field
  "Generate a 2D direction field within a bounding box."
  [field-type bounds]
  (let [[x1 y1 x2 y2] bounds
        cx (/ (+ x1 x2) 2.0) cy (/ (+ y1 y2) 2.0)]
    (fn [x y]
      (case field-type
        :radial    (let [dx (- x cx) dy (- y cy)
                         len (max 0.001 (Math/sqrt (+ (* dx dx) (* dy dy))))]
                     [(/ dx len) (/ dy len)])
        :tangential (let [dx (- x cx) dy (- y cy)
                          len (max 0.001 (Math/sqrt (+ (* dx dx) (* dy dy))))]
                      [(/ (- dy) len) (/ dx len)])
        :laminar   [1.0 0.0]
        :spiral    (let [dx (- x cx) dy (- y cy)
                         len (max 0.001 (Math/sqrt (+ (* dx dx) (* dy dy))))]
                     [(/ (- (+ dx dy)) (* len 1.414))
                      (/ (- dx dy) (* len 1.414))])))))

(defn texture-fill
  "Generate micro-texture fill elements within a silhouette polygon."
  [silhouette-pts texture-type spacing element-scale field-fn color]
  (let [xs (map first silhouette-pts) ys (map second silhouette-pts)
        x1 (apply min xs) x2 (apply max xs)
        y1 (apply min ys) y2 (apply max ys)]
    {:type :texture-fill :texture texture-type
     :primitives
     (vec
       (for [gx (range x1 x2 spacing)
             gy (range y1 y2 spacing)
             :when true]  ;; point-in-polygon check here
         (let [[fx fy] (field-fn gx gy)
               angle (Math/atan2 fy fx)]
           (case texture-type
             :dash       {:type :line
                          :from [(- gx (* element-scale 0.5 (Math/cos angle)))
                                 (- gy (* element-scale 0.5 (Math/sin angle)))]
                          :to   [(+ gx (* element-scale 0.5 (Math/cos angle)))
                                 (+ gy (* element-scale 0.5 (Math/sin angle)))]
                          :stroke color :stroke-width (* element-scale 0.3)}
             :dot        {:type :circle :center [gx gy]
                          :radius (* element-scale 0.4) :fill color}
             :fish-scale {:type :arc :center [gx gy]
                          :radius element-scale
                          :start-angle angle :end-angle (+ angle Math/PI)
                          :stroke color :stroke-width (* element-scale 0.2)}
             :comb       {:type :comb-mark :center [gx gy]
                          :teeth 4 :spacing (* element-scale 0.3)
                          :angle (+ angle (/ Math/PI 2))
                          :stroke color :stroke-width (* element-scale 0.2)}
             :wavy       {:type :sine-segment :center [gx gy]
                          :amplitude (* element-scale 0.3)
                          :wavelength (* element-scale 2)
                          :angle angle :length element-scale
                          :stroke color :stroke-width (* element-scale 0.2)}))))}))

(defn gond-eye
  "Generate the characteristic Gond concentric-circle eye."
  [center radius n-rings]
  {:type :gond-eye :center center
   :rings (mapv (fn [i]
                  (let [r (* radius (/ (- n-rings i) (double n-rings)))]
                    {:type :circle :center center :radius r
                     :fill (if (even? i) "#1A1A1A" "#FAF0E6")
                     :stroke "#1A1A1A" :stroke-width 0.002}))
                (range n-rings))})

(defn generate
  "Pure Gond generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [organism-count organisms morph-pairs morph-blend-radius
                fill-textures fill-spacing fill-element-scale flow-field-type
                eye-radius eye-rings silhouette-smoothness outline-width
                bg-color palette]} params

        ;; Layer 0: background
        bg-layer {:id :background :z-index 0
                  :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0 :fill bg-color}]}

        ;; generate organisms
        organism-data
        (map-indexed
          (fn [i org-type]
            (let [;; distribute organisms across canvas
                  angle (* 2 Math/PI (/ (double i) organism-count))
                  r (if (= organism-count 1) 0.0 0.35)
                  cx (* r (Math/cos angle))
                  cy (* r (Math/sin angle))
                  sil (organism-silhouette org-type [cx cy] 0.35 rng)
                  tex-type (get fill-textures org-type :dash)
                  bounds [(apply min (map first (:points sil)))
                          (apply min (map second (:points sil)))
                          (apply max (map first (:points sil)))
                          (apply max (map second (:points sil)))]
                  field-fn (vector-field flow-field-type bounds)
                  fill (texture-fill (:points sil) tex-type fill-spacing
                                     fill-element-scale field-fn "#1A1A1A")
                  eye-pos [(+ cx 0.08) (+ cy 0.05)]]
              {:silhouette sil :fill fill
               :eye (gond-eye eye-pos eye-radius eye-rings)}))
          organisms)

        ;; organism layers
        org-layers
        (mapcat (fn [i {:keys [silhouette fill eye]}]
                  [{:id (keyword (str "sil-" i)) :z-index (+ 1 (* i 3))
                    :primitives [{:type :stroked-spline :spline silhouette
                                  :stroke "#1A1A1A" :stroke-width outline-width}]}
                   {:id (keyword (str "fill-" i)) :z-index (+ 2 (* i 3))
                    :primitives (:primitives fill)}
                   {:id (keyword (str "eye-" i)) :z-index (+ 3 (* i 3))
                    :primitives (:rings eye)}])
                (range) organism-data)]

    {:seed     seed
     :artform  :gond
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   (into [bg-layer] org-layers)
     :metadata {:artform-family    :texture-fill
                :visual-invariants [:interior-micro-textures :different-textures-per-organism
                                    :prominent-eyes :curvilinear-silhouettes
                                    :black-outlines :cross-species-morphing
                                    :generous-negative-space :earth-tone-palette]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Gond |
|---|---|---|
| Lampblack | `#1A1A1A` | All outlines, micro-texture strokes, eyes |
| Red Ochre / Geru | `#CC5533` | Warm body fills, earth tones |
| Orpiment Yellow / Ramraj | `#E6A817` | Bright accent fills, sun, fruit |
| Charcoal Black | `#2B2B2B` | Deep shadow fills, secondary dark tone |
| Malachite Green | `#1E9E50` | Foliage, forest canopy, secondary cool fill |

## Cultural Guard Rails

- **DO**: Fill every organism interior with visible micro-texture patterns. Flat fills are NOT Gond.
- **DO**: Use DIFFERENT textures for different organisms or body parts. Texture differentiation is how species are distinguished.
- **DO**: Make eyes large, concentric, and facing the viewer. They are the soul of each Gond figure.
- **DO**: Allow cross-species morphing — it is the signature surrealist feature of the Jangarh Kalam tradition.
- **DO NOT**: Use flat solid color fills inside organism silhouettes. That is Madhubani *bharni*, not Gond.
- **DO NOT**: Pack the background with icons (that is Madhubani horror vacui). Gond compositions breathe.
- **DO NOT**: Use geometric/angular silhouettes. Gond forms are always smooth and organic.
- **DO NOT**: Make all organisms use the same fill texture. Monotexture destroys the visual grammar.
