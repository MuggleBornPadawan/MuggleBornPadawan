#!/bin/bash
# run_all.sh — build and run all CPU demos (no perf needed, just gcc+time)
set -e
cd "$(dirname "$0")"
echo "Building..."
for f in 0*.c; do
  out="${f%.c}"
  # 03 needs real branches, not cmov — disable if-conversion
  if [[ "$f" == "03"* ]]; then
    echo "  gcc -O2 -fno-if-conversion -fno-tree-vectorize -o $out $f"
    gcc -O2 -fno-if-conversion -fno-tree-vectorize -o "$out" "$f"
  else
    echo "  gcc -O2 -o $out $f"
    gcc -O2 -o "$out" "$f"
  fi
done
echo ""
echo "Running..."
echo "=================================================="
for bin in 01_cache* 02_load* 03_branch* 04_icache* 05_throughput* 06_ilp*; do
  [[ -x "$bin" && ! "$bin" == *.c ]] || continue
  echo ""
  echo ">>> ./$bin"
  "./$bin"
  echo "=================================================="
done
echo ""
echo "Asm peek (optional):"
echo "  gcc -O2 -S 02_load_store_units.c -o - | grep -E 'mov|lea' | head"
echo "  gcc -O2 -S 03_branch_prediction.c -o - | grep -E 'cmp|test|je|jne' | head"
