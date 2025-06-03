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
(define (cbrt x)
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
;; Ackermann's function
(define (A x y)
  (cond ((= y 0) 0)
        ((= x 0) (* 2 y))
        ((= y 1) 2)
        (else (A (- x 1) (A x (- y 1))))))
(define (f n) (A 0 n))
(define (g n) (A 1 n))
(define (h n) (A 2 n))
(define (k n) (* 5 n n))
