(defn fixed-point [f first-guess tolerance]
  (letfn [(close-enough? [v1 v2]
            (< (Math/abs (- v1 v2)) tolerance))
          (try-it [guess]
            (let [next (f guess)]
              (if (close-enough? guess next)
                next
                (recur next))))]
    (try-it first-guess)))

(defn sqrt [x]
  (let [average-damp (fn [y] (/ (+ y (/ x y)) 2))]
    (fixed-point average-damp 1.0 1e-7)))

;; Example usage:
(println (sqrt 9))  ; Output: 3.0
(println (sqrt 16)) ; Output: 4.0
(println (sqrt 2))  ; Output: Approximately 1.4142135
