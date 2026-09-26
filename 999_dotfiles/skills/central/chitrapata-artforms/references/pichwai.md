# Pichwai — Algorithmic Specification

> Narrative Scroll Family · Geographic Locus: Nathdwara, Rajasthan (near Udaipur)

## Core Algorithm

Central-radial composition around a Shrinathji deity icon, surrounded by a 24-register seasonal festival calendar grid, populated with parametrically jittered botanical and bovine archetype instances.

### Pipeline

1. **Canvas**: Large-format rectangular canvas (portrait orientation preferred). Background is a deep saturated base color (midnight blue, deep green, or rich crimson) representing the temple interior.
2. **Central Deity (Shrinathji)**: Place the iconic Shrinathji figure at the exact vertical center:
   - Strict frontal pose (like Tanjore — direct *darshan*).
   - Distinctive Shrinathji iconography: left arm raised (holding Govardhan mountain), right arm on hip, dark complexion (Krishna avatar), elaborate crown, heavy jewelry, draped *pitambar* (yellow silk).
   - Scale: occupies 30–45% of canvas height. This is the absolute focal point — all other elements radiate outward from this center.
3. **Radial Composition Zones**: Divide the remaining canvas into concentric compositional zones radiating outward from the central figure:
   - **Zone 1 (Inner)**: Immediate attendants — paired cows (*kamadhenu*), lotus pedestals, offering plates.
   - **Zone 2 (Middle)**: Seasonal narrative registers — 24 festival panels arranged in a grid/ring around the central figure.
   - **Zone 3 (Outer)**: Landscape elements — Kadamba trees, Yamuna river waves, cloud banks, gopi figures.
   - **Zone 4 (Border)**: Decorative frame border with lotus chain or jeweled band.
4. **24-Register Calendar Grid**: The 24 registers represent the daily *utsav* (festival) cycle and seasonal changes:
   - Registers are rectangular panels, arranged in a grid or concentric band formation.
   - Each register depicts a specific festival scene (Annakut, Holi, Diwali, Govardhan Puja, monsoon celebrations, etc.).
   - Register content is composed from a vocabulary of stamped archetypes with parametric jitter.
5. **Botanical Archetype Instancing**: Trees, flowers, and foliage are generated from archetype stencils with controlled variation:
   - **Kadamba trees**: Conical canopy, straight trunk, clustered round fruits. Jittered: trunk lean angle, canopy width, fruit count.
   - **Lotus clusters**: Concentric petal rings, central seed pod. Jittered: petal count, scale, rotation.
   - **Banana plants**: Fan-shaped leaf arrays. Jittered: leaf count, droop angle.
   Each instance = `archetype + jitter(rng, jitter-range)`. NOT copy-paste; subtle variation within type identity.
6. **Bovine Archetype Instancing**: Cows are sacred central motifs in Pichwai:
   - **Archetype**: Humped profile (Gir/Sahiwal breed), curved horns, decorated flank, garland.
   - Arranged in symmetrical pairs flanking the central deity or in rows within registers.
   - Jittered: horn curve angle, garland drape, coat pattern, head tilt angle.
   - Key distinction from Pithora: Pichwai cows are anatomically detailed and naturalistic (not geometric stencils with stick legs).
7. **Yamuna River Band**: Horizontal wavy band (typically lower portion) representing the sacred river:
   - Sinusoidal wave pattern with fish, lotus, and water birds.
   - Rendered in blue-silver tones.
8. **Color Application**: Rich, saturated, opaque fills. Gold and silver metallic accents for jewelry and architectural elements. Deep jewel-tone backgrounds.

## Visual Invariants (MUST Hold for Recognition)

1. **Central Shrinathji**: The deity must be at the compositional center. Pichwai is liturgical backdrop art for one specific deity.
2. **Radial outward composition**: All elements radiate outward from the central figure. The eye moves from center to periphery.
3. **Paired symmetry**: Cows, trees, gopi figures are placed in symmetrical pairs flanking the center axis.
4. **24-register structure**: Festival registers must be present as distinct rectangular panels, not merged into a continuous scene.
5. **Naturalistic cows**: Pichwai cows have anatomical detail (humps, horns, hooves, garlands). NOT geometric stick-leg stencils (that is Pithora).
6. **Deep saturated background**: Background is a rich dark jewel tone. Never white, never pale.
7. **Metallic accents**: Gold/silver on jewelry, crown, and border elements.
8. **Kadamba trees**: At least some Kadamba tree instances must be present — they are iconographically essential (Vrindavan groves).

## State Parameters & Invariants

```clojure
{:deity-height           0.4       ;; fraction of canvas height, in [0.30, 0.45]
 :deity-center           [0.0 0.0] ;; always at canvas center
 :bg-color               "#0A1744" ;; deep midnight blue, or "#0B3B2D" deep green, "#5C0A0A" deep crimson
 :register-count         24        ;; liturgical calendar, fixed at 24
 :register-layout        :grid     ;; :grid (6x4 grid) or :ring (concentric ring of panels)
 :register-panel-size    [0.14 0.12]  ;; [width, height] of each register panel
 :cow-count              8         ;; paired cows total, in [4, 12] — must be even
 :cow-jitter-range       {:horn-curve 0.1 :head-tilt 5.0 :garland-drape 0.05}
 :tree-count             6         ;; Kadamba trees, in [4, 10]
 :tree-type              :kadamba   ;; :kadamba, :banana, :mixed
 :tree-jitter-range      {:lean-angle 3.0 :canopy-width 0.08 :fruit-count-var 3}
 :lotus-count            12        ;; lotus clusters, in [6, 20]
 :lotus-jitter-range     {:petal-count-var 2 :scale-var 0.02 :rotation-var 15.0}
 :yamuna-y               -0.7      ;; vertical position of river band, in [-0.9, -0.5]
 :yamuna-amplitude       0.04      ;; wave amplitude, in [0.02, 0.08]
 :yamuna-frequency       6.0       ;; wave cycles across canvas, in [3, 10]
 :gold-color             "#D4A017"
 :silver-color           "#C0C0C0"
 :palette                [:lapis-lazuli :gold-leaf :silver-leaf :vermilion
                           :conch-white :lampblack :orpiment-yellow]}
```

### Parameter Constraints

- `cow-count` must be even (paired symmetry).
- `register-count` is fixed at 24 (liturgical calendar invariant).
- `deity-height` must be large enough that Shrinathji dominates the composition visually.
- All compositional elements must be placed in concentric zones — nothing overlaps the central deity.

## Clojure Pseudocode

```clojure
(ns art.artforms.pichwai
  "Pure Pichwai generator. Central Shrinathji + 24 festival registers + jittered archetypes.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn jitter
  "Apply bounded random jitter to a base value."
  [base range rng]
  (+ base (* range (- (* 2.0 (rng)) 1.0))))

(defn shrinathji-figure
  "Generate the central Shrinathji deity icon."
  [center height palette]
  {:type :shrinathji
   :center center :height height
   :pose :frontal
   :left-arm :raised  ;; Govardhan mountain
   :right-arm :hip
   :skin-color "#1B3F8B"  ;; dark Krishna complexion
   :pitambar-color "#E6A817"  ;; yellow silk
   :crown {:type :kirita :fill "#D4A017" :height (* height 0.12)}
   :jewelry {:fill "#D4A017" :count 5}
   :lotus-pedestal {:type :lotus :fill "#E34234" :y (- (center 1) (/ height 2))}})

(defn cow-archetype
  "Generate a single cow instance with parametric jitter."
  [center scale jitter-range facing rng]
  (let [{:keys [horn-curve head-tilt garland-drape]} jitter-range]
    {:type :cow
     :center center :scale scale :facing facing
     :body {:type :profile-body :hump true :fill "#FAF0E6"
            :breed :gir-sahiwal}
     :horns {:curve (jitter 0.3 horn-curve rng) :fill "#E6A817"}
     :head {:tilt (jitter 0.0 head-tilt rng)}
     :garland {:drape (jitter 0.1 garland-drape rng) :fill "#E34234"}
     :hooves {:type :detailed :fill "#1A1A1A"}}))

(defn kadamba-tree
  "Generate a Kadamba tree with jittered parameters."
  [base-pos scale jitter-range rng]
  (let [{:keys [lean-angle canopy-width fruit-count-var]} jitter-range]
    {:type :kadamba-tree
     :base base-pos :scale scale
     :trunk {:lean (jitter 0.0 lean-angle rng) :fill "#8B4513"}
     :canopy {:type :conical
              :width (jitter (* scale 0.3) canopy-width rng)
              :fill "#2D5A27"}
     :fruits {:count (max 3 (int (jitter 8 fruit-count-var rng)))
              :fill "#E6A817"}}))

(defn festival-register
  "Generate a single festival register panel."
  [panel-bounds festival-name palette rng]
  {:type :register-panel
   :bounds panel-bounds
   :festival festival-name
   :bg-fill (nth palette (int (* (rng) (count palette))))
   :content {:type :festival-scene :name festival-name}
   :border {:stroke "#D4A017" :stroke-width 0.002}})

(defn yamuna-river
  "Generate the sacred Yamuna river band."
  [y-center amplitude frequency palette]
  {:type :yamuna-river
   :y y-center :amplitude amplitude :frequency frequency
   :wave-samples 80
   :fill "#26619C"
   :elements [:fish :lotus :water-bird]})

(defn generate
  "Pure Pichwai generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [deity-height deity-center bg-color
                register-count register-layout register-panel-size
                cow-count cow-jitter-range
                tree-count tree-type tree-jitter-range
                lotus-count lotus-jitter-range
                yamuna-y yamuna-amplitude yamuna-frequency
                gold-color silver-color palette]} params

        ;; Layer 0: deep background
        bg-layer {:id :background :z-index 0
                  :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0 :fill bg-color}]}

        ;; Layer 1: Yamuna river band
        river (yamuna-river yamuna-y yamuna-amplitude yamuna-frequency palette)
        river-layer {:id :yamuna :z-index 1 :primitives [river]}

        ;; Layer 2: 24 festival registers
        festivals ["Annakut" "Holi" "Diwali" "Govardhan" "Janmashtami" "Sharad Purnima"
                   "Vasant" "Nand Mahotsav" "Makara" "Akshaya Tritiya" "Ganga Dussehra"
                   "Devshayani" "Hariyali Teej" "Raksha Bandhan" "Jal Jhulni" "Sharad"
                   "Gopashtami" "Tulsi Vivah" "Pushti Pravah" "Phag Utsav"
                   "Dolotsav" "Ram Navami" "Akha Teej" "Guru Purnima"]
        register-layers
        (mapv (fn [i]
                (let [row (quot i 6) col (mod i 6)
                      [pw ph] register-panel-size
                      cx (+ -0.85 (* col (+ pw 0.02)))
                      cy (+ 0.55 (* row (- 0 (+ ph 0.02))))]
                  {:id (keyword (str "register-" i)) :z-index 2
                   :primitives [(festival-register [cx cy (+ cx pw) (+ cy ph)]
                                                   (nth festivals i) palette rng)]}))
              (range register-count))

        ;; Layer 3: paired cows
        cow-layers
        (mapv (fn [i]
                (let [pair-idx (quot i 2)
                      side (if (even? i) :left :right)
                      x-offset (* 0.15 (inc pair-idx))
                      cx (if (= side :left) (- x-offset) x-offset)
                      cy (- (deity-center 1) (* deity-height 0.3) (* pair-idx 0.12))]
                  {:id (keyword (str "cow-" i)) :z-index 3
                   :primitives [(cow-archetype [cx cy] 0.08 cow-jitter-range
                                               (if (= side :left) :right :left) rng)]}))
              (range cow-count))

        ;; Layer 4: Kadamba trees
        tree-layers
        (mapv (fn [i]
                (let [angle (* 2 Math/PI (/ (double i) tree-count))
                      r 0.65
                      tx (* r (Math/cos angle))
                      ty (* r (Math/sin angle))]
                  {:id (keyword (str "tree-" i)) :z-index 4
                   :primitives [(kadamba-tree [tx ty] 0.1 tree-jitter-range rng)]}))
              (range tree-count))

        ;; Layer 5: central deity (topmost, always visible)
        deity (shrinathji-figure deity-center deity-height palette)
        deity-layer {:id :shrinathji :z-index 10 :primitives [deity]}

        ;; Layer 6: border frame
        border-layer {:id :border :z-index 11
                      :primitives [{:type :rect-stroke :bounds [-0.98 -0.98 0.98 0.98]
                                    :stroke gold-color :stroke-width 0.008}
                                   {:type :rect-stroke :bounds [-0.96 -0.96 0.96 0.96]
                                    :stroke gold-color :stroke-width 0.003}]}]

    {:seed     seed
     :artform  :pichwai
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   (vec (concat [bg-layer river-layer] register-layers cow-layers tree-layers
                            [deity-layer border-layer]))
     :metadata {:artform-family    :narrative-scroll
                :visual-invariants [:central-shrinathji :radial-outward
                                    :paired-symmetry :twenty-four-registers
                                    :naturalistic-cows :deep-background
                                    :metallic-accents :kadamba-trees]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Pichwai |
|---|---|---|
| Lapis Lazuli | `#26619C` | Background (midnight blue), Yamuna river, Krishna skin |
| Gold Leaf | `#D4A017` | Jewelry, crown, border frame, fruit accents |
| Silver Leaf | `#C0C0C0` | Moon, silver vessel accents, water highlights |
| Vermilion | `#E34234` | Garlands, lotus pedestals, festival accents |
| Conch White | `#FAF0E6` | Cow bodies, fabric highlights, lotus petals |
| Lampblack | `#1A1A1A` | Outlines, hair, pupils, deepest shadows |
| Orpiment Yellow | `#E6A817` | Pitambar silk, horn accents, warm fills |

## Cultural Guard Rails

- **DO**: Keep Shrinathji at the absolute center. Pichwai exists to serve as His liturgical backdrop.
- **DO**: Arrange elements in paired symmetry flanking the center axis.
- **DO**: Use 24 distinct festival registers — this is the liturgical calendar cycle.
- **DO**: Apply parametric jitter to instanced archetypes. Each cow and tree should vary subtly, never be exact copies.
- **DO NOT**: Confuse Pichwai cows with Pithora horses. Pichwai cows are anatomically detailed, naturalistic, with humps and garlands.
- **DO NOT**: Use pale or white backgrounds. Pichwai backgrounds are deep jewel tones — midnight blue, deep green, crimson.
- **DO NOT**: Merge registers into a continuous narrative scene. Each register is a distinct bounded panel.
- **DO NOT**: Omit Kadamba trees. They are essential Vrindavan grove iconography.
