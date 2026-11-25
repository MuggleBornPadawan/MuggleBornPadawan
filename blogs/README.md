# Blog Repository

Collection of technical blog posts and publishing automation scripts. All published posts are audited and fully compliant with `CHECKLIST.md` (SEO title optimization, proper code block language tags, grounded tags, references sections, and AI footnotes).

## Contents

- **`CHECKLIST.md`**: Blog writing best practices checklist (frontmatter, dev.to conformance, SEO, series revisions, acronyms, URL verification, AI footnote).
- **`lint_blog.bb`**: Babashka linter script enforcing `CHECKLIST.md` rules (`bb lint_blog.bb <file.md> [--strict] [--check-urls]`).
- **`publish_devto.bb`**: Babashka automation script. Runs `lint_blog.bb` pre-flight checks and publishes Markdown blog posts to dev.to using the dev.to API and pass secret manager.
- **[`archive/blog-tdd-complexity-clojure.md`](https://dev.to/ganesh_rajendran_art/complexity-aware-tdd-in-clojure-from-on2-to-on-log-k-56mo)**: "Complexity-Aware TDD in Clojure: From O(n^2) to O(n log k)" — Part 4 of The Economics of Memory Safety series. How pure functions, persistent structures, and REPL turn TDD into a precision tool for complexity-correct pipelines.
- **[`archive/blog-lean-ai-second-brain.md`](https://dev.to/ganesh_rajendran_art/lean-ai-second-brain-babashka-git-local-llms-14gk)**: "Lean AI Second Brain: Babashka, Git & Local LLMs" — Build a zero-leak AI second brain with Markdown, Git, Babashka, and local Ollama. 15ms search, no vector DB bloat.
- **[`archive/blog-clojure-best-suited-today.md`](https://dev.to/ganesh_rajendran_art/the-full-stack-case-for-clojure-ai-concurrency-and-regulatory-reality-4oh4)**: "The Full-Stack Case for Clojure: AI & Concurrency" — Part 3 of The Economics of Memory Safety series. Evidence-based case for Clojure across AI pipelines, concurrency models, REPL-driven development, Babashka scripting, full-stack ClojureScript, and regulatory compliance (CISA, ONCD, EU CRA).
- **[`archive/blog-clojure-memory-safety.md`](https://dev.to/ganesh_rajendran_art/beyond-the-rewrite-trap-high-velocity-memory-safety-with-clojure-and-tiered-systems-2m9b)**: "Beyond the Rewrite Trap: Memory Safety with Clojure" — Part 2 of The Economics of Memory Safety series. Analyzes how pairing Clojure domain orchestration with confined Rust/C++ performance kernels eliminates 100% of memory safety flaws across Project Panama (JDK 22+), GraalVM Native Image, Babashka FFI, and ClojureScript Wasm.
- **[`archive/blog-memory-safety-economics.md`](https://dev.to/ganesh_rajendran_art/the-economics-of-memory-safety-inaction-vs-the-cost-of-rewriting-43in)**: "The Economics of Memory Safety: Cost of Rewriting" — Part 1 of The Economics of Memory Safety series. Systems and architectural analysis for engineering leadership comparing Greenfield Rewrites, Incremental FFI, Hardened Runtimes, and Hardware MTE across TCO, regulatory mandates (CISA/ONCD), and the persistent ~70% CVE metric.
- **[`archive/blog-world-models-why-they-had-to-exist.md`](https://dev.to/ganesh_rajendran_art/why-world-models-had-to-exist-80-years-of-ai-trying-to-understand-reality-42nk)**: "Why World Models Had to Exist: 80 Years of AI" — Part 1 of The World Model Series. Every AI paradigm since 1943 has failed in the same direction — no model of reality. Here's how eight decades of failure led inevitably to World Models.
- **[`archive/blog-world-models-trilemma.md`](https://dev.to/ganesh_rajendran_art/the-world-model-trilemma-pixels-splats-and-symbolic-physics-59ci)**: "The World Model Trilemma: Pixels, Splats, and Symbolic Physics" — Part 2 of The World Model Series. Systems analysis deconstructing Google Genie 4, Runway GWM Worlds 2, World Labs Marble, and Tencent HY-World 2.0 across latent video diffusion, 3D Gaussian splatting, and hybrid MuJoCo physics.
- **[`archive/blog-game-engines-world-models-all-along.md`](https://dev.to/ganesh_rajendran_art/game-engines-were-world-models-all-along-1cm4)**: "Game Engines Were World Models All Along" — Part 3 of The World Model Series. Explores how game developers built the foundational mechanisms of world models (render loop, physics tick, state transitions, action-to-consequence pipeline) decades before modern AI formalized them, analyzing DreamerV3, VPT, Genie, and GameNGen.
- **[`archive/blog-lean-jvm-ai-agents.md`](https://dev.to/ganesh_rajendran_art/proving-what-ai-generates-running-formally-verified-lean-4-inside-clojure-services-3hip)**: "Proving What AI Generates: Lean 4 Inside Clojure" — how the Ansatz Lean/JVM SDK (`org.replikativ/ansatz-lean-jvm`) bridges formal verification and JVM microservices. Covers the LLM reliability wall, agent self-correction via Lean theorems, Clojure REPL invocation, dynamic host callbacks, and forkable execution states.
- **[`archive/blog-carmack-pipeline-doom-to-llms.md`](https://dev.to/ganesh_rajendran_art/the-carmack-pipeline-how-dooms-1993-hacks-predict-modern-llm-architecture-392d)**: "The Carmack Pipeline: How DOOM Hacks Predict LLM Architecture" — systems analysis linking DOOM's 1993 engine techniques (fixed-point math, BSP trees, dirty rectangles, lockstep networking, WAD caching) to modern frontier LLM inference and serving.
- **[`archive/blog-compiler-vs-ai.md`](https://dev.to/ganesh_rajendran_art/the-self-healing-code-thesis-compilers-ai-and-the-next-10-years-of-software-49ml)**: "The Self-Healing Code Thesis: AI and the Next 10 Years" — compilers, AI, and the next 10 years of software. Case study (GCC vs. Copilot on bubble sort), Self-Healing feedback loop with timeline roadmap, 11 academic citations.
- **[`archive/blog-local-coding-harness-hardware-guide.md`](https://dev.to/ganesh_rajendran_art/the-32k-cliff-choosing-the-right-hardware-for-your-local-ai-coding-harness-4hoa)**: "The 32k Cliff: Hardware for Local AI Coding" — hardware guide for local AI coding harnesses. Explores the 32k context cliff and compares Mac Studio M5 Ultra, NVIDIA RTX Pro 6000, and NVIDIA DGX Spark.
- **[`archive/blog-pcg-generative-art-clojure.md`](https://dev.to/ganesh_rajendran_art/the-invisible-brush-generative-art-and-the-algorithms-that-paint-32ig)**: "The Invisible Brush: Generative Art and the Algorithms That Paint" — Part 1 of The Invisible Brush series. A long-form exploration of Procedural Content Generation as a creative engine using Clojure and Quil.
- **[`archive/blog-generative-art-philosophy.md`](https://dev.to/ganesh_rajendran_art/who-made-this-the-author-shift-and-the-philosophy-of-generative-art-o3e)**: "Who Made This? The Philosophy of Generative Art" — Part 2 of The Invisible Brush series. A philosophy-first exploration of generative art examining the upstream author shift, the spectrum of control (chaos vs. rigidity), sixty years of practitioner lineage (Molnár to Hobbs), and tripartite collaborative authorship (artist, algorithm, seed) with Clojure/Quil illustrations.
- **[`archive/blog-generative-art-3d-pipeline.md`](https://dev.to/ganesh_rajendran_art/breaking-the-2d-plane-opengl-shaders-and-the-3d-graphics-pipeline-in-clojure-quil-3663)**: "Breaking the 2D Plane: 3D Graphics in Clojure & Quil" — Part 3 of The Invisible Brush series. Explores the graphics stack deconstruction from JVM/JOGL to silicon, 3D procedural terrain meshes, triangle strip topology, camera projection matrices, and GLSL hardware shaders.

## Usage

### Linting Posts

Enforce `CHECKLIST.md` rules (frontmatter, dev.to conformance, title/description lengths, series TOC consistency, acronym definitions, references, and AI footnotes) using Babashka:

```bash
# Lint a post
bb lint_blog.bb archive/blog-game-engines-world-models-all-along.md

# Lint with strict checking (warnings treated as failures)
bb lint_blog.bb archive/blog-game-engines-world-models-all-along.md --strict

# Verify external URLs are reachable
bb lint_blog.bb archive/blog-game-engines-world-models-all-along.md --check-urls

# View linter options
bb lint_blog.bb --help
```

### Publishing to dev.to

Publish blog posts to dev.to with Babashka (API key retrieved via `pass dev.to`). Pre-flight checks from `lint_blog.bb` run automatically before publishing:

```bash
# Publish immediately (title extracted from first # heading)
bb publish_devto.bb archive/blog-compiler-vs-ai.md

# Publish with custom tags (max 4, comma-separated)
bb publish_devto.bb archive/blog-compiler-vs-ai.md --tags ai,compilers,programming

# Save as draft on dev.to without publishing live
bb publish_devto.bb archive/blog-compiler-vs-ai.md --draft

# Update an existing article by ID (PUT)
bb publish_devto.bb archive/blog-world-models-trilemma.md --id 4993516

# Verify external URLs reachable during pre-flight lint
bb publish_devto.bb archive/blog-compiler-vs-ai.md --check-urls

# View CLI options
bb publish_devto.bb --help
```
