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
;; Description: A simple Scheme script to display the current date and time
;;              by executing an external system command ('date').

(define (display-current-datetime-via-system)
  "Executes the 'date' command and displays its output."
  (let ((temp-file-name "/tmp/scheme-date-output.txt")) ; A temporary file to store the date output
    ;; Execute the 'date' command and redirect its output to the temporary file
    (system (string-append "date > " temp-file-name))

    ;; Open the temporary file for reading
    (with-input-from-file temp-file-name
      (lambda ()
        (let loop ((char (read-char))) ; Read character by character
          (unless (eof-object? char)   ; Until end of file
            (display char)             ; Display the character
            (loop (read-char))))))

    ;; Delete the temporary file (important for cleanup!)
    (delete-file temp-file-name)
    (newline))) ; Ensure a newline after the date output

;; Call the function to display the date and time when the script is run
(display-current-datetime-via-system)
