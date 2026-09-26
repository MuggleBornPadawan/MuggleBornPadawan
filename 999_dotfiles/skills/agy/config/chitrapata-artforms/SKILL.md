---
name: chitrapata-artforms
description: >-
  Traditional Indian artform generators for Chittu 13.14. Use when generating procedural art
  in the style of Mandala, Kalamkari, Kalighat, Pattachitra, Pithora, Tanjore, Madhubani,
  Kerala Murals, Pichwai, Gond, Warli, or Phad. Provides visual invariants, algorithmic
  specs, state parameters, and art.json output contracts per artform.
---

# Chitrapata Traditional Indian Artforms — PCG Skill

Generate procedural art rooted in 12 indigenous Indian traditions via pure Clojure.
Composes with `clojure-pcg` (triple render), `clojure-quil`, `clojure-raylib`, and `clojure-webgpu`.

## When to Use

- Generating art in the style of any of the 12 traditional Indian artforms below.
- Building a Chittu 13.14 artform generator (seed → params → art.json).
- Checking visual invariants ("does this output look like Warli, not Gond?").
- Selecting parameters, pigment palettes, or compositional constraints for an artform.

## Shared PCG Contract (All 12 Artforms)

Every artform generator MUST follow the `clojure-pcg` contract:

1. **Pure `generate` function**: `(generate {:seed 42 :artform :mandala :params {...}})` → art data map.
   - Zero side effects. No renderer imports. No `q/*`, no `raylib/*`, no JS.
   - Uses `java.util.Random` seeded deterministically.
2. **Deterministic output**: Same seed + same params = identical data, always.
3. **Log seed**: Every output must include `:seed` in the returned map.
4. **Parameter map**: Expose all tunables as a flat `:params` map for REPL exploration.
5. **Local coordinates**: All geometry in `[-1.0, 1.0]` normalized space.
6. **art.json emission**: Output structure compatible with `clojure-pcg` export (points, polygons, colors, metadata).

### Common Output Schema

```clojure
{:seed       42
 :artform    :mandala
 :params     {:symmetry-order 8 :ring-count 5 ...}
 :palette    [{:name "vermilion" :hex "#E34234"} ...]
 :primitives [{:type :circle :center [0.0 0.0] :radius 0.05}
              {:type :polygon :points [[x1 y1] [x2 y2] ...] :fill "#B3892C"}
              {:type :line :from [x1 y1] :to [x2 y2] :stroke-width 0.003}
              {:type :arc :center [cx cy] :radius r :start-angle a1 :end-angle a2}
              ...]
 :layers     [{:id :border :z-index 0 :primitives [...]}
              {:id :fill   :z-index 1 :primitives [...]}
              {:id :detail :z-index 2 :primitives [...]}]
 :metadata   {:artform-family :radial-symmetry
              :visual-invariants [:n-fold-symmetry :square-outer-bound ...]}}
```

### Pigment-to-Hex Convention

Artforms use natural pigments. Map them to hex tokens consistently:

| Pigment Name | Source Material | Hex Token | Used By |
|---|---|---|---|
| Vermilion / Hingula | Mercury sulfide (HgS) | `#E34234` | Mandala, Pattachitra, Phad |
| Lampblack / Kajal | Oil lamp soot | `#1A1A1A` | Kalighat, Pattachitra, Gond |
| Conch White / Sankha | Crushed conch shell | `#FAF0E6` | Pattachitra, Tanjore |
| Orpiment Yellow / Haritala | Arsenic trisulfide | `#E6A817` | Pattachitra, Phad |
| Indigo | Indigofera tinctoria | `#1B3F8B` | Kerala Murals, Phad |
| Madder Red | Rubia tinctorum root | `#A0522D` | Kalamkari |
| Turmeric Yellow | Curcuma longa | `#E3A857` | Kalighat, Madhubani |
| Red Ochre / Geru | Iron oxide clay | `#CC5533` | Warli, Gond, Pithora |
| Rice White | Rice flour paste | `#FFFDD0` | Warli |
| Lapis Lazuli | Lazurite mineral | `#26619C` | Mandala, Pichwai |
| Malachite Green | Copper carbonate | `#0BDA51` | Mandala |
| Gold Leaf | 22-carat gold foil | `#D4A017` | Tanjore, Pichwai |
| Silver Leaf | Pure silver foil | `#C0C0C0` | Pichwai |
| Cinnabar Red | Mercury sulfide | `#E44D2E` | Tanjore, Phad |
| Charcoal Black | Burnt wood carbon | `#2B2B2B` | Gond |

## Artform Family Groupings

| Family | Artforms | Shared Algorithmic Core |
|---|---|---|
| **Radial Symmetry** | Mandala, Warli | Dihedral group D_n replication, polar-to-Cartesian mapping |
| **Narrative Scroll** | Kalamkari, Pattachitra, Phad, Pichwai | Register/band layouts, sequential scene placement, border systems |
| **Texture Fill** | Gond, Madhubani | Interior pattern generators (hatching, dots, micro-icons), silhouette-first |
| **Calligraphic Stroke** | Kalighat | Pressure-modulated cubic spline rendering, one-sided shading |
| **Relief / Layered** | Tanjore, Kerala Murals | Heightmap extrusion or flat layering, constrained palette, metallic shaders |
| **Ritual Placement** | Pithora | Hierarchical slot assignment, archetype stamping within sacred enclosure |

## Dispatch Table — Which Reference to Read

When working on a specific artform, read the corresponding reference file:

| Artform | Reference File | Key Algorithm |
|---|---|---|
| Mandala | `references/mandala.md` | Concentric ring shape grammar + D_n symmetry replication |
| Kalamkari | `references/kalamkari.md` | Parametric vine splines + narrative register bands |
| Kalighat | `references/kalighat.md` | Pressure-width cubic splines + one-sided normal shading |
| Pattachitra | `references/pattachitra.md` | Nested rectangular border subdivision + skeletal posture constraints |
| Pithora | `references/pithora.md` | Hierarchical slot grid + horse archetype stencil stamping |
| Tanjore | `references/tanjore.md` | SDF gesso extrusion + gold-leaf BRDF + gem point sampling |
| Madhubani | `references/madhubani.md` | Horror vacui icon packing + contour offset + scanline hatching |
| Kerala Murals | `references/kerala-murals.md` | Tala proportional skeleton + Panchavarna 5-color quantization |
| Pichwai | `references/pichwai.md` | Central-radial composition + 24-register calendar grid |
| Gond | `references/gond.md` | Silhouette hull + vector-field micro-texture fills + SDF morphing |
| Warli | `references/warli.md` | Circle/triangle/square primitives + Archimedean spiral chains |
| Phad | `references/phad.md` | Rank-scaled horizontal layout + profile-only constraint |

## Checklist (Every Artform Generator)

- [ ] `generate` is pure — no renderer imports
- [ ] Same seed → identical output (test with 3 seeds)
- [ ] Seed logged in output map
- [ ] All coordinates in [-1.0, 1.0]
- [ ] Visual invariants from reference file are enforced (hard constraints, not suggestions)
- [ ] Palette uses only pigments listed for that artform
- [ ] Parameter map exposed for REPL tuning
- [ ] Output renders correctly in at least one target (Quil recommended for first pass)
