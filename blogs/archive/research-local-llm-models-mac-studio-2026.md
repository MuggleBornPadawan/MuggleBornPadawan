# Research: Open-Weight Local LLM Models for Mac Studio M5 Ultra (Nov 2026)

> Context: Selecting the best open-weight models for a local AI Second Brain / PKM pipeline
> running via Ollama on Apple Silicon Mac Studio. Primary sources: Apple, Ollama, HuggingFace,
> benchmark sites.

---

## 1. Mac Studio M5 Ultra — Hardware Ground Truth

| Spec | Value | Source |
|---|---|---|
| **Release date** | September 22, 2026 | apple.com |
| **Unified memory** | 96 GB – 512 GB | apple.com |
| **Memory bandwidth** | up to **1.2 TB/s** | apple.com |
| **Neural Engine** | 32-core | apple.com |
| **AI perf vs previous gen** | 4.3× faster | apple.com |
| **Thunderbolt 5 clustering** | Multi-Studio RDMA pool | apple.com |

> M5 Ultra is real (not speculative). Announced Aug 25 2026, shipped Sep 22 2026.
> Entry config: 96 GB / 1 TB SSD at $5,499.

---

## 2. Model Landscape (November 2026)

### Tier A — Default / Unattended cron: `qwen3.8:27b`

| Property | Value | Source |
|---|---|---|
| Params | 27B dense, vision-language | HuggingFace |
| Native context | 256K tokens (expandable) | promptquorum.com |
| Q4_K_M footprint | ~18 GB weights + 4–9 GB KV cache | reddit.com |
| Total active RAM | ~22–28 GB | benchlm.ai |
| Decode speed (M4 Ultra) | 25–30 t/s | willitrunai.com |
| Digest (20 notes) | ~8–15 s at 25 t/s | derived |
| Ollama pull | `ollama pull qwen3.8:27b` | ollama.com |

**Why**: Hits the same quality tier as cloud APIs for structured PKM tasks (summarization,
cross-note synthesis, Zettelkasten note writing). Fits trivially in 96 GB unified pool —
leaves ~70 GB free for JVM REPL + tooling. The adjustable thinking budget (`off` for cron,
`medium` for deliberate sessions) makes it dual-use.

### Tier B — Quality / Interactive sessions: `llama3.3:70b`

| Property | Value | Source |
|---|---|---|
| Params | 70B dense | meta.ai |
| Q4_K_M footprint | ~40–43 GB | premai.io |
| IFEval instruction adherence | ~92.1% (top-tier) | datacamp.com |
| Decode speed (Ultra class) | ~12–18 t/s | morphllm.com |
| Digest (20 notes) | ~30–60 s | derived |
| Ollama pull | `ollama pull llama3.3:70b` | ollama.com |

**Why**: For complex multi-hop synthesis, structured output schemas, and polished prose.
Fits in the 96 GB pool with 50+ GB headroom. Best-in-class instruction following (rigid
output formatting for frontmatter, JSON) where Qwen3.8 can drift.

### Tier C — Fast/lint path: `qwen3.8:7b` (or `qwen2.5:7b`)

| Property | Value | Source |
|---|---|---|
| Params | 7B | Ollama |
| Q4_K_M footprint | ~5–6 GB | Ollama |
| Decode speed | 60–80 t/s | willitrunai.com |
| Use case | Orphan detection, quick lint | — |

**Why**: For trivial maintenance tasks where quality doesn't matter — orphan detection,
tag validation, quick yes/no classification. Blazing fast, negligible memory.

---

## 3. Summary Recommendation for the Blog

| Use case | Model | Ollama tag |
|---|---|---|
| **Default / cron / digest** | Qwen 3.8 27B | `qwen3.8:27b` |
| **Complex session synthesis** | Llama 3.3 70B | `llama3.3:70b` |
| **Fast maintenance lint** | Qwen 3.8 7B | `qwen3.8:7b` |

### Context budget upgrade
The old `max-chars-per-note 1500` was sized for a 7B model's ~4K context.
Qwen3.8 27B has a **256K native context window**. Safe new default: `8000` chars/note
(~2000 tokens), allowing 20 notes comfortably in one synthesis call.

### Thinking mode (Qwen3.8-specific)
For cron/unattended runs: thinking OFF (fast, deterministic).
For deliberate synthesis: thinking `medium` or `xhigh` (deeper multi-hop reasoning).
Controlled via system prompt prefix: `"Think carefully before answering."` triggers
extended thinking in Qwen3.8.

### Key Ollama performance flag
`OLLAMA_FLASH_ATTENTION=1` cuts KV cache memory overhead significantly on long contexts.
Worth noting in the blog's "Starting Today" section.

---

## 4. M5 Ultra Corrections to the Blog

| Old claim | Corrected |
|---|---|
| "128 GB unified memory" | Entry M5 Ultra is **96 GB**; tops at **512 GB** |
| "M5 Ultra" (previously speculative) | Now confirmed real, shipped Sep 22 2026 |
| "1.2 TB/s bandwidth" | Confirmed in Apple spec sheet |
| `qwen2.5:7b` as default | Upgrade to `qwen3.8:27b` |
| `max-chars-per-note 1500` | Upgrade to `8000` |
| "5–15 s generation" | Still accurate for 7B; 27B at 25 t/s ≈ 8–20 s for 200-token digest |

---

*Sources: apple.com (M5 Ultra specs), willitrunai.com (benchmark t/s), reddit.com
(Q4 memory footprints), HuggingFace Qwen3.8 model card, datacamp.com (Llama 3.3 IFEval),
morphllm.com (model hardware tiers), premai.io (70B VRAM), ollama.com (model registry).*
