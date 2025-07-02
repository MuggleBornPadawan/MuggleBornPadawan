#lang racket
;; This program is free software: you can redistribute it and/or modify
;; it under the terms of the GNU General Public License as published by
;; the Free Software Foundation, either version 3 of the License, or
;; (at your option) any later version.
;;
;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Public License for more details.
;;
;; You should have received a copy of the GNU General Public License
;; along with this program. If not, see <https://www.gnu.org/licenses/>.
;;
;; Author: MuggleBornPadawan
;; Version: 2025-05-27

(define (square x) (* x x))
(define (sum-of-squares a b)
  (+ (square a) (square b)))
(define (f a)
  (sum-of-squares (+ a 1) (* a 2)))
(define (abs x)
  (cond ((> x 0) x)
	((= x 0) 0)
	((< x 0) (- x))))
(define (random-integer-in-range min-val max-val)
  (if (> min-val max-val)
      (error "Min value cannot exceed max value in random-integer-in-range. "
             "min-val:" min-val " max-val:" max-val)
      (let ((range-size (+ (- max-val min-val) 1)))
        (+ min-val (random range-size)))))
(define (sum-of-squares-of-two-larger x y z)
  (define (square n) (* n n)) ; Helper function for squaring
  (max (+ (square x) (square y))
       (+ (square x) (square z))
       (+ (square y) (square z))))
(define (a-plus-abs-b a b)
  ((if (> b 0) + -) a b))
(define (p) (p))
(define (test x y)
  (if (= x 0) 0 y))
;; sqrt 
(define (sqrt x)
  (define (average x y)
    (/ (+ x y) 2))
  (define (good-enough? guess)
    (< (abs (- (square guess) x)) 0.001))
  (define (improve guess)
    (average guess (/ x guess)))
  (define (sqrt-iter guess)
    (display "Current guess: ")
    (display guess)
    (newline) ; Add a newline for readability
    (if (good-enough? guess)
	guess
	(sqrt-iter (improve guess))))
  (sqrt-iter 1.0))
;; cube root
(define (my-cbrt x)
   (define (cube y) (* y y y))
   (define (improve y)
    (/ (+ (/ x (square y)) (* 2 y)) 3))
  (define (good-enough? guess)
    (< (abs (- (cube guess) x)) 0.001))
  (define (cbrt-iter guess)
    (display "Current guess: ")
    (display guess)
    (newline) ; Add a newline for readability
    (if (good-enough? guess)
	guess
	(cbrt-iter (improve guess))))
  (cbrt-iter 1.0))
;; factorial  
(define (factorial n)
  ;; <<< INSERT TRACING HERE <<<
  (display "--> Entered factorial with n = ")
  (display n)
  (newline)
  ;; >>> TRACING ENDS <<<
  (if (= n 1)
      1
      (let ((result (* n (factorial (- n 1))))) ; Use let to capture the recursive result before displaying
        ;; <<< INSERT TRACING HERE FOR RETURN VALUE <<<
        (display "<-- Exiting factorial with n = ")
        (display n)
        (display ", returning = ")
        (display result)
        (newline)
        ;; >>> TRACING ENDS <<<
        result))) ; Ensure the result is returned
; factorial iter
(define (factorial-iter n)
  (fact-iter 1 1 n))
(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* counter product)
                 (+ counter 1)
                 max-count)))
;; Ackermann's function
(define (A x y)
  (cond ((= y 0) 0)
        ((= x 0) (* 2 y))
        ((= y 1) 2)
        (else (A (- x 1) (A x (- y 1))))))
(define (ff n) (A 0 n))
(define (g n) (A 1 n))
(define (h n) (A 2 n))
(define (k n) (* 5 n n))
; Fibonacci - tree recursion 
(define (fib n)
  (cond ((= n 0) 0)
        ((= n 1) 1)
        (else (+ (fib (- n 1))
                 (fib (- n 2))))))
; Fibonacci - linear iterative 
(define (fib-i n)
  (fib-iter 1 0 n))
(define (fib-iter a b count)
  (if (= count 0)
      b
      (fib-iter (+ a b) a (- count 1))))
; Coin change
(define (count-change amount) (cc amount 5))
(define (cc amount kinds-of-coins)
  (cond ((= amount 0) 1)
        ((or (< amount 0) (= kinds-of-coins 0)) 0)
        (else (+ (cc amount
                     (- kinds-of-coins 1))
                 (cc (- amount
                        (first-denomination kinds-of-coins)) kinds-of-coins)))))
(define (first-denomination kinds-of-coins)
  (cond ((= kinds-of-coins 1) 1)
        ((= kinds-of-coins 2) 5)
        ((= kinds-of-coins 3) 10)
        ((= kinds-of-coins 4) 25)
        ((= kinds-of-coins 5) 50)))
; f recursion 
(define (computeFRecursive n)
    (cond
      ((< n 3) ; baseCase: If n is less than 3, f(n) is simply n.
       n)
      (else    ; recursiveCase: If n is 3 or greater, use the recursive formula.
       (+ (computeFRecursive (- n 1))
          (* 2 (computeFRecursive (- n 2)))
          (* 3 (computeFRecursive (- n 3)))))))
; f iteration
(define (computeFIterative n)
    (cond
      ((< n 3) ; baseCase: For n < 3, the value is simply n.
       n)
      (else
       ;; Inner helper function for tail recursion.
       ;; We need to maintain the previous three values: f(k-1), f(k-2), f(k-3)
       ;; f_k_minus_1_val: Holds f(k-1)
       ;; f_k_minus_2_val: Holds f(k-2)
       ;; f_k_minus_3_val: Holds f(k-3)
       ;; currentK: The current index we are building up to.
       (define (iter f_k_minus_1_val f_k_minus_2_val f_k_minus_3_val currentK)
         (if (= currentK n) ; termination condition: Have we reached our target 'n'?
             ;; If currentK is 'n', then f_k_minus_1_val holds f(n-1), etc.
             ;; So, we calculate f(n) using these values.
             (+ f_k_minus_1_val
                (* 2 f_k_minus_2_val)
                (* 3 f_k_minus_3_val))
             ;; If not, calculate the next f_k and recurse with updated values.
             (iter (+ f_k_minus_1_val
                      (* 2 f_k_minus_2_val)
                      (* 3 f_k_minus_3_val)) ; This becomes the new f(k-1) for the next iteration (f(k))
                   f_k_minus_1_val          ; The old f(k-1) becomes the new f(k-2)
                   f_k_minus_2_val          ; The old f(k-2) becomes the new f(k-3)
                   (+ currentK 1))))       ; Increment the current index

       ;; Initial call to the helper function.
       ;; When currentK starts at 3, we need f(2), f(1), f(0).
       (iter 2 ; This is f(2)
             1 ; This is f(1)
             0 ; This is f(0)
             3)))) ; Start calculating from f(3)
;; exponential
(define (expt b n)
  (expt-iter b n 1))
(define (expt-iter b counter product)
  (if (= counter 0)
      product
      (expt-iter b
		 (- counter 1)
		 (* b product))))

;; greatest common divisor (gcd)
(define (gcd a b)
  (if (= b 0)
      a
      (gcd b (remainder a b))))

;; smallest divisor
(define (smallest-divisor n) (find-divisor n 2))
(define (find-divisor n test-divisor)
  (cond ((> (square test-divisor) n) n)
	((divides? test-divisor n) test-divisor)
	(else (find-divisor n (+ test-divisor 1)))))
(define (divides? a b) (= (remainder b a) 0))

;; primality check - is the given number prime?
(define (prime? n)
  (= n (smallest-divisor n)))

;; Fermat test
(define (fermat-test n)
  (define (expmod base exp m)
    (cond ((= exp 0) 1)
	  ((even? exp)
	   (remainder
	    (square (expmod base (/ exp 2) m))
	    m))
	  (else
	   (remainder
	    (* base (expmod base (- exp 1) m))
	    m))))
  (define (try-it a)
    (= (expmod a n n) a))
  (try-it (+ 1 (random (- n 1)))))

(define (fast-prime? n times)
  (cond ((= times 0) true)
	((fermat-test n) (fast-prime? n (- times 1)))
	(else false)))


;; DONT CHANGE ANYTHING AFTER THIS
; checker function
(define (checkerF fa fb value)
  (- (fa value) (fb value)))
; temp checker
(define (tChk value)
  (checkerF computeFRecursive computeFIterative value))
; temp checker upto value 
(define (chk-iter inputv incrv maxv)
  (if (<= inputv maxv)
      ((display "input:")
       (display inputv)
       (display " output:")
       (displayln (tChk inputv))
       (chk-iter (+ inputv incrv) incrv maxv))
      (display "end of chk")))
(define (uptoVChk value)
  (chk-iter 0 1 value))
;;(uptoVChk 10)

;; loop function for given values
(define (iterateFunctionWithIncrement aFunction startValue maxValue stepValue)
  ;; Defensive programming: Input validation
  (when (<= stepValue 0)
    (error 'iterateFunctionWithIncrement "Step value must be positive."))
  (when (> startValue maxValue)
    (error 'iterateFunctionWithIncrement "Start value cannot be greater than max value."))

  ;; This is our inner, tail-recursive helper procedure.
  ;; It keeps track of the currentValue as it progresses.
  (define (loop currentValue)
    ;; Base case: If we've gone past the maxValue, we stop.
    (when (<= currentValue maxValue)
      ;; Apply the function and print the results
      (let ([output (aFunction currentValue)])
        (printf "Input: ~a, Output: ~a~n" currentValue output))

      ;; Recursive step: Call loop with the next incremental value
      (loop (+ currentValue stepValue))))
  ;; Start the iteration
  (loop startValue))

(define (test-fn aFunction startValue maxValue stepValue) 
  (iterateFunctionWithIncrement aFunction startValue maxValue stepValue))

;; dummy to test REPL
(define (testt n)
  (+ n n 444))

(provide my-cbrt factorial testt tChk fib expt uptoVChk)
