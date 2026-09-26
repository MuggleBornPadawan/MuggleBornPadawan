---
name: healthcheck
description: >-
  Run sysinfo.sh --tech and evaluate system health table against lean box thresholds (RAM, disk, load, Clojure stack, Antigravity).
---

# System Healthcheck (Lean Box)

Run sysinfo healthcheck with tech stack and review results.

Do these steps:

1. Run system info collection:
   ```bash
   mkdir -p ~/bkp
   ~/MuggleBornPadawan/700_linux/scripts/sysinfo.sh --tech
   ```
   - Timeout 30s. No downloads. No model loads.
   - Script redirects stdout to `~/bkp/sysinfo.log`.
   - Alias `--stack` = `--tech`. Env `NO_COLOR=1` strips ANSI, `SYSINFO_NO_IP=1` skips public IP.

2. Read logs completely (use `view_file` tool, handle ANSI colors):
   - Read `~/bkp/sysinfo.log` completely.

3. Analyze each section and make health table:

   | Area | Status | Value (Now) | Action |
   |------|--------|-------------|--------|

   Check these thresholds (lean box: 6.3 Gi RAM, 31G disk):

   - **Disk:** Use% <80% = OK, 80-90% = WARN (clean), >90% = CRITICAL. Root is priority. Current baseline ~67-68% (~10G free, 2026-09-15).
   - **Memory:** Available >1.5G = OK, 0.5-1.5G = WARN, <0.5G = CRITICAL. Swap 0B is expected.
   - **CPU/Load:** Load avg <4 on 8 threads = OK. Check top 5 CPU/MEM for runaways (e.g., `emacs`, `pi`, `postgres`).
   - **I/O:** `iostat` await >20ms = WARN.
   - **Network:** Internet ping to 8.8.8.8 must pass. Public IP fetch may timeout - OK.
   - **Services:** Failed services = 0 is OK. Any failed = CRITICAL.
   - **Journal:** No permission errors. Show last errors if present.
   - **Security (Section 7):** Pending updates >0 = WARN (`apt upgrade`), `reboot-required` = WARN, firewall missing (ufw/nft/iptables) = INFO (optional on Crostini), clamav/freshclam inactive = OK (no scan here).
   - **Tech stack (--tech):** All must be OK:
     - Java Temurin-25 at /usr/lib/jvm/temurin-25-jdk-amd64 (25.0.4.1 LTS)
     - Clojure CLI 1.12.6, Lein 2.12.0, bb 1.13.223 (>=1.13.219), clj-kondo, clojure-lsp, neil, jet, cljfmt
     - SQLite :memory: check OK
     - PostgreSQL: pg_isready on localhost
     - Git: user.name/email set
     - Ollama: service check only, NEVER run `ollama run` (OOM risk)
     - Emacs init.el + setup-clojure.el present
     - pi agent present, AGENTS.md present
     - Gemini Antigravity: check paths only (`agy`, `antigravity-ide`, `gemini`, `gcloud` + config dirs), never log tokens

4. Final verdict:
   - List CRITICAL first, then WARN, then OK summary.
   - For each WARN/CRITICAL, give one concrete fix command.
   - Keep it short. Use bullet points. No long text.

Constraints (from AGENTS.md):
- Do NOT run: `ollama run`, `clojure -P`, `lein deps`, `docker pull` - they fill RAM/disk.
- All tech checks have 3s timeout already in script.
- Never log secrets (tokens/creds) - only check file existence.
