// 04_icache.c — Instruction cache + pipe flow: call/ret/jmp, i-cache misses
// What it shows: small loop fits i-cache (L1i=224K), huge code does not — fetch stalls
// Asm: call, ret, jmp, nop (padding)
// Build: gcc -O2 -o 04_icache 04_icache.c
#include <stdio.h>
#include <time.h>

static double now_sec(){ struct timespec ts; clock_gettime(CLOCK_MONOTONIC,&ts); return ts.tv_sec+ts.tv_nsec*1e-9; }
#define ITERS 20000000

// Small hot loop — fits in i-cache, predicted jmp
__attribute__((noinline)) long small_loop(){
    long s=0;
    for(int i=0;i<ITERS;i++) s += i & 7; // tiny loop body ~ a few bytes
    return s;
}

// Many functions — blows i-cache, call/ret overhead + fetch misses
__attribute__((noinline)) int f0(int x){ return x+1; } __attribute__((noinline)) int f1(int x){ return x+2; }
__attribute__((noinline)) int f2(int x){ return x+3; } __attribute__((noinline)) int f3(int x){ return x+4; }
__attribute__((noinline)) int f4(int x){ return x+5; } __attribute__((noinline)) int f5(int x){ return x+6; }
__attribute__((noinline)) int f6(int x){ return x+7; } __attribute__((noinline)) int f7(int x){ return x+8; }
// Repeat to 64 funcs to exceed L1i
#define F(n) __attribute__((noinline)) int f##n(int x){ return x+n; }
F(8) F(9) F(10) F(11) F(12) F(13) F(14) F(15) F(16) F(17) F(18) F(19) F(20) F(21) F(22) F(23)
F(24) F(25) F(26) F(27) F(28) F(29) F(30) F(31) F(32) F(33) F(34) F(35) F(36) F(37) F(38) F(39)
F(40) F(41) F(42) F(43) F(44) F(45) F(46) F(47) F(48) F(49) F(50) F(51) F(52) F(53) F(54) F(55)
F(56) F(57) F(58) F(59) F(60) F(61) F(62) F(63)

__attribute__((noinline)) long bloat_calls(){
    long s=0;
    for(int i=0;i<ITERS;i++){
        // indirect via switch = many call targets, i-cache pressure + branch mispredict
        switch(i & 63){ case 0:s+=f0(i);break; case 1:s+=f1(i);break; case 2:s+=f2(i);break; case 3:s+=f3(i);break;
        case 4:s+=f4(i);break; case 5:s+=f5(i);break; case 6:s+=f6(i);break; case 7:s+=f7(i);break;
        case 8:s+=f8(i);break; case 9:s+=f9(i);break; case 10:s+=f10(i);break; case 11:s+=f11(i);break;
        case 12:s+=f12(i);break; case 13:s+=f13(i);break; case 14:s+=f14(i);break; case 15:s+=f15(i);break;
        case 16:s+=f16(i);break; case 17:s+=f17(i);break; case 18:s+=f18(i);break; case 19:s+=f19(i);break;
        case 20:s+=f20(i);break; case 21:s+=f21(i);break; case 22:s+=f22(i);break; case 23:s+=f23(i);break;
        case 24:s+=f24(i);break; case 25:s+=f25(i);break; case 26:s+=f26(i);break; case 27:s+=f27(i);break;
        case 28:s+=f28(i);break; case 29:s+=f29(i);break; case 30:s+=f30(i);break; case 31:s+=f31(i);break;
        case 32:s+=f32(i);break; case 33:s+=f33(i);break; case 34:s+=f34(i);break; case 35:s+=f35(i);break;
        case 36:s+=f36(i);break; case 37:s+=f37(i);break; case 38:s+=f38(i);break; case 39:s+=f39(i);break;
        case 40:s+=f40(i);break; case 41:s+=f41(i);break; case 42:s+=f42(i);break; case 43:s+=f43(i);break;
        case 44:s+=f44(i);break; case 45:s+=f45(i);break; case 46:s+=f46(i);break; case 47:s+=f47(i);break;
        case 48:s+=f48(i);break; case 49:s+=f49(i);break; case 50:s+=f50(i);break; case 51:s+=f51(i);break;
        case 52:s+=f52(i);break; case 53:s+=f53(i);break; case 54:s+=f54(i);break; case 55:s+=f55(i);break;
        case 56:s+=f56(i);break; case 57:s+=f57(i);break; case 58:s+=f58(i);break; case 59:s+=f59(i);break;
        case 60:s+=f60(i);break; case 61:s+=f61(i);break; case 62:s+=f62(i);break; case 63:s+=f63(i);break;
        }
    }
    return s;
}

int main(){
    printf("=== I-cache + pipes (call/ret/jmp, your L1i=224 KB) ===\n");
    printf("Small loop should be much faster than 64-target call bloat.\n\n");
    double t0=now_sec(); volatile long s1=small_loop(); double t1=now_sec();
    printf("small hot loop: %.3f ms  sum=%ld  (fits L1i, no call)\n",(t1-t0)*1000,s1);
    t0=now_sec(); volatile long s2=bloat_calls(); t1=now_sec();
    printf("64 funcs + switch+call: %.3f ms  sum=%ld  (i-cache + BTB miss)\n",(t1-t0)*1000,s2);
    printf("\nAsm: gcc -O2 -S 04_icache.c -o - | grep -E 'call|ret|jmp|nop'\n");
    printf("Fix: inline hot funcs, reduce code footprint, avoid indirect branches.\n");
}
