#!/usr/bin/env python3
"""
Universal roadmap sync: Confluence → developer-hub → PR.

Zero config. Two inputs. No if/else.

Usage:
    python3 scripts/sync_module_roadmap.py --module ata --page-id 23726031323
    python3 scripts/sync_module_roadmap.py --module ar --page-id 23613571359
    python3 scripts/sync_module_roadmap.py --module ar --page-id 23613571359 --dry-run

Pipeline inputs:
    --module     Module key (matches existing file pattern, e.g. "ata", "ar", "ci")
    --page-id    Confluence page ID (from the URL of their roadmap page)

Everything else is derived:
    - Output file:    src/components/Roadmap/data/{module}Data.ts
    - Export var:     {module}Data (matching existing convention)
    - Branch name:    {module}-roadmap-sync-{timestamp}
    - PR title:       Sync {module} roadmap from Confluence
    - Module title:   Parsed from Confluence page title
"""

import argparse
import base64
import json
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]

GIT0_HOST = "https://git0.harness.io"
TARGET_BRANCH = "main"
DEVHUB_CLONE_DIR = "/tmp/developer-hub"

_repo_ref_cache = None


def _detect_repo_ref():
    """Detect repo path from git remote or REPO_REF env var (avoids hardcoding account ID)."""
    global _repo_ref_cache
    if _repo_ref_cache:
        return _repo_ref_cache
    repo_ref = os.environ.get("REPO_REF", "")
    if repo_ref:
        _repo_ref_cache = repo_ref
        return repo_ref
    try:
        result = subprocess.run(
            ["git", "remote", "get-url", "origin"],
            capture_output=True,
            text=True,
            cwd=ROOT,
        )
        url = result.stdout.strip()
        if "git0.harness.io" in url:
            path = url.split("git0.harness.io/")[-1].replace(".git", "")
            if "@" in path:
                path = path.split("@")[-1].split("git0.harness.io/")[-1]
            _repo_ref_cache = path
            return path
    except Exception:
        pass
    print(
        "[sync] ERROR: Cannot detect repo. Set REPO_REF env var.",
        file=sys.stderr,
    )
    sys.exit(1)


HORIZON_EMOJIS = {
    "Now": "\U0001f6a7",
    "Next": "\U0001fa84",
    "Later": "\U0001f52e",
    "Released": "✅",
}
HORIZON_ORDER = ["Now", "Next", "Later", "Released"]

MODULE_ALIASES = {
    "ait": "ata",
    "ccm": "cloudCost",
    "ff": "fme",
}


def resolve_module_key(raw_key):
    return MODULE_ALIASES.get(raw_key, raw_key)


def validate_module(module_key, clone_dir):
    filepath = os.path.join(
        clone_dir, f"src/components/Roadmap/data/{module_key}Data.ts"
    )
    if os.path.exists(filepath):
        return True
    data_dir = os.path.join(clone_dir, "src/components/Roadmap/data")
    if not os.path.isdir(data_dir):
        print(
            f"[sync] ERROR: Roadmap data directory not found in developer-hub clone.",
            file=sys.stderr,
        )
        return False
    existing = sorted(
        f.replace("Data.ts", "")
        for f in os.listdir(data_dir)
        if f.endswith("Data.ts") and f != "roadmapData.ts"
    )
    print(f"[sync] ERROR: No existing file for module '{module_key}'.", file=sys.stderr)
    print(f"[sync] Available modules: {', '.join(existing)}", file=sys.stderr)
    return False


# --- Confluence ---


def load_atlassian_creds():
    email = os.environ.get("CONFLUENCE_EMAIL", "")
    token = os.environ.get("CONFLUENCE_API_TOKEN", "")
    if email and token:
        return email, token
    cfg_path = ROOT / "config" / "atlassian.yaml"
    if cfg_path.exists():
        with open(cfg_path) as f:
            cfg = yaml.safe_load(f)
        creds = cfg.get("credentials", {})
        return creds.get("email", ""), creds.get("api_token", "")
    print(
        "[sync] ERROR: No Confluence credentials. Set CONFLUENCE_EMAIL + CONFLUENCE_API_TOKEN env vars.",
        file=sys.stderr,
    )
    sys.exit(1)


def fetch_confluence_page(page_id, email, token):
    url = f"https://harness.atlassian.net/wiki/rest/api/content/{page_id}?expand=body.storage,title"
    fd, netrc_path = tempfile.mkstemp(prefix="confluence_netrc_", suffix=".txt")
    with os.fdopen(fd, "w") as fh:
        fh.write(f"machine harness.atlassian.net\nlogin {email}\npassword {token}\n")
    os.chmod(netrc_path, 0o600)
    try:
        result = subprocess.run(
            ["curl", "-s", "--netrc-file", netrc_path, url],
            capture_output=True,
            text=True,
        )
    finally:
        os.unlink(netrc_path)
    try:
        data = json.loads(result.stdout)
    except json.JSONDecodeError:
        print(
            "[sync] ERROR: Invalid response from Confluence. Check credentials.",
            file=sys.stderr,
        )
        sys.exit(1)
    if "body" not in data:
        msg = data.get("message", data.get("errorMessage", "Unknown error"))
        print(f"[sync] ERROR: Could not fetch page {page_id}: {msg}", file=sys.stderr)
        sys.exit(1)
    title = data.get("title", "")
    storage = data["body"]["storage"]["value"]
    return title, storage


def parse_roadmap_table(storage_xml):
    import html as html_mod

    horizons = {}
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", storage_xml, re.DOTALL)

    for row_html in rows:
        cells = re.findall(r"<td[^>]*>(.*?)</td>", row_html, re.DOTALL)
        if len(cells) < 4:
            continue

        col_text = re.sub(r"<[^>]+>", "", cells[0]).strip()
        horizon_name = None
        for name in HORIZON_ORDER:
            if name.lower() == col_text.lower():
                horizon_name = name
                break
        if not horizon_name:
            continue

        title = html_mod.unescape(re.sub(r"<[^>]+>", "", cells[1]).strip())
        description = html_mod.unescape(re.sub(r"<[^>]+>", "", cells[2]).strip())

        tags_raw = re.sub(r"<[^>]+>", "", cells[3]).strip()
        tags = [t.strip() for t in tags_raw.split(",") if t.strip()]

        quarter = ""
        if len(cells) >= 5:
            quarter = re.sub(r"<[^>]+>", "", cells[4]).strip()

        if not title:
            continue

        if horizon_name not in horizons:
            horizons[horizon_name] = {"quarter": "", "features": []}

        if quarter and not horizons[horizon_name]["quarter"]:
            horizons[horizon_name]["quarter"] = quarter

        horizons[horizon_name]["features"].append(
            {
                "title": title,
                "description": description,
                "tags": tags,
            }
        )

    return horizons


# --- TypeScript generation ---


def detect_quoted_keys(file_content):
    """Check if the existing file uses quoted horizon keys ("Now") or unquoted (Now)."""
    if file_content and re.search(r'"(Now|Next|Later|Released)":\s*\{', file_content):
        return True
    return False


def generate_data_block(horizons, export_name, quoted_keys=False):
    """Generate only the Horizon data block (export const ... = { ... };)."""
    lines = [f"export const {export_name}: Horizon = {{"]

    for horizon_name in HORIZON_ORDER:
        if horizon_name not in horizons:
            continue
        data = horizons[horizon_name]
        quarter = data["quarter"]

        key = f'"{horizon_name}"' if quoted_keys else horizon_name
        lines.append(f"  {key}: {{")
        lines.append(f'    description: "{quarter}",')
        lines.append("    feature: [")

        for f in data["features"]:
            title = f["title"].replace('"', '\\"')
            description = f["description"].replace('"', '\\"').replace("\n", " ")
            tags = f.get("tags", [])

            lines.append("      {")
            if tags:
                tag_str = ", ".join(
                    f'{{ value: "{t.replace(chr(92), chr(92)+chr(92)).replace(chr(34), chr(92)+chr(34))}" }}'
                    for t in tags
                )
                lines.append(f"        tag: [{tag_str}],")
            lines.append(f'        title: "{title}",')
            lines.append(f'        description: "{description}",')
            lines.append("      },")

        lines.append("    ],")
        lines.append("  },")

    lines.append("};")
    return "\n".join(lines)


def find_export_name(file_content, module_key):
    """Find the actual export variable name from the existing file (e.g. CdData, arData, AtaData)."""
    pattern = r"export const (\w+):\s*Horizon\s*="
    match = re.search(pattern, file_content)
    if match:
        return match.group(1)
    return f"{module_key}Data"


def replace_data_in_file(existing_content, new_data_block, export_name):
    """Replace only the Horizon data block in the file, preserving everything else."""
    pattern = rf"export const {re.escape(export_name)}:\s*Horizon\s*=\s*\{{.*?^\}};"
    match = re.search(pattern, existing_content, re.DOTALL | re.MULTILINE)
    if match:
        return (
            existing_content[: match.start()]
            + new_data_block
            + existing_content[match.end() :]
        )
    return None


def generate_ts(horizons, module_key, existing_content=None):
    """Generate the updated file content.

    If existing_content is provided, only the data block is replaced (Option A).
    If no existing file, generates a minimal new file as fallback.
    """
    if existing_content:
        export_name = find_export_name(existing_content, module_key)
        quoted_keys = detect_quoted_keys(existing_content)
        data_block = generate_data_block(horizons, export_name, quoted_keys=quoted_keys)
        result = replace_data_in_file(existing_content, data_block, export_name)
        if result:
            return result

    # Fallback: generate a complete file for new modules
    export_name = f"{module_key}Data"
    lines = [
        'import { Horizon } from "./roadmapData";',
        "",
        generate_data_block(horizons, export_name),
        "",
    ]
    return "\n".join(lines)


# --- Git ---


def get_git0_token():
    token = os.environ.get("GIT0_TOKEN", "")
    if token:
        return token
    try:
        result = subprocess.run(
            ["git", "credential", "fill"],
            input="protocol=https\nhost=git0.harness.io\n\n",
            capture_output=True,
            text=True,
            timeout=5,
        )
        for line in result.stdout.splitlines():
            if line.startswith("password="):
                return line.split("=", 1)[1]
    except Exception:
        pass
    return ""


def git_run(args, cwd=None):
    result = subprocess.run(
        ["git"] + args,
        capture_output=True,
        text=True,
        cwd=cwd,
    )
    if result.returncode != 0:
        print(f"  git error: {result.stderr[:500]}", file=sys.stderr)
        raise RuntimeError(f"git {' '.join(args[:3])} failed")
    return result.stdout.strip()


_netrc_path = None


def _setup_netrc(token):
    """Create a temporary .netrc file for git auth (keeps token out of process args and .git/config)."""
    global _netrc_path
    fd, _netrc_path = tempfile.mkstemp(prefix="git_netrc_", suffix=".txt")
    with os.fdopen(fd, "w") as fh:
        fh.write(f"machine git0.harness.io\nlogin x-token\npassword {token}\n")
    os.chmod(_netrc_path, 0o600)
    os.environ["NETRC"] = _netrc_path


def _cleanup_netrc():
    global _netrc_path
    if _netrc_path and os.path.exists(_netrc_path):
        os.unlink(_netrc_path)
        _netrc_path = None
    os.environ.pop("NETRC", None)


def clone_devhub(token):
    repo_url = f"{GIT0_HOST}/{_detect_repo_ref()}.git"
    if os.path.exists(DEVHUB_CLONE_DIR):
        rm_result = subprocess.run(["rm", "-rf", DEVHUB_CLONE_DIR])
        if rm_result.returncode != 0:
            print(
                f"[sync] ERROR: Failed to remove existing clone at {DEVHUB_CLONE_DIR}.",
                file=sys.stderr,
            )
            sys.exit(1)
    _setup_netrc(token)
    result = subprocess.run(
        [
            "git",
            "clone",
            "--depth",
            "1",
            "--single-branch",
            "-b",
            TARGET_BRANCH,
            repo_url,
            DEVHUB_CLONE_DIR,
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        _cleanup_netrc()
        print(
            f"[sync] ERROR: Failed to clone developer-hub. Check GIT0_TOKEN permissions.",
            file=sys.stderr,
        )
        print(f"  {result.stderr[:300]}", file=sys.stderr)
        sys.exit(1)


def create_branch_commit_push(token, branch_name, output_file, new_content, commit_msg):
    git_run(["checkout", "-b", branch_name], cwd=DEVHUB_CLONE_DIR)

    filepath = os.path.join(DEVHUB_CLONE_DIR, output_file)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w") as f:
        f.write(new_content)

    git_run(["add", output_file], cwd=DEVHUB_CLONE_DIR)
    git_run(["commit", "-m", commit_msg], cwd=DEVHUB_CLONE_DIR)
    git_run(["push", "origin", branch_name], cwd=DEVHUB_CLONE_DIR)


def create_pr(token, title, source_branch, target_branch, description):
    url = f"{GIT0_HOST}/api/v1/repos/{_detect_repo_ref()}/pullreq"
    payload = json.dumps(
        {
            "title": title,
            "source_branch": source_branch,
            "target_branch": target_branch,
            "description": description,
        }
    )
    fd, netrc_path = tempfile.mkstemp(prefix="git0_netrc_", suffix=".txt")
    with os.fdopen(fd, "w") as fh:
        fh.write(f"machine git0.harness.io\nlogin x-token\npassword {token}\n")
    os.chmod(netrc_path, 0o600)
    try:
        result = subprocess.run(
            [
                "curl",
                "-sL",
                "--netrc-file",
                netrc_path,
                "-X",
                "POST",
                url,
                "-H",
                "Content-Type: application/json",
                "-d",
                payload,
            ],
            capture_output=True,
            text=True,
        )
    finally:
        os.unlink(netrc_path)
    try:
        resp = json.loads(result.stdout)
        return resp.get("number")
    except (json.JSONDecodeError, AttributeError):
        print(f"  PR response: {result.stdout[:300]}", file=sys.stderr)
        return None


# --- Diff ---


def diff_features(old_ts, new_ts):
    def extract_titles(ts):
        return set(re.findall(r'title: "([^"]+)"', ts))

    old_titles = extract_titles(old_ts)
    new_titles = extract_titles(new_ts)
    return sorted(new_titles - old_titles), sorted(old_titles - new_titles)


def build_pr_body(horizons, added, removed, module_key, page_id, page_title):
    lines = [
        "## Summary",
        "",
        f"Syncs the **{page_title}** from "
        f"[Confluence](https://harness.atlassian.net/wiki/spaces/x/pages/{page_id}) "
        f"to [developer.harness.io/roadmap](https://developer.harness.io/roadmap).",
        "",
        "| Horizon | Features |",
        "|---------|----------|",
    ]
    for name in HORIZON_ORDER:
        if name in horizons:
            lines.append(f"| {name} | {len(horizons[name]['features'])} |")

    if added:
        lines.extend(["", "### Added"] + [f"- {f}" for f in added])
    if removed:
        lines.extend(["", "### Removed"] + [f"- {f}" for f in removed])

    lines.extend(
        [
            "",
            "---",
            f"Generated by `sync_module_roadmap.py --module {module_key} --page-id {page_id}`",
        ]
    )
    return "\n".join(lines)


# --- Main ---


def main():
    parser = argparse.ArgumentParser(
        description="Sync any module's Confluence roadmap to developer-hub. No config needed.",
    )
    parser.add_argument(
        "--module", required=True, help="Module key (e.g. ar, ata, ci, cd, iacm)"
    )
    parser.add_argument(
        "--page-id", required=True, help="Confluence page ID of the roadmap table"
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="Show output without creating PR"
    )
    args = parser.parse_args()

    raw_key = args.module.lower().strip()
    module_key = resolve_module_key(raw_key)
    page_id = args.page_id.strip()

    if module_key != raw_key:
        print(f"[sync] Resolved alias: '{raw_key}' → '{module_key}'")

    # Derive everything from the two inputs
    output_file = f"src/components/Roadmap/data/{module_key}Data.ts"

    print(f"\n[sync] module={module_key}, page={page_id}")
    print(f"[sync] output → {output_file}\n")

    # 1. Fetch Confluence
    print("[sync] Fetching Confluence page...")
    email, token = load_atlassian_creds()
    page_title, storage_xml = fetch_confluence_page(page_id, email, token)
    print(f"[sync] Page: {page_title}")

    horizons = parse_roadmap_table(storage_xml)
    if not horizons:
        print(
            "[sync] ERROR: No roadmap rows found. Check the table format (Column | Title | Description | Tags | Quarter)."
        )
        sys.exit(1)

    for name in HORIZON_ORDER:
        if name in horizons:
            print(f"  {name}: {len(horizons[name]['features'])} features")

    # 2. Clone developer-hub
    print("\n[sync] Cloning developer-hub...")
    git_token = get_git0_token()
    if not git_token:
        print("[sync] ERROR: No GIT0_TOKEN set.", file=sys.stderr)
        if args.dry_run:
            print("\n--- Generated output (no existing file to preserve) ---")
            print(generate_ts(horizons, module_key))
        sys.exit(1)

    clone_devhub(git_token)

    if not validate_module(module_key, DEVHUB_CLONE_DIR):
        sys.exit(1)

    git_run(["config", "user.email", "pipeline@harness.io"], cwd=DEVHUB_CLONE_DIR)
    git_run(["config", "user.name", "Roadmap Sync"], cwd=DEVHUB_CLONE_DIR)

    # 3. Read existing file and generate updated content
    filepath = os.path.join(DEVHUB_CLONE_DIR, output_file)
    current_ts = ""
    if os.path.exists(filepath):
        with open(filepath) as f:
            current_ts = f.read()

    new_ts = generate_ts(
        horizons, module_key, existing_content=current_ts if current_ts else None
    )

    if args.dry_run:
        print("\n[sync] DRY RUN — no PR created.\n")
        print(new_ts)
        return

    # 4. Compare
    if new_ts == current_ts:
        print("\n[sync] No changes detected. Already in sync.")
        return

    added, removed = diff_features(current_ts, new_ts)
    print(f"\n[sync] Changes:")
    if added:
        print(f"  + {', '.join(added)}")
    if removed:
        print(f"  - {', '.join(removed)}")
    if not added and not removed:
        print("  ~ Description/tag/ordering changes")

    # 5. Branch, commit, push, PR
    timestamp = datetime.now().strftime("%Y%m%d-%H%M")
    branch_name = f"{module_key}-roadmap-sync-{timestamp}"
    commit_msg = f"docs({module_key}): sync roadmap from Confluence\n\nSource: https://harness.atlassian.net/wiki/spaces/x/pages/{page_id}"

    print(f"\n[sync] Pushing branch {branch_name}...")
    create_branch_commit_push(git_token, branch_name, output_file, new_ts, commit_msg)

    pr_title = f"docs({module_key}): sync roadmap from Confluence"
    pr_body = build_pr_body(horizons, added, removed, module_key, page_id, page_title)

    print("[sync] Creating PR...")
    pr_number = create_pr(git_token, pr_title, branch_name, TARGET_BRANCH, pr_body)

    if pr_number:
        print(f"\n[sync] Done! PR: {GIT0_HOST}/{_detect_repo_ref()}/pulls/{pr_number}")
    else:
        print(f"\n[sync] Branch pushed. Check git0 for PR.")

    _cleanup_netrc()


if __name__ == "__main__":
    main()
