---
name: system-design
description: "System design pattern playbook in 12 lines. Use when: system design interview, scalability, caching, queue, load balancer, sharding, CDN, rate limiting, circuit breaker, idempotency, observability."
---

# System Design — 12 Patterns

## Preamble (Run ONLY on interactive execution, NOT for read-only lookup)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill system-design
```
- Close: `bb ~/.local/share/skills/harness-sync/scripts/skill-end.bb --outcome success`

Source: Tanuj (@tanujDE3180) — Nov 1 2026 — "System Design in 12 lines" (2.3K views). Expanded with trade-offs and lean-box mapping.

---

## 1. The 12-Line Map

| # | Problem | Pattern | Core tech |
|---|---|---|---|
| 1 | Slow reads | Cache | Redis, Memcached |
| 2 | Write spikes | Queue buffer | Kafka, SQS, RabbitMQ |
| 3 | Too much traffic | Load balancer | NGINX, HAProxy, ALB, L4/L7 |
| 4 | Read-heavy DB | Read replicas | Postgres replicas, MySQL replicas |
| 5 | Write-heavy DB | Sharding | Hash/range sharding, Vitess |
| 6 | Slow queries | Indexes | B-tree, hash, GIN |
| 7 | Slow file loads | Object storage + CDN | S3/GCS + CloudFront/Cloudflare |
| 8 | Temporary failures | Retry with backoff | Exponential + jitter |
| 9 | Too many requests | Rate limiting | Token bucket, sliding window |
| 10 | One service failing | Circuit breaker | Resilience4j, Hystrix pattern |
| 11 | Duplicate requests | Idempotency keys | UUID + dedup table |
| 12 | Can't see what broke | Observability | Logs, metrics, tracing (OTel) |

---

## 2. Pattern Details — When / Trade-off / Lean-box note

### 1. Cache — slow reads
- **Solves:** DB/API latency, repeated reads.
- **Use when:** Read >> write, hot keys, cache hit > 80%.
- **Tech:** Redis (persistent), Memcached (ephemeral). Cache-aside is default.
- **Trade-off:** Invalidation hard; stale reads; thundering herd.
- **Guard:** TTL + write-through for strong consistency; single-flight / mutex on miss.
- **Lean box:** Prefer in-process cache (atom/LRU) before external Redis. External Redis only >1 instance.

### 2. Queue — write spikes
- **Solves:** Bursts, decoupling, async work.
- **Use when:** Producer faster than consumer, jobs tolerates delay.
- **Tech:** Kafka (ordered, durable), SQS (serverless).
- **Trade-off:** Async = eventual consistency; ordering + exactly-once hard; needs DLQ + backpressure.
- **Guard:** Idempotent consumer + retry limit.
- **Lean box:** Use `core.async` channel / SQLite queue before Kafka. Kafka only for cross-service durability.

### 3. Load balancer — too much traffic
- **Solves:** Horizontal scale, HA, TLS termination.
- **Use when:** >1 app instance or zero-downtime deploys.
- **Tech:** L4 TCP (fast), L7 HTTP (routing). Algorithms: round-robin, least-conn, consistent-hash.
- **Trade-off:** LB is choke point. Needs HA pair + health checks.
- **Lean box:** Single `bb`/http-kit instance often enough. Add LB only at >1 host.

### 4. Read replicas — read-heavy DB
- **Solves:** Scale reads without sharding.
- **Use when:** Read/write ratio > 5:1, replicas acceptable stale.
- **Trade-off:** Replication lag (ms to sec); routing complexity.
- **Guard:** Critical reads → primary; async replication → monitor lag.
- **Lean box:** Postgres + 1 replica max. Prefer cache + indexes first.

### 5. Sharding — write-heavy DB
- **Solves:** Write scale beyond single primary.
- **Use when:** Single primary CPU/IO saturated, data > 1 node.
- **Tech:** Hash sharding (even), range (query locality), directory service.
- **Trade-off:** Hard to reshape; cross-shard JOIN/tx expensive; hot shards.
- **Guard:** Choose stable shard key (`user_id`); use consistent hashing.
- **Lean box:** Do NOT shard default. Prefer vertical scale + indexes + SQLite/Postgres tuning first. Shard is last resort.

### 6. Indexes — slow queries
- **Solves:** Scan → seek.
- **Trade-off:** Faster reads, slower writes (+10-30%), more storage.
- **Guard:** Index selective columns, measure with `EXPLAIN`; avoid over-indexing >5 per table.
- **Lean box:** First optimization. Free and reversible.

### 7. Object storage + CDN — slow files
- **Solves:** Large/blob delivery, global latency.
- **Trade-off:** Eventual consistency; invalidation cost; cache purge delay.
- **Guard:** Immutable URLs (hash in filename) > purge.
- **Lean box:** Local `public/` + `bb http-server` for <10k files. S3+CDN only for global users.

### 8. Retry with backoff — temporary failures
- **Solves:** Transient network/5xx.
- **Use when:** Idempotent GET/PUT, timeout errors.
- **Guard:** Exponential backoff + jitter + cap (e.g., 3 retries, 100ms→1s). Never retry non-idempotent POST without key.
- **Anti-pattern:** Retry storm without jitter kills downstream.

### 9. Rate limiting — too many requests
- **Solves:** Abuse, fairness, downstream protection.
- **Tech:** Token bucket (burst), sliding window (smooth), leaky bucket.
- **Guard:** Per-user + per-IP + per-endpoint; return 429 + `Retry-After`.
- **Lean box:** In-memory token bucket before Redis-based gateway.

### 10. Circuit breaker — one service failing
- **Solves:** Prevent cascade.
- **States:** Closed → Open (fail fast) → Half-Open (probe).
- **Guard:** Timeout + fallback + bulkhead isolation.
- **Lean box:** Use only for external calls (payment, LLM API). Local calls use timeout.

### 11. Idempotency keys — duplicate requests
- **Solves:** Client retry, at-least-once delivery.
- **Guard:** Client sends `Idempotency-Key: UUID`; server stores result 24h; dedup on key+payload hash.
- **Critical for:** Payments, webhooks, queue consumers.

### 12. Observability — can't see what broke
- **Pillars:** Logs (event), Metrics (counter/gauge), Tracing (request path).
- **Stack:** Prometheus + Grafana (metrics), ELK/Loki (logs), Jaeger/OTel (traces).
- **Guard:** Correlation ID across services; structured JSON logs; alert on SLO not CPU.
- **Lean box:** `println` + `bb` + file logs before full OTel. Add metrics only for prod.

---

## 3. Decision Order (Interview Flow)

1. **Measure first** — `napkin-math` for QPS/latency/cost before patterns.
2. **Cheapest first:** Index → Cache → Replica → Queue → CDN → LB → Shard.
3. **State trade-off each step:** "Cache speeds reads but adds invalidation — use TTL 60s."
4. **Lean check:** "On single-host `bb`/Postgres, I would stop at cache+index."

---

## 4. Anti-Patterns

- Adding queue for sync request (adds latency, no benefit).
- Sharding at <10k writes/sec (operational debt).
- Cache without invalidation plan (stale forever).
- Retry without jitter or idempotency (duplicate charges).
- CDN without immutable assets (purge pain).

---

## 5. Interview Checklist

- [ ] Restate QPS, read/write ratio, latency SLO.
- [ ] Draw client → LB → API → cache → DB → queue/CDN path.
- [ ] For each pattern used, state 1 trade-off + 1 alternative not chosen.
- [ ] Mention capacity via `napkin-math` (e.g., "Redis 500μs, DB 10ms").
- [ ] Close with observability + failure modes.

---

## References

- `napkin-math` skill — latency/throughput/cost numbers.
- `performance` skill — local JVM hot-path (do before distributing).
- Original tweet: https://x.com/tanujDE3180/status/2116810542686064740
