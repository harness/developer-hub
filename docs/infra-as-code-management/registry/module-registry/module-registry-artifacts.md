---
title: Module Artifacts
description: Understand how Harness IaCM packages module versions as artifacts, how workspace executions use them without Git credentials, and how to keep versions in sync.
sidebar_position: 60
sidebar_label: Module Artifacts
keywords:
  - IaCM
  - Module Registry
  - artifact storage
  - OpenTofu modules
  - Terraform modules
  - automatic version syncing
  - auto-sync
  - onboarding pipeline
tags:
  - IaCM
  - registry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

:::info Beta
Module Artifacts, auto-sync, and org/project-scoped modules are in beta. Contact [Harness Support](mailto:support@harness.io) to enable these features.
:::

When you register a module and the onboarding pipeline runs for the first time, Harness packages each tagged version of your module as a **ZIP artifact** and stores it on the IaCM server. Workspace executions that reference your module fetch the artifact directly. No Git credentials are needed at runtime.

This page explains what gets stored, how workspace executions use artifacts, how to keep versions current with auto-sync and manual sync, and how to migrate existing modules that were registered before artifact storage was available.

<!-- SCREENSHOT: Module detail page showing a module with Artifact storage type badge, the version list, and the last-synced timestamp. -->

---

## What gets stored

Each time the onboarding pipeline runs, it processes every Git tag that matches your configured tag pattern and stores the following per version:

- **Metadata:** Inputs, outputs, dependencies, resources, and submodule information parsed from your module's files.
- **README:** The contents of your `README.md`, rendered on the Readme tab.
- **ZIP artifact:** A compressed archive of the repository at that tag, stored in object storage. This is what workspace executions download at runtime.

The onboarding pipeline runs in the `plugins/harness_terraform` container image, the same image used by other IaCM steps. It clones the repository, reads all matching tags, and publishes the results to the IaCM server.

:::info Git reference modules
If you registered your module with **Git reference** storage (the legacy default), only metadata and README are stored. No ZIP artifact is created. Workspace executions for those modules still clone from Git at runtime, which requires Git credentials to be available in the workspace. Go to [Migrate existing modules](#migrate-existing-modules-to-artifact-storage) to move them to artifact storage.
:::

---

## How workspace executions use artifacts

When a workspace runs a pipeline that references an artifact-stored module, Harness:

1. Looks up the requested module version in the registry.
2. Fetches the ZIP artifact from object storage.
3. Passes the unpacked archive to the plugin, which uses it as the module source.

Because the ZIP is served from Harness-managed storage, **no Git credentials are needed at workspace runtime**. The onboarding pipeline handles all Git access at onboard time.

<!-- SCREENSHOT: Workspace pipeline execution log showing the module being fetched from artifact storage (not from Git), with no credential injection step. -->

This resolves the credential management problem from the original Git reference flow, where Harness injected Git credentials from every module in the account into every workspace execution.

---

## Sync module versions

Versions appear in the registry only after the onboarding pipeline runs. Two mechanisms keep the version list current.

### Auto-sync

When you enable **auto-sync** during registration, Harness creates a webhook trigger on the onboarding pipeline. Whenever a new Git tag that matches your tag pattern is pushed to the module repository, the trigger fires and the new version is available in the registry automatically, with no manual action required.

Go to [Register a Module](/docs/infra-as-code-management/registry/module-registry) to configure auto-sync during the registration wizard. You can also enable or disable it from the module detail page after registration.

<!-- SCREENSHOT: Module detail page showing the auto-sync status indicator (enabled/disabled) and the webhook trigger link. -->

### Manual sync

If auto-sync is disabled, or if a sync fails and you need to re-run it, select the **Sync** button on the module detail page. This triggers the onboarding pipeline on demand and picks up any new tags since the last run.

<!-- SCREENSHOT: Module detail page header with the Sync button highlighted. -->

---

## Troubleshooting

<Troubleshoot
  issue="Module versions are not appearing after the onboarding pipeline runs in Harness IaCM"
  mode="general"
  fallback="Confirm that the repository has at least one Git tag matching the configured tag pattern. The onboarding step only processes tagged versions; branches are not synced. Check the pipeline execution logs for errors."
/>

<Troubleshoot
  issue="Auto-sync does not trigger when a new Git tag is pushed in Harness IaCM"
  mode="general"
  fallback="Confirm that Enable auto-sync is selected on the module detail page and that the webhook trigger is active. Navigate to the pipeline's Triggers tab to verify the trigger status. If the trigger shows Failed, verify that the Git connector has webhook registration permissions on the repository, then delete the failed trigger and re-enable auto-sync to create a new one."
/>

<Troubleshoot
  issue="Workspace execution fails to fetch a module artifact in Harness IaCM"
  mode="general"
  fallback="Confirm that the module version was successfully onboarded by checking whether the version appears in the module registry with a completed sync. If the version is missing, trigger a manual sync. If the version is present but the workspace still fails, check the pipeline execution logs for storage fetch errors and contact Harness Support."
/>

---

## Migrate existing modules to artifact storage {#migrate-existing-modules-to-artifact-storage}

If you have modules that were registered before artifact storage was available (using the Git reference flow), use the `migrate-onboarding-pipeline.sh` script to bulk-assign an onboarding pipeline to them. Once the pipeline runs, those modules transition to artifact storage.

:::warning Validate in the UI first
Before running this script, manually onboard one module through the Harness UI. Register a test module, configure its onboarding pipeline (choosing the Org and Project), and verify the pipeline execution completes successfully. This confirms the pipeline is correctly set up and gives you the correct Org and Project values for the script.
:::

### Prerequisites

- **bash** (macOS or Linux), **curl**, and **jq** installed (`brew install jq` on macOS).
- **Harness API key** (Personal Access Token) with module registry edit permissions.
- **Account ID** for the target Harness account.
- **Org and Project** where the onboarding pipeline lives or will be created.

### Script options

| Option | Required | Description |
|--------|----------|-------------|
| `--base-url` | Yes | Base URL of the IaCM server (for example, `https://app.harness.io/gateway/iacm`). |
| `--api-key` | Yes | Harness Personal Access Token (PAT). |
| `--account` | Yes | Harness account identifier. |
| `--pipeline-org` | Yes | Org where the onboarding pipeline lives. |
| `--pipeline-project` | Yes | Project where the onboarding pipeline lives. |
| `--pipeline-id` | No | Pipeline identifier. Defaults to `iacm_auto_generated_onboarding_pipeline`. |
| `--autosync` | No | Enable auto-sync (`true` or `false`). Default: `true`. |
| `--all` | One of `--all` or `--module-ids` required | Target all modules without an onboarding pipeline. |
| `--module-ids` | One of `--all` or `--module-ids` required | Comma-separated list of specific module IDs to update (for example, `12,34,56`). |
| `--limit` | No | Max number of modules to update (only applies with `--all`). |
| `--dry-run` | No | Preview which modules would be updated without making changes. |

:::info Mutually exclusive targeting
`--all` and `--module-ids` cannot be used together. Use `--all` for bulk migration or `--module-ids` to target specific modules.
:::

### Run the migration

Follow the steps below in order. Do not skip the dry run or verification steps.

#### Step 1: Preview changes with a dry run

Always start with a dry run to see which modules the script would update:

```bash
./migrate-onboarding-pipeline.sh \
  --base-url https://app.harness.io/gateway/iacm \
  --account <ACCOUNT_ID> \
  --api-key <API_KEY> \
  --pipeline-org <ORG> \
  --pipeline-project <PROJECT> \
  --all \
  --dry-run
```

Review the listed modules and total count.

#### Step 2: Start with a small batch

Do not migrate all modules at once. Start with 5 to 10 modules to verify everything works:

<Tabs>
<TabItem value="limit" label="Using --limit" default>

```bash
./migrate-onboarding-pipeline.sh \
  --base-url https://app.harness.io/gateway/iacm \
  --account <ACCOUNT_ID> \
  --api-key <API_KEY> \
  --pipeline-org <ORG> \
  --pipeline-project <PROJECT> \
  --all \
  --limit 5
```

</TabItem>
<TabItem value="ids" label="Using --module-ids">

```bash
./migrate-onboarding-pipeline.sh \
  --base-url https://app.harness.io/gateway/iacm \
  --account <ACCOUNT_ID> \
  --api-key <API_KEY> \
  --pipeline-org <ORG> \
  --pipeline-project <PROJECT> \
  --module-ids 101,102,103
```

</TabItem>
</Tabs>

#### Step 3: Verify pipeline executions

After each batch, verify the onboarding pipeline executions before proceeding:

1. In the Harness UI, navigate to **Pipelines**, then select **Executions** in the Org and Project where the onboarding pipeline lives.
2. Confirm that the onboarding pipeline was triggered for each updated module.
3. Verify every execution completed successfully (green status on all stages).
4. Spot-check a few modules in the Module Registry to confirm versions synced and artifacts were stored.

:::warning Do not proceed until verified
Do not run the next batch until all executions from the current batch succeed. If any executions fail, investigate the cause before continuing. Retry failed modules individually using `--module-ids`.
:::

#### Step 4: Increase batch size

Once you are confident the migration is working, increase the batch size gradually (for example, 5, then 25, then 50, then 100). Continue verifying pipeline executions after each run. The script automatically skips modules that already have an onboarding pipeline assigned, so re-running with `--all` is safe.

#### Step 5: Migrate all remaining modules

When you are confident everything is working, run without `--limit` to migrate all remaining modules, then check all pipeline executions one final time.

```bash
./migrate-onboarding-pipeline.sh \
  --base-url https://app.harness.io/gateway/iacm \
  --account <ACCOUNT_ID> \
  --api-key <API_KEY> \
  --pipeline-org <ORG> \
  --pipeline-project <PROJECT> \
  --all
```

### What the script does

For each module being updated, the script:

1. Fetches modules from the account by specific IDs (`--module-ids`) or all modules (`--all`).
2. Filters modules that do not have an existing onboarding pipeline (when using `--all`). The `--limit` option caps the number processed.
3. Ensures the onboarding pipeline exists by calling the create endpoint (a no-op if the pipeline already exists).
4. Updates each module with the pipeline identifier, org, project, and auto-sync flag.
5. Reports success and failure counts and lists any failed modules.

### Migration troubleshooting

| Issue | Solution |
|-------|----------|
| `HTTP 401` error | Verify your `--api-key` and `--account` values are not swapped. The account is the short ID; the API key is the long PAT token. |
| `HTTP 403` error | Ensure your API key has module registry edit permissions. |
| Module ID not found | Double-check the module ID exists in the account. Use `--dry-run` with `--all` to list available modules. |
| Pipeline creation fails | Verify the Org and Project exist and that you have pipeline creation permissions in them. |
| Some modules fail to update | Check the error message in the output. Re-run the script with the failed `--module-ids` to retry. |
| Auto-sync does not trigger after migration | Confirm the webhook trigger was created on the onboarding pipeline. Navigate to the pipeline's **Triggers** tab and verify the trigger is active. |

### Safety notes

- **`--dry-run` first.** Always preview before making changes.
- **Small batches.** Catch issues early before they affect many modules.
- **Verify after every run.** Check the Harness UI to confirm all executions succeeded before the next batch.
- **Re-running is safe.** The script skips already-onboarded modules when using `--all`.
- **Existing data is preserved.** The script only adds onboarding pipeline fields; all other module properties remain unchanged.
- **Connector scope:** If your modules use a Git connector scoped to a specific Org and Project, the onboarding pipeline must be in that same Org and Project, so `--pipeline-org` and `--pipeline-project` must match the connector scope.

<details>
<summary>migrate-onboarding-pipeline.sh</summary>

```bash
#!/usr/bin/env bash
#
# migrate-onboarding-pipeline.sh
#
# Migrates existing modules to use an onboarding pipeline.
# For modules that don't have an onboarding pipeline specified,
# this script will set the pipeline configuration.
#
# Usage:
#   ./migrate-onboarding-pipeline.sh \
#     --base-url https://app.harness.io/gateway/iacm \
#     --api-key <HARNESS_API_KEY> \
#     --account <ACCOUNT_ID> \
#     --pipeline-org <ORG> \
#     --pipeline-project <PROJECT> \
#     [--pipeline-id <PIPELINE_ID>] \
#     [--autosync true|false] \
#     [--dry-run] \
#     --all | --module-ids <ID1,ID2,...>

set -euo pipefail

DEFAULT_PIPELINE_ID="iacm_auto_generated_onboarding_pipeline"
PAGE_SIZE=100
AUTOSYNC="true"
DRY_RUN=false
PIPELINE_ID=""
MODULE_IDS=""
SELECT_ALL=false
MAX_LIMIT=0

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base-url)         BASE_URL="$2"; shift 2 ;;
    --api-key)          API_KEY="$2"; shift 2 ;;
    --account)          ACCOUNT="$2"; shift 2 ;;
    --pipeline-org)     PIPELINE_ORG="$2"; shift 2 ;;
    --pipeline-project) PIPELINE_PROJECT="$2"; shift 2 ;;
    --pipeline-id)      PIPELINE_ID="$2"; shift 2 ;;
    --autosync)         AUTOSYNC="$2"; shift 2 ;;
    --module-ids)       MODULE_IDS="$2"; shift 2 ;;
    --all)              SELECT_ALL=true; shift ;;
    --limit)            MAX_LIMIT="$2"; shift 2 ;;
    --dry-run)          DRY_RUN=true; shift ;;
    -h|--help)          head -40 "$0" | tail -35; exit 0 ;;
    *)                  echo -e "${RED}Unknown option: $1${NC}" >&2; exit 1 ;;
  esac
done

missing=()
[[ -z "${BASE_URL:-}" ]]         && missing+=("--base-url")
[[ -z "${API_KEY:-}" ]]          && missing+=("--api-key")
[[ -z "${ACCOUNT:-}" ]]          && missing+=("--account")
[[ -z "${PIPELINE_ORG:-}" ]]     && missing+=("--pipeline-org")
[[ -z "${PIPELINE_PROJECT:-}" ]] && missing+=("--pipeline-project")

if [[ ${#missing[@]} -gt 0 ]]; then
  echo -e "${RED}Error: Missing required arguments: ${missing[*]}${NC}" >&2; exit 1
fi
if [[ "$SELECT_ALL" == false ]] && [[ -z "$MODULE_IDS" ]]; then
  echo -e "${RED}Error: Specify --all or --module-ids${NC}" >&2; exit 1
fi
if [[ "$SELECT_ALL" == true ]] && [[ -n "$MODULE_IDS" ]]; then
  echo -e "${RED}Error: --all and --module-ids are mutually exclusive.${NC}" >&2; exit 1
fi

for cmd in curl jq; do
  if ! command -v "$cmd" &> /dev/null; then
    echo -e "${RED}Error: '$cmd' is required but not installed.${NC}" >&2; exit 1
  fi
done

[[ -z "$PIPELINE_ID" ]] && PIPELINE_ID="$DEFAULT_PIPELINE_ID"
[[ "$AUTOSYNC" == "true" ]] && AUTOSYNC_JSON=true || AUTOSYNC_JSON=false
BASE_URL="${BASE_URL%/}"

api_call() {
  local method="$1" url="$2" data="${3:-}" extra_args=()
  [[ -n "$data" ]] && extra_args+=(-d "$data")
  curl -s -w "\n%{http_code}" -X "$method" \
    -H "Content-Type: application/json" \
    -H "Harness-Account: ${ACCOUNT}" \
    -H "x-api-key: ${API_KEY}" \
    ${extra_args[@]+"${extra_args[@]}"} "$url"
}

api_call_with_headers() {
  local method="$1" url="$2" header_file="$3" data="${4:-}" extra_args=()
  [[ -n "$data" ]] && extra_args+=(-d "$data")
  curl -s -w "\n%{http_code}" -X "$method" -D "$header_file" \
    -H "Content-Type: application/json" \
    -H "Harness-Account: ${ACCOUNT}" \
    -H "x-api-key: ${API_KEY}" \
    ${extra_args[@]+"${extra_args[@]}"} "$url"
}

echo -e "${CYAN}Module Onboarding Pipeline Migration${NC}"
echo -e "  Account: ${YELLOW}${ACCOUNT}${NC} | Org: ${YELLOW}${PIPELINE_ORG}${NC} | Project: ${YELLOW}${PIPELINE_PROJECT}${NC}"
[[ "$DRY_RUN" == true ]] && echo -e "  Mode: ${YELLOW}DRY RUN${NC}"
echo ""

if [[ -n "$MODULE_IDS" ]]; then
  MODULES_TO_UPDATE="[]"
  IFS=',' read -ra requested_ids <<< "$MODULE_IDS"
  for rid in "${requested_ids[@]}"; do
    rid=$(echo "$rid" | xargs)
    response=$(api_call "GET" "${BASE_URL}/api/modules/${rid}")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    [[ "$http_code" == "200" ]] && MODULES_TO_UPDATE=$(echo "$MODULES_TO_UPDATE" | jq --argjson mod "$body" '. + [$mod]')
  done
else
  ALL_MODULES="[]"; page=1; total_fetched=0
  while true; do
    header_file=$(mktemp)
    response=$(api_call_with_headers "GET" "${BASE_URL}/api/modules?limit=${PAGE_SIZE}&page=${page}" "$header_file")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    [[ "$http_code" != "200" ]] && { echo -e "${RED}Error: HTTP ${http_code}${NC}" >&2; rm -f "$header_file"; exit 1; }
    total_pages=$(grep -i "X-Total-Pages" "$header_file" | tr -d '\r' | awk '{print $2}')
    rm -f "$header_file"
    page_count=$(echo "$body" | jq 'length')
    [[ "$page_count" == "0" || "$page_count" == "null" ]] && break
    ALL_MODULES=$(echo "$ALL_MODULES" "$body" | jq -s '.[0] + .[1]')
    total_fetched=$((total_fetched + page_count))
    [[ -n "$total_pages" && "$page" -ge "$total_pages" ]] && break
    page=$((page + 1))
  done
  total_modules=$(echo "$ALL_MODULES" | jq 'length')
  MODULES_TO_UPDATE=$(echo "$ALL_MODULES" | jq '[.[] | select(
    (.onboarding_pipeline == null or .onboarding_pipeline == "") and
    (.onboarding_pipeline_org == null or .onboarding_pipeline_org == "") and
    (.onboarding_pipeline_project == null or .onboarding_pipeline_project == "")
  )]')
  [[ "$MAX_LIMIT" -gt 0 ]] && MODULES_TO_UPDATE=$(echo "$MODULES_TO_UPDATE" | jq --argjson limit "$MAX_LIMIT" '.[:$limit]')
fi

update_count=$(echo "$MODULES_TO_UPDATE" | jq 'length')
echo -e "  Modules to update: ${YELLOW}${update_count}${NC}"
[[ "$update_count" -eq 0 ]] && { echo -e "${GREEN}Nothing to do.${NC}"; exit 0; }

echo "$MODULES_TO_UPDATE" | jq -r '.[] | "  - [\(.id)] \(.name)"'
[[ "$DRY_RUN" == true ]] && { echo -e "${YELLOW}DRY RUN: No changes made.${NC}"; exit 0; }

# Ensure pipeline exists
pipeline_body=$(jq -n --arg org "$PIPELINE_ORG" --arg project "$PIPELINE_PROJECT" '{org: $org, project: $project}')
response=$(api_call "POST" "${BASE_URL}/api/modules/pipeline/onboarding" "$pipeline_body")
http_code=$(echo "$response" | tail -n1)
[[ "$http_code" == "200" || "$http_code" == "201" || "$http_code" == "204" || "$http_code" == "409" ]] \
  && echo -e "${GREEN}Pipeline ready.${NC}" \
  || echo -e "${YELLOW}Warning: pipeline creation returned HTTP ${http_code}${NC}"

success_count=0; fail_count=0; failed_modules=()

for i in $(seq 0 $((update_count - 1))); do
  module=$(echo "$MODULES_TO_UPDATE" | jq ".[$i]")
  mod_id=$(echo "$module" | jq -r '.id')
  mod_name=$(echo "$module" | jq -r '.name')
  echo -ne "[$((i+1))/${update_count}] Updating ${mod_name}... "

  update_body=$(echo "$module" | jq \
    --arg pid "$PIPELINE_ID" --arg porg "$PIPELINE_ORG" \
    --arg pproject "$PIPELINE_PROJECT" --argjson autosync "$AUTOSYNC_JSON" \
    '{name:.name,system:.system,onboarding_pipeline:$pid,
      onboarding_pipeline_org:$porg,onboarding_pipeline_project:$pproject,
      onboarding_pipeline_sync:$autosync}
    + (if .description then {description:.description} else {} end)
    + (if .repository then {repository:.repository} else {} end)
    + (if .repository_branch then {repository_branch:.repository_branch} else {} end)
    + (if .repository_connector then {repository_connector:.repository_connector} else {} end)
    + (if .repository_path then {repository_path:.repository_path} else {} end)
    + (if .storage_type then {storage_type:.storage_type} else {} end)
    + (if .tags then {tags:.tags} else {} end)
    + (if .org then {org:.org} else {} end)
    + (if .project then {project:.project} else {} end)')

  response=$(api_call "PUT" "${BASE_URL}/api/modules/${mod_id}" "$update_body")
  http_code=$(echo "$response" | tail -n1)
  if [[ "$http_code" == "200" || "$http_code" == "204" ]]; then
    echo -e "${GREEN}OK${NC}"; success_count=$((success_count + 1))
  else
    echo -e "${RED}FAILED (HTTP ${http_code})${NC}"
    fail_count=$((fail_count + 1)); failed_modules+=("${mod_id}:${mod_name}")
  fi
done

echo ""
echo -e "${CYAN}Done — Successful: ${GREEN}${success_count}${NC} | Failed: ${RED}${fail_count}${NC}"
[[ ${#failed_modules[@]} -gt 0 ]] && printf '  - %s\n' "${failed_modules[@]}"
```

</details>

---

## Next steps

- Go to [Explore Module Details](/docs/infra-as-code-management/registry/module-registry/registered-module-settings) to review the parsed metadata tabs that the onboarding pipeline populates.
- Go to [Use a Module](/docs/infra-as-code-management/registry/module-registry/registered-module-settings#use-a-module) to reference an artifact-stored module from your OpenTofu or Terraform configuration.
- Go to [Test a Module](/docs/infra-as-code-management/registry/module-registry/module-registry-testing) to set up automated testing for new versions.
