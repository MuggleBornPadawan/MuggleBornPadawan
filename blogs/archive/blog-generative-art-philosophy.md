---
title: "Who Made This? The Philosophy of Generative Art"
published: true
description: "Who owns generative art? Explore authorship, control & 60 years of artists who coded possibility spaces — from Vera Molnár to Clojure creative coding."
tags: generativeart, creativecoding, clojure, philosophy
series: The Invisible Brush
cover_image: https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/g66re3amy3mbf18rcvg0.png
canonical_url: "https://dev.to/ganesh_rajendran_art/who-made-this-the-author-shift-and-the-philosophy-of-generative-art-o3e"
devto_id: 5041730
---

> *This is **Part 2** of a 3-part series on **The Invisible Brush: Generative Art & Creative Computation**:*
> 1. [Part 1: The Invisible Brush — Generative Art and the Algorithms That Paint](https://dev.to/ganesh_rajendran_art/the-invisible-brush-generative-art-and-the-algorithms-that-paint-32ig)
> 2. **Part 2: Who Made This? The Author Shift and the Philosophy of Generative Art** (this article)
> 3. [Part 3: Breaking the 2D Plane — OpenGL, Shaders, and the 3D Graphics Pipeline in Clojure & Quil](https://dev.to/ganesh_rajendran_art/breaking-the-2d-plane-opengl-shaders-and-the-3d-graphics-pipeline-in-clojure-quil-3663)

---

*In the [previous post](https://dev.to/ganesh_rajendran_art/the-invisible-brush-generative-art-and-the-algorithms-that-paint-32ig) we built a Perlin noise terrain sketch in Clojure and Quil — a landscape that scrolls forever without ever being drawn. Now let us ask what that act means.*

---

There is a moment every generative artist knows. The sketch compiles. The window opens. And the first thing you feel is not satisfaction — it is surprise. Something appears on screen that you did not plan, did not foresee, and could not have drawn by hand if you tried. You wrote the system. The system made the thing. And yet it is undeniably *yours*.

This dissonance is not a bug. It is the whole point.

Generative art has existed since the 1960s — before personal computers, before the internet, long before NFTs turned it into a cultural flashpoint. But its central philosophical question is older than computers entirely. It is the oldest question in art: *what counts as making?*

Computers just asked it again, with new sharpness.

---

## The Author Shift

Traditional art has a simple topology:

```text
Artist → Output
```

The painter's hand moves. The mark appears. The relationship is direct, legible, and unambiguous. The Sistine Chapel's ceiling exists because Michelangelo lay on a scaffold and moved a brush across wet plaster, section by section, for four years.

Generative art breaks this. Its topology is different:

```text
Artist → System → Output
```

The artist's creative act moves **upstream**. It is no longer applied to the output — it is applied to the *rules that produce* the output. The output itself emerges from those rules, often in ways the artist could not predict and did not intend.

This upstream shift is what I mean by the **author shift**. The locus of authorship relocates from execution to design. From mark to mechanism. The artist becomes, in a precise sense, a *designer of possibility spaces* rather than a maker of things.

Vera Molnár understood this in 1968. Working at the Sorbonne with access to a mainframe and a plotter, she began writing programs that produced geometric compositions — grids of squares, each one slightly perturbed, each one slightly wrong in its own way. She was not drawing the squares. She was writing the rules that drew them. The imperfections were hers; the specific imperfection of any given square was not.

She called this work a form of controlled disorder. She was precise about it. She was not interested in randomness for its own sake. She was interested in the *calibration* of randomness — in finding the amount of deviation from regularity that felt alive rather than mechanical.

She was, without the vocabulary, describing the spectrum of control.

---

## The Spectrum

Here is the central concept. Everything else hangs off it.

```text
Full Chaos ←————————————————————————→ Full Control
  white noise         flow fields        LOGO turtle
  (not art)            Fidenza            (rigid)
                           ↑
                  sweet spot: structured surprise
```

At the far left: pure randomness. Every pixel an independent coin flip. This is not art — it is static. There is no structure to find meaning in, no pattern for the eye to follow. The surprise has no grammar.

At the far right: total control. Every mark specified. Every position determined. This is not generative — it is drafting. It may be beautiful, but it is not emergent. The artist is not discovering; they are executing.

The sweet spot lives between them. Enough randomness that no two outputs are identical, that the system can surprise you. Enough structure that the outputs share a recognisable DNA, that you can look at a hundred pieces from the same system and know immediately that they came from the same mind.

The craft of generative art is **tuning this dial**. Not finding the dial's correct setting — there is no universal correct setting — but developing the judgment to know when a given system is too wild, too rigid, or just alive enough.

This is not a metaphor. It is a literal engineering problem. When you write a generative system, every parameter is a physical position on this spectrum. Turn one number up and you slide toward chaos. Turn another down and you slide toward rigidity. The composition of your parameters is the composition of your aesthetic.

---

## The Terrain Sketch, Reframed

In the previous post, we built this:

```clojure
(defn terrain-height
  [x t canvas-height]
  (let [noise-val (q/noise (* x 0.008) t)
        base      (* canvas-height 0.4)
        amplitude (* canvas-height 0.5)]
    (- canvas-height (+ base (* noise-val amplitude)))))
```

We examined the parameters then as knobs to turn. Let us look at them again — not as engineering values, but as *aesthetic positions on the spectrum*.

The `0.008` multiplier on `x` is the **spatial frequency** of your chaos. It determines how rapidly the noise function varies as you move across the canvas. A small number means the noise changes slowly — wide, rolling hills, the terrain of a meadow. A large number means it changes fast — jagged, fractured peaks, the terrain of a nightmare.

```clojure
;; Toward control: smooth, slow variation
(q/noise (* x 0.002) t)   ; →  gently rolling plains

;; Toward chaos: rapid, frenetic variation
(q/noise (* x 0.05) t)    ; →  shattered, spiky ridgeline
```

Neither extreme is interesting for long. The plains feel like a screensaver. The spikes feel like noise. The original `0.008` sits at a particular aesthetic conviction: hills that have *character*, that could be named, that feel like they might have rivers on the other side.

The `amplitude` — currently `(* canvas-height 0.5)` — is the **vertical range of your chaos**. At zero, the terrain is a flat line: pure control, no variance, dead. At full canvas height, the terrain oscillates between the top and the bottom of the frame on every column: pure chaos, violent, unreadable.

```clojure
;; Toward control: shallow variation, terrain barely breathes
(let [amplitude (* canvas-height 0.1)] ...)

;; Toward chaos: extreme variation, terrain thrashes
(let [amplitude (* canvas-height 0.9)] ...)
```

And the time step — `0.005` added to `t` each frame — is the **temporal pace of change**. This one is philosophically interesting because it is not about the still image at all. It is about the *experience of watching*. A very small time step produces a system that evolves almost imperceptibly — geological time, the feeling of standing on a hillside and watching it very slowly become a different hillside. A large time step produces something that feels unstable, urgent, anxious.

```clojure
;; Toward stillness (control): barely breathing
(update state :t + 0.0005)

;; Toward turbulence (chaos): rapid, restless churn
(update state :t + 0.05)
```

Each of these parameters is a *stance*. A claim about what this landscape should feel like. The generative artist does not choose the specific hillside — they choose the *kind of hillside that is possible*. And that choice is entirely authorial.

---

## Sixty Years of Tuning the Dial

Generative art has a history. It is not a recent phenomenon invented by blockchain platforms, and it is not the product of machine learning. It is a lineage of artists who, starting in the 1960s, began asking what it would mean to write systems that made things.

**Vera Molnár and Manfred Mohr** (1960s–70s) were among the first. Working with plotters — physical machines that dragged pens across paper under program control — they produced work that was rigorous, geometric, and undeniably art. Mohr's early work decomposed the hypercube into its constituent lines and edges, then systematically varied which lines were visible. The system was his; the specific variation on any given print was the algorithm's. He was comfortable with this. He said the computer was not replacing him — it was *extending* him, letting him explore a space of possibilities that no human hand could traverse in a lifetime.

**Harold Cohen** (1970s–90s) went further. He built AARON — an AI system (rule-based, not neural) that could draw. Not follow pre-specified paths, but *draw*: make decisions about composition, figure placement, mark-making. Cohen spent decades refining AARON's rules, adding capabilities, arguing about whether AARON was an artist or a tool. He never fully resolved it. He continued refining the rules until he died in 2016.

**Karl Sims** (1980s–90s) introduced evolution. His systems bred virtual creatures — 3D bodies with neural controllers — selecting for locomotion. The creatures that moved better survived; the ones that did not, did not. What emerged were organisms with gaits that looked like nothing in nature, because they had evolved under different physics. Sims did not design the creatures. He designed the selection pressure. The specific morphology of any given creature was the product of thousands of simulated generations.

**Casey Reas and Ben Fry** (2000s) democratised the whole field. Processing — the open-source environment they created — put generative tools in the hands of designers and artists who were not programmers. The community that grew up around it is the direct ancestor of creative coding today. Reas in particular wrote extensively about software as a medium with its own aesthetic concerns, its own history, its own standards of craft.

**Robert Hodgin and Anders Hoff** (2010s) represent the creative coding era at its most refined. Hodgin — known online as *flight404* — built systems of extraordinary physical beauty: fluid simulations, starfield renderers, typographic forms shaped by gravity. His work demonstrated that generative code could meet the visual standards of commercial motion design without sacrificing any of its procedural character. Hoff, working under the name *inconvergent*, pursued a different register: fine-art prints where the generative process was explicit in the form — lines that accumulated, that crowded, that reacted to their own density. His work looked like it was drawn by a patient hand, because in a sense it was: the hand was the algorithm, running for hours, making thousands of small decisions the artist had authored once and released.

**Tyler Hobbs and Dmitri Cherniak** (2020s) brought generative art to a new audience through on-chain distribution — Art Blocks, long-form generative collections where every token is a unique output from a single algorithm, stored permanently on the Ethereum blockchain. Hobbs's *Fidenza* is widely considered the canonical example of a generative system tuned to a genuinely refined sweet spot: outputs that are unmistakably related, visually coherent, and yet each one surprising. Cherniak's *Ringers* demonstrates that extreme constraint — a ball, a peg, a string — produces extraordinary variety when the parameter space is richly designed.

What connects Molnár to Cherniak across six decades is not the medium. It is the method: *design the system, trust the emergence, resist the urge to control the specific output*.

---

## What Makes a System Good

A generative system is not evaluated the way a painting is evaluated. You cannot judge it by looking at a single output. You have to think about the *territory* it covers.

A good generative system has **shared DNA across its outputs**. Look at a hundred pieces from Tyler Hobbs's Fidenza and you know immediately they came from the same mind, the same set of rules. They vary — wildly, interestingly — but they vary within a recognisable aesthetic space. This is what distinguishes a *system with aesthetic identity* from a system that just produces random things. The constraints are what give the work its signature.

A good generative system has **no dead zones**. Every seed should produce something worth looking at. This sounds easy. It is not. Edge cases in parameter space produce edge cases in output space. The system that generates something extraordinary at seed 1234 might generate something completely dead at seed 1235. Finding and eliminating dead zones is a large part of the actual work of generative art — not the mathematics, not the code, but the exploration of the territory the code defines.

A good generative system has **latent depth** — structure that reveals itself slowly, that rewards close inspection. The first glance shows the gross shape. The second shows the internal variation. The third shows something you missed before. This is not an accident. It is engineered by composing techniques at multiple scales: coarse structure from one noise layer, medium detail from another, fine texture from a third.

This is what the fractal noise extension from the previous post was doing:

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

Each octave adds a layer of detail at a finer scale, with a correspondingly smaller amplitude. The mountains are defined at the coarsest scale; the rocky outcrops at the medium scale; the texture of individual stones at the finest. Sum them, and the terrain has the depth of a real landscape — not because we modelled geology, but because we structured the randomness at multiple scales. This is the technique behind virtually every realistic-looking procedural landscape ever created, from Minecraft to flight simulators.

---

## The Authorship Question

Here it is. The question you have been building toward since you started reading this.

The terrain shifted in a way you did not design. A mountain rose at exactly the right position, at exactly the right height, at exactly the right moment in the animation. It looked *intentional*. It looked like you planned it. You did not.

Who made it?

The options are not as simple as they first appear.

**You made it.** You chose the noise function. You chose the spatial frequency. You chose the amplitude. You chose the colour mapping. Every aesthetic property of that mountain — the fact that it rises slowly, that it has that particular shade of green at its peak, that it moves at that particular pace — flows directly from decisions you made. The mountain could not have appeared without those decisions. In what sense did you not make it?

**The algorithm made it.** You did not choose this mountain. You could not have. The specific configuration of peaks and valleys at frame 1,247 of this particular seed was not in your mind when you wrote the code. It is the result of the noise function's behaviour at those coordinates — a mathematical fact you could have computed but certainly did not imagine. In what sense did you make it?

**The seed made it.** The seed is the number that initialises the noise function. Change it and you get a different mountain at frame 1,247. The seed is, in some sense, the *identity* of this particular piece. It is what makes this terrain *this terrain* rather than another one. The collector of an on-chain generative artwork knows they own token 42 — which is to say, seed 42 — which is to say, the specific possibility that seed 42 selects from the artist's possibility space. In what sense is the seed not an author?

Philip Galanter, writing in 2003, proposed that the right frame is not authorship at all — it is *complexity theory*. The generative artist is a *complexity tuner*, operating at the boundary between order and chaos, exploiting the dynamics of the systems they build. The question of credit misses the point. The interesting question is what the work does, not who did it.

I find this convincing but incomplete. It describes the *method* without describing the *experience*. And the experience — of finding meaning in structure, of feeling surprise at your own system's output, of recognising your aesthetic in something you did not design — is real and philosophically significant.

Here is my own view, offered without confidence: generative art is **collaborative authorship across three parties** — the human designer, the algorithm, and the seed. The human designs the possibility space. The algorithm enforces the rules of that space. The seed selects a specific realisation. None of the three alone produces the work. All three together do.

This is not so strange if you think about it. A jazz musician collaborates with their instrument, with the acoustics of the room, with the other musicians, with the history of the form. The specific improvisation that emerged at 9:47pm on a Tuesday in 1965 required all of those collaborators. No one seriously argues that the musician did not make the music. No one seriously argues they made it alone.

The generative artist did not hold the brush. But they designed the brush, and they chose to hold nothing else.

---

## The Misconceptions Worth Clearing

Three misconceptions circulate about generative art, and they obscure what is actually interesting about it.

**"The AI makes it."** Most generative art has nothing to do with machine learning. The Perlin terrain sketch we built uses a deterministic mathematical function. So does Fidenza. So did Vera Molnár's plotter drawings. Machine learning is one tool that *can* be used in generative contexts, but conflating ML with generative art mistakes a small recent subfield for the entire category.

**"It's random, so it's easy."** Taming randomness is the hard part. Pure random noise is trivial to produce and immediately boring. The craft is in constraining the randomness, in finding the parameters and rules that make the random outputs *good* — that eliminate the dead zones, that build in the latent depth, that tune the dial to the sweet spot. This work is as demanding as any other art-making practice. It is just less legible to observers who do not know how to look for it.

**"The computer is the artist."** The computer is not the artist any more than the camera is the photographer or the piano is the composer. It is a medium with its own properties, its own affordances, its own resistances. The artist works with and against those properties. The specific character of the work is shaped by the medium — but it is shaped *by* the artist working in it.

---

## What This Means for the Code You Write

If you write generative code — even casually, even experimentally — you are participating in a practice with sixty years of history and a genuinely unresolved philosophical core. The parameter tuning is not incidental. It is the aesthetic work. The seed that produces the surprising output is not luck — it is the system functioning as designed, revealing a corner of the territory you mapped.

When you adjust the x-scale of the noise from `0.008` to `0.003` and the terrain suddenly feels oceanic rather than mountainous — that feeling is data. It is your aesthetic judgment recognizing that you have moved along the spectrum in a direction that suits your intent. Trust it. The REPL makes this loop fast enough to be intuitive, to feel less like programming and more like sculpting.

The terrain sketch from the previous post is a simple system. Its parameter space is small. But the same logic scales to systems of enormous complexity — systems with hundreds of parameters, with internal feedback loops, with emergent behaviours that resist prediction even by their creators.

The first step is the same: write the system. Then explore what it made.

---

## A Closing Provocation

We have spent this whole post asking who made the artwork. Let me end with a different question.

Does it matter?

If a mountain appears on the screen and it is beautiful — if it has that precise quality of *feeling right*, of feeling like it belongs, of surprising you while also feeling inevitable — does the question of authorship change that? Does knowing that a noise function produced it rather than a decision make it less beautiful? Does knowing that the artist designed the noise function rather than the specific mountain make it less theirs?

I do not think aesthetics is downstream of authorship. I think it runs the other way. The question of who made something is interesting philosophically, legally, economically. But the experience of standing in front of something — or sitting in front of a screen, watching a landscape scroll — is prior to all of that. The experience arrives before the question.

Vera Molnár said she was looking for forms that *move* her. She was not asking who was responsible for them.

Maybe that is the generative artist's actual job: design a system capable of producing something that moves you. And then let it.

---

## References

- [Quil Documentation](http://quil.info/) — the Clojure/Processing wrapper used in this series
- Tyler Hobbs — *[The Aesthetics of Generative Art](https://tylerxhobbs.com/essays/2021/the-aesthetics-of-generative-art)* — the best contemporary essay on the craft
- Philip Galanter — *What is Generative Art? Complexity Theory as a Context for Art Theory* (2003) — the theoretical foundation
- Vera Molnár — *[Toward Aesthetic Computation](https://www.atariarchives.org/artist/sec11.php)* (1975) — the original source
- [The Book of Shaders](https://thebookofshaders.com/) — noise, fractals, and colour, explained visually
- [Generative Gestaltung](http://www.generative-gestaltung.de/2/) — code and book, the definitive reference for creative coding

---

## Series Navigation

1. **Part 1:** [*The Invisible Brush: Generative Art and the Algorithms That Paint*](https://dev.to/ganesh_rajendran_art/the-invisible-brush-generative-art-and-the-algorithms-that-paint-32ig) — Foundations of PCG, noise functions, and building a terrain generator in Clojure and Quil.
2. **Part 2 (Current):** [*Who Made This? The Author Shift and the Philosophy of Generative Art*](https://dev.to/ganesh_rajendran_art/who-made-this-the-author-shift-and-the-philosophy-of-generative-art-o3e) — Deconstructs the author shift, the spectrum of control, and 60 years of algorithmic art philosophy.

---

*What does authorship mean to you in this context — do you feel like the artist of the outputs your systems produce, or something else? Leave a comment. I'm genuinely curious where you land.*

---
*Crafted with AI: Research, drafting, review, and refinement assisted by frontier AI models.*
