(ns sample-clj.core
  (:require [clojure.string :as str])
  (:gen-class))

;; --- Math utilities ---

(defn factorial
  "Returns n! . Returns 1 for 0. Throws IllegalArgumentException for negative n or non-integers."
  [n]
  (cond
    (not (integer? n)) (throw (IllegalArgumentException. "factorial requires an integer"))
    (neg? n) (throw (IllegalArgumentException. "factorial not defined for negative numbers"))
    (zero? n) 1
    :else (reduce *' (range 1 (inc n)))))

(defn fibonacci
  "Returns nth fibonacci number (0-indexed: fib(0)=0, fib(1)=1)."
  [n]
  (cond
    (not (integer? n)) (throw (IllegalArgumentException. "fibonacci requires an integer"))
    (neg? n) (throw (IllegalArgumentException. "fibonacci not defined for negative numbers"))
    (= n 0) 0
    (= n 1) 1
    :else (loop [a 0 b 1 i 1]
            (if (= i n) b
                (recur b (+' a b) (inc i))))))

(defn safe-divide
  "Divides numerator by denominator. Returns nil if denominator is 0/nil.
   Handles doubles, ratios, and integers."
  [num den]
  (cond
    (nil? den) nil
    (nil? num) nil
    (zero? den) nil
    :else (/ num den)))

;; --- String utilities ---

(defn palindrome?
  "Returns true if s is a palindrome, ignoring case, spaces and punctuation.
   Returns false for nil. Empty string and single char are palindromes."
  [s]
  (if (nil? s)
    false
    (let [cleaned (-> s
                      str/lower-case
                      (str/replace #"[^a-z0-9]" ""))]
      (= cleaned (str/reverse cleaned)))))

(defn reverse-string
  "Reverses string s. Returns nil for nil input, \"\" for empty."
  [s]
  (when-not (nil? s)
    (str/reverse s)))

(defn truncate
  "Truncates s to max-len characters, appending \"...\" if truncated.
   Edge: nil -> nil, negative max-len -> throws, max-len < 3 with truncation needed -> truncates without ellipsis."
  [s max-len]
  (cond
    (nil? s) nil
    (not (integer? max-len)) (throw (IllegalArgumentException. "max-len must be integer"))
    (neg? max-len) (throw (IllegalArgumentException. "max-len must be non-negative"))
    (<= (count s) max-len) s
    (< max-len 3) (subs s 0 max-len)
    :else (str (subs s 0 (- max-len 3)) "...")))

;; --- Collection utilities ---

(defn find-median
  "Finds median of a collection of numbers. Returns nil for empty/nil collection.
   Returns double for even count, number for odd count. Handles unsorted input."
  [coll]
  (when (seq coll)
    (let [sorted (sort coll)
          n (count sorted)
          mid (quot n 2)]
      (if (odd? n)
        (nth sorted mid)
        (/ (+ (nth sorted (dec mid)) (nth sorted mid)) 2.0)))))

(defn deep-merge
  "Recursively merges maps. Non-map values are overwritten by later maps.
   Handles nil maps, nested maps, and non-map values."
  [& maps]
  (let [maps (remove nil? maps)]
    (if (empty? maps)
      nil
      (reduce (fn [acc m]
                (merge-with (fn [a b]
                              (if (and (map? a) (map? b))
                                (deep-merge a b)
                                b))
                            acc m))
              maps))))

(defn compact
  "Removes nil values from collection. Preserves order. Returns empty vector for nil/empty."
  [coll]
  (if (nil? coll)
    []
    (vec (remove nil? coll))))

(defn parse-int
  "Parses string to integer. Returns nil for nil/blank/non-numeric.
   Trims whitespace, handles +/- signs, leading zeros."
  [s]
  ;; re-matches guards the format; try/catch guards the range (Integer overflow -> nil)
  (when-let [s (some-> s str/trim)]
    (try
      (when (re-matches #"[-+]?\d+" s)
        (Integer/parseInt s))
      (catch NumberFormatException _ nil))))

;; --- Main ---

(defn -main [& _args]
  (println "Factorial 5:" (factorial 5))
  (println "Fibonacci 10:" (fibonacci 10))
  (println "Palindrome 'racecar'? " (palindrome? "racecar"))
  (println "Median [3 1 2]:" (find-median [3 1 2])))
