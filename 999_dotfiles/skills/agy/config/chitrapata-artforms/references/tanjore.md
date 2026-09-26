# Tanjore (Thanjavur) — Algorithmic Specification

> Relief / Layered Family · Geographic Locus: Thanjavur, Tamil Nadu (Cauvery river delta)

## Core Algorithm

Layered 2.5D composition with central frontal deity icon, cusped prabhavali arch frame, gesso relief heightmap, gold-leaf gilding zones, and Poisson-disk gem inlay sampling.

### Pipeline

1. **Wood Board Canvas**: The backing is a flat rectangle (jackfruit wood). Background fill is a deep warm color (typically deep red or dark green). The canvas is `[-1, 1]` as always, but Tanjore uniquely uses a **z-displacement layer** to model physical gesso relief.
2. **Prabhavali Arch Construction**: Generate the iconic cusped arch (*prabhavali*) that frames the central deity:
   - The arch is a **multifoil cusped curve** — a sequence of circular arcs meeting at sharp cusp points, forming a scalloped trefoil or pentafoil silhouette.
   - The arch is bilaterally symmetric about the vertical center axis `x = 0`.
   - Base of the arch rests on two flanking columns.
   - Arch spans approximately 70–85% of the canvas width.
3. **Flanking Columns**: Two vertical columns supporting the arch base:
   - Column shaft: rectangular or slightly tapered.
   - Capital: Corinthian-influenced decorative element (acanthus leaf abstraction or lotus capital).
   - Base: stepped rectangular plinth.
4. **Central Deity Figure**: A single divine icon in strict **frontal static pose** (bilateral symmetry):
   - Face directly toward viewer. No profile, no three-quarter angle.
   - Seated (padmasana/lotus pose) or standing (samabhanga/equal-weight stance).
   - Proportions follow South Indian *Shilpa Shastra* canons: head = 1/8 total height for divine figures.
   - Elaborate crown (*kirita mukuta*), heavy jewelry (necklaces, armlets, anklets), draped silk garments.
5. **Gesso Relief Heightmap**: Define regions that receive physical relief:
   - **Raised regions (z > 0)**: Prabhavali arch cusps, jewelry on the deity, border ornaments, column capitals, crown. These receive gold leaf.
   - **Flat regions (z = 0)**: Background, skin, garments, face. These receive painted color.
   - Relief height is uniform within each raised region: `z_gesso` in [0.02, 0.08] normalized units.
   - In `art.json`, each primitive carries a `:z-displacement` value.
6. **Gold Leaf Gilding**: All raised gesso regions receive gold-leaf surface treatment:
   - In 2D (Quil): Rendered as flat gold color (`#D4A017`) fills.
   - In 3D (Raylib/WebGPU): Rendered with a metallic BRDF shader — high specular reflection, low roughness, warm gold albedo.
7. **Gem Inlay Sampling**: Distribute gem points across the prabhavali arch and jewelry zones using **Poisson-disk sampling** (ensures minimum spacing between gems, avoids clumping):
   - Gem types: uncut glass stones (round, faceted), semi-precious cabochons.
   - Colors: ruby red, emerald green, clear white, sapphire blue.
   - Each gem is a small filled circle with a specular highlight dot.
8. **Painted Color Regions**: Non-raised areas receive flat opaque color fills from the traditional palette. Garments get rich deep hues (crimson, forest green, royal blue). Skin is a warm ochre-brown.

### Prabhavali Arch Geometry (Detail)

The multifoil cusped arch is the most complex geometric element:

```
                    ╭─╮
                 ╭──╯ ╰──╮              cusp points (sharp)
              ╭──╯       ╰──╮
           ╭──╯             ╰──╮
        ╭──╯    DEITY ICON     ╰──╮
     ╭──╯                        ╰──╮
     │                               │
     ║ column                column  ║
     ║                               ║
     ╚═══════════════════════════════╝  plinth base
```

Construction algorithm:
1. Define `n_cusps` cusp points evenly spaced along a semicircular guide arc.
2. Between each pair of adjacent cusps, inscribe a circular arc bulging outward.
3. The radius of each inter-cusp arc = `r_cusp` (controls scallop depth).
4. Mirror the entire curve about `x = 0` for bilateral symmetry.

```clojure
;; Cusp point positions on guide semicircle
(defn cusp-points [n-cusps arch-radius arch-center]
  (mapv (fn [i]
          (let [theta (+ Math/PI (* Math/PI (/ (double i) (dec n-cusps))))]
            [(+ (arch-center 0) (* arch-radius (Math/cos theta)))
             (+ (arch-center 1) (* arch-radius (Math/sin theta)))]))
        (range n-cusps)))
```

### Z-Displacement Layer Model

Tanjore is the only artform requiring a genuine 2.5D heightmap:

| Region Type | z-displacement | Surface Treatment | Render in 2D | Render in 3D |
|---|---|---|---|---|
| Background | 0.0 | Flat paint | Solid fill | Flat quad |
| Skin/face | 0.0 | Flat paint | Solid fill | Flat quad |
| Garments | 0.0 | Flat paint | Solid fill | Flat quad |
| Arch cusps | 0.04 | Gold leaf | Gold flat fill | Gold metallic BRDF |
| Jewelry | 0.06 | Gold leaf + gems | Gold fill + gem circles | Displacement + BRDF + gem points |
| Crown | 0.08 | Gold leaf | Gold flat fill | Displacement + BRDF |
| Column capitals | 0.03 | Gold leaf | Gold flat fill | Displacement + BRDF |
| Gems | 0.08 | Specular stone | Colored circle + white dot | Point light + specular |

## Visual Invariants (MUST Hold for Recognition)

1. **Strict frontal pose**: Deity faces the viewer directly. Bilateral symmetry. No profile, no rotation.
2. **Prabhavali cusped arch**: The scalloped arch frame is mandatory. Without it, the output is not Tanjore.
3. **Flanking columns**: Two columns supporting the arch. They are structural, not decorative.
4. **Gold-dominant surface**: Gold leaf covers all raised ornamental areas. Gold must be the visually dominant metallic surface.
5. **Physical relief implied**: Even in 2D, the composition must visually suggest layered depth — gold areas "above" painted areas.
6. **Gem inlay points**: Discrete colored gem dots distributed across arch and jewelry. Not painted patterns — distinct point elements.
7. **Single central figure**: One deity only. No narrative scenes, no multiple figures competing for attention.
8. **Rich deep background**: Background behind the deity (within the arch) is a deep saturated color — dark red, dark green, or dark blue. Never white or pale.
9. **Heavy ornamentation**: Crown, multiple necklaces, armlets, anklets, waistband. Tanjore deities are lavishly adorned.

## State Parameters & Invariants

```clojure
{:arch-type           :pentafoil  ;; :trefoil (3 cusps), :pentafoil (5), :heptafoil (7)
 :arch-radius         0.7         ;; guide semicircle radius, in [0.5, 0.85]
 :arch-center         [0.0 0.1]   ;; center of arch guide (slightly above canvas center)
 :cusp-arc-radius     0.12        ;; radius of inter-cusp scallop arcs, in [0.06, 0.20]
 :column-width        0.08        ;; width of flanking columns, in [0.05, 0.12]
 :column-height       0.6         ;; height of columns, in [0.4, 0.8]
 :figure-height       0.55        ;; deity height within arch interior, in [0.4, 0.7]
 :figure-pose         :seated     ;; :seated (padmasana) or :standing (samabhanga)
 :figure-tala         8           ;; head-unit proportion, in [7, 9]
 :crown-height        0.12        ;; kirita mukuta height, in [0.06, 0.18]
 :gesso-height        0.05        ;; z-displacement for raised regions, in [0.02, 0.08]
 :gem-count           40          ;; total gem inlay points, in [15, 80]
 :gem-min-spacing     0.04        ;; Poisson-disk minimum distance between gems, in [0.02, 0.08]
 :gem-colors          ["#E34234" "#0BDA51" "#FAF0E6" "#26619C"]  ;; ruby, emerald, clear, sapphire
 :gem-radius          0.008       ;; individual gem point radius, in [0.004, 0.015]
 :bg-color            "#8B0000"   ;; deep red background within arch, or "#006400" deep green
 :gold-color          "#D4A017"   ;; 22-carat gold leaf color
 :skin-color          "#C68642"   ;; warm ochre-brown for deity skin
 :palette             [:gold-leaf :cinnabar-red :lampblack :conch-white :indigo]}
```

### Parameter Constraints

- `arch-type` cusp count must be odd (3, 5, 7) for bilateral symmetry with a central apex cusp.
- `gem-min-spacing` must be ≥ `2 * gem-radius` (gems must not overlap).
- `figure-height` + `crown-height` must fit within the arch interior vertical span.
- `column-height` must reach from the canvas bottom to the arch base.

## Clojure Pseudocode

```clojure
(ns art.artforms.tanjore
  "Pure Tanjore generator. Gesso relief + gold leaf + gem inlay.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn multifoil-arch
  "Generate a cusped prabhavali arch as a sequence of arc primitives."
  [n-cusps arch-radius cusp-arc-radius center]
  (let [cusps (mapv (fn [i]
                      (let [theta (+ Math/PI (* Math/PI (/ (double i) (dec n-cusps))))]
                        [(+ (center 0) (* arch-radius (Math/cos theta)))
                         (+ (center 1) (* arch-radius (Math/sin theta)))]))
                    (range n-cusps))]
    {:type :prabhavali-arch
     :cusps cusps
     :arcs (mapv (fn [i]
                   (let [p1 (nth cusps i)
                         p2 (nth cusps (inc i))
                         mid-x (/ (+ (p1 0) (p2 0)) 2.0)
                         mid-y (/ (+ (p1 1) (p2 1)) 2.0)
                         ;; bulge outward from center
                         dx (- mid-x (center 0))
                         dy (- mid-y (center 1))
                         len (Math/sqrt (+ (* dx dx) (* dy dy)))
                         bulge-x (+ mid-x (* (/ dx len) cusp-arc-radius))
                         bulge-y (+ mid-y (* (/ dy len) cusp-arc-radius))]
                     {:type :arc-segment :from p1 :to p2
                      :bulge-point [bulge-x bulge-y]
                      :radius cusp-arc-radius}))
                 (range (dec n-cusps)))
     :z-displacement 0.04
     :fill "#D4A017"}))

(defn flanking-columns
  "Generate two flanking column structures."
  [arch-base-left arch-base-right col-width col-height]
  (let [plinth-h (* col-height 0.08)
        capital-h (* col-height 0.12)
        shaft-h (- col-height plinth-h capital-h)]
    [{:type :column :side :left
      :plinth {:type :rect :center [(arch-base-left 0) (+ (arch-base-left 1) (- col-height) (/ plinth-h 2))]
               :w (* col-width 1.3) :h plinth-h :fill "#D4A017" :z-displacement 0.03}
      :shaft {:type :rect :center [(arch-base-left 0) (+ (arch-base-left 1) (- (/ shaft-h 2)) (- capital-h))]
              :w col-width :h shaft-h :fill "#D4A017" :z-displacement 0.03}
      :capital {:type :lotus-capital :center [(arch-base-left 0) (- (arch-base-left 1) capital-h)]
                :w (* col-width 1.5) :h capital-h :fill "#D4A017" :z-displacement 0.05}}
     {:type :column :side :right
      ;; mirror of left column
      :plinth {:type :rect :center [(arch-base-right 0) (+ (arch-base-right 1) (- col-height) (/ plinth-h 2))]
               :w (* col-width 1.3) :h plinth-h :fill "#D4A017" :z-displacement 0.03}
      :shaft {:type :rect :center [(arch-base-right 0) (+ (arch-base-right 1) (- (/ shaft-h 2)) (- capital-h))]
              :w col-width :h shaft-h :fill "#D4A017" :z-displacement 0.03}
      :capital {:type :lotus-capital :center [(arch-base-right 0) (- (arch-base-right 1) capital-h)]
                :w (* col-width 1.5) :h capital-h :fill "#D4A017" :z-displacement 0.05}}]))

(defn poisson-disk-sample
  "Sample gem positions within a region using Poisson-disk distribution.
   Ensures minimum spacing between all points."
  [bounds n-points min-spacing rng]
  (loop [points [] attempts 0]
    (if (or (>= (count points) n-points) (> attempts (* n-points 30)))
      points
      (let [[x1 y1 x2 y2] bounds
            candidate [(+ x1 (* (rng) (- x2 x1)))
                       (+ y1 (* (rng) (- y2 y1)))]
            too-close? (some (fn [p]
                              (let [dx (- (candidate 0) (p 0))
                                    dy (- (candidate 1) (p 1))]
                                (< (Math/sqrt (+ (* dx dx) (* dy dy))) min-spacing)))
                            points)]
        (recur (if too-close? points (conj points candidate))
               (inc attempts))))))

(defn gem-inlay-layer
  "Generate gem point primitives across arch and jewelry zones."
  [arch-bounds gem-count gem-min-spacing gem-radius gem-colors rng]
  (let [positions (poisson-disk-sample arch-bounds gem-count gem-min-spacing rng)]
    {:type :gem-inlay
     :primitives
     (mapv (fn [pos]
             (let [color (nth gem-colors (mod (int (* (rng) 100)) (count gem-colors)))]
               {:type :gem :center pos :radius gem-radius
                :fill color :z-displacement 0.08
                :highlight {:type :circle
                            :center [(+ (pos 0) (* gem-radius 0.3))
                                     (+ (pos 1) (* gem-radius 0.3))]
                            :radius (* gem-radius 0.25)
                            :fill "#FFFFFF"}}))
           positions)}))

(defn frontal-deity
  "Generate the central deity figure in strict frontal pose."
  [center height tala pose crown-h skin-color palette]
  (let [head-h (/ height tala)
        head-w (* head-h 0.85)
        body-w (* head-w 2.2)
        ;; all positions relative to center, bilaterally symmetric
        head-cy (+ (center 1) (/ height 2.0) (- (/ head-h 2.0)) (- crown-h))]
    {:type :frontal-deity
     :pose pose
     :crown {:type :kirita-mukuta :center [(center 0) (+ head-cy (/ head-h 2) (/ crown-h 2))]
             :w (* head-w 1.4) :h crown-h :fill "#D4A017" :z-displacement 0.08}
     :head {:type :oval :center [(center 0) head-cy]
            :w head-w :h head-h :fill skin-color
            :eyes {:type :frontal-eyes :y (+ head-cy (* head-h 0.05))
                   :spacing (* head-w 0.3) :fill "#1A1A1A"}
            :z-displacement 0.0}
     :body {:type :torso :center center
            :w body-w :h (* height 0.5)
            :garment-fill (nth palette 1)
            :z-displacement 0.0}
     :jewelry [{:type :necklace :count 3 :y-start (- head-cy (* head-h 0.6))
                :fill "#D4A017" :z-displacement 0.06}
               {:type :armlets :count 4 :fill "#D4A017" :z-displacement 0.06}
               {:type :waistband :y (center 1) :fill "#D4A017" :z-displacement 0.05}]
     :lotus-base (when (= pose :seated)
                   {:type :lotus-pedestal :center [(center 0) (- (center 1) (* height 0.4))]
                    :w (* body-w 1.3) :h (* height 0.08)
                    :fill "#E44D2E" :z-displacement 0.03})}))

(defn generate
  "Pure Tanjore generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [arch-type arch-radius cusp-arc-radius arch-center
                column-width column-height figure-height figure-pose
                figure-tala crown-height gesso-height
                gem-count gem-min-spacing gem-colors gem-radius
                bg-color gold-color skin-color palette]} params
        n-cusps (case arch-type :trefoil 3 :pentafoil 5 :heptafoil 7)

        ;; Layer 0: wood board background
        board-layer {:id :board :z-index 0
                     :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0
                                   :fill bg-color :z-displacement 0.0}]}

        ;; Layer 1: prabhavali arch
        arch (multifoil-arch n-cusps arch-radius cusp-arc-radius arch-center)
        arch-layer {:id :prabhavali :z-index 1 :primitives [arch]}

        ;; Layer 2: flanking columns
        arch-base-l [(- (arch-center 0) arch-radius) (arch-center 1)]
        arch-base-r [(+ (arch-center 0) arch-radius) (arch-center 1)]
        cols (flanking-columns arch-base-l arch-base-r column-width column-height)
        column-layer {:id :columns :z-index 2 :primitives cols}

        ;; Layer 3: central deity
        deity (frontal-deity [0.0 0.0] figure-height figure-tala
                             figure-pose crown-height skin-color palette)
        deity-layer {:id :deity :z-index 3 :primitives [deity]}

        ;; Layer 4: gem inlay
        arch-bounds [(- arch-radius) (- (arch-center 1) (* arch-radius 0.3))
                     arch-radius (+ (arch-center 1) arch-radius)]
        gems (gem-inlay-layer arch-bounds gem-count gem-min-spacing
                              gem-radius gem-colors rng)
        gem-layer {:id :gems :z-index 4 :primitives (:primitives gems)}]

    {:seed     seed
     :artform  :tanjore
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   [board-layer arch-layer column-layer deity-layer gem-layer]
     :metadata {:artform-family    :relief-layered
                :has-z-displacement true
                :visual-invariants [:frontal-pose :prabhavali-arch
                                    :flanking-columns :gold-dominant
                                    :relief-depth :gem-inlay
                                    :single-central-figure :rich-background
                                    :heavy-ornamentation]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Tanjore |
|---|---|---|
| Gold Leaf (22-carat) | `#D4A017` | All raised gesso surfaces — arch, jewelry, crown, columns |
| Cinnabar Red | `#E44D2E` | Garment fills, lotus pedestal, border accents |
| Lampblack | `#1A1A1A` | Contour outlines, hair, eye fills |
| Conch White | `#FAF0E6` | Eye whites, pearl accents, light garment highlights |
| Indigo | `#1B3F8B` | Deep garment blue, background variant |
| Ruby Red (gem) | `#E34234` | Inlaid gem points |
| Emerald Green (gem) | `#0BDA51` | Inlaid gem points |

## Cultural Guard Rails

- **DO**: Make gold the visually dominant metallic surface. Tanjore paintings are defined by gold leaf coverage.
- **DO**: Construct the cusped prabhavali arch frame. It is architecturally essential, not optional decoration.
- **DO**: Use Poisson-disk or regular grid for gem placement — gems must appear deliberately placed, not random.
- **DO**: Keep the deity in strict frontal bilateral symmetry. The viewer receives direct divine *darshan* (sacred gaze).
- **DO NOT**: Tilt, rotate, or show the deity in profile. Frontal static pose is non-negotiable.
- **DO NOT**: Omit flanking columns. They structurally support the arch.
- **DO NOT**: Use flat matte rendering for gold areas in 3D targets. Gold leaf is highly reflective — use metallic BRDF.
- **DO NOT**: Scatter gems randomly without spacing control. Gems are carefully placed by master craftsmen.
