#!/usr/bin/env bb
;; test_skill_io.bb — roundtrip: skill-start -> skill-end writes one clean row.
;; Backs up analytics log, restores after. No pollution.
(ns test-skill-io
  (:require [babashka.fs :as fs]
            [babashka.process :refer [sh]]
            [clojure.string :as str]))

(def home (str (fs/home)))
(def scripts (str home "/.local/share/skills/harness-sync/scripts"))
(def log-file (str home "/.local/share/agent-memory/analytics/skills.jsonl"))
(def bak-file (str log-file ".test-bak"))

(defn run [& args]
  (:out (apply sh (into ["bb"] args))))

(defn -main [& _]
  (println "=== Skill IO Roundtrip ===")
  (let [had-log (fs/exists? log-file)]
    (when had-log (fs/copy log-file bak-file {:replace-existing true}))
    (try
      (let [out (run (str scripts "/skill-start.bb") "--skill" "lint-probe")
            sid (second (re-find #"SESSION_ID: (\S+)" out))]
        (println "start:" (str/trim (or out "")))
        (assert sid "no SESSION_ID from skill-start")
        (let [end-out (run (str scripts "/skill-end.bb")
                           "--skill" "lint-probe" "--outcome" "success"
                           "--session-id" sid)]
          (println "end:" (str/trim end-out)))
        (let [rows (str/split-lines (slurp log-file))
              hit (filter #(and (str/includes? % "lint-probe")
                                (str/includes? % sid)) rows)]
          (if (= 1 (count hit))
            (println "PASS: one clean row for" sid)
            (do (println "FAIL: expected 1 row, found" (count hit))
                (System/exit 1))))
        ;; Guard: unknown + no-session must not append
        (let [n0 (count (str/split-lines (slurp log-file)))]
          (run (str scripts "/skill-end.bb") "--outcome" "success")
          (let [n1 (count (str/split-lines (slurp log-file)))]
            (if (= n0 n1)
              (println "PASS: unknown/no-session skipped log")
              (do (println "FAIL: noise row written") (System/exit 1))))))
      (finally
        (if had-log
          (do (fs/move bak-file log-file {:replace-existing true})
              (println "log restored"))
          (when (fs/exists? bak-file) (fs/delete bak-file)))))
    (println "IO PASS")))
(when (= *file* (System/getProperty "babashka.file")) (apply -main *command-line-args*))
