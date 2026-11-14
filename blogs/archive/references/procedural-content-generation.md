# Procedural Content Generation (PCG)

**PCG** is the use of algorithms to generate content automatically at runtime or design time, rather than hand-crafting every asset.

---

## Core Idea

```
seed → algorithm → content
```

Same seed → same output (deterministic). Different seed → different world. This lets you store a single integer instead of gigabytes of data.

---

## Techniques

| Technique                             | What it generates                | Example                 |
|---------------------------------------|----------------------------------|-------------------------|
| **Noise functions** (Perlin, Simplex) | Smooth terrain heightmaps        | Minecraft terrain       |
| **L-Systems**                         | Branching structures             | Trees, ferns, coral     |
| **WFC** (Wave Function Collapse)      | Tile-based maps with constraints | Roguelike dungeons      |
| **Grammar-based**                     | Text, quests, dialogue           | NPC dialogue trees      |
| **BSP Trees**                         | Dungeon room partitioning        | Doom, NetHack           |
| **Voronoi diagrams**                  | Region/biome boundaries          | Civilization maps       |
| **Markov chains**                     | Names, text                      | Fantasy name generators |
| **Cellular automata**                 | Cave systems                     | Many roguelikes         |

---

## Why Use PCG?

- **Infinite replayability** — no two runs are the same
- **Compression** — a 10,000km world fits in one seed number
- **Cheap content at scale** — No Man's Sky: 18 quintillion planets, ~15 GB install
- **Emergent complexity** — simple rules → surprising output

---

## Trade-offs

| ✅ Pros                         | ❌ Cons                                |
|---------------------------------|----------------------------------------|
| Scales to near-infinite content | Hard to guarantee quality              |
| Small storage footprint         | Difficult to hand-tune                 |
| Replayability                   | Can feel samey/random without curation |
| Fast iteration on parameters    | Bugs produce systematic badness        |

---

## Famous Examples

- **Minecraft** — Perlin noise layered for biomes, caves, structures
- **No Man's Sky** — Planet surfaces, fauna, flora, names
- **Dwarf Fortress** — History, civilizations, geography
- **Spelunky** / **Dead Cells** — Room-based dungeon assembly (Spelunky: fully procedural; Dead Cells: hand-crafted rooms assembled procedurally)
- **Diablo** — Item stats + dungeon layouts
- **Elite (1984)** — Entire galaxy from a seed; too big for disk

---

## The PCG Stack (layered)

```
Raw noise
  → Terrain shape
    → Biome placement
      → Resource distribution
        → Structure placement
          → Enemy/NPC population
            → Loot tables
```

Each layer depends on the one above it, adding semantic meaning bottom-up (noise → terrain → biomes → structures → gameplay elements).

---

## PCG in Generative Art (Clojure)

In generative art, Clojure is a first-class citizen — not a workaround.

### The Ecosystem

| Library                                                 | What it does                                                           |
|---------------------------------------------------------|------------------------------------------------------------------------|
| **[Quil](http://quil.info/)**                           | Clojure wrapper over Processing — gold standard for generative visuals |
| **[Overtone](https://overtone.github.io/)**             | Live-coded generative music via SuperCollider                          |
| **[thi-ng/geom](https://github.com/thi-ng/geom)**       | Computational geometry, meshes, SVG export                             |
| **[Clojure2D](https://github.com/Clojure2D/clojure2d)** | Low-level 2D canvas, pixel manipulation, color spaces                  |

### Why Clojure Excels Here

- **REPL = live canvas** — change a noise param, see it repaint instantly, no restart
- **Immutable data** — generative sequences are naturally pure functions of a seed
- **`iterate` / `lazy-seq`** — infinite generative sequences are idiomatic
- **Hiccup/SVG** — data-as-markup makes SVG output trivial

### PCG Techniques in Clojure

**L-System expansion:**

```clojure
(defn expand [rules n axiom]
  ;; strings are seqable in Clojure — mapcat over a string yields chars
  (nth (iterate #(mapcat rules %) axiom) n))

(expand {\F "FF" \+ "+" \- "-" \[ "[" \] "]"
         \X "F+[[X]-X]-F[-FX]+X"} 4 "X")
```

**Infinite Perlin-noise terrain strip (Quil):**

```clojure
(def t (atom 0)) ; time atom, incremented each frame via (swap! t inc)

(defn draw []
  (doseq [x (range (width))]
    (let [h (* (height) (noise (* x 0.01) @t))]
      (line x (height) x (- (height) h)))))
```

### Verdict

> The REPL-driven workflow matches the exploratory, iterative nature of generative art better than most languages. Clojure is not just relevant here — it is one of the best environments for the craft.
