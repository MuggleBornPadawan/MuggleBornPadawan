#!/usr/bin/env bb

(ns sync-pi
  (:require [babashka.fs :as fs]
            [clojure.java.io :as io]
            [clojure.string :as str]))

(def pi-dir (fs/expand-home "~/.pi/agent"))
(def gemini-config-dir (fs/expand-home "~/.gemini/config"))
(def gemini-skills-dir (fs/path gemini-config-dir "skills"))

(def prompt-map
  {"healthcheck.md"      {:name "healthcheck"
                          :title "System Healthcheck (Lean Box)"
                          :desc "Run sysinfo.sh --tech and evaluate system health table against lean box thresholds (RAM, disk, load, Clojure stack, Antigravity)."}
   "git-sync.md"         {:name "git-sync"
                          :title "Git Branch & Main Synchronizer"
                          :desc "Add, commit, push current branch, and merge into main branch safely."}
   "commit.md"           {:name "git-commit"
                          :title "Conventional Git Commit Assistant"
                          :desc "Analyze staged or working tree diffs and propose conventional commit messages following project standards."}
   "review.md"           {:name "code-review"
                          :title "Code Review & Quality Audit"
                          :desc "Review git diff or files for bugs, security vulnerabilities, performance, and Clojure/lean-machine conventions."}
   "test.md"             {:name "clojure-test"
                          :title "Test Authoring & Verification (Clojure / Polyglot)"
                          :desc "Write and run tests adhering to Clojure/lean-machine conventions, public ns seams, and bb/clojure.test."}
   "onboard.md"          {:name "onboard"
                          :title "Codebase Onboarding & Architectural Overview"
                          :desc "Give a concise (<60 lines) newcomer's tour of the codebase: purpose, layout, entry points, key modules, conventions, and gotchas."}
   "changelog.md"        {:name "changelog"
                          :title "Changelog Generator"
                          :desc "Generate or update Keep a Changelog entries from recent git tags, commits, and diffs."}
   "cleanup.md"          {:name "cleanup"
                          :title "Codebase Cleanup & Dead Code Removal"
                          :desc "Identify and clean dead code, unused functions, obsolete comments, and leftover debug statements without altering behavior."}
   "docs.md"             {:name "docs-writer"
                          :title "Documentation & Docstring Generator"
                          :desc "Generate or update documentation, docstrings, and API specs for exported functions and modules."}
   "explain.md"          {:name "explain-code"
                          :title "Code Architecture & Flow Explainer"
                          :desc "Explain code structure, purpose, key components, data flow, and potential gotchas concisely."}
   "find-bugs.md"        {:name "find-bugs"
                          :title "Proactive Bug Hunting & Vulnerability Scanner"
                          :desc "Proactively hunt for edge cases, error handling flaws, concurrency issues, and resource leaks."}
   "fix.md"              {:name "fix-issue"
                          :title "Issue Diagnosis & Surgical Fix Protocol"
                          :desc "Diagnose root causes and apply minimal surgical fixes with test verification and Clojure lean-machine checks."}
   "pr.md"               {:name "pr-prep"
                          :title "Pull Request Preparation"
                          :desc "Prepare a clean GitHub pull request title and description from merge-base diffs."}
   "refactor.md"         {:name "refactor-code"
                          :title "Incremental Code Refactorer"
                          :desc "Perform safe, incremental code refactoring without changing public behavior or adding features."}
   "pick-model.md"       {:name "pick-model"
                          :title "Pareto Model Selector"
                          :desc "Analyze a task and recommend the optimal model from the Pareto frontier."}
   "sync-free-models.md" {:name "sync-free-models"
                          :title "Sync Free & Zero-Cost Models"
                          :desc "Sync opencode free and zero-cost models into scoped models in settings."}
   "simplify.md"         {:name "code-simplify"
                          :title "Code Simplification & YAGNI Audit"
                          :desc "Audit code for unnecessary abstractions, premature optimization, and convolution to maximize simplicity."}
   "plan.md"             {:name "task-plan"
                          :title "Task Implementation Planner"
                          :desc "Formulate a step-by-step implementation plan before writing code, flagging risks and trade-offs."}})

(def skill-name-overrides
  {"research" "research-topic"})

(def behavior-replacement
  "## Assistant Behavior & Pairing Identity (Antigravity Gemini)
- You are Antigravity, an agentic AI coding assistant designed by Google DeepMind and powered by Gemini. You are pair programming with the user.
- Respond concisely.
- Always use ASD-STE100 Simplified Technical English.
- Always talk to me like I have ADHD: short sentences, bullet points, clear structure, no long walls of text.
- Stack discipline: Always think in Clojure and Babashka. When pair programming, write all helper scripts, automation, and programs in Clojure / Babashka.
- Create clickable links with `file://` scheme for all modified or referenced files and symbols.
- Tool Guidelines:
  - Use `view_file` to inspect code and configs before editing.
  - Use `replace_file_content` for surgical, minimal edits (never rewrite an entire file when a targeted edit suffices).
  - Use `write_to_file` only for new files.
  - Shell commands: NEVER use `cd`. Respect the working directory parameter.
  - Respect the lean box constraints: Do NOT run memory-heavy commands like `ollama run`, `docker pull`, `clojure -P`, or `lein deps` without asking.")

(defn adapt-tool-references [text]
  (-> text
      (str/replace #"`read`\s+tool" "`view_file` tool")
      (str/replace #"`bash`\s+tool" "`run_command` tool")
      (str/replace #"\(pi has no background agents\)" "(in Antigravity, delegate via `invoke_subagent` with the `research` subagent)")
      (str/replace #"Call the Skill tool twice, for \"([^\"]+)\" and \"([^\"]+)\"" "Activate the `$1` and `$2` skills")))

(defn sync-memory! [dry-run?]
  (let [src-agents (fs/path pi-dir "AGENTS.md")
        target-agents (fs/path gemini-config-dir "AGENTS.md")
        target-gemini (fs/path gemini-config-dir "GEMINI.md")]
    (if-not (fs/exists? src-agents)
      (println "[-] Source memory file not found:" (str src-agents))
      (let [content (slurp (str src-agents))
            adapted (if (str/includes? content "## Assistant Behavior")
                      (str (first (str/split content #"## Assistant Behavior.*")) "\n" behavior-replacement "\n")
                      (str content "\n\n" behavior-replacement "\n"))]
        (if dry-run?
          (println "[Dry-run] Would sync memory to" (str target-agents))
          (do
            (spit (str target-agents) adapted)
            (spit (str target-gemini) adapted)
            (println "[+] Synced memory to" (str target-agents) "and" (str target-gemini))))))))

(defn clean-skill-content [content skill-name]
  (let [m (re-matches #"(?s)^---\s*\n(.*?)\n---\s*\n(.*)$" content)]
    (if m
      (let [fm (nth m 1)
            body (adapt-tool-references (str/trim (nth m 2)))
            desc-m (re-find #"(?s)description:\s*(?:>-|>)?\s*([^\n]+(?:\n\s+[^\n]+)*)" fm)
            desc (if desc-m
                   (-> (nth desc-m 1)
                       (str/replace #"\n\s+" " ")
                       str/trim
                       (str/replace #"^[\"']|[\"']$" ""))
                   (str "Use this skill for " skill-name "."))]
        (str "---\nname: " skill-name "\ndescription: >-\n  " desc "\n---\n\n" body "\n"))
      (str "---\nname: " skill-name "\ndescription: >-\n  Use this skill for " skill-name ".\n---\n\n"
           (adapt-tool-references (str/trim content)) "\n"))))

(defn sync-skills! [dry-run?]
  (let [src-skills-dir (fs/path pi-dir "skills")]
    (when (fs/exists? src-skills-dir)
      (doseq [dir (fs/list-dir src-skills-dir)
              :when (and (fs/directory? dir)
                         (not (str/starts-with? (fs/file-name dir) ".")))]
        (let [raw-name (fs/file-name dir)
              skill-name (get skill-name-overrides raw-name raw-name)
              target-dir (fs/path gemini-skills-dir skill-name)
              skill-file (fs/path dir "SKILL.md")]
          (when (fs/exists? skill-file)
            (if dry-run?
              (println "[Dry-run] Would sync skill:" raw-name "->" (str target-dir))
              (do
                (fs/create-dirs target-dir)
                (let [clean (clean-skill-content (slurp (str skill-file)) skill-name)
                      final-content (cond-> clean
                                      (= skill-name "research-topic")
                                      (str/replace "Do the research sequentially in this session"
                                                   "Investigate primary sources. You may delegate broad research to the `research` subagent via `invoke_subagent`, or perform targeted lookups directly")
                                      (= skill-name "grilling")
                                      (str "\n## Antigravity Interactive Integration\nIn Antigravity, you can use the `ask_question` tool to render structured multiple-choice question sets for the user, or suggest the `/grill-me` slash command.\n"))]
                  (spit (str (fs/path target-dir "SKILL.md")) final-content))
                ;; Copy helper resources, scripts, references (skip agents/ and __pycache__)
                (doseq [sub (fs/list-dir dir)
                        :when (not (contains? #{"SKILL.md" "agents" "__pycache__"} (fs/file-name sub)))]
                  (let [dest (fs/path target-dir (fs/file-name sub))]
                    (if (fs/directory? sub)
                      (fs/copy-tree sub dest {:replace-existing true})
                      (fs/copy sub dest {:replace-existing true}))))
                (println "[+] Synced skill:" skill-name)))))))))

(defn sync-prompts! [dry-run?]
  (let [src-prompts-dir (fs/path pi-dir "prompts")]
    (when (fs/exists? src-prompts-dir)
      (doseq [f (fs/list-dir src-prompts-dir)
              :when (and (fs/regular-file? f) (str/ends-with? (str f) ".md"))]
        (let [fname (fs/file-name f)
              info (get prompt-map fname {:name (str/replace fname #"\.md$" "")
                                          :title (str/replace fname #"\.md$" "")
                                          :desc (str "Workflow for " fname)})
              skill-name (:name info)
              target-dir (fs/path gemini-skills-dir skill-name)
              target-file (fs/path target-dir "SKILL.md")
              raw (slurp (str f))
              body-match (re-matches #"(?s)^---\s*\n.*?\n---\s*\n(.*)$" raw)
              body (adapt-tool-references (str/trim (if body-match (nth body-match 1) raw)))
              content (str "---\nname: " skill-name "\ndescription: >-\n  " (:desc info) "\n---\n\n"
                           "# " (:title info) "\n\n" body "\n")]
          (if dry-run?
            (println "[Dry-run] Would convert prompt:" fname "->" skill-name)
            (do
              (fs/create-dirs target-dir)
              (spit (str target-file) content)
              (println "[+] Converted prompt to skill:" skill-name (str "(/" skill-name ")")))))))))

(defn validate-skills! []
  (let [skills (fs/list-dir gemini-skills-dir)
        total (count (filter fs/directory? skills))]
    (println "[+] Total active skills in Antigravity:" total)
    (doseq [d skills :when (fs/directory? d)]
      (let [sf (fs/path d "SKILL.md")]
        (when-not (fs/exists? sf)
          (println "[!] Warning: missing SKILL.md in" (str d)))))))

(defn -main [& args]
  (let [dry-run? (some #{"--dry-run"} args)]
    (println "=== Pi -> Antigravity Gemini Clojure Lean Sync (Babashka) ===")
    (println "\n--- 1. Synchronizing Memory ---")
    (sync-memory! dry-run?)
    (println "\n--- 2. Synchronizing Skills ---")
    (sync-skills! dry-run?)
    (println "\n--- 3. Synchronizing Prompts ---")
    (sync-prompts! dry-run?)
    (println "\n--- 4. Validating Skills ---")
    (validate-skills!)
    (println "\nBabashka sync complete!")))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
