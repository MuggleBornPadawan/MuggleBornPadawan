(ns generative.terrain-test
  (:require [clojure.test :refer [deftest is testing]]
            [generative.terrain :as t]
            [quil.applet :as qa]
            [quil.core :as q]))

(deftest initial-state-test
  (testing "Initial state initializes time parameter t to 0.0"
    (let [state (t/initial-state)]
      (is (= 0.0 (:t state))))))

(deftest update-state-test
  (testing "Update state increments time t by 0.005"
    (let [s0 (t/initial-state)
          s1 (t/update-state s0)
          s2 (t/update-state s1)]
      (is (< (Math/abs (- 0.005 (:t s1))) 0.0001))
      (is (< (Math/abs (- 0.010 (:t s2))) 0.0001)))))

(deftest terrain-height-test
  (testing "Terrain height remains within expected bounds of the canvas"
    ;; qa/with-applet allows running quil functions without an active display
    (qa/with-applet (processing.core.PApplet.)
      (let [canvas-h 400]
        (doseq [x [0 50 100 200 400 799]
                time-val [0.0 0.5 1.0 2.5]]
          (let [h (t/terrain-height x time-val canvas-h)]
            ;; Terrain occupies lower 40-90% of canvas, so y-coordinate should be in [0, canvas-h]
            (is (<= 0 h canvas-h)
                (str "Height " h " at x=" x " t=" time-val " is out of bounds [0, " canvas-h "]"))))))))

(deftest fractal-noise-test
  (testing "Fractal noise returns composite octave values"
    (qa/with-applet (processing.core.PApplet.)
      (let [fn-1 (t/fractal-noise 100 0.1 1)
            fn-4 (t/fractal-noise 100 0.1 4)]
        (is (pos? fn-1))
        (is (pos? fn-4))
        (is (not= fn-1 fn-4))))))
