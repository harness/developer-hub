---
title: Get active and inactive users
description: Identify users who have logged into Harness over a specified time period.
sidebar_position: 70
helpdocs_topic_id:
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

You can identify which users have logged into your Harness account over a specific time period. This is useful for:

* **Compliance and auditing**: Track user access for security and regulatory requirements.
* **License management**: Identify active users to optimize license usage.
* **User lifecycle management**: Find inactive users who may need to be offboarded.

This guide provides a Python script that uses the [Harness Audit API](https://apidocs.harness.io/audit) to fetch user login activity and categorize users as active, inactive, or deleted.

## How it works

The script queries the Harness Audit API for `LOGIN` events within a specified date range and compares this data against all users in your account. It then generates three output files:

* **active_users.ndjson**: Users who logged in during the specified time period.
* **inactive_users.ndjson**: Users who exist in the account but did not log in during the specified time period.
* **deleted_users.ndjson**: Users who logged in during the specified time period but no longer exist in the account.

The output files use [NDJSON format](http://ndjson.org/) (newline-delimited JSON), where each line is a valid JSON object representing a user record.

## Prerequisites

Before using the script, ensure you have:

* **Python 3.x** installed on your system.
* **Python requests library**: Install using `pip install requests`.
* A **token** with appropriate permissions. For more information, go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys).
* **Permission to view audit logs** in your Harness account.
* Your **Harness account ID**. You can find this in any Harness URL (e.g., `https://app.harness.io/ng/account/<ACCOUNT_ID>/...`).

## Usage

### Basic usage

Run the script with your environment URL and authentication credentials:

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

By default, the script analyzes the last 30 days of login activity.

### Specify custom date range

To analyze a specific time period, use the `--start` and `--end` parameters:

```bash
python3 get_inactive_users.py \
  --env app.harness.io/ng/account/<YOUR_ACCOUNT_ID>/ \
  --apikey YOUR_API_KEY \
  --start "2025-01-01 00:00" \
  --end "2025-01-31 23:59"
```

### Use environment variables

You can set authentication credentials as environment variables:

```bash
# Set environment variable
export HARNESS_API_KEY="your_api_key_here"

# Run script without --apikey parameter
python3 get_inactive_users.py \
  --env app.harness.io/ng/account/<YOUR_ACCOUNT_ID>/ \
  --start "2025-01-01 00:00"
```

Supported environment variables:
* `HARNESS_API_KEY`: Your Harness API key
* `HARNESS_BEARER`: Your Bearer token

## Script parameters

| Parameter | Required | Description | Default | Example |
|-----------|----------|-------------|---------|---------|
| `--env` | Yes | Harness environment URL in the format `<domain>.harness.io/ng/account/<account_id>/` | None | `app.harness.io/ng/account/abc123/` |
| `--apikey` | No* | Harness API key for authentication | `HARNESS_API_KEY` env var | `pat.abc123.xyz...` |
| `--bearer` | No* | Bearer token for authentication | `HARNESS_BEARER` env var | `eyJhbGc...` |
| `--start` | No | Start date and time in `YYYY-MM-DD HH:MM` format | 30 days ago | `2025-01-01 00:00` |
| `--end` | No | End date and time in `YYYY-MM-DD HH:MM` format | Current time | `2025-01-31 23:59` |

\* One of `--apikey` or `--bearer` is required (or their corresponding environment variables).

## Understanding the output

The script generates three NDJSON files in the current directory:

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

Contains audit log entries for users who logged in during the specified time period but no longer exist in the account (deleted users).

### Analyzing the output

You can process the NDJSON files using command-line tools or Python:

#### Count users using wc

```bash
# Count active users
wc -l active_users.ndjson

# Count inactive users
wc -l inactive_users.ndjson

# Count deleted users
wc -l deleted_users.ndjson
```

#### Extract emails using jq

```bash
# List active user emails
jq -r '.authenticationInfo.labels.email' active_users.ndjson

# List inactive user emails
jq -r '.email' inactive_users.ndjson
```

#### Process with Python

```python
import json

# Read and process active users
with open('active_users.ndjson', 'r') as f:
    active_users = [json.loads(line) for line in f]
    active_emails = [user['authenticationInfo']['labels']['email'] for user in active_users]
    print(f"Active users: {len(active_emails)}")
    print(active_emails)
```

## Complete script

Save the following script as `get_inactive_users.py`:

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

## Troubleshooting

### Authentication errors

**Error**: `401 Unauthorized`

**Solution**: Verify that your API key or Bearer token is valid and has the necessary permissions to access audit logs. For more information, go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys).

### Invalid date format

**Error**: `Invalid date format`

**Solution**: Ensure dates are in the format `YYYY-MM-DD HH:MM`. For example: `2025-01-01 00:00`.

### Rate limiting

**Error**: `429 Too Many Requests`

**Solution**: The script has exceeded the Harness API rate limits. Wait a few minutes and try again. For more information about rate limits, go to [Rate limits](/docs/platform/rate-limits).

### Permission errors

**Error**: `403 Forbidden`

**Solution**: Your API key or Bearer token does not have permission to view audit logs or user information. Ensure you have the necessary [permissions](./permissions-reference.md) to access these resources.

### Large datasets

**Note**: For accounts with many users or extensive audit history, the script may take several minutes to complete. The script processes data in pages and displays progress as it runs.

:::info

The script uses pagination to efficiently handle large datasets. Each API call fetches up to 1000 audit log entries or 100 users per page.

:::

## Related documentation

* [Manage users](./add-users.md)
* [Get started with Harness API](/docs/platform/automation/api/api-quickstart)
* [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys)
* [RBAC in Harness](./rbac-in-harness.md)
* [Permissions reference](./permissions-reference.md)
