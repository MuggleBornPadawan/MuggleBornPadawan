---
title: "The Full-Stack Case for Clojure: AI, Concurrency, and Regulatory Reality"
published: true
description: "In an era defined by AI proliferation, distributed systems complexity, and tightening regulatory mandates, does Clojure's design philosophy position it as the most coherent engineering stack for 2024–2026? Here is the evidence."
tags: clojure, architecture, ai, concurrency
cover_image:
canonical_url:
---

In [*Beyond the Rewrite Trap*](https://dev.to/ganesh_rajendran_art/beyond-the-rewrite-trap-high-velocity-memory-safety-with-clojure-and-tiered-systems-2m9b), we established that Clojure's managed runtime eliminates 13 categories of memory corruption hazards while maintaining feature delivery velocity that monolithic rewrites cannot match. That argument was grounded in regulatory mandates — CISA, ONCD, the EU Cyber Resilience Act.

But memory safety is only one dimension of the case.

Three forces are reshaping software architecture in 2024–2026 at unprecedented speed:

1. **AI proliferation:** Every engineering organization is now running inference pipelines, embedding stores, LLM prompt chains, and streaming data transformations — often bolted onto stacks that were not designed for safe, composable data flow.
2. **Distributed systems complexity:** Microservice sprawl has created coordination overhead that is consuming teams faster than it is delivering value. Organizations are actively consolidating.
3. **Regulatory mandates:** Memory safety compliance requirements are now procurement blockers. The EU CRA, CISA roadmaps, and White House ONCD guidance are not advisory — they carry contractual and financial consequences.

The question this article addresses is broader than memory safety: **Is Clojure's design philosophy — immutability by default, managed concurrency primitives, a live REPL, a small composable core — the most coherent response to this confluence of forces?**

Here is the evidence.

---

## 1. The Framework Complexity Tax: Clojure's Small Core vs. the Industry

Modern backend stacks have accumulated a staggering complexity overhead. A production Spring Boot service ships with hundreds of transitive dependencies, annotation processors, reflection configuration, an XML/YAML hierarchy for environment switching, and a startup sequence that takes seconds. Django and Rails improved ergonomics at the cost of absorbing Rails idioms as architecture constraints.

This complexity compounds:
- Dependency graphs become unauditable.
- Security advisories arrive faster than teams can triage.
- Onboarding new engineers requires weeks of framework-specific orientation before the domain becomes legible.

Clojure's answer is radical minimalism. The language core — `clojure.core` — is approximately **600 functions**. The standard library ships no web framework, no ORM, no dependency injection container. Instead, the ecosystem provides thin, composable libraries that fit together via data:

```clojure
;; A complete, production-grade HTTP service configuration in Clojure
;; No annotation processors. No XML. No reflection config.
(def system-config
  {:server/http     {:port 8080 :handler #'app/router}
   :db/connection   {:jdbc-url (System/getenv "DATABASE_URL")}
   :cache/redis     {:uri (System/getenv "REDIS_URL")}
   :schema/validate {:registry schema/registry}})
```

This is not a simplified example. This *is* the configuration — a plain Clojure map that any editor, REPL, test, or migration script can inspect, transform, and validate without framework-specific tooling.

### The Dependency Audit Advantage

A typical Clojure production service has **15 to 40 direct dependencies**. A comparable Spring Boot service routinely carries **150 to 300**. Each dependency is an attack surface, a potential CVE, and a maintenance burden. For organizations operating under supply chain security requirements (SSDF, EU CRA Article 13), a smaller, auditable dependency graph is a direct compliance asset.

---

## 2. The AI-Era Data Pipeline: Immutability as the Native Primitive

The defining engineering problem right now is not compute — it is **safe, composable data transformation at scale**.

LLM pipelines ingest unstructured inputs, embed them, rank them, augment them with retrieval, pass them through prompt templates, parse structured outputs, validate them against schemas, and persist results. Every step produces data that feeds the next. If any step mutates shared state, the pipeline becomes non-deterministic, difficult to replay, and impossible to test in isolation.

This is precisely the problem Clojure was designed to solve. Persistent immutable data structures mean that every transformation yields a new value. The original is never mutated. The pipeline is a sequence of pure functions over data:

```clojure
(ns ai.pipeline
  (:require [malli.core :as m]
            [ai.embeddings :as embed]
            [ai.retrieval :as retrieval]
            [ai.llm :as llm]))

;; Each stage is a pure function: data in, data out. No shared mutable state.
(defn run-rag-pipeline
  "Retrieval-Augmented Generation pipeline. Pure, composable, replayable."
  [user-query context-config]
  (-> {:query    user-query
       :config   context-config
       :trace-id (random-uuid)}
      embed/vectorize-query          ;; Adds :embedding vector, returns new map
      retrieval/fetch-top-k-chunks   ;; Adds :chunks, returns new map
      llm/build-augmented-prompt     ;; Adds :prompt, returns new map
      llm/submit-inference           ;; Adds :response, returns new map
      validate-output-schema         ;; Throws on schema violation
      persist-trace))                ;; Returns final map with :trace persisted
```

Each function in this `->` pipeline receives an immutable map and returns an enriched one. Any step can be:
- **Unit tested in isolation** — just call the function with a test map.
- **Replayed from any checkpoint** — save the intermediate map, re-run from that stage.
- **Traced end-to-end** — the input and output of every step are values, not effects.

Compare this to Python's dominant pattern for ML pipelines, where mutable dictionaries, in-place NumPy array mutations, and global model registries produce pipelines that are notoriously difficult to unit test without end-to-end execution.

### Schema-Validated LLM Contracts with Malli

LLM outputs are notoriously unstructured. Clojure's `malli` library provides expressive runtime schemas that enforce structural contracts at every boundary without the overhead of a static type system:

```clojure
(def LLMResponseSchema
  [:map
   [:response/text    [:string {:min-count 1 :max-count 8192}]]
   ;; String enums match provider API identifiers. Extend as your model roster grows.
   [:response/model   [:string {:min-count 1}]] ;; or use [:enum ...] for a fixed allowlist
   [:response/tokens  [:map
                       [:prompt   [:int {:min 0 :max 128000}]]
                       [:completion [:int {:min 0 :max 8192}]]]]
   [:response/latency-ms [:int {:min 0}]]])

(defn validated-inference
  "Calls LLM and enforces structural contract on the response.
  Throws immediately with a detailed path-aware error on violation."
  [prompt model-config]
  (let [raw-response (llm/call! prompt model-config)]
    (if (m/validate LLMResponseSchema raw-response)
      raw-response
      (throw (ex-info "LLM response schema violation"
                      {:errors (m/explain LLMResponseSchema raw-response)
                       :model  (:model model-config)})))))
```

This is not type-checking in the static sense — it is **contract enforcement at the domain boundary**, exactly where unstructured AI outputs meet structured application logic. Malli's error messages include path-level diagnostics that are significantly more actionable than generic type errors.

---

## 3. The Concurrency Model: Separating Identity from State

The dominant concurrency abstractions in popular languages have known structural weaknesses:

| Language / Runtime                   | Concurrency Model                       | Known Failure Mode                                                                    |
|--------------------------------------|-----------------------------------------|---------------------------------------------------------------------------------------|
| **Python asyncio**                   | Cooperative, single-threaded event loop | Blocking calls corrupt the event loop; CPU-bound work requires process isolation      |
| **Go goroutines + channels**         | M:N scheduling, explicit channels       | Channel deadlocks; shared mutable state via pointers requires discipline              |
| **Java/Kotlin threads + locks**      | OS thread pool + synchronized           | Lock inversion deadlocks; lost updates under contention                               |
| **Node.js event loop**               | Single-threaded async                   | Same as Python asyncio; long-running work blocks all concurrent requests              |
| **Clojure atoms + STM + core.async** | Value semantics + managed references    | *Structural data races are impossible; deadlocks require deliberate reference cycles* |

Clojure's insight, articulated by Rich Hickey in *Are We There Yet?* (2009), is that most concurrency bugs are caused by conflating **identity** (the thing that changes over time) with **state** (a particular value at a point in time). Once these are separated, most lock-free concurrency becomes trivial.

### Atoms: Lock-Free CAS for Independent State

```clojure
;; An atom wraps a value. Updates are atomic compare-and-swap (CAS).
;; No locks. No synchronized blocks. No deadlocks possible.
(def request-counter (atom {:total 0 :errors 0 :in-flight 0}))

(defn record-request-start! []
  ;; swap! applies a pure function to the current value atomically.
  ;; If another thread races, swap! retries automatically.
  (swap! request-counter update :in-flight inc))

(defn record-request-end! [success?]
  (swap! request-counter
         (fn [counters]
           (-> counters
               (update :total inc)
               (update :in-flight dec)
               (cond-> (not success?) (update :errors inc))))))
```

There is no mutex here. No `synchronized`. No possibility of forgetting to unlock under an exception path. The atom guarantees that the update function is applied atomically — retrying automatically on contention — and that all observers see a consistent, immutable snapshot.

### Software Transactional Memory: Coordinated State Changes

When multiple pieces of state must change together consistently — a bank transfer, a seat reservation, a cache invalidation — Clojure's `ref` and `dosync` provide Software Transactional Memory (STM):

```clojure
(def account-balances (ref {"alice" 5000 "bob" 2000}))
(def transaction-log  (ref []))

(defn transfer!
  "Atomically transfers amount between accounts. Either both changes commit or neither does.
  No locks, no deadlocks, full MVCC isolation."
  [from to amount]
  (dosync
    (let [from-balance (get @account-balances from)]
      (when (< from-balance amount)
        (throw (ex-info "Insufficient funds" {:from from :balance from-balance})))
      ;; Both refs update atomically within this transaction
      (alter account-balances update from - amount)
      (alter account-balances update to   + amount)
      (alter transaction-log conj {:from from :to to :amount amount
                                   :timestamp (java.time.Instant/now)}))))
```

This is the same semantics as a database transaction — Atomicity, Isolation, Consistency — in application memory, without an external process or network hop.

### core.async: Communicating Sequential Processes

For streaming pipelines, fan-out architectures, and backpressure-aware queues, `core.async` provides Go-style CSP channels on the JVM and in ClojureScript:

```clojure
(require '[clojure.core.async :refer [chan go <! >! close! pipeline-async]])

;; Bounded channel — provides automatic backpressure
(def inference-queue (chan 64))
(def results-channel (chan 64))

;; Process N inferences in parallel, preserving order, with backpressure
(pipeline-async
  8                   ;; parallelism
  results-channel     ;; output channel
  (fn [request result-ch]
    ;; go (not go-loop) — a single async operation: infer, put result, close.
    (go
      (>! result-ch (llm/infer! request))
      (close! result-ch)))
  inference-queue)
```

Critically, `core.async` channels work identically in Clojure (JVM) and ClojureScript (browser/Node.js). The same concurrency model — same semantics, same API — operates across your entire full-stack surface.

---

## 4. The REPL vs. The Notebook: Developer Velocity Reframed

The Python data science community popularized the Jupyter notebook as a live, interactive development environment. It was a step forward from edit-compile-run cycles. But notebooks carry well-documented structural problems:

- **Hidden execution order:** Cells can be run out of sequence, creating non-reproducible states.
- **No structural testing:** Notebooks resist unit testing by design.
- **Version control noise:** JSON-serialized output diffs obscure code changes in pull requests.
- **Global mutable state:** Variables persist across cell re-executions unpredictably.

Clojure's REPL is a different category of tool. It is not a notebook — it is a **live connection to a running production-equivalent JVM process**, operated directly from the source file:

```clojure
;; In your editor (Emacs, VS Code + Calva, IntelliJ + Cursive):
;; Evaluate this form with Ctrl+Enter — result appears inline in <15ms.

(defn analyze-embedding-drift
  "Measures cosine distance between current and baseline embedding distributions."
  [current-embeddings baseline-embeddings]
  (->> (map vector current-embeddings baseline-embeddings)
       (map (fn [[a b]] (cosine-distance a b)))
       (stats/descriptive-summary)))

;; Evaluate against live data in the running server — no restart needed:
(analyze-embedding-drift
  @current-model/embeddings
  @baseline/reference-embeddings)
;; => {:mean 0.0431, :p95 0.112, :max 0.287, :n 42000}
```

The key distinction: **the REPL evaluates code against the actual running system state.** You are not simulating; you are inspecting and modifying production-equivalent logic against real data, with real database connections, in the same JVM that serves your HTTP traffic — all while the server continues handling requests.

This feedback loop collapses the edit → build → restart → verify cycle to under a second. For teams iterating on AI pipeline logic, schema transformations, or domain rule engines, this is a qualitative advantage over any notebook or REPL-less workflow.

---

## 5. Babashka: Clojure at the Command Line

One persistent gap in Clojure's adoption has been scripting and CLI tooling. The JVM's cold-start latency — typically 2 to 5 seconds — made it impractical for shell scripts, CI/CD hooks, and automation pipelines that require fast invocation.

**Babashka (`bb`)** closes this gap entirely.

Babashka is a native Clojure interpreter compiled via GraalVM, with a startup time of **under 15 milliseconds** and an RSS footprint of **15–35MB**. It includes a curated standard library covering HTTP, JSON, shell execution, file I/O, SQL, and CSV — without any dependency resolution:

```bash
# No JVM. No dependency download. Starts in <15ms.
# cheshire is bundled in Babashka — require it before use.
bb -e '(require (quote [cheshire.core :as json]))
       (-> (slurp "https://api.github.com/repos/babashka/babashka/releases/latest")
           (json/parse-string true)
           :tag_name
           println)'
# => v1.3.191
```

```clojure
#!/usr/bin/env bb
;; A complete CI validation script in idiomatic Clojure
(require '[babashka.process :refer [shell]]
         '[clojure.string :as str]
         '[cheshire.core :as json])

(defn check-service-health
  "Validates that all registered services report healthy status."
  [registry-url]
  (let [services  (-> (slurp registry-url) (json/parse-string true) :services)
        unhealthy (remove #(= "healthy" (:status %)) services)]
    (when (seq unhealthy)
      (println "UNHEALTHY SERVICES:")
      (doseq [svc unhealthy]
        (println " -" (:name svc) "→" (:status svc)))
      (System/exit 1))
    (println (str "All " (count services) " services healthy."))))

(check-service-health (or (first *command-line-args*)
                          "http://localhost:8500/v1/health/services"))
```

This is a production-grade health check script. It runs in 12ms. It is fully testable — the `check-service-health` function takes a URL and returns nothing (exits on failure) — and it is written in the same language as your backend services. Your entire engineering organization shares one language, one set of idioms, and one REPL, from production services to CI scripts to database migrations.

---

## 6. Full-Stack Coherence: ClojureScript + Shadow-CLJS

The conventional full-stack story requires an organization to maintain two distinct languages, two package managers, two module systems, two sets of idioms, and two testing philosophies — typically TypeScript/JavaScript on the frontend and Python, Go, Java, or Rust on the backend.

ClojureScript with **Shadow-CLJS** collapses this to a single language across the entire stack:

```clojure
;; This schema is defined once — shared between backend (Clojure/JVM)
;; and frontend (ClojureScript/Browser) via cljc (platform-agnostic) namespaces.
(ns app.schema
  #?(:clj  (:require [malli.core :as m])
     :cljs (:require [malli.core :as m])))

(def UserProfile
  [:map
   [:user/id    :uuid]
   [:user/email [:string {:min-count 5}]]
   [:user/role  [:enum :admin :viewer :editor]]])

;; validate-profile works identically on JVM (API layer) and Browser (form validation)
(defn validate-profile [profile]
  (m/validate UserProfile profile))
```

The `:cljc` file extension denotes a **platform-agnostic Clojure namespace** that compiles to both JVM bytecode and JavaScript. Schema definitions, domain logic, validation rules, and business calculations written once run anywhere.

Shadow-CLJS provides hot-reload semantics equivalent to Vite or Webpack HMR, with the additional advantage that ClojureScript's immutable data structures make state preservation across hot reloads safe by default — no manual state serialization required.

For organizations running React-style UIs, **Reagent** (a React wrapper) and **Re-Frame** (a Redux-like state machine built on Reagent) provide a battle-tested unidirectional data flow architecture, entirely in ClojureScript, with the same REPL-driven development workflow available on the backend.

---

## 7. Regulatory and Compliance Alignment in 2024–2026

The compliance dimension of this argument is not speculative. It is grounded in active regulatory instruments.

### Memory Safety Procurement Requirements

As established in Parts 1 and 2 of this series:

- **White House ONCD (2024):** Explicitly names Java/JVM runtimes as approved memory-safe languages alongside Rust, Go, C#, and Swift.
- **CISA Memory-Safe Roadmaps:** Requires technology vendors serving public sector contracts to publish migration plans away from memory-unsafe codebases.
- **EU Cyber Resilience Act (CRA):** Introduces punitive vendor liability for preventable software security flaws — including memory corruption vulnerabilities.

Clojure, running on HotSpot JVM or compiled via GraalVM Native Image, satisfies every listed criterion. The 95% attack surface elimination achieved by moving business logic to Clojure, analyzed in Part 2, is directly applicable here.

### Supply Chain Security: The Minimal Dependency Advantage

The EU CRA and the US Executive Order on Improving the Nation's Cybersecurity (EO 14028) both mandate **Software Bill of Materials (SBOM)** generation and dependency vulnerability tracking.

A Clojure service's dependency graph — 15 to 40 entries in `deps.edn` — is orders of magnitude easier to audit than a 300-dependency Maven or npm graph. `clj-holmes`, `nvd-clojure`, and `deps-audit` provide automated CVE scanning against the full transitive dependency tree. The tool surface is small enough that a security engineer can read every line of `deps.edn` in under ten minutes.

### Data Governance: Immutable Audit Trails

Regulated industries — finance, healthcare, government contracting — require tamper-evident audit logs and reproducible data transformations. Clojure's immutable-first architecture is a structural asset here:

```clojure
;; Every state change is an append-only transaction log entry.
;; No mutation. No overwrite. Full audit trail from day one.
(defn process-financial-event!
  "Applies an event to the ledger. The old ledger value is never mutated."
  [ledger-atom event]
  (swap! ledger-atom
         (fn [ledger]
           (-> ledger
               (update :entries conj (assoc event
                                            :timestamp (java.time.Instant/now)
                                            :id        (random-uuid)))
               (update :balance apply-event-to-balance event)))))
```

Datomic and XTDB — Clojure-native databases — extend this immutability to the persistence layer. Every fact written to Datomic carries a transaction timestamp and is **never overwritten** — only superseded by new facts. This provides built-in bitemporal audit history with no additional engineering.

---

## 8. The Skeptic's Corner: Honest Weaknesses

An evidence-based case requires honest accounting of real trade-offs.

### Talent Pool

Clojure's developer community, while deeply skilled, is significantly smaller than Java, Python, Go, or TypeScript communities. Hiring is harder. The interview funnel for Clojure-specific roles is narrower. Organizations adopting Clojure must invest in internal training or accept that recruiting will take longer.

**Mitigant:** Clojure's JVM foundation means Java developers can read and contribute to Clojure codebases with weeks of training rather than months. ClojureScript shares enough semantics with JavaScript that frontend engineers can transition. The language's small core reduces the total learning surface compared to framework-heavy stacks.

### Cold-Start Latency on JVM

Standard JVM startup for a Clojure service runs 2–5 seconds. For serverless functions or Lambda invocations where cold-start latency is a P99 metric, this is a material problem.

**Mitigant:** GraalVM Native Image produces standalone binaries with sub-100ms startup and 30–60MB RSS footprint. Babashka (<15ms) covers all CLI and scripting use cases. For long-running services — the primary Clojure deployment target — startup latency is a one-time cost per deployment, not a recurring performance factor.

### Dynamic Typing in Large Teams

Without compile-time type verification, large codebases can accumulate inconsistent data shapes that surface as runtime errors rather than editor-time warnings.

**Mitigant:** Malli and clojure.spec provide runtime schema enforcement at function boundaries. `clj-kondo` provides static analysis and type-hint inference that catches the majority of shape mismatches before deployment. The discipline of "data-driven APIs using validated maps" — the dominant Clojure idiom — eliminates most of the class of errors that static types are designed to catch.

---

## The Evidence, Assembled

| Engineering Concern (2024–2026) | Clojure's Structural Advantage                                                     |
|---------------------------------|------------------------------------------------------------------------------------|
| **AI pipeline safety**          | Immutable values make pipelines pure, testable, and replayable by default          |
| **LLM output validation**       | Malli schemas enforce structural contracts at every inference boundary             |
| **Concurrency**                 | Atoms (CAS), Refs (STM), core.async (CSP) — data races architecturally impossible  |
| **Developer iteration speed**   | Sub-second REPL feedback loop against live running system state                    |
| **CLI and automation**          | Babashka: <15ms startup, 30MB RSS, full Clojure, no JVM                            |
| **Full-stack coherence**        | ClojureScript + Shadow-CLJS: one language, one schema, one REPL across stack       |
| **Memory safety compliance**    | JVM-class MSL satisfying CISA, ONCD, NSA, and EU CRA mandates                      |
| **Supply chain auditability**   | 15–40 direct deps vs 150–300 in Spring/Django; full SBOM in <10 min                |
| **Regulatory audit trails**     | Immutable-by-default + Datomic/XTDB = structural compliance for finance/health/gov |
| **Framework complexity tax**    | ~600-function core, no mandatory framework; composable by data, not convention     |

---

## Is Clojure the Future Stack?

The honest answer is: it depends on what you are optimizing for.

If your engineering organization is running Python ML pipelines that are increasingly hard to test and replay, **Clojure's immutable data pipeline model is architecturally superior** for that workload.

If you are managing a concurrent service that is hemorrhaging debugging hours on race conditions and mutex complexity, **Clojure's atom/STM/CSP concurrency model eliminates the structural causes of those bugs**.

If you are operating under CISA, CRA, or ONCD compliance requirements and your current stack is C++ or Node.js, **Clojure on JVM satisfies every regulatory criterion** while delivering more developer velocity than a Rust rewrite.

If you need a team of three engineers to maintain a backend service, ten CLI automation scripts, two validation pipelines, and a reactive frontend — in one language, with one REPL, with one set of idioms — **Clojure is the only ecosystem that coherently covers that entire surface**.

The case is not that Clojure is perfect. The talent pool is real. The JVM cold start is real. The learning curve of parentheses and prefix notation is real.

The case is that the **design decisions Rich Hickey made in 2007** — immutability by default, managed concurrency primitives, a live interactive runtime, a small composable core, and a hosted philosophy that embraces the JVM rather than fighting it — **turn out to be precisely correct responses to the engineering problems of 2024–2026**.

That is not luck. That is convergent validity.

---

## References & Further Reading

### Series Articles
1. **Rajendran, G. (2024):** [*The Economics of Memory Safety: Inaction vs. The Cost of Rewriting* (Part 1)](https://dev.to/ganesh_rajendran_art/the-economics-of-memory-safety-inaction-vs-the-cost-of-rewriting-43in) — Foundational analysis of vulnerability lifecycle costs, regulatory mandates, and C++ limitations.
2. **Rajendran, G. (2024):** [*Beyond the Rewrite Trap: High-Velocity Memory Safety with Clojure and Tiered Systems* (Part 2)](https://dev.to/ganesh_rajendran_art/beyond-the-rewrite-trap-high-velocity-memory-safety-with-clojure-and-tiered-systems-2m9b) — Tiered architecture combining Clojure orchestration with Rust/C++ kernels.

### Language & Runtime
3. **Hickey, R. (2009):** [*Are We There Yet? A Deconstruction of Object-Oriented Time*](https://www.infoq.com/presentations/Are-We-There-Yet-Rich-Hickey/) — The philosophical foundation of Clojure's identity/state/value model.
4. **Hickey, R. (2012):** [*The Value of Values*](https://www.infoq.com/presentations/Value-Values/) — Value semantics vs. place-oriented programming.
5. **OpenJDK JEP 454 (2024):** [*Foreign Function & Memory API* (Project Panama)](https://openjdk.org/jeps/454) — Type-safe native memory access on modern JVM.

### Tooling
6. **Babashka:** [*babashka.org*](https://babashka.org) — Native Clojure scripting runtime with sub-15ms startup.
7. **Shadow-CLJS:** [*shadow-cljs.org*](https://shadow-cljs.org) — Full-stack ClojureScript build tooling with npm interop.
8. **Malli:** [*github.com/metosin/malli*](https://github.com/metosin/malli) — Data-driven schema, validation, and coercion for Clojure.

### Regulatory
9. **White House ONCD (2024):** [*Back to the Building Blocks*](https://bidenwhitehouse.archives.gov/wp-content/uploads/2024/02/Final-ONCD-Technical-Report.pdf) — Federal guidance designating JVM runtimes as approved memory-safe languages.
10. **CISA (2023):** [*The Case for Memory Safe Roadmaps*](https://www.cisa.gov/resources-tools/resources/case-memory-safe-roadmaps) — Procurement directives for technology manufacturers.
11. **European Union (2024):** [*Cyber Resilience Act (CRA)*](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) — Vendor liability framework for preventable software security flaws.
