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
