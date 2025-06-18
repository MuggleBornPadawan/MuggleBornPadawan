#lang racket
(provide greet)
(define (greet name)
  (string-append "Hello, " name "!"))

(greet "World")
