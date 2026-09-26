#!/usr/bin/env bash
# cleanup-boot.sh — wrapper for cleanup.sh: run only if >7 days since last run
# Used for @reboot so we don't waste 1-2s every boot.
set -euo pipefail

MARKER="$HOME/.cache/cleanup.last"
LOG="$HOME/.cache/cleanup.log"
DAYS=7

# ensure cache dir exists
mkdir -p "$(dirname "$MARKER")"

# if marker exists and is newer than DAYS, skip
if [ -f "$MARKER" ]; then
  # find returns file if mtime < DAYS (i.e. within DAYS)
  if find "$MARKER" -mtime -${DAYS} -print -quit 2>/dev/null | grep -q .; then
    age_days=$(( ( $(date +%s) - $(stat -c %Y "$MARKER") ) / 86400 ))
    echo "[$(date -Iseconds)] boot-cleanup skip — last run ${age_days}d ago (<${DAYS}d) — marker $MARKER" >> "$LOG"
    exit 0
  fi
fi

echo "[$(date -Iseconds)] boot-cleanup trigger — >${DAYS}d since last run or no marker" >> "$LOG"
# run main cleanup (it already logs itself)
"$HOME/bin/cleanup.sh" >> "$LOG" 2>&1
# update marker to now (after successful run)
touch "$MARKER"
# also touch log's mtime is not used, marker is source of truth
