;;; Author: MuggleBornPadawan
;;; License: Public Domain
;;; Version: 1.0.0
;;;
;;; Helper function: random-integer-in-range
;;;
;;; Purpose:
;;;   Generates a pseudo-random integer within a specified inclusive range.
;;;   This function is designed for MIT Scheme.
;;;
;;; Parameters:
;;;   min-val - An integer representing the minimum possible value (inclusive).
;;;             Example: If you want numbers from 5 upwards, min-val is 5.
;;;   max-val - An integer representing the maximum possible value (inclusive).
;;;             Example: If you want numbers up to 10, max-val is 10.
;;;
;;; Returns:
;;;   If min-val <= max-val:
;;;     A pseudo-random integer 'x' such that min-val <= x <= max-val.
;;;     The distribution is intended to be uniform across the range.
;;;
;;; Signals an error (using MIT Scheme's `error` procedure):
;;;   If min-val > max-val, as this represents an impossible range.
;;;   The error message will include the problematic values.
;;;
(define (random-integer-in-range min-val max-val)
  ;; Step 1: Validate input parameters.
  ;; It's crucial, as Robert C. Martin ("Uncle Bob") would say, to write
  ;; functions that are robust and do what they say they do.
  ;; Here, we check if the minimum value is greater than the maximum value.
  (if (> min-val max-val)
      ;; If min-val is indeed greater than max-val, it's an invalid range.
      ;; We signal an error with a descriptive message and the offending values.
      ;; This is a "best practice" as it makes debugging much easier.
      (error "Min value cannot exceed max value in random-integer-in-range. "
             "min-val:" min-val " max-val:" max-val)

      ;; Step 2: If inputs are valid, proceed to generate the random number.
      ;; We use a `let` binding to calculate `range-size` once. This is both
      ;; efficient and makes the code more readable.
      (let ((range-size (+ (- max-val min-val) 1)))
        ;; `range-size` is the number of integers in the desired range.
        ;; For example, for min-val=5 and max-val=10, the integers are 5,6,7,8,9,10.
        ;; So, range-size = 10 - 5 + 1 = 6.

        ;; Step 3: Generate a random number and map it to the desired range.
        ;; MIT Scheme's `(random n)` procedure returns a non-negative integer
        ;; strictly less than `n`. So, `(random range-size)` will give us an
        ;; integer from 0 up to (range-size - 1).
        ;; In our example (range-size = 6), `(random 6)` yields 0, 1, 2, 3, 4, or 5.
        ;;
        ;; To shift this 0-based random number into our desired [min-val, max-val]
        ;; range, we simply add `min-val` to it.
        ;; Example:
        ;;   If (random 6) returns 0, then 0 + min-val (5) = 5.
        ;;   If (random 6) returns 5, then 5 + min-val (5) = 10.
        (+ min-val (random range-size)))))

(define (square x) (* x x))
(define (sum-of-squares a b)
  (+ (square a) (square b)))
(define (f a)
  (sum-of-squares (+ a 1) (* a 2)))
