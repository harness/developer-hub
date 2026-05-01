#!/usr/bin/env python3
"""Generate module compliance report from scan results"""

import json
import argparse
from collections import Counter
from datetime import datetime
from pathlib import Path

RULE_DESCRIPTIONS = {
    "FM-1": "Missing title",
    "FM-2": "Missing description",
    "FM-3": "H1 in body",
    "H-1": "Heading case violations",
    "H-2": "Gerund headings",
    "H-3": "Body content at ## level",
    "S-1": "Em dashes",
    "S-2": "Link phrasing (see/refer to)",
    "S-3": "Bare link text (here/click here)",
    "S-4": "Hardcoded domain links",
    "S-5": '"please" in body',
    "S-6": "No intro before list",
    "S-7": "Contractions",
    "C-1": "No landmark sections",
    "C-2": "Code blocks without language tag",
    "T-1": "Troubleshoot component not used",
    "T-2": "## Introduction heading",
    "T-3": "FAQ structure violations",
    "ST-1": "Section order"
}


def load_module_config(module_code: str) -> dict:
    """Load module configuration from modules.json"""
    modules_file = Path(".claude/scripts/modules.json")
    if not modules_file.exists():
        raise FileNotFoundError(f"modules.json not found at {modules_file}")

    with open(modules_file, 'r') as f:
        modules = json.load(f)

    for module in modules:
        if module["code"] == module_code:
            return module

    raise ValueError(f"Module '{module_code}' not found in modules.json")


def generate_report(results: list, module_config: dict, output_path: str):
    """Generate markdown compliance report"""
    module_code = module_config["code"]
    module_folder = module_config["folder"]
    module_name = module_config.get("name", module_code.upper())
    exclude_folders = module_config.get("exclude_folders", [])

    # Calculate statistics
    total_files = len(results)
    if total_files == 0:
        print("No results to report")
        return

    passing = [r for r in results if r["score"] >= 90]
    partial = [r for r in results if 80 <= r["score"] < 90]
    failing = [r for r in results if r["score"] < 80]

    pass_count = len(passing)
    partial_count = len(partial)
    fail_count = len(failing)

    avg_score = sum(r["score"] for r in results) / total_files

    # Count violations
    all_violations = []
    for r in results:
        all_violations.extend(r["violations"])

    rule_counts = Counter(v["rule"] for v in all_violations)
    top_3_violations = rule_counts.most_common(3)

    # Generate report
    today = datetime.now().strftime("%Y-%m-%d")
    today_short = datetime.now().strftime("%Y%m%d")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"# Module audit: {module_name}\n\n")
        f.write(f"**Module:** {module_code} — {module_folder}\n")
        f.write(f"**Scope:** Full module\n")
        if exclude_folders:
            f.write(f"**Excluded folders:** {', '.join(exclude_folders)}\n")
        else:
            f.write(f"**Excluded folders:** none\n")
        f.write(f"**Audit date:** {today}\n")
        f.write(f"**Mode:** Quick (structural only)\n")
        f.write(f"**Files scanned:** {total_files}\n\n")

        f.write("## Summary\n\n")
        f.write("| Status | Count | % of module |\n")
        f.write("|---|---|---|\n")
        f.write(f"| ✅ Pass (≥ 90) | {pass_count} | {pass_count/total_files*100:.1f}% |\n")
        f.write(f"| ⚠️ Partial (80–89) | {partial_count} | {partial_count/total_files*100:.1f}% |\n")
        f.write(f"| ❌ Fail (< 80) | {fail_count} | {fail_count/total_files*100:.1f}% |\n\n")
        f.write(f"**Overall module compliance:** {avg_score:.1f}/100\n\n")
        f.write("**Scoring model:** Quick mode scores out of 200 points (Completion 50% + Editorial 50%), scaled to 100.\n\n")

        f.write("## Rule breakdown\n\n")
        f.write("**Rule prefix key:** FM = Frontmatter · H = Heading · S = Style · C = Content · T = Troubleshoot · ST = Structure\n\n")
        f.write("| Rule | Description | Failures |\n")
        f.write("|---|---|---|\n")

        for rule in sorted(RULE_DESCRIPTIONS.keys()):
            count = rule_counts.get(rule, 0)
            desc = RULE_DESCRIPTIONS[rule]
            f.write(f"| {rule} | {desc} | {count} |\n")

        f.write(f"\n**Total violations found:** {len(all_violations)}\n\n")

        f.write("**Top 3 most common issues across this module:**\n\n")
        for idx, (rule, count) in enumerate(top_3_violations, 1):
            desc = RULE_DESCRIPTIONS.get(rule, rule)
            file_count = sum(1 for r in results if any(v["rule"] == rule for v in r["violations"]))
            f.write(f"{idx}. **{rule} — {desc}:** {count} violations across {file_count} files\n")

        f.write("\n## Files ranked by compliance score\n\n")

        # Failing files
        f.write(f"### ❌ Failing (score < 80)\n\n")
        f.write(f"**{fail_count} files**\n\n")
        if fail_count > 0:
            f.write("| File | Score | Last updated | Top violations |\n")
            f.write("|---|---|---|---|\n")
            for r in failing[:30]:
                title = r["title"]
                url = r["url"]
                score = r["score"]
                staleness = r["staleness"]
                last_updated = r["last_updated"]
                top_viol = ", ".join(r["unique_violation_codes"][:4])
                f.write(f"| [{title}]({url}) | {score} | {staleness} {last_updated} | {top_viol} |\n")
            if fail_count > 30:
                f.write(f"\n*... and {fail_count - 30} more failing files*\n")
        else:
            f.write("*No files in this category*\n")

        # Partial files
        f.write(f"\n### ⚠️ Partial (score 80–89)\n\n")
        f.write(f"**{partial_count} files**\n\n")
        if partial_count > 0:
            f.write("| File | Score | Last updated | Top violations |\n")
            f.write("|---|---|---|---|\n")
            for r in partial:
                title = r["title"]
                url = r["url"]
                score = r["score"]
                staleness = r["staleness"]
                last_updated = r["last_updated"]
                top_viol = ", ".join(r["unique_violation_codes"][:4])
                f.write(f"| [{title}]({url}) | {score} | {staleness} {last_updated} | {top_viol} |\n")
        else:
            f.write("*No files in this category*\n")

        # Violation details for worst 10
        f.write("\n## Violation details — Worst 10 files\n\n")

        for r in results[:10]:
            title = r["title"]
            url = r["url"]
            score = r["score"]
            path = r["path"]

            f.write(f"### {title}\n\n")
            f.write(f"**URL:** {url}\n")
            f.write(f"**Path:** `{path}`\n")
            f.write(f"**Score:** {score}/100 — {'FAIL' if score < 80 else 'PARTIAL'}\n\n")
            f.write("**Violations:**\n\n")

            violations_by_rule = {}
            for v in r["violations"]:
                rule = v["rule"]
                if rule not in violations_by_rule:
                    violations_by_rule[rule] = []
                violations_by_rule[rule].append(v)

            for rule in sorted(violations_by_rule.keys()):
                viols = violations_by_rule[rule]
                count = len(viols)
                desc = RULE_DESCRIPTIONS.get(rule, rule)
                f.write(f"- **{rule} — {desc}:** {count} occurrence{'s' if count > 1 else ''}\n")

                for v in viols[:3]:
                    line = v.get("line", 0)
                    text = v.get("text", "")[:60]
                    if line > 0:
                        f.write(f"  - Line {line}: `{text}`\n")
                    else:
                        f.write(f"  - {text}\n")

                if count > 3:
                    f.write(f"  - *... and {count - 3} more*\n")

            f.write(f"\n**Suggested action:** `/doc-audit {path}`\n\n")
            f.write("---\n\n")

        # Recommended actions
        f.write("## Recommended actions\n\n")
        f.write("Based on the rule breakdown, the highest-impact fixes for this module are:\n\n")

        for idx, (rule, count) in enumerate(top_3_violations, 1):
            desc = RULE_DESCRIPTIONS.get(rule, rule)
            file_count = sum(1 for r in results if any(v["rule"] == rule for v in r["violations"]))

            fix_desc = {
                "H-1": "Review headings and apply sentence case",
                "S-2": 'Replace with "Go to [link] to [action]" format',
                "S-4": "Replace with site-relative paths (/docs/...)",
                "C-2": "Add language identifiers to code blocks",
                "S-7": "Expand contractions to full forms",
                "C-1": "Add landmark sections",
                "H-2": "Convert gerund headings to imperative",
            }.get(rule, f"Fix {desc}")

            f.write(f"{idx}. **{rule} — {desc}:** {count} violations across {file_count} files. Fix: {fix_desc}\n\n")

        if len(results) > 0:
            worst_file = results[0]
            f.write(f"**Priority target:** The worst-scoring file is `{worst_file['path']}` (score: {worst_file['score']}/100).\n\n")

        f.write("## Next steps\n\n")
        if len(results) > 0:
            f.write(f"- Deep rewrite of worst page: `/doc-audit {results[0]['path']}`\n")
        f.write(f"- Re-run after fixes: `/doc-module-audit {module_code}`\n\n")

        f.write("## Appendix — Passing files\n\n")
        f.write(f"**{pass_count} files passing (score ≥ 90)**\n\n")

        if pass_count > 0:
            f.write("| File | Score | Last updated |\n")
            f.write("|---|---|---|\n")
            for r in passing:
                title = r["title"]
                url = r["url"]
                score = r["score"]
                staleness = r["staleness"]
                last_updated = r["last_updated"]
                f.write(f"| [{title}]({url}) | {score} | {staleness} {last_updated} |\n")
        else:
            f.write("*No files passed the compliance threshold (≥ 90)*\n")

    print(f"Report generated: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Generate module compliance report from scan results")
    parser.add_argument("--module", required=True, help="Module code (e.g., iacm, ccm, dbdevops)")
    parser.add_argument("--results", required=True, help="Path to scan results JSON file")
    parser.add_argument("--output", help="Output report file path (default: audits/<module>-module-audit-YYYYMMDD.md)")
    args = parser.parse_args()

    # Load module configuration
    try:
        module_config = load_module_config(args.module)
    except Exception as e:
        print(f"Error loading module config: {e}")
        return 1

    # Load results
    try:
        with open(args.results, 'r') as f:
            results = json.load(f)
    except Exception as e:
        print(f"Error loading results: {e}")
        return 1

    # Determine output path
    if args.output:
        output_path = args.output
    else:
        output_dir = Path(".claude/skills/doc-module-audit/audits")
        output_dir.mkdir(parents=True, exist_ok=True)
        today = datetime.now().strftime("%Y%m%d")
        output_path = output_dir / f"{args.module}-module-audit-{today}.md"

    generate_report(results, module_config, str(output_path))

    # Print summary
    total_files = len(results)
    passing = [r for r in results if r["score"] >= 90]
    partial = [r for r in results if 80 <= r["score"] < 90]
    failing = [r for r in results if r["score"] < 80]
    avg_score = sum(r["score"] for r in results) / total_files if results else 0

    print(f"\nSummary:")
    print(f"  Total files: {total_files}")
    print(f"  Pass: {len(passing)} ({len(passing)/total_files*100:.1f}%)")
    print(f"  Partial: {len(partial)} ({len(partial)/total_files*100:.1f}%)")
    print(f"  Fail: {len(failing)} ({len(failing)/total_files*100:.1f}%)")
    print(f"  Average score: {avg_score:.1f}/100")

    # Top 3 violations
    all_violations = []
    for r in results:
        all_violations.extend(r["violations"])
    rule_counts = Counter(v["rule"] for v in all_violations)
    top_3_violations = rule_counts.most_common(3)

    print(f"\nTop 3 violations:")
    for rule, count in top_3_violations:
        desc = RULE_DESCRIPTIONS.get(rule, rule)
        print(f"  {rule} - {desc}: {count} violations")

    return 0


if __name__ == "__main__":
    exit(main())
