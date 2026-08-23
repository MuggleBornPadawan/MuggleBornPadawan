(ns sample-clj.core-test
  (:require [clojure.test :refer [deftest is testing are]]
            [sample-clj.core :as core]))

;; ===== factorial =====
(deftest factorial-test
  (testing "base cases"
    (is (= 1 (core/factorial 0)))
    (is (= 1 (core/factorial 1)))
    (is (= 2 (core/factorial 2)))
    (is (= 120 (core/factorial 5)))
    (is (= 3628800 (core/factorial 10))))

  (testing "large input - big integer promotion"
    (is (= 2432902008176640000 (core/factorial 20)))
    ;; 30! exceeds Long/MAX_VALUE, should auto-promote via *'
    (is (= 265252859812191058636308480000000N (core/factorial 30))))

  (testing "edge: negative throws"
    (is (thrown? IllegalArgumentException (core/factorial -1)))
    (is (thrown? IllegalArgumentException (core/factorial -100))))

  (testing "edge: non-integer throws"
    (is (thrown? IllegalArgumentException (core/factorial 3.5)))
    (is (thrown? IllegalArgumentException (core/factorial 3.0)))
    (is (thrown? IllegalArgumentException (core/factorial "5")))
    (is (thrown? IllegalArgumentException (core/factorial nil)))
    (is (thrown? IllegalArgumentException (core/factorial 2/3)))))

;; ===== fibonacci =====
(deftest fibonacci-test
  (testing "base cases"
    (is (= 0 (core/fibonacci 0)))
    (is (= 1 (core/fibonacci 1)))
    (is (= 1 (core/fibonacci 2)))
    (is (= 2 (core/fibonacci 3)))
    (is (= 55 (core/fibonacci 10)))
    (is (= 6765 (core/fibonacci 20))))

  (testing "edge: large n does not overflow"
    (is (= 354224848179261915075N (core/fibonacci 100))))

  (testing "edge: negative throws"
    (is (thrown? IllegalArgumentException (core/fibonacci -1))))

  (testing "edge: non-integer throws"
    (is (thrown? IllegalArgumentException (core/fibonacci 2.5)))
    (is (thrown? IllegalArgumentException (core/fibonacci nil)))))

;; ===== safe-divide =====
(deftest safe-divide-test
  (testing "normal division"
    (is (= 5 (core/safe-divide 10 2)))
    (is (= 1/2 (core/safe-divide 1 2)))
    (is (= 2.5 (core/safe-divide 5.0 2.0)))
    (is (= -5 (core/safe-divide 10 -2)))
    (is (= -5 (core/safe-divide -10 2))))

  (testing "edge: divide by zero -> nil"
    (is (nil? (core/safe-divide 10 0)))
    (is (nil? (core/safe-divide -5 0)))
    (is (nil? (core/safe-divide 10 0.0))))

  (testing "edge: nil inputs -> nil"
    (is (nil? (core/safe-divide nil 5)))
    (is (nil? (core/safe-divide 5 nil)))
    (is (nil? (core/safe-divide nil nil))))

  (testing "edge: zero numerator"
    (is (= 0 (core/safe-divide 0 5)))
    (is (nil? (core/safe-divide 0 0)))) ; 0/0 -> nil per safe contract

  (testing "edge: ratios"
    (is (= 3/2 (core/safe-divide 3/4 1/2)))))

;; ===== palindrome? =====
(deftest palindrome-test
  (testing "true palindromes"
    (is (core/palindrome? "racecar"))
    (is (core/palindrome? "RaceCar")) ; case insensitive
    (is (core/palindrome? "A man, a plan, a canal: Panama")) ; ignores punctuation
    (is (core/palindrome? "Was it a car or a cat I saw?"))
    (is (core/palindrome? "No 'x' in Nixon")))

  (testing "false palindromes"
    (is (not (core/palindrome? "hello")))
    (is (not (core/palindrome? "race a car"))))

  (testing "edge cases"
    (is (core/palindrome? ""))        ; empty -> true
    (is (core/palindrome? "a"))       ; single char -> true
    (is (core/palindrome? " "))       ; only spaces -> true (cleaned is "")
    (is (core/palindrome? "!!!"))     ; only punctuation -> true
    (is (not (core/palindrome? nil))) ; nil -> false
    (is (core/palindrome? "12321"))   ; numeric palindrome
    (is (not (core/palindrome? "12345")))))

;; ===== reverse-string =====
(deftest reverse-string-test
  (is (= "olleh" (core/reverse-string "hello")))
  (is (= "" (core/reverse-string "")))
  (is (nil? (core/reverse-string nil)))
  (is (= "a" (core/reverse-string "a")))
  (is (= "ñóç" (core/reverse-string "çóñ"))) ; unicode
  (is (= "👋🌍" (core/reverse-string "🌍👋"))) ; emoji surrogate pairs may not reverse perfectly - documents edge
  (is (= "  c b a  " (core/reverse-string "  a b c  ")))) ; preserves spaces

;; ===== truncate =====
(deftest truncate-test
  (testing "no truncation needed"
    (is (= "hello" (core/truncate "hello" 5)))
    (is (= "hello" (core/truncate "hello" 10)))
    (is (= "" (core/truncate "" 5))))

  (testing "truncation with ellipsis"
    (is (= "he..." (core/truncate "hello world" 5)))
    (is (= "hel..." (core/truncate "hello world" 6)))
    (is (= "..." (core/truncate "hello world" 3))))

  (testing "edge: max-len < 3"
    (is (= "he" (core/truncate "hello" 2)))
    (is (= "h" (core/truncate "hello" 1)))
    (is (= "" (core/truncate "hello" 0))))

  (testing "edge: nil input"
    (is (nil? (core/truncate nil 5))))

  (testing "edge: invalid max-len throws"
    (is (thrown? IllegalArgumentException (core/truncate "hello" -1)))
    (is (thrown? IllegalArgumentException (core/truncate "hello" 3.5)))
    (is (thrown? IllegalArgumentException (core/truncate "hello" nil)))
    (is (thrown? IllegalArgumentException (core/truncate "hello" "5")))))

;; ===== find-median =====
(deftest find-median-test
  (testing "odd length"
    (is (= 2 (core/find-median [3 1 2])))
    (is (= 5 (core/find-median [5])))
    (is (= 3 (core/find-median [1 2 3 4 5]))))

  (testing "even length -> double"
    (is (= 2.5 (core/find-median [1 2 3 4])))
    (is (= 2.5 (core/find-median [4 1 3 2]))) ; unsorted input
    (is (= 5.0 (core/find-median [5 5]))))

  (testing "edge: empty / nil -> nil"
    (is (nil? (core/find-median [])))
    (is (nil? (core/find-median nil)))
    (is (nil? (core/find-median '()))))

  (testing "edge: duplicates"
    (is (= 2 (core/find-median [2 2 2])))
    (is (= 2.0 (core/find-median [1 2 2 3]))))

  (testing "edge: negative numbers and floats"
    (is (= -2 (core/find-median [-3 -1 -2])))
    (is (= 1.5 (core/find-median [1.0 2.0])))
    (is (= 0.0 (core/find-median [-1 1]))))

  (testing "edge: large unsorted"
    (is (= 50.5 (core/find-median (shuffle (range 1 101)))))))

;; ===== deep-merge =====
(deftest deep-merge-test
  (testing "simple merge"
    (is (= {:a 1 :b 2} (core/deep-merge {:a 1} {:b 2})))
    (is (= {:a 2} (core/deep-merge {:a 1} {:a 2}))))

  (testing "nested merge"
    (is (= {:a {:b 1 :c 2 :d 3}} (core/deep-merge {:a {:b 1 :c 2}} {:a {:d 3}})))
    (is (= {:a {:b {:c 1 :d 2}}} (core/deep-merge {:a {:b {:c 1}}} {:a {:b {:d 2}}}))))

  (testing "edge: nil handling"
    (is (= {:a 1} (core/deep-merge nil {:a 1})))
    (is (= {:a 1} (core/deep-merge {:a 1} nil)))
    (is (nil? (core/deep-merge nil nil)))
    (is (nil? (core/deep-merge)))
    (is (= {:a 1} (core/deep-merge nil nil {:a 1} nil))))

  (testing "edge: non-map overwrite"
    (is (= {:a 2} (core/deep-merge {:a {:b 1}} {:a 2})))
    (is (= {:a {:b 1}} (core/deep-merge {:a 2} {:a {:b 1}})))
    (is (= {:a [1 2 3]} (core/deep-merge {:a [1]} {:a [1 2 3]})))) ; vectors not deep-merged

  (testing "edge: three-way merge"
    (is (= {:a 1 :b 2 :c 3} (core/deep-merge {:a 1} {:b 2} {:c 3})))
    (is (= {:a {:x 1 :y 2 :z 3}} (core/deep-merge {:a {:x 1}} {:a {:y 2}} {:a {:z 3}})))))

;; ===== compact =====
(deftest compact-test
  (is (= [1 2 3] (core/compact [1 nil 2 nil 3])))
  (is (= [] (core/compact [])))
  (is (= [] (core/compact nil)))
  (is (= [] (core/compact [nil nil])))
  (is (= [0 false ""] (core/compact [0 false "" nil]))) ; falsy but not nil -> kept
  (is (= [1 2] (core/compact '(1 nil 2))))
  (is (= [1 2] (core/compact #{1 nil 2})))) ; set input -> vector output (order not guaranteed but contains)

;; ===== parse-int =====
(deftest parse-int-test
  (testing "valid ints"
    (is (= 123 (core/parse-int "123")))
    (is (= -123 (core/parse-int "-123")))
    (is (= 123 (core/parse-int "+123")))
    (is (= 0 (core/parse-int "0")))
    (is (= 7 (core/parse-int "007"))) ; leading zeros
    (is (= 42 (core/parse-int "  42  ")))) ; whitespace trimmed

  (testing "edge: invalid -> nil"
    (is (nil? (core/parse-int nil)))
    (is (nil? (core/parse-int "")))
    (is (nil? (core/parse-int "   ")))
    (is (nil? (core/parse-int "12.3")))
    (is (nil? (core/parse-int "12a")))
    (is (nil? (core/parse-int "a12")))
    (is (nil? (core/parse-int "--5")))
    (is (nil? (core/parse-int "  - 5"))))

  (testing "edge: overflow -> nil (Java Integer limits)"
    (is (nil? (core/parse-int "2147483648"))) ; MAX_INT + 1
    (is (nil? (core/parse-int "-2147483649")))
    (is (= 2147483647 (core/parse-int "2147483647")))
    (is (= -2147483648 (core/parse-int "-2147483648"))))

  (testing "edge: non-string coerced?"
    ;; we pass non-string to ensure graceful handling - current impl returns nil for blank? check
    ;; strings only expected, but test deviation
    (is (nil? (core/parse-int "   \n\t  ")))))
