---
description: Sync opencode free and zero-cost models into scoped models (enabledModels)
---
Sync opencode free models into `~/.pi/agent/settings.json` `enabledModels`.

Steps:
1. Read `~/.pi/agent/models-store.json`, list `opencode.models`.
2. Keep models where `id` contains `free` (case-insensitive) OR `cost.input == 0` and `cost.output == 0`.
3. Build IDs as `opencode/<id>`, sort A-Z.
4. Read `~/.pi/agent/settings.json`. Keep non-`opencode/` entries in `enabledModels`. Replace `opencode/` entries with the fresh list.
5. Write back valid JSON. Keep other keys unchanged.
6. Verify with `python3 -m json.tool ~/.pi/agent/settings.json` and `bb ~/.pi/agent/bin/clean-opencode-free.bb --include-zero-cost --check`.

If `bb` script exists, prefer it: `bb ~/.pi/agent/bin/clean-opencode-free.bb --include-zero-cost`.
Report added (+) and removed (-) models.
