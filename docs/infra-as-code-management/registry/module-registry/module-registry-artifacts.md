---
title: Module Artifacts
description: How to create a module in the Harness IaCM Module Registry, choose Artifact or Git reference storage, connect an onboarding pipeline, and use auto-sync.
sidebar_position: 20
keywords:
- IaCM
- Module Registry
- artifact storage
- artifact registry
- OpenTofu modules
- Terraform modules
- git reference storage
- automatic version syncing
- auto-sync
- onboarding pipeline
tags:
- IaCM
- registry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<CTABanner
buttonText="Learn more"
title="Coming soon!"
tagline="Module Registry Artifacts is currently pending release and will be available soon!"
link="/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts"
closable={true}
target="_blank"
/>

:::warning Pending release
Module Registry Artifacts is currently **pending release** and will be available soon!
:::

The Harness IaCM Module Registry lets you store and version OpenTofu or Terraform modules centrally. You choose how each module is stored—**Artifact** (ZIP on the IaCM server, no Git credentials at workspace runtime) or **Git reference** (metadata resolved from Git on use, as in the original flow). **Module onboarding** (the execution pipeline you attach in the wizard) and **auto-sync** (webhook-driven runs when new tags appear) work the same way for **either** storage type; only the pipeline’s packaging step differs when you use Artifact storage.

:::info Document scope and availability
The wizard steps below (storage choice, onboarding pipeline, auto-sync) apply **whether you select Artifact or Git reference**. This page describes the newer registry experience, which is **not yet enabled for all accounts**. Until it is generally available, use [Register a module](/docs/infra-as-code-management/registry/module-registry) for the flow that all customers can follow today.
:::

### What will you learn?

- **Module setup:** Module name, provider, Git connector, repository, **storage type (Artifact or Git reference)**, and optional tag pattern.
- **Module onboarding:** How to connect an onboarding pipeline and complete the first sync so versions appear in the registry.
- **Auto-sync:** How to keep new tags onboarded automatically via a webhook trigger (optional).

## Prerequisites

- **Harness account with IaCM enabled:** Ensure **Infrastructure as Code Management** is available under **Infrastructure**. For how to access or create a Harness account, see [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide).

    :::info Contact Harness support:

    If IaCM does not appear, see [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Git repository:** A repository containing your OpenTofu or Terraform module, accessible via a configured Harness connector.
- **Pipeline permissions:** Permission to create and run pipelines in the target Harness project. You need **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these permissions, an administrator must assign you a role that includes them (for example, Project Admin or a custom role). See [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles).

## Configure module details

The following steps configure the module name, provider, connector, repository, storage type, and tag pattern in the first part of the **New Module** wizard.

### Step 1: Navigate to the Module Registry

1. In the Harness left navigation, select **Infrastructure as Code Management**.
2. Select **Module Registry**.
3. Select **New Module**.

### Step 2: Configure module details

1. Enter a **Module Name**. This is the identifier used when referencing the module in OpenTofu or Terraform.
2. Enter the **Module Provider** (for example, aws, gcp, or azurerm).
3. Select the **Git Connector** that has access to your module repository.
4. Select the **Repository** from the dropdown. Available repositories are populated based on the selected connector.
5. Optionally, enter a **Folder Path** if your module is not at the root of the repository.
6. Select the **Git Fetch Type** (defaults to Latest from Branch).
7. Select or enter the **Repository Branch**.

### Step 3: Choose storage type (Artifact or Git reference)

1. Expand the **Advanced** section.
2. Under **Storage Type**, select **Artifact** or **Git reference**.

:::info Artifact vs Git reference
- **Artifact:** Harness packages each module version as a ZIP file and stores it on the IaCM server. Workspace executions fetch the artifact directly; no Git credentials are required at runtime.
- **Git reference:** The original V1 behavior. Harness fetches module metadata directly from Git on each execution. Git credentials must be available in all workspaces that use the module.

Use **Artifact** for new modules unless you have a specific reason to retain Git reference behavior.
:::

3. In the same **Advanced** section, optionally enter a **Git Tag Pattern** to filter which tags are onboarded. The pattern uses wildcard-style matching (for example, `module-name/*` for path-like tag names).

   Suppose your repository has multiple module families tagged in Git like this:

   `SQSv.1.0.0`, `SQSv.1.0.1`, `SQSv.1.0.2`, `S3v.1.0.0`, `S3v.1.0.1`

   To onboard **only** the SQS tags, set **Git Tag Pattern** to `SQSv*`. That matches every tag that starts with `SQSv` and excludes `S3v*` (and any other prefix) unless you add a broader pattern.

## Module onboarding

After you finish **Configure module details**, the module creation wizard continues with **Organization and Project**, then **Execution pipeline**. The sections below apply **regardless of storage type**—they describe how to wire the onboarding pipeline, optional auto-sync, and the first sync.

:::info Onboarding runs in a project
Even when module registry or module settings are available at the **account** level, the **onboarding pipeline still runs in a Harness project**. In **Organization and Project**, choose the project where your shared or **common** onboarding pipelines live (or where you maintain the default pipeline). The pipeline list on **Execution pipeline** is scoped to that project’s pipelines.
:::

### Connect the onboarding pipeline

The onboarding pipeline clones your module repository, detects tags, and extracts the README and metadata for each version. If you use **Artifact** storage, the pipeline also packages each version and uploads it to the IaCM server; if you use **Git reference**, it registers versions so the registry and workspaces can resolve them from Git according to your configuration.

On the **Execution pipeline** step of the wizard:

1. Select a pipeline from the list of available **Default Pipelines** or **Custom Pipelines**, or leave no selection to use the default onboarding pipeline.
2. Note that the selected **Organization** and **Project** determine which pipelines appear in this list.

:::tip Inspect or customize the pipeline
If you want to inspect or customize the onboarding pipeline before running it, create it manually first and select it here. To create a pipeline manually, go to **Infrastructure** > **Pipelines** > **Create a Pipeline** in your project; see [Harness Pipelines](/docs/category/pipelines). The pipeline must contain an IaCM stage with a module-onboarding step and the **moduleId** variable set. The module ID is displayed on the module detail page after the module has been created.
:::

### Enable auto-sync

1. At the bottom of the **Execution pipeline** step, confirm that the **Enable auto-sync** checkbox is checked. It is enabled by default.

With auto-sync enabled, Harness creates a webhook trigger on the onboarding pipeline. When a new tag is pushed to the module repository, the trigger runs the pipeline and the new version becomes available in the registry without manual action—**for both Artifact and Git reference** modules.

:::tip Manual sync
If you do not enable auto-sync, you can still trigger a sync manually by selecting the **Sync** button on the module page after creation.
:::

## Troubleshooting

<details>
<summary>Onboarding pipeline fails on clone step</summary>

**Solution:** Verify that the Git connector has read access to the module repository and that the repository name and branch are correct in the module configuration.

</details>

<details>
<summary>No module versions appear after the pipeline completes</summary>

**Solution:** Confirm that the repository has at least one Git tag. The onboarding step only processes tagged versions. Branches are not synced.

</details>

<details>
<summary>Auto-sync does not trigger on new tags</summary>

**Solution:** Check that the **Enable auto-sync** checkbox is checked and that the webhook was created successfully. Navigate to the pipeline and inspect the Triggers tab to confirm the webhook trigger is active. If the trigger shows a **Failed** status (for example, because webhook registration on the Git provider did not complete), verify that the Git connector has the necessary permissions to register webhooks on the repository. Then delete the failed trigger from the Triggers tab and re-enable auto-sync on the module page so a new trigger is created, or re-save the connector and re-enable auto-sync on the module.

</details>

## Migrate existing modules to onboarding pipeline

If you have modules that were registered before the onboarding pipeline flow was available, use the `migrate-onboarding-pipeline.sh` script to bulk-assign a pipeline to them.

:::warning Validate in the UI first
Before running this script, manually onboard one module through the Harness UI. Go to [Module onboarding](#module-onboarding) above to register a test module, configure its onboarding pipeline (choosing the Org and Project), and verify the pipeline execution completes successfully. This confirms the pipeline is correctly set up and you have the correct Org and Project values for the script.
:::

### Prerequisites

- **bash** (macOS or Linux), **curl**, and **jq** installed (`brew install jq` on macOS).
- **Harness API key** (Personal Access Token) with module registry edit permissions.
- **Account ID** for the target Harness account.
- **Org and Project** where the onboarding pipeline lives (or will be created).

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

Do not migrate all modules at once. Start with a small batch (5 to 10 modules) to verify everything works:

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

1. In the Harness UI, go to **Pipelines** > **Executions** in the Org and Project where the onboarding pipeline lives.
2. Confirm that the onboarding pipeline was triggered for each updated module.
3. Verify every execution completed successfully (green status on all stages).
4. Spot-check a few modules in the Module Registry to confirm versions synced and metadata populated.

:::warning Do not proceed until verified
Do not run the next batch until all executions from the current batch succeed. If any executions fail, investigate the cause before continuing. Retry failed modules individually using `--module-ids`.
:::

#### Step 4: Increase batch size

Once you are confident the migration is working, increase the batch size gradually (for example, 5, then 25, then 50, then 100). Continue verifying pipeline executions after each run.

The script automatically skips modules that already have an onboarding pipeline, so re-running with `--all` is safe and only picks up remaining un-migrated modules.

```bash
./migrate-onboarding-pipeline.sh \
  --base-url https://app.harness.io/gateway/iacm \
  --account <ACCOUNT_ID> \
  --api-key <API_KEY> \
  --pipeline-org <ORG> \
  --pipeline-project <PROJECT> \
  --all \
  --limit 25
```

#### Step 5: Migrate all remaining modules

When you are confident everything is working, run without `--limit` to migrate all remaining modules:

```bash
./migrate-onboarding-pipeline.sh \
  --base-url https://app.harness.io/gateway/iacm \
  --account <ACCOUNT_ID> \
  --api-key <API_KEY> \
  --pipeline-org <ORG> \
  --pipeline-project <PROJECT> \
  --all
```

After the final run, check all pipeline executions one more time to confirm the full migration was successful.

### What the script does

For each module being updated, the script:

1. **Fetches modules** from the account, either by specific IDs (`--module-ids`) or all modules (`--all`).
2. **Filters** modules that do not have an existing onboarding pipeline (when using `--all`). The `--limit` option caps the number processed.
3. **Ensures the onboarding pipeline exists** by calling the create endpoint (no-op if the pipeline already exists).
4. **Updates each module** with the pipeline identifier, org, project, and auto-sync flag.
5. **Reports** success and failure counts and lists any failed modules.

### Migration troubleshooting

| Issue | Solution |
|-------|----------|
| `HTTP 401` error | Verify your `--api-key` and `--account` values are not swapped. The account is the short ID, the API key is the long PAT token. |
| `HTTP 403` error | Ensure your API key has module registry edit permissions. |
| Module ID not found | Double-check the module ID exists in the account. Use `--dry-run` with `--all` to list available modules. |
| Pipeline creation fails | Verify the Org and Project exist and that you have pipeline creation permissions in them. |
| Some modules fail to update | Check the error message in the output. Re-run the script with the failed `--module-ids` to retry. |
| Auto-sync does not trigger after migration | Confirm the webhook trigger was created on the onboarding pipeline. Go to the pipeline Triggers tab and verify the trigger is active. |

### Safety notes

- **`--dry-run` is your friend.** Always preview before making changes.
- **Go in small batches.** This lets you catch issues early before they affect many modules.
- **Verify pipeline executions after every run.** Check the Harness UI to confirm all modules were successfully onboarded before proceeding to the next batch.
- **Re-running is safe.** The script skips already-onboarded modules when using `--all`.
- **The script preserves existing module data.** It only adds onboarding pipeline fields; all other module properties remain unchanged.
- **Org and Project-scoped Git connectors:** If your modules use a Git connector scoped to a specific Org and Project, the onboarding pipeline must be created within that same Org and Project. The pipeline needs access to the Git connector to function correctly, so `--pipeline-org` and `--pipeline-project` values must match the connector scope.

### The script

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

# Defaults
DEFAULT_PIPELINE_ID="iacm_auto_generated_onboarding_pipeline"
PAGE_SIZE=100
AUTOSYNC="true"
DRY_RUN=false
PIPELINE_ID=""
MODULE_IDS=""
SELECT_ALL=false
MAX_LIMIT=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --base-url)       BASE_URL="$2"; shift 2 ;;
    --api-key)        API_KEY="$2"; shift 2 ;;
    --account)        ACCOUNT="$2"; shift 2 ;;
    --pipeline-org)   PIPELINE_ORG="$2"; shift 2 ;;
    --pipeline-project) PIPELINE_PROJECT="$2"; shift 2 ;;
    --pipeline-id)    PIPELINE_ID="$2"; shift 2 ;;
    --autosync)       AUTOSYNC="$2"; shift 2 ;;
    --module-ids)     MODULE_IDS="$2"; shift 2 ;;
    --all)            SELECT_ALL=true; shift ;;
    --limit)          MAX_LIMIT="$2"; shift 2 ;;
    --dry-run)        DRY_RUN=true; shift ;;
    -h|--help)
      head -40 "$0" | tail -35
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}" >&2
      exit 1
      ;;
  esac
done

# Validate required arguments
missing=()
[[ -z "${BASE_URL:-}" ]]         && missing+=("--base-url")
[[ -z "${API_KEY:-}" ]]          && missing+=("--api-key")
[[ -z "${ACCOUNT:-}" ]]          && missing+=("--account")
[[ -z "${PIPELINE_ORG:-}" ]]     && missing+=("--pipeline-org")
[[ -z "${PIPELINE_PROJECT:-}" ]] && missing+=("--pipeline-project")

if [[ ${#missing[@]} -gt 0 ]]; then
  echo -e "${RED}Error: Missing required arguments: ${missing[*]}${NC}" >&2
  echo "Run with --help for usage." >&2
  exit 1
fi

if [[ "$SELECT_ALL" == false ]] && [[ -z "$MODULE_IDS" ]]; then
  echo -e "${RED}Error: You must specify either --all or --module-ids <ID1,ID2,...>${NC}" >&2
  exit 1
fi

if [[ "$SELECT_ALL" == true ]] && [[ -n "$MODULE_IDS" ]]; then
  echo -e "${RED}Error: --all and --module-ids are mutually exclusive.${NC}" >&2
  exit 1
fi

# Check dependencies
for cmd in curl jq; do
  if ! command -v "$cmd" &> /dev/null; then
    echo -e "${RED}Error: '$cmd' is required but not installed.${NC}" >&2
    exit 1
  fi
done

# Resolve pipeline ID
if [[ -z "$PIPELINE_ID" ]]; then
  PIPELINE_ID="$DEFAULT_PIPELINE_ID"
fi

# Convert autosync to boolean for JSON
if [[ "$AUTOSYNC" == "true" ]]; then
  AUTOSYNC_JSON=true
else
  AUTOSYNC_JSON=false
fi

# Strip trailing slash from base URL
BASE_URL="${BASE_URL%/}"

# Helper: make authenticated API call
api_call() {
  local method="$1"
  local url="$2"
  local data="${3:-}"
  local extra_args=()

  if [[ -n "$data" ]]; then
    extra_args+=(-d "$data")
  fi

  curl -s -w "\n%{http_code}" \
    -X "$method" \
    -H "Content-Type: application/json" \
    -H "Harness-Account: ${ACCOUNT}" \
    -H "x-api-key: ${API_KEY}" \
    ${extra_args[@]+"${extra_args[@]}"} \
    "$url"
}

# Same as api_call but also captures response headers
api_call_with_headers() {
  local method="$1"
  local url="$2"
  local header_file="$3"
  local data="${4:-}"
  local extra_args=()

  if [[ -n "$data" ]]; then
    extra_args+=(-d "$data")
  fi

  curl -s -w "\n%{http_code}" \
    -X "$method" \
    -D "$header_file" \
    -H "Content-Type: application/json" \
    -H "Harness-Account: ${ACCOUNT}" \
    -H "x-api-key: ${API_KEY}" \
    ${extra_args[@]+"${extra_args[@]}"} \
    "$url"
}

# Step 1: Fetch modules
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Module Onboarding Pipeline Migration Script${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Account:          ${YELLOW}${ACCOUNT}${NC}"
echo -e "  Pipeline Org:     ${YELLOW}${PIPELINE_ORG}${NC}"
echo -e "  Pipeline Project: ${YELLOW}${PIPELINE_PROJECT}${NC}"
echo -e "  Pipeline ID:      ${YELLOW}${PIPELINE_ID}${NC}"
echo -e "  Auto-sync:        ${YELLOW}${AUTOSYNC}${NC}"
if [[ -n "$MODULE_IDS" ]]; then
  echo -e "  Module IDs:       ${YELLOW}${MODULE_IDS}${NC}"
else
  echo -e "  Target:           ${YELLOW}ALL modules without onboarding pipeline${NC}"
fi
if [[ "$DRY_RUN" == true ]]; then
  echo -e "  Mode:             ${YELLOW}DRY RUN${NC}"
fi
echo ""
echo -e "${CYAN}Fetching modules...${NC}"

if [[ -n "$MODULE_IDS" ]]; then
  MODULES_TO_UPDATE="[]"
  IFS=',' read -ra requested_ids <<< "$MODULE_IDS"
  for rid in "${requested_ids[@]}"; do
    rid=$(echo "$rid" | xargs)
    echo -ne "  Fetching module ${rid}... "

    response=$(api_call "GET" "${BASE_URL}/api/modules/${rid}")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [[ "$http_code" == "200" ]]; then
      MODULES_TO_UPDATE=$(echo "$MODULES_TO_UPDATE" | jq --argjson mod "$body" '. + [$mod]')
      echo -e "${GREEN}OK${NC}"
    else
      echo -e "${YELLOW}NOT FOUND (HTTP ${http_code})${NC}"
    fi
  done
  echo ""
else
  ALL_MODULES="[]"
  page=1
  total_fetched=0

  while true; do
    query="limit=${PAGE_SIZE}&page=${page}"

    header_file=$(mktemp)
    response=$(api_call_with_headers "GET" "${BASE_URL}/api/modules?${query}" "$header_file")

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [[ "$http_code" != "200" ]]; then
      echo -e "${RED}Error: Failed to list modules (HTTP ${http_code})${NC}" >&2
      echo "$body" >&2
      rm -f "$header_file"
      exit 1
    fi

    total_items=$(grep -i "X-Total-Items" "$header_file" | tr -d '\r' | awk '{print $2}')
    total_pages=$(grep -i "X-Total-Pages" "$header_file" | tr -d '\r' | awk '{print $2}')
    rm -f "$header_file"

    page_count=$(echo "$body" | jq 'length')
    if [[ "$page_count" == "0" ]] || [[ "$page_count" == "null" ]]; then
      break
    fi

    ALL_MODULES=$(echo "$ALL_MODULES" "$body" | jq -s '.[0] + .[1]')
    total_fetched=$((total_fetched + page_count))

    echo -e "  Fetched page ${page}/${total_pages:-?} (${total_fetched}/${total_items:-?} modules)"

    if [[ -n "$total_pages" ]] && [[ "$page" -ge "$total_pages" ]]; then
      break
    fi

    page=$((page + 1))
  done

  total_modules=$(echo "$ALL_MODULES" | jq 'length')
  echo -e "${GREEN}Total modules fetched: ${total_modules}${NC}"
  echo ""

  MODULES_TO_UPDATE=$(echo "$ALL_MODULES" | jq '[.[] | select(
    (.onboarding_pipeline == null or .onboarding_pipeline == "") and
    (.onboarding_pipeline_org == null or .onboarding_pipeline_org == "") and
    (.onboarding_pipeline_project == null or .onboarding_pipeline_project == "")
  )]')

  if [[ "$MAX_LIMIT" -gt 0 ]]; then
    MODULES_TO_UPDATE=$(echo "$MODULES_TO_UPDATE" | jq --argjson limit "$MAX_LIMIT" '.[:$limit]')
  fi
fi

update_count=$(echo "$MODULES_TO_UPDATE" | jq 'length')

echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"
echo -e "${CYAN}  Summary${NC}"
echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"
if [[ -z "$MODULE_IDS" ]]; then
  echo -e "  Total modules in account:     ${YELLOW}${total_modules}${NC}"
fi
echo -e "  Modules to update:            ${YELLOW}${update_count}${NC}"
if [[ "$MAX_LIMIT" -gt 0 ]]; then
  echo -e "  (limited to ${MAX_LIMIT})"
fi
echo ""

if [[ "$update_count" -eq 0 ]]; then
  echo -e "${GREEN}All modules already have onboarding pipeline configured. Nothing to do.${NC}"
  exit 0
fi

echo -e "${CYAN}Modules to be updated:${NC}"
echo "$MODULES_TO_UPDATE" | jq -r '.[] | "  - [\(.id)] \(.name) (system: \(.system), scope_org: \(.scope_org // "N/A"), scope_project: \(.scope_project // "N/A"))"'
echo ""

if [[ "$DRY_RUN" == true ]]; then
  echo -e "${YELLOW}DRY RUN: No changes will be made.${NC}"
  exit 0
fi

# Ensure onboarding pipeline exists
echo -e "${CYAN}Ensuring onboarding pipeline exists in ${PIPELINE_ORG}/${PIPELINE_PROJECT}...${NC}"

create_pipeline_body=$(jq -n \
  --arg org "$PIPELINE_ORG" \
  --arg project "$PIPELINE_PROJECT" \
  '{org: $org, project: $project}')

pipeline_url="${BASE_URL}/api/modules/pipeline/onboarding"

response=$(api_call "POST" "$pipeline_url" "$create_pipeline_body")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [[ "$http_code" == "200" ]] || [[ "$http_code" == "201" ]] || [[ "$http_code" == "204" ]]; then
  echo -e "${GREEN}  Onboarding pipeline ready (created or already exists).${NC}"
elif [[ "$http_code" == "409" ]]; then
  echo -e "${GREEN}  Onboarding pipeline already exists.${NC}"
else
  echo -e "${RED}  Warning: Pipeline creation returned HTTP ${http_code}.${NC}"
  echo -e "${RED}  Response: ${body}${NC}"
  read -rp "Continue anyway? (y/N): " continue_confirm
  if [[ "$continue_confirm" != "y" && "$continue_confirm" != "Y" ]]; then
    echo -e "${YELLOW}Aborted by user.${NC}"
    exit 1
  fi
fi
echo ""

# Update modules one by one
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Updating modules...${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"

success_count=0
fail_count=0
failed_modules=()

for i in $(seq 0 $((update_count - 1))); do
  module=$(echo "$MODULES_TO_UPDATE" | jq ".[$i]")
  mod_id=$(echo "$module" | jq -r '.id')
  mod_name=$(echo "$module" | jq -r '.name')
  mod_system=$(echo "$module" | jq -r '.system')
  progress="[$((i + 1))/${update_count}]"
  echo -ne "${CYAN}${progress}${NC} Updating module ${YELLOW}${mod_name}${NC} (id: ${mod_id})... "

  update_body=$(echo "$module" | jq \
    --arg pipeline_id "$PIPELINE_ID" \
    --arg pipeline_org "$PIPELINE_ORG" \
    --arg pipeline_project "$PIPELINE_PROJECT" \
    --argjson autosync "$AUTOSYNC_JSON" \
    '{
      name: .name,
      system: .system,
      onboarding_pipeline: $pipeline_id,
      onboarding_pipeline_org: $pipeline_org,
      onboarding_pipeline_project: $pipeline_project,
      onboarding_pipeline_sync: $autosync
    }
    + (if .description then {description: .description} else {} end)
    + (if .repository then {repository: .repository} else {} end)
    + (if .repository_branch then {repository_branch: .repository_branch} else {} end)
    + (if .repository_commit then {repository_commit: .repository_commit} else {} end)
    + (if .repository_connector then {repository_connector: .repository_connector} else {} end)
    + (if .repository_path then {repository_path: .repository_path} else {} end)
    + (if .git_tag_style then {git_tag_style: .git_tag_style} else {} end)
    + (if .storage_type then {storage_type: .storage_type} else {} end)
    + (if .tags then {tags: .tags} else {} end)
    + (if .org then {org: .org} else {} end)
    + (if .project then {project: .project} else {} end)')

  update_url="${BASE_URL}/api/modules/${mod_id}"

  response=$(api_call "PUT" "$update_url" "$update_body")
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  if [[ "$http_code" == "200" ]] || [[ "$http_code" == "204" ]]; then
    echo -e "${GREEN}OK${NC}"
    success_count=$((success_count + 1))
  else
    echo -e "${RED}FAILED (HTTP ${http_code})${NC}"
    echo -e "    ${RED}Response: $(echo "$body" | jq -r '.message // .' 2>/dev/null || echo "$body")${NC}"
    fail_count=$((fail_count + 1))
    failed_modules+=("${mod_id}:${mod_name}")
  fi
done

# Final report
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Migration Complete${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo -e "  Total processed:  ${YELLOW}${update_count}${NC}"
echo -e "  Successful:       ${GREEN}${success_count}${NC}"
echo -e "  Failed:           ${RED}${fail_count}${NC}"

if [[ ${#failed_modules[@]} -gt 0 ]]; then
  echo ""
  echo -e "${RED}Failed modules:${NC}"
  for fm in "${failed_modules[@]}"; do
    echo -e "  - ${fm}"
  done
fi
echo ""
```

</details>

---

## Next steps

- [Register a module](/docs/infra-as-code-management/registry/module-registry): Register modules using the original Git reference flow.
- [Test module versions](/docs/infra-as-code-management/registry/module-registry/module-registry-testing): Set up automated testing for your modules.
