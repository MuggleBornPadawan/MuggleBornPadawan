# AI Paradigm Progression
## Full History: 1943 → Present

> Research date: 2026-11-23  
> Primary sources: original papers, W3C specs, arXiv, openai.com, openreview.net

---

## Overview

Nine distinct paradigms (with two AI winters as collapse gaps) define the arc of AI. The earlier research note covered only Eras 4, 6-parallel, 8, and 9.

```
Era 1  1943–1956   Early Connectionism & Symbolic Foundations
Era 2  1956–1969   Classical Symbolic AI / GOFAI
       1969–1974   ── First AI Winter ──
Era 3  1974–1987   Expert Systems / Knowledge Engineering
       1987–1993   ── Second AI Winter ──
Era 4  1993–2012   Statistical ML / Kernel Methods
  ↳ parallel track: Semantic Web / Knowledge Graphs (2001–2015)
Era 5  2012–2017   Deep Learning Revolution (CNNs, RNNs, LSTMs)
Era 6  2017–2022   Transformer Models / Pre-trained LLMs
Era 7  2022–now    World Models (frontier)
```

---

## Era 1: Early Connectionism & Symbolic Foundations (1943–1956)

### Key figures & primary works

| Year | Work                                                             | Authors                                  | Significance                                                                                                                            |
|------|------------------------------------------------------------------|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| 1943 | *"A Logical Calculus of the Ideas Immanent in Nervous Activity"* | McCulloch & Pitts                        | First mathematical neuron model; binary threshold units; proved they can compute any logical function. Weights hardcoded — no learning. |
| 1950 | *"Computing Machinery and Intelligence"*                         | Alan Turing, *Mind* journal              | Proposes the Turing Test; frames machine intelligence as a question of *behavior*, not mechanism.                                       |
| 1956 | **Dartmouth Workshop**                                           | McCarthy, Minsky, Shannon, Newell, Simon | Coined the term "Artificial Intelligence"; launched the field as a formal discipline.                                                   |

### What it established
- Proof that neural networks can compute (McCulloch-Pitts)
- Framing of intelligence as symbol manipulation (Newell/Simon) OR as statistical pattern-matching (connectionist camp)
- This **symbolic vs. connectionist split** echoes through every subsequent era

---

## Era 2: Classical Symbolic AI / GOFAI (1956–1969)

*"Good Old-Fashioned AI"* — the dominant paradigm for 13 years.

### Core thesis
**Physical Symbol System Hypothesis** (Newell & Simon, 1976 — retroactively framing this era): intelligence is the manipulation of formal symbols via rules. Any sufficient physical symbol system can exhibit general intelligence.

### Key systems

| System                           | Year | Authors             | Mechanism                                                                                                                           |
|----------------------------------|------|---------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Logic Theorist**               | 1956 | Newell, Simon, Shaw | Proved 38/52 theorems from *Principia Mathematica* using heuristic search; first true AI program. Introduced *means-ends analysis*. |
| **General Problem Solver (GPS)** | 1957 | Newell, Simon       | Domain-independent problem solver via means-ends analysis — reduce gap between current state and goal state.                        |
| **Lisp**                         | 1958 | John McCarthy, MIT  | First language for symbolic computation; remained the dominant AI language for 30 years.                                            |
| **SAINT**                        | 1961 | Slagle              | Symbolic integration of calculus expressions                                                                                        |
| **SHRDLU**                       | 1970 | Winograd            | Natural language understanding in a blocks-world microworld                                                                         |

### Failure modes
1. **Combinatorial explosion:** GPS's means-ends analysis works in toy domains; real-world state spaces are astronomically large
2. **Common-sense gap:** Systems had no background world knowledge; failed on anything outside their narrow microworld
3. **Frame problem:** No efficient way to track which facts change and which stay constant when an action is taken (McCarthy & Hayes, 1969)

> **Trigger of First AI Winter:** The 1966 ALPAC report (Automatic Language Processing Advisory Committee) found machine translation far below expectations and recommended cutting NLP funding. Then in 1969, Minsky & Papert's *Perceptrons* book mathematically proved single-layer perceptrons cannot solve XOR — killing neural network funding for a decade.

---

## First AI Winter (1969–1974)

- DARPA sharply cuts AI funding after ALPAC report and unmet promises
- Lighthill Report (UK, 1973): Sir James Lighthill's review for the British Science Research Council concludes that AI has failed to deliver on any of its promises → UK AI funding largely eliminated
- Neural network research enters ~15-year dormancy after Minsky & Papert critique

---

## Era 3: Expert Systems / Knowledge Engineering (1974–1987)

The pivot: instead of *general* reasoning, encode *domain-specific* expert knowledge.

### Core thesis
**"Knowledge is Power"** (Feigenbaum, Buchanan & Lederberg, 1971 — the DENDRAL paper). General search algorithms fail; specialist domain knowledge beats general reasoning.

### Key systems

| System         | Year    | Institution           | Domain                                                               |
|----------------|---------|-----------------------|----------------------------------------------------------------------|
| **DENDRAL**    | 1965–74 | Stanford              | Molecular structure from mass spectra; Plan-Generate-Test paradigm   |
| **MYCIN**      | 1972–76 | Stanford (Shortliffe) | Bacterial infection diagnosis; ~600 IF-THEN rules; Certainty Factors |
| **XCON (R1)**  | 1980    | CMU / DEC             | Computer configuration; saved DEC ~$40M/year                         |
| **PROSPECTOR** | 1978    | SRI                   | Mineral deposit prediction                                           |

### Architecture
- **Knowledge base:** explicit IF-THEN production rules
- **Inference engine:** backward-chaining (MYCIN) or forward-chaining (XCON)
- **Uncertainty:** MYCIN's *Certainty Factors* (CF ∈ [−1, +1]) — not formal probability
- **MYCIN innovation (Davis, Buchanan & Shortliffe, 1977):** Complete separation of domain knowledge from inference engine — KB is modular, engine is reusable (→ EMYCIN shell)

### Failure modes (→ Second AI Winter)
1. **Knowledge acquisition bottleneck:** Tacit expert knowledge can't be fully articulated; "knowledge engineers" are expensive; scaling is impossible
2. **Brittleness:** Any input outside the rule base causes catastrophic failure, not graceful degradation
3. **Maintenance trap:** Tightly coupled rule webs — changing one rule silently breaks others
4. **Hardware dependency:** Commercial systems ran on specialized Lisp machines, made obsolete ~1987 by commodity workstations (Sun, Apple)

---

## Second AI Winter (1987–1993)

- Lisp machine market collapses (~$500M → near-zero) as cheap Unix workstations arrive
- DARPA's Strategic Computing Initiative wound down
- Japan's Fifth Generation Computer Project fails to deliver
- Investment dries up; "expert system" becomes a discredited term

---

## Era 4: Statistical ML / Kernel Methods (1993–2012)

The paradigm shift: from hand-coded rules to **learning from data** using probability and optimization theory.

### Core thesis
Intelligence can be framed as a **statistical inference problem** — learn a function from labeled examples by minimizing a loss over a hypothesis class with provable generalization bounds (VC theory).

### Key developments

| Year | Development                 | Authors                     | Significance                                                                                                                          |
|------|-----------------------------|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| 1986 | Backpropagation popularized | Rumelhart, Hinton, Williams | Enables training multi-layer neural nets (but compute was too limited to scale)                                                       |
| 1989 | LeNet (CNNs for digits)     | LeCun et al., Bell Labs     | First successful deep net application; handwritten digit recognition                                                                  |
| 1995 | **Support Vector Machines** | Vapnik & Cortes, AT&T       | Maximum-margin hyperplane classifier; kernel trick maps to infinite-dim space without computing it; dominates benchmarks for 15 years |
| 1997 | **LSTM**                    | Hochreiter & Schmidhuber    | Solves vanishing gradient in RNNs; enables long-range sequence memory                                                                 |
| 1997 | AdaBoost                    | Freund & Schapire           | First practical boosting algorithm; ensemble weak learners → strong learner                                                           |
| 2001 | **Random Forests**          | Leo Breiman                 | Bagging + feature randomization; robust, interpretable; still dominant on tabular data                                                |
| 2003 | **Bayesian Networks**       | Pearl (formalized earlier)  | Probabilistic graphical models; conditional independence; principled uncertainty                                                      |
| 2006 | Deep Belief Networks        | Hinton et al.               | Layer-wise unsupervised pretraining — first hint that deep networks *can* train                                                       |

### Parallel track: Semantic Web / Knowledge Graphs (2001–2015)

| Year  | Event                                                                                                          | Source      |
|-------|----------------------------------------------------------------------------------------------------------------|-------------|
| 2001  | Berners-Lee, Hendler & Lassila, **"The Semantic Web"**, *Scientific American*                                  | W3C         |
| 2000s | W3C standardizes RDF (triples: subject–predicate–object), OWL (formal ontology logic), SPARQL (query language) | W3C specs   |
| 2012  | Google launches **Knowledge Graph** — mainstream adoption at scale                                             | Google blog |

**What it solved vs. expert systems:** Interoperability via URIs; formal semantics (OWL grounded in Description Logics); separation of ontology, instances, and inference.  
**Why it stalled:** OWL reasoning is EXPTIME-complete; adoption friction from XML syntax; still no learning from data.  
**Legacy:** Knowledge graphs survive as LLM grounding layers (2024–present).

### What this era solved
- **Mathematical rigor:** loss functions, generalization bounds, bias-variance tradeoff
- **Convex optimization:** SVMs have unique global minima — no messy local optima
- Kept ML credible and industrial through the neural net drought

### What it couldn't do
- Representation learning: features still hand-engineered by domain experts
- Scale to raw pixels/audio/text without feature engineering
- Generalize across modalities

---

## Era 5: Deep Learning Revolution (2012–2017)

The reconnection of connectionism with modern compute and big data.

### The catalyst: AlexNet (2012)

**Krizhevsky, A., Sutskever, I., & Hinton, G. (2012). "ImageNet Classification with Deep Convolutional Neural Networks." NeurIPS.** [[neurips.cc](https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)]

- ImageNet LSVRC 2012 top-5 error: **15.3%** vs runner-up **26.2%** — an 11-point gap that shocked the field
- Key ingredients: deep CNN, ReLU activations, dropout regularization, **GPU training** (2× GTX 580)
- Ended the hand-crafted feature engineering era overnight

### Why it worked *now* (not 1990)

| Factor       | Status in 1990                 | Status in 2012                                         |
|--------------|--------------------------------|--------------------------------------------------------|
| Labeled data | Thousands of examples          | ImageNet: 1.2M images, 1000 classes (Fei-Fei Li, 2009) |
| Compute      | CPUs; months per training run  | NVIDIA GPU; matrix ops 100× faster                     |
| Algorithms   | Vanishing gradient unsolved    | ReLU + better initialization + dropout                 |
| Backprop     | Known but impractical at depth | Practical with GPU acceleration                        |

### Key advances 2012–2017

| Year | Work                                  | Contribution                                                                              |
|------|---------------------------------------|-------------------------------------------------------------------------------------------|
| 2013 | **Word2Vec** (Mikolov et al., Google) | Word embeddings; distributed representations of meaning                                   |
| 2014 | GAN (Goodfellow et al.)               | Adversarial generative models; first credible image synthesis                             |
| 2014 | Seq2Seq + attention (Bahdanau et al.) | Encoder-decoder for translation; precursor to transformers                                |
| 2015 | ResNet (He et al., Microsoft)         | Skip connections → trains 152-layer networks; solved vanishing gradients at extreme depth |
| 2016 | AlphaGo (DeepMind)                    | Combines deep RL + MCTS; defeats world Go champion — previously thought decades away      |

### What it solved
- End-to-end learning: raw pixels/audio → task output with no feature engineering
- Representation learning: hierarchical features emerge from data
- Transfer learning: pretrain on large dataset, fine-tune on small one

### Failure modes
- Requires millions of labeled examples (data-hungry)
- Black-box: no interpretability
- Still task-specific: each model trained for one narrow application
- Recurrent models (LSTMs) struggle with very long sequences

---

## Era 6: Transformer Models / Pre-trained LLMs (2017–2022)

### Foundational paper
**Vaswani, A. et al. (2017). "Attention Is All You Need." NeurIPS.** [[arXiv:1706.03762](https://arxiv.org/abs/1706.03762)]

> *"We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."*

WMT 2014 EN→DE BLEU: **28.4** (beat prior SOTA ensembles by >2 BLEU). Trained in 3.5 days on 8 GPUs.

### Key architectural components
- **Multi-head self-attention:** all tokens attend to all others in parallel; captures long-range dependencies
- **Positional encodings:** inject sequence order since attention is position-agnostic
- **Feed-forward sublayers:** per-position dense transforms after attention
- **Encoder-decoder or decoder-only:** BERT (encoder, masked LM), GPT (decoder, autoregressive)

### Scaling laws & evolution

| Paper                                      | Year | Key finding                                                                                                                                           |
|--------------------------------------------|------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| BERT (Devlin et al., Google)               | 2018 | Bidirectional pre-training dominates NLU benchmarks                                                                                                   |
| GPT-2 (Radford et al., OpenAI)             | 2019 | Zero-shot task transfer; autoregressive generation                                                                                                    |
| **Scaling Laws** (Kaplan et al., OpenAI)   | 2020 | Loss scales as power law over N (params), D (data), C (compute). Architecture shape secondary. [[arXiv:2001.08361](https://arxiv.org/abs/2001.08361)] |
| GPT-3 (Brown et al.)                       | 2020 | 175B params; few-shot learning without fine-tuning                                                                                                    |
| **Chinchilla** (Hoffmann et al., DeepMind) | 2022 | Optimal: data tokens ≈ 20× params; prior models undertrained on data [[arXiv:2203.15556](https://arxiv.org/abs/2203.15556)]                           |
| GPT-4                                      | 2023 | Multimodal; instruction-following at expert human level on many benchmarks                                                                            |

### Emergent capabilities
At sufficient scale: multi-step arithmetic, code generation, chain-of-thought reasoning, translation appear as **phase transitions** (not gradual improvements). Schaeffer et al. (2023) argue some emergence is metric-induced, not truly discontinuous — debate ongoing.

### What it solved vs. deep learning era
- No manual feature engineering
- One pretrained model transfers zero-shot or few-shot to novel tasks
- Handles natural language ambiguity natively
- Scales predictably with compute

### Failure modes
1. Hallucination: no grounded world model; generates plausible falsehoods
2. No causal / physical reasoning: predicts next token; can't simulate consequences
3. Stateless: no persistent internal state; can't plan beyond context window
4. Brittleness to distribution shift

---

## Era 7: World Models (2022–frontier)

AI systems that learn an **internal predictive model of the environment** to simulate future states and plan causally.

### Two research lineages

#### 7a. Model-Based RL / Dreamer
**Hafner, D. et al. (2023). "Mastering Diverse Domains through World Models (DreamerV3)." [[arXiv:2301.04104](https://arxiv.org/abs/2301.04104)]**
- Latent dynamics model (RSSM) learned from raw pixels
- Agent trains entirely in imagination (no real environment rollouts)
- Fixed hyperparameters across **150+ diverse tasks**; first agent to collect Minecraft diamonds from scratch

#### 7b. JEPA / LeCun's framework
**LeCun, Y. (2022). "A Path Towards Autonomous Machine Intelligence." [[openreview.net](https://openreview.net/forum?id=BZ5a1r-kVsf)]**
- Attacks autoregressive token prediction as architecturally insufficient for AGI
- **JEPA:** predicts abstract *representations* not raw tokens; avoids generative hallucination
- Gradient-based planning through differentiable world model

#### 7c. Generative video world models

| System              | Year     | Lab             | Key claim                                                                                                                |
|---------------------|----------|-----------------|--------------------------------------------------------------------------------------------------------------------------|
| **Sora**            | Feb 2024 | OpenAI          | "Simulator of the physical world"; emergent 3D consistency. Limitations: stateless, long-clip physics violations.        |
| **Genie**           | 2024     | Google DeepMind | Learns latent actions from unlabeled game footage; interactive control                                                   |
| **Genie 2/3**       | 2024–25  | Google DeepMind | 3D environments; 720p @ 24fps; robotics + autonomous driving integration                                                 |
| **NVIDIA Cosmos**   | 2024–25  | NVIDIA          | Physical AI foundation model; trained on tens of millions of hours driving/robotics footage                              |
| **V-JEPA 2** (Meta) | 2025     | Meta AI         | Object permanence, robotics tasks via abstract latent prediction; faster, fewer physics violations than pixel generators |

### Open problems (as of 2026)
- Long-horizon physics violations (momentum, object permanence)
- Stateless architectures lack persistent internal state
- Sim-to-real gap: internet video insufficient for high-precision physics
- Compositionality: no model yet demonstrates robust generalization to truly novel configurations

---

## Full Cross-Paradigm Table

| Era         | Paradigm              | Knowledge source                     | Representation                | Reasoning                           | Key failure                                    |
|-------------|-----------------------|--------------------------------------|-------------------------------|-------------------------------------|------------------------------------------------|
| 1           | Early Connectionism   | Hardcoded weights                    | Binary threshold neurons      | Fixed logic                         | Cannot learn                                   |
| 2           | Classical Symbolic AI | Hand-coded rules & logic             | Symbol strings, search trees  | Deductive / heuristic search        | Combinatorial explosion; common-sense gap      |
| AI Winter 1 | —                     | —                                    | —                             | —                                   | Overpromised; underfunded                      |
| 3           | Expert Systems        | Manual rules from experts            | IF-THEN production rules      | Backward/forward chaining           | Knowledge acquisition bottleneck; brittleness  |
| AI Winter 2 | —                     | —                                    | —                             | —                                   | Lisp machines obsolete; industry disillusioned |
| 4a          | Statistical ML        | Labeled examples                     | Feature vectors; kernel maps  | Optimization (convex)               | Features still hand-engineered                 |
| 4b          | Semantic Web          | Curated ontologies                   | RDF triples, OWL classes      | Description Logic inference         | Doesn't scale; no learning                     |
| 5           | Deep Learning         | Raw data (self-supervised + labeled) | Hierarchical learned features | Gradient descent end-to-end         | Task-specific; needs millions of labels        |
| 6           | Transformer / LLMs    | Massive text corpora                 | Dense weight tensors          | Next-token probability              | Hallucination; no causal model                 |
| 7           | World Models          | Observation + interaction            | Latent dynamics               | Gradient-based imagination planning | Physics violations; sim-to-real                |

---

## The Persistent Through-Line

Each era partially addresses the prior's failure but inherits a structural problem:

```
Early Connectionism → can't learn         → need learning
Symbolic AI        → combinatorial wall   → need domain knowledge
Expert Systems     → brittle, no learning → need statistical flexibility
Statistical ML     → no representations  → need end-to-end learning
Deep Learning      → task-specific       → need transfer at scale
Transformers       → no causal model     → need world simulation
World Models       → physics grounding   → ??? (open)
```

**Unsolved across all eras:** combining symbolic precision + relational structure + statistical fluency + causal grounding into one unified, sample-efficient architecture.

---

## Primary Sources

1. McCulloch, W. & Pitts, W. (1943). *A Logical Calculus of the Ideas Immanent in Nervous Activity.* Bulletin of Mathematical Biophysics.
2. Turing, A.M. (1950). *Computing Machinery and Intelligence.* Mind, 59(236).
3. Newell, A. & Simon, H.A. (1956). *The Logic Theory Machine.* IRE Transactions on Information Theory.
4. Minsky, M. & Papert, S. (1969). *Perceptrons.* MIT Press.
5. Feigenbaum, E.A., Buchanan, B.G., Lederberg, J. (1971). *On Generality and Problem Solving: A Case Study Using the DENDRAL Program.*
6. Davis, R., Buchanan, B., Shortliffe, E. (1977). *Production Rules as a Representation for a Knowledge-Based Consultation Program.* Artificial Intelligence journal.
7. Rumelhart, D.E., Hinton, G.E., Williams, R.J. (1986). *Learning Representations by Back-propagating Errors.* Nature, 323.
8. LeCun, Y. et al. (1989). *Backpropagation Applied to Handwritten Zip Code Recognition.* Neural Computation.
9. Vapnik, V. & Cortes, C. (1995). *Support-Vector Networks.* Machine Learning, 20(3).
10. Hochreiter, S. & Schmidhuber, J. (1997). *Long Short-Term Memory.* Neural Computation, 9(8).
11. Berners-Lee, T., Hendler, J., Lassila, O. (2001). *The Semantic Web.* Scientific American.
12. Krizhevsky, A., Sutskever, I., Hinton, G.E. (2012). *ImageNet Classification with Deep Convolutional Neural Networks.* NeurIPS.
13. Vaswani, A. et al. (2017). *Attention Is All You Need.* NeurIPS. arXiv:1706.03762
14. Kaplan, J. et al. (2020). *Scaling Laws for Neural Language Models.* arXiv:2001.08361
15. Hoffmann, J. et al. (2022). *Training Compute-Optimal Large Language Models.* arXiv:2203.15556
16. LeCun, Y. (2022). *A Path Towards Autonomous Machine Intelligence.* OpenReview.
17. Hafner, D. et al. (2023). *Mastering Diverse Domains through World Models.* arXiv:2301.04104
18. OpenAI (2024). *Sora Technical Report.* openai.com/sora
