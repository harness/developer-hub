---
title: Configure Webhooks
description: Learn how to configure webhooks in Harness AI SRE to receive alerts from any monitoring system or custom application.
sidebar_label: Webhooks
sidebar_position: 2
---

# Configure Webhooks

Learn how to set up webhooks to receive alerts from any monitoring system or custom application.

## Overview

Harness AI SRE webhooks provide a flexible way to receive alerts from any system that can send HTTP requests. Our webhook integration supports any JSON payload format, making it easy to integrate with:
- Custom monitoring solutions
- Internal applications
- Third-party services
- Legacy systems

## Webhook Configuration

### Step 1: Create a Webhook
1. Navigate to **Integrations** → **New Integration**
2. Enter a name and description
3. Choose from the **Select Template** section or leave it blank for Custom
4. Copy the generated webhook URL

### Step 2: Configure Payload Mapping
Map your webhook payload to Harness AI SRE fields by first choosing the values that you want to map from your webhook payload.

### Step 3: Map Values to Fields in the Alert (Normalization)
Fields parsed from the Payload Mapping step appear on the left and can be dragged to the fields in the Alert.

### Step 4: Test the Webhook
Send a test alert by copying the CURL command and pasting it into your terminal to verify the configuration:

```bash
curl -X POST 'https://example.com/api/v1/webhook/placeholder-id' \
-H 'Content-Type: application/json' \
-d '{
  "id": 123456,
  "repository": {
    "name": "sample-repo",
    "url": "https://github.com/placeholder-org/sample-repo"
  },
  "status": "success",
  "build_url": "https://ci.example.com/builds/123456",
  "commit": "abc123def456",
  "branch": "main",
  "author": "Jane Doe",
  "message": "Update test script"
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
    "timestamp": "{{webhook.timestamp}}"
  },
  "metadata": {
    "service": "{{webhook.service}}",
    "environment": "{{webhook.environment}}",
    "team": "{{webhook.team}}"
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
    "id": "{{webhook.monitor_id}}",
    "status": "ALERT",
    "priority": "P1"
  },
  "resource": {
    "name": "{{webhook.service}}",
    "type": "kubernetes_pod",
    "namespace": "{{webhook.environment}}"
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
  "application": "{{webhook.service}}",
  "alert_type": "business_logic",
  "details": {
    "error": "Database connection timeout",
    "impact": "Order processing delayed",
    "affected_regions": ["{{webhook.region}}"]
  },
  "context": {
    "datacenter": "{{webhook.datacenter}}",
    "component": "{{webhook.component}}"
  }
}
```

## Field Mapping

### Field Mapping Templates
After parsing your webhook payload in the visual builder, reference fields using moustache templates:

```yaml
# Example alert template
title: "Alert from {{webhook.source}}"
description: "{{webhook.message}}"
severity: "{{webhook.severity}}"
service: "{{webhook.service}}"
environment: "{{webhook.environment}}"
team: "{{webhook.team}}"
```

### Common Field Mappings

#### Required Fields
Map these fields in the visual builder:
- **Severity**: Alert priority or status
- **Description**: Alert message or error details
- **Source**: Alert origin or application name

#### Optional Fields
Enhance alerts with additional context:
- **Service**: Affected service or application
- **Environment**: Deployment environment
- **Team**: Responsible team
- **Custom Fields**: Any additional relevant data

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
