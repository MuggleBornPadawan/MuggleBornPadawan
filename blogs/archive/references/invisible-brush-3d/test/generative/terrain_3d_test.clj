(ns generative.terrain-3d-test
  (:require [clojure.test :refer [deftest is testing]]
            [generative.terrain-3d :as t3d]
            [quil.applet :as qa]))

(deftest initial-state-test
  (testing "Initial state initializes simulation parameters"
    (let [s (t3d/initial-state)]
      (is (= 0.0 (:t s)))
      (is (= 0.0 (:cam-angle s)))
      (is (= 50 (:cols s)))
      (is (= 50 (:rows s)))
      (is (= 180.0 (:elevation-scale s))))))

(deftest update-state-test
  (testing "Update state increments flight time and camera orbit angle"
    (let [s0 (t3d/initial-state)
          s1 (t3d/update-state s0)]
      (is (> (:t s1) (:t s0)))
      (is (> (:cam-angle s1) (:cam-angle s0))))))

(deftest height-at-test
  (testing "3D Perlin height stays within normalized elevation bounds"
    (qa/with-applet (processing.core.PApplet.)
      (let [elev-scale 180.0
            octaves 3
            roughness 0.035]
        (doseq [x [0 10 25 49]
                z [0 10 25 49]
                t [0.0 0.5 1.5]]
          (let [h (t3d/height-at x z t octaves roughness elev-scale)]
            (is (number? h))
            (is (<= 0.0 h (* elev-scale 1.5))
                (str "Height " h " at (" x "," z ") t=" t " exceeded expected bounds"))))))))

(deftest surface-normal-test
  (testing "Surface normal vector is normalized to unit length and points upward"
    (qa/with-applet (processing.core.PApplet.)
      (let [elev-scale 180.0
            octaves 3
            roughness 0.035
            cell-size 30.0]
        (doseq [x [5 20 35]
                z [5 20 35]]
          (let [[nx ny nz] (t3d/surface-normal x z 0.1 octaves roughness elev-scale cell-size)
                len (Math/sqrt (+ (* nx nx) (* ny ny) (* nz nz)))]
            (is (< (Math/abs (- len 1.0)) 0.001)
                (str "Normal length " len " is not unit length 1.0"))
            (is (pos? ny)
                (str "Normal Y component " ny " must point upward"))))))))

(deftest elevation-color-test
  (testing "Elevation color maps valleys to moss green and peaks to snow white"
    (let [valley-color (t3d/elevation-color 10.0 180.0)
          ridge-color  (t3d/elevation-color 90.0 180.0)
          peak-color   (t3d/elevation-color 170.0 180.0)]
      ;; All colors must be 3-element vectors of [0..255]
      (doseq [c [valley-color ridge-color peak-color]]
        (is (= 3 (count c)))
        (is (every? #(and (integer? %) (<= 0 % 255)) c)))

      ;; Valleys should have dominant green (G > R)
      (let [[vr vg vb] valley-color]
        (is (> vg vr) "Valley should have dominant green"))

      ;; Peaks should have high brightness in all channels
      (let [[pr pg pb] peak-color]
        (is (> pr 200) "Peak red should exceed 200")
        (is (> pg 200) "Peak green should exceed 200")
        (is (> pb 200) "Peak blue should exceed 200")))))

(deftest camera-position-test
  (testing "Camera position calculates trigonometric eye coordinates accurately"
    (let [[x y z] (t3d/camera-position 500.0 0.0 -200.0)]
      (is (< (Math/abs x) 0.0001))
      (is (= -200.0 y))
      (is (< (Math/abs (- z 500.0)) 0.0001)))))
