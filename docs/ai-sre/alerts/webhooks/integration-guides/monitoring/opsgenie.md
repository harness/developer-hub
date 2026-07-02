---
title: OpsGenie Integration Guide
description: Configure Opsgenie to send webhooks to Harness AI SRE.
sidebar_label: Opsgenie
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Opsgenie to Send Webhooks

Configure Opsgenie to send webhook notifications to Harness AI SRE when alerts are created, updated, or closed.

## Before you begin

- **Harness webhook endpoint**: Create an OpsGenie webhook in Harness AI SRE using the [OpsGenie webhook template](../../templates/monitoring/opsgenie.md).
- **Opsgenie access**: Admin permissions or integration management permissions.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **Outgoing webhook documentation**: Go to [Outgoing Webhook Integration](https://support.atlassian.com/opsgenie/docs/integrate-opsgenie-with-outgoing-webhooks/) for setup guidance.
- **Alert API reference**: Go to [Alert API](https://docs.opsgenie.com/docs/alert-api) to understand alert field definitions and structure.

---

## Create webhook integration

### Navigate to integrations

1. In Opsgenie, go to **Settings** → **Integrations**
2. Click **Add integration**
3. Search for **Webhook** or select **Outgoing Webhook**

### Configure webhook integration

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

- **Name**: `Harness AI SRE`
- **Integration type**: Outgoing Webhook
- **Webhook URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **Enabled**: Check to activate
- **Add alert actions**: Select actions to trigger webhook
  - Create
  - Update Priority
  - Acknowledge
  - Close
  - Add Note

</TabItem>
<TabItem value="with-auth" label="With authentication">

- **Name**: `Harness AI SRE`
- **Webhook URL**: Your Harness webhook URL
- **Custom Headers**: Add authentication header
  - **Header**: `Authorization`
  - **Value**: `Bearer your-webhook-secret`
  
  Or:
  - **Header**: `X-Webhook-Secret`
  - **Value**: `your-secret-key`

- **Add alert actions**: Select trigger actions
- **Enabled**: Check to activate

</TabItem>
<TabItem value="filtered" label="With filters">

- **Name**: `Harness AI SRE Critical`
- **Webhook URL**: Your Harness webhook URL
- **Add alert filter**: Filter which alerts trigger webhook
  - **Priority**: `P1`, `P2`
  - **Tags**: `production`, `critical`
  - **Teams**: Specific teams only
- **Add alert actions**: Select actions
- **Enabled**: Check to activate

</TabItem>
</Tabs>

### Select alert actions

Choose which alert actions trigger the webhook:

- ☑ **Create**: Alert is created
- ☑ **Acknowledge**: Alert is acknowledged
- ☑ **Close**: Alert is closed
- ☐ **Add Note**: Note added to alert (optional)
- ☐ **Update Priority**: Priority changed (optional)
- ☐ **Assign Ownership**: Owner assigned (optional)
- ☐ **Add Team**: Team added (optional)
- ☐ **Add Responder**: Responder added (optional)
- ☐ **Escalate**: Alert escalated (optional)
- ☐ **Delete**: Alert deleted (optional)

### Save integration

Click **Save Integration** to create the webhook.

---

## Configure field mapping in Harness

In your Harness webhook configuration, map Opsgenie payload fields to alert properties.

### Opsgenie webhook payload structure

```json
{
  "source": {
    "name": "web",
    "type": "API"
  },
  "alert": {
    "alertId": "alert-123-abc",
    "message": "High CPU usage on prod-server-01",
    "status": "open",
    "tags": ["production", "infrastructure", "cpu"],
    "tinyId": "123",
    "alias": "cpu-high-prod-server-01",
    "entity": "prod-server-01",
    "userId": "user@example.com",
    "createdAt": 1625097600000,
    "updatedAt": 1625097700000,
    "updatedBy": "system",
    "owner": "ops-team",
    "priority": "P1",
    "teams": [
      {
        "id": "team-abc",
        "name": "Operations"
      }
    ],
    "responders": [
      {
        "id": "user-123",
        "type": "user",
        "name": "John Doe"
      }
    ],
    "integration": {
      "id": "integration-456",
      "name": "Harness AI SRE",
      "type": "Webhook"
    },
    "report": {
      "ackTime": 30000,
      "closeTime": 0,
      "acknowledgedBy": "john.doe",
      "closedBy": null
    },
    "actions": ["Acknowledge", "Create"],
    "description": "CPU usage has exceeded 90% for 5 minutes",
    "details": {
      "host": "prod-server-01",
      "metric": "cpu.usage",
      "value": "95.2",
      "threshold": "90"
    }
  },
  "action": "Create",
  "integrationId": "integration-456",
  "integrationName": "Harness AI SRE"
}
```

### Basic field mapping

Use Mustache templates:

```yaml
title: "{{webhook.alert.message}}"
message: |
  Opsgenie Alert: {{webhook.alert.message}}
  
  Priority: {{webhook.alert.priority}}
  Status: {{webhook.alert.status}}
  Entity: {{webhook.alert.entity}}
  Owner: {{webhook.alert.owner}}
  
  {{webhook.alert.description}}
  
  Action: {{webhook.action}}
  Tiny ID: #{{webhook.alert.tinyId}}
severity: "{{webhook.alert.priority}}"
source: "opsgenie"
link: "https://app.opsgenie.com/alert/detail/{{webhook.alert.alertId}}"
tags:
  - "opsgenie_id:{{webhook.alert.tinyId}}"
  - "priority:{{webhook.alert.priority}}"
  - "status:{{webhook.alert.status}}"
  - "entity:{{webhook.alert.entity}}"
  - "owner:{{webhook.alert.owner}}"
```

### Advanced field mapping with CEL

```cel
// Build title from message and entity
title: webhook.alert.message + 
       (has(webhook.alert.entity) ? " (" + webhook.alert.entity + ")" : "")

// Build detailed message
message: "Opsgenie Alert: " + webhook.alert.message + "\n\n" +
         "Priority: " + webhook.alert.priority + "\n" +
         "Status: " + webhook.alert.status + "\n" +
         "Action: " + webhook.action + "\n" +
         (has(webhook.alert.entity) ? "Entity: " + webhook.alert.entity + "\n" : "") +
         (has(webhook.alert.owner) ? "Owner: " + webhook.alert.owner + "\n" : "") +
         (has(webhook.alert.description) ? "\n" + webhook.alert.description : "") +
         "\n\nTiny ID: #" + webhook.alert.tinyId

// Map Opsgenie priority to Harness severity
severity: webhook.alert.priority == "P1" ? "critical" :
          webhook.alert.priority == "P2" ? "high" :
          webhook.alert.priority == "P3" ? "medium" : "low"

source: "opsgenie"
link: "https://app.opsgenie.com/alert/detail/" + webhook.alert.alertId

// Extract all tags and add opsgenie-specific tags
tags: has(webhook.alert.tags) 
  ? webhook.alert.tags.map(t, "tag:" + t) + [
      "opsgenie_id:" + webhook.alert.tinyId,
      "priority:" + webhook.alert.priority,
      "status:" + webhook.alert.status,
      "action:" + webhook.action
    ]
  : ["opsgenie_id:" + webhook.alert.tinyId]

// Filter: only process Create and Close actions for P1/P2 alerts
filter: webhook.action in ["Create", "Close"] && 
        webhook.alert.priority in ["P1", "P2"]

custom_fields: {
  "alert_id": webhook.alert.alertId,
  "tiny_id": webhook.alert.tinyId,
  "opsgenie_status": webhook.alert.status,
  "ack_time_ms": has(webhook.alert.report.ackTime) ? string(webhook.alert.report.ackTime) : "0"
}
```

---

## Test the integration

### Create test alert in Opsgenie

1. Go to **Alerts** in Opsgenie
2. Click **Create Alert**
3. Fill in alert details:
   - **Message**: `Test alert for Harness integration`
   - **Priority**: `P3`
   - **Tags**: `test`, `harness`
4. Click **Create**

### Verify webhook triggered

1. Go to **Settings** → **Integrations**
2. Click on **Harness AI SRE** integration
3. Check **Activity** or **Logs** tab for webhook delivery

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the test alert appears
3. Verify field mapping is correct

---

## Available Opsgenie fields

| Field | Description | Example |
|-------|-------------|---------|
| `action` | Alert action | `Create`, `Acknowledge`, `Close`, `AddNote` |
| `alert.alertId` | Unique alert identifier | `alert-123-abc` |
| `alert.tinyId` | Short numeric ID | `123` |
| `alert.message` | Alert message | `High CPU usage on prod-server-01` |
| `alert.status` | Alert status | `open`, `closed` |
| `alert.priority` | Alert priority | `P1`, `P2`, `P3`, `P4`, `P5` |
| `alert.tags` | Alert tags array | `["production", "cpu"]` |
| `alert.alias` | Alert alias | `cpu-high-prod-server-01` |
| `alert.entity` | Related entity | `prod-server-01` |
| `alert.owner` | Alert owner | `ops-team` |
| `alert.description` | Alert description | Long text description |
| `alert.details` | Custom key-value pairs | `{"host": "prod-01", "metric": "cpu"}` |
| `alert.createdAt` | Creation timestamp (ms) | `1625097600000` |
| `alert.updatedAt` | Last update timestamp (ms) | `1625097700000` |
| `alert.teams` | Assigned teams | `[{id, name}]` |
| `alert.responders` | Alert responders | `[{id, type, name}]` |
| `alert.report.ackTime` | Time to acknowledge (ms) | `30000` |
| `alert.report.closeTime` | Time to close (ms) | `300000` |
| `alert.report.acknowledgedBy` | User who acknowledged | `john.doe` |
| `alert.report.closedBy` | User who closed | `jane.smith` |

---

## Advanced configuration

### Route by priority

Create separate Harness webhooks for different priorities:

**P1/P2 (Critical)**:
- Opsgenie integration: `Harness Critical`
- Alert filter: Priority is `P1` or `P2`
- Webhook URL: `https://harness/webhooks/critical-webhook-id`

**P3/P4 (Medium)**:
- Opsgenie integration: `Harness Standard`
- Alert filter: Priority is `P3` or `P4`
- Webhook URL: `https://harness/webhooks/standard-webhook-id`

### Route by team

Filter alerts by assigned team:

**Opsgenie integration**:
- Alert filter: Team is `Operations` or `Platform`
- Webhook URL: Your Harness webhook

**Harness CEL**:
```cel
// Tag by team for routing
tags: has(webhook.alert.teams) && size(webhook.alert.teams) > 0
  ? webhook.alert.teams.map(t, "team:" + t.name)
  : []
```

### Extract custom details

Access custom fields from `alert.details`:

```cel
message: webhook.alert.message + "\n\n" +
         "Host: " + webhook.alert.details.host + "\n" +
         "Metric: " + webhook.alert.details.metric + "\n" +
         "Value: " + webhook.alert.details.value + "\n" +
         "Threshold: " + webhook.alert.details.threshold
```

### Track alert lifecycle

Monitor alert lifecycle metrics:

```cel
// Include timing information
message: webhook.alert.message + "\n\n" +
         "Action: " + webhook.action + "\n" +
         (webhook.action == "Acknowledge" && has(webhook.alert.report.ackTime)
           ? "Time to Ack: " + string(webhook.alert.report.ackTime / 1000) + "s\n"
           : "") +
         (webhook.action == "Close" && has(webhook.alert.report.closeTime)
           ? "Time to Close: " + string(webhook.alert.report.closeTime / 1000) + "s\n"
           : "")
```

---

## Troubleshooting

### Webhook not sending

**Cause**: Integration not enabled or filter blocking alerts.

**Solution**:
- Verify integration is **Enabled** in Opsgenie
- Check alert filters (remove filters to test)
- Review integration **Activity** or **Logs** for errors
- Ensure webhook URL is accessible from Opsgenie

### Alerts not appearing in Harness

**Cause**: Field mapping incorrect or CEL filter blocking.

**Solution**:
- Check Harness webhook logs for errors
- Verify payload structure in Opsgenie integration logs
- Temporarily remove CEL filter to test
- Use CEL `has()` to safely access optional fields

### Duplicate alerts

**Cause**: Multiple Opsgenie integrations or alert actions triggering webhooks.

**Solution**:
- Review all Opsgenie webhook integrations
- Disable unnecessary alert actions in integration settings
- Use Harness alert routing rules to deduplicate by `alertId` or `tinyId`
- Filter by action in CEL:
```cel
filter: webhook.action == "Create"  // Only process Create actions
```

### Closed alerts not resolving

**Cause**: Close action not enabled or not mapped to resolution.

**Solution**:
- Enable **Close** action in Opsgenie integration
- Map Close action in Harness CEL:
```cel
severity: webhook.action == "Close" ? "info" :
          (webhook.alert.priority == "P1" ? "critical" : "high")
```

---

## Example: Complete integration

### Opsgenie webhook integration

- **Name**: Harness AI SRE
- **Type**: Outgoing Webhook
- **URL**: `https://app.harness.io/gateway/ai-sre/api/webhooks/wh_abc123`
- **Alert Filter**:
  - Priority: `P1`, `P2`
  - Tags: `production`
- **Alert Actions**:
  - Create
  - Acknowledge
  - Close
- **Enabled**: ✓

### Harness webhook field mapping

```yaml
title: |
  webhook.action == "Create" ? "🚨 " :
  webhook.action == "Acknowledge" ? "👀 " :
  webhook.action == "Close" ? "✅ " : ""
  + webhook.alert.message

message: |
  **Opsgenie Alert #{{webhook.alert.tinyId}}**
  
  **Action**: {{webhook.action}}
  **Priority**: {{webhook.alert.priority}}
  **Status**: {{webhook.alert.status}}
  **Entity**: {{webhook.alert.entity}}
  **Owner**: {{webhook.alert.owner}}
  
  **Description**: {{webhook.alert.description}}
  
  **Details**:
  {{#webhook.alert.details}}
  - Host: {{host}}
  - Metric: {{metric}}
  - Value: {{value}}
  - Threshold: {{threshold}}
  {{/webhook.alert.details}}
  
  {{#webhook.alert.report.ackTime}}
  Time to Acknowledge: {{webhook.alert.report.ackTime}}ms
  {{/webhook.alert.report.ackTime}}
  
  {{#webhook.alert.report.closeTime}}
  Time to Close: {{webhook.alert.report.closeTime}}ms
  {{/webhook.alert.report.closeTime}}
  
  **View in Opsgenie**: https://app.opsgenie.com/alert/detail/{{webhook.alert.alertId}}

severity: |
  webhook.action == "Close" ? "info" :
  webhook.alert.priority == "P1" ? "critical" :
  webhook.alert.priority == "P2" ? "high" :
  webhook.alert.priority == "P3" ? "medium" : "low"

source: "opsgenie"
link: "https://app.opsgenie.com/alert/detail/{{webhook.alert.alertId}}"

tags:
  - "source:opsgenie"
  - "opsgenie_id:{{webhook.alert.tinyId}}"
  - "alert_id:{{webhook.alert.alertId}}"
  - "priority:{{webhook.alert.priority}}"
  - "status:{{webhook.alert.status}}"
  - "action:{{webhook.action}}"
  - "entity:{{webhook.alert.entity}}"
  - "owner:{{webhook.alert.owner}}"
  {{#webhook.alert.tags}}
  - "tag:{{.}}"
  {{/webhook.alert.tags}}

filter: |
  webhook.alert.priority in ["P1", "P2"] &&
  webhook.action in ["Create", "Acknowledge", "Close"]

custom_fields:
  opsgenie_alert_id: "{{webhook.alert.alertId}}"
  opsgenie_tiny_id: "{{webhook.alert.tinyId}}"
  opsgenie_alias: "{{webhook.alert.alias}}"
  opsgenie_status: "{{webhook.alert.status}}"
  ack_time_ms: "{{webhook.alert.report.ackTime}}"
  close_time_ms: "{{webhook.alert.report.closeTime}}"
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate Opsgenie alerts.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add advanced filtering logic.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated alert investigation.
- Go to [Opsgenie Template](../../templates/monitoring/opsgenie.md) for the pre-configured template.

---

## Further reading

### Ops Genie Official Documentation
- [Outgoing Webhook Integration](https://support.atlassian.com/opsgenie/docs/integrate-opsgenie-with-outgoing-webhooks/) - Complete guide to webhook integration setup and configuration options
- [Alert API](https://docs.opsgenie.com/docs/alert-api) - Alert field definitions (`alertId`, `tinyId`, `priority`, `tags`, `details`)
- [Edge Connector Alert Actions](https://support.atlassian.com/opsgenie/docs/opsgenie-edge-connector-alert-action-data/) - Webhook payload structure and available fields
- [Integration Actions](https://support.atlassian.com/opsgenie/docs/what-are-integration-actions/) - Available alert actions (Create, Acknowledge, Close, AddNote, etc.)
