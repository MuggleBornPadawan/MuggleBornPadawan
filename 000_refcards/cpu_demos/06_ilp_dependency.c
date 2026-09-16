// 06_ilp_dependency.c — Scheduling: dependency chain vs independent (ILP)
// What it shows: chain = 1 op at a time (latency bound), independent = 4 ops/cycle (throughput bound)
// Asm: same ops (add/imul), but scheduling matters
// Build: gcc -O2 -o 06_ilp 06_ilp_dependency.c
#include <stdio.h>
#include <time.h>
#include <stdint.h>

static double now_sec(){ struct timespec ts; clock_gettime(CLOCK_MONOTONIC,&ts); return ts.tv_sec+ts.tv_nsec*1e-9; }
#define ITERS (100*1000*1000)

int main(){
    printf("=== ILP: dependency chain vs independent ===\n");
    printf("Same ops, different scheduling. Chain=latency, parallel=throughput.\n\n");

    // Chain: each add depends on prev — cannot parallelize (latency 1c)
    // Use asm per iter to prevent compiler optimizing to x+=ITERS
    { double t0=now_sec(); uint64_t x=1;
      for(size_t i=0;i<ITERS;i++) asm volatile("add $1, %0" : "+r"(x));
      double t1=now_sec(); printf("chain add (1 dep):      %6.0f ms  x=%llu\n",(t1-t0)*1000,(unsigned long long)x);
    }
    // Independent: 4 chains — CPU runs 4 adds/cycle
    { double t0=now_sec(); uint64_t a=1,b=1,c=1,d=1;
      for(size_t i=0;i<ITERS;i++){
          asm volatile("add $1, %0" : "+r"(a));
          asm volatile("add $1, %0" : "+r"(b));
          asm volatile("add $1, %0" : "+r"(c));
          asm volatile("add $1, %0" : "+r"(d));
      }
      double t1=now_sec(); printf("4x parallel add:        %6.0f ms  sum=%llu  (4x work, should be ~1x time if 4 ports)\n",(t1-t0)*1000,(unsigned long long)(a+b+c+d));
    }
    // imul chain has latency 3c — bigger gap
    { double t0=now_sec(); uint64_t x=1;
      for(size_t i=0;i<ITERS;i++) asm volatile("imul $3, %0, %0" : "+r"(x));
      double t1=now_sec(); printf("chain imul (lat 3c):    %6.0f ms  x=%llu\n",(t1-t0)*1000,(unsigned long long)x);
    }
    { double t0=now_sec(); uint64_t a=1,b=1,c=1,d=1;
      for(size_t i=0;i<ITERS;i++){
          asm volatile("imul $3, %0, %0" : "+r"(a));
          asm volatile("imul $3, %0, %0" : "+r"(b));
          asm volatile("imul $3, %0, %0" : "+r"(c));
          asm volatile("imul $3, %0, %0" : "+r"(d));
      }
      double t1=now_sec(); printf("4x parallel imul:       %6.0f ms  sum=%llu\n",(t1-t0)*1000,(unsigned long long)(a+b+c+d));
    }
    // lea can do mul+add in one op without flags
    { double t0=now_sec(); uint64_t x=0;
      for(size_t i=0;i<ITERS;i++) asm volatile("lea (%0,%0,4), %0" : "+r"(x)); // x = x*5 (lea trick)
      double t1=now_sec(); printf("lea chain (addr math):  %6.0f ms  x=%llu  (lea = mov+add+mul, no flags)\n",(t1-t0)*1000,(unsigned long long)x);
    }
    printf("\nLesson: break dependencies -> use more ports. Unroll + multiple accumulators.\n");
}
