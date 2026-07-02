---
title: New Relic Integration Guide
description: Configure New Relic Alerts to send webhooks to Harness AI SRE.
sidebar_label: New Relic
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure New Relic to Send Webhooks

Configure New Relic Alerts to send webhook notifications to Harness AI SRE when issues are created or updated.

## Before you begin

- **Harness webhook endpoint**: Create a New Relic webhook in Harness AI SRE using the [New Relic webhook template](../../templates/monitoring/new-relic.md).
- **New Relic access**: Permissions to create workflows and notification destinations.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **New Relic version**: This guide covers New Relic's Applied Intelligence workflows (current notification system).
- **Workflows documentation**: Go to [Applied Intelligence - Workflows](https://docs.newrelic.com/docs/alerts-applied-intelligence/applied-intelligence/incident-workflows/incident-workflows/) to understand workflow configuration.
- **Webhook destination reference**: Go to [Notification Destinations](https://docs.newrelic.com/docs/alerts-applied-intelligence/notifications/destinations/) for webhook setup details.

---

## Create webhook destination

### Navigate to destinations

1. In New Relic, go to **Alerts & AI** → **Destinations**
2. Click **Create destination**

### Configure webhook destination

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

- **Destination name**: `Harness AI SRE`
- **Destination type**: Select **Webhook**
- **Endpoint URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **Authentication**: None (or Bearer token if required)

</TabItem>
<TabItem value="with-auth" label="With authentication">

- **Destination name**: `Harness AI SRE`
- **Destination type**: Select **Webhook**
- **Endpoint URL**: Your Harness webhook URL
- **Authentication**: Select **Bearer token**
- **Token**: `your-webhook-secret`

Or use **Custom headers**:
- **Header name**: `X-Webhook-Secret`
- **Header value**: `your-secret-key`

</TabItem>
<TabItem value="custom-payload" label="Custom payload template">

- **Destination name**: `Harness AI SRE`
- **Destination type**: Select **Webhook**
- **Endpoint URL**: Your Harness webhook URL
- **Custom payload**: Enable
- **Payload template**:

```json
{
  "issue_id": "{{ issueId }}",
  "issue_title": "{{ issueTitle }}",
  "priority": "{{ priority }}",
  "state": "{{ state }}",
  "trigger_event": "{{ triggerEvent }}",
  "issue_url": "{{ issuePageUrl }}",
  "violation_chart_url": "{{ violationChartUrl }}",
  "created_at": "{{ createdAt }}",
  "updated_at": "{{ updatedAt }}",
  "account_id": "{{ nrAccountId }}",
  "account_name": "{{ nrAccountName }}",
  "entity_name": "{{ entitiesData.entities.[0].name }}",
  "entity_type": "{{ entitiesData.entities.[0].type }}",
  "condition_name": "{{ accumulations.conditionName.[0] }}",
  "policy_names": {{ json accumulations.policyName }},
  "labels": {{ json labelsObject }}
}
```

</TabItem>
</Tabs>

### Test destination

Click **Test connection** to verify the webhook is reachable.

### Save destination

Click **Create destination** to save.

---

## Create notification channel

### Navigate to channels

1. Go to **Alerts & AI** → **Channels**
2. Click **Create channel**

### Configure channel

- **Channel name**: `Harness AI SRE Channel`
- **Destination**: Select **Harness AI SRE** (the destination you just created)
- **Notification trigger**: Select events to send
  - Issue activated
  - Issue acknowledged
  - Issue priority changed
  - Issue closed

### Save channel

Click **Create channel**.

---

## Create workflow

### Navigate to workflows

1. Go to **Alerts & AI** → **Workflows**
2. Click **Add a workflow**

### Configure workflow

<Tabs>
<TabItem value="basic-workflow" label="Basic workflow" default>

- **Workflow name**: `Send to Harness AI SRE`
- **Filter data**: Configure filters (optional)
  - Filter by priority: `Critical` or `High`
  - Filter by entity type: `Application`, `Host`, etc.
- **Enrich data**: Add enrichments (optional)
- **Notify**: Select **Harness AI SRE Channel**

</TabItem>
<TabItem value="filtered-workflow" label="Filtered by priority">

- **Workflow name**: `Critical Alerts to Harness`
- **Filter data**:
  - **Attribute**: `priority`
  - **Operator**: `is`
  - **Value**: `Critical`
- **Notify**: Select **Harness AI SRE Channel**

</TabItem>
<TabItem value="enriched-workflow" label="With enrichments">

- **Workflow name**: `Enriched Alerts to Harness`
- **Filter data**: Configure filters
- **Enrich data**:
  - Add **NRQL query** to enrich with additional metrics
  - Add **Image** to include chart snapshots
- **Notify**: Select **Harness AI SRE Channel**

</TabItem>
</Tabs>

### Activate workflow

Toggle **Active** to enable the workflow.

### Save workflow

Click **Save workflow**.

---

## Configure field mapping in Harness

In your Harness webhook configuration, map New Relic payload fields to alert properties.

### New Relic webhook payload structure

```json
{
  "id": "issue-123",
  "issueId": "issue-123",
  "issueTitle": "High Error Rate on Application XYZ",
  "issuePageUrl": "https://one.newrelic.com/issues/issue-123",
  "priority": "CRITICAL",
  "state": "ACTIVATED",
  "triggerEvent": "STATE_CHANGE",
  "createdAt": 1625097600000,
  "updatedAt": 1625097600000,
  "violationChartUrl": "https://chart.googleapis.com/chart?...",
  "nrAccountId": 12345,
  "nrAccountName": "My Company",
  "entitiesData": {
    "entities": [
      {
        "id": "entity-456",
        "name": "Application XYZ",
        "type": "APPLICATION"
      }
    ]
  },
  "accumulations": {
    "conditionName": ["Error rate > 5%"],
    "policyName": ["Production Alerts"],
    "tag.environment": ["production"],
    "tag.team": ["platform"]
  },
  "labelsObject": {
    "environment": "production",
    "team": "platform"
  }
}
```

### Basic field mapping

Use Mustache templates:

```yaml
title: "{{webhook.issueTitle}}"
message: |
  New Relic Issue: {{webhook.issueTitle}}
  
  State: {{webhook.state}}
  Priority: {{webhook.priority}}
  Entity: {{webhook.entitiesData.entities[0].name}}
  
  View issue: {{webhook.issuePageUrl}}
severity: "{{webhook.priority}}"
source: "new-relic"
link: "{{webhook.issuePageUrl}}"
tags:
  - "issue_id:{{webhook.issueId}}"
  - "entity:{{webhook.entitiesData.entities[0].name}}"
  - "entity_type:{{webhook.entitiesData.entities[0].type}}"
  - "state:{{webhook.state}}"
```

### Advanced field mapping with CEL

```cel
// Extract issue details
title: webhook.issueTitle
message: "New Relic Issue: " + webhook.issueTitle + "\n\n" +
         "State: " + webhook.state + "\n" +
         "Priority: " + webhook.priority + "\n" +
         "Entity: " + (has(webhook.entitiesData.entities) && size(webhook.entitiesData.entities) > 0 
           ? webhook.entitiesData.entities[0].name 
           : "Unknown") + "\n\n" +
         "Violation Chart: " + webhook.violationChartUrl + "\n" +
         "Issue URL: " + webhook.issuePageUrl

// Map New Relic priority to Harness severity
severity: webhook.priority == "CRITICAL" ? "critical" :
          webhook.priority == "HIGH" ? "high" :
          webhook.priority == "MEDIUM" ? "medium" : "low"

source: "new-relic"
link: webhook.issuePageUrl

// Extract all labels as tags
tags: has(webhook.labelsObject) 
  ? webhook.labelsObject.keys().map(k, k + ":" + string(webhook.labelsObject[k]))
  : ["issue_id:" + webhook.issueId]

// Filter: only activated and updated issues
filter: webhook.state in ["ACTIVATED", "CREATED"] || 
        (webhook.state == "UPDATED" && webhook.priority in ["CRITICAL", "HIGH"])

custom_fields: {
  "issue_id": webhook.issueId,
  "entity_id": has(webhook.entitiesData.entities) && size(webhook.entitiesData.entities) > 0
    ? webhook.entitiesData.entities[0].id
    : "",
  "account_id": string(webhook.nrAccountId),
  "violation_chart_url": webhook.violationChartUrl
}
```

---

## Test the integration

### Create test alert condition

1. Go to **Alerts & AI** → **Alert policies**
2. Create a test policy and condition that will fire immediately
3. Assign the workflow to the policy

### Trigger the condition

Wait for the condition to evaluate and create an issue.

### Verify in New Relic

1. Go to **Alerts & AI** → **Issues & Activity**
2. Verify the issue was created
3. Check **Workflows** to see notification sent

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the issue appears
3. Verify field mapping is correct

---

## Available New Relic fields

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Issue ID | `issue-123` |
| `issueId` | Issue ID (same as id) | `issue-123` |
| `issueTitle` | Issue title | `High Error Rate on Application XYZ` |
| `issuePageUrl` | Link to issue | `https://one.newrelic.com/issues/...` |
| `priority` | Issue priority | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| `state` | Issue state | `ACTIVATED`, `ACKNOWLEDGED`, `CLOSED`, `UPDATED` |
| `triggerEvent` | Event type | `STATE_CHANGE`, `PRIORITY_CHANGED` |
| `createdAt` | Creation timestamp (ms) | `1625097600000` |
| `updatedAt` | Last update timestamp (ms) | `1625097600000` |
| `violationChartUrl` | Chart image URL | `https://chart.googleapis.com/...` |
| `nrAccountId` | New Relic account ID | `12345` |
| `nrAccountName` | Account name | `My Company` |
| `entitiesData.entities` | Affected entities array | `[{id, name, type}]` |
| `accumulations.conditionName` | Condition names | `["Error rate > 5%"]` |
| `accumulations.policyName` | Policy names | `["Production Alerts"]` |
| `labelsObject` | Key-value labels | `{"environment": "production"}` |

---

## Advanced configuration

### Filter by priority

Create separate workflows for different priorities:

**Critical issues**:
- **Filter**: `priority` `is` `Critical`
- **Channel**: `Harness Critical`

**High issues**:
- **Filter**: `priority` `is` `High`
- **Channel**: `Harness High`

### Filter by entity type

Route alerts based on entity type:

**Application issues**:
- **Filter**: `entitiesData.entities.type` `contains` `APPLICATION`
- **Channel**: `Harness Applications`

**Infrastructure issues**:
- **Filter**: `entitiesData.entities.type` `contains` `HOST`
- **Channel**: `Harness Infrastructure`

### Enrich with NRQL queries

Add custom data to webhooks:

1. In workflow **Enrich data** step
2. Add **NRQL enrichment**
3. Query:
```sql
SELECT average(duration), count(*) 
FROM Transaction 
WHERE appName = '{{ entitiesData.entities.[0].name }}'
SINCE 1 hour ago
```

4. Reference in custom payload:
```json
{
  "issue_title": "{{ issueTitle }}",
  "enrichment": "{{ nrql.[0].average }} ms avg duration"
}
```

### Include chart images

Add visual context:

1. In workflow **Enrich data** step
2. Add **Image enrichment**
3. Select chart or dashboard
4. Reference in payload: `{{ imageUrl }}`

---

## Troubleshooting

### Webhook not sending

**Cause**: Destination or workflow configuration error.

**Solution**:
- Test destination from **Destinations** page
- Verify workflow is **Active**
- Check workflow filters (remove filters to test)
- Review New Relic notification logs (available in destination details)

### Alerts not appearing in Harness

**Cause**: Field mapping incorrect or CEL filter blocking.

**Solution**:
- Check Harness webhook logs for errors
- Verify payload structure in New Relic destination test
- Temporarily remove CEL filter to test
- Ensure required fields exist (issueTitle, priority, etc.)

### Duplicate issues

**Cause**: Multiple workflows or issue updates triggering notifications.

**Solution**:
- Review workflow filters to avoid overlaps
- Use Harness alert routing rules to deduplicate by `issue_id`:
```cel
// Deduplicate by issue_id
filter: !has(webhook.issueId) || 
        // Check if not recently processed
```
- Filter by `triggerEvent` to process only specific events:
```cel
filter: webhook.triggerEvent == "STATE_CHANGE" && webhook.state == "ACTIVATED"
```

### Closed issues not resolving

**Cause**: CLOSED state not mapped to resolution.

**Solution**:
- Ensure workflow sends notifications for **Issue closed** events
- Map closed state in Harness:
```cel
severity: webhook.state == "CLOSED" ? "info" : 
          (webhook.priority == "CRITICAL" ? "critical" : "high")
```

---

## Example: Complete integration

### New Relic destination

- **Name**: Harness AI SRE
- **Type**: Webhook
- **URL**: `https://app.harness.io/gateway/ai-sre/api/webhooks/wh_abc123`
- **Custom payload**: Enabled (see custom payload tab above)

### New Relic workflow

- **Name**: Critical & High Alerts to Harness
- **Filter**:
  - **Attribute**: `priority`
  - **Operator**: `is one of`
  - **Values**: `Critical`, `High`
- **Enrich**:
  - Add **Image** enrichment with violation chart
- **Notify**: Harness AI SRE Channel
- **Status**: Active

### Harness webhook field mapping

```yaml
title: "{{webhook.issueTitle}}"

message: |
  **New Relic Issue**
  
  **Title**: {{webhook.issueTitle}}
  **Priority**: {{webhook.priority}}
  **State**: {{webhook.state}}
  **Entity**: {{webhook.entitiesData.entities[0].name}} ({{webhook.entitiesData.entities[0].type}})
  
  **Conditions**: {{webhook.accumulations.conditionName[0]}}
  **Policy**: {{webhook.accumulations.policyName[0]}}
  
  **Account**: {{webhook.nrAccountName}} ({{webhook.nrAccountId}})
  **Created**: {{webhook.createdAt}}
  **Updated**: {{webhook.updatedAt}}
  
  **View Issue**: {{webhook.issuePageUrl}}
  **Violation Chart**: {{webhook.violationChartUrl}}

severity: |
  webhook.state == "CLOSED" ? "info" :
  webhook.priority == "CRITICAL" ? "critical" :
  webhook.priority == "HIGH" ? "high" :
  webhook.priority == "MEDIUM" ? "medium" : "low"

source: "new-relic"
link: "{{webhook.issuePageUrl}}"

tags:
  - "source:new-relic"
  - "issue_id:{{webhook.issueId}}"
  - "priority:{{webhook.priority}}"
  - "state:{{webhook.state}}"
  - "entity:{{webhook.entitiesData.entities[0].name}}"
  - "entity_type:{{webhook.entitiesData.entities[0].type}}"
  - "account:{{webhook.nrAccountName}}"

filter: |
  webhook.state in ["ACTIVATED", "CREATED", "UPDATED"] &&
  webhook.priority in ["CRITICAL", "HIGH"]

custom_fields:
  issue_id: "{{webhook.issueId}}"
  entity_id: "{{webhook.entitiesData.entities[0].id}}"
  account_id: "{{webhook.nrAccountId}}"
  violation_chart_url: "{{webhook.violationChartUrl}}"
  condition_names: "{{webhook.accumulations.conditionName}}"
  policy_names: "{{webhook.accumulations.policyName}}"
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate New Relic issues.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add custom filtering logic.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated issue investigation.
- Go to [New Relic Template](../../templates/monitoring/new-relic.md) for the pre-configured template.

---

## Further reading

### New Relic Official Documentation
- [Applied Intelligence - Workflows](https://docs.newrelic.com/docs/alerts-applied-intelligence/applied-intelligence/incident-workflows/incident-workflows/) - Complete guide to workflow configuration, destinations, and channels
- [Notification Destinations](https://docs.newrelic.com/docs/alerts-applied-intelligence/notifications/destinations/) - Webhook destination setup and authentication options
- [Message Templates](https://docs.newrelic.com/docs/alerts-applied-intelligence/notifications/message-templates/) - Available template variables (`{{issueId}}`, `{{priority}}`, `{{entitiesData}}`, etc.)
- [Customize Webhook Payload](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-notifications/customize-your-webhook-payload/) - Complete payload structure and issue fields reference
