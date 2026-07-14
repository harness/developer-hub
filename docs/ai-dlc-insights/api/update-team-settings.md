---
title: Apply Integration Settings Across Teams
description: Learn how to programmatically create, update, and override team integration settings and filters using the Harness AIDI REST API.
sidebar_label: Copy Team Integration Settings
sidebar_position: 4
unlisted: true
---

## Apply integration settings across teams

You can use the Harness AIDI API to apply a consistent configuration across multiple teams, typically during onboarding or when introducing a new integration. When configuring teams in Harness AIDI, each team can have:

- **Integrations** (e.g., Jira, GitHub, Bitbucket, Harness CI/CD)
- **Integration filters** (e.g., Jira project keys, issue types, statuses, pipeline filters)

Filters depend on integrations; you must configure integrations before applying filters. The `integrationId` used in filters must already exist on the target team's integrations.

## Prerequisites

Before you begin, you need:

- An SEI API key with admin permissions
- Your account's base URL. All API URIs are relative to the SEI service endpoint for your region:
  - **Prod 1:** `https://app.harness.io/prod1/sei/api/`
  - **Prod 2:** `https://app.harness.io/gratis/sei/api/`
  - **EU:** `https://accounts.eu.harness.io/sei/api/`
- An Org Tree ID containing the target teams
- Integration IDs for the integrations you want to assign

### Best practices

- **Order matters:** Always update integrations first, then filters.
- **Filter behavior:** The PUT endpoint for `integration_filters` merges values rather than fully replacing them. If you need to remove a filter value, set the filter with only the desired values.
- **Rate limiting:** Add a short delay between API calls to avoid overwhelming the server.
- **Validation:** After updating, spot-check a few teams in the Harness AIDI UI to confirm settings are correct.
- **Leaf teams only:** Only leaf teams (teams without children) need individual filter configuration. Parent teams inherit from their children for reporting.

## Step 1: Get all teams in an Org Tree

Retrieve all teams in your org tree:

```bash
curl -s \
  -H "Authorization: Apikey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams?there_is_no_cache=true" \
  | python3 -m json.tool
```

This returns a **nested tree structure** with each team's `refId`, `name`, `leaf` status, and `children`. You need to recursively traverse the `children` array to collect all leaf team `refId` values.

Example response structure:

```json
{
  "refId": 100,
  "name": "Engineering",
  "leaf": false,
  "children": [
    {
      "refId": 101,
      "name": "Backend",
      "leaf": true,
      "children": []
    },
    {
      "refId": 102,
      "name": "Frontend",
      "leaf": true,
      "children": []
    }
  ]
}
```

## Step 2: Export reference integrations and filters

Select a reference team that already has the correct configuration. Its settings will be used as the source of truth.

```bash
# Get integrations for the reference team
curl -s \
  -H "Authorization: Apikey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/teams/<TEAM_REF_ID>/integrations?there_is_no_cache=true" \
  | python3 -m json.tool > reference_integrations.json

# Get filters for the reference team
curl -s \
  -H "Authorization: Apikey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/teams/<TEAM_REF_ID>/integration_filters?there_is_no_cache=true" \
  | python3 -m json.tool > reference_filters.json
```

Ensure the reference team includes all integrations that should exist on target teams. Missing integrations will not be created automatically.

## Step 3: Update integrations for a single team

Apply integrations to each team before applying filters. Filters depend on integration IDs that must already exist on the target team.

### Example integrations payload

```json
{
  "teamRefId": 101,
  "integrations": [
    {
      "id": 14,
      "name": "Jira-Prod",
      "integrationType": "IM"
    },
    {
      "id": 17,
      "name": "Bitbucket-Prod",
      "integrationType": "SCM"
    },
    {
      "id": 12,
      "name": "HarnessNG-Prod",
      "integrationType": "CD"
    }
  ]
}
```

### Update a single team

```bash
curl -s -X PUT \
  -H "Authorization: Apikey <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d @reference_integrations.json \
  "https://<BASE_URL>/v2/teams/<TEAM_REF_ID>/integrations?there_is_no_cache=true"
```

## Step 4: Apply integrations across all teams

```python
import requests
import json
import time

BASE_URL = "https://<BASE_URL>"
API_KEY = "<YOUR_API_KEY>"
ORG_TREE_ID = "<ORG_TREE_ID>"
HEADERS = {
    "Authorization": f"Apikey {API_KEY}",
    "Content-Type": "application/json"
}

# Load reference integrations
with open("reference_integrations.json") as f:
    integrations_payload = json.load(f)

# Get org tree and extract leaf teams
resp = requests.get(
    f"{BASE_URL}/v2/org-trees/{ORG_TREE_ID}/teams?there_is_no_cache=true",
    headers=HEADERS
)
resp.raise_for_status()
tree = resp.json()


def get_leaf_teams(node):
    """Recursively extract all leaf teams from the tree."""
    if node.get("leaf"):
        return [node]
    leaves = []
    for child in node.get("children", []):
        leaves.extend(get_leaf_teams(child))
    return leaves


teams = get_leaf_teams(tree)
print(f"Found {len(teams)} leaf teams")

# Update integrations for each team
for team in teams:
    ref_id = team["refId"]
    name = team.get("name", "")

    r = requests.put(
        f"{BASE_URL}/v2/teams/{ref_id}/integrations?there_is_no_cache=true",
        headers=HEADERS,
        json=integrations_payload
    )
    print(f"[{ref_id}] {name}: {r.status_code}")
    time.sleep(0.5)
```

## Step 5: Bulk update filters

Filters control how each integration is scoped (for example, Jira projects, issue types, statuses, or pipeline configurations).

### Example filters payload

```json
{
  "teamRefId": 101,
  "groupedFilters": {
    "IM": [
      {
        "integrationId": 14,
        "filterKey": "PROJECT",
        "questionId": 1,
        "operator": "equals",
        "applicableMetrics": ["LTTC", "MTTR", "BA", "SPRINT_INSIGHTS"],
        "values": ["PROJ-A", "PROJ-B"],
        "isCustom": false,
        "additionalInfo": {}
      },
      {
        "integrationId": 14,
        "filterKey": "ISSUE_TYPE",
        "questionId": 2,
        "operator": "equals",
        "applicableMetrics": ["MTTR"],
        "values": ["Bug"],
        "isCustom": false,
        "additionalInfo": {}
      },
      {
        "integrationId": 14,
        "filterKey": "ISSUE_TYPE",
        "questionId": 13,
        "operator": "equals",
        "applicableMetrics": ["WORK_COMPLETED", "PR_VELOCITY"],
        "values": ["Story"],
        "isCustom": false,
        "additionalInfo": { "defines": ["feature_types"] }
      },
      {
        "integrationId": 14,
        "filterKey": "ISSUE_TYPE",
        "questionId": 14,
        "operator": "equals",
        "applicableMetrics": ["WORK_COMPLETED", "PR_VELOCITY"],
        "values": ["Bug"],
        "isCustom": false,
        "additionalInfo": { "defines": ["bug_types"] }
      },
      {
        "integrationId": 14,
        "filterKey": "STATUS",
        "questionId": 15,
        "operator": "equals",
        "applicableMetrics": ["WORK_COMPLETED"],
        "values": ["In Progress", "In Development"],
        "isCustom": false,
        "additionalInfo": { "defines": ["development_statuses"] }
      },
      {
        "integrationId": 14,
        "filterKey": "STATUS",
        "questionId": 16,
        "operator": "equals",
        "applicableMetrics": ["WORK_COMPLETED"],
        "values": ["Done", "Deployed", "Resolved", "Completed"],
        "isCustom": false,
        "additionalInfo": { "defines": ["termination_statuses"] }
      }
    ],
    "CD": [
      {
        "integrationId": 12,
        "filterKey": "PROJECT",
        "questionId": 9,
        "operator": "equals",
        "applicableMetrics": ["DF", "CFR"],
        "values": ["My_Project"],
        "isCustom": false,
        "additionalInfo": {}
      },
      {
        "integrationId": 12,
        "filterKey": "PIPELINE_STATUS",
        "questionId": 11,
        "operator": "equals",
        "applicableMetrics": ["DF"],
        "values": ["Success"],
        "isCustom": false,
        "additionalInfo": {}
      },
      {
        "integrationId": 12,
        "filterKey": "PIPELINE_STATUS",
        "questionId": 12,
        "operator": "equals",
        "applicableMetrics": ["CFR"],
        "values": ["Aborted"],
        "isCustom": false,
        "additionalInfo": {}
      }
    ]
  },
  "categories": [],
  "insightConfigs": {},
  "metricsUsingDeveloperFilters": []
}
```

### Filter field reference

| Field | Description |
|-------|-------------|
| `integrationId` | ID of the integration this filter applies to |
| `filterKey` | Filter dimension: `PROJECT`, `ISSUE_TYPE`, `STATUS`, `PIPELINE_STATUS`, `REPO_ID` |
| `questionId` | Unique identifier for the filter question (use the value from the reference team) |
| `operator` | Filter operator, typically `equals` |
| `applicableMetrics` | Which metrics this filter applies to: `LTTC`, `MTTR`, `DF`, `CFR`, `BA`, `SPRINT_INSIGHTS`, `WORK_COMPLETED`, `PR_VELOCITY` |
| `values` | Array of values to filter on |
| `isCustom` | Whether this is a custom field filter |
| `additionalInfo` | Metadata such as `{"defines": ["feature_types"]}` for work type classification |

### Update a single team

```bash
curl -s -X PUT \
  -H "Authorization: Apikey <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d @reference_filters.json \
  "https://<BASE_URL>/v2/teams/<TEAM_REF_ID>/integration_filters?there_is_no_cache=true"
```

### Bulk update all teams

```python
# Load reference filters
with open("reference_filters.json") as f:
    filters_payload = json.load(f)

# Update filters for each leaf team
for team in teams:
    ref_id = team["refId"]
    name = team.get("name", "")

    r = requests.put(
        f"{BASE_URL}/v2/teams/{ref_id}/integration_filters?there_is_no_cache=true",
        headers=HEADERS,
        json=filters_payload
    )
    print(f"[{ref_id}] {name}: {r.status_code}")
    time.sleep(0.5)
```

## Step 6: Verify updates

After applying updates, verify that integrations and filters are correctly configured for a sample of teams.

```bash
# Verify integrations
curl -s \
  -H "Authorization: Apikey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/teams/<TEAM_REF_ID>/integrations?there_is_no_cache=true" \
  | python3 -m json.tool

# Verify filters
curl -s \
  -H "Authorization: Apikey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/teams/<TEAM_REF_ID>/integration_filters?there_is_no_cache=true" \
  | python3 -m json.tool
```

## API Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| List teams in org tree | GET | `/v2/org-trees/{orgTreeId}/teams` |
| Get team integrations | GET | `/v2/teams/{teamRefId}/integrations` |
| Update team integrations | PUT | `/v2/teams/{teamRefId}/integrations` |
| Get team integration filters | GET | `/v2/teams/{teamRefId}/integration_filters` |
| Update team integration filters | PUT | `/v2/teams/{teamRefId}/integration_filters` |

## Full script (bash)

A complete script that copies integrations and filters from a source team to all leaf teams in a target org tree:

```bash
#!/bin/bash
set -euo pipefail

BASE_URL="https://<BASE_URL>"
API_KEY="${SEI_API_KEY:?Set SEI_API_KEY environment variable}"
SOURCE_TEAM_REF_ID=<SOURCE_TEAM_REF_ID>
TARGET_ORG_TREE_ID=<TARGET_ORG_TREE_ID>
AUTH_HEADER="Authorization: Apikey ${API_KEY}"

echo "=== Fetching source team integrations ==="
INTEGRATIONS=$(curl -s -H "${AUTH_HEADER}" \
  "${BASE_URL}/v2/teams/${SOURCE_TEAM_REF_ID}/integrations?there_is_no_cache=true")

echo "=== Fetching source team integration filters ==="
FILTERS=$(curl -s -H "${AUTH_HEADER}" \
  "${BASE_URL}/v2/teams/${SOURCE_TEAM_REF_ID}/integration_filters?there_is_no_cache=true")

echo "=== Fetching target org tree teams ==="
LEAF_TEAM_IDS=$(curl -s -H "${AUTH_HEADER}" \
  "${BASE_URL}/v2/org-trees/${TARGET_ORG_TREE_ID}/teams?there_is_no_cache=true" | \
  jq -r 'def leaves: if .leaf == true then .refId elif .children then .children[] | leaves else empty end; leaves')

TEAM_COUNT=$(echo "$LEAF_TEAM_IDS" | wc -l | tr -d ' ')
echo "Found ${TEAM_COUNT} leaf teams"

echo "=== Applying to all target teams ==="
SUCCESS=0; ERRORS=0; TOTAL=0

while IFS= read -r TEAM_REF_ID; do
  TOTAL=$((TOTAL + 1))
  printf "[%d/%d] Team %s " "$TOTAL" "$TEAM_COUNT" "$TEAM_REF_ID"

  # Update integrations first
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    -d "$INTEGRATIONS" \
    "${BASE_URL}/v2/teams/${TEAM_REF_ID}/integrations?there_is_no_cache=true")

  if [ "$HTTP_CODE" = "200" ]; then
    printf "integrations=OK "
  else
    printf "integrations=FAIL[%s]\n" "$HTTP_CODE"
    ERRORS=$((ERRORS + 1)); continue
  fi

  # Then update filters
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    -d "$FILTERS" \
    "${BASE_URL}/v2/teams/${TEAM_REF_ID}/integration_filters?there_is_no_cache=true")

  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "206" ]; then
    echo "filters=OK"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "filters=FAIL[${HTTP_CODE}]"
    ERRORS=$((ERRORS + 1))
  fi
  sleep 0.5
done <<< "$LEAF_TEAM_IDS"

echo "Done: ${SUCCESS}/${TEAM_COUNT} success, ${ERRORS} errors"
```

## Common errors

| Code | Meaning | Resolution |
|------|---------|------------|
| 401/403 | Unauthorized | Verify your API key and that it has admin permissions |
| 404 | Not found | Confirm the team `refId` or org tree ID exists |
| 500 | Internal server error | Check that `integrationId` values in filters exist on the team's integrations; ensure you're using the correct endpoint path |
