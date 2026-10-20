#!/usr/bin/env bb

;; Publish a Markdown blog post to dev.to.
;;
;; Usage:
;;   bb publish_devto.bb <file.md>                          # publish immediately
;;   bb publish_devto.bb <file.md> --tags ai,compilers      # with tags (max 4)
;;   bb publish_devto.bb <file.md> --draft                  # save as draft
;;
;; Title is extracted from the first `# ` heading in the markdown.
;; API key is read from `pass dev.to`.

(require '[babashka.http-client :as http]
         '[babashka.cli :as cli]
         '[cheshire.core :as json]
         '[clojure.java.shell :refer [sh]]
         '[clojure.string :as str])

(defn get-pass [path]
  (let [res (sh "pass" path)]
    (if (zero? (:exit res))
      (str/trim (:out res))
      (throw (ex-info "Failed to get pass secret" res)))))

(defn extract-title
  "Pull the first `# Heading` from markdown. Returns nil if none found."
  [markdown]
  (some->> (re-find #"(?m)^# (.+)$" markdown)
           second
           str/trim))

(defn parse-tags
  "Split comma-separated tag string into a vector of up to 4 tags."
  [s]
  (when (and s (not (str/blank? s)))
    (->> (str/split s #",")
         (map str/trim)
         (remove str/blank?)
         (take 4)
         vec)))

(def cli-spec
  {:tags  {:desc "Comma-separated tags (max 4)" :alias :t}
   :draft {:desc "Publish as draft"             :alias :d :coerce :boolean}
   :help  {:desc "Show this help"               :alias :h :coerce :boolean}})

(defn print-help []
  (println "Usage: bb publish_devto.bb <file.md> [options]")
  (println)
  (println "Publish a Markdown blog post to dev.to.")
  (println "Title is extracted from the first # heading.")
  (println)
  (println "Options:")
  (println (cli/format-opts {:spec cli-spec})))

(defn -main [args]
  (let [{:keys [args opts]} (cli/parse-args args {:spec cli-spec})
        _      (when (:help opts) (print-help) (System/exit 0))
        file   (first args)
        _      (when-not file (print-help) (System/exit 1))
        _      (when-not (.exists (java.io.File. file))
                 (println "File not found:" file)
                 (System/exit 1))
        markdown (slurp file)
        title    (or (extract-title markdown)
                     (do (println "No # heading found in" file)
                         (System/exit 1)))
        tags     (or (parse-tags (:tags opts)) [])
        draft?   (:draft opts)]

    (println "Title:    " title)
    (println "Tags:     " (if (seq tags) (str/join ", " tags) "(none)"))
    (println "Published:" (if draft? "draft" "live"))
    (println "---")

    (let [api-key  (get-pass "dev.to")
          payload  {:article {:title         title
                              :body_markdown markdown
                              :published     (not draft?)
                              :tags          tags}}
          response (http/post "https://dev.to/api/articles"
                              {:headers {"api-key"      api-key
                                         "Content-Type" "application/json"}
                               :body (json/generate-string payload)})
          body     (json/parse-string (:body response) true)]
      (println "Status:" (:status response))
      (if-let [url (:url body)]
        (println "URL:   " url)
        (println "Response:" (:body response))))))

(-main *command-line-args*)
