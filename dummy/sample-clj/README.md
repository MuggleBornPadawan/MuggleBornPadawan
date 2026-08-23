# sample-clj

Sample Clojure project demonstrating idiomatic code + comprehensive edge-case tests.

## Structure
```
sample-clj/
├── deps.edn                       # Clojure CLI / tools.deps
├── project.clj                    # Leiningen (alternative)
├── src/sample_clj/
│   ├── core.clj                   # utility functions + -main
│   └── extract_tests.clj          # generates test-results.txt from the test suite
├── test/sample_clj/core_test.clj  # clojure.test suite (128 assertions)
└── test-results.txt               # generated: test summary + input/output tables
```

## Functions Covered
| Function | Description |
|---|---|
| `factorial` | n! with BigInt promotion, rejects negatives / non-ints |
| `fibonacci` | 0-indexed, handles big ints |
| `safe-divide` | nil-safe div-by-zero -> nil |
| `palindrome?` | case/punctuation-insensitive |
| `reverse-string` | nil-safe unicode |
| `truncate` | ellipsis logic + edge for max-len <3 |
| `find-median` | nil/empty -> nil, unsorted input |
| `deep-merge` | recursive map merge, nil-safe |
| `compact` | remove nils, keeps false/0/"" |
| `parse-int` | strict int parsing, overflow safe |

## Run

### Clojure CLI (deps.edn)
```bash
# run main
clj -M:run

# run tests (test-runner)
clj -X:test

# or classic
clj -M:test
```

### Leiningen
```bash
lein test
lein run
```

### Generate test-results.txt
Regenerates the report file (test summary + extracted inputs/expected outputs
table for every assertion). Always in sync with the current tests — never edit
`test-results.txt` by hand.

```bash
# Leiningen
lein run -m sample-clj.extract-tests

# Clojure CLI
clj -M:report
```

The extractor re-runs the full test suite first, then parses
`test/sample_clj/core_test.clj` as data (code-as-data) and classifies each
`(is ...)` form (`=`, `thrown?`, `nil?`, `not`, truthy calls). Exits non-zero
if any test fails.

## Edge Cases Tested
- **nil / empty / blank** inputs for every function
- **Zero, negative, boundary** values (0! , fib(0), median empty, max-len 0..3)
- **Type errors** (strings vs ints vs floats vs ratios where inappropriate)
- **Overflow / BigInt** promotion (factorial 30, fibonacci 100, Integer/MAX_VALUE)
- **Unicode / punctuation / whitespace** (palindrome, reverse-string, parse-int)
- **Falsy but not nil** (false, 0, "" kept by compact)
- **Unsorted / duplicate / even-odd** collections (find-median)
- **Nested nil maps & non-map overwrites** (deep-merge)
- **Ratios & doubles** (safe-divide)

## Requirements
- Java 8+ (tested on Java 25)
- Clojure 1.12.0
- Lein 2.12+ *or* Clojure CLI 1.12+
