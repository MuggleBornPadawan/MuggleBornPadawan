(define current-dt (current-datetime))

(display "Hello, Scheme World! ")
(display "The current date and time is: ")
(display (datetime-year current-dt))
(display "-")
(display (datetime-month current-dt))
(display "-")
(display (datetime-day current-dt))
(display " ")
(display (datetime-hour current-dt))
(display ":")
(display (datetime-minute current-dt))
(display ":")
(display (datetime-second current-dt))
(newline)

(exit) ; Crucial for shebang scripts to exit cleanly
