---
name: raylib
description: "Build real-time art with Raylib Panama FFM. Use when particles, SDF shaders, or 60 FPS meshes needed."
---

# Clojure Raylib Skill: Procedural Visual Art & Real-Time PCG
## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill raylib
```
- Close on completion: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Build real-time PCG with [Raylib](https://www.raylib.com/). Mode: `Standalone` GL `z -1..1` vs `USD-shared` local `±1` + `xformOpOrder` via `pcg`+`pcg-spaces`.

## 1. Golden Rules
- Linux: NEVER `-XstartOnFirstThread` (crash). macOS: ALWAYS. All: `--enable-native-access=ALL-UNNAMED`.
- CLI: `clojure -M:run` not `clj` (rlwrap breaks events).
- State: single `atom {:seed 42 :frequency 0.05}` + `swap!` for REPL tuning.
- Keep draw loop light (60 FPS); generate via pure fns outside.
- Embedded nREPL on 7888 before window — connect CIDER/Calva.

## 2. Recommended Stack `b12n-oss/raylib-clj`
```clojure
{:paths ["src"]
 :deps {org.clojure/clojure {:mvn/version "1.12.0"} nrepl/nrepl {:mvn/version "1.3.0"}
        io.github.b12n-oss/raylib-clj {:git/url "https://github.com/b12n-oss/raylib-clj" :git/sha "5404ec049ff2d036fcf219d309b2b5a09706cfb5"}}
 :aliases {:run {:jvm-opts ["--enable-native-access=ALL-UNNAMED" "-Djava.library.path=libs/linux_amd64:/usr/local/lib:/usr/lib"] :main-opts ["-m" "art.core"]}}}
```

## 3. Template A: Live Particle System — see `references/templates.md` §3
800 particles, noise field, REPL atom — full code in reference. Run via `-main`, tune via `swap! pcg-params`.

## 4. Templates B-C + Troubleshooting — see `references/templates.md`
B=SDF shader raymarch, C=heightmap mesh, perf, troubleshooting table — full in reference.

## 5. USD — see `references/templates.md` §5

## References
- Full templates: `references/templates.md`
