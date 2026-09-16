#include <stdlib.h>
// 02_load_store_units.c — Load/store units: how wide, how many per cycle
// What it shows: 1 load vs 2 loads, store vs load, aliasing stall
// Asm: mov (load), mov [mem],reg (store), lea, add
// Build: gcc -O2 -o 02_ls 02_load_store_units.c
#include <stdio.h>
#include <time.h>
#include <stdint.h>
#include <string.h>

static double now_sec(){ struct timespec ts; clock_gettime(CLOCK_MONOTONIC,&ts); return ts.tv_sec+ts.tv_nsec*1e-9; }
#define ITERS (100*1000*1000)

// 1 load per iter
__attribute__((noinline)) uint64_t one_load(uint64_t *a, size_t n){
    uint64_t s=0;
    for(size_t i=0;i<ITERS;i++) s += a[i % n]; // mov rax, [rdi+rcx*8]
    return s;
}
// 2 loads per iter — can CPU do 2 loads/cycle?
__attribute__((noinline)) uint64_t two_loads(uint64_t *a, uint64_t *b, size_t n){
    uint64_t s=0;
    for(size_t i=0;i<ITERS;i++) s += a[i % n] + b[i % n]; // 2x mov
    return s;
}
// Store + load — tests store buffer forwarding
__attribute__((noinline)) uint64_t store_load(uint64_t *a, size_t n){
    uint64_t s=0;
    for(size_t i=0;i<ITERS;i++){ a[i % n] = i; s += a[i % n]; } // mov [mem],reg + mov reg,[mem]
    return s;
}
// movzx demo: byte load with zero extend vs 64-bit load
__attribute__((noinline)) uint64_t byte_loads(uint8_t *a, size_t n){
    uint64_t s=0;
    for(size_t i=0;i<ITERS;i++) s += a[i % n]; // movzx eax, byte ptr [..]
    return s;
}

int main(){
    size_t n = 1024; // fits L1 — isolates load/store units, not cache
    uint64_t *a = aligned_alloc(64, n*8);
    uint64_t *b = aligned_alloc(64, n*8);
    uint8_t  *c = aligned_alloc(64, n);
    for(size_t i=0;i<n;i++) a[i]=i, b[i]=i*2, c[i]=i & 0xFF;
    printf("=== Load/store units (fits L1, so cache not factor) ===\n");
    printf("CPU can do 2 loads/cycle on i3-1215U. Expect two_loads ~ same time as one_load (not 2x).\n\n");
    double t0=now_sec(); volatile uint64_t s1=one_load(a,n); double t1=now_sec();
    printf("1 load/iter:  %.3f ms  sum=%llu\n",(t1-t0)*1000,(unsigned long long)s1);
    t0=now_sec(); volatile uint64_t s2=two_loads(a,b,n); t1=now_sec();
    printf("2 loads/iter: %.3f ms  sum=%llu  (if ~1.0-1.3x not 2x => 2 load units)\n",(t1-t0)*1000,(unsigned long long)s2);
    t0=now_sec(); volatile uint64_t s3=store_load(a,n); t1=now_sec();
    printf("store+load:   %.3f ms  sum=%llu  (store forwarding test)\n",(t1-t0)*1000,(unsigned long long)s3);
    t0=now_sec(); volatile uint64_t s4=byte_loads(c,n); t1=now_sec();
    printf("byte movzx:   %.3f ms  sum=%llu  (byte->int zero extend)\n",(t1-t0)*1000,(unsigned long long)s4);
    printf("\nAsm to check: gcc -O2 -S 02_load_store_units.c -o - | grep -E 'mov|lea'\n");
    free(a); free(b); free(c);
}
