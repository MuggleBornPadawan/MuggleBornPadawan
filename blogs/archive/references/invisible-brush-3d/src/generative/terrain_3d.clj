(ns generative.terrain-3d
  (:require [quil.applet :as qa]
            [quil.core :as q]
            [quil.middleware :as m]))

;; --- State & Configuration ---

(defn initial-state []
  {:t               0.0       ; time offset driving forward flight / terrain motion
   :cam-angle       0.0       ; camera orbit angle (radians)
   :cam-distance    850.0     ; distance of camera from terrain center
   :cam-height      -380.0    ; camera elevation (negative Y is up in Processing 3D)
   :fly-speed       0.012     ; forward flight velocity
   :cols            50        ; mesh grid columns (X-axis)
   :rows            50        ; mesh grid rows (Z-axis)
   :cell-size       30.0      ; world units between vertices
   :elevation-scale 180.0     ; max elevation height
   :octaves         3         ; octave layers of Perlin noise
   :roughness       0.035     ; spatial frequency multiplier
   :wireframe?      false     ; render as wireframe vs solid polygons
   :use-shader?     true      ; whether custom GLSL atmospheric shader is active
   :shader          nil})     ; cached PShader reference

;; --- Pure State Updates ---

(defn update-state [state]
  (-> state
      (update :t + (:fly-speed state))
      (update :cam-angle + 0.003)))

;; --- Pure Mathematical Computations ---

(defn height-at
  "Calculates terrain elevation at grid coordinate (x, z) at time t.
   Uses multi-frequency octave Perlin noise to combine broad rolling contours
   with high-frequency surface roughness."
  [x z t octaves roughness elevation-scale]
  (let [octave-sum (reduce
                    (fn [acc i]
                      (let [freq (* roughness (Math/pow 2.0 i))
                            amp  (/ 1.0 (Math/pow 2.0 i))]
                        (+ acc (* amp (q/noise (* (float x) freq)
                                               (+ (* (float z) freq) t))))))
                    0.0
                    (range octaves))
        ;; Normalization factor for sum of 1/2^i
        norm (/ 1.0 (- 2.0 (/ 1.0 (Math/pow 2.0 (dec octaves)))))]
    (* octave-sum norm elevation-scale)))

(defn surface-normal
  "Calculates the unit surface normal vector [nx ny nz] at grid (x, z)
   using finite-difference height gradients along X and Z."
  [x z t octaves roughness elevation-scale cell-size]
  (let [hl (height-at (dec x) z t octaves roughness elevation-scale)
        hr (height-at (inc x) z t octaves roughness elevation-scale)
        hu (height-at x (dec z) t octaves roughness elevation-scale)
        hd (height-at x (inc z) t octaves roughness elevation-scale)
        dx (- hr hl)
        dz (- hd hu)
        dy (* 2.0 cell-size)
        ;; Vector (-dx, dy, -dz) pointing upward
        nx (- dx)
        ny dy
        nz (- dz)
        len (Math/sqrt (+ (* nx nx) (* ny ny) (* nz nz)))]
    (if (zero? len)
      [0.0 1.0 0.0]
      [(/ nx len) (/ ny len) (/ nz len)])))

(defn elevation-color
  "Maps a height value [0 .. elevation-scale] into an RGB tuple:
   - Valleys: deep moss green [40, 70, 55]
   - Foothills: warm slate [90, 100, 110]
   - Ridges: granite grey [145, 140, 145]
   - High peaks: alpine snow [230, 235, 245]"
  [h elevation-scale]
  (let [ratio (min 1.0 (max 0.0 (/ h elevation-scale)))]
    (cond
      (< ratio 0.35)
      (let [k (/ ratio 0.35)]
        [(int (q/lerp 35 75 k))
         (int (q/lerp 65 95 k))
         (int (q/lerp 50 80 k))])

      (< ratio 0.70)
      (let [k (/ (- ratio 0.35) 0.35)]
        [(int (q/lerp 75 140 k))
         (int (q/lerp 95 135 k))
         (int (q/lerp 80 140 k))])

      :else
      (let [k (/ (- ratio 0.70) 0.30)]
        [(int (q/lerp 140 235 k))
         (int (q/lerp 135 240 k))
         (int (q/lerp 140 250 k))]))))

(defn camera-position
  "Calculates camera eye coordinates [eye-x eye-y eye-z] from distance, angle, and elevation."
  [cam-distance cam-angle cam-height]
  [(* cam-distance (Math/sin cam-angle))
   cam-height
   (* cam-distance (Math/cos cam-angle))])

;; --- Drawing Functions (Quil P3D Pipeline) ---

(defn setup-scene-camera [state]
  (let [{:keys [cam-distance cam-angle cam-height]} state
        [eye-x eye-y eye-z] (camera-position cam-distance cam-angle cam-height)]
    ;; Eye position, center target [0, 0, 0], up vector [0, 1, 0]
    (q/camera eye-x eye-y eye-z
              0.0 40.0 0.0
              0.0 1.0 0.0)
    (q/perspective (/ Math/PI 3.0)
                   (/ (float (q/width)) (float (q/height)))
                   10.0
                   3000.0)))

(defn set-normal
  "Sets the normal vector on the active PApplet context for lighting calculations."
  [nx ny nz]
  (when-let [applet (qa/current-applet)]
    (.normal ^processing.core.PApplet applet (float nx) (float ny) (float nz))))

(defn setup-lighting []
  ;; Ambient baseline light
  (q/ambient-light 45 48 58)
  ;; Directional warm sunlight from upper right
  (q/directional-light 225 210 185 0.5 1.0 -0.4))

(defn draw-terrain-mesh [state]
  (let [{:keys [t cols rows cell-size elevation-scale octaves roughness wireframe?]} state
        half-w (* 0.5 (* (dec cols) cell-size))
        half-d (* 0.5 (* (dec rows) cell-size))]
    (if wireframe?
      (do (q/no-fill)
          (q/stroke 120 180 220 160))
      (do (q/no-stroke)
          (q/stroke-weight 1)))

    ;; Draw terrain as a series of connected triangle strips along Z
    (doseq [z (range (dec rows))]
      (q/begin-shape :triangle-strip)
      (doseq [x (range cols)]
        (let [world-x  (- (* x cell-size) half-w)
              world-z1 (- (* z cell-size) half-d)
              world-z2 (- (* (inc z) cell-size) half-d)
              h1       (height-at x z t octaves roughness elevation-scale)
              h2       (height-at x (inc z) t octaves roughness elevation-scale)
              c1       (elevation-color h1 elevation-scale)
              c2       (elevation-color h2 elevation-scale)
              [nx1 ny1 nz1] (surface-normal x z t octaves roughness elevation-scale cell-size)
              [nx2 ny2 nz2] (surface-normal x (inc z) t octaves roughness elevation-scale cell-size)]

          ;; First vertex (row z)
          (when-not wireframe? (apply q/fill c1))
          (set-normal nx1 (- ny1) nz1)
          (q/vertex world-x (- h1) world-z1)

          ;; Second vertex (row z + 1)
          (when-not wireframe? (apply q/fill c2))
          (set-normal nx2 (- ny2) nz2)
          (q/vertex world-x (- h2) world-z2)))
      (q/end-shape))))

(defn draw-state [state]
  (q/background 22 26 38)
  (setup-scene-camera state)

  ;; Bind custom GLSL shader if loaded and active
  (let [sh (:shader state)]
    (if (and sh (:use-shader? state))
      (do
        (q/shader sh)
        (.set ^processing.opengl.PShader sh "u_time" (float (:t state)))
        (.set ^processing.opengl.PShader sh "fog_color" (float 0.086) (float 0.102) (float 0.149))
        (.set ^processing.opengl.PShader sh "fog_near" (float 500.0))
        (.set ^processing.opengl.PShader sh "fog_far" (float 1600.0)))
      (setup-lighting))

    (draw-terrain-mesh state)

    (when (and sh (:use-shader? state))
      (q/reset-shader))))

;; --- Sketch Setup & Lifecycle ---

(defn setup []
  (q/frame-rate 60)
  (q/color-mode :rgb 255)
  (let [init (initial-state)
        sh (try
             (q/load-shader "shaders/terrain.frag" "shaders/terrain.vert")
             (catch Exception e
               (println "GLSL Shader info (using OpenGL fixed-function lighting):" (.getMessage e))
               nil))]
    (assoc init :shader sh)))

(defn run-sketch
  "Launches Quil sketch with :renderer :p3d.
   If snapshot-file is provided, renders one frame to disk and exits."
  [& {:keys [snapshot-file wireframe?]}]
  (let [sketch-opts
        {:title       "3D Procedural Terrain — Quil P3D"
         :size        [1024 768]
         :renderer    :p3d
         :setup       (fn []
                        (let [s (setup)]
                          (if wireframe? (assoc s :wireframe? true) s)))
         :update      update-state
         :draw        (if snapshot-file
                        (fn [state]
                          (draw-state state)
                          (q/save snapshot-file)
                          (println (str "Rendered 3D frame saved to " snapshot-file))
                          (q/exit)
                          (future (Thread/sleep 250) (System/exit 0)))
                        draw-state)
         :middleware  [m/fun-mode]}]
    (apply q/sketch (apply concat (vec sketch-opts)))))

(defn -main
  "CLI entry point.
   Options:
     clojure -M:run
     clojure -M:run --snapshot output_3d.png
     clojure -M:run --wireframe"
  [& args]
  (let [arg-vec      (vec args)
        snap-idx     (.indexOf arg-vec "--snapshot")
        wireframe?   (not= -1 (.indexOf arg-vec "--wireframe"))
        snap-file    (when (and (not= -1 snap-idx)
                                (< (inc snap-idx) (count arg-vec)))
                       (nth arg-vec (inc snap-idx)))]
    (cond
      snap-file
      (do
        (println "Generating 3D snapshot frame to" snap-file "...")
        (run-sketch :snapshot-file snap-file :wireframe? wireframe?))

      (seq (System/getenv "DISPLAY"))
      (do
        (println "Launching 3D Terrain on DISPLAY" (System/getenv "DISPLAY") "...")
        (run-sketch :wireframe? wireframe?))

      :else
      (println "Warning: DISPLAY environment variable is not set. To render GUI, set DISPLAY=:0 or pass --snapshot <file.png>."))))
