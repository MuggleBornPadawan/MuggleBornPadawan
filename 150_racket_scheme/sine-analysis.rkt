#lang racket

;;; sine-analysis.rkt
;;;
;;; An exploration of a recursive sine procedure from SICP Exercise 1.15.
;;; This script provides the original implementation and an instrumented
;;; version for analysis.
;;;
;;; Author: MuggleBornPadawan
;;; License: GNU GPL v3
;;;
;;; This program is free software: you can redistribute it and/or modify
;;; it under the terms of the GNU General Public License as published by
;;; the Free Software Foundation, either version 3 of the License, or
;;; (at your option) any later version.
;;;
;;; This program is distributed in the hope that it will be useful,
;;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;;; GNU General Public License for more details.
;;;
;;; You should have received a copy of the GNU General Public License
;;; along with this program.  If not, see <https://www.gnu.org/licenses/>.

;; -----------------------------------------------------------------------------
;; Section 1: Original Procedures from the Exercise
;; -----------------------------------------------------------------------------

(define (cube x)
  (* x x x))

(define (p x)
  (- (* 3 x) (* 4 (cube x))))

;; This is the original, non-verbose sine procedure.
(define (sine angle)
  (if (not (> (abs angle) 0.1))
      angle
      (p (sine (/ angle 3.0)))))


;; -----------------------------------------------------------------------------
;; Section 2: Instrumented Procedure for Analysis
;; -----------------------------------------------------------------------------

;; We introduce a global counter to track calls to 'p'.
;; In a more advanced script, we might pass the counter as an argument,
;; but for this educational purpose, a global variable is clear.
(define p-call-count 0)

;; A version of 'p' that increments the counter before computing.
(define (p-instrumented x)
  (set! p-call-count (+ p-call-count 1)) ; Increment the counter
  (printf " -> Applying 'p'. Call count is now: ~a\n" p-call-count)
  (- (* 3 x) (* 4 (cube x)))) ; The original logic of 'p'

;; A version of 'sine' that uses the instrumented 'p' and prints its steps.
(define (sine-verbose angle indent)
  (printf "~a(sine ~a)\n" indent angle)
  (if (not (> (abs angle) 0.1))
      (begin
        (printf "~a -> Base case reached. Returning ~a\n" indent angle)
        angle)
      (p-instrumented (sine-verbose (/ angle 3.0) (string-append "  " indent)))))


;; -----------------------------------------------------------------------------
;; Section 3: Running the Analysis
;; -----------------------------------------------------------------------------

(displayln "--- Part A: Tracing (sine 12.15) ---")
(displayln "Running the verbose sine function to trace its execution:")
(newline)

; Reset the counter before the run
(set! p-call-count 0)
(define final-result (sine-verbose 12.15 ""))
(newline)

(displayln "Execution Trace Complete.")
(printf "Total number of times 'p' was applied: ~a\n" p-call-count)
(printf "Final result of (sine 12.15) is approximately: ~a\n" final-result)
(newline)

(displayln "--- Part B: Order of Growth Analysis ---")
(displayln "The analysis for Part B is provided in the text explanation.")
