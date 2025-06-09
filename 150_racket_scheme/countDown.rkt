#lang racket

;; The GNU General Public License v3.0

;; This program is free software: you can redistribute it and/or modify
;; it under the terms of the GNU General Public License as published by
;; the Free Software Foundation, either version 3 of the License, or
;; (at your option) any later version.

;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Public License for more details.

;; You should have received a copy of the GNU General Public License
;; along with this program.  If not, see <https://www.gnu.org/licenses/>.

;; Author: MuggleBornPadawan

;; printCountdown Function
;; ----------------------
;; Purpose: Prints integers from a given positive integer down to zero,
;;          each on a new line. Handles invalid input by throwing an error.
;; Input:   startingValue (a positive integer)
;; Output:  Prints values to the console; does not return a value.
;; Errors:  Throws an error if startingValue is not a positive integer.

(provide printCountdown)

(define (printCountdown startingValue)
  ;; Defensive Programming: Input validation is the first line of defense.
  (unless (and (integer? startingValue) (>= startingValue 0))
    (error 'printCountdown "Input must be a non-negative integer."))
  ;; The core recursive logic begins here.
  (cond
    ;; Base Case: If the startingValue is 0, print it and stop.
    ;; This is the termination condition for our recursion.
    [(zero? startingValue)
     (displayln startingValue)]
    ;; Recursive Case: If startingValue is greater than 0,
    [else
     (displayln startingValue)
     (printCountdown (- startingValue 1))])) ; Recursive call with decremented value

(printCountdown 5)
;; --- Examples of Usage ---

;; Example 1: Valid input
;(begin
;  (displayln "--- Countdown from 5 ---")
;  (printCountdown 5)
;  (newline))

;; Example 2: Countdown from 0 (edge case, but valid according to definition)
;(begin
;  (displayln "--- Countdown from 0 ---")
;  (printCountdown 0)
;  (newline))

;; Example 3: Invalid input (demonstrating error handling)
;; Uncomment these lines one at a time to see the errors.
; (begin
;   (displayln "--- Attempting to countdown from -3 (will error) ---")
; ;  (printCountdown -3)
;   (newline))

; (begin
;   (displayln "--- Attempting to countdown from 3.14 (will error) ---")
; ;  (printCountdown 3.14)
;   (newline))

; (begin
;   (displayln "--- Attempting to countdown from 'hello' (will error) ---")
; ;  (printCountdown "hello")
;   (newline))
