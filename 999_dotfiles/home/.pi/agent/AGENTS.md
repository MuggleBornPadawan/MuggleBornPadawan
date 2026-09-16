# Environment & Preferences

## Machine
- Debian 12 (bookworm), x86_64, kernel 6.6
- CPU: Intel i3-1215U (host 2P+4E = 8 threads, Golden Cove + Gracemont) — guest 8 vCPUs via KVM — L1d 144K / L1i 224K / L2 2M / L3 10M, line 64B, no `perf` — modest machine
- RAM: 6.3 Gi total (~5.3 Gi available per sysinfo 2026-09-15) — avoid memory-heavy tooling; prefer lean approaches
- Disk: 31 GB total, 10 GB free (67% used per sysinfo 2026-09-15, after cleanup) — ask before large downloads or installs
- Java: OpenJDK 25 (Temurin-25 at /usr/lib/jvm/temurin-25-jdk-amd64, 64-Bit Server VM)
- Cloud: Google Cloud SDK 585.0.0 at /usr/lib/google-cloud-sdk (`gcloud` at /usr/bin/gcloud, includes `gsutil`/`bq`/`alpha`/`beta`) — auth configured

## Preferred Stack: Clojure
- Languages: Clojure (JVM); babashka for scripting where startup time matters
- Build tools:
  - Clojure CLI (`deps.edn`) preferred for new projects — version 1.12.6 (upstream, not apt)
  - Leiningen (`project.clj`) acceptable when working with existing Lein projects — version 2.12.0 (upstream, not apt)
- Toolchain (upstream via `MuggleBornPadawan/700_linux/remote_startup.sh:install_clojure_stack()`, Temurin-25, no Debian apt to avoid `openjdk-17`):
  - Core: `clojure` CLI + `lein` + `bb` (babashka 1.13.223 at `~/.local/bin/bb`, dynamic build with `babashka.ffi` + tasks `:exec-fn` compose) + `clj-kondo` + `clojure-lsp` (rest at `/usr/local/bin`)
  - Add-ons: `neil` (add dep to `deps.edn`) + `jet` (EDN<->JSON) + `cljfmt` (formatter, static binary)
  - Install: curl upstream scripts to `/usr/local/bin` (not `apt install clojure`); `default-jre-headless` = `openjdk-17` must be avoided
  - No global `~/.clojure/deps.edn` or `~/.lein/profiles.clj` — per-project only
- Editor/REPL workflow: Emacs 30.1 (`/usr/bin/emacs`, config `~/.emacs.d/init.el` + `customizations/setup-clojure.el`) with CIDER + `clojure-ts-mode` + `eglot` (`clojure-lsp` for Clojure) — structure code and instructions for REPL-driven eval in Emacs; see `setup-clojure.el` for keys (`C-j` eval, `C-c C-v`/`C-M-r`/`C-c u`); `lsp-mode` installed but not used for Clojure
- Visual/creative coding: Processing stack, via Quil (https://quil.info/) — use the quil library for Clojure sketches
- REPL-driven development: prefer evaluating code in a running REPL over one-off scripts
- Testing: `clojure.test`; run tests before claiming anything works
- Databases:
  - PostgreSQL for server/production persistence
  - SQLite for local/embedded/small projects and prototypes
- Web/frontend/HTTP libraries: no fixed preference yet
- Dependencies: keep them minimal; prefer small well-maintained libraries
- Code style: community style guide (idiomatic `->`/`->>` threading, namespaces clean of unused requires)

## Working Style
- Don't add dependencies without asking first
- Prefer simple, data-oriented solutions

## Assistant Behavior
- You are a large language model living in Pi coding agent and a helpful assistant.
- Respond concisely.
- Always use ASD-STE100 Simplified Technical English.
- Always talk to me like I have ADHD: short sentences, bullet points, clear structure, no long walls of text.
