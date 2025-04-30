;; this file is not updated regularly. check cloud backup for the most recent version
;; this base file is created for use-and-throw linux vms / containers 

;; init.el - emacs initialization file
(setq inhibit-startup-screen t)
(setq initial-scratch-message nil)

;; package management
(require 'package)
(add-to-list 'package-archives '("gnu" . "https://elpa.gnu.org/packages/") t)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(package-initialize)

;; use the `use-package` package for managing other packages
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(require 'use-package)
(setq use-package-always-ensure t)

;; multiple cursors 
(unless (package-installed-p 'multiple-cursors)
  (package-install 'multiple-cursors))
(require 'multiple-cursors)

;; set line numbers
(global-display-line-numbers-mode t)

;; enable syntax highlighting
(global-font-lock-mode t)

;; enable column numbers
(column-number-mode t)

;; set up basic UI improvements
(menu-bar-mode -1)       ;; Disable the menu bar
(tool-bar-mode -1)       ;; Disable the tool bar
(scroll-bar-mode -1)     ;; Disable the scroll bar

;; refresh all open buffers from their respective files.
(defun revert-all-buffers ()
  "refresh all open buffers from their respective files."
  (interactive)
  (dolist (buf (buffer-list))
    (with-current-buffer buf
      (when (and (buffer-file-name) (not (buffer-modified-p)))
        (revert-buffer t t t))))
  (message "all non-modified buffers reverted."))
(global-set-key (kbd "C-c R") 'revert-all-buffers)  ;; Bind to Ctrl + c, Shift + r

;; initial frame setup - experiment 
(toggle-frame-fullscreen)
(global-visual-line-mode 1) ;; soft wrap text globally
(recentf-mode 1) ;; recent files history is saved 
(savehist-mode 1) ;; recent commands history is saved | use Mn (next-history-element) Mp (previous-history-element) 
(setq history-length 25) ;; saves n recent commands 
(save-place-mode 1) ;; saves cursor location on files 
(global-auto-revert-mode 1) ;; refreshes all buffers
(setq global-auto-revert-non-file-buffers t) ;; refreshes non-file buffers (eg: folders)

; list buffers
(split-window-horizontally)
(list-buffers)

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(magit geiser multiple-cursors use-package)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

;; enable mit scheme, js, python for org babel
(org-babel-do-load-languages
 'org-babel-load-languages
 '((scheme . t)))

;; set mit scheme as the default Scheme implementation
(setq org-babel-scheme-cmd "mit-scheme")

;; Don't ask for confirmation when executing code blocks
;;(setq org-confirm-babel-evaluate nil)
