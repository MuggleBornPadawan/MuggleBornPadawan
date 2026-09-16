// 05_throughput_ops.c — Execution units: raw throughput per op type
// What it shows: add/sub/and/or/xor/shift = 4/cycle, imul = 2/cycle, div = very slow
// Asm: add, sub, inc, dec, neg, imul, and, or, xor, not, shl, shr, sar
// Build: gcc -O2 -o 05_thr 05_throughput_ops.c
#include <stdio.h>
#include <time.h>
#include <stdint.h>
static double now_sec(){ struct timespec ts; clock_gettime(CLOCK_MONOTONIC,&ts); return ts.tv_sec+ts.tv_nsec*1e-9; }
#define ITERS (200*1000*1000)
int main(){
    printf("=== Execution unit throughput (4 independent chains) ===\n");
    printf("i3-1215U Golden Cove: add/logic ~4/cycle, imul ~2/cycle, div ~1/15c\n");
    printf("Lower ms = higher throughput. div should be ~10x slower.\n\n");
    #define BENCH_ASM(name, asm_str, init) do{ \
        double t0=now_sec(); \
        uint64_t a=init,b=init+1,c=init+2,d=init+3; \
        for(size_t i=0;i<ITERS;i++){ \
            asm volatile(asm_str : "+r"(a)); \
            asm volatile(asm_str : "+r"(b)); \
            asm volatile(asm_str : "+r"(c)); \
            asm volatile(asm_str : "+r"(d)); \
        } \
        double t1=now_sec(); \
        double ms=(t1-t0)*1000; \
        printf("%-12s %6.0f ms  sum %llu\n", name, ms, (unsigned long long)(a+b+c+d)); \
    } while(0)
    BENCH_ASM("add $3",  "add $3, %0", 1);
    BENCH_ASM("sub $3",  "sub $3, %0", 1000000000);
    BENCH_ASM("inc",     "inc %0", 1);
    BENCH_ASM("and $255","and $255, %0", 0xFFFFFFFF);
    BENCH_ASM("or",      "or $0x00FF00FF, %0", 0);
    BENCH_ASM("xor",     "xor $0xABCDEF, %0", 0);
    BENCH_ASM("shl $1",  "shl $1, %0", 1);
    BENCH_ASM("shr $1",  "shr $1, %0", 0x80000000);
    BENCH_ASM("sar $1",  "sar $1, %0", 0x80000000);
    BENCH_ASM("imul $3", "imul $3, %0, %0", 1);
    BENCH_ASM("neg",     "neg %0", 1);
    BENCH_ASM("not",     "not %0", 1);
    { double t0=now_sec(); volatile uint64_t s=0;
      for(size_t i=0;i<ITERS/20;i++){
          uint64_t x=123456789ULL;
          asm volatile("xor %%edx, %%edx; div %1" : "+a"(x) : "r"((uint64_t)3) : "rdx");
          s+=x;
      }
      double t1=now_sec(); printf("%-12s %6.0f ms  (div slow, 20x fewer iters)\n", "div", (t1-t0)*1000);
      (void)s;
    }
    printf("\nAsm maps 1:1 to refcard: add->add, shl->shl, imul->imul\n");
}
