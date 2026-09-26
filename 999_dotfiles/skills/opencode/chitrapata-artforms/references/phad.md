# Phad — Algorithmic Specification

> Narrative Scroll Family · Geographic Locus: Shahpura & Bhilwara, Rajasthan; Joshi clan of Chhipa community

## Core Algorithm

Wide horizontal continuous scroll layout with hierarchical rank-based scaling (size = socio-political importance, NOT spatial distance), strict profile-only figure orientation, and multi-episode simultaneous narrative scene placement.

### Pipeline

1. **Wide Horizontal Canvas**: Phad is a horizontal scroll painting, traditionally 15–30 feet long. The canvas aspect ratio is extreme — typically 4:1 to 8:1 (width:height):
   - Normalize to `[-1, 1]` in both axes, but render at a wide aspect ratio via the `:aspect-ratio` parameter.
   - The viewer reads the scroll left-to-right (or unfurls it section by section).
2. **Vertical Register Bands**: Divide the canvas height into 2–3 overlapping vertical zones:
   - **Upper zone**: Sky, divine realm, palatial scenes. Contains the largest (most important) figures.
   - **Middle zone**: Human realm, battle scenes, processions, village life.
   - **Lower zone**: Earth, water, underworld. Animals, rivers, vegetation.
   - Zones are NOT separated by hard borders — figures and scenes can span zones. The division is a compositional guideline, not a grid.
3. **Hierarchical Scale Assignment**: Figure size encodes **socio-political rank**, not spatial perspective:
   - **Chief deity (Pabuji/Devnarayan)**: Largest figure. Scale factor 1.0. Occupies 60–80% of register height.
   - **Consorts, allies**: Scale 0.6–0.8.
   - **Warriors, attendants**: Scale 0.4–0.6.
   - **Commoners, animals**: Scale 0.2–0.4.
   - **Invariant**: A commoner standing next to the deity is drawn SMALLER, regardless of their spatial position. Size = rank.
4. **Profile-Only Figure Rendering**: ALL figures — human, divine, animal — are rendered in strict profile view:
   - The face is a side profile: one visible eye, nose in profile, chin line.
   - The torso may be slightly turned (toward viewer) but the head is ALWAYS in pure profile.
   - Feet point in the walking/facing direction.
   - **Eyes are drawn LAST** — in the traditional consecration (*pran pratishtha*) ceremony. In the algorithmic version, generate the figure body first, add eyes as a final overlay layer.
5. **Simultaneous Multi-Episode Layout**: The Phad scroll depicts MANY narrative episodes simultaneously on a single continuous canvas:
   - Episodes from the epic (Pabuji ki Phad or Devnarayan ki Phad) are laid out spatially, not temporally.
   - Multiple events coexist in the same visual field — a birth scene next to a battle next to a coronation.
   - Episodes are differentiated by figure groupings and architectural/landscape dividers (trees, buildings, walls), not by panel borders.
   - The *Bhopa* (priest-singer) points to each episode with a lamp during the overnight performance, narrating the story out of visual order.
6. **Architectural and Landscape Dividers**: Scenes are separated by:
   - **Fortresses/palaces**: Rectangular structures with crenellated battlements and arched doorways.
   - **Trees**: Stylized conical or rounded canopy trees.
   - **Rivers/water**: Horizontal wavy bands with fish motifs.
   - **Horses and camels**: Procession lines moving in the same direction indicate scene transitions.
7. **Color Application — Seven-Stage Mineral Order**: Traditional Phad painting follows a strict color application sequence:
   - Stage 1: Yellow (orpiment) — background wash, skin base.
   - Stage 2: Green (verdigris) — foliage, landscape.
   - Stage 3: Brown (burnt sienna) — earth, architecture.
   - Stage 4: Red (cinnabar/vermilion) — garments, blood, fire.
   - Stage 5: Blue (indigo) — sky, water, Krishna skin.
   - Stage 6: Black (lampblack) — all outlines, hair, details (applied AFTER all color).
   - Stage 7: White (lime) — highlights, eye whites, finishing touches.
   Colors are flat and opaque. The layer order matters for rendering.

### Hierarchical Scale Model

```
                CHIEF DEITY (scale 1.0)
                    ┃
              ┏━━━━━┻━━━━━┓
          CONSORT       ALLY
          (0.7)         (0.65)
              ┃           ┃
         ┏━━━━┻━━━━┓     ┏┻━━━┓
      WARRIOR   WARRIOR  HORSE ATTENDANT
       (0.5)     (0.45)  (0.35) (0.3)
                           ┃
                     ┏━━━━━┻━━━━━┓
                  COMMONER    ANIMAL
                   (0.25)     (0.2)
```

A figure's height in the composition = `base_height × rank_scale`.

### Profile Figure Construction

```
         ┌──╮          ← profile head (one visible eye socket)
         │  │
    ┌────┘  └──┐       ← shoulders
    │          │
    │  torso   │       ← body (slightly rotated toward viewer)
    │          │
    └───┐  ┌───┘       ← waist
        │  │
        │  │           ← legs
       ╱    ╲          ← feet (pointing in walking direction)
```

- Single visible eye = circle or almond on the profile side.
- Nose = triangular protrusion from face outline.
- Garments rendered as flat colored panels overlaying the body silhouette.

## Visual Invariants (MUST Hold for Recognition)

1. **Wide horizontal format**: Aspect ratio must be at least 3:1 (width:height). Phad is a SCROLL, not a portrait.
2. **Hierarchical scale**: Figure size encodes rank. Chief deity is the largest figure on the entire scroll.
3. **Profile-only figures**: ALL heads in pure side profile. No frontal faces, no three-quarter views.
4. **Eyes as final layer**: Eyes are added last, as a separate overlay layer (representing consecration).
5. **Simultaneous episodes**: Multiple narrative events coexist on the same canvas without panel borders.
6. **Scene dividers (not borders)**: Trees, buildings, and procession lines separate episodes — not drawn panel frames.
7. **Flat opaque colors**: No gradients, no washes, no transparency.
8. **Black outlines last**: All outlines are drawn AFTER color fills (Stage 6 of the mineral order).

## State Parameters & Invariants

```clojure
{:aspect-ratio          5.0       ;; width:height ratio, in [3.0, 8.0]
 :episode-count         6         ;; narrative episodes on the scroll, in [3, 12]
 :register-zones        3         ;; vertical zones (upper/middle/lower), in [2, 3]
 :rank-hierarchy                  ;; figure scale assignments
   {:chief-deity   {:scale 1.0  :zone :upper}
    :consort       {:scale 0.7  :zone :upper}
    :ally          {:scale 0.65 :zone :upper}
    :warrior       {:scale 0.5  :zone :middle}
    :horse         {:scale 0.35 :zone :middle}
    :attendant     {:scale 0.3  :zone :middle}
    :commoner      {:scale 0.25 :zone :lower}
    :animal        {:scale 0.2  :zone :lower}}
 :base-figure-height   0.35      ;; height of scale-1.0 figure, in [0.25, 0.45]
 :figures-per-episode  5          ;; average figures per episode, in [3, 10]
 :divider-types        [:tree :fortress :river :horse-procession]
 :divider-density      0.7       ;; fraction of episode boundaries with explicit dividers, in [0.3, 1.0]
 :eye-layer-separate   true      ;; eyes rendered as final overlay layer (always true)
 :outline-width        0.004     ;; black contour width, in [0.002, 0.008]
 :palette-order        [:orpiment-yellow :malachite :burnt-sienna
                         :vermilion :indigo :lampblack :conch-white]}
```

### Parameter Constraints

- `aspect-ratio` must be ≥ 3.0 (scroll format requirement).
- `rank-hierarchy` scales must be strictly decreasing with rank distance from `:chief-deity`.
- `eye-layer-separate` is always `true` — this is a ritual invariant.
- `palette-order` defines the rendering layer sequence: earlier colors are rendered first (background), later colors overlay.

## Clojure Pseudocode

```clojure
(ns art.artforms.phad
  "Pure Phad generator. Wide horizontal scroll + rank scaling + profile figures.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn profile-figure
  "Generate a profile-view figure at the given position, scaled by rank."
  [position rank-scale base-height facing palette params]
  (let [h (* base-height rank-scale)
        w (* h 0.35)
        px (position 0) py (position 1)
        dir (if (= facing :right) 1 -1)
        ;; profile head
        head-cx (+ px (* dir w 0.1))
        head-cy (+ py h (- (* h 0.08)))
        head-r (* h 0.08)
        ;; body polygon (simplified profile torso)
        body {:type :polygon
              :points [[(- px (* w 0.3)) py]           ;; left hip
                       [(+ px (* w 0.3)) py]           ;; right hip
                       [(+ px (* w 0.35)) (+ py (* h 0.6))] ;; right shoulder
                       [(- px (* w 0.25)) (+ py (* h 0.6))]] ;; left shoulder
              :fill (nth palette 3)  ;; vermilion garment
              :stroke nil}
        ;; profile head outline
        head {:type :circle :center [head-cx head-cy] :radius head-r
              :fill (nth palette 0)  ;; yellow skin
              :stroke nil}
        ;; nose (profile protrusion)
        nose {:type :triangle
              :points [[head-cx (+ head-cy (* head-r 0.1))]
                       [(+ head-cx (* dir head-r 1.2)) head-cy]
                       [head-cx (- head-cy (* head-r 0.2))]]
              :fill (nth palette 0) :stroke nil}
        ;; legs
        legs [{:type :line :from [(- px (* w 0.15)) py]
               :to [(- px (* w 0.2)) (- py (* h 0.35))]
               :stroke (nth palette 5) :stroke-width (:outline-width params)}
              {:type :line :from [(+ px (* w 0.15)) py]
               :to [(+ px (* w 0.2)) (- py (* h 0.35))]
               :stroke (nth palette 5) :stroke-width (:outline-width params)}]
        ;; eye socket (PLACEHOLDER — filled in final eye layer)
        eye-socket {:type :eye-socket
                    :center [(+ head-cx (* dir head-r 0.4))
                             (+ head-cy (* head-r 0.15))]
                    :radius (* head-r 0.2)}]
    {:type :profile-figure :rank-scale rank-scale :facing facing
     :body-primitives [body head nose]
     :limb-primitives legs
     :eye-socket eye-socket
     :position position :height h}))

(defn scene-divider
  "Generate a scene divider element (tree, fortress, river)."
  [div-type x-pos canvas-h palette params]
  (case div-type
    :tree {:type :tree :primitives
           [{:type :line :from [x-pos (- (/ canvas-h 2))]
             :to [x-pos (/ canvas-h 4)]
             :stroke (nth palette 5) :stroke-width 0.005}
            {:type :circle :center [x-pos (/ canvas-h 3)]
             :radius 0.06 :fill (nth palette 1)}]}
    :fortress {:type :fortress :primitives
               [{:type :polygon
                 :points [[(- x-pos 0.08) (- (/ canvas-h 2))]
                          [(+ x-pos 0.08) (- (/ canvas-h 2))]
                          [(+ x-pos 0.08) (/ canvas-h 3)]
                          [(- x-pos 0.08) (/ canvas-h 3)]]
                 :fill (nth palette 2)}
                ;; crenellations
                {:type :rect :center [x-pos (+ (/ canvas-h 3) 0.02)]
                 :w 0.18 :h 0.03 :fill (nth palette 2)}]}
    :river {:type :river :primitives
            [{:type :sine-band :y (- (/ canvas-h 2) 0.05)
              :amplitude 0.02 :frequency 8 :width 0.04
              :fill (nth palette 4)}]}
    :horse-procession {:type :procession :primitives
                       [{:type :horse-row :x x-pos :count 3
                         :scale 0.04 :facing :right
                         :fill (nth palette 0)}]}))

(defn generate
  "Pure Phad generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [aspect-ratio episode-count register-zones rank-hierarchy
                base-figure-height figures-per-episode
                divider-types divider-density outline-width palette-order]} params
        ;; canvas dimensions in normalized space
        canvas-w 2.0  ;; [-1, 1]
        canvas-h (/ 2.0 aspect-ratio)  ;; scaled by aspect ratio
        half-h (/ canvas-h 2.0)

        ;; Layer 0: background (yellow wash — Stage 1)
        bg-layer {:id :background :z-index 0
                  :primitives [{:type :rect :center [0 0] :w canvas-w :h canvas-h
                                :fill (get pigment-hex-map (first palette-order))}]}

        ;; compute episode x-bounds
        episode-width (/ canvas-w episode-count)
        episode-bounds (mapv (fn [i]
                               {:x-start (+ -1.0 (* i episode-width))
                                :x-end   (+ -1.0 (* (inc i) episode-width))
                                :x-mid   (+ -1.0 (* (+ i 0.5) episode-width))})
                             (range episode-count))

        ;; Layer 1-N: episode figures (colored fills — Stages 1-5)
        figure-layers
        (mapcat
          (fn [ep-idx {:keys [x-start x-end x-mid]}]
            (let [ranks (keys rank-hierarchy)
                  n-figs (min figures-per-episode (count ranks))
                  selected-ranks (take n-figs (shuffle ranks))
                  figs (map-indexed
                         (fn [fig-idx rank-key]
                           (let [{:keys [scale zone]} (get rank-hierarchy rank-key)
                                 fig-x (+ x-start (* (/ (- x-end x-start) (inc n-figs)) (inc fig-idx)))
                                 fig-y (case zone
                                         :upper (* half-h 0.3)
                                         :middle 0.0
                                         :lower (- (* half-h 0.3)))
                                 facing (if (< (rng) 0.5) :right :left)]
                             (profile-figure [fig-x fig-y] scale base-figure-height
                                             facing palette-order params)))
                         selected-ranks)]
              (map-indexed
                (fn [i fig]
                  {:id (keyword (str "ep" ep-idx "-fig" i)) :z-index (+ 1 ep-idx)
                   :primitives (concat (:body-primitives fig) (:limb-primitives fig))})
                figs)))
          (range) episode-bounds)

        ;; Layer N+1: scene dividers
        divider-layers
        (keep-indexed
          (fn [i {:keys [x-end]}]
            (when (and (< i (dec episode-count))
                       (< (rng) divider-density))
              (let [div-type (nth divider-types (mod i (count divider-types)))]
                {:id (keyword (str "divider-" i))
                 :z-index (+ episode-count 1)
                 :primitives (:primitives (scene-divider div-type x-end canvas-h
                                                          palette-order params))})))
          episode-bounds)

        ;; Layer N+2: black outlines on everything (Stage 6)
        outline-layer {:id :outlines :z-index 90
                       :primitives [{:type :outline-pass
                                     :stroke "#1A1A1A"
                                     :stroke-width outline-width
                                     :apply-to :all-previous-layers}]}

        ;; Layer N+3: FINAL — eyes (Stage 7 — consecration)
        all-figures (mapcat (fn [l] (filter #(= (:type %) :profile-figure)
                                            (:primitives l)))
                            figure-layers)
        eye-layer {:id :eyes-consecration :z-index 99
                   :primitives
                   (mapv (fn [fig]
                           (let [{:keys [center radius]} (:eye-socket fig)]
                             {:type :circle :center center :radius radius
                              :fill "#1A1A1A"
                              :highlight {:type :circle
                                          :center [(+ (center 0) (* radius 0.3))
                                                   (+ (center 1) (* radius 0.3))]
                                          :radius (* radius 0.3)
                                          :fill "#FAF0E6"}}))
                         all-figures)}]

    {:seed     seed
     :artform  :phad
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette-order)
     :layers   (vec (concat [bg-layer] figure-layers divider-layers
                            [outline-layer eye-layer]))
     :metadata {:artform-family    :narrative-scroll
                :aspect-ratio      aspect-ratio
                :visual-invariants [:wide-horizontal-scroll :hierarchical-scale
                                    :profile-only-figures :eyes-final-layer
                                    :simultaneous-episodes :scene-dividers
                                    :flat-opaque-colors :outlines-after-color]}}))
```

## Pigment Palette (Canonical — Applied in Stage Order)

| Stage | Pigment | Hex | Application |
|---|---|---|---|
| 1 | Orpiment Yellow | `#E6A817` | Background wash, skin base |
| 2 | Malachite Green | `#1E9E50` | Foliage, landscape, vegetation |
| 3 | Burnt Sienna | `#8A4513` | Earth, architecture, fortress walls |
| 4 | Vermilion | `#E34234` | Garments, fire, blood, auspicious marks |
| 5 | Indigo | `#1B3F8B` | Sky, water, Krishna/divine skin |
| 6 | Lampblack | `#1A1A1A` | ALL outlines — applied AFTER all color |
| 7 | Conch White / Lime | `#FAF0E6` | Highlights, eye whites, finishing |

> **Stage order matters for rendering.** Outlines (Stage 6) must be drawn AFTER all color fills (Stages 1–5). Eyes (part of Stage 7) are the absolute last element rendered.

## Cultural Guard Rails

- **DO**: Use a wide horizontal aspect ratio. Phad is a scroll, not a panel or portrait.
- **DO**: Scale figures by socio-political rank, not spatial distance. The chief deity is always the largest.
- **DO**: Render ALL figures in strict profile. No frontal faces.
- **DO**: Add eyes as the very last rendering pass. This respects the consecration ritual.
- **DO**: Place multiple narrative episodes simultaneously on the same canvas without panel borders.
- **DO**: Use scene dividers (trees, fortresses, rivers) to separate episodes visually.
- **DO NOT**: Use perspective-based size scaling. Size = RANK, not distance.
- **DO NOT**: Draw any figure in frontal view. Pure profile only.
- **DO NOT**: Enclose episodes in panel border frames. Episodes share a continuous visual field.
- **DO NOT**: Apply outlines before color fills. The mineral application sequence is ritually significant.
