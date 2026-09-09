# Writing Good Tests — Clojure Patch

**Load this reference when:** writing or changing `deftest`s, adding `with-redefs`/`with-test` fakes, or adding cleanup/helper for `clojure.test`.

> **Clojure adaption.** Original is TS/jest. This patch uses `clojure.test` + EDN literals + `with-redefs` at port boundary. Pure Markdown.

## Overview

A test exists to catch a specific break. Two principles govern everything:

```
1. Every deftest names the break it catches
2. Every deftest exercises the real thing
```

Strict TDD produces both naturally: a `deftest` written first and watched failing against real `defn` has already proven it can fail, and only earns a fake when the real dependency proves slow or external (DB/HTTP).

## Principle 1: Name the Break

Before writing the `deftest` body, answer: **what production change should make this `deftest` fail — and is that change a bug or a decision?** A `deftest` earns its place by catching a wrong branch, missing side effect, wrong arg, boundary case, or broken contract.

**Derive expectations independently.** Use EDN literals and hand-checked fixtures; table-driven `deftest` with literal `:want` values is the preferred shape. An expectation computed by the code under test — or its helpers — passes no matter what that code does:

```clojure
;; ❌ Mirror assertion: same builder computes both sides — always true
(let [expected (search/query {:tag "urgent"})]
  (is (= expected (search/query {:tag "urgent"}))))

;; ✅ Hand-derived literal
(is (= "tag:\"urgent\"" (search/query {:tag "urgent"})))
```

**No change detectors.** If only intentional decisions can fail a `deftest` — a `def` constant's value, exact string wording, private `defn-` structure — it fires on redesign and sleeps through bugs. Test the behaviour that depends on the decision: not `(is (= 5 max-retries))` but "a failing call is retried 5 times and the 6th never happens" via observable `:attempts`.

**Behaviour, not text.** Asserting that a `bb` script or `SKILL.md` contains an exact line proves only that source is source. Run scripts against controlled EDN inputs and assert outputs/side effects/exit codes. Docs that instruct agents are tested by consuming agent's behaviour (`writing-skills`); prose for humans earns no `deftest`.

**Your code, not the framework.** Test contract your code makes at its boundaries — the `ns` public `defn` you expose, the DDL you emit, the EDN payload you produce. Upstream mechanics (Ring handler invoke, `next.jdbc` execute) are their maintainers' tests. When upstream genuinely surprises you, write one narrow characterization `deftest` naming the assumption. Same inside your code: trivial forwarding `defn`s earn `deftest` only when they validate/normalize/default/derive/enforce — otherwise assert first consumer-visible result that depends on them.

### Gate Function

```
BEFORE writing the deftest body:
  Name the production change that would make this deftest fail.

  Cannot name one            → redesign around an observable behaviour
  "The source text changed"  → run the artifact and assert its effects
  Only intentional decisions → change detector; test the behaviour
                               that depends on the decision

  Confirm the expected value is derived without the code under test.
  IF it reuses the code's logic or helpers:
    Replace it with a literal EDN or hand-checked fixture
```

## Principle 2: Exercise the Real Thing

**The fake earns no assertions.** A `with-redefs` assertion passes when the fake is present and fails when absent — it says nothing about `ns`. Assert the real `ns` behaviour; if the fake is what you are checking, unmock it or delete assertion.

```clojure
;; ✅ Real behaviour via public defn
(is (= :email-required (:error (orders/validate {:email ""}))))

;; ❌ Fake existence
(with-redefs [db/find (fn [_] [{:mock true}])]
  (is (= [{:mock true}] (db/find {})))) ; tautology — proves redefs worked
```

**Your human partner's correction:** "Are we testing the behaviour of a fake?"

**Fake at the right level.** Learn every side effect of real `defn` before replacing it; fake the slow/external operation (DB `next.jdbc`/`http-client`) and keep what `deftest` depends on real. When unsure, run `deftest` against real impl first (in-memory `SQLite` or `with-redefs` minimal).

```clojure
;; ❌ Fake swallows the config write that duplicate detection reads
(with-redefs [catalog/discover-and-cache! (fn [_] nil)] ; swallows write
  (is (nil? (catalog/find :tool))))

;; ✅ Fake only the slow server startup; the EDN write stays real (temp file)
(with-redefs [server/start! (fn [_] {:port 9999})] ; slow part faked
  (catalog/discover-and-cache! tmp-dir)
  (is (some? (catalog/find tmp-dir :tool))))
```

**Make fakes specific.** When args/call counts/ordering are part of contract, assert them — a fake that accepts anything verifies nothing. Give each branch (success, error, malformed EDN) its own fixture or `atom` spy, so wrong branch cannot satisfy expectation.

**Mirror real data completely.** Fake the complete structure as it exists — all documented keys — not just ones your `is` reads. Partial fakes fail silently when downstream reads omitted key: `deftest` passes while integration breaks.

**Production `ns` carries production `defn` only.** Cleanup that only `deftest`s need lives in `test/` utilities (e.g. `test/helpers/db.clj`), never as `destroy!` on production `ns`. Ask: is this `defn` called only from `test/`? Does this `ns` own this resource's lifecycle? Wrong answers → `test` utility.

**Prefer real components over complex fakes.** When `with-redefs` setup outgrows `deftest` logic, fakes miss keys real components have, or `deftest` breaks when fake changes, switch to integration `deftest` with real components via `SQLite` in-memory DB or real `bb` EDN file. **Your human partner's question:** "Do we need to be using `with-redefs` here?"

### Gate Function

```
BEFORE adding with-redefs or test helper:
  List the real defn's side effects; keep the ones the deftest
  depends on real — fake the slow/external level below them.

  Fake responses mirror the complete real structure (all keys).

  A defn only tests call lives in test/helpers, not src/.

  About to assert on the fake itself?
    Unmock it or delete the assertion.
```

## Tests Ship With the Implementation

The TDD cycle — failing `deftest`, minimal `defn`, refactor — is what "complete" means. Ship the `deftest`s the behaviour needs and only those: trivial `defn` and human prose earn none, and a `deftest` written to satisfy process costs maintenance forever.

## The Mutation Check — Clojure

Before finishing, mentally mutate the production `defn`; at least one `deftest` should fail for each realistic mutation:

- Wrong constant or keyword arg
- Wrong `cond`/`case` branch
- Missing `assoc`/`dissoc` state change or side effect (DB write)
- Empty or default return `{}` / `nil`
- Missing validation for `""`, `nil`, `0`, `:unauthorized`, or malformed EDN

A mutation nothing catches marks behaviour as unprotected — or the `deftest` as tautological.

## Quick Reference — Clojure

| When you... | Do |
|-------------|-----|
| Write any `deftest` | Name the break it catches — a bug, not a decision |
| Build an expected EDN | Derive by hand; never with the `defn` under test |
| Test a `bb` script or `SKILL.md` | Run it / pressure-test its consumer; never grep its text |
| Reach for a dependency test | Test your `ns` boundary contract, not `next.jdbc` mechanics |
| Want to assert on faked `defn` | Test the real `ns`, or remove `with-redefs` |
| Are about to `with-redefs` a `defn` | Learn its side effects; fake the slow/external level |
| Build a fake EDN response | Mirror the real structure completely (all keys) |
| Need cleanup only tests use | Put it in `test/helpers` |
| Watch `with-redefs` setup balloon | Switch to integration `deftest` with real `SQLite`/file |
| Finish a `test/` file | Run the mutation check + `clj-kondo --lint` |

## Warning Signs — Clojure

- Setup and `is` share the same `(builder ...)` , guaranteeing equality
- `deftest` can fail only through `Exception`/`AssertionError`, not real branch
- `deftest` fails on every intentional `defn` rename, never on accidental breakage
- Expected EDN hidden behind builder/`->` helper, not literal
- `deftest` greps `src/` text, or asserts a removed symbol stays removed
- `deftest` would still matter if only `clojure.test` remained
- `deftest` exists for coverage, checking no side effect or outcome
- An `is` checks a `*-mock` key, or fails if you remove `with-redefs`
- A `defn` is called only from `test/` files
- `with-redefs` setup is more than half the `deftest`, or you can't explain why fake is needed
- Faking "just to be safe"
