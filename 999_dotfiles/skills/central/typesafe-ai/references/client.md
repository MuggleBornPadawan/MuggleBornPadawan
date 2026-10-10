# TypeSafe Client Example (lazy load)

> Load only when wiring Jev API.

 (Babashka / JVM)

```clojure
(ns typesafe.client
  (:require [babashka.http-client :as http]
            [babashka.process :as p]
            [cheshire.core :as json]
            [clojure.string :as str]))

(def api-url "https://api.typesafe.ai/v1/systemone")

(defn get-api-key
  "Retrieves API key from environment variable or pass."
  []
  (or (System/getenv "TYPESAFE_API_KEY")
      (some-> (p/sh "pass" "TYPESAFE_API_KEY") :out str/trim)))

(defn evaluate-state
  "Evaluates state against a map of questions using TypeSafe Jev."
  ([state questions]
   (evaluate-state (get-api-key) state questions))
  ([api-key state questions]
   (let [body {:state state
               :model "jev-latest"
               :questions questions}
         resp (http/post api-url
                         {:headers {"Authorization" (str "Bearer " api-key)
                                    "Content-Type" "application/json"}
                          :body (json/generate-string body)})]
     (-> resp :body (json/parse-string true)))))

;; Example call:
(comment
  (def questions
    {:target_team {:type "choice"
                   :instructions "Assign ticket"
                   :criteria {:billing "Payments and pricing"
                              :tech "Bugs and system errors"}}
     :urgent {:type "noul"
              :instructions "Customer indicates urgent deadline"}})

  ;; Uses key from env or pass automatically:
  (evaluate-state {:message "Stripe webhook broken, urgent!"}
                  questions))
```

---

## Common Mistakes

| Mistake | Correction |
|---|---|
| Asking "Rate this proposal" in one score | Split into atomic scores: market size, viability, novelty. Combine in code. |
| Treating Noul `0.5` as "medium" | Noul `0.5` means 50% chance of yes. Use `score` for degree or intensity. |
| Calling API sequentially for each question | Put all questions into the `questions` map in a single request. |
| Parsing unstructured text from Jev | Jev never returns freeform text; use the typed output fields directly. |
## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
