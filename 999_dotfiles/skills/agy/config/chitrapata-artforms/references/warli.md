# Warli — Algorithmic Specification

> Radial Symmetry Family · Geographic Locus: North Sahyadri range (Thane, Palghar, Raigad), Maharashtra

## Core Algorithm

Elemental 2D primitive instancing using ONLY three shapes (circle, triangle, square) with inverted-triangle human figures chained into Archimedean spiral *tarpa* dance formations, anchored by a central sacred *chauk* enclosure.

### Pipeline

1. **Terracotta Canvas**: Background is a warm red-brown surface (representing cow-dung and red ochre plastered mud wall). All drawing is done in a single contrasting color: rice-white.
   - Background: `#8B4513` (red-brown ochre wall).
   - Drawing color: `#FFFDD0` (rice-white paste).
   - This is a **monochrome** artform: only two colors in the entire composition.
2. **Chauk (Sacred Square Enclosure)**: Place a square at the compositional center. This is the *chauk* — the sacred ritual enclosure:
   - Typically contains a goddess figure (*Palaghata* — fertility goddess) or a grain storehouse motif.
   - The *chauk* is the anchor from which all other scene elements radiate.
   - Square side length: 15–25% of canvas width.
3. **Human Figure Construction (Inverted Triangle Pair)**: Every human figure is built from exactly two inverted triangles touching at a single vertex point:
   - **Upper triangle**: Torso + arms. Apex points downward. Base is at shoulder level.
   - **Lower triangle**: Hips + legs. Apex points upward. Base is at ground level.
   - The two apexes meet at the **waist point** — a single geometric vertex.
   - **Head**: Small circle above the upper triangle.
   - **Arms/Legs**: Extend from triangle vertices as thin lines.
   - This is NOT "intersecting triangles" — the triangles TOUCH at a single point, they do not overlap.
4. **Tarpa Dance Spiral Chain**: The *tarpa* dance is the signature Warli group formation:
   - Human figures are arranged along an **Archimedean spiral** curve: `r(θ) = a + b·θ`.
   - Each figure's waist point sits on the spiral curve.
   - Figures face tangent to the spiral (outward direction of the dance chain).
   - Spacing between figures is regular along the arc length.
   - The spiral starts from a central figure (the *tarpa* musician with a wind instrument) and radiates outward.
   - All dancers are linked by clasped hands (thin lines connecting adjacent figures' arm-tips).
5. **Scene Elements (Primitive Vocabulary)**: All non-human elements are composed from the same three primitives:
   - **Tree**: Vertical line (trunk) + circle (canopy) or triangle (conical tree).
   - **House**: Square (base) + triangle (roof).
   - **Animal**: Horizontal body line + stick legs + circle head. Similar to Pithora but simpler.
   - **Sun**: Circle with radiating short lines.
   - **Grain/harvest**: Dots arranged in clusters or lines.
   - NO curves, NO splines, NO organic shapes. Everything is circles, triangles, squares, and straight lines.
6. **Scattered Scene Composition**: Arrange scene elements around the central *chauk* and *tarpa* spiral:
   - Trees, houses, animals, and harvest scenes fill the surrounding space.
   - Placement is loose and organic — not grid-aligned, but suggesting village life around the sacred center.
   - Figures and elements decrease in density toward canvas edges.
7. **Hand-Painted Edge Noise (Optional)**: To simulate the rough-textured hand-painted quality:
   - Apply Perlin noise displacement to all line endpoints and polygon vertices.
   - Small amplitude (1–3% of stroke width) — enough to break mathematical perfection without destroying recognizability.

### Human Figure Geometry (Detail)

```
         ○         ← head (circle, radius r_head)
        /|\
       / | \       ← upper triangle (torso/arms)
      /  |  \         base width = w_torso
     /   |   \
    ─────*─────    ← waist vertex (SINGLE POINT where triangles touch)
     \   |   /
      \  |  /     ← lower triangle (hips/legs)
       \ | /         base width = w_hips
        \|/
    ─────┴─────    ← ground level (feet extend from base vertices)
```

Key geometric ratios:
- `r_head` ≈ 0.15 × total figure height
- `w_torso` ≈ 0.5 × total figure height
- `w_hips` ≈ 0.4 × total figure height
- Upper triangle height ≈ 0.4 × total height
- Lower triangle height ≈ 0.45 × total height

### Archimedean Spiral Geometry

```clojure
;; Archimedean spiral: r = a + b * theta
(defn spiral-point [a b theta]
  (let [r (+ a (* b theta))]
    [(* r (Math/cos theta))
     (* r (Math/sin theta))]))
```

Dancers are placed at equal arc-length intervals along the spiral. The number of dancers determines the total angular sweep.

## Visual Invariants (MUST Hold for Recognition)

1. **Only three shape primitives**: Circle, triangle, square. NO other geometric forms. NO curves, NO splines, NO freeform shapes.
2. **Monochrome**: Rice-white drawings on terracotta red-brown background. Only two colors in the entire composition.
3. **Inverted triangle humans**: Every human is two triangles meeting at a SINGLE vertex point (not intersecting, not overlapping).
4. **Tarpa spiral dance**: At least one spiral chain of linked dancing figures must be present.
5. **Central chauk square**: A sacred square enclosure anchors the composition center.
6. **Stick-line limbs**: Arms and legs are single thin lines. No volume, no width modulation.
7. **Circle heads**: Every human and animal head is a plain circle.
8. **No organic curves**: All forms are rectilinear or circular arcs only.

## State Parameters & Invariants

```clojure
{:bg-color              "#8B4513"   ;; red-brown ochre wall
 :draw-color            "#FFFDD0"   ;; rice-white paste
 :chauk-size            0.25        ;; square side as fraction of canvas width, in [0.15, 0.30]
 :chauk-center          [0.0 0.0]
 :chauk-content         :palaghata  ;; :palaghata (goddess), :grain-store, :empty
 :spiral-a              0.05        ;; Archimedean spiral initial radius, in [0.03, 0.10]
 :spiral-b              0.025       ;; spiral growth rate per radian, in [0.01, 0.05]
 :dancer-count          16          ;; number of dancers in tarpa chain, in [8, 32]
 :dancer-spacing        0.4         ;; arc-length between dancers (radians), in [0.25, 0.6]
 :figure-height         0.06        ;; individual human figure height, in [0.04, 0.10]
 :head-radius-ratio     0.15        ;; head radius / figure height, in [0.10, 0.20]
 :torso-width-ratio     0.5         ;; torso triangle base / figure height, in [0.35, 0.60]
 :hip-width-ratio       0.4         ;; hip triangle base / figure height, in [0.30, 0.50]
 :tree-count            6           ;; scattered trees, in [3, 12]
 :house-count           3           ;; scattered houses, in [1, 6]
 :animal-count          5           ;; scattered animals, in [2, 10]
 :stroke-width          0.003       ;; line width for all strokes, in [0.002, 0.005]
 :noise-amplitude       0.0015      ;; Perlin edge noise, in [0.0, 0.003] (0 = mathematically perfect)
 }
```

### Parameter Constraints

- Only TWO colors permitted: `bg-color` and `draw-color`. No additional colors.
- `chauk-center` should be at or near `[0, 0]`.
- `dancer-count` × `dancer-spacing` determines the total spiral sweep angle.
- All scene elements (trees, houses, animals) must be constructible from circles, triangles, squares, and lines only.

## Clojure Pseudocode

```clojure
(ns art.artforms.warli
  "Pure Warli generator. Three primitives + tarpa spiral + chauk.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(def draw-color "#FFFDD0")

(defn warli-human
  "Generate a Warli human figure from two inverted triangles + circle head."
  [waist-point height facing-angle params]
  (let [{:keys [head-radius-ratio torso-width-ratio hip-width-ratio stroke-width]} params
        h height
        r-head (* h head-radius-ratio)
        w-torso (* h torso-width-ratio 0.5)
        w-hips (* h hip-width-ratio 0.5)
        h-upper (* h 0.4)
        h-lower (* h 0.45)
        wx (waist-point 0) wy (waist-point 1)
        ;; construct relative to waist, then rotate by facing-angle
        head-y (+ wy h-upper r-head)
        ;; upper triangle (waist apex up to shoulders)
        upper {:type :triangle
               :points [[wx wy]
                        [(- wx w-torso) (+ wy h-upper)]
                        [(+ wx w-torso) (+ wy h-upper)]]
               :stroke draw-color :stroke-width stroke-width :fill nil}
        ;; lower triangle (waist apex down to ground)
        lower {:type :triangle
               :points [[wx wy]
                        [(- wx w-hips) (- wy h-lower)]
                        [(+ wx w-hips) (- wy h-lower)]]
               :stroke draw-color :stroke-width stroke-width :fill nil}
        ;; head
        head {:type :circle :center [wx head-y] :radius r-head
              :stroke draw-color :stroke-width stroke-width :fill nil}
        ;; arm lines (from upper triangle base vertices outward)
        arms [{:type :line :from [(- wx w-torso) (+ wy h-upper)]
               :to [(- wx (* w-torso 1.5)) (+ wy (* h-upper 0.7))]
               :stroke draw-color :stroke-width stroke-width}
              {:type :line :from [(+ wx w-torso) (+ wy h-upper)]
               :to [(+ wx (* w-torso 1.5)) (+ wy (* h-upper 0.7))]
               :stroke draw-color :stroke-width stroke-width}]]
    {:type :warli-human :waist waist-point
     :primitives (into [upper lower head] arms)}))

(defn tarpa-spiral
  "Generate an Archimedean spiral chain of dancing humans."
  [center a b dancer-count dancer-spacing figure-height params rng]
  (let [dancers
        (mapv (fn [i]
                (let [theta (* i dancer-spacing)
                      r (+ a (* b theta))
                      x (+ (center 0) (* r (Math/cos theta)))
                      y (+ (center 1) (* r (Math/sin theta)))
                      facing (+ theta (/ Math/PI 2))]
                  (warli-human [x y] figure-height facing params)))
              (range dancer-count))
        ;; hand-linking lines between adjacent dancers
        links
        (mapv (fn [i]
                (let [d1 (nth dancers i)
                      d2 (nth dancers (inc i))
                      ;; connect right arm tip of d1 to left arm tip of d2
                      p1 (get-in d1 [:primitives 4 :to])  ;; right arm tip
                      p2 (get-in d2 [:primitives 3 :to])] ;; left arm tip
                  {:type :line :from p1 :to p2
                   :stroke draw-color :stroke-width (:stroke-width params)}))
              (range (dec dancer-count)))]
    {:type :tarpa-spiral
     :primitives (vec (concat (mapcat :primitives dancers) links))}))

(defn chauk-square
  "Generate the central sacred chauk enclosure."
  [center size content-type params]
  (let [half (/ size 2.0)
        cx (center 0) cy (center 1)
        sw (:stroke-width params)]
    {:type :chauk
     :primitives
     (concat
       [{:type :polygon
         :points [[(- cx half) (- cy half)] [(+ cx half) (- cy half)]
                  [(+ cx half) (+ cy half)] [(- cx half) (+ cy half)]]
         :stroke draw-color :stroke-width sw :fill nil}]
       (case content-type
         :palaghata [(warli-human center (* size 0.6) 0 params)]
         :grain-store [{:type :polygon  ;; grain pot triangle
                        :points [[cx (+ cy (* half 0.4))]
                                 [(- cx (* half 0.3)) (- cy (* half 0.2))]
                                 [(+ cx (* half 0.3)) (- cy (* half 0.2))]]
                        :stroke draw-color :stroke-width sw :fill nil}]
         []))}))

(defn warli-tree
  "Generate a tree from circle + line primitives."
  [base-pos scale params rng]
  (let [sw (:stroke-width params)
        trunk-h (* scale 0.6)
        canopy-r (* scale 0.25)
        tx (base-pos 0)
        ty (base-pos 1)]
    {:type :tree
     :primitives [{:type :line :from [tx ty] :to [tx (+ ty trunk-h)]
                   :stroke draw-color :stroke-width sw}
                  {:type :circle :center [tx (+ ty trunk-h canopy-r)]
                   :radius canopy-r :stroke draw-color :stroke-width sw :fill nil}]}))

(defn warli-house
  "Generate a house from square + triangle."
  [base-pos scale params]
  (let [sw (:stroke-width params)
        s (* scale 0.5)
        bx (base-pos 0) by (base-pos 1)]
    {:type :house
     :primitives [{:type :polygon  ;; square base
                   :points [[(- bx s) by] [(+ bx s) by]
                            [(+ bx s) (+ by (* s 2))] [(- bx s) (+ by (* s 2))]]
                   :stroke draw-color :stroke-width sw :fill nil}
                  {:type :triangle  ;; triangular roof
                   :points [[(- bx (* s 1.2)) (+ by (* s 2))]
                            [(+ bx (* s 1.2)) (+ by (* s 2))]
                            [bx (+ by (* s 3))]]
                   :stroke draw-color :stroke-width sw :fill nil}]}))

(defn generate
  "Pure Warli generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [bg-color chauk-size chauk-center chauk-content
                spiral-a spiral-b dancer-count dancer-spacing figure-height
                tree-count house-count animal-count stroke-width]} params

        ;; Layer 0: terracotta background
        bg-layer {:id :wall :z-index 0
                  :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0 :fill bg-color}]}

        ;; Layer 1: central chauk
        chauk (chauk-square chauk-center chauk-size chauk-content params)
        chauk-layer {:id :chauk :z-index 1 :primitives (:primitives chauk)}

        ;; Layer 2: tarpa dance spiral
        spiral (tarpa-spiral [0.0 0.15] spiral-a spiral-b
                             dancer-count dancer-spacing figure-height params rng)
        spiral-layer {:id :tarpa :z-index 2 :primitives (:primitives spiral)}

        ;; Layer 3: scattered scene elements
        scene-prims
        (concat
          ;; trees
          (mapv (fn [_]
                  (let [x (- (* 2.0 (rng)) 1.0)
                        y (- (* 2.0 (rng)) 1.0)]
                    (warli-tree [x y] 0.08 params rng)))
                (range tree-count))
          ;; houses
          (mapv (fn [_]
                  (let [x (- (* 2.0 (rng)) 1.0)
                        y (- (* 1.5 (rng)) 0.75)]
                    (warli-house [x y] 0.06 params)))
                (range house-count)))
        scene-layer {:id :scene :z-index 3
                     :primitives (vec (mapcat :primitives scene-prims))}]

    {:seed     seed
     :artform  :warli
     :params   params
     :palette  [{:name "terracotta" :hex bg-color}
                {:name "rice-white" :hex draw-color}]
     :layers   [bg-layer chauk-layer spiral-layer scene-layer]
     :metadata {:artform-family    :radial-symmetry
                :visual-invariants [:three-primitives-only :monochrome
                                    :inverted-triangle-humans :tarpa-spiral
                                    :central-chauk :stick-limbs
                                    :circle-heads :no-organic-curves]}}))
```

## Pigment Palette (Canonical — Monochrome)

| Pigment | Hex | Role |
|---|---|---|
| Red Ochre Wall | `#8B4513` | Background — cow-dung and ochre plastered mud wall |
| Rice White Paste | `#FFFDD0` | ALL drawing — every line, circle, triangle, square |

> **MONOCHROME INVARIANT**: Only these two colors exist. No third color may be introduced under any circumstance.

## Cultural Guard Rails

- **DO**: Use ONLY circles, triangles, squares, and straight lines. This extreme minimalism IS Warli's identity.
- **DO**: Build humans from two triangles touching at a single vertex (waist point). NOT overlapping, NOT intersecting.
- **DO**: Include at least one *tarpa* spiral dance chain. It is the most recognizable Warli composition.
- **DO**: Place a sacred *chauk* square at the center. It anchors the entire scene.
- **DO**: Keep the composition monochrome. Rice-white on red-brown. Nothing else.
- **DO NOT**: Use any curves, splines, or freeform shapes. Warli vocabulary is strictly geometric.
- **DO NOT**: Add colors. No blue, no green, no yellow. Monochrome only.
- **DO NOT**: Draw anatomically detailed humans. Warli humans are pure geometric abstractions.
- **DO NOT**: Describe the triangles as "intersecting." They TOUCH at a single vertex point.
