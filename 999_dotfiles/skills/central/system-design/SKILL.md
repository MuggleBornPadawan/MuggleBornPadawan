---
name: system-design
description: "Design with 12 system patterns. Use when cache, queue, sharding, load balancer, or scaling decision."
---

# System Design — 12 Patterns

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill system-design
```
- Close: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

## 1. The 12-Line Map

| # | Problem | Pattern | Core tech |
|---|---|---|---|
| 1 | Slow reads | Cache | Redis, Memcached |
| 2 | Write spikes | Queue buffer | Kafka, SQS |
| 3 | Too much traffic | Load balancer | NGINX, ALB, L4/L7 |
| 4 | Read-heavy DB | Read replicas | Postgres replicas |
| 5 | Write-heavy DB | Sharding | Hash/range (last resort) |
| 6 | Slow queries | Indexes | B-tree, GIN |
| 7 | Slow file loads | Object storage + CDN | S3 + CloudFront |
| 8 | Temporary failures | Retry with backoff | Exponential + jitter |
| 9 | Too many requests | Rate limiting | Token bucket |
| 10 | One service failing | Circuit breaker | Fail-fast + probe |
| 11 | Duplicate requests | Idempotency keys | UUID + dedup table |
| 12 | Can't see what broke | Observability | Logs, metrics, tracing |

Details + lean defaults: see `references/patterns.md`. Load only for chosen pattern.

## 2. Steps

1. Measure first — `napkin-math` for QPS/latency/cost.
2. Cheapest first: Index → Cache → Replica → Queue → CDN → LB → Shard.
3. State trade-off per pattern, e.g. cache speeds reads but needs TTL 60s.
4. Lean check: single-host `bb`/Postgres — stop at cache+index before distributing.

## 3. Anti-Patterns

- Queue for sync request. Shard at <10k writes/sec.
- Cache without invalidation. Retry without jitter/idempotency.
- CDN without immutable assets.

## 4. Design Review Checklist

- [ ] Define QPS, read/write ratio, latency SLO.
- [ ] Map client → LB → API → cache → DB → queue/CDN.
- [ ] Per pattern: 1 trade-off + 1 alternative not chosen.
- [ ] Validate via `napkin-math`. Include observability + failure modes.

## References

- `references/patterns.md` — full pattern details + Lean Clojure mapping.
- `napkin-math` skill — numbers. `performance` skill — local hot-path first.
