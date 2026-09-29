#!/usr/bin/env bb
;; classify_catalog.bb — Jev-powered catalog updater for images/catalog.edn
;; Usage:
;;   bb classify_catalog.bb                 ; dry-run preview (no write)
;;   bb classify_catalog.bb --dry-run       ; explicit preview
;;   bb classify_catalog.bb --yes           ; write auto+review, leave low-conf manual
;;   bb classify_catalog.bb --yes --force   ; write all even low confidence
;;   bb classify_catalog.bb --auto 0.85 --review 0.60
;;
;; Reads TYPESAFE_API_KEY from env or `pass show TYPESAFE_API_KEY`.
;; For each file on disk missing from catalog.edn, calls
;; https://api.typesafe.ai/v1/systemone with a single `choice` question.
;; Confidence gates: >=auto -> auto, >=review -> review, <review -> manual.

(require '[clojure.edn :as edn]
         '[clojure.java.io :as io]
         '[clojure.string :as str]
         '[babashka.process :as p]
         '[babashka.http-client :as http]
         '[cheshire.core :as json])

(def root (io/file "/home/rgroot/MuggleBornPadawan/000_refcards"))
(def img-dir (io/file root "images"))
(def catalog-file (io/file img-dir "catalog.edn"))
(def generate-script (io/file root "generate_gallery.bb"))

(def api-url "https://api.typesafe.ai/v1/systemone")
(def model "jev-latest")

(def criteria
  {:dsa              "Data structures, algorithms, Big-O, complexity, DSA patterns, LeetCode, arrays, graphs"
   :math             "Pure mathematics, algebra, geometry, calculus, equations, proofs, matrices, number theory, trigonometry"
   :physics          "Physics laws and concepts, mechanics, quantum, thermodynamics, optics, waves, fields, EM, energy, motion"
   :ai-agents        "LLM, AI agents, RAG, tokenization, prompting, reasoning, orchestration, neural networks, models"
   :system-design    "System design, architecture, APIs, microservices, scalability, databases, infra patterns, SAAS"
   :cloud-infra      "Cloud platforms AWS/GCP/Azure, EC2, cloud comparison, roadmaps, cloud infra"
   :dev-tools        "Developer tools, git, docker, kubernetes, linux, boot, languages, testing, concurrency, code style"
   :hardware-compute "Hardware compute, CPU/GPU/TPU/NPU/LPU, WebGPU, chips, memory, hardware diagrams"
   :science-misc     "General science, chemistry, biology, geography, statistics, periodic table, scientific heritage"
   :meta-misc        "Memes, careers, VC, productivity, humor, meta commentary, philosophy, social"})

(def instructions "Select the single best gallery category for this refcard image based on filename and hint text")

(defn get-api-key []
  (or (System/getenv "TYPESAFE_API_KEY")
      (let [{:keys [exit out]} (p/sh "pass" "show" "TYPESAFE_API_KEY")]
        (when (zero? exit) (str/trim out)))
      (throw (ex-info "No TYPESAFE_API_KEY found in env or pass" {}))))

(defn image-files []
  (->> (.listFiles img-dir)
       (filter #(.isFile ^java.io.File %))
       (map #(.getName ^java.io.File %))
       (filter #(re-matches #"(?i).+\.(png|jpe?g|svg)" %))
       sort vec))

(defn load-catalog []
  (if (.exists catalog-file)
    (edn/read-string (slurp catalog-file))
    []))

(defn hint-from-filename [f]
  (-> f
      (str/replace #"^x_" "")
      (str/replace #"\.(png|jpe?g|svg)$" "(?i)")
      (str/replace #"\.(png|jpe?g|svg)" "")
      (str/replace "_" " ")
      (str/replace "-" " ")
      (str/replace #"\s*\(1\)\s*" " ")
      str/trim
      (str/replace #"\s+" " ")
      str/lower-case))

;; Normalize catalog has case variations like x_Indian_Math... — compare case-sensitive disk names
(defn classify-one [api-key file]
  (let [hint (hint-from-filename file)
        body {:state {:file file :hint hint}
              :model model
              :questions {:category {:type "choice"
                                     :instructions instructions
                                     :criteria criteria}}}
        max-retries 3]
    (loop [attempt 1]
      (let [resp (try
                   (http/post api-url
                              {:headers {"Authorization" (str "Bearer " api-key)
                                         "Content-Type" "application/json"}
                               :body (json/generate-string body)})
                   (catch Exception e
                     {:error (.getMessage e)}))]
        (cond
          (:error resp)
          (if (< attempt max-retries)
            (do (Thread/sleep (* attempt 500)) (recur (inc attempt)))
            (throw (ex-info (str "HTTP error for " file ": " (:error resp)) {:file file})))

          (not= 200 (:status resp))
          (if (< attempt max-retries)
            (do (println (str "  retry " file " status " (:status resp) " attempt " attempt))
                (Thread/sleep (* attempt 800))
                (recur (inc attempt)))
            (throw (ex-info (str "API status " (:status resp) " for " file " body: " (:body resp))
                            {:file file :status (:status resp)})))

          :else
          (let [parsed (json/parse-string (:body resp) true)
                ans (get-in parsed [:answers :category])]
            (when-not ans
              (throw (ex-info (str "No answer for " file " body: " (:body resp)) {:file file})))
            {:file file
             :hint hint
             :choice (keyword (:choice ans))
             :confidence (:confidence ans)
             :probabilities (:probabilities ans)}))))))

(defn format-row [{:keys [file choice confidence probabilities]} auto-thr review-thr]
  (let [level (cond (>= confidence auto-thr) "AUTO"
                    (>= confidence review-thr) "REVIEW"
                    :else "MANUAL")
        probs (when probabilities
                (->> probabilities
                     (sort-by val >)
                     (take 3)
                     (map (fn [[k v]] (str (name k) ":" (format "%.2f" (double v)))))
                     (str/join " ")))]
    (format "%-45s -> %-16s conf %.2f [%-7s] top %s" file (name choice) (double confidence) level probs)))

(defn print-help []
  (println "classify_catalog.bb — Jev classifier for images/catalog.edn")
  (println "")
  (println "Usage:")
  (println "  bb classify_catalog.bb [opts]")
  (println "")
  (println "Opts:")
  (println "  --dry-run            Preview only, do not write catalog.edn (default)")
  (println "  --yes                Write results to catalog.edn (auto+review)")
  (println "  --force              With --yes, also write low-confidence (<review) entries")
  (println "  --auto 0.85          Auto threshold (default 0.85)")
  (println "  --review 0.60        Review threshold (default 0.60)")
  (println "  --regenerate         After write, run generate_gallery.bb")
  (println "  --help               Show this help")
  (println "")
  (println "Env:")
  (println "  TYPESAFE_API_KEY or `pass show TYPESAFE_API_KEY`")
  (println "")
  (println "Gates:")
  (println "  conf >= --auto   -> AUTO  (written)")
  (println "  conf >= --review -> REVIEW (written, flag for check)")
  (println "  conf <  --review -> MANUAL (skipped unless --force)"))

(defn parse-args [args]
  (loop [a args opts {:dry-run true :auto 0.85 :review 0.60 :force false :regenerate false}]
    (if (empty? a) opts
        (let [k (first a) r (rest a)]
          (cond
            (= k "--help") (assoc opts :help true)
            (= k "--dry-run") (recur r (assoc opts :dry-run true))
            (= k "--yes") (recur r (assoc opts :dry-run false))
            (= k "--force") (recur r (assoc opts :force true))
            (= k "--regenerate") (recur r (assoc opts :regenerate true))
            (= k "--auto") (recur (rest r) (assoc opts :auto (Double/parseDouble (first r))))
            (= k "--review") (recur (rest r) (assoc opts :review (Double/parseDouble (first r))))
            :else (do (println "Unknown arg:" k) (print-help) (System/exit 1)))))))

(defn -main [& args]
  (let [opts (parse-args args)]
    (when (:help opts) (print-help) (System/exit 0))
    (let [api-key (get-api-key)
          catalog (load-catalog)
          known (into {} (map (juxt :file :category) catalog))
          disk (image-files)
          missing (vec (sort (remove (set (keys known)) disk)))
          stale (vec (sort (remove (set disk) (keys known))))]
      (println (str "catalog: " (count catalog) " | disk: " (count disk)
                    " | missing: " (count missing) " | stale: " (count stale)))
      (when (seq stale)
        (println "WARN stale entries (in catalog but not on disk):")
        (doseq [f stale] (println " " f)))
      (if (empty? missing)
        (do (println "No missing files — catalog is up to date.") (System/exit 0))
        (do
          (println (str "Classifying " (count missing) " missing files via Jev (" model ") ..."))
          (println (str "Thresholds: AUTO >= " (:auto opts) " | REVIEW >= " (:review opts) " | MANUAL < " (:review opts)))
          (println "")
          (let [results (mapv (fn [f]
                                (print (str "  " f " ... "))
                                (flush)
                                (let [r (classify-one api-key f)]
                                  (println (str (name (:choice r)) " (" (format "%.2f" (:confidence r)) ")"))
                                  r))
                              missing)
                auto (filter #(>= (:confidence %) (:auto opts)) results)
                review (filter #(and (>= (:confidence %) (:review opts)) (< (:confidence %) (:auto opts))) results)
                manual (filter #(< (:confidence %) (:review opts)) results)]
            (println "")
            (println "Results:")
            (doseq [r (sort-by :file results)]
              (println (format-row r (:auto opts) (:review opts))))
            (println "")
            (println (str "Summary: AUTO " (count auto) " | REVIEW " (count review) " | MANUAL " (count manual)))
            (when (seq manual)
              (println "MANUAL files (low confidence, will be skipped unless --force):")
              (doseq [r manual] (println " " (:file r) "->" (name (:choice r)) (format "%.2f" (:confidence r)))))
            (if (:dry-run opts)
              (do
                (println "")
                (println "DRY RUN — no write. Run with --yes to update catalog.edn")
                (println "  bb classify_catalog.bb --yes            # write AUTO+REVIEW")
                (println "  bb classify_catalog.bb --yes --force    # write all including MANUAL"))
              (let [to-write (if (:force opts) results (remove #(< (:confidence %) (:review opts)) results))
                    skipped (when-not (:force opts) manual)]
                (when (seq skipped)
                  (println (str "Skipping " (count skipped) " MANUAL entries (use --force to include)")))
                (if (empty? to-write)
                  (println "Nothing to write — all were MANUAL and --force not set.")
                  (let [new-entries (map (fn [{:keys [file choice]}] {:file file :category (name choice)}) to-write)
                        merged (sort-by :file (concat catalog new-entries))
                        header ";; images/catalog.edn — source of truth for gallery viewer\n;; Edit :category values. New files on disk but missing here show as Uncategorized on top.\n;; Tags (10): dsa math physics ai-agents system-design cloud-infra dev-tools hardware-compute science-misc meta-misc\n"
                        body (str header (with-out-str (clojure.pprint/pprint merged)))
                        ;; pprint adds extra formatting; instead write EDN vector manually for stable diff
                        edn-lines (str header "[\n"
                                       (str/join "\n" (map (fn [{:keys [file category]}]
                                                             (str "{:file \"" file "\" :category \"" category "\"}"))
                                                           merged))
                                       "\n]\n")]
                    (spit catalog-file edn-lines)
                    (println (str "Wrote " (count new-entries) " new entries to " (.getPath catalog-file)))
                    (doseq [e new-entries] (println " +" (:file e) "->" (:category e)))
                    (when (:regenerate opts)
                      (println "Regenerating gallery...")
                      (let [{:keys [exit out err]} (p/sh "bb" (.getPath generate-script))]
                        (println out)
                        (when (not= 0 exit) (println "generate_gallery failed:" err))))
                    (when-not (:regenerate opts)
                      (println "Run `bb generate_gallery.bb` to refresh images/index.html"))))))))))))

(apply -main *command-line-args*)
