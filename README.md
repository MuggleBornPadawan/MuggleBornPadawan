# MuggleBornPadawan

Personal monorepo for creative coding, lean Clojure work, and visual art tests.

## About

- 👋 Hi, I’m @MuggleBornPadawan
- 👀 I craft visual art using creative coding
- 💞️ I’m looking to collaborate on art related projects
- 📫 How to reach me [mugglebornpadawan].[at].[icloud.com]
- 😄 Pronouns: he/him
- ⚡ Fun fact: I am building my own light saber with special spells

## Tech Stack

- **Primary stack: Lean Clojure (exclusive)**
  - Clojure (JVM) for apps; Babashka (`bb`) for all scripting, automation, and data tasks
  - No Python / Node.js / Ruby — Babashka only for scripts
- **Runtime & Build**
  - OpenJDK (Temurin) + Clojure CLI (`deps.edn` preferred) + Leiningen
  - Toolchain: `clj-kondo` + `clojure-lsp` + `neil` + `jet` (EDN↔JSON) + `cljfmt`
  - See `700_linux/` for pinned versions
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
  - PostgreSQL (prod) + SQLite (local/prototype)
  - Google Cloud SDK (`gcloud`/`gsutil`/`bq`)

## Repository Map

- `000_refcards/` — refcards & notes
- `100_cpp/` — historical explorations
- `100_nasm/` — historical explorations
- `110_clojure/` — Clojure projects (`deps.edn` / `project.clj`)
- `120_elisp/` — historical explorations
- `130_mit_scheme/` — historical explorations
- `140_clisp/` — historical explorations
- `150_racket_scheme/` — historical explorations
- `200_java/` — historical explorations
- `300_python/` — historical explorations
- `400_r/` — historical explorations
- `610_sqlite/` — local DB tests
- `700_linux/` — lean box setup + `bckp/dotfiles.sh` (pinned versions live here)
- `850_api/` — API tests
- `900_awsec2/` — cloud tests
- `990_webgpu/` — WebGPU tests
- `999_art/` — PCG art (Quil / Raylib / WebGPU specs)
- `999_dotfiles/` — backed-up dotfiles (manifest-driven)
- `999_skills/` — skill notes

## License

Copyright (C) 2026 MuggleBornPadawan. See `LICENSE.txt` (GPLv3).
EPL deps (Clojure, bb, Quil, Scittle) link via Section 7 exception.
