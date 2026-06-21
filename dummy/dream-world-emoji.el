;;; dream-world-emoji.el --- An endless, dreaming emoji terminal world.
"""
prompt: elisp. create a text-based ascii world that runs in a terminal buffer, endlessly generating poetic, distorted text and symbolic shapes. it should feel like a living, dreaming terminal. use a timers to make it self-updating. make it easy to run. use standard libraries. include comments to explain key parts. make the visual generation highly dynamic: different modes, scrolling text, patterns, colors. make sure it cleans up nicely. keep it concise. let's make it beautiful. include an instruction on how to run. 
"""

(defvar dream-emoji-timer nil "Timer driving the emoji dream updates.")
(defvar dream-emoji-tick 0 "Animation step counter.")

(defvar dream-emoji-words
  '("💜" "✨" "🌈" "🌀" "🌙" "💫" "🌟" "⭐" "🔥" "💧" "🌊" "🍃" "💭" "👻" "🔮" "⚡"
    "🌸" "🌺" "💎" "🧠" "💡" "☄" "🌠" "🎆")
  "Emoji fragments drifting through the stream.")

(define-derived-mode dream-emoji-mode special-mode "💫Dream"
  "A mode for viewing a living, dreaming emoji terminal."
  (setq cursor-type nil)
  (setq buffer-read-only t)
  (face-remap-add-relative 'default :background "#0a0a1a" :foreground "#f8f8f2")
  (local-set-key (kbd "q") 'kill-current-buffer)
  (add-hook 'kill-buffer-hook 'dream-emoji-world-stop nil t))

(defun dream-emoji-colorize-buffer ()
  "Apply thematic colors to the emoji output."
  (save-excursion
    (goto-char (point-min))
    (while (not (eobp))
      (let ((char (char-after)))
        (when (and char (not (eq char ?\s)) (not (eq char ?\n)))
          (let ((color (cond
                        ((memq char '(?🌀 ?🌊 ?💧 ?☔ ?☁ ?🌠)) '(:foreground "#8be9fd"))
                        ((memq char '(?🔥 ?⚡ ?✨ ?🌟 ?⭐ ?💥 ?🎆 ?🎇 ?☄)) '(:foreground "#ffb86c"))
                        ((memq char '(?💜 ?🌙 ?🔮 ?💎 ?💡 ?🧪 ?🧠)) '(:foreground "#bd93f9"))
                        ((memq char '(?🌿 ?🍃 ?🌱 ?🌸 ?🌺 ?🌻 ?🌹 ?🌼)) '(:foreground "#50fa7b"))
                        ((memq char '(?💖 ?💗 ?💘 ?💝 ?❤ ?🧡 ?💛 ?💚)) '(:foreground "#ff79c6"))
                        ((memq char '(?🌕 ?🌖 ?🌗 ?🌘 ?🌑 ?🌒 ?🌓 ?🌔)) '(:foreground "#f1fa8c"))
                        (t '(:foreground "#6272a4")))))
            (put-text-property (point) (1+ (point)) 'face color))))
      (forward-char 1))))

(defun dream-emoji-world-update ()
  "Generate a frame of the dream using math, noise, and emoji."
  (when (get-buffer "*dream-emoji-world*")
    (with-current-buffer "*dream-emoji-world*"
      (let ((inhibit-read-only t)
            (width 40)
            (height 24)
            (frame ""))
        (erase-buffer)
        (setq dream-emoji-tick (1+ dream-emoji-tick))
        (dotimes (y height)
          (let ((line (make-string width ?\s))
                (phase (mod (/ dream-emoji-tick 60) 6)))
            (cond
             ((= phase 0)
              ;; Emoji rain
              (dotimes (x width)
                (let ((val (mod (+ x (* y 3) (/ dream-emoji-tick 2)) 13)))
                  (when (< val 2)
                    (aset line x (aref [💧 ☔ ⚡ 🌊 💫 ✨ 🌸 🍃 💜 🔥] (random 10)))))))
             ((= phase 1)
              ;; Sine-wave interference
              (let ((w1 (round (+ 20 (* 12 (sin (/ (+ y dream-emoji-tick) 5.0))))))
                    (w2 (round (+ 20 (* 8 (cos (/ (- y dream-emoji-tick) 3.0)))))))
                (dotimes (x width)
                  (cond ((= x w1) (aset line x ?🌀))
                        ((= x w2) (aset line x ?💥))
                        ((and (> x (min w1 w2)) (< x (max w1 w2)) (= 0 (mod (+ x y) 3)))
                         (aset line x ?🌊))))))
             ((= phase 2)
              ;; Moon phase ripples
              (dotimes (x width)
                (let* ((dx (- x 20))
                       (dy (- y 12))
                       (dist (sqrt (+ (* dx dx) (* (* dy 2.2) (* dy 2.2)))))
                       (ripple (sin (- (/ dist 2.0) (/ dream-emoji-tick 3.0)))))
                  (aset line x (cond ((> ripple 0.75) ?🌕)
                                     ((> ripple 0.4) ?🌙)
                                     ((> ripple 0.0) ?🌑)
                                     (t ?\s))))))
             ((= phase 3)
              ;; Quantum emoji static
              (dotimes (x width)
                (let ((noise (sin (+ (* x 0.25) (* y 0.24) (* dream-emoji-tick 0.15)))))
                  (aset line x (cond ((> noise 0.8) ?🌟)
                                     ((> noise 0.5) ?✨)
                                     ((> noise 0.1) ?💫)
                                     (t ?\s))))))
             ((= phase 4)
              ;; Flower bloom waves
              (let ((wave (round (+ 20 (* 15 (sin (/ (+ y dream-emoji-tick) 4.0)))))))
                (dotimes (x width)
                  (let ((dist (abs (- x wave))))
                    (aset line x (cond ((< dist 2) ?🌸)
                                       ((< dist 5) ?🌺)
                                       ((< dist 9) ?🌿)
                                       ((= 0 (mod (+ x y dream-emoji-tick) 7)) ?🍃)
                                       (t ?\s)))))))
             ((= phase 5)
              ;; Starburst cosmos
              (dotimes (x width)
                (let* ((cx (- x 20))
                       (cy (- y 12))
                       (angle (atan cy cx))
                       (r (sqrt (+ (* cx cx) (* cy cy))))
                       (star (sin (+ (* 5 angle) (* r 0.5) (* dream-emoji-tick 0.2)))))
                  (aset line x (cond ((> star 0.9) ?⭐)
                                     ((> star 0.6) ?✨)
                                     ((> star 0.2) ?💫)
                                     ((< (random 100) 5) (aref [💜 🔮 💎 🧠] (random 4)))
                                     (t ?\s)))))))

            ;; Layer in drifting emoji fragments
            (when (and (= (mod y 5) 0) (< (random 100) 40))
              (let* ((word (nth (random (length dream-emoji-words)) dream-emoji-words))
                     (pos (random (max 1 (- width (length word) 6)))))
                (dotimes (i (length word))
                  (let ((idx (+ pos i)))
                    (when (< idx width)
                      (aset line idx (aref word i)))))))

            (setq frame (concat frame line "\n"))))
        (insert frame)
        (dream-emoji-colorize-buffer)))))

;;;###autoload
(defun dream-emoji-world-start ()
  "Boot up the dreaming emoji terminal."
  (interactive)
  (let ((buf (get-buffer-create "*dream-emoji-world*")))
    (switch-to-buffer buf)
    (dream-emoji-mode)
    (dream-emoji-world-stop)
    (setq dream-emoji-tick 0)
    (setq dream-emoji-timer (run-with-timer 0 0.1 'dream-emoji-world-update))
    (message "The emoji dream begins... Press 'q' to wake up.")))

(defun dream-emoji-world-stop ()
  "Kill the active emoji dream cycle."
  (interactive)
  (when dream-emoji-timer
    (cancel-timer dream-emoji-timer)
    (setq dream-emoji-timer nil)
    (message "The emoji dream dissipates.")))

(provide 'dream-world-emoji)
;;; dream-world-emoji.el ends here
