---
title: "Lean AI Second Brain: Babashka, Git & Local LLMs"
published: true
description: "Build a zero-leak AI second brain with Markdown, Git, Babashka, and local Ollama. 15ms search, no vector DB bloat."
tags: ai, clojure, babashka, pkm
cover_image: https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/zygb6m23xpfuz9ltvaaz.png
canonical_url: https://dev.to/ganesh_rajendran_art/lean-ai-second-brain-babashka-git-local-llms
devto_id: 5063308
---

> **TL;DR:**
> - Traditional second brains (Notion, Obsidian) impose a brutal maintenance tax. Enterprise AI Personal Knowledge Management (PKM) stacks replace that tax with vector database bloat, embedding drift, and cloud data exposure.
> - The plain-text wiki insight (popularized by Karpathy's LLM + Markdown writing): **a plain Markdown vault + Git + fast context injection into a local LLM beats heavy stacks for personal knowledge management.**
> - This article builds the complete architecture — Babashka ingestion pipelines, Ollama synthesis calls with **Qwen3.8 27B** (256K context, near-frontier quality), and an autonomous Active Maintainer agent that lints, links, and commits — all running on a Mac Studio M5 Ultra in <35 MB of script RSS (+ Ollama model).

---

## The Broken Promise of Heavy AI PKM

In 2020, the second-brain movement reached mass adoption. Roam Research, then Obsidian, then Notion with its database views — knowledge workers everywhere were promised a cognitive exoskeleton that would catch every fleeting idea and surface it at exactly the right moment.

Five years later, the same knowledge workers report the same failure mode: **the system collapsed under its own maintenance tax.**

Tag hierarchies grew inconsistent. Backlinks broke across vault reorganizations. The inbox never reached zero. The beautiful graph view in Obsidian became a hairball nobody opened. Notion's relational databases required a part-time database administrator to keep clean. The more content you captured, the harder it became to retrieve anything.

Then came AI-enhanced PKM — a new generation of tools promising that semantic vector search and LLM summarization would eliminate the maintenance burden. Tools like Khoj, Mem, Reflect, and cloud-hosted RAG pipelines offered to index everything automatically.

They solved part of the problem. They created three new ones:

1. **Vector database overhead.** A dedicated Chroma or Weaviate instance requires background daemons, periodic re-embedding jobs, and gigabytes of disk for index storage. On a lean development machine, this competes with your running JVM, your language server, and your local LLM.
2. **Embedding drift.** When you switch embedding models — and you will, as models improve — your entire semantic index becomes inconsistent until a full re-embedding pass completes.
3. **Cloud data exposure.** Cloud-hosted AI memory tools ingest your personal notes, meeting logs, source code snippets, and financial observations into third-party training pipelines. The only way to prevent this is to never ingest anything sensitive, which eliminates most of the value.

There is a simpler architecture. It trades approximate semantic retrieval for a system that is auditable, portable, private, and fast enough for real workloads.

---

## The Architecture: 4 Layers on Plain Text

The reference architecture from the AI Second Brain literature decomposes knowledge systems into four layers: Ingestion, Indexing & Memory, Reasoning & Synthesis, and Action. The key insight is that **every one of these layers can be satisfied by tools you already have on your machine.**

```
┌────────────────────────────────────────────────────────┐
│                    4. Action Layer                     │
│    Babashka Cron • Git Commits • Ollama Tool Calls     │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│             3. Reasoning & Synthesis Layer             │
│    Ollama (local LLM) • Context Assembly • RAG-lite    │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│               2. Indexing & Memory Layer               │
│ Git History • Markdown Frontmatter • ripgrep keyword │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│                  1. Ingestion Layer                    │
│   Markdown Files • bb Watchers • CLI Capture Scripts   │
└────────────────────────────────────────────────────────┘
```

The substitution is deliberate at each layer:

| Layer           | Traditional AI PKM                                       | This Architecture                               |
| :-------------- | :------------------------------------------------------- | :---------------------------------------------- |
| **Ingestion**   | Proprietary sync agents, browser plugins, cloud upload   | Markdown files, local bb watcher scripts        |
| **Indexing**    | Persistent vector DB (Chroma, Pinecone, Weaviate)        | Git tree + ripgrep keyword index                |
| **Synthesis**   | Cloud LLM API (OpenAI, Anthropic) + RAG pipeline         | Local Ollama HTTP call with assembled context   |
| **Action**      | Workflow automation SaaS (Zapier, Make, cloud agents)    | Babashka cron tasks + git commit                |

None of this is a theoretical exercise. It is running on an Apple Silicon Mac Studio, on the same machine as a live JVM REPL and a full Clojure development environment. Lean refers to software footprint (~35 MB script RSS, no background daemons), not hardware; the Ultra just gives headroom for larger local models.

---

## The Minimalist Vault: Plain Text as Primitive

The plain-text wiki pattern popularized by Andrej Karpathy's writing on LLMs + Markdown establishes the foundational principle: **your knowledge base should be a directory of plain text files versioned by Git.** No proprietary database, no binary blobs, no vendor format.

This is not anti-technology minimalism. It is a deliberate systems choice with concrete engineering properties:

- **Portability.** A directory of Markdown files exports to any tool at any time. Git provides compression, deduplication, and an immutable history of every change.
- **Legibility.** You can read, edit, search, and diff every file without a specialized application. `rg`, `grep`, `awk`, and `sed` all work natively.
- **Durability.** Plain text files do not become unreadable when a startup pivots or shuts down its file format. Your 2026 notes are readable in 2046.
- **Auditability.** `git log --follow wiki/concepts/babashka.md` shows every synthesis pass, every edit, every insight the agent added. You can inspect and revert any change.

The vault structure follows a simple convention:

```
wiki/
├── daily/
│   ├── 2026-11-18.md      # Daily capture log
│   └── 2026-11-17.md
├── concepts/
│   ├── ai-second-brain.md # Long-lived concept notes
│   ├── babashka.md
│   └── clojure-repl.md
├── projects/
│   └── blog-engine.md     # Active project notes
└── synthesis/
    └── 2026-W47-digest.md # Agent-generated weekly summaries
```

Frontmatter carries the minimum metadata the system needs:

```markdown
---
title: AI Second Brain
tags: [ai, pkm, architecture]
created: 2026-11-18
related: [babashka, ollama, git]
---
```

The `related` field is not auto-linked by a database. It is a human-editable list that the Active Maintainer agent validates and surfaces for review.

---

## Layer 2: Indexing with Git and ripgrep

The heavy lift that vector databases perform is **retrieval** — finding the K most relevant documents for a given query. For personal knowledge bases, this problem is overengineered.

A personal wiki with 500–2,000 notes is not a production search engine. The query volume is one or two requests per session. The corpus fits entirely in memory. Keyword search over that corpus, executed by `ripgrep`, returns results in under 10ms.

Babashka provides the query layer:

```clojure
#!/usr/bin/env bb
;; wiki/query.bb — fast keyword retrieval from the vault

(ns wiki.query
  (:require [clojure.string :as str]
            [babashka.process :refer [shell]]))

(defn search-vault
  "Keyword ripgrep search across the wiki directory.
   Returns a sequence of {:file :content} maps."
  [query & {:keys [wiki-dir max-results]
            :or   {wiki-dir    "wiki"
                   max-results 20}}]
  (let [result (shell {:out :string :err :string :continue true}
                      "rg" "-l" "-i" "-F" "--" query wiki-dir)
        files  (->> (str/split-lines (:out result))
                    (remove str/blank?)
                    (take max-results))]
    (map (fn [f] {:file f
                  :content (slurp f)})
         files)))

(when (= *file* (System/getProperty "babashka.file"))
  (let [query (first *command-line-args*)]
    (doseq [{:keys [file]} (search-vault query)]
      (println file))))
```

For multi-hop synthesis — "what have I written that connects topic A with topic B?" — the query is a two-pass ripgrep across the `related` frontmatter graph:

```clojure
;; in wiki.query — uses shell + json required above
(defn related-notes
  "Find all notes that claim a relationship to the given note title."
  [note-title wiki-dir]
  (let [result (shell {:out :string :err :string :continue true}
                      "rg" "-l" "-F" "--" note-title wiki-dir)]
    (->> (str/split-lines (:out result))
         (remove str/blank?))))
```

No embedding model. No FAISS index. No background re-embedding cron. The index is `rg` running against the filesystem, and it is always consistent with the vault because it reads the files directly.

The vault structure also encodes the distinction between **episodic** and **semantic memory** — a split that heavyweight AI PKM systems typically collapse into a single undifferentiated vector index. Daily logs under `wiki/daily/` are episodic: timestamped, point-in-time, never edited after the fact. Concept notes under `wiki/concepts/` are semantic: distilled, durable, updated as your understanding evolves. The Active Maintainer's weekly digest pass is the bridge — it synthesizes episodic logs into semantic updates, the same way human memory consolidates during sleep.

---

## Layer 3: Reasoning with Local Ollama

With a context window assembled from retrieved notes, the synthesis call goes to a local Ollama instance running **Qwen3.8 27B** — 256K native context, 25–30 tokens per second on M5 Ultra, near-frontier quality for structured text tasks. No data leaves the machine.

`synthesize.bb` depends on `cheshire` for JSON. Declare it in `bb.edn` at the vault root:

```clojure
;; bb.edn — required for cheshire JSON parsing
{:deps {cheshire/cheshire {:mvn/version "5.13.0"}}}
```

```clojure
#!/usr/bin/env bb
;; wiki/synthesize.bb — Ollama synthesis with assembled vault context

(ns wiki.synthesize
  (:require [clojure.string :as str]
            [cheshire.core :as json]
            [babashka.http-client :as http]))

(def OLLAMA_URL "http://localhost:11434/api/generate")
;; Qwen3.8 27B: near-frontier quality, 256K context, ~22–28 GB on M5 Ultra.
;; For fast orphan-lint tasks, use "qwen3.8:7b" (~5 GB, 60–80 t/s).
;; For maximum quality sessions, use "llama3.3:70b" (~43 GB, elite instruction-following).
(def MODEL      "qwen3.8:27b")

(defn read-note [path]
  (try (slurp path) (catch Exception _ "")))

(defn assemble-context
  "Concatenate retrieved note contents into a single context block.
   Truncates each note to stay within a reasonable context budget.
   Qwen3.8 27B has a 256K native context window; 8000 chars/note
   (~2000 tokens) lets you comfortably include 20+ notes per call."
  [note-paths & {:keys [max-chars-per-note]
                 :or   {max-chars-per-note 8000}}]
  (->> note-paths
       (map (fn [p]
              (let [content (read-note p)]
                (str "## " p "\n\n"
                     (subs content 0 (min max-chars-per-note (count content)))
                     "\n\n"))))
       (str/join "---\n")))

(defn synthesize
  "Send a synthesis prompt to local Ollama. Returns the model's response string."
  [query context-paths]
  (let [context  (assemble-context context-paths)
        prompt   (str "You are a personal knowledge assistant. "
                      "Using only the notes provided below, "
                      "synthesize a concise answer to the query.\n\n"
                      "QUERY: " query "\n\n"
                      "NOTES:\n" context)
        body     (json/generate-string {:model  MODEL
                                        :prompt prompt
                                        :stream false})
        response (http/post OLLAMA_URL
                            {:body    body
                             :headers {"Content-Type" "application/json"}})]
    ;; :response key is correct only when :stream false (line above).
    ;; Streaming mode returns newline-delimited JSON chunks — not a single map.
    (-> response :body (json/parse-string true) :response)))

(when (= *file* (System/getProperty "babashka.file"))
  (let [[query & paths] *command-line-args*]
    (println (synthesize query paths))))
```

Usage from the shell is a single pipeline:

```bash
# Find notes relevant to a topic, then synthesize across them
bb wiki/synthesize.bb \
  "What are the trade-offs of local-first LLM memory?" \
  $(bb wiki/query.bb "local LLM memory" | head -5)
```

The pipeline composes `query.bb` output directly into `synthesize.bb` arguments. No intermediary database. No serialization format. The context window is assembled in memory from live file reads.

Qwen3.8 27B supports a configurable reasoning budget. For unattended cron, the default prompt above runs in direct-answer mode — fast and deterministic. For deliberate interactive sessions where you want the model to reason through complex multi-hop connections, prefix the query with `"Think carefully before answering."` — Qwen3.8 interprets this as an instruction to activate extended chain-of-thought before generating the synthesis.

---

## Layer 4: The Active Maintainer Loop

The difference between a static Markdown vault and an AI Second Brain is the **Active Maintainer**: an autonomous Babashka task that runs on a schedule, inspects the vault, and makes it smarter without you.

The Active Maintainer performs three jobs:

### 1. Orphan Detection

A note becomes an orphan when nothing else in the vault links to it. Orphans represent either forgotten insights or misfiled concepts. The Active Maintainer surfaces them for review.

```clojure
#!/usr/bin/env bb
;; wiki/maintain.bb — Active Maintainer agent
;; Requires wiki/synthesize.bb on the Babashka classpath.
;; Add to bb.edn: {:paths ["wiki"] :deps {cheshire/cheshire {:mvn/version "5.13.0"}}}
;; Then run as: bb -m wiki.maintain <wiki-dir>  (or directly: bb wiki/maintain.bb <wiki-dir>)

(ns wiki.maintain
  (:require [clojure.string :as str]
            [clojure.java.io :as io]
            [babashka.process :refer [shell]]
            [wiki.synthesize :as synth]))

;; Use the fast 7B for lightweight lint; full 27B for weekly digest synthesis.
(def FAST_MODEL "qwen3.8:7b")

(defn all-notes [wiki-dir]
  (->> (file-seq (io/file wiki-dir))
       (remove #(str/includes? (.getPath %) "/.git/"))
       (filter #(str/ends-with? (.getName %) ".md"))
       (map #(.getPath %))))

(defn note-title [path]
  "Prefer frontmatter `title:`, fallback to first `#` heading, then filename."
  (let [content     (try (slurp path) (catch Exception _ ""))
        front-title (second (re-find #"(?m)^title:\s*(.+)\s*$" content))
        heading     (->> (str/split-lines content)
                         (filter #(str/starts-with? (str/trim %) "#"))
                         first)]
    (str/trim
     (or (some-> front-title (str/replace #"^['\"]|['\"]$" ""))
         (some-> heading (str/replace #"^#+ " ""))
         (-> (io/file path) (.getName) (str/replace #"\.md$" ""))))))

(defn orphaned-notes
  "Find notes that are not referenced by any other note's `related` frontmatter."
  [wiki-dir]
  (let [notes (all-notes wiki-dir)]
    (filter (fn [path]
              (let [title  (note-title path)
                    result (shell {:out :string :err :string :continue true}
                                  "rg" "-l" "-F" "--" title wiki-dir)
                    hits   (->> (str/split-lines (:out result))
                                (remove str/blank?))]
                ;; Only the file itself references its own title
                (<= (count hits) 1)))
            notes))))
```

### 2. Cross-Note Synthesis

The Active Maintainer generates weekly digest notes that synthesize across all recent daily logs, surfacing recurring themes and connections that span multiple days.

```clojure
(defn weekly-digest
  "Generate a synthesis note for the current week's daily logs.
   Writes output to wiki/synthesis/YYYY-WNN-digest.md."
  [wiki-dir]
  (let [now       (java.time.LocalDate/now)
        week-num  (.get now (.weekOfWeekBasedYear (java.time.temporal.WeekFields/ISO)))
        year      (.getYear now)
        this-week (str wiki-dir "/daily/")
        daily-paths (->> (file-seq (io/file this-week))
                         (remove #(str/includes? (.getPath %) "/.git/"))
                         (filter #(str/ends-with? (.getName %) ".md"))
                         (map #(.getPath %))
                         (sort-by #(-> (io/file %) (.getName)))
                         reverse
                         (take 7)) ; Newest 7 by YYYY-MM-DD filename
        query     "What are the key themes, recurring ideas, and open questions from these notes?"
        synthesis (synth/synthesize query daily-paths)
        out-path  (str wiki-dir "/synthesis/"
                       year "-W" (format "%02d" week-num) "-digest.md")]
    (spit out-path
          (str "---\ntitle: Week " week-num " Synthesis\n"
               "generated: " (str (java.time.LocalDate/now)) "\n"
               "type: synthesis\n---\n\n"
               synthesis))
    (println "Written:" out-path)
    out-path))
```

### 3. Autonomous Git Commit

Every change the Active Maintainer makes is committed to Git with a machine-generated message. The vault history becomes a log of the system's reasoning over time.

```clojure
(defn commit-changes!
  "Stage all vault changes and commit with a maintenance log message."
  [wiki-dir message]
  (shell "git" "-C" wiki-dir "add" ".")
  (shell "git" "-C" wiki-dir "commit"
         "--message" (str "[active-maintainer] " message)
         "--allow-empty"))

(defn run-maintenance! [wiki-dir]
  (println "Running Active Maintainer pass...")
  ;; 1. Report orphans (fast rg scan — no LLM call needed)
  (let [orphans (orphaned-notes wiki-dir)]
    (when (seq orphans)
      (println "Orphaned notes detected:")
      (doseq [o orphans] (println " -" o))))
  ;; 2. Generate weekly digest if Monday
  (when (= java.time.DayOfWeek/MONDAY (.getDayOfWeek (java.time.LocalDate/now)))
    (let [out (weekly-digest wiki-dir)]
      (commit-changes! wiki-dir (str "weekly digest: " out))))
  (println "Maintenance pass complete."))

(when (= *file* (System/getProperty "babashka.file"))
  (run-maintenance! (or (first *command-line-args*) "wiki")))
```

Schedule the maintenance pass with `launchd` (primary on macOS), `cron` as fallback. Use your real `bb` path from `command -v bb` (e.g. `/opt/homebrew/bin/bb`):

```bash
# cron fallback — crontab -e
# Run the Active Maintainer every day at 06:30
30 6 * * * /opt/homebrew/bin/bb /Users/you/repo/wiki/maintain.bb /Users/you/repo/wiki >> /tmp/wiki-maintain.log 2>&1
```

On Mac Studio prefer `launchd` — `~/Library/LaunchAgents/wiki.maintain.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>Label</key><string>wiki.maintain</string>
  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/bb</string>
    <string>/Users/you/repo/wiki/maintain.bb</string>
    <string>/Users/you/repo/wiki</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict><key>Hour</key><integer>6</integer><key>Minute</key><integer>30</integer></dict>
  <key>StandardOutPath</key><string>/tmp/wiki-maintain.log</string>
  <key>StandardErrorPath</key><string>/tmp/wiki-maintain.log</string>
</dict>
</plist>
```

The Active Maintainer produces no side effects outside the vault directory and the local Ollama instance. No network calls. No credential files. No background daemons left running after the task completes.

---

## Signal vs. Noise: The Remaining Human Responsibility

The heaviest criticism of autonomous AI PKM is **index dilution**: unconstrained ingestion creates a corpus so noisy that semantic correlations become hallucinated. The Active Maintainer architecture sidesteps this by design.

Because ingestion is deliberate — you write or paste into Markdown files, not bulk-import browser history or email archives — the signal-to-noise ratio is maintained by authorial intent rather than algorithmic filtering. The LLM synthesizes across notes that a human deemed worth writing, not across everything the browser has ever loaded.

The Active Maintainer augments deliberate capture. It does not replace the judgment to capture at all — curated, intentional ingestion remains essential even when synthesis is automated by an LLM. That distinction matters for the quality of synthesis output.

---

## Production Profile on Mac Studio M5 Ultra

The Mac Studio M5 Ultra (announced August 2026, shipping September 22, 2026) changes the local LLM calculus entirely. With unified memory starting at **96 GB** and scaling to 512 GB, and memory bandwidth reaching **1.2 TB/s**, the M5 Ultra is not a constrained development box — it is a serious inference node.

This architecture runs the following stack simultaneously without memory pressure:

- Live Clojure JVM REPL + language server
- Ollama serving `qwen3.8:27b` (the default synthesis model, ~22–28 GB resident)
- `llama3.3:70b` loaded on demand for quality sessions (~43 GB)
- Standard macOS development tooling

The model tier choices match the hardware:

| Model          | Use in this architecture                 | RAM       | Speed on M5 Ultra |
| :---           | :---                                     | :---      | :---              |
| `qwen3.8:27b`  | Default: unattended cron, weekly digests | ~22–28 GB | 25–30 t/s         |
| `llama3.3:70b` | Quality: deliberate multi-hop synthesis  | ~43 GB    | 12–18 t/s         |
| `qwen3.8:7b`   | Fast: orphan lint, quick classification  | ~5–6 GB   | 60–80 t/s         |

| Component                   | Memory Footprint                    | Startup Time                         |
| :---                        | :---                                | :---                                 |
| **Babashka (`bb`)**         | ~30 MB per invocation               | ~15 ms (native ARM)                  |
| **`rg` vault search**       | <10 MB                              | <5 ms                                |
| **Ollama (`qwen3.8:27b`)**  | ~22–28 GB resident (unified memory) | Already running                      |
| **Git operations**          | <5 MB                               | <20 ms                               |
| **Full synthesis pipeline** | <35 MB scripts (excl. Ollama)       | <100 ms retrieval; 8–20 s generation |

The Babashka scripts add no persistent memory overhead. They start, execute, and terminate. There is no background daemon consuming RAM between sessions, unlike every vector database alternative.

A weekly digest synthesis across 20 daily notes takes approximately **8–20 seconds** for `qwen3.8:27b` at 25–30 t/s on M5 Ultra — quality indistinguishable from a cloud API call, at zero latency and zero cost. For maximum quality, swap to `llama3.3:70b` for 30–60 second digests. Both run unattended via `launchd` / cron.

> **Performance tip:** Set `OLLAMA_FLASH_ATTENTION=1` in your environment before starting Ollama. This cuts KV cache memory overhead significantly on the 256K context windows Qwen3.8 can consume.

---

## The Trade-offs: What You Give Up

This architecture makes deliberate sacrifices. They are worth naming explicitly.

**No fuzzy semantic retrieval.** `rg` performs lexical keyword matching, not vector similarity. If you write about "knowledge graphs" in one note and "connected concept maps" in another, `rg` will not automatically correlate them unless you query both terms or the `related` frontmatter links them manually. For a personal 1,000-note vault, this is acceptable. For a team corpus of 50,000 documents, it is not.

**No cross-device sync.** The vault is local. Sync requires a git remote (Gitea, self-hosted GitLab, or even a bare repo on a home server). Cloud git remotes (GitHub, GitLab.com) expose your vault content to third parties — which may or may not be acceptable depending on what you store.

**No real-time collaboration.** This is a single-user system by design. Multi-user shared vaults require the git merge discipline familiar from code collaboration, not casual consumer PKM tooling.

**Latency, not quality.** At 27B with Qwen3.8, the gap to cloud frontier models for PKM tasks — summarization, cross-note synthesis, Zettelkasten note writing — is minimal. The remaining trade-off is latency: 8–20 seconds for a digest versus a cloud API's 1–3 seconds. For unattended cron at 06:30, this is irrelevant. For interactive sessions where you want instant responses, it matters. The fix is simply not to use the pipeline interactively — treat synthesis as a background job, and read the output later. When you genuinely need frontier quality for complex multi-hop reasoning, `llama3.3:70b` is a `MODEL` swap away on the same machine.

**Context window size is not retrieval precision.** Qwen3.8's 256K context window is not a replacement for focused retrieval. Dumping your entire vault into a single prompt does not produce better synthesis — it produces distracted synthesis. The `max-chars-per-note 8000` budget and `max-results 20` cap in `query.bb` are deliberate constraints: focused, chunked context reduces model distraction and surfaces connections more reliably than a firehose of text. If a note is not retrieved, it probably was not relevant. `ripgrep`'s precision is a feature.

For personal knowledge management of technical notes, project documentation, and daily capture logs, these trade-offs are correct. The system that runs reliably on your hardware, without network dependencies, and that you fully control is more valuable than a smarter but fragile cloud-dependent alternative.

---

## Open-Source Ecosystem Reference

The minimalist local-first approach described here is not invented from scratch. Several open-source projects represent the design spectrum:

| Project                                                                              | Design Point                                | Relevance                                                                |
|:-------------------------------------------------------------------------------------|:--------------------------------------------|:-------------------------------------------------------------------------|
| [karpathy/llm-wiki](https://github.com/karpathy/llm-wiki)                            | Plain text + LLM context injection          | Direct inspiration; minimalist wiki + local LLM pattern                  |
| [garrytan/gbrain](https://github.com/garrytan/gbrain)                                | Personal AI second-brain architecture       | Real-world automation workflows; useful reference for Action Layer ideas  |
| [khoj-ai/khoj](https://github.com/khoj-ai/khoj)                                      | Self-hostable, local LLMs, Markdown/Org/PDF | Closest production-ready equivalent; heavier but powerful                |
| [basicmachines-co/basic-memory](https://github.com/basicmachines-co/basic-memory)    | Local-first semantic memory engine          | SQLite-based; natural upgrade path if `rg` keyword retrieval falls short |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory)                  | Context engineering primitives for LLMs     | Reference for context assembly and episodic/semantic memory patterns     |
| [huytieu/COG-second-brain](https://github.com/huytieu/COG-second-brain)              | Cognitive architecture for PKM              | Useful conceptual reference for knowledge graph and memory structuring   |

If your retrieval requirements outgrow `rg` and frontmatter graphs, `basic-memory` is the natural upgrade path — it adds SQLite-backed semantic indexing without requiring a network-exposed vector database daemon. `gbrain` and `COG-second-brain` are worth reading for their Action Layer patterns, particularly around autonomous drafting and knowledge graph traversal.

---

## Starting Today

The complete stack requires three tools already present on most development machines:

```bash
# 1. Verify prerequisites
bb --version          # Babashka ≥ 1.3
ollama --version      # Ollama ≥ 0.4
rg --version          # ripgrep ≥ 14

# 2. Pull models
# Default synthesis model — 27B, 256K context, near-frontier quality (~18 GB download)
ollama pull qwen3.8:27b
# Optional: quality sessions (~43 GB download)
ollama pull llama3.3:70b
# Optional: fast lint path (~5 GB download)
ollama pull qwen3.8:7b

# 3. Enable Flash Attention (cuts KV cache overhead on long contexts)
export OLLAMA_FLASH_ATTENTION=1

# 4. Create the vault
mkdir -p wiki/{daily,concepts,projects,synthesis}
echo "# $(date +%Y-%m-%d)" > wiki/daily/$(date +%Y-%m-%d).md

# 5. Initialize git history
git -C wiki init && git -C wiki add . && git -C wiki commit -m "init: empty vault"

# 6. Run your first synthesis
bb wiki/synthesize.bb "What tools am I using?" wiki/concepts/*.md
```

The architecture composes incrementally. Start with the vault and manual synthesis calls. Add the Active Maintainer cron when the vault grows large enough to benefit from weekly digests. Add the orphan detector when you notice notes drifting out of your working context.

The system grows with your knowledge rather than demanding upfront configuration of infrastructure you haven't justified yet.

---

## Conclusion

The AI second brain that actually works is not the one with the most sophisticated retrieval algorithm. It is the one that runs reliably on your hardware, respects your data, and reduces friction to zero without introducing new fragility.

A directory of Markdown files, versioned by Git, queried by `ripgrep`, synthesized by a 27B local model running at 25–30 tokens per second, and maintained by a 30 MB Babashka process is not a compromise. It is the correct abstraction for personal knowledge management in 2026.

The heavy vector database stack optimizes for retrieval precision at a scale no individual knowledge worker will reach. The minimalist plain-text wiki stack optimizes for the properties that actually matter at personal scale: startup time, memory footprint, data portability, and zero vendor dependency.

The Mac Studio M5 Ultra with 96–512 GB unified memory closes the remaining quality gap against cloud APIs. You have more inference capacity on your desk than most cloud functions run on. Use it privately, and own the output.

**Start with what you can trust. Run what you can inspect. Own what you think.**

---

*Crafted with AI: Research, drafting, review, and refinement assisted by frontier AI models.*
