;;; prompt: write a elisp function to print epoch time, mac address, uname and randomly generated prime number
(require 'cl-lib)
(require 'subr-x) ; for string-trim

(defun my/prime-p (n)
  "Return t if N is prime."
  (cond ((<= n 1) nil)
        ((= n 2) t)
        ((zerop (% n 2)) nil)
        (t (let ((limit (floor (sqrt n)))
                 (div 3)
                 (is-prime t))
             (while (and (<= div limit) is-prime)
               (if (zerop (% n div))
                   (setq is-prime nil)
                 (setq div (+ div 2))))
             is-prime))))

(defun my/get-mac-address ()
  "Get the MAC address of the first available network interface."
  (cl-some (lambda (iface)
             (let* ((info (network-interface-info (car iface)))
                    (hw (cdr (nth 3 info))))
               (and hw 
                    (not (equal hw [0 0 0 0 0 0])) ; Skip loopback/empty
                    (mapconcat (lambda (b) (format "%02x" b)) hw ":"))))
           (network-interface-list)))

;;;###autoload
(defun print-sys-info ()
  "Print epoch time, MAC address, uname, and a random prime number."
  (interactive)
  (let* ((epoch (format-time-string "%s"))
         (mac (or (my/get-mac-address) "Unknown MAC"))
         (uname (if (eq system-type 'windows-nt)
                    (getenv "OS")
                  (string-trim (shell-command-to-string "uname -a"))))
         (prime (let (p)
                  (while (not (my/prime-p (setq p (+ 10000 (random 89999))))))
                  p)))
    (message "Epoch: %s\nMAC:   %s\nUname: %s\nPrime: %d" 
             epoch mac uname prime)))

;;; run this from command line
;;; emacs --batch -l hash_function.el --eval "(print-sys-info)"
