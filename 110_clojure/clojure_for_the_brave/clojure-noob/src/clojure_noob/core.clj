(ns clojure-noob.core
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "I'm a little teapot.. yay!")
  (println (+ 3 4 33))
  (comment
    (println ("not executed because it exists inside comment block"))) ;; comment blocks are not executed 
  (do (println "no prompt here!") (+ 1 333 4 7 33))
  (println (str "i " "am " "thinking" " !!!")) ; str concatenates
  (println (if true 1 2))
  (println (if false 1 3))
  (println (if true "a" 1))
  (println (if false "x"))
  (println (if true
             (do (println "success") (println "success statement"))
             (do (println "failure") (println "failure statement"))))
  (println (if false
             (do (println "success") (println "success statement"))
             (do (println "failure") (println "failure statement"))))
  (when true (println "abc") "abc") ; when is a combination of (if true do)
  (when false (println "abc") "abc") ; when has no execution for false
  (println "cleanliness is next to godliness"))

;; (defn train
;;   "run a train well"
;;   []
;;   (println "Choo choo.. choo coo!")) ;; select region and M-x comment-dwim

(comment
  (println ("not executed because it exists inside comment block")))

(+ 3 4 (* 5 3) 2 #_(+ (* 3 4) 54 7) 667) ; form comment (#) explained using a line comment
