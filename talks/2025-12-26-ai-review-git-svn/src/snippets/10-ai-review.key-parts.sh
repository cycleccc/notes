#!/usr/bin/env bash
set -euo pipefail

# 说明：这是“展示用节选”，刻意避免使用 less-than / heredoc / here-string，
# 以便在 Slidev 代码片段展示时更稳定。

AI_REVIEW_CONFIRM_PREFIX="${AI_REVIEW_CONFIRM_PREFIX:-CONFIRMED}"
AI_REVIEW_RISK_PREFIX="${AI_REVIEW_RISK_PREFIX:-RISK}"

# --- Evidence: require verifiable proof ---
has_valid_evidence() {
  local reason="$1"
  local diff_file="$2"

  local file_match
  file_match="$(printf '%s\n' "$reason" | grep -oE '[A-Za-z0-9_./-]+\\.[A-Za-z0-9]+(#L[0-9]+|:[0-9]+)' | head -n 1 || true)"
  if [[ -z "$file_match" ]]; then
    return 1
  fi

  local file="$file_match"
  file="${file%%#L*}"
  file="${file%%:*}"

  grep -Fq "+++ b/$file" "$diff_file" || grep -Fq "diff --git a/$file b/$file" "$diff_file"
}

validate_confirmed_reasons() {
  local reasons_file="$1"
  local diff_file="$2"
  local confirm_prefix="$3"
  local risk_prefix="$4"

  local tmp="${reasons_file}.tmp"
  : >"$tmp"

  cat "$reasons_file" | while IFS= read -r line; do
    if [[ "$line" =~ ^[[:space:]]*${confirm_prefix}([:[:space:]]|$) ]]; then
      if has_valid_evidence "$line" "$diff_file"; then
        printf '%s\n' "$line" >>"$tmp"
      else
        local stripped="${line#${confirm_prefix}}"
        stripped="${stripped#: }"
        stripped="${stripped# }"
        printf '%s\n' "${risk_prefix}: ${stripped}" >>"$tmp"
      fi
    else
      printf '%s\n' "$line" >>"$tmp"
    fi
  done

  mv "$tmp" "$reasons_file"
}

# --- Soft pass: only CONFIRMED can reject ---
soft_pass_if_no_confirmed() {
  local pass="$1"
  local reasons_file="$2"
  local confirm_prefix="$3"

  if [[ "$pass" != "true" ]]; then
    if ! grep -Eq "^[[:space:]]*${confirm_prefix}[: ]" "$reasons_file"; then
      printf '%s' "true"
      return 0
    fi
  fi

  printf '%s' "$pass"
}

# --- Score normalize: avoid 0/100 polar values ---
normalize_score() {
  local pass="$1"
  local confirmed_count="$2"
  local risk_count="$3"
  local soft_pass="$4"

  if [[ "$pass" == "true" ]]; then
    local base=96 floor=70 max=99
    [[ "$soft_pass" == "1" ]] && base=88
    local score=$((base - (risk_count * 4) - (confirmed_count * 8)))
    [[ "$score" -lt "$floor" ]] && score="$floor"
    [[ "$score" -gt "$max" ]] && score="$max"
    printf '%s' "$score"
    return 0
  fi

  local base=45 floor=5 max=59
  local score=$((base - (confirmed_count * 10) - (risk_count * 4)))
  [[ "$score" -lt "$floor" ]] && score="$floor"
  [[ "$score" -gt "$max" ]] && score="$max"
  printf '%s' "$score"
}
