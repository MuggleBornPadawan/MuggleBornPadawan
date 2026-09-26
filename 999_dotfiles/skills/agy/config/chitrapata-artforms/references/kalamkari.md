# Kalamkari — Algorithmic Specification

> Narrative Scroll Family · Geographic Locus: Andhra Pradesh (Srikalahasti & Machilipatnam)

## Core Algorithm

Parametric vine spline growth with narrative register band layout and geometric border friezes.

### Pipeline

1. **Canvas Partition into Registers**: Divide the `[-1, 1]` canvas into horizontal narrative registers (bands). Each register tells one episode of a mythological narrative. Registers are separated by geometric frieze borders (diamond chains, chevron rows, zigzag lines).
2. **Central Vine Trunk (Lata)**: Within each register, grow a primary vine trunk using a parametric cubic Bézier spline with controlled curvature. The vine flows horizontally with sinusoidal undulation — NOT differential line growth (which produces coral/lichen forms). Curvature is smooth, continuous, and calligraphic.
3. **Secondary Branches**: At parametric intervals along the trunk, emit secondary vine branches using recursive Bézier subdivision. Branch angles are biased toward the vertical (phototropic). Each branch terminates in a leaf or flower motif.
4. **Leaf & Flower Motifs (Kalka/Ambi)**: Terminal motifs are paisley-shaped (kalka) or multi-lobed flower heads. Generated as closed Bézier curves with cusp points. Petals are concentric offset curves with alternating fill colors.
5. **Narrative Figures**: Within registers, place stylized mythological figures (deities, animals, chariots) as pre-defined archetype silhouettes. Figures are placed in scene groups respecting reading order (left to right).
6. **Border Friezes**: Generate geometric repeating borders between registers. Frieze types: diamond lattice, chevron zigzag, running wave, lotus chain. Each frieze is a periodic tiling with period `p` and amplitude `a`.
7. **Color Application**: Colors are applied as flat fills with crisp hard edges — NO diffusion, NO bleed, NO watercolor wash. The pigment chemistry explicitly prevents capillary bleeding via myrobalan and buffalo milk treatment.

### Critical Correction: No Capillary Diffusion

The traditional Kalamkari process uses mordants and milk baths specifically to PREVENT ink diffusion. The algorithm must produce **crisp, controlled linework** with hard color boundaries. Simulating diffusion contradicts the artform's material reality.

## Visual Invariants (MUST Hold for Recognition)

1. **Horizontal register bands**: Canvas is divided into distinct narrative bands. Figures do not overlap between registers.
2. **Continuous vine network**: At least one flowing vine stem connects elements within each register. Vines are smooth Bézier curves, not jagged or fractal.
3. **Geometric border friezes**: Every register boundary has a geometric repeating pattern (diamonds, chevrons, or lotus chains).
4. **Crisp hard edges**: All color boundaries are sharp. Zero gradient blending, zero diffusion, zero watercolor effects.
5. **Flat color fills**: Colors are solid and opaque. No transparency, no layered washes.
6. **Paisley/kalka motifs**: Leaf terminals must include at least some paisley (teardrop-curved) shapes — this is the signature Kalamkari motif.
7. **Narrative directionality**: Scenes read left-to-right within each register.

## State Parameters & Invariants

```clojure
{:register-count     4        ;; number of horizontal narrative bands, in [2, 8]
 :register-heights   [0.5 0.5 0.5 0.5]  ;; relative heights (normalized to sum to 2.0 for [-1,1])
 :vine-undulation    0.15     ;; sinusoidal amplitude of trunk curve, in [0.05, 0.30]
 :vine-frequency     3.0      ;; undulation cycles per register width, in [1.5, 6.0]
 :branch-density     8        ;; secondary branches per register, in [4, 16]
 :branch-angle-bias  0.7      ;; bias toward vertical (1.0 = straight up), in [0.3, 0.9]
 :motif-type         :mixed   ;; :kalka, :flower, :mixed — terminal motif style
 :motif-scale        0.08     ;; scale of leaf/flower motifs, in [0.04, 0.15]
 :frieze-type        :diamond ;; :diamond, :chevron, :wave, :lotus-chain
 :frieze-period      0.06     ;; repetition period of border frieze, in [0.03, 0.12]
 :frieze-amplitude   0.03     ;; height of frieze pattern, in [0.01, 0.06]
 :figure-density     3        ;; narrative figures per register, in [1, 6]
 :palette            [:madder-red :lampblack :orpiment-yellow :indigo :conch-white]}
```

## Clojure Pseudocode

```clojure
(ns art.artforms.kalamkari
  "Pure Kalamkari generator. Vine splines + register bands.")

(defn make-rng [seed] (let [r (java.util.Random. (long seed))] #(.nextDouble r)))

(defn bezier-point
  "Evaluate cubic Bézier at parameter t in [0,1]."
  [p0 p1 p2 p3 t]
  (let [t2 (* t t) t3 (* t2 t)
        u (- 1.0 t) u2 (* u u) u3 (* u2 u)]
    [(+ (* u3 (p0 0)) (* 3 u2 t (p1 0)) (* 3 u t2 (p2 0)) (* t3 (p3 0)))
     (+ (* u3 (p0 1)) (* 3 u2 t (p1 1)) (* 3 u t2 (p2 1)) (* t3 (p3 1)))]))

(defn vine-trunk-spline
  "Generate a sinusoidal vine trunk as a polyline across a register."
  [y-center x-start x-end undulation frequency num-samples]
  (let [dx (/ (- x-end x-start) (double num-samples))]
    (mapv (fn [i]
            (let [x (+ x-start (* i dx))
                  phase (* frequency 2.0 Math/PI (/ (- x x-start) (- x-end x-start)))]
              [x (+ y-center (* undulation (Math/sin phase)))]))
          (range (inc num-samples)))))

(defn branch-at
  "Emit a secondary branch from a point on the trunk."
  [origin angle-bias length motif-scale motif-type palette rng]
  (let [angle (+ (* Math/PI 0.5 angle-bias) (* (- 1.0 angle-bias) (rng) Math/PI))
        tip   [(+ (origin 0) (* length (Math/cos angle)))
               (+ (origin 1) (* length (Math/sin angle)))]]
    {:type :branch
     :stem {:type :line :from origin :to tip :stroke (first palette) :stroke-width 0.003}
     :motif {:type :kalka :center tip :scale motif-scale
             :fill (nth palette (int (* (rng) (count palette))))}}))

(defn geometric-frieze
  "Generate a repeating geometric border band."
  [y-center x-start x-end frieze-type period amplitude palette]
  (let [n (int (/ (- x-end x-start) period))]
    {:type :frieze :y y-center
     :primitives
     (mapv (fn [i]
             (let [x (+ x-start (* i period))]
               (case frieze-type
                 :diamond {:type :polygon
                           :points [[x y-center]
                                    [(+ x (/ period 2)) (+ y-center amplitude)]
                                    [(+ x period) y-center]
                                    [(+ x (/ period 2)) (- y-center amplitude)]]
                           :fill (nth palette (mod i (count palette)))}
                 :chevron {:type :polyline
                           :points [[x (- y-center amplitude)]
                                    [(+ x (/ period 2)) (+ y-center amplitude)]
                                    [(+ x period) (- y-center amplitude)]]
                           :stroke (first palette) :stroke-width 0.002})))
           (range n))}))

(defn generate
  "Pure Kalamkari generator. Returns art data map."
  [{:keys [seed params]}]
  (let [rng (make-rng seed)
        {:keys [register-count register-heights vine-undulation vine-frequency
                branch-density branch-angle-bias motif-type motif-scale
                frieze-type frieze-period frieze-amplitude figure-density palette]} params
        total-h    (reduce + register-heights)
        norm-heights (mapv #(* 2.0 (/ % total-h)) register-heights)  ;; scale to [-1,1]

        ;; compute register y-bounds
        register-bounds
        (loop [i 0 y -1.0 acc []]
          (if (>= i register-count) acc
            (let [h (nth norm-heights i)
                  y-top (+ y h)]
              (recur (inc i) y-top (conj acc {:y-bottom y :y-top y-top :y-center (/ (+ y y-top) 2.0)})))))

        ;; generate register content layers
        register-layers
        (map-indexed
          (fn [i {:keys [y-bottom y-top y-center]}]
            (let [trunk (vine-trunk-spline y-center -0.95 0.95 vine-undulation vine-frequency 60)
                  branch-points (take branch-density (shuffle (range (count trunk))))
                  branches (mapv #(branch-at (nth trunk %)
                                             branch-angle-bias
                                             (* 0.5 (- y-top y-bottom))
                                             motif-scale motif-type palette rng)
                                 branch-points)]
              {:id (keyword (str "register-" i)) :z-index (+ 2 (* i 2))
               :primitives (concat
                             [{:type :polyline :points trunk :stroke "#1A1A1A" :stroke-width 0.004}]
                             (mapcat (fn [b] [(:stem b) (:motif b)]) branches))}))
          register-bounds)

        ;; generate frieze borders between registers
        frieze-layers
        (map-indexed
          (fn [i _]
            (let [y-border (:y-top (nth register-bounds i))]
              {:id (keyword (str "frieze-" i)) :z-index (+ 3 (* i 2))
               :primitives (:primitives (geometric-frieze y-border -0.98 0.98
                                                          frieze-type frieze-period frieze-amplitude palette))}))
          (butlast register-bounds))]

    {:seed     seed
     :artform  :kalamkari
     :params   params
     :palette  (mapv (fn [p] {:name (name p) :hex (get pigment-hex-map p)}) palette)
     :layers   (vec (interleave register-layers (concat frieze-layers [nil])))
     :metadata {:artform-family     :narrative-scroll
                :visual-invariants  [:horizontal-registers :continuous-vine
                                     :geometric-friezes :crisp-hard-edges
                                     :flat-color-fills :kalka-motifs
                                     :left-to-right-narrative]}}))
```

## Pigment Palette (Canonical)

| Pigment | Hex | Role in Kalamkari |
|---|---|---|
| Madder Red | `#A0522D` | Primary warm fill — vine flowers, deity garments |
| Lampblack | `#1A1A1A` | All outlines, contour strokes, primary linework |
| Orpiment Yellow | `#E6A817` | Secondary fill — jewelry, borders, sun motifs |
| Indigo | `#1B3F8B` | Cool contrast — sky panels, water, fabric folds |
| Conch White | `#FAF0E6` | Background, negative space within registers |

## Cultural Guard Rails

- **DO**: Maintain crisp, hard-edged linework. Kalamkari is pen-drawn, not watercolor.
- **DO**: Include flowing vine networks — they are the structural backbone of every composition.
- **DO**: Separate narrative episodes into distinct horizontal registers.
- **DO NOT**: Simulate ink diffusion, bleed, or watercolor wash effects. The mordant process prevents this.
- **DO NOT**: Mix register contents — figures from one episode must not overlap into adjacent bands.
- **DO NOT**: Use gradient fills. All colors are flat and opaque.
