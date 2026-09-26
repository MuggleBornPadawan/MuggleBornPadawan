#!/usr/bin/env bb
;; dotfiles.bb - Manifest-driven backup & restore for dotfiles, skills, and prompts
;; Stack: Lean Clojure / Babashka (starts in ~15 ms, ~30 MB RAM)
;; Manifest: manifest.edn (Single Source of Truth)

(ns dotfiles
  (:require [babashka.fs :as fs]
            [babashka.process :as p]
            [clojure.edn :as edn]
            [clojure.string :as str])
  (:import [java.time LocalDateTime]
           [java.time.format DateTimeFormatter]))

(defn now-str []
  (.format (LocalDateTime/now) (DateTimeFormatter/ofPattern "yyyy-MM-dd HH:mm:ss")))

(defn ts-compact []
  (.format (LocalDateTime/now) (DateTimeFormatter/ofPattern "yyyyMMdd_HHmmss")))

(defn log [& msgs]
  (binding [*out* *err*]
    (println (str "[" (now-str) "] " (str/join " " msgs)))))

(defn vlog [verbose? & msgs]
  (when verbose?
    (apply log "[verbose]" msgs)))

(defn err [& msgs]
  (binding [*out* *err*]
    (println (str "[ERROR] " (str/join " " msgs)))))

(defn expand-home [p]
  (let [home (System/getProperty "user.home")]
    (if (str/starts-with? p "~")
      (str/replace-first p #"^~" home)
      p)))

(defn load-manifest [script-dir]
  (let [manifest-file (fs/file script-dir "manifest.edn")]
    (if (fs/exists? manifest-file)
      (edn/read-string (slurp manifest-file))
      (throw (ex-info (str "Manifest not found: " manifest-file) {})))))

(defn rsync-cmd [{:keys [src dst dir? dry-run? verbose? excludes]}]
  (let [opts (cond-> ["-a"]
               dir? (conj "--delete")
               verbose? (conj "-v")
               dry-run? (conj "--dry-run" "--itemize-changes"))
        exclude-opts (mapcat #(vector (str "--exclude=" %)) excludes)
        src-arg (if dir? (str (str/replace src #"/+$" "") "/") src)
        dst-arg (if dir? (str (str/replace dst #"/+$" "") "/") dst)]
    (concat ["rsync"] opts exclude-opts [src-arg dst-arg])))

(defn run-backup-pair! [dest-root excludes {:keys [dry-run? verbose?]} stats pair]
  (let [src-raw (:src pair)
        dst-rel (:dest pair)
        src (expand-home src-raw)
        dst (str dest-root "/" dst-rel)
        label (fs/file-name src)]
    (if-not (fs/exists? src)
      (do
        (err (str "[" label "] skip: not found " src))
        (swap! stats update :skipped inc))
      (do
        ;; Ensure parent destination directory exists
        (let [parent-dir (if (fs/directory? src) (fs/path dst) (fs/parent dst))]
          (when parent-dir
            (fs/create-dirs parent-dir)))
        (log (str "[" label "] " src " -> " dst))
        (let [cmd (rsync-cmd {:src src :dst dst :dir? (fs/directory? src)
                              :dry-run? dry-run? :verbose? verbose?
                              :excludes excludes})
              {:keys [exit out err]} (apply p/shell {:continue true :out :string :err :string} cmd)]
          (when (and (seq out) (or verbose? dry-run?))
            (binding [*out* *err*] (print out)))
          (when (seq err)
            (binding [*out* *err*] (print err)))
          (if (zero? exit)
            (do
              (when-not dry-run?
                (if (fs/directory? src)
                  (let [dc (count (filter fs/regular-file? (fs/glob dst "**")))]
                    (log (str "[" label "] verify: dst " dc " files")))
                  (when (fs/exists? dst)
                    (log (str "[" label "] verify: " (fs/size dst) " bytes")))))
              (swap! stats update :succeeded inc))
            (do
              (err (str "[" label "] rsync fail"))
              (swap! stats update :failed inc))))))))

(defn run-backup! [manifest {:keys [dry-run? verbose?] :as opts}]
  (let [dest-root (expand-home (:dest-root manifest))
        excludes (:excludes manifest)
        pairs (:pairs manifest)
        stats (atom {:succeeded 0 :skipped 0 :failed 0})]
    (fs/create-dirs dest-root)
    (log (str "Start dotfiles backup -> " dest-root " (dry_run=" dry-run? ")"))
    (doseq [pair pairs]
      (run-backup-pair! dest-root excludes opts stats pair))
    (log "────────────────────────────────────────")
    (log (str "Done: " (:succeeded @stats) " ok, "
              (:skipped @stats) " skipped, "
              (:failed @stats) " failed / "
              (count pairs) " total"))
    (let [home (System/getProperty "user.home")
          repo-git (fs/file home "MuggleBornPadawan/.git")]
      (when (fs/exists? repo-git)
        (log (str "Tip: cd ~/MuggleBornPadawan && git status --short && "
                  "git add 700_linux/bckp 999_dotfiles/home 999_dotfiles/templates "
                  "999_dotfiles/skills 999_dotfiles/prompts && "
                  "git commit -m 'chore: dotfiles backup "
                  (.format (LocalDateTime/now) (DateTimeFormatter/ofPattern "yyyy-MM-dd")) "'"))))
    (when (pos? (:failed @stats))
      (System/exit 1))))

(defn should-restore? [filters target-path]
  (if (empty? filters)
    true
    (let [base (str (fs/file-name target-path))]
      (some #(or (= base %) (str/includes? target-path %)) filters))))

(defn run-restore-pair! [dest-root excludes ts {:keys [dry-run? verbose?]} stats pair]
  (let [home-target (expand-home (:src pair))
        bkp-abs (str dest-root "/" (:dest pair))
        label (str (fs/file-name home-target))]
    (cond
      ;; Skip compatibility mirrors to avoid duplicate overwrites on symlinked directories
      (:compat? pair)
      (vlog verbose? (str "skip compat mirror: " (:dest pair)))

      (not (fs/exists? bkp-abs))
      (do
        (vlog verbose? (str "skip missing backup: " bkp-abs))
        (swap! stats update :skipped inc))

      :else
      (do
        (log (str "[" label "] " bkp-abs " -> " home-target))
        (if dry-run?
          (let [cmd (rsync-cmd {:src bkp-abs :dst home-target :dir? (fs/directory? bkp-abs)
                                :dry-run? true :verbose? true :excludes excludes})
                {:keys [out err]} (apply p/shell {:continue true :out :string :err :string} cmd)]
            (when (seq out) (binding [*out* *err*] (print out)))
            (when (seq err) (binding [*out* *err*] (print err)))
            (swap! stats update :succeeded inc))
          (do
            ;; Backup original file/directory if it exists
            (when (fs/exists? home-target)
              (let [bak (str home-target ".bak." ts)]
                (try
                  (p/shell {:continue true} "cp" "-a" home-target bak)
                  (log (str "  backup original -> " bak))
                  (catch Exception _ nil))))
            ;; Ensure parent directory exists
            (let [parent-dir (if (fs/directory? bkp-abs) (fs/path home-target) (fs/parent home-target))]
              (when parent-dir
                (fs/create-dirs parent-dir)))
            (let [cmd (rsync-cmd {:src bkp-abs :dst home-target :dir? (fs/directory? bkp-abs)
                                  :dry-run? false :verbose? verbose? :excludes excludes})
                  {:keys [exit out err]} (apply p/shell {:continue true :out :string :err :string} cmd)]
              (when (and (seq out) verbose?) (binding [*out* *err*] (print out)))
              (when (seq err) (binding [*out* *err*] (print err)))
              (if (zero? exit)
                (swap! stats update :succeeded inc)
                (do
                  (err (str "[" label "] restore failed"))
                  (swap! stats update :failed inc))))))))))

(defn run-restore! [manifest {:keys [dry-run? force? filters] :as opts}]
  (let [dest-root (expand-home (:dest-root manifest))
        excludes (:excludes manifest)
        pairs (:pairs manifest)
        filtered-pairs (filter #(should-restore? filters (expand-home (:src %))) pairs)
        stats (atom {:succeeded 0 :skipped 0 :failed 0})
        ts (ts-compact)]
    (when (empty? filtered-pairs)
      (log "No matching items for filter: " (str/join ", " filters))
      (System/exit 0))
    (when-not (or force? dry-run?)
      (println (str "Restore will overwrite HOME files from " dest-root))
      (println (str "Filter: " (if (seq filters) (str/join ", " filters) "(all)")))
      (print "Continue? [y/N] ")
      (flush)
      (let [ans (read-line)]
        (when-not (re-matches #"(?i)y|yes" (str/trim (or ans "")))
          (println "Abort")
          (System/exit 1))))
    (log (str "Start restore " dest-root " -> HOME (dry_run=" dry-run? ")"))
    (doseq [pair filtered-pairs]
      (run-restore-pair! dest-root excludes ts opts stats pair))
    (log "────────────────────────────────────────")
    (log (str "Restore done: " (:succeeded @stats) " ok, "
              (:skipped @stats) " skipped, "
              (:failed @stats) " failed / "
              (count filtered-pairs) " total"))
    (log "Tip: run `bb ~/.local/share/skills/harness-sync/scripts/sync_harness.bb` to ensure all harness symlinks are updated.")
    (log "Tip: source ~/.bashrc or restart shell.")
    (when (pos? (:failed @stats))
      (System/exit 1))))

(defn parse-args [args]
  (loop [remaining args
         opts {:dry-run? false :verbose? false :restore? false :force? false :filters []}]
    (if (empty? remaining)
      opts
      (let [arg (first remaining)]
        (case arg
          "--dry-run" (recur (rest remaining) (assoc opts :dry-run? true))
          ("--verbose" "-v") (recur (rest remaining) (assoc opts :verbose? true))
          ("--restore" "-r") (recur (rest remaining) (assoc opts :restore? true))
          ("--force" "-f") (recur (rest remaining) (assoc opts :force? true))
          ("-h" "--help")
          (do
            (println "Usage: dotfiles.bb [options] [filters...]")
            (println "       dotfiles.sh [options] [filters...]")
            (println "")
            (println "Options:")
            (println "  --dry-run       Show actions without modifying files")
            (println "  -v, --verbose   Verbose logging")
            (println "  -r, --restore   Restore files from 999_dotfiles into HOME")
            (println "  -f, --force     Skip confirmation prompt on restore")
            (println "  -h, --help      Show this help message")
            (println "")
            (println "Manifest: manifest.edn in script directory")
            (System/exit 0))
          (if (str/starts-with? arg "-")
            (do (err (str "Unknown argument: " arg)) (System/exit 1))
            (recur (rest remaining) (update opts :filters conj arg))))))))

(defn -main [& args]
  (let [opts (parse-args args)
        script-dir (fs/parent (fs/canonicalize (or *file* ".")))
        manifest (load-manifest script-dir)]
    (if (:restore? opts)
      (run-restore! manifest opts)
      (run-backup! manifest opts))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
