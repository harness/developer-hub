---
title: Use Mustache Templates in Runbook Actions
sidebar_label: Use Mustache Templates
sidebar_position: 4
description: Learn how to use Mustache templates in runbook actions for dynamic content in Harness AI SRE.
keywords:
  - mustache
  - templates
  - runbook actions
  - runbooks
tags:
  - templates
  - runbooks
redirect_from:
- /docs/ai-sre/runbooks/workflows/use-mustache-action-fields
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Use Mustache Templates in Runbook Actions

Mustache templates provide simple variable substitution in runbook actions. Use Mustache when you need to insert dynamic values from incidents, alerts, or previous action outputs into your runbook actions.

## How to reference fields

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

---

## Example: Slack Message with Incident Details

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

**CEL alternative with conditional logic**:
```text
${{incident.severity in ["0", "1"] ? "🚨🚨🚨" : "🔥"}}
**New ${{
  incident.severity == "0" ? "CRITICAL" : "SEV" + incident.severity
}} Incident**

**Title**: ${{incident.title}}
**Service**: ${{incident.service}}
**Environment**: ${{
  incident.environment == "production" ?
  "🔴 PRODUCTION" : incident.environment
}}
**Owner**: ${{
  incident.owner != null ? incident.owner : "⚠️ UNASSIGNED"
}}
**Status**: ${{incident.status}}
**Priority**: ${{
  incident.severity in ["0", "1"] ?
  "IMMEDIATE ACTION REQUIRED" : "Normal triage"
}}

**View Details**: ${{incident.url}}
```

---

## Example: Conditional Slack Routing

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

Go to [Runbook Triggers](/docs/ai-sre/runbooks/triggers/create-trigger) for conditional execution configuration.

---

## Example: Jira Ticket with Incident Context

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

**CEL alternative with dynamic priority logic**:

**Summary field**:
```text
[${{
  incident.severity == "0" ? "P0-CRITICAL" :
  incident.severity == "1" ? "P1-HIGH" : "P2"
}}] ${{incident.title}}
```

**Description field**:
```text
Incident Details:
- **Service**: ${{incident.service}}
- **Environment**: ${{
    incident.environment == "production" ?
    "🔴 PRODUCTION" : incident.environment
  }}
- **Severity**: SEV${{incident.severity}} (${{
    incident.severity == "0" ? "Critical outage" :
    incident.severity == "1" ? "Major incident" :
    "Moderate issue"
  }})
- **Status**: ${{incident.status}}
- **Created**: ${{incident.created_at}}

${{
  incident.affected_users != null &&
  incident.affected_users > 0 ?
  "**User Impact**: " + string(incident.affected_users) +
  " users affected\n" : ""
}}

**Required Actions**:
${{
  incident.severity in ["0", "1"] ?
  "- Page on-call team IMMEDIATELY\n- Start incident bridge\n- Update status page" :
  "- Assign to service team\n- Triage within SLA"
}}

View in AI SRE: ${{incident.url}}
```

---

## Example: HTTP Request with Alert Data

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

---

## Example: Reference Previous Action Outputs

Actions can reference outputs from previous actions in the same runbook.

**Action 1**: Zoom: Create Meeting
- Outputs: `join_url`, `meeting_id`, `passcode`

**Action 2**: Slack: Post Message
- **Message** (referencing Action 1 output):
  ```
  🎥 **Incident Bridge Created**
  
  Join the call:
  {{runbook.outputs.zoom_create_meeting.join_url}}
  Meeting ID:
  {{runbook.outputs.zoom_create_meeting.meeting_id}}
  Passcode:
  {{runbook.outputs.zoom_create_meeting.passcode}}
  
  **Incident**: {{incident.title}}
  ```

The data picker automatically shows available outputs from previous actions.

---

## Next steps

- Go to [Use CEL in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) to implement conditional logic and transformations.
- Go to [Use System Fields in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-system-fields-in-runbook-actions) to learn about available system fields.
- Go to [Best Practices](/docs/ai-sre/runbooks/workflows/best-practices) for field usage guidelines.

<NeedHelpFooter />
