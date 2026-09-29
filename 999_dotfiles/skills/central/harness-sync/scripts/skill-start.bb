#!/usr/bin/env bb
;; skill-start.bb — thin fence. One call. All skills use it.
;; Emits KEY: value STATUS lines. Never fails. Fast (~15ms).
;; Usage: bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill <name>

(ns skill-start
  (:require [babashka.fs :as fs]
            [clojure.string :as str]))

(def base (str (System/getenv "HOME") "/.local/share"))
(def sess-dir (str base "/agent-memory/sessions"))
(def central-skills (str base "/skills"))

(defn arg-val [args k]
  (second (first (filter #(= (first %) k) (partition 2 args)))))

(defn -main [& args]
  (let [a (vec args)
        skill (or (arg-val a "--skill") "unknown")
        sid (str (System/currentTimeMillis) "-" skill)
        t0 (str (System/currentTimeMillis))]
    (try (fs/create-dirs sess-dir) (catch Exception _ nil))
    (try
      (spit (str sess-dir "/" sid) skill)
      ;; prune files older than 2h
      (doseq [f (try (seq (fs/list-dir sess-dir)) (catch Exception _ nil))]
        (try
          (when (> (- (System/currentTimeMillis)
                      (.toMillis (fs/last-modified-time f)))
                   (* 2 60 60 1000))
            (fs/delete-if-exists f))
          (catch Exception _ nil)))
      (catch Exception _ nil))
    ;; STATUS lines. Prose branches on these.
    (println "SKILL_START_PROTO: 1")
    (println (str "SKILL: " skill))
    (println "SESSION_KIND: interactive")
    (println (str "SESSION_ID: " sid))
    (println (str "TEL_START: " t0))
    (println "SYNC: check with `bb sync_harness.bb --dry-run` if stale")
    (println "PROACTIVE: true")))

(apply -main *command-line-args*)
