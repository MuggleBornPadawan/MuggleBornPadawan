#!/usr/bin/env bb
;; backup_push.bb - Backup dotfiles and push chromebook + main
;; Usage:
;;   bb backup_push.bb [--dry-run] [--verbose] ["commit message"]
;;   bb backup_push.bb --help
;; Design: lean, safe, mirrors dotfiles-sync SKILL.md steps in pure Babashka

(ns backup-push
  (:require [babashka.process :refer [shell]]
            [babashka.fs :as fs]
            [clojure.string :as str]
            [clojure.tools.cli :as cli]))

(def repo-dir (str (fs/home) "/MuggleBornPadawan"))
(def dotfiles-bb (str repo-dir "/700_linux/bckp/dotfiles.bb"))

(defn log-msg [& msgs]
  (let [ts (.format (java.time.LocalDateTime/now)
                    (java.time.format.DateTimeFormatter/ofPattern "yyyy-MM-dd HH:mm:ss"))]
    (binding [*out* *err*]
      (println (str "[" ts "] " (str/join " " msgs))))))

(defn vlog-msg [verbose? & msgs]
  (when verbose?
    (apply log-msg "[verbose]" msgs)))

(defn- git-run
  "Run git with opts and args. Returns babashka.process result map."
  [opts & args]
  (apply shell (merge {:dir repo-dir :continue true} opts) "git" args))

(defn- git-output
  "Run git and return trimmed stdout string."
  [& args]
  (let [res (apply git-run {:out :string :err :string} args)]
    (str/trim (or (:out res) ""))))

(defn- git-exit
  "Run git and return exit code."
  [& args]
  (let [res (apply git-run {:out :string :err :string} args)]
    (:exit res)))

(defn- print-lines [text max-lines]
  (when (seq (str/trim (or text "")))
    (doseq [l (take max-lines (str/split-lines text))]
      (println l))))

(def cli-options
  [["-d" "--dry-run" "Perform backup dry-run, skip commit and pushes"]
   ["-v" "--verbose" "Verbose logging"]
   ["-h" "--help" "Show help"]])

(defn -main [& args]
  (let [{:keys [options arguments errors summary]} (cli/parse-opts args cli-options)
        {:keys [dry-run verbose help]} options
        msg (last arguments)]
    (when help
      (println "Usage: bb backup_push.bb [--dry-run] [--verbose] [\"commit message\"]")
      (println "  Backup via dotfiles.bb, commit on chromebook, push chromebook+main")
      (println "\nOptions:")
      (println summary)
      (System/exit 0))

    (when errors
      (binding [*out* *err*]
        (doseq [err errors]
          (println err)))
      (System/exit 1))

    (when-not (fs/exists? dotfiles-bb)
      (log-msg "ERROR: not found:" dotfiles-bb)
      (System/exit 1))

    ;; 1. Backup
    (log-msg "Step 1: Backup dotfiles -> 999_dotfiles")
    (let [backup-args (cond-> ["bb" dotfiles-bb]
                        dry-run (conj "--dry-run")
                        verbose (conj "--verbose"))]
      (apply shell backup-args)
      (when dry-run
        (log-msg "(dry-run) backup done, skip commit/push")
        (System/exit 0)))

    ;; 2. Check git status
    (log-msg "Step 2: git status")
    (let [status-out (git-output "status" "--short")
          porcelain-out (git-output "status" "--porcelain")]
      (print-lines status-out 30)
      (let [changes (count (filter #(not (str/blank? %)) (str/split-lines porcelain-out)))]
        (if (zero? changes)
          (do
            (log-msg "Nothing to commit - backup was clean")
            (System/exit 0))
          (do
            (log-msg (str "Changes: " changes " files"))
            (print-lines (git-output "diff" "--stat") 20)))))

    ;; 3. Stage explicit list
    (let [stage-list ["700_linux/bckp"
                      "700_linux/scripts/sysinfo.sh"
                      "999_dotfiles/home"
                      "999_dotfiles/prompts"
                      "999_dotfiles/skills"
                      "999_dotfiles/templates"
                      "999_dotfiles/by-tool"]]
      (log-msg "Step 3: Stage explicit list:" (str/join " " stage-list))
      (doseq [p stage-list]
        (when (fs/exists? (str repo-dir "/" p))
          (git-exit "add" p)))
      (let [diff-unmerged (git-exit "diff" "--quiet")]
        (when-not (zero? diff-unmerged)
          (log-msg "Note: some tracked files still unstaged (not in manifest) - not adding:")
          (print-lines (git-output "diff" "--name-only") 20)))
      (let [cached-names (filter #(not (str/blank? %))
                                 (str/split-lines (git-output "diff" "--cached" "--name-only")))]
        (when (zero? (count cached-names))
          (log-msg "Nothing staged after explicit add - check git status")
          (print-lines (git-output "status" "--short") 20)
          (System/exit 1))
        (print-lines (git-output "diff" "--cached" "--stat") 30)))

    ;; 4. Ensure on chromebook
    (let [cur-branch (git-output "rev-parse" "--abbrev-ref" "HEAD")]
      (log-msg "Current branch:" cur-branch)
      (when (not= cur-branch "chromebook")
        (log-msg "Checkout chromebook")
        (let [res (git-run {:out :string :err :string} "checkout" "chromebook")]
          (print-lines (str (:out res) "\n" (:err res)) 5))))

    (let [today (str (java.time.LocalDate/now))
          commit-msg (if (and msg (not (str/blank? msg)))
                       msg
                       (str "chore: dotfiles backup " today))]
      (log-msg "Step 4: Commit on chromebook:" commit-msg)
      (let [res (git-run {:out :string :err :string} "commit" "-m" commit-msg)]
        (print-lines (str (:out res) "\n" (:err res)) 10)
        (when-not (zero? (:exit res))
          (log-msg "Commit failed.")
          (System/exit (:exit res))))
      (let [commit-hash (git-output "rev-parse" "--short" "HEAD")]
        (log-msg "Committed:" commit-hash)

        ;; 5. Push chromebook
        (log-msg "Step 5: Push chromebook -> origin/chromebook")
        (let [res (git-run {:out :string :err :string} "push" "origin" "chromebook")]
          (print-lines (str (:out res) "\n" (:err res)) 10)
          (if (zero? (:exit res))
            (log-msg "Push chromebook OK")
            (do
              (log-msg "Push chromebook FAILED")
              (System/exit (:exit res)))))

        ;; 6. Merge to main
        (log-msg "Step 6: Merge chromebook -> main")
        (let [co-main (git-run {:out :string :err :string} "checkout" "main")]
          (print-lines (str (:out co-main) "\n" (:err co-main)) 5))
        (git-run {:out :string :err :string} "fetch" "origin")
        (when (zero? (git-exit "merge-base" "--is-ancestor" "HEAD" "chromebook"))
          (vlog-msg verbose "chromebook is ahead of main, fast-forward merge expected"))
        (let [merge-res (git-run {:out :string :err :string} "merge" "chromebook" "--no-edit")]
          (print-lines (str (:out merge-res) "\n" (:err merge-res)) 10)
          (when-not (zero? (:exit merge-res))
            (log-msg "Merge failed. Check conflicts.")
            (System/exit (:exit merge-res))))
        (let [merged-hash (git-output "rev-parse" "--short" "HEAD")]
          (log-msg "Merge result:" merged-hash))

        (log-msg "Push main -> origin/main")
        (let [push-main-res (git-run {:out :string :err :string} "push" "origin" "main")]
          (print-lines (str (:out push-main-res) "\n" (:err push-main-res)) 10)
          (if (zero? (:exit push-main-res))
            (log-msg "Push main OK")
            (do
              (log-msg "Push main FAILED")
              (System/exit (:exit push-main-res)))))

        (let [co-cb (git-run {:out :string :err :string} "checkout" "chromebook")]
          (print-lines (str (:out co-cb) "\n" (:err co-cb)) 5))
        (log-msg "Back on chromebook")

        ;; 7. Verify
        (log-msg "Step 7: Verify")
        (print-lines (git-output "branch" "-vv") 10)
        (print-lines (git-output "status" "--short") 10)
        (log-msg "Done:" commit-hash "on both chromebook and main, pushed to origin")))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
