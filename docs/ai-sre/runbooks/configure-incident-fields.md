---
title: Use Incident Fields in Runbooks
sidebar_label: Use Incident Fields
sidebar_position: 4
description: Learn how to use incident fields in your runbook workflows for dynamic, context-aware automation.
redirect_from:
- /docs/incident-response/runbooks/configure-incident-fields
---

# Use Incident Fields in Runbooks

This guide explains how to use incident and alert fields in your runbook actions to create dynamic, context-aware automation.

## Overview

Runbook actions can reference incident and alert data using **Mustache template syntax**: `{{incident.field_name}}` or `{{alert.field_name}}`. This allows you to:
- Pass contextual information from incidents to runbook actions
- Create dynamic messages with incident details
- Route actions based on severity, service, or custom fields
- Build reusable runbooks that adapt to different scenarios

All field references are configured through **form-based UI inputs** with a data picker that shows available fields based on your selected incident or alert context.

## Available Field Types

### System Fields (Always Available)

#### Incident Fields
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

#### Alert Fields
These fields are available when your runbook has alert context:
- `{{alert.id}}` - Unique alert identifier
- `{{alert.title}}` - Alert title
- `{{alert.priority}}` - Priority level (p1_critical, p2_error, p3_warning, p4_info)
- `{{alert.service}}` - Service associated with the alert
- `{{alert.source}}` - Alert source (Datadog, New Relic, Prometheus, etc.)
- `{{alert.timestamp}}` - When the alert was received
- `{{alert.fingerprint}}` - Deduplication fingerprint
- `{{alert.url}}` - Link to alert source (if available)

### Severity Field Usage

The severity field contains string values representing severity levels. When referencing severity in runbook actions:

| Mustache Variable | Display Label | Description |
|-------------------|---------------|-------------|
| `{{incident.severity}}` returns `SEV0` | SEV0:Critical | System-wide outage |
| `{{incident.severity}}` returns `SEV1` | SEV1:Major | Significant service degradation |
| `{{incident.severity}}` returns `SEV2` | SEV2:Moderate | Partial service impact |
| `{{incident.severity}}` returns `SEV3` | SEV3:Minor | Minor issue with workaround |
| `{{incident.severity}}` returns `SEV4` | SEV4:Cosmetic | Cosmetic issue, no functional impact |

**Example Slack message using severity**:
```
🚨 **{{incident.severity}} Incident**
**Service**: {{incident.service}}
**Environment**: {{incident.environment}}
**Status**: {{incident.status}}

View incident: {{incident.url}}
```

Go to [Configure Runbook Triggers](/docs/ai-sre/runbooks/create-trigger#severity-field) to learn how to configure severity-based trigger conditions.

### Custom Fields

Custom fields defined on incident types or alert types are also available via Mustache syntax:

- `{{incident.custom_field_name}}` - Any custom field added to an incident type
- `{{alert.custom_field_name}}` - Any custom field added to an alert type

**Example**: If your "Service Incident" type has a custom field called `error_rate`, reference it as:
```
{{incident.error_rate}}
```

## Using Fields in Runbook Actions

### How to Reference Fields

When configuring runbook actions in the UI:

1. Click on an action input field that supports dynamic values (marked with a data picker icon)
2. Click the **data picker button** (looks like a database icon)
3. Select the field source:
   - **Incident** - Fields from the current incident
   - **Alert** - Fields from the triggering alert
   - **Runbook Inputs** - Variables defined in the Input/Output section
   - **Action Outputs** - Results from previous actions
4. Select the specific field
5. The Mustache variable is automatically inserted: `{{incident.service}}`

Alternatively, you can type Mustache syntax directly: `{{incident.field_name}}`

### Example: Slack Message with Incident Details

**Action**: Slack: Post Message

**Channel**: `#incidents`

**Message** (configured in form field):
```
🔥 **New {{incident.severity}} Incident**

**Title**: {{incident.title}}
**Service**: {{incident.service}}
**Environment**: {{incident.environment}}
**Owner**: {{incident.owner}}
**Status**: {{incident.status}}

**View Details**: {{incident.url}}
```

**Result**: When the runbook runs, Mustache variables are replaced with actual values:
```
🔥 **New SEV1 Incident**

**Title**: Payment Service High Error Rate
**Service**: payment-service
**Environment**: production
**Owner**: Jane Smith
**Status**: investigating

**View Details**: https://app.harness.io/incidents/INC-456
```

### Example: Conditional Slack Routing

Use runbook triggers to create conditional behavior based on field values.

**Pattern**: Route P1 alerts to `#critical-incidents`, others to `#incidents`

**Implementation**:
1. Create two runbooks:
   - **P1 Alert Handler**:
     - Trigger: Alert created with `alert.priority equals p1_critical`
     - Action: Slack post to `#critical-incidents`
   - **Standard Alert Handler**:
     - Trigger: Alert created with `alert.priority in [p2_error, p3_warning, p4_info]`
     - Action: Slack post to `#incidents`

See [Runbook Triggers](/docs/ai-sre/runbooks/create-trigger) for conditional execution configuration.

### Example: Jira Ticket with Incident Context

**Action**: Jira: Create Issue

**Form Configuration**:
- **Project**: `INCIDENT` (static value)
- **Issue Type**: `Incident` (static value)
- **Summary** (form field with data picker):
  ```
  [{{incident.severity}}] {{incident.title}}
  ```
- **Description** (form field with data picker):
  ```
  Incident Details:
  - **Service**: {{incident.service}}
  - **Environment**: {{incident.environment}}
  - **Severity**: {{incident.severity}}
  - **Status**: {{incident.status}}
  - **Created**: {{incident.created_at}}
  
  View in AI SRE: {{incident.url}}
  ```
- **Priority** (form field with data picker):
  ```
  {{incident.severity}}
  ```

**Result**: Jira ticket is created with all incident context embedded.

### Example: HTTP Request with Alert Data

**Action**: HTTP Request

**Form Configuration**:
- **URL** (form field):
  ```
  https://api.example.com/alerts/{{alert.id}}/acknowledge
  ```
- **Method**: `POST` (dropdown)
- **Body** (form field with data picker):
  ```json
  {
    "alert_id": "{{alert.id}}",
    "service": "{{alert.service}}",
    "priority": "{{alert.priority}}",
    "acknowledged_by": "AI SRE Runbook"
  }
  ```

### Example: Reference Previous Action Outputs

Actions can reference outputs from previous actions in the same runbook.

**Action 1**: Zoom: Create Meeting
- Outputs: `join_url`, `meeting_id`, `passcode`

**Action 2**: Slack: Post Message
- **Message** (referencing Action 1 output):
  ```
  🎥 **Incident Bridge Created**
  
  Join the call: {{runbook.outputs.zoom_create_meeting.join_url}}
  Meeting ID: {{runbook.outputs.zoom_create_meeting.meeting_id}}
  Passcode: {{runbook.outputs.zoom_create_meeting.passcode}}
  
  **Incident**: {{incident.title}}
  ```

The data picker automatically shows available outputs from previous actions.

## Setting Incident Context

To ensure the correct fields are available in the data picker:

1. Open your runbook in the editor
2. Go to the **Input/Output** section (top of the page)
3. Under **Incident Context**, select:
   - **Any Incident** - Standard incident fields only
   - **No Incident** - No incident fields available
   - **Custom Incident Type** - Standard fields + custom fields from a specific incident type
4. If you selected **Custom Incident Type**:
   - Choose the incident type from the dropdown
   - All custom fields from that type become available in the data picker
5. Click **Save**

**Example**: If you select "Service Incident" as the custom incident type, and that type has custom fields like `error_rate` and `affected_users`, those fields will appear in the data picker as:
- `{{incident.error_rate}}`
- `{{incident.affected_users}}`

## Best Practices

### Use the Data Picker
- Always use the data picker UI when possible (avoids typos)
- The data picker shows only fields available in your configured context
- Hover over fields in the picker to see descriptions

### Test with Sample Data
- Use the runbook test mode to validate Mustache variables render correctly
- Test with different incident types to ensure custom fields work as expected
- Verify output from one action can be consumed by the next

### Handle Missing Values
- Not all fields are guaranteed to be populated
- Use descriptive defaults: `{{incident.owner | default: "Unassigned"}}`
- Consider optional vs. required fields when designing runbooks

### Keep Mustache Syntax Clean
- Use clear, readable syntax
- Add spacing for readability: `{{incident.title}}` not `{{incident.title}}`
- Use consistent formatting across runbooks

### Document Custom Fields
- Add descriptions to custom fields in incident type configuration
- Name custom fields clearly (e.g., `error_rate` not `field1`)
- Document expected values and formats

## Common Use Cases

### Dynamic Notification Routing

**Scenario**: Route notifications to service-specific channels

**Slack Action Configuration**:
- **Channel** (form field): `#{{incident.service}}-incidents`
- **Message**: 
  ```
  🚨 New incident in {{incident.service}}
  Severity: {{incident.severity}}
  ```

If `incident.service` = `payment-service`, message goes to `#payment-service-incidents`

### Service-Specific Runbooks

**Scenario**: Trigger different remediation based on affected service

**Implementation**: Use trigger conditions
- Trigger 1: `incident.service equals payment-service` → Run "Restart Payment Pods" runbook
- Trigger 2: `incident.service equals database` → Run "Database Health Check" runbook

### Custom Field Integration

**Scenario**: Your incident type has a custom field `affected_users` (Number type)

**Jira Ticket Description**:
```
Impact: {{incident.affected_users}} users affected
Service: {{incident.service}}
Severity: {{incident.severity}}
```

### Environment-Specific Actions

**Scenario**: Different escalation for production vs. staging

**Trigger Conditions**:
- Trigger 1: `incident.environment equals production AND incident.severity in [SEV0, SEV1]` → Page VP Engineering
- Trigger 2: `incident.environment in [staging, development]` → Post to `#dev-incidents`

## Next Steps

### Documentation
- [Create a Runbook](./create-runbook.md) - Complete runbook creation guide
- [Configure Runbook Triggers](./create-trigger.md) - Set up automatic execution
- [Return to Runbooks Overview](./runbooks.md)

### Integration Guides
- **Communication Tools**
  - [Slack Integration](./runbook-action-integrations/slack.md)
  - [Microsoft Teams Integration](./runbook-action-integrations/teams.md)
  - [Zoom Integration](./runbook-action-integrations/zoom.md)
  - [Google Chat Integration](./runbook-action-integrations/google-chat.md)
- **Ticketing Systems**
  - [Jira Integration](./runbook-action-integrations/jira.md)
  - [ServiceNow Integration](./runbook-action-integrations/servicenow.md)
- **Deployment**
  - [Harness Pipelines](./runbook-action-integrations/harness-pipelines.md)
