## License
Copyright (C) 2025 MuggleBornPadawan
- This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
- This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

## About
- 👋 Hi, I’m @MuggleBornPadawan
- 👀 I craft visual art using creative coding
- 💞️ I’m looking to collaborate on art related projects
- 📫 How to reach me [mugglebornpadawan].[at].[icloud.com]
- 😄 Pronouns: he/him
- ⚡ Fun fact: I am building my own light saber with special spells

## Tech Stack

- **Primary stack: Lean Clojure (exclusive)**
  - Clojure (JVM) for apps; Babashka (`bb` 1.13.223) for all scripting, automation, and data tasks
  - No Python / Node.js / Ruby — Babashka only for scripts (~15 ms start, ~30 MB RAM)
- **Runtime & Build**
  - OpenJDK 25 (Temurin-25) + Clojure CLI 1.12.6 (`deps.edn` preferred) + Leiningen 2.12.0
  - Toolchain: `clj-kondo` + `clojure-lsp` + `neil` + `jet` (EDN↔JSON) + `cljfmt`
- **Editor / Workflow**
  - Emacs 30.1 + CIDER + `clojure-ts-mode` + `eglot` — REPL-driven (`C-j` eval)
  - `clojure.test` — tests before claims; community style guide (`->`/`->>`)
  - Data-oriented, pure functions, minimal deps
- **Visual & Creative Coding**
  - PCG rule: pure `generate` fn + seeded determinism + param maps
  - 2D/3D generative art: Quil (`quil/quil` — `:java2d`/`:p3d`/DXF)
  - Real-time: Raylib via `b12n-oss/raylib-clj` (Panama FFM on JDK 25)
  - Browser 3D: Scittle + Three.js (zero-build, single-file HTML)
  - WebGPU/WGSL + USD share: `art.json` with `xformOpOrder`, local ±1, `perspectiveZO` 0..1
- **Data & Cloud**
  - PostgreSQL (prod) + SQLite (local/prototype)
  - Google Cloud SDK 585 (`gcloud`/`gsutil`/`bq`)
- **Architecture:** event driven | microservices based

## Repository Map
- `110_clojure/` — Clojure projects (`deps.edn` / `project.clj`)
- `999_art/` — PCG art (Quil / Raylib / WebGPU specs)
- `700_linux/` — lean box setup + `bckp/dotfiles.sh`
- `999_dotfiles/` — backed-up dotfiles (manifest-driven)
- `000_refcards/` — refcards & notes
- `100_cpp/`, `200_java/`, `300_python/`, etc. — historical explorations

## About the repository
![hello world](https://github.com/MuggleBornPadawan/MuggleBornPadawan/blob/main/x-hello-world.jpeg "hello world")
