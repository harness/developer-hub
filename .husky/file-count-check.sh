#!/bin/bash

Red='\033[0;31m'
Green='\033[0;32m'
Amber='\033[0;33m'
Reset='\033[0m'

# Total = files already on branch (vs main) + files staged in this commit (deduplicated)
# So the warning is based on what the total will be after this commit
count=$( (git diff --name-only main...HEAD 2>/dev/null; git diff --cached --name-only --diff-filter=ACMR 2>/dev/null) | sort -u | wc -l | tr -d ' ')

if [ -z "$count" ] || [ "$count" -eq 0 ]; then
  echo -e "${Green}● File count: 0 files on branch (after this commit) — OK${Reset}"
  exit 0
fi

if [ "$count" -lt 20 ]; then
  echo -e "${Green}● File count: $count files on branch (after this commit) — OK${Reset}"
  exit 0
fi

if [ "$count" -le 50 ]; then
  echo -e "${Amber}● File count: $count files on branch (after this commit) — CAUTION${Reset}"
  echo -e "${Amber}  Consider splitting this change into multiple smaller PRs.${Reset}"
  exit 0
fi

# Over 50: red, prompt to abort or continue
echo -e "${Red}● File count: $count files on branch (after this commit) — STOP${Reset}"
echo -e "${Red}  Branches should not have over 50 files unless agreed with management.${Reset}"
echo -e "${Red}  Please split your changes into smaller PRs.${Reset}"
echo ""
read -r -p "Commit anyway? (y/n) " answer
case "$answer" in
  [yY]|[yY][eE][sS]) exit 0 ;;
  *) exit 1 ;;
esac
