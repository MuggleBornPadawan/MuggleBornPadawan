# Performance Patterns (lazy load)

> Load only when optimizing proven hot path.



Apply these patterns **only** to proven hot paths. Keep cold code idiomatic.

### A. Primitive Loops (Zero Heap Allocation)
Hint arguments and loop bindings to stay inside 64-bit CPU registers:

```clojure
(defn sum-up ^long [^long n]
  (loop [i (long 0)
         acc (long 0)]
    (if (< i n)
      (recur (unchecked-inc i) (unchecked-add acc i))
      acc)))
```

### B. Transducers over Lazy Sequences
Lazy sequences allocate `LazySeq` nodes and stress GC.
Use transducers for zero intermediate allocations:

```clojure
;; Slow: Allocates intermediate sequences
(->> data (map inc) (filter even?) (into []))

;; Fast: Zero intermediate collection allocations
(into [] (comp (map inc) (filter even?)) data)
```

### C. Transients for Batch Collection Building
Persistent collections copy paths on each change. Transients mutate safely:

```clojure
(defn build-vector [^long n]
  (loop [i (long 0)
         v (transient [])]
    (if (< i n)
      (recur (unchecked-inc i) (conj! v i))
      (persistent! v))))
```

### D. Direct Field Access on defrecord
Keyword lookups on `defrecord` are slower than standard maps.
Use direct property access on hot paths:

```clojure
(defrecord Person [^String name ^long age])
(def p (->Person "Alice" 30))

;; Fast: Direct JVM field access
(.-age ^Person p)

;; Slow: Dynamic keyword lookup
(:age p)
```

### E. Flat Memory Arrays
For numeric loops with high cache hit rates, use primitive arrays:

```clojure
(defn sum-array ^long [^longs arr]
  (let [len (alength arr)]
    (loop [idx (long 0)
           sum (long 0)]
      (if (< idx len)
        (recur (unchecked-inc idx)
               (unchecked-add sum (aget arr idx)))
        sum))))
```

### F. High-Frequency Strings
Avoid `(str ...)` in tight loops. Use `StringBuilder`:

```clojure
(defn build-string ^String [^long n]
  (let [sb (StringBuilder.)]
    (loop [i (long 0)]
      (if (< i n)
        (do (.append sb i)
            (recur (unchecked-inc i)))
        (.toString sb)))))
```

### G. Off-Heap Buffers (`ByteBuffer`)
For binary I/O, native FFM interop (Raylib, Panama), and zero-allocation byte transfers:

```clojure
(import '(java.nio ByteBuffer ByteOrder))

(defn write-packet ^ByteBuffer [^long id ^double val]
  (doto (ByteBuffer/allocateDirect 16)
    (.order ByteOrder/LITTLE_ENDIAN)
    (.putLong id)
    (.putDouble val)
    (.flip))) ;; Switch from write mode to read mode

(defn read-packet [^ByteBuffer buf]
  {:id (.getLong buf)
   :val (.getDouble buf)})
```

* Always type-hint `^ByteBuffer` to eliminate reflection.
* Use `allocateDirect` for off-heap buffers to avoid JVM GC overhead and enable zero-copy native I/O.
* Always specify `.order` (`ByteOrder/LITTLE_ENDIAN` or `ByteOrder/BIG_ENDIAN`).
* Call `.flip` after writing before reading. Call `.clear` before writing again.
* Avoid external wrapper libraries (`octet`, `byte-streams`). Use zero-dependency Java interop for Babashka compatibility and zero intermediate allocations.

---

## 4. State Containers Ranked by Overhead

1. **`volatile!`**: Lowest overhead. Direct JVM volatile read/write. Single-thread/isolated loop.
2. **`AtomicLong` / `AtomicReference`**: Hardware CAS instruction. Low overhead.
3. **`atom`**: Safe CAS, but adds watch/validator bookkeeping.
4. **`ref` (STM)**: High allocation and lock overhead. Avoid on latency paths.

---

## 5. Production Compilation: Direct Linking

By default, Clojure invokes functions through dynamic Vars. This prevents JIT inlining.

* **Flag:** `-Dclojure.compiler.direct-linking=true`
* **Result:** JIT inlines static method calls directly.
* **Caution:** **Never use in dev/REPL.** Direct linking stops interactive redefinition and breaks `with-redefs`. Use only for final production builds.

---

## Performance Verification Checklist

- [ ] Measured baseline with Criterium (`quick-bench`).
- [ ] Profiled flame graph with `clj-async-profiler`.
- [ ] Set `*warn-on-reflection* true` (zero reflection warnings).
- [ ] Set `*unchecked-math* :warn-on-boxed` (zero boxing warnings).
- [ ] Replaced lazy sequences on hot paths with transducers.
- [ ] Type-hinted numeric function arguments and returns (`^long`, `^double`).
- [ ] Type-hinted buffers (`^ByteBuffer`) and configured byte order for binary/native paths.
- [ ] Checked that dev REPL workflow remains intact.
## LLM Contract
- **Inputs:** file path | module ns | git diff | user args — resolve via read/bash before acting
- **Outputs:** concise markdown: table or bullets, no walls of text (ASD-STE100)
- **Tools allowed:** read, bash (lean: bb, rg, git), edit (surgical), write (only new files)
- **Stop condition:** task verified (bb test/clj-kondo/cljfmt if Clojure) + user confirmed if destructive
- **Lean box:** 6.3 Gi RAM — prefer bb over JVM, never ollama run/docker pull/clojure -P without ask
