(defn test-and-or [& args]
  {:and (boolean (every? identity args))
   :or  (boolean (some identity args))})

;; Examples:
(test-and-or true true false)
;; => {:and false, :or true}

(test-and-or 1 "hello" :key)
;; => {:and true, :or true}

(test-and-or nil false)
;; => {:and false, :or false}

;; (defn test-and-or [a b]
;;   {:inputs [a b]
;;    :and-result (and a b)
;;    :or-result  (or a b)})

;; ;; Examples:
;; (test-and-or true false)
;; ;; => {:inputs [true false], :and-result false, :or-result true}

;; (test-and-or "hello" nil)
;; ;; => {:inputs ["hello" nil], :and-result nil, :or-result "hello"}

;; (test-and-or 1 2)
;; ;; => {:inputs [1 2], :and-result 2, :or-result 1}

; ### Key behaviors shown:
; * **`and`**: Returns the first *falsy* value (`nil` or `false`), or the last value if all are *truthy*.
; * **`or`**: Returns the first *truthy* value, or the last value if all are *falsy*.

;; (defn greet [name]
;;   (str "Hello, " name "!"))
;; (greet "Emacs")

;; (defn test-demo
;;   []
;;   (when true (println "aa") (println "xx") "bb" (greet "riiger") "dd") ; when is a combination of (if true do)
;;   ;(when false (println "abc") "abxc")
;;   ) ; when has no execution for false
