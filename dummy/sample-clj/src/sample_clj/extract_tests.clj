(ns sample-clj.extract-tests
  "Extracts test inputs / expected outputs from core_test.clj, re-runs the
   tests, and regenerates test-results.txt so it always stays in sync.
   Run with:  lein run -m sample-clj.extract-tests
       or:    clojure -M:report"
  (:require [clojure.test :as t]
            [clojure.string :as str]
            [clojure.java.io :as io])
  (:gen-class))

(def test-file "test/sample_clj/core_test.clj")
(def out-file "test-results.txt")

;; ---------------------------------------------------------------------------
;; Reading forms
;; ---------------------------------------------------------------------------

(defn read-forms
  "Read all top-level forms from a Clojure source file."
  [path]
  (with-open [rdr (java.io.PushbackReader. (io/reader path))]
    (loop [acc []]
      (let [v (read rdr false ::eof false)]
        (if (= v ::eof)
          acc
          (recur (conj acc v)))))))

;; ---------------------------------------------------------------------------
;; Rendering values back to readable text
;; ---------------------------------------------------------------------------

(defn render
  "Render a value read from source into a human-readable cell."
  [v]
  (cond
    (nil? v) "nil"
    (and (seq? v) (= 'quote (first v))) (str "'" (pr-str (second v)))
    :else (pr-str v)))

(defn call->parts
  "For a call like (core/factorial 5), return [\"factorial\" \"5\"]."
  [expr]
  [(-> expr first str (subs 5))                       ; strip "core/" prefix
   (str/join " " (map render (rest expr)))])

(defn call-of?
  "True if expr is a call like (core/something ...)."
  [expr]
  (and (seq? expr)
       (symbol? (first expr))
       (str/starts-with? (str (first expr)) "core/")))

;; ---------------------------------------------------------------------------
;; Classifying individual (is ...) assertions
;; ---------------------------------------------------------------------------

(defn classify-is
  "Classify one (is ...) form -> {:fn .. :args .. :out ..} or nil if unknown."
  [[_ expr & _]]
  (cond
    ;; (thrown? IllegalArgumentException (core/f ...))
    (and (seq? expr) (= 'thrown? (first expr)) (call-of? (nth expr 2 nil)))
    (let [[fn-name args] (call->parts (nth expr 2))]
      {:fn fn-name :args args :out (str "throws " (second expr))})

    ;; (= expected (core/f ...))
    (and (seq? expr) (= '= (first expr)) (call-of? (nth expr 2 nil)))
    (let [[expected call] (rest expr)
          [fn-name args] (call->parts call)]
      {:fn fn-name :args args :out (render expected)})

    ;; (nil? (core/f ...))
    (and (seq? expr) (= 'nil? (first expr)) (call-of? (second expr)))
    (let [[fn-name args] (call->parts (second expr))]
      {:fn fn-name :args args :out "nil"})

    ;; (not (core/f ...))
    (and (seq? expr) (= 'not (first expr)) (call-of? (second expr)))
    (let [[fn-name args] (call->parts (second expr))]
      {:fn fn-name :args args :out "false"})

    ;; bare truthy call: (core/palindrome? "racecar")
    (call-of? expr)
    (let [[fn-name args] (call->parts expr)]
      {:fn fn-name :args args :out "true"})

    :else nil))

(defn collect-is
  "Walk a deftest body, tracking (testing \"...\") context, collecting rows."
  [body ctx]
  (loop [forms body
         ctx ctx
         rows []]
    (if-let [f (first forms)]
      (cond
        (and (seq? f) (= 'testing (first f)))
        (recur (concat (rest (rest f)) (next forms))
               (second f)
               rows)

        (and (seq? f) (= 'is (first f)))
        (recur (next forms) ctx
               (if-let [row (classify-is f)]
                 (conj rows (assoc row :ctx ctx))
                 rows))

        (and (seq? f) (= 'deftest (first f)))     ; nested deftests, just in case
        (recur (next forms) ctx (into rows (collect-is (rest (rest f)) ctx)))

        :else (recur (next forms) ctx rows))
      rows)))

(defn extract-groups
  "Extract input/output rows grouped per function, preserving first-seen order."
  [path]
  (let [rows (->> (read-forms path)
                  (filter #(and (seq? %) (= 'deftest (first %))))
                  (mapcat #(collect-is (rest (rest %)) nil)))
        order (vec (distinct (map :fn rows)))
        groups (group-by :fn rows)]
    {:order order
     :groups (update-vals groups #(mapv (fn [r] (dissoc r :fn)) %))}))

;; ---------------------------------------------------------------------------
;; Running the tests
;; ---------------------------------------------------------------------------

(defn run-test-summary!
  "Run the test suite in-process, return summary map."
  []
  (require 'sample-clj.core-test)
  (select-keys (t/run-tests 'sample-clj.core-test)
               [:test :pass :fail :error]))

;; ---------------------------------------------------------------------------
;; Report generation
;; ---------------------------------------------------------------------------

(defn pad [s w]
  (str s (apply str (repeat (- w (count s)) " "))))

(defn group-table
  "Render one function's table with aligned columns."
  [rows]
  (let [in-w (apply max (count "input") (map #(count (:args %)) rows))
        out-w (apply max (count "expected output")
                     (map #(count (:out %)) rows))]
    (concat
     [(str (pad "input" in-w) " | expected output")
      (str (apply str (repeat in-w "-")) "-+-" (apply str (repeat out-w "-")))]
     (mapcat
      (fn [{:keys [args out ctx]} prev]
        (concat
         (when (and ctx (not= ctx (:ctx prev)))
           [(str "# " ctx)])
         [(str (pad args in-w) " | " out)]))
      rows
      (cons nil (butlast rows))))))

(defn build-report
  [{:keys [test pass fail error]} {:keys [order groups]}]
  (let [assertions (+ pass fail error)
        header (format "Ran %d tests containing %d assertions.\n%d failures, %d errors."
                       test assertions fail error)
        total-fns (count order)
        total-cases (reduce + 0 (map count (vals groups)))
        sections (for [f order
                       :let [rows (get groups f)]]
                   (str/join "\n"
                             (concat [(str "--- " f " "
                                          (apply str (repeat (max 0 (- 76 (count f) 4)) "-")))]
                                     (group-table rows))))]
    (str "================================================================================\n"
         header
         "\n================================================================================\n\n"
         "EXTRACTED TEST INPUTS AND EXPECTED OUTPUTS\n"
         "(auto-generated by sample-clj.extract-tests from " test-file ")\n\n"
         (str/join "\n\n" sections)
         "\n\n================================================================================\n"
         (format "Total: %d functions, %d input/output cases\n" total-fns total-cases)
         "================================================================================\n")))

;; ---------------------------------------------------------------------------
;; Entry point
;; ---------------------------------------------------------------------------

(defn -main
  [& _args]
  (println "Running tests...")
  (let [summary (run-test-summary!)
        extracted (extract-groups test-file)
        report (build-report summary extracted)]
    (spit out-file report)
    (if (zero? (+ (:fail summary) (:error summary)))
      (do (println (str "OK — wrote " out-file))
          (System/exit 0))
      (do (println (str "TESTS FAILED — wrote " out-file " anyway"))
          (System/exit 1)))))
