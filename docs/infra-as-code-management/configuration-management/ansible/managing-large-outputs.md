---
title: Managing large Ansible outputs
sidebar_label: Managing Large Outputs
description: Understand how the Ansible plugin manages large playbook outputs through truncation and file export.
keywords:
  - ansible
  - output management
  - truncation
  - payload size
  - telemetry
tags:
  - Configuration Management
  - Ansible
---

import { FAQ } from '@site/src/components/AdaptiveAIContent';
import BrowserOnly from '@docusaurus/BrowserOnly';

The Ansible plugin automatically manages large playbook outputs through truncation and file export options. This ensures reliable telemetry while preserving access to full execution details.

---

## View Ansible output

Ansible execution results are available in multiple locations:

- **Pipeline Run:** Execution logs and summary statistics
- **Playbook/Inventory Activity History:** Historical execution data
- **Host View:** Per-host task results and status
- **Custom Export:** Full output to file. Go to [Export full output to file](#export-full-output-to-file) to configure file-based output.
- **Output Variables:** Export data for use in subsequent pipeline steps. Go to [Output variables for Ansible](/docs/infra-as-code-management/configuration-management/ansible/output-variables-for-ansible) to configure output variables.

---

## Automatic truncation

The Ansible plugin applies two levels of truncation to manage output size.

### Message truncation (per-task)

**Applies to:** Individual task `msg` and `skip_reason` fields exceeding 1000 characters

**Action:** Truncates to 1000 characters with `" ... [truncated]"` suffix

**Configuration:**

```bash
ANSIBLE_MAX_TASK_MSG_SIZE=1000  # Default: 1000 characters
```

**Example:**

```json
{
  "name": "Install packages",
  "status": "ok",
  "msg": "Long command output... [truncated]",
  "duration_ms": 5432
}
```

---

### Circuit breaker (payload size limit)

**Trigger:** Final JSON payload exceeds 5 MB

**Behavior:**

- Removes all `tasks` arrays from host results
- Preserves host-level stats (changed, failures, ok, rescued, skipped, unreachable)
- Preserves metadata (playbook, inventory, status, duration)

**Example output:**

```
⚠️  WARNING: Ansible payload exceeds maximum size limit:
    Payload size: 5.5 MB
    Limit: 5 MB
    Hosts: 100
    Sending summary-only payload to server for telemetry.

Summary payload size: 12.57 KB (original: 5.47 MB)
```

**What's preserved:**

```json
{
  "playbook": "deploy-app",
  "inventory": "prod-inventory",
  "status": "success",
  "duration_ms": 45320,
  "hosts": {
    "web-01": {
      "address": "10.0.1.5",
      "stats": {
        "ok": 150,
        "changed": 20,
        "failures": 0,
        "skipped": 5
      }
    }
  }
}
```

---

## Export full output to file

When truncation occurs, detailed task information is removed from telemetry. Export full output to a file for debugging complex failures, compliance and audit requirements, or long-term archival.

### Configure file export

Set the `ANSIBLE_OUTPUT_FILE` environment variable to specify the output file path:

```bash
ANSIBLE_OUTPUT_FILE=ansible-output.json
```

### File export behavior

1. Writes complete structured output before any truncation
2. Includes all hosts, tasks, and messages in full
3. Pretty-printed JSON format
4. Truncation still applies to telemetry payload

### Example output

```
Writing full output to file: ansible-output.json
📝 Full ansible output written to: /harness/ansible-output.json (8.42 MB)
   Inventory: prod-inventory | Playbook: deploy-app
```

---

## Upload output to object storage

When `ANSIBLE_OUTPUT_FILE` is configured, the output file can be uploaded to cloud storage (S3, GCS, Azure Blob) as a subsequent pipeline step.

Go to [Upload and download artifacts](/docs/category/uploaddownload-artifacts) to review configuration options for uploading artifacts to object storage.

---

## Log output examples

**No truncation:**

```
Payload size: 2.34 MB (limit: 5 MB)
```

**With truncation:**

```
⚠️  WARNING: Ansible payload exceeds maximum size limit:
    Payload size: 25.8 MB
    Limit: 5 MB
    Hosts: 200
    Sending summary-only payload to server for telemetry.

Summary payload size: 82.45 KB (original: 25.80 MB)
```

---

## Configuration reference

| Variable | Default | Description |
|----------|---------|-------------|
| `ANSIBLE_MAX_TASK_MSG_SIZE` | 1000 | Maximum characters for task message fields |
| `ANSIBLE_OUTPUT_FILE` | (unset) | Path to write full output before truncation |

---

## FAQ

<BrowserOnly>
{() => (
<>
<FAQ
  question="Why is my task output truncated?"
  mode="fallback-only"
  fallback="Individual task messages exceeding 1KB are automatically truncated. Set the ANSIBLE_OUTPUT_FILE environment variable to preserve full output to a file."
/>

<FAQ
  question="Why don't I see task details in the UI?"
  mode="fallback-only"
  fallback="When payload exceeds 5MB, task arrays are removed and only host-level stats are sent. Set the ANSIBLE_OUTPUT_FILE environment variable to capture full details to a file."
/>

<FAQ
  question="Can I increase the 5MB limit?"
  mode="fallback-only"
  fallback="The 5MB limit is fixed to ensure system stability. Use ANSIBLE_OUTPUT_FILE to capture full output to a file instead."
/>

<FAQ
  question="Does truncation affect billing?"
  mode="fallback-only"
  fallback="No. Host-level stats are always preserved and used for usage tracking."
/>

<FAQ
  question="Where should I store the output file?"
  mode="fallback-only"
  fallback="The /harness/ directory is recommended. The file persists within the step execution and can be uploaded to object storage in a subsequent pipeline step."
/>
</>
)}
</BrowserOnly>
