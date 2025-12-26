#!/usr/bin/env bash
set -euo pipefail

ALLOWED_BRANCHES_REGEX="${ALLOWED_BRANCHES_REGEX:-^(main|master|release(/.*)?)$}"
MARK_NAMESPACE="${MARK_NAMESPACE:-refs/ai-reviewed}"
REMOTE="${REMOTE:-origin}"
REQUIRE_AI_REVIEW_MARKER="${REQUIRE_AI_REVIEW_MARKER:-0}"

branch="$(git symbolic-ref --quiet --short HEAD || true)"
[[ -n "$branch" ]] || exit 0

AI_STUDIO_PUSH_WITH_SVN=1 git push "$@"

[[ "$branch" =~ $ALLOWED_BRANCHES_REGEX ]] || exit 0

head_commit="$(git rev-parse HEAD)"
marker_ref="$MARK_NAMESPACE/$branch"

remote_marker="$(git ls-remote "$REMOTE" "$marker_ref" 2>/dev/null | awk '{print $1}' | head -n 1)"
if [[ -z "$remote_marker" || "$remote_marker" != "$head_commit" ]]; then
  [[ "$REQUIRE_AI_REVIEW_MARKER" == "1" ]] && exit 0
fi

git svn rebase
git svn dcommit
