#!/usr/bin/env bb

;; Lint a Markdown blog post against CHECKLIST.md rules.
;;
;; Usage:
;;   bb lint_blog.bb <file.md> [--strict] [--archive-dir archive]

(ns lint-blog
  (:require [babashka.cli :as cli]
            [babashka.http-client :as http]
            [clojure.java.io :as io]
            [clojure.string :as str]))

(def expected-key-order
  ["title" "published" "description" "tags" "series" "cover_image" "canonical_url" "devto_id"])

(def standard-ai-footnote
  "*Crafted with AI: Research, drafting, review, and refinement assisted by frontier AI models.*")

(def personal-github-owners
  #{"mugglebornpadawan" "ganeshrajendran" "ganesh-rajendran" "ganesh_rajendran_art"})

(def common-acronyms
  #{"AI" "API" "ASCII" "CD" "CI" "CLI" "CPU" "CSS" "DB" "DNS" "DOM" "EOF"
    "FFI" "FPS" "GC" "GIF" "GPU" "HTML" "HTTP" "HTTPS" "ID" "IDE" "IO" "IP"
    "JDK" "JSON" "JVM" "LLM" "LLMs" "ML" "OS" "PR" "RAM" "REPL" "REST" "RGB"
    "ROM" "SDK" "SEO" "SERP" "SQL" "SSH" "SSL" "TDD" "TLS" "TOC" "UI" "URI"
    "URL" "USB" "UTF" "UX" "VM" "VRAM" "WASM" "XML" "YAML" "2D" "3D"
    "NVIDIA" "DOOM" "AARON" "TL" "DR" "GB" "TB" "MB" "EU" "MIT" "ACM"
    "ICML" "CVPR" "GCC" "LLVM" "GPT" "NLP" "XTDB" "COG" "WASD" "DNA"
    "ALU" "DDR4" "DDR5" "GDDR6" "HBM" "SVG"
    "ISO" "RISC" "GNU" "DARPA" "TRACTOR" "ARM" "FBI" "IEC" "JTC1" "SC22"
    "JEP" "AWS" "ACL2" "AMD" "AMS" "ASPLOS" "CGO" "TPU" "TPUs"
    "ICSE" "SEIP" "PLDI" "IEEE" "LMS" "CC"
    "SIMD" "SPIR" "PDF" "SHA"
    "RULER" "ETHIC" "LMSYS" "MLX" "GB202" "TSMC" "CTO" "RTX" "DGX" "USD" "II" "III"
    "IV" "FP6" "FP8" "INT8" "TOPS" "GDDR7" "ECC" "TDP" "GB10" "OEM" "ASUS" "HP" "MSI" "NIM" "TRT"
    "HY" "INT4" "POSIX" "RSJ" "UV" "LM" "VI" "VII" "IT" "UC" "GLSL"
    "SDFs" "IROS" "DEC" "MYCIN" "XCON" "PROSPECTOR" "DENDRAL" "IF" "THEN" "IRE" "NAACL"})

(defn parse-frontmatter
  "Extract raw frontmatter string, ordered keys, key->val map, and body."
  [markdown]
  (if-let [[_ fm body] (re-matches #"(?s)^---\r?\n(.*?)\r?\n---\r?\n?(.*)$" markdown)]
    (let [lines (str/split-lines fm)
          parsed (reduce
                  (fn [{:keys [key-order kvs]} line]
                    (if-let [[_ k v] (re-matches #"^([a-zA-Z0-9_]+):(.*)$" line)]
                      (let [val (-> v str/trim (str/replace #"^\"(.*)\"$" "$1"))]
                        {:key-order (conj key-order k)
                         :kvs       (assoc kvs k val)})
                      {:key-order key-order :kvs kvs}))
                  {:key-order [] :kvs {}}
                  lines)]
      (assoc parsed :body body :has-frontmatter? true))
    {:key-order [] :kvs {} :body markdown :has-frontmatter? false}))

(defn extract-urls
  "Extract all http/https URLs from markdown links, image tags, and frontmatter."
  [markdown]
  (let [{:keys [kvs body]} (parse-frontmatter markdown)
        fm-urls (keep #(let [v (get kvs %)] (when (and v (re-matches #"^https?://\S+$" v)) v))
                      ["canonical_url" "cover_image"])
        body-urls (->> (re-seq #"(?:\[[^\]]*\]|!\[[^\]]*\])\((https?://[^)\s]+)\)|<(https?://[^>\s]+)>" body)
                       (mapcat rest)
                       (remove nil?))]
    (distinct (concat fm-urls body-urls))))

(defn check-url
  "Perform HEAD (or fallback to GET) request on url. Returns {:url url :ok? bool :status status :err msg}."
  [url]
  (let [opts {:throw false
              :timeout 5000
              :headers {"User-Agent" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}}]
    (try
      (let [res (http/head url opts)
            status (:status res)]
        (if (#{403 405} status)
          (let [get-res (http/get url (assoc opts :headers (assoc (:headers opts) "Range" "bytes=0-100")))]
            (if (< (:status get-res) 400)
              {:url url :ok? true :status (:status get-res)}
              {:url url :ok? false :status (:status get-res)}))
          (if (< status 400)
            {:url url :ok? true :status status}
            {:url url :ok? false :status status})))
      (catch Throwable t
        {:url url :ok? false :err (.getMessage t)}))))

(defn- stem-word
  "Simple heuristic suffix removal for tag-to-content matching."
  [w]
  (-> w
      (str/replace #"s$" "")
      (str/replace #"ing$" "")
      (str/replace #"ers?$" "")
      (str/replace #"ed$" "")))

(defn tag-in-text?
  "Check if a tag (or its stem/compound parts) appears in the given text."
  [tag text]
  (let [clean-text (str/lower-case (str/replace text #"[^a-zA-Z0-9\s]" " "))
        clean-tag  (str/lower-case (str/replace tag #"[^a-zA-Z0-9]" ""))
        condensed-text (str/replace clean-text #"\s+" "")
        words (set (str/split clean-text #"\s+"))
        tag-stem (stem-word clean-tag)]
    (or
      (str/includes? condensed-text clean-tag)
      (contains? words clean-tag)
      (some #(and (>= (count tag-stem) 3) (str/starts-with? % tag-stem)) words)
      (when (> (count clean-tag) 5)
        (some (fn [split-idx]
                (let [p1 (subs clean-tag 0 split-idx)
                      p2 (subs clean-tag split-idx)]
                  (and (>= (count p1) 3) (>= (count p2) 3)
                       (some #(str/starts-with? % (stem-word p1)) words)
                       (some #(str/starts-with? % (stem-word p2)) words))))
              (range 3 (- (count clean-tag) 2)))))))

(defn strip-non-prose
  "Remove fenced code blocks, inline code, URLs, and markdown link targets for acronym scanning."
  [body]
  (-> body
      (str/replace #"(?s)```.*?```" " ")
      (str/replace #"`[^`]+`" " ")
      (str/replace #"\[([^\]]*)\]\([^)]+\)" "$1")
      (str/replace #"https?://[^\s)]+" " ")))

(defn find-unexpanded-acronyms
  "Return a seq of uppercase acronyms (2+ chars) not in allowlist and not defined as '(ACRONYM)' or 'ACRONYM ('."
  [body]
  (let [prose (strip-non-prose body)
        matches (re-seq #"\b([A-Z]{2,}[0-9]*s?)\b" prose)]
    (->> matches
         (map second)
         distinct
         (remove common-acronyms)
         (remove (fn [acr]
                   (let [base (str/replace acr #"s$" "")]
                     (or (common-acronyms base)
                         (re-find (re-pattern (str "\\(" (java.util.regex.Pattern/quote base) "s?( \\d+)?\\)")) prose)
                         (re-find (re-pattern (str "\\b" (java.util.regex.Pattern/quote base) "s?\\s*\\(")) prose)))))
         (take 15)
         vec)))

(defn scan-archive-series
  "Scan archive directory for existing series and their posts."
  [archive-dir]
  (let [dir (io/file archive-dir)]
    (when (.isDirectory dir)
      (->> (.listFiles dir)
           (filter #(and (.isFile %) (str/ends-with? (.getName %) ".md")))
           (keep (fn [f]
                   (let [{:keys [kvs]} (parse-frontmatter (slurp f))
                         series (get kvs "series")]
                     (when-not (str/blank? series)
                       {:series series
                        :file (.getName f)
                        :title (get kvs "title")
                        :devto_id (get kvs "devto_id")}))))
           (group-by :series)))))

(defn scan-archive-posts
  "Scan archive directory for all published posts, their titles, canonical URLs, and devto IDs."
  [archive-dir]
  (let [dir (io/file archive-dir)]
    (when (.isDirectory dir)
      (->> (.listFiles dir)
           (filter #(and (.isFile %) (str/ends-with? (.getName %) ".md")))
           (keep (fn [f]
                   (let [{:keys [kvs]} (parse-frontmatter (slurp f))
                         title (get kvs "title")
                         canon (get kvs "canonical_url")
                         devto-id (get kvs "devto_id")]
                     (when (and title (or canon devto-id))
                       (let [phrase (str/trim (first (str/split title #":|—")))]
                         {:file (.getName f)
                          :title title
                          :phrase (when (>= (count phrase) 10) phrase)
                          :canonical canon
                          :devto-id devto-id})))))
           vec))))

(defn check-code-fences
  "Check for unclosed code fences and opening fences missing a language tag."
  [body]
  (let [lines (str/split-lines body)]
    (loop [remaining lines
           in-fence? false
           missing-lang 0]
      (if (empty? remaining)
        {:unclosed? in-fence? :missing-lang missing-lang}
        (let [line (str/trim (first remaining))]
          (if (str/starts-with? line "```")
            (if in-fence?
              (recur (rest remaining) false missing-lang)
              (let [lang (str/trim (subs line 3))]
                (recur (rest remaining) true (if (str/blank? lang) (inc missing-lang) missing-lang))))
            (recur (rest remaining) in-fence? missing-lang)))))))

(defn lint-markdown
  "Run all blog checklist lints on markdown string. Returns {:results [...] :fails n :warns n}."
  [markdown & {:keys [archive-dir file-name check-urls?] :or {archive-dir "archive" check-urls? false}}]
  (let [{:keys [key-order kvs body has-frontmatter?]} (parse-frontmatter markdown)
        results (atom [])
        add! (fn [level msg] (swap! results conj {:level level :msg msg}))]

    ;; 1. Frontmatter
    (if-not has-frontmatter?
      (add! :fail "Missing YAML frontmatter block (--- ... ---)")
      (do
        (doseq [req ["title" "published" "description" "tags"]]
          (when (str/blank? (get kvs req))
            (add! (if (= req "description") :warn :fail)
                  (str "Missing or blank frontmatter key: " req))))
        (let [known-keys (filter (set expected-key-order) key-order)
              expected-present (filter (set known-keys) expected-key-order)]
          (when (not= known-keys expected-present)
            (add! :warn (str "Frontmatter key order differs from standard: "
                             (str/join ", " expected-key-order)))))))

    ;; 2. SEO
    (let [title (get kvs "title")
          desc  (get kvs "description")
          canon (get kvs "canonical_url")]
      (when-not (str/blank? title)
        (if (> (count title) 65)
          (add! :warn (format "Title is %d chars (>65 chars may truncate in SERP snippets)" (count title)))
          (add! :pass (format "Title length OK (%d chars)" (count title)))))
      (when-not (str/blank? desc)
        (if (or (< (count desc) 80) (> (count desc) 160))
          (add! :warn (format "Description is %d chars (ideal: 80-160 chars)" (count desc)))
          (add! :pass (format "Description length OK (%d chars)" (count desc)))))
      (if (or (str/blank? canon)
              (str/starts-with? canon "https://dev.to/ganesh_rajendran_art/"))
        (add! :pass "Canonical URL is blank or self-referencing dev.to")
        (add! :warn (str "canonical_url does not point to dev.to/ganesh_rajendran_art: " canon))))

    ;; 3. dev.to conformance & tag SEO
    (let [tags-str (get kvs "tags")
          tags (when-not (str/blank? tags-str)
                 (->> (str/split tags-str #",") (map str/trim) (remove str/blank?) vec))]
      (when (seq tags)
        (when (> (count tags) 4)
          (add! :fail (format "Too many tags (%d); dev.to allows max 4" (count tags))))
        (doseq [t tags]
          (when-not (re-matches #"^[a-z0-9]+$" t)
            (add! :fail (format "Invalid dev.to tag '%s' (must be lowercase alphanumeric, no hyphens/spaces)" t))))
        (let [title (or (get kvs "title") "")
              desc  (or (get kvs "description") "")
              full-text (str title " " desc " " (strip-non-prose body))
              in-meta (filter #(or (tag-in-text? % title) (tag-in-text? % desc)) tags)
              absent  (remove #(tag-in-text? % full-text) tags)]
          (if (seq in-meta)
            (add! :pass (format "Tag SEO relevance: %d/%d tag(s) align with title/description (%s)"
                                (count in-meta) (count tags) (str/join ", " in-meta)))
            (add! :warn "Tag SEO relevance: none of the tags appear in the title or meta description; aligning primary tags improves SERP matching"))
          (when (seq absent)
            (add! :warn (format "Tag(s) not found in post content: %s (ensure tags are grounded in the text for search indexation)"
                                (str/join ", " absent)))))))

    (when (re-find #"(?m)^# " (strip-non-prose body))
      (add! :warn "Body contains an H1 (# ) heading; dev.to renders frontmatter title as H1"))

    (let [{:keys [unclosed? missing-lang]} (check-code-fences body)]
      (when unclosed?
        (add! :fail "Unclosed fenced code block (```)"))
      (when (pos? missing-lang)
        (add! :warn (format "%d fenced code block(s) missing language tag" missing-lang))))

    (let [bad-imgs (re-seq #"!\[[^\]]*\]\((?!https?://)([^)]+)\)" body)
          empty-alt (re-seq #"!\[\s*\]\([^)]+\)" body)]
      (when (seq bad-imgs)
        (add! :warn (format "Found %d non-HTTPS/relative image link(s): %s"
                            (count bad-imgs) (str/join ", " (map second bad-imgs)))))
      (when (seq empty-alt)
        (add! :warn (format "Found %d image(s) missing descriptive alt text" (count empty-alt)))))

    (let [prose-no-code (-> body
                            (str/replace #"(?s)```.*?```" " ")
                            (str/replace #"`[^`]+`" " "))
          empty-links (re-seq #"\[[^\]]*\]\(\s*\)" prose-no-code)
          placeholder-urls (re-seq #"https?://(?:localhost|127\.0\.0\.1|example\.com)\S*|\[[^\]]*\]\((?:TODO|TBD)\)" prose-no-code)
          local-links (->> (re-seq #"\[[^\]]*\]\((?!https?://|#)([^)]+)\)" prose-no-code)
                           (map second)
                           (filter #(or (str/starts-with? % "file://")
                                        (str/starts-with? % "/")
                                        (str/starts-with? % "~/")
                                        (str/starts-with? % "./")
                                        (str/starts-with? % "../")
                                        (str/ends-with? % ".md"))))
          local-paths (re-seq #"(?:file:///[^\s)]+|/home/[^\s)]+|/Users/[^\s)]+|~/[^\s)]+)" prose-no-code)
          code-local-paths (re-seq #"(?:file:///[^\s`\"']+|/home/[a-zA-Z0-9_.-]+[^\s`\"']*|/Users/[a-zA-Z0-9_.-]+[^\s`\"']*)"
                                   (str/join "\n" (re-seq #"(?s)```.*?```" body)))
          gh-links (->> (re-seq #"https?://(?:www\.)?github\.com/([a-zA-Z0-9_.-]+)" body)
                        (filter #(personal-github-owners (str/lower-case (second %))))
                        (map first))]
      (when (or (seq empty-links) (seq placeholder-urls))
        (add! :fail (format "Found %d empty or placeholder link(s)"
                            (+ (count empty-links) (count placeholder-urls)))))
      (when (or (seq local-links) (seq local-paths))
        (add! :fail (str "Found local document/path reference(s): "
                         (str/join ", " (distinct (concat local-links local-paths))))))
      (when (seq code-local-paths)
        (add! :warn (str "Found local machine path(s) inside code blocks: "
                         (str/join ", " (distinct code-local-paths)))))
      (when (seq gh-links)
        (add! :fail (str "Found personal GitHub repo reference(s): "
                         (str/join ", " (distinct gh-links))))))

    ;; 4. Series & Internal Links check
    (let [series (get kvs "series")
          archive-series (scan-archive-series archive-dir)
          archive-posts (remove #(= (:file %) file-name) (scan-archive-posts archive-dir))]
      (if-not (str/blank? series)
        (do
          (if (re-find #"(?m)^>\s*\*This is \*\*Part\s+\d+\*\*" body)
            (add! :pass (str "Series numbered TOC blockquote present for '" series "'"))
            (add! :warn (str "Series '" series "' set, but missing standard numbered TOC blockquote (> *This is **Part N**...*)")))
          (when-let [peers (seq (remove #(= (:file %) file-name) (get archive-series series)))]
            (add! :info (format "Found %d existing post(s) in series '%s' (%s) — remember to update their TOCs & README.md"
                                (count peers) series (str/join ", " (map :file peers))))))
        (when (seq archive-series)
          (add! :info (str "No series set. Existing series in archive/: "
                           (str/join ", " (sort (keys archive-series)))))))

      ;; Check if any previous blogs are mentioned in prose
      (doseq [{:keys [title phrase canonical devto-id]} archive-posts]
        (let [target-phrase (or phrase title)
              pattern (re-pattern (str "(?i)\\b" (java.util.regex.Pattern/quote target-phrase) "\\b"))]
          (when (re-find pattern (strip-non-prose body))
            (let [linked? (or (and canonical (str/includes? body canonical))
                              (and devto-id (re-find (re-pattern (str "dev\\.to/[^/]+/[^)\"\\s]*-" devto-id)) body)))]
              (if linked?
                (add! :pass (format "Referenced previous blog '%s' is hyperlinked" target-phrase))
                (add! :warn (format "Mention of previous blog '%s' appears unlinked in prose; hyperlink to: %s"
                                    target-phrase (or canonical (str "https://dev.to/api/articles/" devto-id))))))))))

    ;; 5. Editorial: acronyms, references, AI footnote
    (let [urls (extract-urls markdown)]
      (if check-urls?
        (let [results (pmap check-url urls)
              bad (remove :ok? results)]
          (if (seq bad)
            (doseq [{:keys [url status err]} bad]
              (add! :fail (format "Broken or unreachable URL: %s (%s)" url (or status err))))
            (add! :pass (format "All %d external URL(s) verified reachable" (count urls)))))
        (when (seq urls)
          (add! :info (format "Skipped reachability check for %d URL(s) (pass --check-urls to verify)" (count urls))))))

    (let [unexpanded (find-unexpanded-acronyms body)]
      (if (seq unexpanded)
        (add! :warn (str "Potentially unexpanded acronyms on first use: " (str/join ", " unexpanded)))
        (add! :pass "No obvious unexpanded acronyms detected")))

    (if (re-find #"(?im)^##\s+References" body)
      (add! :pass "References section present")
      (add! :warn "Missing '## References' section"))

    (if (str/includes? body standard-ai-footnote)
      (add! :pass "Standard AI usage footnote stub present")
      (add! :warn "Missing standard AI usage footnote stub"))

    (let [words (count (remove str/blank? (str/split (strip-non-prose body) #"\s+")))
          mins  (max 1 (Math/round (/ words 220.0)))]
      (add! :info (format "Word count: ~%d prose words (~%d min read)" words mins)))

    (let [res @results]
      {:results res
       :fails   (count (filter #(= :fail (:level %)) res))
       :warns   (count (filter #(= :warn (:level %)) res))})))

(defn print-report
  [{:keys [results fails warns]}]
  (println "--- Blog Checklist Lint ---")
  (doseq [{:keys [level msg]} results]
    (println (format "[%s] %s" (str/upper-case (name level)) msg)))
  (println (format "Summary: %d fail(s), %d warning(s)" fails warns))
  (println "---------------------------"))

(def cli-spec
  {:strict      {:desc "Treat warnings as failures" :alias :s :coerce :boolean}
   :check-urls  {:desc "Verify external URLs are reachable" :alias :u :coerce :boolean}
   :archive-dir {:desc "Path to archive directory"  :alias :a :default "archive"}
   :help        {:desc "Show this help"             :alias :h :coerce :boolean}})

(defn -main [args]
  (let [{:keys [args opts]} (cli/parse-args args {:spec cli-spec})
        _ (when (or (:help opts) (empty? args))
            (println "Usage: bb lint_blog.bb <file.md> [--strict] [--check-urls] [--archive-dir archive]")
            (println (cli/format-opts {:spec cli-spec}))
            (System/exit (if (:help opts) 0 1)))
        file-path (first args)
        file (io/file file-path)]
    (when-not (.exists file)
      (println "File not found:" file-path)
      (System/exit 1))
    (let [report (lint-markdown (slurp file)
                                :archive-dir (:archive-dir opts)
                                :file-name (.getName file)
                                :check-urls? (:check-urls opts))]
      (print-report report)
      (when (or (pos? (:fails report))
                (and (:strict opts) (pos? (:warns report))))
        (System/exit 1)))))

(when (= *file* (System/getProperty "babashka.file"))
  (-main *command-line-args*))
