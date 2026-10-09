---
name: napkin-math
description: Systems design estimation and back-of-the-envelope performance math. Use when sizing infrastructure, estimating throughput/latency for memory, SSD, network, serialization, and calculating cloud costs from first principles.
---

# Napkin Math & Systems Estimation

## Preamble (run first)
```bash
bb ~/.local/share/skills/harness-sync/scripts/skill-start.bb --skill napkin-math
```

Use this skill for back-of-the-envelope calculations to estimate system latency, throughput, and infrastructure costs before writing code or deploying systems.

---

## 1. Hardware & Latency Reference
Numbers rounded for memorization and quick mental math:

| Operation | Approximate Latency |
| :--- | :--- |
| Sequential Memory R/W (64 bytes) | `0.5 ns` |
| Hashing (non-crypto, 64 bytes) | `10 ns` |
| Random Memory R/W (64 bytes) | `20 ns` |
| System Call | `300 ns` |
| Hashing (crypto-safe, 64 bytes) | `100 ns` |
| Sequential SSD Read (8 KiB) | `1 μs` |
| Context Switch | `10 μs` |
| Sequential SSD Write, -fsync (8 KiB) | `2 μs` |
| TCP Echo Server (32 KiB) | `50 μs` |
| Random SSD Read (8 KiB) | `100 μs` |
| Network (Same Zone / VPC) | `100–250 μs` |
| Network (Same Region) | `250 μs` |
| Sequential SSD Write, +fsync (8 KiB) | `300 μs` |
| Database / Cache Query (MySQL, Redis) | `500 μs` |
| Sequential HDD Read (8 KiB) | `10 ms` |
| Random HDD Read (8 KiB) | `10 ms` |
| Blob Storage GET (first byte / 304) | `30–80 ms` |
| Blob Storage PUT | `200 ms` |

---

## 2. Throughput Reference

| Operation | Throughput | 1 MiB time | 1 GiB time |
| :--- | :--- | :--- | :--- |
| Sequential Memory R/W (Threaded) | `200 GiB/s` | `5 μs` | `5 ms` |
| Sequential Memory R/W (Single Thread) | `20 GiB/s` | `50 μs` | `50 ms` |
| Network (Same Zone / VPC) | `10 GiB/s` | `100 μs` | `100 ms` |
| Hashing (non-crypto) | `5 GiB/s` | `200 μs` | `200 ms` |
| Random Memory R/W | `3 GiB/s` | `300 μs` | `300 ms` |
| Fast Serialization / Deserialization | `1 GiB/s` | `1 ms` | `1s` |
| Decompression | `1 GiB/s` | `1 ms` | `1s` |
| Compression | `500 MiB/s` | `2 ms` | `2s` |
| Sorting (64-bit integers) | `500 MiB/s` | `2 ms` | `2s` |
| Standard JSON Serialization | `100 MiB/s` | `10 ms` | `10s` |
| Sequential HDD Read | `250 MiB/s` | `2 ms` | `2s` |
| Blob Storage GET / PUT (1 conn) | `100 MiB/s` | `10 ms` | `10s` |
| Cross-Region Network | `25 MiB/s` | `40 ms` | `40s` |
| Random HDD Read (8 KiB) | `0.7 MiB/s` | `2s` | `30m` |

---

## 3. Network Geography (RTT)

| Route | Latency (RTT) |
| :--- | :--- |
| Local VPC / Same Zone | `< 1 ms` |
| NA Central <-> East | `25 ms` |
| NA Central <-> West | `40 ms` |
| NA East <-> West | `60 ms` |
| EU West <-> NA East | `80 ms` |
| EU West <-> NA Central | `100 ms` |
| EU West <-> Singapore | `160 ms` |
| NA West <-> Singapore | `180 ms` |

---

## 4. Cloud Cost Baselines (Monthly / Approximate)

| Resource | Unit | Standard ($/mo) | 1-Yr Commit ($/mo) | Spot ($/mo) |
| :--- | :--- | :--- | :--- | :--- |
| CPU Core | 1 | `$15` | `$10` | `$2` |
| Memory | 1 GB | `$2` | `$1` | `$0.20` |
| Warehouse Storage / Blob S3/GCS | 1 GB | `$0.02` | — | — |
| Ephemeral SSD | 1 GB | `$0.08` | `$0.05` | `$0.05` |
| Regional SSD | 1 GB | `$0.35` | — | — |
| Inter-Region Network | 1 GB | `$0.02` | — | — |
| Internet Egress | 1 GB | `$0.10` | — | — |
| Logs / Traces | 1 GB | `$0.50` | — | — |

---

## 5. Estimation Rules of Thumb
1. **Memory is 1,000x faster than SSD:** RAM sequential access is ~0.5 ns; SSD random read is ~100 μs.
2. **Network trumps local compute:** A cross-region network hop (~100 ms) takes as long as millions of CPU instructions.
3. **Serialization is a bottleneck:** JSON serialization runs at ~100 MB/s, whereas fast binary protocols run at ~1 GB/s.
4. **Disk seeks kill performance:** Random HDD reads drop to 0.7 MB/s; always prefer sequential I/O or memory caching.
