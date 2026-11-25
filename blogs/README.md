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

## Acronym Glossary (linter allowlist)

Terms the linter (`lint_blog.bb` → `common-acronyms`) accepts without first-use expansion:
proper nouns, units, venues, and universally understood technical terms.
When adding a term here, add it in `lint_blog.bb` too (and vice versa).

| Term | Expansion |
|---|---| 
| 2D | Two-Dimensional |
| 3D | Three-Dimensional |
| AARON | Proper noun — Harold Cohen's pioneering generative-art program |
| ACL2 | A Computational Logic for Applicative Common Lisp |
| ACM | Association for Computing Machinery |
| AI | Artificial Intelligence |
| ALU | Arithmetic Logic Unit |
| AMD | Proper noun — Advanced Micro Devices |
| AMS | American Mathematical Society |
| API | Application Programming Interface |
| ARM | Advanced RISC Machine (originally Acorn RISC Machine; officially just "Arm") |
| ASCII | American Standard Code for Information Interchange |
| ASUS | Proper noun — ASUSTeK Computer vendor |
| ASPLOS | Architectural Support for Programming Languages and Operating Systems |
| AWS | Amazon Web Services |
| CC | International Conference on Compiler Construction |
| CD | Continuous Delivery / Deployment (in CI/CD) |
| CGO | Symposium on Code Generation and Optimization |
| CHERI | Capability Hardware Enhanced RISC Instructions — expand on first use, NOT allowlisted |
| CI | Continuous Integration |
| CLI | Command-Line Interface |
| CTO | Chief Technology Officer |
| COG | Proper noun — project/repo name (e.g. COG Second Brain) |
| CPU | Central Processing Unit |
| CSS | Cascading Style Sheets |
| CVPR | Conference on Computer Vision and Pattern Recognition (IEEE/CVF) |
| DARPA | Defense Advanced Research Projects Agency |
| DB | Database |
| DEC | Proper noun — Digital Equipment Corporation |
| DENDRAL | Proper noun — pioneering Stanford expert system (chemical analysis) |
| DDR4 | Double Data Rate 4 (SDRAM, 4th generation) |
| DDR5 | Double Data Rate 5 (SDRAM, 5th generation) |
| DGX | Proper noun — Nvidia DGX AI server line |
| DNA | Deoxyribonucleic Acid |
| DNS | Domain Name System |
| DOM | Document Object Model |
| DOOM | Proper noun — id Software's 1993 game |
| DR | Part of TL;DR (below) |
| EOF | End of File |
| ETHIC | Long-context evaluation benchmark — name, not an acronym |
| ECC | Error Correcting Code (memory) |
| EU | European Union |
| FBI | Federal Bureau of Investigation |
| FFI | Foreign Function Interface |
| FP4 | 4-bit floating point (expanded on first use in hardware guide) |
| FP6 | 6-bit floating point |
| FP8 | 8-bit floating point |
| FPS | Frames Per Second |
| GLSL | OpenGL Shading Language |
| GB10 | Proper noun — Nvidia GB10 Grace Blackwell Superchip codename |
| GB202 | Proper noun — Nvidia Blackwell GPU die codename |
| GB | Gigabyte |
| GC | Garbage Collection / Collector |
| GCC | GNU Compiler Collection |
| GDDR7 | Graphics Double Data Rate 7 |
| GDDR6 | Graphics Double Data Rate 6 |
| GIF | Graphics Interchange Format |
| GNU | GNU's Not Unix |
| GPT | Generative Pre-trained Transformer |
| GPU | Graphics Processing Unit |
| HP | Proper noun — HP Inc. vendor |
| HY | Tencent model-name prefix (HY-World, HY-Pano) — proper noun |
| HBM | High Bandwidth Memory |
| HTML | HyperText Markup Language |
| HTTP | Hypertext Transfer Protocol |
| HTTPS | Hypertext Transfer Protocol Secure |
| ICML | International Conference on Machine Learning |
| ICSE | International Conference on Software Engineering |
| IF | IF-THEN production-rule keyword — not an acronym |
| THEN | IF-THEN production-rule keyword — not an acronym |
| IRE | Institute of Radio Engineers (venue; predecessor of IEEE) |
| IROS | IEEE/RSJ International Conference on Intelligent Robots and Systems (venue) |
| IT | Information Technology |
| IV | Roman numeral 4 ("Part IV" numbering, not an acronym) |
| II | Roman numeral 2 (list numbering, not an acronym) |
| III | Roman numeral 3 (list numbering, not an acronym) |
| ID | Identifier |
| IDE | Integrated Development Environment |
| IEEE | Institute of Electrical and Electronics Engineers |
| IEC | International Electrotechnical Commission |
| INT4 | 4-bit integer precision |
| INT8 | 8-bit integer precision |
| IO | Input / Output |
| IP | Internet Protocol |
| ISO | International Organization for Standardization |
| JDK | Java Development Kit |
| JSON | JavaScript Object Notation |
| JEP | JDK Enhancement Proposal (OpenJDK feature process) |
| JTC1 | Joint Technical Committee 1 (ISO/IEC JTC 1, information technology) |
| JVM | Java Virtual Machine |
| LM | Language Model (in product names LM Studio, MLX-LM) |
| LMS | LMS Journal of Computation and Mathematics (venue) |
| LLM | Large Language Model (LLMs = plural) |
| LLVM | Proper noun — compiler framework (formerly "Low Level Virtual Machine") |
| LMSYS | Large Model Systems Organization (Berkeley SkyLab; Chatbot Arena / LMArena) |
| MB | Megabyte |
| MYCIN | Proper noun — pioneering Stanford expert system (bacterial-infection diagnosis) |
| MSI | Proper noun — Micro-Star International vendor |
| MIT | Massachusetts Institute of Technology |
| MLX | Proper noun — Apple's machine-learning framework for Apple Silicon (officially unexpanded) |
| ML | Machine Learning |
| MTE | Memory Tagging Extension — expand on first use, NOT allowlisted |
| NIM | Proper noun — Nvidia Inference Microservices |
| NAACL | North American Chapter of the Association for Computational Linguistics (venue) |
| NLP | Natural Language Processing |
| NVIDIA | Proper noun — Nvidia Corporation |
| OEM | Original Equipment Manufacturer |
| OS | Operating System |
| PCG | Procedural Content Generation — expand on first use, NOT allowlisted |
| POSIX | Portable Operating System Interface (used allusively for open standards) |
| PDF | Portable Document Format |
| PLDI | Programming Language Design and Implementation |
| PROSPECTOR | Proper noun — pioneering SRI expert system (mineral exploration) |
| PR | Pull Request |
| RAM | Random Access Memory |
| RAG | Retrieval-Augmented Generation — expand on first use, NOT allowlisted |
| REPL | Read-Eval-Print Loop |
| REST | Representational State Transfer |
| RGB | Red, Green, Blue |
| RISC | Reduced Instruction Set Computer |
| ROM | Read-Only Memory |
| RSJ | Robotics Society of Japan (venue) |
| RTX | Proper noun — Nvidia RTX GPU brand |
| RULER | Long-context evaluation benchmark — name, not an acronym ("what's the real context size") |
| SC22 | Subcommittee 22 (ISO/IEC JTC 1/SC 22, programming languages) |
| SDFs | Signed Distance Function/Field (graphics; plural) |
| SDK | Software Development Kit |
| SEIP | Software Engineering in Practice (ICSE track) |
| SEO | Search Engine Optimization |
| SHA | Secure Hash Algorithm |
| SIMD | Single Instruction, Multiple Data |
| SERP | Search Engine Results Page |
| SPIR | Standard Portable Intermediate Representation (Khronos; SPIR-V is the Vulkan-era version) |
| SQL | Structured Query Language |
| SSH | Secure Shell |
| SSL | Secure Sockets Layer |
| SVG | Scalable Vector Graphics |
| TB | Terabyte |
| TDP | Thermal Design Power |
| TDD | Test-Driven Development |
| TPU | Tensor Processing Unit (TPUs = plural) |
| TSMC | Taiwan Semiconductor Manufacturing Company |
| TOPS | Tera Operations Per Second (AI compute metric) |
| TL | Part of TL;DR (below) |
| TL;DR | Too Long; Didn't Read (scanner sees TL + DR separately) |
| TLS | Transport Layer Security |
| TOC | Table of Contents |
| TRT | TensorRT — Nvidia inference library (TRT-LLM) |
| TRACTOR | DARPA program — Translating All C to Rust |
| UI | User Interface |
| USD | United States Dollar |
| UC | University of California (in UC Berkeley) |
| URI | Uniform Resource Identifier |
| UV | Texture-mapping coordinate axes (U/V) — not an acronym |
| URL | Uniform Resource Locator |
| USB | Universal Serial Bus |
| UTF | Unicode Transformation Format |
| UX | User Experience |
| VI | Roman numeral 6 ("Part VI" numbering, not an acronym) |
| VII | Roman numeral 7 ("Part VII" numbering, not an acronym) |
| VM | Virtual Machine |
| VRAM | Video Random-Access Memory |
| WASD | Keyboard movement keys (W/A/S/D) — not an acronym |
| WASM | WebAssembly |
| XML | Extensible Markup Language |
| XTDB | Proper noun — Clojure-native database (formerly Crux) |
| XCON | Proper noun — pioneering DEC expert system (computer configuration) |
| YAML | YAML Ain't Markup Language |
