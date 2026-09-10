#!/usr/bin/env bash
# goodcop-badcop.sh - builder vs critic with opencode zen free models
# Usage:
#   ./goodcop-badcop.sh "implement login with OTP"
#   ./goodcop-badcop.sh @plan.md "implement task 1 only"
#   TASK="fix @src/bug.clj" ./goodcop-badcop.sh
#   BUILDER=opencode/mimo-v2.5-free:high CRITIC=opencode/nemotron-3-ultra-free:high ./goodcop-badcop.sh "task"
set -euo pipefail

# --- config: change these to try other free models ---
BUILDER="${BUILDER:-opencode/muse-spark-1.3-contributor-free:high}"  # good cop: builds
CRITIC="${CRITIC:-opencode/big-pickle:high}"                         # bad cop: reviews
FIXER="${FIXER:-opencode/muse-spark-1.2-contributor-free:high}"      # optional: fixes after review
SLEEP_S="${SLEEP_S:-8}"  # wait between calls - avoids 429 on free tier

TASK="${1:-${TASK:-}}"
if [[ -z "$TASK" ]]; then
  echo "usage: $0 \"task prompt\"  or  TASK=\"prompt\" $0"
  echo "example: $0 \"implement task 1 from @docs/plans/2026-09-10-auth.md - TDD, clojure.test\""
  exit 1
fi

OUT_DIR="./.pi-runs/$(date +%Y-%m-%d_%H%M%S)"
mkdir -p "$OUT_DIR"
echo "-> out dir: $OUT_DIR"
echo "-> builder: $BUILDER"
echo "-> critic : $CRITIC"
echo "-> task   : $TASK"
echo

# 1. BUILD - good cop makes it work
echo "=== 1/3 BUILD ($BUILDER) ==="
pi --no-session --model "$BUILDER" -p "$TASK

Rules:
- TDD: write failing clojure.test first, then minimal code
- Keep deps minimal, data-oriented, bb-friendly where possible
- Save key files you change - list them at end" 2>&1 | tee "$OUT_DIR/1-build.md"
echo "saved -> $OUT_DIR/1-build.md"
sleep "$SLEEP_S"

# 2. CRITIC - bad cop finds gaps (reads builder output + current code)
echo
echo "=== 2/3 CRITIC ($CRITIC) ==="
pi --no-session --model "$CRITIC" -p "You are the critic. Review the BUILD output below for correctness, not style.

Be harsh. Find:
- logic bugs, edge cases, missing tests
- spec violations, shallow modules that should be deeper
- Clojure idiom breaks

Output: bullet list of MUST-FIX vs NICE-TO-HAVE. If no bug, say LGTM.

--- BUILD OUTPUT ---
$(cat "$OUT_DIR/1-build.md")" 2>&1 | tee "$OUT_DIR/2-critic.md"
echo "saved -> $OUT_DIR/2-critic.md"
sleep "$SLEEP_S"

# 3. FIX - good cop applies critic fixes (only if not LGTM)
if grep -qi "LGTM" "$OUT_DIR/2-critic.md"; then
  echo
  echo "=== 3/3 FIX - skipped (LGTM) ==="
  echo "LGTM - no fix needed" | tee "$OUT_DIR/3-fix.md"
else
  echo
  echo "=== 3/3 FIX ($FIXER) ==="
  pi --no-session --model "$FIXER" -p "Apply ONLY the MUST-FIX items from CRITIC to the codebase.

--- CRITIC ---
$(cat "$OUT_DIR/2-critic.md")

--- BUILD CONTEXT ---
$(cat "$OUT_DIR/1-build.md")

Rules: one fix per commit, run clojure.test after each" 2>&1 | tee "$OUT_DIR/3-fix.md"
  echo "saved -> $OUT_DIR/3-fix.md"
fi

echo
echo "done. results in $OUT_DIR"
ls -lh "$OUT_DIR"
echo
echo "next: cat $OUT_DIR/2-critic.md  -> decide what to keep"
echo "then: pi -c  to continue in interactive mode with full session history"
