# Computational Complexity

Complexity measures how **resource usage** (time or space) scales with input size `n`.

---

## Big-O Notation

Describes the **worst-case upper bound** — how growth behaves as `n → ∞`.

| Notation | Name | Example |
|---|---|---|
| `O(1)` | Constant | Hash map lookup |
| `O(log n)` | Logarithmic | Binary search |
| `O(n)` | Linear | Array scan |
| `O(n log n)` | Log-linear | Merge sort |
| `O(n²)` | Quadratic | Bubble sort, nested loops |
| `O(2ⁿ)` | Exponential | Brute-force subset enumeration |
| `O(n!)` | Factorial | Brute-force TSP permutations |

Growth order: `O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)`

---

## Time vs Space Complexity

- **Time** — number of operations executed
- **Space** — memory allocated (including call stack for recursion)

Often there's a trade-off: more memory → fewer operations.

---

## Complexity Classes (Decision Problems)

```
P ⊆ NP ⊆ NP-hard
```

| Class | Meaning |
|---|---|
| **P** | Solvable in polynomial time (`O(nᵏ)`) |
| **NP** | Solution *verifiable* in polynomial time |
| **NP-Complete** | Hardest problems in NP (e.g. SAT, 3-SAT) |
| **NP-Hard** | At least as hard as NP-Complete (may not even be in NP) |

> The **P vs NP** question ("can every verifiable problem be solved efficiently?") is the most famous open problem in CS.

---

## Amortized Analysis

Average cost per operation over a sequence — not worst-case per call.

- **Dynamic array `push`**: Usually `O(1)`, occasionally `O(n)` to resize → amortized `O(1)`

---

## Quick Rules of Thumb

- Each **nested loop** over `n` multiplies: 2 loops → `O(n²)`, 3 → `O(n³)`
- **Halving** the input each step → `O(log n)`
- **Recursion branching** `b` times, depth `d` → `O(bᵈ)`
- Drop constants and lower-order terms: `O(3n² + 5n + 7)` → `O(n²)`
