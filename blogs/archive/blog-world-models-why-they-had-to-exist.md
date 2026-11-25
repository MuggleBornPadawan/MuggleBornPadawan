---
title: "Why World Models Had to Exist: 80 Years of AI"
published: true
description: "Every AI paradigm since 1943 has failed in the same direction — no model of reality. Here's how eight decades of failure led inevitably to World Models."
tags: ai, worldmodels, deeplearning, robotics
series: The World Model Series
cover_image: https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/oziiwmgu7t9ktsg3p0u9.png
canonical_url: https://dev.to/ganesh_rajendran_art/why-world-models-had-to-exist-80-years-of-ai-trying-to-understand-reality-42nk
devto_id: 5101895
---

> *This is **Part 1** of a 3-part series on **The World Model Series**:*
> 1. **Part 1: Why World Models Had to Exist: 80 Years of AI** (this article)
> 2. [Part 2: The World Model Trilemma: Pixels, Splats, and Symbolic Physics](https://dev.to/ganesh_rajendran_art/the-world-model-trilemma-pixels-splats-and-symbolic-physics-59ci)
> 3. [Part 3: Game Engines Were World Models All Along](https://dev.to/ganesh_rajendran_art/game-engines-were-world-models-all-along-1cm4)
>
> *This is the *why*: 80 years of AI failing toward World Models.*

---

## The Thing AI Has Never Had

Here is a question that sounds obvious once you hear it:

> Does your GPS *understand* that if you drive into a river, you will not arrive at your destination?

No. It routes. It does not understand. It has a map — a frozen snapshot of the road network — but no model of what happens when a car meets water. It cannot simulate consequences. It cannot imagine futures. It cannot predict what it has never seen.

For eighty years, every AI system we have ever built has had this same problem. They have all been, at their core, extraordinarily sophisticated pattern matchers working from frozen snapshots. None of them has ever had an *internal model of how the world works* that it could run forward in time, like a mental simulation, to reason about what might happen next.

That is what a World Model is. And understanding why it took until 2022 to even approach this idea requires living through the seven eras that tried and failed before it.

---

## First: What a World Model Actually Is

Before we walk back through history, we need a clear picture of the destination. What exactly is a World Model?

Imagine you are playing chess. You do not need to physically move every piece to know what happens if you advance a pawn. You run the move *in your head*. You simulate consequences, evaluate futures, discard bad moves, pursue promising ones — all without touching the board. That internal simulation engine, the one that lets you reason about states of the world you have not yet visited, is a world model.

A machine with a world model can do the same thing. It has learned enough about how the world works — how objects fall, how conversations flow, how actions lead to outcomes — that it can generate plausible futures without having to experience them. It can plan. It can imagine. It can be wrong in ways it can then correct, rather than being wrong in ways it cannot even detect.

There are three distinct research lineages that have converged on this idea in the 2020s:

**The Dreamer lineage (model-based reinforcement learning)** — built by Danijar Hafner at Google DeepMind. The system learns a *latent dynamics model*: a compressed internal representation of the world that it uses to train itself entirely in imagination. It never needs to try things in the real environment to know whether they will work. DreamerV3 (2023) was the first agent to collect diamonds in Minecraft from scratch, with fixed hyperparameters, across 150 completely different tasks. The same system, unchanged, playing Atari and controlling a robot arm.

**The JEPA lineage (LeCun's framework)** — Yann LeCun at Meta AI has argued since 2022 that the whole approach of predicting tokens — words, pixels, bytes — is architecturally wrong for building intelligence. His *Joint Embedding Predictive Architecture* (JEPA) predicts abstract *representations* of the world, not raw observations. Rather than generating what a room will look like after you open a door (which requires hallucinating every pixel), JEPA asks only: "what will the *structure* of the situation be?" V-JEPA 2 (2025) demonstrated this in robotics: a system that could plan manipulation tasks by reasoning in abstract latent space rather than in pixel space.

**The Generative Video lineage** — OpenAI's Sora (2024), Google DeepMind's Genie 2 (2024), and NVIDIA's Cosmos (2025) take a different approach: train on vast amounts of video footage and learn to generate consistent, controllable futures as video. Sora's technical report called it "a simulator of the physical world." This is the most visually spectacular branch — and the one with the most visible failure modes, since video can look physically plausible while violating the actual laws of physics.

Three different approaches. One shared insight: **AI needs to predict futures, not just describe the present.**

Now: why did this take eighty years to arrive at?

**The seven eras at a glance:**

| # | Era | Span | Failure mode |
|---|-----|------|--------------|
| 1 | Early Connectionism | 1943–1956 | Cannot learn |
| 2 | Symbolic AI | 1956–1972 | Combinatorial wall |
| 3 | Expert Systems | 1974–1987 | Brittle & expensive |
| 4 | Statistical ML | 1993–2012 | No representations |
| 5 | Deep Learning | 2012–2017 | Task-specific |
| 6 | Transformers / LLMs | 2017–2022 | No causal model |
| 7 | World Models | 2022–present | Physics grounding? |

---

## Era 1: Early Connectionism (1943–1956)
### *The spark that could not learn*

In 1943, Warren McCulloch and Walter Pitts published a paper that proved neurons — simplified mathematical neurons — could compute any logical function. It was the birth of the idea that intelligence might be computable. Seven years later, Alan Turing proposed the famous test: if a machine can hold a conversation indistinguishable from a human, we should consider it intelligent.

These were extraordinary insights. They gave us the frame. But the systems of this era had a fatal limitation: **their weights were hardcoded**. The neuron knew what it knew at birth. It could not learn from experience. You could build a system that recognized certain patterns, but only patterns you had explicitly programmed it to recognize.

A world model requires learning — you cannot hardcode a model of everything. This era established the vocabulary of AI but could not write a single sentence in it.

**What it handed to the next era:** The idea that intelligence could be mechanized at all. The spark.

**What it left unresolved:** Any mechanism for learning from data.

---

## Era 2: Classical Symbolic AI — GOFAI (1956–1972)
### *The map mistaken for the territory*

The Dartmouth Workshop of 1956 launched AI as a formal discipline. The dominant belief was elegant: intelligence is symbol manipulation. If you can represent knowledge as symbols — words, logical propositions, formal rules — and write programs to manipulate those symbols, you can replicate intelligence.

This produced remarkable systems. The Logic Theorist (1956) proved 38 of the 52 theorems in *Principia Mathematica*. The General Problem Solver (1957) could solve abstract puzzles by reducing the gap between current state and goal state. SHRDLU (1970) could understand natural language in a "blocks world" — a simple domain of colored geometric shapes — with striking fluency.

The problem was the phrase "blocks world." These systems worked inside toy universes. The moment you took GPS (General Problem Solver) out of its toy domain and pointed it at the real world, it collapsed. The state space exploded combinatorially — there are simply too many possible states in reality to search through. And these systems had no background knowledge of anything outside their explicit programming. They could not handle exceptions, ambiguity, or anything genuinely new.

Crucially: they had no way to update their knowledge from experience. The "world" they modeled was hand-typed by programmers, not learned from reality.

**What it handed to the next era:** The insight that *domain-specific knowledge* might be more powerful than general search.

**What it left unresolved:** How to acquire that knowledge without paying armies of programmers to type it in.

---

## Era 3: Expert Systems (1974–1987)
### *When specialists failed to teach machines their intuition*

The Second AI Winter loomed because Symbolic AI had overpromised. The recovery strategy was pragmatic: instead of building general intelligence, build narrow expertise. Encode what a doctor knows. Encode what a geologist knows. Encode what a DEC engineer knows about configuring computers.

This worked — commercially, for a while. MYCIN diagnosed bacterial infections using 600 IF-THEN rules and outperformed junior doctors. XCON configured computer systems and saved DEC ~$25-40M per year as reported by DEC. PROSPECTOR predicted mineral deposits.

The architecture was clean: a **knowledge base** of IF-THEN production rules, and an **inference engine** that chained them together. MYCIN's key innovation was separating these two concerns — the knowledge base was modular and replaceable, the inference engine was reusable.

But there was a profound and ultimately fatal problem: **tacit knowledge cannot be fully articulated**.

When you ask an expert doctor "how do you know this patient has bacterial meningitis rather than viral?" they will give you reasons. But those reasons are only the surface of their knowledge. Beneath lies decades of pattern recognition, intuition built from thousands of cases, the ability to weigh contradictory signals in ways they cannot fully express. You cannot put that in an IF-THEN rule. The "knowledge acquisition bottleneck" — the impossibility of extracting all expert knowledge into explicit rules — killed every expert system eventually.

Worse: these systems were brittle. Any input outside their rule base caused complete failure, not graceful degradation. A doctor who does not recognize a symptom can still reason. MYCIN could not.

**What it handed to the next era:** The separation of knowledge from inference. And a clear mandate: knowledge must be learned, not typed.

**What it left unresolved:** How to learn knowledge statistically, from data, without human curation.

---

## Era 4: Statistical Machine Learning (1993–2012)
### *Learning from data, but only from features humans chose*

The pivot was profound. Instead of encoding intelligence as rules, the new paradigm said: **give the machine data, define a measure of success, and let it find the pattern itself**.

Support Vector Machines (1995) found the optimal boundary between classes by maximizing the margin between them — with provable mathematical guarantees about how well this would generalize to new data. Random Forests (2001) built ensembles of decision trees that were robust even on messy real-world data. Bayesian Networks gave AI a principled way to reason under uncertainty.

This era also produced LSTM (1997) — Long Short-Term Memory networks, which could finally handle sequential data with long-range dependencies. And it produced backpropagation at scale — the mathematical engine that would eventually power deep learning.

The critical limitation: **the machine learned from features that humans still had to design**. If you wanted to classify medical images, a human expert first had to decide which measurements to take — tumor size, pixel intensity gradients, edge features — and feed those numbers into the algorithm. The algorithm found the best boundary in that feature space. But the feature space itself was still human-engineered.

This meant statistical ML inherited the expert bottleneck in a new form. Instead of needing experts to write rules, you needed experts to design features. And you absolutely could not point it at raw pixels or raw audio — the feature space would be intractable.

No model of the world here either. These systems were magnificent at finding patterns in fixed representations of data. They had no way to predict futures, no way to simulate consequences, no internal dynamics at all.

**What it handed to the next era:** Mathematical rigor. The language of optimization, loss functions, and generalization. The machinery of learning.

**What it left unresolved:** How to learn representations themselves, not just patterns within human-designed representations.

---

## Era 5: The Deep Learning Revolution (2012–2017)
### *When machines learned to see — and nothing else*

In September 2012, the ImageNet Large Scale Visual Recognition Challenge results are posted. AlexNet, a deep convolutional neural network trained by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton, achieves 15.3% top-5 error. The runner-up: 26.2%. An eleven-point gap. The field did not gradually absorb this. It was a shock.

What AlexNet demonstrated was that you could point a neural network at raw pixels and have it learn everything — the low-level edge detectors, the mid-level shapes, the high-level concepts — entirely from data, end-to-end, without a human engineering a single feature. The representation learning problem was solved.

The secret was three things arriving simultaneously: a dataset large enough (ImageNet: 1.2 million labeled images), hardware fast enough (NVIDIA GPUs, 100x faster than CPUs for the matrix math neural networks require), and architectural tricks that made very deep networks trainable (ReLU activations, dropout, better initialization).

What followed was extraordinary. Word2Vec (2013) produced word embeddings — dense numerical representations of words that captured semantic relationships. GANs (2014) generated synthetic images. Seq2Seq (2014) translated between languages. ResNet (2015) trained 152-layer networks. AlphaGo (2016) defeated the world Go champion by combining deep learning with Monte Carlo tree search.

But a limitation crystallized: **every model was trained for one task**. AlexNet recognized ImageNet categories. It was useless for translation. AlphaGo played Go. It was useless for chess. Each model was a specialist, requiring millions of labeled examples to train, and transferring to nothing.

A world model cannot be task-specific. Reality is not task-specific. The failure mode of deep learning — task-specificity, brittleness to distribution shift, data hunger — made clear that the field needed a new approach to generalization.

**What it handed to the next era:** End-to-end representation learning. The idea of transfer learning — pretrain on large data, adapt to small. The GPU infrastructure.

**What it left unresolved:** Generalization across tasks without retraining. And still: no model of the world. Just a very sophisticated snapshot matcher.

---

## Era 6: Transformers and Large Language Models (2017–2022)
### *The closest thing to general intelligence — that still cannot simulate a falling cup*

In 2017, eight researchers at Google Brain published "Attention Is All You Need." The Transformer architecture replaced recurrence (the sequential processing of recurrent neural networks (RNNs) and LSTMs) with self-attention: every token looking at every other token simultaneously, in parallel. This made training vastly faster and enabled scaling to previously impossible sizes.

BERT (2018) used transformers to build bidirectional language understanding that dominated every NLP benchmark. GPT-2 (2019) showed that a language model trained to predict the next word had, almost accidentally, learned to perform tasks nobody trained it for — translation, question answering, summarization — zero-shot. GPT-3 (2020) scaled this to 175 billion parameters and demonstrated few-shot learning: show it three examples of a new task in its prompt, and it generalizes.

The 2020 Scaling Laws paper from OpenAI (Kaplan et al.) revealed something startling: loss scaled predictably as a power law with the number of parameters, the amount of data, and the amount of compute. No architectural breakthroughs were needed. Just scale.

GPT-4 (2023), trained on web-scale text and code — exact mix undisclosed, per the OpenAI technical report — performs at expert human level on medical licensing exams, bar exams, and coding competitions. It can write poetry, debug code, explain quantum mechanics, and argue philosophy.

But here is what it cannot do, and this is the pivot to everything:

**It cannot simulate what happens when you drop a cup.**

Not in the physical sense. It can *describe* what happens — "the cup falls, hits the floor, and may shatter depending on the material and height" — because it has read thousands of descriptions of cups falling. But it has no internal simulation of gravity, no model of material properties, no way to actually compute the trajectory. It is retrieving a cached pattern from text, not running a mental simulation.

This is the hallucination problem in its deepest form. LLMs hallucinate not because they are careless — they hallucinate because **they have no grounded model of reality to check their outputs against**. They are, in the words of the reference document, predicting the next token. They cannot simulate consequences. They have no persistent internal state. They cannot plan beyond their context window. They are brilliant, encyclopedic, articulate — and completely disconnected from the causal structure of the world.

Every single failure mode of LLMs traces back to this one structural absence.

**What it handed to the next era:** One pretrained model that transfers zero-shot to novel tasks. Scaling as a principled methodology. The capability to process and integrate knowledge across the full breadth of human thought.

**What it left unresolved:** The same thing that every era left unresolved. A model of how the world actually works.

---

## Era 7: World Models (2022–Present)
### *Teaching machines to simulate before they speak*

Each of the six prior paradigms failed in the same direction. They could describe the world, recognize patterns in it, manipulate symbols about it, retrieve knowledge concerning it — but none of them could *simulate it forward in time*.

The world model paradigm's core claim is this: **before an intelligent system can act reliably in the world, it must build an internal model of that world — one that it can run as a mental simulation to predict consequences, evaluate plans, and reason about states it has never directly observed.**

This is not a new idea. The term was framed by Ha & Schmidhuber in 2018; it went mainstream from 2022 via Dreamer, JEPA, and generative video. Control theory engineers have used internal models for decades. Neuroscientists believe the brain's predictive coding machinery is essentially a world model: your visual cortex is constantly predicting what you will see next, and updating its model when reality surprises it. What is new is the attempt to build this at the scale and generality of modern AI.

### Lineage 1: DreamerV3 — Training in Imagination

Danijar Hafner's DreamerV3 (2023) is the clearest implementation of the world model idea. It has two components:

A **world model** — specifically, a Recurrent State Space Model (RSSM) — that learns from raw observations (pixels, sensor readings) to predict: given the current state and an action, what will the next state be? This model runs in a compressed "latent space" — it does not predict raw pixels, it predicts the internal representation of the next state.

An **actor** that learns entirely by interacting with the world model, not with the real environment. The actor imagines sequences of actions, runs them through the world model to see their consequences, and learns to pick actions that lead to good outcomes. No real environment rollouts. No expensive trial-and-error in the physical or even simulated world. Pure imagination.

The result: a single agent, with fixed hyperparameters (no tuning per task), that can collect diamonds in Minecraft from scratch, play Atari games, control robot arms, and navigate 3D mazes. 150+ diverse tasks. The same system.

This is what the relay race was running toward. Not a system that is good at one thing. A system that builds a model of whatever environment it finds itself in, and uses that model to plan.

### Lineage 2: JEPA — Predicting Structure, Not Pixels

LeCun's argument, articulated in his 2022 position paper "A Path Towards Autonomous Machine Intelligence," is that autoregressive prediction — predicting the next token, the next pixel, the next frame — is architecturally the wrong objective for intelligence.

Why? Because the world is not perfectly predictable at the pixel level. When you open a door, you cannot know exactly how the light will fall, exactly where every dust mote will land, exactly what expression the person behind it will have. If you force your model to predict all of these things, you force it to either hallucinate or waste capacity on inherently unpredictable detail.

JEPA instead predicts abstract representations. Rather than "what will the room look like," JEPA asks "what will the *structure* of the room be?" It learns to predict in a space where irrelevant details have been compressed away, and only the causally important structure remains.

V-JEPA 2 (Meta, June 2025) demonstrated this for robotics: a robot that could reason about manipulation tasks — grasping, pushing, stacking — by planning in abstract latent space. Fewer physics violations than pixel-prediction models. Faster inference. Better generalization.

The intuition: a human expert mechanic does not imagine the precise visual appearance of every bolt when planning how to disassemble an engine. They reason about structure and causality. JEPA is trying to build that kind of reasoning.

### Lineage 3: Generative Video — Simulating the Visual World

The third lineage is the one you have probably seen. OpenAI's Sora (February 2024) generates minute-long videos from text prompts with striking photorealism and emergent 3D consistency. Google DeepMind's Genie 2 learns from unlabeled game footage and generates interactive environments you can control. NVIDIA's Cosmos trained on ~20M hours of driving and robotics footage to build a "physical AI foundation model."

These systems have learned, from watching vast quantities of video, something about how the visual world behaves over time. They can generate plausible futures. They can maintain 3D consistency across viewpoints. In some sense, they are simulating — not computing physics from equations, but having internalized enough statistical regularity of the visual world that their outputs behave *as if* physics is operating.

The failure mode is precisely what you would expect: **statistical plausibility is not physical correctness**. Sora's videos violate conservation of momentum. Objects pass through each other. People's hands have the wrong number of fingers. Physics "slips" accumulate over long clips. The model has learned the *look* of physics, not the *structure* of it.

This is why the companion piece — *The World Model Trilemma* — frames the tension between these approaches as a trilemma: you can have visual realism, geometric consistency, or physical correctness, but current architectures force you to trade one against the others.

---

## What Every Era Was Missing

Looking back across eighty years, the same absence appears in every paradigm:

| Era                 | What it learned from                 | What it could not do                      |
|---------------------|--------------------------------------|-------------------------------------------|
| Early Connectionism | Hardcoded weights                    | Could not learn at all                    |
| Symbolic AI         | Hand-coded rules                     | Could not handle the real world's scale   |
| Expert Systems      | Expert knowledge (typed in)          | Could not learn; collapsed on novel input |
| Statistical ML      | Labeled data, hand-designed features | Could not learn representations           |
| Deep Learning       | Raw data, end-to-end                 | Could not generalize across tasks         |
| Transformers / LLMs | Massive text corpora                 | Cannot simulate; cannot reason causally   |
| **World Models**    | **Observations + interaction**       | **Physics grounding (still open)**        |

The pattern is not random. Each era solved the previous era's hard problem and ran straight into the next one. Statistical ML solved the feature-engineering problem. Deep learning solved the representation-learning problem. Transformers solved the task-specificity problem. World Models are attacking the causal grounding problem.

What remains unsolved across *all* eras, including the current one:

> **Combining symbolic precision + relational structure + statistical fluency + causal grounding into one unified, sample-efficient architecture.**

This is the open problem. It is not solved.

---

## The Open Problems World Models Have Not Fixed

Being honest about where we are matters. World Models are not AI-complete. They have clear failure modes:

**Long-horizon physics violations.** Generative video models degrade over time. Object permanence breaks down — things appear, disappear, change size inconsistently. Momentum is not conserved. These are not engineering bugs; they are symptoms of a statistical model that has learned the correlation structure of physics without its causal structure.

**Stateless architectures.** Most world model implementations, including the generative video lineage, have no persistent internal state across episodes. Each new context starts fresh. A system that forgets everything when the conversation ends cannot build the kind of persistent world model that enables genuine long-horizon planning.

**The sim-to-real gap.** Internet video is an imperfect physics teacher. High-speed impacts, microscopic deformations, fluid dynamics at precision scales — these are underrepresented or not represented at all in training data. A robot trained on a video-based world model often fails catastrophically in reality because reality has physical detail the training distribution never covered.

**Compositionality.** No current world model robustly generalizes to truly novel configurations of familiar components. A human who has seen blocks stacked and balls rolled can reason about a ball stacked on a block. World models still struggle here.

---

## Where This Leaves Us

The relay race is not over. The baton that seven eras of AI have been passing — from McCulloch-Pitts neurons to transformer language models — is a baton labeled "build a model of reality." Every previous runner got closer but hit a wall. World Models are the current runner, and they are further than any predecessor.

But the finish line is not yet visible.

If you want to understand what the current generation of world models actually looks like from the inside — the architectural tradeoffs between pixel-stream diffusion, 3D geometric representations, and symbolic physics engines — that is the subject of [**The World Model Trilemma: Pixels, Splats, and Symbolic Physics**](https://dev.to/ganesh_rajendran_art/the-world-model-trilemma-pixels-splats-and-symbolic-physics-59ci). This blog was the *why*. That blog is the *what*.

The question that neither answers — the question that remains open to everyone working in this field — is *how*. How do you build a system that is as fluent as an LLM, as physically grounded as a physics simulator, as generalizable as DreamerV3, and as visually consistent as Sora, all at once?

Nobody knows yet. That is what makes this the most interesting moment in the history of artificial intelligence.

**Which lineage are you betting on — Dreamer-style latent planning, JEPA-style representation prediction, or generative video simulation? Drop your pick in the comments.**

---

**The World Model Series — Part 1 of 2.** Next: [Part 2: The World Model Trilemma: Pixels, Splats, and Symbolic Physics →](https://dev.to/ganesh_rajendran_art/the-world-model-trilemma-pixels-splats-and-symbolic-physics-59ci)

---

## References

### Era 1 — Early Connectionism & Symbolic Foundations

1. **McCulloch, W.S., & Pitts, W. (1943).** "A Logical Calculus of the Ideas Immanent in Nervous Activity." *Bulletin of Mathematical Biophysics*, 5, 115–133.
2. **Turing, A.M. (1950).** "Computing Machinery and Intelligence." *Mind*, 59(236), 433–460.
3. **Newell, A., & Simon, H.A. (1956).** "The Logic Theory Machine: A Complex Information Processing System." *IRE Transactions on Information Theory*, 2(3), 61–79.

### Era 2 — Classical Symbolic AI / GOFAI

4. **Newell, A., & Simon, H.A. (1963).** "GPS, a Program that Simulates Human Thought." *Computers and Thought*, McGraw-Hill.
5. **McCarthy, J., & Hayes, P.J. (1969).** "Some Philosophical Problems from the Standpoint of Artificial Intelligence." *Machine Intelligence*, 4, 463–502. *(Introduced the Frame Problem)*
6. **Minsky, M., & Papert, S. (1969).** *Perceptrons: An Introduction to Computational Geometry.* MIT Press. *(Killed neural network funding for a decade)*

### Era 3 — Expert Systems & Knowledge Engineering

7. **Feigenbaum, E.A., Buchanan, B.G., & Lederberg, J. (1971).** "On Generality and Problem Solving: A Case Study Using the DENDRAL Program." *Machine Intelligence*, 6, 165–190.
8. **Davis, R., Buchanan, B., & Shortliffe, E. (1977).** "Production Rules as a Representation for a Knowledge-Based Consultation Program." *Artificial Intelligence*, 8(1), 15–45.

### Era 4 — Statistical ML & Kernel Methods

9. **Rumelhart, D.E., Hinton, G.E., & Williams, R.J. (1986).** "Learning Representations by Back-propagating Errors." *Nature*, 323, 533–536.
10. **LeCun, Y., Boser, B., Denker, J.S., et al. (1989).** "Backpropagation Applied to Handwritten Zip Code Recognition." *Neural Computation*, 1(4), 541–551.
11. **Vapnik, V., & Cortes, C. (1995).** "Support-Vector Networks." *Machine Learning*, 20(3), 273–297.
12. **Hochreiter, S., & Schmidhuber, J. (1997).** "Long Short-Term Memory." *Neural Computation*, 9(8), 1735–1780.
13. **Breiman, L. (2001).** "Random Forests." *Machine Learning*, 45(1), 5–32.

### Era 5 — Deep Learning Revolution

14. **Krizhevsky, A., Sutskever, I., & Hinton, G.E. (2012).** "ImageNet Classification with Deep Convolutional Neural Networks." *NeurIPS*. [neurips.cc](https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
15. **He, K., Zhang, X., Ren, S., & Sun, J. (2015).** "Deep Residual Learning for Image Recognition." *CVPR 2016*. [arXiv:1512.03385](https://arxiv.org/abs/1512.03385)
16. **Silver, D., et al. (DeepMind, 2016).** "Mastering the Game of Go with Deep Neural Networks and Tree Search." *Nature*, 529, 484–489.

### Era 6 — Transformers & Pre-trained LLMs

17. **Vaswani, A., Shazeer, N., Parmar, N., et al. (2017).** "Attention Is All You Need." *NeurIPS*. [arXiv:1706.03762](https://arxiv.org/abs/1706.03762)
18. **Devlin, J., Chang, M-W., Lee, K., & Toutanova, K. (2018).** "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding." *NAACL 2019*. [arXiv:1810.04805](https://arxiv.org/abs/1810.04805)
19. **Brown, T., et al. (OpenAI, 2020).** "Language Models are Few-Shot Learners (GPT-3)." *NeurIPS*. [arXiv:2005.14165](https://arxiv.org/abs/2005.14165)
20. **Kaplan, J., et al. (OpenAI, 2020).** "Scaling Laws for Neural Language Models." [arXiv:2001.08361](https://arxiv.org/abs/2001.08361)
21. **Hoffmann, J., et al. (DeepMind, 2022).** "Training Compute-Optimal Large Language Models (Chinchilla)." [arXiv:2203.15556](https://arxiv.org/abs/2203.15556)

### Era 7 — World Models

22. **Ha, D., & Schmidhuber, J. (2018).** "World Models." *NeurIPS*. [arXiv:1803.10122](https://arxiv.org/abs/1803.10122) *(Foundational framing of the latent dynamics approach)*
23. **LeCun, Y. (2022).** "A Path Towards Autonomous Machine Intelligence." OpenReview. [openreview.net](https://openreview.net/forum?id=BZ5a1r-kVsf) *(Introduced JEPA; argued against autoregressive prediction)*
24. **Hafner, D., Lillicrap, T., Norouzi, M., & Ba, J. (2023).** "Mastering Diverse Domains through World Models (DreamerV3)." [arXiv:2301.04104](https://arxiv.org/abs/2301.04104)
25. **Bruce, J., et al. (Google DeepMind, 2024).** "Genie: Generative Interactive Environments." *ICML '24*. [arXiv:2402.15391](https://arxiv.org/abs/2402.15391)
26. **OpenAI (2024).** "Sora Technical Report." [openai.com/sora](https://openai.com/sora)
27. **Assran, M., et al. (Meta AI, 2025).** "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning." [ai.meta.com/research](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/)
28. **NVIDIA Research (2024–2025).** "Cosmos: World Foundation Model Platform for Physical AI." [research.nvidia.com](https://research.nvidia.com/labs/dir/cosmos/)

---

*Crafted with AI: Research, drafting, review, and refinement assisted by frontier AI models.*
