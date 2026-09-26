# Kerala Murals — Algorithmic Specification

> Relief / Layered Family · Geographic Locus: Temples & royal palaces of Kerala (Padmanabhapuram, Mattancherry, Vadakkunnathan)

## Core Algorithm

Canonical *tala* proportional figure skeleton construction with *Panchavarna* five-color hard quantization, stippled gradient shading (*kandana*), and rhythmic flowing contour strokes.

### Pipeline

1. **Temple Wall Canvas**: Background is a warm ochre-brown surface (lime plaster ground). The full `[-1, 1]` canvas represents a sanctum wall panel.
2. **Figure Skeleton via Tala System**: Construct the primary figure using the *Shilpa Shastra* / *Chitrasutra* proportional canon:
   - The **tala** (palm-length) is the base unit. Total figure height = `n_tala` palm units.
   - Divine figures: 10 tala (*dashatala*). Heroic/royal: 8 tala. Human: 7 tala.
   - Key proportional ratios (expressed in tala units):
     - Head height: 1.0 tala
     - Face width: 0.75 tala
     - Shoulder width: 2.5 tala
     - Waist: 1.5 tala
     - Hip: 2.0 tala
   - A vertical spine line with horizontal cross-bars defines the skeleton. Each cross-bar locates a joint (shoulders, elbows, waist, hips, knees, ankles).
3. **Silhouette Construction**: From the proportional skeleton, construct the figure silhouette as a smooth closed spline:
   - The silhouette follows *curvilinear voluptuous anatomy* — Kerala Murals use exaggerated curves at hips, chest, and waist (not angular or geometric).
   - Contour lines are rhythmic and flowing — even straight limbs have subtle curvature.
4. **Facial Expression (Rasa System)**: The face follows the *navarasas* (nine emotional expressions). Each rasa maps to specific geometric rules:
   - *Shringara* (love): Slightly lowered eyelids, gentle lip curve, tilted head.
   - *Veera* (heroism): Wide-open eyes, raised eyebrows, firm jaw.
   - *Roudra* (fury): Flared nostrils, bared teeth, furrowed brow.
   - Eyes are large, elongated, and expressive — similar to Pattachitra's padma chokh but with rounder lower lids.
5. **Panchavarna Five-Color Quantization**: All colors in the entire composition MUST come from exactly five pigments. No exceptions:
   - **White** (*vellai*): Lime plaster — background, highlights, eye whites.
   - **Yellow** (*manjal*): Laterite stone — skin, gold ornaments, warm accents.
   - **Red** (*chemmannam*): Cinnabar / red laterite — lips, garment borders, kumkum marks.
   - **Green-Blue** (*pachcha*): Indigo + neem juice — deity skin (Krishna/Vishnu), foliage, water.
   - **Black** (*karuppu*): Lamp soot — all outlines, hair, pupils, deepest shadows.
   Every fill, stroke, and shading element must map to one of these five and only these five.
6. **Stippled Gradient Shading (Kandana)**: Volume is suggested NOT by continuous gradient blending, but by **stippled dot density modulation**:
   - In shadow regions: dense dot clusters (high density, dots nearly touching).
   - In highlight regions: sparse dots or none (bare background shows through).
   - Dots are rendered in the darkest adjacent Panchavarna color (usually black or green-blue).
   - This is distinct from Kalighat one-sided wash (continuous gradient) and Madhubani hatching (parallel lines).
7. **Ornamental Details**: Crown (*kirita*), heavy jewelry chains, beaded necklaces, armlets, anklets, and elaborate hair arrangements. All rendered with flowing outlines and flat Panchavarna fills.
8. **Architectural Frame**: Figures are often framed within temple arch elements or pillar boundaries. These follow the same five-color constraint.

### Tala Proportional Skeleton

```
         ─── crown (0.5 tala above head)
         ┃
    ┌────╂────┐  ← head (1.0 tala)
    │    ╂    │
    └────╂────┘
         ╂
   ┌─────╂─────┐  ← shoulders (2.5 tala wide)
   │     ╂     │
   │   ┌─╂─┐   │  ← chest
   │   │ ╂ │   │
   │   └─╂─┘   │  ← waist (1.5 tala)
   │     ╂     │
   ├─────╂─────┤  ← hips (2.0 tala wide)
   │     ╂     │
   │     ╂     │  ← thighs
   │     ╂     │
   ├─────╂─────┤  ← knees
   │     ╂     │
   │     ╂     │  ← calves
   │     ╂     │
   └─────╂─────┘  ← ankles / feet
```

Joint positions are computed as fractions of total height:
- Head top: 1.0
- Chin: 0.9
- Shoulders: 0.82
- Chest: 0.72
- Waist: 0.60
- Hips: 0.52
- Knees: 0.30
- Ankles: 0.05

## Visual Invariants (MUST Hold for Recognition)

1. **Exactly five colors (Panchavarna)**: White, Yellow, Red, Green-Blue, Black. No sixth color permitted. No hex values outside these five.
2. **Curvilinear voluptuous anatomy**: Figures have exaggerated rounded curves at hips, chest, waist. Angular or geometric body shapes are NOT Kerala Murals.
3. **Flowing rhythmic outlines**: Even straight limbs have subtle curvature. Rigid geometric outlines are incorrect.
4. **Stippled shading (kandana)**: Volume comes from dot density variation, not continuous gradients, not parallel hatching.
5. **Tala-proportioned figures**: Body proportions must follow the canonical ratios. Freehand or naturalistic proportions are incorrect.
6. **Large expressive eyes**: Eyes are the emotional center — always large, elongated, and emotion-specific.
7. **Heavy ornamentation**: Crowns, necklaces, armlets are mandatory for divine/royal figures.
8. **Black outlines on all forms**: Every shape boundary is stroked in lamp soot black.

## State Parameters & Invariants

```clojure
{:figure-tala          10        ;; divine = 10 (dashatala), heroic = 8, human = 7
 :figure-height        1.4       ;; in normalized units, in [0.8, 1.6]
 :figure-center        [0.0 0.0]
 :pose                 :tribhanga ;; :tribhanga (S-curve), :samabhanga (straight), :abhanga (slight bend)
 :rasa                 :shringara ;; :shringara, :veera, :roudra, :karuna, :hasya, :bhayanaka, :bibhatsa, :adbhuta, :shanta
 :eye-width-ratio      0.65      ;; eye width / head width, in [0.5, 0.75]
 :shoulder-ratio       2.5       ;; shoulder width / head height, in [2.0, 3.0]
 :waist-ratio          1.5       ;; waist width / head height, in [1.2, 1.8]
 :hip-ratio            2.0       ;; hip width / head height, in [1.6, 2.4]
 :silhouette-curvature 0.15      ;; spline tension for curvilinear body outline, in [0.05, 0.25]
 :kandana-density-shadow 0.8     ;; dot density in shadow areas (0=none, 1=solid), in [0.5, 0.95]
 :kandana-density-highlight 0.05 ;; dot density in highlight areas, in [0.0, 0.15]
 :kandana-dot-radius   0.003     ;; individual stipple dot radius, in [0.001, 0.005]
 :outline-width        0.004     ;; black contour width, in [0.002, 0.008]
 :ornament-complexity  3         ;; jewelry detail level, in [1, 5]
 :panchavarna                    ;; THE five colors — immutable
   {:white      "#FAF0E6"        ;; lime plaster
    :yellow     "#DAA520"        ;; laterite stone
    :red        "#CC3333"        ;; cinnabar / red laterite
    :green-blue "#1B6B5A"        ;; indigo + neem juice
    :black      "#1A1A1A"}}      ;; lamp soot
```

### Parameter Constraints

- `panchavarna` is **immutable** — these five hex values cannot be changed or extended.
- `figure-tala` determines the divine hierarchy: 10 = god, 8 = hero, 7 = mortal.
- `kandana-density-shadow` must be > `kandana-density-highlight` (shadows are denser).
- All fill colors in the output must map to one of the 5 Panchavarna values.

## Clojure Pseudocode

```clojure
(ns art.artforms.kerala-murals
  "Pure Kerala Murals generator. Tala proportions + Panchavarna + kandana stipple.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(def panchavarna
  {:white      "#FAF0E6"
   :yellow     "#DAA520"
   :red        "#CC3333"
   :green-blue "#1B6B5A"
   :black      "#1A1A1A"})

(def joint-fractions
  "Vertical joint positions as fraction of total figure height (bottom=0, top=1)."
  {:feet 0.0 :ankles 0.05 :knees 0.30 :hips 0.52
   :waist 0.60 :chest 0.72 :shoulders 0.82
   :chin 0.90 :head-top 1.0})

(defn tala-skeleton
  "Build proportional skeleton from tala system."
  [center height tala-count shoulder-r waist-r hip-r]
  (let [tala-h (/ height tala-count)
        base-y (- (center 1) (/ height 2.0))
        joint-y (fn [k] (+ base-y (* height (get joint-fractions k))))
        half-w (fn [ratio] (* tala-h ratio 0.5))]
    {:spine-x  (center 0)
     :joints
     {:feet       {:y (joint-y :feet)      :half-w (half-w 0.8)}
      :ankles     {:y (joint-y :ankles)    :half-w (half-w 0.8)}
      :knees      {:y (joint-y :knees)     :half-w (half-w 1.2)}
      :hips       {:y (joint-y :hips)      :half-w (half-w hip-r)}
      :waist      {:y (joint-y :waist)     :half-w (half-w waist-r)}
      :chest      {:y (joint-y :chest)     :half-w (half-w (* shoulder-r 0.85))}
      :shoulders  {:y (joint-y :shoulders) :half-w (half-w shoulder-r)}
      :chin       {:y (joint-y :chin)      :half-w (half-w 0.75)}
      :head-top   {:y (joint-y :head-top)  :half-w (half-w 0.85)}}
     :tala-h tala-h}))

(defn skeleton->silhouette
  "Convert skeleton joints to a smooth curvilinear closed spline (Catmull-Rom)."
  [skeleton curvature]
  (let [{:keys [spine-x joints]} skeleton
        ;; right side: top to bottom
        right-pts (mapv (fn [k]
                          (let [{:keys [y half-w]} (get joints k)]
                            [(+ spine-x half-w) y]))
                        [:head-top :chin :shoulders :chest :waist :hips :knees :ankles :feet])
        ;; left side: bottom to top (mirrored)
        left-pts (mapv (fn [[x y]] [(- (* 2 spine-x) x) y]) (reverse right-pts))]
    {:type :catmull-rom-closed
     :points (vec (concat right-pts left-pts))
     :tension curvature}))

(defn kandana-stipple
  "Generate stippled shading dots within a region.
   Density varies from shadow (high) to highlight (low)."
  [region-vertices shadow-density highlight-density dot-radius
   light-direction color rng]
  (let [xs (map first region-vertices) ys (map second region-vertices)
        min-x (apply min xs) max-x (apply max xs)
        min-y (apply min ys) max-y (apply max ys)
        step (* dot-radius 2.5)]
    {:type :kandana-field
     :primitives
     (vec
       (for [gx (range min-x max-x step)
             gy (range min-y max-y step)
             :when true  ;; point-in-polygon check would go here
             :let [;; compute local light factor (0=shadow, 1=highlight)
                   light-factor (+ 0.5 (* 0.5 (Math/cos
                                                 (- (Math/atan2 (- gy (/ (+ min-y max-y) 2))
                                                                (- gx (/ (+ min-x max-x) 2)))
                                                    light-direction))))
                   density (+ (* (- 1.0 light-factor) shadow-density)
                              (* light-factor highlight-density))]
             :when (< (rng) density)]
         {:type :circle :center [gx gy] :radius dot-radius :fill color}))}))

(defn rasa-face
  "Generate facial feature primitives based on the navarasas emotional expression."
  [head-center head-w tala-h rasa]
  (let [eye-w (* head-w 0.3)
        eye-h (* eye-w 0.35)
        eye-y (+ (head-center 1) (* tala-h 0.05))
        eye-spacing (* head-w 0.22)
        ;; rasa-specific adjustments
        [lid-droop brow-raise lip-curve] (case rasa
                                           :shringara [0.15 0.0 0.08]
                                           :veera     [0.0 0.12 0.02]
                                           :roudra    [0.0 0.15 -0.06]
                                           :karuna    [0.2 -0.05 -0.04]
                                           :hasya     [0.1 0.05 0.12]
                                           [0.0 0.0 0.0])]
    {:type :rasa-face :rasa rasa
     :left-eye {:type :elongated-eye
                :center [(- (head-center 0) eye-spacing) eye-y]
                :w eye-w :h eye-h :lid-droop lid-droop
                :fill (:black panchavarna)}
     :right-eye {:type :elongated-eye
                 :center [(+ (head-center 0) eye-spacing) eye-y]
                 :w eye-w :h eye-h :lid-droop lid-droop
                 :fill (:black panchavarna)}
     :brows {:raise brow-raise :stroke (:black panchavarna) :stroke-width 0.003}
     :lips {:type :lip-curve :center [(head-center 0) (- eye-y (* tala-h 0.25))]
            :curve lip-curve :fill (:red panchavarna)}}))

(defn generate
  "Pure Kerala Murals generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [figure-tala figure-height figure-center pose rasa
                eye-width-ratio shoulder-ratio waist-ratio hip-ratio
                silhouette-curvature kandana-density-shadow kandana-density-highlight
                kandana-dot-radius outline-width ornament-complexity]} params

        ;; build skeleton + silhouette
        skeleton (tala-skeleton figure-center figure-height figure-tala
                                shoulder-ratio waist-ratio hip-ratio)
        silhouette (skeleton->silhouette skeleton silhouette-curvature)
        tala-h (:tala-h skeleton)

        ;; background
        bg-layer {:id :wall :z-index 0
                  :primitives [{:type :rect :center [0 0] :w 2.0 :h 2.0
                                :fill (:white panchavarna)}]}

        ;; body fill (yellow for skin)
        body-layer {:id :body :z-index 1
                    :primitives [{:type :filled-spline
                                  :spline silhouette
                                  :fill (:yellow panchavarna)}]}

        ;; kandana stipple shading
        stipple (kandana-stipple (:points silhouette)
                                 kandana-density-shadow kandana-density-highlight
                                 kandana-dot-radius
                                 (/ Math/PI 4)  ;; light from upper-right
                                 (:black panchavarna) rng)
        stipple-layer {:id :kandana :z-index 2 :primitives (:primitives stipple)}

        ;; contour outline
        contour-layer {:id :contour :z-index 3
                       :primitives [{:type :stroked-spline
                                     :spline silhouette
                                     :stroke (:black panchavarna)
                                     :stroke-width outline-width}]}

        ;; face
        head-center [(figure-center 0)
                     (+ (- (figure-center 1) (/ figure-height 2))
                        (* figure-height (get joint-fractions :chin))
                        (* tala-h 0.5))]
        face (rasa-face head-center (* tala-h 0.75) tala-h rasa)
        face-layer {:id :face :z-index 4 :primitives [face]}

        ;; jewelry
        jewelry-layer {:id :jewelry :z-index 5
                       :primitives [{:type :crown :center head-center
                                     :w (* tala-h 1.2) :h (* tala-h 0.5)
                                     :fill (:yellow panchavarna)
                                     :detail-level ornament-complexity}
                                    {:type :necklace-set :count ornament-complexity
                                     :fill (:yellow panchavarna)
                                     :accent (:red panchavarna)}]}]

    {:seed     seed
     :artform  :kerala-murals
     :params   params
     :palette  (mapv (fn [[k v]] {:name (name k) :hex v}) panchavarna)
     :layers   [bg-layer body-layer stipple-layer contour-layer face-layer jewelry-layer]
     :metadata {:artform-family    :relief-layered
                :visual-invariants [:five-colors-only :curvilinear-anatomy
                                    :flowing-outlines :stippled-kandana
                                    :tala-proportioned :expressive-eyes
                                    :heavy-ornamentation :black-outlines]}}))
```

## Pigment Palette (Canonical — Immutable Panchavarna)

| Color Name | Pigment Source | Hex | Role |
|---|---|---|---|
| White (*vellai*) | Lime plaster | `#FAF0E6` | Background, highlights, eye whites |
| Yellow (*manjal*) | Laterite stone | `#DAA520` | Skin, gold ornaments, warm accents |
| Red (*chemmannam*) | Cinnabar / red laterite | `#CC3333` | Lips, garment borders, kumkum |
| Green-Blue (*pachcha*) | Indigo + neem juice | `#1B6B5A` | Deity skin, foliage, water |
| Black (*karuppu*) | Lamp soot | `#1A1A1A` | All outlines, hair, pupils, shadows |

> **This palette is IMMUTABLE.** No sixth color may be added. All generated primitives must use exactly one of these five hex values.

## Cultural Guard Rails

- **DO**: Enforce exactly five colors. This is the most sacred constraint in Kerala Mural tradition.
- **DO**: Use stippled dot density (*kandana*) for volumetric shading. This is the authentic technique.
- **DO**: Build figures from the *tala* proportional skeleton, not freehand proportions.
- **DO**: Make eyes large, elongated, and emotionally expressive per the *rasa* system.
- **DO NOT**: Use continuous gradient blending for volume. That is Kalighat wash technique, not Kerala Murals.
- **DO NOT**: Use parallel line hatching for shading. That is Madhubani *kachni*, not Kerala Murals.
- **DO NOT**: Add a sixth color under any pretext. Five and only five.
- **DO NOT**: Draw angular or geometric body shapes. Kerala Murals require smooth curvilinear voluptuous forms.
