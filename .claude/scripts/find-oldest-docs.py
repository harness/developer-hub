#!/usr/bin/env python3
"""
Find markdown files by age of last git commit.

Usage:
  python .claude/scripts/find-oldest-docs.py <folder> [--top N] [--section <file>]

Examples:
  # 3 oldest files in a module
  python .claude/scripts/find-oldest-docs.py docs/cloud-cost-management --top 3

  # All files in the same folder as a specific file (section view)
  python .claude/scripts/find-oldest-docs.py docs/cloud-cost-management \
    --section docs/cloud-cost-management/getting-started/ccm-overview.md

Exclusions (always applied):
  - Files in any /shared/ folder
  - Files matching *.release-notes.md
  - Files named release-notes.md
"""

import argparse
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


EXCLUDE_PATTERNS = {"*.release-notes.md", "release-notes.md"}


def is_excluded(path: Path) -> bool:
    if "shared" in path.parts:
        return True
    if path.name == "release-notes.md":
        return True
    if path.name.endswith(".release-notes.md"):
        return True
    return False


def git_date(filepath: str) -> str:
    result = subprocess.run(
        ["git", "log", "-1", "--format=%aI", "--", filepath],
        capture_output=True, text=True
    )
    return result.stdout.strip() or "1970-01-01T00:00:00+00:00"


def days_ago(iso_date: str) -> int:
    try:
        dt = datetime.fromisoformat(iso_date)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        delta = datetime.now(timezone.utc) - dt
        return delta.days
    except Exception:
        return 9999


def collect_files(folder: Path) -> list[Path]:
    return [
        p for p in folder.rglob("*.md")
        if not is_excluded(p)
    ]


def collect_section_files(section_dir: Path) -> list[Path]:
    return [
        p for p in section_dir.glob("*.md")
        if not is_excluded(p)
    ]


def format_row(path: Path, date: str, stale_threshold: int = 180) -> str:
    age = days_ago(date)
    stale_marker = " ⚠" if age > stale_threshold else ""
    date_short = date[:10] if date else "unknown"
    return f"{date_short}  {age:>4}d{stale_marker}  {path}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("folder", help="Repo-relative folder to search, e.g. docs/cloud-cost-management")
    parser.add_argument("--top", type=int, default=3, help="Number of oldest files to show (default: 3)")
    parser.add_argument("--section", help="Show all files in the same folder as this file")
    args = parser.parse_args()

    folder = Path(args.folder)
    if not folder.exists():
        print(f"Error: folder not found: {folder}", file=sys.stderr)
        sys.exit(1)

    if args.section:
        # Section view: all files in the immediate parent folder of the given file
        section_dir = Path(args.section).parent
        files = collect_section_files(section_dir)
        entries = [(p, git_date(str(p))) for p in files]
        entries.sort(key=lambda x: x[1])

        stale_count = sum(1 for _, d in entries if days_ago(d) > 180)
        recommendation = (
            "/doc-section-audit" if stale_count >= 2 else "/doc-audit"
        )

        print(f"Section: {section_dir}  ({len(entries)} pages, {stale_count} stale >180d)")
        print(f"Recommendation: {recommendation}")
        print()
        print(f"{'Date':<12} {'Age':>6}   {'File'}")
        print("-" * 60)
        for path, date in entries:
            print(format_row(path, date))

    else:
        # Module view: N oldest files across the whole module
        files = collect_files(folder)
        entries = [(p, git_date(str(p))) for p in files]
        entries.sort(key=lambda x: x[1])
        top = entries[:args.top]

        print(f"{'Date':<12} {'Age':>6}   {'File'}")
        print("-" * 60)
        for path, date in top:
            print(format_row(path, date))


if __name__ == "__main__":
    main()
