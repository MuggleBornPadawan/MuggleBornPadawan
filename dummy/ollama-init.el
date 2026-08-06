;;; ollama-init.el --- Emacs Init File for gptel (Ollama Llama 3.2)  -*- lexical-binding: t; -*-

;; Ensure packages are initialized
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(package-initialize)

;; Bootstrap gptel if it is not already installed
(unless (package-installed-p 'gptel)
  (message "gptel not found. Installing from MELPA...")
  (package-refresh-contents)
  (package-install 'gptel))

(require 'gptel)

;; Configure gptel to use Ollama with llama3.2
;; The parameters are set for highly creative answers:
;; - temperature: 1.4 (Higher values increase randomness/creativity, up from default 0.8)
;; - top_p: 0.99 (Allows almost all tokens to be considered, up from default 0.9)
;; - top_k: 120 (Allows the model to draw from a wider pool of candidate tokens, up from default 40)
(setq gptel-backend
      (gptel-make-ollama "Ollama"
        :host "localhost:11434"
        :stream t
        :models '("llama3.2")
        :request-params '(:options (:temperature 0.81
                                    :top_p 0.91
                                    :top_k 41))))

;; Set default backend and model for gptel
(setq gptel-model "llama3.2"
      gptel-backend gptel-backend)

;; Bind C-c g s to gptel-send globally
(global-set-key (kbd "C-c g s") #'gptel-send)

(message "Ollama backend initialized for gptel (llama3.2)")

(provide 'ollama-init)
;;; ollama-init.el ends here
