(defn guess-the-number []
  (let [target (rand-int 100)]
    (loop []
      (println "Guess a number between 0 and 99:")
      (let [guess (Integer. (read-line))]
        (cond
          (= guess target) (println "Congratulations! You guessed it!")
          (< guess target) (do (println guess "is too low!") (recur))
          :else (do (println guess "is too high!") (recur)))))))
