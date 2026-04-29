#!/usr/bin/env python3
"""
Find markdown files by age of last git commit.

Usage:
  python .claude/scripts/find-oldest-docs.py <folder> [--top N] [--section <file>]
  python .claude/scripts/find-oldest-docs.py --git-date <file>
  python .claude/scripts/find-oldest-docs.py --list-modules

Examples:
  # 3 oldest files in a module
  python .claude/scripts/find-oldest-docs.py docs/cloud-cost-management --top 3

  # All files in the same folder as a specific file (section view)
  python .claude/scripts/find-oldest-docs.py docs/cloud-cost-management \
    --section docs/cloud-cost-management/getting-started/ccm-overview.md

  # Get the last git commit date for a single file
  python .claude/scripts/find-oldest-docs.py --git-date docs/infra-as-code-management/workspaces/cli-integration.md

  # List all supported module abbreviations (reads from modules.json)
  python .claude/scripts/find-oldest-docs.py --list-modules

Exclusions (always applied):
  - Files in any /shared/ folder
  - Files matching *.release-notes.md
  - Files named release-notes.md
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


EXCLUDE_PATTERNS = {"*.release-notes.md", "release-notes.md"}

KNOWN_REPO_PATHS: list[str] = []


def find_and_chdir_repo() -> None:
    """Change to the repo root so all relative docs/ paths work correctly."""
    # Try git first (works when already inside the repo)
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        os.chdir(result.stdout.strip())
        return
    # Fall back to known absolute paths (Cowork → macOS)
    for path in KNOWN_REPO_PATHS:
        if Path(path).is_dir():
            os.chdir(path)
            return


def load_modules() -> list[dict]:
    """Load module definitions from modules.json."""
    modules_file = Path(".claude/scripts/modules.json")
    if not modules_file.exists():
        return []
    with open(modules_file) as f:
        return json.load(f)


def is_excluded(path: Path) -> bool:
    if "shared" in path.parts:
        return True
    if path.name == "release-notes.md":
        return True
    if path.name.endswith(".release-notes.md"):
        return True
    return False


def git_date(filepath: str) -> str:
    """Return the ISO date of the last commit touching this file.

    Returns:
        ISO date string, "new" for untracked/uncommitted files,
        or "1970-01-01T00:00:00+00:00" as a last resort.
    """
    result = subprocess.run(
        ["git", "log", "-1", "--format=%aI", "--", filepath],
        capture_output=True, text=True
    )
    date = result.stdout.strip()
    if date:
        return date

    # No commit found — check if the file is new/untracked/staged
    status = subprocess.run(
        ["git", "status", "--porcelain", "--", filepath],
        capture_output=True, text=True
    )
    if status.stdout.strip():
        return "new"

    return "1970-01-01T00:00:00+00:00"


def days_ago(iso_date: str) -> int:
    if iso_date == "new":
        return 0
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
    if date == "new":
        return f"{'new file':<12} {'—':>6}   {path}"
    age = days_ago(date)
    stale_marker = " ⚠" if age > stale_threshold else ""
    date_short = date[:10]
    return f"{date_short}  {age:>4}d{stale_marker}  {path}"


def main():
    find_and_chdir_repo()

    parser = argparse.ArgumentParser()
    parser.add_argument("folder", nargs="?", help="Repo-relative folder to search, e.g. docs/cloud-cost-management")
    parser.add_argument("--top", type=int, default=3, help="Number of oldest files to show (default: 3)")
    parser.add_argument("--section", help="Show all files in the same folder as this file")
    parser.add_argument("--git-date", metavar="FILE", help="Print the last git commit date for a single file and exit")
    parser.add_argument("--list-modules", action="store_true", help="Print all supported module abbreviations and exit")
    args = parser.parse_args()

    # --list-modules mode
    if args.list_modules:
        modules = load_modules()
        if not modules:
            print("Error: .claude/scripts/modules.json not found or empty", file=sys.stderr)
            sys.exit(1)
        print(f"{'Code':<10} {'Folder':<45} {'Base URL'}")
        print("-" * 80)
        for m in modules:
            print(f"{m['code']:<10} {m['folder']:<45} {m['base_url']}")
        return

    # --git-date mode
    if args.git_date:
        date = git_date(args.git_date)
        if date == "new":
            print(f"new file  (not yet committed)  {args.git_date}")
        else:
            age = days_ago(date)
            print(f"{date[:10]}  ({age}d ago)  {args.git_date}")
        return

    if not args.folder:
        print("Error: a folder argument is required (unless using --git-date or --list-modules)", file=sys.stderr)
        sys.exit(1)

    folder = Path(args.folder)
    if not folder.exists():
        print(f"Error: folder not found: {folder}", file=sys.stderr)
        sys.exit(1)

    if args.section:
        section_file = Path(args.section)
        if not section_file.exists():
            print(f"Error: file not found: {args.section}", file=sys.stderr)
            sys.exit(1)

        section_dir = section_file.parent
        files = collect_section_files(section_dir)
        entries = [(p, git_date(str(p))) for p in files]
        entries.sort(key=lambda x: (x[1] != "new", x[1]))

        stale_count = sum(1 for _, d in entries if d != "new" and days_ago(d) > 180)
        recommendation = (
            "doc-section-audit" if stale_count >= 2 else "doc-audit"
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
        # Sort: real dates oldest-first; "new" files go last
        entries.sort(key=lambda x: (x[1] == "new", x[1]))
        top = entries[:args.top]

        print(f"{'Date':<12} {'Age':>6}   {'File'}")
        print("-" * 60)
        for path, date in top:
            print(format_row(path, date))


if __name__ == "__main__":
    main()
