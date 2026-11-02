# System Design — Pattern Details + Lean Mapping

Disclosed reference for `system-design` skill. Load only when evaluating a specific pattern.

## Pattern Details — When / Trade-off / Lean-box note

### 1. Cache — slow reads
- Solves: DB/API latency, repeated reads.
- Use when: Read >> write, hot keys, hit >80%.
- Tech: Redis (persistent), Memcached (ephemeral). Cache-aside default.
- Trade-off: Invalidation hard; stale reads; thundering herd.
- Guard: TTL + write-through; single-flight on miss.
- Lean: Prefer `atom` + `clojure.core.cache` (LRU 5k) before Redis. Redis (`carmine`) only >1 host.

### 2. Queue — write spikes
- Solves: Bursts, decoupling, async work.
- Use when: Producer faster than consumer, delay tolerable.
- Tech: Kafka (ordered, durable), SQS (serverless).
- Trade-off: Eventual consistency; ordering + exactly-once hard; needs DLQ.
- Guard: Idempotent consumer + retry limit.
- Lean: `core.async` chan + SQLite queue (`next.jdbc`, WAL) before Kafka.

### 3. Load balancer — too much traffic
- Solves: Horizontal scale, HA, TLS termination.
- Use when: >1 instance or zero-downtime deploys.
- Tech: L4 TCP (fast), L7 HTTP (routing). Round-robin, least-conn, consistent-hash.
- Trade-off: LB is choke point. Needs HA pair + health checks.
- Lean: Single `bb`/`http-kit` + `Ring` often enough. NGINX/ALB only >1 host.

### 4. Read replicas — read-heavy DB
- Solves: Scale reads without sharding.
- Use when: Read/write >5:1, stale acceptable.
- Trade-off: Replication lag; routing complexity.
- Guard: Critical reads → primary; monitor lag.
- Lean: Postgres (`next.jdbc`+`HikariCP`) +1 replica max. Prefer cache + indexes first.

### 5. Sharding — write-heavy DB
- Solves: Write scale beyond single primary.
- Use when: Single primary saturated, data >1 node.
- Tech: Hash (even), range (locality), directory service.
- Trade-off: Hard reshape; cross-shard JOIN/tx expensive; hot shards.
- Guard: Stable shard key (`user_id`); consistent hashing.
- Lean: Do NOT shard. Vertical scale + indexes first. Last resort.

### 6. Indexes — slow queries
- Solves: Scan → seek.
- Trade-off: Faster reads, slower writes (+10-30%).
- Guard: Index selective columns, `EXPLAIN`; avoid >5 per table.
- Lean: First optimization. Free and reversible.

### 7. Object storage + CDN — slow files
- Solves: Blob delivery, global latency.
- Trade-off: Eventual consistency; purge delay.
- Guard: Immutable URLs (hash in filename) > purge.
- Lean: Local `public/` + `bb http-server` for <10k files.

### 8. Retry with backoff — temporary failures
- Solves: Transient network/5xx.
- Use when: Idempotent GET/PUT, timeouts.
- Guard: Exponential + jitter + cap (3 retries, 100ms→1s). Never retry non-idempotent POST without key.

### 9. Rate limiting — too many requests
- Solves: Abuse, fairness, downstream protection.
- Tech: Token bucket (burst), sliding window (smooth).
- Guard: Per-user + per-IP + per-endpoint; 429 + `Retry-After`.
- Lean: In-memory token bucket before Redis gateway.

### 10. Circuit breaker — one service failing
- Solves: Prevent cascade.
- States: Closed → Open (fail fast) → Half-Open (probe).
- Guard: Timeout + fallback + bulkhead.
- Lean: External calls only (payment, LLM API).

### 11. Idempotency keys — duplicate requests
- Solves: Client retry, at-least-once delivery.
- Guard: Client sends `Idempotency-Key: UUID`; store result 24h; dedup on key+payload hash.
- Critical for: Payments, webhooks, queue consumers.

### 12. Observability — can't see what broke
- Pillars: Logs, Metrics, Tracing.
- Stack: Prometheus+Grafana, ELK/Loki, Jaeger/OTel.
- Guard: Correlation ID; structured JSON logs; alert on SLO not CPU.
- Lean: `timbre`/`tools.logging` + file logs before OTel.

## Lean Clojure Stack Mapping

| Pattern | Lean default | Scale-out (only when `napkin-math` proves saturation) |
|---|---|---|
| Cache | `atom` + `clojure.core.cache` (LRU) | Redis (`carmine`) only if >1 host |
| Queue | `core.async` chan + SQLite queue (WAL) | Kafka / SQS only cross-service |
| DB | SQLite / Postgres (`next.jdbc`+`HikariCP`) + indexes | Postgres +1 replica max; shard last resort |
| HTTP/LB | `http-kit` / `Ring` single instance | NGINX / ALB only at >1 host |
| Files | `public/` + `bb http-server` (<10k files) | S3/GCS + CDN (global users) |
| Observability | `timbre` + file logs | Prometheus+Grafana + OTel prod only |
| **Rule** | Stay left column | Move right only after `EXPLAIN` + `napkin-math` |
