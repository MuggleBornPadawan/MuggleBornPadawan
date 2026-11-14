(ns generative.terrain
  (:require [quil.core :as q]
            [quil.middleware :as m]))

;; --- State ---

(defn initial-state []
  {:t 0.0})    ; time offset — drives animation

;; --- Update ---

(defn update-state [state]
  (update state :t + 0.005))   ; advance time slowly each frame

;; --- Terrain Computation ---

(defn terrain-height
  "Returns a y-coordinate for column x at time t.
   Perlin noise gives a smooth, organic value in [0, 1].
   We scale it to fill the lower portion of the canvas."
  [x t canvas-height]
  (let [noise-val (q/noise (* x 0.008) t)   ; x-scale controls terrain frequency
        base      (* canvas-height 0.4)      ; terrain fills bottom 40–90% of canvas
        amplitude (* canvas-height 0.5)]
    (- canvas-height (+ base (* noise-val amplitude)))))

(defn fractal-noise
  "Layer noise at different frequencies (octaves).
   High frequency for fine rocky details, low frequency for broad hills."
  [x t octaves]
  (reduce (fn [acc [freq amp]]
            (+ acc (* amp (q/noise (* x freq) (* t freq)))))
          0
          (map (fn [i]
                 [(* 0.008 (Math/pow 2 i))
                  (/ 1.0 (Math/pow 2 i))])
               (range octaves))))

;; --- Drawing Functions ---

(defn draw-sky [canvas-height]
  ;; Gradient sky: deep indigo at top fading to dark slate
  (doseq [y (range canvas-height)]
    (let [t (/ (float y) (float canvas-height))
          r (q/lerp 15 30 t)
          g (q/lerp 10 20 t)
          b (q/lerp 40 60 t)]
      (q/stroke r g b)
      (q/line 0 y (q/width) y))))

(defn draw-terrain [t canvas-width canvas-height]
  ;; Draw each vertical column of terrain as a filled rectangle
  (q/no-stroke)
  (doseq [x (range canvas-width)]
    (let [h (terrain-height x t canvas-height)
          ;; Colour shifts slightly with height: darker valleys, lighter peaks
          brightness (q/map-range h
                                  0 canvas-height
                                  200 80)]
      (q/fill 60 brightness 80)
      (q/rect x h 1 (- canvas-height h)))))

(defn draw-state [state]
  (let [w (q/width)
        h (q/height)
        t (:t state)]
    (draw-sky h)
    (draw-terrain t w h)))

;; --- Sketch Entry Point ---

(defn setup []
  (q/frame-rate 60)
  (q/color-mode :rgb 255)
  (initial-state))

(defn run-sketch
  "Starts the Quil sketch. If snapshot-file is given, renders one frame, saves it, and exits."
  [& {:keys [snapshot-file]}]
  (if snapshot-file
    (q/sketch
      :title    "Perlin Terrain (Snapshot)"
      :size     [800 400]
      :setup    setup
      :update   update-state
      :draw     (fn [state]
                  (draw-state state)
                  (q/save snapshot-file)
                  (println (str "Saved snapshot to " snapshot-file))
                  (q/exit)
                  (future
                    (Thread/sleep 200)
                    (System/exit 0)))
      :middleware [m/fun-mode])
    (q/sketch
      :title      "Perlin Terrain"
      :size       [800 400]
      :setup      setup
      :update     update-state
      :draw       draw-state
      :middleware [m/fun-mode])))

;; Evaluate defsketch when running in a graphical environment or REPL
(when (seq (System/getenv "DISPLAY"))
  (q/defsketch terrain
    :title      "Perlin Terrain"
    :size       [800 400]
    :setup      setup
    :update     update-state
    :draw       draw-state
    :middleware [m/fun-mode]))

(defn -main
  "CLI entry point. Supports:
   - clojure -M -m generative.terrain
   - clojure -M -m generative.terrain --snapshot output.png"
  [& args]
  (let [snapshot-idx (.indexOf (vec args) "--snapshot")
        snapshot-file (when (and (not= -1 snapshot-idx)
                                 (< (inc snapshot-idx) (count args)))
                        (nth args (inc snapshot-idx)))]
    (cond
      snapshot-file
      (do
        (println "Generating snapshot frame to" snapshot-file "...")
        (run-sketch :snapshot-file snapshot-file))

      (seq (System/getenv "DISPLAY"))
      (do
        (println "Perlin Terrain running on DISPLAY" (System/getenv "DISPLAY"))
        (println "Close the window to exit."))

      :else
      (println "Warning: DISPLAY environment variable is not set. To render GUI, set DISPLAY=:0 or pass --snapshot <file.png>."))))
