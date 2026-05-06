---
title: Jira Actions for Runbooks
sidebar_label: Jira
sidebar_position: 4
description: Learn how to use Jira actions in Harness AI SRE Runbooks with dynamic field mapping for automated ticket creation and updates.
redirect_from:
- /docs/incident-response/runbooks/integrations/jira
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness AI SRE integrates with Jira through runbook actions, enabling automated ticket management and incident tracking. Jira actions support dynamic field mapping, automatically discovering and populating any Jira field based on your project configuration.

## Overview

Jira actions enable your runbooks to:

- **Create Jira issues** automatically from incidents with dynamic field mapping
- **Update existing issues** when incident status or details change
- **Map AI SRE incident data** to any Jira field using Mustache variables
- **Support custom fields** discovered dynamically from your Jira instance
- **Transition issues** through Jira workflows
- **Add comments** to issues for incident updates

The dynamic field mapping feature automatically discovers available fields from your Jira project and issue type, allowing you to populate standard and custom Jira fields without manual configuration.

## Prerequisites

Before using Jira actions in runbooks, ensure you have:

- **Jira connector configured**: Set up a Jira connector in **Project Settings** → **Connectors**. Go to [Configure Project Connectors](/docs/ai-sre/runbooks/configure-project-connectors) to set up your Jira connection.
- **Jira admin access**: To create API tokens and configure permissions
- **API credentials**: API token (for Jira Cloud) or username/password (for Jira Server/Data Center)
- **Harness Project Admin role**: To configure connectors and create runbooks

### Required Jira permissions

The Jira user account must have these permissions in the target projects:

- **Browse Projects**: View project details and issues
- **Create Issues**: Create new issues and sub-tasks
- **Edit Issues**: Update issue fields and descriptions
- **Transition Issues**: Change issue status through workflows
- **Add Comments**: Post comments on issues
- **View Custom Fields**: Access custom field values

## Jira actions

### Create Jira Issue

Creates a new Jira issue with dynamic field mapping. The action automatically discovers available fields from your selected Jira project and issue type.

#### Configure the action

1. In the runbook editor, add a **Create Jira Issue** action.
2. Configure the required fields:
   - **Project Key**: Select your Jira project (typeahead enabled)
   - **Issue Type**: Select the issue type (Bug, Task, Story, etc.)
   - **Summary**: Brief title for the issue
   - **Description**: Detailed description (supports multiline text)
3. Click **Add Field** to populate additional Jira fields dynamically.
4. The **Fields** section expands to show all available fields for your selected project and issue type:
   - Standard fields (Priority, Labels, Components, Assignee, etc.)
   - Custom fields (with custom field IDs)
   - Required fields are marked with an asterisk (*)
5. For each field, enter a value:
   - **Static value**: Fixed text (e.g., `High`, `production`)
   - **Mustache variable**: Dynamic value from incident data (e.g., `{{Activity.severity}}`)
   - **Combined**: Mix static text and variables (e.g., `[{{Activity.severity}}] {{Activity.title}}`)

#### Available Mustache variables

Use these variables to map AI SRE incident data to Jira fields:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `{{Activity.title}}` | Incident title | `API Gateway Outage` |
| `{{Activity.summary}}` | Incident summary/description | `Payment API returning 500 errors` |
| `{{Activity.severity}}` | Incident severity | `P1`, `P2`, `P3`, `P4` |
| `{{Activity.status}}` | Incident status | `Detected`, `Investigating`, `Resolved` |
| `{{Activity.service}}` | Affected service name | `payment-service` |
| `{{Activity.environment}}` | Environment | `production`, `staging`, `dev` |
| `{{Activity.owner}}` | Incident owner email | `jane.doe@company.com` |
| `{{Activity.created_at}}` | Incident creation timestamp | `2026-05-06T20:30:00Z` |
| `{{Activity.updated_at}}` | Last update timestamp | `2026-05-06T21:15:00Z` |
| `{{Activity.url}}` | Incident URL in AI SRE | `https://app.harness.io/...` |

For custom incident fields, use `{{Activity.custom_field_name}}` where `custom_field_name` is the field identifier from your incident template.

#### Example: Create incident tracking issue

In the runbook editor, configure the Create Jira Issue action:

- **Project Key**: `INCIDENT`
- **Issue Type**: `Bug`
- **Summary**: `[{{Activity.severity}}] {{Activity.title}}`
- **Description**: 
  ```
  Incident Details:
  - Service: {{Activity.service}}
  - Environment: {{Activity.environment}}
  - Status: {{Activity.status}}
  - Incident URL: {{Activity.url}}
  ```
- **Add Field** → **Priority**: `High`
- **Add Field** → **Labels**: `incident, {{Activity.service}}, {{Activity.severity}}`
- **Add Field** → **Assignee**: `{{Activity.owner}}`
- **Add Field** → **Components**: `{{Activity.service}}`

**Result:** Jira issue `INCIDENT-123` created with title `[P1] API Gateway Outage`, high priority, assigned to incident owner, labeled with service and severity.

### Update Jira Issue

Updates an existing Jira issue with new field values. Like the Create action, this supports dynamic field mapping for any updateable field.

#### Configure the action

1. In the runbook editor, add an **Update Jira Issue** action.
2. Configure the required fields:
   - **Issue Key**: The Jira issue key to update (e.g., `INCIDENT-123`, supports typeahead search)
3. Click **Add Field** to select fields to update.
4. For each field, provide the new value (static or Mustache variable).

#### Example: Update issue when incident resolves

In the runbook editor, configure the Update Jira Issue action:

- **Issue Key**: `{{Activity.jira_ticket}}`
- **Issue Key**: `{{Activity.jira_ticket}}`
- **Add Field** → **Resolution**: `Fixed`
- **Add Field** → **Custom Field (Resolution Notes)**: `{{Activity.resolution_notes}}`
- **Add Field** → **Description**: `{{Activity.resolution_notes}}`

**Result:** Jira issue transitions to Done status with resolution notes from the incident.

### Transition Jira Issue

Moves a Jira issue through workflow states.

#### Configure the action

1. Add a **Transition Jira Issue** action.
2. Configure:
   - **Issue Key**: The issue to transition
   - **Transition Name**: The workflow transition name (e.g., `In Progress`, `Done`)

#### Example: Move issue to In Progress

In the runbook editor, configure the Transition Jira Issue action:

- **Issue Key**: `{{Activity.jira_ticket}}`
- **Transition Name**: `In Progress`

### Add Comment to Jira Issue

Posts a comment to an existing Jira issue.

#### Configure the action

1. Add an **Add Comment to Jira Issue** action.
2. Configure:
   - **Issue Key**: The issue to comment on
   - **Comment**: The comment text (supports Mustache variables)

#### Example: Add incident update

In the runbook editor, configure the Add Comment to Jira Issue action:

- **Issue Key**: `{{Activity.jira_ticket}}`
- **Comment**: `Incident status updated to {{Activity.status}} by {{Activity.owner}}`

## Dynamic field mapping

Dynamic field mapping automatically discovers available Jira fields based on your selected project and issue type. This eliminates manual configuration and supports custom fields unique to your Jira instance.

### How it works

1. **Select project and issue type**: When you add a Jira action, select your project key and issue type.
2. **Fields are discovered automatically**: The action queries the Jira API to retrieve all available fields for that project/issue type combination.
3. **Add fields dynamically**: Click **Add Field** to see a dropdown of all available fields:
   - Standard Jira fields (Priority, Assignee, Labels, Components, etc.)
   - Custom fields with their field IDs and display names
   - Required fields are marked
4. **Populate field values**: Enter static values or use Mustache variables to map incident data.
5. **Field validation**: The action validates field values based on Jira field types and constraints.

### Supported field types

The Jira integration supports all Jira field types with automatic formatting:

| Field Type | Jira Field Types | Value Format | Example | Notes |
|------------|------------------|--------------|---------|-------|
| **Text** | Single Line Text, Paragraph, Text Field | Static text, Mustache variable, or combined | `{{Activity.title}}`<br/>`Incident affecting {{Activity.service}}` | Use for Summary, Description, custom text fields |
| **Select (single)** | Select List, Priority, Status, Resolution | Value must match allowed option (case-sensitive) | **Priority**: `High`<br/>**Status**: `Open`<br/>**Custom Field**: `{{Activity.severity}}` | Values must match Jira options exactly. For severity mapping, use runbook logic to transform P1 → Critical, P2 → High, etc. |
| **Multi-select** | Labels, Components, Multi-Select, Checkboxes | Comma-separated list | **Labels**: `incident, {{Activity.service}}`<br/>**Components**: `{{Activity.service}}` | For Labels: spaces are treated as separators. Use hyphens: `payment-service` not `payment service` |
| **User** | User Picker, Assignee, Reporter | Email address, username, or account ID | **Assignee**: `{{Activity.owner}}`<br/>**Reporter**: `sre-bot@company.com` | Email addresses are automatically resolved to Jira users. If no match, field is left empty. Supports typeahead search. |
| **Date/Datetime** | Date Picker, Date Time Picker | ISO 8601 format:<br/>`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ` | **Due Date**: `2026-05-10`<br/>**Custom Field**: `{{Activity.created_at}}` | Use ISO 8601 format for compatibility |
| **Number** | Number Field | Numeric value (integer or decimal) | **Story Points**: `5`<br/>**Affected Users**: `{{Activity.user_impact_count}}` | Direct numeric values only |
| **Array (objects)** | Components, Versions, Fix Versions | Comma-separated list of names | **Components**: `Backend Services, API Gateway`<br/>**Fix Versions**: `2.1.0` | Supports typeahead search for components and versions |

## Common field mapping patterns

### Pattern 1: Basic incident tracking

**Use case:** Create a Jira Bug for every P1/P2 incident with essential details.

**Runbook configuration:**

1. **Trigger**: Incident created with severity P1 or P2
2. **Action**: Create Jira Issue
   - **Project Key**: `INCIDENT`
   - **Issue Type**: `Bug`
   - **Summary**: `[{{Activity.severity}}] {{Activity.title}}`
   - **Description**: 
     ```
     Incident Details:
     - Service: {{Activity.service}}
     - Environment: {{Activity.environment}}
     - Status: {{Activity.status}}
     - Incident URL: {{Activity.url}}
     
     Summary:
     {{Activity.summary}}
     ```
   - **Add Field** → **Priority**: `High`
   - **Add Field** → **Labels**: `incident, {{Activity.service}}, {{Activity.severity}}`
   - **Add Field** → **Assignee**: `{{Activity.owner}}`
   - **Add Field** → **Components**: `{{Activity.service}}`

### Pattern 2: Custom field population for compliance

**Use case:** Populate custom Jira fields required for SLA tracking and compliance reporting.

**Runbook configuration:**

1. **Action**: Create Jira Issue
   - **Project Key**: `SRE`
   - **Issue Type**: `Incident`
   - **Summary**: `{{Activity.title}}`
   - **Description**: `{{Activity.summary}}`
   - **Add Field** → **Priority**: `Critical`
   - **Add Field** → **Custom Field (Incident ID)**: `{{Activity.id}}`
   - **Add Field** → **Custom Field (Affected Service)**: `{{Activity.service}}`
   - **Add Field** → **Custom Field (Environment)**: `{{Activity.environment}}`
   - **Add Field** → **Custom Field (Start Time)**: `{{Activity.created_at}}`
   - **Add Field** → **Custom Field (Severity)**: `{{Activity.severity}}`
   - **Add Field** → **Custom Field (SLA Deadline)**: `{{Activity.sla_deadline}}`
   - **Add Field** → **Custom Field (Customer Impact)**: `{{Activity.customer_impact}}`
   - **Add Field** → **Custom Field (Business Unit)**: `{{Activity.business_unit}}`

**Result:** Jira issue includes all custom fields needed for compliance reports, SLA tracking, and incident analytics.

### Pattern 3: Agile workflow integration

**Use case:** Create Jira Stories in the current sprint for incidents requiring code changes.

**Runbook configuration:**

1. **Trigger**: Incident resolved with action items
2. **Action**: Create Jira Issue
   - **Project Key**: `PLATFORM`
   - **Issue Type**: `Story`
   - **Summary**: `Fix: {{Activity.title}}`
   - **Description**: 
     ```
     Root Cause:
     {{Activity.root_cause}}
     
     Action Items:
     {{Activity.action_items}}
     
     Related Incident: {{Activity.url}}
     ```
   - **Add Field** → **Priority**: `High`
   - **Add Field** → **Labels**: `tech-debt, incident-followup, {{Activity.service}}`
   - **Add Field** → **Components**: `{{Activity.service}}`
   - **Add Field** → **Assignee**: `{{Activity.owner}}`
   - **Add Field** → **Custom Field (Sprint)**: `Sprint 42`
   - **Add Field** → **Custom Field (Story Points)**: `5`
   - **Add Field** → **Custom Field (Epic Link)**: `PLATFORM-123`

### Pattern 4: Bidirectional sync with updates

**Use case:** Create a Jira issue on incident detection, then update it when the incident resolves.

**Runbook 1: Create issue on detection**

1. **Trigger**: Incident created
2. **Action**: Create Jira Issue
   - **Project Key**: `INCIDENT`
   - **Issue Type**: `Bug`
   - **Summary**: `{{Activity.title}}`
   - **Description**: `{{Activity.summary}}`
   - **Add Field** → **Priority**: `High`
   - **Add Field** → **Status**: `Open`
   - **Add Field** → **Assignee**: `{{Activity.owner}}`
3. **Store Output**: Save the Jira issue key (e.g., `{{steps.create_jira_issue.output.key}}`) to incident field `jira_ticket`

**Runbook 2: Update issue on resolution**

1. **Trigger**: Incident status changes to Resolved
2. **Action**: Update Jira Issue
   - **Issue Key**: `{{Activity.jira_ticket}}`
   - **Issue Key**: `{{Activity.jira_ticket}}`
   - **Add Field** → **Resolution**: `Fixed`
   - **Add Field** → **Custom Field (Resolution Notes)**: `{{Activity.resolution_notes}}`
   - **Add Field** → **Custom Field (Time to Resolve)**: `{{Activity.resolution_time}}`
   - **Add Field** → **Custom Field (Resolution Notes)**: `{{Activity.resolution_notes}}`
   - **Add Field** → **Custom Field (Time to Resolve)**: `{{Activity.resolution_time}}`

## Advanced Features

### Sync Architecture
<!-- CHANGED (comment #11): The previous :::note said "Bidirectional sync is available by leveraging Harness Pipelines" and listed capabilities as if they were a built-in feature. This framing was misleading — outbound sync (AI SRE → Jira) is native via runbook actions, but inbound sync (Jira → AI SRE) requires the customer to configure a Harness Pipeline with webhooks from Jira. Rewritten to make that distinction explicit. -->
:::note
**Outbound sync (AI SRE → Jira) is native** and handled via runbook actions as described above.

**Inbound sync (Jira → AI SRE)** is not a built-in feature. It can be configured using Harness Pipelines as the integration mechanism — you set up a webhook from Jira that triggers a Pipeline, which then updates the corresponding AI SRE incident. This requires customer-side configuration.
:::

#### Capabilities
1. **Status Sync**
   - Jira → Harness AI SRE status mapping
   - Automatic state transitions
   - Custom workflow support

2. **Comment Sync**
   - Bidirectional comment flow
   - Attachment synchronization
   - User mapping

3. **Field Mapping**
   Dynamic field mapping allows you to populate any Jira field with AI SRE incident data:

   - **Automatic field discovery**: Available fields are retrieved from Jira based on your selected project and issue type
   - **Standard fields**: Summary, Description, Priority, Assignee, Labels, Components, etc.
   - **Custom fields**: Any custom field configured in your Jira instance, including custom text fields, select lists, date fields, and number fields
   - **Mustache variable support**: Map incident data to fields using `{{Activity.field_name}}` syntax
   - **Mixed values**: Combine static text and variables (e.g., `[{{Activity.severity}}] {{Activity.title}}`)

## Best practices

### Field mapping design

- **Start with required fields**: Ensure all required Jira fields are populated before adding optional fields.
- **Use meaningful labels**: Include service name, severity, and incident identifier in labels for easy filtering and search.
- **Keep descriptions structured**: Use consistent formatting for incident descriptions (service, environment, status, summary) to make Jira issues scannable.
- **Test Mustache variables**: Verify that variables return expected values before deploying runbooks. Use test incidents to validate field mappings.
- **Document custom fields**: Maintain a reference of what each custom field represents and how it is used in your organization.

### Dynamic field discovery

- **Let Jira define the fields**: Do not hardcode custom field IDs. Use dynamic field discovery to automatically adapt to your Jira configuration.
- **Handle missing fields gracefully**: If a custom field is not available for a specific issue type, the action will skip it. Avoid making optional fields required in runbooks.
- **Use typeahead for accuracy**: For user, component, and version fields, use typeahead search to ensure you select valid values.
- **Validate field values**: Check that Mustache variables return values matching Jira's allowed values for select fields.

### Incident-to-Jira workflow

- **Create issue early**: Add Jira actions to trigger when incidents are detected to capture the full incident lifecycle.
- **Store the issue key**: Configure the Create Jira Issue action to store the issue key in an incident field (e.g., `jira_ticket`) so subsequent actions can reference it.
- **Update issues on status changes**: Use field change triggers to automatically update Jira when incident status, priority, or assignee changes.
- **Add comments for key events**: Use the Add Comment action to post incident timeline updates to Jira for full visibility.
- **Transition issues on resolution**: Configure a runbook to transition the Jira issue to Done when the incident resolves.

### Performance and reliability

- **Avoid circular updates**: If using bidirectional sync, ensure Jira updates do not trigger AI SRE updates that trigger Jira updates in a loop.
- **Handle API failures**: Use runbook error handling to retry failed Jira actions or alert when issue creation fails.
- **Monitor connector health**: Regularly test Jira connector connections and rotate API tokens according to your security policy.
- **Batch related actions**: Group multiple Jira actions (create issue, add comment, transition) in the same runbook execution to reduce latency.

## Common use cases

### Incident tracking

**Scenario:** Automatically create a Jira issue for every high-severity incident.

**Implementation:**
1. Create a runbook triggered by incident creation with severity P1 or P2.
2. Add a **Create Jira Issue** action with dynamic field mapping:
   - Project Key: INCIDENT
   - Issue Type: Bug
   - Summary: `[{{Activity.severity}}] {{Activity.title}}`
   - Fields: Priority (High), Labels (incident, service), Assignee (owner)
3. Store the issue key in the incident field `jira_ticket`.

**Benefit:** Every critical incident has a corresponding Jira issue for tracking, reporting, and compliance.

### Compliance and SLA tracking

**Scenario:** Populate custom Jira fields required for compliance reporting and SLA tracking.

**Implementation:**
1. Configure custom fields in your Jira project (Incident ID, Affected Service, SLA Deadline, Customer Impact, etc.).
2. Add a **Create Jira Issue** action with all custom fields mapped to incident data.
3. Use the dynamic field mapping to populate custom fields automatically.

**Benefit:** Compliance reports and SLA tracking dashboards in Jira are automatically populated without manual data entry.

### Agile workflow integration

**Scenario:** Create follow-up Jira Stories in the current sprint for incidents requiring code changes.

**Implementation:**
1. Create a runbook triggered when an incident is resolved with action items.
2. Add a **Create Jira Issue** action:
   - Project Key: PLATFORM
   - Issue Type: Story
   - Summary: `Fix: {{Activity.title}}`
   - Fields: Sprint (current sprint), Epic Link, Story Points, Labels (tech-debt, incident-followup)
3. Link the Story to the original incident for traceability.

**Benefit:** Technical debt and follow-up work from incidents are automatically added to the engineering backlog.

### Bidirectional synchronization

**Scenario:** Keep Jira and AI SRE incidents synchronized as status changes occur.

**Implementation:**
1. **Runbook 1 (Incident created)**: Create Jira issue, store issue key in incident.
2. **Runbook 2 (Status changed to Investigating)**: Update Jira issue status to In Progress, add comment.
3. **Runbook 3 (Status changed to Resolved)**: Transition Jira issue to Done, populate resolution fields.
4. **(Optional) Jira → AI SRE**: Configure a Harness Pipeline triggered by Jira webhooks to update AI SRE incidents when Jira changes.

**Benefit:** Both systems stay synchronized without manual updates, providing a complete incident record in both platforms.

## Troubleshooting

<Troubleshoot
  issue="Jira action fails with Required field missing error during runbook execution"
  mode="docs"
  fallback="Check the Jira action configuration and ensure all required fields (marked with an asterisk) have values. Required fields vary by project and issue type. Use the Add Field button to see which fields are required for your selected project/issue type. If using Mustache variables, verify they return non-empty values for the incident."
/>

<Troubleshoot
  issue="Jira issue is created but custom fields are empty"
  mode="docs"
  fallback="Ensure the custom field is available for the selected project and issue type. Custom fields in Jira are often context-specific and may not appear in all projects or issue types. Verify the Mustache variables you are using return valid values. Check the runbook execution logs to see if the field value was empty or null. If the field has allowed values, ensure your value matches one of them exactly (case-sensitive)."
/>

<Troubleshoot
  issue="User field mapping fails with User not found error"
  mode="docs"
  fallback="AI SRE resolves user emails to Jira user accounts automatically. If the email address in the AI SRE incident does not match a Jira user, the API call will fail if the field is required, or the field will be left empty if optional. Ensure users have accounts in both systems with matching email addresses. For Jira Cloud, verify the user is active and has access to the project. You can also use a static Jira username or account ID instead of a Mustache variable."
/>

<Troubleshoot
  issue="Priority or Status field value is rejected by Jira"
  mode="docs"
  fallback="Jira Priority and Status values are case-sensitive and must match allowed values exactly. Use the field dropdown in the runbook editor to see available options for your project and issue type. If using Mustache variables, ensure they return valid option values. For Status fields, verify the Jira workflow allows the transition you are attempting."
/>

<Troubleshoot
  issue="Labels or Components field does not populate correctly"
  mode="docs"
  fallback="For Labels, use comma-separated values. Jira labels cannot contain spaces, so spaces are treated as separators. Use hyphens instead: payment-service not payment service. For Components, ensure the component exists in your Jira project. You can use typeahead search in the runbook editor to find existing components. Both fields support comma-separated lists."
/>

<Troubleshoot
  issue="Dynamic fields do not appear when adding a Jira action"
  mode="docs"
  fallback="Dynamic fields are loaded after you select a Project Key and Issue Type. If fields do not appear, verify your Jira connector is configured correctly and has permissions to access the project. Check that the Jira user account has View Custom Fields permission. Try selecting a different issue type to see if fields appear. If the issue persists, test the Jira connector connection in Project Settings."
/>

<Troubleshoot
  issue="Jira issue created but not linked to AI SRE incident"
  mode="docs"
  fallback="To link the Jira issue to the AI SRE incident, configure the action output to store the issue key in an incident field. In the Jira action configuration, enable Store Output and map the action.output.key to an incident field (e.g., jira_ticket). This allows subsequent actions to reference the Jira issue using the stored key."
/>

## Next steps

- Go to [Configure Project Connectors](/docs/ai-sre/runbooks/configure-project-connectors) to set up project-level Jira connectors for runbook actions.
- Go to [Create a Runbook](/docs/ai-sre/runbooks/create-runbook) to start creating runbooks with Jira actions.
- Go to [Configure Authentication](/docs/ai-sre/runbooks/configure-authentication) to configure authentication options for Jira connectors.
- Go to [Incident Workflows](/docs/ai-sre/incidents/incident-workflows) to see examples of Jira integration in incident response workflows.
