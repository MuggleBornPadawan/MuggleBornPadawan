;;(format t "~a~%" (get-universal-time))
(defun print-decoded-time ()
  (multiple-value-bind (sec min hr day mon yr dow dst-p tz)
      (get-decoded-time)
    (format t "Hello, Common LISP World! Current Decoded Time: ~2,'0d:~2,'0d:~2,'0d ~2,'0d/~2,'0d/~4,'0d~%"
            hr min sec day mon yr)))

;; Call the function to print the current decoded time
(print-decoded-time)

(defun log-decoded-time (log-file)
  (multiple-value-bind (sec min hr day mon yr dow dst-p tz)
      (get-decoded-time)
    (with-open-file (stream log-file
                             :direction :output
                             :if-exists :append
                             :if-does-not-exist :create)
      (format stream "Current Decoded Time: ~2,'0d:~2,'0d:~2,'0d ~2,'0d/~2,'0d/~4,'0d~%"
              hr min sec day mon yr))))

;; Specify the log file name
(defparameter *log-file* "hello-world.log")

;; Call the function to log the current decoded time
(log-decoded-time *log-file*)
