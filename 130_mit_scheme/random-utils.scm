;;; GNU General Public License v3.0
;;;
;;; Copyright (C) 2025 Your Name
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
;;; along with this program. If not, see <https://www.gnu.org/licenses/>.

;; Author: Your Name
;; Date: 2025-05-29
;; Description: A simple Scheme script to display the current date and time.

(define (display-current-datetime)
  "Displays the current date and time."
  (let* ((current-utc-time (current-time))
         (local-date-time (time-utc->date current-utc-time)))
    (display "Current Date and Time: ")
    (display (date-year local-date-time))
    (display "-")
    (display (date-month local-date-time))
    (display "-")
    (display (date-day local-date-time))
    (display " ")
    (display (date-hour local-date-time))
    (display ":")
    (display (date-minute local-date-time))
    (display ":")
    (display (date-second local-date-time))
    (newline))) ; Adds a newline character for cleaner output

;; Call the function to display the date and time when the script is run
(display-current-datetime)
