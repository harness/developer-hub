---
title: Prometheus AlertManager Integration Guide
description: Configure Prometheus AlertManager to send webhooks to Harness AI SRE.
sidebar_label: Prometheus AlertManager
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Prometheus AlertManager to Send Webhooks

Configure Prometheus AlertManager to send webhook notifications to Harness AI SRE when alerts fire.

## Before you begin

- **Harness webhook endpoint**: Create a Prometheus webhook in Harness AI SRE using the [Prometheus webhook template](../../templates/monitoring/prometheus.md).
- **AlertManager access**: Permissions to modify AlertManager configuration.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **AlertManager configuration documentation**: Go to [Prometheus AlertManager Configuration](https://prometheus.io/docs/alerting/latest/configuration/) to understand AlertManager setup and routing rules.
- **Webhook receiver reference**: Go to [Webhook Config](https://prometheus.io/docs/alerting/latest/configuration/#webhook_config) for webhook-specific configuration options.

---

## Configure AlertManager webhook receiver

### Edit AlertManager configuration

AlertManager configuration is typically in `alertmanager.yml`. Add a webhook receiver configuration.

### Add webhook receiver

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

```yaml
route:
  receiver: 'harness-ai-sre'
  routes:
    - match:
        severity: critical
      receiver: 'harness-ai-sre'

receivers:
  - name: 'harness-ai-sre'
    webhook_configs:
      - url: 'https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>'
        send_resolved: true
```

</TabItem>
<TabItem value="with-headers" label="With authentication">

```yaml
receivers:
  - name: 'harness-ai-sre'
    webhook_configs:
      - url: 'https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>'
        send_resolved: true
        http_config:
          authorization:
            credentials: 'your-webhook-secret'
```

</TabItem>
<TabItem value="advanced" label="Advanced routing">

```yaml
route:
  receiver: 'default'
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  routes:
    # Critical alerts to Harness
    - match:
        severity: critical
      receiver: 'harness-ai-sre'
      continue: true
    
    # Production alerts to Harness
    - match:
        environment: production
      receiver: 'harness-ai-sre'
      continue: true

receivers:
  - name: 'harness-ai-sre'
    webhook_configs:
      - url: 'https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>'
        send_resolved: true
        max_alerts: 0  # Send all alerts
```

</TabItem>
</Tabs>

### Reload AlertManager configuration

After updating the configuration:

```bash
# Send SIGHUP to reload config
kill -HUP $(pidof alertmanager)

# Or use the API
curl -X POST http://localhost:9093/-/reload
```

---

## Configure field mapping in Harness

In your Harness webhook configuration, map AlertManager payload fields to alert properties.

### AlertManager webhook payload structure

```json
{
  "version": "4",
  "receiver": "harness-ai-sre",
  "status": "firing",
  "truncatedAlerts": 0,
  "alerts": [
    {
      "status": "firing",
      "labels": {
        "alertname": "HighMemoryUsage",
        "severity": "critical",
        "instance": "localhost:9090",
        "job": "prometheus",
        "service": "api-gateway",
        "environment": "production"
      },
      "annotations": {
        "summary": "Memory usage above 90%",
        "description": "Instance localhost:9090 has memory usage of 95%"
      },
      "startsAt": "2025-07-01T10:30:00.000Z",
      "endsAt": "0001-01-01T00:00:00Z",
      "generatorURL": "http://prometheus:9090/graph?g0.expr=...",
      "fingerprint": "a1b2c3d4e5f6"
    }
  ],
  "groupLabels": {
    "alertname": "HighMemoryUsage"
  },
  "commonLabels": {
    "alertname": "HighMemoryUsage",
    "severity": "critical"
  },
  "commonAnnotations": {
    "summary": "Memory usage above 90%"
  },
  "externalURL": "http://alertmanager:9093"
}
```

### Basic field mapping

Use Mustache templates:

```yaml
title: "{{webhook.alerts[0].labels.alertname}}"
message: "{{webhook.alerts[0].annotations.description}}"
severity: "{{webhook.alerts[0].labels.severity}}"
source: "prometheus"
link: "{{webhook.alerts[0].generatorURL}}"
tags:
  - "alertname:{{webhook.alerts[0].labels.alertname}}"
  - "instance:{{webhook.alerts[0].labels.instance}}"
  - "service:{{webhook.alerts[0].labels.service}}"
  - "environment:{{webhook.alerts[0].labels.environment}}"
```

### Advanced field mapping with CEL

```cel
// Extract first alert from the batch
title: size(webhook.alerts) > 0 ? webhook.alerts[0].labels.alertname : "Alert"
message: size(webhook.alerts) > 0 ? webhook.alerts[0].annotations.description : ""

// Map Prometheus severity to Harness severity
severity: size(webhook.alerts) > 0 && has(webhook.alerts[0].labels.severity)
  ? (webhook.alerts[0].labels.severity == "critical" ? "critical" :
     webhook.alerts[0].labels.severity == "warning" ? "high" : "medium")
  : "medium"

source: "prometheus"
link: size(webhook.alerts) > 0 ? webhook.alerts[0].generatorURL : ""

// Extract all labels as tags
tags: size(webhook.alerts) > 0 
  ? webhook.alerts[0].labels.keys().map(k, k + ":" + string(webhook.alerts[0].labels[k]))
  : []

// Filter: only process firing alerts
filter: webhook.status == "firing" && size(webhook.alerts) > 0
```

---

## Handle multiple alerts in batch

AlertManager sends alerts in batches. Handle multiple alerts:

### Option 1: Process first alert only

Use the CEL above with `webhook.alerts[0]`.

### Option 2: Process all alerts separately

Configure AlertManager to send one alert per webhook:

```yaml
receivers:
  - name: 'harness-ai-sre'
    webhook_configs:
      - url: 'https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>'
        send_resolved: true
        max_alerts: 1  # Send one alert at a time
```

### Option 3: Create summary alert

Combine multiple alerts into one:

```cel
title: "Prometheus Alert Batch: " + string(size(webhook.alerts)) + " alerts"
message: webhook.alerts.map(a, 
  a.labels.alertname + ": " + a.annotations.summary
).join("\n")
severity: webhook.commonLabels.severity
```

---

## Test the integration

### Trigger a test alert

Create a test alert in Prometheus:

```yaml
# Add to prometheus.yml rules
groups:
  - name: test
    interval: 10s
    rules:
      - alert: TestAlert
        expr: vector(1)
        for: 0m
        labels:
          severity: warning
          service: test
        annotations:
          summary: Test alert for Harness integration
          description: This is a test alert
```

Reload Prometheus rules:

```bash
curl -X POST http://localhost:9090/-/reload
```

### Verify in AlertManager

Check AlertManager UI at `http://localhost:9093` to see the alert.

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the test alert appears
3. Verify field mapping is correct

---

## Available AlertManager fields

| Field | Description | Example |
|-------|-------------|---------|
| `version` | Webhook payload format version | `4` |
| `status` | Alert batch status | `firing`, `resolved` |
| `truncatedAlerts` | Number of alerts truncated due to `max_alerts` | `0` |
| `alerts` | Array of alerts | See payload structure |
| `alerts[].status` | Individual alert status | `firing`, `resolved` |
| `alerts[].labels` | Alert labels (key-value) | `{"alertname": "HighCPU", "severity": "critical"}` |
| `alerts[].annotations` | Alert annotations | `{"summary": "...", "description": "..."}` |
| `alerts[].startsAt` | Alert start time | `2025-07-01T10:30:00.000Z` |
| `alerts[].endsAt` | Alert end time (for resolved) | `2025-07-01T10:35:00.000Z` |
| `alerts[].generatorURL` | Link to Prometheus query | `http://prometheus:9090/graph?...` |
| `alerts[].fingerprint` | Unique alert identifier | `a1b2c3d4e5f6` |
| `groupLabels` | Labels used for grouping | `{"alertname": "HighCPU"}` |
| `commonLabels` | Labels common to all alerts | `{"severity": "critical"}` |
| `commonAnnotations` | Annotations common to all | `{"summary": "..."}` |
| `externalURL` | AlertManager URL | `http://alertmanager:9093` |

---

## Advanced configuration

### Route by severity

Send only critical alerts to Harness:

```yaml
route:
  routes:
    - match:
        severity: critical
      receiver: 'harness-critical'
    - match:
        severity: warning
      receiver: 'harness-warning'

receivers:
  - name: 'harness-critical'
    webhook_configs:
      - url: 'https://harness/webhooks/critical-webhook-id'
  
  - name: 'harness-warning'
    webhook_configs:
      - url: 'https://harness/webhooks/warning-webhook-id'
```

### Filter by label

Send alerts matching specific labels:

```yaml
route:
  routes:
    - match:
        team: platform
        environment: production
      receiver: 'harness-ai-sre'
```

### Inhibition rules

Prevent lower-severity alerts when critical alerts are firing:

```yaml
inhibit_rules:
  - source_match:
      severity: critical
    target_match:
      severity: warning
    equal: ['alertname', 'instance']
```

---

## Troubleshooting

### Webhook not sending

**Cause**: AlertManager configuration error or network issue.

**Solution**:
- Check AlertManager logs: `docker logs alertmanager`
- Verify configuration syntax: `amtool check-config alertmanager.yml`
- Test webhook URL manually:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"status":"firing","alerts":[{"labels":{"alertname":"Test"}}]}' \
  https://your-harness-instance/gateway/ai-sre/api/webhooks/<webhook-id>
```

### Alerts not appearing in Harness

**Cause**: Field mapping incorrect or CEL filter blocking alerts.

**Solution**:
- Check Harness webhook logs for errors
- Verify CEL filter logic (remove filter temporarily to test)
- Inspect raw payload in AlertManager webhook logs

### Multiple duplicate alerts

**Cause**: AlertManager grouping configuration or Harness not deduplicating.

**Solution**:
- Adjust AlertManager `group_by` and `group_interval`
- Use Harness alert routing rules to deduplicate by fingerprint:

```cel
// In Harness CEL
filter: !has(webhook.alerts[0].fingerprint) || 
        // Add deduplication logic
```

### Resolved alerts not clearing

**Cause**: `send_resolved: false` in webhook config.

**Solution**:
- Set `send_resolved: true` in AlertManager webhook config
- Handle resolved status in Harness:

```cel
severity: webhook.status == "resolved" ? "info" : 
          (webhook.alerts[0].labels.severity == "critical" ? "critical" : "high")
```

---

## Example: Complete integration

### AlertManager configuration

```yaml
global:
  resolve_timeout: 5m

route:
  receiver: 'default'
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  routes:
    - match_re:
        severity: ^(critical|warning)$
      receiver: 'harness-ai-sre'
      continue: true

receivers:
  - name: 'default'
    webhook_configs:
      - url: 'http://localhost:5001/default'
  
  - name: 'harness-ai-sre'
    webhook_configs:
      - url: 'https://app.harness.io/gateway/ai-sre/api/webhooks/wh_abc123'
        send_resolved: true
        max_alerts: 1
        http_config:
          follow_redirects: true

inhibit_rules:
  - source_match:
      severity: critical
    target_match:
      severity: warning
    equal: ['alertname', 'cluster', 'service']
```

### Harness webhook field mapping

```yaml
title: |
  webhook.alerts[0].labels.alertname + 
  " (" + webhook.alerts[0].labels.service + ")"

message: |
  **Alert**: {{webhook.alerts[0].labels.alertname}}
  **Status**: {{webhook.status}}
  **Severity**: {{webhook.alerts[0].labels.severity}}
  **Instance**: {{webhook.alerts[0].labels.instance}}
  **Service**: {{webhook.alerts[0].labels.service}}
  **Environment**: {{webhook.alerts[0].labels.environment}}
  
  **Summary**: {{webhook.alerts[0].annotations.summary}}
  **Description**: {{webhook.alerts[0].annotations.description}}
  
  **Started At**: {{webhook.alerts[0].startsAt}}
  **Generator URL**: {{webhook.alerts[0].generatorURL}}

severity: |
  webhook.status == "resolved" ? "info" :
  webhook.alerts[0].labels.severity == "critical" ? "critical" :
  webhook.alerts[0].labels.severity == "warning" ? "high" : "medium"

source: "prometheus"
link: "{{webhook.alerts[0].generatorURL}}"

tags:
  - "source:prometheus"
  - "alertname:{{webhook.alerts[0].labels.alertname}}"
  - "severity:{{webhook.alerts[0].labels.severity}}"
  - "service:{{webhook.alerts[0].labels.service}}"
  - "environment:{{webhook.alerts[0].labels.environment}}"
  - "instance:{{webhook.alerts[0].labels.instance}}"
  - "status:{{webhook.status}}"
  - "fingerprint:{{webhook.alerts[0].fingerprint}}"

filter: |
  webhook.status == "firing" && 
  size(webhook.alerts) > 0 &&
  has(webhook.alerts[0].labels.severity)

custom_fields:
  fingerprint: "{{webhook.alerts[0].fingerprint}}"
  generator_url: "{{webhook.alerts[0].generatorURL}}"
  alertmanager_url: "{{webhook.externalURL}}"
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate Prometheus alerts.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add advanced filtering and batching logic.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated alert investigation.
- Go to [Prometheus Template](../../templates/monitoring/prometheus.md) for the pre-configured template.

---

## Further reading

### Prometheus Official Documentation
- [AlertManager Configuration](https://prometheus.io/docs/alerting/latest/configuration/) - Complete guide to AlertManager configuration, webhook receivers, and routing rules
- [Webhook Config](https://prometheus.io/docs/alerting/latest/configuration/#webhook_config) - Webhook receiver configuration options (`url`, `send_resolved`, `max_alerts`, `http_config`)
- [Notifications](https://prometheus.io/docs/alerting/latest/notifications/) - Webhook payload format, alerts array structure, labels, and annotations
- [Notification Examples](https://prometheus.io/docs/alerting/latest/notification_examples/) - Example webhook payloads and field names
