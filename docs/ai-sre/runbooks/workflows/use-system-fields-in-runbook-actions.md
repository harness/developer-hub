---
title: Use System Fields in Runbook Actions
sidebar_label: Use System Fields
sidebar_position: 2
description: Learn about system fields available in runbook actions for dynamic, context-aware automation in Harness AI SRE.
keywords:
  - system fields
  - incident fields
  - alert fields
  - runbooks
tags:
  - fields
  - runbooks
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Use System Fields in Runbook Actions

System fields provide access to incident and alert data in your runbook actions. These fields are automatically available based on your runbook context and can be referenced using Mustache templates or CEL expressions.

## Incident Fields

These fields are automatically available when your runbook has incident context:
- `{{incident.id}}` - Unique incident identifier
- `{{incident.short_id}}` - Human-readable ID (e.g., "INC-123")
- `{{incident.title}}` - Incident title
- `{{incident.severity}}` - Severity level (SEV0, SEV1, SEV2, SEV3, SEV4)
- `{{incident.status}}` - Current status (detected, investigating, mitigating, resolved)
- `{{incident.created_at}}` - Creation timestamp
- `{{incident.updated_at}}` - Last update timestamp
- `{{incident.service}}` - Affected service name
- `{{incident.environment}}` - Environment (production, staging, development)
- `{{incident.owner}}` - Current owner/responder
- `{{incident.url}}` - Link to incident in AI SRE UI

---

## Activity Fields (Enhanced Incident Data)

The `Activity` namespace provides access to Harness-specific incident data, including full service objects with IDs:
- `{{Activity.id}}` - Activity identifier
- `{{Activity.title}}` - Activity title
- `{{Activity.severity}}` - Severity object
- `{{Activity.severity.id}}` - Severity ID (numeric)
- `{{Activity.status}}` - Current status
- `{{Activity.summary}}` - Activity summary
- `{{Activity.impacted_services}}` - Array of Harness service objects with `.id` and `.name` properties
- `{{Activity.url}}` - Link to activity in AI SRE UI

**Getting Harness service IDs with CEL**:
```cel
// Extract all service IDs
Activity.impacted_services.map(s, s.id)

// Get first service ID
Activity.impacted_services[0].id

// Filter and extract API service IDs
Activity.impacted_services.filter(s, s.name.contains("api")).map(s, s.id)
```

:::tip Why Use Activity Instead of Incident?
Use `Activity.impacted_services` when you need Harness service IDs (UUIDs) for API calls or pipeline triggers. The `incident.service` field only provides service names as strings.
:::

---

## Alert Fields

These fields are available when your runbook has alert context:
- `{{alert.id}}` - Unique alert identifier
- `{{alert.title}}` - Alert title
- `{{alert.priority}}` - Priority level (p1_critical, p2_error, p3_warning, p4_info)
- `{{alert.service}}` - Service associated with the alert
- `{{alert.source}}` - Alert source (Datadog, New Relic, Prometheus, etc.)
- `{{alert.timestamp}}` - When the alert was received
- `{{alert.fingerprint}}` - Deduplication fingerprint
- `{{alert.url}}` - Link to alert source (if available)

---

## Severity Field Usage

The severity field contains string values representing severity levels. When referencing severity in runbook actions:

| Severity Value | Display Label | Description |
|----------------|---------------|-------------|
| `{{incident.severity}}` returns `"0"` | SEV0:Critical | System-wide outage |
| `{{incident.severity}}` returns `"1"` | SEV1:Major | Significant service degradation |
| `{{incident.severity}}` returns `"2"` | SEV2:Moderate | Partial service impact |
| `{{incident.severity}}` returns `"3"` | SEV3:Minor | Minor issue with workaround |
| `{{incident.severity}}` returns `"4"` | SEV4:Cosmetic | Cosmetic issue, no functional impact |

**Example Slack message using severity**:
```
🚨 **{{incident.severity}} Incident**
**Service**: {{incident.service}}
**Environment**: {{incident.environment}}
**Status**: {{incident.status}}

View incident: {{incident.url}}
```

Go to [Configure Runbook Triggers](/docs/ai-sre/runbooks/triggers/create-trigger#severity-field) to learn how to configure severity-based trigger conditions.

**CEL expression alternative**:
```cel
${{incident.severity == "0" ? "🚨 CRITICAL" : 
   incident.severity == "1" ? "⚠️ MAJOR" : 
   incident.severity == "2" ? "MODERATE" : 
   incident.severity == "3" ? "MINOR" : "COSMETIC"}}
```

---

## Custom Fields

Custom fields defined on incident types or alert types are also available via Mustache syntax:

- `{{incident.custom_field_name}}` - Any custom field added to an incident type
- `{{alert.custom_field_name}}` - Any custom field added to an alert type

**Example**: If your "Service Incident" type has a custom field called `error_rate`, reference it as:
```
{{incident.error_rate}}
```

---

## Next steps

- Go to [Use Mustache Templates in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to reference incident data with Mustache templates.
- Go to [Use CEL in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) to implement dynamic logic with CEL expressions.
- Go to [Best Practices](/docs/ai-sre/runbooks/workflows/best-practices) for field usage guidelines.

<NeedHelpFooter />
