;;; Author: MuggleBornPadawan (Learning from McCarthy)
;;; License: GNU GPL v3

(defun my-assoc (x a)
  "Finds the pair in association list A where the first element is X."
  (cond ((null a) nil)
        ((eq (caar a) x) (car a))
        (t (my-assoc x (cdr a)))))

(defun my-pairlis (keys values env)
  "Zips keys and values into the environment ENV."
  (cond ((null keys) env)
        (t (cons (cons (car keys) (car values))
                 (my-pairlis (cdr keys) (cdr values) env)))))

;; Example Test:
(defparameter *my-env* '((y . 10) (z . 20)))
(setq *my-env* (my-pairlis '(x) '(5) *my-env*))

;; Now find X
;; (cdr (my-assoc 'x *my-env*)) => returns 5
