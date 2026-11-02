#!/usr/bin/env bb
;; skill-end.bb — thin fence close. State-aware telemetry. Never fails.
;; Usage:
;;   bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success
;;   bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --skill <n> --outcome success --session-id <id>

(ns skill-end
  (:require [babashka.fs :as fs]
            [clojure.edn :as edn]
            [clojure.string :as str]))

(def base (str (System/getenv "HOME") "/.local/share"))
(def sess-dir (str base "/agent-memory/sessions"))
(def log-file (str base "/agent-memory/analytics/skills.jsonl"))

(defn arg-val [args k]
  (second (first (filter #(= (first %) k) (partition 2 args)))))

(defn resolve-active-session []
  (try
    (when (fs/exists? sess-dir)
      (let [files (sort-by #(- (.toMillis (fs/last-modified-time %)))
                           (filter fs/regular-file? (fs/list-dir sess-dir)))]
        (when-let [latest (first files)]
          (let [content (str/trim (slurp (str latest)))
                fname (fs/file-name latest)
                parsed (try (edn/read-string content) (catch Exception _ nil))
                session-info (if (and (map? parsed) (:sid parsed))
                               parsed
                               {:sid fname
                                :skill (if (seq content) content (last (str/split fname #"-")))})]
            (assoc session-info :file latest)))))
    (catch Exception _ nil)))

(defn -main [& args]
  (let [a (vec args)
        arg-skill (arg-val a "--skill")
        outcome (or (arg-val a "--outcome") "success")
        arg-sid (arg-val a "--session-id")
        active (resolve-active-session)
        sid (cond
              (and arg-sid (not= arg-sid "none")) arg-sid
              (:sid active) (:sid active)
              :else "none")
        skill (cond
                (and arg-skill (not= arg-skill "unknown")) arg-skill
                (:skill active) (:skill active)
                :else "unknown")
        now (System/currentTimeMillis)
        t0 (:t0 active)
        duration-ms (when t0 (max 0 (- now t0)))
        entry (cond-> {:t now :skill skill :outcome outcome :sid sid}
                duration-ms (assoc :duration-ms duration-ms))
        line (pr-str entry)]
    ;; Clean up session file
    (try
      (when-let [f (:file active)]
        (when (fs/exists? f)
          (fs/delete f)))
      (when (and arg-sid (not= arg-sid "none"))
        (let [named-f (fs/path sess-dir arg-sid)]
          (when (fs/exists? named-f)
            (fs/delete named-f))))
      (catch Exception _ nil))
    ;; Write telemetry log (skip read-only lookups: no active session + unknown skill)
    (try
      (when-not (and (= skill "unknown") (= sid "none"))
        (fs/create-dirs (str base "/agent-memory/analytics"))
        (spit log-file (str line "\n") :append true))
      (catch Exception _
        (binding [*out* *err*] (println "skill-end warn: log skip"))))
    ;; Print status
    (println (format "SKILL_END: %s [%s] (session: %s)" skill outcome sid))))

(apply -main *command-line-args*)
