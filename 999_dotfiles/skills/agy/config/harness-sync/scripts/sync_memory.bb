#!/usr/bin/env bb

(ns sync-memory
  (:require [babashka.fs :as fs]
            [babashka.process :as p]))

;; Delegate directly to sync_harness.bb engine
(defn -main [& args]
  (let [script (fs/file (fs/parent (fs/canonicalize *file*)) "sync_harness.bb")]
    (apply p/shell "bb" (str script) args)))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
