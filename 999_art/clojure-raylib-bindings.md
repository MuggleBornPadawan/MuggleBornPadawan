# Clojure Raylib Bindings: Research and Comparison

Date: 2026-09-24  
Target Environment: Clojure CLI (`deps.edn`), OpenJDK 22+ / 25, Linux x86_64  

---

## Executive Summary

You have four practical methods to use [Raylib](https://www.raylib.com/) in Clojure:

1. **`b12n-oss/raylib-clj` (Recommended for pure Clojure)**:
   - Uses Java 22+ Panama FFM via `coffi`.
   - Bundles Raylib binaries.
   - Includes 113+ examples and built-in live nREPL game reloading.
2. **`maksut/rayclj` (Available on Clojars)**:
   - Uses Java 21+ Panama FFM via `jextract`.
   - Thin wrapper around Raylib 5.0 and RLGL.
   - Published as an artifact on Clojars.
3. **`uk.co.electronstudio.jaylib` (Best Performance / JNI)**:
   - JavaCPP JNI binding for Raylib 6.0.
   - Direct Java interop from Clojure.
   - Fastest runtime execution; bundles native binaries.
4. **`babashka.ffi` (Best for instant scripts)**:
   - Direct `babashka.ffi` calls to system `libraylib.so`.
   - Zero JVM startup delay.

---

## Comparison Matrix

| Project | Binding Method | Raylib Version | Native Binaries | Clojars / Maven | Java Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`b12n-oss/raylib-clj`** | Coffi (Panama FFM) | 6.0 / 5.5 | Bundled | Git dependency | JDK 22+ |
| **`maksut/rayclj`** | Jextract (Panama FFM) | 5.0 | Bundled | Clojars `0.0.60` | JDK 21+ |
| **`jaylib`** | JavaCPP (JNI) | 6.0 | Bundled | Maven Central `6.0.1-0` | JDK 8 - 25+ |
| **`babashka.ffi`** | Libffi (Babashka) | System lib | System install | N/A (bb script) | Babashka runtime |
| **`lsevero/clj-raylib`** | JNA (Historical) | 3.x | Manual / system | Clojars (unmaintained) | JDK 8+ |

---

## Detailed Options

### 1. `b12n-oss/raylib-clj` (Active Panama Coffi Bindings)

- **Source**: [https://github.com/b12n-oss/raylib-clj](https://github.com/b12n-oss/raylib-clj)
- **Origin**: Forked and expanded from [ertugrulcetin/raylib-clojure-playground](https://github.com/ertugrulcetin/raylib-clojure-playground).
- **Mechanism**:
  - Uses `org.suskalo/coffi` ("1.0.615") over JDK 22+ Panama Foreign Function & Memory (FFM) API.
  - Automatically translates Clojure maps to C structs.
  - Defines functions via `coffi.ffi/defcfn`.
  - Bundles prebuilt shared libraries for Linux, macOS, and Windows.
- **Key Features**:
  - 113 playable examples (Asteroids, Tetris, Pong, Vampire Survivors clone).
  - Live REPL integration: Game starts an embedded nREPL server on port 7888.
  - You can connect Emacs / CIDER to the running game and update game state live.
- **`deps.edn` Setup**:
  ```clojure
  {:deps
   {io.github.b12n-oss/raylib-clj
    {:git/url "https://github.com/b12n-oss/raylib-clj"
     :git/sha "5404ec049ff2d036fcf219d309b2b5a09706cfb5"}}

   :aliases
   {:run
    {:jvm-opts ["--enable-native-access=ALL-UNNAMED"
                "-Djava.library.path=libs/linux_amd64"]
     :main-opts ["-m" "examples.asteroids"]}}}
  ```
  *(Note: Do not include `-XstartOnFirstThread` on Linux. That flag is macOS only).*

---

### 2. `maksut/rayclj` (Clojars Library via Jextract)

- **Source**: [https://github.com/maksut/rayclj](https://github.com/maksut/rayclj)
- **Clojars**: `[org.clojars.maksut/rayclj "0.0.60"]`
- **Mechanism**:
  - Generated with JDK `jextract` on Raylib 5.0 and `rlgl.h`.
  - Exposes low-level Java method handles and idiomatic Clojure wrappers.
  - Supports Clojure vectors `[x y]` for `Vector2` and keywords `:white` for colors.
  - Exposes `rlgl` namespaces directly for custom OpenGL operations.
- **Example Usage**:
  ```clojure
  (ns game.core
    (:require [rayclj.raylib.functions :as rl]))

  (defn -main []
    (rl/init-window 800 450 "rayclj demo")
    (rl/set-target-fps 60)
    (while (not (rl/window-should-close?))
      (rl/with-drawing
        (rl/clear-background :raywhite)
        (rl/draw-text "Hello Clojure!" 190 200 20 :lightgray)))
    (rl/close-window))
  ```
- **`deps.edn` Setup**:
  ```clojure
  {:deps
   {org.clojars.maksut/rayclj {:mvn/version "0.0.60"}}
   :aliases
   {:run
    {:jvm-opts ["--enable-preview"
                "--enable-native-access=ALL-UNNAMED"]
     :main-opts ["-m" "game.core"]}}}
  ```

---

### 3. Jaylib via Java Interop (`uk.co.electronstudio.jaylib`)

- **Source**: [https://github.com/electronstudio/jaylib](https://github.com/electronstudio/jaylib)
- **Maven**: `[uk.co.electronstudio.jaylib/jaylib "6.0.1-0"]`
- **Mechanism**:
  - Auto-generated JavaCPP JNI wrapper.
  - Bundles Raylib 6.0, RLGL, Raymath, Physac, and RayGui.
  - Zero FFM / Panama overhead; highest frames-per-second in bunnymarks.
  - Works on any JDK (JDK 8 through JDK 25).
- **Example Usage in Clojure**:
  ```clojure
  (ns game.core
    (:import [com.raylib Raylib Colors]))

  (defn -main []
    (Raylib/InitWindow 800 450 "Jaylib Clojure")
    (Raylib/SetTargetFPS 60)
    (while (not (Raylib/WindowShouldClose))
      (Raylib/BeginDrawing)
      (Raylib/ClearBackground Colors/RAYWHITE)
      (Raylib/DrawText "Jaylib running on JVM!" 190 200 20 Colors/DARKGRAY)
      (Raylib/EndDrawing))
    (Raylib/CloseWindow))
  ```
- **Pros**:
  - Raylib 6.0 support out of the box.
  - RayGui included.
  - Best performance in tight loops.
- **Cons**:
  - Uses camelCase Java interop instead of Clojure kebab-case (unless you wrap it).

---

### 4. `babashka.ffi` (Fast Scripting / Prototypes)

- **Source**: [https://github.com/babashka/ffi/blob/main/examples/pacman.clj](https://github.com/babashka/ffi/blob/main/examples/pacman.clj)
- **Mechanism**:
  - Uses `babashka.ffi/defcfn` to bind directly to installed `libraylib.so`.
  - Runs in Babashka with zero JVM compilation time.
- **Example**:
  ```clojure
  (ns pacman
    (:require [babashka.ffi :as ffi :refer [defcfn]]))

  (ffi/load-system-library "raylib")

  (defcfn init-window "InitWindow" [:int :int :string] :void)
  (defcfn close-window "CloseWindow" [] :void)
  (defcfn window-should-close "WindowShouldClose" [] :uint8)
  (defcfn begin-drawing "BeginDrawing" [] :void)
  (defcfn end-drawing "EndDrawing" [] :void)
  (defcfn clear-background "ClearBackground" [:uint] :void)
  (defcfn set-target-fps "SetTargetFPS" [:int] :void)

  (init-window 640 480 "Babashka Raylib")
  (set-target-fps 60)
  (while (zero? (window-should-close))
    (begin-drawing)
    (clear-background 0xFFFFFFFF)
    (end-drawing))
  (close-window)
  ```

---

## Educational Resources

- **Lisp Game Dev Course**:
  - URL: [https://lisp-gamedev.b12n.app/](https://lisp-gamedev.b12n.app/)
  - Repo: [https://github.com/burinc/b12n-gamedev-course](https://github.com/burinc/b12n-gamedev-course)
  - Teaches game programming in Clojure on top of Raylib Panama FFI.
  - Covers Pong, Breakout, Snake, Space Invaders, Tetris, and Flappy Bird.

- **Multi-Runtime Raylib Comparison**:
  - Repo: [https://github.com/b12n-oss/raylib-pacman](https://github.com/b12n-oss/raylib-pacman)
  - Shows the same Pac-Man game implemented across Babashka, Clojure JVM, Jank (C++ Clojure), and Jolt (Chez Scheme Clojure).

---

## Recommendation

- For **interactive REPL game development in Clojure**:
  - Use **`b12n-oss/raylib-clj`**.
  - Provides idiomatic Clojure code, bundled libraries, and embedded nREPL.
- For **pure maximum performance / RayGui**:
  - Use **Jaylib** (`uk.co.electronstudio.jaylib`).
- For **quick CLI scripts or prototypes without JVM boot delay**:
  - Use **`babashka.ffi`**.
