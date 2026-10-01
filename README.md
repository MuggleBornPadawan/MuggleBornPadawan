# MuggleBornPadawan

Personal monorepo for learning creative coding, lean Clojure work, and visual art tests.

## About

- 👋 Hi, I’m @MuggleBornPadawan
- 👀 I craft visual art using creative coding
- 💞️ I’m looking to collaborate on art related projects
- 📫 How to reach me [mugglebornpadawan].[at].[icloud.com]
- ⚡ Fun fact: I am building my own light saber with special spells

## Tech Stack

- **Primary stack: Lean Clojure (exclusive)**
  - Clojure (JVM) for apps; Babashka (`bb`) for all scripting, automation, and data tasks
- **Runtime & Build**
  - OpenJDK (Temurin) + Clojure CLI (`deps.edn` preferred) + Leiningen
  - Toolchain: `clj-kondo` + `clojure-lsp` + `neil` + `jet` (EDN↔JSON) + `cljfmt`
- **Editor / Workflow**
  - Emacs + CIDER + `clojure-ts-mode` + `eglot` — REPL-driven
  - `clojure.test` — tests before claims; community style guide (`->`/`->>`)
  - Data-oriented, pure functions, minimal deps
- **Visual & Creative Coding**
  - PCG rule: pure `generate` fn + seeded determinism + param maps
  - 2D/3D generative art: Quil (`quil/quil` — `:java2d`/`:p3d`/DXF)
  - Real-time: Raylib via `b12n-oss/raylib-clj` (Panama FFM)
  - Browser 3D: Scittle + Three.js (zero-build, single-file HTML)
  - WebGPU/WGSL + USD share: `art.json` with `xformOpOrder`, local ±1, `perspectiveZO` 0..1
- **Data & Cloud**
  - PostgreSQL + SQLite 

## Atelier (Chittu 13.14)

- Live work: [Mandala viewer](https://mugglebornpadawan.github.io/chittu-1314-mandala/) — source [`MuggleBornPadawan/chittu-1314-mandala`](https://github.com/MuggleBornPadawan/chittu-1314-mandala)

## License

Copyright (C) 2026 MuggleBornPadawan. See `LICENSE.txt` (GPLv3).
EPL deps (Clojure, bb, Quil, Scittle) link via Section 7 exception.
Any third-party study images and code snippets inside this repo belong to their rightful owners. Used for personal study only. Owners may request credit or removal via an issue — action within 14 days.
