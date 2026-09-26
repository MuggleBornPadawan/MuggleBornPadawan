#!/usr/bin/env bb

(ns sync-memory
  (:require [babashka.fs :as fs]
            [clojure.string :as str]))

(def mem-dir (fs/expand-home "~/.local/share/agent-memory"))
(def core-file (fs/file mem-dir "AGENTS_CORE.md"))
(def tails-dir (fs/file mem-dir "tails"))

(defn build-memory [tail-filename]
  (let [core-text (slurp (str core-file))
        tail-text (slurp (str (fs/file tails-dir tail-filename)))]
    (str (str/trim core-text) "

" (str/trim tail-text) "
")))

(defn sync-memory! []
  (let [gemini-agents   (fs/expand-home "~/.gemini/config/AGENTS.md")
        gemini-gemini   (fs/expand-home "~/.gemini/config/GEMINI.md")
        pi-agents       (fs/expand-home "~/.pi/agent/AGENTS.md")
        opencode-agents (fs/expand-home "~/.config/opencode/AGENTS.md")]
    (println "Merging AGENTS_CORE.md with harness tails...")
    (spit (str gemini-agents) (build-memory "gemini_tail.md"))
    (spit (str gemini-gemini) (build-memory "gemini_tail.md"))
    (spit (str pi-agents)     (build-memory "pi_tail.md"))
    (spit (str opencode-agents) (build-memory "opencode_tail.md"))
    (println "Agent memory synchronized across Gemini, Pi, and OpenCode.")))

(when (= *file* (System/getProperty "babashka.file"))
  (sync-memory!))
