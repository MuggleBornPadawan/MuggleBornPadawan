;;; dream-world.el --- An endless, dreaming ASCII terminal world.
"""
prompt: elisp. create a text-based ascii world that runs in a terminal buffer, endlessly generating poetic, distorted text and symbolic shapes. it should feel like a living, dreaming terminal. use a timers to make it self-updating. make it easy to run. use standard libraries. include comments to explain key parts. make the visual generation highly dynamic: different modes, scrolling text, patterns, colors. make sure it cleans up nicely. keep it concise. let's make it beautiful. include an instruction on how to run. 
"""

(defvar dream-timer nil "Timer driving the dream updates.")
(defvar dream-tick 0 "Animation step counter.")

(defvar dream-words
  '("void" "signal" "static" "electric" "decay" "entropy" "pulse" "ghost"
    "echo" "wire" "dream" "horizon" "fading" "reboot" "silence" "drift")
  "Poetic terms injected into the stream.")

;; Define a custom major mode for our dreaming world
(define-derived-mode dream-mode special-mode "Dreaming"
  "A mode for viewing a living, dreaming terminal."
  (setq cursor-type nil)
  (setq buffer-read-only t)
  (face-remap-add-relative 'default :background "black" :foreground "white")
  (local-set-key (kbd "q") 'kill-current-buffer)
  (add-hook 'kill-buffer-hook 'dream-world-stop nil t))

(defun dream-colorize-buffer ()
  "Apply thematic colors to the terminal output based on characters."
  (save-excursion
    (goto-char (point-min))
    (while (not (eobp))
      (let ((char (char-after)))
        (when (and char (not (eq char ?\s)) (not (eq char ?\n)))
          (let ((color (cond
                        ((and (>= char ?a) (<= char ?z)) '(:foreground "#ff79c6" :weight bold)) ; Pink poetry
                        ((and (>= char ?A) (<= char ?Z)) '(:foreground "#ff5555" :weight bold)) ; Red structural glyphs
                        ((member char '(?@ ?# ?M)) '(:foreground "#50fa7b" :weight bold))      ; Bright green
                        ((member char '(?o ?O ?x)) '(:foreground "#8be9fd"))                   ; Cyan
                        (t '(:foreground "#6272a4")))))                                        ; Deep blue/purple
            (put-text-property (point) (1+ (point)) 'face color))))
      (forward-char 1))))

(defun dream-world-update ()
  "Generate a frame of the dream using math, noise, and poetry."
  (when (get-buffer "*dream-world*")
    (with-current-buffer "*dream-world*"
      (let ((inhibit-read-only t)
            (width 80)
            (height 24)
            (frame ""))
        (erase-buffer)
        (setq dream-tick (1+ dream-tick))
        (dotimes (y height)
          (let ((line (make-string width ?\s))
                (phase (mod (/ dream-tick 60) 4)))
            ;; Draw mathematical and symbolic landscapes
            (cond
             ;; Phase 0: Glitching rain
             ((= phase 0)
              (dotimes (x width)
                (let ((val (mod (+ x (* y 3) (/ dream-tick 2)) 13)))
                  (when (< val 2)
                    (aset line x (aref ".:*|oO@" (random 7)))))))
             ;; Phase 1: Interference sine-waves
             ((= phase 1)
              (let ((w1 (round (+ 40 (* 25 (sin (/ (+ y dream-tick) 5.0))))))
                    (w2 (round (+ 40 (* 15 (cos (/ (- y dream-tick) 3.0)))))))
                (dotimes (x width)
                  (cond ((= x w1) (aset line x ?#))
                        ((= x w2) (aset line x ?@))
                        ((and (> x (min w1 w2)) (< x (max w1 w2)) (= 0 (mod (+ x y) 3)))
                         (aset line x ?~))))))
             ;; Phase 2: Quantum static fields
             ((= phase 2)
              (dotimes (x width)
                (let ((noise (sin (+ (* x 0.12) (* y 0.24) (* dream-tick 0.15)))))
                  (aset line x (cond ((> noise 0.8) ?M)
                                     ((> noise 0.5) ?x)
                                     ((> noise 0.1) ?.)
                                     (t ?\s))))))
             ;; Phase 3: Exploding geometric ripples
             ((= phase 3)
              (dotimes (x width)
                (let* ((dx (- x 40))
                       (dy (- y 12))
                       (dist (sqrt (+ (* dx dx) (* (* dy 2.2) (* dy 2.2)))))
                       (ripple (sin (- (/ dist 2.0) (/ dream-tick 3.0)))))
                  (aset line x (cond ((> ripple 0.75) ?O)
                                     ((> ripple 0.4) ?o)
                                     ((> ripple 0.0) ?.)
                                     (t ?\s)))))))

            ;; Layer in shifting poetic fragments
            (when (and (= (mod y 5) 0) (< (random 100) 35))
              (let* ((word (nth (random (length dream-words)) dream-words))
                     (pos (random (max 1 (- width (length word) 6)))))
                ;; Distort text format occasionally
                (when (< (random 100) 25)
                  (setq word (mapconcat 'char-to-string word " ")))
                (dotimes (i (length word))
                  (let ((idx (+ pos i)))
                    (when (< idx width)
                      (aset line idx (aref word i)))))))

            (setq frame (concat frame line "\n"))))
        (insert frame)
        (dream-colorize-buffer)))))

;;;###autoload
(defun dream-world-start ()
  "Boot up the dreaming terminal."
  (interactive)
  (let ((buf (get-buffer-create "*dream-world*")))
    (switch-to-buffer buf)
    (dream-mode)
    (dream-world-stop) ; Cancel running timers to prevent overlap
    (setq dream-tick 0)
    (setq dream-timer (run-with-timer 0 0.1 'dream-world-update))
    (message "The terminal is now dreaming... Press 'q' to wake up.")))

(defun dream-world-stop ()
  "Kill the active dream cycle."
  (interactive)
  (when dream-timer
    (cancel-timer dream-timer)
    (setq dream-timer nil)
    (message "The dream dissipates.")))

(provide 'dream-world)
;;; dream-world.el ends here
