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
  (def fib 
  (memoize
    (fn [n]
      (if (<= n 1)
        n
        (+ (fib (- n 1)) (fib (- n 2)))))))
  (defn max-list [lst] (reduce max lst))
  (defn min-list [lst] (reduce min lst))
  (defn average [lst] (/ (reduce + lst) (count lst)))
  (defn square-list [lst] (map #(* % %) lst))
  (defn even-numbers [lst] (filter even? lst))
  (defn reverse-string [s] (apply str (reverse s)))
  (defn palindrome? [s] (= s (reverse-string s)))
  (println "given numbers: " x y)
  (println "addition:" (add x y))
  (println "subtraction:" (subtract x y))
  (println "multiplication:" (multiply x y))
  (println "division:" (divide x y))
  (println "factorial of" y "is" (factorial y))
  (println "fib of" y "is" (fib y))
  (println "max-list is" (max-list [x y]))
  (println "min-list is" (min-list [x y]))
  (println "average is" (average [x y]))
  (println "square of x and y" (square-list [x y]))
  (println "even numbers" (even-numbers [x y]))
  (println "reverse inputs and convert to string" (reverse-string [x y]))
  (println "palindrome check" (palindrome? [x y]))
  (println "eof"))

(elementary 242 2)
