---
title: "Proving What AI Generates: Running Formally Verified Lean 4 Inside Clojure Services"
published: true
description: "How the Ansatz Lean/JVM bridge turns theorem proving into a practical ground-truth loop for autonomous coding agents handling financial logic."
tags: clojure, java, ai, lean4
canonical_url: https://simm.is/blog/lean-on-the-jvm/
---

> **TL;DR:**
> - Unit tests only check sample points; formal verification in **Lean 4** mathematically guarantees logic for *all* inputs.
> - The new **Ansatz Lean/JVM SDK (`org.replikativ/ansatz-lean-jvm:0.2.615`)** lets you compile Lean into an intermediate artifact (`.leanjvm`) and interpret it directly on standard OpenJDK 17+ with zero native C/JNI dependencies.
> - This article demonstrates how an AI coding agent can write financial ledger invariants, self-correct via Lean compiler proofs, and deploy proved code into a Clojure service.

---

*Credit & Attribution: This workflow builds on the breakthrough work by the Simmis team introducing the [Ansatz Lean/JVM SDK](https://simm.is/blog/lean-on-the-jvm/) (`org.replikativ/ansatz-lean-jvm`). The financial settlement walkthrough below illustrates these mechanics applied to autonomous agent engineering.*

---

## The LLM Reliability Wall in Production

Every engineering team deploying autonomous AI coding agents eventually runs into the **LLM Reliability Wall**.

An agent prompted to generate an account transfer or settlement routine writes clean code in seconds. It even produces dozens of passing unit tests. But unit tests only sample finite scenarios. In financial ledgers, the bug that triggers insolvency is never the one tested by a handful of mock transactions—it lurks in the untested corner case where an overdraft limit, a currency conversion edge, and a zero-sum constraint collide.

For decades, formal methods offered the mathematical antidote: **prove** that code satisfies invariants for *all* possible inputs using proof assistants like [Lean 4](https://lean-lang.org/). But Lean code was traditionally an island:
- Native binaries required brittle JNI or Panama bridges.
- Memory models clashed: Lean frees memory via reference counting, while the JVM uses a garbage collector. Cycles across the boundary leak memory.
- Deployed servers required the full native Lean toolchain installed.

The release of the **Ansatz Lean/JVM SDK (`org.replikativ/ansatz-lean-jvm:0.2.615`)** changes this equation. It provides a pure JVM intermediate-representation (IR) interpreter that runs proved Lean functions directly on stock OpenJDK 17+.

This unlocks an autonomous ground-truth loop: **agents synthesize formally verified invariants in Lean, prove them against the Lean compiler, and deploy them directly into production Clojure and Java microservices.**

---

## The Architecture: Build-Time Proofs, Run-Time JVM

```
┌────────────────────────────────────────────────────────┐
│                   BUILD & PROOF STAGE                  │
│               (Linux x86-64 / CI / Docker)             │
│                                                        │
│  AI Agent writes:                                      │
│  • Settlement logic                                    │
│  • Invariant theorems (Conservation & Solvency)        │
│                                                        │
│                     ▼                                  │
│         Lean 4.33.1 Toolchain Check                    │
│    [ Fails: Agent self-corrects proof ]                │
│    [ Passes: Proof erased, IR compiled ]               │
│                     ▼                                  │
│            ledger.leanjvm Artifact                     │
│          + SHA-256 Manifest Fingerprint                │
└────────────────────────┬───────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│                   PRODUCTION STAGE                     │
│              (Any OpenJDK 17+ Environment)             │
│                                                        │
│  Clojure / JVM Microservice                            │
│  • Loads ledger.leanjvm into pure Java Interpreter     │
│  • Zero native C / JNI / platform dependencies         │
│  • Managed 100% by JVM Garbage Collector               │
│  • Enforces instruction budgets (default: 2M ops)      │
│  • Exposes bidirectional host callbacks (IO)           │
└────────────────────────────────────────────────────────┘
```

The division of labor is clean:
1. **At build time**, native Lean compiles the source, checks the proofs, and strips them away. The compiler packages the intermediate code, types, and layouts into a portable `.leanjvm` artifact.
2. **At run time**, standard Clojure services interpret the intermediate representation. The production container needs no Lean toolchain.

---

## The Domain: A Conservation-of-Value Financial Settlement

Consider an account settlement function. The business requires two non-negotiable invariants:
1. **Solvency:** No account may be debited below its configured floor (zero).
2. **Conservation of Value:** The total amount debited must equal the total amount credited. No money appears or vanishes.

Let's see how an autonomous agent interacts with this system.

---

## 1. The Agent Self-Correction Loop

When an AI agent is instructed to write settlement logic, it often generates subtle bugs. Here is what happens when Lean's type checker acts as the agent's supervisor.

### Round 1: The Agent Hallucinates an Edge Case

The agent drafts an initial version in `Ledger.lean`:

```lean
namespace Ledger

def transfer (fromBal toBal amount : Nat) : (Nat × Nat) :=
  -- Naive transfer: subtracts without checking if balance < amount
  (fromBal - amount, toBal + amount)

theorem transfer_conserves_value (fromBal toBal amount : Nat) :
  let (f, t) := transfer fromBal toBal amount
  f + t = fromBal + toBal := by
  unfold transfer
  -- Proof attempt fails when amount > fromBal due to Nat underflow truncation!
```

In Lean, natural numbers (`Nat`) truncate subtraction at zero (`3 - 5 = 0`). Because of this, `fromBal - amount` breaks conservation of value whenever `amount > fromBal`!

The Lean compiler rejects the code:
```
error: unsolved goals
case h
fromBal toBal amount : Nat
⊢ (fromBal - amount) + (toBal + amount) = fromBal + toBal
```

The agent cannot hallucinate or hand-wave this failure away. The build stops cold.

### Round 2: Self-Correction with Machine-Checked Solvency

The agent reads the compiler error, realizes `Nat` subtraction truncates at zero, and refines the logic to guard the transfer:

```lean
namespace Ledger

def settleTransfer (fromBal toBal amount : Nat) : (Nat × Nat) :=
  if amount ≤ fromBal then
    (fromBal - amount, toBal + amount)
  else
    (fromBal, toBal) -- Rejected transfer preserves balances unchanged

/-- Theorem: Transfers strictly conserve total capital. -/
theorem settle_conserves_value (fromBal toBal amount : Nat) :
  let (f, t) := settleTransfer fromBal toBal amount
  f + t = fromBal + toBal := by
  unfold settleTransfer
  split
  · rename_i h
    omega
  · rfl

/-- Theorem: The sender account never drops below zero (solvency guarantee). -/
theorem settle_preserves_solvency (fromBal toBal amount : Nat) :
  let (f, _) := settleTransfer fromBal toBal amount
  f ≤ fromBal := by
  unfold settleTransfer
  split
  · rename_i h
    omega
  · rfl

end Ledger
```

Both proofs pass. Lean guarantees that no transaction can ever violate solvency or fabricate currency, across **all infinite combinations** of `Nat`.

---

## 2. Compiling the Verified Artifact

During the CI build (currently supported on Linux x86-64 with `prlimit`, or via Docker), the agent triggers artifact preparation:

```bash
java -cp "$SDK_CLASSPATH" ansatz.lean.jvm.LeanPreparation \
  --source ./ledger \
  --sysroot "$LEAN_SYSROOT" \
  --producer-bundle "$PRODUCER_BUNDLE" \
  --cache "$COMPILER_CACHE" \
  --root-module Ledger \
  --entry Ledger.settleTransfer \
  --output ./ledger.leanjvm
```

This generates `ledger.leanjvm` and prints its SHA-256 fingerprint:
`sha256:d8a2...3f10`

---

## 3. Running Inside Clojure at the REPL

In the production service, add the SDK dependency to `deps.edn`:

```clojure
{:deps {org.replikativ/ansatz-lean-jvm {:mvn/version "0.2.615"}}}
```

Load the artifact and invoke the formally proved function directly from the Clojure REPL:

```clojure
(ns ledger.core
  (:require [ansatz.lean.jvm :as lean]
            [clojure.java.io :as io]))

(defn run-settlement []
  (with-open [runtime (lean/open)
              input   (io/input-stream "ledger.leanjvm")
              project (lean/load-artifact runtime input (System/getenv "EXPECTED_MANIFEST_SHA256"))]
    (let [settle (lean/function project "Ledger.settleTransfer")]
      ;; 1. Valid transfer: $500 from Acc1 ($10,000) to Acc2 ($1,000)
      ;; 2. Overdraft attempt: $15,000 from Acc1 ($10,000) to Acc2 ($1,000)
      {:valid-transfer     (settle 10000 1000 500)
       :overdraft-rejected (settle 10000 1000 15000)})))

;; (run-settlement)
;; => {:valid-transfer     [9500N 1500N]
;;     :overdraft-rejected [10000N 1000N]}
```

Key runtime observations:
- Clojure passes standard numbers and receives back persistent vectors containing `java.math.BigInteger` instances.
- Zero JNI code or platform native bridges.
- Memory management is 100% handled by the JVM garbage collector.

---

## 4. Inversion of Control: Lean Calling Clojure

Real business operations require dynamic runtime data—like querying fee tiers from a database or configuration file.

Lean declares the external callback:

```lean
namespace Ledger

@[extern "ansatz_jvm_account_fee"]
opaque getAccountFee : String → IO Nat

def settleWithFee (fromBal toBal amount : Nat) (tier : String) : IO (Nat × Nat) := do
  let feeRate ← getAccountFee tier
  let fee := (amount * feeRate) / 1000
  let totalDebit := amount + fee
  if totalDebit ≤ fromBal then
    pure (fromBal - totalDebit, toBal + amount)
  else
    pure (fromBal, toBal)

end Ledger
```

In Clojure, supply the implementation under the declaration's name when loading the artifact:

```clojure
(def host-bindings
  {"Ledger.getAccountFee"
   {:implementation-id "fees/v1"
    :effect :io
    :fn (fn [tier]
          (case tier
            "vip"      0N     ;; Zero fee
            "standard" 15N    ;; 1.5% fee
            50N))}})          ;; Default 5.0%

(with-open [runtime (lean/open)
              input   (io/input-stream "ledger.leanjvm")
              project (lean/load-artifact runtime input 
                                          (System/getenv "EXPECTED_MANIFEST_SHA256")
                                          host-bindings)]
  ;; IO functions return an IOResult object carrying values or errors
  (let [result (lean/call project "Ledger.settleWithFee" 10000 1000 2000 "standard")]
    (if (.isOk result)
      (.getValue result)
      (throw (ex-info "Lean IO Error" {:cause (.getError result)})))))
;; => [7970N 3000N]  ; Total debit: 2000 + 30 fee = 2030
```

Mathematical proofs that parameterize over host inputs remain sound, even when values are resolved dynamically by host Clojure code.

---

## 5. Architectural Differentiator: Forkable Execution State

Why run Lean through a pure JVM interpreter instead of compiling hot machine code? 

The Simmis team highlighted an architectural breakthrough: **execution state forkability**.

Because Lean's entire execution state (call frames, heap objects, and registers) is stored as standard JVM heap objects, the engine can **clone that state mid-computation**. Pausing an engine allows branching it into two independent engines that proceed down separate computational paths.

> *Note: While the core Ansatz engine implements state forking internally today, the public SDK does not expose fork handles yet. It represents groundwork for upcoming releases.*

For future AI reasoning pipelines, this capability enables:
- **Counterfactual Branching:** An agent pauses a complex financial settlement, branches the execution into two what-if paths (e.g., assessing different liquidity routing strategies), and compares the outcomes.
- **Rollback without Transaction Resets:** Discarding a failed branch requires only dropping the cloned JVM object, with zero external database rollback needed.

---

## 6. Safety & Operational Guardrails

When executing autonomous agent code in production, defensive constraints are mandatory:

| Guardrail | Enforcement Mechanism |
|---|---|
| **Infinite Recursion / DOS** | Invocations run under strict instruction budgets (default: 2,000,000 steps) and wall-clock timeouts (default: 5.0s). |
| **Tampered / Stale Artifacts** | Artifact loading strictly validates the build-time SHA-256 manifest hash before execution. |
| **Error Isolation** | Out-of-budget calls fail cleanly with `ProjectFailed`. The service restarts the engine via `project.restart()`, discarding corrupted state while preserving verified code handles. |
| **Language Constraints** | The current release enforces closed, first-order signatures across host boundaries and caps project modules at 128 (beyond Lean's `Init`). |

---

## Conclusion

The conversation around AI coding agents has focused primarily on generating code and generating unit tests. But in high-consequence domains like finance, tests cannot establish absolute correctness.

By uniting **Lean 4's proof assistant** with the **JVM's operational maturity**, tools like Ansatz establish a practical verification bridge:
1. **Agents specify and prove** invariants rather than guessing implementations.
2. **The compiler enforces ground truth**, rejecting flawed edge cases with actionable counter-examples.
3. **The runtime executes natively on standard JVMs**, eliminating native operational overhead.

The future of autonomous systems isn't just agents that code faster—it's agents that prove their work before hitting production.

---

## Further Reading

- **Primary Source:** [Simmis: Lean on the JVM: proved functions for Java and Clojure](https://simm.is/blog/lean-on-the-jvm/)
- **SDK Artifact:** [`org.replikativ/ansatz-lean-jvm` on Clojars](https://clojars.org/org.replikativ/ansatz-lean-jvm)
- **Lean 4 Guide:** [Functional Programming in Lean](https://lean-lang.org/functional_programming_in_lean/) by David Thrane Christiansen

