# Pithora — Algorithmic Specification

> Ritual Placement Family · Geographic Locus: Chhota Udaipur (Gujarat), Alirajpur/Jhabua (Madhya Pradesh); Rathwa, Bhil, Nayak tribes

## Core Algorithm

Hierarchical slot assignment within a sacred wall enclosure (*chakh*), populating ranked grid positions with stylized horse archetype stencils and ritual accessory icons.

### Pipeline

1. **Chakh Enclosure**: Define the sacred wall rectangle as the full `[-1, 1]` canvas. This is the ritual painting surface — the domestic mud wall. Background fill is a warm earth tone (ochre/terracotta).
2. **Register Row Layout**: Divide the canvas into 2–4 horizontal register rows. The central row is the tallest (primary sacred register). Upper and lower rows are narrower (cosmic elements, attendant figures).
3. **Hierarchical Slot Grid**: Within each register, define a grid of rectangular slots. Slot sizes encode ritual rank — NOT spatial perspective:
   - **Central slot (primary register)**: Largest. Reserved for *Baba Pithora* (chief deity horse). Scale factor 1.0.
   - **Flanking slots (primary register)**: Medium. Reserved for named deity horses (*Rani Kajal*, attendant gods). Scale factor 0.7–0.85.
   - **Secondary register slots**: Smaller. Minor horses, cosmic elements. Scale factor 0.4–0.6.
   - Slot assignment is **deterministic and hierarchical**, never random.
4. **Horse Archetype Stamping**: Each horse slot receives a stylized horse stencil. The horse is a geometric construction, not an anatomical drawing:
   - **Body**: Elongated horizontal rectangle or trapezoid. Width ≈ 2.5× height.
   - **Legs**: Four thin vertical lines descending from body corners. Legs are slightly splayed. Length ≈ 1.2× body height.
   - **Head**: Small triangle or circle at the front-top of body. Protruding muzzle line extends forward.
   - **Tail**: Thin line extending backward and upward from the rear-top of body. Slight curve.
   - **Ears**: Two small triangles atop the head.
5. **Dot-Pattern Coat Fill**: The interior of each horse body is filled with a regular dot grid pattern. Dot spacing and color vary per horse (encoding identity/deity association). This is the signature Pithora surface treatment.
6. **Rider Figures (Optional)**: Small, simplified human figures placed atop select horses. Rendered as inverted-triangle torsos with circular heads (similar to Warli figure primitives but less geometric).
7. **Cosmic Accessories**: Fill remaining gap spaces with sacred accessory icons:
   - Sun disc (upper register, right)
   - Moon crescent (upper register, left)
   - Crops/grain stalks (lower register)
   - Sacred trees (between horses)
   - Birds (sky gaps)
8. **Color Application**: Flat earth-tone fills with black outlines. No gradients. No shading.

### Horse Archetype Geometry (Detail)

```
         ▲▲ (ears)
         ██ (head: triangle/circle)
    ─────██══════════════════─── (muzzle)
    │                          │╲  (tail, curves up)
    │   ·  ·  ·  ·  ·  ·  ·  │ ╲
    │   ·  ·  ·  ·  ·  ·  ·  │    (dot-pattern coat fill)
    │   ·  ·  ·  ·  ·  ·  ·  │
    ──────────────────────────
    │    │                │    │   (four stick legs, slightly splayed)
    │    │                │    │
```

The archetype is parameterized by:
- `body-width`, `body-height` (aspect ratio ≈ 2.5:1)
- `leg-length` (≈ 1.2 × body-height)
- `leg-splay` (outward angle, ≈ 3–8°)
- `dot-spacing` (coat fill density)
- `fill-color` (body color, per-horse)

## Visual Invariants (MUST Hold for Recognition)

1. **Horses dominate the composition**: Horses are the primary visual element. They must occupy >60% of the canvas area.
2. **Hierarchical scale**: Central horse is largest. Flanking and peripheral horses are progressively smaller. Size encodes rank, not distance.
3. **Rectangular/trapezoidal horse bodies**: Bodies are geometric shapes — NOT anatomically curved. Elongated horizontally.
4. **Stick legs**: Four thin vertical lines. NOT muscular, NOT curved, NOT jointed.
5. **Dot-patterned coats**: Every horse body interior contains a regular dot grid. Never flat-filled without dots.
6. **Horizontal register arrangement**: Horses are arranged in rows, not scattered freely across the canvas.
7. **Earth-tone palette**: Colors must come from earth pigments — ochres, browns, terracotta, white, black. No bright blues, greens, or purples.
8. **Flat color fills**: All fills are opaque and flat. Zero gradients, zero wash effects.
9. **Sacred enclosure boundary**: The composition is bounded by the *chakh* wall edge — no elements bleed outside.

## State Parameters & Invariants

```clojure
{:register-count       3         ;; horizontal rows, in [2, 4]
 :register-heights     [0.5 1.0 0.5]  ;; relative heights (center row tallest)
 :slots-per-register   [4 5 4]   ;; number of horse/icon slots per row
 :slot-hierarchy                  ;; rank assignment map
   {:primary  {:register 1 :slot 2 :scale 1.0   :deity :baba-pithora}
    :consort  {:register 1 :slot 1 :scale 0.85  :deity :rani-kajal}
    :guard-l  {:register 1 :slot 0 :scale 0.75  :deity :attendant}
    :guard-r  {:register 1 :slot 3 :scale 0.75  :deity :attendant}
    :minor    {:register 1 :slot 4 :scale 0.65  :deity :attendant}}
 :horse-aspect-ratio   2.5       ;; body width / body height, in [2.0, 3.0]
 :leg-length-ratio     1.2       ;; leg length / body height, in [0.8, 1.5]
 :leg-splay-angle      5.0       ;; outward splay degrees, in [2, 10]
 :dot-spacing          0.025     ;; dot grid spacing within body, in [0.015, 0.04]
 :dot-radius           0.006     ;; individual dot radius, in [0.003, 0.01]
 :rider-probability    0.3       ;; fraction of horses that carry riders, in [0.0, 0.5]
 :accessory-types      [:sun :moon :tree :crop :bird]
 :outline-width        0.004     ;; black contour width, in [0.002, 0.008]
 :palette              [:red-ochre :conch-white :lampblack :orpiment-yellow :turmeric-yellow]}
```

### Parameter Constraints

- `register-heights`: Center register must be the tallest (primary sacred row).
- `slot-hierarchy`: `:primary` slot scale must be 1.0. All other scales < 1.0. Scales must decrease with rank distance from primary.
- `horse-aspect-ratio`: Must be ≥ 2.0 (Pithora horses are always wider than tall).
- `dot-spacing` must be small enough that at least a 4×4 dot grid fits inside the smallest horse body.

## Clojure Pseudocode

```clojure
(ns art.artforms.pithora
  "Pure Pithora generator. Hierarchical horses in sacred chakh enclosure.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn horse-archetype
  "Generate a single stylized horse stencil at the given position and scale."
  [center scale params rng]
  (let [{:keys [horse-aspect-ratio leg-length-ratio leg-splay-angle
                dot-spacing dot-radius outline-width palette]} params
        bh (* scale 0.15)             ;; body height
        bw (* bh horse-aspect-ratio)  ;; body width
        ll (* bh leg-length-ratio)    ;; leg length
        splay (Math/toRadians leg-splay-angle)
        cx (center 0) cy (center 1)
        ;; body rectangle corners
        bx1 (- cx (/ bw 2)) by1 (- cy (/ bh 2))
        bx2 (+ cx (/ bw 2)) by2 (+ cy (/ bh 2))
        ;; head
        head-cx (+ bx2 (* bh 0.3))
        head-cy (+ by2 (* bh 0.2))
        ;; coat fill: regular dot grid
        dots-x (range (+ bx1 dot-spacing) bx2 dot-spacing)
        dots-y (range (+ by1 dot-spacing) by2 dot-spacing)
        coat-dots (for [dx dots-x dy dots-y]
                    {:type :circle :center [dx dy] :radius dot-radius
                     :fill (nth palette (mod (int (* (rng) (count palette))) (count palette)))})
        ;; legs (four stick lines, slightly splayed)
        legs [{:type :line :from [bx1 by1] :to [(- bx1 (* ll (Math/sin splay))) (- by1 ll)]}
              {:type :line :from [(+ bx1 (* bw 0.3)) by1] :to [(+ bx1 (* bw 0.3)) (- by1 ll)]}
              {:type :line :from [(- bx2 (* bw 0.3)) by1] :to [(- bx2 (* bw 0.3)) (- by1 ll)]}
              {:type :line :from [bx2 by1] :to [(+ bx2 (* ll (Math/sin splay))) (- by1 ll)]}]
        ;; tail
        tail {:type :quadratic-bezier
              :from [bx1 by2]
              :control [(- bx1 (* bh 0.4)) (+ by2 (* bh 0.6))]
              :to [(- bx1 (* bh 0.3)) (+ by2 (* bh 0.8))]}
        ;; ears
        ears [{:type :triangle :points [[head-cx (+ head-cy (* bh 0.25))]
                                        [(- head-cx (* bh 0.05)) (+ head-cy (* bh 0.15))]
                                        [(+ head-cx (* bh 0.05)) (+ head-cy (* bh 0.15))]]}
              {:type :triangle :points [[(+ head-cx (* bh 0.1)) (+ head-cy (* bh 0.25))]
                                        [(+ head-cx (* bh 0.05)) (+ head-cy (* bh 0.15))]
                                        [(+ head-cx (* bh 0.15)) (+ head-cy (* bh 0.15))]]}]
        body-fill (nth palette (int (* (rng) (count palette))))]
    {:type :horse-archetype
     :center center :scale scale
     :body {:type :rect :x bx1 :y by1 :w bw :h bh :fill body-fill
            :stroke "#1A1A1A" :stroke-width outline-width}
     :head {:type :circle :center [head-cx head-cy] :radius (* bh 0.15) :fill body-fill
            :muzzle {:type :line :from [(+ head-cx (* bh 0.15)) head-cy]
                     :to [(+ head-cx (* bh 0.35)) head-cy]}}
     :legs (mapv #(assoc % :stroke "#1A1A1A" :stroke-width (* outline-width 0.8)) legs)
     :tail tail
     :ears ears
     :coat-dots (vec coat-dots)}))

(defn rider-figure
  "Small simplified human figure atop a horse."
  [horse-center horse-body-top scale]
  (let [h (* scale 0.08)
        cx (horse-center 0)
        cy (+ horse-body-top (* h 0.5))]
    {:type :rider
     :head {:type :circle :center [cx (+ cy (* h 0.35))] :radius (* h 0.15) :fill "#1A1A1A"}
     :torso {:type :triangle
             :points [[cx (+ cy (* h 0.2))]
                      [(- cx (* h 0.12)) (- cy (* h 0.1))]
                      [(+ cx (* h 0.12)) (- cy (* h 0.1))]]
             :fill "#FAF0E6"}}))

(defn cosmic-accessory
  "Generate a cosmic icon (sun, moon, tree, crop, bird)."
  [icon-type center scale palette]
  (case icon-type
    :sun   {:type :sun :center center :radius (* scale 0.04)
            :rays 8 :fill "#E6A817"}
    :moon  {:type :crescent :center center :radius (* scale 0.035)
            :fill "#FAF0E6"}
    :tree  {:type :tree :base center :trunk-h (* scale 0.06)
            :canopy-r (* scale 0.04) :fill "#CC5533"}
    :crop  {:type :crop-stalk :base center :height (* scale 0.05)
            :fill "#E6A817"}
    :bird  {:type :bird-v :center center :wingspan (* scale 0.03)
            :fill "#1A1A1A"}))

(defn generate
  "Pure Pithora generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [register-count register-heights slots-per-register
                slot-hierarchy rider-probability accessory-types
                outline-width palette]} params
        ;; normalize register heights to [-1, 1]
        total-h (reduce + register-heights)
        norm-h  (mapv #(* 2.0 (/ % total-h)) register-heights)

        ;; compute register y-bounds
        reg-bounds
        (loop [i 0 y -1.0 acc []]
          (if (>= i register-count) acc
            (let [h (nth norm-h i)]
              (recur (inc i) (+ y h)
                     (conj acc {:y-bot y :y-top (+ y h)
                                :y-mid (+ y (/ h 2.0)) :height h})))))

        ;; background layer (chakh wall)
        bg-layer {:id :chakh :z-index 0
                  :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0
                                :fill (get pigment-hex-map :red-ochre)}]}

        ;; generate horse and accessory layers per register
        content-layers
        (mapcat
          (fn [reg-idx {:keys [y-mid height]}]
            (let [n-slots (nth slots-per-register reg-idx)
                  slot-width (/ 2.0 n-slots)]
              (map-indexed
                (fn [slot-idx _]
                  (let [cx (+ -1.0 (* slot-width (+ slot-idx 0.5)))
                        ;; find hierarchy entry for this slot
                        hier-entry (some (fn [[_ v]]
                                          (when (and (= (:register v) reg-idx)
                                                     (= (:slot v) slot-idx)) v))
                                        slot-hierarchy)
                        scale (if hier-entry (:scale hier-entry) 0.5)
                        is-horse? (or hier-entry (< (rng) 0.7))
                        center [cx y-mid]]
                    {:id (keyword (str "slot-" reg-idx "-" slot-idx))
                     :z-index (+ 1 reg-idx)
                     :primitives
                     (if is-horse?
                       (let [h (horse-archetype center scale params rng)
                             has-rider? (< (rng) rider-probability)
                             rider (when has-rider?
                                     (rider-figure center (+ y-mid (* height 0.2)) scale))]
                         (cond-> [h] rider (conj rider)))
                       ;; accessory icon in non-horse slot
                       [(cosmic-accessory
                          (nth accessory-types (mod slot-idx (count accessory-types)))
                          center scale palette)])}))
                (range n-slots))))
          (range register-count) reg-bounds)]

    {:seed     seed
     :artform  :pithora
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   (into [bg-layer] content-layers)
     :metadata {:artform-family    :ritual-placement
                :visual-invariants [:horses-dominate :hierarchical-scale
                                    :rectangular-horse-bodies :stick-legs
                                    :dot-patterned-coats :horizontal-registers
                                    :earth-tone-palette :flat-color-fills
                                    :chakh-boundary]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Pithora |
|---|---|---|
| Red Ochre / Geru | `#CC5533` | Background wall (chakh), horse bodies, earth tones |
| Conch White | `#FAF0E6` | Horse body highlights, rider torsos, moon |
| Lampblack | `#1A1A1A` | All outlines, coat dots, bird silhouettes |
| Orpiment Yellow | `#E6A817` | Sun disc, crop stalks, decorative accents |
| Turmeric Yellow | `#E3A857` | Secondary warm fills, horse coat variants |

## Cultural Guard Rails

- **DO**: Make horses the dominant visual element. Pithora IS a horse painting tradition.
- **DO**: Scale horses hierarchically — the chief deity horse (Baba Pithora) is always largest and central.
- **DO**: Fill every horse body with a dot-pattern coat. The dots are the signature surface treatment.
- **DO**: Use earth tones exclusively. The palette comes from soil, soot, milk, and mahua.
- **DO NOT**: Use "multi-agent" or boid-like autonomous placement. Slot positions are ritually determined and fixed.
- **DO NOT**: Scatter horses randomly across the canvas. They belong in structured horizontal rows.
- **DO NOT**: Draw anatomically realistic horses. Pithora horses are geometric stencils with stick legs.
- **DO NOT**: Use bright synthetic colors (blues, greens, purples). These are absent from the earth-pigment tradition.
