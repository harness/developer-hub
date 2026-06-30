---
title: Use Mustache Templates in Webhooks
sidebar_label: Use Mustache in Webhooks
sidebar_position: 4
description: Learn how to use Mustache templates for webhook field mapping in Harness AI SRE.
keywords:
  - mustache
  - templates
  - webhooks
  - field mapping
tags:
  - templates
  - webhooks
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Use Mustache Templates in Webhooks

Use Mustache templates to map webhook payload fields to alert fields in Harness AI SRE.

## When to Use Mustache in Webhooks

Mustache templates are used for **field mapping** (populating alert field values) after a webhook is accepted. This is different from CEL expressions, which are used for **filtering** (deciding whether to create an alert).

**Use Mustache for:**
- Mapping webhook payload fields to alert fields
- Simple variable substitution
- Transforming webhook data into alert data

**Use CEL for:**
- Filtering which webhooks create alerts
- Conditional logic before alert creation
- Complex boolean expressions

**Note**: CEL is used for **filtering** (deciding whether to create an alert), while Mustache is used for **mapping** (populating alert field values). They serve different purposes in the webhook processing pipeline.

---

## Field Mapping with Mustache

After parsing your webhook payload in the visual builder, reference fields using Mustache templates:

### Basic Field Mapping

```yaml
# Map webhook fields to alert fields
title: "{{webhook.alert_name}}"
description: "{{webhook.message}}"
severity: "{{webhook.severity}}"
service: "{{webhook.service}}"
environment: "{{webhook.environment}}"
```

### Nested Field Access

```yaml
# Access nested JSON fields
title: "{{webhook.alert.name}}"
service: "{{webhook.metadata.service}}"
region: "{{webhook.location.region}}"
```

### Example: Datadog Webhook Mapping

```yaml
title: "{{webhook.title}}"
description: "{{webhook.body}}"
severity: "{{webhook.alert_type}}"
service: "{{webhook.tags[0]}}"
priority: "{{webhook.alert_priority}}"
```

### Example: Custom Application Webhook

```yaml
title: "Alert from {{webhook.source}}"
description: "{{webhook.message}}"
severity: "{{webhook.level}}"
service: "{{webhook.app_name}}"
environment: "{{webhook.env}}"
```

---

## Best Practices

### 1. Use Descriptive Field Names

```yaml
# ✅ Clear mapping
title: "{{webhook.alert_title}}"
service: "{{webhook.service_name}}"

# ❌ Unclear mapping
title: "{{webhook.t}}"
service: "{{webhook.s}}"
```

### 2. Provide Fallback Values

If your webhook payload might not always include certain fields, test with sample payloads to ensure the mapping works correctly.

### 3. Map All Required Fields

Ensure you map all required alert fields from your webhook payload:
- **title** - Alert title
- **severity** - Alert severity level
- **service** - Affected service (if applicable)

### 4. Test Your Mappings

1. Send a test webhook payload
2. Verify alert fields are populated correctly
3. Check for missing or incorrectly mapped values
4. Adjust mappings as needed

---

## Combined with CEL Filtering

You can use CEL for filtering and Mustache for mapping in the same webhook:

**Step 1: CEL filters the webhook**
```cel
webhook.priority == "P1" && webhook.environment == "production"
```

**Step 2: Mustache maps accepted webhooks to alerts**
```yaml
title: "{{webhook.alert_name}}"
description: "{{webhook.message}}"
severity: "{{webhook.severity}}"
```

---

## Common Patterns

### Pattern 1: Monitor Tool Integration

```yaml
# Generic monitoring tool mapping
title: "{{webhook.alert_title}}"
description: "{{webhook.alert_description}}"
severity: "{{webhook.alert_severity}}"
service: "{{webhook.service_name}}"
source: "{{webhook.source_system}}"
```

### Pattern 2: Application Error Tracking

```yaml
# Application error webhook
title: "{{webhook.error_type}} in {{webhook.app_name}}"
description: "{{webhook.error_message}}"
severity: "critical"
service: "{{webhook.app_name}}"
environment: "{{webhook.deployment_env}}"
```

### Pattern 3: Infrastructure Monitoring

```yaml
# Infrastructure alert
title: "{{webhook.resource_type}} {{webhook.resource_name}} {{webhook.status}}"
description: "{{webhook.details}}"
severity: "{{webhook.severity_level}}"
service: "{{webhook.service_tag}}"
region: "{{webhook.region}}"
```

---

## Complete Payload and Mapping Examples

### Example 1: Generic Alert Format

**Incoming webhook payload**:
```json
{
  "alert": {
    "name": "High CPU Usage",
    "severity": "critical",
    "message": "CPU usage above 90%",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "metadata": {
    "service": "payment-api",
    "environment": "production",
    "team": "platform"
  },
  "metrics": {
    "cpu_usage": 95.5,
    "memory_usage": 85.2
  }
}
```

**Field mapping**:
```yaml
title: "{{webhook.alert.name}}"
description: "{{webhook.alert.message}}"
severity: "{{webhook.alert.severity}}"
service: "{{webhook.metadata.service}}"
environment: "{{webhook.metadata.environment}}"
```

**Result**: Creates alert with title "High CPU Usage", description "CPU usage above 90%", severity "critical", service "payment-api", environment "production".

### Example 2: Monitoring System Format

**Incoming webhook payload**:
```json
{
  "monitor": {
    "id": "mon_12345",
    "status": "ALERT",
    "priority": "P1"
  },
  "resource": {
    "name": "payments-prod-api",
    "type": "kubernetes_pod",
    "namespace": "production"
  },
  "data": {
    "threshold": 90,
    "current_value": 95.5,
    "duration": "5m"
  }
}
```

**Field mapping**:
```yaml
title: "{{webhook.resource.type}} {{webhook.resource.name}} alert"
description: "Monitor {{webhook.monitor.id}}: {{webhook.resource.type}} exceeded threshold"
severity: "{{webhook.monitor.priority}}"
service: "{{webhook.resource.name}}"
environment: "{{webhook.resource.namespace}}"
```

**Result**: Creates alert with title "kubernetes_pod payments-prod-api alert", service "payments-prod-api", environment "production", severity "P1".

### Example 3: Custom Application Format

**Incoming webhook payload**:
```json
{
  "application": "order-service",
  "alert_type": "business_logic",
  "details": {
    "error": "Database connection timeout",
    "impact": "Order processing delayed",
    "affected_regions": ["us-west-1", "us-east-1"]
  },
  "context": {
    "datacenter": "aws-us-west",
    "component": "order-processor"
  }
}
```

**Field mapping**:
```yaml
title: "{{webhook.alert_type}} error in {{webhook.application}}"
description: "{{webhook.details.error}} - Impact: {{webhook.details.impact}}"
severity: "critical"
service: "{{webhook.application}}"
environment: "{{webhook.context.datacenter}}"
```

**Result**: Creates alert with title "business_logic error in order-service", description "Database connection timeout - Impact: Order processing delayed", service "order-service".

---

## Next steps

- Go to [Use CEL in Webhooks](/docs/ai-sre/alerts/webhooks/use-cel-webhooks) for webhook filtering with CEL expressions
- Go to [Configure Webhooks](/docs/ai-sre/alerts/webhooks/overview) to learn about webhook setup
- Go to [Configure Alert Integrations](/docs/ai-sre/alerts/alerts/integrations/overview) for native integration options

<NeedHelpFooter />
