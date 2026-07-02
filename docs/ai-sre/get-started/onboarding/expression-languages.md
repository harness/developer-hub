---
title: Create Your First Dynamic Content
sidebar_label: Create Dynamic Content
sidebar_position: 6
description: Learn about CEL and Mustache expression languages for dynamic content in Harness AI SRE.
keywords:
  - cel
  - mustache
  - expressions
  - templates
tags:
  - expressions
  - reference
---

# Create Your First Dynamic Content

Harness AI SRE supports two expression languages for creating dynamic content: **CEL (Common Expression Language)** for logic and conditions, and **Mustache** for simple variable substitution.

## CEL versus Mustache

Choose the right expression language based on your needs:

| Feature | CEL (`${{expression}}`) | Mustache (`{{variable}}`) |
|---------|------------------------|---------------------------|
| **Purpose** | Logic and computation | Simple variable substitution |
| **Use cases** | Conditions, transformations, calculations | Display values, basic templating |
| **Capabilities** | Boolean logic, regex, math, functions | Variable interpolation only |
| **Syntax** | `${{incident.severity == "0"}}` | `{{incident.severity}}` |
| **Return types** | Any type (string, number, boolean, array, object) | String only |
| **Mixing** | Cannot mix with Mustache in same field | Cannot mix with CEL in same field |

---

## When to Use Each

### Use CEL When You Need:
- **Conditional logic**: Filter or route based on conditions
- **Regex matching**: Pattern matching on service names or messages
- **Calculations**: Math operations, thresholds, percentages
- **Transformations**: String manipulation, datetime formatting
- **Complex logic**: Multi-field boolean expressions

### Use Mustache When You Need:
- **Simple display**: Show field values in messages
- **Basic templating**: Insert variables into text
- **Field mapping**: Map source fields to destination fields
- **Static substitution**: Replace placeholders with values

---

## Where to Use CEL

CEL is available in these contexts:

### 1. Alert Rule Conditions
Filter incoming alerts before creating incidents.

**Example**:
```cel
alert.severity == "critical" && alert.source.matches("prod-.*")
```

Go to [Use CEL in Route Alerts](/docs/ai-sre/alerts/alert-rules/use-cel-alert-rules) to learn more.

### 2. Runbook Trigger Conditions
Control when runbooks automatically execute.

**Example**:
```cel
incident.severity == "0" && incident.environment == "production"
```

Go to [Use CEL in Runbook Triggers](/docs/ai-sre/runbooks/triggers/use-cel-triggers) to learn more.

### 3. Webhook Advanced Mapping Conditions
Filter webhook payloads before creating alerts.

**Example**:
```cel
webhook.priority == "P1" && webhook.region.matches("us-.*")
```

Go to [Use CEL in Webhooks](/docs/ai-sre/alerts/webhooks/use-cel-webhooks) to learn more.

### 4. Runbook Action Fields (Inline)
Embed CEL expressions in text fields for dynamic content.

**Example**:
```text
Incident ${{incident.title}} has severity ${{incident.severity == "0" ? "CRITICAL" : "Normal"}}
```

Go to [Use CEL in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) to learn more.

---

## Where to Use Mustache

Mustache is available in these contexts:

### 1. Runbook Action Fields
Insert field values into messages, tickets, and notifications.

**Example**:
```text
Incident {{incident.title}} detected in {{incident.environment}}
```

Go to [Use Mustache in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to learn more.

### 2. Webhook Field Mapping
Map webhook payload fields to alert properties.

**Example**:
```text
{{webhook.alert.name}}
```

Go to [Use Mustache in Webhooks](/docs/ai-sre/alerts/webhooks/use-mustache-webhooks) to learn more.

---

## Harness-Specific Information

### Feature Flag

CEL expressions require the feature flag `IR_CEL_CONDITIONS`. Contact your Harness account team to enable this feature.

### Expression Limits

- **Max CEL expression length**: 4,096 characters
- **No mixing**: Cannot use both CEL and Mustache in the same field
- **No preview**: Expressions cannot be tested before execution

### Harness-Specific Data

**Severity values** are strings, not numbers:
```cel
// ✅ Correct
incident.severity == "0"

// ❌ Wrong - comparing string to number
incident.severity == 0
```

**Timestamps** are milliseconds since Unix epoch:
```cel
incident.created_at > 1704067200000
```

---

## Common Patterns

### Severity Checks

**Single severity**:
```cel
incident.severity == "0"    // SEV0 (Critical)
```

**Multiple severities**:
```cel
incident.severity in ["0", "1", "2"]
```

### String Operations

**Contains check**:
```cel
incident.title.contains("database")
```

**Regex matching**:
```cel
incident.service.matches("^payment-.*")
```

**Regex extraction**:
```cel
regex.extract(Webhook.parsed_body, r"\"AlarmName\"\:\"(.*)\"")
```

**Case conversion**:
```cel
incident.environment.upperAscii()
```

**String trimming**:
```cel
incident.title.trim()
```

**Replace text**:
```cel
regex.replace(incident.description, r"\n", ", ")
```

### Null Safety and Default Values

**Always check for null**:
```cel
// ✅ Safe
incident.owner != null && incident.owner.contains("@example.com")

// ❌ May fail if owner is null
incident.owner.contains("@example.com")
```

**Provide default values with orValue()**:
```cel
// Returns "Unknown" if field is null or empty
regex.extract(Webhook.parsed_body, r"\"AlarmName\"\:\"(.*)\"").orValue("")

// Chain multiple operations with safe defaults
incident.owner.orValue("Unassigned").trim()
```

### Mustache Nested Fields

**Access nested data**:
```text
{{webhook.metadata.environment}}
{{alert.resource.name}}
```

### Collection Operations

CEL provides powerful collection operations for working with arrays and lists.

**Get collection size**:
```cel
size(incident.affected_services) > 3
```

**Check if any item matches**:
```cel
incident.tags.exists(t, t == "customer-impact")
```

**Extract Harness service IDs from impacted services**:
```cel
Activity.impacted_services.map(s, s.id)
// Returns: ["9280f15c-8c59-4c32-834b-3b36c06d269b", "a1b2c3d4-..."]
```

**Get first service ID**:
```cel
Activity.impacted_services[0].id
```

**Filter services by name pattern**:
```cel
Activity.impacted_services.filter(s, s.name.contains("api"))
```

**Count services matching a condition**:
```cel
size(Activity.impacted_services.filter(s, s.name.contains("api")))
```

**Combine operations**:
```cel
// Get IDs of all API services
Activity.impacted_services
  .filter(s, s.name.contains("api"))
  .map(s, s.id)
```

:::info Activity Namespace
`Activity.*` provides access to incident and activity data in runbook action fields. Use `Activity.impacted_services` to get the list of Harness services affected by an incident, not just service names.
:::

---

## Examples

### CEL: Dynamic Slack Message

```text
${{incident.severity == "0" ? "[CRITICAL]" : "[ALERT]"}}
**Service**: ${{incident.service}}
**Environment**: ${{incident.environment}}
**Status**: ${{incident.status}}

${{incident.severity in ["0", "1"] ?
  "**IMMEDIATE ACTION REQUIRED**" :
  "Monitor and triage as needed"}}

View: ${{incident.url}}
```

### Mustache: Simple Jira Ticket

```text
**Incident**: {{incident.short_id}}
**Title**: {{incident.title}}
**Service**: {{incident.service}}
**Environment**: {{incident.environment}}
**Severity**: SEV{{incident.severity}}

Link: {{incident.url}}
```

---

## Learn More

### CEL Language Reference
- [cel.dev](https://cel.dev/), Official CEL documentation
- [CEL Language Definition](https://github.com/google/cel-spec/blob/master/doc/langdef.md), Complete syntax reference

### Harness AI SRE Guides
- [Use CEL in Route Alerts](/docs/ai-sre/alerts/alert-rules/use-cel-alert-rules)
- [Use CEL in Runbook Triggers](/docs/ai-sre/runbooks/triggers/use-cel-triggers)
- [Use CEL in Webhooks](/docs/ai-sre/alerts/webhooks/use-cel-webhooks)
- [Use CEL in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions)
- [Use Mustache in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions)
- [Use Mustache in Webhooks](/docs/ai-sre/alerts/webhooks/use-mustache-webhooks)
