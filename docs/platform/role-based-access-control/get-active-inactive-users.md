---
title: Get active and inactive users
description: Run a Python script against the Harness Audit API to identify which users logged in over a specified time period.
keywords:
  - active users
  - inactive users
  - deleted users
  - audit api
  - login activity
  - license management
  - offboarding
  - user lifecycle
tags:
  - rbac
  - access control
  - users
sidebar_position: 70
helpdocs_topic_id:
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Identify which users logged in to your Harness account over a specific time period. This topic provides a Python script that queries the <a href="https://apidocs.harness.io/audit" target="_blank">Harness Audit API</a> for `LOGIN` events across a date range, compares the results against every user in your account, and categorizes each user as active, inactive, or deleted.

Login activity supports several account management tasks:

- **Compliance and auditing**: Track user access for security and regulatory requirements.
- **License management**: Identify active users to optimize license usage.
- **User lifecycle management**: Find inactive users who may need to be offboarded.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Understand how the script works](#how-the-script-works) and which output files it produces.
- [Run the script](#run-the-script) with a custom date range or environment variables.
- [Review the script parameters](#script-parameters) to control the account and reporting window.
- [Interpret the output](#interpret-the-output) files and count or extract user records.
- [Troubleshoot](#troubleshooting) authentication, permission, and rate limit errors.

---

## Before you begin

Before you run the script, ensure you have the following:

- **Python 3.x**: Installed on the system where you run the script.
- **Python requests library**: Install it with `pip install requests`.
- **API token**: A token with permission to read audit logs and users. For more information, see <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a>.
- **Audit log permission**: Permission to view audit logs in your Harness account. For more information, see <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a>.
- **Harness account ID**: Available in any Harness URL, for example `https://app.harness.io/ng/account/<ACCOUNT_ID>/...`.

---

## How the script works

Understand the output categories before you act on the results, because an empty login record does not always mean the account is safe to delete. The script queries the Harness Audit API for `LOGIN` events within a date range, compares that data against all users in your account, and writes three files.

- **active_users.ndjson**: Users who logged in during the specified time period.
- **inactive_users.ndjson**: Users who exist in the account but did not log in during the specified time period.
- **deleted_users.ndjson**: Users who logged in during the specified time period but no longer exist in the account.

The output files use <a href="http://ndjson.org/" target="_blank">NDJSON format</a> (newline-delimited JSON), where each line is a valid JSON object representing one user record.

---

## Run the script

Save the <a href="#complete-script">complete script</a> as `get_inactive_users.py`, then run it from the command line with your environment URL and credentials. By default, the script analyzes the last 30 days of login activity.

```bash
# Using API key (recommended)
python3 get_inactive_users.py \
  --env app.harness.io/ng/account/<YOUR_ACCOUNT_ID>/ \
  --apikey YOUR_API_KEY

# Using Bearer token
python3 get_inactive_users.py \
  --env app.harness.io/ng/account/<YOUR_ACCOUNT_ID>/ \
  --bearer YOUR_BEARER_TOKEN
```

### Specify a custom date range

Set an explicit window when you report on a fixed audit period, such as a quarter, rather than the trailing 30 days. Pass the `--start` and `--end` parameters:

```bash
python3 get_inactive_users.py \
  --env app.harness.io/ng/account/<YOUR_ACCOUNT_ID>/ \
  --apikey YOUR_API_KEY \
  --start "2025-01-01 00:00" \
  --end "2025-01-31 23:59"
```

### Use environment variables

Set credentials as environment variables to keep tokens out of your shell history and process list. The script reads `HARNESS_API_KEY` for an API key and `HARNESS_BEARER` for a Bearer token.

```bash
# Set environment variable
export HARNESS_API_KEY="your_api_key_here"

# Run script without --apikey parameter
python3 get_inactive_users.py \
  --env app.harness.io/ng/account/<YOUR_ACCOUNT_ID>/ \
  --start "2025-01-01 00:00"
```

---

## Script parameters

Use these parameters to control the target account, the authentication method, and the reporting window.

| Parameter | Required | Description | Default | Example |
|-----------|----------|-------------|---------|---------|
| `--env` | Yes | Harness environment URL in the format `<domain>.harness.io/ng/account/<account_id>/` | None | `app.harness.io/ng/account/abc123/` |
| `--apikey` | No* | Harness API key for authentication | `HARNESS_API_KEY` env var | `pat.abc123.xyz...` |
| `--bearer` | No* | Bearer token for authentication | `HARNESS_BEARER` env var | `eyJhbGc...` |
| `--start` | No | Start date and time in `YYYY-MM-DD HH:MM` format | 30 days ago | `2025-01-01 00:00` |
| `--end` | No | End date and time in `YYYY-MM-DD HH:MM` format | Current time | `2025-01-31 23:59` |

\* One of `--apikey` or `--bearer` is required, or the corresponding environment variable.

---

## Interpret the output

Read the output files to decide which accounts to offboard and which to retain. The script writes all three NDJSON files to the current directory.

### active_users.ndjson

Contains audit log entries for users who logged in during the specified time period. Each line includes:

```json
{
  "authenticationInfo": {
    "labels": {
      "userId": "user123",
      "email": "user@example.com"
    }
  },
  "timestamp": 1706745600000,
  "action": "LOGIN"
}
```

### inactive_users.ndjson

Contains user records for users who exist in the account but did not log in during the specified time period. Each line includes:

```json
{
  "uuid": "user456",
  "email": "inactive@example.com",
  "name": "Inactive User",
  "disabled": false,
  "locked": false
}
```

### deleted_users.ndjson

Contains audit log entries for users who logged in during the specified time period but no longer exist in the account.

### Analyze the output

Process the NDJSON files with command-line tools when you need a quick count, or with Python when you need to feed the results into another system.

To count the records in each category, use `wc`:

```bash
# Count active users
wc -l active_users.ndjson

# Count inactive users
wc -l inactive_users.ndjson

# Count deleted users
wc -l deleted_users.ndjson
```

To extract email addresses, use `jq`:

```bash
# List active user emails
jq -r '.authenticationInfo.labels.email' active_users.ndjson

# List inactive user emails
jq -r '.email' inactive_users.ndjson
```

To process the records programmatically, read them in Python:

```python
import json

# Read and process active users
with open('active_users.ndjson', 'r') as f:
    active_users = [json.loads(line) for line in f]
    active_emails = [user['authenticationInfo']['labels']['email'] for user in active_users]
    print(f"Active users: {len(active_emails)}")
    print(active_emails)
```

For accounts with many users or extensive audit history, the script can take several minutes to complete. It paginates through the data, fetching up to 1000 audit log entries or 100 users per page, and prints progress as it runs.

---

## Complete script

Save the following as `get_inactive_users.py`.

<details>
<summary>get_inactive_users.py</summary>

```python
import argparse
import os
import getpass
import json
from datetime import datetime, timedelta
import requests
import time
import re

def validate_date(date_str):
    """Validate date format (YYYY-MM-DD HH:MM) and return parsed datetime."""
    try:
        return datetime.strptime(date_str.strip(), "%Y-%m-%d %H:%M")
    except ValueError:
        raise argparse.ArgumentTypeError(
            f"Invalid date format: '{date_str}'. Use YYYY-MM-DD HH:MM (e.g., 2025-08-25 14:30)."
        )

def validate_env_url(env_url):
    """Validate Harness environment URL format (e.g., qa.harness.io/ng/account/px7xd_BFRCi-pfWPYXVjvw/)."""
    pattern = r"^(https?://)?([a-zA-Z0-9-]+\.harness\.io)/ng/account/([a-zA-Z0-9_-]+)/?$"
    match = re.match(pattern, env_url.strip())
    if not match:
        raise argparse.ArgumentTypeError(
            f"Invalid environment URL: '{env_url}'. Expected format: <domain>.harness.io/ng/account/<account_id>/ (e.g., qa.harness.io/ng/account/px7xd_BFRCi-pfWPYXVjvw/)."
        )
    return match.group(2), match.group(3)  # Return domain and account_id

def to_epoch_ms(date_str: str) -> int:
    """Convert YYYY-MM-DD HH:MM string to epoch milliseconds."""
    dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M")
    return int(dt.timestamp() * 1000)

def stream_audits(account_id, headers, start_ms, end_ms, out, base_domain):
    """Stream audit logs page by page and save unique active users (NDJSON format)."""
    base_url = f"https://{base_domain}/gateway/audit/api/audits/list"
    params = {"routingId": account_id, "accountIdentifier": account_id, "pageSize": 1000}
    payload = {
        "scopes": [{"accountIdentifier": account_id}],
        "filterType": "Audit",
        "actions": ["LOGIN"],
        "startTime": start_ms,
        "endTime": end_ms,
    }

    pageIndex = 0
    userId = {}

    with open(out, "w", encoding="utf-8") as f:
        while True:
            params["pageIndex"] = pageIndex
            pageIndex += 1
            with requests.post(base_url, params=params, headers=headers, json=payload, verify=True) as resp:
                resp.raise_for_status()
                data = resp.json()["data"]
                totalPages = data["totalPages"]
                print(f"Processing page {pageIndex}/{totalPages}")

                for item in data["content"]:
                    uid = item["authenticationInfo"]["labels"]["userId"]
                    if userId.get(uid) is None:
                        userId[uid] = True
                        f.write(json.dumps(item, ensure_ascii=False) + "\n")

                if pageIndex >= totalPages:
                    break

    return userId

def get_all_inactive_users(account_id, headers, unique_users, out, base_domain):
    """Get all users and mark active ones, writing inactive users in NDJSON format."""
    base_url = f"https://{base_domain}/gateway/ng/api/user/batch"
    params = {"accountIdentifier": account_id, "pageIndex": 0, "pageSize": 100}
    headers_with_content_type = headers.copy()
    headers_with_content_type["content-type"] = "application/json"
    payload = {}

    with open(out, "w", encoding="utf-8") as f:
        page_index = 0
        while True:
            params["pageIndex"] = page_index
            page_index += 1
            with requests.post(base_url, params=params, headers=headers_with_content_type, json=payload, verify=True) as resp:
                resp.raise_for_status()
                response = resp.json()
                data = response["data"]
                totalPages = data["totalPages"]
                print(f"Processing page {page_index}/{totalPages}")

                for item in data["content"]:
                    uid = item["uuid"]
                    if uid in unique_users:
                        unique_users[uid] = False  # mark user as existing
                    else:
                        f.write(json.dumps(item, ensure_ascii=False) + "\n")

                if page_index >= totalPages:
                    break

def finalize_deleted_users(unique_users, active_file, deleted_file):
    """Stream active_users.ndjson and move deleted ones into deleted_users.ndjson."""
    tmp_file = active_file + ".tmp"

    with open(active_file, "r", encoding="utf-8") as f_in, \
         open(tmp_file, "w", encoding="utf-8") as f_out, \
         open(deleted_file, "w", encoding="utf-8") as f_del:

        for line in f_in:
            item = json.loads(line)
            uid = item["authenticationInfo"]["labels"]["userId"]

            if unique_users.get(uid, False):  # still True = deleted
                f_del.write(json.dumps(item, ensure_ascii=False) + "\n")
            else:
                f_out.write(json.dumps(item, ensure_ascii=False) + "\n")

    os.replace(tmp_file, active_file)
    print(f"✅ Finalized active/deleted users. Active={sum(1 for _ in open(active_file))}, Deleted={sum(1 for _ in open(deleted_file))}")

def parse_arguments():
    """Parse and validate command-line arguments."""
    parser = argparse.ArgumentParser(
        description="Access audit logs and user list to get active, inactive and deleted users for the account.",
        epilog="Example: python3 get_inactive_users.py --env qa.harness.io/ng/account/px7xd_BFRCi-pfWPYXVjvw/ --start '2025-08-01 00:00' --apikey abc123"
    )
    parser.add_argument(
        "--env",
        help="Harness environment URL (e.g., qa.harness.io/ng/account/px7xd_BFRCi-pfWPYXVjvw/). Required. The account ID is extracted from this URL.",
        required=True,
        type=validate_env_url
    )
    parser.add_argument(
        "--apikey",
        help="Harness API key (use x-api-key header). Provide either this or --bearer (If both are provided, --apikey will be used). Can also be set via HARNESS_API_KEY environment variable."
    )
    parser.add_argument(
        "--bearer",
        help="Bearer token (use Authorization header). Provide either this or --apikey (If both are provided, --apikey will be used). Can also be set via HARNESS_BEARER environment variable."
    )
    parser.add_argument(
        "--start",
        help="Start date and time for audit logs in YYYY-MM-DD HH:MM format (e.g., 2025-08-01 00:00). Defaults to 30 days prior to current time.",
        type=validate_date,
        default=(datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d %H:%M")
    )
    parser.add_argument(
        "--end",
        help="End date and time for audit logs in YYYY-MM-DD HH:MM format (e.g., 2025-08-25 23:59). Defaults to current time.",
        type=validate_date,
        default=datetime.now().strftime("%Y-%m-%d %H:%M")
    )

    args = parser.parse_args()

    # Extract domain and account_id from env URL
    base_domain, account_id = args.env

    # Validate that only one of API key or Bearer token is provided
    api_key = args.apikey or os.getenv("HARNESS_API_KEY")
    bearer = args.bearer or os.getenv("HARNESS_BEARER")

    if not api_key and not bearer:
        print("No authentication provided. Please choose one of the following:")
        choice = input("Use API key or Bearer token? [api/bearer]: ").strip().lower()
        if choice == "api":
            api_key = getpass.getpass("Enter API key: ").strip()
            if not api_key:
                parser.error("API key cannot be empty.")
        elif choice == "bearer":
            bearer = getpass.getpass("Enter Bearer token: ").strip()
            if not bearer:
                parser.error("Bearer token cannot be empty.")
        else:
            parser.error("Invalid choice. Please select 'api' or 'bearer'.")

    # Set headers based on authentication method
    headers = {}
    if api_key:
        headers["x-api-key"] = api_key.strip()
    elif bearer:
        headers["Authorization"] = "Bearer " + bearer.strip()

    # Convert dates to epoch milliseconds
    start_ms = to_epoch_ms(args.start.strftime("%Y-%m-%d %H:%M"))
    end_ms = to_epoch_ms(args.end.strftime("%Y-%m-%d %H:%M"))

    if start_ms > end_ms:
        parser.error(f"Start time ({args.start.strftime('%Y-%m-%d %H:%M')}) cannot be after end time ({args.end.strftime('%Y-%m-%d %H:%M')})")

    return {
        "account_id": account_id,
        "headers": headers,
        "start_ms": start_ms,
        "end_ms": end_ms,
        "base_domain": base_domain,
        "out_active_users": "active_users.ndjson",
        "out_inactive_users": "inactive_users.ndjson",
        "out_deleted_users": "deleted_users.ndjson"
    }

def main():
    try:
        config = parse_arguments()
        account_id = config["account_id"]
        headers = config["headers"]
        start_ms = config["start_ms"]
        end_ms = config["end_ms"]
        base_domain = config["base_domain"]
        out_active_users = config["out_active_users"]
        out_inactive_users = config["out_inactive_users"]
        out_deleted_users = config["out_deleted_users"]

        start_date = datetime.fromtimestamp(start_ms / 1000).strftime("%Y-%m-%d %H:%M")
        end_date = datetime.fromtimestamp(end_ms / 1000).strftime("%Y-%m-%d %H:%M")

        print(f"Fetching audit logs for account={account_id}, between {start_date} and {end_date}...")
        unique_users = stream_audits(account_id, headers, start_ms, end_ms, out_active_users, base_domain)
        print(f"✅ Saved active users to {out_active_users}")

        print(f"Fetching all users for account={account_id}...")
        get_all_inactive_users(account_id, headers, unique_users, out_inactive_users, base_domain)
        print(f"✅ Saved inactive users to {out_inactive_users}")

        print("Finalizing deleted users...")
        finalize_deleted_users(unique_users, out_active_users, out_deleted_users)
        print(f"✅ Saved deleted users to {out_deleted_users}")
    except Exception as e:
        print(f"Error: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main()
```

</details>

---

## Troubleshooting

Match the error the script prints to the corresponding fix.

<details>
<summary>401 Unauthorized</summary>

**Solution:** Verify that your API key or Bearer token is valid and has the necessary permissions to access audit logs. For more information, see <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a>.

</details>

<details>
<summary>403 Forbidden</summary>

**Solution:** Your API key or Bearer token does not have permission to view audit logs or user information. Confirm you have the necessary <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permissions</a> to access these resources.

</details>

<details>
<summary>Invalid date format</summary>

**Solution:** Ensure dates use the format `YYYY-MM-DD HH:MM`, for example `2025-01-01 00:00`.

</details>

<details>
<summary>429 Too Many Requests</summary>

**Solution:** The script exceeded the Harness API rate limits. Wait a few minutes and run it again. For more information, see <a href="/docs/platform/rate-limits" target="_blank">Rate limits</a>.

</details>

---

## Related articles

- <a href="/docs/platform/role-based-access-control/add-users" target="_blank">Manage users</a>: Add, edit, and delete users, and act on the inactive accounts this script identifies.
- <a href="/docs/platform/governance/audit-trail" target="_blank">Audit trail</a>: Review the audit events that this script queries.
- <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a>: Create the token the script uses to authenticate.
- <a href="/docs/platform/automation/api/api-quickstart" target="_blank">Harness API quickstart</a>: Understand how to authenticate and call Harness APIs.
