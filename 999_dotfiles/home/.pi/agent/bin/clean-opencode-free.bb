#!/usr/bin/env bb
;; Sync ~/.pi/agent/settings.json enabledModels with current opencode free models.
;; Use: bb clean-opencode-free.bb [--check] [--include-zero-cost]
;;   --check: only show drift, do not write
;;   --include-zero-cost: also include opencode models with zero cost (ex: big-pickle)
(require '[cheshire.core :as json]
         '[clojure.string :as str])

(def home (System/getenv "HOME"))
(def store-file (str home "/.pi/agent/models-store.json"))
(def settings-file (str home "/.pi/agent/settings.json"))

(def args (set *command-line-args*))
(def check? (contains? args "--check"))
(def include-zero? (contains? args "--include-zero-cost"))

(def store (json/parse-string (slurp store-file) true))
(def settings (json/parse-string (slurp settings-file) true))

(def opencode-models (get-in store [:opencode :models] []))

(defn free? [m]
  (let [id (str/lower-case (or (:id m) ""))]
    (str/includes? id "free")))

(defn zero-cost? [m]
  (let [c (:cost m {})]
    (and (zero? (or (:input c 1)))
         (zero? (or (:output c 1))))))

(def fresh-ids
  (->> opencode-models
       (filter (fn [m] (or (free? m)
                           (and include-zero? (zero-cost? m)))))
       (map :id)
       (map #(str "opencode/" %))
       sort
       vec))

(def old-models (vec (:enabledModels settings [])))
(def other-models (vec (remove #(str/starts-with? % "opencode/") old-models)))
(def new-models (vec (concat other-models fresh-ids)))

(def stale (remove (set fresh-ids)
                   (filter #(str/starts-with? % "opencode/") old-models)))

(println "Fresh free models:" (count fresh-ids))
(doseq [id fresh-ids] (println "  +" id))
(when (seq stale)
  (println "Stale entries to drop:" (count stale))
  (doseq [id stale] (println "  -" id)))
(when (seq other-models)
  (println "Kept non-opencode entries:" (count other-models)))

(if check?
  (if (= old-models new-models)
    (println "OK: settings already clean.")
    (println "DRIFT: run without --check to fix."))
  (if (= old-models new-models)
    (println "OK: no change needed.")
    (do (spit settings-file
               (json/generate-string (assoc settings :enabledModels new-models)
                                     {:pretty true}))
        (println "WROTE:" settings-file))))
