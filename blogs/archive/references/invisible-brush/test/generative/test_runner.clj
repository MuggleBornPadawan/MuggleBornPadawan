(ns generative.test-runner
  (:require [clojure.test :as t]
            [generative.terrain-test]))

(defn -main [& _args]
  (let [{:keys [fail error]} (t/run-tests 'generative.terrain-test)]
    (if (pos? (+ fail error))
      (System/exit 1)
      (System/exit 0))))
