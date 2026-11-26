# Blog Action Items & Roadmap — dev.to/ganesh_rajendran_art

**Updated:** 2025-11-25 (Post-launch audit: 16 published posts, 100% CHECKLIST.md compliance)
**Source:** Audit of dev.to/ganesh_rajendran_art archive & local publishing suite (`lint_blog.bb`, `publish_devto.bb`)

---

## Current Portfolio Status (Measured Nov 2025)

| Metric             | Status      | Notes                                                      |
|--------------------|-------------|------------------------------------------------------------|
| Published Posts    | 16          | Across 3 series + standalone deep dives                    |
| Linter Compliance  | 100%        | Verified via `bb lint_blog.bb` (all rules passing)         |
| SEO Titles         | Optimized   | All titles `<= 65` chars (`keyword phrase — hook` format)  |
| Series TOC & Links | Complete    | Standardized blockquotes & cross-links active              |
| Tooling            | Operational | `lint_blog.bb` & `publish_devto.bb` with URL check support |

---

## Tier 1 — Forum-Specific Promotion & Distribution (Immediate)

- [ ] **Memory Safety & Clojure Series (`r/Clojure`, `r/programming`, Hacker News, Lobsters, ClojureVerse)**
  - *Posts:* Memory Safety Economics (Part 1), Beyond the Rewrite Trap (Part 2), Full-Stack Case for Clojure (Part 3), Complexity-Aware TDD (Part 4).
  - *Angle:* Focus on CISA/ONCD regulatory mandates, tiered FFI/Wasm architectures, and REPL-driven complexity reduction ($O(n^2) \to O(n \log k)$).
- [ ] **World Models & AI Architecture (`r/MachineLearning`, `r/LocalLLaMA`, `r/gamedev`, Hacker News)**
  - *Posts:* 80 Years of AI (Part 1), World Model Trilemma (Part 2), Game Engines Were World Models (Part 3).
  - *Angle:* Highlight historical AI limitations, latent video diffusion vs. 3D Gaussian splatting, and game engine mechanics in modern AI.
- [ ] **Generative Art & Graphics Series (`r/generative`, `r/creativecoding`, `r/GraphicsProgramming`, `r/Clojure`)**
  - *Posts:* Invisible Brush (Part 1), Philosophy of Generative Art (Part 2), Breaking the 2D Plane (Part 3).
  - *Angle:* Emphasize procedural content generation, algorithmic aesthetics, practitioner lineage, and OpenGL/GLSL pipeline deconstruction in Clojure/Quil.
- [ ] **Standalone Deep Dives (`r/LocalLLaMA`, `r/compilers`, Hacker News, Lobsters)**
  - *Posts:* Lean AI Second Brain, Lean 4 Inside Clojure, Carmack Pipeline, Self-Healing Code Thesis, 32k Cliff Hardware Guide.
  - *Angle:* Target zero-leak privacy, formal verification on JVM, DOOM retro-engineering hacks for LLM serving, and local AI harness hardware tradeoffs.
- [ ] **Aggregators & Newsletters**
  - [ ] Submit RSS feed (`https://dev.to/feed/ganesh_rajendran_art`) to Planet Clojure.
  - [ ] Pitch standout technical deep dives to Clojure Weekly.

## Tier 2 — Metrics, Analytics & Interactive Artifacts (Next 2 Weeks)

- [ ] **Traffic Tracking**: Monitor dev.to analytics dashboard for impressions, views, reactions, and search query referrals.
- [ ] **Interactive Demos**: Attach runnable GitHub repositories and live demo GIFs/links to generative art ("The Invisible Brush") and simulation posts.
- [ ] **Backlink Building**: Engage in technical discussions on ClojureVerse, GitHub discussions, and developer forums, linking relevant blog posts as deep references.

## Tier 3 — Infrastructure & Owned Domain Strategy (1–2 Months)

- [ ] **Owned Domain Setup**: Provision `lab.chitrapata.in` (or dedicated subdomain) for primary publication.
- [ ] **Canonical URL Migration**: Update frontmatter `canonical_url` across published dev.to articles to point to the owned domain once live.
- [ ] **Search Console**: Set up Google Search Console and Bing Webmaster Tools on the owned domain to track organic search performance.

## Tier 4 — Future Content Pipeline (Ongoing)

- [ ] **Advanced Clojure Pipelines**: Draft new posts on high-performance transducers, core.async state machines, and zero-allocation JVM concurrency.
- [ ] **Local AI Agent Harnesses**: Explore practical patterns for multi-agent local coding harnesses with Babashka and local LLMs.
- [ ] **WebAssembly & ClojureScript**: Expand generative art and simulation posts with interactive Wasm browser runtimes.
