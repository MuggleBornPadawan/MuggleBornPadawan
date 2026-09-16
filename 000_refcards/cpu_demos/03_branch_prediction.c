// 03_branch_prediction.c — Branch prediction + cmp/test + jcc
// What it shows: predictable branch ~0% mispredict, random ~50% mispredict = 10-20x slower
// Asm: cmp, test, je/jne, jl/jle, jg, ja/jb, jmp
// Build: gcc -O2 -o 03_branch 03_branch_prediction.c
// Run: ./03_branch
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

static double now_sec(){ struct timespec ts; clock_gettime(CLOCK_MONOTONIC,&ts); return ts.tv_sec+ts.tv_nsec*1e-9; }
#define N (50*1000*1000)

// Predictable: sorted data — branch predictor learns pattern
// Use asm barrier to force real branch (prevent cmov optimization)
__attribute__((noinline)) long sum_if_sorted(int *a, size_t n){
    long s=0;
    for(size_t i=0;i<n;i++){
        if(a[i] < 128){ s += a[i]; asm volatile("" ::: "memory"); } // cmp + jl + memory clobber = real jmp
    }
    return s;
}
// Unpredictable: random data — predictor fails 50%
__attribute__((noinline)) long sum_if_random(int *a, size_t n){
    long s=0;
    for(size_t i=0;i<n;i++){
        if(a[i] < 128){ s += a[i]; asm volatile("" ::: "memory"); }
    }
    return s;
}
// Branchless: no jump at all — uses cmov / and / xor trick
__attribute__((noinline)) long sum_branchless(int *a, size_t n){
    long s=0;
    for(size_t i=0;i<n;i++) s += (a[i] < 128) ? a[i] : 0; // compiler may use cmov or and
    return s;
}
// Test idiom: test eax,eax + je
__attribute__((noinline)) long count_zeros(int *a, size_t n){
    long c=0;
    for(size_t i=0;i<n;i++) if(a[i]==0) c++; // test eax,eax; je
    return c;
}

int main(){
    int *sorted = malloc(N*sizeof(int));
    int *random = malloc(N*sizeof(int));
    for(size_t i=0;i<N;i++){ sorted[i]= i < N/2 ? 10 : 200; random[i]= rand() % 256; }

    printf("=== Branch prediction (cmp/test + je/jne/jl) ===\n");
    printf("i3-1215U: mispredict ~15-20 cycles penalty. Random should be ~3-5x slower than sorted.\n\n");

    double t0=now_sec(); volatile long s1=sum_if_sorted(sorted,N); double t1=now_sec();
    printf("sorted (predictable): %.3f ms  sum=%ld\n",(t1-t0)*1000,s1);
    t0=now_sec(); volatile long s2=sum_if_random(random,N); t1=now_sec();
    printf("random (unpredict):   %.3f ms  sum=%ld  <-- slower?\n",(t1-t0)*1000,s2);
    t0=now_sec(); volatile long s3=sum_branchless(random,N); t1=now_sec();
    printf("branchless (no jmp):  %.3f ms  sum=%ld  (fix for random)\n",(t1-t0)*1000,s3);
    t0=now_sec(); volatile long s4=sum_if_random(sorted,N); t1=now_sec(); // control: same fn, sorted data
    printf("same fn sorted data:  %.3f ms  sum=%ld\n",(t1-t0)*1000,s4);

    printf("\nTry: gcc -O2 -S 03_branch_prediction.c -o - | grep -E 'cmp|test|je|jne|jl|jg|ja|jmp'\n");
    printf("Fix demo: branchless uses cmp+cmov or and/xor, not je.\n");
    free(sorted); free(random);
}
