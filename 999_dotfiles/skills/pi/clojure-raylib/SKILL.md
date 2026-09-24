---
name: clojure-raylib
description: "Build 2D/3D games, visual simulations, and graphics with Raylib in Clojure. Use when creating Raylib games, configuring Clojure Raylib deps.edn, debugging Raylib window crashes, or setting up interactive REPL game loops."
---

# Clojure Raylib Skill

Use this skill to build desktop games, visual simulations, and creative graphics in Clojure with [Raylib](https://www.raylib.com/).

---

## 1. Golden Rules (Read Before Running Code)

Follow these rules to prevent JVM crashes and deadlocks:

* **Linux vs macOS JVM Flags**:
  * **On Linux**: NEVER use `-XstartOnFirstThread`. The JVM will crash immediately.
  * **On macOS**: ALWAYS use `-XstartOnFirstThread`. OpenGL needs thread 0 on macOS.
  * **On all platforms**: ALWAYS pass `--enable-native-access=ALL-UNNAMED` for Panama FFM.
* **CLI Command**:
  * Use `clojure`, NOT `clj`.
  * `clj` runs `rlwrap`. `rlwrap` breaks GUI window event loops.
* **REPL Strategy**:
  * Raylib blocks the main thread with its game loop.
  * Start an embedded nREPL server on port 7888 *before* opening the window.
  * Connect your editor (Emacs CIDER / VS Code Calva) to `localhost:7888`.

---

## 2. Recommended Stack: `b12n-oss/raylib-clj`

This is the standard binding for idiomatic Clojure. It uses JDK 22+ Foreign Function & Memory (FFM) API via `coffi` and bundles Raylib binaries.

### `deps.edn` Template

```clojure
{:paths ["src"]
 :deps
 {org.clojure/clojure {:mvn/version "1.12.0"}
  nrepl/nrepl {:mvn/version "1.3.0"}
  io.github.b12n-oss/raylib-clj
  {:git/url "https://github.com/b12n-oss/raylib-clj"
   :git/sha "5404ec049ff2d036fcf219d309b2b5a09706cfb5"}}

 :aliases
 {:run
  {:jvm-opts ["--enable-native-access=ALL-UNNAMED"
              ;; Linux library search path:
              "-Djava.library.path=libs/linux_amd64:/usr/local/lib:/usr/lib"]
   :main-opts ["-m" "game.core"]}}}
```

---

## 3. Minimal Live-Reload Game Template

Create `src/game/core.clj`:

```clojure
(ns game.core
  (:require [raylib.core.window :as window]
            [raylib.core.drawing :as drawing]
            [raylib.core.timing :as timing]
            [raylib.shapes.basic :as shapes]
            [raylib.text.drawing :as text]
            [raylib.colors :as colors]
            [nrepl.server :as nrepl])
  (:gen-class))

;; Game state atom for REPL updates
(defonce state (atom {:x 400 :y 225 :radius 30}))

(defn draw-frame [s]
  (drawing/clear-background! colors/raywhite)
  (text/draw-text! "Live REPL Game - Edit state or functions!" 20 20 20 colors/darkgray)
  (shapes/draw-circle! (:x s) (:y s) (:radius s) colors/maroon))

(defn -main [& _args]
  ;; 1. Start embedded nREPL on port 7888
  (nrepl/start-server :port 7888 :bind "127.0.0.1")
  (println "nREPL server running on port 7888. Connect CIDER or Calva now.")

  ;; 2. Initialize Raylib window
  (window/init-window! 800 450 "Clojure Raylib Window")
  (timing/set-target-fps! 60)

  ;; 3. Main Loop
  (while (not (window/window-should-close?))
    (drawing/begin-drawing!)
    (draw-frame @state)
    (drawing/end-drawing!))

  ;; 4. Clean exit
  (window/close-window!)
  (System/exit 0))
```

Run the game with:
```bash
clojure -M:run
```

---

## 4. Live REPL Workflow (Emacs / CIDER / Calva)

1. Launch the game from terminal:
   ```bash
   clojure -M:run
   ```
2. Connect your editor to the running game:
   * **Emacs**: `M-x cider-connect-clj` -> Host: `localhost`, Port: `7888`.
   * **VS Code**: `Calva: Connect to a Running REPL Server in the Project`.
3. Modify the running game live from the REPL:
   ```clojure
   ;; Move the circle immediately:
   (swap! game.core/state assoc :x 200 :y 100)

   ;; Redefine rendering on the fly:
   (in-ns 'game.core)
   (defn draw-frame [s]
     (drawing/clear-background! colors/black)
     (shapes/draw-circle! (:x s) (:y s) (:radius s) colors/gold))
   ```
   *Notice the window updates on the next frame without restarting.*

---

## 5. Alternative Options

### Option B: Maximum Performance / RayGui (`Jaylib`)

If you hit FPS bottlenecks with 10,000+ objects or need `RayGui`:
* Dependency: `uk.co.electronstudio.jaylib/jaylib {:mvn/version "6.0.1-0"}`
* Uses JavaCPP JNI (4x faster in tight inner loops).
* Call directly with Java interop:
  ```clojure
  (import '[com.raylib Raylib Colors])
  (Raylib/InitWindow 800 450 "Jaylib")
  (Raylib/SetTargetFPS 60)
  ```

### Option C: Instant Babashka Script (`babashka.ffi`)

Use when startup time must be under 50ms:
* Requires system `libraylib.so`: `sudo apt install libraylib-dev` (or build from source).
* Call via `babashka.ffi`:
  ```clojure
  (require '[babashka.ffi :as ffi :refer [defcfn]])
  (ffi/load-system-library "raylib")
  (defcfn init-window "InitWindow" [:int :int :string] :void)
  ```

---

## 6. Troubleshooting Checklist

| Symptom | Cause | Fix |
| :--- | :--- | :--- |
| `Unrecognized option: -XstartOnFirstThread` | Running macOS flag on Linux | Remove `-XstartOnFirstThread` from `deps.edn` JVM opts. |
| `java.lang.IllegalCallerException: native access` | Missing Panama permission | Add `--enable-native-access=ALL-UNNAMED` to `:jvm-opts`. |
| Window freezes or keyboard input fails | Used `clj` with `rlwrap` | Run with `clojure -M:run`, not `clj`. |
| REPL hangs when evaluating window code | Tried to open window from standalone REPL | Start game process first; connect editor to embedded nREPL port 7888. |
| `UnsatisfiedLinkError: no raylib in java.library.path` | Dynamic library path missing | Add `-Djava.library.path=libs/linux_amd64` or install system `libraylib.so`. |
