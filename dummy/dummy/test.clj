(defn make-adder [x]
  "test"
  (fn [y] (+ x y)))

;; Test it
(def add-five (make-adder 115))
(add-five 10) ; Returns 15

(defn count-args [& args]
  (count args))
