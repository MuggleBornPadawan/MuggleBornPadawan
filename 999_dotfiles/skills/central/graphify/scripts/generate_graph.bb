#!/usr/bin/env bb
(ns generate-graph
  (:require [babashka.fs :as fs]
            [babashka.process :refer [sh]]
            [clojure.edn :as edn]
            [clojure.string :as str]))

;; ---------------------------------------------------------------------------
;; 1. Source Target Resolution (Bypass .git, target, .cpcache)
;; ---------------------------------------------------------------------------

(def ignored-dirs #{".git" ".cpcache" ".clj-kondo" ".shadow-cljs" "target" "node_modules" ".lsp"})

(defn find-valid-lint-targets [root]
  (let [root-path (fs/path root)
        std-roots (filter #(fs/directory? (fs/path root-path %)) ["src" "test" "scripts"])]
    (if (seq std-roots)
      (map #(str (fs/path root-path %)) std-roots)
      ;; Otherwise find top-level non-ignored dirs and source files
      (->> (fs/list-dir root-path)
           (remove (fn [p] (ignored-dirs (str (fs/file-name p)))))
           (filter (fn [p]
                     (or (fs/directory? p)
                         (#{"clj" "cljs" "cljc" "bb"} (fs/extension p)))))
           (map str)))))

(defn run-kondo-analysis [targets]
  (let [cmd (into ["clj-kondo" "--lint"]
                  (conj (vec targets) "--config" "{:output {:analysis true :format :edn}}"))
        {:keys [out exit]} (apply sh cmd)]
    (if (str/blank? out)
      (throw (ex-info "clj-kondo failed to generate analysis output" {:exit exit}))
      (:analysis (edn/read-string out)))))

;; ---------------------------------------------------------------------------
;; 2. Cycle Detection (DFS)
;; ---------------------------------------------------------------------------

(defn find-cycles [adj-map]
  (letfn [(dfs [node visited stack]
            (cond
              (stack node) [node]
              (visited node) nil
              :else
              (let [visited' (conj visited node)
                    stack'   (conj stack node)]
                (some (fn [nbr]
                        (when-let [cycle (dfs nbr visited' stack')]
                          (cons node cycle)))
                      (get adj-map node #{})))))]
    (->> (keys adj-map)
         (keep (fn [start] (dfs start #{} #{})))
         (map vec)
         distinct)))

;; ---------------------------------------------------------------------------
;; 3. Graph Analytics & Classification
;; ---------------------------------------------------------------------------

(defn compute-graph [analysis]
  (let [ns-defs      (:namespace-definitions analysis)
        project-nss  (into #{} (map :name ns-defs))
        ns->file     (into {} (map (juxt :name :filename) ns-defs))
        usages       (:namespace-usages analysis)
        var-defs     (:var-definitions analysis)

        ;; Public vars per namespace (exclude private and internal naming)
        ns->vars     (reduce (fn [acc {:keys [ns name private]}]
                               (if (or private (str/starts-with? (str name) "-"))
                                 acc
                                 (update acc ns (fnil conj #{}) name)))
                             {}
                             var-defs)

        ;; Internal edges only
        internal-edges (->> usages
                            (filter (fn [{:keys [from to]}]
                                      (and (project-nss from)
                                           (project-nss to)
                                           (not= from to))))
                            (map (juxt :from :to))
                            distinct)

        out-deps (reduce (fn [acc [from to]] (update acc from (fnil conj #{}) to)) {} internal-edges)
        in-deps  (reduce (fn [acc [from to]] (update acc to (fnil conj #{}) from)) {} internal-edges)
        cycles   (find-cycles out-deps)

        classify (fn [n]
                   (let [in-count  (count (get in-deps n #{}))
                         out-count (count (get out-deps n #{}))]
                     (cond
                       (or (>= in-count 4) (>= out-count 6)) :hub
                       (and (zero? in-count) (zero? out-count)) :isolated
                       (zero? in-count) :entry
                       (zero? out-count) :leaf
                       :else :domain)))

        nodes (into {}
                    (map (fn [n]
                           (let [ins  (get in-deps n #{})
                                 outs (get out-deps n #{})]
                             [n {:ns        n
                                 :file      (get ns->file n)
                                 :role      (classify n)
                                 :in-count  (count ins)
                                 :out-count (count outs)
                                 :in-deps   ins
                                 :out-deps  outs
                                 :vars      (sort (get ns->vars n #{}))}]))
                         project-nss))]
    {:nodes nodes
     :edges internal-edges
     :cycles cycles
     :project-nss project-nss
     :hubs (filter #(= :hub (:role (val %))) nodes)}))

;; ---------------------------------------------------------------------------
;; 4. Markdown & Mermaid Formatting
;; ---------------------------------------------------------------------------

(defn- sanitize-id [s]
  (str/replace (str s) #"[^a-zA-Z0-9_]" "_"))

(defn generate-mermaid [{:keys [edges]}]
  (let [lines (map (fn [[from to]]
                     (str "    " (sanitize-id from) "[\"" from "\"] --> "
                          (sanitize-id to) "[\"" to "\"]"))
                   (sort edges))]
    (str "```mermaid\ngraph TD\n"
         (if (seq lines)
           (str/join "\n" lines)
           "    Empty[\"No Internal Dependencies (All Leaf or Isolated)\"]")
         "\n```")))

(defn generate-markdown-report [graph dir]
  (let [{:keys [nodes edges hubs cycles project-nss]} graph
        sorted-nodes (sort-by (juxt (comp - :in-count) (comp - :out-count)) (vals nodes))]
    (str/join
     "\n"
     ["# Architecture & Knowledge Graph Report"
      ""
      (str "> Generated via `generate_graph.bb` on `" (fs/absolutize dir) "`.")
      ""
      "## 1. Summary Metrics"
      ""
      (str "* **Total Namespaces**: " (count project-nss))
      (str "* **Internal Dependencies (Edges)**: " (count edges))
      (str "* **Architectural Hubs**: " (count hubs))
      (str "* **Cycles Detected**: " (if (seq cycles) (str "⚠️ " (count cycles)) "0 (Clean DAG)"))
      ""
      "## 2. Dependency Flowchart"
      ""
      (generate-mermaid graph)
      ""
      "## 3. Namespace Inventory"
      ""
      "| Namespace | Role | In-Degree | Out-Degree | Public Vars | Source File |"
      "| :--- | :--- | :---: | :---: | :---: | :--- |"
      (str/join
       "\n"
       (map (fn [{:keys [ns role in-count out-count vars file]}]
              (str "| `" ns "` | **`" (name role) "`** | "
                   in-count " | " out-count " | " (count vars) " | `" (if file (fs/file-name file) "-") "` |"))
            sorted-nodes))
      ""
      "## 4. Public API Seams"
      ""
      (str/join
       "\n\n"
       (map (fn [{:keys [ns vars]}]
              (str "### `" ns "`\n"
                   (if (seq vars)
                     (str/join "\n" (map #(str "* `" % "`") vars))
                     "* *No public exported vars.*")))
            sorted-nodes))
      ""])))

;; ---------------------------------------------------------------------------
;; 5. CLI Entrypoint
;; ---------------------------------------------------------------------------

(defn -main [& args]
  (let [target-dir (or (first args) ".")
        targets    (find-valid-lint-targets target-dir)]
    (if (empty? targets)
      (println (str "No Clojure or Babashka targets found in: " target-dir))
      (do
        (println (str "Running static AST analysis on targets: " (str/join ", " targets)))
        (let [analysis (run-kondo-analysis targets)
              graph    (compute-graph analysis)
              md-path  (str (fs/path target-dir "GRAPH_REPORT.md"))
              edn-path (str (fs/path target-dir "graph.edn"))]

          (spit md-path (generate-markdown-report graph target-dir))
          (spit edn-path (pr-str graph))

          (println (str "✓ Emitted " md-path))
          (println (str "✓ Emitted " edn-path))
          (println (str "✓ Indexed " (count (:project-nss graph)) " namespaces in " (count (:edges graph)) " edges.")))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
