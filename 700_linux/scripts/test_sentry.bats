#!/usr/bin/env bats

@test "sentry --help exits 0" {
  run bash 700_linux/scripts/sentry.sh --help
  [ "$status" -eq 0 ]
  [[ "$output" == *"Usage"* ]]
}

@test "sentry --dry-run does not crash" {
  run bash 700_linux/scripts/sentry.sh --dry-run
  [ "$status" -eq 0 ]
  [[ "$output" == *"DRY-RUN"* ]] || [[ "$output" == *"Auditing"* ]] || [[ "$output" == *"Sentry"* ]]
}

@test "sentry --verbose shows checking detail" {
  run bash 700_linux/scripts/sentry.sh --verbose --dry-run
  [ "$status" -eq 0 ]
  # verbose should mention checking or auditing
  [[ "$output" == *"checking"* ]] || [[ "$output" == *"Auditing"* ]] || [[ "$output" == *"DRY-RUN"* ]]
}

@test "sentry normal run exits 0 or 1 (no crash)" {
  run bash 700_linux/scripts/sentry.sh
  # 0 clean, 1 threat, not 2 error on normal host
  [ "$status" -eq 0 ] || [ "$status" -eq 1 ]
}
