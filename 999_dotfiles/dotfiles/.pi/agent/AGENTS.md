# Environment & Preferences

## Machine
- Debian 12 (bookworm), x86_64, kernel 6.6
- CPU: Intel Core i3-1215U (8 threads) — modest machine
- RAM: 6.3 Gi total (~6.1 Gi available per sysinfo 2026-08-31) — avoid memory-heavy tooling; prefer lean approaches
- Disk: 31 GB total, 11 GB free (65% used per sysinfo 2026-08-31) — ask before large downloads or installs
- Java: OpenJDK 25 (64-Bit Server VM)

## Preferred Stack: Clojure
- Languages: Clojure (JVM); babashka for scripting where startup time matters
- Build tools:
  - Clojure CLI (`deps.edn`) preferred for new projects — version 1.12.6 (upstream, not apt)
  - Leiningen (`project.clj`) acceptable when working with existing Lein projects — version 2.12.0 (upstream, not apt)
- Toolchain (upstream via `MuggleBornPadawan/700_linux/remote_startup.sh:install_clojure_stack()`, Temurin-25, no Debian apt to avoid `openjdk-17`):
  - Core: `clojure` CLI + `lein` + `bb` (babashka 1.13.219) + `clj-kondo` + `clojure-lsp`
  - Add-ons: `neil` (add dep to `deps.edn`) + `jet` (EDN<->JSON) + `cljfmt` (formatter, static binary)
  - Install: curl upstream scripts to `/usr/local/bin` (not `apt install clojure`); `default-jre-headless` = `openjdk-17` must be avoided
- Editor/REPL workflow: Emacs with CIDER — structure code and instructions for REPL-driven eval in Emacs
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
