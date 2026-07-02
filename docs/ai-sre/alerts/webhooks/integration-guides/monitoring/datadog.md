---
title: Datadog Integration Guide
description: Configure Datadog monitors to send webhooks to Harness AI SRE.
sidebar_label: Datadog
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Datadog to Send Webhooks

Configure Datadog monitors to send webhook notifications to Harness AI SRE when alerts trigger.

## Before you begin

- **Harness webhook endpoint**: Create a Datadog webhook in Harness AI SRE using the [Datadog webhook template](../../templates/monitoring/datadog.md).
- **Datadog permissions**: Access to create or modify monitors and integrations in Datadog.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **Datadog webhook documentation**: Go to [Datadog Webhooks Integration](https://docs.datadoghq.com/integrations/webhooks/) to understand Datadog's webhook capabilities.
- **Monitor notification syntax**: Go to [Datadog Monitor Notifications](https://docs.datadoghq.com/monitors/notify/) to learn about notification configuration and template variables.

---

## Create webhook integration in Datadog

### Navigate to Datadog integrations

1. In Datadog, navigate to **Integrations** → **Integrations**
2. Search for and select **Webhooks**
3. Go to the **Configuration** tab
4. Click **New**

### Configure the webhook

Configure these fields:

- **Name**: `harness-ai-sre` (or any descriptive name)
- **URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **Encode as form**: Leave unchecked (use JSON)
- **Custom Headers**: Add if your Harness webhook requires authentication
  ```
  X-Webhook-Secret: your-secret-key
  ```

### Configure the payload

Use the **Payload** field to map Datadog variables to JSON:

<Tabs>
<TabItem value="basic" label="Basic payload" default>

```json
{
  "alert_name": "$EVENT_TITLE",
  "alert_message": "$TEXT_ONLY_MSG",
  "alert_status": "$ALERT_STATUS",
  "priority": "$PRIORITY",
  "metric": "$ALERT_METRIC",
  "service": "$SERVICE",
  "env": "$ENV",
  "alert_url": "$LINK"
}
```

</TabItem>
<TabItem value="advanced" label="Advanced payload">

```json
{
  "alert_name": "$EVENT_TITLE",
  "alert_message": "$TEXT_ONLY_MSG",
  "alert_status": "$ALERT_STATUS",
  "priority": "$PRIORITY",
  "metric": "$ALERT_METRIC",
  "query": "$ALERT_QUERY",
  "service": "$SERVICE",
  "env": "$ENV",
  "host": "$HOSTNAME",
  "alert_id": "$ALERT_ID",
  "alert_url": "$LINK",
  "snapshot": "$SNAPSHOT",
  "last_updated": "$LAST_UPDATED",
  "tags": "$TAGS",
  "org_id": "$ORG_ID",
  "org_name": "$ORG_NAME"
}
```

</TabItem>
<TabItem value="with-context" label="With custom context">

```json
{
  "alert_name": "$EVENT_TITLE",
  "alert_message": "$TEXT_ONLY_MSG",
  "alert_status": "$ALERT_STATUS",
  "priority": "$PRIORITY",
  "service": "$SERVICE",
  "env": "$ENV",
  "alert_url": "$LINK",
  "custom_context": {
    "query": "$ALERT_QUERY",
    "runbook_url": "https://wiki.company.com/runbooks/$SERVICE"
  }
}
```

</TabItem>
</Tabs>

### Save the webhook

Click **Save** to create the webhook integration.

---

## Configure field mapping in Harness

In your Harness webhook configuration, map the Datadog payload fields to alert properties.

### Basic field mapping

Use Mustache templates for simple field mapping:

```yaml
title: "{{webhook.alert_name}}"
message: "{{webhook.alert_message}}"
severity: "{{webhook.priority}}"
source: "datadog"
link: "{{webhook.alert_url}}"
tags:
  - "service:{{webhook.service}}"
  - "env:{{webhook.env}}"
  - "metric:{{webhook.metric}}"
```

### Advanced field mapping with CEL

Use CEL expressions for conditional logic and transformations:

```cel
// Map Datadog priority to Harness severity
title: webhook.alert_name
message: webhook.alert_message
severity: webhook.priority == "P1" ? "critical" :
          webhook.priority == "P2" ? "high" :
          webhook.priority == "P3" ? "medium" : "low"
source: "datadog"
link: webhook.alert_url
tags: [
  "service:" + webhook.service,
  "env:" + webhook.env,
  "status:" + webhook.alert_status.toLowerCase()
]

// Filter: only process alerts (not warnings or recoveries)
filter: webhook.alert_status == "ALERT"
```

---

## Add webhook to Datadog monitors

### Option 1: Add to existing monitor

1. Open the Datadog monitor you want to integrate
2. Scroll to the **Notify your team** section
3. Add the webhook using the `@webhook-` syntax:

```
{{#is_alert}}
@webhook-harness-ai-sre
{{/is_alert}}

{{#is_recovery}}
@webhook-harness-ai-sre
{{/is_recovery}}
```

4. Click **Save**

### Option 2: Add to monitor template

For monitors created from templates:

```
{{#is_alert}}
Alert on {{service.name}} in {{env}}
@webhook-harness-ai-sre
{{/is_alert}}

{{#is_warning}}
Warning on {{service.name}}
@webhook-harness-ai-sre
{{/is_warning}}
```

### Option 3: Use notification policies

Configure Datadog notification policies to automatically add the webhook to matching monitors.

---

## Test the integration

### Test from Datadog

1. Open a monitor configured with the webhook
2. Click **Test Notifications**
3. Select a test scenario (Alert, Warning, Recovery)
4. Click **Run Test**

Datadog sends a test webhook to Harness.

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the test alert appears
3. Verify field mapping:
   - Alert title matches expected format
   - Severity is correct
   - Tags are populated
   - Link works

---

## Available Datadog variables

Datadog provides these template variables for webhook payloads:

| Variable | Description | Example |
|----------|-------------|---------|
| `$EVENT_TITLE` | Monitor name and status | `[Alert] High CPU on prod-server-01` |
| `$TEXT_ONLY_MSG` | Plain text message | `CPU usage above 90% for 5 minutes` |
| `$ALERT_STATUS` | Current status | `ALERT`, `WARNING`, `RECOVERED`, `NO DATA` |
| `$PRIORITY` | Alert priority | `P1`, `P2`, `P3`, `P4`, `P5` |
| `$ALERT_METRIC` | Primary metric name | `system.cpu.user` |
| `$ALERT_QUERY` | Monitor query | `avg(last_5m):avg:system.cpu.user{*} > 0.9` |
| `$SERVICE` | Service tag value | `api-gateway` |
| `$ENV` | Environment tag value | `production` |
| `$HOSTNAME` | Affected host | `prod-server-01` |
| `$ALERT_ID` | Unique alert identifier | `123456789` |
| `$ALERT_CYCLE_KEY` | Alert cycle identifier | `abc123def456` |
| `$LINK` | Link to alert in Datadog | `https://app.datadoghq.com/...` |
| `$SNAPSHOT` | Graph snapshot URL | `https://p.datadoghq.com/...` |
| `$LAST_UPDATED` | Timestamp of last update | `2025-07-01 10:15:30 UTC` |
| `$TAGS` | All monitor tags | `service:api,env:prod` |
| `$ORG_ID` | Datadog organization ID | `12345` |
| `$ORG_NAME` | Organization name | `My Company` |

The current metric value and alert threshold are not exposed as webhook payload variables. Access them with the `{{value}}` and `{{threshold}}` Mustache variables in the monitor message body instead, then include the rendered message in the webhook payload through `$TEXT_ONLY_MSG`.

---

## Advanced configuration

### Filter by alert status

Send different payloads for alerts vs recoveries:

<Tabs>
<TabItem value="alert-only" label="Alerts only" default>

```
{{#is_alert}}
@webhook-harness-ai-sre
{{/is_alert}}
```

</TabItem>
<TabItem value="recovery-only" label="Recoveries only">

```
{{#is_recovery}}
@webhook-harness-ai-sre-recovery
{{/is_recovery}}
```

</TabItem>
<TabItem value="both" label="Both alerts and recoveries">

```
{{#is_alert}}
@webhook-harness-ai-sre
{{/is_alert}}

{{#is_recovery}}
@webhook-harness-ai-sre
{{/is_recovery}}
```

</TabItem>
</Tabs>

### Route by priority

Create separate Harness webhooks for different priorities:

```
{{#is_alert}}
  {{#is_priority 'P1'}}
  @webhook-harness-critical
  {{/is_priority}}

  {{#is_priority 'P2'}}
  @webhook-harness-standard
  {{/is_priority}}
{{/is_alert}}
```

### Include metric values and thresholds

The webhook payload does not carry the metric value or threshold directly. Datadog exposes those only as `{{value}}` and `{{threshold}}` template variables in the monitor **message** body, so include them there and pass the rendered message through to the webhook:

```json
{
  "alert_name": "$EVENT_TITLE",
  "alert_message": "$TEXT_ONLY_MSG",
  "priority": "$PRIORITY",
  "service": "$SERVICE",
  "env": "$ENV",
  "alert_url": "$LINK",
  "context": {
    "query": "$ALERT_QUERY",
    "snapshot_url": "$SNAPSHOT"
  }
}
```

Monitor message body:

```
{{#is_alert}}
Current value: {{value}}
Threshold: {{threshold}}
{{/is_alert}}
```

Harness CEL mapping:

```cel
title: webhook.alert_name
message: webhook.alert_message
severity: webhook.priority == "P1" ? "critical" : "high"
link: webhook.context.snapshot_url
```

---

## Troubleshooting

### Webhook not triggering

**Cause**: Datadog webhook not configured or monitor not firing.

**Solution**:
- Verify webhook appears in **Integrations** → **Webhooks**
- Check monitor notification includes `@webhook-harness-ai-sre`
- Test notification manually from monitor page
- Review Datadog **Event Explorer** for webhook calls

### HTTP 4xx errors

**Cause**: Invalid webhook URL or authentication failure.

**Solution**:
- Verify webhook URL is correct (no typos in webhook ID)
- Check custom headers match Harness webhook configuration
- Ensure Harness webhook is enabled
- Test webhook URL with `curl`:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"alert_name": "Test", "alert_message": "Test message"}' \
  https://your-harness-instance/gateway/ai-sre/api/webhooks/<webhook-id>
```

### Variables not mapping correctly

**Cause**: Field names in Harness configuration do not match Datadog payload.

**Solution**:
- Review the actual webhook payload sent by Datadog (check Datadog webhook logs)
- Ensure field names match exactly (case-sensitive)
- Use CEL `has()` to check if fields exist:

```cel
filter: has(webhook.service) && webhook.service != ""
```

### Rate limiting issues

**Cause**: High-frequency Datadog alerts overwhelming Harness.

**Solution**:
- Configure Datadog monitor to re-notify less frequently
- Use Harness alert routing rules to deduplicate similar alerts
- Add debounce logic in Harness webhook CEL:

```cel
// Only process if not seen in last 5 minutes
filter: !has(webhook.alert_cycle_key) || 
        (now - timestamp(webhook.last_updated)) > duration("5m")
```

---

## Example: Complete integration

This example shows a production-ready Datadog-to-Harness integration for a microservices platform.

### Datadog webhook payload

```json
{
  "alert_name": "$EVENT_TITLE",
  "alert_message": "$TEXT_ONLY_MSG",
  "alert_status": "$ALERT_STATUS",
  "priority": "$PRIORITY",
  "metric": "$ALERT_METRIC",
  "service": "$SERVICE",
  "env": "$ENV",
  "alert_url": "$LINK",
  "snapshot": "$SNAPSHOT",
  "timestamp": "$LAST_UPDATED",
  "tags": "$TAGS"
}
```

### Harness webhook field mapping

```yaml
title: "{{webhook.alert_name}}"
message: |
  {{webhook.alert_message}}
  
  Metric: {{webhook.metric}}
severity: |
  webhook.priority == "P1" ? "critical" :
  webhook.priority == "P2" ? "high" :
  webhook.priority == "P3" ? "medium" : "low"
source: "datadog"
link: "{{webhook.alert_url}}"
tags:
  - "source:datadog"
  - "service:{{webhook.service}}"
  - "env:{{webhook.env}}"
  - "metric:{{webhook.metric}}"
filter: |
  webhook.alert_status == "ALERT" && 
  webhook.env in ["production", "staging"]
```

### Datadog monitor notification

```
{{#is_alert}}
Production alert on {{service.name}}

Current: {{value}}
Threshold: {{threshold}}

@webhook-harness-ai-sre
@slack-platform-alerts
{{/is_alert}}

{{#is_recovery}}
✅ Recovered: {{service.name}}
@webhook-harness-ai-sre
{{/is_recovery}}
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate Datadog alerts.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add advanced filtering logic.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated alert investigation.

---

## Further reading

### Datadog Official Documentation
- [Webhooks Integration](https://docs.datadoghq.com/integrations/webhooks/) - Complete guide to Datadog webhook integration setup and configuration
- [Monitor Notifications](https://docs.datadoghq.com/monitors/notify/) - Monitor notification configuration and `@webhook` syntax
- [Template Variables Reference](https://docs.datadoghq.com/monitors/notify/variables/) - Complete list of available template variables (`$EVENT_TITLE`, `$PRIORITY`, `$SERVICE`, etc.)
- [Webhook Template Variables](https://docs.datadoghq.com/integrations/webhooks/#template-variables) - Webhook-specific variables and payload customization
