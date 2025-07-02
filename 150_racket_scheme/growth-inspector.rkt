#lang racket

;; The GNU General Public License v3.0
;;
;; This program is free software: you can redistribute it and/or modify
;; it under the terms of the GNU General Public License as published by
;; the Free Software Foundation, either version 3 of the License, or
;; (at your option) any later version.
;;
;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
;; GNU General Public License for more details.
;;
;; You should have received a copy of the GNU General Public License
;; along with this program. If not, see <https://www.gnu.org/licenses/>.
;;
;; Author: MuggleBornPadawan
;; Version: 1.0.0
;; License: GNU GPL v3.0

;; (1) measureExecutionTime: Helper to measure CPU time for a thunk (a no-argument function).
;;
;; Purpose: Encapsulates the Racket `time` macro's CPU time reporting.
;; It runs a given thunk and returns its result along with the CPU time taken.
;;
;; Caveat: Racket's `time` reports CPU time, which can sometimes be affected by
;; system load or other processes. For extremely precise measurements in a
;; production environment, more advanced profiling tools might be needed,
;; but for empirical order-of-growth analysis, this is sufficient.
;;
;; Parameters:
;;   thunk [procedure?]: A procedure (a thunk, i.e., takes no arguments) to be timed.
;;
;; Returns:
;;   [list]: A list containing two elements:
;;           - The return value of the `thunk`.
;;           - The CPU time in milliseconds (integer?).
;;
;; Example:
;;   (measureExecutionTime (lambda () (sleep 0.1) (+ 1 2))) ; => (3 100) (approx)
(define (measureExecutionTime thunk)
  (let ([cpu-time 0])
    (define-values (results real-time gc-time)
      (time (set! cpu-time (current-process-milliseconds))
            (thunk))) ; The thunk is evaluated here
    (list results (- (current-process-milliseconds) cpu-time))))
    ; We capture the start time and subtract it from the end time after the thunk.
    ; This gives us a more direct CPU time for the thunk itself within the process.


;; (2) measureMemoryDelta: Helper to approximate memory usage delta for a thunk.
;;
;; Purpose: Measures the difference in Racket's reported memory usage before and after
;; executing a given thunk. This attempts to capture the memory "allocated" by the function.
;;
;; Caveat: Measuring memory accurately in a garbage-collected language like Racket
;; is notoriously tricky. `current-memory-use` reports the total memory used by
;; the Racket process. The "delta" we calculate here is a rough approximation
;; of the *additional* memory kept by the function, and it can be influenced by
;; garbage collection cycles, initial memory footprint, and how much memory
;; is truly "freed" immediately. It's a heuristic, not a precise measurement of
;; heap allocations directly attributable to the function's execution.
;; For more rigorous memory profiling, specialized tools are usually required.
;;
;; Parameters:
;;   thunk [procedure?]: A procedure (a thunk, i.e., takes no arguments) whose
;;                       memory impact is to be approximated.
;;
;; Returns:
;;   [list]: A list containing two elements:
;;           - The return value of the `thunk`.
;;           - The estimated memory delta in bytes (exact-integer?).
;;
;; Example:
;;   (measureMemoryDelta (lambda () (make-list 10000 0))) ; => (#<void> 80000) (approx)
(define (measureMemoryDelta thunk)
  (let* ([memBefore (current-memory-use)]
         [result (thunk)]
         [memAfter (current-memory-use)])
    (list result (- memAfter memBefore))))

;; (3) generateListInput: An example `inputGenerator` for creating a list of numbers.
;;
;; Purpose: This function is a concrete example of an `inputGenerator`. It takes
;; an integer `n` and returns a list containing `n` elements (here, consecutive integers).
;; This function will be passed to `inspect-function-growth`.
;;
;; Parameters:
;;   n [exact-nonnegative-integer?]: The desired size of the list.
;;
;; Returns:
;;   [list]: A list of `n` integers from 0 to n-1.
;;
;; Example:
;;   (generateListInput 5) ; => '(0 1 2 3 4)
(define (generateListInput n)
  (for/list ([i (in-range n)]) i))

;; (4) inspectFunctionGrowth: The main procedure to empirically measure time and space complexity.
;;
;; Purpose: Iterates through various input sizes, generates inputs using a provided
;; generator, executes the target function, and records its time and approximated
;; memory usage. It provides a dataset to analyze the function's orders of growth.
;;
;; Key Variables:
;; - `targetFunction`: The function whose performance we want to measure.
;; - `inputGenerator`: A function that creates input data of a given size `n`.
;;   This decouples input generation from the measurement logic, adhering to SRP.
;; - `startingValue`: The initial input size.
;; - `maxValue`: The maximum input size.
;; - `stepValue`: The increment for input size in each iteration.
;;
;; Parameters:
;;   targetFunction [procedure?]: The function to be inspected. It must accept
;;                                one argument, which will be the output of `inputGenerator`.
;;   inputGenerator [procedure?]: A function that takes an exact-nonnegative-integer?
;;                                (the desired input size) and returns an input
;;                                suitable for `targetFunction`.
;;   startingValue [exact-nonnegative-integer?]: The initial input size for testing.
;;   maxValue [exact-nonnegative-integer?]: The maximum input size to test (inclusive).
;;   stepValue [exact-positive-integer?]: The increment for input size in each step.
;;
;; Returns:
;;   [list]: A list of results. Each element in the list is another list:
;;           '(inputSize cpuTimeMs memoryDeltaBytes resultOfFunctionCall)
;;           The 'resultOfFunctionCall' is included for debugging/verification.
;;
;; Error Handling:
;;   - Raises an error if `startingValue` is not less than or equal to `maxValue`.
;;   - Raises an error if `stepValue` is not positive.
;;   - Basic type checking for inputs.
;;
;; Example Usage (after defining an example function like `sum-list`):
;; (inspectFunctionGrowth sum-list generateListInput 10 100 10)
;; => '((10 0 100 #<void>) (20 0 200 #<void>) ...)
(define (inspectFunctionGrowth targetFunction inputGenerator startingValue maxValue stepValue)
  ;; Defensive Programming: Input validation
  (unless (and (exact-nonnegative-integer? startingValue)
               (exact-nonnegative-integer? maxValue)
               (exact-positive-integer? stepValue))
    (error 'inspectFunctionGrowth "Invalid input: startingValue, maxValue must be non-negative integers; stepValue must be a positive integer."))
  (when (> startingValue maxValue)
    (error 'inspectFunctionGrowth "Invalid input: startingValue must be less than or equal to maxValue."))

  (let loop ([currentSize startingValue]
             [results '()])
    (if (> currentSize maxValue)
        (reverse results) ; Reverse to get results in ascending order of input size
        (begin
          (printf "Measuring for input size: ~a~%" currentSize)
          (let* ([inputData (inputGenerator currentSize)]
                 [timeResult (measureExecutionTime (lambda () (targetFunction inputData)))]
                 [memoryResult (measureMemoryDelta (lambda () (targetFunction inputData)))]) ; Re-run for memory for clearer isolation
            (loop (+ currentSize stepValue)
                  (cons (list currentSize (second timeResult) (second memoryResult) (first timeResult))
                        results))))))) ; (first timeResult) gives the actual result of the targetFunction

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Examples and Demonstrations
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define (sum-list-linear lst)
  (define (loop l acc)
    (if (empty? l)
        acc
        (loop (rest l) (+ acc (first l)))))
  (loop lst 0))

(define (contains-element-linear target lst)
  (define (loop l)
    (cond
      [(empty? l) #f]
      [(= (first l) target) #t]
      [else (loop (rest l))]))
  (loop lst))

(define (nested-loops-quadratic n)
  (define count 0)
  (for ([i (in-range n)])
    (for ([j (in-range n)])
      (set! count (+ count 1))))
  count)

;; Example Input Generator for a single number (for nested-loops-quadratic)
(define (generate-number-input n) n)


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; How to use this in your Linux Bash + Emacs setup:
;;
;; 1. Save the code: Save the above Racket code into a file, say, `growth-inspector.rkt`.
;; 2. Open in Emacs: `emacs growth-inspector.rkt`
;; 3. Run Racket in Emacs:
;;    - You can use `M-x run-racket` (or `C-c C-c` if you have `racket-mode` installed)
;;      to start a Racket REPL and load the file.
;;    - Or simply open a terminal (e.g., `M-x term` in Emacs or a separate bash window)
;;      and navigate to the directory.
;; 4. Execute from Bash: `racket growth-inspector.rkt` (This will just run the script;
;;    it won't show interactive output unless you add print statements for results.)
;;    For interactive use, use `racket` and then `(enter! "growth-inspector.rkt")`.
;;
;; Here are some interactive examples you'd type in the Racket REPL:
;;
;; (printf "--- Measuring sum-list-linear (O(N)) ---\n")
;; (define sum-results
;;   (inspectFunctionGrowth sum-list-linear generateListInput 1000 10000 1000))
;; (for-each (lambda (r) (printf "Size: ~a, Time: ~a ms, Memory: ~a bytes~%" (first r) (second r) (third r)))
;;           sum-results)
;;
;; (printf "\n--- Measuring contains-element-linear (O(N) worst case) ---\n")
;; (define contains-results
;;   (inspectFunctionGrowth (lambda (lst) (contains-element-linear 99999 lst)) ; Test worst case for contains
;;                          generateListInput 1000 10000 1000))
;; (for-each (lambda (r) (printf "Size: ~a, Time: ~a ms, Memory: ~a bytes~%" (first r) (second r) (third r)))
;;           contains-results)
;;
;; (printf "\n--- Measuring nested-loops-quadratic (O(N^2)) ---\n")
;; (define quadratic-results
;;   (inspectFunctionGrowth nested-loops-quadratic generate-number-input 100 1000 100))
;; (for-each (lambda (r) (printf "Size: ~a, Time: ~a ms, Memory: ~a bytes~%" (first r) (second r) (third r)))
;;           quadratic-results)
;;
;; Note: The actual numbers for time and memory will vary based on your system,
;; other running processes, and Racket's internal optimizations/garbage collection.
;; The goal is to observe the *trend* as the input size increases.
;; For O(N) functions, time/memory should increase roughly linearly.
;; For O(N^2) functions, time/memory should increase roughly quadratically.
;;
;; To analyze the order of growth, you would typically plot these results (e.g., in a spreadsheet).
;; If time is $T$ and input size is $N$, you can try plotting $T$ vs $N$, $T$ vs $N \log N$, $T$ vs $N^2$, etc.,
;; to see which one produces a straight line, indicating proportionality.
;;
;; For more advanced analysis, you might run the measurements multiple times and average the results
;; to reduce noise, especially for very fast functions.
