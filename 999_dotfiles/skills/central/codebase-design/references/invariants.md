# Architectural Invariants (Codebase Design)

> Core functional rules to prevent architectural rot, distributed monoliths, and leaky abstractions.

---

## 1. Single Data Authority (Bounded Seams)

* **Invariant**: Every datastore table or entity has exactly **one** owning namespace/module.
* **Rule**: External callers must **never** read or write another module's SQL tables directly.
* **Enforcement**: All data access crosses the public query seam of the owning namespace.

```clojure
;; BAD: Module B queries foreign table 'users' directly
(ns app.billing (:require [next.jdbc :as jdbc]))
(defn bill-user [db user-id]
  (jdbc/execute! db ["SELECT email FROM users WHERE id = ?" user-id]))

;; GOOD: Module B calls Module A's public query seam
(ns app.billing (:require [app.users :as users]))
(defn bill-user [db user-id]
  (let [{:keys [email]} (users/get-account-data db user-id)]
    ;; ...
    ))
```

---

## 2. Minimal Viable Runtime (Operational Simplicity)

* **Invariant**: Default to the smallest viable compute and execution runtime.
* **Rule**: Never introduce distributed orchestration (Kubernetes, container clusters, service meshes) when a simple process, systemd unit, or single-node container suffices.
* **Runtime Order**:
  1. Single Babashka script or Clojure Uberjar on bare VM / systemd service.
  2. Single lightweight Docker container (only when system libraries require isolation).
  3. Distributed cluster (K8s) only when horizontal multi-node auto-scaling is proven necessary.

---

## 3. Clean Persistence Seam (Functional Core / Imperative Shell)

* **Invariant**: Isolate side-effecting SQL queries from pure business logic.
* **Rule**: Domain calculations must be 100% pure functions operating on plain EDN maps. Never construct or run SQL inside business workflows.
* **Enforcement**: SQL queries and `next.jdbc` calls live exclusively in persistence adapters at the system edge.

```clojure
;; BAD: Business logic mixed with inline SQL
(ns app.orders (:require [next.jdbc :as jdbc]))
(defn apply-discount! [db user-id order-id]
  (let [spend (:total (jdbc/execute-one! db ["SELECT SUM(amount) as total FROM orders WHERE user_id = ?" user-id]))]
    (if (> spend 1000)
      (jdbc/execute! db ["UPDATE orders SET discount = 0.1 WHERE id = ?" order-id]))))

;; GOOD: Pure logic separated from persistence seam
(ns app.orders.core)
(defn calculate-discount [total-spend]
  (if (> total-spend 1000) 0.1 0.0))

(ns app.orders.store
  (:require [next.jdbc :as jdbc] [honey.sql :as sql]))
(defn fetch-user-spend [db user-id]
  (:total (jdbc/execute-one! db (sql/format {:select [[:%sum.amount :total]]
                                            :from   [:orders]
                                            :where  [:= :user-id user-id]}))))
```

---

## 4. Configuration as Pure Data (Externalized Environment Seam)

* **Invariant**: Zero hardcoded environment values in code.
* **Rule**: URLs, ports, filesystem paths, and secrets must live outside application source files.
* **Enforcement**: Configuration enters at `-main` startup as a single validated EDN map. Pass config explicitly as arguments. Do not call `System/getenv` inside inner functions.

```clojure
;; BAD: Hardcoded URL and magic secrets in logic
(defn sync-data! [id]
  (http/post "https://api.internal/v1/sync" {:headers {"Auth" "secret123"}}))

;; GOOD: Injected explicit config map
(defn sync-data! [{:keys [api-url api-key]} id]
  (http/post (str api-url "/v1/sync") {:headers {"Auth" api-key}}))
```

---

## Audit Checklist

* [ ] **Data ownership**: Does any namespace query tables outside its domain?
* [ ] **Runtime**: Can the application run and test locally without heavy container daemons?
* [ ] **Pure core**: Can all business rules be tested without a database connection?
* [ ] **Config**: Are all credentials, paths, and ports supplied via external EDN/env at startup?
