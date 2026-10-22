#!/usr/bin/env bb

;; git_security_scan.bb
;; Lightweight Git security scanner for lean machines.
;; Enforces zero committed secrets, keys, and policy-banned files (*.db, *.log, auth.json, etc.).
;;
;; Usage:
;;   bb git_security_scan.bb                 # Scan all tracked files in current repo
;;   bb git_security_scan.bb --staged        # Fast scan on staged git changes (for pre-commit)
;;   bb git_security_scan.bb --all           # Scan all tracked files
;;   bb git_security_scan.bb --install-hook  # Install git pre-commit hook in current repo

(ns git-security-scan
  (:require [babashka.cli :as cli]
            [clojure.java.io :as io]
            [clojure.java.shell :refer [sh]]
            [clojure.string :as str]))

;; ANSI color formatting
(def c-red "\033[31m")
(def c-green "\033[32m")
(def c-yellow "\033[33m")
(def c-bold "\033[1m")
(def c-reset "\033[0m")

(defn red [s] (str c-red s c-reset))
(defn green [s] (str c-green s c-reset))
(defn yellow [s] (str c-yellow s c-reset))
(defn bold [s] (str c-bold s c-reset))

;; Policy: Filename blacklist
(def banned-filename-rules
  [{:id :banned-env
    :pattern #"(^|/)\.env(\.[^/]+)?$"
    :desc "Environment file (.env) with potential secrets"}
   {:id :banned-db
    :pattern #"\.(db|sqlite|sqlite3)$"
    :desc "Database file (*.db, *.sqlite) violates repo policy"}
   {:id :banned-log
    :pattern #"\.log$"
    :desc "Log file (*.log) violates repo policy"}
   {:id :banned-ssh-keys
    :pattern #"(^|/)(id_rsa|id_ed25519|id_ecdsa|id_dsa)(\.pub)?$"
    :desc "SSH private or public key file"}
   {:id :banned-cert-keys
    :pattern #"\.(pem|p12|pfx|pkcs12|key)$"
    :desc "Certificate or private key file"}
   {:id :banned-creds
    :pattern #"(^|/)(hosts\.yml|auth\.json|oauth_creds\.json|google_accounts\.json|state\.json)$"
    :desc "Sensitive credential or state file"}])

;; Secret patterns (regex checks on content)
(def secret-patterns
  [{:id :github-pat
    :pattern #"ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{50,}"
    :desc "GitHub Personal Access Token"}
   {:id :google-api
    :pattern #"AIza[0-9A-Za-z\-_]{35}"
    :desc "Google Cloud / Gemini API key"}
   {:id :openai-key
    :pattern #"sk-(?:proj-)?[a-zA-Z0-9_-]{20,}"
    :desc "OpenAI API key"}
   {:id :anthropic-key
    :pattern #"sk-ant-[a-zA-Z0-9_-]{20,}"
    :desc "Anthropic API key"}
   {:id :aws-access-key
    :pattern #"(?:AKIA|ASIA)[0-9A-Z]{16}"
    :desc "AWS Access Key ID"}
   {:id :slack-token
    :pattern #"xox[baprs]-[0-9a-zA-Z]{10,}"
    :desc "Slack Token"}
   {:id :private-key-header
    :pattern #"-----BEGIN (?:[A-Z0-9_-]+ )?PRIVATE KEY-----"
    :desc "Private Key Header block"}])

;; Placeholder patterns to ignore (documentation / examples)
(def ignore-placeholders
  [#"(?i)dummy"
   #"(?i)example"
   #"(?i)your_api_key"
   #"(?i)<key>"
   #"(?i)<token>"
   #"(?i)xxx+"])

(defn git-cmd [& args]
  (let [res (apply sh "git" args)]
    (if (zero? (:exit res))
      (str/trim (:out res))
      (throw (ex-info (str "Git command failed: " (str/join " " args)) res)))))

(defn git-repo-root []
  (try
    (git-cmd "rev-parse" "--show-toplevel")
    (catch Exception _
      nil)))

(defn binary-file? [path]
  (let [f (io/file path)]
    (if (.exists f)
      (try
        (with-open [in (io/input-stream f)]
          (let [buf (byte-array 1024)
                n (.read in buf)]
            (if (pos? n)
              (boolean (some #(zero? (byte %)) (take n buf)))
              false)))
        (catch Exception _ false))
      false)))

(defn check-filenames [files]
  (reduce
   (fn [acc file]
     (let [matched (filter #(re-find (:pattern %) file) banned-filename-rules)]
       (if (seq matched)
         (concat acc (map (fn [m] {:file file
                                   :line 0
                                   :desc (:desc m)
                                   :type :filename
                                   :snippet file})
                          matched))
         acc)))
   []
   files))

(defn placeholder-line? [line]
  (or (str/includes? line "git-security: allow")
      (str/includes? line "git-security: ignore")
      (some #(re-find % line) ignore-placeholders)))

(defn scan-text-line [line line-no file]
  (when-not (placeholder-line? line)
    (keep (fn [sp]
            (when-let [m (re-find (:pattern sp) line)]
              (let [matched-str (if (string? m) m (first m))]
                ;; Mask middle characters for safe display
                (let [len (count matched-str)
                      masked (if (> len 8)
                               (str (subs matched-str 0 4) "..." (subs matched-str (- len 4)))
                               "***")]
                  {:file file
                   :line line-no
                   :desc (:desc sp)
                   :type :content
                   :snippet masked}))))
          secret-patterns)))

(defn scan-file-content [file]
  (let [f (io/file file)]
    (if (and (.exists f) (not (binary-file? file)))
      (try
        (with-open [rdr (io/reader f)]
          (doall
           (flatten
            (keep-indexed
             (fn [idx line]
               (scan-text-line line (inc idx) file))
             (line-seq rdr)))))
        (catch Exception _ []))
      [])))

(defn scan-staged-content [file]
  (try
    (let [diff-out (git-cmd "diff" "--cached" "-U0" "--" file)
          lines (str/split-lines diff-out)]
      (flatten
       (keep
        (fn [line]
          (when (and (str/starts-with? line "+")
                     (not (str/starts-with? line "+++")))
            (scan-text-line (subs line 1) 0 file)))
        lines)))
    (catch Exception _ [])))

(defn get-staged-files []
  (let [out (git-cmd "diff" "--cached" "--name-only" "--diff-filter=d")]
    (if (str/blank? out)
      []
      (str/split-lines out))))

(defn get-all-tracked-files []
  (let [out (git-cmd "ls-files")]
    (if (str/blank? out)
      []
      (str/split-lines out))))

(defn install-pre-commit-hook []
  (let [root (git-repo-root)]
    (if-not root
      (do
        (println (red "Error: Not inside a git repository."))
        (System/exit 1))
      (let [hooks-dir (io/file root ".git" "hooks")
            hook-file (io/file hooks-dir "pre-commit")
            script-path (str (io/file root "700_linux" "scripts" "git_security_scan.bb"))
            content (str "#!/usr/bin/env bash\n"
                         "# Auto-generated git security scanner hook\n"
                         "set -e\n"
                         "bb \"" script-path "\" --staged\n")]
        (.mkdirs hooks-dir)
        (spit hook-file content)
        (sh "chmod" "+x" (.getAbsolutePath hook-file))
        (println (green (str "✔ Pre-commit hook installed at: " (.getAbsolutePath hook-file))))
        (println (str "  Hook executes: bb " script-path " --staged"))))))

(defn print-report [violations mode total-files]
  (println (bold "=== Git Security Audit ==="))
  (println (str "Mode:        " (yellow (name mode))))
  (println (str "Files tested: " total-files))
  (if (empty? violations)
    (do
      (println (green "\n✔ PASS: No secrets or policy violations detected."))
      (System/exit 0))
    (do
      (println (red (str "\n✖ FAIL: Found " (count violations) " violation(s):")))
      (println (str (format "%-35s %-6s %-30s %s" "FILE" "LINE" "RULE" "SNIPPET")))
      (println (apply str (repeat 85 "-")))
      (doseq [v violations]
        (let [l (if (zero? (:line v)) "-" (str (:line v)))]
          (println (format "%-35s %-6s %-30s %s"
                           (:file v)
                           l
                           (:desc v)
                           (red (:snippet v))))))
      (println (apply str (repeat 85 "-")))
      (println (bold (red "\nCommit blocked: Remediate the violations above before proceeding.")))
      (println "Tips:")
      (println "  - Untrack policy files:  git rm --cached <file>")
      (println "  - Remove secrets:       Store secrets in `pass` or env variables.")
      (println "  - False positives:      Append `;; git-security: allow` to bypass.")
      (System/exit 1))))

(def cli-spec
  {:spec
   {:staged {:alias :s :desc "Scan only staged files (for pre-commit)" :coerce :boolean}
    :all    {:alias :a :desc "Scan all tracked files in git" :coerce :boolean}
    :install-hook {:desc "Install pre-commit hook into current repository" :coerce :boolean}
    :help   {:alias :h :desc "Show help" :coerce :boolean}}})

(defn -main [& args]
  (let [opts (cli/parse-opts args cli-spec)]
    (cond
      (:help opts)
      (do
        (println "Git Security Scanner (Babashka)")
        (println "Checks repos for secrets, tokens, private keys, and banned policy files.")
        (println "\nOptions:")
        (println (cli/format-opts cli-spec)))

      (:install-hook opts)
      (install-pre-commit-hook)

      :else
      (let [root (git-repo-root)]
        (if-not root
          (do
            (println (red "Error: Not a git repository."))
            (System/exit 1))
          (let [staged? (:staged opts)
                mode (if staged? :staged :all)
                files (if staged? (get-staged-files) (get-all-tracked-files))]
            (if (empty? files)
              (do
                (println (bold "=== Git Security Audit ==="))
                (println (green "✔ No files to scan.")))
              (let [file-violations (check-filenames files)
                    content-violations
                    (flatten
                     (map (if staged? scan-staged-content scan-file-content)
                          files))
                    all-violations (concat file-violations content-violations)]
                (print-report all-violations mode (count files))))))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
