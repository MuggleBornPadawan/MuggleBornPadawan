(defun hello-world-log ()
  "Print 'Hello, World!' and log the output with the current date and time to a file."

  ;; Print "Hello, World!" to the *Messages* buffer
  ;; (message "Hello, World!")

  ;; Get the current date and time
  (let ((current-datetime (format-time-string "%Y-%m-%d %H:%M:%S")))
    
    ;; Print the current date and time
    (message "Hello, ELisp World! Current date and time: %s" current-datetime)

    ;; Log the output to a file
    (let ((log-file "elisp-log.txt"))
      (with-temp-buffer
        (insert (format "Hello, Elisp World!\nLogged at: %s\n\n" current-datetime))
        (append-to-file (point-min) (point-max) log-file)))))

;; Execute the function
(hello-world-log)

;; M-x eval-buffer
;; M-x ielm ;; for inferior emacs lisp buffer
;; Terminal: emacs --batch -l hello-world.el

