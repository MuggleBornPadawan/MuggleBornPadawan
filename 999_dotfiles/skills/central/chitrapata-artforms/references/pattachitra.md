# Pattachitra — Algorithmic Specification

> Narrative Scroll Family · Geographic Locus: Raghurajpur & Puri, Odisha; West Bengal (Midnapore)

## Core Algorithm

Nested concentric rectangular border subdivision with a central iconic figure constructed from canonical Odia proportional rules.

### Pipeline

1. **Concentric Border Tiers**: Subdivide the `[-1, 1]` canvas into nested concentric rectangular frames. Each tier is an inward-stepping rectangular band with its own decorative fill pattern. Tiers alternate between floral vine borders and narrow geometric borders.
2. **Border Motif Assignment**: Each border tier receives a repeating motif generator:
   - *Floral Tier*: Continuous vine with alternating lotus buds and full blooms, connected by smooth sinusoidal stems. Period `p_floral`.
   - *Geometric Tier*: Narrow band filled with dot rows, dash rows, or alternating color blocks. Period `p_geo`.
   - *Outermost Tier*: Simple double-line frame with corner rosettes.
3. **Inner Scene Panel**: The innermost rectangle is the narrative scene panel. This contains the central iconic figure(s) and any attendant figures or symbolic props.
4. **Central Figure Construction**: The primary figure is built from a canonical skeletal proportion system:
   - **Head Unit (`tala`)**: The head height defines the base measurement unit. Total figure height = `n_tala` head units (typically 7–9 tala for divine figures, 5–6 for humans).
   - **Padma Chokh (Lotus Eyes)**: Elongated almond-shaped eyes extending nearly to the ear line. Eye width ≈ 0.7 × head width. Inner corner pointed, outer corner swept upward.
   - **Sharp Chin**: Triangular chin terminating in a narrow point. Chin angle ≈ 50–65°.
   - **Profile Contour**: Figures are rendered in a specific three-quarter stylized view — not full frontal, not full profile. The visible eye is drawn in full, the far eye is partially visible or omitted.
   - **Tribhanga Posture**: The three-bend S-curve pose — head tilts one direction, torso shifts opposite, hip counters again. Defined by three angular offsets from the vertical axis.
5. **Dense Surface Ornamentation**: Every surface within the bordered panel must be decorated. Garments receive pattern fills (dots, stripes, floral prints). Jewelry is rendered as geometric chains. Crown/headdress has tiered architectural geometry.
6. **Color Application**: Strict limited palette using traditional Pattachitra pigments. Colors are flat and opaque. Black outlines define every shape boundary.

### Border Subdivision Geometry (Detail)

```
┌─────────────────────────────────────────────┐  ← Tier 0: double-line outer frame
│ ┌─────────────────────────────────────────┐ │  ← Tier 1: floral vine border
│ │ ┌─────────────────────────────────────┐ │ │  ← Tier 2: narrow geometric border
│ │ │ ┌─────────────────────────────────┐ │ │ │  ← Tier 3: floral vine border (diff motif)
│ │ │ │ ┌─────────────────────────────┐ │ │ │ │  ← Tier 4: narrow geometric border
│ │ │ │ │                             │ │ │ │ │
│ │ │ │ │    CENTRAL SCENE PANEL      │ │ │ │ │  ← Inner panel: iconic figure
│ │ │ │ │    (deity / narrative)       │ │ │ │ │
│ │ │ │ │                             │ │ │ │ │
│ │ │ │ └─────────────────────────────┘ │ │ │ │
│ │ │ └─────────────────────────────────┘ │ │ │
│ │ └─────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

Each tier has uniform width `w_tier[i]`. The inner panel dimensions are:
```
inner_w = 2.0 - 2 * sum(w_tier[0..n])
inner_h = 2.0 - 2 * sum(w_tier[0..n])
```

## Visual Invariants (MUST Hold for Recognition)

1. **Multiple nested rectangular borders**: Minimum 3 border tiers. Borders are RECTANGULAR (not circular, not oval).
2. **Alternating border types**: Floral and geometric tiers must alternate. Two adjacent floral tiers is incorrect.
3. **Central iconic figure**: One dominant deity or mythological figure occupies the inner panel center. The figure is always the visual focal point.
4. **Padma chokh lotus eyes**: Eyes must be elongated almonds, extending well past the midline of the face. This is the single most recognizable Pattachitra feature.
5. **Sharp pointed chin**: Triangular chin termination. Rounded chins are NOT Pattachitra.
6. **Black outline on everything**: Every shape boundary — borders, figures, ornaments — has a black (`#1A1A1A`) contour stroke.
7. **Dense ornamentation**: Zero empty surfaces within the bordered area. All garments, backgrounds, and props carry decorative pattern fills.
8. **Flat opaque colors**: No gradients, no transparency, no wash effects.

## State Parameters & Invariants

```clojure
{:border-tier-count     5         ;; in [3, 7] — number of nested border frames
 :tier-widths           [0.04 0.08 0.03 0.07 0.03]  ;; width of each tier, in [0.02, 0.12]
 :tier-types            [:line :floral :geo :floral :geo]  ;; must alternate floral/geo
 :floral-period         0.08      ;; repetition period for floral vine motifs, in [0.04, 0.15]
 :floral-motif          :lotus     ;; :lotus, :vine-bud, :leaf-chain
 :geo-pattern           :dot-row   ;; :dot-row, :dash-row, :block-alt
 :geo-period            0.03       ;; repetition period for geometric fills, in [0.015, 0.06]
 :figure-tala           8          ;; head-unit proportion count, in [5, 9]
 :eye-width-ratio       0.7        ;; padma chokh width / head width, in [0.6, 0.8]
 :chin-angle            55.0       ;; degrees of chin point, in [45, 70]
 :tribhanga-offsets     [8.0 -12.0 10.0]  ;; head tilt, torso shift, hip counter (degrees)
 :figure-scale          0.7        ;; figure height / inner panel height, in [0.5, 0.85]
 :garment-pattern       :dots      ;; :dots, :stripes, :floral-print, :plain
 :outline-width         0.004      ;; black contour stroke width, in [0.002, 0.008]
 :palette               [:conch-white :lampblack :orpiment-yellow :cinnabar-red]}
```

### Parameter Constraints

- `tier-types` must alternate between `:floral` and `:geo` (first tier may be `:line`).
- `sum(tier-widths)` must be < 0.4 (otherwise inner panel becomes too small).
- `figure-tala` for divine figures: 7–9. For human/attendant figures: 5–6.
- `tribhanga-offsets` must form an S-curve: signs should alternate `[+, -, +]` or `[-, +, -]`.

## Clojure Pseudocode

```clojure
(ns art.artforms.pattachitra
  "Pure Pattachitra generator. Nested borders + canonical figure.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn nested-border-rects
  "Generate concentric rectangular border geometries.
   Returns [{:inner [x1 y1 x2 y2] :outer [x1 y1 x2 y2] :type :floral ...} ...]"
  [tier-widths tier-types]
  (loop [i 0, offset 0.0, acc []]
    (if (>= i (count tier-widths)) acc
      (let [w (nth tier-widths i)
            outer-x (- 1.0 offset) outer-y (- 1.0 offset)
            inner-x (- outer-x w) inner-y (- outer-y w)]
        (recur (inc i) (+ offset w)
               (conj acc {:tier-idx i
                          :outer [(- outer-x) (- outer-y) outer-x outer-y]
                          :inner [(- inner-x) (- inner-y) inner-x inner-y]
                          :width w
                          :type (nth tier-types i)}))))))

(defn floral-border-fill
  "Generate repeating floral motif primitives along a rectangular band."
  [outer inner period motif-type palette rng]
  (let [[ox1 oy1 ox2 oy2] outer
        perimeter (* 2 (+ (- ox2 ox1) (- oy2 oy1)))
        n-motifs (int (/ perimeter period))]
    {:type :border-fill :motif motif-type
     :primitives
     (mapv (fn [i]
             (let [t (/ (double i) n-motifs)
                   ;; walk around perimeter at parameter t
                   pos (cond
                         (< t 0.25) [(+ ox1 (* 4 t (- ox2 ox1))) oy2]     ;; top edge
                         (< t 0.50) [ox2 (- oy2 (* 4 (- t 0.25) (- oy2 oy1)))] ;; right edge
                         (< t 0.75) [(- ox2 (* 4 (- t 0.50) (- ox2 ox1))) oy1] ;; bottom edge
                         :else      [ox1 (+ oy1 (* 4 (- t 0.75) (- oy2 oy1)))])] ;; left edge
               {:type :floral-stamp :center pos :scale (* 0.8 (:width (meta inner)))
                :motif motif-type :fill (nth palette (mod i (count palette)))}))
           (range n-motifs))}))

(defn geo-border-fill
  "Generate repeating geometric pattern along a rectangular band."
  [outer inner period pattern palette]
  (let [[ox1 oy1 ox2 oy2] outer
        n (int (/ (* 2 (+ (- ox2 ox1) (- oy2 oy1))) period))]
    {:type :geo-fill :pattern pattern
     :primitives
     (mapv (fn [i]
             {:type pattern :index i
              :fill (nth palette (mod i (count palette)))})
           (range n))}))

(defn padma-chokh-eye
  "Generate the canonical lotus eye geometry."
  [eye-center head-width eye-width-ratio]
  (let [w (* head-width eye-width-ratio 0.5)
        h (* w 0.3)]  ;; height is much less than width
    {:type :padma-chokh
     :center eye-center
     :inner-corner [(- (eye-center 0) w) (eye-center 1)]
     :outer-corner [(+ (eye-center 0) w) (+ (eye-center 1) (* h 0.2))]  ;; swept upward
     :upper-arc-h h
     :lower-arc-h (* h 0.6)
     :pupil-center eye-center
     :pupil-radius (* h 0.35)
     :fill "#1A1A1A"}))

(defn canonical-figure
  "Generate the central iconic figure using tala proportions and tribhanga pose."
  [center panel-h params rng]
  (let [{:keys [figure-tala eye-width-ratio chin-angle tribhanga-offsets
                figure-scale garment-pattern palette]} params
        fig-h  (* panel-h figure-scale)
        tala-h (/ fig-h figure-tala)
        head-w (* tala-h 0.85)
        [head-tilt torso-shift hip-counter] tribhanga-offsets

        ;; head position (topmost tala unit)
        head-center [(+ (center 0) (* tala-h 0.1 (Math/sin (Math/toRadians head-tilt))))
                     (+ (center 1) (/ fig-h 2.0) (- (/ tala-h 2.0)))]

        ;; eye positions within head
        eye-y (+ (head-center 1) (* tala-h 0.05))
        left-eye  (padma-chokh-eye [(- (head-center 0) (* head-w 0.15)) eye-y]
                                    head-w eye-width-ratio)
        right-eye (padma-chokh-eye [(+ (head-center 0) (* head-w 0.15)) eye-y]
                                    head-w eye-width-ratio)

        ;; chin point
        chin-point [(head-center 0)
                    (- (head-center 1) (* tala-h 0.55))]

        ;; body segments via tribhanga S-curve
        torso-center [(+ (center 0) (* tala-h 0.15 (Math/sin (Math/toRadians torso-shift))))
                      (center 1)]
        hip-center   [(+ (center 0) (* tala-h 0.12 (Math/sin (Math/toRadians hip-counter))))
                      (- (center 1) (* fig-h 0.25))]]

    {:type :canonical-figure
     :tala-count figure-tala
     :head {:center head-center :width head-w :height tala-h
            :eyes [left-eye right-eye]
            :chin chin-point :chin-angle chin-angle
            :crown {:type :tiered-crown :height (* tala-h 0.6) :tiers 3}}
     :body {:torso-center torso-center :hip-center hip-center
            :tribhanga-offsets tribhanga-offsets
            :garment {:pattern garment-pattern :fill (nth palette 2)}
            :jewelry [{:type :necklace :y (- (head-center 1) (* tala-h 0.7))}
                      {:type :armband :count 4}]}
     :outline-color (first palette)
     :total-height fig-h}))

(defn generate
  "Pure Pattachitra generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [border-tier-count tier-widths tier-types
                floral-period floral-motif geo-pattern geo-period
                outline-width palette]} params

        ;; compute border tiers
        borders (nested-border-rects tier-widths tier-types)
        total-border-offset (reduce + tier-widths)
        inner-extent (- 1.0 total-border-offset)

        ;; border layers
        border-layers
        (map-indexed
          (fn [i {:keys [outer inner type width]}]
            {:id (keyword (str "border-" i)) :z-index i
             :primitives
             (case type
               :line   [{:type :rect-stroke :bounds outer :stroke "#1A1A1A" :stroke-width outline-width}
                        {:type :rect-stroke :bounds inner :stroke "#1A1A1A" :stroke-width outline-width}]
               :floral (:primitives (floral-border-fill outer inner floral-period floral-motif palette rng))
               :geo    (:primitives (geo-border-fill outer inner geo-period geo-pattern palette)))})
          borders)

        ;; inner panel background
        panel-layer
        {:id :inner-panel :z-index border-tier-count
         :primitives [{:type :rect :center [0 0]
                       :w (* 2 inner-extent) :h (* 2 inner-extent)
                       :fill (get pigment-hex-map (last palette))}]}

        ;; central figure
        figure (canonical-figure [0.0 0.0] (* 2 inner-extent) params rng)
        figure-layer
        {:id :central-figure :z-index (inc border-tier-count)
         :primitives [figure]}]

    {:seed     seed
     :artform  :pattachitra
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   (vec (concat border-layers [panel-layer figure-layer]))
     :metadata {:artform-family    :narrative-scroll
                :visual-invariants [:nested-rectangular-borders :alternating-border-types
                                    :central-iconic-figure :padma-chokh-eyes
                                    :sharp-pointed-chin :black-outline-everywhere
                                    :dense-ornamentation :flat-opaque-colors]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Pattachitra |
|---|---|---|
| Lampblack / Kajal | `#1A1A1A` | All contour outlines, eye fills, hair |
| Conch White / Sankha | `#FAF0E6` | Background of inner panel, skin highlights |
| Orpiment Yellow / Haritala | `#E6A817` | Garments, crown elements, ornamental fills |
| Cinnabar Red / Hingula | `#E44D2E` | Garment accents, lip color, floral borders |

## Cultural Guard Rails

- **DO**: Make lotus eyes (`padma chokh`) dramatically elongated — they are the signature feature.
- **DO**: Build at least 3 concentric rectangular border tiers. Dense borders define Pattachitra.
- **DO**: Outline every single shape in black. Nothing exists without a black boundary.
- **DO**: Fill all surfaces with ornamentation. Bare surfaces are not permitted inside borders.
- **DO NOT**: Use rounded or soft chins. Pattachitra chins are sharp triangular points.
- **DO NOT**: Place figures in naturalistic perspective poses. Figures follow canonical frontal/three-quarter stylization.
- **DO NOT**: Use circular or oval borders. The frame system is strictly rectangular.
- **DO NOT**: Leave empty background within the inner panel. Every gap receives a decorative pattern.
