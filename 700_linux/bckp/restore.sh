#!/usr/bin/env bash
# restore.sh - Restore dotfiles from 999_dotfiles -> HOME
# Wrapper for dotfiles.bb --restore (Lean Clojure / Babashka)
# Manifest: manifest.edn (Single Source of Truth)
# Usage: ./restore.sh [--dry-run] [--verbose] [--force] [filters...]
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bb "${DIR}/dotfiles.bb" --restore "$@"
