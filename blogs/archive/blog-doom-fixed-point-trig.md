# John Carmack's Fixed-Point Trigonometry in DOOM (1993)

## Overview

* **Source Reference:** [TrisH0x2A Post on X](https://x.com/TrisH0x2A/status/2118232343978938753)
* **Author:** Trish ([@TrisH0x2A](https://x.com/TrisH0x2A))
* **Topic:** How id Software and John Carmack avoided floating-point trigonometric calculations in the DOOM rendering and game loop.
* **Context:** In 1993, target PC hardware (such as Intel 80386 and 80486SX processors) often lacked a dedicated Floating-Point Unit (FPU / 80387 coprocessor). Software floating-point emulation was orders of magnitude too slow for a real-time 3D rasterizer.

---

## Architectural Principles

### 1. Binary Angular Measurement (BAM)

Angles are represented as unsigned 32-bit integers (`angle_t`):
* A full $360^\circ$ circle ($2\pi$ radians) is mapped across the entire range of $2^{32}$ (`0` to `0xFFFFFFFF`).
* Natural unsigned 32-bit integer overflow handles circular wrapping modulo $360^\circ$ automatically.
* No conditionals (`if (angle >= 360)`) or modulo instructions (`%`) are needed for turning or angle summation.

| Degree   | Fraction of Circle | BAM Hex Value | Integer Value   |
|:---------|:-------------------|:--------------|:----------------|
| **0°**   | $0$                | `0x00000000`  | `0`             |
| **45°**  | $1/8$              | `0x20000000`  | `536,870,912`   |
| **90°**  | $1/4$              | `0x40000000`  | `1,073,741,824` |
| **180°** | $1/2$              | `0x80000000`  | `2,147,483,648` |
| **270°** | $3/4$              | `0xC0000000`  | `3,221,225,472` |

---

### 2. 16.16 Fixed-Point Arithmetic

World coordinates, scaling factors, and trigonometric results use 16.16 fixed-point numbers (`fixed_t`):
* High 16 bits: Integer portion.
* Low 16 bits: Fractional portion.
* Unit constant: `FRACUNIT = 1 << 16 = 65536` ($1.0$).
* Operations:
  * Addition/Subtraction: Direct integer `+` and `-`.
  * Multiplication: `(a * b) >> 16` (implemented as `FixedMul` with 64-bit intermediate products).
  * Division: `(a << 16) / b` (implemented as `FixedDiv`).

---

### 3. Trigonometric Lookup Tables (LUT)

Instead of runtime polynomial series or FPU instructions, DOOM uses precomputed tables:
* **Resolution:** The circle is divided into 8,192 fine angles (`FINEANGLES`).
* **Index Conversion:** Converting a 32-bit BAM `angle_t` into a fine angle index uses a 19-bit right shift:
  $$\text{Shift} = 32 - \log_2(8192) = 32 - 13 = 19$$
  $$\text{Index} = \text{angle} \gg 19$$

---

### 4. Phase-Shift Cosine Sharing

Because $\cos(\theta) = \sin(\theta + 90^\circ)$, DOOM does not allocate an independent table for cosine:
* $90^\circ$ corresponds to $8192 / 4 = 2048$ entries.
* The `finesine` table is sized to $5/4 \times 8192 = 10,240$ entries ($360^\circ + 90^\circ$).
* `finecosine` is defined as a pointer offset into `finesine` at index 2048:
  ```c
  fixed_t* finecosine = &finesine[FINEANGLES / 4];
  ```
* Looking up `finecosine[i]` directly indexes into `finesine[i + 2048]` with zero overhead.

---

## C Code Reference (DOOM Engine)

From DOOM source files [`tables.h`](https://github.com/id-Software/DOOM/blob/master/linuxdoom-1.10/tables.h), [`m_fixed.h`](https://github.com/id-Software/DOOM/blob/master/linuxdoom-1.10/m_fixed.h), and [`r_main.c`](https://github.com/id-Software/DOOM/blob/master/linuxdoom-1.10/r_main.c):

```c
// --- m_fixed.h ---
#define FRACBITS 16
#define FRACUNIT (1 << FRACBITS)

typedef int fixed_t;

// --- tables.h ---
#define FINEANGLES        8192
#define FINEMASK          (FINEANGLES - 1)
#define ANGLETOFINESHIFT  19

#define ANG45   0x20000000
#define ANG90   0x40000000
#define ANG180  0x80000000
#define ANG270  0xc0000000

typedef unsigned angle_t;

extern fixed_t finesine[5 * FINEANGLES / 4];
extern fixed_t* finecosine;

// --- r_main.c ---
// Cosine is a PI/2 (90-degree) phase shift into the sine table
fixed_t* finecosine = &finesine[FINEANGLES / 4];

// --- Usage Example ---
void MoveActor(fixed_t* x, fixed_t* y, angle_t angle, fixed_t distance) {
    int idx = angle >> ANGLETOFINESHIFT;
    fixed_t cos_val = finecosine[idx];
    fixed_t sin_val = finesine[idx];

    *x += FixedMul(distance, cos_val);
    *y += FixedMul(distance, sin_val);
}
```

---

## Summary of Benefits

1. **Deterministic Execution:** No cross-architecture floating-point rounding discrepancies across networked multiplayer games.
2. **Maximum Performance:** Avoids costly FPU traps and floating-point emulation cycles on 80386/80486 hardware.
3. **Branchless Angle Math:** Free circular modulo arithmetic via hardware integer wraparound.
4. **Minimal Cache / Memory Footprint:** Sine and cosine share a contiguous memory buffer of just 10,240 32-bit integers (~40 KB).
