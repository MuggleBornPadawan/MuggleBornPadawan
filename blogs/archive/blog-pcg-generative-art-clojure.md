---
title: "The Invisible Brush: Generative Art and the Algorithms That Paint"
published: true
description: "A long-form exploration of Procedural Content Generation as a creative engine — with Clojure and Quil."
tags: clojure, creativecoding, gamedev, programming
cover_image: 
canonical_url: 
---

*A long-form exploration of Procedural Content Generation as a creative engine — with Clojure and Quil.*

---

There is a particular kind of wonder that comes from watching something grow on a screen that you did not draw. A tree that branches unpredictably. A coastline that stretches further than any hand could trace. A galaxy of stars no astronomer catalogued. You wrote the rules, but the world surprised you anyway.

This is the promise of **Procedural Content Generation** — and it sits quietly at the heart of generative art.

This post is for developers who can read code but have never thought of algorithms as paintbrushes. By the end, you will have a working piece of generative art in Clojure, a mental model of the major PCG techniques, and perhaps a small shift in how you think about creativity itself.

---

## What Is Procedural Content Generation?

At its core, PCG is disarmingly simple:

```
seed → algorithm → content
```

You give the algorithm a number — a seed — and it produces something: terrain, a name, a dungeon, a melody, a painting. Change the seed and you get a different result. Same seed, same result every time. The content is not stored; it is *computed on demand*.

This is not random noise. It is *structured randomness* — randomness with rules, with memory, with intention baked in.

The implications are profound. The game *Elite* (1984) shipped with eight galaxies — 256 star systems each, 2,048 total — with planets, economies, and names — on a 32KB floppy disk. None of it was stored. Every system was generated from a single seed, every time the game ran. What could not fit in storage fit in an algorithm.

No Man's Sky does something similar at a scale that strains comprehension: 18 quintillion planets, each with unique geography, atmosphere, flora, and fauna — all from a compact install. The difference between today and 1984 is not philosophy; it is processing power.

But PCG is not just an engineering trick. It is a *creative philosophy*. And nowhere is that more visible than in generative art.

---

## The Techniques: A Field Guide

Before we write any code, let us walk the landscape. PCG is not one thing — it is a family of techniques, each with its own personality and aesthetic fingerprint.

### Noise Functions (Perlin, Simplex)

The workhorse of generative visuals. Noise functions produce smooth, continuous pseudo-random values across space. Feed them an `x` coordinate and get a value between 0 and 1. Feed them `x` and `y` and you get a 2D field — a heightmap, a cloud, a terrain.

The key property is *coherence*: nearby points have similar values, so the output looks organic rather than static. Ken Perlin invented his noise function in 1983, inspired by his frustration with the sterile look of computer graphics while working on *Tron*. He published it at SIGGRAPH 1985 — and it earned him a Technical Academy Award in 1997. It has been in every serious generative art toolkit since.

Minecraft's terrain is Perlin noise, layered. The rolling hills, the sudden cliffs, the underground cave networks — all noise, composed.

### L-Systems

Invented by biologist Aristid Lindenmayer in 1968 to model plant growth, L-Systems are rewriting rules applied repeatedly to a string of symbols. Start with `X`. Apply rules. `X` becomes `F+[[X]-X]-F[-FX]+X`. Apply again. The string grows. Eventually you interpret each character as a drawing command — move forward, turn left, push position onto a stack — and you have a tree.

```
F → move forward
+ → turn right
- → turn left
[ → push current state
] → pop current state
```

The beauty of L-Systems is emergence: a small set of rules, iterated, produces complexity that looks designed by nature. Because it was. Lindenmayer was modelling algae.

### Wave Function Collapse (WFC)

The new kid on the block, and currently the most talked-about technique in generative level design. WFC works by observing a small sample image or tileset and learning which tiles can appear next to which other tiles. It then generates a new image by collapsing possibilities, one cell at a time, always respecting the learned constraints.

The output looks hand-crafted because it learned from hand-crafted input. It is generative but not wild — it is *faithful to a style*.

### Grammar-Based Generation

Text adventure games, quest generators, and NPC dialogue all lean on grammars. You define production rules — `<quest> → <hero> must <action> <object>` — and expand them recursively. Tracery, a tool by Kate Compton, makes this accessible enough to feel like play.

### BSP Trees

Binary Space Partitioning divides a rectangle into two sub-rectangles, then divides those, recursively. Place rooms at the leaves, connect them with corridors, and you have a dungeon. Doom used BSP trees for rendering; roguelikes use them for level generation. The algorithm is old, simple, and reliable.

### Voronoi Diagrams

Scatter points on a plane. For each point on the plane, ask: which of my scattered points is closest? Colour each region by its nearest point. The result is a diagram that looks uncannily like biological cells, geographic territories, cracked earth. Civilization uses Voronoi for map regions.

### Markov Chains

A Markov chain generates sequences where each step depends only on the current state. Feed it enough text and it learns transition probabilities. Ask it to generate and it produces text that *sounds like* the source — statistically plausible, semantically strange. Fantasy name generators, lorem ipsum variants, and low-quality content farms all use Markov chains.

### Cellular Automata

Conway's Game of Life is the canonical example. Each cell is alive or dead. Each tick, the cell looks at its neighbours and applies a rule. What emerges from these local interactions can be astonishingly complex: gliders, oscillators, and patterns that resist prediction. For cave generation in roguelikes, a simple birth/death rule applied to a noisy grid smooths it into something that looks carved by water.

---

## The PCG Stack

These techniques rarely live alone. In practice, generative systems *compose* them into layers, each one consuming the output of the last:

```
Raw noise
  → Terrain shape
    → Biome placement
      → Resource distribution
        → Structure placement
          → Enemy/NPC population
            → Loot tables
```

The bottom of the stack is mathematical. The top is semantic. PCG is the act of building the ladder between them.

In generative art, this stack might look different:

```
Noise field
  → Form silhouettes
    → Colour palette selection
      → Stroke variation
        → Composition rules
          → Final render
```

Same philosophy. Different aesthetic.

---

## Why Clojure?

Before we write code, it is worth asking: why Clojure specifically?

The honest answer is the REPL.

Generative art is an iterative, exploratory craft. You have an idea. You try it. It is not quite right. You adjust a parameter. You try again. You repeat this loop dozens of times before you find the version that feels alive. The cycle between idea and feedback needs to be short — ideally, instantaneous.

Clojure's REPL is live. You change a function and re-evaluate it without restarting the program. With Quil (Clojure's Processing wrapper), that means the canvas repaints with your new logic while you are still looking at it. No recompile. No restart. No lost state.

This is not a minor convenience. It changes the nature of the work. You are not programming at the algorithm — you are *in conversation* with it.

Additionally, Clojure's functional core maps naturally to generative thinking:

- `iterate` produces an infinite sequence of transformations — perfect for L-System expansion or animated frames
- `lazy-seq` lets you define an infinite generative stream without computing it all upfront
- Immutable data makes it easy to reason about state across frames
- The threading macros (`->`, `->>`) make pipelines readable

---

## A Working Quil Sketch: Perlin Noise Terrain

Let us build something. We will create an animated terrain strip — a cross-section of landscape that shifts slowly over time, as if seen through a moving window. The technique is simple: Perlin noise sampled at increasing x positions, with time as a second dimension so the terrain evolves.

### Setup

Add Quil to your `deps.edn`:

```clojure
{:deps {quil/quil {:mvn/version "4.3.1563"}}}
```

### The Sketch

```clojure
(ns generative.terrain
  (:require [quil.core :as q]
            [quil.middleware :as m]))

;; --- State ---

(defn initial-state []
  {:t 0.0})    ; time offset — drives animation

;; --- Update ---

(defn update-state [state]
  (update state :t + 0.005))   ; advance time slowly each frame

;; --- Draw ---

(defn terrain-height
  "Returns a y-coordinate for column x at time t.
   Perlin noise gives a smooth, organic value in [0, 1].
   We scale it to fill the lower portion of the canvas."
  [x t canvas-height]
  (let [noise-val (q/noise (* x 0.008) t)   ; x-scale controls terrain frequency
        base      (* canvas-height 0.4)      ; terrain fills bottom 40–90% of canvas
        amplitude (* canvas-height 0.5)]
    (- canvas-height (+ base (* noise-val amplitude)))))

(defn draw-sky [canvas-height]
  ;; Gradient sky: deep indigo at top fading to dark slate
  (doseq [y (range canvas-height)]
    (let [t     (/ y canvas-height)
          r     (q/lerp 15 30 t)
          g     (q/lerp 10 20 t)
          b     (q/lerp 40 60 t)]
      (q/stroke r g b)
      (q/line 0 y (q/width) y))))

(defn draw-terrain [t canvas-width canvas-height]
  ;; Draw each vertical column of terrain as a filled rectangle
  (q/no-stroke)
  (doseq [x (range canvas-width)]
    (let [h (terrain-height x t canvas-height)
          ;; Colour shifts slightly with height: darker valleys, lighter peaks
          brightness (q/map-range h
                                  0 canvas-height
                                  200 80)]
      (q/fill 60 brightness 80)
      (q/rect x h 1 (- canvas-height h)))))

(defn draw-state [state]
  (let [w (q/width)
        h (q/height)
        t (:t state)]
    (draw-sky h)
    (draw-terrain t w h)))

;; --- Sketch Entry Point ---

(defn setup []
  (q/frame-rate 60)
  (q/color-mode :rgb 255)
  (initial-state))

(q/defsketch terrain
  :title      "Perlin Terrain"
  :size       [800 400]
  :setup      setup
  :update     update-state
  :draw       draw-state
  :middleware [m/fun-mode])   ; functional mode: state flows through update → draw
```

### Running It

Ensure your code is saved at `src/generative/terrain.clj` and your `deps.edn` includes `{:paths ["src"]}`:

```bash
clojure -M -m generative.terrain
```

A window will open. You will see a dark landscape scrolling — hills rising and falling organically, their colour shifting with elevation. The terrain is not stored anywhere. It is computed, column by column, frame by frame, from two floating-point numbers.

### Exploring the Parameters

This is where the REPL shines. Try changing these values and re-evaluating:

| Parameter (default) | Effect of increasing |
|---|---|
| `0.008` (x-scale) | More jagged, chaotic terrain |
| `0.005` (time step) | Faster animation |
| `0.5` (amplitude) | Taller mountains |
| `0.4` (base) | Terrain sits higher in frame |

Each parameter is a dial. Turn them. Notice how the aesthetic shifts. This is the generative art workflow — not designing the output, but designing the *space of possible outputs*.

---

## Composing Techniques

The sketch above uses only noise. But generative art rewards composition. Here are a few extensions to try:

**Add an L-System tree on the horizon.** Expand a plant grammar, interpret the string as turtle-graphics commands, and plant the result at a terrain peak. The noise provides context; the L-System provides detail.

**Layer noise at different frequencies.** Sample noise at fine scale (high frequency) for rocky texture, medium scale for hill shape, and coarse scale for continental slope. Sum them with decreasing weights. This is called *fractal noise* or *octave layering* — the technique behind most realistic-looking procedural terrain.

```clojure
(defn fractal-noise [x t octaves]
  (reduce (fn [acc [freq amp]]
            (+ acc (* amp (q/noise (* x freq) (* t freq)))))
          0
          (map (fn [i]
                 [(* 0.008 (Math/pow 2 i))
                  (/ 1.0 (Math/pow 2 i))])
               (range octaves))))
```

**Use Voronoi cells for a stained-glass palette.** Generate a set of random seed points. For each pixel, find the nearest seed. Assign colours by seed index. The result is a mosaic that looks hand-designed but is entirely computed.

---

## The Deeper Question

There is a question that every generative artist eventually confronts, usually late at night after a long session of parameter tuning:

*Is this art? Or is it the algorithm's art?*

It is the wrong question — but it is a useful wrong question.

When you write a generative system, you are not making choices about what the final image looks like. You are making choices about what *kinds of images are possible*. You are designing a phase space, a territory of outcomes, and then exploring it with seeds.

This is not so different from a painter choosing a palette, a canvas size, and a technique — and then following where the work leads. The painter does not fully control the painting either. Accidents happen. Happy ones. The wet paint bleeds in ways the brush did not intend. The generative artist's accident is the seed they did not expect.

The algorithm is not the artist. But it is not merely a tool, either. It is a *collaborator* — one with no preferences of its own, but whose behaviour emerges from every decision you embedded in it.

When the terrain shifts in ways that surprise you — when you see a mountain range you did not plan, a valley that feels like it means something — that is not the algorithm feeling. That is you, finding meaning in structure. Which is what humans do with everything: clouds, wood grain, the patterns in spilled coffee.

Procedural content generation does not replace the artist. It gives the artist a new kind of canvas: one that grows, one that surprises, one that generates faster than any hand could move.

The brush was always invisible. It was always mathematics. We just made it legible.

---

## Resources

- [Quil Documentation](http://quil.info/)
- [The Book of Shaders](https://thebookofshaders.com/) — noise functions explained visually (GLSL, but the math translates)
- [Tracery](https://tracery.io/) — grammar-based generation made playful
- [Red Blob Games](https://www.redblobgames.com/) — the finest visual explanations of PCG algorithms on the internet
- [Generative Gestaltung](http://www.generative-gestaltung.de/2/) — a book and code library for creative coding
- [The Coding Train](https://thecodingtrain.com/) — Daniel Shiffman's video series covers noise, L-Systems, cellular automata with infectious enthusiasm

---

Have you experimented with creative coding or procedural generation in Clojure or other functional languages? What is your favorite generative technique? Drop a comment or share your sketches below!

*Happy generating.*
