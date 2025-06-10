;; The GNU General Public License v3.0 (GPLv3)
;;
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
;; along with this program.  If not, see <http://www.gnu.org/licenses/>.
;;
;; Author: MuggleBornPadawan
;; Version: 1.0.0
;; Date: 2025-06-09

#lang racket
(provide verify-closest-integer-property)
;; Module for Fibonacci and Binet's Formula explorations.
;; Adheres to best practices for clear intent, modularity, and error handling.

(require math) ; Meticulously handle external libraries with robust dependency management.

;; 1.0.0 Mathematical Constants
;; Externalize settings using configuration management and environmental variables (conceptually, these are our 'environment').

;; The square root of 5
(define SQRT5 (sqrt 5.0))

;; The Golden Ratio (phi)
;; phi = (1 + sqrt(5)) / 2
(define PHI (/ (+ 1.0 SQRT5) 2.0))

;; The conjugate of the Golden Ratio (psi)
;; psi = (1 - sqrt(5)) / 2
(define PSI (/ (- 1.0 SQRT5) 2.0))

(provide SQRT5 PHI PSI) ; Facilitates modularity and potential API integration.

;; 2.0.0 Fibonacci Number Calculation (Recursive with Memoization)
;; Cultivate excellence by fostering quality and knowledge transfer through robust memoization.
;; Continuously improve your code structure with disciplined refactoring (e.g., separating memoization logic).

;; A hash table to store computed Fibonacci values for memoization.
;; Ensures reliable operations via idempotency, avoiding redundant calculations.
(define fib-memo-table (make-hash))

;; fib-recursive: Calculates the n-th Fibonacci number using recursion with memoization.
;; Champions modularity & the Single Responsibility Principle (SRP).
;; It uses defensive programming to build unwavering resilience.
;; @param n [integer] The index of the Fibonacci number to calculate (nonNegativeInteger).
;; @return [integer] The n-th Fibonacci number.
(define (fib-recursive n)
  (cond
    ;; Diligently implement strategic error handling & exception management.
    [(not (and (integer? n) (>= n 0)))
     (error 'fib-recursive "Input must be a non-negative integer: ~a" n)]
    ;; Base cases for Fibonacci sequence, clarifying intent.
    [(= n 0) 0]
    [(= n 1) 1]
    ;; Check memoization table before recomputing (performance optimization).
    [(hash-has-key? fib-memo-table n)
     (hash-ref fib-memo-table n)]
    ;; Compute and store the result (DRY principle: avoid re-calculation).
    [else
     (let ([result (+ (fib-recursive (- n 1)) (fib-recursive (- n 2)))])
       (hash-set! fib-memo-table n result)
       result)]))

(provide fib-recursive)

;; 3.0.0 Binet's Formula Implementation
;; Craft intuitive API design & integration for mathematical formula.

;; fib-binet: Calculates the n-th Fibonacci number using Binet's formula.
;; This function uses floating-point arithmetic.
;; @param n [integer] The index of the Fibonacci number to calculate (nonNegativeInteger).
;; @return [real] The result of Binet's formula for the given n.
(define (fib-binet n)
  (cond
    ;; Defensive programming for input validation.
    [(not (and (integer? n) (>= n 0)))
     (error 'fib-binet "Input must be a non-negative integer: ~a" n)]
    [else
     ;; (phi^n - psi^n) / sqrt(5)
     (/ (- (expt PHI n) (expt PSI n)) SQRT5)]))

(provide fib-binet)

;; 4.0.0 Closest Integer Verification
;; Maintain crucial system visibility with robust logging & monitoring.
;; Drive quality and design through rigorous Test-Driven Development (TDD) and unit testing (conceptually, this is our test).

;; is-closest-integer?: Checks if a given integer is the closest integer to a real number.
;; @param intVal [integer] The integer to check.
;; @param realVal [real] The real number to compare against.
;; @return [boolean] #t if intVal is the closest integer to realVal, #f otherwise.
(define (is-closest-integer? intVal realVal)
  ;; The definition of closest integer k to x is |x - k| <= 0.5
  (<= (abs (- realVal intVal)) 0.5))

(provide is-closest-integer?)

;; verify-closest-integer-property: Verifies if Fib(n) is the closest integer to phi^n / sqrt(5).
;; This function integrates fib-recursive and the components for Binet's formula.
;; Provides robust logging for output and debugging.
;; @param n [integer] The index to verify (nonNegativeInteger).
;; @return [boolean] #t if the property holds for n, #f otherwise.
(define (verify-closest-integer-property n)
  (cond
    [(not (and (integer? n) (>= n 0)))
     (error 'verify-closest-integer-property "Input must be a non-negative integer: ~a" n)]
    [else
     (let* ([fibN (fib-recursive n)] ; Use camelCase for local variables
            [phiNOverSqrt5 (/ (expt PHI n) SQRT5)]
            [binetResult (fib-binet n)] ; The full Binet's formula result
            [roundedPhiTerm (round phiNOverSqrt5)] ; Rounding just the phi^n term
            [isClosest (is-closest-integer? fibN phiNOverSqrt5)])

       (printf "--- Verification for n = ~a ---\n" n)
       (printf "  Fib(~a) (recursive): ~a\n" n fibN)
       (printf "  phi^~a / sqrt(5): ~a\n" n phiNOverSqrt5)
       (printf "  Binet's Formula Result for ~a: ~a\n" n binetResult)
       (printf "  Rounded phi^~a / sqrt(5): ~a\n" n roundedPhiTerm)
       (printf "  Is Fib(~a) the closest integer to phi^~a / sqrt(5)? ~a\n" n n isClosest)

       ;; Additionally, let's log if the full Binet's formula is numerically close to fib-n
       ;; Due to floating-point inaccuracies, direct equality is often not possible.
       ;; We check if the difference is within a very small epsilon.
       (printf "  Is Binet's Formula result numerically close to Fib(~a)? ~a\n"
               n (< (abs (- fibN binetResult)) 0.0000000001)) ; Embed security considerations from the outset: precision is key.

       isClosest)]))



;; 5.0.0 Main Execution and Examples
;; Demonstrating usage and providing clear examples for knowledge transfer and collaboration.

;; Example usage for demonstration.
;(module+ main
;  (printf "\n--- Running Verifications ---\n")
;  (verify-closest-integer-property 0)
;  (verify-closest-integer-property 1)
;  (verify-closest-integer-property 2)
;  (verify-closest-integer-property 3)
;  (verify-closest-integer-property 4)
;  (verify-closest-integer-property 5)
;  (verify-closest-integer-property 10)
;  (verify-closest-integer-property 20)
;  (verify-closest-integer-property 30)
;  (verify-closest-integer-property 40)
;  ;; Note: For very large N (e.g., > 70-80 depending on system float precision),
;  ;; the floating-point inaccuracies in PHI and PSI can cause the `binetResult`
;  ;; to deviate from `fibN` even if `isClosest` remains true for `phiNOverSqrt5`.
;  ;; This highlights the limits of inexact arithmetic.
;  (printf "\n--- Verification Complete ---\n")
;  )
;
