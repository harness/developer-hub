---
title: PagerDuty Integration Guide
description: Configure PagerDuty to send webhooks to Harness AI SRE.
sidebar_label: PagerDuty
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure PagerDuty to Send Webhooks

Configure PagerDuty to send webhook notifications to Harness AI SRE when incidents are created, updated, or resolved.

## Before you begin

- **Harness webhook endpoint**: Create a PagerDuty webhook in Harness AI SRE using the [PagerDuty webhook template](../../templates/monitoring/pagerduty.md).
- **PagerDuty permissions**: Admin or Account Owner role (for V3 webhooks) or Service permissions (for extensions).
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **PagerDuty V3 webhooks documentation**: Go to [PagerDuty V3 Webhooks Overview](https://developer.pagerduty.com/docs/webhooks/v3-overview/) to understand V3 webhook capabilities and event types.
- **Webhook extensions documentation**: Go to [PagerDuty Webhooks](https://support.pagerduty.com/docs/webhooks) for legacy webhook extension setup.

---

## Choose webhook type

PagerDuty offers two webhook mechanisms:

| Type | Scope | Use Case | Flexibility |
|------|-------|----------|-------------|
| **V3 Webhooks** (Recommended) | Account, team, or service | Enterprise-wide incident synchronization | High (supports filtering, custom headers) |
| **Webhook Extensions** (Legacy) | Service-level | Simple service-specific integration | Limited |

Go to [V3 Webhooks](#configure-v3-webhooks) for the recommended approach.

Go to [Webhook Extensions](#configure-webhook-extensions-legacy) for the legacy method.

---

## Configure V3 webhooks

V3 webhooks are the recommended approach for modern PagerDuty integrations.

### Create a V3 webhook

1. In PagerDuty, navigate to **Integrations** → **Generic Webhooks (v3)**
2. Click **New Webhook**

### Configure webhook settings

Configure these fields:

- **Webhook URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **Scope Type**: Select the scope
  - **Account**: All incidents across the account
  - **Team**: Incidents for specific teams
  - **Service**: Incidents for specific services
- **Description**: `Harness AI SRE Integration`

### Configure custom headers

Add custom headers if your Harness webhook requires authentication:

```
Content-Type: application/json
X-Webhook-Secret: your-secret-key
```

### Select event subscriptions

Choose which incident events trigger the webhook:

<Tabs>
<TabItem value="all" label="All incident events" default>

Select all event types:
- `incident.triggered`
- `incident.acknowledged`
- `incident.escalated`
- `incident.resolved`
- `incident.reassigned`
- `incident.annotated`
- `incident.priority_updated`
- `incident.reopened`
- `incident.delegated`
- `incident.unacknowledged`
- `incident.responder.added`
- `incident.responder.replied`
- `incident.status_update_published`

</TabItem>
<TabItem value="critical-only" label="Critical events only">

Select only high-priority events:
- `incident.triggered`
- `incident.escalated`
- `incident.resolved`

</TabItem>
<TabItem value="lifecycle" label="Lifecycle events">

Track incident lifecycle:
- `incident.triggered`
- `incident.acknowledged`
- `incident.resolved`

</TabItem>
</Tabs>

### Configure event filters

Add filters to control when the webhook fires:

- **Service**: Select specific services or "All"
- **Urgency**: High, low, or both
- **Priority**: Filter by incident priority (P1-P5)

### Save the webhook

Click **Save** to create the V3 webhook.

---

## Configure webhook extensions (legacy)

Webhook extensions are simpler but less flexible than V3 webhooks.

### Add webhook extension to service

1. Navigate to **Services** → Select your service
2. Go to the **Integrations** tab
3. Click **Add Integration**
4. Select **Generic Webhook**

### Configure the extension

- **Name**: `Harness AI SRE`
- **URL**: Your Harness webhook URL
- **Description**: `Send incidents to Harness AI SRE`

### Save the extension

Click **Add Integration** to save.

---

## Configure field mapping in Harness

In your Harness webhook configuration, map the PagerDuty payload fields to alert properties.

### PagerDuty V3 webhook payload structure

V3 webhooks send a standardized payload:

```json
{
  "event": {
    "id": "...",
    "event_type": "incident.triggered",
    "occurred_at": "2025-07-01T10:30:00Z",
    "agent": {
      "type": "user",
      "summary": "John Doe"
    },
    "data": {
      "id": "PXXXXXX",
      "incident_number": 123,
      "title": "High CPU on prod-server-01",
      "status": "triggered",
      "urgency": "high",
      "priority": {
        "summary": "P1"
      },
      "service": {
        "id": "PXXXXXX",
        "summary": "API Service"
      },
      "assignments": [
        {
          "assignee": {
            "summary": "Jane Smith"
          }
        }
      ],
      "created_at": "2025-07-01T10:30:00Z",
      "html_url": "https://company.pagerduty.com/incidents/PXXXXXX"
    }
  }
}
```

### Basic field mapping

Use Mustache templates for simple mapping:

```yaml
title: "{{webhook.event.data.title}}"
message: "PagerDuty incident #{{webhook.event.data.incident_number}}: {{webhook.event.data.title}}"
severity: "{{webhook.event.data.urgency}}"
source: "pagerduty"
link: "{{webhook.event.data.html_url}}"
tags:
  - "incident_id:{{webhook.event.data.id}}"
  - "service:{{webhook.event.data.service.summary}}"
  - "status:{{webhook.event.data.status}}"
```

### Advanced field mapping with CEL

Use CEL for conditional logic and nested field access:

```cel
// Extract nested fields and transform values
title: webhook.event.data.title
message: "PagerDuty " + webhook.event.event_type + ": " + webhook.event.data.title + 
         " (Incident #" + string(webhook.event.data.incident_number) + ")"

// Map PagerDuty urgency to Harness severity
severity: webhook.event.data.urgency == "high" ? "critical" : "medium"

// Extract assignee if present
assignee: has(webhook.event.data.assignments) && 
          size(webhook.event.data.assignments) > 0 
          ? webhook.event.data.assignments[0].assignee.summary 
          : "unassigned"

source: "pagerduty"
link: webhook.event.data.html_url

tags: [
  "incident_id:" + webhook.event.data.id,
  "service:" + webhook.event.data.service.summary,
  "status:" + webhook.event.data.status,
  "priority:" + (has(webhook.event.data.priority) ? webhook.event.data.priority.summary : "none")
]

// Filter: only process triggered and escalated incidents
filter: webhook.event.event_type in ["incident.triggered", "incident.escalated"]
```

---

## Test the integration

### Test V3 webhook

1. In PagerDuty, go to **Integrations** → **Generic Webhooks (v3)**
2. Find your webhook and click **Test Webhook**
3. Select a test scenario
4. Click **Send Test**

### Test webhook extension

1. Create a test incident in the integrated service
2. Verify the webhook fires (check service integration logs)

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the test alert appears
3. Verify field mapping:
   - Alert title matches incident title
   - Severity is mapped correctly
   - Tags include incident metadata
   - Link navigates to PagerDuty incident

---

## Available PagerDuty event types

V3 webhooks support these incident event types:

| Event Type | Description | When to Use |
|------------|-------------|-------------|
| `incident.triggered` | New incident created | Initial alert processing and investigation |
| `incident.acknowledged` | Incident acknowledged by responder | Update alert status, notify team |
| `incident.escalated` | Incident escalated to next level | Increase priority, involve specialists |
| `incident.resolved` | Incident marked as resolved | Close alert, trigger post-incident analysis |
| `incident.reassigned` | Incident reassigned to different responder | Update assignee, transfer context |
| `incident.annotated` | Note added to incident | Process additional context |
| `incident.priority_updated` | Incident priority changed | Adjust alert severity |
| `incident.reopened` | Resolved incident reopened | Reopen alert, resume investigation |
| `incident.delegated` | Incident delegated to another escalation policy | Update ownership, notify new team |
| `incident.unacknowledged` | Incident automatically unacknowledged after timeout | Re-trigger alert notification |
| `incident.responder.added` | Responder added to incident | Update assignee list, notify responder |
| `incident.responder.replied` | Responder replied to a responder request | Log responder response |
| `incident.status_update_published` | Status update posted to incident | Sync status notes to alert |

---

## Advanced configuration

### Route by event type

Create separate Harness webhooks for different incident events:

<Tabs>
<TabItem value="new-incidents" label="New incidents" default>

**PagerDuty webhook 1**:
- Event types: `incident.triggered`
- Harness webhook: `wh_new_incidents`

**Harness field mapping**:
```cel
title: "🚨 " + webhook.event.data.title
severity: "critical"
filter: webhook.event.event_type == "incident.triggered"
```

</TabItem>
<TabItem value="resolutions" label="Resolutions">

**PagerDuty webhook 2**:
- Event types: `incident.resolved`
- Harness webhook: `wh_resolutions`

**Harness field mapping**:
```cel
title: "✅ Resolved: " + webhook.event.data.title
severity: "info"
filter: webhook.event.event_type == "incident.resolved"
```

</TabItem>
</Tabs>

### Filter by service

Use CEL to filter incidents from specific services:

```cel
// Only process incidents from production services
filter: has(webhook.event.data.service) && 
        webhook.event.data.service.summary.contains("Production")
```

### Filter by urgency

Process only high-urgency incidents:

```cel
// Only process high-urgency incidents
filter: webhook.event.data.urgency == "high"
```

### Enrich with custom fields

Add custom context to help Harness AI agent investigation:

```cel
title: webhook.event.data.title
message: |
  PagerDuty Incident #{{webhook.event.data.incident_number}}
  
  Status: {{webhook.event.data.status}}
  Urgency: {{webhook.event.data.urgency}}
  Service: {{webhook.event.data.service.summary}}
  Assigned To: {{assignee}}
  
  Investigate this incident and correlate with recent deployments.
severity: webhook.event.data.urgency == "high" ? "critical" : "medium"
link: webhook.event.data.html_url
custom_fields: {
  "incident_id": webhook.event.data.id,
  "incident_number": string(webhook.event.data.incident_number),
  "pagerduty_status": webhook.event.data.status,
  "service_id": webhook.event.data.service.id
}
```

---

## Troubleshooting

### Webhook not receiving events

**Cause**: PagerDuty webhook not subscribed to events or scope is incorrect.

**Solution**:
- Verify webhook subscription includes the event types you need
- Check that webhook scope covers the services you want to monitor
- Review PagerDuty **Webhook Logs** under webhook configuration
- Ensure incidents are actually being created in the scoped services

### Payload fields are null or missing

**Cause**: PagerDuty payload structure varies by event type, and not all fields are always populated.

**Solution**:
- Use CEL `has()` to check if fields exist before accessing them:

```cel
assignee: has(webhook.event.data.assignments) && 
          size(webhook.event.data.assignments) > 0 
          ? webhook.event.data.assignments[0].assignee.summary 
          : "unassigned"
```

- Check PagerDuty webhook test payload to see actual field values
- For webhook extensions, note that payload structure differs from V3

### High webhook failure rate

**Cause**: Harness webhook timeout or errors processing payload.

**Solution**:
- Check Harness webhook logs for error messages
- Verify field mapping CEL expressions are syntactically valid
- Test CEL expressions in Harness CEL playground
- Ensure Harness webhook is enabled and accessible
- Review PagerDuty retry logs (V3 webhooks retry automatically on 5xx errors)

### Duplicate alerts in Harness

**Cause**: Multiple PagerDuty webhooks or event types triggering the same Harness webhook.

**Solution**:
- Use Harness alert routing rules to deduplicate by `incident_id` tag
- Filter in CEL to process only specific event types:

```cel
filter: webhook.event.event_type == "incident.triggered"
```

- Create separate Harness webhooks for different event types

---

## Example: Complete integration

This example shows a production-ready PagerDuty-to-Harness integration for incident synchronization.

### PagerDuty V3 webhook configuration

- **Scope**: Account (all services)
- **Event types**: `incident.triggered`, `incident.escalated`, `incident.resolved`
- **Filters**:
  - Urgency: High only
  - Services: All

### Harness webhook field mapping

```yaml
title: |
  webhook.event.event_type == "incident.triggered" ? "🚨 New Incident: " :
  webhook.event.event_type == "incident.escalated" ? "⚠️ Escalated: " :
  webhook.event.event_type == "incident.resolved" ? "✅ Resolved: " :
  ""
  + webhook.event.data.title

message: |
  PagerDuty Incident #{{webhook.event.data.incident_number}}
  
  Event: {{webhook.event.event_type}}
  Status: {{webhook.event.data.status}}
  Urgency: {{webhook.event.data.urgency}}
  Priority: {{webhook.event.data.priority.summary}}
  Service: {{webhook.event.data.service.summary}}
  Assigned To: {{assignee}}
  
  Created: {{webhook.event.data.created_at}}
  Link: {{webhook.event.data.html_url}}

severity: |
  webhook.event.data.urgency == "high" ? "critical" : "medium"

source: "pagerduty"
link: "{{webhook.event.data.html_url}}"

tags:
  - "source:pagerduty"
  - "incident_id:{{webhook.event.data.id}}"
  - "incident_number:{{webhook.event.data.incident_number}}"
  - "service:{{webhook.event.data.service.summary}}"
  - "status:{{webhook.event.data.status}}"
  - "urgency:{{webhook.event.data.urgency}}"
  - "priority:{{webhook.event.data.priority.summary}}"
  - "event_type:{{webhook.event.event_type}}"

filter: |
  webhook.event.event_type in ["incident.triggered", "incident.escalated", "incident.resolved"] &&
  webhook.event.data.urgency == "high"

custom_fields:
  incident_id: "{{webhook.event.data.id}}"
  incident_number: "{{webhook.event.data.incident_number}}"
  pagerduty_status: "{{webhook.event.data.status}}"
  service_id: "{{webhook.event.data.service.id}}"
  assignee: "{{assignee}}"
```

### CEL helper for assignee

```cel
assignee: has(webhook.event.data.assignments) && 
          size(webhook.event.data.assignments) > 0 
          ? webhook.event.data.assignments[0].assignee.summary 
          : "unassigned"
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate PagerDuty incidents.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add advanced filtering and transformation logic.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated incident investigation.

---

## Further reading

### PagerDuty Official Documentation
- [V3 Webhooks Overview](https://developer.pagerduty.com/docs/webhooks/v3-overview/) - Complete guide to PagerDuty V3 webhooks, event types, and configuration
- [Webhook Extensions](https://support.pagerduty.com/docs/webhooks) - Legacy webhook extension setup and service-level configuration
- [Webhook Behavior](https://developer.pagerduty.com/docs/webhooks/webhook-behavior/) - Webhook payload structure, event types, and field definitions
- [Incidents API](https://developer.pagerduty.com/api-reference/incidents/) - Incident object structure and field reference
