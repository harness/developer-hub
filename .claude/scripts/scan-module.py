#!/usr/bin/env python3
"""Generic module scanner for HDH documentation compliance"""

import os
import re
import json
import argparse
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List, Set


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


def get_file_list(module_folder: str, exclude_folders: List[str]) -> List[str]:
    """Get all .md files in the module folder, excluding specified folders"""
    docs_path = Path("docs") / module_folder
    if not docs_path.exists():
        raise FileNotFoundError(f"Module folder not found: {docs_path}")

    files = []
    for md_file in docs_path.rglob("*.md"):
        # Skip shared folders
        if "/shared/" in str(md_file):
            continue
        # Skip release notes
        if "release-notes" in md_file.name:
            continue
        # Skip excluded folders
        if any(f"/{excluded}/" in str(md_file) for excluded in exclude_folders):
            continue
        files.append(str(md_file))

    return sorted(files)


def get_git_date(file_path: str) -> tuple:
    """Get last git commit date for a file and calculate staleness"""
    import subprocess
    try:
        result = subprocess.run(
            ["git", "log", "--format=%ad", "--date=short", "-1", "--", file_path],
            capture_output=True,
            text=True,
            check=True
        )
        date_str = result.stdout.strip()
        if not date_str:
            return "unknown", "⚪"

        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        age_days = (datetime.now() - date_obj).days

        if age_days < 180:  # < 6 months
            staleness = "🟢"
        elif age_days < 540:  # 6-18 months
            staleness = "🟡"
        else:  # > 18 months
            staleness = "🔴"

        return date_str, staleness
    except subprocess.CalledProcessError:
        return "unknown", "⚪"


def derive_url(file_path: str, module_config: dict) -> str:
    """Derive canonical URL from file path"""
    base_url = module_config["base_url"]
    module_folder = module_config["folder"]

    # Check if it's a DMS content file
    if "/content/" in file_path:
        # Find parent file
        parts = file_path.split("/content/")
        parent_dir = parts[0]
        content_file = parts[1].replace(".md", "")

        # Parent page URL
        page_path = parent_dir.replace(f"docs/{module_folder}/", "")
        parent_url = f"https://developer.harness.io{base_url}/{page_path}"

        # Fragment from filename (lowercase, replace spaces with hyphens)
        fragment = content_file.split("/")[-1].lower().replace(" ", "-")
        return f"{parent_url}#{fragment}"

    # Regular file
    page_path = file_path.replace(f"docs/{module_folder}/", "").replace(".md", "")

    # Apply duplicate segment rule
    parts = page_path.split("/")
    if len(parts) > 1 and parts[-1] == parts[-2]:
        parts = parts[:-1]
        page_path = "/".join(parts)

    return f"https://developer.harness.io{base_url}/{page_path}"


def is_faq_page(file_path: str, content: str) -> bool:
    """Determine if a page is an FAQ page"""
    # Check filename
    filename = Path(file_path).name
    if filename == "faq.md" or filename.endswith("-faq.md") or filename.endswith("-faqs.md"):
        return True

    # Check frontmatter
    frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL | re.MULTILINE)
    if frontmatter_match:
        fm = frontmatter_match.group(1)
        if re.search(r'sidebar_label:\s*FAQ', fm, re.IGNORECASE):
            return True
        if re.search(r'title:.*\bFAQ\b', fm, re.IGNORECASE):
            return True

    # Check content structure (> 60% of H2 sections contain only details/summary)
    h2_sections = re.findall(r'^## (.+?)(?=^##|\Z)', content, re.MULTILINE | re.DOTALL)
    if len(h2_sections) >= 3:
        details_count = sum(1 for section in h2_sections if '<details>' in section or '<summary>' in section)
        if details_count / len(h2_sections) > 0.6:
            return True

    return False


def check_violations(file_path: str, content: str, is_dms_content: bool, is_faq: bool) -> List[Dict]:
    """Check all compliance rules and return violations"""
    violations = []

    # Extract frontmatter and body
    frontmatter_match = re.search(r'^---\n(.*?)\n---\n(.+)', content, re.DOTALL | re.MULTILINE)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        body = frontmatter_match.group(2)
    else:
        frontmatter = ""
        body = content

    # FM-1: Missing title (exempt DMS content)
    if not is_dms_content and not re.search(r'^title:', frontmatter, re.MULTILINE):
        violations.append({"rule": "FM-1", "text": "Missing title in frontmatter"})

    # FM-2: Missing description (exempt DMS content)
    if not is_dms_content and not re.search(r'^description:', frontmatter, re.MULTILINE):
        violations.append({"rule": "FM-2", "text": "Missing description in frontmatter"})

    # FM-3: H1 in body (exempt DMS content)
    if not is_dms_content:
        for match in re.finditer(r'^# (.+)$', body, re.MULTILINE):
            violations.append({"rule": "FM-3", "text": f"H1 heading in body: {match.group(1)}", "line": body[:match.start()].count('\n')})

    # H-1: Heading case violations
    proper_nouns = {
        "Harness", "IaCM", "CI", "CD", "STO", "CCM", "SEI", "FF", "SRM", "CET", "FME",
        "Kubernetes", "Terraform", "OpenTofu", "AWS", "GCP", "Azure", "GitHub", "Docker",
        "Helm", "Argo", "Vault", "OPA", "Rego", "PostgreSQL", "MySQL", "MongoDB"
    }
    for match in re.finditer(r'^##+ (.+)$', body, re.MULTILINE):
        heading = match.group(1)
        words = heading.split()
        for i, word in enumerate(words[1:], start=1):  # Skip first word
            clean_word = word.strip('`*_')
            if clean_word and clean_word[0].isupper() and clean_word not in proper_nouns:
                violations.append({"rule": "H-1", "text": f"Heading case: {heading}", "line": body[:match.start()].count('\n')})
                break

    # H-2: Gerund headings (exempt FAQ pages and standard sections)
    if not is_faq:
        standard_sections = {"Troubleshooting", "Prerequisites"}
        for match in re.finditer(r'^##+ (.+ing)$', body, re.MULTILINE):
            heading = match.group(1).strip()
            if heading not in standard_sections:
                violations.append({"rule": "H-2", "text": f"Gerund heading: {heading}", "line": body[:match.start()].count('\n')})

    # H-3: Body content at ## level (heuristic - more than 4 ## headings, no step headings)
    if not is_faq:
        h2_headings = re.findall(r'^## (.+)$', body, re.MULTILINE)
        if len(h2_headings) > 4:
            has_steps = any(re.match(r'Step \d+', h) for h in h2_headings)
            if not has_steps:
                violations.append({"rule": "H-3", "text": f"Body content at ## level ({len(h2_headings)} H2 headings)"})

    # S-1: Em dashes
    for match in re.finditer(r'—', body):
        violations.append({"rule": "S-1", "text": "Em dash found", "line": body[:match.start()].count('\n')})

    # S-2: Link phrasing
    for match in re.finditer(r'(see \[|refer to \[|learn more|for more information)', body, re.IGNORECASE):
        violations.append({"rule": "S-2", "text": f"Link phrasing: {match.group(1)}", "line": body[:match.start()].count('\n')})

    # S-3: Bare link text
    for match in re.finditer(r'\[(here|click here|this page|this doc|this article)\]', body, re.IGNORECASE):
        violations.append({"rule": "S-3", "text": f"Bare link text: {match.group(1)}", "line": body[:match.start()].count('\n')})

    # S-4: Hardcoded domain links
    for match in re.finditer(r'https://developer\.harness\.io/docs/', body):
        violations.append({"rule": "S-4", "text": "Hardcoded domain link", "line": body[:match.start()].count('\n')})

    # S-5: "please" in body
    for match in re.finditer(r'\bplease\b', body, re.IGNORECASE):
        violations.append({"rule": "S-5", "text": "Word 'please' found", "line": body[:match.start()].count('\n')})

    # S-6: No intro before list
    for match in re.finditer(r'^##+ .+\n\n[-\d]', body, re.MULTILINE):
        violations.append({"rule": "S-6", "text": "List immediately after heading", "line": body[:match.start()].count('\n')})

    # S-7: Contractions
    contractions = [
        "don't", "won't", "can't", "isn't", "aren't", "doesn't", "didn't",
        "haven't", "hasn't", "hadn't", "shouldn't", "wouldn't", "couldn't",
        "you'll", "you're", "we'll", "we're", "it's", "that's", "there's",
        "here's", "let's", "I'm", "I'll", "I've"
    ]
    for contraction in contractions:
        for match in re.finditer(rf'\b{contraction}\b', body, re.IGNORECASE):
            violations.append({"rule": "S-7", "text": f"Contraction: {contraction}", "line": body[:match.start()].count('\n')})

    # C-1: No landmark sections (exempt DMS content and FAQ pages)
    if not is_dms_content and not is_faq:
        landmarks = ["Prerequisites", "Next steps", "Troubleshooting", "What will you learn"]
        has_landmark = any(re.search(rf'^## {landmark}', body, re.MULTILINE) for landmark in landmarks)
        if not has_landmark:
            violations.append({"rule": "C-1", "text": "No landmark sections found"})

    # C-2: Code blocks without language tags
    for match in re.finditer(r'^```\s*$', body, re.MULTILINE):
        violations.append({"rule": "C-2", "text": "Code block without language tag", "line": body[:match.start()].count('\n')})

    # T-1: Troubleshoot component not used (exempt DMS content and FAQ pages)
    if not is_dms_content and not is_faq:
        if re.search(r'^## Troubleshooting', body, re.MULTILINE) and '<Troubleshoot' not in body:
            violations.append({"rule": "T-1", "text": "Troubleshooting section without <Troubleshoot> component"})

    # T-2: ## Introduction heading (exempt DMS content)
    if not is_dms_content:
        if re.search(r'^## Introduction', body, re.MULTILINE):
            violations.append({"rule": "T-2", "text": "## Introduction heading found"})

    # T-3: FAQ structure violations (FAQ pages only)
    if is_faq:
        # Check frontmatter
        if not re.search(r'sidebar_label:\s*FAQ', frontmatter, re.IGNORECASE):
            violations.append({"rule": "T-3", "text": "FAQ page missing sidebar_label: FAQ", "severity": -15})
        if not re.search(r'title:.*FAQ', frontmatter, re.IGNORECASE):
            violations.append({"rule": "T-3", "text": "FAQ page title doesn't start with FAQ", "severity": -15})
        if not re.search(r'\bfaq\b', frontmatter, re.IGNORECASE):
            violations.append({"rule": "T-3", "text": "FAQ page missing 'faq' tag", "severity": -15})

        # Check for old FAQ pattern (### headings without details/summary)
        has_h3 = bool(re.search(r'^### ', body, re.MULTILINE))
        has_details = '<details>' in body or '<FAQ>' in body
        if has_h3 and not has_details:
            violations.append({"rule": "T-3", "text": "Old FAQ pattern: ### headings without <details>/<FAQ>", "severity": -50})
        elif has_h3 and has_details:
            violations.append({"rule": "T-3", "text": "Mixed FAQ pattern: both ### and <details>", "severity": -15})

        # Check summary endings
        for match in re.finditer(r'<summary>(.+?)</summary>', body, re.DOTALL):
            summary_text = match.group(1).strip()
            if not summary_text.endswith('?'):
                violations.append({"rule": "T-3", "text": f"Summary doesn't end with ?: {summary_text[:50]}", "line": body[:match.start()].count('\n')})

        # Check for banned sections
        banned_sections = ["Prerequisites", "Next steps", "Troubleshooting", "What will you learn"]
        for section in banned_sections:
            if re.search(rf'^## {section}', body, re.MULTILINE):
                violations.append({"rule": "T-3", "text": f"FAQ page has banned section: {section}"})

    # ST-1: Section order (exempt DMS content and FAQ pages)
    if not is_dms_content and not is_faq:
        prereq_match = re.search(r'^## Prerequisites', body, re.MULTILINE)
        next_match = re.search(r'^## Next steps', body, re.MULTILINE)
        if prereq_match and next_match and next_match.start() < prereq_match.start():
            violations.append({"rule": "ST-1", "text": "Next steps appears before Prerequisites"})

    return violations


def calculate_score(violations: List[Dict]) -> int:
    """Calculate compliance score based on violations"""
    completion_score = 100
    editorial_score = 100

    # Completion penalties
    for v in violations:
        rule = v["rule"]
        if rule == "FM-2":
            completion_score -= 15
        elif rule == "C-1":
            completion_score -= 5
        elif rule == "C-2":
            completion_score = max(0, completion_score - 5)  # Cap at 5 violations
        elif rule == "T-1":
            completion_score -= 5

    # Editorial penalties
    for v in violations:
        rule = v["rule"]
        severity = v.get("severity", None)

        if rule in ["FM-1", "FM-3"]:
            editorial_score = max(0, editorial_score - 15)
        elif rule in ["H-1", "H-3"]:
            editorial_score = max(0, editorial_score - 5)
        elif rule == "H-2":
            editorial_score = max(0, editorial_score - 15)
        elif rule in ["S-1", "S-2", "S-4"]:
            editorial_score = max(0, editorial_score - 15)
        elif rule in ["S-3", "S-5", "S-6", "S-7"]:
            editorial_score = max(0, editorial_score - 5)
        elif rule == "T-2":
            editorial_score -= 15
        elif rule == "T-3":
            if severity:
                editorial_score += severity  # severity is already negative
            else:
                editorial_score = max(0, editorial_score - 15)
        elif rule == "ST-1":
            editorial_score -= 5

    # Floor at 0
    completion_score = max(0, completion_score)
    editorial_score = max(0, editorial_score)

    # Calculate weighted score (out of 200, scaled to 100)
    raw_total = completion_score + editorial_score
    final_score = (raw_total / 200) * 100

    return round(final_score)


def scan_module(module_code: str, output_path: str):
    """Scan all files in a module and output results JSON"""
    print(f"Loading module configuration for '{module_code}'...")
    module_config = load_module_config(module_code)

    module_folder = module_config["folder"]
    exclude_folders = module_config.get("exclude_folders", [])

    print(f"Finding files in docs/{module_folder}...")
    if exclude_folders:
        print(f"Excluding folders: {', '.join(exclude_folders)}")

    files = get_file_list(module_folder, exclude_folders)
    print(f"Found {len(files)} files")

    results = []

    for i, file_path in enumerate(files, 1):
        print(f"Scanning {i}/{len(files)}: {file_path}")

        # Read file
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"  Error reading file: {e}")
            continue

        # Get metadata
        last_updated, staleness = get_git_date(file_path)
        url = derive_url(file_path, module_config)
        is_dms_content = "/content/" in file_path
        is_faq = is_faq_page(file_path, content)

        # Extract title
        title_match = re.search(r'^title:\s*(.+)$', content, re.MULTILINE)
        title = title_match.group(1).strip() if title_match else Path(file_path).stem

        # Check violations
        violations = check_violations(file_path, content, is_dms_content, is_faq)

        # Calculate score
        score = calculate_score(violations)

        # Get unique violation codes for report
        unique_codes = list(dict.fromkeys(v["rule"] for v in violations))

        results.append({
            "path": file_path,
            "url": url,
            "title": title,
            "score": score,
            "last_updated": last_updated,
            "staleness": staleness,
            "is_dms_content": is_dms_content,
            "is_faq": is_faq,
            "violations": violations,
            "unique_violation_codes": unique_codes
        })

    # Sort by score (worst first)
    results.sort(key=lambda x: x["score"])

    # Write output
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    print(f"\nResults written to {output_path}")
    print(f"Total files scanned: {len(results)}")


def main():
    parser = argparse.ArgumentParser(description="Scan a module for documentation compliance")
    parser.add_argument("--module", required=True, help="Module code (e.g., iacm, ccm, dbdevops)")
    parser.add_argument("--output", help="Output JSON file path (default: audits/<module>-phase1-results.json)")
    args = parser.parse_args()

    if not args.output:
        output_dir = Path(".claude/skills/doc-module-audit/audits")
        output_dir.mkdir(parents=True, exist_ok=True)
        args.output = str(output_dir / f"{args.module}-phase1-results.json")

    scan_module(args.module, args.output)


if __name__ == "__main__":
    main()
