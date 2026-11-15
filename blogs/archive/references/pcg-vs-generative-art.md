# PCG vs Generative Art

> [!NOTE]
> Both fields use algorithms to produce content, but they diverge sharply in **intent**, **audience**, and **success criteria**.

---

## TL;DR

| Dimension              | PCG                           | Generative Art                      |
|------------------------|-------------------------------|-------------------------------------|
| **Goal**               | Utility / playability         | Aesthetic experience                |
| **Audience**           | Players / consumers           | Viewers / collectors                |
| **Success metric**     | Fun, balance, replay value    | Beauty, surprise, meaning           |
| **Output is consumed** | As game content               | As artifact itself                  |
| **Failure mode**       | Unplayable / repetitive       | Ugly / meaningless                  |
| **Control desired**    | High (designer steers output) | Variable (artist may embrace chaos) |

---

## Procedural Content Generation (PCG)

**Domain:** Games, simulations, tools

**Defines itself by function.** The output serves a purpose beyond itself — a dungeon must be traversable, a planet must be interesting to explore, a weapon must be balanced.

### Core concerns
- **Controllability** — designers need knobs. Output must stay within design specs.
- **Correctness** — a maze with no solution is a bug, not art.
- **Variety vs coherence** — enough variation to feel fresh, enough structure to feel intentional.
- **Performance** — often real-time or near-real-time generation.

### Classic techniques
- **Noise functions** — Perlin, Simplex for terrain, texture
- **L-Systems** — plant growth, city roads
- **WFC (Wave Function Collapse)** — tile-based map generation
- **Grammar-based** — sentence generation, quest narratives
- **BSP / Voronoi** — dungeon/room layouts
- **Cellular Automata** — cave systems, spreading phenomena

### Canonical examples
- Minecraft terrain
- No Man's Sky planets + fauna
- Spelunky dungeon rooms
- Dwarf Fortress geology

---

## Generative Art

**Domain:** Fine art, music, design, NFTs, creative coding

**Defines itself by expression.** The algorithm is the medium. The artist authors the *system*, not the output — the output is what emerges.

### Core concerns
- **Surprise** — the artist is often the first viewer.
- **Intentionality** — randomness must feel purposeful, not arbitrary.
- **Signature** — a generative artist's system has a recognizable aesthetic.
- **Artifact vs process** — the generated output is the deliverable (print, NFT, video).

### Classic techniques
- **Reaction-diffusion systems** — Turing patterns
- **Strange attractors** — Lorenz, Clifford
- **Flow fields** — curl noise, vector fields driving particle paths
- **Fractal geometry** — Mandelbrot, Julia sets, IFS
- **Neural nets** — GANs, diffusion models as aesthetic tools
- **Turtle graphics / LOGO** — early plotter art

### Canonical examples
- Vera Molnár — plotted line drawings (1960s–)
- Manfred Mohr — geometric structures
- Tyler Hobbs — *Fidenza* (flow field, Art Blocks)
- Refik Anadol — data sculptures

---

## Where They Overlap

```
         PCG                       Gen Art
    ┌──────────────────────────────────────┐
    │  terrain gen    ◄──► noise art       │
    │  NPC dialogue   ◄──► poetry bots     │
    │  music gen      ◄──► algorithmic     │
    │  (adaptive)          composition     │
    └──────────────────────────────────────┘
              shared techniques,
              divergent intent
```

The **same Perlin noise function** generates Minecraft's hills (PCG) and a generative artist's flowing poster (Gen Art). The difference is *what happens next* — does the output get walked on by a player, or framed on a wall?

### Genuine hybrids
- **Procedural art games** — *Proteus*, *Everything*, *Dwarf Fortress* ASCII art
- **Aesthetic PCG** — the visual style of *Caves of Qud*, *Moonring*
- **Art-directed PCG** — AAA games where PCG output is curated/filtered by humans

---

## Using PCG Approaches in Generative Art

Generative artists frequently adapt PCG pipelines to impose structural coherence and avoid the "uniform soup" problem of raw noise.

### Technique Translation

| PCG Method | Role in PCG | Application in Generative Art |
|---|---|---|
| **Wave Function Collapse (WFC)** | Tile-based level design, dungeon rooms | Self-assembling geometric prints, infinite architectural compositions |
| **Grammars & L-Systems** | Dungeon topology, foliage models | Intricate vector flora, typographic growth, recursive silhouettes |
| **Constraint Satisfaction** | Solvable puzzles, balanced loot | Compositional balance, non-overlapping color palettes, visual weight |
| **Cellular Automata (CA)** | Cave generation, biome spread | Organic textures, living canvas simulations, evolving glyphs |
| **Delaunay / Voronoi** | Overworld partitioning | Stained-glass geometry, mosaic portraits, low-poly stylization |

### Why Artists Adopt PCG Techniques

- **Semantic Coherence:** Pure noise tends to look homogeneous; PCG structures establish hierarchy, anatomy, and legible focal points.
- **Bounded Randomness:** Solvers enforce aesthetic rules (e.g., minimum margin, no clashing adjacencies) without eliminating variety.
- **Long-Form Reliability:** In tokenized/unfiltered long-form generative art (e.g., Art Blocks), PCG validation ensures thousands of seeds render without broken compositions.

---

## The Control Paradox

|                            | PCG designer                       | Generative artist                           |
|----------------------------|------------------------------------|---------------------------------------------|
| **Wants**                  | Predictable range, no bad outputs  | Surprising outputs within a signature style |
| **Uses randomness as**     | Variation engine                   | Collaborator                                |
| **Relationship to output** | Author of rules, editor of results | Author of system, curator of results        |

> [!TIP]
> A useful framing: **PCG is generative art with constraints enforced by function**. The game world *has to work*. The art piece only has to *resonate*.

---

## Why the Distinction Matters

1. **Tooling diverges** — PCG tools (WFC, grammar engines) optimize for correctness; gen art tools (Processing, p5.js, openrndr) optimize for expressibility.
2. **Evaluation diverges** — PCG uses metrics (entropy, coverage, playability scores); gen art uses critique.
3. **Community diverges** — PCG has an academic conference (FDG/PCG workshop); gen art lives in galleries, Twitter/X, Art Blocks.
4. **Authorship question** — generative art makes the authorship question central; PCG largely sidesteps it.

---

## References

- Shaker, Togelius, Nelson — *Procedural Content Generation in Games* (free book, pcgbook.com)
- Kate Compton — *So you want to build a generator* (blog)
- Tyler Hobbs — *The Aesthetics of Generative Art* (essay)
- Vera Molnár — *Toward Aesthetic Computation* (1975)
- Philip Galanter — *What is Generative Art?* (2003)
