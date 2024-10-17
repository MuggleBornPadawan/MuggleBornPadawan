(defn elementary [x y]
  (println "Hello, World!")
  (defn add [a b] (+ a b))
  (defn subtract [a b] (- a b))
  (defn multiply [a b] (* a b))
  (defn divide [a b] (/ a b))
  (defn factorial [n]
  (if (<= n 1)
    1
    (* n (factorial (dec n)))))
  (add 45 6)
  (println "given numbers: " x y)
  (println "addition:" (add x y))
  (println "subtraction:" (subtract x y))
  (println "multiplication:" (multiply x y))
  (println "division:" (divide x y))
  (println "factorial of" y "is" (factorial y)))

(elementary 32 7)
