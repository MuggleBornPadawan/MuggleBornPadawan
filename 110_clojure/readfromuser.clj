(defn echo-uppercase []
  (println "Enter a string:")
  (let [input (read-line)]
    (println (clojure.string/upper-case input))))