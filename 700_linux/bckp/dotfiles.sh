#!/usr/bin/env bash
# dotfiles.sh - Single manifest backup for all dotfiles, skills, prompts
# Wrapper for dotfiles.bb (Lean Clojure / Babashka)
# Manifest: manifest.edn (Single Source of Truth)
# Usage: ./dotfiles.sh [--dry-run] [--verbose] [--restore] [--help]
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bb "${DIR}/dotfiles.bb" "$@"
