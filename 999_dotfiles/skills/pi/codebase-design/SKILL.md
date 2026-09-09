---
name: codebase-design
description: "Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam goes, make code more testable or AI-navigable, or when another skill needs the deep-module vocabulary. Clojure-adapted: ns seams, pure fns, data-oriented examples."
---

# Codebase Design — Clojure Patch

Design **deep modules**: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. Use this language and these principles wherever Clojure code is being designed or restructured. The aim is leverage for callers, locality for maintainers, and testability for everyone. **Clojure + lean-machine adapted.** See original at `https://github.com/mattpocock/skills` + pi `~/.pi/agent/skills/codebase-design`. Pure Markdown. Location: `~/.pi/agent/skills/codebase-design/` (global, pi).

## Glossary

Use these terms exactly: don't substitute "component," "service," "API," or "boundary." Consistent language is the whole point.

**Module**: anything with an interface and an implementation. Deliberately scale-agnostic: a pure `defn`, `ns`, package, or tier-spanning slice. _Avoid_: unit, component, service.

**Interface**: everything a caller must know to use the module correctly: the `defn` arities + `spec`/`malli` + invariants, ordering constraints, error modes (`:error` maps vs `ex-info`), required config, and performance characteristics. _Avoid_: API, signature (too narrow, they refer only to the type-level surface).

**Implementation**: what's inside a module, its body of code. Distinct from **Adapter**: a thing can be a small adapter with a large implementation (a Postgres `next.jdbc` repo) or a large adapter with a small implementation (an in-memory `atom` fake). Reach for "adapter" when the seam is the topic; "implementation" otherwise.

**Depth**: leverage at the interface. The amount of behaviour a caller (or `deftest`) can exercise per unit of interface they have to learn. A module is **deep** when a large amount of behaviour sits behind a small `ns` API, **shallow** when the API is nearly as complex as the implementation.

**Seam** _(Michael Feathers)_: a place where you can alter behaviour without editing in that place; the *location* at which a module's interface lives. In Clojure, usually a public `defn` in a `ns`, or a protocol. Where to put the seam is its own design decision, distinct from what goes behind it. _Avoid_: boundary (overloaded with DDD's bounded context).

**Adapter**: a concrete thing that satisfies an interface at a seam. Describes *role* (what slot it fills), not substance (what's inside). E.g. `postgres-orders-repo` vs `in-memory-orders-repo` both satisfy `OrdersRepo` protocol at the same seam.

**Leverage**: what callers get from depth. More capability per unit of interface they learn. One `ns` implementation pays back across N call sites and M `deftest`s.

**Locality**: what maintainers get from depth. Change, bugs, knowledge, and verification concentrate in one `ns` rather than spreading across callers. Fix once, fixed everywhere.

## Deep vs shallow

**Deep module** = small interface + lots of implementation:

```
┌─────────────────────┐
│   Small Interface   │  ← Few public defns, simple EDN args
├─────────────────────┤
│                     │
│  Deep Implementation│  ← Complex pure logic hidden
│                     │
└─────────────────────┘
```

**Shallow module** = large interface + little implementation (avoid):

```
┌─────────────────────────────────┐
│       Large Interface           │  ← Many defns, complex opts maps
├─────────────────────────────────┤
│  Thin Implementation            │  ← Just passes through to next.jdbc
└─────────────────────────────────┘
```

When designing an interface, ask:

- Can I reduce the number of public `defn`s in the `ns`?
- Can I simplify the EDN params (fewer keys, one map vs 5 args)?
- Can I hide more complexity inside (pure fns, private `defn-`)?

## Principles

- **Depth is a property of the interface, not the implementation.** A deep `ns` can be internally composed of small, mockable `defn-` helpers; they just aren't part of the public API. A module can have **internal seams** (private `defn-` or `letfn`, used by its own `deftest`s) as well as the **external seam** at its public `defn`.
- **The deletion test.** Imagine deleting the `ns`. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.** Callers and `deftest`s cross the same seam. If you want to test *past* the public `defn` (reach into `defn-`), the `ns` is probably the wrong shape — deepen or split.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't introduce a protocol/seam unless something actually varies across it (e.g. `PostgreSQL` vs `SQLite`/`atom` fake). One `ns` using `next.jdbc` directly is fine until a second adapter appears.

## Designing for testability — Clojure

Good `ns` APIs make `clojure.test` natural:

1. **Accept dependencies, don't create them.**

   ```clojure
   ;; Testable — inject via arg, fake with atom in deftest
   (defn process-order [order payment-gateway]
     (payment-gateway/charge payment-gateway (:total order)))

   ;; Hard to test — creates impl inside
   (defn process-order [order]
     (let [gateway (stripe-gateway/create!)] ; hidden creation
       (gateway/charge gateway (:total order))))
   ```

2. **Return data, don't produce side effects.**

   ```clojure
   ;; Testable — pure data
   (defn calculate-discount [cart] 
     {:discount (* 0.1 (:total cart)) :cart cart})

   ;; Hard to test — mutates / does IO
   (defn apply-discount! [cart-atom]
     (swap! cart-atom update :total #(* 0.9 %)))
   ```

3. **Small surface area.** Fewer public `defn`s = fewer `deftest`s needed. Fewer keys in opts map = simpler `is` setup. Prefer one EDN map arg over 5 positional args.

## Relationships

- A **Module** has exactly one **Interface** (the surface it presents to callers and `deftest`s). In Clojure, that's the `ns` public `defn` set + its `spec`.
- **Depth** is a property of a **Module**, measured against its **Interface**.
- A **Seam** is where a **Module**'s **Interface** lives (usually `ns` boundary or `defprotocol`).
- An **Adapter** sits at a **Seam** and satisfies the **Interface**.
- **Depth** produces **Leverage** for callers and **Locality** for maintainers.

## Rejected framings

- **Depth as ratio of implementation-lines to interface-lines** (Ousterhout): rewards padding the implementation. We use depth-as-leverage instead.
- **"Interface" as the `defprotocol` or `ns` public `defn`s**: too narrow: interface here includes every fact a caller must know (spec, invariants, error maps).
- **"Boundary"**: overloaded with DDD's bounded context. Say **seam** or **interface**.

## Going deeper — Clojure

- **Deepening a cluster given its dependencies**, see [DEEPENING.md](DEEPENING.md): dependency categories, seam discipline, and replace-don't-layer testing. For Clojure, think `deps.edn` graph + pure core vs side-effecting shell.
- **Exploring alternative interfaces**, see [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md): spin up parallel sub-agents to design the `ns` API several radically different ways (e.g. data-oriented vs protocol-oriented), then compare on depth, locality, and seam placement.

## Clojure + Pi Notes

- Prefer `deps.edn` + `clojure CLI` (1.12.6) for new work; respect `project.clj` if present. Minimal deps via `neil`.
- Idiomatic `->`/`->>` threading, namespaces clean of unused requires (`clj-kondo` + `cljfmt`).
- Verification seams: `bb test -n my.ns` or `clojure -M:test -n my.ns` at public `defn`, not `defn-`.
