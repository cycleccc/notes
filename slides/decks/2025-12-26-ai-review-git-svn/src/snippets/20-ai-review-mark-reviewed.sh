#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
DEFAULT_ENV_FILE="$SCRIPT_DIR/../ai-review.env"

if [[ -f "$DEFAULT_ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$DEFAULT_ENV_FILE"
fi

AI_REVIEW_MARK_NAMESPACE="${AI_REVIEW_MARK_NAMESPACE:-refs/ai-reviewed}"
AI_REVIEW_MARK_BRANCH_ALLOW_REGEX="${AI_REVIEW_MARK_BRANCH_ALLOW_REGEX:-^(main|master|release(/.*)?)$}"

is_all_zero_rev() {
  [[ "${1:-}" =~ ^0+$ ]]
}

while read -r oldrev newrev refname; do
  [[ -z "${oldrev:-}" || -z "${newrev:-}" || -z "${refname:-}" ]] && continue
  [[ "$refname" != refs/heads/* ]] && continue

  branch="${refname#refs/heads/}"
  [[ "$branch" =~ $AI_REVIEW_MARK_BRANCH_ALLOW_REGEX ]] || continue

  mark_ref="$AI_REVIEW_MARK_NAMESPACE/$branch"

  if is_all_zero_rev "$newrev"; then
    git update-ref -d "$mark_ref" 2>/dev/null || true
    continue
  fi

  git update-ref "$mark_ref" "$newrev" 2>/dev/null || git update-ref "$mark_ref" "$newrev"
done
