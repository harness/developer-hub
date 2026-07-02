---
title: Grafana Integration Guide
description: Configure Grafana Unified Alerting to send webhooks to Harness AI SRE.
sidebar_label: Grafana
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Grafana to Send Webhooks

Configure Grafana Unified Alerting to send webhook notifications to Harness AI SRE when alerts fire.

## Before you begin

- **Harness webhook endpoint**: Create a Grafana webhook in Harness AI SRE using the [Grafana webhook template](../../templates/monitoring/grafana.md).
- **Grafana access**: Admin permissions to configure contact points and notification policies.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **Grafana version**: This guide covers Grafana 8.0+ with Unified Alerting. For legacy alerting, see Grafana documentation.
- **Unified Alerting documentation**: Go to [Grafana Unified Alerting](https://grafana.com/docs/grafana/latest/alerting/) to understand contact points and notification policies.
- **Webhook configuration reference**: Go to [Manage Contact Points](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) for webhook setup details.

---

## Create webhook contact point

### Navigate to alerting configuration

1. In Grafana, go to **Alerting** → **Contact points**
2. Click **New contact point**

### Configure webhook contact point

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

- **Name**: `Harness AI SRE`
- **Integration**: Select **Webhook**
- **URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **HTTP Method**: `POST`

</TabItem>
<TabItem value="with-auth" label="With authentication">

- **Name**: `Harness AI SRE`
- **Integration**: Select **Webhook**
- **URL**: Your Harness webhook URL
- **HTTP Method**: `POST`
- **Authorization**: Add custom header
  - **Header**: `X-Webhook-Secret`
  - **Value**: `your-secret-key`

</TabItem>
<TabItem value="advanced" label="Advanced settings">

- **Name**: `Harness AI SRE`
- **Integration**: Select **Webhook**
- **URL**: Your Harness webhook URL
- **HTTP Method**: `POST`
- **Max alerts**: Leave blank to send all alerts
- **Disable resolved message**: Uncheck to send resolved notifications
- **HTTP settings**:
  - **Authorization**: Custom header if needed
  - **User**: Leave blank
  - **Password**: Leave blank

</TabItem>
</Tabs>

### Test contact point

Click **Test** to send a test notification and verify the webhook is reachable.

### Save contact point

Click **Save contact point** to create the webhook integration.

---

## Configure notification policy

### Edit default notification policy

1. Go to **Alerting** → **Notification policies**
2. Edit the **Default policy** or create a new nested policy
3. Select **Harness AI SRE** as the contact point

### Create specific routing policy

For selective alert routing:

1. Click **New nested policy**
2. Configure matching labels:
   - **Label**: `severity`
   - **Operator**: `=`
   - **Value**: `critical`
3. Select **Harness AI SRE** contact point
4. Click **Save policy**

---

## Configure field mapping in Harness

In your Harness webhook configuration, map Grafana payload fields to alert properties.

### Grafana webhook payload structure

```json
{
  "receiver": "Harness AI SRE",
  "status": "firing",
  "alerts": [
    {
      "status": "firing",
      "labels": {
        "alertname": "High CPU Usage",
        "grafana_folder": "Production",
        "severity": "critical",
        "instance": "prod-server-01",
        "job": "node-exporter"
      },
      "annotations": {
        "summary": "CPU usage above 90%",
        "description": "Server prod-server-01 has CPU usage at 95%",
        "runbook_url": "https://wiki.company.com/runbooks/high-cpu"
      },
      "startsAt": "2025-07-01T10:30:00.000Z",
      "endsAt": "0001-01-01T00:00:00Z",
      "generatorURL": "https://grafana.example.com/alerting/grafana/abc123/view",
      "fingerprint": "a1b2c3d4e5f6",
      "silenceURL": "https://grafana.example.com/alerting/silence/new?...",
      "dashboardURL": "https://grafana.example.com/d/dashboard-id",
      "panelURL": "https://grafana.example.com/d/dashboard-id?viewPanel=1",
      "values": {
        "B": 95.2
      }
    }
  ],
  "groupLabels": {
    "alertname": "High CPU Usage"
  },
  "commonLabels": {
    "alertname": "High CPU Usage",
    "severity": "critical"
  },
  "commonAnnotations": {
    "summary": "CPU usage above 90%"
  },
  "externalURL": "https://grafana.example.com",
  "version": "1",
  "groupKey": "{}:{alertname=\"High CPU Usage\"}",
  "truncatedAlerts": 0,
  "orgId": 1,
  "title": "[FIRING:1] High CPU Usage (prod-server-01)",
  "state": "alerting",
  "message": "**Firing**\n\nValue: [ var='A' labels={instance=prod-server-01} value=95.2 ]\nLabels:\n - alertname = High CPU Usage\n - severity = critical\nAnnotations:\n - summary = CPU usage above 90%\n"
}
```

### Basic field mapping

Use Mustache templates:

```yaml
title: "{{webhook.title}}"
message: "{{webhook.message}}"
severity: "{{webhook.commonLabels.severity}}"
source: "grafana"
link: "{{webhook.externalURL}}"
tags:
  - "alertname:{{webhook.alerts[0].labels.alertname}}"
  - "grafana_folder:{{webhook.alerts[0].labels.grafana_folder}}"
  - "instance:{{webhook.alerts[0].labels.instance}}"
```

### Advanced field mapping with CEL

```cel
// Use Grafana's pre-formatted title
title: webhook.title

// Use Grafana's pre-formatted message or build custom
message: size(webhook.alerts) > 0 
  ? webhook.alerts[0].annotations.description + "\n\n" +
    "Dashboard: " + webhook.alerts[0].dashboardURL + "\n" +
    "Panel: " + webhook.alerts[0].panelURL
  : webhook.message

// Map Grafana severity to Harness severity
severity: has(webhook.commonLabels.severity)
  ? (webhook.commonLabels.severity == "critical" ? "critical" :
     webhook.commonLabels.severity == "warning" ? "high" : "medium")
  : "medium"

source: "grafana"
link: size(webhook.alerts) > 0 ? webhook.alerts[0].generatorURL : webhook.externalURL

// Extract all labels as tags
tags: size(webhook.alerts) > 0
  ? webhook.alerts[0].labels.keys().map(k, k + ":" + string(webhook.alerts[0].labels[k]))
  : []

// Filter: only firing alerts
filter: webhook.status == "firing" && size(webhook.alerts) > 0
```

---

## Test the integration

### Create test alert rule

1. Go to **Alerting** → **Alert rules**
2. Click **New alert rule**
3. Configure a simple test rule:
   - **Alert rule name**: `Test Harness Integration`
   - **Query**: Use a test query that always fires
   - **Condition**: Set threshold that will trigger
   - **Evaluate every**: `1m`
   - **For**: `0m`
4. Add labels:
   - `severity`: `warning`
   - `test`: `true`
5. Add annotations:
   - `summary`: `Test alert for Harness integration`
6. Select notification policy or contact point
7. Click **Save rule and exit**

### Verify in Grafana

1. Go to **Alerting** → **Alert rules**
2. Wait for the rule to evaluate and fire
3. Check **Contact points** → **Harness AI SRE** for recent notifications

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the test alert appears
3. Verify field mapping is correct

---

## Available Grafana fields

| Field | Description | Example |
|-------|-------------|---------|
| `receiver` | Contact point name | `Harness AI SRE` |
| `status` | Alert status | `firing`, `resolved` |
| `alerts` | Array of firing alerts | See payload structure |
| `alerts[].labels` | Alert labels | `{"alertname": "...", "severity": "critical"}` |
| `alerts[].annotations` | Alert annotations | `{"summary": "...", "description": "..."}` |
| `alerts[].startsAt` | Alert start time | `2025-07-01T10:30:00.000Z` |
| `alerts[].endsAt` | Alert end time | `0001-01-01T00:00:00Z` (if not resolved) |
| `alerts[].generatorURL` | Link to alert rule | `https://grafana.../alerting/.../view` |
| `alerts[].dashboardURL` | Link to dashboard | `https://grafana.../d/dashboard-id` |
| `alerts[].panelURL` | Link to specific panel | `https://grafana.../d/dashboard-id?viewPanel=1` |
| `alerts[].fingerprint` | Unique alert ID | `a1b2c3d4e5f6` |
| `alerts[].values` | Query result values, keyed by refID | `{"B": 95.2}` |
| `title` | Pre-formatted alert title | `[FIRING:1] High CPU Usage` |
| `message` | Pre-formatted alert message | Multi-line formatted message |
| `groupLabels` | Labels used for grouping | `{"alertname": "..."}` |
| `commonLabels` | Labels common to all alerts | `{"severity": "critical"}` |
| `commonAnnotations` | Annotations common to all | `{"summary": "..."}` |
| `externalURL` | Grafana instance URL | `https://grafana.example.com` |

---

## Advanced configuration

### Route by folder

Send alerts from specific Grafana folders to different Harness webhooks:

**Grafana notification policy**:
1. Create nested policy with label matcher:
   - **Label**: `grafana_folder`
   - **Operator**: `=`
   - **Value**: `Production`
2. Select appropriate contact point

### Route by data source

Label alerts by data source and route accordingly:

**Alert rule labels**:
```yaml
labels:
  severity: critical
  datasource: prometheus
  team: platform
```

**Notification policy matcher**:
- **Label**: `datasource`
- **Operator**: `=`
- **Value**: `prometheus`

### Silence alerts

Use Grafana's silence URL in Harness:

```cel
// Include silence link in message
message: webhook.alerts[0].annotations.description + "\n\n" +
         "Silence this alert: " + webhook.alerts[0].silenceURL
```

### Multi-dimensional alerts

Grafana supports multi-dimensional alerting. Access all dimensions:

```cel
// Extract all label dimensions
tags: size(webhook.alerts) > 0
  ? webhook.alerts[0].labels.keys().map(k, k + ":" + string(webhook.alerts[0].labels[k]))
  : []
```

---

## Troubleshooting

### Webhook not sending

**Cause**: Contact point configuration error or network issue.

**Solution**:
- Test contact point from Grafana UI
- Check Grafana logs: `docker logs grafana` or check `/var/log/grafana/`
- Verify webhook URL is accessible from Grafana server
- Check for firewall or proxy blocking outbound requests

### Alerts not appearing in Harness

**Cause**: Field mapping incorrect or CEL filter blocking.

**Solution**:
- Check Harness webhook logs for errors
- Inspect raw payload in Grafana contact point test
- Verify CEL filter logic (temporarily remove filter to test)
- Ensure required fields exist in payload

### Resolved alerts not clearing

**Cause**: Resolved notifications disabled in contact point.

**Solution**:
- Ensure **Disable resolved message** is unchecked in contact point
- Handle resolved status in Harness CEL:

```cel
severity: webhook.status == "resolved" ? "info" :
          (webhook.commonLabels.severity == "critical" ? "critical" : "high")
```

### Duplicate alerts

**Cause**: Notification policy routing or Grafana grouping configuration.

**Solution**:
- Review notification policy routes (ensure no overlapping matchers)
- Adjust group wait/interval in notification policy:
  - **Group wait**: `10s`
  - **Group interval**: `5m`
  - **Repeat interval**: `4h`

---

## Example: Complete integration

### Grafana contact point configuration

- **Name**: `Harness AI SRE`
- **Integration**: Webhook
- **URL**: `https://app.harness.io/gateway/ai-sre/api/webhooks/wh_abc123`
- **HTTP Method**: POST
- **Disable resolved message**: Unchecked

### Grafana notification policy

```
Root policy
├─ Default contact point: Harness AI SRE
├─ Group by: [alertname, grafana_folder]
├─ Group wait: 10s
├─ Group interval: 5m
├─ Repeat interval: 4h
└─ Nested policies:
   ├─ severity = critical → Harness AI SRE (immediate)
   └─ grafana_folder = Production → Harness AI SRE
```

### Harness webhook field mapping

```yaml
title: "{{webhook.title}}"

message: |
  **Alert**: {{webhook.alerts[0].labels.alertname}}
  **Status**: {{webhook.status}}
  **Severity**: {{webhook.commonLabels.severity}}
  **Folder**: {{webhook.alerts[0].labels.grafana_folder}}
  
  **Summary**: {{webhook.alerts[0].annotations.summary}}
  {{webhook.alerts[0].annotations.description}}
  
  **Value**: {{webhook.alerts[0].values.B}}
  **Started At**: {{webhook.alerts[0].startsAt}}
  
  **Dashboard**: {{webhook.alerts[0].dashboardURL}}
  **Panel**: {{webhook.alerts[0].panelURL}}
  **Alert Rule**: {{webhook.alerts[0].generatorURL}}

severity: |
  webhook.status == "resolved" ? "info" :
  webhook.commonLabels.severity == "critical" ? "critical" :
  webhook.commonLabels.severity == "warning" ? "high" : "medium"

source: "grafana"
link: "{{webhook.alerts[0].dashboardURL}}"

tags:
  - "source:grafana"
  - "alertname:{{webhook.alerts[0].labels.alertname}}"
  - "severity:{{webhook.commonLabels.severity}}"
  - "folder:{{webhook.alerts[0].labels.grafana_folder}}"
  - "status:{{webhook.status}}"
  - "fingerprint:{{webhook.alerts[0].fingerprint}}"

filter: |
  size(webhook.alerts) > 0 &&
  webhook.status == "firing"

custom_fields:
  fingerprint: "{{webhook.alerts[0].fingerprint}}"
  dashboard_url: "{{webhook.alerts[0].dashboardURL}}"
  panel_url: "{{webhook.alerts[0].panelURL}}"
  generator_url: "{{webhook.alerts[0].generatorURL}}"
  grafana_instance: "{{webhook.externalURL}}"
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate Grafana alerts.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add custom filtering logic.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated alert investigation.
- Go to [Grafana Template](../../templates/monitoring/grafana.md) for the pre-configured template.

---

## Further reading

### Grafana Official Documentation
- [Unified Alerting](https://grafana.com/docs/grafana/latest/alerting/) - Complete guide to Grafana Unified Alerting, contact points, and notification policies
- [Manage Contact Points](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/) - Webhook contact point setup and configuration options
- [Template Notifications](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/template-notifications/) - Webhook payload structure and available fields
- [Webhook Notifier](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/webhook-notifier/) - Complete payload structure reference (alerts array, labels, annotations, URLs)
