#!/usr/bin/env bb
;; skill-end.bb — thin fence close. One call. Logs telemetry. Never fails.
;; Usage: bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --skill <n> --outcome success --session-id <id>

(ns skill-end
  (:require [babashka.fs :as fs]))

(def base (str (System/getenv "HOME") "/.local/share"))
(def log-file (str base "/agent-memory/analytics/skills.jsonl"))

(defn arg-val [args k]
  (second (first (filter #(= (first %) k) (partition 2 args)))))

(defn -main [& args]
  (let [a (vec args)
        skill (or (arg-val a "--skill") "unknown")
        outcome (or (arg-val a "--outcome") "unknown")
        sid (or (arg-val a "--session-id") "none")
        line (pr-str {:t (System/currentTimeMillis) :skill skill :outcome outcome :sid sid})]
    (try
      (fs/create-dirs (str base "/agent-memory/analytics"))
      (spit log-file (str line "\n") :append true)
      (catch Exception e
        (binding [*out* *err*] (println "skill-end warn: log skip"))))))

(apply -main *command-line-args*)
