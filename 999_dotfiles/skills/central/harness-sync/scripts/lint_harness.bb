#!/usr/bin/env bb
;; lint_harness.bb — gate for central store. Fails on drift.
;; Checks: SKILL frontmatter + preamble + close; prompt hint + ARGS binding.
(ns lint-harness
  (:require [babashka.fs :as fs]
            [clojure.string :as str]))

(def home (str (fs/home)))
(def skills-dir (str home "/.local/share/skills"))
(def prompts-dir (str home "/.local/share/agent-prompts"))

(def fails (atom []))
(defn fail! [msg] (swap! fails conj msg) (println "  FAIL:" msg))
(defn ok! [msg] (println "  OK:" msg))

(defn parse-fm [text]
  (let [m (re-find #"(?s)^---\n(.*?)\n---" text)]
    (when m
      (into {}
        (keep (fn [line]
                (when-let [[_ k v] (re-matches #"^([a-zA-Z0-9_-]+):\s*(.*)$" (str/trim line))]
                  [(keyword k) (str/trim v)])))
        (str/split-lines (second m))))))

(defn lint-skills! []
  (println "\n-- Skills --")
  (doseq [d (sort-by #(str (fs/file-name %)) (filter fs/directory? (fs/list-dir skills-dir)))]
    (let [sname (str (fs/file-name d))
          f (str d "/SKILL.md")]
      (if-not (fs/exists? f)
        (fail! (str sname ": missing SKILL.md"))
        (let [t (slurp f)
              fm (parse-fm t)
              desc (:description fm)
              has-start (str/includes? t (str "skill-start.bb --skill " sname))
              has-close (str/includes? t "skill-end.bb")]
          (when (not= (:name fm) sname)
            (fail! (str sname ": frontmatter name mismatch: " (:name fm))))
          (when (or (nil? desc) (< (count desc) 20))
            (fail! (str sname ": description missing/short")))
          (when-not has-start
            (fail! (str sname ": preamble missing skill-start --skill " sname)))
          (when-not has-close
            (fail! (str sname ": missing skill-end close line")))
          (when (and has-start has-close (:name fm))
            (ok! sname)))))))

(defn lint-prompts! []
  (println "\n-- Prompts --")
  (doseq [f (sort (map str (fs/glob prompts-dir "*.md")))]
    (let [pname (str (fs/strip-ext (fs/file-name f)))
          t (slurp f)
          fm (parse-fm t)
          hint (:argument-hint fm)
          has-args (str/includes? t "{{ARGS}}")
          prev-ok (str/includes? t "previous prompt")]
      (when (not= (:name fm) pname)
        (fail! (str pname ": frontmatter name mismatch")))
      (when (nil? (:description fm))
        (fail! (str pname ": missing description")))
      (if (nil? hint)
        (fail! (str pname ": missing argument-hint"))
        (when (and (not has-args) (not prev-ok)
                   (not (str/includes? (or hint "") "empty")))
          (fail! (str pname ": hint " hint " but body lacks {{ARGS}}"))))
      (ok! pname))))

(defn -main [& _]
  (println "=== Harness Lint ===")
  (lint-skills!)
  (lint-prompts!)
  (println "\n----------------")
  (if (seq @fails)
    (do (println (str "LINT FAIL: " (count @fails) " issue(s)")) (System/exit 1))
    (println "LINT PASS")))
(when (= *file* (System/getProperty "babashka.file")) (apply -main *command-line-args*))
