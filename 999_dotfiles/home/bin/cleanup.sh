#!/usr/bin/env bash
# cleanup.sh — monthly lean cleanup for penguin (Crostini, 31G disk, no swap)
# Safe to run anytime. Prints before/after. Asks before rm of ollama models.
set -euo pipefail

echo "== cleanup.sh $(date -Iseconds) =="
echo "--- before ---"
df -h / | head -n2
free -h | head -n2

# 1. apt cache (safe, regrows on apt update)
if command -v apt >/dev/null 2>&1; then
  echo "-> apt clean"
  sudo apt clean || true
fi

# 2. npm cache (keep, just verify + prune)
if command -v npm >/dev/null 2>&1; then
  echo "-> npm cache verify"
  npm cache verify || npm cache clean --force || true
  du -sh ~/.npm 2>/dev/null || true
fi

# 3. pip cache
if command -v pip >/dev/null 2>&1; then
  echo "-> pip cache purge"
  pip cache purge || true
fi
if command -v pip3 >/dev/null 2>&1; then
  pip3 cache purge 2>&1 | tail -n3 || true
fi

# 4. nvm cache
export NVM_DIR="${NVM_DIR:-$HOME/.config/nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "$NVM_DIR/nvm.sh"
  echo "-> nvm cache clear"
  nvm cache clear || true
fi

# 5. uv cache (no-op if not present)
if command -v uv >/dev/null 2>&1; then
  echo "-> uv cache prune"
  uv cache prune 2>&1 | tail -n5 || true
fi

# 6. git gc for your two big repos (aggressive only if .git exists)
for repo in ~/MuggleBornPadawan ~/refs; do
  if [ -d "$repo/.git" ]; then
    echo "-> git gc in $repo"
    git -C "$repo" gc --auto 2>&1 | tail -n5 || true
    du -sh "$repo/.git" 2>/dev/null | head -n1 || true
  fi
done

# 7. general caches (keep .m2/.lein for REPL speed, just report)
echo "--- cache sizes ---"
du -sh ~/.cache ~/.config/nvm 2>/dev/null | sort -rh | head -n10 || true
du -sh ~/.m2 ~/.lein 2>/dev/null | head -n5 || true

# 8. ollama hint (don't auto-remove, just report)
if [ -d ~/.ollama/models ]; then
  echo "--- ollama models (manual rm if unused: ollama rm <name>) ---"
  du -sh ~/.ollama/models/* 2>/dev/null | sort -rh | head -n10 || true
  ls ~/.ollama/models/manifests/registry.ollama.ai/library/*/* 2>/dev/null | head -n20 || true
fi

# 9. Clojure pre-fetch cleanup (old SNAPSHOT jars >30d, comment out if you want to keep)
# find ~/.m2 -name "*-SNAPSHOT.jar" -atime +30 -delete 2>/dev/null || true

echo "--- after ---"
sync; sleep 1
df -h / | head -n2
# update marker so boot guard knows we ran
mkdir -p ~/.cache
touch ~/.cache/cleanup.last
touch ~/.cache/cleanup.log 2>/dev/null || true
echo "done. tip: run 'earlyoom' install if JVM OOMs: sudo apt install earlyoom && sudo systemctl enable --now earlyoom"
