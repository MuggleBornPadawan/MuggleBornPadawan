// 01_cache_l1_l2_l3.c — How data moves: L1/L2/L3 + load/store
// What it shows: sequential = L1 hit fast, stride = cache line waste, random = miss to DRAM
// Asm: mov, add, cmp, jl/jge, movzx — all in tight loop
// Build: gcc -O2 -o 01_cache 01_cache_l1_l2_l3.c
// Run: ./01_cache
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdint.h>

static double now_sec() {
    struct timespec ts; clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec + ts.tv_nsec * 1e-9;
}

// Sequential: best case — every cache line reused
double test_sequential(uint8_t *a, size_t n) {
    double t0 = now_sec();
    volatile uint64_t sum = 0; // volatile = do not optimize away
    for (size_t i = 0; i < n; i++) sum += a[i]; // movzx + add
    double t1 = now_sec();
    printf("  seq sum=%llu time=%.3f ms\n", (unsigned long long)sum, (t1-t0)*1000);
    return t1 - t0;
}

// Stride 64: jump one cache line each time (64 bytes) — uses 1/64 of cache
double test_stride(uint8_t *a, size_t n) {
    double t0 = now_sec();
    volatile uint64_t sum = 0;
    for (size_t i = 0; i < n; i += 64) sum += a[i]; // lea for address calc
    double t1 = now_sec();
    printf("  stride64 sum=%llu time=%.3f ms (touches %zu lines)\n", (unsigned long long)sum, (t1-t0)*1000, n/64);
    return t1 - t0;
}

// Random: pointer chasing — worst case, each load misses
double test_random(uint8_t *a, size_t n, uint32_t *idx, size_t iter) {
    double t0 = now_sec();
    volatile uint64_t sum = 0;
    for (size_t i = 0; i < iter; i++) sum += a[idx[i] % n];
    double t1 = now_sec();
    printf("  random sum=%llu time=%.3f ms\n", (unsigned long long)sum, (t1-t0)*1000);
    return t1 - t0;
}

int main() {
    // Sizes chosen to fit each cache on your i3-1215U: L1d=144K, L2=2M, L3=10M
    size_t sizes[] = {32*1024, 256*1024, 4*1024*1024, 32*1024*1024};
    printf("=== L1-L3 cache demo (mov / movzx / lea) ===\n");
    printf("Expect: 32K ~ L1 hit fast, 4M ~ L3, 32M ~ DRAM slow\n\n");
    for (int s = 0; s < 4; s++) {
        size_t n = sizes[s];
        uint8_t *a = malloc(n);
        for (size_t i=0;i<n;i++) a[i]= (uint8_t)(i & 0xFF);
        // random indices
        size_t iter = n; // same number of accesses for fair compare
        uint32_t *idx = malloc(iter*sizeof(uint32_t));
        for (size_t i=0;i<iter;i++) idx[i]= rand();

        printf("Buffer %zu KB:\n", n/1024);
        test_sequential(a, n);
        test_stride(a, n);
        test_random(a, n, idx, iter);
        printf("\n");
        free(a); free(idx);
    }
    printf("Tip: look at asm: gcc -O2 -S 01_cache_l1_l2_l3.c -o - | grep -E 'mov|add|cmp|jl'\n");
    return 0;
}
