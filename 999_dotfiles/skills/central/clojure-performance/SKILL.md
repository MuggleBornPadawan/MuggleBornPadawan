---
name: clojure-performance
triggers: [profile, benchmark, criterium, flame graph, hot loop]
anti-triggers: [cold code]
description: >-
  Performance engineering and optimization for Clojure. Use when profiling CPU or memory, diagnosing latency, eliminating GC pauses, optimizing hot loops, or writing zero-allocation Clojure pipelines.
---

# Clojure Performance Engineering
## Preamble (MANDATORY — run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill clojure-performance
```
- Capture SESSION_ID from output. Use for skill-end: `bb .../skill-end.bb --skill SKILL --session-id $SESSION_ID`

Optimization discipline for Clojure on the JVM.
Follow these steps to optimize hot paths without damaging idiomatic code.

## Core Rule: Measure First

Do not optimize without measurement.
Premature optimization damages Clojure readability and breaks REPL workflow.

1. **Profile first:** Identify the exact bottleneck function.
2. **Benchmark:** Get a reliable baseline number.
3. **Optimize:** Apply surgical changes to the hot path only.
4. **Verify:** Re-benchmark to confirm speedup and check allocations.

---

## 1. Profiling and Benchmarking

### Microbenchmarks: Criterium
Do not use `time` for microbenchmarks. Warm-up and GC distort results.

```clojure
(require '[criterium.core :as c])

;; Fast check (seconds)
(c/quick-bench (my-function arg))

;; Full statistical benchmark
(c/bench (my-function arg))
```

### System Profiling: clj-async-profiler
Profile workloads without JVM safepoint bias. Generate flame graphs.

```clojure
(require '[clj-async-profiler.core :as prof])

;; Profile block execution
(prof/profile (run-workload))

;; View flame graph in browser
(prof/serve-ui 8080)
```

---

## 2. Eliminate Compiler Friction

Enable compiler warnings at the top of performance namespaces:

```clojure
(set! *warn-on-reflection* true)
(set! *unchecked-math* :warn-on-boxed)
```

* `*warn-on-reflection*`: Warns when Clojure falls back to slow reflection.
* `*unchecked-math* :warn-on-boxed`: Warns when math operations box numbers into objects.

---

## 3. Hot-Path Patterns — see `references/patterns.md`
> Patterns A-G (primitive loops, transducers, transients, defrecord, arrays, StringBuilder, ByteBuffer) moved.
> SKILL.md keeps: Measure first → Profile → Benchmark → Optimize hot path only → Verify.

## 4. Checklist — see `references/patterns.md` for full verify list

## References
- Full patterns: `references/patterns.md`

## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
