#lang racket
(provide greet)
(define (greet name)
  (string-append "Hel000lo, " name "!"))

(greet "World")
