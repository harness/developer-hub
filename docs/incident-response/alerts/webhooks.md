---
title: Configure Webhooks
description: Learn how to configure webhooks in Harness Incident Response to receive alerts from any monitoring system or custom application.
sidebar_label: Webhooks
sidebar_position: 2
---

# Configure Webhooks

Learn how to set up webhooks to receive alerts from any monitoring system or custom application.

## Overview

Harness IR webhooks provide a flexible way to receive alerts from any system that can send HTTP requests. Our webhook integration supports any JSON payload format, making it easy to integrate with:
- Custom monitoring solutions
- Internal applications
- Third-party services
- Legacy systems

## Webhook Configuration

### Step 1: Create a Webhook
1. Navigate to **Settings** → **Alert Sources** → **Webhooks**
2. Click **+ New Webhook**
3. Enter a name and description
4. Copy the generated webhook URL

### Step 2: Configure Payload Mapping
Map your webhook payload to Harness IR fields:

```yaml
# Example mapping configuration
fields:
  severity: $.alert.severity
  service: $.metadata.service
  environment: $.metadata.environment
  description: $.alert.message
  source: $.alert.source
```

### Step 3: Test the Webhook
Send a test alert to verify the configuration:

```bash
curl -X POST https://app.harness.io/incident-response/webhooks/[webhook_id] \
  -H "Content-Type: application/json" \
  -d '{
    "alert": {
      "severity": "critical",
      "message": "High CPU usage detected",
      "source": "custom-monitor"
    },
    "metadata": {
      "service": "[service]",
      "environment": "[environment]"
    }
  }'
```

## Payload Examples

### Generic Alert Format
```json
{
  "alert": {
    "name": "High CPU Usage",
    "severity": "critical",
    "message": "CPU usage above 90%",
    "timestamp": "[timestamp]"
  },
  "metadata": {
    "service": "[service]",
    "environment": "[environment]",
    "team": "[team]"
  },
  "metrics": {
    "cpu_usage": 95.5,
    "memory_usage": 85.2
  }
}
```

### Monitoring System Format
```json
{
  "monitor": {
    "id": "[monitor_id]",
    "status": "ALERT",
    "priority": "P1"
  },
  "resource": {
    "name": "[service]",
    "type": "kubernetes_pod",
    "namespace": "[environment]"
  },
  "data": {
    "threshold": 90,
    "current_value": 95.5,
    "duration": "5m"
  }
}
```

### Custom Application Format
```json
{
  "application": "[service]",
  "alert_type": "business_logic",
  "details": {
    "error": "Database connection timeout",
    "impact": "Order processing delayed",
    "affected_regions": ["[region]"]
  },
  "context": {
    "datacenter": "[datacenter]",
    "component": "[component]"
  }
}
```

## Field Mapping

### Supported JSONPath Operators
- `$.field`: Direct field access
- `$.nested.field`: Nested field access
- `$[0]`: Array indexing
- `$.*.field`: Wildcard matching
- `$[?(@.field == 'value')]`: Conditional matching

### Common Field Mappings

#### Required Fields
Map these fields from your payload:
- **Severity**: `$.alert.severity`, `$.monitor.priority`, `$.status`
- **Description**: `$.alert.message`, `$.details.error`, `$.monitor.message`
- **Source**: `$.alert.source`, `$.application`, `$.monitor.type`

#### Optional Fields
Enhance alerts with additional context:
- **Service**: `$.metadata.service`, `$.resource.name`, `$.application`
- **Environment**: `$.metadata.environment`, `$.resource.namespace`, `$.context.environment`
- **Team**: `$.metadata.team`, `$.context.team`, `$.owner`
- **Custom Fields**: Map any additional fields that provide value

## Best Practices

### Webhook Security
- Keep webhook URLs confidential
- Use HTTPS endpoints only
- Implement rate limiting
- Monitor webhook usage
- Rotate webhook URLs periodically

### Payload Design
- Include essential alert context
- Use consistent field names
- Include timestamps in UTC
- Add correlation IDs
- Keep payloads concise

### Error Handling
- Validate payload format
- Handle missing fields gracefully
- Set default values
- Log mapping errors
- Monitor webhook health

## Next Steps

### Documentation
- [Alert Overview](./alerts.md)
- [Alert Integrations](./integrations.md)
- [Configure Alert Rules](./alert-rules.md)

### Related Topics
- [Create a Runbook](../runbooks/create-runbook.md)
- [Configure Fields](../runbooks/configure-incident-fields.md)
