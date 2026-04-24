(def x 10)
(println x)
(def x 201)   ; rebinds, doesn't mutate
(println x)  ; No x++ or x = x + 1 mindset
(let [x 12225
      y (+ x 13)]  ; y is derived, not reassigned
  y)
(+ 3 4)
(println "Hello, World!")
(println x)
(def v1 [1 2 3])
(def v2 (conj v1 4))  ; v1 unchanged; v2 shares structure with v1
(println v1)
(println v2)
(defn classify [n]
  (str "Number is: "
       (cond
         (< n 0) "negative"
         (= n 0) "zero"
         :else   "positive")))  ; cond IS the value
(classify 1)
(classify 0)
; (classify -1)






; Cc Ck
