---
title: Splunk Integration Guide
description: Configure Splunk alerts to send webhooks to Harness AI SRE.
sidebar_label: Splunk
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Splunk to Send Webhooks

Configure Splunk alerts to send webhook notifications to Harness AI SRE when searches detect issues.

## Before you begin

- **Harness webhook endpoint**: Create a webhook in Harness AI SRE. Go to [Create a Webhook](../../create-webhook.md) for setup instructions (Splunk uses a custom webhook configuration).
- **Splunk permissions**: Access to create and modify alerts and webhook alert actions.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **Splunk webhook documentation**: Go to [Use a Webhook Alert Action](https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/latest/configure-alert-actions/use-a-webhook-alert-action) to understand webhook alert action configuration.

---

## Create webhook alert action

### Navigate to alert actions

<Tabs>
<TabItem value="enterprise" label="Splunk Enterprise" default>

1. Navigate to **Settings** → **Alert Actions**
2. Click **Create New Alert Action**
3. Select **Webhook**

</TabItem>
<TabItem value="cloud" label="Splunk Cloud">

Splunk Cloud requires using the **Webhook Alert Action** app or configuring via REST API.

1. Install the **Webhook Alert Action** app from Splunkbase
2. Navigate to **Apps** → **Webhook Alert Action** → **Configuration**

</TabItem>
</Tabs>

### Configure webhook alert action

Configure this field:

- **URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```

The webhook alert action does not expose fields for custom headers, authentication, HTTP method, or content type. Add the target URL to Splunk's webhook allow list if required by your Splunk deployment.

---

## Webhook payload format

The webhook alert action sends a fixed JSON payload. Splunk does not support token substitution, custom templates, or configurable headers for this alert action; the payload structure below is always sent as-is.

```json
{
  "result": {
    "sourcetype": "mongod",
    "count": "8"
  },
  "sid": "scheduler_admin_search_W2_at_14232356_132",
  "results_link": "http://web.example.local:8000/app/search/@go?sid=scheduler_admin_search_W2_at_14232356_132",
  "search_name": null,
  "owner": "admin",
  "app": "search"
}
```

- **`result`**: The first result row of the triggered search, with keys matching the fields in your search results.
- **`sid`**: The search ID (SID) of the triggered saved search.
- **`results_link`**: A URL to the search results in Splunk.
- **`search_name`**: The name of the saved search, or `null` if the search was not saved.
- **`owner`**: The owner of the saved search.
- **`app`**: The Splunk app context the search ran in.

---

## Configure Splunk alert

### Create or edit saved search

1. Run your search query in Splunk
2. Click **Save As** → **Alert**

### Configure alert settings

<Tabs>
<TabItem value="realtime" label="Real-time" default>

**Alert Type**: Real-time

**Trigger Condition**: Per-result (trigger for each result)

**Throttle**: 5 minutes

**Use case**: Immediate response to critical events

</TabItem>
<TabItem value="scheduled" label="Scheduled">

**Alert Type**: Scheduled

**Cron Expression**: `0 * * * *` (hourly)

**Trigger Condition**: Number of results > 0

**Use case**: Periodic summary reports or batch analysis

</TabItem>
</Tabs>

### Add webhook trigger action

1. In **Trigger Actions**, select **Add Actions** → **Webhook**
2. Select the webhook alert action you created for Harness AI SRE
3. Configure action-specific parameters

### Save the alert

Click **Save** to create the alert.

---

## Configure field mapping in Harness

In your Harness webhook configuration, map the fixed Splunk payload fields (`result`, `sid`, `results_link`, `search_name`, `owner`, `app`) to alert properties.

### Basic field mapping

Use Mustache templates for simple field mapping:

```yaml
title: "{{webhook.search_name}}"
message: |
  Splunk alert triggered: {{webhook.search_name}}

  App: {{webhook.app}}
  Owner: {{webhook.owner}}
severity: "medium"
source: "splunk"
link: "{{webhook.results_link}}"
tags:
  - "source:splunk"
  - "search:{{webhook.search_name}}"
  - "app:{{webhook.app}}"
```

### Advanced field mapping with CEL

Use CEL for conditional logic and data transformation:

```cel
// Extract and format alert details
title: webhook.search_name
message: "Splunk alert triggered for search: " + webhook.search_name + "\n\n" +
         "App: " + webhook.app + "\n" +
         "Owner: " + webhook.owner + "\n\n" +
         "First Result:\n" + string(webhook.result)

source: "splunk"
link: webhook.results_link

tags: [
  "source:splunk",
  "search:" + webhook.search_name,
  "sid:" + webhook.sid,
  "app:" + webhook.app
]

// Filter: only process alerts owned by a specific user
filter: webhook.owner == "admin"
```

Because the payload does not include a severity or trigger-time field, derive severity and timing in Harness from the `result` object's fields (which mirror your search's output columns) or set a static severity for the webhook.

---

## Test the integration

### Test from Splunk

1. Open the saved search configured with the webhook
2. Click **Run**
3. Wait for the alert to trigger (or manually trigger if conditions are met)

### Verify in Splunk

1. Navigate to **Activity** → **Triggered Alerts**
2. Find your alert and verify webhook action executed successfully
3. Check for HTTP response code (200 = success)

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the alert appears
3. Verify field mapping:
   - Alert title matches expected format
   - Message includes search results
   - Tags are populated correctly
   - Link navigates to Splunk search results

---

## Webhook payload fields

The webhook alert action always sends these fields. There are no additional tokens available for this alert action:

| Field | Description | Example |
|-------|-------------|---------|
| `result` | The first result row of the triggered search | `{"host": "web-01", "count": "8"}` |
| `sid` | Search job ID | `scheduler_admin_search_W2_at_14232356_132` |
| `results_link` | URL to the search results | `https://splunk.example.com/app/search/@go?sid=...` |
| `search_name` | Saved search name, or `null` if unsaved | `Prod Errors Search` |
| `owner` | Owner of the saved search | `admin` |
| `app` | Splunk app context | `search` |

---

## Advanced configuration

### Real-time monitoring with throttling

For continuous monitoring without overwhelming Harness:

**Splunk alert configuration**:
```
Alert Type: Real-time
Trigger: Per-result
Throttle: 5 minutes
```

**Harness CEL filter**:
```cel
// Deduplicate by search name in Harness
filter: webhook.search_name != null
```

### Scheduled batch analysis

For periodic summary reports:

**Splunk alert configuration**:
```
Alert Type: Scheduled
Cron: 0 * * * * (hourly)
Trigger: Number of results > 0
```

**Harness field mapping**:
```yaml
title: "Hourly Summary: {{webhook.search_name}}"
message: |
  Search {{webhook.search_name}} triggered in app {{webhook.app}}.

  Review the full search results for details.
severity: "info"
link: "{{webhook.results_link}}"
```

### Parse structured search result fields

Because `result` contains only the first row of the triggered search, design your search to surface the fields you need in that row (for example with `stats` or `head 1`):

**Splunk search**:
```spl
index=prod sourcetype=app_logs error
| stats count by error_type, service, host
| head 1
```

**Harness field mapping**:
```cel
title: "Error Spike: " + string(webhook.result.error_type)
message: string(webhook.result.count) + " " + string(webhook.result.error_type) + " errors on " +
         string(webhook.result.service) + " (host: " + string(webhook.result.host) + ")"
tags: [
  "error_type:" + string(webhook.result.error_type),
  "service:" + string(webhook.result.service),
  "host:" + string(webhook.result.host)
]
```

### Route by app

Create separate Harness webhooks for different Splunk apps:

**Application logs webhook**:
```cel
filter: webhook.app == "app_logs"
title: "Application Error: " + webhook.search_name
```

**Security logs webhook**:
```cel
filter: webhook.app == "security_logs"
title: "Security Event: " + webhook.search_name
severity: "critical"
```

---

## Troubleshooting

### Webhook action not triggering

**Cause**: Splunk alert not firing or webhook action not configured.

**Solution**:
- Verify alert trigger condition is met (check **Activity** → **Triggered Alerts**)
- Ensure webhook action is selected in alert's **Trigger Actions**
- Check Splunk `_internal` index for webhook errors:
  ```spl
  index=_internal source=*scheduler* "webhook"
  ```
- Test alert manually by clicking **Run** on the saved search

### HTTP errors from Harness

**Cause**: Invalid webhook URL or payload format.

**Solution**:
- Verify webhook URL is correct (no typos in webhook ID)
- Check payload is valid JSON (test with JSON validator)
- Review Splunk **Alert Action History** for error messages
- Ensure Harness webhook is enabled
- Test webhook manually:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"search_name": "Test", "app": "search", "owner": "admin", "sid": "test-sid", "results_link": "https://splunk.example.com", "result": {}}' \
  https://your-harness-instance/gateway/ai-sre/api/webhooks/<webhook-id>
```

### Field mapping not matching correctly

**Cause**: Field names in your Harness field mapping do not match the actual payload keys (`result`, `sid`, `results_link`, `search_name`, `owner`, `app`).

**Solution**:
- Ensure field names match exactly (case-sensitive)
- Remember that fields inside `result` mirror your search's output columns, not a fixed set of names
- Review Harness webhook logs to see the actual received payload

### Large first-result values causing timeouts

**Cause**: The `result` object includes a large number of fields or large field values from the first row of the search.

**Solution**:
- Narrow your search to return only the fields you need before the alert triggers:
  ```spl
  index=prod error | stats count by host, error_type
  ```
- Increase the Harness webhook timeout if needed

### Missing search_name in payload

**Cause**: `search_name` is `null` when the search that triggered the webhook was not a saved search.

**Solution**:
- Save the search as an alert before attaching the webhook trigger action
- Handle `null` values for `search_name` in your Harness field mapping

---

## Example: Complete integration

This example shows a production-ready Splunk-to-Harness integration for application error monitoring.

### Splunk saved search

```spl
index=prod sourcetype=app_logs level=error
| stats count by error_type, service, host
| where count > 10
| head 1
```

**Schedule**: Real-time, trigger per-result, throttle 5 minutes

### Splunk webhook payload

Splunk sends the fixed payload shape for every trigger, with `result` reflecting the columns from the saved search above:

```json
{
  "result": {
    "error_type": "NullPointerException",
    "service": "payment-processor",
    "host": "web-01",
    "count": "23"
  },
  "sid": "scheduler_admin_search_W2_at_14232356_132",
  "results_link": "https://splunk.example.com/app/search/@go?sid=scheduler_admin_search_W2_at_14232356_132",
  "search_name": "Prod App Error Spike",
  "owner": "admin",
  "app": "search"
}
```

### Harness webhook field mapping

```yaml
title: |
  int(webhook.result.count) > 100 ? "🚨 Critical: " : "⚠️ Warning: "
  + webhook.result.error_type + " errors on " + webhook.result.service

message: |
  Splunk detected {{webhook.result.count}} {{webhook.result.error_type}} errors

  Service: {{webhook.result.service}}
  Host: {{webhook.result.host}}
  Search: {{webhook.search_name}}

  View full results: {{webhook.results_link}}

severity: |
  int(webhook.result.count) > 100 ? "critical" :
  int(webhook.result.count) > 50 ? "high" : "medium"

source: "splunk"
link: "{{webhook.results_link}}"

tags:
  - "source:splunk"
  - "error_type:{{webhook.result.error_type}}"
  - "service:{{webhook.result.service}}"
  - "host:{{webhook.result.host}}"
  - "search:{{webhook.search_name}}"

filter: |
  int(webhook.result.count) > 10 &&
  webhook.result.service in ["api-gateway", "auth-service", "payment-processor"]

custom_fields:
  error_count: "{{webhook.result.count}}"
  sid: "{{webhook.sid}}"
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate Splunk alerts.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add advanced filtering and transformation logic.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated log analysis and correlation.

---

## Further reading

### Splunk Official Documentation
- [Use a Webhook Alert Action](https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/latest/configure-alert-actions/use-a-webhook-alert-action) - Complete guide to webhook alert action configuration and the fixed payload format
- [Webhook Alert Action App](https://splunkbase.splunk.com/app/4334/) - Splunk Cloud webhook configuration and installation
