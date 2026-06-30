---
title: Use CEL Expressions in Runbook Actions
sidebar_label: Use CEL Expressions
sidebar_position: 3
description: Learn how to use inline CEL expressions in runbook actions for dynamic content in Harness AI SRE.
keywords:
  - cel
  - expressions
  - inline expressions
  - runbook actions
  - runbooks
tags:
  - expressions
  - runbooks
redirect_from:
- /docs/ai-sre/runbooks/workflows/use-cel-action-fields
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Use CEL Expressions in Runbook Actions

CEL (Common Expression Language) expressions provide logic and transformation capabilities beyond simple variable substitution. Use CEL when you need conditional logic, calculations, regex matching, or string transformations.

CEL expressions cannot be tested or previewed before execution. Syntax validation occurs when you save, but runtime errors only appear in execution logs. Test in non-production environments first.

:::info Feature Flag Required
CEL expressions require the `IR_CEL_CONDITIONS` feature flag. Contact your Harness account team to enable this feature.
:::

## CEL syntax basics

CEL expressions use `${{expression}}` syntax and can be embedded inline with text.

**Basic syntax**:
```text
${{incident.field_name}}              // Simple value
${{incident.severity == "0"}}         // Boolean condition
${{incident.severity == "0" ? "CRITICAL" : "Normal"}}
// Ternary operator
```

**Cannot mix with Mustache**:
```text
// ❌ This will fail - mixing CEL and Mustache
Incident ${{incident.severity}} is {{incident.title}}

// ✅ Use CEL only
Incident ${{incident.severity}} is ${{incident.title}}

// ✅ Or Mustache only
Incident {{incident.severity}} is {{incident.title}}
```

---

## Inline conditional expressions

**Severity-based formatting**:
```text
Priority: ${{
  incident.severity == "0" ?
  "🚨 CRITICAL - Immediate action required" :
  "Normal priority"
}}
```

**Environment-specific warnings**:
```text
Deploy to ${{
  incident.environment == "production" ?
  "🔴 PRODUCTION (use caution!)" :
  incident.environment
}}
```

**Multi-level conditions**:
```text
Impact: ${{
  incident.severity == "0" ? "P0 - All hands" : 
  incident.severity == "1" ? "P1 - High priority" : 
  incident.severity == "2" ? "P2 - Medium priority" :
  "P3 - Low priority"
}}
```

---

## Inline calculations

**Error rate percentage**:
```text
Current error rate: ${{
  (alert.error_count / alert.total_requests) * 100
}}%
```

**Affected users with threshold logic**:
```text
User impact: ${{incident.affected_users}} users (${{
  incident.affected_users > 1000 ?
  "HIGH IMPACT" : "Limited impact"
}})
```

**Response time in seconds**:
```text
Response time: ${{alert.response_time_ms / 1000}}s (threshold: 2s)
```

---

## Inline string operations

**String concatenation**:
```text
${{
  incident.service + " service in " +
  incident.environment + " environment"
}}
```

**Case conversion**:
```text
ENVIRONMENT: ${{incident.environment.upperAscii()}}
```

**Substring extraction** (if supported):
```text
Service: ${{incident.service.replace("-api", "")}}
```

---

## Inline regex and pattern matching

**Check if service matches pattern**:
```text
${{
  incident.service.matches("^payment-.*") ?
  "💳 Payment service affected" :
  "Service: " + incident.service
}}
```

**Extract meaningful info from title**:
```text
${{
  incident.title.contains("timeout") ?
  "⏱️ Timeout issue detected" : 
  incident.title.contains("500") ?
  "🔴 Server error detected" : 
  "Issue: " + incident.title
}}
```

---

## Working with collections and Activity data

**Extract Harness service IDs for pipeline triggers**:

When you need Harness service IDs (UUIDs) instead of just service names, use the `Activity.impacted_services` collection:

```text
Impacted Services (IDs):
${{Activity.impacted_services.map(s, s.id)}}
```

**Get first impacted service ID**:
```text
Primary Service ID: ${{Activity.impacted_services[0].id}}
```

**Filter API services and get their IDs**:
```text
API Service IDs:
${{
  Activity.impacted_services
    .filter(s, s.name.contains("api"))
    .map(s, s.id)
}}
```

**Count impacted services**:
```text
${{size(Activity.impacted_services)}} services impacted
```

**Build a formatted list of services**:
```text
Impacted Services:
${{
  Activity.impacted_services.map(
    s, "- " + s.name + " (ID: " + s.id + ")"
  )
}}
```

**Use in Harness pipeline trigger (JSON body)**:
```json
{
  "service_ids": ${{Activity.impacted_services.map(s, s.id)}},
  "environment": "${{incident.environment}}",
  "severity": "${{incident.severity}}"
}
```

:::info Why Activity Instead of Incident?
`incident.service` returns a simple string (e.g., `"payment-api"`). `Activity.impacted_services` returns an array of objects with `.id` (Harness UUID) and `.name` properties, which you can use for triggering pipelines or making API calls.
:::

---

## Complex inline examples

**Slack message with comprehensive CEL logic**:
```text
${{
  incident.severity in ["0", "1"] ? "🚨🚨🚨" : "🚨"
}} **${{
  incident.severity == "0" ? "CRITICAL INCIDENT" : "Alert"
}}**: ${{incident.title}}

**Service**: ${{incident.service}}
**Environment**: ${{
  incident.environment == "production" ?
  "🔴 PRODUCTION" : "🟡 " + incident.environment
}}
**Severity**: SEV${{incident.severity}} - ${{
  incident.severity == "0" ? "System-wide outage" : 
  incident.severity == "1" ? "Significant degradation" : 
  incident.severity == "2" ? "Partial impact" : "Minor issue"
}}
**Owner**: ${{
  incident.owner != null && incident.owner != "" ?
  incident.owner :
  "⚠️ UNASSIGNED - needs immediate assignment"
}}
**Status**: ${{incident.status}}

${{
  incident.severity in ["0", "1"] &&
  incident.environment == "production" ? 
  "⚠️ **IMMEDIATE ACTION REQUIRED**\n" +
  "- Page VP Engineering\n" +
  "- Start incident bridge\n" +
  "- Update status page" : 
  "Monitor and triage as needed"
}}

${{
  incident.affected_users != null &&
  incident.affected_users > 0 ? 
  "👥 **User Impact**: " +
  string(incident.affected_users) + " users affected" : ""
}}

View incident: ${{incident.url}}
Join bridge: ${{
  runbook.outputs.zoom_create_meeting.join_url != null ?
  runbook.outputs.zoom_create_meeting.join_url :
  "Not created yet"
}}
```

**Jira ticket with dynamic priority and description**:

**Summary field**:
```text
[${{
  incident.severity == "0" ? "P0-CRITICAL" : 
  incident.severity == "1" ? "P1-HIGH" : 
  "P2-MEDIUM"
}}] ${{incident.service}}: ${{incident.title}}
```

**Description field**:
```text
h2. Incident Summary

*Service*: ${{incident.service}}
*Environment*: ${{incident.environment}}
*Severity*: SEV${{incident.severity}} - ${{
  incident.severity in ["0", "1"] ?
  "HIGH PRIORITY" : "Normal priority"
}}
*Created*: ${{incident.created_at}}
*Status*: ${{incident.status}}

h2. Impact Assessment

${{
  incident.affected_users != null &&
  incident.affected_users > 0 ? 
  "*Users Affected*: " +
  string(incident.affected_users) + " users\n" + 
  "*Impact Level*: " + (
    incident.affected_users > 1000 ?
    "CRITICAL - Large user base" :
    "Moderate"
  ) : 
  "No user impact data available"
}}

h2. Required Actions

${{
  incident.severity == "0" ? 
  "* Page all on-call engineers immediately\n" +
  "* Start incident bridge\n" +
  "* Update status page\n" +
  "* Notify executive team" : 
  incident.severity == "1" ? 
  "* Page primary on-call\n" +
  "* Start incident bridge if needed\n" +
  "* Monitor for escalation" : 
  "* Assign to appropriate team\n" +
  "* Triage within 30 minutes"
}}

h2. Additional Context

*Alert Source*: ${{
  alert.source != null ?
  alert.source : "Manual incident creation"
}}
*Service Pattern*: ${{
  incident.service.matches("^prod-.*") ?
  "Production service" : "Non-production service"
}}

*Links*:
* [View in AI SRE|${{incident.url}}]
${{
  runbook.outputs.slack_create_channel.channel_url != null ? 
  "* [Incident Channel|" +
  runbook.outputs.slack_create_channel.channel_url + "]" :
  ""
}}
```

**ServiceNow incident description with inline CEL**:
```text
=== Incident Report ===

Incident ID: ${{incident.short_id}}
Service: ${{incident.service}}
Environment: ${{incident.environment}}
Severity: SEV${{incident.severity}} (${{
  incident.severity == "0" ? "Critical outage" : 
  incident.severity == "1" ? "Major incident" : 
  incident.severity == "2" ? "Moderate issue" : "Minor issue"
}})

=== Impact Analysis ===

${{
  incident.affected_users != null &&
  incident.affected_users > 0 ? 
  "Users Affected: " + string(incident.affected_users) +
  " users" : "User impact assessment pending"
}}

Priority Level: ${{
  incident.severity in ["0", "1"] &&
  incident.environment == "production" ? 
  "CRITICAL - Immediate response required" : 
  incident.severity == "2" &&
  incident.environment == "production" ? 
  "HIGH - Response within 1 hour" :
  "MEDIUM - Normal triage"
}}

=== Detection Details ===

Detected At: ${{incident.created_at}}
Current Status: ${{incident.status}}
Alert Source: ${{
  alert.source != null ? alert.source : "Manual"
}}
Alert Priority: ${{
  alert.priority != null ? alert.priority : "N/A"
}}

=== Required Response ===

${{
  incident.severity == "0" &&
  incident.environment == "production" ? 
  "CRITICAL PATH:\n" +
  "1. Activate incident commander\n" +
  "2. Page full on-call rotation\n" +
  "3. Start war room bridge\n" +
  "4. Update status page immediately\n" +
  "5. Notify C-level executives" : 
  incident.severity == "1" &&
  incident.environment == "production" ? 
  "HIGH PRIORITY PATH:\n" +
  "1. Page primary on-call engineer\n" +
  "2. Start incident bridge if needed\n" +
  "3. Update status page\n" +
  "4. Monitor for escalation" : 
  "STANDARD PATH:\n" +
  "1. Assign to service owner\n" +
  "2. Triage within SLA\n" +
  "3. Monitor and update as needed"
}}

=== Technical Details ===

Service Type: ${{
  incident.service.matches(".*-api$") ? "API Service" : 
  incident.service.matches(".*-db$") ? "Database Service" : 
  incident.service.matches(".*-web$") ? "Web Service" : "Other"
}}

Environment Type: ${{
  incident.environment == "production" ?
  "PRODUCTION (live customer impact)" : 
  incident.environment == "staging" ?
  "STAGING (pre-production)" : 
  "DEVELOPMENT (internal)"
}}

=== Links and Resources ===

AI SRE Incident: ${{incident.url}}
${{
  runbook.outputs.zoom_create_meeting.join_url != null ? 
  "Incident Bridge: " +
  runbook.outputs.zoom_create_meeting.join_url : ""
}}
${{
  runbook.outputs.slack_create_channel.channel_url != null ? 
  "Slack Channel: " +
  runbook.outputs.slack_create_channel.channel_url : ""
}}
```

---

## Using previous action outputs with CEL

**Reference Zoom meeting output**:
```text
Join the incident bridge:
${{runbook.outputs.zoom_create_meeting.join_url}}
Meeting ID:
${{runbook.outputs.zoom_create_meeting.meeting_id}}
${{
  runbook.outputs.zoom_create_meeting.passcode != null ? 
  "Passcode: " +
  runbook.outputs.zoom_create_meeting.passcode : ""
}}
```

**Conditional based on previous action**:
```text
${{
  runbook.outputs.slack_create_channel.channel_id != null ? 
  "Slack channel created: <#" +
  runbook.outputs.slack_create_channel.channel_id + ">" : 
  "⚠️ Slack channel creation failed - " +
  "manual setup required"
}}
```

**Chain multiple outputs**:
```text
Incident Response Resources:
- Slack Channel:
  ${{runbook.outputs.slack_create_channel.channel_url}}
- Video Bridge:
  ${{runbook.outputs.zoom_create_meeting.join_url}}
- Jira Ticket:
  ${{runbook.outputs.jira_create_ticket.ticket_url}}
- Status:
  ${{runbook.outputs.statuspage_create_incident.incident_url}}
```

---

## CEL inline expression limitations

**Single line only**:
```text
// ❌ Cannot span multiple lines
${{incident.severity == "0" 
   ? "Critical" 
   : "Normal"}}

// ✅ Must be single line
${{incident.severity == "0" ? "Critical" : "Normal"}}
```

**No block statements**:
```text
// ❌ No if/else blocks
${{if incident.severity == "0" { "Critical" } else { "Normal" }}}

// ✅ Use ternary operator
${{incident.severity == "0" ? "Critical" : "Normal"}}
```

**Cannot define variables**:
```text
// ❌ Cannot assign variables
${{var severity = incident.severity; severity == "0" ? "Critical" : "Normal"}}

// ✅ Inline logic only
${{incident.severity == "0" ? "Critical" : "Normal"}}
```

---

## CEL best practices for inline expressions

**1. Check for null values**:
```text
// ❌ May fail if owner is null
Owner: ${{incident.owner.contains("@")}}

// ✅ Null-safe
Owner: ${{incident.owner != null && incident.owner != "" ? incident.owner : "Unassigned"}}
```

**2. Use parentheses for clarity**:
```text
// Unclear precedence
${{
  incident.severity == "0" || incident.severity == "1" &&
  incident.environment == "production"
}}

// Clear intent
${{
  (incident.severity == "0" || incident.severity == "1") &&
  incident.environment == "production"
}}
```

**3. Keep expressions readable**:
```text
${{
  incident.severity == "0" ?
  (incident.environment == "production" ?
   "PROD-CRITICAL" : "STAGING-CRITICAL") :
  (incident.severity == "1" ? "HIGH" : "LOW")
}}
```

**4. Provide fallback values**:
```text
// Default to safe values when data missing
User impact: ${{
  incident.affected_users != null ?
  string(incident.affected_users) + " users" : "Unknown"
}}
```

---

## Troubleshooting CEL inline expressions

**Expression not evaluating**:
- Check that feature flag `IR_CEL_CONDITIONS` is enabled
- Verify field is in COMPLEX mode (supports inline CEL)
- Ensure you used `${{}}` not `{{}}`

**Syntax error on save**:
- Check for unclosed strings or parentheses
- Verify field names are spelled correctly (case-sensitive)
- Use `==` for comparison, not `=`

**Runtime error in logs**:
- Add null checks: `field != null && field.method()`
- Verify field exists in your incident or alert type
- Check data types match (strings vs. numbers)

Go to [CEL Expressions in AI SRE](/docs/ai-sre/get-started/onboarding/expression-languages) for comprehensive CEL syntax reference, troubleshooting guide, and advanced patterns.

---

## Next steps

- Go to [CEL Expressions in AI SRE](/docs/ai-sre/get-started/onboarding/expression-languages) for complete CEL syntax reference.
- Go to [Use Mustache Templates in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to learn about Mustache templates.
- Go to [Use System Fields in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-system-fields-in-runbook-actions) to learn about available system fields.

<NeedHelpFooter />
