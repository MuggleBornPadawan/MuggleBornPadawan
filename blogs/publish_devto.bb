#!/usr/bin/env bb

(require '[babashka.http-client :as http]
         '[cheshire.core :as json]
         '[clojure.java.shell :refer [sh]]
         '[clojure.string :as str])

(defn get-pass [path]
  (let [res (sh "pass" path)]
    (if (zero? (:exit res))
      (str/trim (:out res))
      (throw (ex-info "Failed to get pass secret" res)))))

(defn -main []
  (let [api-key (get-pass "dev.to")
        markdown (slurp "blog-compiler-vs-ai.md")
        title "The 'Sufficiently Smart Compiler' vs. AI: Who Wins the Future of Code?"
        payload {:article {:title title
                           :body_markdown markdown
                           :published true
                           :tags ["ai" "programming" "compilers" "architecture"]}}
        response (http/post "https://dev.to/api/articles"
                            {:headers {"api-key" api-key
                                       "Content-Type" "application/json"}
                             :body (json/generate-string payload)})]
    (println "Status:" (:status response))
    (println "Response body:")
    (println (:body response))))

(-main)
