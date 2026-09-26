# Madhubani (Mithila) — Algorithmic Specification

> Texture Fill Family · Geographic Locus: Mithila region (Madhubani, Darbhanga, Sitamarhi), Bihar; SE Terai of Nepal

## Core Algorithm

Horror vacui icon packing with double-line contour offset strokes and dual fill modes: parallel scanline hatching (*kachni*) and solid monochromatic blocking (*bharni*).

### Pipeline

1. **Central Motif Placement**: Place the primary symbolic composition at the canvas center. Central motifs include:
   - *Kohbar* (wedding scene): intertwined lotus stalks with fish and parrots.
   - *Tree of Life*: symmetrical branching tree with birds perched on every branch.
   - *Fish Pair* (*matsya yugal*): two fish circling each other, symbolizing fertility.
   - *Peacock Pair*: facing peacocks with fanned tail arrays.
   The central motif occupies approximately 40–60% of the inner canvas area.

2. **Double-Line Contour Generation**: Every shape boundary — central motif, fill icons, border elements — is rendered as **two parallel lines** with a narrow gap between them. This is the most distinctive Madhubani structural feature:
   - Compute the shape outline polygon or spline.
   - Generate two offset curves: one inward at distance `-d_offset`, one outward at `+d_offset`.
   - Stroke both offset curves in black (`#1A1A1A`).
   - The gap between them is either left as background color or filled with a contrasting thin line.

3. **Fill Mode Assignment**: Each enclosed region receives one of two canonical fill modes:
   - ***Kachni* (hatching)**: Dense parallel lines at a fixed angle within the region boundary. Lines are clipped to the region polygon. Angle varies per region for visual contrast (0°, 45°, 90°, 135°). Line spacing is tight — typically 3–6 lines per unit height.
   - ***Bharni* (solid fill)**: Flat opaque monochromatic color within the region boundary. No texture, no gradient.
   - Tradition: *Kachni* is associated with Kayastha and Brahmin caste lineages. *Bharni* is associated with Dusadh communities. A single composition may mix both modes across different regions.

4. **Horror Vacui Icon Packing (Zero Negative Space)**: After the central motif and its fill regions are complete, scan the canvas for any remaining void areas. Fill EVERY void with small semantic icons:
   - Icon vocabulary: fish, birds (sparrows, parrots), lotus buds, sun discs, crescent moons, eye symbols, leaf sprigs, geometric dashes, dots, spiral tendrils.
   - Icons are not randomly scattered — they are packed with approximate circle-packing or greedy placement (largest void first, smallest icon last).
   - **Invariant**: When the generator completes, zero pixels of bare background should remain visible within the bordered composition area.

5. **Border System**: Surround the composition with at least 2 concentric rectangular border bands:
   - *Inner border*: Continuous vine or repeating geometric chain (diamonds, triangles, dots).
   - *Outer border*: Wider band with larger repeating motifs (lotus chain, peacock row, fish row).
   - All border motifs also receive double-line contours.

6. **Color Application**: Colors are flat and opaque. No gradients, no washes. Each region gets a single color. Outlines are always black.

### Double-Line Contour Detail

```
    Outer offset line (black stroke)
    ──────────────────────────────
         gap (background or thin accent line)
    ──────────────────────────────
    Inner offset line (black stroke)

         │                      │
         │   INTERIOR FILL      │
         │   (kachni hatching   │
         │    or bharni solid)  │
         │                      │
```

Construction for a polygon boundary:
```clojure
;; For each edge segment, compute parallel offsets
(defn offset-polygon [vertices d]
  (mapv (fn [i]
          (let [p (nth vertices i)
                q (nth vertices (mod (inc i) (count vertices)))
                dx (- (q 0) (p 0)) dy (- (q 1) (p 1))
                len (Math/sqrt (+ (* dx dx) (* dy dy)))
                nx (/ (- dy) len) ny (/ dx len)]  ;; outward normal
            [(+ (p 0) (* nx d)) (+ (p 1) (* ny d))]))
        (range (count vertices))))
```

### Kachni Hatching Detail

Parallel lines at angle `theta` clipped to a polygonal region:

```
    ┌─────────────────────────┐
    │ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ │  theta = 45°
    │╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱  │
    │ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ │
    │╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱  │
    └─────────────────────────┘
```

Lines are evenly spaced at distance `hatch-spacing`. Each line runs across the full bounding box, then is clipped to the polygon interior using scanline-polygon intersection.

## Visual Invariants (MUST Hold for Recognition)

1. **Zero negative space**: Every void within the bordered area must contain an icon, hatching, or solid fill. Bare background is prohibited. This is the defining Madhubani principle.
2. **Double-line contours**: Every shape boundary uses two parallel offset lines, not a single stroke. Single-stroke outlines are NOT Madhubani.
3. **Kachni or bharni fill — never both in one region**: Each enclosed area gets either parallel hatching OR solid color, never a mix within the same region.
4. **Black outlines**: All contour lines are black (`#1A1A1A`). No colored outlines.
5. **Flat opaque colors**: No gradients, no wash effects, no transparency.
6. **Recognizable semantic icons in voids**: Void fillers must be identifiable motifs (fish, birds, lotus), not abstract noise or random dots.
7. **Rectangular border frame**: At least 2 concentric border bands surround the central composition.

## State Parameters & Invariants

```clojure
{:central-motif       :kohbar       ;; :kohbar, :tree-of-life, :fish-pair, :peacock-pair
 :central-scale       0.5           ;; fraction of inner area, in [0.35, 0.65]
 :contour-offset      0.006         ;; distance between double-line pair, in [0.003, 0.012]
 :contour-stroke-width 0.003        ;; width of each offset stroke, in [0.002, 0.005]
 :fill-mode-ratio     0.6           ;; fraction of regions using :kachni vs :bharni, in [0.0, 1.0]
 :hatch-spacing       0.012         ;; distance between parallel hatch lines, in [0.006, 0.025]
 :hatch-angles        [0 45 90 135] ;; available angles (degrees), rotated per region
 :hatch-stroke-width  0.002         ;; width of individual hatch lines, in [0.001, 0.004]
 :icon-vocabulary     [:fish :bird :lotus-bud :sun :moon :eye :leaf :spiral :dash]
 :icon-min-scale      0.02          ;; smallest void-filler icon, in [0.01, 0.03]
 :icon-max-scale      0.06          ;; largest void-filler icon, in [0.04, 0.10]
 :border-count        2             ;; concentric border bands, in [2, 4]
 :border-widths       [0.06 0.08]   ;; width of each border band, in [0.03, 0.12]
 :border-motifs       [:diamond-chain :lotus-row]  ;; repeating pattern per border
 :palette             [:lampblack :vermilion :turmeric-yellow :indigo
                        :conch-white :malachite]}
```

### Parameter Constraints

- `contour-offset` must be > `contour-stroke-width` (gap must be visible between the two lines).
- `hatch-spacing` must be > `2 * hatch-stroke-width` (hatching lines must not merge).
- `icon-min-scale` must be small enough that icons fit in remaining voids after central motif placement.
- `fill-mode-ratio` of 0.0 = all bharni, 1.0 = all kachni. Traditional compositions mix both.

## Clojure Pseudocode

```clojure
(ns art.artforms.madhubani
  "Pure Madhubani generator. Horror vacui + double contours + kachni/bharni.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn offset-polygon
  "Generate a parallel offset of a polygon at distance d (positive = outward)."
  [vertices d]
  (let [n (count vertices)]
    (mapv (fn [i]
            (let [prev (nth vertices (mod (dec i) n))
                  curr (nth vertices i)
                  next (nth vertices (mod (inc i) n))
                  ;; average of adjacent edge normals for smooth offset
                  dx1 (- (curr 0) (prev 0)) dy1 (- (curr 1) (prev 1))
                  dx2 (- (next 0) (curr 0)) dy2 (- (next 1) (curr 1))
                  len1 (Math/sqrt (+ (* dx1 dx1) (* dy1 dy1)))
                  len2 (Math/sqrt (+ (* dx2 dx2) (* dy2 dy2)))
                  nx (/ (+ (/ (- dy1) len1) (/ (- dy2) len2)) 2.0)
                  ny (/ (+ (/ dx1 len1) (/ dx2 len2)) 2.0)
                  nlen (Math/sqrt (+ (* nx nx) (* ny ny)))
                  nx (/ nx nlen) ny (/ ny nlen)]
              [(+ (curr 0) (* nx d))
               (+ (curr 1) (* ny d))]))
          (range n))))

(defn double-line-contour
  "Generate double-line contour primitives for a polygon."
  [vertices offset stroke-width]
  (let [outer (offset-polygon vertices offset)
        inner (offset-polygon vertices (- offset))]
    [{:type :polygon :points outer :fill nil
      :stroke "#1A1A1A" :stroke-width stroke-width}
     {:type :polygon :points inner :fill nil
      :stroke "#1A1A1A" :stroke-width stroke-width}]))

(defn kachni-hatching
  "Generate parallel hatch lines within a polygon at a given angle."
  [vertices angle-deg spacing stroke-width color]
  (let [theta (Math/toRadians angle-deg)
        ;; compute bounding box
        xs (map first vertices) ys (map second vertices)
        min-x (apply min xs) max-x (apply max xs)
        min-y (apply min ys) max-y (apply max ys)
        diagonal (Math/sqrt (+ (Math/pow (- max-x min-x) 2) (Math/pow (- max-y min-y) 2)))
        cx (/ (+ min-x max-x) 2.0) cy (/ (+ min-y max-y) 2.0)
        ;; generate lines perpendicular to angle, spaced evenly
        n-lines (int (/ diagonal spacing))
        perp-x (Math/cos (+ theta (/ Math/PI 2)))
        perp-y (Math/sin (+ theta (/ Math/PI 2)))
        dir-x (Math/cos theta) dir-y (Math/sin theta)]
    {:type :kachni-fill
     :primitives
     (mapv (fn [i]
             (let [offset (* (- i (/ n-lines 2.0)) spacing)
                   line-cx (+ cx (* offset perp-x))
                   line-cy (+ cy (* offset perp-y))]
               {:type :line
                :from [(- line-cx (* diagonal dir-x)) (- line-cy (* diagonal dir-y))]
                :to   [(+ line-cx (* diagonal dir-x)) (+ line-cy (* diagonal dir-y))]
                :stroke color :stroke-width stroke-width
                :clip-to vertices}))
           (range n-lines))}))

(defn bharni-fill
  "Generate solid flat fill for a polygon."
  [vertices color]
  {:type :bharni-fill
   :primitives [{:type :polygon :points vertices :fill color :stroke nil}]})

(defn void-icon
  "Generate a small semantic icon to fill a void space."
  [icon-type center scale palette rng]
  (case icon-type
    :fish   {:type :fish-icon :center center :scale scale
             :fill (nth palette (int (* (rng) (count palette))))}
    :bird   {:type :bird-icon :center center :scale scale :fill "#1A1A1A"}
    :lotus-bud {:type :lotus-bud :center center :scale scale
                :fill (nth palette 1)}
    :sun    {:type :sun-disc :center center :radius (* scale 0.4) :rays 8
             :fill (nth palette 3)}
    :moon   {:type :crescent :center center :radius (* scale 0.35)
             :fill "#FAF0E6"}
    :eye    {:type :eye-icon :center center :scale scale :fill "#1A1A1A"}
    :leaf   {:type :leaf-sprig :center center :scale scale
             :fill (nth palette 5)}
    :spiral {:type :spiral-tendril :center center :scale scale
             :stroke "#1A1A1A" :stroke-width 0.002}
    :dash   {:type :dash-mark :center center :length (* scale 0.6)
             :stroke "#1A1A1A" :stroke-width 0.002}))

(defn pack-voids
  "Greedily pack semantic icons into all remaining void spaces.
   Scans a grid, checks if each cell is uncovered, places icons largest-void-first."
  [occupied-regions icon-vocabulary min-scale max-scale canvas-bounds palette rng]
  (let [[x1 y1 x2 y2] canvas-bounds
        grid-step min-scale
        candidates (for [x (range x1 x2 grid-step)
                         y (range y1 y2 grid-step)
                         :let [p [x y]]
                         :when (not (some #(point-in-polygon? p %) occupied-regions))]
                    p)]
    (mapv (fn [pos]
            (let [icon-type (nth icon-vocabulary (mod (int (* (rng) 1000)) (count icon-vocabulary)))
                  scale (+ min-scale (* (rng) (- max-scale min-scale)))]
              (void-icon icon-type pos scale palette rng)))
          candidates)))

(defn central-motif-geometry
  "Generate the primary central motif as a collection of polygonal regions."
  [motif-type center scale palette rng]
  ;; Returns {:outline [...vertices...] :sub-regions [{:vertices [...] :fill-mode :kachni} ...]}
  (case motif-type
    :kohbar     {:type :kohbar :center center :scale scale
                 :outline (let [s (* scale 0.5)]
                            [[(- (center 0) s) (- (center 1) s)]
                             [(+ (center 0) s) (- (center 1) s)]
                             [(+ (center 0) s) (+ (center 1) s)]
                             [(- (center 0) s) (+ (center 1) s)]])
                 :sub-regions [] ;; populated with lotus stalks, fish, parrots
                 }
    :tree-of-life {:type :tree :center center :scale scale
                   :outline [] :sub-regions []}
    :fish-pair    {:type :fish-pair :center center :scale scale
                   :outline [] :sub-regions []}
    :peacock-pair {:type :peacock-pair :center center :scale scale
                   :outline [] :sub-regions []}))

(defn generate
  "Pure Madhubani generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [central-motif central-scale contour-offset contour-stroke-width
                fill-mode-ratio hatch-spacing hatch-angles hatch-stroke-width
                icon-vocabulary icon-min-scale icon-max-scale
                border-count border-widths border-motifs palette]} params
        total-border (reduce + border-widths)
        inner-extent (- 1.0 total-border)

        ;; Layer 0: background
        bg-layer {:id :background :z-index 0
                  :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0
                                :fill (get pigment-hex-map (last palette))}]}

        ;; Layer 1: border bands
        border-layers
        (map-indexed
          (fn [i width]
            (let [offset (reduce + (take i border-widths))
                  ext (- 1.0 offset)]
              {:id (keyword (str "border-" i)) :z-index (inc i)
               :primitives
               (concat
                 (double-line-contour
                   [[(- ext) (- ext)] [ext (- ext)] [ext ext] [(- ext) ext]]
                   contour-offset contour-stroke-width)
                 ;; border motif fill would go here
                 )}))
          border-widths)

        ;; Layer 2: central motif
        motif (central-motif-geometry central-motif [0.0 0.0] central-scale palette rng)
        motif-contours (double-line-contour (:outline motif) contour-offset contour-stroke-width)

        ;; Layer 3: fill modes for each sub-region
        fill-layers
        (map-indexed
          (fn [i region]
            (let [use-kachni? (< (rng) fill-mode-ratio)
                  angle (nth hatch-angles (mod i (count hatch-angles)))]
              {:id (keyword (str "fill-" i)) :z-index (+ 3 border-count i)
               :primitives
               (if use-kachni?
                 (:primitives (kachni-hatching (:vertices region) angle
                                               hatch-spacing hatch-stroke-width "#1A1A1A"))
                 (:primitives (bharni-fill (:vertices region)
                                           (get pigment-hex-map
                                                (nth palette (mod i (count palette)))))))}))
          (:sub-regions motif))

        ;; Layer 4: horror vacui void packing
        occupied (cons (:outline motif) (map :vertices (:sub-regions motif)))
        void-icons (pack-voids occupied icon-vocabulary icon-min-scale icon-max-scale
                                [(- inner-extent) (- inner-extent) inner-extent inner-extent]
                                palette rng)
        void-layer {:id :void-pack :z-index 99
                    :primitives (vec void-icons)}]

    {:seed     seed
     :artform  :madhubani
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   (vec (concat [bg-layer] border-layers
                            [{:id :motif-contour :z-index (+ 2 border-count)
                              :primitives motif-contours}]
                            fill-layers [void-layer]))
     :metadata {:artform-family    :texture-fill
                :visual-invariants [:zero-negative-space :double-line-contours
                                    :kachni-or-bharni-per-region :black-outlines
                                    :flat-opaque-colors :semantic-void-icons
                                    :rectangular-border-frame]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Madhubani |
|---|---|---|
| Lampblack / Kajal | `#1A1A1A` | All contour lines (double-line pairs), kachni hatching strokes |
| Vermilion | `#E34234` | Bharni fill — wedding motifs, auspicious symbols, fish |
| Turmeric Yellow | `#E3A857` | Bharni fill — sun, grain, flower petals |
| Indigo | `#1B3F8B` | Bharni fill — peacock bodies, water, night sky |
| Conch White | `#FAF0E6` | Background, gap between double-line contours |
| Malachite Green | `#1E9E50` | Bharni fill — leaves, parrots, vegetation |

## Cultural Guard Rails

- **DO**: Fill every visible void with a recognizable semantic icon. Horror vacui is the foundational Madhubani principle — bare space is a failure.
- **DO**: Draw every shape boundary with TWO parallel offset lines. Single-stroke outlines produce Kalighat or Pattachitra, not Madhubani.
- **DO**: Use parallel straight-line hatching (*kachni*) at consistent angles within each region. Curved or cross-hatching is incorrect.
- **DO**: Mix kachni-hatched regions alongside bharni solid-filled regions in the same composition for visual richness.
- **DO NOT**: Use Voronoi tessellations or abstract geometric subdivision. Madhubani fills with SEMANTIC icons (fish, birds, lotus), not mathematical cell partitions.
- **DO NOT**: Leave any background visible within the bordered area. Zero tolerance for negative space.
- **DO NOT**: Use gradient fills or wash effects. All colors are flat and opaque.
- **DO NOT**: Use colored outlines. All contour strokes are strictly black.
