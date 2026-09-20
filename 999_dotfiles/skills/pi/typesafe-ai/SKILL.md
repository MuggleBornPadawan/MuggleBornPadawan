---
name: typesafe-ai
description: Use when integrating with TypeSafe AI, querying the Jev model, formulating Choice, Score, or Noul questions, or building calibrated decision workflows.
---

# TypeSafe AI (Jev)

## Overview

TypeSafe AI provides the **Jev** model (`jev-latest`). Jev is a **System One** model:
* It does **not** generate text for humans.
* It evaluates typed questions against state data.
* It returns calibrated probabilities and confidence values as JSON.

---

## When to Use

Use TypeSafe AI when software needs narrow, structured judgments rather than open-ended text.

### Choosing the Question Primitive

| Goal                               | Primitive | Return Fields                           | Behavior                                           |
|------------------------------------|-----------|-----------------------------------------|----------------------------------------------------|
| Select one item from fixed options | `choice`  | `choice`, `probabilities`, `confidence` | Highest probability option selected.               |
| Rate content on ordered scale      | `score`   | `score`, `probabilities`, `confidence`  | Continuous score can interpolate between steps.    |
| Check if statement is true         | `noul`    | `noul` (0.0 to 1.0)                     | Returns probability of "yes". No confidence field. |

---

## Core Rules

1. **Keep questions atomic**:
   * Ask one specific question per item.
   * Do not ask complex multi-factor questions.
   * Combine separate factors in your own application code.
2. **Batch aggressively**:
   * Send all questions for the same state in **one** API request.
   * Questions run in parallel with negligible latency difference.
3. **Use speculative questions**:
   * Include optional questions in the call.
   * Ignore unwanted answers in code.
4. **Use confidence thresholds**:
   * **High confidence**: execute automated actions.
   * **Medium confidence**: ask user for confirmation or flag for review.
   * **Low confidence**: hand off to human agent.

---

## API Specification

* **Endpoint**: `POST https://api.typesafe.ai/v1/systemone`
* **Headers**:
  * `Authorization: Bearer <TYPESAFE_API_KEY>`
  * `Content-Type: application/json`
* **API Key Retrieval (`pass`)**:
  * Store in pass: `pass insert TYPESAFE_API_KEY`
  * Load in shell: `export TYPESAFE_API_KEY=$(pass show TYPESAFE_API_KEY)`
  * Never hardcode secrets in code or skill files.
* **Model**: `jev-latest`
* **Token limit**: ~32k tokens (~150k characters) shared across state and questions.

### Request Body Schema

```json
{
  "state": { "ticket_id": "123", "text": "Payment failed twice today." },
  "model": "jev-latest",
  "questions": {
    "category": {
      "type": "choice",
      "instructions": "Select the correct support department",
      "criteria": {
        "billing": "Invoices, payments, refunds",
        "technical": "Software bugs and crashes"
      }
    },
    "severity": {
      "type": "score",
      "instructions": "Customer frustration level",
      "criteria": [
        "Calm and informative",
        "Annoyed but professional",
        "Extremely angry"
      ]
    },
    "is_urgent": {
      "type": "noul",
      "instructions": "The customer reports production downtime"
    }
  }
}
```

---

## Clojure Example (Babashka / JVM)

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
