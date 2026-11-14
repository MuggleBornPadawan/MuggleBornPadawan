# Blog Repository

Collection of technical blog posts and publishing automation scripts.

## Contents

- **`publish_devto.bb`**: Babashka automation script. Publishes Markdown blog posts to dev.to using the dev.to API and pass secret manager.
- **[`archive/blog-clojure-best-suited-today.md`](https://dev.to/ganesh_rajendran_art/the-full-stack-case-for-clojure-ai-concurrency-and-regulatory-reality-4oh4)**: "The Full-Stack Case for Clojure: AI, Concurrency, and Regulatory Reality" — Part 3 of The Economics of Memory Safety series. Evidence-based case for Clojure across AI pipelines, concurrency models, REPL-driven development, Babashka scripting, full-stack ClojureScript, and regulatory compliance (CISA, ONCD, EU CRA).
- **[`archive/blog-clojure-memory-safety.md`](https://dev.to/ganesh_rajendran_art/beyond-the-rewrite-trap-high-velocity-memory-safety-with-clojure-and-tiered-systems-2m9b)**: "Beyond the Rewrite Trap: High-Velocity Memory Safety with Clojure and Tiered Systems" — Part 2 of The Economics of Memory Safety series. Analyzes how pairing Clojure domain orchestration with confined Rust/C++ performance kernels eliminates 100% of memory safety flaws across Project Panama (JDK 22+), GraalVM Native Image, Babashka FFI, and ClojureScript Wasm.
- **[`archive/blog-memory-safety-economics.md`](https://dev.to/ganesh_rajendran_art/the-economics-of-memory-safety-inaction-vs-the-cost-of-rewriting-43in)**: "The Economics of Memory Safety: Inaction vs. The Cost of Rewriting" — Part 1 of The Economics of Memory Safety series. Systems and architectural analysis for engineering leadership comparing Greenfield Rewrites, Incremental FFI, Hardened Runtimes, and Hardware MTE across TCO, regulatory mandates (CISA/ONCD), and the persistent ~70% CVE metric.
- **[`archive/blog-world-models-trilemma.md`](https://dev.to/ganesh_rajendran_art/the-world-model-trilemma-pixels-splats-and-symbolic-physics-59ci)**: "The World Model Trilemma: Pixels, Splats, and Symbolic Physics" — systems analysis deconstructing Google Genie 4, Runway GWM Worlds 2, World Labs Marble, and Tencent HY-World 2.0 across latent video diffusion, 3D Gaussian splatting, and hybrid MuJoCo physics.
- **[`archive/blog-lean-jvm-ai-agents.md`](https://dev.to/ganesh_rajendran_art/proving-what-ai-generates-running-formally-verified-lean-4-inside-clojure-services-3hip)**: "Proving What AI Generates: Running Formally Verified Lean 4 Inside Clojure Services" — how the Ansatz Lean/JVM SDK (`org.replikativ/ansatz-lean-jvm`) bridges formal verification and JVM microservices. Covers the LLM reliability wall, agent self-correction via Lean theorems, Clojure REPL invocation, dynamic host callbacks, and forkable execution states.
- **[`archive/blog-carmack-pipeline-doom-to-llms.md`](https://dev.to/ganesh_rajendran_art/the-carmack-pipeline-how-dooms-1993-hacks-predict-modern-llm-architecture-392d)**: "The Carmack Pipeline: How DOOM's 1993 Hacks Predict Modern LLM Architecture" — systems analysis linking DOOM's 1993 engine techniques (fixed-point math, BSP trees, dirty rectangles, lockstep networking, WAD caching) to modern frontier LLM inference and serving.
- **[`archive/blog-compiler-vs-ai.md`](https://dev.to/ganesh_rajendran_art/the-self-healing-code-thesis-compilers-ai-and-the-next-10-years-of-software-49ml)**: "The Self-Healing Code Thesis" — compilers, AI, and the next 10 years of software. Case study (GCC vs. Copilot on bubble sort), Self-Healing feedback loop with timeline roadmap, 11 academic citations.
- **[`archive/blog-local-coding-harness-hardware-guide.md`](https://dev.to/ganesh_rajendran_art/the-32k-cliff-choosing-the-right-hardware-for-your-local-ai-coding-harness-4hoa)**: "The 32k Cliff" — hardware guide for local AI coding harnesses. Explores the 32k context cliff and compares Mac Studio M5 Ultra, NVIDIA RTX Pro 6000, and NVIDIA DGX Spark.
- **`archive/blog-doom-fixed-point-trig.md`**: "John Carmack's Fixed-Point Trigonometry in DOOM (1993)" — architectural breakdown of Binary Angular Measurement (BAM), 16.16 lookup tables, and branchless angle wrapping without floating-point hardware. *(unpublished)*

## Usage

Publish blog posts to dev.to with Babashka (API key retrieved via `pass dev.to`):

```bash
# Publish immediately (title extracted from first # heading)
bb publish_devto.bb archive/blog-compiler-vs-ai.md

# Publish with custom tags (max 4, comma-separated)
bb publish_devto.bb archive/blog-compiler-vs-ai.md --tags ai,compilers,programming

# Save as draft on dev.to without publishing live
bb publish_devto.bb archive/blog-compiler-vs-ai.md --draft

# Update an existing article by ID (PUT)
bb publish_devto.bb archive/blog-world-models-trilemma.md --id 4993516

# View CLI options
bb publish_devto.bb --help
```
