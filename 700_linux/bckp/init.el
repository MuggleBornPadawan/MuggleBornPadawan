;; test message - dummy 

;; Init.el - Emacs Initialization File
(setq inhibit-startup-screen t)
(setq initial-scratch-message nil)

;; Package Management
(require 'package)
(add-to-list 'package-archives '("gnu" . "https://elpa.gnu.org/packages/") t)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(package-initialize)

;; Use the `use-package` package for managing other packages
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(require 'use-package)
(setq use-package-always-ensure t)

;; multiple cursors 
(unless (package-installed-p 'multiple-cursors)
  (package-install 'multiple-cursors))
(require 'multiple-cursors)

;; Set line numbers
(global-display-line-numbers-mode t)

;; Enable syntax highlighting
(global-font-lock-mode t)

;; Enable column numbers
(column-number-mode t)

;; Set up basic UI improvements
(menu-bar-mode -1)       ;; Disable the menu bar
(tool-bar-mode -1)       ;; Disable the tool bar
(scroll-bar-mode -1)     ;; Disable the scroll bar

;; Refresh all open buffers from their respective files.
(defun revert-all-buffers ()
  "Refresh all open buffers from their respective files."
  (interactive)
  (dolist (buf (buffer-list))
    (with-current-buffer buf
      (when (and (buffer-file-name) (not (buffer-modified-p)))
        (revert-buffer t t t))))
  (message "All non-modified buffers reverted."))
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
 '(package-selected-packages '(multiple-cursors use-package)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

;; Enable MIT Scheme for Org Babel
(org-babel-do-load-languages
 'org-babel-load-languages
 '((scheme . t)))

;; Set MIT Scheme as the default Scheme implementation
(setq org-babel-scheme-cmd "mit-scheme")

;; Enable JavaScript
(org-babel-do-load-languages
 'org-babel-load-languages
 '((js . t)))
