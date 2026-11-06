# The Carmack Pipeline: How DOOM's 1993 Hacks Predict Modern LLM Architecture

> *"People who are really serious about software should make their own hardware."* — Alan Kay

John Carmack wrote DOOM in 1993 on hardware that makes a modern smart thermostat look like a supercomputer. No GPU. No FPU on mainstream target machines. 4 MB of RAM. And yet DOOM rendered a pseudo-3D world at 35 fps, sustained multiplayer over dial-up links, and kept every networked PC in bitwise lock-step synchrony.

Thirty years later, the systems engineers scaling frontier large language models are solving structurally identical problems. The bottleneck is unchanged: **your math is too slow for your silicon, so you change your math.**

This article traces five direct lines from DOOM's source code to the systems architecture of modern large language models.

---

## 1. The Root Problem: Your Floating-Point is Too Expensive

### DOOM's Situation (1993)

The Intel 80386 and 80486SX processors — the dominant consumer CPUs when DOOM shipped — had no hardware Floating-Point Unit (FPU). Any floating-point operation invoked software emulation, running **50–300× slower** than integer instructions. For a real-time rasterizer transforming wall vertices and actor projections every frame, floating-point math was a non-starter.

Carmack's solution was to banish floating-point numbers from the engine entirely, standardizing on **16.16 fixed-point arithmetic**:

```c
// DOOM's 16.16 Fixed-Point (m_fixed.h / Watcom C 1993)
#define FRACBITS    16
#define FRACUNIT    (1 << FRACBITS)   // 1.0 = 65536

typedef int fixed_t;

// In 1993, 32-bit compilers lacked 64-bit integer types.
// Carmack used Watcom inline x86 assembly:
//   imul edx          -> 64-bit product in EDX:EAX
//   shrd eax, edx, 16 -> shift 16 bits from EDX into EAX (fixed-point scaling)
#pragma aux FixedMul = \
    "imul edx"         \
    "shrd eax, edx, 16"\
    parm [eax] [edx]

// Modern portable C equivalent:
// fixed_t FixedMul(fixed_t a, fixed_t b) {
//     return (fixed_t)(((int64_t)a * b) >> FRACBITS);
// }
```

### Modern LLMs: Memory Walls and Low-Precision Quantization

A 70-billion-parameter model stored in FP32 requires 280 GB of memory just for its weights. During inference, memory bandwidth — not compute throughput — is the primary wall. Accelerators like NVIDIA H100s can perform tensor operations far faster than High Bandwidth Memory (HBM) can deliver the weight matrices to the compute cores.

The modern response mirrors Carmack's: **replace wide floating-point types with compact integers.**

| Format | Bits per Weight | Memory vs. FP32 | Primary Benefit |
| :--- | :--- | :--- | :--- |
| **FP32** | 32 | 1× | Baseline precision |
| **FP16 / BF16** | 16 | 2× | Half-precision training standard |
| **INT8** | 8 | 4× | Standard server-side inference quantization |
| **INT4 (AWQ/GPTQ)** | 4 | 8× | Consumer GPU deployment (fits 70B in 48 GB) |
| **Ternary (BitNet 1.58b)** | ~1.58 | ~20× | Replaces matrix multiplies with pure addition |

In PyTorch, post-training quantization moves weights from FP32 down to 8-bit or 4-bit integer containers:

```python
import torch

# Standard FP32 weight matrix: 4096 x 4096 = 64 MB
weight_fp32 = torch.randn(4096, 4096)

# INT8 per-channel quantization (16 MB — 4x memory bandwidth reduction)
scales = weight_fp32.abs().max(dim=1).values / 127.0
zero_points = torch.zeros(4096, dtype=torch.int32)
weight_int8 = torch.quantize_per_channel(
    weight_fp32, scales=scales, zero_points=zero_points, axis=0, dtype=torch.qint8
)

# In advanced INT4 kernels (e.g., bitsandbytes, AWQ, Marlin), pairs of 4-bit
# weights pack into single uint8 bytes, cutting storage to ~8 MB (8x reduction).
```

Carmack eliminated the FPU because integer ALUs were fast and coprocessors were absent. Modern ML engineers downcast to INT8/INT4/FP8 because memory buses cannot feed FP32 weights fast enough. The constraint shifted from compute cycles to bus width, but the architectural pattern is identical.

---

## 2. Precomputed Trigonometry: LUTs Then, RoPE Now

### DOOM's Binary Angular Measurement (BAM)

Rather than storing angles in degrees (0–360) or radians (0–2π), DOOM maps a complete circle to the entire domain of an unsigned 32-bit integer (`0` to `2^32 - 1`):

```c
// tables.h
typedef unsigned angle_t;

#define ANG45   0x20000000   // 2^32 / 8
#define ANG90   0x40000000   // 2^32 / 4
#define ANG180  0x80000000   // 2^32 / 2
#define ANG270  0xc0000000   // 3 * 2^32 / 4
```

This representation is called **Binary Angular Measurement (BAM)**. Its advantage: **circular wrapping is free.**

When an actor turns past 360°, native 32-bit integer overflow automatically wraps the value modulo 2^32. No conditionals (`if (ang >= 360)`), no branching, and no division instructions.

#### The Shared-Array Cosine Trick

To evaluate trigonometric functions without runtime series expansion, Carmack discretized the circle into 8,192 fine angles (`FINEANGLES = 8192`). Converting an `angle_t` into a table index requires only a 19-bit right shift (`32 - 13 = 19`):

```c
#define FINEANGLES        8192
#define ANGLETOFINESHIFT  19

// Sized to 5/4 * 8192 = 10,240 entries (full 360° circle + 90° padding)
extern fixed_t finesine[5 * FINEANGLES / 4];

// Cosine is a pointer offset 90° (2,048 entries) into the sine buffer
fixed_t* finecosine = &finesine[FINEANGLES / 4];
```

Because `cos(θ) = sin(θ + 90°)`, `finecosine` requires no dedicated array. It aliases the same contiguous buffer at a 2,048-element offset.

```c
// Zero runtime trigonometry in hot rendering paths:
void MoveActor(fixed_t* x, fixed_t* y, angle_t angle, fixed_t speed) {
    int idx = angle >> ANGLETOFINESHIFT;      // Single shift to LUT index
    *x += FixedMul(speed, finecosine[idx]);   // Array read: no sin(), no cos()
    *y += FixedMul(speed, finesine[idx]);
}
```

### RoPE (Rotary Position Embeddings): The Modern Equivalent

Modern transformer architectures (LLaMA 3, Mistral, Gemma, DeepSeek) encode relative token order using **Rotary Position Embeddings (RoPE)**.

RoPE rotates token query and key vectors in 2D subspaces by an angle proportional to the token's position in the context window:

`θ_{pos, i} = pos · 10000^(-2i / d)`

Evaluating transcendental trigonometric functions dynamically for every token, across 32 attention heads and 128,000 sequence positions, would destroy inference throughput. Modern LLMs apply Carmack's exact strategy: **precompute all frequencies into a static cache and index by position.**

```python
# RoPE frequency precomputation (Meta LLaMA architecture)
import torch

def precompute_freqs_cis(dim: int, seq_len: int, theta: float = 10000.0):
    # Precompute inverse frequencies (the BAM fine-angle equivalent)
    inv_freq = 1.0 / (theta ** (torch.arange(0, dim, 2).float() / dim))
    t = torch.arange(seq_len)
    freqs = torch.outer(t, inv_freq)  # Shape: [seq_len, dim/2]

    # Pre-bake sin and cos into one contiguous complex tensor: cis(θ) = cos(θ) + i·sin(θ)
    freqs_cis = torch.polar(torch.ones_like(freqs), freqs)
    return freqs_cis  # Cached once at model initialization

def reshape_for_broadcast(freqs_cis: torch.Tensor, x: torch.Tensor):
    # Align [seq_len, head_dim/2] to [1, seq_len, 1, head_dim/2] for multi-head attention
    shape = [d if i in (1, x.ndim - 1) else 1 for i, d in enumerate(x.shape)]
    return freqs_cis.view(*shape)

def apply_rotary_emb(xq, xk, freqs_cis):
    # Group real feature pairs into complex numbers
    xq_ = torch.view_as_complex(xq.float().reshape(*xq.shape[:-1], -1, 2))
    xk_ = torch.view_as_complex(xk.float().reshape(*xk.shape[:-1], -1, 2))

    # Slice frequency cache to current sequence length and broadcast
    freqs_cis = freqs_cis[:xq_.shape[1]]
    freqs_cis = reshape_for_broadcast(freqs_cis, xq_)

    # Complex multiplication performs 2D rotation with zero runtime trig calls
    xq_out = torch.view_as_real(xq_ * freqs_cis).flatten(3)
    xk_out = torch.view_as_real(xk_ * freqs_cis).flatten(3)
    return xq_out.type_as(xq), xk_out.type_as(xk)
```

| DOOM (1993) | Modern LLM / RoPE (2024) |
| :--- | :--- |
| `finesine[10240]` table | `freqs_cis` complex frequency buffer |
| `angle >> ANGLETOFINESHIFT` | Token sequence position slicing `[:seq_len]` |
| `finecosine = &finesine[2048]` | `torch.polar()` packaging `cos` + `i·sin` in contiguous memory |
| Zero runtime trig evaluations | Zero runtime trig evaluations in attention layers |

---

## 3. Memory Hierarchy: L1 Cache Lines in 1993, SRAM Tiling in 2024

### DOOM's Data Layout

Carmack's combined trigonometric table fits into 10,240 × 4 bytes = **40.96 KB**. On an Intel 486 with an 8 KB to 16 KB L1 cache, maintaining spatial locality was vital. By packing sine and cosine into a single contiguous array, index calculations stayed cache-dense and avoided pipeline-stalling RAM roundtrips.

### FlashAttention: Managing Modern Memory Walls

The breakthrough of [FlashAttention (Dao et al., 2022)](https://arxiv.org/abs/2205.14135) was recognizing that self-attention is **memory-bound**, not compute-bound. 

Standard attention materializes an intermediate N × N attention score matrix in high-latency GPU High Bandwidth Memory (HBM). For long contexts, transferring this matrix back and forth across the bus dominates execution time.

```
Standard Attention:
  Read Q, K from HBM -> Compute QK^T -> Write S (N x N) to HBM
  Read S from HBM -> Compute Softmax -> Write P (N x N) to HBM
  Read P, V from HBM -> Compute Attention Output -> Write to HBM
  Intermediate HBM footprint: O(N²)

FlashAttention (Tiled):
  Load blocks of Q, K, V into fast on-chip SRAM (~20 MB on H100)
  Compute attention, online softmax, and reduction entirely within SRAM
  Write only the final output back to HBM
  Intermediate HBM footprint: O(N)
```

Carmack laid out tables to stay within CPU cache boundaries; Tri Dao restructured attention into SRAM tiles. The engineering rule remains constant: **compute is nearly free; data transit across memory hierarchies is where performance dies.**

---

## 4. Bitwise Determinism: Multiplayer DOOM to Distributed RL

### DOOM's Input-Only Lockstep Protocol

In 1993, sending complete 3D player coordinates across 9600-baud modems or IPX local networks overwhelmed available bandwidth.

Carmack designed DOOM's multiplayer engine around **input-synchronous lockstep simulation**. Instead of syncing world states, peer machines exchanged only tiny 4-byte `ticcmd_t` input structs containing controller deltas:

```c
// DOOM network input packet (d_ticcmd.h)
typedef struct {
    char   forwardmove;   // Movement delta
    char   sidemove;      // Strafe delta
    short  angleturn;     // 16-bit angle delta (unpacks via: angleturn << 16)
    short  consistancy;   // Game state checksum to detect desynchronization
    byte   chatchar;
    byte   buttons;
} ticcmd_t;
```

For lockstep to work without desynchronization, every machine had to arrive at the **exact same game state** given identical input sequences. With floating-point arithmetic, disparate processor stepping levels and differing rounding modes produce divergent results within seconds. Fixed-point integer arithmetic made DOOM's simulation 100% bitwise deterministic across diverse hardware.

### Distributed RL and Robotics Rollouts

Modern reinforcement learning systems (e.g., Isaac Gym, MuJoCo parallel rollouts, Brax) run thousands of simultaneous environment instances to train robotic policies and autonomous agents.

Non-deterministic floating-point accumulation (e.g., arbitrary thread execution order in CUDA non-associative `atomicAdd`) leads to divergent trajectory states, making rollouts un-reproducible and gradient updates noisy:

1. **Integer State Representation:** Environments keep discrete counters, grid coordinates, and action indices in fixed integer domains.
2. **Deterministic Reduction Kernels:** Distributed frameworks enforce fixed reduction tree structures (`torch.use_deterministic_algorithms(True)`).
3. **Reproducible Trajectory Caching:** Bitwise exact simulation is the only way distributed workers can validate agent rollout integrity without logging gigabytes of intermediate physics states.

The lockstep multiplayer network model of 1993 and distributed reinforcement learning rollouts in 2024 both depend on the same foundation: **uncompromising numerical determinism.**

---

## 5. Synthesis: Hardware Sympathy vs. The Bitter Lesson

Richard Sutton's influential 2019 essay *The Bitter Lesson* observes:

> *"The biggest lesson that can be read from 70 years of AI research is that general methods that leverage computation are ultimately the most effective, and by a large margin."*

Sutton's thesis is that human researchers continuously attempt to build domain-specific shortcuts into algorithms, but general methods (learning and search) consistently win once compute scales up.

Does that invalidate Carmack's philosophy? Not at all.

There are two distinct abstraction layers in systems design:

* **Algorithm-to-Problem (Sutton's domain):** Do not hardcode heuristics about human vision or language into model architectures. Let general transformers learn the representations.
* **Hardware-to-Algorithm (Carmack's domain):** Always align the mathematical execution of that general model with the physical silicon running it.

Scaling laws only remain economically viable when systems engineers practice aggressive **hardware sympathy**. The reason frontier models can scale across thousands of GPUs is not because someone abandoned the Bitter Lesson; it is because kernel engineers wrote custom Triton and CUDA kernels, tiled SRAM accesses, precomputed rotary frequencies, and compressed weights into 4-bit integers.

Sutton tells us *what* to compute. Carmack shows us *how* to make it physically computable.

---

## Summary of Timeless Systems Principles

1. **Quantize Early:** When floating-point pipelines saturate memory bandwidth or lack native hardware acceleration, discrete integer representations win.
2. **Precompute Transcendental Math:** Never evaluate sine, cosine, or square roots inside tight inner loops; cache them in contiguous memory.
3. **Exploit Symmetries:** Reusing memory via pointer phase shifts (`finecosine = &finesine[2048]`) saves cache footprint with zero runtime computation.
4. **Design for Determinism:** Complex distributed systems stay in sync only when numerical transformations are bitwise reproducible.
5. **Silicon Dictates Algorithms:** Software architecture that ignores memory hierarchy and hardware instruction costs will always lose to hardware-sympathetic engineering.

---

## References

* [DOOM Source Code (id-Software/DOOM)](https://github.com/id-Software/DOOM) — Original `tables.h`, `m_fixed.h`, `r_main.c`, `d_ticcmd.h`
* [RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864) — Su et al. (2021)
* [FlashAttention: Fast and Memory-Efficient Exact Attention](https://arxiv.org/abs/2205.14135) — Dao et al. (2022)
* [BitNet b1.58: 1-bit LLMs for All](https://arxiv.org/abs/2402.17764) — Ma et al. (2024)
* [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) — Richard S. Sutton (2019)
* [LLaMA Architecture Source Code](https://github.com/meta-llama/llama) — Meta Platforms
* [Original DOOM Trig Note by @TrisH0x2A](https://x.com/TrisH0x2A/status/2118232343978938753)
