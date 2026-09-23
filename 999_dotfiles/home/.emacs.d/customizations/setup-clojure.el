;;;;;;
;; Clojure — primary: clojure-ts-mode, fallback: clojure-mode
;;;;

;; Fallback mode hooks (kept for when tree-sitter grammar missing)
(add-hook 'clojure-mode-hook 'enable-paredit-mode)
(add-hook 'clojure-mode-hook 'subword-mode)
(require 'clojure-mode-extra-font-locking) ;; only for clojure-mode fallback

;; syntax hilighting for midje (fallback mode)
(add-hook 'clojure-mode-hook
          (lambda ()
             ;; Sync with machine stack: prefer Clojure CLI (deps.edn); CIDER jack-in auto-detects lein vs cli
             (setq inferior-lisp-program "clojure")
             (font-lock-add-keywords
              nil
              '(("(\\(facts?\\)"
                 (1 font-lock-keyword-face))
                ("(\\(background?\\)"
                 (1 font-lock-keyword-face))))
             (define-clojure-indent (fact 1))
             (define-clojure-indent (facts 1))
             (rainbow-delimiters-mode)))

;; Primary mode: tree-sitter (Emacs 30.1) — handles all Clojure files
(use-package clojure-ts-mode
  :ensure t
  :mode ("\\.clj\\'" "\\.cljs\\'" "\\.cljc\\'" "\\.edn\\'")
  :hook ((clojure-ts-mode . enable-paredit-mode)
         (clojure-ts-mode . subword-mode)
         (clojure-ts-mode . rainbow-delimiters-mode)))

;; LSP support (eglot) — eglot-ensure for both (fallback safe)
(defun my/clojure-format-on-save ()
  "Format Clojure buffer before saving using eglot when active."
  (add-hook 'before-save-hook
            (lambda ()
              (when (eglot-managed-p)
                (eglot-format-buffer)))
            nil t))

(use-package eglot
  :ensure nil
  :hook ((clojure-mode . eglot-ensure)
         (clojure-ts-mode . eglot-ensure)
         (clojure-mode . my/clojure-format-on-save)
         (clojure-ts-mode . my/clojure-format-on-save)))


;;;;
;; Cider
;;;;

;; provides minibuffer documentation for the code you're typing into the repl
(add-hook 'cider-mode-hook 'eldoc-mode)

;; go right to the REPL buffer when it's finished connecting
(setq cider-repl-pop-to-buffer-on-connect t)

;; When there's a cider error, show its buffer and switch to it
(setq cider-show-error-buffer t)
(setq cider-auto-select-error-buffer t)

;; Where to store the cider history.
(setq cider-repl-history-file "~/.emacs.d/cider-history")

;; Wrap when navigating history.
(setq cider-repl-wrap-history t)

;; enable paredit in your REPL
(add-hook 'cider-repl-mode-hook 'paredit-mode)

;; File mappings: ts-mode is primary (see use-package :mode above)
;; Keep only legacy fallbacks that ts-mode does not handle
(add-to-list 'auto-mode-alist '("\\.boot$" . clojure-mode))
(add-to-list 'auto-mode-alist '("lein-env" . enh-ruby-mode))


;;;;
;; Babashka (bb) — fast nREPL for scripts, lean RAM (bb 1.13.219)
;;;;

(defun cider-bb-nrepl ()
  "Start bb nREPL server (port 1667) and connect CIDER.
Lean RAM, fast start — good for scripts and quick tests on this 6.3 Gi machine."
  (interactive)
  (let* ((port 1667)
         (project-dir (or (locate-dominating-file default-directory "bb.edn")
                          (locate-dominating-file default-directory "deps.edn")
                          (locate-dominating-file default-directory "project.clj")
                          default-directory))
         (buf "*bb-nrepl*"))
    (when (get-buffer buf)
      (when (get-buffer-process buf) (delete-process (get-buffer-process buf)))
      (kill-buffer buf))
    (start-process "bb-nrepl" buf "bb" "nrepl-server" (format "localhost:%d" port))
    (message "bb nREPL started on localhost:%d in %s — connecting in 1 sec..." port project-dir)
    (run-with-timer 1 nil (lambda () (cider-connect-clj `(:host "localhost" :port ,port :project-dir ,project-dir))))))

;; Ensure C-c C-b works even if cider loads before ts-mode
(with-eval-after-load 'clojure-mode
  (define-key clojure-mode-map (kbd "C-c C-b") 'cider-bb-nrepl))
(with-eval-after-load 'clojure-ts-mode
  (define-key clojure-ts-mode-map (kbd "C-c C-b") 'cider-bb-nrepl))

;; key bindings
;; these help me out with the way I usually develop web apps
(defun cider-start-http-server ()
  (interactive)
  (cider-load-current-buffer)
  (let ((ns (cider-current-ns)))
    (cider-repl-set-ns ns)
    (cider-interactive-eval (format "(println '(def server (%s/start))) (println 'server)" ns))
    (cider-interactive-eval (format "(def server (%s/start)) (println server)" ns))))


(defun cider-refresh ()
  (interactive)
  (cider-interactive-eval (format "(user/reset)")))

(defun cider-user-ns ()
  (interactive)
  (cider-repl-set-ns "user"))

(eval-after-load 'cider
  '(progn
     (define-key clojure-mode-map (kbd "C-c C-v") 'cider-start-http-server)
     (define-key clojure-mode-map (kbd "C-M-r") 'cider-refresh)
     (define-key clojure-mode-map (kbd "C-c u") 'cider-user-ns)
     (define-key clojure-mode-map (kbd "C-c C-b") 'cider-bb-nrepl)
     (when (boundp 'clojure-ts-mode-map)
       (define-key clojure-ts-mode-map (kbd "C-c C-v") 'cider-start-http-server)
       (define-key clojure-ts-mode-map (kbd "C-M-r") 'cider-refresh)
       (define-key clojure-ts-mode-map (kbd "C-c u") 'cider-user-ns)
       (define-key clojure-ts-mode-map (kbd "C-c C-b") 'cider-bb-nrepl))
     (define-key cider-mode-map (kbd "C-c u") 'cider-user-ns)))
