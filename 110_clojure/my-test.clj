;; A simple example Clojure file.
;; To test, create a file named `my-test.clj` and put this inside:
(ns my-test.core
  (:require [clojure.string :as str]))
(defn greet
  "A function to greet a person."
  [name]
  (str "Hello, " (str/capitalize name) "!"))
(comment
  (greet "world")
  ;; Now, try editing the file. You should see:
  ;; - Smart, structural syntax highlighting thanks to Tree-sitter.
  ;; - Autocompletion and function documentation from LSP.
  ;; - On-the-fly error checking if you type something wrong.
)

(defn -main [& args]
  (println (greet "world")))
 
