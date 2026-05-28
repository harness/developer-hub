---
title: Copy Team Integration Settings Across Teams
description: Learn how to programmatically create, update, and override team integration settings and filters using the Harness AIDI REST API.
sidebar_label: Copy Team Integration Settings
sidebar_position: 4
unlisted: true
---

You can use the Harness AIDI API to apply a consistent configuration across multiple teams, typically during onboarding or when introducing a new integration. When [configuring teams](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams) in Harness AIDI, each team can have:

1. **Integrations** (e.g., Jira, GitHub, and Bitbucket)
2. **Integration filters** (e.g., Jira status categories, project keys, and repository filters)

Filters depend on integrations; you must configure integrations before applying filters. The `integrationId` used in filters must already exist on the target team’s integrations.

### Prerequisites

Before you begin, you need:

- An SEI API key with admin permissions
- Your account's base URL. All API URIs are relative to the SEI service endpoint for your region:

  - Prod 1: `https://app.harness.io/prod1/sei/api/`
  - Prod 2: `https://app.harness.io/gratis/sei/api/`
  - EU: `https://accounts.eu.harness.io/sei/api/`

- An Org Tree ID containing the teams you want to update
- Integration IDs for the integrations you want to assign

Harness recommends following these best practices:

- **Order matters:** Always update integrations first, then filters.
- **Filter behavior:** The `PUT` endpoint for `integration_filters` **merges** values rather than fully replacing them. If you need to remove a filter value, you may need to set the filter with only the desired values.
- **Rate limiting:** Add a short delay between API calls to avoid overwhelming the server.
- **Validation:** After updating, spot-check a few teams in the Harness AIDI UI to confirm settings are correct.
- **Leaf teams only:** Only leaf teams (teams without children) need individual filter configuration. Parent teams inherit from their children for reporting.

## Step 1: Get all teams in an Org Tree

Retrieve all teams in your org tree:

```bash title="List Teams in the Org Tree"
curl -s \
  -H "Authorization: ApiKey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams?there_is_no_cache=true" \
  | python3 -m json.tool
```

This returns each team's `refId`, `name`, and current configuration. Save the `refId` values for the teams you want to update.

## Step 2: Export reference integrations and filters

Select a reference team. Its configuration will be used as the source of truth.

```bash title="Integrations and Integration Filters"
# Get integrations for the reference team
curl -s \
  -H "Authorization: ApiKey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams/<TEAM_REF_ID>/settings/integrations?there_is_no_cache=true" \
  | python3 -m json.tool > reference_integrations.json

# Get filters for the reference team
curl -s \
  -H "Authorization: ApiKey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams/<TEAM_REF_ID>/settings/integration_filters?there_is_no_cache=true" \
  | python3 -m json.tool > reference_filters.json
```

Ensure the reference team includes all integrations that should exist on target teams. Missing integrations will not be created automatically.

## Step 3: Update integrations for a single team

Apply integrations to each team before applying filters. Filters depend on integration IDs that must already exist on the target team.

```json title="Example Integrations Payload"
{
  "integrations": [
    {
      "integrationId": 14,
      "integrationName": "Jira-Prod",
      "type": "IM"
    },
    {
      "integrationId": 17,
      "integrationName": "Bitbucket-Prod",
      "type": "SCM"
    },
    {
      "integrationId": 12,
      "integrationName": "HarnessNG-Prod",
      "type": "CD"
    }
  ]
}
```

```bash title="Update a Single Team"
curl -s -X PUT \
  -H "Authorization: ApiKey <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d @reference_integrations.json \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams/<TEAM_REF_ID>/settings/integrations?there_is_no_cache=true"
```

## Step 4: Apply integrations across all teams

```python title="Bulk Update All Teams"
import requests
import json
import time

BASE_URL = "https://<BASE_URL>"
API_KEY = "<YOUR_API_KEY>"
ORG_TREE_ID = "<ORG_TREE_ID>"
HEADERS = {
    "Authorization": f"ApiKey {API_KEY}",
    "Content-Type": "application/json"
}

# Load reference integrations
with open("reference_integrations.json") as f:
    integrations_payload = json.load(f)

# Get all teams
resp = requests.get(
    f"{BASE_URL}/v2/org-trees/{ORG_TREE_ID}/teams?there_is_no_cache=true",
    headers=HEADERS
)
resp.raise_for_status()
teams = resp.json()
# Update integrations for each team
for team in teams:
    ref_id = team["refId"]
    name = team.get("name", "")
    
    r = requests.put(
        f"{BASE_URL}/v2/org-trees/{ORG_TREE_ID}/teams/{ref_id}/settings/integrations?there_is_no_cache=true",
        headers=HEADERS,
        json=integrations_payload
    )
    print(f"[{ref_id}] {name}: {r.status_code}")
    time.sleep(0.5)  # Rate limiting
```

## Step 5: Bulk update filters

Filters control how each integration is scoped (for example, repositories, Jira statuses, or projects). 

```json title="Example Filters Payload"
{
  "groupedFilters": {
    "SCM": [
      {
        "integrationId": 17,
        "integrationName": "Bitbucket-Prod",
        "filterKey": "REPO_ID",
        "operator": "IN",
        "values": ["repo-1", "repo-2"]
      }
    ],
    "ITSM": [
      {
        "integrationId": 14,
        "integrationName": "Jira-Prod",
        "filterKey": "STATUS_CATEGORY",
        "operator": "IN",
        "values": ["Done", "In Progress", "To Do"]
      }
    ]
  },
  "categories": [],
  "insightConfigs": {},
  "metricsUsingDeveloperFilters": []
}
```

The `integration_filters` endpoint merges values rather than fully replacing them.

```bash title="Update a Single Team"
curl -s -X PUT \
  -H "Authorization: ApiKey <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d @reference_filters.json \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams/<TEAM_REF_ID>/settings/integration_filters?there_is_no_cache=true"
```

```python title="Bulk Update All Teams"
# Load reference filters
with open("reference_filters.json") as f:
    filters_payload = json.load(f)

# Update filters for each team
for team in teams:
    ref_id = team["refId"]
    name = team.get("name", "")
    
    r = requests.put(
        f"{BASE_URL}/v2/org-trees/{ORG_TREE_ID}/teams/{ref_id}/settings/integration_filters?there_is_no_cache=true",
        headers=HEADERS,
        json=filters_payload
    )
    print(f"[{ref_id}] {name}: {r.status_code}")
    time.sleep(0.5)
```

## Step 6: Verify updates

After applying updates, verify that integrations and filters are correctly configured for a sample of teams.

```bash title="Verify Updates"
# Verify integrations
curl -s \
  -H "Authorization: ApiKey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams/<TEAM_REF_ID>/settings/integrations?there_is_no_cache=true" \
  | python3 -m json.tool

# Verify filters
curl -s \
  -H "Authorization: ApiKey <YOUR_API_KEY>" \
  "https://<BASE_URL>/v2/org-trees/<ORG_TREE_ID>/teams/<TEAM_REF_ID>/settings/integration_filters?there_is_no_cache=true" \
  | python3 -m json.tool
```