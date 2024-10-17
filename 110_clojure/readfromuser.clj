(defn echo-uppercase []
  (println "Enter a string:")
  (let [input (read-line)]
    (println "given string" input)
    (println "output string" (clojure.string/upper-case input))))
