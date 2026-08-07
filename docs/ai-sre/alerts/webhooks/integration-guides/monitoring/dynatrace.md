---
title: Dynatrace Integration Guide
description: Send problem notifications through webhooks.
sidebar_label: Dynatrace
sidebar_position: 2
keywords:
  - Dynatrace
  - webhook
  - AI SRE
  - integration
tags:
  - ai-sre
  - webhooks
  - dynatrace
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Configure Dynatrace to send webhook notifications to Harness AI SRE when problems are detected.

## Before you begin

- **Harness webhook endpoint**: Create a Dynatrace webhook in Harness AI SRE using the [Dynatrace webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/dynatrace).
- **Dynatrace permissions**: Access to configure problem notifications and integrations.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **Dynatrace webhook documentation**: Go to [Problem Notifications](https://www.dynatrace.com/support/help/observe-and-explore/notifications-and-alerting/problem-notifications) to understand notification configuration.
- **Webhook integration reference**: Go to [Webhook Integration](https://www.dynatrace.com/support/help/observe-and-explore/notifications-and-alerting/problem-notifications/webhook-integration) for webhook-specific setup.

---

## Create webhook notification in Dynatrace

### Navigate to notifications

Open the problem notifications page to add a custom integration:

1. In Dynatrace, go to **Settings**, then **Integration**, then **Problem notifications**
2. Click **Add notification**
3. Select **Custom integration**

### Configure webhook

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

Configure these fields:

- **Display name**: `Harness AI SRE`
- **Webhook URL**: Your Harness webhook URL
- **Notification settings**: Configure when to call the webhook
  - Call the webhook when new events merge into an existing problem
  - Notify the webhook when a problem closes (in addition to the default open-problem notification)

</TabItem>
<TabItem value="payload" label="Custom payload">

Use a custom payload template:

```json
{
  "State": "{State}",
  "ProblemID": "{ProblemID}",
  "ProblemTitle": "{ProblemTitle}",
  "ProblemDetails": "{ProblemDetailsText}",
  "ImpactedEntity": "{ImpactedEntity}",
  "ProblemSeverity": "{ProblemSeverity}",
  "ProblemURL": "{ProblemURL}",
  "Tags": "{Tags}"
}
```

</TabItem>
<TabItem value="filters" label="With filters">

Dynatrace filters which problems trigger the webhook through an **alerting profile** assigned to the notification, rather than through filter fields on the notification screen itself. Configure the alerting profile to filter by:

- **Severity**: Availability, Error, Slowdown, Resource, Custom, or Monitoring unavailable
- **Tags**: Filter by specific tags
- **Management zones**: Limit to specific zones
- **Problem duration and text filters**: Further narrow which problems generate notifications

</TabItem>
</Tabs>

### Test the notification

Send a test notification and activate it:

1. Click **Send test notification**
2. Verify the test appears in Harness AI SRE
3. Click **Save** to activate the notification

---

## Configure field mapping in Harness

Map Dynatrace problem fields to Harness alert properties.

### Basic field mapping example

```yaml
title: "{{webhook.ProblemTitle}}"
message: |
  {{webhook.ProblemDetails}}
  
  Impacted Entity: {{webhook.ImpactedEntity}}
severity: |
  webhook.ProblemSeverity == "ERROR" ? "critical" :
  webhook.ProblemSeverity == "WARNING" ? "high" :
  webhook.ProblemSeverity == "RESOURCE_CONTENTION" ? "medium" : "low"
source: "dynatrace"
link: "{{webhook.ProblemURL}}"
tags:
  - "source:dynatrace"
  - "problem_id:{{webhook.ProblemID}}"
  - "state:{{webhook.State}}"
```

### Advanced filtering with CEL

```cel
// Only process open problems
filter: webhook.State == "OPEN"

// Filter by severity
filter: webhook.ProblemSeverity in ["ERROR", "WARNING"]

// Filter by impacted entity type
filter: webhook.ImpactedEntity.contains("SERVICE")
```

---

## Available Dynatrace fields

| Field | Description | Example |
|-------|-------------|---------|
| `State` | Problem state | `OPEN`, `RESOLVED` |
| `ProblemID` | Unique problem identifier | `-1234567890123456789_1234V2` |
| `ProblemTitle` | Problem summary | `Response time degradation` |
| `ProblemDetails` | Detailed description | `Response time increased by 200%` |
| `ImpactedEntity` | Affected entity name | `SERVICE-ABC123` |
| `ProblemSeverity` | Severity level | `ERROR`, `WARNING` |
| `ProblemURL` | Link to problem in Dynatrace | `https://abc123.live.dynatrace.com/...` |
| `Tags` | Associated tags | `environment:production` |

---

## Troubleshooting

<Troubleshoot
  issue="Dynatrace webhook is not triggering for Harness AI SRE"
  mode="docs"
  fallback="Verify the notification is enabled in Dynatrace, check that the problem severity matches your filter criteria, use 'Send test notification' to verify the webhook URL, and review the Dynatrace notification logs."
/>

<Troubleshoot
  issue="Dynatrace problems are not creating alerts in Harness AI SRE"
  mode="docs"
  fallback="Check that the CEL filter expressions allow the problem through, verify required fields (title, message) are mapped, test with a simpler payload first, and review the Harness webhook logs for errors."
/>

<Troubleshoot
  issue="Dynatrace is creating duplicate alerts for the same problem in Harness AI SRE"
  mode="docs"
  fallback="Use the problem ID for deduplication in route alerts, configure Dynatrace to only send 'Open problems' notifications, and add the CEL filter webhook.State == 'OPEN'."
/>

---

## Next steps

- [Route alerts](/docs/ai-sre/alerts/alert-rules/overview): Route Dynatrace problems.
- [Use CEL in webhooks](/docs/ai-sre/alerts/webhooks/use-cel-webhooks): Add advanced filtering.
- [Dynatrace webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/dynatrace): Review template details.

---

## Related documentation

### Dynatrace official documentation
- [Problem notifications](https://www.dynatrace.com/support/help/observe-and-explore/notifications-and-alerting/problem-notifications): Complete guide to problem notification configuration.
- [Webhook integration](https://www.dynatrace.com/support/help/observe-and-explore/notifications-and-alerting/problem-notifications/webhook-integration): Webhook-specific setup and payload structure.
- [Problem API](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/problems-v2): Problem object structure and field definitions.
- [Placeholder reference](https://www.dynatrace.com/support/help/observe-and-explore/notifications-and-alerting/problem-notifications/webhook-integration#placeholder-reference): Available placeholder variables for custom payloads.
